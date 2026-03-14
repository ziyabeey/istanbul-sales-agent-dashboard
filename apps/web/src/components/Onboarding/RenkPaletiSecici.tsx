import React, { useState } from 'react'
import { RENK_PALETLERI, sektorPaletOner } from '@/data/renkPaletleri'
import type { RenkPaleti } from '@/types'

export default function RenkPaletiSecici({
    secilenSektor,
    secilenPaletId,
    onSec,
}: {
    secilenSektor: string
    secilenPaletId: string
    onSec: (paletId: string) => void
}) {
    const onerilenler = sektorPaletOner(secilenSektor)
    const [tumunuGoster, setTumunuGoster] = useState(false)
    const gosterilenPaletler = tumunuGoster ? RENK_PALETLERI : onerilenler

    return (
        <div className="space-y-5 w-full max-w-sm mx-auto mb-6">
            {!tumunuGoster && (
                <div className="flex items-center gap-2 px-3">
                    <div className="h-px flex-1 bg-warm" />
                    <span className="text-muted-foreground text-xs whitespace-nowrap font-medium">
                        ✨ Sektörünüz için öneriler
                    </span>
                    <div className="h-px flex-1 bg-warm" />
                </div>
            )}

            <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto px-1 snap-y pb-2">
                {gosterilenPaletler.map(palet => (
                    <PaletKart
                        key={palet.id}
                        palet={palet}
                        secili={secilenPaletId === palet.id}
                        onSec={() => onSec(palet.id)}
                    />
                ))}
            </div>

            {!tumunuGoster && (
                <button
                    onClick={() => setTumunuGoster(true)}
                    className="w-full border border-border text-muted-foreground text-sm py-3
                     rounded-xl hover:border-border hover:text-foreground font-medium transition-all"
                >
                    Tüm {RENK_PALETLERI.length} paleti gör →
                </button>
            )}
        </div>
    )
}

function PaletKart({
    palet,
    secili,
    onSec,
}: {
    palet: RenkPaleti
    secili: boolean
    onSec: () => void
}) {
    return (
        <button
            onClick={onSec}
            className={`w-full rounded-2xl overflow-hidden border-2 transition-all text-left snap-start shrink-0
        ${secili
                    ? 'border-rust shadow-lg shadow-rust/20 scale-[1.02]'
                    : 'border-border hover:border-border'}`}
        >
            {/* Mini site önizlemesi */}
            <div
                style={{ background: palet.css.gradient || palet.css.arkaplan }}
                className="p-4"
            >
                <div className="flex items-center justify-between mb-3">
                    <div
                        style={{ background: palet.css.vurgu }}
                        className="w-16 h-2.5 rounded-full opacity-90"
                    />
                    <div className="flex gap-1.5">
                        {[1, 2, 3].map(i => (
                            <div
                                key={i}
                                style={{ background: palet.css.altMetin }}
                                className="w-4 h-1.5 rounded-full opacity-60"
                            />
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <div
                        style={{ background: palet.css.metin }}
                        className="w-3/4 h-3 rounded-full mb-1.5 opacity-90"
                    />
                    <div
                        style={{ background: palet.css.altMetin }}
                        className="w-1/2 h-2 rounded-full opacity-60"
                    />
                </div>

                <div className="flex items-center justify-between mt-3">
                    <div
                        style={{
                            background: palet.css.vurgu,
                            color: palet.css.metin,
                        }}
                        className="px-3 py-1.5 rounded-md text-[10px] font-bold shadow-sm"
                    >
                        Ara →
                    </div>
                    <div className="flex gap-1.5">
                        {palet.onizleme.map((renk, i) => (
                            <div
                                key={i}
                                style={{ background: renk }}
                                className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                                title={renk}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Palet bilgisi */}
            <div className="bg-white px-4 py-3">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-foreground font-syne font-bold text-sm tracking-tight">{palet.ad}</p>
                        <p className="text-muted-foreground-light text-[11px] mt-0.5 font-medium">{palet.aciklama}</p>
                    </div>
                    {secili && (
                        <div className="w-6 h-6 bg-rust rounded-full flex items-center
                            justify-center text-foreground text-sm shadow-sm scale-in-center">
                            ✓
                        </div>
                    )}
                </div>
            </div>
        </button>
    )
}
