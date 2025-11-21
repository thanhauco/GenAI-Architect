import React, { useState, useEffect } from 'react';
import { ProjectFile } from '../types';
import { File, FolderOpen, Code, FileJson, FileType, FileText } from 'lucide-react';
import CodeBlock from './CodeBlock';

interface FileExplorerProps {
    files: ProjectFile[];
}

const getFileIcon = (filename: string) => {
    if (filename.endsWith('.py')) return <Code className="w-4 h-4 text-blue-400" />;
    if (filename.endsWith('.json')) return <FileJson className="w-4 h-4 text-yellow-400" />;
    if (filename.endsWith('.md')) return <FileText className="w-4 h-4 text-slate-400" />;
    if (filename.endsWith('.yml') || filename.endsWith('.yaml')) return <FileType className="w-4 h-4 text-purple-400" />;
    return <File className="w-4 h-4 text-slate-500" />;
};

const FileExplorer: React.FC<FileExplorerProps> = ({ files }) => {
    const [activeFile, setActiveFile] = useState<ProjectFile | null>(null);

    useEffect(() => {
        if (files.length > 0) {
            setActiveFile(files[0]);
        }
    }, [files]);

    if (!activeFile) return null;

    return (
        <div className="flex flex-col md:flex-row border border-slate-700 rounded-xl overflow-hidden bg-slate-900 h-[600px] shadow-2xl">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-slate-950 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col">
                <div className="p-3 border-b border-slate-800 flex items-center text-slate-400 bg-slate-900/50">
                    <FolderOpen className="w-4 h-4 mr-2" />
                    <span className="text-xs font-bold uppercase tracking-wider">Project Files</span>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {files.map((file) => (
                        <button
                            key={file.name}
                            onClick={() => setActiveFile(file)}
                            className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                                activeFile.name === file.name
                                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                            }`}
                        >
                            <span className="mr-2 opacity-80">{getFileIcon(file.name)}</span>
                            <span className="truncate font-mono text-xs">{file.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#0f172a]">
                {/* Tab Bar */}
                <div className="flex bg-slate-950 border-b border-slate-800 overflow-x-auto">
                    {files.map(f => (
                         <button 
                         key={f.name}
                         onClick={() => setActiveFile(f)}
                         className={`px-4 py-2 text-xs font-mono border-r border-slate-800 flex items-center space-x-2 whitespace-nowrap ${
                            activeFile.name === f.name 
                                ? 'bg-[#1e293b] text-blue-300 border-t-2 border-t-blue-500' 
                                : 'text-slate-500 hover:bg-slate-900'
                         }`}
                     >
                         <span>{getFileIcon(f.name)}</span>
                         <span>{f.name}</span>
                     </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-0 bg-slate-900 relative">
                   <CodeBlock code={activeFile.content} language={activeFile.language} />
                </div>
            </div>
        </div>
    );
};

export default FileExplorer;