import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'python' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden border border-slate-700 bg-[#1e1e1e] my-4 shadow-xl font-mono text-sm">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 bg-[#252526] border-b border-slate-700">
        <span className="text-xs text-slate-400 uppercase tracking-wider flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${language === 'python' ? 'bg-blue-500' : 'bg-yellow-500'}`}></div>
            {language}
        </span>
        <button 
          onClick={handleCopy}
          className="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-slate-700"
          title="Copy code"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
            language={language.toLowerCase()}
            style={vscDarkPlus}
            customStyle={{
                margin: 0,
                padding: '1.5rem',
                backgroundColor: 'transparent', // Let the container background show through
                fontSize: '0.875rem',
                lineHeight: '1.6',
            }}
            wrapLines={false}
            showLineNumbers={true}
            lineNumberStyle={{ minWidth: '2.5em', paddingRight: '1em', color: '#6e7681', textAlign: 'right' }}
        >
            {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;