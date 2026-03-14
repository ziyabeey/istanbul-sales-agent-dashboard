'use client'

/**
 * Emlak Dashboard — Patron Ana Panel
 * ══════════════════════════════════════════════════════════════════════
 * Portföy özeti, satış hunisi, platform senkronizasyon durumu,
 * danışman leaderboard, müşteri eşleşme alarmları.
 */

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { initializeApp, getApps } from 'firebase/app'
import {
    getFirestore,
    collection,
    query,
    onSnapshot,
    where,
    type DocumentData,
} from 'firebase/firestore'
import {
    MULK_DURUM_RENKLERI,
    ILAN_TIPI_LABEL,
    fiyatFormatla,
    type MulkDurum,
    type IlanTipi,
} from '@/lib/emlak/EmlakTypes'

// ─── Firebase Client Init ──────────────────────────────

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}
if (!getApps().length) initializeApp(firebaseConfig)
const db = getFirestore()

// ─── Tipler ────────────────────────────────────────────

interface MulkOzet {
    id: string
    baslik: string
    durum: MulkDurum
    ilanTipi: IlanTipi
    fiyatTL: number
    il: string
    ilce: string
    oda_sayisi: string
    metrekare: number
    danisman_adi: string
    goruntulenme_sayisi: number
}

interface DanismanOzet {
    id: string
    ad: string
    aktif_ilan_sayisi: number
    bu_ay_satis: number
    bu_ay_kiralama: number
    bu_ay_komisyon_TL: number
    aktif_musteri_sayisi: number
}

// ─── Component ──────────────────────────────────────────

