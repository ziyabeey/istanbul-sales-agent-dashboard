import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const esnafId = searchParams.get('esnafId')

        if (!esnafId) {
            return NextResponse.json({ error: 'Esnaf ID gerekli' }, { status: 400 })
        }

        const doc = await adminDb.collection('buyumeSkorlari').doc(esnafId).get()

        if (!doc.exists) {
            return NextResponse.json({ skor: 0, rozetler: [], randevuBuyume: 0, yeniMusteri: 0 })
        }

        return NextResponse.json(doc.data())
    } catch (error) {
        console.error('[BUYUME SKORU API HATA]', error)
        return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
    }
}
