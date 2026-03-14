'use client'

/**
 * Salon Radarı — Yönetici Analitik Dashboard
 * ══════════════════════════════════════════════════════════════════════
 * Patronun tüm restoranı tepeden gördüğü "kuşbakışı" ekran:
 *
 * - Masa Grid: Renkli masa haritası (Boş=Gri, Yemekte=Yeşil, Kirli=Kırmızı)
 * - Garson Leaderboard: Aktif masa, toplam baktığı, bahşiş kazancı
 * - Kirli Masa Alarmı: 10dk+ kirli masalar yanıp söner
 * - Tıklayarak sorumlu garson bilgisi görme
 */

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Firebase Client SDK
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
    MASA_DURUM_RENKLERI,
    type MasaDurum,
    type PersonelDurum,
} from '@/lib/restoran/MasaTypes'

// ─── Firebase Client Init ──────────────────────────────────────────────

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}

if (!getApps().length) initializeApp(firebaseConfig)
const db = getFirestore()

// ─── Tipler ────────────────────────────────────────────────────────────

interface MasaRadar {
    id: string
    no: number
    durum: MasaDurum
    bolge?: string
    atanan_garson_id?: string
    atanan_garson_adi?: string
    son_durum_degisim: Date
    oturum_ciro_kurus: number
}

interface GarsonRadar {
    id: string
    ad: string
    soyad?: string
    durum: PersonelDurum
    aktif_masa_sayisi: number
    bugun_toplam_masa: number
    bugun_toplam_bahsis_kurus: number
}

function kurusToTL(k: number) { return (k / 100).toFixed(2).replace('.', ',') + ' ₺' }

// ─── Component ─────────────────────────────────────────────────────────

