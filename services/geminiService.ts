import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { GeneratedContent, ProjectLab, DesignChallenge } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// In-memory Cache
const theoryCache = new Map<string, GeneratedContent>();
const labCache = new Map<string, ProjectLab>();
const diagramCache = new Map<string, string>();

export const generateLessonContent = async (topicContext: string): Promise<GeneratedContent> => {
    // Check Cache
    if (theoryCache.has(topicContext)) {
        return theoryCache.get(topicContext)!;
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Teach me about this topic for a Gen AI Architect role: ${topicContext}. 
            Remember to focus on Python implementation and Architectural patterns.`,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        explanation: { type: Type.STRING },
                        code: { type: Type.STRING },
                        interviewTip: { type: Type.STRING }
                    },
                    required: ["explanation", "code", "interviewTip"]
                }
            }
        });

        const text = response.text;
        if (!text) throw new Error("No content generated");
        
        const data = JSON.parse(text) as GeneratedContent;
        
        // Set Cache
        theoryCache.set(topicContext, data);
        
        return data;
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
};

export const generateProjectLab = async (topicContext: string, difficulty: string): Promise<ProjectLab> => {
    const cacheKey = `${topicContext}-${difficulty}`;
    
    // Check Cache
    if (labCache.has(cacheKey)) {
        return labCache.get(cacheKey)!;
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Create a hands-on ${difficulty} level Python Project Lab for the topic: "${topicContext}".
            
            The project should be architecturally sound and use modern best practices.
            Provide a multi-file structure (e.g., separate config, main, logic files).
            Include a README.md with setup instructions.
            `,
            config: {
                systemInstruction: "You are a Senior Technical Architect creating educational coding labs.",
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        prerequisites: { type: Type.ARRAY, items: { type: Type.STRING } },
                        steps: { type: Type.ARRAY, items: { type: Type.STRING } },
                        files: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING, description: "Filename with extension, e.g., main.py" },
                                    language: { type: Type.STRING, description: "python, markdown, yaml, json" },
                                    content: { type: Type.STRING, description: "The full file content" }
                                },
                                required: ["name", "language", "content"]
                            }
                        }
                    },
                    required: ["title", "description", "files", "steps", "prerequisites"]
                }
            }
        });

        const text = response.text;
        if (!text) throw new Error("No project generated");
        
        const data = JSON.parse(text) as ProjectLab;
        
        // Set Cache
        labCache.set(cacheKey, data);
        
        return data;
    } catch (error) {
        console.error("Gemini API Error (Project):", error);
        throw error;
    }
}

export const chatWithMentor = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
    try {
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            history: history,
            config: {
                systemInstruction: "You are a helpful AI Architect mentor. Keep answers concise and code-focused."
            }
        });

        const result = await chat.sendMessage({ message });
        return result.text;
    } catch (error) {
        console.error("Chat Error:", error);
        return "I'm having trouble connecting to the architecture review board (API Error). Try again.";
    }
};

export const generateArchitectureDiagram = async (topic: string): Promise<string> => {
    if (diagramCache.has(topic)) {
        return diagramCache.get(topic)!;
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate a Mermaid.js diagram code for the architecture of: "${topic}".
            
            STRICT INSTRUCTIONS:
            1. Return ONLY valid Mermaid.js code.
            2. Do NOT use Markdown formatting (no \`\`\`).
            3. Use 'graph TD' (Top-Down) or 'graph LR' (Left-Right).
            4. Use standard shapes: [Rect], (Round), {Rhombus}, [(Database)], [[Subroutine]].
            5. Avoid special characters in Node IDs.
            6. Keep diagram depth reasonable (max 15 nodes).
            `,
            config: {
                responseMimeType: "text/plain",
            }
        });

        // Cleanup potential markdown residue
        const text = response.text?.replace(/```mermaid/g, '').replace(/```/g, '').trim();
        
        if (text) {
            diagramCache.set(topic, text);
            return text;
        }
        throw new Error("Failed to generate diagram");
    } catch (error) {
        console.error("Diagram Error:", error);
        return "graph TD; A[Error] --> B[Could not generate diagram];";
    }
};

export const startDesignChallenge = async (scenarioType: string): Promise<DesignChallenge> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate a System Design Interview challenge for a Senior AI Architect. 
            Topic: ${scenarioType}.
            
            Output JSON with:
            - title: A catchy title
            - scenario: A vague problem statement (like a real interview)
            - initialQuestion: The first question the interviewer asks.
            `,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        scenario: { type: Type.STRING },
                        initialQuestion: { type: Type.STRING }
                    },
                    required: ["title", "scenario", "initialQuestion"]
                }
            }
        });

        const text = response.text;
        if (!text) throw new Error("No challenge generated");
        return JSON.parse(text) as DesignChallenge;
    } catch (error) {
        console.error("Challenge Error:", error);
        throw error;
    }
};

export const chatDesignInterview = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
    try {
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            history: history,
            config: {
                systemInstruction: `You are a Principal Engineer at a FAANG company conducting a System Design Interview.
                The candidate is applying for a Senior AI Architect role.
                
                Your Goals:
                1. Evaluate their ability to gather requirements (Functional/Non-functional).
                2. Push them on scalability, latency, and cost trade-offs.
                3. If they suggest a naive solution, challenge it gently (e.g., "What happens if traffic spikes 10x?").
                4. Keep responses relatively short (conversational).
                
                Do not give the answer away. Make them work for it.`
            }
        });

        const result = await chat.sendMessage({ message });
        return result.text;
    } catch (error) {
        console.error("Interview Error:", error);
        return "Let's pause the interview for a moment. (Connection Error)";
    }
};