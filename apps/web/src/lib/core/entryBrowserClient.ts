import { CoreEntrySnapshotSchema } from './entryTypes'
import { z } from 'zod'

export class CoreEntryError extends Error {
  constructor(readonly status: number, readonly code = '') { super('Core entry request failed') }
}

function csrfHeader(): Record<string, string> {
  const csrf = document.cookie.split(';').map(item => item.trim()).find(item => item.startsWith('kepenk_core_csrf='))?.slice('kepenk_core_csrf='.length)
  if (!csrf) throw new CoreEntryError(403, 'CSRF_REJECTED')
  return { 'x-kepenk-csrf': csrf }
}

type Mutation = 'parola-giris' | 'parola-kurtar' | 'isletme-sec' | 'cikis'

export async function coreEntryMutation(action: Mutation, body: Record<string, string> = {}) {
  const response = await fetch(`/api/core/auth/${action}`, {
    method: 'POST', credentials: 'same-origin', cache: 'no-store',
    headers: { 'Content-Type': 'application/json', ...(['isletme-sec', 'cikis'].includes(action) ? csrfHeader() : {}) },
    body: JSON.stringify(body), signal: AbortSignal.timeout(15_000),
  })
  const data = await response.json().catch(() => null)
  if (!response.ok) throw new CoreEntryError(response.status, typeof data?.code === 'string' ? data.code : '')
  const valid = action === 'parola-giris'
    ? z.object({ userId: z.string().uuid(), recovery: z.boolean() }).safeParse(data).success
    : z.object({ ok: z.literal(true) }).safeParse(data).success
  if (!valid || response.redirected) throw new CoreEntryError(503)
  // Do not trust the mutation payload for identity or business selection.
}

export async function readCoreEntry(signal?: AbortSignal) {
  const response = await fetch('/api/core/auth/baslangic', {
    credentials: 'same-origin', cache: 'no-store', signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(15_000)]) : AbortSignal.timeout(15_000),
  })
  if (!response.ok) throw new CoreEntryError(response.status)
  const parsed = CoreEntrySnapshotSchema.safeParse(await response.json().catch(() => null))
  if (!parsed.success) throw new CoreEntryError(503)
  return parsed.data
}
