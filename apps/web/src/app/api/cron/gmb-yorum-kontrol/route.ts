import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { googleYorumYanitla } from '@/lib/gmbClient'

export async function GET(req: Request) {
    const secret = req.headers.get('x-cron-secret')
    if (secret !== process.env.CRON_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        // Tüm aktif esnafların yanıt bekleyen Google yorumlarını çek (MOCK QUERY)
        // Gerçekte: Google Business Profile Account Management API ile liste çekilir.

        // Test amaçlı db'den alıyoruz
        const bekleyenYorumlar = await adminDb
            .collection('gmbYorumlari')
            .where('durum', '==', 'bekliyor')
            .get()

        for (const doc of bekleyenYorumlar.docs) {
            const data = doc.data()
            await googleYorumYanitla(data.esnafId, doc.id, data.yorumMetni, data.yildiz)
                .catch(() => {})
        }

        return NextResponse.json({ ok: true, islenen: bekleyenYorumlar.size })
    } catch (error) {
        // console.error('[CRON GMB KONTROL HATA]', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
