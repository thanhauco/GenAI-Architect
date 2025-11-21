import React from 'react';
import { Module, ModuleId } from './types';
import { 
    BrainCircuit, 
    Database, 
    CloudCog, 
    Code2 
} from 'lucide-react';

export const CURRICULUM: Module[] = [
    {
        id: ModuleId.ML_FOUNDATIONS,
        title: "ML Foundations & Data",
        icon: <Database className="w-5 h-5" />,
        topics: [
            {
                id: 'structured_data',
                title: "Structured Data Modelling",
                description: "Techniques for handling tabular data in enterprise settings.",
                promptContext: "Explain Structured Data Modelling using Python (Pandas/Scikit-Learn). Focus on feature engineering and preprocessing pipelines."
            },
            {
                id: 'time_series',
                title: "Time Series Modelling",
                description: "Forecasting and temporal data analysis.",
                promptContext: "Create a Python example for Time Series Modelling using statsmodels or Prophet. Discuss stationarity and seasonality."
            },
            {
                id: 'advanced_stats',
                title: "Statistical Concepts",
                description: "Key statistical principles for Data Science.",
                promptContext: "Explain key statistical concepts for ML (Hypothesis testing, Distributions) with Python code examples using Scipy."
            }
        ]
    },
    {
        id: ModuleId.LLM_CONCEPTS,
        title: "LLM Architectures",
        icon: <BrainCircuit className="w-5 h-5" />,
        topics: [
            {
                id: 'rag_impl',
                title: "RAG (Retrieval Augmented Generation)",
                description: "Building knowledge-grounded AI systems.",
                promptContext: "Provide a technical architecture overview and a Python code implementation of a RAG pipeline using LangChain or LlamaIndex."
            },
            {
                id: 'prompt_eng',
                title: "Advanced Prompting",
                description: "Few-shot, Chain-of-Thought, and system prompting.",
                promptContext: "Demonstrate Few-Shot Prompting and Chain-of-Thought reasoning using Python and the Gemini API."
            },
            {
                id: 'sft',
                title: "Supervised Fine-Tuning (SFT)",
                description: "Adapting base models to specific tasks.",
                promptContext: "Explain the concept of Supervised Fine-Tuning (SFT) (e.g., LoRA, QLoRA) and provide a conceptual Python snippet using PEFT/Hugging Face."
            }
        ]
    },
    {
        id: ModuleId.FRAMEWORKS,
        title: "Core Frameworks",
        icon: <Code2 className="w-5 h-5" />,
        topics: [
            {
                id: 'langchain_deep',
                title: "LangChain Orchestration",
                description: "Chains, Agents, and Memory management.",
                promptContext: "Build a complex LangChain Agent in Python that uses tools to solve a problem. Explain the 'Reasoning and Acting' (ReAct) loop."
            },
            {
                id: 'pytorch_tensorflow',
                title: "PyTorch vs TensorFlow",
                description: "Deep learning framework comparisons.",
                promptContext: "Compare PyTorch and TensorFlow for a Gen AI Architect. Provide a simple neural network implementation in PyTorch."
            },
            {
                id: 'rasa_conversational',
                title: "RASA & Conversational AI",
                description: "Building robust dialogue systems.",
                promptContext: "Explain RASA architecture (NLU, Core) and show how to define intents and stories in a Python-based project structure."
            }
        ]
    },
    {
        id: ModuleId.MLOPS_CLOUD,
        title: "MLOps & Cloud",
        icon: <CloudCog className="w-5 h-5" />,
        topics: [
            {
                id: 'docker_k8s',
                title: "Containerization (Docker/K8s)",
                description: "Deploying ML models at scale.",
                promptContext: "Explain how to containerize a Python ML inference service using Docker. Provide a Dockerfile and explain Kubernetes deployment concepts."
            },
            {
                id: 'cicd_ml',
                title: "CI/CD for Machine Learning",
                description: "Automating training and deployment pipelines.",
                promptContext: "Design a CI/CD pipeline for an ML project (Github Actions/Jenkins). Explain model registry and versioning."
            },
            {
                id: 'aws_gcp_arch',
                title: "AWS/GCP GenAI Architecture",
                description: "Cloud-native patterns for GenAI.",
                promptContext: "Describe a reference architecture for a Gen AI application on GCP or AWS. Discuss Vertex AI or Bedrock integration with Python."
            }
        ]
    }
];

export const SYSTEM_INSTRUCTION = `You are a world-class Gen AI Technical Architect Mentor. 
Your goal is to prepare a candidate for a Senior Architect role based on their specific job description.
The user is an experienced engineer but needs to deepen their specific Gen AI, Python, and MLOps skills.

When asked about a topic:
1. Provide a high-level "Architect's View" (Concept).
2. Provide a comprehensive, syntax-highlighted Python code example (Implementation).
3. Provide a specific "Interview Tip" or "Architectural Trade-off" relevant to the topic.

Format your response as a JSON object with these exact keys:
{
  "explanation": "Markdown string explaining the concept...",
  "code": "The Python code string...",
  "interviewTip": "A short, punchy tip for the interview..."
}
Ensure the JSON is valid. Do not wrap the JSON in markdown code blocks. Just return the raw JSON string.
`;