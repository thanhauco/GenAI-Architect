# AI Architect Training

An interactive, AI-powered learning platform designed to prepare candidates for **Senior Gen AI Technical Architect** roles. This application provides a structured curriculum covering RAG, MLOps, Python, and Advanced NLP, generating real-time lessons and code examples using the Google Gemini API.

## 🎯 Goal
To bridge the gap between general ML knowledge and the specific requirements of a Senior Gen AI Architect, focusing on **Python**, **System Design**, **MLOps**, and **LLM Architectures**.

## 🚀 Features

- **Dynamic Curriculum**: 6 specialized modules derived from real-world job descriptions.
- **AI-Generated Lessons**: Uses `gemini-2.5-flash` to generate deep-dive explanations, "Architect's View" trade-offs, and production-ready Python code.
- **Interactive Chat Mentor**: A floating assistant (using `gemini-2.5-flash`) to answer specific architectural questions and debug concepts in real-time.
- **Smart Caching**: Instant load times for revisited topics and background pre-fetching for labs.
- **Syntax Highlighting**: Clean, copyable code blocks for Python examples (PyTorch, LangChain, Scikit-Learn).
- **Responsive Design**: Built with Tailwind CSS for a seamless experience on mobile and desktop.

## 📚 Curriculum Modules

The application covers the following technical areas:

1.  **ML Foundations & Data**
    *   Structured Data Modelling & Feature Engineering
    *   Time Series Forecasting (ARIMA/Prophet)
    *   Statistical Concepts for Data Science

2.  **NLP Deep Dive**
    *   Transformers & Attention Mechanisms (Math & Code)
    *   Vector Search Algorithms (HNSW, IVF)
    *   Named Entity Recognition (NER) Fine-tuning

3.  **LLM Architectures**
    *   RAG (Retrieval Augmented Generation) Pipelines
    *   Advanced Prompting (Chain-of-Thought, ReAct)
    *   Supervised Fine-Tuning (SFT) vs PEFT/LoRA

4.  **Core Frameworks**
    *   LangChain Orchestration & Agents
    *   PyTorch vs TensorFlow/Keras Comparison
    *   RASA & Conversational AI Architecture

5.  **Production Engineering**
    *   Evaluating RAG Systems (RAG Triad, RAGAS)
    *   Optimization & Quantization (Int8, 4-bit, QLoRA)
    *   Model Monitoring & Data Drift Detection

6.  **MLOps & Cloud**
    *   Containerization (Docker/Kubernetes)
    *   CI/CD for Machine Learning
    *   AWS/GCP GenAI Reference Architectures

## 🛠️ Tech Stack

-   **Frontend**: React 19, TypeScript
-   **Styling**: Tailwind CSS
-   **Icons**: Lucide React
-   **AI Integration**: Google Gen AI SDK (`@google/genai`)
-   **Models**: `gemini-2.5-flash` for high-speed, low-latency generation.

## 🔑 Configuration

This application requires a valid Google Gemini API Key to function.
The key is accessed via `process.env.API_KEY`.

---
*Built for Gen AI Technical Architect Interview Preparation*