'use client'

/**
 * QrSiparisClient — Premium App-Like QR Sipariş Deneyimi
 *
 * - Sticky yatay kategori barı
 * - Parabolik fly-to-cart animasyon
 * - Glassmorphism sepet barı
 * - Zustand persist sepet
 * - AI Upsell intercept
 * - Canlı Takip + Split Bill entegrasyonu
 */

import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useAnimate } from 'framer-motion'
import { useMasaSession } from '@/hooks/useMasaSession'
import { useSepetStore, type SepetKalem } from '@/stores/sepetStore'
import UpsellBottomSheet from '@/components/restoran/UpsellBottomSheet'
import CanliTakipPanel from '@/components/restoran/CanliTakipPanel'
import AlmanUsuluHesap from '@/components/restoran/AlmanUsuluHesap'

interface KatalogItem {
    id: string
    ad: string
    aciklama?: string
    fiyatKurus: number
    kategori: string
    kdvTipi: string
    gorselUrl?: string | null
    spikeFlags?: { vegan?: boolean; glutensiz?: boolean; acili?: boolean }
}

interface Props {
    esnafId: string
    esnafAd: string
    masaNo: number
    katalog: KatalogItem[]
}

const KATEGORI_LABELS: Record<string, string> = {
    baslangiclar: '🥗 Başlangıçlar', ana_yemekler: '🍖 Ana Yemekler',
    izgara: '🔥 Izgara', kebap: '🥩 Kebap', pizza: '🍕 Pizza',
    makarna: '🍝 Makarna', salata: '🥬 Salata', corba: '🍲 Çorba',
    tatli: '🍰 Tatlılar', icecekler: '🥤 İçecekler',
    sicak_icecekler: '☕ Sıcak İçecekler', alkol: '🍺 Alkol',
    kahvalti: '🥐 Kahvaltı', sandvic: '🥪 Sandviç',
    yan_urunler: '🧀 Yan Ürünler', diger: '📦 Diğer',
}

function kurusToTL(kurus: number): string {
    return (kurus / 100).toFixed(2).replace('.', ',') + ' ₺'
}

// ── Fly Particle ───────────────────────────────────────────────────────

function FlyParticle({ startX, startY, onComplete }: { startX: number; startY: number; onComplete: () => void }) {
    const [scope, animate] = useAnimate()

    useEffect(() => {
        // Hedef: ekranın alt-sağ köşesi (sepet barı)
        const endX = window.innerWidth / 2
        const endY = window.innerHeight - 40

        animate(scope.current, {
            x: [0, (endX - startX) * 0.3, endX - startX],
            y: [0, -120, endY - startY],
            scale: [1, 1.2, 0.2],
            opacity: [1, 1, 0],
        }, { duration: 0.6, ease: 'easeOut' }).then(onComplete)
    }, [animate, scope, startX, startY, onComplete])

    return (
        <motion.div
            ref={scope}
            className="fixed z-[100] w-10 h-10 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"
            style={{ left: startX, top: startY }}
        />
    )
}

