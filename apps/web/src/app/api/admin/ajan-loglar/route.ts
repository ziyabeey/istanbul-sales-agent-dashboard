import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { apiGuard } from '@/lib/apiGuard'

export async function GET(request: Request) {
    const guard = await apiGuard(request, { requireAdminToken: true })
    if (!guard.ok) return guard.response

    if (!adminDb) {
        return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
    }

    try {
        const snap = await adminDb
            .collection('agent_logs')
            .orderBy('zaman', 'desc')
            .limit(50)
            .get()

        const logs = snap.docs.map((doc: any) => {
            const d = doc.data()
            return {
                id: doc.id,
                ajan: d.ajan || d.agentName || 'bilinmeyen',
                esnafId: d.esnafId || null,
                tip: d.tip || d.action || d.actionType || '',
                basari: d.basari !== false,
                hata: d.hata || d.error || null,
                zaman: d.zaman?.toDate?.()?.toISOString() ?? null,
                kanal: d.kanal || null,
            }
        })

        return NextResponse.json({ logs })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
