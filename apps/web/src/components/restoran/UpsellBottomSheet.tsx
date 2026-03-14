'use client'

/**
 * UpsellBottomSheet — "✨ Şefin Önerisi" AI çapraz satış paneli
 *
 * Sipariş onayı öncesi araya girer. AI'ın önerdiği ürünü
 * %15 indirimle sunar. Tek tıkla sepete ekle.
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { SepetKalem } from '@/stores/sepetStore'

interface UpsellOneri {
    menuItemId: string
    ad: string
    aciklama?: string
    fiyatKurus: number
    indirimliFiyatKurus: number
    kategori: string
    neden: string
}

interface Props {
    acik: boolean
    kapat: () => void
    esnafId: string
    sepetKalemleri: SepetKalem[]
    onEkle: (kalem: Omit<SepetKalem, 'adet'>) => void
    onOnayla: () => void
}

function kurusToTL(k: number): string {
    return (k / 100).toFixed(2).replace('.', ',') + ' ₺'
}

export default function UpsellBottomSheet({ acik, kapat, esnafId, sepetKalemleri, onEkle, onOnayla }: Props) {
    const [oneri, setOneri] = useState<UpsellOneri | null>(null)
    const [yukleniyor, setYukleniyor] = useState(false)
    const [eklendi, setEklendi] = useState(false)

    useEffect(() => {
        if (!acik || sepetKalemleri.length === 0) return

        setYukleniyor(true)
        setOneri(null)
        setEklendi(false)

        fetch('/api/restoran/upsell-onerisi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                esnafId,
                sepetKalemleri: sepetKalemleri.map(k => ({ ad: k.ad, kategori: '' })),
            }),
        })
            .then(r => r.json())
            .then(data => {
                if (data.oneri) setOneri(data.oneri)
            })
            .catch(() => {})
            .finally(() => setYukleniyor(false))
    }, [acik, esnafId, sepetKalemleri])

    // AI sonuç alınamazsa → direkt onayla
    useEffect(() => {
        if (acik && !yukleniyor && !oneri) {
            const t = setTimeout(onOnayla, 500)
            return () => clearTimeout(t)
        }
    }, [acik, yukleniyor, oneri, onOnayla])

    return (
        <AnimatePresence>
            {acik && oneri && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        onClick={kapat}
                        className="fixed inset-0 bg-black z-[60]"
                    />
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25 }}
                        className="fixed bottom-0 left-0 right-0 z-[60] bg-neutral-900 rounded-t-3xl overflow-hidden"
                    >
                        {/* Sparkle header */}
                        <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 px-6 pt-6 pb-4">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-2xl">✨</span>
                                <h3 className="text-lg font-bold text-amber-300">Şefin Önerisi</h3>
                            </div>
                            <p className="text-sm text-neutral-300">{oneri.neden}</p>
                        </div>

                        <div className="px-6 py-5">
                            {/* Ürün kartı */}
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                <h4 className="font-bold text-base text-white">{oneri.ad}</h4>
                                {oneri.aciklama && (
                                    <p className="text-xs text-neutral-400 mt-1">{oneri.aciklama}</p>
                                )}
                                <div className="flex items-center gap-3 mt-3">
                                    <span className="text-neutral-500 line-through text-sm">{kurusToTL(oneri.fiyatKurus)}</span>
                                    <span className="text-emerald-400 font-bold text-lg">{kurusToTL(oneri.indirimliFiyatKurus)}</span>
                                    <span className="bg-red-500/20 text-red-400 text-[10px] px-2 py-0.5 rounded-full font-bold">%15 İNDİRİM</span>
                                </div>
                            </div>

                            {/* Butonlar */}
                            <div className="flex gap-3 mt-5">
                                <button
                                    onClick={onOnayla}
                                    className="flex-1 py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-neutral-400"
                                >
                                    Hayır, Devam Et
                                </button>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        if (eklendi) return
                                        setEklendi(true)
                                        onEkle({
                                            menuItemId: oneri.menuItemId,
                                            ad: oneri.ad,
                                            birimFiyatKurus: oneri.indirimliFiyatKurus,
                                            kdvTipi: 'gida',
                                        })
                                        setTimeout(onOnayla, 400)
                                    }}
                                    className={`flex-1 py-3.5 rounded-xl text-sm font-bold transition-all ${
                                        eklendi
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-gradient-to-r from-amber-500 to-orange-500 text-black'
                                    }`}
                                >
                                    {eklendi ? '✓ Eklendi!' : '🛒 Tek Tıkla Ekle'}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
