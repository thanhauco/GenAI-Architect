import React from 'react';

export enum ModuleId {
    ML_FOUNDATIONS = 'ml_foundations',
    LLM_CONCEPTS = 'llm_concepts',
    FRAMEWORKS = 'frameworks',
    MLOPS_CLOUD = 'mlops_cloud',
    NLP_DEEP_DIVE = 'nlp_deep_dive',
    PRODUCTION_ENG = 'production_eng'
}

export enum Difficulty {
    BASIC = 'Basic',
    INTERMEDIATE = 'Intermediate',
    ADVANCED = 'Advanced'
}

export interface Topic {
    id: string;
    title: string;
    description: string;
    difficulty: Difficulty;
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

export interface ProjectFile {
    name: string;
    language: string;
    content: string;
}

export interface ProjectLab {
    title: string;
    description: string;
    prerequisites: string[];
    files: ProjectFile[];
    steps: string[];
}