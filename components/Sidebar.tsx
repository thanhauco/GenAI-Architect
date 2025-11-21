import React from 'react';
import { Module, Topic } from '../types';
import { ChevronRight, Terminal } from 'lucide-react';

interface SidebarProps {
  modules: Module[];
  activeTopicId: string | null;
  onSelectTopic: (topic: Topic) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ modules, activeTopicId, onSelectTopic }) => {
  return (
    <aside className="w-72 bg-slate-950 border-r border-slate-800 h-full flex flex-col overflow-y-auto hidden md:flex">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center space-x-3 text-blue-500 mb-1">
            <Terminal className="w-6 h-6" />
            <span className="font-bold text-lg tracking-wider text-white">ARCHITECT<span className="text-blue-500">.AI</span></span>
        </div>
        <p className="text-xs text-slate-500 font-mono mt-2">Gen AI Technical Architect Prep</p>
      </div>
      
      <div className="flex-1 py-4">
        {modules.map((module) => (
          <div key={module.id} className="mb-6 px-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center px-2">
              <span className="mr-2 opacity-75">{module.icon}</span>
              {module.title}
            </h3>
            <div className="space-y-1">
              {module.topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => onSelectTopic(topic)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 group flex items-center justify-between
                    ${activeTopicId === topic.id 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                >
                  <span className="truncate">{topic.title}</span>
                  {activeTopicId === topic.id && <ChevronRight className="w-3 h-3 opacity-75" />}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-slate-800">
        <div className="text-xs text-slate-600 text-center">
          Python • MLOps • RAG • Cloud
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;