'use client';

import React, { useState, useEffect } from 'react';
import { useEsnaf } from '@/context/EsnafContext';
import { toast } from 'sonner';

type AgentLogType = 'HATA' | 'GÜNCELLEME' | 'ONAY_BEKLİYOR' | 'BİLGİ';

interface AgentLog {
    id: string;
    agentId: string;
    agentName: string;
    agentRole: string;
    agentAvatar: string;
    type: AgentLogType;
    message: string;
    actionText?: string;
    timestamp: string;
    isRead: boolean;
}

export default function AjanlarKontrolMerkezi() {
    const { esnaf } = useEsnaf();
    const [logs, setLogs] = useState<AgentLog[]>([]);
    const [filter, setFilter] = useState<'HEPSİ' | AgentLogType>('HEPSİ');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!esnaf?.id) { setLoading(false); return; }

        fetch(`/api/dashboard/bildirimler?esnafId=${esnaf.id}`, { credentials: 'include' })
            .then(r => r.ok ? r.json() : { bildirimler: [] })
            .then(data => {
                if (data.bildirimler?.length) {
                    setLogs(data.bildirimler.map((b: any, i: number) => ({
                        id: b.id || `log-${i}`,
                        agentId: b.agentId || 'system',
                        agentName: b.agentName || 'Sistem',
                        agentRole: b.agentRole || 'Bildirim',
                        agentAvatar: b.agentAvatar || '🔔',
                        type: b.type || 'BİLGİ',
                        message: b.message || b.mesaj || '',
                        actionText: b.actionText,
                        timestamp: b.timestamp || b.tarih || '',
                        isRead: b.isRead ?? false,
                    })));
                }
            })
            .catch(() => { toast.error('Ajan verileri yüklenemedi') })
            .finally(() => setLoading(false));
    }, [esnaf?.id]);

    const unreadCount = logs.filter(l => !l.isRead).length;

    const filteredLogs = logs.filter(log => {
        if (filter === 'HEPSİ') return true;
        return log.type === filter;
    });

    const markAllRead = () => {
        setLogs(logs.map(log => ({ ...log, isRead: true })));
    };

    const getTypeColor = (type: AgentLogType) => {
        switch (type) {
            case 'HATA': return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'GÜNCELLEME': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'ONAY_BEKLİYOR': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'BİLGİ': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
        }
    };

    const getTypeIcon = (type: AgentLogType) => {
        switch (type) {
            case 'HATA': return '🔴';
            case 'GÜNCELLEME': return '🟢';
            case 'ONAY_BEKLİYOR': return '🟡';
            case 'BİLGİ': return '🔵';
            default: return '⚪';
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">

            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2 text-white flex items-center gap-3">
                        🤖 Ajan Kontrol Merkezi
                    </h1>
                    <p className="text-slate-400">Arka planda sizin için çalışan 17 yapay zeka ajanının son durumları.</p>
                </div>

                <div className="flex bg-[#11111a] border border-white/10 p-1 rounded-xl">
                    <div className="px-4 py-2 border-r border-white/10 text-center">
                        <span className="block text-2xl font-black text-white">17</span>
                        <span className="text-[10px] uppercase font-bold text-slate-500">Aktif Ajan</span>
                    </div>
                    <div className="px-4 py-2 text-center">
                        <span className={`block text-2xl font-black ${unreadCount > 0 ? 'text-[#7c3aed]' : 'text-slate-500'}`}>{unreadCount}</span>
                        <span className="text-[10px] uppercase font-bold text-slate-500">Yeni Bildirim</span>
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex overflow-x-auto pb-4 mb-6 gap-2 no-scrollbar">
                {['HEPSİ', 'ONAY_BEKLİYOR', 'HATA', 'GÜNCELLEME', 'BİLGİ'].map(t => (
                    <button
                        key={t}
                        onClick={() => setFilter(t as any)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${filter === t ? 'bg-[#7c3aed] text-white' : 'bg-[#11111a] text-slate-400 hover:bg-white/5 border border-white/5'}`}
                    >
                        {t === 'HEPSİ' ? 'Tümü' : t.replace('_', ' ')}
                    </button>
                ))}
            </div>

            {/* Actions Bar */}
            <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-slate-400 font-medium">{filteredLogs.length} Kayıt Gösteriliyor</span>
                {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-sm font-bold text-[#7c3aed] hover:text-[#6d28d9] transition-colors">
                        Tümünü Okundu İşaretle ✓
                    </button>
                )}
            </div>

            {/* Loading */}
            {loading && (
                <div className="py-20 text-center">
                    <span className="text-4xl mb-3 block animate-pulse">🤖</span>
                    <p className="text-slate-400 font-medium">Ajan logları yükleniyor...</p>
                </div>
            )}

            {/* Log List */}
            {!loading && (
                <div className="space-y-4">
                    {filteredLogs.map(log => (
                        <div key={log.id} className={`p-5 rounded-2xl border transition-all ${log.isRead ? 'bg-[#11111a] border-white/5' : 'bg-[#1a1a2e] border-[#7c3aed]/30 shadow-lg shadow-[#7c3aed]/5'}`}>
                            <div className="flex gap-4">

                                {/* Avatar */}
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-2xl">
                                    {log.agentAvatar}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-1">
                                        <div>
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <span className="font-bold text-white">{log.agentName}</span>
                                                <span className="text-xs text-slate-500 px-2 py-0.5 rounded-full bg-white/5 border border-white/5">{log.agentRole}</span>
                                                {!log.isRead && <span className="w-2 h-2 rounded-full bg-[#7c3aed] animate-pulse ml-1" />}
                                            </div>
                                        </div>
                                        <span className="text-xs text-slate-500 font-medium whitespace-nowrap">{log.timestamp}</span>
                                    </div>

                                    <p className="text-slate-300 text-sm leading-relaxed mb-3">
                                        {log.message}
                                    </p>

                                    {/* Badges & Actions */}
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded border uppercase flex items-center gap-1 ${getTypeColor(log.type)}`}>
                                            {getTypeIcon(log.type)} {log.type.replace('_', ' ')}
                                        </span>

                                        {log.actionText && (
                                            <button className={`text-xs font-bold px-4 py-1.5 rounded-lg transition-colors ${
                                                log.type === 'HATA' ? 'bg-red-500 hover:bg-red-600 text-white' :
                                                log.type === 'ONAY_BEKLİYOR' ? 'bg-[#7c3aed] hover:bg-[#6d28d9] text-white' :
                                                'bg-white text-black hover:bg-slate-200'
                                            }`}>
                                                {log.actionText}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredLogs.length === 0 && (
                        <div className="py-20 text-center border border-white/5 rounded-2xl border-dashed">
                            <span className="text-4xl mb-3 block">📭</span>
                            <p className="text-slate-400 font-medium">Bu kategoride gösterilecek kayıt yok.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
