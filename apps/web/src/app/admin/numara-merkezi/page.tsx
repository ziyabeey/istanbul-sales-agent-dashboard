'use client'

import { useEffect, useState } from 'react'

const ADMIN_TOKEN = 'kepenk-admin-2026'

interface Numara {
    id: string
    numara: string
    durum: 'bosta' | 'atandi'
    atananEsnafId?: string
    atananEsnafAd?: string
    twilioWebhook?: string
    olusturma?: string
}

export default function NumeraMerkeziPage() {
    const [numaralar, setNumaralar] = useState<Numara[]>([])
    const [yukleniyor, setYukleniyor] = useState(true)
    const [satin, setSatin] = useState(false)
    const [esitleniyor, setEsitleniyor] = useState<string | null>(null)

    async function fetchNumaralar() {
        try {
            const r = await fetch('/api/admin/numara-havuzu', {
                headers: { 'x-admin-token': ADMIN_TOKEN },
            })
            if (r.ok) {
                const d = await r.json()
                setNumaralar(d.numaralar || [])
            }
        } catch { /* sessiz */ }
    }

    useEffect(() => {
        fetchNumaralar().finally(() => setYukleniyor(false))
    }, [])

    async function handleSatinAl() {
        setSatin(true)
        try {
            const r = await fetch('/api/admin/numara-havuzu', {
                method: 'POST',
                headers: { 'x-admin-token': ADMIN_TOKEN },
            })
            if (r.ok) await fetchNumaralar()
        } catch { /* sessiz */ } finally {
            setSatin(false)
        }
    }

    async function handleEsitle(id: string) {
        setEsitleniyor(id)
        try {
            await fetch(`/api/admin/numara-havuzu/${id}/twilio-esitle`, {
                method: 'POST',
                headers: { 'x-admin-token': ADMIN_TOKEN },
            })
            await fetchNumaralar()
        } catch { /* sessiz */ } finally {
            setEsitleniyor(null)
        }
    }

    const bostaSayisi = numaralar.filter(n => n.durum === 'bosta').length
    const atandiSayisi = numaralar.filter(n => n.durum === 'atandi').length

    return (
        <div className="p-8 min-h-screen bg-slate-950">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-syne text-xl font-bold text-slate-100 tracking-tight">Numara Merkezi</h1>
                    <p className="text-muted-foreground text-xs mt-1 font-mono">
                        {yukleniyor ? '...' : `${numaralar.length} numara · ${bostaSayisi} boşta · ${atandiSayisi} atandı`}
                    </p>
                </div>
                <button
                    onClick={handleSatinAl}
                    disabled={satin}
                    className="px-4 py-2 bg-card hover:bg-slate-700 disabled:opacity-50 text-foreground text-sm font-mono rounded transition-colors"
                >
                    {satin ? 'Satın alınıyor...' : 'Twilio\'dan Numara Satın Al'}
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-background rounded p-5">
                    <p className="text-muted-foreground text-[10px] uppercase tracking-widest mb-2">Toplam</p>
                    <p className="font-syne text-2xl font-bold text-slate-100">{numaralar.length}</p>
                </div>
                <div className="bg-background rounded p-5">
                    <p className="text-muted-foreground text-[10px] uppercase tracking-widest mb-2">Boşta</p>
                    <p className="font-syne text-2xl font-bold text-emerald-400">{bostaSayisi}</p>
                </div>
                <div className="bg-background rounded p-5">
                    <p className="text-muted-foreground text-[10px] uppercase tracking-widest mb-2">Atandı</p>
                    <p className="font-syne text-2xl font-bold text-slate-100">{atandiSayisi}</p>
                </div>
            </div>

            {/* Table */}
            <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Numara Havuzu</p>
                <div className="bg-background rounded overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border/50">
                                {['Numara', 'Durum', 'Atanan Esnaf', 'Twilio Webhook', 'İşlem'].map(h => (
                                    <th key={h} className="px-4 py-3 text-left text-[10px] uppercase tracking-widest text-muted-foreground font-normal">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/30">
                            {yukleniyor && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-slate-700 font-mono text-xs">Yükleniyor...</td>
                                </tr>
                            )}
                            {!yukleniyor && numaralar.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-slate-700 font-mono text-xs">Henüz numara yok. Yeni numara ekleyin.</td>
                                </tr>
                            )}
                            {numaralar.map(n => (
                                <tr key={n.id} className="hover:bg-card/20 transition-colors">
                                    <td className="px-4 py-3 font-mono text-sm text-foreground">{n.numara}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center gap-1.5 text-xs font-mono ${n.durum === 'bosta' ? 'text-emerald-400' : 'text-amber-400'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${n.durum === 'bosta' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                                            {n.durum === 'bosta' ? 'Boşta' : 'Atandı'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground text-xs font-mono">
                                        {n.atananEsnafAd || (n.atananEsnafId ? `#${n.atananEsnafId.slice(-6)}` : '—')}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground text-xs font-mono truncate max-w-[200px]">
                                        {n.twilioWebhook ? (
                                            <span className="text-emerald-600">{n.twilioWebhook}</span>
                                        ) : (
                                            <span className="text-slate-700">—</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => handleEsitle(n.id)}
                                            disabled={esitleniyor === n.id}
                                            className="px-3 py-1 bg-card hover:bg-slate-700 disabled:opacity-50 text-muted-foreground text-xs font-mono rounded transition-colors"
                                        >
                                            {esitleniyor === n.id ? '...' : n.twilioWebhook ? 'Eşitle' : 'Twilio Bağla'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
