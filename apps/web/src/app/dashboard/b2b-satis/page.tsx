'use client'

/**
 * B2B Satış Kanban — Toptancı/Kasap Sipariş Panosu
 *
 * Framer Motion Reorder ile sürükle-bırak.
 * "Teslim Edildi" kolonuna düşürülen sipariş → ParasutAgent tetikler.
 */

import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { initializeApp, getApps } from 'firebase/app'
import {
    getFirestore,
    collection,
    query,
    onSnapshot,
    doc,
    updateDoc,
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

// ─── Tipler ────────────────────────────────────────────────────────────

type B2BDurum = 'bekliyor' | 'onaylandi' | 'hazirlaniyor' | 'yola_cikti' | 'teslim_edildi'

interface B2BSiparisDoc {
    id: string
    siparisId: string
    aliciEsnafId: string
    aliciAd?: string
    kalemler: Array<{ urunAdi: string; miktar: number; birim: string; toplamKurus: number }>
    toplamKurus: number
    durum: B2BDurum
    olusturma: Date
}

const KOLONLAR: { durum: B2BDurum; baslik: string; renk: string; sonraki?: B2BDurum }[] = [
    { durum: 'bekliyor', baslik: '📥 Yeni Gelenler', renk: 'border-red-500', sonraki: 'hazirlaniyor' },
    { durum: 'hazirlaniyor', baslik: '📦 Hazırlanıyor', renk: 'border-amber-500', sonraki: 'yola_cikti' },
    { durum: 'yola_cikti', baslik: '🚚 Yola Çıktı', renk: 'border-blue-500', sonraki: 'teslim_edildi' },
    { durum: 'teslim_edildi', baslik: '✅ Teslim Edildi', renk: 'border-emerald-500' },
]

function kurusToTL(k: number): string {
    return (k / 100).toFixed(2).replace('.', ',') + ' ₺'
}

export default function B2BSatisKanban() {
    const [siparisler, setSiparisler] = useState<B2BSiparisDoc[]>([])
    const [esnafId, setEsnafId] = useState('')

    useEffect(() => {
        setEsnafId(localStorage.getItem('esnafId') || '')
    }, [])

    // ── onSnapshot ──
    useEffect(() => {
        if (!esnafId) return

        const q = query(collection(db, 'esnaflar', esnafId, 'b2b_gelen_siparisler'))

        const unsub = onSnapshot(q, (snap) => {
            const docs: B2BSiparisDoc[] = snap.docs.map((d) => {
                const data = d.data() as DocumentData
                return {
                    id: d.id,
                    siparisId: data.siparisId || d.id,
                    aliciEsnafId: data.aliciEsnafId || '',
                    aliciAd: data.aliciAd,
                    kalemler: data.kalemler || [],
                    toplamKurus: data.toplamKurus || 0,
                    durum: data.durum || 'bekliyor',
                    olusturma: data.olusturma?.toDate?.() || new Date(),
                }
            })
            setSiparisler(docs)
        })

        return () => unsub()
    }, [esnafId])

    // ── Durum güncelle ──
    const durumGuncelle = useCallback(async (siparisId: string, yeniDurum: B2BDurum) => {
        if (!esnafId) return

        const ref = doc(db, 'esnaflar', esnafId, 'b2b_gelen_siparisler', siparisId)
        await updateDoc(ref, {
            durum: yeniDurum,
            guncelleme: serverTimestamp(),
        })

        // "Teslim Edildi" → Paraşüt e-Fatura tetikle
        if (yeniDurum === 'teslim_edildi') {
            fetch('/api/restoran/parasut-tetikle', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    esnafId,
                    adisyonId: siparisId,
                    tip: 'b2b_toptan',
                }),
            }).catch(() => { toast.error('Fatura oluşturulamadı') })
        }
    }, [esnafId])

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
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">📦 B2B Satış Panosu</h1>
                    <p className="text-sm text-neutral-500">Gelen toptan siparişlerinizi yönetin</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-sm text-emerald-400 font-medium">Canlı</span>
                    <span className="text-sm text-neutral-500 ml-2">
                        {siparisler.filter(s => s.durum === 'bekliyor').length} yeni
                    </span>
                </div>
            </div>

            {/* Kanban Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                {KOLONLAR.map(kolon => {
                    const kolonSiparisler = siparisler.filter(s => s.durum === kolon.durum)

                    return (
                        <div
                            key={kolon.durum}
                            className={`bg-neutral-900/50 rounded-2xl border-t-4 ${kolon.renk} p-4 min-h-[400px]`}
                        >
                            <h2 className="text-sm font-bold text-neutral-300 mb-4 flex items-center gap-2">
                                {kolon.baslik}
                                <span className="bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded-full text-xs">
                                    {kolonSiparisler.length}
                                </span>
                            </h2>

                            <Reorder.Group
                                axis="y"
                                values={kolonSiparisler}
                                onReorder={() => {}}
                                className="space-y-3"
                            >
                                <AnimatePresence>
                                    {kolonSiparisler.map(siparis => (
                                        <Reorder.Item
                                            key={siparis.id}
                                            value={siparis}
                                            dragListener={true}
                                        >
                                            <motion.div
                                                layout
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: 80 }}
                                                className="bg-neutral-800/80 rounded-xl p-4 border border-neutral-700/50 cursor-grab active:cursor-grabbing"
                                            >
                                                {/* Sipariş başlığı */}
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-medium">
                                                            #{siparis.siparisId.slice(-6)}
                                                        </span>
                                                    </div>
                                                    <span className="text-[10px] text-neutral-500">
                                                        {siparis.olusturma.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>

                                                {/* Kalemler */}
                                                <div className="space-y-1.5 mb-3">
                                                    {siparis.kalemler.map((k, i) => (
                                                        <div key={i} className="flex justify-between text-xs">
                                                            <span className="text-neutral-300">
                                                                <span className="text-white font-bold">{k.miktar} {k.birim}</span> {k.urunAdi}
                                                            </span>
                                                            <span className="text-neutral-500">{kurusToTL(k.toplamKurus)}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Footer */}
                                                <div className="flex justify-between items-center pt-3 border-t border-neutral-700/50">
                                                    <span className="font-bold text-sm text-white">{kurusToTL(siparis.toplamKurus)}</span>
                                                    {kolon.sonraki && (
                                                        <motion.button
                                                            whileTap={{ scale: 0.93 }}
                                                            onClick={() => durumGuncelle(siparis.id, kolon.sonraki!)}
                                                            className="px-3 py-1.5 bg-blue-600 text-white text-[11px] rounded-lg hover:bg-blue-500 font-medium transition-colors"
                                                        >
                                                            İlerlet →
                                                        </motion.button>
                                                    )}
                                                    {kolon.durum === 'teslim_edildi' && (
                                                        <span className="text-[10px] text-emerald-400 font-medium">
                                                            ✅ e-Fatura kesildi
                                                        </span>
                                                    )}
                                                </div>
                                            </motion.div>
                                        </Reorder.Item>
                                    ))}
                                </AnimatePresence>
                            </Reorder.Group>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
