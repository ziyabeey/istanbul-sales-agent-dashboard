import { NextResponse } from 'next/server'
import { apiGuard } from '@/lib/apiGuard'
import { adminDb } from '@/lib/firebaseAdmin'
import { getCoreRuntime } from '@/lib/core/deps'
import { runCoreProjection } from '@/lib/core/projection'
import { FirestoreCoreProjectionStore } from '@/lib/core/projectionStore'
import { readJsonBody } from '@/lib/core/routeHelpers'
import { SERVICE_AUDIENCES, SERVICE_SCOPES } from '@/lib/serviceAuth'

export function isCoreProjectionEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return env.CORE_PROJECTION_ENABLED === 'true'
}

/**
 * KC-05: Core -> Firestore projection tick. Signed ServicePrincipal only;
 * reports latency so the gap between Core and the read model is measured.
 */
export async function POST(request: Request) {
  const guard = await apiGuard(request, {
    requireServicePrincipal: {
      audience: SERVICE_AUDIENCES.coreProjection,
      scopes: [SERVICE_SCOPES.coreProjection],
      allowedSubjects: ['cloud-scheduler', 'cloud-tasks', 'operator'],
    },
  })
  if (!guard.ok) return guard.response

  if (!isCoreProjectionEnabled()) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  const runtime = getCoreRuntime()
  if (!runtime || !adminDb) {
    return NextResponse.json({ error: 'CORE_UNAVAILABLE' }, { status: 503 })
  }

  const body = await readJsonBody(request)
  const report = await runCoreProjection({
    store: new FirestoreCoreProjectionStore(adminDb),
    client: runtime.client,
    limit: Number.isInteger(body.limit) ? Number(body.limit) : 100,
  })
  return NextResponse.json({ ok: true, projection: report })
}
