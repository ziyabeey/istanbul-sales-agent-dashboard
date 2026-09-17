import { NextResponse } from 'next/server'
import { apiGuard } from '@/lib/apiGuard'
import { adminDb } from '@/lib/firebaseAdmin'
import { runTenantParityCheck } from '@/lib/core/backfill'
import { CORE_MIGRATION_REPORTS_COLLECTION, FirestoreLegacyTenantSource } from '@/lib/core/backfillSource'
import { getCoreRuntime } from '@/lib/core/deps'

/**
 * KC-03: operator view of shadow parity. GET returns the latest stored
 * reports; POST recomputes parity read-only. Durable AdminSession only.
 */
export async function GET(request: Request) {
  const guard = await apiGuard(request, { requireAdminSession: true })
  if (!guard.ok) return guard.response
  if (!adminDb) return NextResponse.json({ error: 'CORE_UNAVAILABLE' }, { status: 503 })

  const [parity, backfill] = await Promise.all([
    adminDb.collection(CORE_MIGRATION_REPORTS_COLLECTION).doc('latest-parity').get(),
    adminDb.collection(CORE_MIGRATION_REPORTS_COLLECTION).doc('latest-backfill').get(),
  ])
  return NextResponse.json({
    parity: parity.exists ? parity.data() : null,
    backfill: backfill.exists ? backfill.data() : null,
  })
}

export async function POST(request: Request) {
  const guard = await apiGuard(request, { requireAdminSession: true })
  if (!guard.ok) return guard.response
  const runtime = getCoreRuntime()
  if (!runtime || !adminDb) return NextResponse.json({ error: 'CORE_UNAVAILABLE' }, { status: 503 })

  const report = await runTenantParityCheck({ source: new FirestoreLegacyTenantSource(adminDb), client: runtime.client })
  return NextResponse.json({ ok: true, parity: report })
}
