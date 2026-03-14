import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { kampanyaMotorCalistir } from '@/utils/kampanyaMotoru'
import { telegramGonder } from '@/lib/telegram'

export async function GET(req: Request) {
    if (req.headers.get('x-cron-secret') !== process.env.CRON_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const aktifEsnaflar = await adminDb
        .collection('esnaflar')
        .where('durum', '==', 'aktif')
        .where('ayarlar.aiMusteriServisi', '==', true)
        .get()

    const sonuclar = await Promise.allSettled(
        aktifEsnaflar.docs.map((d: any) => kampanyaMotorCalistir(d.id))
    )

    const toplamGonderilen = sonuclar
        .filter((s): s is PromiseFulfilledResult<any> => s.status === 'fulfilled')
        .reduce((sum, s) => sum + s.value.gonderilen, 0)

    if (toplamGonderilen > 0) {
        await telegramGonder(
            `📢 Kampanya Motoru\n` +
            `${aktifEsnaflar.size} esnaf tarandı\n` +
            `${toplamGonderilen} kişiselleştirilmiş mesaj gönderildi`
        )
    }

    return NextResponse.json({ toplamGonderilen, esnafSayisi: aktifEsnaflar.size })
}
