import React, { useRef, useEffect, useState } from 'react';
import { Terminal, PauseCircle, PlayCircle, Loader2, BrainCircuit, Zap, CheckCircle, AlertCircle, Info, Lightbulb, Sparkles, Bot, Activity } from 'lucide-react';
import { useAgent } from '../context/AgentContext';
import { fixUtf8Mojibake } from '../utils/agentUtils';

const LiveTerminal: React.FC = () => {
    const { thoughts, isAgentRunning, toggleAgent } = useAgent();
    const terminalRef = useRef<HTMLDivElement>(null);
    const [isGeminiConfigured, setIsGeminiConfigured] = useState(false);

    useEffect(() => {
        const syncGeminiConfig = () => {
            const key = (localStorage.getItem('geminiApiKey') || localStorage.getItem('apiKey') || '').trim();
            setIsGeminiConfigured(!!key);
        };

        syncGeminiConfig();
        window.addEventListener('storage', syncGeminiConfig);
        return () => window.removeEventListener('storage', syncGeminiConfig);
    }, []);

    // Scroll to top when new thoughts arrive
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [thoughts]);

    return (
        <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-[450px] relative border-indigo-500/10 group bg-white/40 dark:bg-slate-800/60 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>

            <div className="p-4 border-b border-white/20 dark:border-slate-700 bg-white/40 dark:bg-slate-800/80 backdrop-blur-md flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                    <div className={`relative flex items-center justify-center`}>
                        <div className={`absolute inset-0 rounded-full blur-md opacity-40 ${isAgentRunning ? 'bg-indigo-500 animate-pulse' : 'bg-slate-400'}`}></div>
                        <div className={`w-3 h-3 rounded-full relative z-10 ${isAgentRunning ? 'bg-indigo-600' : 'bg-slate-500'}`}></div>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                            <BrainCircuit size={16} className="text-indigo-600 animate-pulse-slow" />
                            AJAN ZİHİN AKIŞI
                        </h3>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-[0.2em]">{isAgentRunning ? 'Aktif İşlem İşleniyor' : 'Sistem Beklemede'}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="hidden sm:flex flex-col items-end mr-2">
                        <span className="text-[9px] font-bold text-slate-400 uppercase">Model</span>
                        <span className="text-[11px] font-bold text-indigo-600">Gemini 3 Flash</span>
                    </div>
                    <button
                        onClick={toggleAgent}
                        className={`premium-button flex items-center gap-2 text-xs py-1.5 px-3 ${isAgentRunning ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                    >
                        {isAgentRunning ? <PauseCircle size={14} /> : <PlayCircle size={14} />}
                        {isAgentRunning ? 'Durdur' : 'Başlat'}
                    </button>
                </div>
            </div>

            <div
                ref={terminalRef}
                className="flex-1 overflow-y-auto p-6 space-y-4 relative custom-scrollbar bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] scroll-smooth"
            >
                {thoughts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-500 space-y-4 animate-fade-in py-20">
                        <div className="w-16 h-16 rounded-2xl bg-white/50 dark:bg-slate-700/50 border border-white/20 dark:border-slate-600 flex items-center justify-center animate-float shadow-sm">
                            <Bot size={32} className="opacity-20" />
                        </div>
                        <p className="text-sm italic font-medium px-4 text-center dark:text-slate-400">Otopilotu başlatarak ajan zihnini izleyin...</p>
                    </div>
                ) : (
                    thoughts.slice().reverse().map((thought, idx) => (
                        <div
                            key={thought.id}
                            className={`flex gap-4 group animate-slide-in-right relative pb-1 ${idx !== 0 ? 'opacity-70 transition-opacity hover:opacity-100' : ''}`}
                        >
                            {/* Timeline Line */}
                            {idx !== thoughts.length - 1 && (
                                <div className="absolute left-[11px] top-6 -bottom-10 w-[2px] bg-slate-200/50 group-last:hidden"></div>
                            )}

                            <div className={`mt-1 w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 relative z-10 transition-transform group-hover:scale-110 shadow-sm ${thought.type === 'decision' ? 'bg-purple-100 text-purple-600' :
                                thought.type === 'action' ? 'bg-blue-100 text-blue-600' :
                                    thought.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                                        thought.type === 'error' ? 'bg-rose-100 text-rose-600' :
                                            thought.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                                                thought.type === 'learning' ? 'bg-indigo-100 text-indigo-600' :
                                                    'bg-slate-100 text-slate-500'
                                }`}>
                                {thought.type === 'decision' && <Zap size={12} />}
                                {thought.type === 'action' && <Activity size={12} />}
                                {thought.type === 'success' && <CheckCircle size={12} />}
                                {thought.type === 'error' && <AlertCircle size={12} />}
                                {thought.type === 'warning' && <Info size={12} />}
                                {thought.type === 'learning' && <Sparkles size={12} />}
                                {(thought.type === 'analysis' || thought.type === 'info' || thought.type === 'wait') && <Lightbulb size={12} />}
                            </div>

                            <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${thought.type === 'error' ? 'text-rose-600' :
                                        thought.type === 'success' ? 'text-emerald-600' :
                                            thought.type === 'decision' ? 'text-purple-600' :
                                                'text-slate-500'
                                        }`}>
                                        {thought.type}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-mono">{thought.timestamp}</span>
                                </div>
                                <div className="p-3 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-white/50 dark:border-slate-600 shadow-sm group-hover:shadow-md transition-all group-hover:border-indigo-100/50 dark:group-hover:border-indigo-900/50 backdrop-blur-sm">
                                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                                        {fixUtf8Mojibake(thought.message)}
                                    </p>
                                    {thought.metadata && Object.keys(thought.metadata).length > 0 && (
                                        <div className="mt-2 pt-2 border-t border-slate-100/30 flex flex-wrap gap-2 text-[10px] text-slate-500 font-mono">
                                            {Object.entries(thought.metadata).map(([k, v]) => (
                                                <span key={k} className="bg-slate-100/50 px-1.5 py-0.5 rounded border border-white/20">
                                                    {k}: {String(v)}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default LiveTerminal;

