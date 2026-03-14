import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const esnafId = searchParams.get('esnafId')
    const platform = searchParams.get('platform') || 'instagram'

    if (!esnafId) {
        return NextResponse.json({ error: 'esnafId gerekli' }, { status: 400 })
    }

    try {
        const snap = await adminDb
            .collection('icerikler')
            .where('esnafId', '==', esnafId)
            .where('platform', '==', platform)
            .orderBy('olusturmaTarihi', 'desc')
            .limit(7)
            .get()

        return NextResponse.json(snap.docs.map((d: any) => ({ id: d.id, ...d.data() })))
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
