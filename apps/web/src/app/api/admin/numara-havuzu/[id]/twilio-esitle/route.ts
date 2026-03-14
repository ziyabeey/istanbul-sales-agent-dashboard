import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { apiGuard } from '@/lib/apiGuard'

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const guard = await apiGuard(request, { requireAdminToken: true })
    if (!guard.ok) return guard.response

    if (!adminDb) {
        return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
    }

    try {
        const { id } = await params
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://kepenk.ai'

        await adminDb.collection('numeraHavuzu').doc(id).update({
            twilioWebhook: `${appUrl}/api/whatsapp`,
        })

        return NextResponse.json({ ok: true })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
