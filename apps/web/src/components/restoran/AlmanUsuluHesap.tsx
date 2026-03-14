'use client'

/**
 * AlmanUsuluHesap — Split Bill Modal
 *
 * Adisyondaki tüm kalemler checkbox listesi olarak gösterilir.
 * Müşteri kendi yediklerini seçer, toplam anında hesaplanır.
 * "Online Öde" → Iyzico 3D Secure link → ödeme sonrası Google Reviews.
 */

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, doc, onSnapshot, type DocumentData } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}
if (!getApps().length) initializeApp(firebaseConfig)
const db = getFirestore()

interface AdisyonKalem {
    menuItemId: string
    ad: string
    adet: number
    birimFiyatKurus: number
    toplamKurus: number
    deviceId?: string
    odendi?: boolean
}

interface Props {
    esnafId: string
    adisyonId: string
    kapat: () => void
}

function kurusToTL(k: number): string {
    return (k / 100).toFixed(2).replace('.', ',') + ' ₺'
}

export default function AlmanUsuluHesap({ esnafId, adisyonId, kapat }: Props) {
    const [kalemler, setKalemler] = useState<AdisyonKalem[]>([])
    const [seciliIdxler, setSeciliIdxler] = useState<Set<number>>(new Set())
    const [odemeYukleniyor, setOdemeYukleniyor] = useState(false)
    const [basarili, setBasarili] = useState(false)
    const [esnafAd, setEsnafAd] = useState('')

    // Adisyonu dinle
    useEffect(() => {
        const ref = doc(db, 'esnaflar', esnafId, 'aktif_adisyonlar', adisyonId)
        const unsub = onSnapshot(ref, (snap) => {
            if (!snap.exists()) return
            const data = snap.data() as DocumentData
            setKalemler((data.kalemler || []) as AdisyonKalem[])
        })
        return () => unsub()
    }, [esnafId, adisyonId])

    // checkbox toggle
    const toggleSecim = (idx: number) => {
        setSeciliIdxler(prev => {
            const yeni = new Set(prev)
            if (yeni.has(idx)) yeni.delete(idx)
            else yeni.add(idx)
            return yeni
        })
    }

    // Toplam hesapla
    const { seciliToplamKurus, tumunuSec } = useMemo(() => {
        const toplam = Array.from(seciliIdxler).reduce((t, idx) => {
            const k = kalemler[idx]
            return k ? t + k.toplamKurus : t
        }, 0)
        return {
            seciliToplamKurus: toplam,
            tumunuSec: seciliIdxler.size === kalemler.length,
        }
    }, [seciliIdxler, kalemler])

    // Tümünü seç/kaldır
    const tumSecToggle = () => {
        if (tumunuSec) {
            setSeciliIdxler(new Set())
        } else {
            setSeciliIdxler(new Set(kalemler.map((_, i) => i)))
        }
    }

    // Ödeme başlat
    const odemeBaslat = async () => {
        if (seciliToplamKurus === 0 || odemeYukleniyor) return
        setOdemeYukleniyor(true)

        try {
            const res = await fetch('/api/restoran/split-odeme', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    esnafId,
                    adisyonId,
                    seciliKalemIdxler: Array.from(seciliIdxler),
                    toplamKurus: seciliToplamKurus,
                }),
            })

            const data = await res.json()
            if (data.checkoutUrl) {
                // Iyzico'ya yönlendir
                window.location.href = data.checkoutUrl
            } else if (data.ok) {
                setBasarili(true)
            }
        } finally {
            setOdemeYukleniyor(false)
        }
    }

    // Başarılı ödeme ekranı
    if (basarili) {
        return (
            <div className="fixed inset-0 z-[70] bg-neutral-950 flex flex-col items-center justify-center p-8 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-7xl mb-6">🎉</motion.div>
                <h2 className="text-2xl font-bold text-white mb-2">Afiyet Olsun!</h2>
                <p className="text-neutral-400 mb-8">Ödemeniz başarıyla alındı.</p>

                <a
                    href={`https://search.google.com/local/writereview?placeid=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full max-w-sm py-4 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl text-center font-bold text-black text-base shadow-xl shadow-amber-500/20 mb-4 block"
                >
                    ⭐⭐⭐⭐⭐ Bizi Değerlendirin
                </a>

                <button
                    onClick={kapat}
                    className="text-neutral-500 text-sm mt-4"
                >
                    Kapat
                </button>
            </div>
        )
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                onClick={kapat}
                className="fixed inset-0 bg-black z-[70]"
            />
            <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25 }}
                className="fixed bottom-0 left-0 right-0 z-[70] bg-neutral-900 rounded-t-3xl max-h-[85vh] flex flex-col"
            >
                {/* Header */}
                <div className="px-6 pt-6 pb-3 border-b border-white/5 flex justify-between items-center shrink-0">
                    <div>
                        <h2 className="text-lg font-bold">💳 Hesap</h2>
                        <p className="text-xs text-neutral-500">Sadece yediklerini seç, ayrı öde</p>
                    </div>
                    <button onClick={kapat} className="text-neutral-500 text-xl">✕</button>
                </div>

                {/* Tümünü seç */}
                <div className="px-6 py-3 border-b border-white/5 shrink-0">
                    <button
                        onClick={tumSecToggle}
                        className="text-xs text-blue-400 font-medium"
                    >
                        {tumunuSec ? '☑ Tümünü Kaldır' : '☐ Tümünü Seç (Tek Hesap)'}
                    </button>
                </div>

                {/* Kalem listesi */}
                <div className="flex-1 overflow-y-auto px-6 py-3 space-y-2">
                    {kalemler.map((kalem, idx) => {
                        const secili = seciliIdxler.has(idx)
                        return (
                            <motion.button
                                key={idx}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => toggleSecim(idx)}
                                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                                    secili
                                        ? 'border-blue-500/50 bg-blue-500/10'
                                        : 'border-white/5 bg-white/[0.02]'
                                }`}
                            >
                                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                                    secili ? 'border-blue-500 bg-blue-500' : 'border-neutral-600'
                                }`}>
                                    {secili && <span className="text-white text-[10px]">✓</span>}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">
                                        <span className="text-blue-400 font-bold">{kalem.adet}x</span> {kalem.ad}
                                    </p>
                                </div>
                                <span className={`text-sm font-bold shrink-0 ${secili ? 'text-blue-400' : 'text-neutral-500'}`}>
                                    {kurusToTL(kalem.toplamKurus)}
                                </span>
                            </motion.button>
                        )
                    })}
                </div>

                {/* Toplam + Ödeme */}
                <div className="p-6 border-t border-white/10 bg-neutral-900 shrink-0 space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-neutral-400">Seçilen kalemler ({seciliIdxler.size})</span>
                        <motion.span
                            key={seciliToplamKurus}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            className="text-xl font-bold text-white"
                        >
                            {kurusToTL(seciliToplamKurus)}
                        </motion.span>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={odemeBaslat}
                        disabled={seciliToplamKurus === 0 || odemeYukleniyor}
                        className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 disabled:from-neutral-700 disabled:to-neutral-700 rounded-2xl font-bold text-base transition-all"
                    >
                        {odemeYukleniyor ? 'Ödeme hazırlanıyor...' : `Online Öde — ${kurusToTL(seciliToplamKurus)}`}
                    </motion.button>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
