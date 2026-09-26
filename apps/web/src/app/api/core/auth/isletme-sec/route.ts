import { NextResponse } from 'next/server'
import { requireCoreContext } from '@/lib/core/requestContext'
import { readJsonBody, requireCoreRuntime } from '@/lib/core/routeHelpers'

/**
 * KC-02: remember which of the user's active businesses the app should act
 * for. The selection is a hint stored on the session record; authority stays
 * with the membership row that is re-read on every request.
 */
export async function POST(request: Request) {
  const gate = requireCoreRuntime()
  if (!gate.ok) return gate.response
  const { runtime } = gate

  const resolved = await requireCoreContext(request, runtime)
  if (!resolved.ok) return resolved.response

  const body = await readJsonBody(request)
  const businessId = String(body.businessId ?? '')
  const membership = resolved.context.memberships.find((m) => m.business_id === businessId && m.active)
  if (!membership) {
    return NextResponse.json({ error: 'BUSINESS_ACCESS_DENIED' }, { status: 403 })
  }

  await runtime.sessions.update(resolved.record.sessionId, { selectedBusinessId: membership.business_id })
  return NextResponse.json({ ok: true, businessId: membership.business_id, role: membership.role })
}
