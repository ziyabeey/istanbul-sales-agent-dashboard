import { NextResponse } from 'next/server'
import { kuyruktanAl, islemBaslat, islemTamamla, islemHata } from '@/lib/islemKuyrugu'
import { runAdkOrchestrator } from '@/agents/OrchestratorAgent'
import { waMesajGonder } from '@/lib/twilioClient'
import { urlToBase64 } from '@/utils/medyaOkuyucu'
import { gorselAnalizVeTeklif } from '@/lib/visionZeka'
import { adminDb } from '@/lib/firebaseAdmin'

/**
 * Kuyruk İşleyici Worker (Faz 44)
 * 
 * Cron ile çağrılır (her 10-30 saniye) veya CloudFlare Workers ile
 * Bu endpoint kuyruktan bekleyen işlemleri alır ve sırayla işler.
 * 
 * Güvenlik: /api/cron/* rotası middleware'de public
 */
export async function GET() {
    try {
        const islemler = await kuyruktanAl(3) // her çağrıda max 3 işlem

        if (islemler.length === 0) {
            return NextResponse.json({ islem: 0, mesaj: 'Kuyruk boş' })
        }

        let islenen = 0

        for (const { id, data } of islemler) {
            // Atomik olarak "işleniyor" yap (race condition koruması)
            const baslatildi = await islemBaslat(id)
            if (!baslatildi) continue

            try {
                let yanit: string

                if (data.tip === 'whatsapp') {
                    // Görsel analiz (varsa)
                    let extraContext = data.payload.context || ''
                    if (data.payload.mediaUrl && data.payload.mimeType && data.esnafId) {
                        const esnafDoc = await adminDb.collection('esnaflar').doc(data.esnafId).get()
                        const esnaf = esnafDoc.data()
                        if (esnaf) {
                            const base64 = await urlToBase64(data.payload.mediaUrl)
                            if (base64) {
                                const analiz = await gorselAnalizVeTeklif({
                                    gorselBase64: base64,
                                    mimeType: data.payload.mimeType,
                                    sektor: esnaf.sektor || 'Genel Ticaret',
                                    musteriNotu: data.payload.mesaj,
                                    esnafHizmetVeFiyatlari: esnaf.istatistik?.fiyatListesi || ''
                                })
                                if (analiz) {
                                    extraContext += `\n[SİSTEM BİLGİSİ: GÖRSEL ANALİZİ: "${analiz.tespit}". TEKLİF: ${analiz.teklifTutari ? analiz.teklifTutari + ' TL' : 'Bilinmiyor'}. TASLAK: "${analiz.aiYanitTaslagi}"]`
                                }
                            }
                        }
                    }

                    // ADK Orchestrator
                    yanit = await runAdkOrchestrator(
                        data.payload.sessionId || `wa_worker_${id}`,
                        `${extraContext}Mesaj: "${data.payload.mesaj}"`
                    )

                    // Yanıtı gönder
                    if (data.payload.telefon) {
                        await waMesajGonder(data.payload.telefon, yanit)
                    }
                } else {
                    yanit = `[${data.tip}] İşlem henüz desteklenmiyor`
                }

                await islemTamamla(id, yanit)

                // Log
                await adminDb.collection('agent_logs').add({
                    ajan: 'kuyruk_isleyici',
                    esnafId: data.esnafId,
                    tip: 'kuyruk_islendi',
                    input: { kuyrukId: id, tip: data.tip },
                    output: { yanitUzunluk: yanit.length },
                    basari: true,
                    hata: null,
                    zaman: new Date(),
                    kanal: data.tip as any,
                })

                islenen++
            } catch (err: any) {
                console.error(`[KUYRUK] İşlem ${id} hata:`, err.message)
                await islemHata(id, err.message)
            }
        }

        return NextResponse.json({
            islem: islenen,
            toplam: islemler.length,
            mesaj: `${islenen}/${islemler.length} işlem tamamlandı`,
        })
    } catch (error: any) {
        console.error('[KUYRUK İŞLEYİCİ HATA]', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