export default function SalonRadariPage() {
    const [masalar, setMasalar] = useState<MasaRadar[]>([])
    const [garsonlar, setGarsonlar] = useState<GarsonRadar[]>([])
    const [esnafId, setEsnafId] = useState<string>('')
    const [now, setNow] = useState(Date.now())
    const [seciliMasa, setSeciliMasa] = useState<MasaRadar | null>(null)

    useEffect(() => {
        setEsnafId(localStorage.getItem('esnafId') || '')
    }, [])

    // Canlı sayaç
    useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 1000)
        return () => clearInterval(timer)
    }, [])

    // ── Masalar Real-time ──
    useEffect(() => {
        if (!esnafId) return

        const q = query(collection(db, 'esnaflar', esnafId, 'masalar'))
        const unsub = onSnapshot(q, (snap) => {
            const docs: MasaRadar[] = snap.docs.map((d) => {
                const data = d.data() as DocumentData
                return {
                    id: d.id,
                    no: data.no || 0,
                    durum: data.durum || 'bos',
                    bolge: data.bolge,
                    atanan_garson_id: data.atanan_garson_id,
                    atanan_garson_adi: data.atanan_garson_adi,
                    son_durum_degisim: data.son_durum_degisim?.toDate?.() || new Date(),
                    oturum_ciro_kurus: data.oturum_ciro_kurus || 0,
                }
            }).sort((a, b) => a.no - b.no)

            setMasalar(docs)
        })

        return () => unsub()
    }, [esnafId])

    // ── Garsonlar Real-time ──
    useEffect(() => {
        if (!esnafId) return

        const q = query(
            collection(db, 'esnaflar', esnafId, 'personel'),
            where('rol', '==', 'garson')
        )
        const unsub = onSnapshot(q, (snap) => {
            const docs: GarsonRadar[] = snap.docs.map((d) => {
                const data = d.data() as DocumentData
                return {
                    id: d.id,
                    ad: data.ad || '',
                    soyad: data.soyad,
                    durum: data.durum || 'offline',
                    aktif_masa_sayisi: data.aktif_masa_sayisi || 0,
                    bugun_toplam_masa: data.bugun_toplam_masa || 0,
                    bugun_toplam_bahsis_kurus: data.bugun_toplam_bahsis_kurus || 0,
                }
            }).sort((a, b) => b.aktif_masa_sayisi - a.aktif_masa_sayisi)

            setGarsonlar(docs)
        })

        return () => unsub()
    }, [esnafId])

    // ── Hesaplamalar ──
    const kirliMasalar = useMemo(() => {
        return masalar.filter(m => {
            if (m.durum !== 'hesap_odendi_kirli' && m.durum !== 'temizleniyor') return false
            const beklemeSn = Math.round((now - m.son_durum_degisim.getTime()) / 1000)
            return beklemeSn > 600 // 10dk+
        })
    }, [masalar, now])

    const ozet = useMemo(() => {
        const bos = masalar.filter(m => m.durum === 'bos').length
        const dolu = masalar.filter(m => !['bos', 'hesap_odendi_kirli', 'temizleniyor'].includes(m.durum)).length
        const kirli = masalar.filter(m => m.durum === 'hesap_odendi_kirli' || m.durum === 'temizleniyor').length
        const toplamCiro = masalar.reduce((s, m) => s + m.oturum_ciro_kurus, 0)
        return { bos, dolu, kirli, toplam: masalar.length, toplamCiro }
    }, [masalar])

    function beklemeSure(baslangic: Date): string {
        const fark = Math.max(0, Math.round((now - baslangic.getTime()) / 1000))
        const dk = Math.floor(fark / 60)
        const sn = fark % 60
        return `${dk}dk ${sn}sn`
    }

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
                    <h1 className="text-2xl font-black text-white">📡 Salon Radarı</h1>
                    <p className="text-neutral-500 text-sm mt-0.5">Kuşbakışı restoran takibi</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-emerald-400 text-sm font-medium">Canlı</span>
                </div>
            </div>

            {/* ═══ KİRLİ MASA ALARMLARI ═══ */}
            {kirliMasalar.length > 0 && (
                <div className="mb-6 space-y-2">
                    {kirliMasalar.map(m => (
                        <motion.div
                            key={m.id}
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="bg-red-950/50 border-2 border-red-500 rounded-xl px-4 py-3 flex items-center justify-between"
                        >
                            <div>
                                <p className="text-red-400 font-bold text-sm">
                                    🚨 Masa {m.no} — {beklemeSure(m.son_durum_degisim)} süredir kirli!
                                </p>
                                <p className="text-red-500/70 text-xs mt-0.5">
                                    Sorumlu: {m.atanan_garson_adi || 'Atanmamış'} — masayı temizlemeyi unutmuş
                                </p>
                            </div>
                            <span className="text-red-400 text-2xl">⚠️</span>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* ═══ ÖZET KARTLARI ═══ */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                <OzetKutu baslik="Toplam Masa" deger={ozet.toplam.toString()} renk="text-blue-400" emoji="🪑" />
                <OzetKutu baslik="Boş" deger={ozet.bos.toString()} renk="text-neutral-400" emoji="⬜" />
                <OzetKutu baslik="Dolu" deger={ozet.dolu.toString()} renk="text-emerald-400" emoji="🟢" />
                <OzetKutu baslik="Kirli" deger={ozet.kirli.toString()} renk="text-red-400" emoji="🔴" />
                <OzetKutu baslik="Ciro" deger={kurusToTL(ozet.toplamCiro)} renk="text-amber-400" emoji="💰" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* ═══ MASA GRİD ═══ */}
                <div className="xl:col-span-2 bg-neutral-900 rounded-2xl p-5 border border-neutral-800">
                    <h2 className="text-lg font-bold text-white mb-4">🗺️ Masa Haritası</h2>
                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
                        {masalar.map(masa => {
                            const renk = MASA_DURUM_RENKLERI[masa.durum]
                            const kirliAlarm = (masa.durum === 'hesap_odendi_kirli' || masa.durum === 'temizleniyor') &&
                                (now - masa.son_durum_degisim.getTime()) > 600000
                            const aktif = seciliMasa?.id === masa.id

                            return (
                                <motion.button
                                    key={masa.id}
                                    onClick={() => setSeciliMasa(aktif ? null : masa)}
                                    animate={kirliAlarm ? { scale: [1, 1.05, 1], opacity: [1, 0.6, 1] } : {}}
                                    transition={kirliAlarm ? { repeat: Infinity, duration: 1 } : {}}
                                    className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5 border-2 transition-all ${
                                        aktif
                                            ? 'border-white ring-2 ring-blue-500 scale-110'
                                            : 'border-transparent'
                                    } ${renk.bg}`}
                                >
                                    <span className="text-white font-black text-lg">{masa.no}</span>
                                    <span className="text-[8px] text-white/70 font-medium">
                                        {renk.label}
                                    </span>
                                </motion.button>
                            )
                        })}
                    </div>

                    {/* Masa Detay Popup */}
                    <AnimatePresence>
                        {seciliMasa && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="mt-4 bg-neutral-800 rounded-xl p-4 border border-neutral-700"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-white font-bold">Masa {seciliMasa.no}</h3>
                                    <button onClick={() => setSeciliMasa(null)} className="text-neutral-500 hover:text-white">✕</button>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <span className="text-neutral-500">Durum:</span>
                                        <span className={`ml-2 font-bold ${MASA_DURUM_RENKLERI[seciliMasa.durum].text}`}>
                                            {MASA_DURUM_RENKLERI[seciliMasa.durum].label}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-neutral-500">Garson:</span>
                                        <span className="ml-2 text-white font-medium">
                                            {seciliMasa.atanan_garson_adi || 'Atanmamış'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-neutral-500">Süre:</span>
                                        <span className="ml-2 text-amber-400 font-mono">
                                            {beklemeSure(seciliMasa.son_durum_degisim)}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-neutral-500">Ciro:</span>
                                        <span className="ml-2 text-emerald-400 font-bold">
                                            {kurusToTL(seciliMasa.oturum_ciro_kurus)}
                                        </span>
                                    </div>
                                    {seciliMasa.bolge && (
                                        <div className="col-span-2">
                                            <span className="text-neutral-500">Bölge:</span>
                                            <span className="ml-2 text-white">{seciliMasa.bolge}</span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ═══ GARSON LEADERBOARD ═══ */}
                <div className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800">
                    <h2 className="text-lg font-bold text-white mb-4">👥 Garson Durumu</h2>

                    {garsonlar.length === 0 ? (
                        <p className="text-neutral-500 text-sm">Personel kaydı bulunamadı.</p>
                    ) : (
                        <div className="space-y-2">
                            {garsonlar.map((g, i) => {
                                const durumRenk = g.durum === 'online'
                                    ? 'bg-emerald-500'
                                    : g.durum === 'mola'
                                    ? 'bg-amber-500'
                                    : 'bg-neutral-600'

                                const durumLabel = g.durum === 'online'
                                    ? 'Online'
                                    : g.durum === 'mola'
                                    ? 'Mola'
                                    : 'Offline'

                                const medali = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`

                                return (
                                    <div
                                        key={g.id}
                                        className="bg-neutral-800/50 rounded-xl px-4 py-3 flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg w-7 text-center">{medali}</span>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-white font-medium text-sm">
                                                        {g.ad}{g.soyad ? ` ${g.soyad}` : ''}
                                                    </p>
                                                    <div className="flex items-center gap-1">
                                                        <div className={`w-2 h-2 rounded-full ${durumRenk}`} />
                                                        <span className="text-[9px] text-neutral-500">{durumLabel}</span>
                                                    </div>
                                                </div>
                                                <p className="text-neutral-500 text-[10px]">
                                                    {g.aktif_masa_sayisi} aktif · Bugün: {g.bugun_toplam_masa} masa
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-amber-400 font-bold text-sm">
                                                {kurusToTL(g.bugun_toplam_bahsis_kurus)}
                                            </p>
                                            <p className="text-neutral-600 text-[9px]">bahşiş</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {/* Renk Açıklaması */}
                    <div className="mt-4 pt-4 border-t border-neutral-800 flex flex-wrap gap-3">
                        {(['bos', 'teslim_edildi', 'mutfakta_hazirlaniyor', 'hesap_odendi_kirli'] as MasaDurum[]).map(d => {
                            const r = MASA_DURUM_RENKLERI[d]
                            return (
                                <div key={d} className="flex items-center gap-1.5">
                                    <div className={`w-3 h-3 rounded ${r.bg}`} />
                                    <span className="text-[10px] text-neutral-500">{r.label}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

// ─── Alt Komponent ─────────────────────────────────────────────────────

function OzetKutu({ baslik, deger, renk, emoji }: {
    baslik: string; deger: string; renk: string; emoji: string
}) {
    return (
        <div className="bg-neutral-900 rounded-xl p-3 border border-neutral-800 text-center">
            <p className="text-xl mb-0.5">{emoji}</p>
            <p className={`text-xl font-black ${renk}`}>{deger}</p>
            <p className="text-neutral-500 text-[10px] uppercase tracking-wide">{baslik}</p>
        </div>
    )
}
