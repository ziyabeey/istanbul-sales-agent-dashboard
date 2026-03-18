'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useEsnaf } from '@/context/EsnafContext'
import { toast } from 'sonner'
import { Search, Building2 } from 'lucide-react'
import { B2BKilitEkrani } from '@/components/b2b/B2BKilitEkrani'
import { SiparisKarti, Siparis, DURUM_CONFIG } from '@/components/b2b/SiparisKarti'
import { ToptanciKarti, Toptanci } from '@/components/b2b/ToptanciKarti'

const PAKET_SEVIYE: Record<string, number> = {
    TEMEL: 1, STANDART: 2, BUYUME: 3, PREMIUM: 4, PREMIUMPLUS: 5,
}

export default function B2BPage() {
    const router = useRouter()
    const { esnafId, esnaf } = useEsnaf()

    const [toptancilar, setToptancilar] = useState<Toptanci[]>([])
    const [siparisler, setSiparisler] = useState<Siparis[]>([])
    const [loading, setLoading] = useState(true)
    const [arama, setArama] = useState('')
    const [aktifTab, setAktifTab] = useState<'tedarik' | 'siparisler'>('tedarik')

    // Paket kontrolü
    const esnafPaket = (esnaf as any)?.paket || 'TEMEL'
    const esnafSeviye = PAKET_SEVIYE[esnafPaket] || 1
    const erisimVar = esnafSeviye >= 3 // BUYUME ve üstü

    useEffect(() => {
        if (!esnafId || !erisimVar) { setLoading(false); return }

        Promise.all([
            fetch(`/api/b2b/eslestir?esnafId=${esnafId}`).then(r => r.ok ? r.json() : []),
            fetch(`/api/b2b/siparisler?esnafId=${esnafId}`).then(r => r.ok ? r.json() : []),
        ])
            .then(([t, s]) => { setToptancilar(t); setSiparisler(s) })
            .catch(() => { toast.error('Tedarik verileri yüklenemedi') })
            .finally(() => setLoading(false))
    }, [esnafId, erisimVar])

    const filtrelenmis = useMemo(() =>
        toptancilar.filter(t =>
            !arama || t.isletmeAdi.toLowerCase().includes(arama.toLowerCase()) ||
            t.sektor.toLowerCase().includes(arama.toLowerCase())
        ),
    [toptancilar, arama])

    const durumGuncelle = async (id: string, yeniDurum: string) => {
        try {
            await fetch('/api/b2b/siparisler', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ siparisId: id, yeniDurum, esnafId }),
            })
            setSiparisler(prev => prev.map(s => s.id === id ? { ...s, durum: yeniDurum as any } : s))
            toast.success(`Sipariş durumu güncellendi: ${DURUM_CONFIG[yeniDurum]?.label}`)
        } catch { toast.error('Güncelleme başarısız') }
    }

    // ── Paket yetersiz → Blur Upsell ────────────────────────────────────────
    if (!erisimVar) return <B2BKilitEkrani onUpgrade={() => router.push('/fiyatlar')} />

    if (loading) {
        return (
            <div className="p-6 max-w-4xl mx-auto animate-pulse space-y-4">
                <div className="h-16 bg-background rounded-2xl" />
                <div className="grid grid-cols-3 gap-4">
                    <div className="h-40 bg-background rounded-2xl" />
                    <div className="h-40 bg-background rounded-2xl" />
                    <div className="h-40 bg-background rounded-2xl" />
                </div>
            </div>
        )
    }

    return (
        <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6 pb-24">
            {/* ── Header ──────────────────────────────────────────── */}
            <div className="flex items-center justify-between">
                <div>
                    <button onClick={() => router.back()} className="text-muted-foreground text-xs uppercase tracking-widest mb-1 hover:text-muted-foreground">← Geri</button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-500/15 rounded-xl flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                            <h1 className="font-syne font-bold text-xl text-slate-100">Tedarik Merkezi</h1>
                            <p className="text-muted-foreground text-xs">B2B Ağı · Otonom Tedarik</p>
                        </div>
                    </div>
                </div>

                {/* Tab geçişi */}
                <div className="flex bg-background rounded-xl p-1 border border-border/50">
                    <button
                        onClick={() => setAktifTab('tedarik')}
                        className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                            aktifTab === 'tedarik' ? 'bg-amber-600 text-white' : 'text-muted-foreground hover:text-muted-foreground'
                        }`}
                    >
                        Toptancılar
                    </button>
                    <button
                        onClick={() => setAktifTab('siparisler')}
                        className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                            aktifTab === 'siparisler' ? 'bg-amber-600 text-white' : 'text-muted-foreground hover:text-muted-foreground'
                        }`}
                    >
                        Siparişler
                        {siparisler.length > 0 && (
                            <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold flex items-center justify-center">
                                {siparisler.length}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════
                 TAB 1: SİZE ÖZEL TOPTANCILAR
                 ═══════════════════════════════════════════════════════════ */}
            {aktifTab === 'tedarik' && (
                <>
                    {/* Arama */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Toptancı veya ürün ara..."
                            value={arama}
                            onChange={e => setArama(e.target.value)}
                            className="w-full bg-background border border-border/50 rounded-xl pl-11 pr-4 py-3 text-sm text-muted-foreground placeholder-slate-600 outline-none focus:border-amber-500/50"
                        />
                    </div>

                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                        🏆 Size Özel Toptancılar ({filtrelenmis.length})
                    </p>

                    {filtrelenmis.length === 0 ? (
                        <div className="bg-background/50 border border-border/30 rounded-2xl p-8 text-center">
                            <p className="text-3xl mb-3">🔍</p>
                            <p className="text-muted-foreground text-sm">Henüz ağda eşleşen tedarikçi bulunamadı</p>
                            <p className="text-muted-foreground text-xs mt-1">Ağ genişledikçe size özel öneriler buraya gelecek</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {filtrelenmis.map(t => (
                                <ToptanciKarti
                                    key={t.esnafId}
                                    toptanci={t}
                                    onKatalogClick={() => toast.info('Toptancı ürünleri yükleniyor...', { icon: '🛒' })}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* ═══════════════════════════════════════════════════════════
                 TAB 2: SİPARİŞ KANBAN
                 ═══════════════════════════════════════════════════════════ */}
            {aktifTab === 'siparisler' && (
                <>
                    {/* Durum özeti */}
                    <div className="grid grid-cols-4 gap-2">
                        {(['bekliyor', 'hazirlaniyor', 'yola_cikti', 'teslim_edildi'] as const).map(d => {
                            const c = DURUM_CONFIG[d]
                            const Icon = c.icon
                            const sayi = siparisler.filter(s => s.durum === d).length
                            return (
                                <div key={d} className={`${c.bg} rounded-xl p-3 text-center`}>
                                    <Icon className={`w-4 h-4 ${c.color} mx-auto mb-1`} />
                                    <p className={`font-syne font-bold text-lg ${c.color}`}>{sayi}</p>
                                    <p className="text-muted-foreground text-[9px] uppercase tracking-wider">{c.label}</p>
                                </div>
                            )
                        })}
                    </div>

                    {siparisler.length === 0 ? (
                        <div className="bg-background/50 border border-border/30 rounded-2xl p-8 text-center">
                            <p className="text-3xl mb-3">📦</p>
                            <p className="text-muted-foreground text-sm">Henüz sipariş yok</p>
                            <p className="text-muted-foreground text-xs mt-1">AI ajanınız stok azaldığında otomatik sipariş önerecek</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {siparisler.map(s => (
                                <SiparisKarti key={s.id} siparis={s} onDurumGuncelle={durumGuncelle} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
