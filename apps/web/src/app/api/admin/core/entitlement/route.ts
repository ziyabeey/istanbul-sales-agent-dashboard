import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'
import { apiGuard } from '@/lib/apiGuard'
import { adminDb } from '@/lib/firebaseAdmin'
import { resolveLinkedBusinessId } from '@/lib/core/billingStore'
import { coreIdempotencyKey } from '@/lib/core/coreClient'
import { getCoreRuntime } from '@/lib/core/deps'
import { CorePlatformError } from '@/lib/core/errors'
import { readJsonBody } from '@/lib/core/routeHelpers'
import {
    assertNoActiveImpersonationForRestrictedAction,
    ImpersonationRestrictedActionError,
} from '@/lib/impersonation'
import {
    AdminAuditPersistenceError,
    runAuditedAdminMutation,
} from '@/lib/security/auditLogger'

/**
 * KC-05: admin tools change commercial state through Core commands, never by
 * patching Firestore. Durable AdminSession + audited mutation; the tenant's
 * Core business comes from the KC-03/KC-05 shadow field; idempotency is per
 * admin intent (client-supplied key or the audit case id).
 */
const KEY_RE = /^[a-z0-9]+(?:_[a-z0-9]+)*$/

function mutationError(error: unknown): NextResponse {
    if (error instanceof ImpersonationRestrictedActionError) {
        return NextResponse.json({ error: error.message }, { status: 403 })
    }
    if (error instanceof AdminAuditPersistenceError) {
        return NextResponse.json({ error: 'Admin audit unavailable' }, { status: 503 })
    }
    if (error instanceof CorePlatformError) {
        const status = error.code === 'CORE_UNAVAILABLE' ? 503 : error.code === 'PLATFORM_IDEMPOTENCY_CONFLICT' ? 409 : 400
        return NextResponse.json({ error: error.code }, { status })
    }
    const message = error instanceof Error ? error.message : 'Sunucu hatası'
    return NextResponse.json({ error: message }, { status: 500 })
}

export async function POST(request: Request) {
    const guard = await apiGuard(request, { requireAdminSession: true })
    if (!guard.ok) return guard.response
    if (!guard.adminSession) return NextResponse.json({ error: 'Admin authority unavailable' }, { status: 503 })
    const runtime = getCoreRuntime()
    if (!runtime || !adminDb) return NextResponse.json({ error: 'CORE_UNAVAILABLE' }, { status: 503 })
    const db = adminDb

    const body = await readJsonBody(request)
    const esnafId = String(body.esnafId ?? '').trim()
    const action = body.action === 'grant' || body.action === 'revoke' ? body.action : null
    const entitlementKey = String(body.entitlementKey ?? '').trim().toLowerCase()
    const limitValue = body.limitValue === undefined || body.limitValue === null ? null : Number(body.limitValue)
    const validUntil = typeof body.validUntil === 'string' && body.validUntil ? body.validUntil : null
    const intentKey = typeof body.idempotencyKey === 'string' && body.idempotencyKey.trim() ? body.idempotencyKey.trim() : randomUUID()

    if (!esnafId || !action || !KEY_RE.test(entitlementKey) || entitlementKey.length > 64) {
        return NextResponse.json({ error: 'esnafId, action (grant|revoke) ve entitlementKey gerekli' }, { status: 400 })
    }
    if (limitValue !== null && (!Number.isInteger(limitValue) || limitValue < 0)) {
        return NextResponse.json({ error: 'limitValue negatif olamaz' }, { status: 400 })
    }

    const businessId = await resolveLinkedBusinessId(db, esnafId)
    if (!businessId) {
        return NextResponse.json({ error: 'BUSINESS_NOT_LINKED', hint: 'KC-03 backfill or onboarding must link the tenant first' }, { status: 409 })
    }

    try {
        const result = await runAuditedAdminMutation(
            {
                actorAdminId: guard.adminSession.principalId,
                targetType: 'business',
                targetId: esnafId,
                action: 'ESNAF_UPDATED',
                metadata: { coreCommand: action === 'grant' ? 'GrantEntitlement' : 'RevokeEntitlement', entitlementKey, businessId },
            },
            request,
            async () => {
                await assertNoActiveImpersonationForRestrictedAction(request)
                return runtime.client.applyCommand({
                    idempotencyKey: coreIdempotencyKey('kc05-admin-entitlement', esnafId, action, entitlementKey, intentKey),
                    command: action === 'grant' ? 'GrantEntitlement' : 'RevokeEntitlement',
                    payload: {
                        business_id: businessId,
                        entitlement_key: entitlementKey,
                        ...(action === 'grant' ? { limit_value: limitValue, valid_until: validUntil } : {}),
                    },
                })
            }
        )
        return NextResponse.json({ ok: true, businessId, result })
    } catch (error) {
        return mutationError(error)
    }
}
