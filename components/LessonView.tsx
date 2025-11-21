import React, { useEffect, useState } from 'react';
import { Topic, GeneratedContent, ProjectLab, Difficulty } from '../types';
import { generateLessonContent, generateProjectLab } from '../services/geminiService';
import CodeBlock from './CodeBlock';
import FileExplorer from './FileExplorer';
import { Loader2, Lightbulb, BookOpen, AlertTriangle, Beaker, BookText, ChevronRight, RefreshCw } from 'lucide-react';

interface LessonViewProps {
  topic: Topic | null;
}

type Tab = 'theory' | 'lab';

const LessonView: React.FC<LessonViewProps> = ({ topic }) => {
  const [activeTab, setActiveTab] = useState<Tab>('theory');
  const [loading, setLoading] = useState(false);
  
  // Theory State
  const [theoryContent, setTheoryContent] = useState<GeneratedContent | null>(null);
  
  // Lab State
  const [labContent, setLabContent] = useState<ProjectLab | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (topic) {
      // Reset states when topic changes
      setTheoryContent(null);
      setLabContent(null);
      setError(null);
      setActiveTab('theory');
      loadTheory(topic);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic]);

  const loadTheory = async (currentTopic: Topic) => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateLessonContent(currentTopic.promptContext);
      setTheoryContent(data);
    } catch (err) {
      setError("Failed to generate lesson content.");
    } finally {
      setLoading(false);
    }
  };

  const loadLab = async () => {
    if (!topic) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await generateProjectLab(topic.promptContext, topic.difficulty);
      setLabContent(data);
    } catch (err) {
      setError("Failed to generate lab project.");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === 'lab' && !labContent) {
        loadLab();
    }
  };

  const getDifficultyColor = (diff: Difficulty) => {
      switch(diff) {
          case Difficulty.BASIC: return 'bg-green-500/10 text-green-400 border-green-500/20';
          case Difficulty.INTERMEDIATE: return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
          case Difficulty.ADVANCED: return 'bg-red-500/10 text-red-400 border-red-500/20';
          default: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      }
  };

  if (!topic) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center">
        <BookOpen className="w-16 h-16 mb-4 opacity-50" />
        <h2 className="text-2xl font-semibold text-slate-200 mb-2">Select a Topic</h2>
        <p>Choose a module from the sidebar to start your Gen AI Architect training.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto scroll-smooth bg-[#0f172a]">
      <div className="max-w-5xl mx-auto p-6 md:p-10 pb-24">
        
        {/* Header */}
        <header className="mb-8 border-b border-slate-700 pb-6">
          <div className="flex items-center space-x-3 mb-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(topic.difficulty)}`}>
              {topic.difficulty} Level
            </span>
            <span className="px-2 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-medium border border-slate-700">
              Architect Training
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
            {topic.title}
          </h1>
          <p className="text-slate-400 text-lg">{topic.description}</p>
        </header>

        {/* Tabs */}
        <div className="flex space-x-1 bg-slate-900 p-1 rounded-lg border border-slate-800 w-fit mb-8">
            <button
                onClick={() => handleTabChange('theory')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'theory' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
                <BookText className="w-4 h-4 mr-2" />
                Concept & Theory
            </button>
            <button
                onClick={() => handleTabChange('lab')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'lab' 
                    ? 'bg-purple-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
                <Beaker className="w-4 h-4 mr-2" />
                Hands-on Lab
            </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6 flex items-start space-x-4 text-red-200 mb-8 animate-fadeIn">
            <AlertTriangle className="w-6 h-6 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">Generation Error</h3>
              <p>{error}</p>
              <button 
                onClick={() => activeTab === 'theory' ? loadTheory(topic) : loadLab()}
                className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white text-sm font-medium transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <Loader2 className={`w-10 h-10 animate-spin mb-4 ${activeTab === 'theory' ? 'text-blue-500' : 'text-purple-500'}`} />
            <p className="text-slate-400 font-mono">
                {activeTab === 'theory' ? 'Consulting the AI Architect...' : 'Building Lab Environment...'}
            </p>
          </div>
        )}

        {/* Content: Theory */}
        {!loading && activeTab === 'theory' && theoryContent && (
          <div className="space-y-8 animate-fadeIn">
            <section className="prose prose-invert prose-slate max-w-none">
              <h3 className="text-xl font-semibold text-blue-300 flex items-center mb-4">
                <BookOpen className="w-5 h-5 mr-2" />
                Architectural Overview
              </h3>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 text-slate-300 leading-relaxed whitespace-pre-wrap">
                {theoryContent.explanation}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-emerald-300 flex items-center mb-4">
                <div className="w-2 h-6 bg-emerald-500 rounded-full mr-3"></div>
                Reference Implementation
              </h3>
              <CodeBlock code={theoryContent.code} />
            </section>

            <section className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-amber-400 flex items-center mb-2">
                <Lightbulb className="w-5 h-5 mr-2" />
                Architect's Note / Interview Tip
              </h3>
              <p className="text-amber-100/80 italic">
                "{theoryContent.interviewTip}"
              </p>
            </section>

            {/* CTA for Lab */}
            <div className="mt-12 p-1 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-purple-900/20">
                <div className="bg-slate-900 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-bold text-white mb-1 flex items-center">
                            <Beaker className="w-5 h-5 mr-2 text-purple-400" />
                            Ready to build this?
                        </h3>
                        <p className="text-slate-400 text-sm">
                            Generate a complete Python project structure with <span className="text-white font-medium">{topic.difficulty}</span> level challenges.
                        </p>
                    </div>
                    <button
                        onClick={() => handleTabChange('lab')}
                        className="px-6 py-2.5 bg-white text-slate-900 hover:bg-blue-50 font-semibold rounded-lg transition-colors flex items-center whitespace-nowrap shadow-md"
                    >
                        Start Project Lab
                        <ChevronRight className="w-4 h-4 ml-2" />
                    </button>
                </div>
            </div>
          </div>
        )}

        {/* Content: Lab */}
        {!loading && activeTab === 'lab' && labContent && (
            <div className="space-y-8 animate-fadeIn">
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                         <h2 className="text-2xl font-bold text-purple-300 mb-2">{labContent.title}</h2>
                         <div className="flex flex-wrap gap-2">
                            {labContent.prerequisites.map((req, idx) => (
                                <span key={idx} className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-slate-400 font-mono">
                                    {req}
                                </span>
                            ))}
                        </div>
                      </div>
                      <button 
                        onClick={loadLab} 
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors flex items-center text-xs"
                        title="Regenerate Lab"
                      >
                        <RefreshCw className="w-4 h-4 mr-1" />
                        Regenerate
                      </button>
                    </div>
                    
                    <p className="text-slate-300 mb-6">{labContent.description}</p>
                    
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Lab Instructions</h3>
                        <ul className="space-y-2">
                            {labContent.steps.map((step, idx) => (
                                <li key={idx} className="flex items-start text-slate-300 text-sm">
                                    <span className="flex-shrink-0 w-5 h-5 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                                        {idx + 1}
                                    </span>
                                    {step}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <section>
                     <h3 className="text-xl font-semibold text-blue-300 flex items-center mb-4">
                        <div className="w-2 h-6 bg-blue-500 rounded-full mr-3"></div>
                        Project Workspace
                    </h3>
                    <FileExplorer files={labContent.files} />
                </section>
            </div>
        )}

      </div>
    </div>
  );
};

export default LessonView;