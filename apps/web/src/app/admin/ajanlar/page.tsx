'use client'

import { useEffect, useState, useCallback } from 'react'
import {
    ShieldAlert, Radio, Power, PowerOff, RefreshCw,
    Activity, Zap, AlertTriangle, CheckCircle, Clock
} from 'lucide-react'

const ADMIN_TOKEN = 'kepenk-admin-2026'

interface AjanLog {
    id: string
    ajan: string
    esnafId: string | null
    tip: string
    basari: boolean
    hata: string | null
    zaman: string | null
    kanal?: string
}

interface AgentStatus { lastRun: Date; basari: boolean }

const AGENTS = [
    { name: 'OrchestratorAgent',      display: 'Orkestratör'        },
    { name: 'ChurnDetectiveAgent',     display: 'Churn Detective'    },
    { name: 'TheCloserAgent',          display: 'The Closer'         },
    { name: 'TelefonKomutaniAgent',    display: 'Telefon Komutanı'   },
    { name: 'MuzakereciAgent',         display: 'Müzakereci'         },
    { name: 'TheCreatorAgent',         display: 'The Creator'        },
    { name: 'DestekUpsellAgent',       display: 'Destek & Upsell'    },
    { name: 'DegisiklikAjaniAgent',    display: 'Değişiklik Ajanı'   },
    { name: 'OperasyonBeyniAgent',     display: 'Operasyon Beyni'    },
    { name: 'TheOverseerAgent',        display: 'The Overseer'       },
    { name: 'SentimentGuardianAgent',  display: 'Sentiment Guardian' },
    { name: 'EsnafAsistaniAgent',      display: 'Esnaf Asistanı'     },
    { name: 'ReklamAsistaniAgent',     display: 'Reklam Asistanı'    },
    { name: 'IKAjaniAgent',            display: 'IK Ajanı'           },
    { name: 'DerinArastirmaciAgent',   display: 'Derin Araştırmacı'  },
    { name: 'LeadMadencisiAgent',      display: 'Lead Madencisi'     },
    { name: 'MesajMimariAgent',        display: 'Mesaj Mimarı'       },
    { name: 'SatinalmaAjani',          display: 'Satın Alma'         },
]

function formatRelativeTime(date: Date): string {
    const diffMin = Math.floor((Date.now() - date.getTime()) / 60000)
    if (diffMin < 1) return 'az önce'
    if (diffMin < 60) return `${diffMin}dk önce`
    const diffHr = Math.floor(diffMin / 60)
    if (diffHr < 24) return `${diffHr}sa önce`
    return `${Math.floor(diffHr / 24)}g önce`
}

