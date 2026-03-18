import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const esnafId = searchParams.get('esnafId')

        if (!esnafId) {
            return NextResponse.json({ error: 'Esnaf ID gerekli' }, { status: 400 })
        }

        const reklamRef = await adminDb
            .collection('reklamlar')
            .where('esnafId', '==', esnafId)
            .orderBy('baslangic', 'desc')
            .limit(10)
            .get()

        const reklamlar = reklamRef.docs.map((d: any) => ({ id: d.id, ...d.data() }))

        return NextResponse.json(reklamlar)
    } catch (error) {
        // console.error('[REKLAMLAR API HATA]', error)
        return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
    }
}
