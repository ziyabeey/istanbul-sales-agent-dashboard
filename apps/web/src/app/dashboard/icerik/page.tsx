'use client'
import { useEffect, useState } from 'react'
import { useEsnaf } from '@/context/EsnafContext'
import { toast } from 'sonner'

const PLATFORMLAR = ['instagram', 'facebook', 'tiktok', 'gmb'] as const
type Platform = typeof PLATFORMLAR[number]

const PLATFORM_ETIKET: Record<Platform, string> = {
    instagram: '📸 Instagram',
    facebook: '👍 Facebook',
    tiktok: '🎵 TikTok',
    gmb: '🗺️ Google',
}

export default function IcerikPage() {
    const { esnafId } = useEsnaf()
    const [aktifPlatform, setAktifPlatform] = useState<Platform>('instagram')
    const [icerikler, setIcerikler] = useState<any[]>([])
    const [yukleniyor, setYukleniyor] = useState(true)
    const [kopyalananId, setKopyalananId] = useState<string | null>(null)
    const [paylasılanId, setPaylasılanId] = useState<string | null>(null)
    const [uretiyor, setUretiyor] = useState(false)

    useEffect(() => {
        if (esnafId) fetchIcerikler()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [esnafId, aktifPlatform])

    async function fetchIcerikler() {
        setYukleniyor(true)
        try {
            const res = await fetch(`/api/icerik?esnafId=${esnafId}&platform=${aktifPlatform}`)
            if (res.ok) setIcerikler(await res.json())
        } catch {
            toast.error('İçerikler yüklenemedi')
        }
        setYukleniyor(false)
    }

    async function handleKopyala(icerik: any) {
        const tam = [icerik.metin, ...(icerik.hashtagler || [])].join('\n\n')
        await navigator.clipboard.writeText(tam)
        setKopyalananId(icerik.id)
        await fetch('/api/icerik/durum', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ icerikId: icerik.id, durum: 'kopyalandi' }),
        }).catch(() => { /* tracking best-effort */ })
        setTimeout(() => setKopyalananId(null), 2000)
    }

    async function handlePaylasim(icerik: any) {
        setPaylasılanId(icerik.id)
        await fetch('/api/icerik/durum', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ icerikId: icerik.id, durum: 'paylasıldı' }),
        }).catch(() => { /* tracking best-effort */ })
    }

    async function handleIcerikUret() {
        setUretiyor(true)
        try {
            const res = await fetch('/api/icerik/uret', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ esnafId, platform: aktifPlatform }),
            })
            if (!res.ok) throw new Error()
            await fetchIcerikler()
        } catch {
            toast.error('İçerik üretilemedi. Tekrar deneyin.')
        }
        setUretiyor(false)
    }

    return (
        <div className="p-4 max-w-md mx-auto space-y-4">
            <h1 className="text-foreground font-syne font-bold text-xl">İçerik Stüdyosu</h1>

            {/* Platform sekmeleri */}
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {PLATFORMLAR.map((p) => (
                    <button
                        key={p}
                        onClick={() => setAktifPlatform(p)}
                        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-syne font-bold transition-all ${aktifPlatform === p ? 'bg-rust text-foreground' : 'bg-card text-muted-foreground'
                            }`}
                    >
                        {PLATFORM_ETIKET[p]}
                    </button>
                ))}
            </div>

            {/* İçerik listesi */}
            {yukleniyor ? (
                <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-card rounded-2xl p-4 animate-pulse">
                            <div className="h-4 bg-warm/30 rounded w-20 mb-3" />
                            <div className="h-16 bg-warm/30 rounded" />
                        </div>
                    ))}
                </div>
            ) : icerikler.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-2xl">
                    <p className="text-muted-foreground mb-4">Bu platform için içerik henüz hazırlanmadı.</p>
                    <button
                        onClick={handleIcerikUret}
                        disabled={uretiyor}
                        className="bg-rust text-foreground px-6 py-3 rounded-xl font-syne font-bold disabled:opacity-50"
                    >
                        {uretiyor ? '⏳ Üretiliyor...' : 'İçerik Üret ✨'}
                    </button>
                </div>
            ) : (
                <div className="space-y-3">
                    {icerikler.map((icerik) => (
                        <div
                            key={icerik.id}
                            className={`bg-card rounded-2xl p-4 transition-all ${paylasılanId === icerik.id ? 'ring-2 ring-sage' : ''
                                }`}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-rust font-syne font-bold text-sm">{icerik.gun || aktifPlatform}</span>
                                {paylasılanId === icerik.id && (
                                    <span className="text-sage text-xs">✓ Paylaşıldı</span>
                                )}
                            </div>
                            <p className="text-foreground text-sm leading-relaxed">{icerik.metin}</p>
                            {icerik.hashtagler?.length > 0 && (
                                <p className="text-muted-foreground text-xs mt-2">{icerik.hashtagler.join(' ')}</p>
                            )}
                            <div className="flex gap-2 mt-3">
                                <button
                                    onClick={() => handleKopyala(icerik)}
                                    className="flex-1 bg-background border border-border text-foreground py-2 rounded-xl text-sm transition-opacity hover:opacity-80"
                                >
                                    {kopyalananId === icerik.id ? '✓ Kopyalandı' : '📋 Kopyala'}
                                </button>
                                {paylasılanId !== icerik.id && (
                                    <button
                                        onClick={() => handlePaylasim(icerik)}
                                        className="bg-sage/20 border border-sage text-sage px-4 py-2 rounded-xl text-sm"
                                    >
                                        ✓ Paylaştım
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
