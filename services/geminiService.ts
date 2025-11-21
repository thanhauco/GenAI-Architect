import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { GeneratedContent, ProjectLab } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateLessonContent = async (topicContext: string): Promise<GeneratedContent> => {
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
        
        return JSON.parse(text) as GeneratedContent;
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
};

export const generateProjectLab = async (topicContext: string, difficulty: string): Promise<ProjectLab> => {
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
        
        return JSON.parse(text) as ProjectLab;
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