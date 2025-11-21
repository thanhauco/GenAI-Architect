import React, { useEffect, useState } from 'react';
import mermaid from 'mermaid';
import { ZoomIn, Maximize2, AlertTriangle, RefreshCcw } from 'lucide-react';

interface ColorTheme {
  bg: string;
  border: string;
}

interface MermaidDiagramProps {
    code: string;
    colorPalette?: ColorTheme[];
}

// Vibrant Neon Palette: { bg: Dark saturated background, border: Bright neon stroke }
const NEON_COLORS: ColorTheme[] = [
  { bg: '#2e1065', border: '#a78bfa' }, // Violet
  { bg: '#172554', border: '#60a5fa' }, // Blue
  { bg: '#064e3b', border: '#34d399' }, // Emerald
  { bg: '#4a044e', border: '#e879f9' }, // Fuchsia
  { bg: '#431407', border: '#fb923c' }, // Orange
  { bg: '#164e63', border: '#22d3ee' }, // Cyan
  { bg: '#881337', border: '#fb7185' }, // Rose
  { bg: '#365314', border: '#bef264' }, // Lime
  { bg: '#831843', border: '#f472b6' }, // Pink
  { bg: '#312e81', border: '#818cf8' }, // Indigo
];

// Initialize Mermaid
mermaid.initialize({
    startOnLoad: false,
    theme: 'base', // Use base to allow full overrides
    securityLevel: 'loose',
    fontFamily: 'Inter, sans-serif',
    themeVariables: {
        darkMode: true,
        background: 'transparent', // Force transparent
        primaryTextColor: '#f8fafc', // White text
        lineColor: '#64748b', // Slate-500 for connectors
        mainBkg: '#1e293b', // Fallback node bg
        nodeBorder: '#38bdf8',
        clusterBkg: 'rgba(30, 41, 59, 0.5)',
        clusterBorder: '#475569',
        titleColor: '#f1f5f9',
        edgeLabelBackground: '#0f172a',
    }
});

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ code, colorPalette }) => {
    const [svg, setSvg] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [renderKey, setRenderKey] = useState(0); // To force color re-randomization

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
                
                // Force transparency on the SVG root
                const svgElement = doc.documentElement;
                svgElement.setAttribute('style', 'background-color: transparent !important; max-width: 100%;');
                
                // Select all shapes that represent nodes (rectangles, circles, rhombuses/polygons, ellipses)
                const shapes = doc.querySelectorAll('.node rect, .node circle, .node polygon, .node path, .node ellipse');

                // Determine which palette to use
                const paletteToUse = colorPalette && colorPalette.length > 0 ? colorPalette : NEON_COLORS;

                shapes.forEach((shape) => {
                    // Pick a random color from the palette for EACH node
                    const color = paletteToUse[Math.floor(Math.random() * paletteToUse.length)];
                    
                    // Apply styles directly to the SVG element
                    shape.setAttribute('fill', color.bg);
                    shape.setAttribute('stroke', color.border);
                    shape.setAttribute('stroke-width', '2');
                });

                // Style Subgraphs (Clusters)
                const clusters = doc.querySelectorAll('.cluster rect');
                clusters.forEach((cluster) => {
                    cluster.setAttribute('fill', 'rgba(30, 41, 59, 0.3)'); // Very transparent slate
                    cluster.setAttribute('stroke', '#475569'); // slate-600
                    cluster.setAttribute('stroke-width', '1');
                    cluster.setAttribute('stroke-dasharray', '4 4');
                });
                
                // Style Lines/Edges
                const edges = doc.querySelectorAll('.edgePath path');
                edges.forEach((edge) => {
                    edge.setAttribute('stroke', '#64748b');
                    edge.setAttribute('stroke-width', '1.5');
                });

                setSvg(doc.documentElement.outerHTML);

            } catch (err) {
                console.error("Mermaid Render Error:", err);
                setError("Failed to render diagram. The AI generated invalid syntax.");
            }
        };

        renderDiagram();
    }, [code, colorPalette, renderKey]);

    const toggleExpand = () => setIsExpanded(!isExpanded);
    const randomizeColors = () => setRenderKey(prev => prev + 1);

    return (
        <div className={`relative bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden transition-all duration-300 ${isExpanded ? 'fixed inset-4 z-[60] shadow-2xl flex flex-col border-blue-500/30 bg-slate-950' : 'w-full my-6'}`}>
            <div className="absolute top-3 right-3 z-10 flex space-x-2">
                 <button 
                    onClick={randomizeColors}
                    className="p-2 bg-slate-800/80 hover:bg-slate-700 backdrop-blur-sm rounded-lg text-slate-400 hover:text-white transition-colors border border-slate-700"
                    title="Randomize Colors"
                 >
                    <RefreshCcw className="w-4 h-4" />
                 </button>
                 <button 
                    onClick={toggleExpand}
                    className="p-2 bg-slate-800/80 hover:bg-slate-700 backdrop-blur-sm rounded-lg text-slate-400 hover:text-white transition-colors border border-slate-700"
                    title={isExpanded ? "Minimize" : "Maximize"}
                 >
                    {isExpanded ? <ZoomIn className="w-5 h-5 rotate-180" /> : <Maximize2 className="w-4 h-4" />}
                 </button>
            </div>

            <div className={`p-6 overflow-auto flex items-center justify-center min-h-[300px] ${isExpanded ? 'flex-1' : ''}`}>
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
                        className="w-full h-full flex justify-center items-center mermaid-svg-container"
                        style={{ minWidth: '100%' }}
                    />
                ) : (
                    <div className="flex flex-col items-center text-slate-500 animate-pulse">
                        <div className="flex space-x-2 mb-3">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-75"></div>
                            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-150"></div>
                        </div>
                        <span className="text-sm font-mono text-cyan-400/70">Rendering Diagram...</span>
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