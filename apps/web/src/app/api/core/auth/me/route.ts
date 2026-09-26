import { NextResponse } from 'next/server'
import { requireCoreContext } from '@/lib/core/requestContext'
import { requireCoreRuntime } from '@/lib/core/routeHelpers'

/**
 * KC-02: who am I, in Core terms. Everything here comes from the single
 * CoreRequestContext (verified JWT + memberships + KC-01 snapshot); a
 * recovery-class session only learns that it must update its password.
 */
export async function GET(request: Request) {
  const gate = requireCoreRuntime()
  if (!gate.ok) return gate.response

  const resolved = await requireCoreContext(request, gate.runtime, { csrf: false, allowRecovery: true })
  if (!resolved.ok) return resolved.response
  const { context } = resolved

  if (context.recovery) {
    return NextResponse.json({ userId: context.userId, recovery: true, businessId: null, memberships: [], entitlements: [] })
  }

  return NextResponse.json({
    userId: context.userId,
    recovery: false,
    businessId: context.businessId,
    role: context.role,
    memberships: context.memberships.map((m) => ({ businessId: m.business_id, role: m.role })),
    entitlements: context.entitlements,
    subscription: context.subscription,
  })
}
