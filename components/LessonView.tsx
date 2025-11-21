import React, { useEffect, useState } from 'react';
import { Topic, GeneratedContent } from '../types';
import { generateLessonContent } from '../services/geminiService';
import CodeBlock from './CodeBlock';
import { Loader2, Lightbulb, BookOpen, AlertTriangle } from 'lucide-react';

interface LessonViewProps {
  topic: Topic | null;
}

const LessonView: React.FC<LessonViewProps> = ({ topic }) => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (topic) {
      loadContent(topic);
    } else {
      setContent(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic]);

  const loadContent = async (currentTopic: Topic) => {
    setLoading(true);
    setError(null);
    setContent(null); // Clear previous content immediately
    try {
      const data = await generateLessonContent(currentTopic.promptContext);
      setContent(data);
    } catch (err) {
      setError("Failed to generate lesson content. Please check your API key or try again.");
    } finally {
      setLoading(false);
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
    <div className="flex-1 overflow-y-auto p-6 md:p-10 pb-24 scroll-smooth">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 border-b border-slate-700 pb-6">
          <div className="flex items-center space-x-2 mb-2">
            <span className="px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
              Architect Training
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
            {topic.title}
          </h1>
          <p className="text-slate-400 text-lg">{topic.description}</p>
        </header>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
            <p className="text-slate-400 font-mono">Consulting the AI Architect...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6 flex items-start space-x-4 text-red-200">
            <AlertTriangle className="w-6 h-6 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">Generation Error</h3>
              <p>{error}</p>
              <button 
                onClick={() => topic && loadContent(topic)}
                className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white text-sm font-medium transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {content && !loading && (
          <div className="space-y-8 animate-fadeIn">
            {/* Explanation Section */}
            <section className="prose prose-invert prose-slate max-w-none">
              <h3 className="text-xl font-semibold text-blue-300 flex items-center mb-4">
                <BookOpen className="w-5 h-5 mr-2" />
                Concept Overview
              </h3>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 text-slate-300 leading-relaxed whitespace-pre-wrap">
                {content.explanation}
              </div>
            </section>

            {/* Code Section */}
            <section>
              <h3 className="text-xl font-semibold text-emerald-300 flex items-center mb-4">
                <div className="w-2 h-6 bg-emerald-500 rounded-full mr-3"></div>
                Implementation
              </h3>
              <CodeBlock code={content.code} />
            </section>

            {/* Interview Tip Section */}
            <section className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-amber-400 flex items-center mb-2">
                <Lightbulb className="w-5 h-5 mr-2" />
                Architect's Note / Interview Tip
              </h3>
              <p className="text-amber-100/80 italic">
                "{content.interviewTip}"
              </p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonView;