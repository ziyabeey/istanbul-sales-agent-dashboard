import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { fiyatOnerisiGonder } from '@/utils/dinamikFiyat'

export async function GET(req: Request) {
    const secret = req.headers.get('x-cron-secret')
    if (secret !== process.env.CRON_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const esnaflar = await adminDb.collection('esnaflar').where('aktif', '==', true).get()

        for (const d of esnaflar.docs) {
            await fiyatOnerisiGonder(d.id).catch(() => {})
        }

        return NextResponse.json({ ok: true })
    } catch (error) {
        // console.error('[CRON DINAMIK FIYAT HATA]', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
