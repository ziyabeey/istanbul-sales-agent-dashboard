'use client'

/**
 * CanliTakipPanel — Sipariş Sonrası Canlı Durum Ekranı
 *
 * Firestore onSnapshot → Progress Bar + durum mesajları
 * Garson Çağır / Peçete İste butonları → masa_istekleri write
 */

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { initializeApp, getApps } from 'firebase/app'
import {
    getFirestore,
    doc,
    onSnapshot,
    collection,
    addDoc,
    serverTimestamp,
    type DocumentData,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}
if (!getApps().length) initializeApp(firebaseConfig)
const db = getFirestore()

// Durum mesajları
const DURUM_MESAJLARI: Record<string, { mesaj: string; emoji: string; progress: number }> = {
    yeni: { mesaj: 'Siparişiniz mutfağa iletildi', emoji: '📋', progress: 25 },
    hazirlaniyor: { mesaj: 'Şefiniz yemeğinizi ateşe koydu 🔥', emoji: '👨‍🍳', progress: 60 },
    teslim_edildi: { mesaj: 'Siparişiniz masanıza geliyor!', emoji: '🍽️', progress: 90 },
    odendi: { mesaj: 'Afiyet olsun! Teşekkürler ✨', emoji: '✅', progress: 100 },
}

function kurusToTL(k: number): string {
    return (k / 100).toFixed(2).replace('.', ',') + ' ₺'
}

interface Props {
    esnafId: string
    esnafAd: string
    masaNo: number
    adisyonId: string
    onYeniSiparis: () => void
    onHesapIste: () => void
}

export default function CanliTakipPanel({ esnafId, esnafAd, masaNo, adisyonId, onYeniSiparis, onHesapIste }: Props) {
    const [durum, setDurum] = useState<string>('yeni')
    const [kalemler, setKalemler] = useState<Array<{ ad: string; adet: number; toplamKurus: number }>>([])
    const [toplamKurus, setToplamKurus] = useState(0)
    const [garsonGonderildi, setGarsonGonderildi] = useState(false)
    const [peceteGonderildi, setPeceteGonderildi] = useState(false)
    const prevDurum = useRef('')

    // ── Firestore onSnapshot ──
    useEffect(() => {
        const adisyonRef = doc(db, 'esnaflar', esnafId, 'aktif_adisyonlar', adisyonId)

        const unsub = onSnapshot(adisyonRef, (snap) => {
            if (!snap.exists()) return
            const data = snap.data() as DocumentData

            const yeniDurum = data.durum || 'yeni'

            // Durum değişti → titreşim
            if (prevDurum.current && prevDurum.current !== yeniDurum) {
                navigator.vibrate?.(200)
            }
            prevDurum.current = yeniDurum

            setDurum(yeniDurum)
            setKalemler(data.kalemler || [])
            setToplamKurus(data.toplamKurus || 0)
        })

        return () => unsub()
    }, [esnafId, adisyonId])

    // ── Garson / Peçete Çağır ──
    const istekGonder = async (tip: 'garson' | 'pecete') => {
        if (tip === 'garson' && garsonGonderildi) return
        if (tip === 'pecete' && peceteGonderildi) return

        const istekRef = collection(db, 'esnaflar', esnafId, 'masa_istekleri')
        await addDoc(istekRef, {
            masaNo,
            tip,
            durum: 'bekliyor',
            adisyonId,
            olusturma: serverTimestamp(),
        })

        if (tip === 'garson') setGarsonGonderildi(true)
        if (tip === 'pecete') setPeceteGonderildi(true)

        // 30 saniye sonra tekrar çağırabilsin
        setTimeout(() => {
            if (tip === 'garson') setGarsonGonderildi(false)
            if (tip === 'pecete') setPeceteGonderildi(false)
        }, 30000)
    }

    const durumInfo = DURUM_MESAJLARI[durum] || DURUM_MESAJLARI.yeni

    return (
        <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
            {/* Header */}
            <div className="px-6 pt-8 pb-4 text-center">
                <h1 className="text-lg font-bold">{esnafAd}</h1>
                <p className="text-xs text-neutral-500">Masa {masaNo}</p>
            </div>

            {/* Progress Circle */}
            <div className="flex-1 flex flex-col items-center justify-center px-6">
                <div className="relative w-48 h-48 mb-8">
                    {/* Background circle */}
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                        <motion.circle
                            cx="100" cy="100" r="88"
                            fill="none"
                            stroke="url(#grad)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={553} // 2 * PI * 88
                            initial={{ strokeDashoffset: 553 }}
                            animate={{ strokeDashoffset: 553 - (553 * durumInfo.progress) / 100 }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        />
                        <defs>
                            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                        </defs>
                    </svg>
                    {/* Center content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span
                            key={durumInfo.emoji}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="text-5xl mb-2"
                        >
                            {durumInfo.emoji}
                        </motion.span>
                        <span className="text-sm font-bold text-neutral-300">{durumInfo.progress}%</span>
                    </div>
                </div>

                <motion.p
                    key={durumInfo.mesaj}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg font-semibold text-center mb-2"
                >
                    {durumInfo.mesaj}
                </motion.p>

                {/* Kalem listesi */}
                <div className="w-full max-w-sm mt-6 space-y-2">
                    {kalemler.map((k, i) => (
                        <div key={i} className="flex justify-between text-sm bg-white/5 rounded-xl px-4 py-2.5">
                            <span className="text-neutral-300">
                                <span className="text-white font-bold">{k.adet}x</span> {k.ad}
                            </span>
                            <span className="text-neutral-500">{kurusToTL(k.toplamKurus)}</span>
                        </div>
                    ))}
                    <div className="flex justify-between font-bold text-base pt-2 border-t border-white/10 px-4">
                        <span>Toplam</span>
                        <span className="text-blue-400">{kurusToTL(toplamKurus)}</span>
                    </div>
                </div>
            </div>

            {/* Alt Butonlar */}
            <div className="p-6 space-y-3">
                {/* Mikro-etkileşimler */}
                <div className="flex gap-3">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => istekGonder('garson')}
                        disabled={garsonGonderildi}
                        className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-all ${
                            garsonGonderildi
                                ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                                : 'border-white/10 text-white bg-white/5 hover:bg-white/10'
                        }`}
                    >
                        {garsonGonderildi ? '✓ Garson Çağrıldı' : '🛎️ Garson Çağır'}
                    </motion.button>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => istekGonder('pecete')}
                        disabled={peceteGonderildi}
                        className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-all ${
                            peceteGonderildi
                                ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                                : 'border-white/10 text-white bg-white/5 hover:bg-white/10'
                        }`}
                    >
                        {peceteGonderildi ? '✓ İstek Gönderildi' : '🧻 Peçete İste'}
                    </motion.button>
                </div>

                {/* Aksiyonlar */}
                <div className="flex gap-3">
                    <button
                        onClick={onYeniSiparis}
                        className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-medium"
                    >
                        ➕ Ek Sipariş
                    </button>
                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={onHesapIste}
                        className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-sm font-bold"
                    >
                        💳 Hesap İste
                    </motion.button>
                </div>
            </div>
        </div>
    )
}
