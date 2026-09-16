import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { apiGuard } from '@/lib/apiGuard'
import { telegramGonder } from '@/lib/telegram'
import {
    assertNoActiveImpersonationForRestrictedAction,
    ImpersonationRestrictedActionError,
} from '@/lib/impersonation'
import {
    AdminAuditPersistenceError,
    runAuditedAdminMutation,
} from '@/lib/security/auditLogger'

const IZIN_VERILEN_ALANLAR = [
    'durum', 'paket', 'aktifModuller', 'aktifWebModulleri',
    'ayarlar', 'twilioNumarasi', 'notlar',
]

function mutationError(error: unknown): NextResponse {
    if (error instanceof ImpersonationRestrictedActionError) {
        return NextResponse.json({ error: error.message }, { status: 403 })
    }
    if (error instanceof AdminAuditPersistenceError) {
        return NextResponse.json({ error: 'Admin audit unavailable' }, { status: 503 })
    }
    const message = error instanceof Error ? error.message : 'Sunucu hatası'
    return NextResponse.json({ error: message }, { status: 500 })
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const guard = await apiGuard(request, { requireAdminSession: true })
    if (!guard.ok) return guard.response
    if (!guard.adminSession) return NextResponse.json({ error: 'Admin authority unavailable' }, { status: 503 })
    if (!adminDb) return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })

    try {
        const { id } = await params
        const body = await request.json()
        const guncellemeler: Record<string, unknown> = { adminGuncelleme: Timestamp.now() }
        for (const alan of IZIN_VERILEN_ALANLAR) {
            if (alan in body) guncellemeler[alan] = body[alan]
        }
        if (Object.keys(guncellemeler).length <= 1) {
            return NextResponse.json({ error: 'Güncellenecek alan bulunamadı' }, { status: 400 })
        }

        const docRef = adminDb.collection('esnaflar').doc(id)
        const oncekiDoc = await docRef.get()
        if (!oncekiDoc.exists) return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })
        const onceki = oncekiDoc.data()!

        await runAuditedAdminMutation(
            {
                actorAdminId: guard.adminSession.principalId,
                targetType: 'business',
                targetId: id,
                action: 'ESNAF_UPDATED',
                metadata: { fields: Object.keys(guncellemeler).filter((key) => key !== 'adminGuncelleme') },
            },
            request,
            async () => {
                await assertNoActiveImpersonationForRestrictedAction(request)
                await docRef.update(guncellemeler)
                if (body.durum && body.durum !== onceki.durum) {
                    telegramGonder(`🔄 <b>Durum Değişti</b>\n${onceki.isletmeAdiTam || onceki.ad}\n${onceki.durum} → ${body.durum}\nID: <code>${id}</code>`).catch(() => {})
                }
                if (body.paket && body.paket !== onceki.paket) {
                    telegramGonder(`📦 <b>Paket Değişti (Admin)</b>\n${onceki.isletmeAdiTam || onceki.ad}\n${onceki.paket} → ${body.paket}\nID: <code>${id}</code>`).catch(() => {})
                }
            }
        )
        return NextResponse.json({ ok: true })
    } catch (error) {
        return mutationError(error)
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const guard = await apiGuard(request, { requireAdminSession: true })
    if (!guard.ok) return guard.response
    if (!guard.adminSession) return NextResponse.json({ error: 'Admin authority unavailable' }, { status: 503 })
    if (!adminDb) return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })

    try {
        const { id } = await params
        const docRef = adminDb.collection('esnaflar').doc(id)
        const snap = await docRef.get()
        if (!snap.exists) return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })
        const data = snap.data()!

        await runAuditedAdminMutation(
            {
                actorAdminId: guard.adminSession.principalId,
                targetType: 'business',
                targetId: id,
                action: 'ESNAF_DELETED',
            },
            request,
            async () => {
                await assertNoActiveImpersonationForRestrictedAction(request)
                await docRef.delete()
                telegramGonder(`🗑️ <b>Esnaf Silindi (Admin)</b>\n${data.isletmeAdiTam || data.ad || 'İsimsiz'}\nPaket: ${data.paket || '—'} | Durum: ${data.durum || '—'}\nID: <code>${id}</code>`).catch(() => {})
            }
        )
        return NextResponse.json({ ok: true })
    } catch (error) {
        return mutationError(error)
    }
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const guard = await apiGuard(request, { requireAdminSession: true })
    if (!guard.ok) return guard.response
    if (!adminDb) return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })

    try {
        const { id } = await params
        const doc = await adminDb.collection('esnaflar').doc(id).get()
        if (!doc.exists) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 })
        return NextResponse.json({ esnaf: { id: doc.id, ...doc.data() } })
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Sunucu hatası'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
