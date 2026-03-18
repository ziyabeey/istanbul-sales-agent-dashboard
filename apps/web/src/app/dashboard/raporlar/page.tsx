'use client'
import { useEffect, useState } from 'react'
import { useEsnaf } from '@/context/EsnafContext'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts'

const MOCK_HAFTALIK = [
    { hafta: 'H1', ziyaretci: 23, yorum: 1 },
    { hafta: 'H2', ziyaretci: 41, yorum: 2 },
    { hafta: 'H3', ziyaretci: 38, yorum: 0 },
    { hafta: 'H4', ziyaretci: 67, yorum: 3 },
    { hafta: 'H5', ziyaretci: 89, yorum: 4 },
    { hafta: 'H6', ziyaretci: 102, yorum: 2 },
    { hafta: 'H7', ziyaretci: 147, yorum: 5 },
    { hafta: 'H8', ziyaretci: 134, yorum: 3 },
]

export default function RaporlarPage() {
    const { esnaf } = useEsnaf()
    const [ciroSkor, setCiroSkor] = useState<number | null>(null)
    const [ciroGonderildi, setCiroGonderildi] = useState(false)

    async function handleCiroGonder(skor: number) {
        setCiroSkor(skor)
        setCiroGonderildi(true)
        try {
            const res = await fetch('/api/ciro-anket', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    esnafId: esnaf?.id,
                    skor,
                    hafta: new Date().toISOString().split('T')[0],
                }),
            })
            if (!res.ok) throw new Error()
        } catch {
            setCiroGonderildi(false)
            setCiroSkor(null)
        }
    }

    return (
        <div className="p-4 max-w-md mx-auto space-y-4">
            <h1 className="text-foreground font-syne font-bold text-xl">Raporlar</h1>

            {/* Metrik kartlar */}
            <div className="grid grid-cols-2 gap-3">
                {[
                    { label: 'Bu Hafta', deger: '147', alt: 'ziyaretçi', icon: '👥' },
                    { label: 'Google', deger: '4.3', alt: '/ 5.0 puan', icon: '⭐' },
                    { label: 'Zirve Gün', deger: 'Cuma', alt: 'en yoğun', icon: '📈' },
                    { label: 'Kaynak', deger: 'Google', alt: '%68 organik', icon: '🔍' },
                ].map((m) => (
                    <div key={m.label} className="bg-card rounded-xl p-4">
                        <p className="text-xl mb-1">{m.icon}</p>
                        <p className="text-muted-foreground text-xs uppercase tracking-wider">{m.label}</p>
                        <p className="text-foreground font-syne font-bold text-xl mt-1">{m.deger}</p>
                        <p className="text-muted-foreground text-xs">{m.alt}</p>
                    </div>
                ))}
            </div>

            {/* Ziyaretçi grafiği */}
            <div className="bg-card rounded-2xl p-4">
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-4">
                    8 Haftalık Ziyaretçi
                </p>
                <ResponsiveContainer width="100%" height={160}>
                    <LineChart data={MOCK_HAFTALIK}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2A2620" />
                        <XAxis dataKey="hafta" tick={{ fill: '#7A7060', fontSize: 11 }} />
                        <YAxis tick={{ fill: '#7A7060', fontSize: 11 }} />
                        <Tooltip
                            contentStyle={{ background: '#1C1A17', border: 'none', borderRadius: 8 }}
                            labelStyle={{ color: '#F8F4EE' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="ziyaretci"
                            stroke="#C04B1E"
                            strokeWidth={2}
                            dot={{ fill: '#C04B1E', r: 3 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Ciro anketi */}
            <div className="bg-card rounded-2xl p-4">
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-3">
                    Bu Hafta Nasıl Gitti?
                </p>
                {ciroGonderildi ? (
                    <div className="text-center py-4">
                        <p className="text-sage text-2xl">✓</p>
                        <p className="text-foreground mt-2">Teşekkürler!</p>
                    </div>
                ) : (
                    <div className="flex justify-between gap-2">
                        {[
                            { skor: 1, emoji: '😞', label: 'Kötü' },
                            { skor: 2, emoji: '😐', label: 'Orta' },
                            { skor: 3, emoji: '🙂', label: 'İyi' },
                            { skor: 4, emoji: '😊', label: 'Çok iyi' },
                            { skor: 5, emoji: '🚀', label: 'Harika' },
                        ].map((s) => (
                            <button
                                key={s.skor}
                                onClick={() => handleCiroGonder(s.skor)}
                                className={`flex-1 flex flex-col items-center py-3 rounded-xl transition-all
                  \${ciroSkor === s.skor
                    ? 'bg-rust/30 border border-rust'
                    : 'bg-background hover:bg-warm'}`}
                            >
                                <span className="text-xl">{s.emoji}</span>
                                <span className="text-muted-foreground text-xs mt-1">{s.label}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <p className="text-muted-foreground text-xs text-center">
                Google Analytics entegrasyonu yakında — gerçek veriler gelecek.
            </p>
        </div>
    )
}
