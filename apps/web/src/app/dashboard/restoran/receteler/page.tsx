'use client'

/**
 * Reçete Yönetimi & Food Cost Radarı
 *
 * Sol: Menü listesi
 * Sağ: BOM ağacı + Food Cost sayacı + Fire Radarı
 */

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { initializeApp, getApps } from 'firebase/app'
import {
    getFirestore,
    collection,
    query,
    onSnapshot,
    type DocumentData,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}
if (!getApps().length) initializeApp(firebaseConfig)
const db = getFirestore()

// ─── Tipler ──────────────────────────────────────────────

interface ReceteDoc {
    id: string
    urunAdi: string
    kategori: string
    sektor?: string
    durum?: string
    kaynak?: string
    malzemeler: Array<{
        malzemeAdi: string
        miktar: number
        birim: string
        tip: string
        fire_orani: number
        alt_recete_id?: string
    }>
}

interface StokDoc {
    id: string
    urunAdi: string
    miktar: number
    birim?: string
    birimFiyatKurus?: number
    toplamSatis?: number
    beklenenKullanim?: number
}

function kurusToTL(k: number): string {
    return (k / 100).toFixed(2).replace('.', ',') + ' ₺'
}

const TIP_RENKLERI: Record<string, string> = {
    hammadde: 'bg-blue-500/20 text-blue-400',
    yari_mamul: 'bg-purple-500/20 text-purple-400',
    ambalaj: 'bg-amber-500/20 text-amber-400',
    sarf: 'bg-neutral-500/20 text-neutral-400',
}

const TIP_IKONLARI: Record<string, string> = {
    hammadde: '🥩', yari_mamul: '🧪', ambalaj: '📦', sarf: '🔧',
}

