import React, { memo } from 'react';
import {
    BrainCircuit,
    Loader2,
    RefreshCw,
    Target,
    Search,
    Users,
    Activity,
    Shield,
    ChevronRight,
} from 'lucide-react';
import { AgentConfig, MarketStrategyResult } from '../types';

interface StrategyWarRoomProps {
    strategyResult: MarketStrategyResult | null;
    loadingStrategy: boolean;
    loadStrategy: () => void;
    agentConfig: AgentConfig;
}

const StrategyWarRoom: React.FC<StrategyWarRoomProps> = ({ strategyResult, loadingStrategy, loadStrategy, agentConfig }) => {
    return (
        <div className="glass-card rounded-2xl overflow-hidden group h-[450px] flex flex-col relative border-indigo-500/10 shadow-2xl bg-white/40 dark:bg-slate-800/60">
            {/* Animated Background Element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[40px] rounded-full -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-colors"></div>

            {/* Header */}
            <div className="p-4 bg-white/60 dark:bg-slate-800/80 backdrop-blur-md border-b border-indigo-500/10 dark:border-slate-700 flex justify-between items-center relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-500/20">
                        <Shield size={18} />
                    </div>
                    <div>
                        <h3 className="text-sm font-black flex items-center gap-2 text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                            Savaş Odası
                        </h3>
                        <p className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.1em]">{agentConfig.targetDistrict} • {agentConfig.targetSector}</p>
                    </div>
                </div>
                <button
                    onClick={loadStrategy}
                    disabled={loadingStrategy}
                    className="p-2 hover:bg-indigo-50 rounded-xl transition-all text-indigo-600 border border-transparent hover:border-indigo-100 disabled:opacity-50"
                >
                    {loadingStrategy ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 relative z-10 custom-scrollbar">
                {strategyResult ? (
                    <>
                        {/* Market Scores */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/50 p-4 rounded-2xl border border-white transition-all hover:shadow-md group/item">
                                <div className="text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Dijital Olgunluk</div>
                                <div className="text-2xl font-black text-indigo-600 flex items-baseline gap-1">
                                    {strategyResult.marketAnalysis.sectorDigitalMaturity}
                                    <span className="text-xs text-slate-300">/10</span>
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 mt-3 rounded-full overflow-hidden shadow-inner">
                                    <div className="bg-indigo-500 h-full transition-all duration-1000 group-hover/item:bg-indigo-600" style={{ width: `${strategyResult.marketAnalysis.sectorDigitalMaturity * 10}%` }}></div>
                                </div>
                            </div>
                            <div className="bg-white/50 p-4 rounded-2xl border border-white transition-all hover:shadow-md group/item">
                                <div className="text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Ekon. Aktivite</div>
                                <div className="text-2xl font-black text-emerald-600 flex items-baseline gap-1">
                                    {strategyResult.marketAnalysis.regionEconomicActivity}
                                    <span className="text-xs text-slate-300">/10</span>
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 mt-3 rounded-full overflow-hidden shadow-inner">
                                    <div className="bg-emerald-500 h-full transition-all duration-1000 group-hover/item:bg-emerald-600" style={{ width: `${strategyResult.marketAnalysis.regionEconomicActivity * 10}%` }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Top Strategy */}
                        {strategyResult.strategyPriority[0] && (
                            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-5 rounded-2xl border border-white shadow-xl shadow-indigo-500/20 relative overflow-hidden group/strat">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 blur-2xl rounded-full -mr-12 -mt-12"></div>
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-md">
                                                <Target size={16} className="text-white" />
                                            </div>
                                            <h4 className="text-xs font-black text-white uppercase tracking-wider">
                                                ÖNCELİKLİ STRATEJİ
                                            </h4>
                                        </div>
                                        <span className="text-[10px] bg-white text-indigo-600 px-2 py-0.5 rounded-full font-black shadow-sm">#{strategyResult.strategyPriority[0].priority}</span>
                                    </div>
                                    <h5 className="text-sm font-bold text-white mb-2 leading-tight">
                                        {strategyResult.strategyPriority[0].name}
                                    </h5>
                                    <p className="text-[11px] text-indigo-100 mb-4 leading-relaxed font-medium">
                                        {strategyResult.strategyPriority[0].reasoning}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {strategyResult.strategyPriority[0].searchTerms.map((term, idx) => (
                                            <span key={idx} className="text-[9px] bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded-lg backdrop-blur-md border border-white/10 flex items-center gap-1 transition-colors cursor-default">
                                                <Search size={8} /> {term}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ICP Card */}
                        <div className="bg-white/50 p-5 rounded-2xl border border-white">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-widest">
                                <Users size={12} className="text-orange-500" /> İdeal Müşteri Profili (ICP)
                            </h4>
                            <div className="grid grid-cols-2 gap-4 text-xs">
                                <div className="space-y-1">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase">Şirket Yaşı</span>
                                    <p className="font-bold text-slate-700">{strategyResult.idealLeadProfile.companyAge}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase">Çalışan Sayısı</span>
                                    <p className="font-bold text-slate-700">{strategyResult.idealLeadProfile.employeeCount}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase">Tahmini Ciro</span>
                                    <p className="font-bold text-slate-700">{strategyResult.idealLeadProfile.estimatedRevenue}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase">Web Varlığı</span>
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-1.5 h-1.5 rounded-full ${strategyResult.idealLeadProfile.hasWebsite ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                                        <p className={`font-bold ${strategyResult.idealLeadProfile.hasWebsite ? 'text-emerald-600' : 'text-rose-600'}`}>
                                            {strategyResult.idealLeadProfile.hasWebsite ? 'Yüksek' : 'Düşük'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Next Move */}
                        <button className="w-full bg-slate-900 group/btn p-4 rounded-2xl border border-slate-800 flex justify-between items-center transition-all hover:bg-indigo-950 hover:border-indigo-800">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex flex-col items-center justify-center border border-emerald-500/20">
                                    <span className="text-[10px] font-black text-emerald-400">%{strategyResult.actionPlan.estimatedConversion.replace('%', '')}</span>
                                </div>
                                <div className="text-left">
                                    <div className="text-[10px] text-slate-500 group-hover/btn:text-indigo-300 uppercase font-black tracking-widest transition-colors">Yapay Zeka Tahmini</div>
                                    <div className="text-xs font-bold text-white uppercase tracking-wide">Beklenen Dönüşüm Oranı</div>
                                </div>
                            </div>
                            <ChevronRight size={16} className="text-slate-600 group-hover/btn:text-indigo-400 group-hover/btn:translate-x-1 transition-all" />
                        </button>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
                        <div className="w-20 h-20 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center animate-float">
                            <BrainCircuit size={40} className="text-slate-300" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-1">Strateji Bekleniyor</p>
                            <p className="text-xs text-slate-400 max-w-[180px] mx-auto leading-relaxed">Pazar verilerini analiz etmek için düğmeye basın.</p>
                        </div>
                        <button
                            onClick={loadStrategy}
                            className="premium-button bg-indigo-600 text-white text-xs px-6 py-2.5"
                        >
                            Analizi Başlat
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(StrategyWarRoom);
