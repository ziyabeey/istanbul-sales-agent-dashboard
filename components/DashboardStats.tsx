import React, { memo } from 'react';
import { Building2, ArrowUpRight, Mail, Flame, DollarSign, Target, TrendingUp, Zap } from 'lucide-react';
import { DashboardStats as DashboardStatsType } from '../types';

interface DashboardStatsProps {
    stats: DashboardStatsType;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] cursor-default border-indigo-500/10 hover:border-indigo-500/30">
                <div className="flex items-center justify-between">
                    <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-600 shadow-inner">
                        <Building2 size={24} />
                    </div>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full flex items-center gap-1 border border-indigo-100 uppercase tracking-wider">
                        <Target size={12} /> Hedef: %{stats.hedef_orani}
                    </span>
                </div>
                <div className="mt-5">
                    <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">Taranan Firma</h3>
                    <p className="text-4xl font-black text-slate-900 mt-1 tracking-tighter premium-gradient-text">{stats.taranan_firma}</p>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full mt-5 overflow-hidden shadow-inner">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${stats.hedef_orani}%` }}></div>
                </div>
            </div>

            <div className="glass-card rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] cursor-default border-blue-500/10 hover:border-blue-500/30">
                <div className="flex items-center justify-between">
                    <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-600 shadow-inner">
                        <Mail size={24} />
                    </div>
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                {String.fromCharCode(64 + i)}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-5">
                    <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">Mail Gönderildi</h3>
                    <p className="text-4xl font-black text-slate-900 mt-1 tracking-tighter">{stats.mail_gonderildi}</p>
                </div>
                <div className="mt-5 flex items-center justify-between text-[11px] font-bold text-slate-400">
                    <span className="flex items-center gap-1"><Zap size={12} className="text-blue-500" /> {stats.lead_sayisi} Aktif Lead</span>
                    <span className="text-blue-600">Bugün</span>
                </div>
            </div>

            <div className="glass-card rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer border-orange-500/10 hover:border-orange-500/30 group relative overflow-hidden bg-white/60">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[40px] rounded-full -mr-16 -mt-16 transition-opacity group-hover:opacity-100 opacity-50"></div>
                <div className="flex items-center justify-between relative z-10">
                    <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-600 shadow-inner">
                        <Flame size={24} className="group-hover:animate-bounce" />
                    </div>
                    <span className="text-[10px] font-black text-white bg-orange-500 px-2 py-1 rounded-full animate-pulse shadow-lg shadow-orange-500/40">
                        KRİTİK
                    </span>
                </div>
                <div className="mt-5 relative z-10">
                    <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">Sıcak Lead</h3>
                    <p className="text-4xl font-black text-slate-900 mt-1 tracking-tighter">{stats.sicak_leadler}</p>
                </div>
                <button className="mt-5 w-full py-2 bg-orange-50 text-orange-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all transform active:scale-95 border border-orange-200">
                    Hemen Aksiyon Al
                </button>
            </div>

            <div className="glass-card rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] cursor-default border-emerald-500/10 hover:border-emerald-500/30">
                <div className="flex items-center justify-between">
                    <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-600 shadow-inner">
                        <DollarSign size={24} />
                    </div>
                    <TrendingUp size={24} className="text-emerald-500 opacity-40 animate-pulse-slow" />
                </div>
                <div className="mt-5">
                    <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">Tahmini Maliyet</h3>
                    <p className="text-4xl font-black text-slate-900 mt-1 tracking-tighter">${stats.toplam_maliyet.toFixed(4)}</p>
                </div>
                <div className="mt-5 p-2 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
                    <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Yapay Zeka Optimize Edildi</span>
                </div>
            </div>
        </div>
    );
};

export default memo(DashboardStats);
