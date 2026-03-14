import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { telegramGonder } from '@/lib/telegram'
import { apiGuard } from '@/lib/apiGuard'
import { kuyruğaEkle } from '@/lib/islemKuyrugu'
import { pushGonder } from '@/lib/pushGonder'

/**
 * Sabah Mesajı Cron — PUBLISHER (Sadece Tetikleyici)
 * ─────────────────────────────────────────────────────────────────────────────
 * ESKİ: Aktif esnafları oku → AI çalıştır → mesaj gönder (OOM riski!)
 * YENİ: Aktif esnafları oku → islem_kuyrugu'na görev yaz → 200 OK dön (2-3sn)
 *       Worker arka planda rate-limit'e uyarak işler.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export async function GET(request: Request) {
    const guard = await apiGuard(request, { requireCronSecret: true })
    if (!guard.ok) return guard.response

    const baslama = Date.now()

    try {
        // ── Aktif esnafları çek (sadece ID + minimal veri) ──────────────────
        const snapshot = await adminDb
            .collection('esnaflar')
            .where('durum', '==', 'aktif')
            .where('bildirimAyarlari.sabahMesaji', '==', true)
            .select('ad', 'sektor', 'ilce', 'waNumarasi') // Sadece gerekli alanlar
            .get()

        if (snapshot.empty) {
            return NextResponse.json({ kuyruk: 0, mesaj: 'Aktif esnaf yok' })
        }

        // ── Batch halinde kuyruğa ekle ──────────────────────────────────────
        let kuyruga = 0

        for (const doc of snapshot.docs) {
            const esnaf = doc.data()

            await kuyruğaEkle({
                tip: 'whatsapp',
                esnafId: doc.id,
                payload: {
                    telefon: esnaf.waNumarasi,
                    mesaj: JSON.stringify({
                        action: 'sabah_mesaji',
                        esnafId: doc.id,
                        esnaf: {
                            ad: esnaf.ad,
                            sektor: esnaf.sektor,
                            ilce: esnaf.ilce,
                        },
                    }),
                    sessionId: `cron_sabah_${doc.id}_${new Date().toISOString().slice(0, 10)}`,
                },
            })
            kuyruga++

            // Push notification (fire-and-forget — WA kuyruğunu bloklamaz)
            pushGonder(doc.id, {
                baslik: '☀️ Günaydın!',
                mesaj: `${esnaf.ad || 'Değerli Esnaf'}, bugünkü AI özet raporunuz hazır.`,
                url: '/dashboard',
            }).catch(() => { /* push hatası cron'u durdurmaz */ })
        }

        const sure = ((Date.now() - baslama) / 1000).toFixed(1)

        await telegramGonder(
            `🌅 <b>Sabah Cron (Publisher)</b>\n` +
            `📋 Kuyruğa eklenen: ${kuyruga}\n` +
            `⏱ Süre: ${sure}s\n` +
            `💡 Worker işleyecek`
        )

        return NextResponse.json({
            kuyruk: kuyruga,
            sure,
            mesaj: `${kuyruga} esnaf kuyruğa eklendi — Worker işleyecek`,
        })
    } catch (error: any) {
        console.error('[SABAH CRON PUBLISHER HATA]', error)
        await telegramGonder(`🔴 Sabah Publisher hatası: ${error.message}`)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
