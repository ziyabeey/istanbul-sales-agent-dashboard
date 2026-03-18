import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { telegramGonder } from '@/lib/telegram'
import { waMesajGonder, esnafHitap } from '@/lib/twilioClient'
import { apiGuard } from '@/lib/apiGuard'
import { buHaftaSezonlar } from '@/data/sezonlar'

/**
 * Sezon Uyarıları Cron
 * Schedule: 0 7 * * * (10:00 TR)
 * 2 hafta öncesinden ilgili sektörlere sezon uyarısı gönderir.
 */

async function sezonUyariGonder(esnafId: string, sektor: string): Promise<boolean> {
    const aktifSezonlar = buHaftaSezonlar(sektor)
    if (aktifSezonlar.length === 0) return false

    const esnaf = (await adminDb.collection('esnaflar').doc(esnafId).get()).data()!

    const sezonListesi = aktifSezonlar
        .map(s => `${s.ad} (${s.oncelikSeviye === 3 ? 'COK ONEMLI' : 'ONEMLI'})\n${s.icerikNotu}`)
        .join('\n\n')

    await waMesajGonder(
        esnaf.waNumarasi,
        `*Sezon Uyarisi* — ${esnafHitap(esnaf)}\n\n` +
        `Yaklasan etkinlikler sizin sektorunuzu etkiliyor:\n\n` +
        sezonListesi + '\n\n' +
        `Iceriklerinizi buna gore hazirliyoruz. Ozel bir kampanya planlamak ister misiniz?`,
        esnafId,
        'sezon_uyari'
    )
    return true
}

export async function GET(request: Request) {
    const guard = await apiGuard(request, { requireCronSecret: true })
    if (!guard.ok) return guard.response

    const baslama = Date.now()

    try {
        const aktifEsnaflar = await adminDb
            .collection('esnaflar')
            .where('durum', '==', 'aktif')
            .get()

        let gonderilen = 0

        const sonuclar = await Promise.allSettled(
            aktifEsnaflar.docs.map(async (d: any) => {
                const sent = await sezonUyariGonder(d.id, d.data().sektor)
                if (sent) gonderilen++
            })
        )

        const hatali = sonuclar.filter(s => s.status === 'rejected').length
        const sure = ((Date.now() - baslama) / 1000).toFixed(1)

        if (gonderilen > 0) {
            await telegramGonder(
                `<b>Sezon Uyari Cron</b>\n` +
                `Gonderilen: ${gonderilen} | Hatali: ${hatali}\n` +
                `Sure: ${sure}s`
            )
        }

        return NextResponse.json({ gonderilen, hatali, sure })
    } catch (error: any) {
        // console.error('[SEZON UYARI CRON]', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
