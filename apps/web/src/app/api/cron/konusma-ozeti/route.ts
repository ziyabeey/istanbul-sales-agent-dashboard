import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { telegramGonder } from '@/lib/telegram'
import { apiGuard } from '@/lib/apiGuard'
import { sabahOzetiGonder } from '@/utils/konusmaOzeti'

/**
 * Sabah Konuşma Özeti Cron
 * Schedule: 0 5 * * * (08:00 TR)
 * AI müşteri servisi olan esnafların dünkü konuşma özetini gönderir.
 */
export async function GET(request: Request) {
    const guard = await apiGuard(request, { requireCronSecret: true })
    if (!guard.ok) return guard.response

    const baslama = Date.now()
    let basarili = 0
    let hatali = 0

    try {
        const aktifEsnaflar = await adminDb
            .collection('esnaflar')
            .where('durum', '==', 'aktif')
            .where('ayarlar.aiMusteriServisi', '==', true)
            .get()

        const sonuclar = await Promise.allSettled(
            aktifEsnaflar.docs.map((d: any) => sabahOzetiGonder(d.id))
        )

        basarili = sonuclar.filter(s => s.status === 'fulfilled').length
        hatali = sonuclar.filter(s => s.status === 'rejected').length

        const sure = ((Date.now() - baslama) / 1000).toFixed(1)

        await telegramGonder(
            `<b>Konusma Ozeti Cron</b>\n` +
            `Basarili: ${basarili}\n` +
            `Hatali: ${hatali}\n` +
            `Sure: ${sure}s`
        )

        return NextResponse.json({ basarili, hatali, sure })
    } catch (error: any) {
        // console.error('[KONUSMA OZETI CRON]', error)
        await telegramGonder(`Konusma ozeti cron hatasi: ${error.message}`)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
