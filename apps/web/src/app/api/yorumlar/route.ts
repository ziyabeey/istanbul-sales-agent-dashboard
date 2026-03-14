import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const esnafId = searchParams.get('esnafId')

    if (!esnafId) {
        return NextResponse.json([], { status: 400 })
    }

    try {
        const snap = await adminDb
            .collection('yorumlar')
            .where('esnafId', '==', esnafId)
            .get()

        const yorumlar = snap.docs
            .map((d: any) => ({ id: d.id, ...d.data() }))
            .sort((a: any, b: any) => {
                const dateA = a.tarih?.toDate() || new Date(0)
                const dateB = b.tarih?.toDate() || new Date(0)
                return dateB.getTime() - dateA.getTime()
            })
            .slice(0, 20)

        return NextResponse.json(yorumlar)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
