import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { NextRequest } from 'next/server'
import type { RequestContext } from '../../../../packages/auth/src/types/canonical'

const mocks = vi.hoisted(() => ({
  resolveToken: vi.fn(),
  resolveRequest: vi.fn(),
}))

/**
 * Vitest's jsdom transform does not expose NextResponse's framework-only static
 * helpers. Model only the response contract the proxy/API tests assert; the
 * real NextResponse implementation is exercised by trust-browser-smoke.
 */
vi.mock('next/server', () => ({
  NextResponse: {
    redirect(url: string | URL, init?: number | ResponseInit) {
      const status = typeof init === 'number' ? init : init?.status ?? 307
      return new Response(null, {
        status,
        headers: { location: url.toString() },
      })
    },
    rewrite(url: string | URL) {
      return new Response(null, {
        status: 200,
        headers: { 'x-middleware-rewrite': url.toString() },
      })
    },
    next() {
      return new Response(null, {
        status: 200,
        headers: { 'x-middleware-next': '1' },
      })
    },
    json(body: unknown, init?: ResponseInit) {
      const headers = new Headers(init?.headers)
      if (!headers.has('content-type')) {
        headers.set('content-type', 'application/json')
      }
      return new Response(JSON.stringify(body), {
        ...init,
        status: init?.status ?? 200,
        headers,
      })
    },
  },
}))

vi.mock('@/lib/auth/businessSession', () => ({
  BUSINESS_SESSION_COOKIE: 'kepenk_session',
  resolveCanonicalBusinessContext: mocks.resolveToken,
  resolveCanonicalBusinessContextFromRequest: mocks.resolveRequest,
}))

vi.mock('@/lib/mvpFeatureFlags', () => ({
  isMvpDashboardPathAllowed: () => true,
  isMvpTestReleaseEnabled: () => false,
}))

import proxy from '../../src/proxy'
import { apiGuard } from '../../src/lib/apiGuard'

const CONTEXT = {
  sessionId: 'ses_test',
  userId: 'usr_test',
  membershipId: 'mem_test',
  tenantId: 'tenant-canonical',
  role: 'owner',
  permissions: [],
  authMethod: 'phone_otp',
  sessionEpoch: 0,
  membershipRevision: 1,
} as unknown as RequestContext

/**
 * Vitest runs in jsdom, where constructing NextRequest does not expose the
 * framework-owned `nextUrl` surface reliably. Proxy behavior only needs the
 * stable request fields below, so the unit seam models those explicitly while
 * the real Next.js object is exercised by trust-browser-smoke.
 */
function proxyRequest(
  url: string,
  options: { cookie?: string; host?: string } = {}
): NextRequest {
  const parsed = new URL(url)
  const headers = new Headers()
  headers.set('host', options.host ?? parsed.host)
  if (options.cookie) headers.set('cookie', options.cookie)

  const cookieValues = new Map<string, string>()
  for (const entry of (options.cookie ?? '').split(';')) {
    const separator = entry.indexOf('=')
    if (separator < 0) continue
    const name = entry.slice(0, separator).trim()
    const value = entry.slice(separator + 1).trim()
    if (name && value) cookieValues.set(name, value)
  }

  const nextUrl = new URL(parsed.toString()) as URL & { clone: () => URL }
  nextUrl.clone = () => new URL(parsed.toString())

  return {
    nextUrl,
    headers,
    url: parsed.toString(),
    cookies: {
      get(name: string) {
        const value = cookieValues.get(name)
        return value ? { name, value } : undefined
      },
    },
  } as unknown as NextRequest
}

