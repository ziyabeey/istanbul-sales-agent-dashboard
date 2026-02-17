import React, { memo } from 'react';
import { Sparkles, TrendingUp, TrendingDown, BrainCircuit } from 'lucide-react';

interface AiLearningInsightsProps {
    aiInsights: any[];
}

const AiLearningInsights: React.FC<AiLearningInsightsProps> = ({ aiInsights }) => {
    return (
        <div className="glass-card rounded-2xl border-white/20 p-6 text-white relative overflow-hidden h-full min-h-[250px] flex flex-col"
            style={{
                background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.9) 0%, rgba(147, 51, 234, 0.9) 100%)',
                boxShadow: '0 20px 25px -5px rgba(79, 70, 229, 0.3)'
            }}>
            {/* Animated Glow Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full -mr-32 -mt-32 animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400/20 blur-[60px] rounded-full -ml-16 -mb-16"></div>

            <div className="flex items-center justify-between mb-6 relative z-10">
                <h3 className="font-bold text-lg flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md border border-white/10">
                        <Sparkles size={20} className="text-yellow-300 animate-pulse" />
                    </div>
                    <span>Yapay Zeka Öğrenimi</span>
                </h3>
                <span className="text-[10px] bg-white/10 px-2 py-1 rounded-full border border-white/20 font-bold tracking-wider uppercase">Otomatik Optimizasyon</span>
            </div>

            {aiInsights.length > 0 ? (
                <div className="space-y-4 relative z-10 flex-1">
                    {aiInsights.slice(0, 3).map((insight, idx) => (
                        <div key={idx} className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-[1.02] cursor-default group">
                            <div className={`p-3 rounded-xl backdrop-blur-md shadow-inner ${insight.type === 'positive' ? 'bg-emerald-400/20 text-emerald-300' : 'bg-rose-400/20 text-rose-300'}`}>
                                {insight.type === 'positive' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-white leading-snug group-hover:text-yellow-100 transition-colors uppercase tracking-tight">{insight.message}</p>
                                <div className="flex items-center gap-2 mt-1.5 opacity-70">
                                    <span className="text-[10px] font-mono">{new Date(insight.timestamp).toLocaleTimeString()}</span>
                                    <span className="w-1 h-1 rounded-full bg-white/30"></span>
                                    <span className="text-[10px] font-bold">Etki: {insight.impact}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center py-6 text-indigo-100 text-sm relative z-10">
                    <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 animate-float">
                        <BrainCircuit size={40} className="opacity-40" />
                    </div>
                    <p className="max-w-[200px] text-center font-medium opacity-80 leading-relaxed">
                        Henüz yeterli veri yok. Satış yaptıkça yapay zeka stratejiyi güncelleyecek.
                    </p>
                </div>
            )}

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-center relative z-10">
                <button className="text-[10px] font-bold text-white/60 hover:text-white transition-colors flex items-center gap-1 uppercase tracking-widest">
                    Tüm Analizleri Gör
                </button>
            </div>
        </div>
    );
};

export default memo(AiLearningInsights);
