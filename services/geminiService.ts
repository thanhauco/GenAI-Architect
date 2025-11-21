import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { GeneratedContent } from "../types";

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