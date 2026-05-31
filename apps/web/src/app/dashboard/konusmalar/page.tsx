'use client'

import { useEffect, useState, Suspense } from 'react'
import { useEsnaf } from '@/context/EsnafContext'
import { isMvpTestReleaseEnabled } from '@/lib/mvpFeatureFlags'
import { MetrikSkeleton } from '@/components/ui/MetrikSkeleton'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Phone, MessageCircle, Calendar } from 'lucide-react'

interface SesliArama {
    musteriNumara: string
    zaman: string
    ozet: string
    randevuVar: boolean
}

interface Konusma {
    musteriNumara: string
    sonMesaj: string
    sonZaman: string
    mesajSayisi: number
    randevuVar: boolean
}

interface Mesaj {
    mesaj: string
    kimden: 'musteri' | 'ai'
    zaman: string
}

function KonusmalarIcerik() {
    const { esnafId, loading, isDemo } = useEsnaf()
    const searchParams = useSearchParams()
    const isMvpTestRelease = isMvpTestReleaseEnabled()
    const aktifTab = !isMvpTestRelease && searchParams.get('tab') === 'sesli' ? 'sesli' : 'mesajlar'

    const [konusmalar, setKonusmalar] = useState<Konusma[]>([])
    const [secilen, setSecilen] = useState<string | null>(null)
    const [mesajlar, setMesajlar] = useState<Mesaj[]>([])
    const [yukleniyor, setYukleniyor] = useState(true)
    const [mesajYukleniyor, setMesajYukleniyor] = useState(false)
    const [sesliAramalar, setSesliAramalar] = useState<SesliArama[]>([])
    const [sesliYukleniyor, setSesliYukleniyor] = useState(false)

    useEffect(() => {
        if (esnafId) {
            if (aktifTab === 'mesajlar') fetchKonusmalar()
            else fetchSesliAramalar()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [esnafId, aktifTab])

    // SSE: Gerçek zamanlı yeni mesaj dinleme
    useEffect(() => {
        if (!esnafId || aktifTab !== 'mesajlar') return
        if (isDemo || isMvpTestRelease) return

        let es: EventSource | null = null
        try {
            es = new EventSource(`/api/dashboard/stream?esnafId=${esnafId}`)

            es.addEventListener('yeni-mesaj', () => {
                // Yeni mesaj geldiğinde listeyi güncelle
                fetchKonusmalar()
                // Eğer bir konuşma açıksa mesajları da güncelle
                if (secilen) fetchMesajlar(secilen)
            })

            es.onerror = () => {
                // Bağlantı kesilirse sessizce kapat — sayfa polling'e fallback eder
                es?.close()
            }
        } catch {
            // SSE desteklenmiyorsa sessizce devam et
        }

        return () => { es?.close() }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [esnafId, aktifTab, secilen, isDemo, isMvpTestRelease])

    async function fetchSesliAramalar() {
        setSesliYukleniyor(true)
        try {
            const res = await fetch(`/api/dashboard/konusmalar/sesli?esnafId=${esnafId}`)
            if (res.ok) setSesliAramalar(await res.json())
        } catch { }
        setSesliYukleniyor(false)
    }

    async function fetchKonusmalar() {
        try {
            setYukleniyor(true)
            const res = await fetch(`/api/dashboard/konusmalar?esnafId=${esnafId}`)
            if (res.ok) setKonusmalar(await res.json())
        } catch { }
        setYukleniyor(false)
    }

    async function fetchMesajlar(musteriNumara: string) {
        setSecilen(musteriNumara)
        setMesajYukleniyor(true)
        try {
            const res = await fetch(
                `/api/dashboard/konusmalar/mesajlar?esnafId=${esnafId}&musteriNumara=${encodeURIComponent(musteriNumara)}`
            )
            if (res.ok) setMesajlar(await res.json())
        } catch { }
        setMesajYukleniyor(false)
    }

    if (loading || yukleniyor) {
        return (
            <div className="p-4">
                <MetrikSkeleton />
            </div>
        )
    }

    return (
        <div className="flex flex-col md:flex-row h-[calc(100vh-80px)] md:h-screen">
            {/* Sol: Konuşma listesi */}
            <div className={`w-full md:w-80 border-r border-border/20 flex-shrink-0 overflow-y-auto bg-background ${secilen ? 'hidden md:block' : ''}`}>
                <div className="p-4 border-b border-border/20">
                    <h1 className="text-foreground font-syne font-bold text-lg">Konuşmalar</h1>
                    {/* Tab bar */}
                    <div className="flex gap-1 mt-3 bg-warm/10 rounded-xl p-1">
                        <Link
                            href="/dashboard/konusmalar"
                            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-syne font-bold transition-all ${aktifTab === 'mesajlar' ? 'bg-rust text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            <MessageCircle className="w-3.5 h-3.5" />
                            Mesajlar
                        </Link>
                        {isMvpTestRelease ? (
                            <span className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-syne font-bold text-muted-foreground/50 cursor-not-allowed">
                                <Phone className="w-3.5 h-3.5" />
                                Sesli <span className="text-[9px] uppercase">Yakında</span>
                            </span>
                        ) : (
                            <Link
                                href="/dashboard/konusmalar?tab=sesli"
                                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-syne font-bold transition-all ${aktifTab === 'sesli' ? 'bg-rust text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                <Phone className="w-3.5 h-3.5" />
                                Sesli
                            </Link>
                        )}
                    </div>
                </div>

                {/* Sesli Aramalar Tab */}
                {aktifTab === 'sesli' && (
                    <div className="p-4 space-y-3">
                        {sesliYukleniyor ? (
                            <MetrikSkeleton />
                        ) : sesliAramalar.length === 0 ? (
                            <div className="text-center py-8">
                                <Phone className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                                <p className="text-muted-foreground text-sm">Henüz sesli arama yok.</p>
                                <p className="text-muted-foreground/60 text-xs mt-1">BUYUME+ pakette sesli AI asistan aktif olunca aramalar burada görünür.</p>
                            </div>
                        ) : (
                            sesliAramalar.map((arama, i) => (
                                <div key={i} className="bg-warm/5 border border-border/10 rounded-xl p-3 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-foreground text-sm font-syne font-bold">{arama.musteriNumara}</span>
                                        {arama.randevuVar && (
                                            <span className="flex items-center gap-1 text-emerald-400 text-xs">
                                                <Calendar className="w-3 h-3" /> Randevu
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-muted-foreground text-xs line-clamp-2">{arama.ozet || '—'}</p>
                                    <p className="text-muted-foreground/50 text-xs">{arama.zaman}</p>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* WhatsApp Mesajlar Tab */}
                {aktifTab === 'mesajlar' && (
                    <>
                        {konusmalar.length === 0 ? (
                            <div className="p-6 text-center">
                                <p className="text-muted-foreground text-sm">Henüz müşteri konuşması yok.</p>
                                <p className="text-muted-foreground/60 text-xs mt-2">
                                    AI müşteri servisi aktif olduğunda gelen mesajlar burada görünür.
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y divide-stone/10">
                                {konusmalar.map(k => (
                                    <button
                                        key={k.musteriNumara}
                                        onClick={() => fetchMesajlar(k.musteriNumara)}
                                        className={`w-full text-left p-4 hover:bg-warm/10 transition-colors ${secilen === k.musteriNumara ? 'bg-warm/20' : ''}`}
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-foreground text-sm font-semibold truncate">
                                                {k.musteriNumara}
                                            </span>
                                            {k.randevuVar && (
                                                <span className="text-xs bg-sage/20 text-sage px-2 py-0.5 rounded-full">
                                                    Randevu
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-muted-foreground text-xs truncate">{k.sonMesaj}</p>
                                        <p className="text-muted-foreground/50 text-[10px] mt-1">
                                            {k.mesajSayisi} mesaj — {k.sonZaman}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Sağ: Seçilen konuşma */}
            <div className={`flex-1 flex flex-col bg-background ${!secilen ? 'hidden md:flex' : 'flex'}`}>
                {!secilen ? (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-muted-foreground text-sm">Bir konusma secin</p>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="p-4 border-b border-border/20 flex items-center gap-3">
                            <button
                                onClick={() => setSecilen(null)}
                                className="md:hidden text-muted-foreground hover:text-foreground"
                            >
                                &larr;
                            </button>
                            <div>
                                <p className="text-foreground font-syne font-bold text-sm">{secilen}</p>
                                <p className="text-muted-foreground text-xs">AI musteri temsilcisi aktif</p>
                            </div>
                        </div>

                        {/* Mesajlar */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {mesajYukleniyor ? (
                                <MetrikSkeleton />
                            ) : (
                                mesajlar.map((m, i) => (
                                    <div
                                        key={i}
                                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${m.kimden === 'musteri'
                                                ? 'bg-warm/20 text-foreground mr-auto'
                                                : 'bg-rust/20 text-foreground ml-auto'
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed">{m.mesaj}</p>
                                        <p className={`text-[10px] mt-1 ${m.kimden === 'musteri' ? 'text-muted-foreground/50' : 'text-rust/50'}`}>
                                            {m.kimden === 'ai' ? 'AI' : 'Musteri'} — {m.zaman}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Alt bilgi */}
                        <div className="p-3 border-t border-border/20 text-center">
                            <p className="text-muted-foreground/50 text-xs">
                                AI otomatik yanit veriyor. Manuel mudahale icin yaklasim.
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default function KonusmalarPage() {
    return (
        <Suspense fallback={
            <div className="p-4">
                <MetrikSkeleton />
            </div>
        }>
            <KonusmalarIcerik />
        </Suspense>
    )
}
