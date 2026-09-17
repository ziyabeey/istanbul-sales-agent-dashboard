import { NextResponse } from 'next/server'
import { requireCoreContext } from '@/lib/core/requestContext'
import { requireCoreRuntime } from '@/lib/core/routeHelpers'

/**
 * KC-05: pricing/modules are read from Core, not from the legacy `paket`
 * field. The app renders plan, status, period and granted entitlements from
 * the single CoreRequestContext; prices never come from application code.
 */
export async function GET(request: Request) {
  const gate = requireCoreRuntime()
  if (!gate.ok) return gate.response

  const resolved = await requireCoreContext(request, gate.runtime, { csrf: false, requireBusiness: true })
  if (!resolved.ok) return resolved.response
  const { context } = resolved

  return NextResponse.json({
    businessId: context.businessId,
    planKey: context.subscription?.plan_key ?? null,
    status: context.subscription?.status ?? null,
    currentPeriodStart: context.subscription?.current_period_start ?? null,
    currentPeriodEnd: context.subscription?.current_period_end ?? null,
    entitlements: context.entitlements,
    source: 'core',
  })
}
