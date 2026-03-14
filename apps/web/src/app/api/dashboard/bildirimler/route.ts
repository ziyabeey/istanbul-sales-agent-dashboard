import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const esnafId = searchParams.get('esnafId')

    if (!esnafId) return NextResponse.json({ error: 'esnafId required' }, { status: 400 })

    try {
        const snapshot = await adminDb
            .collection('esnafBildirimleri')
            .where('esnafId', '==', esnafId)
            .where('okundu', '==', false)
            .orderBy('zaman', 'desc')
            .limit(10)
            .get()

        const bildirimler = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))

        return NextResponse.json({ bildirimler })
    } catch (err) {
        return NextResponse.json({ error: 'DB Fetch Error' }, { status: 500 })
    }
}
