'use client'

import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { CheckCircle2, MessageCircle, TrendingUp, Megaphone } from 'lucide-react'

export function useAgentStream(esnafId: string | null) {
    const knownLogs = useRef<Set<string>>(new Set())
    const initialized = useRef(false)

    useEffect(() => {
        if (!esnafId) return

        const fetchLogs = async () => {
            try {
                const req = await fetch(`/api/dashboard/stream?esnafId=${esnafId}&limit=5`)
                if (!req.ok) return
                const res = await req.json()

                // İlk yüklemede pop-up çıkmasın diye var olan logları sadece kayıt ediyoruz
                if (!initialized.current) {
                    res.logs.forEach((log: any) => knownLogs.current.add(log.id))
                    initialized.current = true
                    return
                }

                // Yeni gelenleri saptayıp ekrana yansıt (Sondan başa Toast sırası)
                const newLogs = res.logs.filter((log: any) => !knownLogs.current.has(log.id)).reverse()

                newLogs.forEach((data: any) => {
                    knownLogs.current.add(data.id)

                    if (data.ajan === 'tahsilat_motoru') {
                        const miktar = data.output?.tahsilatMiktari || data.output?.kalanTutar || 0
                        toast.success(`Ting! Otonom ₺${miktar} Tahsil Edildi`, {
                            description: 'Yapay Zeka CFO tahsilat eylemini başarıyla tamamladı.',
                            icon: <CheckCircle2 className="text-emerald-500" />
                        })
                    } else if (data.kanal === 'instagram_dm' || data.kanal === 'whatsapp') {
                        toast.info(`Yeni bir müşteri asistanınızla mesajlaşıyor.`, {
                            description: `Kanal: ${data.kanal === 'instagram_dm' ? 'Instagram' : 'WhatsApp'}`,
                            icon: <MessageCircle className="text-blue-500" />
                        })
                    } else if (data.ajan === 'marketing_agent') {
                        toast.success(`Otonom Reklam Başlatıldı!`, {
                            description: `AI Meta Ads üzerinden reklam çıktı. Bütçe: ₺${data.output?.butce || 50}`,
                            icon: <Megaphone className="text-amber-500" />
                        })
                    } else if (data.ajan === 'fiyatlandirma_motoru') {
                        toast.success(`Dinamik Fiyat (Surge) Tetiklendi.`, {
                            description: 'Bölgedeki yoğunluğa göre otomatik zam uygulandı.',
                            icon: <TrendingUp className="text-emerald-500" />
                        })
                    }
                })
            } catch (e) { }
        }

        // 5 Saniyede bir arka planda sessizce Firestore API'sini yokla
        fetchLogs()
        const interval = setInterval(fetchLogs, 5000)

        return () => clearInterval(interval)
    }, [esnafId])
}
