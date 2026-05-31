'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useEsnaf } from '@/context/EsnafContext'
import { isMvpTestReleaseEnabled } from '@/lib/mvpFeatureFlags'

interface Musteri {
    id: string
    ad: string
    telefon: string
    toplamRandevu: number
    etiketler: string[]
    sonRandevu: string | null
    sonrakiTahminiZiyaret: string | null
}

export default function MusterilerPage() {
    const router = useRouter()
    const { esnafId, isDemo } = useEsnaf()
    const isMvpTestRelease = isMvpTestReleaseEnabled()
    const whatsappDisabled = isDemo || isMvpTestRelease
    const [musteriler, setMusteriler] = useState<Musteri[]>([])
    const [loading, setLoading] = useState(true)
    const [filtre, setFiltre] = useState('hepsi')
    const [zamanReferansi] = useState(() => Date.now())

    useEffect(() => {
        if (!esnafId) return
        fetch(`/api/dashboard/musteriler?esnafId=${esnafId}`)
            .then(r => r.json())
            .then(data => {
                setMusteriler(data || [])
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [esnafId])

    const gosterilenMusteriler = musteriler.filter(m =>
        filtre === 'hepsi' ? true : m.etiketler.includes(filtre)
    )

    const filtreler = [
        { id: 'hepsi', label: 'Tümü', renk: '#7A7060' },
        { id: 'vip', label: '⭐ VIP', renk: '#C9B49A' },
        { id: 'kayip', label: '🚨 Kayıp', renk: '#ef4444' },
        { id: 'uyku', label: '💤 Uyku', renk: '#f59e0b' },
        { id: 'sadik', label: '💚 Sadık', renk: '#16a34a' },
        { id: 'yeni', label: '✨ Yeni', renk: '#3b82f6' },
    ]

    const formatZaman = (iso?: string | null) => {
        if (!iso) return 'Bilinmiyor'
        const fark = Math.floor((zamanReferansi - new Date(iso).getTime()) / (1000 * 60 * 60 * 24))
        if (fark === 0) return 'Bugün'
        if (fark > 0) return `${fark} gün önce`
        return `${Math.abs(fark)} gün sonra`
    }

    return (
        <div className="p-4 max-w-md mx-auto space-y-4 pb-24 border-t border-dgray-light/30">
            <div className="flex items-center justify-between mb-2 mt-2">
                <div>
                    <button onClick={() => router.back()} className="text-muted-foreground text-xs uppercase tracking-widest mb-1 hover:text-foreground">
                        ← Geri
                    </button>
                    <h1 className="text-foreground font-syne font-bold text-2xl">Müşterilerim</h1>
                </div>
                <div className="text-muted-foreground text-sm font-mono mt-4 text-right">
                    {musteriler.length} Kişi
                </div>
            </div>

            {/* Segment filtreleri */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
                {filtreler.map(s => (
                    <button
                        key={s.id}
                        onClick={() => setFiltre(s.id)}
                        className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold font-syne border transition-colors ${filtre === s.id ? 'bg-opacity-20' : 'bg-transparent text-muted-foreground border-border/30'
                            }`}
                        style={{
                            borderColor: filtre === s.id ? s.renk : undefined,
                            color: filtre === s.id ? s.renk : undefined,
                            backgroundColor: filtre === s.id ? `${s.renk}20` : undefined
                        }}
                    >
                        {s.label}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="animate-pulse space-y-3 mt-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-24 bg-card rounded-xl w-full"></div>
                    ))}
                </div>
            ) : gosterilenMusteriler.length === 0 ? (
                <div className="text-center py-10 bg-card/50 rounded-xl border border-border/10">
                    <p className="text-muted-foreground text-sm">Bu filtreye uygun müşteri bulunamadı.</p>
                </div>
            ) : (
                <div className="space-y-3 mt-2">
                    {gosterilenMusteriler.map(m => (
                        <div key={m.id} className="bg-card rounded-xl p-4 flex flex-col gap-2 relative overflow-hidden group">
                            {/* Etiket Strip */}
                            <div
                                className="absolute left-0 top-0 bottom-0 w-1 opacity-80"
                                style={{
                                    backgroundColor: m.etiketler.includes('vip') ? '#C9B49A' :
                                        m.etiketler.includes('kayip') ? '#ef4444' :
                                            m.etiketler.includes('uyku') ? '#f59e0b' :
                                                m.etiketler.includes('sadik') ? '#16a34a' : '#3b82f6'
                                }}
                            />

                            <div className="flex justify-between items-start ml-2">
                                <div>
                                    <h3 className="text-foreground font-syne font-bold text-lg leading-tight">{m.ad}</h3>
                                    <p className="text-muted-foreground text-xs font-mono tracking-wider mt-0.5">{m.telefon}</p>
                                </div>
                                <div className="flex gap-1">
                                    {m.etiketler.slice(0, 2).map(e => (
                                        <span key={e} className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-sm bg-background text-muted-foreground">
                                            {e}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mt-2 ml-2">
                                <div>
                                    <p className="text-muted-foreground/60 text-[10px] uppercase">Ziyaret</p>
                                    <p className="text-foreground text-xs font-medium">{m.toplamRandevu} Kez</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground/60 text-[10px] uppercase">Son Randevu</p>
                                    <p className="text-foreground text-xs font-medium">{formatZaman(m.sonRandevu)}</p>
                                </div>
                            </div>

                            {whatsappDisabled ? (
                                <div className="ml-2 w-full mt-2 rounded-lg border border-muted-foreground/20 bg-background/60 px-3 py-2 text-xs font-bold font-syne text-muted-foreground">
                                    Demo modunda gerçek WhatsApp gönderimi kapalıdır.
                                </div>
                            ) : (
                                <button
                                    onClick={() => window.location.href = `https://wa.me/${m.telefon.replace('+', '')}`}
                                    className="ml-2 w-full mt-2 bg-rust/10 text-rust hover:bg-rust hover:text-foreground transition-colors border border-rust/20 rounded-lg py-2 text-xs font-bold font-syne"
                                >
                                    Kişisel Mesaj Gönder
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