describe('P0-03 request-gate convergence', () => {
  afterEach(() => vi.unstubAllEnvs())
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.ADMIN_SECRET_TOKEN = 'test-admin-secret'
  })

  it('denies dashboard access when a random business cookie cannot resolve canonical context', async () => {
    mocks.resolveToken.mockResolvedValue(null)

    const response = await proxy(proxyRequest(
      'http://localhost:3000/dashboard/manage',
      { cookie: 'kepenk_session=random-cookie' }
    ))

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toContain('/giris?callbackUrl=%2Fdashboard%2Fmanage')
    expect(mocks.resolveToken).toHaveBeenCalledWith('random-cookie')
  })

  it('authorizes dashboard only from canonical RequestContext', async () => {
    mocks.resolveToken.mockResolvedValue(CONTEXT)

    const response = await proxy(proxyRequest(
      'http://localhost:3000/dashboard/manage',
      { cookie: 'kepenk_session=canonical-token' }
    ))

    expect(response.status).toBe(200)
    expect(response.headers.get('x-middleware-next')).toBe('1')
  })

  it('guards app subdomain root before dashboard rewrite', async () => {
    mocks.resolveToken.mockResolvedValue(null)

    const response = await proxy(proxyRequest(
      'http://app.localhost:3000/',
      {
        host: 'app.localhost:3000',
        cookie: 'kepenk_session=random-cookie',
      }
    ))

    expect(response.status).toBe(307)
    const location = new URL(response.headers.get('location')!)
    expect(location.hostname).toBe('localhost')
    expect(location.pathname).toBe('/giris')
    expect(location.searchParams.get('callbackUrl')).toBe('/dashboard/manage')
  })

  it('preserves app subdomain rewrite after canonical authorization', async () => {
    mocks.resolveToken.mockResolvedValue(CONTEXT)

    const response = await proxy(proxyRequest(
      'http://app.localhost:3000/',
      {
        host: 'app.localhost:3000',
        cookie: 'kepenk_session=canonical-token',
      }
    ))

    expect(response.status).toBe(200)
    expect(response.headers.get('x-middleware-rewrite')).toContain('/dashboard/manage')
  })

  it('keeps login reachable on business subdomains when unauthenticated', async () => {
    mocks.resolveToken.mockResolvedValue(null)

    const response = await proxy(proxyRequest(
      'http://app.localhost:3000/giris',
      { host: 'app.localhost:3000' }
    ))

    expect(response.status).toBe(200)
    expect(response.headers.get('x-middleware-next')).toBe('1')
  })

  it.each(['/giris', '/baslangic', '/parola-yenile', '/api/core/auth/me', '/api/core/auth/baslangic'])('keeps gated Core entry %s on its original host without legacy rewrites', async path => {
    vi.stubEnv('CORE_BFF_ENABLED', 'true'); vi.stubEnv('CORE_ENTRY_ENABLED', 'true')
    const response = await proxy(proxyRequest(`https://app.kepenk.ai${path}`, { cookie: 'kepenk_session=legacy-fixture' }))
    expect(response.headers.get('x-middleware-next')).toBe('1')
    expect(response.headers.get('x-middleware-rewrite')).toBeNull()
    expect(response.headers.get('location')).toBeNull()
    expect(response.headers.get('cache-control')).toBe('private, no-store')
    expect(mocks.resolveToken).not.toHaveBeenCalled()
  })

  it('does not turn Core rollout into access to the legacy dashboard', async () => {
    vi.stubEnv('CORE_BFF_ENABLED', 'true'); vi.stubEnv('CORE_ENTRY_ENABLED', 'true')
    const response = await proxy(proxyRequest('https://app.kepenk.ai/dashboard/manage'))
    expect(response.status).toBe(307)
  })

  it('API user guard returns the exact canonical context', async () => {
    mocks.resolveRequest.mockResolvedValue(CONTEXT)

    const guarded = await apiGuard(new Request('http://localhost/api/example', {
      headers: { cookie: 'kepenk_session=canonical-token' },
    }), { requireUserSession: true })

    expect(guarded.ok).toBe(true)
    if (!guarded.ok) throw new Error('expected canonical guard success')
    expect(guarded.context).toEqual(CONTEXT)
  })

  it('API user guard rejects an unresolved session', async () => {
    mocks.resolveRequest.mockResolvedValue(null)

    const guarded = await apiGuard(new Request('http://localhost/api/example', {
      headers: { cookie: 'kepenk_session=random-cookie' },
    }), { requireUserSession: true })

    expect(guarded.ok).toBe(false)
    if (guarded.ok) throw new Error('expected canonical guard denial')
    expect(guarded.response.status).toBe(401)
  })

  it('caller tenant payload cannot replace canonical tenant authority', async () => {
    mocks.resolveRequest.mockResolvedValue(CONTEXT)

    const guarded = await apiGuard(new Request('http://localhost/api/example?tenantId=tenant-attacker', {
      method: 'POST',
      headers: {
        cookie: 'kepenk_session=canonical-token',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ tenantId: 'tenant-attacker' }),
    }), { requireUserSession: true })

    expect(guarded.ok).toBe(true)
    if (!guarded.ok) throw new Error('expected canonical guard success')
    expect(guarded.context?.tenantId).toBe('tenant-canonical')
  })
})
