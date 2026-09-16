import { NextResponse } from 'next/server'
import { apiGuard } from '@/lib/apiGuard'
import { adminDb } from '@/lib/firebaseAdmin'
import { processBillingOutbox } from '@/lib/core/billing'
import { isCoreBillingEnabled } from '@/lib/core/billingHook'
import { FirestoreBillingOutboxStore, resolveLinkedBusinessId } from '@/lib/core/billingStore'
import { getCoreRuntime } from '@/lib/core/deps'
import { readJsonBody } from '@/lib/core/routeHelpers'
import { SERVICE_AUDIENCES, SERVICE_SCOPES } from '@/lib/serviceAuth'

/**
 * KC-04: re-drives pending/deferred verified payment events into Core with
 * their original idempotency keys. Signed ServicePrincipal only.
 */
export async function POST(request: Request) {
  const guard = await apiGuard(request, {
    requireServicePrincipal: {
      audience: SERVICE_AUDIENCES.coreBillingOutbox,
      scopes: [SERVICE_SCOPES.coreBilling],
      allowedSubjects: ['cloud-scheduler', 'cloud-tasks', 'operator'],
    },
  })
  if (!guard.ok) return guard.response

  if (!isCoreBillingEnabled()) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  const runtime = getCoreRuntime()
  if (!runtime || !adminDb) {
    return NextResponse.json({ error: 'CORE_UNAVAILABLE' }, { status: 503 })
  }

  const body = await readJsonBody(request)
  const db = adminDb
  const report = await processBillingOutbox(
    { store: new FirestoreBillingOutboxStore(db), client: runtime.client, resolveBusinessId: (esnafId) => resolveLinkedBusinessId(db, esnafId) },
    { limit: Number.isInteger(body.limit) ? Number(body.limit) : 25 }
  )
  return NextResponse.json({ ok: true, outbox: report })
}
