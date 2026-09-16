import { NextResponse } from 'next/server'
import { requireCoreContext } from '@/lib/core/requestContext'
import { requireCoreRuntime } from '@/lib/core/routeHelpers'
import { CorePlatformError } from '@/lib/core/errors'

/**
 * KC-02: who am I, in Core terms. Entitlements come from the KC-01 snapshot
 * RPC with the user's own JWT; a recovery-class session only learns that it
 * must update its password.
 */
export async function GET(request: Request) {
  const gate = requireCoreRuntime()
  if (!gate.ok) return gate.response
  const { runtime } = gate

  const resolved = await requireCoreContext(request, runtime, { csrf: false, allowRecovery: true })
  if (!resolved.ok) return resolved.response
  const { context } = resolved

  if (context.recovery) {
    return NextResponse.json({ userId: context.userId, recovery: true, businessId: null, memberships: [] })
  }

  let snapshot: unknown = null
  if (context.businessId) {
    try {
      snapshot = await runtime.client.getBusinessPlatformSnapshot(context.accessToken, context.businessId)
    } catch (error) {
      snapshot = error instanceof CorePlatformError ? { unavailable: error.code } : { unavailable: 'CORE_UNAVAILABLE' }
    }
  }

  return NextResponse.json({
    userId: context.userId,
    recovery: false,
    businessId: context.businessId,
    role: context.role,
    memberships: context.memberships.map((m) => ({ businessId: m.business_id, role: m.role })),
    platform: snapshot,
  })
}
