import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const esnafId = searchParams.get('esnafId')
        const limitStr = searchParams.get('limit') || '5'

        if (!esnafId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const q = await adminDb
            .collection('agent_logs')
            .where('esnafId', '==', esnafId)
            .orderBy('zaman', 'desc')
            .limit(parseInt(limitStr))
            .get()

        const logs = q.docs.map((d: any) => ({
            id: d.id,
            ...d.data(),
            zaman: d.data().zaman?.toMillis()
        }))

        return NextResponse.json({ logs })
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
