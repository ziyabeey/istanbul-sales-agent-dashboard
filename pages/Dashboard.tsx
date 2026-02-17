
import React, { useEffect, useState } from 'react';
import {
    MessageCircle,
    Headphones,
    Volume2,
    Loader2,
    Mail,
    Clock,
    CheckCircle,
    AlertCircle,
    Activity,
    Settings2,
    Eye,
    EyeOff,
    Layout
} from 'lucide-react';
import { api } from '../services/api';
import { learningService } from '../services/learningService';
import { DashboardStats as DashboardStatsType, Lead, MarketStrategyResult, Interaction } from '../types';
import { useAgent } from '../context/AgentContext';

// Components
import LiveTerminal from '../components/LiveTerminal';
import DashboardStats from '../components/DashboardStats';
import DashboardCharts from '../components/DashboardCharts';
import StrategyWarRoom from '../components/StrategyWarRoom';
import AiLearningInsights from '../components/AiLearningInsights';
import { DashboardSkeleton } from '../components/Skeleton';
import FunnelChart from '../components/FunnelChart';
import ROICalculator from '../components/ROICalculator';

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState<DashboardStatsType | null>(null);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [recentInteractions, setRecentInteractions] = useState<Interaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [sendingReport, setSendingReport] = useState(false);
    const [chartData, setChartData] = useState<any[]>([]);

    // Consume agentConfig and addNotification from context
    const { agentConfig, addNotification } = useAgent();

    const [briefingStatus, setBriefingStatus] = useState<'idle' | 'loading' | 'playing'>('idle');

    // Strategy State
    const [strategyResult, setStrategyResult] = useState<MarketStrategyResult | null>(null);
    const [loadingStrategy, setLoadingStrategy] = useState(false);

    // Learning Insights State
    const [aiInsights, setAiInsights] = useState<any[]>([]);

    // Widget Customization State
    const [activeWidgets, setActiveWidgets] = useState(() => {
        const stored = localStorage.getItem('dashboard-widgets');
        return stored ? JSON.parse(stored) : {
            stats: true,
            terminal: true,
            insights: true,
            strategy: true,
            charts: true,
            interactions: true
        };
    });
    const [isWidgetMenuOpen, setIsWidgetMenuOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('dashboard-widgets', JSON.stringify(activeWidgets));
    }, [activeWidgets]);

    const toggleWidget = (id: string) => {
        setActiveWidgets((prev: any) => ({ ...prev, [id]: !prev[id] }));
    };

    const normalizeStrategyResult = (raw: any): MarketStrategyResult => {
        return {
            marketAnalysis: {
                sectorDigitalMaturity: Number(raw?.marketAnalysis?.sectorDigitalMaturity ?? 5),
                regionEconomicActivity: Number(raw?.marketAnalysis?.regionEconomicActivity ?? 5),
                seasonalFactor: raw?.marketAnalysis?.seasonalFactor || 'Bilinmiyor',
                overallOpportunity: raw?.marketAnalysis?.overallOpportunity || 'Orta'
            },
            idealLeadProfile: {
                companyAge: raw?.idealLeadProfile?.companyAge || '-',
                employeeCount: raw?.idealLeadProfile?.employeeCount || '-',
                estimatedRevenue: raw?.idealLeadProfile?.estimatedRevenue || '-',
                digitalMaturity: Number(raw?.idealLeadProfile?.digitalMaturity ?? 3),
                hasWebsite: Boolean(raw?.idealLeadProfile?.hasWebsite),
                reasoning: raw?.idealLeadProfile?.reasoning || 'Yeterli veri yok.'
            },
            strategyPriority: Array.isArray(raw?.strategyPriority)
                ? raw.strategyPriority.map((item: any, idx: number) => ({
                    name: item?.name || `Öneri ${idx + 1}`,
                    priority: Number(item?.priority ?? idx + 1),
                    reasoning: item?.reasoning || 'Açıklama yok.',
                    searchTerms: Array.isArray(item?.searchTerms) ? item.searchTerms : []
                }))
                : [],
            regionRotation: Array.isArray(raw?.regionRotation) ? raw.regionRotation : [],
            actionPlan: {
                nextCycle: raw?.actionPlan?.nextCycle || '-',
                expectedLeadQuality: raw?.actionPlan?.expectedLeadQuality || 'Orta',
                estimatedConversion: raw?.actionPlan?.estimatedConversion || '-'
            },
            lastUpdated: raw?.lastUpdated || new Date().toISOString()
        };
    };

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Run Cleanup First
                const cleanedCount = await api.leads.cleanupInvalidLeads();
                if (cleanedCount > 0) {
                    addNotification('Sistem Temizliği', `${cleanedCount} bozuk kayıt temizlendi.`, 'info');
                }

                const [statsData, leadsData, reportData, interactionsData] = await Promise.all([
                    api.dashboard.getStats(),
                    api.leads.getAll(),
                    api.reports.getPerformanceData(),
                    api.interactions.getRecent(10)
                ]);
                setStats(statsData);
                setLeads(leadsData);
                setRecentInteractions(interactionsData);

                const mappedChartData = reportData.weeklyTrend.map((item: any) => ({
                    name: item.name,
                    sent: item.sent,
                    response: item.response
                }));
                setChartData(mappedChartData);
                setAiInsights(learningService.getInsights());

                // Initial strategy load if we have data
                if (leadsData.length > 0) {
                    loadStrategy();
                }
            } catch (e) {
                console.error("Dashboard data load error", e);
                addNotification('Veri Hatası', 'Dashboard verileri yüklenirken bir sorun oluştu.', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const loadStrategy = async () => {
        setLoadingStrategy(true);
        try {
            // Use Agent Config for target
            const result = await api.strategy.analyzeMarket(agentConfig.targetSector, agentConfig.targetDistrict);
            setStrategyResult(normalizeStrategyResult(result));
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingStrategy(false);
        }
    };

    const handleSendReport = async () => {
        if (!stats) return;
        setSendingReport(true);
        try {
            const hotLeads = leads.filter(l => l.lead_skoru >= 4 && l.lead_durumu !== 'olumlu').slice(0, 5);
            const result = await api.whatsapp.sendReport(stats, hotLeads);

            if (result.status === 'cancelled') return;

            const isWebMode = result.status === 'fallback_web';

            await api.dashboard.logAction(
                'WhatsApp Raporu',
                isWebMode ? 'WhatsApp Web açıldı (Manuel)' : 'API ile iletildi',
                'success'
            );

            if (isWebMode) {
                addNotification('WhatsApp Web', "WhatsApp Web açıldı. Lütfen 'Gönder' butonuna basın.", 'info');
            } else {
                addNotification('Başarılı', "Rapor API üzerinden gönderildi!", 'success');
            }
        } catch (error) {
            console.error(error);
            addNotification('Hata', "Rapor gönderimi başarısız.", 'error');
        } finally {
            setSendingReport(false);
        }
    };

    const handlePlayBriefing = async () => {
        setBriefingStatus('loading');
        try {
            await (api.briefing.generateAndPlay as any)();
            setBriefingStatus('playing');
            setTimeout(() => setBriefingStatus('idle'), 15000);
        } catch (error) {
            console.error(error);
            addNotification('Hata', "Brifing oluşturulamadı.", 'error');
            setBriefingStatus('idle');
        }
    };

    // Helper to find lead name by id
    const getLeadName = (id: string) => {
        const l = leads.find(lead => lead.id === id);
        return l ? l.firma_adi : 'Bilinmeyen Firma';
    };

    if (loading) {
        return <DashboardSkeleton />;
    }

    if (!stats) return null;

    return (
        <div className="space-y-6 animate-fade-in pb-12">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight uppercase">Genel Bakış</h2>
                    <div className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold rounded-md border border-indigo-100 dark:border-indigo-800 uppercase tracking-widest">Canlı Kontrol</div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <button
                            onClick={() => setIsWidgetMenuOpen(!isWidgetMenuOpen)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border ${isWidgetMenuOpen ? 'bg-indigo-50 border-indigo-200 text-indigo-600 shadow-inner' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                                }`}
                        >
                            <Settings2 size={16} />
                            <span className="hidden sm:inline">Widget Ayarları</span>
                        </button>

                        {isWidgetMenuOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsWidgetMenuOpen(false)}></div>
                                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 z-20 animate-fade-in origin-top-right">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <Layout size={12} /> Görünüm Ayarları
                                    </div>
                                    <div className="space-y-1.5">
                                        {[
                                            { id: 'stats', label: 'İstatistik Özeti' },
                                            { id: 'terminal', label: 'Ajan Terminali' },
                                            { id: 'insights', label: 'Yapay Zeka Öğrenimi' },
                                            { id: 'strategy', label: 'Savaş Odası' },
                                            { id: 'charts', label: 'Performans Grafikleri' },
                                            { id: 'interactions', label: 'Son İletiler' }
                                        ].map(w => (
                                            <button
                                                key={w.id}
                                                onClick={() => toggleWidget(w.id)}
                                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeWidgets[w.id] ? 'bg-indigo-50/50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                                                    }`}
                                            >
                                                <span>{w.label}</span>
                                                {activeWidgets[w.id] ? <Eye size={14} /> : <EyeOff size={14} className="opacity-50" />}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                                        <p className="text-[9px] text-slate-400 text-center font-medium italic">Ayarlar otomatik olarak kaydedilir.</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <button
                        onClick={handlePlayBriefing}
                        disabled={briefingStatus !== 'idle'}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all border ${briefingStatus === 'playing' ? 'bg-rose-100 text-rose-700 animate-pulse border border-rose-200' :
                            'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                            }`}
                    >
                        {briefingStatus === 'loading' ? <Loader2 size={16} className="animate-spin" /> :
                            briefingStatus === 'playing' ? <Volume2 size={16} /> : <Headphones size={16} />}
                        <span className="hidden sm:inline">{briefingStatus === 'loading' ? 'Hazırlanıyor...' : briefingStatus === 'playing' ? 'Çalıyor...' : 'Günlük Brifing'}</span>
                    </button>

                    <button
                        onClick={handleSendReport}
                        disabled={sendingReport}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-500/10 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {sendingReport ? <Loader2 size={16} className="animate-spin" /> : <MessageCircle size={16} />}
                        <span className="hidden sm:inline">{sendingReport ? 'Hazırlanıyor...' : 'WP Raporu'}</span>
                    </button>
                </div>
            </div>

            {activeWidgets.stats && <DashboardStats stats={stats} />}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column: Terminal & Insights */}
                <div className="lg:col-span-2 space-y-6">
                    {activeWidgets.terminal && <LiveTerminal />}
                    {activeWidgets.insights && <AiLearningInsights aiInsights={aiInsights} />}
                </div>

                {/* Right Column: Strategy War Room */}
                {activeWidgets.strategy && (
                    <div className="space-y-6">
                        <StrategyWarRoom
                            strategyResult={strategyResult}
                            loadingStrategy={loadingStrategy}
                            loadStrategy={loadStrategy}
                            agentConfig={agentConfig}
                        />
                        {/* NEW ANALYTICS WIDGETS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FunnelChart stats={stats} />
                            <ROICalculator stats={stats} />
                        </div>
                    </div>
                )}
            </div>

            {activeWidgets.charts && <DashboardCharts chartData={chartData} stats={stats} />}

            {/* Recent Emails Log */}
            {activeWidgets.interactions && (
                <div className="glass-card rounded-2xl border-indigo-500/10 p-6 shadow-xl bg-white/40 dark:bg-slate-900/40">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                                <Mail size={18} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm uppercase tracking-wider">Son Gönderilen İletiler</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Etkileşim Geçmişi</p>
                            </div>
                        </div>
                        <span className="text-[10px] font-black text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full uppercase tracking-widest">Son 10 İşlem</span>
                    </div>
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-sm text-left border-separate border-spacing-y-2">
                            <thead>
                                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">
                                    <th className="px-4 py-2">Saat</th>
                                    <th className="px-4 py-2">Firma (Lead)</th>
                                    <th className="px-4 py-2">Konu / İçerik</th>
                                    <th className="px-4 py-2 text-right">Durum</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentInteractions.filter(i => i.type === 'email').length > 0 ? (
                                    recentInteractions.filter(i => i.type === 'email').map((interaction) => (
                                        <tr key={interaction.id} className="group hover:bg-white dark:hover:bg-slate-800 transition-all cursor-default shadow-sm hover:shadow-md rounded-xl">
                                            <td className="px-4 py-4 text-slate-400 text-[10px] font-bold rounded-l-xl border-y border-l border-slate-50 dark:border-slate-800 group-hover:border-indigo-100 dark:group-hover:border-indigo-900 uppercase tracking-tighter">
                                                <div className="flex items-center gap-2">
                                                    <Clock size={12} className="text-indigo-400" />
                                                    <span>{interaction.time}</span>
                                                    <span className="opacity-50">• {new Date(interaction.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 font-black text-slate-800 dark:text-slate-200 border-y border-slate-50 dark:border-slate-800 group-hover:border-indigo-100 dark:group-hover:border-indigo-900">
                                                {getLeadName(interaction.leadId)}
                                            </td>
                                            <td className="px-4 py-4 text-slate-600 dark:text-slate-400 text-xs border-y border-slate-50 dark:border-slate-800 group-hover:border-indigo-100 dark:group-hover:border-indigo-900 truncate max-w-[400px]" title={interaction.summary}>
                                                {interaction.summary}
                                            </td>
                                            <td className="px-4 py-4 border-y border-r border-slate-50 dark:border-slate-800 group-hover:border-indigo-100 dark:group-hover:border-indigo-900 rounded-r-xl text-right">
                                                <div className="flex justify-end">
                                                    <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase flex items-center gap-1.5 shadow-sm border ${interaction.status === 'sent' || interaction.status === 'delivered' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800' :
                                                        interaction.status === 'read' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-800' :
                                                            interaction.status === 'failed' ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-800' :
                                                                'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-100 dark:border-slate-700'
                                                        }`}>
                                                        {interaction.status === 'sent' && <CheckCircle size={10} />}
                                                        {interaction.status === 'failed' && <AlertCircle size={10} />}
                                                        {interaction.status === 'read' && <Activity size={10} />}
                                                        {interaction.status === 'sent' ? 'İLETİLDİ' :
                                                            interaction.status === 'failed' ? 'BAŞARISIZ' :
                                                                interaction.status === 'read' ? 'OKUNDU' : interaction.status.toUpperCase()}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-4 py-12 text-center">
                                            <div className="opacity-20 flex flex-col items-center">
                                                <Mail size={48} className="mb-2" />
                                                <p className="text-xs font-bold uppercase tracking-widest">Henüz mail gönderimi yapılmadı</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
