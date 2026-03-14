import { NextResponse } from 'next/server'
import { kuyruktanAl, islemBaslat, islemTamamla, islemHata } from '@/lib/islemKuyrugu'
import { runAgent } from '@/agents/agentRunner'
import { waMesajGonder } from '@/lib/twilioClient'
import { adminDb } from '@/lib/firebaseAdmin'
import { deadLetterKaydet } from '@/lib/alertLogger'
import { islemZatenIslendi, islemKayitla } from '@/lib/idempotency'
import { apiGuard } from '@/lib/apiGuard'

/**
 * Rate-Limited Consumer Worker
 * ─────────────────────────────────────────────────────────────────────────────
 * Cron ile her 10-30 saniyede çağrılır.
 * Kuyruktan max N işlem alır ve saniyede max 5 mesaj gönderir.
 * 
 * Bu Worker, tüm cron job'ların (sabah mesajı, haftalık rapor, churn scan, vb.)
 * kuyruğa attığı görevleri TEK BİR YERden işler.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const BATCH_SIZE = 5          // Her çağrıda max işlem
const RATE_DELAY_MS = 200     // İşlemler arası bekleme (sn/5 = 200ms)

function bekle(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export async function GET(request: Request) {
    const guard = await apiGuard(request, { requireCronSecret: true })
    if (!guard.ok) return guard.response

    const baslama = Date.now()
    let islenen = 0
    let hatali = 0
    let atlanan = 0

    try {
        const islemler = await kuyruktanAl(BATCH_SIZE)

        if (islemler.length === 0) {
            return NextResponse.json({ islem: 0, mesaj: 'Kuyruk boş' })
        }

        for (const { id, data } of islemler) {
            // ── Atomik claim ────────────────────────────────────────────────
            const baslatildi = await islemBaslat(id)
            if (!baslatildi) { atlanan++; continue }

            // ── Idempotency ─────────────────────────────────────────────────
            if (await islemZatenIslendi(id, 'genel')) {
                await islemTamamla(id, 'idempotency_skip')
                atlanan++
                continue
            }

            try {
                let yanit: string = ''

                if (data.tip === 'whatsapp') {
                    // Payload'dan ajan bilgisi çıkar
                    let ajanInput: Record<string, any> = {}
                    try {
                        ajanInput = JSON.parse(data.payload.mesaj || '{}')
                    } catch {
                        ajanInput = { mesaj: data.payload.mesaj }
                    }

                    const action = ajanInput.action || 'genel'
                    const ajanAdi = action === 'sabah_mesaji' ? 'esnaf_asistani' : 'orchestrator'

                    // AI ile yanıt üret
                    const mesaj = await runAgent(ajanAdi, ajanInput, {
                        esnafId: data.esnafId || undefined,
                        tetikleyen: 'worker',
                    })

                    // Overseer kalite kontrolü (sabah mesajı için)
                    let finalMesaj = typeof mesaj === 'string' ? mesaj : JSON.stringify(mesaj)
                    if (action === 'sabah_mesaji') {
                        try {
                            const overseerSonuc = await runAgent('overseer', {
                                icerik: finalMesaj,
                                tip: 'sabah_mesaji',
                            })
                            if (typeof overseerSonuc === 'object' && overseerSonuc?.duzeltilmis) {
                                finalMesaj = overseerSonuc.duzeltilmis
                            }
                        } catch { /* Overseer hatası kritik değil */ }
                    }

                    // WhatsApp ile gönder
                    if (data.payload.telefon) {
                        await waMesajGonder(
                            data.payload.telefon,
                            finalMesaj,
                            data.esnafId || undefined,
                            'worker'
                        )
                    }

                    yanit = finalMesaj.slice(0, 1000)

                } else if (data.tip === 'instagram_dm') {
                    // Instagram DM işleme
                    const mesaj = data.payload.mesaj || ''
                    yanit = await runAgent('esnaf_asistani', {
                        mesaj,
                        esnafId: data.esnafId,
                        kanal: 'instagram',
                    }, { esnafId: data.esnafId || undefined, tetikleyen: 'worker' })

                } else {
                    yanit = `[${data.tip}] İşlem henüz desteklenmiyor`
                }

                await islemTamamla(id, yanit)
                await islemKayitla(id, 'genel', { yanit: yanit.slice(0, 500) })
                islenen++

            } catch (err: any) {
                hatali++
                console.error(`[WORKER] ❌ İşlem ${id}:`, err.message)
                await islemHata(id, err.message)

                // 3. denemede → DLQ
                if ((data.denemeSayisi || 0) >= 2) {
                    await deadLetterKaydet({
                        islem: `worker_${data.tip}`,
                        kaynak: 'cron/worker',
                        payload: { kuyrukId: id, esnafId: data.esnafId, ...data.payload },
                        hata: err.message,
                        hataSinifi: err.name || 'WorkerError',
                        denemeSayisi: (data.denemeSayisi || 0) + 1,
                        oncelik: 'yuksek',
                    })
                }
            }

            // ── Rate limiting — işlemler arası bekleme ──────────────────────
            await bekle(RATE_DELAY_MS)
        }

        const sure = ((Date.now() - baslama) / 1000).toFixed(1)

        return NextResponse.json({
            islenen,
            hatali,
            atlanan,
            toplam: islemler.length,
            sure,
            mesaj: `${islenen}/${islemler.length} işlem tamamlandı (${sure}s)`,
        })
    } catch (error: any) {
        console.error('[WORKER HATA]', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
