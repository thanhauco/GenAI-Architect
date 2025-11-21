import React from 'react';

const MLOpsDiagram: React.FC = () => {
  return (
    <div className="w-full p-6 bg-slate-900 border border-slate-800 rounded-xl my-8 overflow-x-auto shadow-lg">
      <div className="flex items-center justify-between mb-6 px-2">
        <h3 className="text-lg font-semibold text-slate-300">MLOps Pipeline Architecture</h3>
        <span className="text-xs text-slate-500 border border-slate-700 px-2 py-1 rounded">Reference Diagram</span>
      </div>
      
      <svg viewBox="0 0 850 320" className="w-full min-w-[700px] h-auto font-sans">
        {/* Definitions for markers and gradients */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
          </marker>
           <linearGradient id="gradPipeline" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{stopColor:'#3b82f6', stopOpacity:0.1}} />
            <stop offset="100%" style={{stopColor:'#9333ea', stopOpacity:0.1}} />
          </linearGradient>
        </defs>

        {/* Background Zone */}
        <rect x="10" y="80" width="830" height="160" rx="15" fill="url(#gradPipeline)" stroke="#475569" strokeWidth="1" strokeDasharray="5,5" />
        <text x="30" y="105" fill="#64748b" fontSize="12" fontWeight="bold" opacity="0.7">AUTOMATED PIPELINE</text>

        {/* Connecting Lines */}
        <path d="M130 160 L190 160" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <path d="M290 160 L350 160" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <path d="M450 160 L510 160" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <path d="M610 160 L670 160" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)" />
        
        {/* Feedback Loop */}
        <path d="M720 200 Q 720 280 380 280 T 80 200" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" opacity="0.6" />
        <rect x="330" y="265" width="120" height="24" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
        <text x="390" y="281" textAnchor="middle" fill="#f59e0b" fontSize="11">Drift & Feedback</text>

        {/* Nodes */}
        
        {/* Data Prep */}
        <g transform="translate(30, 120)">
            <rect width="100" height="80" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" filter="drop-shadow(0 4px 6px rgb(0 0 0 / 0.3))" />
            <text x="50" y="35" textAnchor="middle" fill="#60a5fa" fontSize="20">📂</text>
            <text x="50" y="55" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="bold">Data</text>
            <text x="50" y="70" textAnchor="middle" fill="#94a3b8" fontSize="10">Processing</text>
        </g>

        {/* Training */}
        <g transform="translate(190, 120)">
            <rect width="100" height="80" rx="8" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" filter="drop-shadow(0 4px 6px rgb(0 0 0 / 0.3))" />
            <text x="50" y="35" textAnchor="middle" fill="#a78bfa" fontSize="20">⚙️</text>
            <text x="50" y="55" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="bold">Train</text>
            <text x="50" y="70" textAnchor="middle" fill="#94a3b8" fontSize="10">Model Registry</text>
        </g>

        {/* Evaluation */}
        <g transform="translate(350, 120)">
            <rect width="100" height="80" rx="8" fill="#1e293b" stroke="#ec4899" strokeWidth="2" filter="drop-shadow(0 4px 6px rgb(0 0 0 / 0.3))" />
            <text x="50" y="35" textAnchor="middle" fill="#f472b6" fontSize="20">📊</text>
            <text x="50" y="55" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="bold">Evaluate</text>
            <text x="50" y="70" textAnchor="middle" fill="#94a3b8" fontSize="10">Valid / Test</text>
        </g>

        {/* Deployment */}
        <g transform="translate(510, 120)">
            <rect width="100" height="80" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" filter="drop-shadow(0 4px 6px rgb(0 0 0 / 0.3))" />
            <text x="50" y="35" textAnchor="middle" fill="#34d399" fontSize="20">🚀</text>
            <text x="50" y="55" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="bold">Deploy</text>
            <text x="50" y="70" textAnchor="middle" fill="#94a3b8" fontSize="10">K8s / Serverless</text>
        </g>

        {/* Monitoring */}
        <g transform="translate(670, 120)">
            <circle cx="50" cy="40" r="40" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" filter="drop-shadow(0 4px 6px rgb(0 0 0 / 0.3))" />
            <text x="50" y="35" textAnchor="middle" fill="#fbbf24" fontSize="20">👁️</text>
            <text x="50" y="55" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="bold">Monitor</text>
            <text x="50" y="70" textAnchor="middle" fill="#94a3b8" fontSize="10">Observability</text>
        </g>

      </svg>
    </div>
  );
};

export default MLOpsDiagram;