function formatLogTime(iso: string | null): string {
    if (!iso) return '--:--:--'
    return new Date(iso).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

function getStatusDot(status: AgentStatus | undefined): string {
    if (!status) return 'bg-slate-700'
    const ageMs = Date.now() - status.lastRun.getTime()
    if (!status.basari) return 'bg-rose-400'
    if (ageMs < 60 * 60 * 1000) return 'bg-emerald-400'
    return 'bg-amber-400'
}

export default function AjanlarPage() {
    const [logs, setLogs] = useState<AjanLog[]>([])
    const [agentMap, setAgentMap] = useState<Map<string, AgentStatus>>(new Map())
    const [yukleniyor, setYukleniyor] = useState(true)
    const [sistemDurum, setSistemDurum] = useState<'active' | 'maintenance'>('active')
    const [killSwitchLoading, setKillSwitchLoading] = useState(false)

    function buildAgentMap(rawLogs: AjanLog[]) {
        const map = new Map<string, AgentStatus>()
        for (const log of rawLogs) {
            if (!log.ajan || !log.zaman) continue
            if (!map.has(log.ajan)) {
                map.set(log.ajan, { lastRun: new Date(log.zaman), basari: log.basari })
            }
        }
        return map
    }

    const fetchLogs = useCallback(async () => {
        try {
            const r = await fetch('/api/admin/ajan-loglar', { headers: { 'x-admin-token': ADMIN_TOKEN } })
            if (r.ok) {
                const d = await r.json()
                const rawLogs: AjanLog[] = d.logs || []
                setLogs(rawLogs)
                setAgentMap(buildAgentMap(rawLogs))
                if (d.sistemDurum) setSistemDurum(d.sistemDurum)
            }
        } catch { /* sessiz */ }
    }, [])

    useEffect(() => {
        fetchLogs().finally(() => setYukleniyor(false))
        const interval = setInterval(fetchLogs, 5000)
        return () => clearInterval(interval)
    }, [fetchLogs])

    async function handleKillSwitch() {
        const yeniDurum = sistemDurum === 'active' ? 'maintenance' : 'active'
        if (yeniDurum === 'maintenance' && !confirm('⚠️ TÜM AI çıkışlarını durdurmak istediğinize emin misiniz?')) return
        setKillSwitchLoading(true)
        try {
            await fetch('/api/admin/kota', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-admin-token': ADMIN_TOKEN },
                body: JSON.stringify({ islem: 'kill_switch', deger: yeniDurum }),
            })
            setSistemDurum(yeniDurum)
        } catch { /* */ }
        finally { setKillSwitchLoading(false) }
    }

    const basarili = logs.filter(l => l.basari).length
    const hatali = logs.filter(l => !l.basari).length
    const aktifAjan = [...new Set(logs.filter(l => {
        if (!l.zaman) return false
        return Date.now() - new Date(l.zaman).getTime() < 3600000
    }).map(l => l.ajan))].length

    return (
        <div className="p-8 min-h-screen bg-slate-950">
            {/* ── Header + Kill Switch ─────────────────────────────────── */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-violet-500/15 flex items-center justify-center">
                        <Radio className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                        <h1 className="font-syne text-xl font-bold text-slate-100">Ajan Radar Merkezi</h1>
                        <p className="text-muted-foreground text-xs font-mono">Canlı telemetri · Kill Switch · 5s yenileme</p>
                    </div>
                </div>

                <button
                    onClick={handleKillSwitch}
                    disabled={killSwitchLoading}
                    className={`flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all disabled:opacity-50 ${
                        sistemDurum === 'active'
                            ? 'bg-rose-600/15 text-rose-400 border border-rose-800 hover:bg-rose-600/30'
                            : 'bg-emerald-600/15 text-emerald-400 border border-emerald-800 hover:bg-emerald-600/30'
                    }`}
                >
                    {killSwitchLoading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : sistemDurum === 'active' ? (
                        <PowerOff className="w-4 h-4" />
                    ) : (
                        <Power className="w-4 h-4" />
                    )}
                    {sistemDurum === 'active' ? '🔴 Sistemi Bakıma Al' : '🟢 Sistemi Aktif Et'}
                </button>
            </div>

            {/* ── Bakım Modu Uyarısı ──────────────────────────────────── */}
            {sistemDurum === 'maintenance' && (
                <div className="mb-6 bg-rose-500/10 border border-rose-500/30 rounded-xl px-5 py-3 flex items-center gap-3 animate-pulse">
                    <ShieldAlert className="w-5 h-5 text-rose-400 flex-shrink-0" />
                    <div>
                        <p className="text-rose-300 font-semibold text-sm">⛔ SİSTEM BAKIM MODUNDA</p>
                        <p className="text-rose-400/70 text-xs">Tüm AI ajan çıkışları donduruldu.</p>
                    </div>
                </div>
            )}

            {/* ── Telemetri Kartları ──────────────────────────────────── */}
            <div className="grid grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Sistem', value: sistemDurum === 'active' ? 'AKTİF' : 'BAKIM', icon: Activity, color: sistemDurum === 'active' ? 'text-emerald-400' : 'text-rose-400', bg: sistemDurum === 'active' ? 'bg-emerald-500/10' : 'bg-rose-500/10' },
                    { label: 'Aktif Ajan (1sa)', value: aktifAjan, icon: Zap, color: 'text-violet-400', bg: 'bg-violet-500/10' },
                    { label: 'Başarılı', value: basarili, icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                    { label: 'Hatalı', value: hatali, icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10' },
                ].map(({ label, value, icon: Icon, color, bg }) => (
                    <div key={label} className="bg-background border border-border/50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
                            <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
                                <Icon className={`w-4 h-4 ${color}`} />
                            </div>
                        </div>
                        <p className={`font-syne font-bold text-2xl ${color}`}>{value}</p>
                    </div>
                ))}
            </div>

            {/* ── Agent Status Grid ──────────────────────────────────── */}
            <div className="mb-6">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Ajan Durumları</p>
                <div className="grid grid-cols-3 gap-px bg-card/30 rounded overflow-hidden">
                    {AGENTS.map(agent => {
                        const status = agentMap.get(agent.name)
                        return (
                            <div key={agent.name} className="bg-background px-4 py-3 flex items-center justify-between">
                                <div>
                                    <p className="text-muted-foreground text-sm font-syne">{agent.display}</p>
                                    <p className="text-muted-foreground text-xs font-mono mt-0.5">
                                        {yukleniyor ? '...' : status ? formatRelativeTime(status.lastRun) : 'bekleniyor'}
                                    </p>
                                </div>
                                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${getStatusDot(status)}`} />
                            </div>
                        )
                    })}
                </div>
                <div className="flex items-center gap-6 mt-3 px-1">
                    {[
                        { dot: 'bg-emerald-400', label: '<1 saat, başarılı' },
                        { dot: 'bg-amber-400',   label: '>1 saat' },
                        { dot: 'bg-rose-400',    label: 'başarısız' },
                        { dot: 'bg-slate-700',   label: 'bekleniyor' },
                    ].map(l => (
                        <span key={l.label} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                            <span className={`w-1.5 h-1.5 rounded-full ${l.dot}`} />
                            {l.label}
                        </span>
                    ))}
                </div>
            </div>

            {/* ── Canlı Log Feed ─────────────────────────────────────── */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Canlı Log Feed</p>
                    <span className="flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono">5s</span>
                    </span>
                </div>
                <div className="bg-background rounded overflow-hidden">
                    <div className="font-mono text-xs p-4 space-y-1.5 h-[400px] overflow-y-auto bg-slate-950">
                        {logs.length === 0 && <p className="text-slate-700">Henüz log girişi yok...</p>}
                        {logs.map(log => (
                            <div key={log.id} className="flex items-start gap-3">
                                <span className="text-slate-700 shrink-0 w-20">{formatLogTime(log.zaman)}</span>
                                <span className={`shrink-0 w-44 truncate ${log.basari ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {log.ajan}
                                </span>
                                <span className="text-muted-foreground truncate flex-1">{log.tip}</span>
                                <span className="text-muted-foreground text-[10px] px-1.5 py-0.5 bg-card rounded shrink-0">{log.kanal || '—'}</span>
                                {log.esnafId && <span className="text-slate-700 shrink-0">#{log.esnafId.slice(-6)}</span>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
