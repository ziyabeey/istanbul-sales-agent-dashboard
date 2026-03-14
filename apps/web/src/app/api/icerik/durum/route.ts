import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'

export async function PATCH(request: Request) {
    try {
        const { icerikId, durum } = await request.json()
        if (!icerikId || !durum) {
            return NextResponse.json({ error: 'icerikId ve durum gerekli' }, { status: 400 })
        }
        await adminDb.collection('icerikler').doc(icerikId).update({ durum })
        return NextResponse.json({ ok: true })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
