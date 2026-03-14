import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'

export async function POST(request: Request) {
    const { esnafId, skor, hafta } = await request.json()
    if (!esnafId || !skor) {
        return NextResponse.json({ error: 'Eksik veri' }, { status: 400 })
    }
    await adminDb.collection('ciro_anket').add({
        esnafId, skor, hafta,
        zaman: Timestamp.now(),
    })
    return NextResponse.json({ ok: true })
}
