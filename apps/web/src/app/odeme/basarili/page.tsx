'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useEsnaf } from '@/context/EsnafContext'
import { CheckCircle2 } from 'lucide-react'

type SiteState = 'generating' | 'ready' | 'timeout'

interface Checklist {
    firestoreAktif: boolean
    modullerAktif: boolean
    siteHazir: boolean
}

export default function OdemeBasarili() {
    const { esnaf, esnafId } = useEsnaf()
    const router = useRouter()
    const [siteState, setSiteState] = useState<SiteState>('generating')
    const [siteUrl, setSiteUrl] = useState<string | null>(null)
    const [kopya, setKopya] = useState(false)
    const [checklist, setChecklist] = useState<Checklist>({
        firestoreAktif: false,
        modullerAktif: false,
        siteHazir: false,
    })
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        if (!esnafId) return

        function stopPolling() {
            if (intervalRef.current) clearInterval(intervalRef.current)
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }

        async function poll() {
            try {
                const res = await fetch(`/api/esnaf/${esnafId}`)
                if (!res.ok) return
                const data = await res.json()

                setChecklist({
                    firestoreAktif: data.durum === 'aktif',
                    modullerAktif: Array.isArray(data.aktifModuller) && data.aktifModuller.length > 0,
                    siteHazir: !!(data.subdomainUrl),
                })

                if (data.subdomainUrl) {
                    setSiteUrl(data.subdomainUrl)
                    setSiteState('ready')
                    stopPolling()
                }
            } catch {
                // sessizce devam et
            }
        }

        poll() // ilk anında çek
        intervalRef.current = setInterval(poll, 3000)

        // 90 saniye timeout
        timeoutRef.current = setTimeout(() => {
            if (siteState === 'generating') {
                setSiteState('timeout')
                stopPolling()
            }
        }, 90_000)

        return stopPolling
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [esnafId])

    const checkItems = [
        { key: 'firestoreAktif', emoji: '✅', metin: 'Hesabınız aktifleştirildi', done: checklist.firestoreAktif },
        { key: 'modullerAktif', emoji: '🤖', metin: 'Yapay zeka modülleri yüklendi', done: checklist.modullerAktif },
        { key: 'siteHazir', emoji: '🌐', metin: 'Siteniz yayına alındı', done: checklist.siteHazir },
    ]

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="w-full max-w-md text-center space-y-6">
                <div className="text-8xl">{siteState === 'ready' ? '🎉' : '⚙️'}</div>

                <div>
                    <h1 className="text-foreground font-syne font-extrabold text-3xl">
                        {siteState === 'ready' ? 'Siteniz Hazır!' : 'Ödeme Başarılı!'}
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        {esnaf?.ad ? `Hoş geldiniz, ${esnaf.ad} Usta!` : 'Hoş geldiniz!'}
                    </p>
                </div>

                {/* Canlı checklist */}
                <div className="bg-card rounded-2xl p-6 space-y-3 text-left">
                    {checkItems.map((item) => (
                        <div key={item.key} className="flex items-center gap-3">
                            {item.done
                                ? <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                : <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                                    <span className="w-3 h-3 rounded-full border-2 border-border animate-pulse block" />
                                  </span>
                            }
                            <p className={`text-sm ${item.done ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {item.metin}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Site hazır durumu */}
                {siteState === 'ready' && siteUrl && (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 space-y-3">
                        <p className="text-emerald-400 text-sm font-syne font-bold">Siteniz canlı!</p>
                        <div className="flex items-center gap-2 bg-background rounded-xl px-3 py-2">
                            <span className="text-foreground font-mono text-sm flex-1 truncate">{siteUrl}</span>
                            <button
                                onClick={() => { navigator.clipboard.writeText(siteUrl); setKopya(true); setTimeout(() => setKopya(false), 2000) }}
                                className="text-xs text-rust shrink-0"
                            >
                                {kopya ? 'Kopyalandı!' : 'Kopyala'}
                            </button>
                        </div>
                        <a
                            href={siteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-emerald-600 text-foreground font-syne font-bold py-3 rounded-xl text-sm"
                        >
                            Siteyi Görüntüle →
                        </a>
                    </div>
                )}

                {/* Generating durumu */}
                {siteState === 'generating' && (
                    <div className="bg-rust/10 border border-rust/30 rounded-2xl p-4">
                        <p className="text-rust text-sm font-syne font-bold">
                            📲 Siteniz hazır olduğunda WhatsApp&#39;a link gelecek
                        </p>
                        <p className="text-muted-foreground text-xs mt-1">Genellikle 1-3 dakika sürer</p>
                    </div>
                )}

                {/* Timeout durumu */}
                {siteState === 'timeout' && (
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4">
                        <p className="text-amber-400 text-sm font-syne font-bold">
                            Siteniz hazırlanmaya devam ediyor
                        </p>
                        <p className="text-muted-foreground text-xs mt-1">
                            WhatsApp&#39;ınıza link gelecek. Dashboard&#39;dan da takip edebilirsiniz.
                        </p>
                    </div>
                )}

                <button
                    onClick={() => router.push('/dashboard')}
                    className="w-full bg-rust text-foreground font-syne font-bold py-4 rounded-2xl text-lg"
                >
                    Dashboard&#39;a Git →
                </button>
            </div>
        </div>
    )
}