export default function RecetelerPage() {
    const [receteler, setReceteler] = useState<ReceteDoc[]>([])
    const [stoklar, setStoklar] = useState<StokDoc[]>([])
    const [seciliId, setSeciliId] = useState<string | null>(null)
    const [esnafId, setEsnafId] = useState('')
    const [aramaMetni, setAramaMetni] = useState('')

    useEffect(() => {
        setEsnafId(localStorage.getItem('esnafId') || '')
    }, [])

    // Reçeteleri dinle
    useEffect(() => {
        if (!esnafId) return
        const q = query(collection(db, 'esnaflar', esnafId, 'receteler'))
        return onSnapshot(q, (snap) => {
            setReceteler(snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<ReceteDoc, 'id'>) })))
        })
    }, [esnafId])

    // Stokları dinle
    useEffect(() => {
        if (!esnafId) return
        const q = query(collection(db, 'esnaflar', esnafId, 'stoklar'))
        return onSnapshot(q, (snap) => {
            setStoklar(snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<StokDoc, 'id'>) })))
        })
    }, [esnafId])

    const secili = receteler.find(r => r.id === seciliId) || null

    const filtrelenmis = useMemo(() => {
        if (!aramaMetni) return receteler
        const lower = aramaMetni.toLowerCase()
        return receteler.filter(r => r.urunAdi.toLowerCase().includes(lower))
    }, [receteler, aramaMetni])

    // Food Cost hesapla
    const foodCost = useMemo(() => {
        if (!secili) return null
        let toplamMaliyet = 0
        const kalemler = secili.malzemeler.map(m => {
            const stok = stoklar.find(s => s.urunAdi?.toLowerCase() === m.malzemeAdi?.toLowerCase())
            const birimFiyat = stok?.birimFiyatKurus || 0
            const fireliFactor = 1 + ((m.fire_orani || 0) / 100)
            const efektif = m.miktar * fireliFactor
            const maliyet = Math.round(birimFiyat * efektif)
            toplamMaliyet += maliyet
            return { ...m, birimFiyat, efektif, maliyet }
        })
        return { toplamMaliyet, kalemler }
    }, [secili, stoklar])

    // Fire radarı
    const fireAlarm = useMemo(() => {
        const alarmlar: Array<{ urunAdi: string; beklenen: number; gercek: number; fark: number; birim: string }> = []
        for (const stok of stoklar) {
            if (stok.toplamSatis && stok.beklenenKullanim) {
                const fark = (stok.beklenenKullanim || 0) - (stok.miktar || 0)
                if (fark > 0) {
                    alarmlar.push({
                        urunAdi: stok.urunAdi,
                        beklenen: stok.beklenenKullanim,
                        gercek: stok.miktar,
                        fark,
                        birim: stok.birim || 'adet',
                    })
                }
            }
        }
        return alarmlar
    }, [stoklar])

    if (!esnafId) {
        return <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-neutral-400">Esnaf ID bulunamadı</div>
    }

    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            {/* Header */}
            <div className="border-b border-white/5 px-6 py-5">
                <h1 className="text-2xl font-bold">🧬 Reçete & Food Cost Radarı</h1>
                <p className="text-sm text-neutral-500 mt-1">{receteler.length} reçete • BOM ağacı ve maliyet analizi</p>
            </div>

            {/* Fire Radarı */}
            {fireAlarm.length > 0 && (
                <div className="mx-6 mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <h3 className="text-sm font-bold text-red-400 mb-2">🔍 Fire Radarı — Kayıp Tespit Edildi</h3>
                    <div className="space-y-2">
                        {fireAlarm.map((a, i) => (
                            <div key={i} className="flex justify-between text-xs">
                                <span className="text-red-200">
                                    {a.urunAdi}: Beklenen {a.beklenen} {a.birim}, Gerçek {a.gercek} {a.birim}
                                </span>
                                <span className="text-red-400 font-bold">→ {a.fark.toFixed(1)} {a.birim} kayıp!</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex flex-col lg:flex-row">
                {/* Sol Panel: Menü Listesi */}
                <div className="w-full lg:w-80 border-r border-white/5 p-4 lg:h-[calc(100vh-120px)] overflow-y-auto">
                    <input
                        type="text"
                        placeholder="🔍 Reçete ara..."
                        value={aramaMetni}
                        onChange={e => setAramaMetni(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 mb-4 focus:outline-none focus:border-blue-500/50"
                    />

                    <div className="space-y-1.5">
                        {filtrelenmis.map(r => (
                            <button
                                key={r.id}
                                onClick={() => setSeciliId(r.id)}
                                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                                    seciliId === r.id
                                        ? 'bg-blue-600/20 border border-blue-500/30'
                                        : 'bg-white/[0.02] border border-transparent hover:bg-white/5'
                                }`}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm font-medium truncate">{r.urunAdi}</p>
                                        <p className="text-[10px] text-neutral-500 mt-0.5">
                                            {r.malzemeler.length} malzeme • {r.sektor}
                                        </p>
                                    </div>
                                    {r.kaynak === 'ai_tahmin' && (
                                        <span className="text-[10px] bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded-full">🤖 AI</span>
                                    )}
                                    {r.durum === 'taslak' && (
                                        <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded-full">Taslak</span>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sağ Panel: BOM Ağacı + Food Cost */}
                <div className="flex-1 p-6 lg:h-[calc(100vh-120px)] overflow-y-auto">
                    {secili ? (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={secili.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                            >
                                {/* Food Cost Sayacı */}
                                {foodCost && (
                                    <div className={`p-5 rounded-2xl border mb-6 ${
                                        foodCost.toplamMaliyet === 0
                                            ? 'bg-neutral-800/50 border-neutral-700/50'
                                            : (foodCost.toplamMaliyet / 100) > 30
                                                ? 'bg-red-500/10 border-red-500/30'
                                                : 'bg-emerald-500/10 border-emerald-500/30'
                                    }`}>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-xs text-neutral-400 uppercase tracking-wider">Food Cost (Gıda Maliyeti)</h3>
                                                <div className="flex items-baseline gap-3 mt-1">
                                                    <span className="text-3xl font-black">{kurusToTL(foodCost.toplamMaliyet)}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                {foodCost.toplamMaliyet > 0 && (
                                                    <p className="text-xs text-neutral-500">
                                                        İdeal oran: ≤%30
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        {foodCost.toplamMaliyet === 0 && (
                                            <p className="text-xs text-neutral-500 mt-2">
                                                💡 Stoklar B2B fiyatlarıyla eşleştirildiğinde maliyet otomatik hesaplanır
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* BOM Ağacı Başlığı */}
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-xl font-bold">{secili.urunAdi}</h2>
                                        <p className="text-xs text-neutral-500 mt-0.5">
                                            {secili.kategori} • {secili.malzemeler.length} kalem
                                        </p>
                                    </div>
                                </div>

                                {/* BOM Ağacı Tablosu */}
                                <div className="bg-white/[0.02] rounded-2xl border border-white/5 overflow-hidden">
                                    <div className="grid grid-cols-12 gap-2 px-4 py-2.5 text-[10px] text-neutral-500 uppercase tracking-wider border-b border-white/5">
                                        <span className="col-span-1">Tip</span>
                                        <span className="col-span-4">Malzeme</span>
                                        <span className="col-span-2 text-right">Miktar</span>
                                        <span className="col-span-1 text-right">Birim</span>
                                        <span className="col-span-2 text-right">Fire %</span>
                                        <span className="col-span-2 text-right">Maliyet</span>
                                    </div>

                                    {secili.malzemeler.map((m, i) => {
                                        const costKalem = foodCost?.kalemler[i]
                                        return (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.03 }}
                                                className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors items-center"
                                            >
                                                <span className="col-span-1 text-sm">{TIP_IKONLARI[m.tip] || '📋'}</span>
                                                <span className="col-span-4">
                                                    <span className="text-sm text-white">{m.malzemeAdi}</span>
                                                    {m.alt_recete_id && (
                                                        <span className="text-[10px] text-purple-400 ml-1.5">↳ nested</span>
                                                    )}
                                                </span>
                                                <span className="col-span-2 text-right text-sm font-mono text-neutral-300">
                                                    {m.miktar}
                                                </span>
                                                <span className="col-span-1 text-right text-[11px] text-neutral-500">
                                                    {m.birim}
                                                </span>
                                                <span className="col-span-2 text-right">
                                                    {m.fire_orani > 0 ? (
                                                        <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                                                            m.fire_orani >= 20 ? 'bg-red-500/20 text-red-400' :
                                                            m.fire_orani >= 10 ? 'bg-amber-500/20 text-amber-400' :
                                                            'bg-neutral-500/20 text-neutral-400'
                                                        }`}>
                                                            %{m.fire_orani}
                                                        </span>
                                                    ) : (
                                                        <span className="text-[11px] text-neutral-600">—</span>
                                                    )}
                                                </span>
                                                <span className="col-span-2 text-right text-sm font-mono text-neutral-400">
                                                    {costKalem?.maliyet ? kurusToTL(costKalem.maliyet) : '—'}
                                                </span>
                                            </motion.div>
                                        )
                                    })}
                                </div>

                                {/* Tip Dağılımı */}
                                <div className="flex gap-3 mt-4 flex-wrap">
                                    {Object.entries(
                                        secili.malzemeler.reduce((acc, m) => {
                                            acc[m.tip] = (acc[m.tip] || 0) + 1
                                            return acc
                                        }, {} as Record<string, number>)
                                    ).map(([tip, sayi]) => (
                                        <div key={tip} className={`px-3 py-1.5 rounded-full text-[11px] font-medium ${TIP_RENKLERI[tip] || ''}`}>
                                            {TIP_IKONLARI[tip]} {tip} ({sayi})
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    ) : (
                        <div className="h-full flex items-center justify-center text-neutral-600">
                            <div className="text-center">
                                <span className="text-5xl mb-4 block">🧬</span>
                                <p className="text-sm">Sol taraftan bir reçete seçin</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
