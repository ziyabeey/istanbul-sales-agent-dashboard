import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
const mocks = vi.hoisted(() => ({ runtime: vi.fn(), context: vi.fn(), snapshot: vi.fn() }))
vi.mock('next/server', () => ({ NextResponse: { json: (body: unknown, init?: ResponseInit) => new Response(JSON.stringify(body), init) } }))
vi.mock('@/lib/core/routeHelpers', () => ({ requireCoreRuntime: mocks.runtime }))
vi.mock('@/lib/core/requestContext', () => ({ requireCoreContext: mocks.context }))
vi.mock('@/lib/core/entrySnapshot', () => ({ readCoreEntrySnapshot: mocks.snapshot }))
import { GET } from '@/app/api/core/auth/baslangic/route'

describe('Core entry display endpoint', () => {
  beforeEach(() => {
    vi.stubEnv('CORE_BFF_ENABLED', 'true'); vi.stubEnv('CORE_ENTRY_ENABLED', 'true')
    mocks.runtime.mockReturnValue({ ok: true, runtime: { client: {} } })
    mocks.context.mockResolvedValue({ ok: true, context: {} })
    mocks.snapshot.mockResolvedValue({ recovery: false, businessId: null, memberships: [] })
  })
  afterEach(() => vi.unstubAllEnvs())
  it('stays closed without the additional rollout gate', async () => {
    vi.stubEnv('CORE_ENTRY_ENABLED', '')
    const response = await GET(new Request('https://app.example.test/api/core/auth/baslangic'))
    expect(response.status).toBe(404)
    expect(mocks.runtime).not.toHaveBeenCalled()
    expect(response.headers.get('cache-control')).toBe('private, no-store')
  })
  it('uses the authoritative Core context and does not cache the DTO', async () => {
    const request = new Request('https://app.example.test/api/core/auth/baslangic')
    const response = await GET(request)
    expect(mocks.context).toHaveBeenCalledWith(request, { client: {} }, { csrf: false, allowRecovery: true })
    expect(await response.json()).toEqual({ recovery: false, businessId: null, memberships: [] })
    expect(response.headers.get('cache-control')).toBe('private, no-store')
  })
  it.each([401, 403, 503])('preserves a denied/unavailable context (%s)', async status => {
    mocks.context.mockResolvedValue({ ok: false, response: new Response(null, { status }) })
    const response = await GET(new Request('https://app.example.test/api/core/auth/baslangic'))
    expect(response.status).toBe(status)
    expect(mocks.snapshot).not.toHaveBeenCalled()
    expect(response.headers.get('cache-control')).toBe('private, no-store')
  })
  it('returns unavailability, not an empty business list, for a failed display read', async () => {
    mocks.snapshot.mockRejectedValue(new Error('fixture failure'))
    const response = await GET(new Request('https://app.example.test/api/core/auth/baslangic'))
    expect(response.status).toBe(503)
    expect(await response.json()).toEqual({ error: 'CORE_UNAVAILABLE' })
  })
})
