'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useEsnaf } from '@/context/EsnafContext'

interface Personel {
    id: string
    esnafId: string
    ad: string
    unvan: string // Örn: Usta, Kalfa
    primYuzdesi: number
    aylikMaas: number
}

interface PerformansKarnesi {
    toplamCiro: number
    hizmetSayisi: number
    bagliMusteriler: number
    hakedis: number
}

export default function EkipPage() {
    const router = useRouter()
    const { esnafId } = useEsnaf()
    const [personeller, setPersoneller] = useState<(Personel & { performans?: PerformansKarnesi })[]>([])
    const [loading, setLoading] = useState(true)

    // Form
    const [modalAcik, setModalAcik] = useState(false)
    const [form, setForm] = useState({ ad: '', unvan: 'Usta', primYuzdesi: 20, aylikMaas: 17002 })
    const [islem, setIslem] = useState(false)

    useEffect(() => {
        if (!esnafId) return
        const fetchEkip = async () => {
            try {
                const res = await fetch(`/api/hr/personel?esnafId=${esnafId}`)
                if (res.ok) {
                    const data = await res.json()
                    setPersoneller(data)
                }
            } catch (err) { }
            setLoading(false)
        }
        fetchEkip()
    }, [esnafId])

    const handleKaydet = async (e: React.FormEvent) => {
        e.preventDefault()
        setIslem(true)
        try {
            await fetch('/api/hr/personel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ esnafId, ...form })
            })
            setModalAcik(false)
            setForm({ ad: '', unvan: 'Usta', primYuzdesi: 20, aylikMaas: 17002 })
            // Refresh
            const res = await fetch(`/api/hr/personel?esnafId=${esnafId}`)
            const data = await res.json()
            setPersoneller(data)
        } catch (error) { }
        setIslem(false)
    }

    return (
        <div className="p-4 max-w-md mx-auto space-y-4 pb-24 border-t border-dgray-light/30">
            <div className="flex items-center justify-between mb-4 mt-2">
                <div>
                    <button onClick={() => router.back()} className="text-muted-foreground text-xs uppercase tracking-widest mb-1 hover:text-foreground">
                        ← Geri
                    </button>
                    <h1 className="text-foreground font-syne font-bold text-2xl">Ekip & Performans</h1>
                </div>
            </div>

            <button
                onClick={() => setModalAcik(true)}
                className="w-full bg-sage/10 text-sage border border-sage/30 py-3 rounded-xl font-bold text-sm hover:bg-sage hover:text-foreground transition"
            >
                + Yeni Personel / Usta Ekle
            </button>

            {loading ? (
                <div className="animate-pulse space-y-3 mt-4">
                    <div className="h-32 bg-card rounded-xl"></div>
                    <div className="h-32 bg-card rounded-xl"></div>
                </div>
            ) : personeller.length === 0 ? (
                <div className="bg-card/40 border border-border rounded-2xl p-6 text-center mt-6">
                    <p className="text-3xl mb-3">👥</p>
                    <h3 className="text-foreground font-syne font-bold text-lg mb-2">Henüz Ekip Üyesi Yok</h3>
                    <p className="text-muted-foreground text-sm">
                        Berber, Kuaför, Tamirhane gibi 1'den fazla ustayla çalışıyorsanız, ustalarınızın gelirini izleyin.
                    </p>
                </div>
            ) : (
                <div className="space-y-4 mt-4">
                    {personeller.map(p => (
                        <div key={p.id} className="bg-card rounded-xl p-4 border border-border/20 relative overflow-hidden">
                            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-ink/40 to-transparent pointer-events-none" />
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-foreground font-syne font-bold text-lg">{p.ad}</p>
                                    <p className="text-muted-foreground text-xs">{p.unvan} · %{p.primYuzdesi} Prim Yüzdesi</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Ay Sonu Hakediş</p>
                                    <p className="text-sage font-syne font-bold text-xl mt-0.5">₺{p.performans?.hakedis?.toLocaleString() || 0}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-border/10 relative z-10">
                                <div>
                                    <p className="text-xs text-muted-foreground mb-0.5">Getirdiği Ciro</p>
                                    <p className="text-foreground font-bold">₺{p.performans?.toplamCiro?.toLocaleString() || 0}</p>
                                </div>
                                <div className="border-l border-border/10 pl-3">
                                    <p className="text-xs text-muted-foreground mb-0.5">Sadık Müşterisi</p>
                                    <p className="text-foreground font-bold">{p.performans?.bagliMusteriler || 0} Kişi</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {modalAcik && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
                    <div className="bg-card w-full max-w-sm rounded-2xl p-6 border border-border relative">
                        <button onClick={() => setModalAcik(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">✕</button>
                        <h2 className="text-lg font-syne font-bold text-foreground mb-4">Personel Kaydı</h2>
                        <form onSubmit={handleKaydet} className="space-y-3">
                            <div>
                                <label className="text-xs text-muted-foreground mb-1 block">Ad / Soyad</label>
                                <input required type="text" value={form.ad} onChange={e => setForm({ ...form, ad: e.target.value })} className="w-full bg-background text-foreground p-3 rounded-xl border border-border outline-none focus:border-sage" />
                            </div>
                            <div>
                                <label className="text-xs text-muted-foreground mb-1 block">Unvan (Usta, Kalfa, Asistan)</label>
                                <input required type="text" value={form.unvan} onChange={e => setForm({ ...form, unvan: e.target.value })} className="w-full bg-background text-foreground p-3 rounded-xl border border-border outline-none focus:border-sage" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs text-muted-foreground mb-1 block">Yüzdelik Pay (Prim %)</label>
                                    <input required type="number" min="0" max="100" value={form.primYuzdesi} onChange={e => setForm({ ...form, primYuzdesi: Number(e.target.value) })} className="w-full bg-background text-sage p-3 rounded-xl border border-border outline-none focus:border-sage font-bold" />
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground mb-1 block">Sabit Maaş (₺)</label>
                                    <input required type="number" value={form.aylikMaas} onChange={e => setForm({ ...form, aylikMaas: Number(e.target.value) })} className="w-full bg-background text-foreground p-3 rounded-xl border border-border outline-none focus:border-sage" />
                                </div>
                            </div>
                            <button disabled={islem} type="submit" className="w-full bg-sage text-foreground py-3 rounded-xl font-bold mt-4 hover:bg-sage/90">
                                {islem ? 'Kaydediliyor...' : 'Ekibe Ekle'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
