import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import LessonView from './components/LessonView';
import ChatAssistant from './components/ChatAssistant';
import { CURRICULUM } from './constants';
import { Topic } from './types';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTopicSelect = (topic: Topic) => {
    setActiveTopic(topic);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden selection:bg-blue-500/30">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-800 flex items-center px-4 z-40">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-slate-400 hover:text-white"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="ml-4 font-bold text-white">GenAI Architect Prep</span>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="absolute top-0 left-0 w-72 h-full bg-slate-950 z-50 animate-slideRight"
            onClick={e => e.stopPropagation()}
          >
             <Sidebar 
                modules={CURRICULUM} 
                activeTopicId={activeTopic?.id || null} 
                onSelectTopic={handleTopicSelect} 
             />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <Sidebar 
        modules={CURRICULUM} 
        activeTopicId={activeTopic?.id || null} 
        onSelectTopic={handleTopicSelect} 
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative mt-16 md:mt-0">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"></div>
          <div className="absolute top-[40%] -left-[10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]"></div>
        </div>

        <LessonView topic={activeTopic} />
      </main>

      <ChatAssistant />
    </div>
  );
};

export default App;