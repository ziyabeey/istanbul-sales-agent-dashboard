import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { runAgent } from '@/agents/agentRunner'
import { telegramGonder } from '@/lib/telegram'
import { apiGuard } from '@/lib/apiGuard'

/**
 * GET /api/cron/churn-scan
 * Tüm aktif esnafları tarar, churn_detective ajanını çalıştırır.
 * Yüksek riskli esnaflar Firestore'da işaretlenir + Telegram alarmı.
 * Cloud Scheduler: 0 7 * * 1  (Her Pazartesi 10:00 TR)
 */
export async function GET(request: Request) {
    const guard = await apiGuard(request, { requireCronSecret: true })
    if (!guard.ok) return guard.response

    if (!adminDb) {
        return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
    }

    const baslama = Date.now()
    const riskliEsnaflar: { id: string; ad: string; skor: number; aksiyon: string }[] = []
    let toplam = 0

    try {
        const snap = await adminDb
            .collection('esnaflar')
            .where('durum', '==', 'aktif')
            .get()

        toplam = snap.size

        for (const doc of snap.docs) {
            const esnaf = doc.data()
            const esnafId = doc.id

            try {
                // Son aktivite metrikleri topla
                const [mesajSnap, yorumSnap] = await Promise.all([
                    adminDb.collection('agent_logs')
                        .where('esnafId', '==', esnafId)
                        .where('kanal', '==', 'whatsapp')
                        .get(),
                    adminDb.collection('yorumlar')
                        .where('esnafId', '==', esnafId)
                        .where('yanitDurumu', '==', 'bekliyor')
                        .get(),
                ])

                const sonYediGunMesaj = mesajSnap.docs.filter((d: any) => {
                    const zaman = d.data().zaman?.toDate?.()
                    return zaman && (Date.now() - zaman.getTime()) < 7 * 24 * 60 * 60 * 1000
                }).length

                const metriks = {
                    sonYediGunMesaj,
                    bekleyenYorumSayisi: yorumSnap.size,
                    churnSkoru: esnaf.churnSkoru || 0,
                    paket: esnaf.paket,
                }

                // churn_detective ajanını çalıştır
                const analiz = await runAgent('churn_detective', {
                    esnafId,
                    esnaf: {
                        ad: esnaf.ad,
                        sektor: esnaf.sektor,
                        paket: esnaf.paket,
                    },
                    metriks,
                })

                const yeniSkor = analiz?.score ?? metriks.churnSkoru
                const aksiyon = analiz?.action ?? 'izle'

                // Firestore'u güncelle
                await adminDb.collection('esnaflar').doc(esnafId).update({
                    churnSkoru: yeniSkor,
                    sonChurnTarama: new Date(),
                })

                if (yeniSkor > 65) {
                    riskliEsnaflar.push({
                        id: esnafId,
                        ad: esnaf.ad || esnaf.isletmeAdiTam,
                        skor: yeniSkor,
                        aksiyon,
                    })
                }
            } catch (e: any) {
                console.error(`[CHURN SCAN] ${esnafId} hata:`, e.message)
            }
        }

        // Telegram raporu
        if (riskliEsnaflar.length > 0) {
            const liste = riskliEsnaflar
                .sort((a, b) => b.skor - a.skor)
                .slice(0, 10)
                .map(e => `• <b>${e.ad}</b> — Skor: ${e.skor} | ${e.aksiyon}`)
                .join('\n')

            await telegramGonder(
                `🚨 <b>Churn Tarama Raporu</b>\n` +
                `Taranan: ${toplam} esnaf\n` +
                `Risk altında: ${riskliEsnaflar.length} esnaf\n\n` +
                `<b>En Riskli 10:</b>\n${liste}\n\n` +
                `Süre: ${((Date.now() - baslama) / 1000).toFixed(1)}s`
            ).catch(console.error)
        }

        return NextResponse.json({
            ok: true,
            toplam,
            riskli: riskliEsnaflar.length,
            sure_ms: Date.now() - baslama,
        })
    } catch (error: any) {
        console.error('[CHURN SCAN CRON]', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
