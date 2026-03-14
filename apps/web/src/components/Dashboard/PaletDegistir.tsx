"use client"

import { useState } from 'react'
import { RENK_PALETLERI, sektorPaletOner } from '@/data/renkPaletleri'

export default function PaletDegistir({
    mevcutPaletId,
    sektor,
    esnafId,
    onDegisti,
}: {
    mevcutPaletId: string
    sektor: string
    esnafId: string
    onDegisti: () => void
}) {
    const [acik, setAcik] = useState(false)
    const [secilenId, setSecilenId] = useState(mevcutPaletId)
    const [kaydediliyor, setKaydediliyor] = useState(false)

    const paletler = sektorPaletOner(sektor)

    async function handleKaydetVeYenile() {
        if (secilenId === mevcutPaletId) { setAcik(false); return }
        setKaydediliyor(true)

        try {
            // 1. Paleti kaydet
            const { paletBul } = await import('@/data/renkPaletleri')
            await fetch(`/api/esnaf/${esnafId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    paletId: secilenId,
                    secilenPalet: paletBul(secilenId),
                }),
            })

            // 2. Siteyi yeniden üret
            await fetch('/api/site/guncelle', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ esnafId }),
            })

            onDegisti()
            setAcik(false)
        } finally {
            setKaydediliyor(false)
        }
    }

    const mevcut = RENK_PALETLERI.find(p => p.id === mevcutPaletId) || RENK_PALETLERI[0]

    return (
        <div className="bg-white border border-border-light/30 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-foreground font-syne font-extrabold text-lg">Renk Paleti</h3>
                <button
                    onClick={() => setAcik(!acik)}
                    className="text-rust text-sm font-bold hover:text-rust-light transition-colors"
                >
                    {acik ? 'Kapat ⨉' : 'Değiştir →'}
                </button>
            </div>

            {!acik && mevcut && (
                <div className="flex items-center gap-4 bg-stone-light/5 p-4 rounded-xl border border-border-light/20">
                    <div className="flex gap-2">
                        {mevcut.onizleme.map((r, i) => (
                            <div
                                key={i}
                                style={{ background: r }}
                                className="w-8 h-8 rounded-full border border-border-light/20 shadow-sm"
                            />
                        ))}
                    </div>
                    <div>
                        <p className="text-foreground font-bold text-base">{mevcut.ad}</p>
                        <p className="text-muted-foreground text-xs font-medium">{mevcut.aciklama}</p>
                    </div>
                </div>
            )}

            {acik && (
                <div className="space-y-4 mt-4 animate-in fade-in slide-in-from-top-4">
                    <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto pr-1">
                        {paletler.map(palet => (
                            <button
                                key={palet.id}
                                onClick={() => setSecilenId(palet.id)}
                                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all group hover:bg-stone-light/5
                  ${secilenId === palet.id
                                        ? 'border-rust bg-rust/5'
                                        : 'border-border-light/20 hover:border-rust/40'}`}
                            >
                                <div className="flex gap-1.5 shrink-0">
                                    {palet.onizleme.map((r, i) => (
                                        <div
                                            key={i}
                                            style={{ background: r }}
                                            className="w-6 h-6 rounded-full border border-border-light/20 shadow-sm transition-transform group-hover:scale-110"
                                        />
                                    ))}
                                </div>
                                <div className="text-left flex-1">
                                    <p className="text-foreground font-bold text-sm tracking-tight">{palet.ad}</p>
                                    <p className="text-muted-foreground text-[11px] font-medium leading-tight mt-0.5">{palet.aciklama}</p>
                                </div>
                                {secilenId === palet.id && (
                                    <div className="w-6 h-6 bg-rust text-foreground rounded-full flex items-center justify-center text-sm shadow-sm">
                                        ✓
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleKaydetVeYenile}
                        disabled={kaydediliyor || secilenId === mevcutPaletId}
                        className="w-full bg-rust hover:bg-rust-light text-foreground font-syne font-bold py-3.5
                       rounded-xl disabled:opacity-50 disabled:hover:bg-rust transition-colors shadow-sm"
                    >
                        {kaydediliyor
                            ? '🤖 Uygulanıyor ve İnşa Ediliyor...'
                            : secilenId === mevcutPaletId
                                ? 'Mevcut palet seçili'
                                : '✨ Bu Renkler ile Siteyi Güncelle'}
                    </button>

                    {kaydediliyor && (
                        <p className="text-muted-foreground text-xs text-center font-medium animate-pulse">
                            ☁️ Cloudflare'e bağlanıyor (~30-60 saniye sürebilir)
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}
