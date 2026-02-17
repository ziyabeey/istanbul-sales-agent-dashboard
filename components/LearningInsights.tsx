import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, TrendingDown, Target, Shuffle, Zap, BarChart3, RefreshCw, Trash2 } from 'lucide-react';
import { rewardEngine, REWARD_VALUES, RewardEvent } from '../services/rewardEngine';
import { qTable } from '../services/qTable';
import { storage } from '../services/storage';

const REWARD_LABELS: Record<RewardEvent, string> = {
    email_replied: 'Mail Yanıtı',
    status_olumlu: 'Olumlu Dönüş',
    status_teklif: 'Teklif Gönderildi',
    status_takipte: 'Takibe Alındı',
    status_olumsuz: 'Olumsuz',
    no_response_7d: '7 Gün Yanıtsız',
    no_response_14d: '14 Gün Yanıtsız',
    no_response_21d: '21 Gün Yanıtsız',
    re_engagement_sent: 'Yeniden Temas',
    bounce: 'Bounce/Hata',
    manual_approve: 'Manuel Onay'
};

const LearningInsights: React.FC = () => {
    const [, setRefresh] = useState(0);
    const forceRefresh = () => setRefresh(n => n + 1);

    const meta = qTable.getMeta();
    const trend = rewardEngine.getRewardTrend(7);
    const topPerformers = qTable.getTopPerformers(5);
    const worstPerformers = qTable.getWorstPerformers(5);
    const explorationRatio = qTable.getExplorationRatio();
    const sectorStats = qTable.getSectorStats();
    const recentHistory = qTable.getRecentHistory(15);
    const insights = rewardEngine.getLearningInsightsSummary();
    const templates = storage.getTemplates();
    const needEvolution = rewardEngine.getTemplatesNeedingEvolution();

    // Build template name lookup
    const tplNames: Record<string, string> = {};
    templates.forEach(t => { tplNames[t.id] = t.name; });
    const tplName = (id: string) => tplNames[id] || id.slice(0, 8) + '...';

    // Total reward in last 7 days
    const totalReward7d = trend.reduce((s, d) => s + d.totalReward, 0);
    const totalEvents7d = trend.reduce((s, d) => s + d.count, 0);

    const handleReset = () => {
        if (confirm('Tüm öğrenme verileri sıfırlansın mı? Bu geri alınamaz.')) {
            rewardEngine.reset();
            forceRefresh();
        }
    };

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
                        <Brain size={22} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Öğrenme Paneli</h2>
                        <p className="text-xs text-slate-500">Reinforcement Learning verileri ve analizler</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={forceRefresh} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                        <RefreshCw size={16} />
                    </button>
                    <button onClick={handleReset} className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Sıfırla">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                    <p className="text-xs text-slate-500 mb-1">Toplam Öğrenme</p>
                    <p className="text-2xl font-bold text-slate-800">{meta.totalActions}</p>
                    <p className="text-xs text-slate-400">olay</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                    <p className="text-xs text-slate-500 mb-1">Son 7 Gün</p>
                    <p className={`text-2xl font-bold ${totalReward7d >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                        {totalReward7d >= 0 ? '+' : ''}{totalReward7d.toFixed(1)}
                    </p>
                    <p className="text-xs text-slate-400">{totalEvents7d} olay</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                    <p className="text-xs text-slate-500 mb-1">Explore Oranı</p>
                    <p className="text-2xl font-bold text-amber-600">
                        %{Math.round(explorationRatio.ratio * 100)}
                    </p>
                    <p className="text-xs text-slate-400">{explorationRatio.explore}E/{explorationRatio.exploit}X</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                    <p className="text-xs text-slate-500 mb-1">Sektör Sayısı</p>
                    <p className="text-2xl font-bold text-indigo-600">{Object.keys(sectorStats).length}</p>
                    <p className="text-xs text-slate-400">aktif sektör</p>
                </div>
            </div>

            {/* 7-Day Trend (Simple Bar Viz) */}
            {totalEvents7d > 0 && (
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                    <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                        <BarChart3 size={16} className="text-indigo-500" /> 7 Günlük Ödül Trendi
                    </h3>
                    <div className="flex items-end gap-1 h-20">
                        {trend.map((day, i) => {
                            const maxAbs = Math.max(...trend.map(d => Math.abs(d.totalReward)), 1);
                            const height = Math.max(4, (Math.abs(day.totalReward) / maxAbs) * 100);
                            const isPositive = day.totalReward >= 0;
                            return (
                                <div key={i} className="flex-1 flex flex-col items-center gap-1" title={`${day.date}: ${day.totalReward.toFixed(1)} (${day.count} olay)`}>
                                    <div
                                        className={`w-full rounded-t-sm transition-all ${isPositive ? 'bg-emerald-400' : 'bg-red-400'}`}
                                        style={{ height: `${height}%`, minHeight: '4px' }}
                                    />
                                    <span className="text-[9px] text-slate-400">{day.date.slice(5)}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Sector Heatmap */}
            {Object.keys(sectorStats).length > 0 && (
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                    <h3 className="text-sm font-semibold text-slate-700 mb-3">Sektör × Performans</h3>
                    <div className="space-y-2">
                        {Object.entries(sectorStats)
                            .sort(([, a], [, b]) => b.avgQ - a.avgQ)
                            .slice(0, 8)
                            .map(([sector, stat]) => {
                                const pct = Math.max(0, Math.min(100, (stat.avgQ + 1) * 50)); // Map [-1,1] to [0,100]
                                const color = stat.avgQ > 0.3 ? 'bg-emerald-500' : stat.avgQ > 0 ? 'bg-blue-500' : stat.avgQ > -0.2 ? 'bg-amber-500' : 'bg-red-500';
                                return (
                                    <div key={sector} className="flex items-center gap-3">
                                        <span className="text-xs text-slate-600 w-24 truncate" title={sector}>{sector}</span>
                                        <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                            <div className={`${color} h-full rounded-full transition-all`} style={{ width: `${pct}%` }} />
                                        </div>
                                        <span className="text-xs text-slate-500 w-16 text-right">
                                            Q:{stat.avgQ.toFixed(2)} ({stat.totalVisits})
                                        </span>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            )}

            {/* Top & Worst Performers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {topPerformers.length > 0 && (
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                        <h3 className="text-sm font-semibold text-emerald-700 mb-2 flex items-center gap-2">
                            <TrendingUp size={14} /> En İyi Performans
                        </h3>
                        <div className="space-y-1.5">
                            {topPerformers.map((p, i) => (
                                <div key={i} className="flex items-center justify-between text-xs">
                                    <span className="text-slate-600 truncate flex-1">
                                        {p.stateKey.split(':')[0]} → {tplName(p.action)}
                                    </span>
                                    <span className="text-emerald-600 font-medium ml-2">
                                        Q:{p.qValue.toFixed(2)} ({p.visits}x)
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {worstPerformers.length > 0 && worstPerformers[0].qValue < 0.3 && (
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                        <h3 className="text-sm font-semibold text-red-600 mb-2 flex items-center gap-2">
                            <TrendingDown size={14} /> Düşük Performans
                        </h3>
                        <div className="space-y-1.5">
                            {worstPerformers.filter(w => w.qValue < 0.3).map((p, i) => (
                                <div key={i} className="flex items-center justify-between text-xs">
                                    <span className="text-slate-600 truncate flex-1">
                                        {p.stateKey.split(':')[0]} → {tplName(p.action)}
                                    </span>
                                    <span className="text-red-500 font-medium ml-2">
                                        Q:{p.qValue.toFixed(2)} ({p.visits}x)
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Templates Needing Evolution */}
            {needEvolution.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-2">
                        <Zap size={14} /> Evrimleşme Önerisi
                    </h3>
                    <p className="text-xs text-amber-700 mb-2">
                        Bu şablonlar düşük performans gösteriyor ve AI ile yeni varyant üretilmesi önerilir:
                    </p>
                    <div className="space-y-1">
                        {needEvolution.map((t, i) => (
                            <div key={i} className="text-xs text-amber-800 flex items-center gap-2">
                                <span className="w-4 text-center font-medium">{i + 1}.</span>
                                <span>{t.stateKey} → {tplName(t.templateId)}</span>
                                <span className="text-red-600 font-medium">(Q:{t.qValue.toFixed(2)})</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* AI Insights */}
            {insights.length > 0 && (
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
                    <h3 className="text-sm font-semibold text-indigo-800 mb-2 flex items-center gap-2">
                        <Brain size={14} /> Öğrendiklerim
                    </h3>
                    <ul className="space-y-1">
                        {insights.map((insight, i) => (
                            <li key={i} className="text-xs text-indigo-700 flex items-start gap-2">
                                <span className="mt-1 w-1 h-1 bg-indigo-400 rounded-full flex-shrink-0" />
                                {insight}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Recent Reward History */}
            {recentHistory.length > 0 && (
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                    <h3 className="text-sm font-semibold text-slate-700 mb-3">Son Öğrenme Olayları</h3>
                    <div className="space-y-1.5 max-h-48 overflow-y-auto">
                        {[...recentHistory].reverse().map((entry, i) => {
                            const isPositive = entry.reward > 0;
                            const timeAgo = formatTimeAgo(entry.timestamp);
                            return (
                                <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-slate-50 last:border-none">
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isPositive ? 'bg-emerald-500' : 'bg-red-400'}`} />
                                        <span className="text-slate-500 w-16 flex-shrink-0">{timeAgo}</span>
                                        <span className="text-slate-700 truncate">{entry.event}</span>
                                    </div>
                                    <span className={`font-medium ml-2 ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
                                        {isPositive ? '+' : ''}{entry.reward.toFixed(1)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Empty State */}
            {meta.totalActions === 0 && (
                <div className="text-center py-12">
                    <Brain size={48} className="mx-auto text-slate-300 mb-4" />
                    <h3 className="text-lg font-medium text-slate-500">Henüz Öğrenme Verisi Yok</h3>
                    <p className="text-sm text-slate-400 mt-1">Agent çalıştıkça ve etkileşimler gerçekleştikçe RL verileri burada görünecek.</p>
                </div>
            )}
        </div>
    );
};

function formatTimeAgo(timestamp: number): string {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Şimdi';
    if (minutes < 60) return `${minutes}dk`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}sa`;
    const days = Math.floor(hours / 24);
    return `${days}g`;
}

export default LearningInsights;
