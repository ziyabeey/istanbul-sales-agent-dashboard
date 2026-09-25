import { NextResponse } from 'next/server'
import { isCoreEntryEnabled } from '@/lib/core/entryGate'
import { readCoreEntrySnapshot } from '@/lib/core/entrySnapshot'
import { requireCoreContext } from '@/lib/core/requestContext'
import { requireCoreRuntime } from '@/lib/core/routeHelpers'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  let response: Response
  try {
    if (!isCoreEntryEnabled()) response = NextResponse.json({ error: 'Not found' }, { status: 404 })
    else {
      const gate = requireCoreRuntime()
      if (!gate.ok) response = gate.response
      else {
        const resolved = await requireCoreContext(request, gate.runtime, { csrf: false, allowRecovery: true })
        response = resolved.ok
          ? NextResponse.json(await readCoreEntrySnapshot(resolved.context, gate.runtime.client))
          : resolved.response
      }
    }
  } catch {
    response = NextResponse.json({ error: 'CORE_UNAVAILABLE' }, { status: 503 })
  }
  response.headers.set('Cache-Control', 'private, no-store')
  return response
}
