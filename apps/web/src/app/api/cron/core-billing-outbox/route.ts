import { NextResponse } from 'next/server'
import { apiGuard } from '@/lib/apiGuard'
import { adminDb } from '@/lib/firebaseAdmin'
import { processBillingOutbox } from '@/lib/core/billing'
import { isCoreBillingEnabled } from '@/lib/core/billingHook'
import { FirestoreBillingOutboxStore, resolveBusinessRouting } from '@/lib/core/billingStore'
import { getCoreRuntime } from '@/lib/core/deps'
import { isCoreOnboardingEnabled, redriveOnboardingSagas } from '@/lib/core/onboardingCore'
import { FirestoreOnboardingSagaStore } from '@/lib/core/onboardingSagaStore'
import { readJsonBody } from '@/lib/core/routeHelpers'
import { SERVICE_AUDIENCES, SERVICE_SCOPES } from '@/lib/serviceAuth'

/**
 * KC-04: re-drives pending/deferred verified payment events into Core with
 * their original idempotency keys. KC-05: also re-drives open onboarding
 * sagas (stored payload, stable keys). Signed ServicePrincipal only.
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
  const limit = Number.isInteger(body.limit) ? Number(body.limit) : 25
  const report = await processBillingOutbox(
    { store: new FirestoreBillingOutboxStore(db), client: runtime.client, resolveBusinessRouting: (esnafId) => resolveBusinessRouting(db, runtime.client, esnafId) },
    { limit }
  )
  const onboarding = isCoreOnboardingEnabled()
    ? await redriveOnboardingSagas({ store: new FirestoreOnboardingSagaStore(db), client: runtime.client, db, limit })
    : null
  return NextResponse.json({ ok: true, outbox: report, onboarding })
}
