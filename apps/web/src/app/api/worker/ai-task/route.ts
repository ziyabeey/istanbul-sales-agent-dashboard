import { NextResponse } from 'next/server'
import { gcpGuard } from '@/lib/gcpAuthGuard'
import { runAgent } from '@/agents/agentRunner'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { waMesajGonder } from '@/lib/twilioClient'
import { deadLetterKaydet } from '@/lib/alertLogger'

/**
 * Worker API — Cloud Tasks Async Handler
 * ─────────────────────────────────────────────────────────────────────────────
 * Cloud Tasks bu endpoint'e POST atar. Görev başarısız olursa
 * 500 döndüğünde Cloud Tasks otomatik exponential backoff ile retry yapar.
 * 
 * 200 → Görev başarılı (tekrar deneme YOK)
 * 500 → Görev başarısız (Cloud Tasks retry yapacak)
 * 429 → Rate limit (Cloud Tasks daha sonra deneyecek)
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── Görev tipleri ──────────────────────────────────────────────────────────
type GorevTipi =
    | 'site_uretimi'
    | 'sabah_mesaji'
    | 'whatsapp_yanit'
    | 'toplu_mesaj'
    | 'churn_scan'
    | 'haftalik_rapor'
    | 'kvkk_temizleme'
    | 'genel'

interface GorevPayload {
    tip: GorevTipi
    esnafId?: string
    data: Record<string, any>
}

export async function POST(request: Request) {
    // ── GCP OIDC + Fallback auth ────────────────────────────────────────────
    const guard = await gcpGuard(request)
    if (!guard.ok) return guard.response

    const baslama = Date.now()

    try {
        const body: GorevPayload = await request.json()
        const { tip, esnafId, data } = body

        // console.log(`[WORKER] 🔄 Görev başlatıldı: ${tip} | esnaf: ${esnafId || 'N/A'}`)

        let sonuc: any

        switch (tip) {
            case 'site_uretimi':
                sonuc = await runAgent('the_creator', {
                    action: 'site_uret',
                    esnafId,
                    ...data,
                }, { esnafId, tetikleyen: 'cloud_tasks' })
                break

            case 'sabah_mesaji':
                sonuc = await runAgent('esnaf_asistani', {
                    action: 'sabah_mesaji',
                    esnafId,
                    ...data,
                }, { esnafId, tetikleyen: 'cloud_tasks' })

                // Overseer kalite kontrolü
                try {
                    const overseer = await runAgent('overseer', {
                        icerik: typeof sonuc === 'string' ? sonuc : JSON.stringify(sonuc),
                        tip: 'sabah_mesaji',
                    })
                    if (typeof overseer === 'object' && overseer?.duzeltilmis) {
                        sonuc = overseer.duzeltilmis
                    }
                } catch { /* Overseer hatası kritik değil */ }

                // WhatsApp gönder
                if (data.telefon && sonuc) {
                    await waMesajGonder(
                        data.telefon,
                        typeof sonuc === 'string' ? sonuc : JSON.stringify(sonuc),
                        esnafId,
                        'cloud_tasks'
                    )
                }
                break

            case 'whatsapp_yanit':
                sonuc = await runAgent('orchestrator', {
                    mesaj: data.mesaj,
                    esnafId,
                }, { esnafId, tetikleyen: 'cloud_tasks' })

                if (data.telefon && sonuc) {
                    await waMesajGonder(
                        data.telefon,
                        typeof sonuc === 'string' ? sonuc : JSON.stringify(sonuc),
                        esnafId,
                        'cloud_tasks'
                    )
                }
                break

            case 'churn_scan':
                sonuc = await runAgent('churn_detective', {
                    action: 'scan',
                    esnafId,
                    ...data,
                }, { esnafId, tetikleyen: 'cloud_tasks' })
                break

            case 'haftalik_rapor':
                sonuc = await runAgent('the_creator', {
                    action: 'haftalik_rapor',
                    esnafId,
                    ...data,
                }, { esnafId, tetikleyen: 'cloud_tasks' })
                break

            default:
                sonuc = await runAgent('esnaf_asistani', {
                    ...data,
                    esnafId,
                }, { esnafId, tetikleyen: 'cloud_tasks' })
        }

        const sure = ((Date.now() - baslama) / 1000).toFixed(1)

        // ── Başarı logu ─────────────────────────────────────────────────────
        await adminDb.collection('agent_logs').add({
            ajan: 'cloud_tasks_worker',
            tip,
            esnafId: esnafId || null,
            input: data,
            output: typeof sonuc === 'string' ? sonuc.slice(0, 2000) : JSON.stringify(sonuc).slice(0, 2000),
            basari: true,
            hata: null,
            zaman: new Date(),
            kanal: 'cloud_tasks',
            sure: `${sure}s`,
        })

        // ── 200 OK → Cloud Tasks retry YAPMAZ ──────────────────────────────
        return NextResponse.json({
            ok: true,
            tip,
            sure,
        })
    } catch (error: any) {
        const sure = ((Date.now() - baslama) / 1000).toFixed(1)
        // console.error(`[WORKER] ❌ Görev hata (${sure}s):`, error.message)

        // Hata logu
        try {
            const body = await request.clone().json().catch(() => ({}))
            await adminDb.collection('agent_logs').add({
                ajan: 'cloud_tasks_worker',
                tip: (body as any).tip || 'bilinmiyor',
                esnafId: (body as any).esnafId || null,
                input: (body as any).data || null,
                output: null,
                basari: false,
                hata: error.message,
                zaman: new Date(),
                kanal: 'cloud_tasks',
                sure: `${sure}s`,
            })
        } catch { /* log hatası kritik değil */ }

        // ── 500 → Cloud Tasks otomatik retry yapacak ────────────────────────
        return NextResponse.json(
            { error: error.message, retry: true },
            { status: 500 }
        )
    }
}
