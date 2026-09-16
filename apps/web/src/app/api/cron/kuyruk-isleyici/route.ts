import { NextResponse } from 'next/server'
import {
    islemClaimEt,
    islemHata,
    islemHeartbeat,
    islemTamamla,
    kuyruktanAl,
    suresiDolanLeaseKurtar,
} from '@/lib/islemKuyrugu'
import { runAdkOrchestrator } from '@/agents/OrchestratorAgent'
import { waMesajGonder } from '@/lib/twilioClient'
import { urlToBase64 } from '@/utils/medyaOkuyucu'
import { gorselAnalizVeTeklif } from '@/lib/visionZeka'
import { adminDb } from '@/lib/firebaseAdmin'
import { apiGuard } from '@/lib/apiGuard'
import { SERVICE_AUDIENCES, SERVICE_SCOPES } from '@/lib/serviceAuth'

async function processQueue(req: Request) {
    const guard = await apiGuard(req, {
        requireServicePrincipal: {
            audience: SERVICE_AUDIENCES.queueProcessor,
            scopes: [SERVICE_SCOPES.queueProcess],
            allowedSubjects: ['cloud-tasks', 'cloud-scheduler'],
        },
    })
    if (!guard.ok) return guard.response

    try {
        const recoveredLeases = await suresiDolanLeaseKurtar()
        const islemler = await kuyruktanAl(3)

        if (islemler.length === 0) {
            return NextResponse.json({
                islem: 0,
                recoveredLeases,
                mesaj: 'Kuyruk boş',
            })
        }

        let islenen = 0

        for (const { id, data } of islemler) {
            const lease = await islemClaimEt(id)
            if (!lease) continue

            try {
                let yanit: string

                if (data.tip === 'whatsapp') {
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
                                    esnafHizmetVeFiyatlari: esnaf.istatistik?.fiyatListesi || '',
                                })
                                if (analiz) {
                                    extraContext += `\n[SİSTEM BİLGİSİ: GÖRSEL ANALİZİ: "${analiz.tespit}". TEKLİF: ${analiz.teklifTutari ? analiz.teklifTutari + ' TL' : 'Bilinmiyor'}. TASLAK: "${analiz.aiYanitTaslagi}"]`
                                }
                            }
                        }
                    }

                    const leaseAlive = await islemHeartbeat(id, lease.leaseToken)
                    if (!leaseAlive) throw new Error('worker_lease_lost')

                    yanit = await runAdkOrchestrator(
                        data.payload.sessionId || `wa_worker_${id}`,
                        `${extraContext}Mesaj: "${data.payload.mesaj}"`
                    )

                    if (data.payload.telefon) {
                        await waMesajGonder(data.payload.telefon, yanit)
                    }
                } else {
                    yanit = `Desteklenmeyen işlem tipi: ${data.tip}`
                }

                await islemTamamla(id, yanit, lease.leaseToken)
                islenen++
            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
                await islemHata(id, message, lease.leaseToken)
            }
        }

        return NextResponse.json({
            islem: islenen,
            recoveredLeases,
            mesaj: `${islenen} işlem tamamlandı`,
        })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}

export async function GET(req: Request) {
    return processQueue(req)
}

export async function POST(req: Request) {
    return processQueue(req)
}
