import React, { useEffect, useState } from 'react';
import mermaid from 'mermaid';
import { ZoomIn, Maximize2, AlertTriangle } from 'lucide-react';

interface MermaidDiagramProps {
    code: string;
}

// Initialize with a vibrant "Cyberpunk/Neon" Dark Theme
mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    securityLevel: 'loose',
    fontFamily: 'Inter, sans-serif',
    themeVariables: {
        darkMode: true,
        background: '#0f172a', // Match app bg (slate-950)
        
        // Nodes (Dark fill, Bright Border)
        primaryColor: '#1e293b', // slate-800
        primaryTextColor: '#f8fafc', // slate-50
        primaryBorderColor: '#38bdf8', // sky-400 (Cyan-ish)
        
        // Lines
        lineColor: '#818cf8', // indigo-400
        
        // Text
        textColor: '#e2e8f0',

        // Accents for specific shapes if supported
        secondaryColor: '#c026d3', // fuchsia-600
        tertiaryColor: '#ea580c', // orange-600
        
        // Specific overrides
        mainBkg: '#1e293b', // Node background
        nodeBorder: '#38bdf8', // Node border
        
        // Clusters (Subgraphs)
        clusterBkg: 'rgba(59, 130, 246, 0.05)', // Very faint blue tint
        clusterBorder: '#475569', // slate-600
        
        // Labels
        edgeLabelBackground: '#0f172a', // Match background so text floats clearly
    }
});

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ code }) => {
    const [svg, setSvg] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const renderDiagram = async () => {
            if (!code) return;
            
            // Reset state for new code
            setSvg('');
            setError(null);

            try {
                // Defensive cleanup of the code string
                const cleanCode = code
                    .replace(/```mermaid/g, '')
                    .replace(/```/g, '')
                    .trim();

                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                
                // Render the diagram to an SVG string
                const { svg } = await mermaid.render(id, cleanCode);
                setSvg(svg);
            } catch (err) {
                console.error("Mermaid Render Error:", err);
                setError("Failed to render diagram. The generated syntax might be invalid.");
            }
        };

        renderDiagram();
    }, [code]);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <div className={`relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-all duration-300 ${isExpanded ? 'fixed inset-4 z-[60] shadow-2xl flex flex-col border-blue-500/30' : 'w-full my-6'}`}>
            <div className="absolute top-3 right-3 z-10 flex space-x-2">
                 <button 
                    onClick={toggleExpand}
                    className="p-2 bg-slate-800/80 hover:bg-slate-700 backdrop-blur-sm rounded-lg text-slate-400 hover:text-white transition-colors border border-slate-700"
                    title={isExpanded ? "Minimize" : "Maximize"}
                 >
                    {isExpanded ? <ZoomIn className="w-5 h-5 rotate-180" /> : <Maximize2 className="w-4 h-4" />}
                 </button>
            </div>

            <div className={`p-6 overflow-auto flex items-center justify-center min-h-[300px] ${isExpanded ? 'flex-1 bg-slate-950/95' : ''}`}>
                {error ? (
                    <div className="text-red-400 text-sm flex flex-col items-center max-w-lg text-center">
                        <AlertTriangle className="w-8 h-8 mb-2 opacity-80" />
                        <span className="font-semibold mb-2">{error}</span>
                        <details className="w-full text-left mt-2">
                            <summary className="cursor-pointer text-xs text-slate-500 hover:text-slate-300">View Raw Code</summary>
                            <pre className="mt-2 p-2 bg-slate-950 rounded text-xs text-slate-400 font-mono overflow-x-auto border border-slate-800">
                                {code}
                            </pre>
                        </details>
                    </div>
                ) : svg ? (
                    <div 
                        dangerouslySetInnerHTML={{ __html: svg }} 
                        className="w-full h-full flex justify-center mermaid-svg-container"
                        style={{ minWidth: '100%' }}
                    />
                ) : (
                    <div className="flex flex-col items-center text-slate-500 animate-pulse">
                        <div className="flex space-x-2 mb-3">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-75"></div>
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-150"></div>
                        </div>
                        <span className="text-sm font-mono text-cyan-400/70">Designing Architecture...</span>
                    </div>
                )}
            </div>
            
            {isExpanded && (
                <div className="p-4 bg-slate-900 border-t border-slate-800 text-center">
                    <button onClick={toggleExpand} className="text-slate-400 hover:text-white text-sm font-medium">
                        Close View
                    </button>
                </div>
            )}
        </div>
    );
};

export default MermaidDiagram;