'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useEsnaf } from '@/context/EsnafContext'
import { CheckCircle2, Lock, LayoutTemplate, Zap, RefreshCw } from 'lucide-react'
import { MODULLER, esnafModulleri } from '@/data/moduller'
import type { Modul } from '@/data/moduller'
import { toast } from 'sonner'

export default function ModulYonetimPage() {
    const { esnaf, esnafId } = useEsnaf()
    const router = useRouter()
    const [aktifModuller, setAktifModuller] = useState<Record<string, boolean>>({})
    const [kaydediliyor, setKaydediliyor] = useState(false)
    const [izinVerilenModuller, setIzinVerilenModuller] = useState<Modul[]>([])
    const [tumModuller, setTumModuller] = useState<Modul[]>([])

    useEffect(() => {
        if (!esnaf || !esnafId) return

        // 1. Sektöre özel ve genel modül listesini çıkart
        const izinVerilen = esnafModulleri(esnaf.sektor, esnaf.paket || 'TEMEL')
        setIzinVerilenModuller(izinVerilen)

        // Sektör dışı olsa bile genel modüllerden seçilebilecek geniş liste (Örn: canlı destek her sektöre uyar)
        // Ancak şimdilik sadece sektörel modülleri veya tüm MODULLER'i filtreleyelim.
        // Daha zengin UX için sektör tarafından önerilmeyen tüm modülleri de listelemek mantıklı olabilir,
        // ancak biz şimdilik karmaşayı önlemek adına tüm MODULLER üzerinden yürüyüp, sektörel önerilenleri üste koyacağız.
        setTumModuller(MODULLER)

        // 2. Esnafın aktif seçimlerini yükle (Daha önce kaydedilmişse veya default)
        const aktifListesi = esnaf.aktifWebModulleri ?? izinVerilen.map(m => m.id)
        const stateMap: Record<string, boolean> = {}

        MODULLER.forEach(m => {
            stateMap[m.id] = aktifListesi.includes(m.id)
        })

        setAktifModuller(stateMap)
    }, [esnaf, esnafId])

    const handleToggle = async (modul: Modul) => {
        // Paket Yetki Kontrolü (Graceful Degradation Upsell UI)
        const tierScores: Record<string, number> = {
            'TEMEL': 1, 'STANDART': 2, 'BUYUME': 3, 'PREMIUM': 4, 'PREMIUMPLUS': 5
        }

        const currentScore = tierScores[esnaf?.paket?.toUpperCase() || 'TEMEL'] || 1
        const requiredScore = tierScores[modul.minPaket] || 1

        if (currentScore < requiredScore) {
            toast.error(`Paket Yükseltme Gerekiyor`, {
                description: `${modul.ad} modülünü sitenize eklemek için minimum ${modul.minPaket} paketine sahip olmalısınız.`,
                icon: <Lock className="text-amber-500 w-4 h-4" />,
            })
            return
        }

        const yeniDurum = !aktifModuller[modul.id]

        // Optimistic UI Update
        const newState = { ...aktifModuller, [modul.id]: yeniDurum }
        setAktifModuller(newState)

        // Sadece True olan keyleri topla
        const kaydedilecekListe = Object.keys(newState).filter(id => newState[id])

        // Arka planda sessizce Firebase'e kaydet (siteJson.moduller ile senkron)
        setKaydediliyor(true)
        try {
            const res = await fetch('/api/esnaf/sync-moduller', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ moduller: kaydedilecekListe })
            })

            if (!res.ok) throw new Error('Kaydedilemedi')

            toast.success(yeniDurum ? `${modul.ad} Sitenize Eklendi` : `${modul.ad} Sitenizden Çıkarıldı`, {
                description: 'Değişikliklerin canlıya yansıması için "Sitem" sayfasından AI Robotları tetikleyin.',
            })
        } catch (error) {
            // Revert on error
            setAktifModuller(aktifModuller)
            toast.error('Kayıt Başarısız', { description: 'Sunucuya ulaşılamadı. Lütfen tekrar deneyin.' })
        } finally {
            setKaydediliyor(false)
        }
    }

    if (!esnaf) return <div className="p-8 text-muted-foreground font-mono animate-pulse">Modüller analiz ediliyor...</div>

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <h1 className="text-foreground font-syne font-bold text-3xl">Web Site Modülleri</h1>
                    <p className="text-muted-foreground text-sm mt-2 max-w-2xl leading-relaxed">
                        Sitenizin ziyaretçilere sunacağı yetenekleri (Opt-in) dilediğiniz gibi açıp kapatabilirsiniz.
                        Kapattığınız özellikler, AI motoru siteyi generatif olarak kodlarken tamamen çıkartılır.
                    </p>
                </div>
                <button
                    onClick={() => router.push('/dashboard/sitem')}
                    className="flex items-center gap-2 bg-rust hover:bg-rust-light text-white px-5 py-3 rounded-xl font-bold font-syne transition-colors whitespace-nowrap shadow-sm"
                >
                    <RefreshCw className="w-4 h-4" /> Değişiklikleri Siteye Uygula
                </button>
            </div>

            {/* Sektörünüz İçin Önerilen Modüller Gridi */}
            <div className="space-y-4">
                <h2 className="text-foreground font-syne font-bold text-xl flex items-center gap-2">
                    <Zap className="w-5 h-5 text-rust" />
                    {esnaf.sektor} Sektörü İçin Önerilen Özellikler
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {izinVerilenModuller.map(modul => (
                        <ModuleCard
                            key={modul.id}
                            modul={modul}
                            isActive={aktifModuller[modul.id] || false}
                            onToggle={() => handleToggle(modul)}
                            paket={esnaf.paket}
                        />
                    ))}
                </div>
            </div>

            {/* Diğer Tüm Modüller */}
            <div className="space-y-4 pt-8 border-t border-border-light/20">
                <h2 className="text-muted-foreground font-syne font-bold text-lg flex items-center gap-2">
                    <LayoutTemplate className="w-5 h-5" />
                    Geniş Modül Arşivi
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {tumModuller
                        .filter(m => !izinVerilenModuller.some(im => im.id === m.id))
                        .map(modul => (
                            <ModuleCard
                                key={modul.id}
                                modul={modul}
                                isActive={aktifModuller[modul.id] || false}
                                onToggle={() => handleToggle(modul)}
                                paket={esnaf.paket}
                                isSecondary
                            />
                        ))}
                </div>
            </div>

        </div>
    )
}

