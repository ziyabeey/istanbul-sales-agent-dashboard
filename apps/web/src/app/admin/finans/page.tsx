'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { PAKET_FIYATLARI } from '@/types'

const ADMIN_TOKEN = 'kepenk-admin-2026'

const CARPAN: Record<string, string> = {
    TEMEL: 'x1', STANDART: 'x2', BUYUME: 'x5', PREMIUM: 'x20', PREMIUMPLUS: '∞',
}

const MOCK_TREND = [
    { ay: 'Eki', arr: 285000 },
    { ay: 'Kas', arr: 312000 },
    { ay: 'Ara', arr: 341000 },
    { ay: 'Oca', arr: 387000 },
    { ay: 'Şub', arr: 421000 },
    { ay: 'Mar', arr: 0 }, // gerçek değer hesaplanacak
]

interface EsnafRow { id: string; paket: string; durum: string }

export default function FinansPage() {
    const [esnaflar, setEsnaflar] = useState<EsnafRow[]>([])
    const [yukleniyor, setYukleniyor] = useState(true)

    useEffect(() => {
        fetch('/api/admin/stats', { headers: { 'x-admin-token': ADMIN_TOKEN } })
            .then(r => r.json())
            .then(d => setEsnaflar(d.esnaflar || []))
            .finally(() => setYukleniyor(false))
    }, [])

    const aktifler = esnaflar.filter(e => e.durum === 'aktif')

    const arr = aktifler.reduce((acc, e) => {
        return acc + (PAKET_FIYATLARI[(e.paket as keyof typeof PAKET_FIYATLARI)] || 0)
    }, 0)
    const mrr = Math.round(arr / 12)

    const tierData = ['TEMEL', 'STANDART', 'BUYUME', 'PREMIUM', 'PREMIUMPLUS'].map(paket => {
        const abone = aktifler.filter(e => e.paket === paket).length
        const yillikGelir = abone * (PAKET_FIYATLARI[(paket as keyof typeof PAKET_FIYATLARI)] || 0)
        return { paket, abone, yillikGelir, carpan: CARPAN[paket] }
    })

    const trendData = MOCK_TREND.map((d, i) =>
        i === MOCK_TREND.length - 1 ? { ...d, arr } : d
    )

    return (
        <div className="p-8 min-h-screen bg-slate-950">
            <div className="mb-8">
                <h1 className="font-syne text-xl font-bold text-slate-100 tracking-tight">Finans & Büyüme</h1>
                <p className="text-muted-foreground text-xs mt-1 font-mono">Yıllık peşin model — domain/kurulum ücreti ilk yıl alınmaz</p>
            </div>

            {/* Top KPIs */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-background rounded p-6">
                    <p className="text-muted-foreground text-[10px] uppercase tracking-widest mb-3">ARR</p>
                    <p className="font-syne text-3xl font-bold text-slate-100">
                        {yukleniyor ? '—' : `₺${arr.toLocaleString('tr-TR')}`}
                    </p>
                    <p className="text-muted-foreground text-xs mt-2 font-mono">yıllık yinelenen gelir</p>
                </div>
                <div className="bg-background rounded p-6">
                    <p className="text-muted-foreground text-[10px] uppercase tracking-widest mb-3">MRR</p>
                    <p className="font-syne text-3xl font-bold text-slate-100">
                        {yukleniyor ? '—' : `₺${mrr.toLocaleString('tr-TR')}`}
                    </p>
                    <p className="text-muted-foreground text-xs mt-2 font-mono">ARR / 12</p>
                </div>
                <div className="bg-background rounded p-6">
                    <p className="text-muted-foreground text-[10px] uppercase tracking-widest mb-3">Aktif Abone</p>
                    <p className="font-syne text-3xl font-bold text-slate-100">
                        {yukleniyor ? '—' : aktifler.length}
                    </p>
                    <p className="text-muted-foreground text-xs mt-2 font-mono">toplam {esnaflar.length} kayıt</p>
                </div>
            </div>

            {/* Grid: Tier Table + Trend Chart */}
            <div className="grid grid-cols-2 gap-6">
                {/* Paket Dağılımı */}
                <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Paket Dağılımı</p>
                    <div className="bg-background rounded overflow-hidden">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border/50">
                                    {['Paket', 'Çarpan', 'Abone', 'Yıllık Gelir'].map(h => (
                                        <th key={h} className="px-4 py-3 text-left text-[10px] uppercase tracking-widest text-muted-foreground font-normal">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/30">
                                {tierData.map(row => (
                                    <tr key={row.paket} className="hover:bg-card/20 transition-colors">
                                        <td className="px-4 py-3 text-muted-foreground font-syne text-xs font-semibold">{row.paket}</td>
                                        <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{row.carpan}</td>
                                        <td className="px-4 py-3 text-muted-foreground font-mono">{row.abone}</td>
                                        <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                                            {row.yillikGelir > 0 ? `₺${row.yillikGelir.toLocaleString('tr-TR')}` : '—'}
                                        </td>
                                    </tr>
                                ))}
                                <tr className="border-t border-border/50">
                                    <td colSpan={2} className="px-4 py-3 text-muted-foreground text-xs font-mono">Toplam</td>
                                    <td className="px-4 py-3 text-foreground font-mono font-bold">{aktifler.length}</td>
                                    <td className="px-4 py-3 text-foreground font-mono text-xs font-bold">
                                        ₺{arr.toLocaleString('tr-TR')}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ARR Trend */}
                <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">ARR Trendi (6 Ay)</p>
                    <div className="bg-background rounded p-5 h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={trendData} barSize={28}>
                                <XAxis
                                    dataKey="ay"
                                    tick={{ fill: '#475569', fontSize: 11, fontFamily: 'monospace' }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fill: '#475569', fontSize: 10, fontFamily: 'monospace' }}
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={v => `₺${(v / 1000).toFixed(0)}k`}
                                    width={55}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '6px', fontFamily: 'monospace', fontSize: '11px' }}
                                    labelStyle={{ color: '#94a3b8' }}
                                    itemStyle={{ color: '#4ade80' }}
                                    formatter={(v) => [`₺${Number(v).toLocaleString('tr-TR')}`, 'ARR']}
                                />
                                <Bar dataKey="arr" fill="#4ade80" radius={[2, 2, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}
