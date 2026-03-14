'use client'

/**
 * KDS — Mutfak Ekranı (Kitchen Display System)
 * ══════════════════════════════════════════════════════════════════════
 * Alman Usulü (ödeme önce) akışına uyumlu 3 kolon Kanban:
 *   💰 Ödendi (Bekliyor) → 👨‍🍳 Hazırlanıyor → ✅ Hazır (Tezgaha Çıktı)
 *
 * Aşçı "İlerlet" dediğinde:
 * - Ödendi→Hazırlanıyor: mutfak_baslama_ani damgası
 * - Hazırlanıyor→Hazır: mutfak_bitis_ani damgası + Garson bildirim
 *
 * Firestore onSnapshot real-time, Ding! sesi, 80mm termal yazdırma.
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Firebase Client SDK
import { initializeApp, getApps } from 'firebase/app'
import {
    getFirestore,
    collection,
    query,
    where,
    onSnapshot,
    doc,
    updateDoc,
    orderBy,
    serverTimestamp,
    type DocumentData,
} from 'firebase/firestore'

// ─── Firebase Client Init ──────────────────────────────────────────────

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}

if (!getApps().length) initializeApp(firebaseConfig)
const db = getFirestore()

// ─── Tipler ────────────────────────────────────────────────────────────

type AlmanDurum = 'odendi_mutfak_bekliyor' | 'mutfakta_hazirlaniyor' | 'barda_garson_bekliyor'

interface AdisyonKalem {
    ad: string
    adet: number
    birimFiyatKurus: number
    toplamKurus: number
    notlar?: string
}

interface KDSAdisyon {
    id: string
    masaNo?: number
    kaynak: string
    durum: AlmanDurum
    kalemler: AdisyonKalem[]
    toplamKurus: number
    kdvToplamKurus?: number
    notlar?: string
    musteriAd?: string
    olusturma: Date
    siparis_ani?: Date
    disPlatform?: { platformSiparisId: string; platform: string }
}

// ─── Sabitler ──────────────────────────────────────────────────────────

const KOLONLAR: { durum: AlmanDurum; baslik: string; renk: string; sonrakiDurum: AlmanDurum | null; timestampAlan: string | null }[] = [
    {
        durum: 'odendi_mutfak_bekliyor',
        baslik: '💰 Ödendi — Bekliyor',
        renk: 'border-amber-500',
        sonrakiDurum: 'mutfakta_hazirlaniyor',
        timestampAlan: 'mutfak_baslama_ani',
    },
    {
        durum: 'mutfakta_hazirlaniyor',
        baslik: '👨‍🍳 Hazırlanıyor',
        renk: 'border-orange-500',
        sonrakiDurum: 'barda_garson_bekliyor',
        timestampAlan: 'mutfak_bitis_ani',
    },
    {
        durum: 'barda_garson_bekliyor',
        baslik: '✅ Hazır — Tezgahta',
        renk: 'border-emerald-500',
        sonrakiDurum: null,
        timestampAlan: null,
    },
]

const KAYNAK_BADGE: Record<string, { bg: string; label: string }> = {
    masa: { bg: 'bg-blue-600', label: 'Masa' },
    yemeksepeti: { bg: 'bg-red-600', label: 'Yemeksepeti' },
    trendyol: { bg: 'bg-orange-500', label: 'Trendyol' },
    getir: { bg: 'bg-purple-600', label: 'Getir' },
    paket: { bg: 'bg-emerald-600', label: 'Paket' },
    telefon: { bg: 'bg-gray-600', label: 'Telefon' },
}

function kurusToTL(k: number) { return (k / 100).toFixed(2).replace('.', ',') + ' ₺' }

function gecenSure(baslangic: Date): string {
    const fark = Math.round((Date.now() - baslangic.getTime()) / 1000)
    const dk = Math.floor(fark / 60)
    const sn = fark % 60
    return `${dk.toString().padStart(2, '0')}:${sn.toString().padStart(2, '0')}`
}

// ─── Component ─────────────────────────────────────────────────────────

export default function KDSPage() {
    const [adisyonlar, setAdisyonlar] = useState<KDSAdisyon[]>([])
    const [esnafId, setEsnafId] = useState<string>('')
    const [yazdirilacak, setYazdirilacak] = useState<KDSAdisyon | null>(null)
    const [now, setNow] = useState(Date.now())
    const prevCountRef = useRef(0)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    // Esnaf ID
    useEffect(() => {
        setEsnafId(localStorage.getItem('esnafId') || '')
    }, [])

    // Ding! sesi
    useEffect(() => {
        audioRef.current = new Audio('/sounds/ding.mp3')
        audioRef.current.volume = 0.8
    }, [])

    // Canlı sayaç — her saniye güncelle
    useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 1000)
        return () => clearInterval(timer)
    }, [])

    // ── Firestore onSnapshot ──
    useEffect(() => {
        if (!esnafId) return

        const q = query(
            collection(db, 'esnaflar', esnafId, 'aktif_adisyonlar'),
            where('durum', 'in', ['odendi_mutfak_bekliyor', 'mutfakta_hazirlaniyor', 'barda_garson_bekliyor']),
            orderBy('olusturma', 'desc')
        )

        const unsub = onSnapshot(q, (snap) => {
            const docs: KDSAdisyon[] = snap.docs.map((d) => {
                const data = d.data() as DocumentData
                return {
                    id: d.id,
                    masaNo: data.masaNo,
                    kaynak: data.kaynak || 'masa',
                    durum: data.durum || 'odendi_mutfak_bekliyor',
                    kalemler: data.kalemler || [],
                    toplamKurus: data.toplamKurus || 0,
                    kdvToplamKurus: data.kdvToplamKurus,
                    notlar: data.notlar,
                    musteriAd: data.musteriAd,
                    olusturma: data.olusturma?.toDate?.() || new Date(),
                    siparis_ani: data.siparis_ani?.toDate?.() || data.olusturma?.toDate?.() || new Date(),
                    disPlatform: data.disPlatform,
                }
            })

            // Yeni sipariş → Ding!
            const yeniSayisi = docs.filter(d => d.durum === 'odendi_mutfak_bekliyor').length
            if (yeniSayisi > prevCountRef.current) {
                audioRef.current?.play().catch(() => {})
            }
            prevCountRef.current = yeniSayisi

            setAdisyonlar(docs)
        })

        return () => unsub()
    }, [esnafId])

    // ── Durum + Timestamp Güncelle ──
    const durumIlerlet = useCallback(async (adisyonId: string, kolon: typeof KOLONLAR[number]) => {
        if (!esnafId || !kolon.sonrakiDurum) return
        const ref = doc(db, 'esnaflar', esnafId, 'aktif_adisyonlar', adisyonId)

        const updates: any = {
            durum: kolon.sonrakiDurum,
            guncelleme: serverTimestamp(),
        }
        // İlgili zaman damgasını vur
        if (kolon.timestampAlan) {
            updates[kolon.timestampAlan] = serverTimestamp()
        }

        await updateDoc(ref, updates)

        // "Hazır" olduysa → Garson bildirim toast (ileride FCM)
        if (kolon.sonrakiDurum === 'barda_garson_bekliyor') {
            const adisyon = adisyonlar.find(a => a.id === adisyonId)
            const masaLabel = adisyon?.masaNo ? `Masa ${adisyon.masaNo}` : 'Paket'
            const ilkUrun = adisyon?.kalemler?.[0]?.ad || 'Sipariş'

            // Browser Notification (PWA)
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('🔔 Sipariş Hazır!', {
                    body: `${masaLabel}: ${ilkUrun} tezgahta hazır, soğumadan teslim et!`,
                    icon: '/icons/icon-192x192.png',
                })
            }
        }
    }, [esnafId, adisyonlar])

    // ── Yazdırma ──
    const yazdir = useCallback((adisyon: KDSAdisyon) => {
        setYazdirilacak(adisyon)
        setTimeout(() => window.print(), 300)
    }, [])

    if (!esnafId) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <p className="text-neutral-400">Esnaf ID bulunamadı. Lütfen dashboard&apos;dan giriş yapın.</p>
            </div>
        )
    }

    return (
        <>
            {/* Ana Kanban Görünümü */}
            <div className="min-h-screen bg-neutral-950 p-4 print:hidden">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-white">🍳 Mutfak KDS — Alman Usulü</h1>
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-sm text-emerald-400 font-medium">Canlı</span>
                        <span className="text-sm text-neutral-500">
                            {adisyonlar.filter(a => a.durum === 'odendi_mutfak_bekliyor').length} bekleyen
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {KOLONLAR.map(kolon => {
                        const kolonAdisyonlar = adisyonlar.filter(a => a.durum === kolon.durum)
                        return (
                            <div key={kolon.durum} className={`bg-neutral-900 rounded-2xl border-t-4 ${kolon.renk} p-4 min-h-[300px]`}>
                                <h2 className="text-sm font-bold text-neutral-300 mb-3 flex items-center gap-2">
                                    {kolon.baslik}
                                    <span className="bg-neutral-800 px-2 py-0.5 rounded-full text-xs">{kolonAdisyonlar.length}</span>
                                </h2>

                                <div className="space-y-3">
                                    <AnimatePresence>
                                        {kolonAdisyonlar.map(adisyon => {
                                            const badge = KAYNAK_BADGE[adisyon.kaynak] || KAYNAK_BADGE.masa
                                            return (
                                                <motion.div
                                                    key={adisyon.id}
                                                    layout
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, x: 100 }}
                                                    className="bg-neutral-800 rounded-xl p-3 border border-neutral-700"
                                                >
                                                    {/* Header */}
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <span className={`${badge.bg} text-white text-[10px] px-2 py-0.5 rounded-full font-medium`}>
                                                                {badge.label}
                                                            </span>
                                                            {adisyon.masaNo && adisyon.masaNo > 0 && (
                                                                <span className="text-blue-400 text-xs font-bold">
                                                                    Masa {adisyon.masaNo}
                                                                </span>
                                                            )}
                                                            {/* ÖDENDİ rozeti */}
                                                            <span className="bg-emerald-600 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                                                                💳 ÖDENDİ
                                                            </span>
                                                        </div>
                                                        {/* Canlı sayaç */}
                                                        <span className="text-[11px] font-mono text-amber-400">
                                                            ⏱ {adisyon.siparis_ani ? gecenSure(adisyon.siparis_ani) : '--:--'}
                                                        </span>
                                                    </div>

                                                    {/* Kalemler */}
                                                    <div className="space-y-1 mb-2">
                                                        {adisyon.kalemler.map((k, i) => (
                                                            <div key={i} className="flex justify-between text-xs">
                                                                <span className="text-neutral-300">
                                                                    <span className="text-white font-bold">{k.adet}x</span> {k.ad}
                                                                </span>
                                                            </div>
                                                        ))}
                                                        {adisyon.notlar && (
                                                            <p className="text-[10px] text-amber-400 mt-1">📝 {adisyon.notlar}</p>
                                                        )}
                                                    </div>

                                                    {/* Footer */}
                                                    <div className="flex justify-between items-center pt-2 border-t border-neutral-700">
                                                        <span className="font-bold text-sm text-emerald-400">{kurusToTL(adisyon.toplamKurus)}</span>
                                                        <div className="flex gap-1">
                                                            <button
                                                                onClick={() => yazdir(adisyon)}
                                                                className="px-2 py-1 bg-neutral-700 text-neutral-300 text-[10px] rounded-lg hover:bg-neutral-600"
                                                            >🖨️</button>
                                                            {kolon.sonrakiDurum && (
                                                                <button
                                                                    onClick={() => durumIlerlet(adisyon.id, kolon)}
                                                                    className="px-3 py-1 bg-blue-600 text-white text-[10px] rounded-lg hover:bg-blue-500 font-medium"
                                                                >
                                                                    {kolon.sonrakiDurum === 'mutfakta_hazirlaniyor' ? '👨‍🍳 Başla' : '✅ Hazır!'}
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )
                                        })}
                                    </AnimatePresence>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* 80mm Termal Yazdırma Şablonu */}
            {yazdirilacak && (
                <div className="hidden print:block w-[80mm] mx-auto font-mono text-[11px] leading-tight p-2">
                    <div className="text-center border-b border-dashed border-black pb-2 mb-2">
                        <p className="font-bold text-sm">ADİSYON — 💳 ÖDENDİ</p>
                        <p className="text-[9px]">{yazdirilacak.olusturma.toLocaleString('tr-TR')}</p>
                        {yazdirilacak.masaNo && yazdirilacak.masaNo > 0 && (
                            <p className="font-bold">Masa: {yazdirilacak.masaNo}</p>
                        )}
                    </div>

                    <table className="w-full mb-2">
                        <thead>
                            <tr className="border-b border-dashed border-black">
                                <th className="text-left text-[9px]">Ürün</th>
                                <th className="text-center text-[9px] w-6">Ad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {yazdirilacak.kalemler.map((k, i) => (
                                <tr key={i}>
                                    <td className="text-left py-0.5">{k.ad}</td>
                                    <td className="text-center">{k.adet}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="border-t border-dashed border-black pt-1">
                        <div className="flex justify-between font-bold text-sm">
                            <span>TOPLAM:</span>
                            <span>{kurusToTL(yazdirilacak.toplamKurus)}</span>
                        </div>
                    </div>

                    <div className="text-center mt-3 text-[8px] text-neutral-500">
                        kepenk.ai ile güçlendirilmiştir
                    </div>
                </div>
            )}

            {/* Print CSS */}
            <style jsx global>{`
                @media print {
                    @page { size: 80mm auto; margin: 0; }
                    body * { visibility: hidden; }
                    .print\\:block, .print\\:block * { visibility: visible !important; }
                }
            `}</style>
        </>
    )
}
