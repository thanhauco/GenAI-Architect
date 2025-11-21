import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { ZoomIn, Maximize2 } from 'lucide-react';

interface MermaidDiagramProps {
    code: string;
}

mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
    fontFamily: 'Inter',
});

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ code }) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const renderDiagram = async () => {
            if (!code || !elementRef.current) return;
            
            try {
                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                const { svg } = await mermaid.render(id, code);
                setSvg(svg);
                setError(null);
            } catch (err) {
                console.error("Mermaid Render Error:", err);
                setError("Failed to render diagram structure.");
            }
        };

        renderDiagram();
    }, [code]);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <div className={`relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-all duration-300 ${isExpanded ? 'fixed inset-4 z-50 shadow-2xl flex flex-col' : 'w-full my-6'}`}>
            <div className="absolute top-3 right-3 z-10 flex space-x-2">
                 <button 
                    onClick={toggleExpand}
                    className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                    title={isExpanded ? "Minimize" : "Maximize"}
                 >
                    {isExpanded ? <ZoomIn className="w-5 h-5 rotate-180" /> : <Maximize2 className="w-4 h-4" />}
                 </button>
            </div>

            <div className={`p-6 overflow-auto flex items-center justify-center min-h-[200px] ${isExpanded ? 'flex-1 bg-slate-950' : ''}`}>
                {error ? (
                    <div className="text-red-400 text-sm flex items-center">
                        <span className="mr-2">⚠️</span> {error}
                    </div>
                ) : svg ? (
                    <div 
                        ref={elementRef}
                        dangerouslySetInnerHTML={{ __html: svg }} 
                        className="w-full h-full flex justify-center"
                    />
                ) : (
                    <div className="text-slate-500 animate-pulse">Rendering architecture...</div>
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