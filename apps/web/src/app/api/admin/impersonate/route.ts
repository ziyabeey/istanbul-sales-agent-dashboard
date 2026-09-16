import { NextResponse } from 'next/server'
import { apiGuard } from '@/lib/apiGuard'
import {
    endImpersonationSessionToken,
    getActiveImpersonationFromRequest,
    impersonateBaslat,
    impersonateBitir,
    readImpersonationSessionToken,
} from '@/lib/impersonation'
import { adminDb } from '@/lib/firebaseAdmin'
import {
    AdminAuditPersistenceError,
    runAuditedAdminMutation,
} from '@/lib/security/auditLogger'

function serverError(error: unknown): NextResponse {
    if (error instanceof AdminAuditPersistenceError) {
        return NextResponse.json({ error: 'Admin audit unavailable' }, { status: 503 })
    }
    const message = error instanceof Error ? error.message : 'Sunucu hatası'
    return NextResponse.json({ error: message }, { status: 500 })
}

export async function GET(request: Request) {
    const guard = await apiGuard(request, { requireAdminSession: true })
    if (!guard.ok) return guard.response

    try {
        const session = await getActiveImpersonationFromRequest(request)
        if (!session) return NextResponse.json({ active: false })
        if (session.adminId !== guard.adminSession?.principalId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }
        return NextResponse.json({
            active: true,
            actingAdminId: session.adminId,
            actingAsTargetId: session.subject.id,
            subjectLabel: session.subject.label,
            reason: session.reason,
            expiresAt: session.expiresAt,
        })
    } catch {
        return NextResponse.json({ error: 'Impersonation authority unavailable' }, { status: 503 })
    }
}

export async function POST(request: Request) {
    const guard = await apiGuard(request, { requireAdminSession: true })
    if (!guard.ok) return guard.response
    if (!guard.adminSession || !adminDb) {
        return NextResponse.json({ error: 'Admin authority unavailable' }, { status: 503 })
    }

    try {
        const body = await request.json() as { esnafId?: unknown; reason?: unknown }
        const esnafId = typeof body.esnafId === 'string' ? body.esnafId.trim() : ''
        const reason = typeof body.reason === 'string' ? body.reason.trim() : ''
        if (!esnafId) return NextResponse.json({ error: 'esnafId zorunlu' }, { status: 400 })
        if (!reason) return NextResponse.json({ error: 'reason zorunlu' }, { status: 400 })
        if (reason.length > 500) return NextResponse.json({ error: 'reason çok uzun' }, { status: 400 })

        const doc = await adminDb.collection('esnaflar').doc(esnafId).get()
        if (!doc.exists) return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })

        const esnaf = doc.data() || {}
        const subjectLabel = String(esnaf.isletmeAdiTam || esnaf.ad || 'Esnaf')
        const adminId = guard.adminSession.principalId
        const response = NextResponse.json({
            ok: true,
            mesaj: `${subjectLabel} hesabına geçiş yapıldı`,
            redirect: '/dashboard',
        })

        return await runAuditedAdminMutation(
            {
                actorAdminId: adminId,
                actingAsTargetId: esnafId,
                targetType: 'impersonation',
                targetId: esnafId,
                action: 'IMPERSONATION_STARTED',
                metadata: { reason },
            },
            request,
            () => impersonateBaslat(adminId, esnafId, subjectLabel, reason, response)
        )
    } catch (error) {
        return serverError(error)
    }
}

export async function DELETE(request: Request) {
    const guard = await apiGuard(request, { requireAdminSession: true })
    if (!guard.ok) return guard.response
    if (!guard.adminSession) {
        return NextResponse.json({ error: 'Admin authority unavailable' }, { status: 503 })
    }

    try {
        const token = readImpersonationSessionToken(request)
        const session = token ? await getActiveImpersonationFromRequest(request) : null
        if (!token || !session) {
            return impersonateBitir(NextResponse.json({ ok: true, active: false }))
        }
        if (session.adminId !== guard.adminSession.principalId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const response = NextResponse.json({
            ok: true,
            mesaj: 'Admin hesabına geri dönüldü',
            redirect: '/admin/esnaflar',
        })

        return await runAuditedAdminMutation(
            {
                actorAdminId: session.adminId,
                actingAsTargetId: session.subject.id,
                targetType: 'impersonation',
                targetId: session.subject.id,
                action: 'IMPERSONATION_ENDED',
                metadata: { reason: session.reason },
            },
            request,
            async () => {
                const ended = await endImpersonationSessionToken(token)
                if (!ended) throw new Error('Impersonation session could not be ended')
                return impersonateBitir(response)
            }
        )
    } catch (error) {
        return serverError(error)
    }
}
