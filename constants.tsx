import React from 'react';
import { Module, ModuleId, Difficulty } from './types';
import { 
    BrainCircuit, 
    Database, 
    CloudCog, 
    Code2,
    Layers,
    Activity
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
                difficulty: Difficulty.BASIC,
                promptContext: "Explain Structured Data Modelling using Python (Pandas/Scikit-Learn). Focus on feature engineering (One-Hot, Target Encoding) and preprocessing pipelines for production."
            },
            {
                id: 'time_series',
                title: "Time Series Modelling",
                description: "Forecasting and temporal data analysis.",
                difficulty: Difficulty.INTERMEDIATE,
                promptContext: "Create a Python example for Time Series Modelling using statsmodels (ARIMA) or Prophet. Discuss handling stationarity, seasonality, and backtesting strategies."
            },
            {
                id: 'advanced_stats',
                title: "Statistical Concepts",
                description: "Key statistical principles for Data Science.",
                difficulty: Difficulty.BASIC,
                promptContext: "Explain key statistical concepts for ML (Hypothesis testing, p-values, Distributions, A/B Testing) with Python code examples using Scipy."
            }
        ]
    },
    {
        id: ModuleId.NLP_DEEP_DIVE,
        title: "NLP Deep Dive",
        icon: <Layers className="w-5 h-5" />,
        topics: [
            {
                id: 'transformers_attn',
                title: "Transformers & Attention",
                description: "The math behind the magic.",
                difficulty: Difficulty.ADVANCED,
                promptContext: "Explain the Self-Attention mechanism and Multi-Head Attention in Transformers. Provide a PyTorch implementation of a single Self-Attention Head class."
            },
            {
                id: 'vector_search',
                title: "Vector Search Algorithms",
                description: "Indexing strategies for RAG.",
                difficulty: Difficulty.INTERMEDIATE,
                promptContext: "Explain how HNSW (Hierarchical Navigable Small World) or IVF (Inverted File Index) works for approximate nearest neighbor search. Provide a Python example using `faiss` or `numpy`."
            },
            {
                id: 'ner_custom',
                title: "Named Entity Recognition",
                description: "Extracting structured info from text.",
                difficulty: Difficulty.INTERMEDIATE,
                promptContext: "Explain how to fine-tune a BERT-based model for custom Named Entity Recognition (NER) using Hugging Face Transformers and PyTorch."
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
                difficulty: Difficulty.INTERMEDIATE,
                promptContext: "Provide a technical architecture overview and a Python code implementation of a production-ready RAG pipeline using LangChain, focusing on the retriever and generation steps."
            },
            {
                id: 'prompt_eng',
                title: "Advanced Prompting",
                description: "Few-shot, Chain-of-Thought, and system prompting.",
                difficulty: Difficulty.BASIC,
                promptContext: "Demonstrate Few-Shot Prompting, Chain-of-Thought (CoT), and ReAct prompting patterns using Python and the Gemini API."
            },
            {
                id: 'sft',
                title: "Supervised Fine-Tuning (SFT)",
                description: "Adapting base models to specific tasks.",
                difficulty: Difficulty.ADVANCED,
                promptContext: "Explain the concept of Supervised Fine-Tuning (SFT) vs Parameter Efficient Fine-Tuning (PEFT/LoRA). Provide a conceptual Python snippet using Hugging Face PEFT library."
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
                difficulty: Difficulty.INTERMEDIATE,
                promptContext: "Build a complex LangChain Agent in Python that uses custom tools to solve a problem. Explain the execution loop and memory management."
            },
            {
                id: 'pytorch_tensorflow',
                title: "PyTorch vs TensorFlow",
                description: "Deep learning framework comparisons.",
                difficulty: Difficulty.BASIC,
                promptContext: "Compare PyTorch and TensorFlow/Keras for a Gen AI Architect. Provide a simple training loop implementation in PyTorch."
            },
            {
                id: 'rasa_conversational',
                title: "RASA & Conversational AI",
                description: "Building robust dialogue systems.",
                difficulty: Difficulty.ADVANCED,
                promptContext: "Explain RASA architecture (NLU, Core) and show how to define domain.yml, nlu.yml, and stories in a Python-based project structure."
            }
        ]
    },
    {
        id: ModuleId.PRODUCTION_ENG,
        title: "Production Engineering",
        icon: <Activity className="w-5 h-5" />,
        topics: [
            {
                id: 'rag_eval',
                title: "RAG Evaluation & RAGAS",
                description: "RAG Triad (Faithfulness, Relevance) & RAGAS Implementation.",
                difficulty: Difficulty.ADVANCED,
                promptContext: "Provide a detailed technical explanation of the RAGAS library and its role in measuring the 'RAG Triad': Faithfulness, Answer Relevance, and Context Relevance. Provide a complete Python code example using `ragas` to evaluate a RAG system, including setting up an EvaluationDataset and running the `evaluate` function."
            },
            {
                id: 'quantization',
                title: "Optimization & Quantization",
                description: "Running models efficiently.",
                difficulty: Difficulty.ADVANCED,
                promptContext: "Explain model quantization (Int8, 4-bit, QLoRA). Provide Python code to load a model in 4-bit precision using `bitsandbytes` and `transformers`."
            },
            {
                id: 'monitoring_drift',
                title: "Model Monitoring & Drift",
                description: "Observability in production.",
                difficulty: Difficulty.INTERMEDIATE,
                promptContext: "Explain Data Drift and Concept Drift. Provide a Python example using `scikit-learn` or `scipy` (KS Test) to detect drift between reference and production data distributions."
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
                difficulty: Difficulty.INTERMEDIATE,
                promptContext: "Explain how to containerize a Python ML inference service (FastAPI) using Docker. Provide a Multi-stage Dockerfile and basic Kubernetes deployment YAML."
            },
            {
                id: 'cicd_ml',
                title: "CI/CD for Machine Learning",
                description: "Automating training and deployment pipelines.",
                difficulty: Difficulty.ADVANCED,
                promptContext: "Design a CI/CD pipeline for an ML project (Github Actions). Explain the role of a Feature Store and Model Registry."
            },
            {
                id: 'aws_gcp_arch',
                title: "AWS/GCP GenAI Architecture",
                description: "Cloud-native patterns for GenAI.",
                difficulty: Difficulty.ADVANCED,
                promptContext: "Describe a reference architecture for a Gen AI application on GCP or AWS. Discuss integration of Vertex AI / Bedrock, Vector Search, and API Gateway."
            }
        ]
    }
];

export const SYSTEM_INSTRUCTION = `You are a world-class Gen AI Technical Architect Mentor. 
Your goal is to prepare a candidate for a Senior Architect role based on their specific job description.
The user is an experienced engineer but needs to deepen their specific Gen AI, Python, and MLOps skills.

When asked about a topic:
1. Provide a high-level "Architect's View" (Concept & Trade-offs). Focus on WHY we use this, not just how.
2. Provide a comprehensive, syntax-highlighted Python code example (Implementation). Use modern libraries (LangChain, PyTorch, Transformers).
3. Provide a specific "Interview Tip" or "Architectural Trade-off" relevant to the topic (e.g., "Latency vs Accuracy", "Cost optimization").

Format your response as a JSON object with these exact keys:
{
  "explanation": "Markdown string explaining the concept...",
  "code": "The Python code string...",
  "interviewTip": "A short, punchy tip for the interview..."
}
Ensure the JSON is valid. Do not wrap the JSON in markdown code blocks. Just return the raw JSON string.
`;