export default function QrSiparisClient({ esnafId, esnafAd, masaNo, katalog }: Props) {
    const session = useMasaSession(esnafId, masaNo, esnafAd)
    const store = useSepetStore()
    const [aktifKategori, setAktifKategori] = useState<string>('tumu')
    const [gonderiliyor, setGonderiliyor] = useState(false)
    const [upsellOpen, setUpsellOpen] = useState(false)
    const [siparisVerildi, setSiparisVerildi] = useState(false)
    const [adisyonId, setAdisyonId] = useState<string | null>(null)
    const [hesapAcik, setHesapAcik] = useState(false)
    const [flyParticles, setFlyParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
    const particleIdRef = useRef(0)
    const kategoriBarRef = useRef<HTMLDivElement>(null)

    // Zustand oturumunu başlat
    useEffect(() => {
        if (session.deviceId) {
            store.oturumBaslat(esnafId, masaNo, session.deviceId)
        }
    }, [session.deviceId, esnafId, masaNo])

    // Kategoriler
    const kategoriler = useMemo(() => {
        const set = new Set(katalog.map(k => k.kategori))
        return ['tumu', ...Array.from(set)]
    }, [katalog])

    const filtrelenmis = useMemo(() => {
        if (aktifKategori === 'tumu') return katalog
        return katalog.filter(k => k.kategori === aktifKategori)
    }, [katalog, aktifKategori])

    // Sepete ekle + fly animation
    const sepeteEkle = useCallback((item: KatalogItem, event: React.MouseEvent) => {
        const rect = (event.target as HTMLElement).getBoundingClientRect()
        const id = ++particleIdRef.current
        setFlyParticles(prev => [...prev, { id, x: rect.left, y: rect.top }])

        store.ekle({
            menuItemId: item.id,
            ad: item.ad,
            birimFiyatKurus: item.fiyatKurus,
            kdvTipi: (item.kdvTipi as SepetKalem['kdvTipi']) || 'gida',
            gorselUrl: item.gorselUrl,
        })
    }, [store])

    const removeFly = useCallback((id: number) => {
        setFlyParticles(prev => prev.filter(p => p.id !== id))
    }, [])

    // Sipariş gönder (upsell intercept)
    const siparisBaslat = useCallback(() => {
        if (store.kalemler.length === 0) return
        setUpsellOpen(true) // AI Upsell araya girer
    }, [store.kalemler])

    // Gerçek gönderim
    const siparisGonder = useCallback(async () => {
        if (gonderiliyor || store.kalemler.length === 0) return
        setGonderiliyor(true)
        setUpsellOpen(false)

        try {
            const res = await fetch('/api/restoran/masa-siparis', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    esnafId,
                    masaNo,
                    deviceId: session.deviceId,
                    kalemler: store.kalemler.map(k => ({
                        menuItemId: k.menuItemId,
                        ad: k.ad,
                        adet: k.adet,
                        birimFiyatKurus: k.birimFiyatKurus,
                        kdvTipi: k.kdvTipi,
                        notlar: k.notlar,
                    })),
                }),
            })

            const data = await res.json()
            if (data.ok) {
                setAdisyonId(data.adisyonId)
                setSiparisVerildi(true)
                store.temizle()
            }
        } finally {
            setGonderiliyor(false)
        }
    }, [gonderiliyor, store, esnafId, masaNo, session.deviceId])

    // ── Sipariş Verildi → Canlı Takip ──
    if (siparisVerildi && adisyonId) {
        return (
            <CanliTakipPanel
                esnafId={esnafId}
                esnafAd={esnafAd}
                masaNo={masaNo}
                adisyonId={adisyonId}
                onYeniSiparis={() => { setSiparisVerildi(false); setAdisyonId(null) }}
                onHesapIste={() => setHesapAcik(true)}
            />
        )
    }

    return (
        <div className="min-h-screen bg-neutral-950 text-white pb-28">
            {/* Fly particles */}
            <AnimatePresence>
                {flyParticles.map(p => (
                    <FlyParticle key={p.id} startX={p.x} startY={p.y} onComplete={() => removeFly(p.id)} />
                ))}
            </AnimatePresence>

            {/* Header */}
            <div className="sticky top-0 z-40 bg-neutral-950/80 backdrop-blur-2xl border-b border-white/5">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">{esnafAd}</h1>
                        <p className="text-[11px] text-neutral-500">Masa {masaNo} • Dijital Menü</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-[10px] text-emerald-400">Açık</span>
                    </div>
                </div>

                {/* Sticky Kategori Barı */}
                <div ref={kategoriBarRef} className="flex gap-2 px-4 pb-3 overflow-x-auto no-scrollbar">
                    {kategoriler.map(k => (
                        <button
                            key={k}
                            onClick={() => setAktifKategori(k)}
                            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                                aktifKategori === k
                                    ? 'bg-white text-black shadow-lg shadow-white/10'
                                    : 'bg-white/5 text-neutral-400 hover:bg-white/10'
                            }`}
                        >
                            {k === 'tumu' ? '🏠 Tümü' : (KATEGORI_LABELS[k] || k)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Menü Grid */}
            <div className="grid grid-cols-1 gap-3 p-4">
                <AnimatePresence mode="popLayout">
                    {filtrelenmis.map(item => {
                        const sepetteki = store.kalemler.find(k => k.menuItemId === item.id)
                        return (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white/[0.03] rounded-2xl p-4 border border-white/5 backdrop-blur-sm"
                            >
                                <div className="flex justify-between items-start gap-3">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-sm truncate">{item.ad}</h3>
                                            {item.spikeFlags?.vegan && <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full">🌱</span>}
                                            {item.spikeFlags?.acili && <span className="text-[10px]">🌶️</span>}
                                        </div>
                                        {item.aciklama && (
                                            <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2">{item.aciklama}</p>
                                        )}
                                        <p className="text-blue-400 font-bold text-sm mt-2">{kurusToTL(item.fiyatKurus)}</p>
                                    </div>

                                    {/* Adet kontrol veya Ekle butonu */}
                                    {sepetteki ? (
                                        <div className="flex items-center gap-2 bg-white/5 rounded-xl px-2 py-1">
                                            <button
                                                onClick={() => store.adetGuncelle(item.id, sepetteki.adet - 1)}
                                                className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-xs"
                                            >−</button>
                                            <span className="text-sm font-bold w-5 text-center">{sepetteki.adet}</span>
                                            <button
                                                onClick={(e) => sepeteEkle(item, e)}
                                                className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-xs"
                                            >+</button>
                                        </div>
                                    ) : (
                                        <motion.button
                                            whileTap={{ scale: 0.85 }}
                                            onClick={(e) => sepeteEkle(item, e)}
                                            className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-lg shadow-lg shadow-blue-500/20 shrink-0"
                                        >+</motion.button>
                                    )}
                                </div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>

            {/* Glassmorphism Sepet Bottom Bar */}
            <AnimatePresence>
                {store.kalemler.length > 0 && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-neutral-900/60 backdrop-blur-2xl border-t border-white/10"
                    >
                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={siparisBaslat}
                            disabled={gonderiliyor}
                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-neutral-700 disabled:to-neutral-700 rounded-2xl font-bold text-base flex items-center justify-between px-6 shadow-xl shadow-blue-500/15 transition-all"
                        >
                            <span className="flex items-center gap-2">
                                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs">
                                    {store.getToplamAdet()}
                                </span>
                                {gonderiliyor ? 'Gönderiliyor...' : 'Mutfağa İlet'}
                            </span>
                            <span>{kurusToTL(store.getToplamKurus())}</span>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* AI Upsell Bottom Sheet */}
            <UpsellBottomSheet
                acik={upsellOpen}
                kapat={() => { setUpsellOpen(false); siparisGonder() }}
                esnafId={esnafId}
                sepetKalemleri={store.kalemler}
                onEkle={(kalem) => {
                    store.ekle(kalem)
                }}
                onOnayla={siparisGonder}
            />

            {/* Alman Usulü Hesap */}
            {hesapAcik && adisyonId && (
                <AlmanUsuluHesap
                    esnafId={esnafId}
                    adisyonId={adisyonId}
                    kapat={() => setHesapAcik(false)}
                />
            )}
        </div>
    )
}