function ModuleCard({ modul, isActive, onToggle, paket, isSecondary = false }: { modul: Modul, isActive: boolean, onToggle: () => void, paket: string, isSecondary?: boolean }) {

    // Basit paket kıyaslaması için helper
    const tierScores: Record<string, number> = { 'TEMEL': 1, 'STANDART': 2, 'BUYUME': 3, 'PREMIUM': 4, 'PREMIUMPLUS': 5 }
    const isLocked = tierScores[paket?.toUpperCase() || 'TEMEL'] < tierScores[modul.minPaket]

    return (
        <div className={`border rounded-2xl p-5 flex flex-col justify-between transition-all ${isActive && !isLocked
                ? 'bg-sage/10 border-sage/30'
                : 'bg-white border-border-light/30'
            } ${isSecondary ? 'opacity-80 hover:opacity-100' : ''}`}>

            <div>
                <div className="flex justify-between items-start mb-3">
                    <h3 className={`font-syne font-bold ${isActive ? 'text-sage' : 'text-foreground'}`}>{modul.ad}</h3>
                    {isLocked ? (
                        <span className="flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
                            <Lock className="w-3 h-3" /> {modul.minPaket}
                        </span>
                    ) : (
                        <span className="text-[10px] uppercase font-bold text-muted-foreground/60">{modul.minPaket}</span>
                    )}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 min-h-[40px]">
                    {modul.aciklama}
                </p>
            </div>

            <button
                onClick={onToggle}
                className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${isActive
                        ? 'bg-sage text-white shadow-sm'
                        : isLocked
                            ? 'bg-stone-50 text-muted-foreground hover:bg-stone-100 border border-border-light/20'
                            : 'bg-background text-white hover:bg-background-light'
                    }`}
            >
                {isActive ? (
                    <><CheckCircle2 className="w-4 h-4" /> Sitede Açık</>
                ) : isLocked ? (
                    <><Lock className="w-4 h-4" /> Yükselt (Kilitli)</>
                ) : (
                    'Siteye Ekle'
                )}
            </button>
        </div>
    )
}
