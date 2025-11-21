import React, { useEffect, useState } from 'react';
import mermaid from 'mermaid';
import { ZoomIn, Maximize2, AlertTriangle } from 'lucide-react';

interface MermaidDiagramProps {
    code: string;
}

// Vibrant Neon Palette: { bg: Dark saturated background, border: Bright neon stroke }
const NEON_COLORS = [
  { bg: '#2e1065', border: '#a78bfa' }, // Violet
  { bg: '#172554', border: '#60a5fa' }, // Blue
  { bg: '#064e3b', border: '#34d399' }, // Emerald
  { bg: '#4a044e', border: '#e879f9' }, // Fuchsia
  { bg: '#431407', border: '#fb923c' }, // Orange
  { bg: '#164e63', border: '#22d3ee' }, // Cyan
  { bg: '#881337', border: '#fb7185' }, // Rose
  { bg: '#1a2e05', border: '#a3e635' }, // Lime
  { bg: '#4c0519', border: '#fda4af' }, // Pink
  { bg: '#0f172a', border: '#94a3b8' }, // Slate (Default-ish fallback)
];

// Initialize Mermaid
mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    securityLevel: 'loose',
    fontFamily: 'Inter, sans-serif',
    themeVariables: {
        darkMode: true,
        background: '#0f172a',
        primaryTextColor: '#f8fafc', // White text for contrast on dark backgrounds
        lineColor: '#64748b', // Slate-500 for connectors
        mainBkg: '#1e293b',
        nodeBorder: '#38bdf8',
    }
});

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ code }) => {
    const [svg, setSvg] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const renderDiagram = async () => {
            if (!code) return;
            
            // Reset state
            setSvg('');
            setError(null);

            try {
                const cleanCode = code
                    .replace(/```mermaid/g, '')
                    .replace(/```/g, '')
                    .trim();

                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                
                // 1. Render the SVG
                const { svg: rawSvg } = await mermaid.render(id, cleanCode);

                // 2. Post-process the SVG to inject random neon colors
                const parser = new DOMParser();
                const doc = parser.parseFromString(rawSvg, "image/svg+xml");
                
                // Select all shapes that represent nodes (rectangles, circles, rhombuses/polygons)
                // We avoid 'g.node label' to not mess up text
                const shapes = doc.querySelectorAll('.node rect, .node circle, .node polygon, .node path');

                shapes.forEach((shape) => {
                    // Pick a random color based on a simple hash of the shape's position or random
                    // Using random here makes it vibrant every time
                    const color = NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)];
                    
                    // Apply styles directly to the SVG element
                    shape.setAttribute('fill', color.bg);
                    shape.setAttribute('stroke', color.border);
                    shape.setAttribute('stroke-width', '2');
                });

                // Optional: Style Subgraphs (Clusters) to be subtle
                const clusters = doc.querySelectorAll('.cluster rect');
                clusters.forEach((cluster) => {
                    cluster.setAttribute('fill', 'rgba(30, 41, 59, 0.5)'); // slate-800 with opacity
                    cluster.setAttribute('stroke', '#475569'); // slate-600
                    cluster.setAttribute('stroke-width', '1');
                    cluster.setAttribute('stroke-dasharray', '4 4');
                });

                setSvg(doc.documentElement.outerHTML);

            } catch (err) {
                console.error("Mermaid Render Error:", err);
                setError("Failed to render diagram. The AI generated invalid syntax.");
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
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-75"></div>
                            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-150"></div>
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