export default function EmlakDashboardPage() {
    const [esnafId, setEsnafId] = useState('')
    const [mulkler, setMulkler] = useState<MulkOzet[]>([])
    const [danismanlar, setDanismanlar] = useState<DanismanOzet[]>([])
    const [seciliFiltre, setSeciliFiltre] = useState<MulkDurum | 'hepsi'>('hepsi')

    useEffect(() => {
        setEsnafId(localStorage.getItem('esnafId') || '')
    }, [])

    // Mülkler real-time
    useEffect(() => {
        if (!esnafId) return
        const q = query(collection(db, 'esnaflar', esnafId, 'mulkler'))
        return onSnapshot(q, (snap) => {
            setMulkler(snap.docs.map(d => {
                const data = d.data() as DocumentData
                return {
                    id: d.id,
                    baslik: data.baslik || '',
                    durum: data.durum || 'taslak',
                    ilanTipi: data.ilanTipi || 'satilik',
                    fiyatTL: data.fiyatTL || 0,
                    il: data.il || '',
                    ilce: data.ilce || '',
                    oda_sayisi: data.oda_sayisi || '',
                    metrekare: data.metrekare || 0,
                    danisman_adi: data.danisman_adi || '',
                    goruntulenme_sayisi: data.goruntulenme_sayisi || 0,
                }
            }))
        })
    }, [esnafId])

    // Danışmanlar real-time
    useEffect(() => {
        if (!esnafId) return
        const q = query(
            collection(db, 'esnaflar', esnafId, 'personel'),
            where('rol', '==', 'danisman')
        )
        return onSnapshot(q, (snap) => {
            setDanismanlar(snap.docs.map(d => {
                const data = d.data() as DocumentData
                return {
                    id: d.id,
                    ad: `${data.ad || ''}${data.soyad ? ' ' + data.soyad : ''}`,
                    aktif_ilan_sayisi: data.aktif_ilan_sayisi || 0,
                    bu_ay_satis: data.bu_ay_satis || 0,
                    bu_ay_kiralama: data.bu_ay_kiralama || 0,
                    bu_ay_komisyon_TL: data.bu_ay_komisyon_TL || 0,
                    aktif_musteri_sayisi: data.aktif_musteri_sayisi || 0,
                }
            }).sort((a, b) => b.bu_ay_komisyon_TL - a.bu_ay_komisyon_TL))
        })
    }, [esnafId])

    // Hesaplamalar
    const ozet = useMemo(() => {
        const toplam = mulkler.length
        const aktif = mulkler.filter(m => m.durum === 'ilan_aktif' || m.durum === 'gosterimde').length
        const teklifli = mulkler.filter(m => m.durum === 'teklif_alindi' || m.durum === 'pazarlikta').length
        const satildi = mulkler.filter(m => m.durum === 'satildi_kiralandi').length
        const satilik = mulkler.filter(m => m.ilanTipi === 'satilik').length
        const kiralik = mulkler.filter(m => m.ilanTipi === 'kiralik').length
        const topPortfoyDeger = mulkler
            .filter(m => !['arsiv', 'satildi_kiralandi'].includes(m.durum))
            .reduce((s, m) => s + m.fiyatTL, 0)
        return { toplam, aktif, teklifli, satildi, satilik, kiralik, topPortfoyDeger }
    }, [mulkler])

    // Huni verileri
    const huni = useMemo(() => {
        const durumSayilari: Record<string, number> = {}
        mulkler.forEach(m => { durumSayilari[m.durum] = (durumSayilari[m.durum] || 0) + 1 })
        return [
            { durum: 'taslak' as MulkDurum, sayi: durumSayilari['taslak'] || 0 },
            { durum: 'ilan_aktif' as MulkDurum, sayi: durumSayilari['ilan_aktif'] || 0 },
            { durum: 'gosterimde' as MulkDurum, sayi: durumSayilari['gosterimde'] || 0 },
            { durum: 'teklif_alindi' as MulkDurum, sayi: durumSayilari['teklif_alindi'] || 0 },
            { durum: 'pazarlikta' as MulkDurum, sayi: durumSayilari['pazarlikta'] || 0 },
            { durum: 'sozlesme_asamasi' as MulkDurum, sayi: durumSayilari['sozlesme_asamasi'] || 0 },
            { durum: 'satildi_kiralandi' as MulkDurum, sayi: durumSayilari['satildi_kiralandi'] || 0 },
        ]
    }, [mulkler])

    const filtrelenmis = useMemo(() => {
        if (seciliFiltre === 'hepsi') return mulkler
        return mulkler.filter(m => m.durum === seciliFiltre)
    }, [mulkler, seciliFiltre])

    if (!esnafId) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <p className="text-neutral-400">Esnaf ID bulunamadı.</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-neutral-950 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-black text-white">🏠 Emlak Yönetim Paneli</h1>
                    <p className="text-neutral-500 text-sm mt-0.5">Portföy, CRM ve platform takibi</p>
                </div>
                <div className="flex gap-2">
                    <Link href="/dashboard/emlak/portfoy" className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
                        📋 Portföy
                    </Link>
                    <Link href="/dashboard/emlak/musteriler" className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
                        👥 CRM
                    </Link>
                </div>
            </div>

            {/* ═══ ÖZET KARTLARI ═══ */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
                <OzetKutu emoji="🏠" baslik="Toplam İlan" deger={ozet.toplam.toString()} renk="text-white" />
                <OzetKutu emoji="✅" baslik="Aktif" deger={ozet.aktif.toString()} renk="text-emerald-400" />
                <OzetKutu emoji="📨" baslik="Teklif Var" deger={ozet.teklifli.toString()} renk="text-amber-400" />
                <OzetKutu emoji="🎉" baslik="Satıldı" deger={ozet.satildi.toString()} renk="text-rose-400" />
                <OzetKutu emoji="🏷️" baslik="Satılık" deger={ozet.satilik.toString()} renk="text-blue-400" />
                <OzetKutu emoji="🔑" baslik="Kiralık" deger={ozet.kiralik.toString()} renk="text-purple-400" />
                <OzetKutu emoji="💰" baslik="Portföy Değer" deger={fiyatFormatla(ozet.topPortfoyDeger)} renk="text-amber-400" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* ═══ SATIŞ HUNİSİ ═══ */}
                <div className="xl:col-span-2 bg-neutral-900 rounded-2xl p-5 border border-neutral-800">
                    <h2 className="text-lg font-bold text-white mb-4">📊 Satış Hunisi</h2>
                    <div className="space-y-2">
                        {huni.map((h, i) => {
                            const r = MULK_DURUM_RENKLERI[h.durum]
                            const maxSayi = Math.max(...huni.map(x => x.sayi), 1)
                            const genislik = Math.max(8, (h.sayi / maxSayi) * 100)

                            return (
                                <button
                                    key={h.durum}
                                    onClick={() => setSeciliFiltre(seciliFiltre === h.durum ? 'hepsi' : h.durum)}
                                    className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all ${
                                        seciliFiltre === h.durum ? 'ring-2 ring-white/30' : 'hover:bg-white/5'
                                    }`}
                                >
                                    <span className="text-white/60 text-xs w-6">{i + 1}.</span>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className={`text-sm font-medium ${r.text}`}>{r.label}</span>
                                            <span className="text-white font-bold text-sm">{h.sayi}</span>
                                        </div>
                                        <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                                            <motion.div
                                                className={`h-full rounded-full ${r.bg}`}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${genislik}%` }}
                                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                            />
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* ═══ DANIŞMAN LEADERBOARD ═══ */}
                <div className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800">
                    <h2 className="text-lg font-bold text-white mb-4">👥 Danışman Performans</h2>

                    {danismanlar.length === 0 ? (
                        <p className="text-neutral-500 text-sm">Danışman kaydı bulunamadı.</p>
                    ) : (
                        <div className="space-y-2">
                            {danismanlar.map((d, i) => {
                                const medali = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`
                                return (
                                    <div key={d.id} className="bg-neutral-800/50 rounded-xl px-4 py-3 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg w-7 text-center">{medali}</span>
                                            <div>
                                                <p className="text-white font-medium text-sm">{d.ad}</p>
                                                <p className="text-neutral-500 text-[10px]">
                                                    {d.aktif_ilan_sayisi} ilan · {d.bu_ay_satis} satış · {d.bu_ay_kiralama} kira · {d.aktif_musteri_sayisi} müşteri
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-amber-400 font-bold text-sm">{fiyatFormatla(d.bu_ay_komisyon_TL)}</p>
                                            <p className="text-neutral-600 text-[9px]">komisyon</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* ═══ SON İLANLAR ═══ */}
            <div className="mt-6 bg-neutral-900 rounded-2xl p-5 border border-neutral-800">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-white">📋 İlanlar {seciliFiltre !== 'hepsi' && `(${MULK_DURUM_RENKLERI[seciliFiltre].label})`}</h2>
                    {seciliFiltre !== 'hepsi' && (
                        <button onClick={() => setSeciliFiltre('hepsi')} className="text-xs text-neutral-400 hover:text-white">Filtreyi Kaldır ✕</button>
                    )}
                </div>

                {filtrelenmis.length === 0 ? (
                    <p className="text-neutral-500 text-sm">Bu kategoride ilan yok.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        <AnimatePresence>
                            {filtrelenmis.slice(0, 12).map((m) => {
                                const r = MULK_DURUM_RENKLERI[m.durum]
                                return (
                                    <motion.div
                                        key={m.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-700/50 hover:border-neutral-600 transition-colors"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${r.bg} text-white`}>
                                                {r.label}
                                            </span>
                                            <span className="text-[10px] text-neutral-500">
                                                {ILAN_TIPI_LABEL[m.ilanTipi]}
                                            </span>
                                        </div>
                                        <h3 className="text-white text-sm font-medium mb-1 line-clamp-1">{m.baslik}</h3>
                                        <p className="text-neutral-500 text-xs mb-2">
                                            📍 {m.ilce}, {m.il} · {m.oda_sayisi} · {m.metrekare}m²
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-emerald-400 font-bold text-sm">{fiyatFormatla(m.fiyatTL)}</span>
                                            <span className="text-neutral-600 text-[10px]">👁️ {m.goruntulenme_sayisi}</span>
                                        </div>
                                        <p className="text-neutral-600 text-[10px] mt-1">Danışman: {m.danisman_adi}</p>
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    )
}

// ─── Alt Komponent ─────────────

function OzetKutu({ emoji, baslik, deger, renk }: {
    emoji: string; baslik: string; deger: string; renk: string
}) {
    return (
        <div className="bg-neutral-900 rounded-xl p-3 border border-neutral-800 text-center">
            <p className="text-xl mb-0.5">{emoji}</p>
            <p className={`text-lg font-black ${renk}`}>{deger}</p>
            <p className="text-neutral-500 text-[10px] uppercase tracking-wide">{baslik}</p>
        </div>
    )
}
