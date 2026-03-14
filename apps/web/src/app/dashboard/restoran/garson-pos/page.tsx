'use client'

/**
 * Garson Mobil Kokpiti — Adım Adım Görev Yöneticisi (PWA)
 * ══════════════════════════════════════════════════════════════════════
 * Garsonun cebindeki telefonda çalışır. Sadece kendi üzerine atanmış
 * masaları gösterir. Masa durumuna göre buton otomatik değişir:
 *
 * - siparis_verildi → 🍽️ Servis Aç (kırmızı)
 * - mutfak_hazir  → 🏃 Teslim Et (yeşil, telefon titrer)
 * - hesap_odendi_kirli → 🧹 Temizle (mor, basılı tut)
 *
 * Sağ üstte canlı bahşiş göstergesi, koyu tema, devasa butonlar.
 */

import { useState, useEffect, useCallback, useRef } from 'react'
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
import {
    MASA_DURUM_RENKLERI,
    garsonAksiyonBilgisi,
    type MasaDurum,
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

interface MasaGorev {
    id: string        // Firestore doc ID (masa_5)
    masaNo: number
    durum: MasaDurum
    kalemler: { ad: string; adet: number }[]
    toplamKurus: number
    notlar?: string
    son_durum_degisim: Date
    adisyonId?: string
}

function kurusToTL(k: number) { return (k / 100).toFixed(2).replace('.', ',') + ' ₺' }

// ─── Component ─────────────────────────────────────────────────────────

export default function GarsonPOSPage() {
    const [gorevler, setGorevler] = useState<MasaGorev[]>([])
    const [esnafId, setEsnafId] = useState<string>('')
    const [garsonId, setGarsonId] = useState<string>('')
    const [bahsisToplam, setBahsisToplam] = useState(0)
    const [now, setNow] = useState(Date.now())
    const [islemYapilan, setIslemYapilan] = useState<string | null>(null)
    const longPressTimer = useRef<NodeJS.Timeout | null>(null)

    // Init
    useEffect(() => {
        setEsnafId(localStorage.getItem('esnafId') || '')
        setGarsonId(localStorage.getItem('garsonId') || '')
    }, [])

    // Canlı sayaç
    useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 1000)
        return () => clearInterval(timer)
    }, [])

    // Bildirim izni
    useEffect(() => {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission()
        }
    }, [])

    // ── Firestore — Garsonun masaları (masa koleksiyonu) ──
    useEffect(() => {
        if (!esnafId || !garsonId) return

        const q = query(
            collection(db, 'esnaflar', esnafId, 'masalar'),
            where('atanan_garson_id', '==', garsonId),
            where('durum', 'not-in', ['bos'])
        )

        const unsub = onSnapshot(q, (snap) => {
            const docs: MasaGorev[] = snap.docs.map((d) => {
                const data = d.data() as DocumentData
                return {
                    id: d.id,
                    masaNo: data.no || 0,
                    durum: data.durum || 'bos',
                    kalemler: [],
                    toplamKurus: data.oturum_ciro_kurus || 0,
                    notlar: data.notlar,
                    son_durum_degisim: data.son_durum_degisim?.toDate?.() || new Date(),
                    adisyonId: data.aktif_adisyon_id,
                }
            })

            // Yeni "mutfak_hazir" geldi → titreşim + bildirim
            const hazirlar = docs.filter(d => d.durum === 'mutfak_hazir')
            if (hazirlar.length > 0 && 'vibrate' in navigator) {
                navigator.vibrate([300, 100, 300, 100, 300])
            }

            setGorevler(docs)
        })

        return () => unsub()
    }, [esnafId, garsonId])

    // ── Bahşiş canlı izleme ──
    useEffect(() => {
        if (!esnafId || !garsonId) return

        const ref = doc(db, 'esnaflar', esnafId, 'personel', garsonId)
        const unsub = onSnapshot(ref, (snap) => {
            const data = snap.data()
            setBahsisToplam(data?.bugun_toplam_bahsis_kurus || 0)
        })

        return () => unsub()
    }, [esnafId, garsonId])

    // ── Görev İlerlet ──
    const gorevIlerlet = useCallback(async (masaDocId: string, yeniDurum: MasaDurum) => {
        if (!esnafId) return
        setIslemYapilan(masaDocId)

        const masaRef = doc(db, 'esnaflar', esnafId, 'masalar', masaDocId)
        const updates: any = {
            durum: yeniDurum,
            son_durum_degisim: serverTimestamp(),
        }

        // Temizlik bitti → masayı sıfırla
        if (yeniDurum === 'bos') {
            updates.atanan_garson_id = null
            updates.atanan_garson_adi = null
            updates.aktif_adisyon_id = null
            updates.oturum_ciro_kurus = 0
            updates.son_temizlik_ani = serverTimestamp()
        }

        // Teslim edildi → adisyon garson_teslim_ani
        if (yeniDurum === 'teslim_edildi') {
            const gorev = gorevler.find(g => g.id === masaDocId)
            if (gorev?.adisyonId) {
                const adisyonRef = doc(db, 'esnaflar', esnafId, 'aktif_adisyonlar', gorev.adisyonId)
                await updateDoc(adisyonRef, {
                    durum: 'masaya_teslim_edildi',
                    garson_teslim_ani: serverTimestamp(),
                    guncelleme: serverTimestamp(),
                })
            }
        }

        await updateDoc(masaRef, updates)
        setTimeout(() => setIslemYapilan(null), 800)
    }, [esnafId, gorevler])

    // Long press — temizlik
    const longPressStart = useCallback((masaDocId: string) => {
        longPressTimer.current = setTimeout(() => {
            gorevIlerlet(masaDocId, 'bos')
        }, 1500) // 1.5sn basılı tut
    }, [gorevIlerlet])

    const longPressEnd = useCallback(() => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current)
            longPressTimer.current = null
        }
    }, [])

    // Bekleme süresi
    function beklemeSure(baslangic: Date): string {
        const fark = Math.max(0, Math.round((now - baslangic.getTime()) / 1000))
        const dk = Math.floor(fark / 60)
        const sn = fark % 60
        return `${dk.toString().padStart(2, '0')}:${sn.toString().padStart(2, '0')}`
    }

    if (!esnafId || !garsonId) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
                <div className="text-center">
                    <p className="text-neutral-400 text-lg mb-4">Garson girişi gerekli</p>
                    <p className="text-neutral-600 text-sm">localStorage: esnafId + garsonId</p>
                </div>
            </div>
        )
    }

    // Görevleri öncelik sırasına koy
    const oncelikSirasi: MasaDurum[] = ['mutfak_hazir', 'siparis_verildi', 'hesap_odendi_kirli', 'teslim_edildi', 'servis_acildi', 'mutfakta_hazirlaniyor', 'temizleniyor']
    const siraliGorevler = [...gorevler].sort((a, b) => {
        return oncelikSirasi.indexOf(a.durum) - oncelikSirasi.indexOf(b.durum)
    })

    return (
        <div className="min-h-screen bg-neutral-950 p-4 pb-24">
            {/* Header + Bahşiş */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-black text-white">🏃 Garson Kokpiti</h1>
                    <p className="text-neutral-500 text-xs mt-0.5">
                        {gorevler.length} aktif masa
                    </p>
                </div>
                <div className="bg-emerald-900/50 border border-emerald-700 rounded-xl px-4 py-2 text-right">
                    <p className="text-[9px] text-emerald-500 uppercase tracking-wider font-bold">Bugünkü Bahşiş</p>
                    <p className="text-xl font-black text-emerald-400">
                        {kurusToTL(bahsisToplam)} 💸
                    </p>
                </div>
            </div>

            {/* Görev Listesi */}
            {siraliGorevler.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20">
                    <div className="text-6xl mb-4">☕</div>
                    <p className="text-neutral-500 text-lg text-center">
                        Atanmış göreviniz yok.
                    </p>
                    <p className="text-neutral-600 text-sm mt-2">
                        Yeni sipariş geldiğinde otomatik atanacak.
                    </p>
                </div>
            ) : (
                <div className="space-y-4 max-w-md mx-auto">
                    <AnimatePresence>
                        {siraliGorevler.map(gorev => {
                            const aksiyon = garsonAksiyonBilgisi(gorev.durum)
                            const durumBilgi = MASA_DURUM_RENKLERI[gorev.durum]
                            const isProcessing = islemYapilan === gorev.id
                            const isTemizlik = gorev.durum === 'hesap_odendi_kirli'

                            return (
                                <motion.div
                                    key={gorev.id}
                                    layout
                                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                    animate={{ opacity: isProcessing ? 0.3 : 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: 200, scale: 0.8 }}
                                    transition={{ type: 'spring', damping: 20 }}
                                    className={`rounded-2xl p-4 border-2 ${
                                        gorev.durum === 'mutfak_hazir'
                                            ? 'bg-emerald-950/30 border-emerald-500'
                                            : gorev.durum === 'siparis_verildi'
                                            ? 'bg-red-950/30 border-red-500'
                                            : gorev.durum === 'hesap_odendi_kirli'
                                            ? 'bg-purple-950/30 border-purple-500'
                                            : 'bg-neutral-900 border-neutral-700'
                                    }`}
                                >
                                    {/* Üst Bar: Masa + Durum + Süre */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="bg-blue-600 text-white px-3 py-1.5 rounded-xl text-lg font-black">
                                                🪑 {gorev.masaNo}
                                            </span>
                                            <span className={`${durumBilgi.bg} text-white text-[10px] px-2 py-1 rounded-full font-bold`}>
                                                {durumBilgi.label}
                                            </span>
                                        </div>
                                        <span className="text-amber-400 font-mono text-lg font-bold">
                                            ⏱ {beklemeSure(gorev.son_durum_degisim)}
                                        </span>
                                    </div>

                                    {/* ÖDENDİ Rozet */}
                                    <div className="bg-emerald-600/20 border border-emerald-600/50 text-emerald-400 text-center py-1.5 rounded-lg mb-3 font-bold text-xs tracking-wide">
                                        💳 ÖDENDİ — HESAP İSTEME
                                    </div>

                                    {/* Aksiyon Butonu */}
                                    {aksiyon && (
                                        <button
                                            onClick={() => {
                                                if (!isTemizlik && aksiyon.sonrakiDurum) {
                                                    gorevIlerlet(gorev.id, aksiyon.sonrakiDurum)
                                                }
                                            }}
                                            onTouchStart={() => {
                                                if (isTemizlik) longPressStart(gorev.id)
                                            }}
                                            onTouchEnd={longPressEnd}
                                            onMouseDown={() => {
                                                if (isTemizlik) longPressStart(gorev.id)
                                            }}
                                            onMouseUp={longPressEnd}
                                            onMouseLeave={longPressEnd}
                                            disabled={!!islemYapilan}
                                            className={`w-full py-4 rounded-2xl text-lg font-black tracking-wide transition-all
                                                ${isProcessing
                                                    ? 'bg-neutral-700 text-neutral-400'
                                                    : `bg-gradient-to-r ${aksiyon.renk} text-white active:scale-95 shadow-lg`
                                                }`}
                                        >
                                            {isProcessing
                                                ? '✅ İşleniyor...'
                                                : `${aksiyon.emoji} Masa ${gorev.masaNo}: ${aksiyon.label}`}
                                            {isTemizlik && !isProcessing && (
                                                <span className="block text-[10px] font-normal mt-1 opacity-70">
                                                    (1.5sn basılı tutarak onayla)
                                                </span>
                                            )}
                                        </button>
                                    )}

                                    {/* Pasif durumdaki masalar (mutfakta vs.) */}
                                    {!aksiyon && (
                                        <div className="text-center py-3 text-neutral-500 text-sm">
                                            ⏳ {durumBilgi.label} — Bekleniyor...
                                        </div>
                                    )}
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </div>
            )}
        </div>
    )
}
