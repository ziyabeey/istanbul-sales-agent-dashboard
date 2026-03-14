"use client";

import React from 'react'

interface GamificationProps {
    seviye: number
    puan: number
    sonrakiSeviyePuan: number
    streak: number
    rozetler: { ad: string; ikon: string; kazanildi: boolean }[]
}

const VARSAYILAN_ROZETLER = [
    { ad: 'İlk Giriş', ikon: '🎉', kazanildi: true },
    { ad: 'Site Açıldı', ikon: '🌐', kazanildi: true },
    { ad: 'İlk Müşteri', ikon: '🤝', kazanildi: false },
    { ad: '10 Yorum', ikon: '⭐', kazanildi: false },
    { ad: 'Hafta Streak', ikon: '🔥', kazanildi: false },
    { ad: 'Referans Yıldızı', ikon: '💎', kazanildi: false },
    { ad: 'AI Ustası', ikon: '🤖', kazanildi: false },
    { ad: '100 Müşteri', ikon: '🏆', kazanildi: false },
]

export default function GamificationWidget({
    seviye = 2,
    puan = 340,
    sonrakiSeviyePuan = 500,
    streak = 3,
    rozetler = VARSAYILAN_ROZETLER,
}: Partial<GamificationProps>) {
    const yuzde = Math.round((puan / sonrakiSeviyePuan) * 100)

    return (
        <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-syne font-bold text-lg text-foreground">Dijital Seviye</h3>
                <div className="flex items-center gap-2">
                    {streak > 0 && (
                        <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs font-bold">
                            🔥 {streak} gün streak
                        </span>
                    )}
                    <span className="bg-rust/10 text-rust px-3 py-1 rounded-full text-sm font-bold">
                        Seviye {seviye}
                    </span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{puan} puan</span>
                    <span>{sonrakiSeviyePuan} puan</span>
                </div>
                <div className="h-3 bg-warm rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-rust to-gold rounded-full transition-all duration-500"
                        style={{ width: `${yuzde}%` }}
                    />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Seviye {seviye + 1}&apos;e {sonrakiSeviyePuan - puan} puan kaldı</p>
            </div>

            {/* Rozet Grid */}
            <div className="grid grid-cols-4 gap-2">
                {rozetler.map((r) => (
                    <div
                        key={r.ad}
                        className={`flex flex-col items-center p-2 rounded-xl text-center transition-all ${
                            r.kazanildi
                                ? 'bg-sage/10 border border-sage/30'
                                : 'bg-stone-50 opacity-40'
                        }`}
                    >
                        <span className="text-xl">{r.ikon}</span>
                        <span className="text-[10px] text-muted-foreground font-medium leading-tight mt-1">{r.ad}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
