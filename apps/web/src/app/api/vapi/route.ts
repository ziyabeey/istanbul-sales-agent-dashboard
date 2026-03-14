import { NextResponse } from "next/server"
import { adminDb, Timestamp } from "@/lib/firebaseAdmin"
import logger from "@/utils/logger"

export async function POST(req: Request) {
    // Webhook secret guard
    const secret = req.headers.get('x-vapi-secret')
    if (process.env.VAPI_WEBHOOK_SECRET && secret !== process.env.VAPI_WEBHOOK_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const payload = await req.json()

        // 1. Function Calling (Custom Tools during call)
        if (payload.message?.type === "function-call") {
            const functionCall = payload.message.functionCall
            const callId = payload.message.call?.id

            // Opsiyonel olarak takvim müsaitliği, fiyat vs soran agent'a canlı data dönme yeri
            if (functionCall.name === "check_calendar_availability") {
                return NextResponse.json({
                    results: [
                        {
                            toolCallId: functionCall.id,
                            result: "Randevu uygundur. 14:00 ve 15:00 saatleri boştur."
                        }
                    ]
                })
            }
        }

        // 2. End of Call Report (Çağrı Bittiğinde Transkript ve Özetin Düştüğü Yer)
        if (payload.message?.type === "end-of-call-report") {
            const report = payload.message.call
            const esnafQuery = await adminDb.collection('esnaflar')
                .where('vapiAgentId', '==', report.assistantId)
                .get()

            if (!esnafQuery.empty) {
                const esnafId = esnafQuery.docs[0].id
                const arayanNumara = report.customer?.number || 'Gizli Numara'
                const transkript = report.transcript || ''
                const ozet = report.summary || ''

                // Görüşmeyi Logla
                await adminDb.collection('musteriKonusmalar').add({
                    esnafId,
                    musteriNumara: arayanNumara,
                    mesaj: `[SESLİ ARAMA TRANSKRİPTİ]\nÖzet: ${ozet}\nDetay: ${transkript}`,
                    kimden: 'musteri', // İki tarafın da olduğu raw form, genel log için müşteri diyoruz
                    ajan: 'vapi_voice',
                    zaman: Timestamp.now()
                })

                await logger.logYaz(esnafId, 'info', 'Sesli Çağrı Bitti', `${arayanNumara} ile telefon görüşmesi tamamlandı. Kapsam: ${ozet.substring(0, 50)}...`)

                // Müşteri Randevu talep ettiyse NLP ile çekip sisteme işle
                const claudeYanit = await fetch('https://api.anthropic.com/v1/messages', {
                    method: 'POST',
                    headers: {
                        'x-api-key': process.env.ANTHROPIC_API_KEY!,
                        'anthropic-version': '2023-06-01',
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: 'claude-3-5-haiku-20241022',
                        max_tokens: 200,
                        system: "Aşağıdaki telefon konuşması özetinden randevu bilgisini çıkar. Müşteri bir hizmete ve zamana kesin randevu aldıysa JSON dön: `{\"ad\":\"Ali\",\"hizmet\":\"Boyama\",\"tarih\":\"...\"}`. Eğer almadıysa sadece `{}` dön.",
                        messages: [{ role: 'user', content: `Transkript: ${transkript}\nÖzet: ${ozet}` }]
                    })
                })

                if (claudeYanit.ok) {
                    const cData = await claudeYanit.json()
                    const t = cData.content[0].text
                    try {
                        const rData = JSON.parse(t)
                        if (rData.ad && rData.hizmet) {
                            await adminDb.collection('randevular').add({
                                esnafId,
                                musteriNumara: arayanNumara,
                                ad: rData.ad,
                                hizmet: rData.hizmet,
                                tarih: rData.tarih || Timestamp.now(),
                                durum: 'onaylandi',
                                kaynak: 'vapi_sesli_asistan',
                                olusturma: Timestamp.now()
                            })

                            // CRM Güncellemesi
                            const musteriId = `${esnafId}_${Buffer.from(arayanNumara).toString('base64').slice(0, 12)}`
                            await adminDb.collection('musteriProfiller').doc(musteriId).set({
                                esnafId,
                                numara: arayanNumara,
                                ad: rData.ad,
                                sonTemas: Timestamp.now(),
                                sonRandevu: Timestamp.now()
                            }, { merge: true })
                        }
                    } catch (e) {
                        // JSON parse edilemedi veya randevu yok
                    }
                }
            }
        }

        return NextResponse.json({ ok: true })
    } catch (error: any) {
        console.error("[Vapi Webhook Hatası]", error)
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}
