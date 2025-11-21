import React from 'react';

export enum ModuleId {
    ML_FOUNDATIONS = 'ml_foundations',
    LLM_CONCEPTS = 'llm_concepts',
    MLOPS_CLOUD = 'mlops_cloud',
    FRAMEWORKS = 'frameworks'
}

export interface Topic {
    id: string;
    title: string;
    description: string;
    promptContext: string; // Specific context to send to Gemini
}

export interface Module {
    id: ModuleId;
    title: string;
    icon: React.ReactNode;
    topics: Topic[];
}

export interface Message {
    role: 'user' | 'model';
    content: string;
    isCode?: boolean;
}

export interface GeneratedContent {
    explanation: string;
    code: string;
    interviewTip: string;
}