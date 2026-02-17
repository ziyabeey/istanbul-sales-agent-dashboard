import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { DashboardStats } from '../types';

interface FunnelChartProps {
    stats: DashboardStats;
}

const FunnelChart: React.FC<FunnelChartProps> = ({ stats }) => {
    // Default data if stats are missing
    const data = [
        { name: 'Lead', value: stats.lead_sayisi || 0, color: '#6366f1' }, // Indigo-500
        { name: 'İletilen', value: stats.mail_gonderildi || 0, color: '#8b5cf6' }, // Purple-500
        { name: 'Yanıt', value: stats.geri_donus || 0, color: '#ec4899' }, // Pink-500
        { name: 'Sıcak', value: stats.sicak_leadler || 0, color: '#f43f5e' }, // Rose-500
    ];

    // Calculate conversion rates
    const total = data[0].value || 1;
    const rates = data.map((item, index) => {
        if (index === 0) return 100;
        const prev = data[index - 1].value || 1;
        return Math.round((item.value / prev) * 100);
    });

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Satış Hunisi</h3>
            <p className="text-xs text-slate-500 mb-6">Lead'den satışa dönüşüm yolculuğu.</p>

            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        barSize={30}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="name"
                            type="category"
                            tick={{ fontSize: 12, fill: '#64748b', fontWeight: 'bold' }}
                            width={60}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="flex justify-between mt-4 px-2">
                {rates.map((rate, idx) => (
                    <div key={idx} className="text-center">
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{idx === 0 ? 'Başlangıç' : 'Dönüşüm'}</div>
                        <div className={`text-sm font-black ${idx === 0 ? 'text-slate-300' : 'text-slate-800 dark:text-slate-200'}`}>
                            {idx === 0 ? '-' : `%${rate}`}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FunnelChart;
