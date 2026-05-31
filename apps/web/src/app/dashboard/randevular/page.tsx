'use client'

/**
 * Randevu Takvim Dashboard — No-Show Korumalı Kokpit
 * ══════════════════════════════════════════════════════════════════════
 * Günlük/haftalık takvim, kapora durumu, kalan bakiye tahsilatı,
 * "Kaporayı Yak" (No-Show) butonu.
 */

import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    RANDEVU_RENKLERI,
    RANDEVU_DURUMLARI,
    saateDakika,
    type RandevuDurum,
} from '@/lib/randevu/RandevuTypes'
import { useEsnaf } from '@/context/EsnafContext'

// ─── Tipler ────────────────────────────────────

interface RandevuUI {
    id: string
    musteri_ad: string
    musteri_telefon: string
    hizmet_adi: string
    hizmet_suresi_dk: number
    personel_adi?: string
    tarih: string
    baslangic_saat: string
    bitis_saat: string
    durum: RandevuDurum
    kapora_tutar: number
    kapora_durum: string
    toplam_fiyat: number
    kalan_bakiye: number
    kilit_bitis?: number // ms
    musteri_notu?: string
    esnaf_notu?: string
}

// ─── Component ─────────────────────────────────

export default function RandevuDashboardPage() {
    const { esnafId, loading, isDemo } = useEsnaf()
    const [randevular, setRandevular] = useState<RandevuUI[]>([])
    const [seciliTarih, setSeciliTarih] = useState(() => new Date().toISOString().split('T')[0])
    const [seciliRandevu, setSeciliRandevu] = useState<RandevuUI | null>(null)
    const [drawerAcik, setDrawerAcik] = useState(false)
    const [yukleniyor, setYukleniyor] = useState(false)

    useEffect(() => {
        if (!esnafId) return

        let iptal = false
        Promise.resolve()
            .then(() => {
                if (!iptal) setYukleniyor(true)
            })
            .then(() => fetch(`/api/randevu?esnafId=${encodeURIComponent(esnafId)}`, { credentials: 'include' }))
            .then((res) => res.ok ? res.json() : { randevular: [] })
            .then((data) => {
                if (iptal) return
                const liste = Array.isArray(data.randevular) ? data.randevular : []
                setRandevular(
                    liste
                        .map(randevuKaydiToUI)
                        .filter((randevu) => randevu.tarih === seciliTarih)
                        .sort((a, b) => saateDakika(a.baslangic_saat) - saateDakika(b.baslangic_saat))
                )
            })
            .catch(() => {
                if (!iptal) setRandevular([])
            })
            .finally(() => {
                if (!iptal) setYukleniyor(false)
            })

        return () => { iptal = true }
    }, [esnafId, seciliTarih])

    // Haftalık günler
    const haftaGunleri = useMemo(() => {
        const base = new Date(seciliTarih + 'T12:00:00')
        const dayOfWeek = base.getDay()
        const monday = new Date(base)
        monday.setDate(base.getDate() - ((dayOfWeek + 6) % 7))

        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(monday)
            d.setDate(monday.getDate() + i)
            return {
                tarih: d.toISOString().split('T')[0],
                gun: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'][i],
                gunNo: d.getDate(),
                bugun: d.toISOString().split('T')[0] === new Date().toISOString().split('T')[0],
            }
        })
    }, [seciliTarih])

    // Drawer aç
    const randevuSec = useCallback((r: RandevuUI) => {
        setSeciliRandevu(r)
        setDrawerAcik(true)
    }, [])

    // Özet sayılar
    const ozet = useMemo(() => {
        const onayli = randevular.filter(r => r.durum === 'onaylandi').length
        const bekleyen = randevular.filter(r => r.durum === 'kapora_bekleniyor').length
        const tamamlanan = randevular.filter(r => r.durum === 'tamamlandi').length
        const noShow = randevular.filter(r => r.durum === 'no_show').length
        return { onayli, bekleyen, tamamlanan, noShow, toplam: randevular.length }
    }, [randevular])

    // Saat dilimleri (08:00 - 21:00)
    const saatDilimleri = useMemo(() => {
        return Array.from({ length: 14 }, (_, i) => {
            const h = 8 + i
            return `${h.toString().padStart(2, '0')}:00`
        })
    }, [])

    if (loading) {
        return <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
            <p className="text-neutral-400">Randevular yükleniyor...</p>
        </div>
    }

    if (!esnafId) {
        return <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
            <p className="text-neutral-400">Esnaf ID bulunamadı.</p>
        </div>
    }

    return (
        <div className="min-h-screen bg-neutral-950 p-4 md:p-6 relative">
            {/* ═══ HEADER ═══ */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-2xl font-black text-white">📅 Randevu Takvimi</h1>
                    <p className="text-neutral-500 text-sm">No-Show Korumalı • Kapora Takipli</p>
                </div>
                <div className="flex gap-2">
                    <MiniKart emoji="✅" deger={ozet.onayli} label="Onaylı" renk="text-emerald-400" />
                    <MiniKart emoji="⏳" deger={ozet.bekleyen} label="Bekleyen" renk="text-amber-400" />
                    <MiniKart emoji="✔️" deger={ozet.tamamlanan} label="Bitti" renk="text-blue-400" />
                    <MiniKart emoji="🚫" deger={ozet.noShow} label="No-Show" renk="text-rose-400" />
                </div>
            </div>

            {isDemo && (
                <div className="mb-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-3 text-sm font-medium text-indigo-200">
                    Demo modunda randevu işlemleri simülasyon amaçlıdır.
                </div>
            )}

            {/* ═══ HAFTA NAVİGASYONU ═══ */}
            <div className="flex items-center gap-1 mb-4 bg-neutral-900 rounded-xl p-1.5 border border-neutral-800">
                <button
                    onClick={() => {
                        const d = new Date(seciliTarih + 'T12:00:00')
                        d.setDate(d.getDate() - 7)
                        setSeciliTarih(d.toISOString().split('T')[0])
                    }}
                    className="text-neutral-400 hover:text-white px-3 py-2 text-sm"
                >
                    ← Önceki
                </button>

                {haftaGunleri.map(g => (
                    <button
                        key={g.tarih}
                        onClick={() => setSeciliTarih(g.tarih)}
                        className={`flex-1 flex flex-col items-center py-2 rounded-lg transition-all ${
                            g.tarih === seciliTarih
                                ? 'bg-emerald-600 text-white'
                                : g.bugun
                                    ? 'bg-blue-600/20 text-blue-400'
                                    : 'hover:bg-white/5 text-neutral-400'
                        }`}
                    >
                        <span className="text-[10px] font-bold uppercase">{g.gun}</span>
                        <span className="text-lg font-black">{g.gunNo}</span>
                    </button>
                ))}

                <button
                    onClick={() => {
                        const d = new Date(seciliTarih + 'T12:00:00')
                        d.setDate(d.getDate() + 7)
                        setSeciliTarih(d.toISOString().split('T')[0])
                    }}
                    className="text-neutral-400 hover:text-white px-3 py-2 text-sm"
                >
                    Sonraki →
                </button>
            </div>

            {/* ═══ TAKVİM GRID ═══ */}
            <div className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden">
                {yukleniyor && (
                    <div className="p-6 text-center text-neutral-400 text-sm">Randevular yükleniyor...</div>
                )}
                {saatDilimleri.map(saat => {
                    const saatRandevulari = randevular.filter(r => {
                        const rBas = saateDakika(r.baslangic_saat)
                        const slotBas = saateDakika(saat)
                        return rBas >= slotBas && rBas < slotBas + 60
                    })

                    return (
                        <div key={saat} className="flex border-b border-neutral-800/50 min-h-[60px]">
                            {/* Saat etiketi */}
                            <div className="w-16 md:w-20 flex-shrink-0 p-2 border-r border-neutral-800/50 flex items-start justify-end">
                                <span className="text-neutral-600 text-xs font-mono">{saat}</span>
                            </div>

                            {/* Randevu blokları */}
                            <div className="flex-1 p-1 flex flex-wrap gap-1">
                                {saatRandevulari.map(r => {
                                    const renk = RANDEVU_RENKLERI[r.durum]
                                    const bekliyor = r.durum === 'kapora_bekleniyor'
                                    const kalanSn = r.kilit_bitis ? Math.max(0, Math.floor((r.kilit_bitis - Date.now()) / 1000)) : 0

                                    return (
                                        <motion.button
                                            key={r.id}
                                            onClick={() => randevuSec(r)}
                                            className={`relative flex-1 min-w-[140px] max-w-[300px] rounded-xl px-3 py-2 border text-left transition-all hover:scale-[1.02] ${renk.bg} ${renk.border} ${
                                                bekliyor ? 'animate-pulse' : ''
                                            }`}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="flex items-center justify-between mb-0.5">
                                                <span className={`text-xs font-bold ${renk.text}`}>{r.baslangic_saat}–{r.bitis_saat}</span>
                                                {bekliyor && kalanSn > 0 && (
                                                    <span className="text-amber-400 text-[10px] font-mono animate-pulse">
                                                        ⏳ {Math.floor(kalanSn / 60)}:{(kalanSn % 60).toString().padStart(2, '0')}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-white text-sm font-medium truncate">{r.musteri_ad}</p>
                                            <p className="text-neutral-400 text-[10px] truncate">{r.hizmet_adi}</p>
                                            {r.personel_adi && (
                                                <p className="text-neutral-500 text-[9px]">💇 {r.personel_adi}</p>
                                            )}
                                        </motion.button>
                                    )
                                })}

                                {saatRandevulari.length === 0 && (
                                    <div className="flex-1 flex items-center justify-center">
                                        <span className="text-neutral-800 text-xs">—</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* ═══ DRAWER (Sağdan açılan panel) ═══ */}
            <AnimatePresence>
                {drawerAcik && seciliRandevu && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setDrawerAcik(false)}
                            className="fixed inset-0 bg-black/60 z-40"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed right-0 top-0 h-full w-full max-w-md bg-neutral-900 border-l border-neutral-700 z-50 overflow-y-auto"
                        >
                            <DrawerIcerik
                                randevu={seciliRandevu}
                                esnafId={esnafId}
                                isDemo={isDemo}
                                onKapat={() => setDrawerAcik(false)}
                            />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

// ═══ DRAWER İÇERİĞİ ═════════════════════════════════════════════════════

function DrawerIcerik({ randevu, esnafId, isDemo, onKapat }: {
    randevu: RandevuUI; esnafId: string; isDemo: boolean; onKapat: () => void
}) {
    const renk = RANDEVU_RENKLERI[randevu.durum]
    const [islem, setIslem] = useState<'idle' | 'loading' | 'done'>('idle')

    const noShowYap = async () => {
        if (!confirm('Müşteri gelmedi mi? Kapora İADE EDİLMEYECEK ve cayma bedeli olarak kaydedilecek.')) return
        setIslem('loading')
        try {
            await fetch(`/api/randevu/no-show`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ esnafId, randevuId: randevu.id }),
            })
            setIslem('done')
        } catch { setIslem('done') }
    }

    const bakiyeTahsilEt = async () => {
        setIslem('loading')
        try {
            await fetch(`/api/randevu/bakiye-tahsil`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ esnafId, randevuId: randevu.id }),
            })
            setIslem('done')
        } catch { setIslem('done') }
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">Randevu Detayı</h2>
                <button onClick={onKapat} className="text-neutral-400 hover:text-white text-xl">✕</button>
            </div>

            {/* Durum Badge */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${renk.bg} ${renk.text} mb-4`}>
                {renk.label}
            </div>

            {/* Müşteri */}
            <div className="bg-neutral-800/50 rounded-xl p-4 mb-3">
                <h3 className="text-neutral-500 text-[10px] uppercase tracking-wider mb-2">Müşteri</h3>
                <p className="text-white font-bold text-lg">{randevu.musteri_ad}</p>
                <p className="text-neutral-400 text-sm">📱 {randevu.musteri_telefon}</p>
            </div>

            {/* Hizmet */}
            <div className="bg-neutral-800/50 rounded-xl p-4 mb-3">
                <h3 className="text-neutral-500 text-[10px] uppercase tracking-wider mb-2">Hizmet</h3>
                <p className="text-white font-medium">{randevu.hizmet_adi}</p>
                <p className="text-neutral-400 text-sm">
                    📅 {randevu.tarih} · ⏰ {randevu.baslangic_saat}–{randevu.bitis_saat} · ⏱ {randevu.hizmet_suresi_dk}dk
                </p>
                {randevu.personel_adi && <p className="text-neutral-500 text-sm mt-1">💇 {randevu.personel_adi}</p>}
            </div>

            {/* Finansal */}
            <div className="bg-neutral-800/50 rounded-xl p-4 mb-3">
                <h3 className="text-neutral-500 text-[10px] uppercase tracking-wider mb-3">Ödeme Durumu</h3>

                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-neutral-400 text-sm">Toplam Hizmet Ücreti</span>
                        <span className="text-white font-bold">{randevu.toplam_fiyat.toLocaleString('tr-TR')} ₺</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-neutral-400 text-sm">Alınan Kapora</span>
                        <span className={`font-bold ${randevu.kapora_durum === 'odendi' ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {randevu.kapora_tutar.toLocaleString('tr-TR')} ₺
                            <span className="text-[10px] ml-1 text-neutral-500">
                                ({randevu.kapora_durum === 'odendi' ? '✅ ödendi' : '⏳ bekleniyor'})
                            </span>
                        </span>
                    </div>
                    <div className="h-px bg-neutral-700 my-1" />
                    <div className="flex justify-between">
                        <span className="text-white text-sm font-medium">Kalan Bakiye</span>
                        <span className="text-amber-400 font-black text-lg">{randevu.kalan_bakiye.toLocaleString('tr-TR')} ₺</span>
                    </div>
                </div>
            </div>

            {/* Notlar */}
            {(randevu.musteri_notu || randevu.esnaf_notu) && (
                <div className="bg-neutral-800/50 rounded-xl p-4 mb-3">
                    {randevu.musteri_notu && <p className="text-neutral-400 text-sm mb-1">💬 Müşteri: {randevu.musteri_notu}</p>}
                    {randevu.esnaf_notu && <p className="text-neutral-400 text-sm">📝 Esnaf: {randevu.esnaf_notu}</p>}
                </div>
            )}

            {isDemo && (
                <div className="mt-6 rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4">
                    <p className="text-indigo-200 text-sm font-bold">Demo modu</p>
                    <p className="text-indigo-100/70 text-xs mt-1">
                        Tahsilat ve no-show aksiyonları gerçek sistemlere gönderilmez.
                    </p>
                </div>
            )}

            {/* Aksiyonlar */}
            {!isDemo && randevu.durum === 'onaylandi' && (
                <div className="space-y-2 mt-6">
                    <button
                        onClick={bakiyeTahsilEt}
                        disabled={islem !== 'idle'}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                        💰 Kalan Bakiyeyi Tahsil Et ({randevu.kalan_bakiye.toLocaleString('tr-TR')} ₺)
                    </button>

                    <button
                        onClick={noShowYap}
                        disabled={islem !== 'idle'}
                        className="w-full bg-rose-600/20 hover:bg-rose-600/40 text-rose-400 font-bold py-3 rounded-xl transition-colors border border-rose-600/30 flex items-center justify-center gap-2"
                    >
                        🚨 No-Show — Kaporayı Yak
                    </button>
                </div>
            )}

            {randevu.durum === 'no_show' && (
                <div className="mt-6 bg-rose-900/20 border border-rose-700/30 rounded-xl p-4">
                    <p className="text-rose-400 font-bold text-sm">🔥 Kapora Yakıldı</p>
                    <p className="text-neutral-400 text-xs mt-1">
                        {randevu.kapora_tutar.toLocaleString('tr-TR')} ₺ cayma bedeli geliri olarak kaydedildi.
                    </p>
                </div>
            )}

            {islem === 'done' && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 bg-emerald-900/20 border border-emerald-700/30 rounded-xl p-3 text-center"
                >
                    <p className="text-emerald-400 font-bold text-sm">✅ İşlem tamamlandı</p>
                </motion.div>
            )}
        </div>
    )
}

function randevuKaydiToUI(kayit: Record<string, unknown>): RandevuUI {
    const hizmetSure = sayi(kayit.hizmet_suresi_dk) || 30
    const baslangic = metin(kayit.baslangic_saat) || metin(kayit.saat) || '09:00'
    const bitis = metin(kayit.bitis_saat) || bitisSaati(baslangic, hizmetSure)
    const kapora = nesne(kayit.kapora)

    return {
        id: metin(kayit.id) || metin(kayit.randevuId) || `randevu-${baslangic}`,
        musteri_ad: metin(kayit.musteri_ad) || metin(kayit.musteriAd) || '',
        musteri_telefon: metin(kayit.musteri_telefon) || metin(kayit.musteriTel) || '',
        hizmet_adi: metin(kayit.hizmet_adi) || metin(kayit.hizmet) || '',
        hizmet_suresi_dk: hizmetSure,
        personel_adi: metin(kayit.personel_adi),
        tarih: metin(kayit.tarih) || isoTarih(kayit.randevuZamani),
        baslangic_saat: baslangic,
        bitis_saat: bitis,
        durum: randevuDurumu(kayit.durum),
        kapora_tutar: sayi(kayit.kapora_tutar) || sayi(kapora.tutar_TL) || 0,
        kapora_durum: metin(kayit.kapora_durum) || metin(kapora.durum) || 'bekleniyor',
        toplam_fiyat: sayi(kayit.toplam_fiyat) || sayi(kayit.toplam_fiyat_TL) || 0,
        kalan_bakiye: sayi(kayit.kalan_bakiye) || sayi(kayit.kalan_bakiye_TL) || 0,
        kilit_bitis: millis(kayit.kilit_bitis),
        musteri_notu: metin(kayit.musteri_notu) || metin(kayit.notlar),
        esnaf_notu: metin(kayit.esnaf_notu),
    }
}

function metin(deger: unknown): string {
    return typeof deger === 'string' ? deger : ''
}

function sayi(deger: unknown): number {
    return typeof deger === 'number' ? deger : 0
}

function nesne(deger: unknown): Record<string, unknown> {
    return deger && typeof deger === 'object' ? deger as Record<string, unknown> : {}
}

function randevuDurumu(deger: unknown): RandevuDurum {
    return typeof deger === 'string' && RANDEVU_DURUMLARI.includes(deger as RandevuDurum)
        ? deger as RandevuDurum
        : 'kapora_bekleniyor'
}

function isoTarih(deger: unknown): string {
    if (typeof deger === 'string') return deger.slice(0, 10)
    return ''
}

function millis(deger: unknown): number | undefined {
    if (typeof deger === 'number') return deger
    if (deger && typeof deger === 'object' && 'seconds' in deger && typeof deger.seconds === 'number') {
        return deger.seconds * 1000
    }
    return undefined
}

function bitisSaati(baslangic: string, sureDk: number): string {
    const [saat, dakika] = baslangic.split(':').map(Number)
    const toplam = (saat * 60) + dakika + sureDk
    const bitisSaat = Math.floor(toplam / 60).toString().padStart(2, '0')
    const bitisDakika = (toplam % 60).toString().padStart(2, '0')
    return `${bitisSaat}:${bitisDakika}`
}

// ─── Alt Komponent ─────────────

function MiniKart({ emoji, deger, label, renk }: {
    emoji: string; deger: number; label: string; renk: string
}) {
    return (
        <div className="bg-neutral-900 rounded-xl px-3 py-2 border border-neutral-800 text-center min-w-[60px]">
            <p className="text-sm">{emoji}</p>
            <p className={`text-lg font-black ${renk}`}>{deger}</p>
            <p className="text-neutral-600 text-[8px] uppercase">{label}</p>
        </div>
    )
}
