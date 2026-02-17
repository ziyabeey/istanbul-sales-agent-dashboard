import React, { memo } from 'react';
import {
    BarChart,
    MapPin,
    Trophy,
    TrendingUp,
    Activity,
    Info,
} from 'lucide-react';
import {
    BarChart as ReBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import EmptyState from './EmptyState';
import { DashboardStats } from '../types';

interface DashboardChartsProps {
    chartData: any[];
    stats: DashboardStats;
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({ chartData, stats }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-card rounded-2xl p-6 bg-white/60 border-indigo-500/10 hover:border-indigo-500/20 transition-all duration-300">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                            <Activity size={18} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Günlük Etkileşim Analizi</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Performans Metrikleri</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Gönderildi</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Dönüşüm</span>
                            </div>
                        </div>
                        <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-2 py-1 rounded-full uppercase tracking-widest">Son 7 Gün</span>
                    </div>
                </div>
                <div className="h-72 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <ReBarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#818cf8" stopOpacity={0.8} />
                                </linearGradient>
                                <linearGradient id="successGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#34d399" stopOpacity={0.8} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                            />
                            <Tooltip
                                cursor={{ fill: '#f8fafc' }}
                                contentStyle={{
                                    borderRadius: '16px',
                                    border: 'none',
                                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(10px)',
                                    padding: '12px'
                                }}
                                itemStyle={{ fontSize: '11px', fontWeight: 800, padding: '2px 0' }}
                                labelStyle={{ color: '#64748b', marginBottom: '8px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                            />
                            <Bar dataKey="sent" fill="url(#barGradient)" radius={[6, 6, 0, 0]} name="Mail Gönderildi" barSize={32} />
                            <Bar dataKey="response" fill="url(#successGradient)" radius={[6, 6, 0, 0]} name="Yanıt Alındı" barSize={32} />
                        </ReBarChart>
                    </ResponsiveContainer>
                    {chartData.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-[2px] z-10 rounded-2xl">
                            <EmptyState
                                title="Veri Bekleniyor"
                                description="Yeterli kampanya verisi toplandığında analiz burada görünecek."
                                icon={BarChart}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="glass-card rounded-2xl p-6 bg-white/60 border-indigo-500/10 hover:border-indigo-500/20 transition-all duration-300 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                            <MapPin size={18} />
                        </div>
                        Bölgesel Hakimiyet
                    </h3>
                    <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Detaylar</button>
                </div>

                <div className="flex-1 overflow-auto relative min-h-[250px] custom-scrollbar">
                    <table className="w-full text-sm text-left border-separate border-spacing-y-2">
                        <thead className="sticky top-0 bg-white/80 backdrop-blur-md z-10">
                            <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">
                                <th className="px-4 py-2">Bölge</th>
                                <th className="px-4 py-2">Hacim</th>
                                <th className="px-4 py-2 text-right">Dönüşüm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(stats.districtBreakdown?.length ? stats.districtBreakdown.slice(0, 8) : []).map((region, i) => (
                                <tr key={i} className="group hover:bg-white transition-all cursor-default shadow-sm hover:shadow-md rounded-xl">
                                    <td className="px-4 py-3 font-bold text-slate-700 rounded-l-xl border-y border-l border-slate-50 group-hover:border-indigo-100">{region.name}</td>
                                    <td className="px-4 py-3 text-slate-500 font-mono text-xs border-y border-slate-50 group-hover:border-indigo-100">
                                        <span className="bg-slate-50 px-2 py-0.5 rounded border border-slate-100 font-bold">{region.totalLeads}</span>
                                    </td>
                                    <td className="px-4 py-3 border-y border-r border-slate-50 group-hover:border-indigo-100 rounded-r-xl">
                                        <div className="flex items-center justify-end gap-3 text-right">
                                            <div className="hidden sm:block w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000" style={{ width: `${region.conversionRate}%` }}></div>
                                            </div>
                                            <span className="text-xs font-black text-emerald-600 min-w-[32px]">%{region.conversionRate.toFixed(0)}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {(!stats.districtBreakdown || stats.districtBreakdown.length === 0) && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/30 backdrop-blur-[2px] z-10 rounded-2xl">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 mb-2">
                                <TrendingUp size={24} />
                            </div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center max-w-[140px]">Henüz bölgesel veri toplanamadı</p>
                        </div>
                    )}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 opacity-60">
                        <Trophy size={14} className="text-yellow-600" />
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">En İyi: Beşiktaş</span>
                    </div>
                    <div className="flex items-center gap-1.5 opacity-60">
                        <Info size={14} className="text-indigo-600" />
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Canlı Veri</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(DashboardCharts);
