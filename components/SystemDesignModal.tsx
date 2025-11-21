import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Play, Cpu, Database, Shield, Globe } from 'lucide-react';
import { startDesignChallenge, chatDesignInterview } from '../services/geminiService';
import { DesignChallenge } from '../types';

interface SystemDesignModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SCENARIOS = [
    { id: 'rag_scale', title: 'Scalable RAG System', icon: <Database className="w-5 h-5 text-blue-400"/> },
    { id: 'realtime_rec', title: 'Real-time Recommendations', icon: <Cpu className="w-5 h-5 text-purple-400"/> },
    { id: 'fraud_detect', title: 'FinTech Fraud Detection', icon: <Shield className="w-5 h-5 text-green-400"/> },
    { id: 'global_llm', title: 'Multi-Region LLM API', icon: <Globe className="w-5 h-5 text-orange-400"/> },
];

const SystemDesignModal: React.FC<SystemDesignModalProps> = ({ isOpen, onClose }) => {
    const [activeChallenge, setActiveChallenge] = useState<DesignChallenge | null>(null);
    const [messages, setMessages] = useState<{role: 'user' | 'model', content: string}[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (activeChallenge) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, activeChallenge]);

    const handleStart = async (scenarioId: string) => {
        setLoading(true);
        try {
            const challenge = await startDesignChallenge(scenarioId);
            setActiveChallenge(challenge);
            setMessages([
                { role: 'model', content: `**Problem Statement:**\n${challenge.scenario}\n\n${challenge.initialQuestion}` }
            ]);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setLoading(true);

        // Format history
        const history = messages.map(m => ({
            role: m.role === 'model' ? 'model' : 'user',
            parts: [{ text: m.content }]
        }));

        const response = await chatDesignInterview(history, userMsg);
        setMessages(prev => [...prev, { role: 'model', content: response || "Error processing response." }]);
        setLoading(false);
    };

    const handleReset = () => {
        setActiveChallenge(null);
        setMessages([]);
        setInput('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-slate-900 w-full max-w-4xl h-[80vh] rounded-2xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden relative">
                
                {/* Header */}
                <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="bg-purple-500/10 p-2 rounded-lg border border-purple-500/20">
                            <Bot className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white tracking-tight">System Design Simulator</h2>
                            <p className="text-xs text-slate-400">Mock Interview Mode • Principal Architect AI</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-hidden flex">
                    
                    {!activeChallenge ? (
                        // Scenario Selection
                        <div className="w-full p-8 flex flex-col items-center justify-center text-center">
                            <h3 className="text-2xl font-bold text-white mb-4">Choose Your Challenge</h3>
                            <p className="text-slate-400 max-w-lg mb-8">
                                Select a real-world architectural problem. The AI will act as an interviewer, evaluating your ability to gather requirements, design high-level components, and handle deep dives.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                                {SCENARIOS.map(s => (
                                    <button 
                                        key={s.id}
                                        onClick={() => handleStart(s.title)}
                                        disabled={loading}
                                        className="flex items-center p-5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500/50 rounded-xl transition-all group text-left"
                                    >
                                        <div className="mr-4 p-3 bg-slate-900 rounded-lg group-hover:scale-110 transition-transform">
                                            {s.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-200 group-hover:text-white">{s.title}</h4>
                                            <p className="text-xs text-slate-500 mt-1">Start Interview</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            {loading && <div className="mt-8 text-slate-400 animate-pulse">Generating Scenario...</div>}
                        </div>
                    ) : (
                        // Chat Interface
                        <div className="w-full flex flex-col bg-[#0f172a]">
                             <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {messages.map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 ${msg.role === 'user' ? 'bg-blue-600 ml-3' : 'bg-purple-600 mr-3'}`}>
                                                {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                                            </div>
                                            <div className={`rounded-2xl px-5 py-4 text-sm leading-relaxed shadow-md ${
                                                msg.role === 'user' 
                                                ? 'bg-blue-600/10 text-blue-100 border border-blue-500/20' 
                                                : 'bg-slate-800 text-slate-200 border border-slate-700'
                                            }`}>
                                                <div className="whitespace-pre-wrap">{msg.content}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {loading && (
                                    <div className="flex justify-start">
                                        <div className="flex items-center ml-11 bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none border border-slate-700">
                                             <span className="text-xs text-slate-400">Interviewer is thinking...</span>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                             </div>

                             <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center">
                                <button onClick={handleReset} className="mr-4 text-slate-500 hover:text-red-400 text-xs font-medium uppercase tracking-wider">End Session</button>
                                <form onSubmit={handleSend} className="flex-1 relative">
                                    <input 
                                        type="text" 
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Type your architectural decision..."
                                        className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                                        autoFocus
                                    />
                                    <button type="submit" disabled={!input.trim() || loading} className="absolute right-2 top-2 p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg disabled:opacity-50 transition-colors">
                                        <Send className="w-4 h-4" />
                                    </button>
                                </form>
                             </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SystemDesignModal;