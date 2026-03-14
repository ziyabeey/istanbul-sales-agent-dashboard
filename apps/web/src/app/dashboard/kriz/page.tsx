'use client'
import { useEffect, useState } from 'react'
import { useEsnaf } from '@/context/EsnafContext'

export default function KrizPage() {
    const { esnafId } = useEsnaf()
    const [yorumlar, setYorumlar] = useState<any[]>([])
    const [gecmis, setGecmis] = useState<any[]>([])
    const [yukleniyor, setYukleniyor] = useState(true)
    const [duzenlenenId, setDuzenlenenId] = useState<string | null>(null)
    const [duzenlenenMetin, setDuzenlenenMetin] = useState('')
    const [isleniyor, setIsleniyor] = useState<string | null>(null)

    useEffect(() => {
        if (esnafId) fetchYorumlar()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [esnafId])

    async function fetchYorumlar() {
        setYukleniyor(true)
        try {
            const res = await fetch(`/api/yorumlar?esnafId=${esnafId}`)
            if (res.ok) {
                const data = await res.json()
                setYorumlar(data.filter((y: any) => y.yanitDurumu === 'bekliyor'))
                setGecmis(data.filter((y: any) => y.yanitDurumu !== 'bekliyor'))
            }
        } catch { }
        setYukleniyor(false)
    }

    async function handleOnayla(yorumId: string, yanitMetni: string) {
        setIsleniyor(yorumId)
        try {
            await fetch('/api/reviews', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ yorumId, yanitMetni, esnafId }),
            })
            setDuzenlenenId(null)
            await fetchYorumlar()
        } catch { }
        setIsleniyor(null)
    }

    if (yukleniyor) {
        return (
            <div className="p-4 space-y-3">
                {[1, 2].map(i => (
                    <div key={i} className="animate-pulse h-40 bg-card rounded-2xl" />
                ))}
            </div>
        )
    }

    return (
        <div className="p-4 max-w-md mx-auto space-y-4">
            <div className="flex items-center gap-3">
                <h1 className="text-foreground font-syne font-bold text-xl">Kriz Merkezi</h1>
                {yorumlar.length > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                        {yorumlar.length}
                    </span>
                )}
            </div>

            {yorumlar.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-2xl">
                    <p className="text-sage text-3xl mb-2">✅</p>
                    <p className="text-foreground font-bold">Her şey yolunda!</p>
                    <p className="text-muted-foreground text-sm mt-1">Bekleyen olumsuz yorum yok.</p>
                </div>
            ) : (
                yorumlar.map((yorum) => (
                    <div key={yorum.id} className="bg-card rounded-2xl p-4 space-y-3">
                        <div className="flex items-center gap-2">
                            <span className="text-amber-400 font-bold">{'⭐'.repeat(yorum.yildiz)}</span>
                            <span className="text-muted-foreground text-sm">{yorum.platform}</span>
                            <span className="text-muted-foreground text-xs ml-auto">{yorum.yazarAdi}</span>
                        </div>

                        <p className="text-muted-foreground text-sm italic">&ldquo;{yorum.metin}&rdquo;</p>

                        <div className="bg-background/50 border border-border/30 rounded-xl p-3">
                            <p className="text-muted-foreground text-xs font-mono uppercase mb-1">🤖 Sistem Yanıtı</p>
                            {duzenlenenId === yorum.id ? (
                                <textarea
                                    value={duzenlenenMetin}
                                    onChange={(e) => setDuzenlenenMetin(e.target.value)}
                                    className="w-full bg-transparent text-foreground text-sm resize-none outline-none"
                                    rows={4}
                                />
                            ) : (
                                <p className="text-foreground text-sm">{yorum.sistemYaniti}</p>
                            )}
                        </div>

                        <div className="flex gap-2">
                            {duzenlenenId === yorum.id ? (
                                <>
                                    <button
                                        onClick={() => handleOnayla(yorum.id, duzenlenenMetin)}
                                        disabled={isleniyor === yorum.id}
                                        className="flex-1 bg-sage text-white py-2 rounded-xl text-sm font-bold disabled:opacity-50"
                                    >
                                        {isleniyor === yorum.id ? '...' : '✓ Kaydet ve Yayınla'}
                                    </button>
                                    <button
                                        onClick={() => setDuzenlenenId(null)}
                                        className="bg-background border border-border text-muted-foreground px-3 py-2 rounded-xl text-sm"
                                    >
                                        İptal
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => handleOnayla(yorum.id, yorum.sistemYaniti)}
                                        disabled={isleniyor === yorum.id}
                                        className="flex-1 bg-sage text-white py-2 rounded-xl text-sm font-bold disabled:opacity-50"
                                    >
                                        {isleniyor === yorum.id ? '...' : '✓ Onayla'}
                                    </button>
                                    <button
                                        onClick={() => { setDuzenlenenId(yorum.id); setDuzenlenenMetin(yorum.sistemYaniti) }}
                                        className="bg-background border border-border text-muted-foreground px-3 py-2 rounded-xl text-sm"
                                    >
                                        ✎ Düzenle
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))
            )}

            {/* Geçmiş yanıtlar */}
            {gecmis.length > 0 && (
                <details className="bg-card rounded-2xl">
                    <summary className="p-4 text-muted-foreground cursor-pointer font-syne select-none">
                        Geçmiş Yanıtlar ({gecmis.length}) ▼
                    </summary>
                    <div className="px-4 pb-4 space-y-3">
                        {gecmis.map((y) => (
                            <div key={y.id} className="border-t border-ink/50 pt-3">
                                <p className="text-muted-foreground text-xs">{y.platform} — {'⭐'.repeat(y.yildiz)}</p>
                                <p className="text-muted-foreground text-sm italic mt-1">&ldquo;{y.metin}&rdquo;</p>
                                <p className="text-sage text-sm mt-1">→ {y.sistemYaniti}</p>
                            </div>
                        ))}
                    </div>
                </details>
            )}
        </div>
    )
}
