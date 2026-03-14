'use client'

/**
 * BahsisBilesen — QR Ödeme Ekranı Dijital Bahşiş UI
 * ══════════════════════════════════════════════════════════════════════
 * Müşteri masa QR'ından ödeme yaparken garsonun ismini gösterir ve
 * %5 / %10 / Özel Tutar bahşiş seçenekleri sunar.
 *
 * Kullanım:
 * <BahsisBilesen
 *   garsonAdi="Ali"
 *   garsonId="garson_ali"
 *   teslimatSureDk={3}
 *   toplamKurus={25000}
 *   onBahsisSec={(tutarKurus) => ...}
 * />
 */

import { useState } from 'react'

interface BahsisBilesenProps {
    garsonAdi: string
    garsonId: string
    teslimatSureDk?: number
    toplamKurus: number
    onBahsisSec: (tutarKurus: number) => void
}

function kurusToTL(k: number) { return (k / 100).toFixed(2).replace('.', ',') + ' ₺' }

export default function BahsisBilesen({
    garsonAdi,
    garsonId,
    teslimatSureDk,
    toplamKurus,
    onBahsisSec,
}: BahsisBilesenProps) {
    const [seciliOran, setSeciliOran] = useState<number | null>(null)
    const [ozelTutar, setOzelTutar] = useState('')
    const [ozelMod, setOzelMod] = useState(false)

    const oranlar = [
        { oran: 5, emoji: '😊', label: '%5' },
        { oran: 10, emoji: '🤩', label: '%10' },
        { oran: 15, emoji: '🥰', label: '%15' },
    ]

    const hesaplananBahsis = seciliOran
        ? Math.round(toplamKurus * seciliOran / 100)
        : ozelMod && ozelTutar
        ? Math.round(parseFloat(ozelTutar) * 100) || 0
        : 0

    const handleOranSec = (oran: number) => {
        setOzelMod(false)
        setOzelTutar('')
        setSeciliOran(oran === seciliOran ? null : oran)
        if (oran !== seciliOran) {
            onBahsisSec(Math.round(toplamKurus * oran / 100))
        } else {
            onBahsisSec(0) // İptal
        }
    }

    const handleOzelOnayla = () => {
        const tutar = Math.round(parseFloat(ozelTutar) * 100)
        if (tutar > 0) {
            onBahsisSec(tutar)
        }
    }

    return (
        <div className="bg-gradient-to-br from-amber-950/40 to-orange-950/40 border border-amber-700/40 rounded-2xl p-5 mt-4">
            {/* Garson Bilgi */}
            <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-600 rounded-full text-2xl mb-2">
                    🧑‍🍳
                </div>
                <p className="text-white font-bold text-base">
                    Garsonunuz <span className="text-amber-400">{garsonAdi}</span>
                </p>
                {teslimatSureDk != null && (
                    <p className="text-amber-400/80 text-sm mt-0.5">
                        size {teslimatSureDk} dakikada sıcak servis yaptı ✨
                    </p>
                )}
                <p className="text-neutral-500 text-xs mt-2">
                    Ona teşekkür etmek ister misiniz?
                </p>
            </div>

            {/* Oran Butonları */}
            <div className="grid grid-cols-3 gap-2 mb-3">
                {oranlar.map(({ oran, emoji, label }) => {
                    const aktif = seciliOran === oran && !ozelMod
                    return (
                        <button
                            key={oran}
                            onClick={() => handleOranSec(oran)}
                            className={`py-3 rounded-xl font-bold text-center transition-all border-2 ${
                                aktif
                                    ? 'bg-amber-600 border-amber-400 text-white scale-105 shadow-lg shadow-amber-900/50'
                                    : 'bg-neutral-800/60 border-neutral-700 text-neutral-300 hover:border-amber-600'
                            }`}
                        >
                            <span className="text-xl">{emoji}</span>
                            <span className="block text-sm mt-1">{label}</span>
                            <span className="block text-[10px] text-neutral-400 mt-0.5">
                                {kurusToTL(Math.round(toplamKurus * oran / 100))}
                            </span>
                        </button>
                    )
                })}
            </div>

            {/* Özel Tutar */}
            <button
                onClick={() => {
                    setOzelMod(!ozelMod)
                    setSeciliOran(null)
                    if (!ozelMod) onBahsisSec(0)
                }}
                className={`w-full py-2 rounded-xl text-sm font-medium transition-all border ${
                    ozelMod
                        ? 'bg-amber-800/30 border-amber-600 text-amber-300'
                        : 'bg-neutral-800/40 border-neutral-700 text-neutral-400'
                }`}
            >
                💰 Özel Tutar Gir
            </button>

            {ozelMod && (
                <div className="mt-3 flex gap-2">
                    <div className="relative flex-1">
                        <input
                            type="number"
                            placeholder="0.00"
                            value={ozelTutar}
                            onChange={(e) => setOzelTutar(e.target.value)}
                            className="w-full bg-neutral-800 border border-neutral-600 rounded-xl px-4 py-3 text-white text-lg font-mono focus:border-amber-500 focus:outline-none"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">₺</span>
                    </div>
                    <button
                        onClick={handleOzelOnayla}
                        disabled={!ozelTutar || parseFloat(ozelTutar) <= 0}
                        className="px-5 py-3 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        ✓
                    </button>
                </div>
            )}

            {/* Seçilen Bahşiş Özeti */}
            {hesaplananBahsis > 0 && (
                <div className="mt-3 bg-emerald-900/30 border border-emerald-700/50 rounded-xl p-3 text-center">
                    <p className="text-emerald-400 font-bold">
                        💸 Bahşiş: {kurusToTL(hesaplananBahsis)}
                    </p>
                    <p className="text-emerald-600 text-[10px] mt-0.5">
                        {garsonAdi}&apos;nin dijital cüzdanına eklenecek
                    </p>
                </div>
            )}
        </div>
    )
}
