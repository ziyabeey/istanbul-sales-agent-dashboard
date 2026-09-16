import { NextResponse } from 'next/server'
import { apiGuard } from '@/lib/apiGuard'
import { adminDb } from '@/lib/firebaseAdmin'
import { runTenantBackfill, runTenantParityCheck } from '@/lib/core/backfill'
import { FirestoreLegacyTenantSource } from '@/lib/core/backfillSource'
import { getCoreRuntime } from '@/lib/core/deps'
import { readJsonBody } from '@/lib/core/routeHelpers'
import { SERVICE_AUDIENCES, SERVICE_SCOPES } from '@/lib/serviceAuth'

/**
 * KC-03: batched esnaf -> business backfill plus shadow parity, driven by a
 * signed ServicePrincipal (machine identity only). Off until
 * CORE_BACKFILL_ENABLED=true. Firestore remains authoritative; the job only
 * writes Core shadow fields and migration reports.
 */
export async function POST(request: Request) {
  const guard = await apiGuard(request, {
    requireServicePrincipal: {
      audience: SERVICE_AUDIENCES.coreBackfill,
      scopes: [SERVICE_SCOPES.coreBackfill],
      allowedSubjects: ['cloud-scheduler', 'cloud-tasks', 'operator'],
    },
  })
  if (!guard.ok) return guard.response

  if (process.env.CORE_BACKFILL_ENABLED !== 'true') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  const runtime = getCoreRuntime()
  if (!runtime || !adminDb) {
    return NextResponse.json({ error: 'CORE_UNAVAILABLE' }, { status: 503 })
  }

  const body = await readJsonBody(request)
  const source = new FirestoreLegacyTenantSource(adminDb)
  const batchSize = Number.isInteger(body.batchSize) ? Number(body.batchSize) : 50
  const startAfter = typeof body.startAfter === 'string' && body.startAfter ? body.startAfter : null

  const backfill = await runTenantBackfill({
    source,
    client: runtime.client,
    batchSize,
    startAfter,
    dryRun: body.dryRun === true,
  })
  const parity = body.parity === true ? await runTenantParityCheck({ source, client: runtime.client }) : null

  return NextResponse.json({ ok: true, backfill, parity })
}
