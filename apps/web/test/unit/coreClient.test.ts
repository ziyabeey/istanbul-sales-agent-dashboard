import { describe, expect, it, vi } from 'vitest'
import { CorePlatformClient, coreIdempotencyKey } from '@/lib/core/coreClient'
import { CorePlatformError } from '@/lib/core/errors'

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })
}

function makeClient(fetchImpl: typeof fetch, secret = 'kc02-principal-secret-aaaaaaaaaaaaaaaaaaaaaaaa') {
  const principalSecret = vi.fn(async () => secret)
  const client = new CorePlatformClient({
    supabaseUrl: 'https://core.example.test',
    anonKey: 'anon-key',
    principalName: 'kepenk-web',
    principalSecret,
    fetch: fetchImpl,
  })
  return { client, principalSecret }
}

describe('coreIdempotencyKey', () => {
  it('is deterministic, ledger-safe and bounded', () => {
    const a = coreIdempotencyKey('kc04-iyzico', 'payment-1')
    const b = coreIdempotencyKey('kc04-iyzico', 'payment-1')
    const c = coreIdempotencyKey('kc04-iyzico', 'payment-2')
    expect(a).toBe(b)
    expect(a).not.toBe(c)
    expect(a).toMatch(/^[A-Za-z0-9._:-]{8,128}$/)
    expect(coreIdempotencyKey('bad prefix/with chars', 'x')).toMatch(/^bad-prefix-with-chars-[0-9a-f]{48}$/)
  })
})

describe('CorePlatformClient.applyCommand', () => {
  it('sends the KC-01 RPC shape with the anon key and lazily resolved principal secret', async () => {
    const fetchImpl = vi.fn(async () => jsonResponse({ ok: true, data: { business_id: '5b000000-0000-4000-8000-000000000001', linked: true } }))
    const { client, principalSecret } = makeClient(fetchImpl as unknown as typeof fetch)

    const data = await client.applyCommand({
      idempotencyKey: 'kc02-test-key-0001',
      command: 'LinkTenantAlias',
      payload: { provider: 'legacy-kepenk-firestore', external_id: 'esnaf-1', business_id: '5b000000-0000-4000-8000-000000000001' },
    })

    expect(data.linked).toBe(true)
    expect(principalSecret).toHaveBeenCalledTimes(1)
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit]
    expect(url).toBe('https://core.example.test/rest/v1/rpc/core_apply_platform_command')
    expect((init.headers as Record<string, string>).apikey).toBe('anon-key')
    expect((init.headers as Record<string, string>).authorization).toBe('Bearer anon-key')
    expect(JSON.parse(String(init.body))).toEqual({
      p_principal_name: 'kepenk-web',
      p_principal_secret: 'kc02-principal-secret-aaaaaaaaaaaaaaaaaaaaaaaa',
      p_idempotency_key: 'kc02-test-key-0001',
      p_command: 'LinkTenantAlias',
      p_payload: { provider: 'legacy-kepenk-firestore', external_id: 'esnaf-1', business_id: '5b000000-0000-4000-8000-000000000001' },
    })
  })

  it('rejects an invalid idempotency key before any network call', async () => {
    const fetchImpl = vi.fn()
    const { client, principalSecret } = makeClient(fetchImpl as unknown as typeof fetch)
    await expect(client.applyCommand({ idempotencyKey: 'short', command: 'LinkTenantAlias', payload: {} })).rejects.toMatchObject({ code: 'INVALID_IDEMPOTENCY_KEY' })
    expect(fetchImpl).not.toHaveBeenCalled()
    expect(principalSecret).not.toHaveBeenCalled()
  })

  it('maps whitelisted database errors to typed codes and unknown ones to CORE_INTERNAL_ERROR', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ ok: false, error: { message: 'TENANT_ALIAS_CONFLICT' } }))
      .mockResolvedValueOnce(jsonResponse({ ok: false, error: { message: 'something leaked' } }))
      .mockResolvedValueOnce(jsonResponse({ ok: false, error: { message: 'PUBLIC_BOOKING_RATE_LIMITED:30' } }))
    const { client } = makeClient(fetchImpl as unknown as typeof fetch)
    const input = { idempotencyKey: 'kc02-test-key-0002', command: 'LinkTenantAlias' as const, payload: {} }

    await expect(client.applyCommand(input)).rejects.toMatchObject({ code: 'TENANT_ALIAS_CONFLICT', retryable: false })
    await expect(client.applyCommand(input)).rejects.toMatchObject({ code: 'CORE_INTERNAL_ERROR' })
    await expect(client.applyCommand(input)).rejects.toMatchObject({ code: 'CORE_UNAVAILABLE', retryable: true })
  })

  it('treats transport failures as retryable CORE_UNAVAILABLE and auth rejections as AUTH_REQUIRED', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ message: 'boom' }, 500))
      .mockRejectedValueOnce(new Error('network down'))
      .mockResolvedValueOnce(jsonResponse({ message: 'nope' }, 401))
    const { client } = makeClient(fetchImpl as unknown as typeof fetch)
    const input = { idempotencyKey: 'kc02-test-key-0003', command: 'GrantEntitlement' as const, payload: {} }

    await expect(client.applyCommand(input)).rejects.toMatchObject({ code: 'CORE_UNAVAILABLE', status: 500, retryable: true })
    await expect(client.applyCommand(input)).rejects.toMatchObject({ code: 'CORE_UNAVAILABLE', retryable: true })
    await expect(client.applyCommand(input)).rejects.toMatchObject({ code: 'AUTH_REQUIRED', status: 401 })
  })

  it('rejects malformed envelopes instead of trusting them', async () => {
    const fetchImpl = vi.fn(async () => jsonResponse({ ok: true }))
    const { client } = makeClient(fetchImpl as unknown as typeof fetch)
    await expect(
      client.applyCommand({ idempotencyKey: 'kc02-test-key-0004', command: 'LinkTenantAlias', payload: {} })
    ).rejects.toBeInstanceOf(CorePlatformError)
  })
})

describe('CorePlatformClient user-token reads', () => {
  it('reads the change feed with the principal secret and parses the page', async () => {
    const fetchImpl = vi.fn(async () =>
      jsonResponse({
        ok: true,
        data: {
          events: [
            {
              event_id: 7,
              business_id: '5b000000-0000-4000-8000-000000000001',
              event_type: 'subscription_changed',
              plan_key: 'kepenk_standard',
              payload: { status: 'active' },
              policy_version: 1,
              created_at: '2026-09-16T10:00:00Z',
            },
          ],
          next_after_event_id: 7,
          has_more: false,
        },
      })
    )
    const { client } = makeClient(fetchImpl as unknown as typeof fetch)
    const page = await client.readChangeFeed({ afterEventId: 0, limit: 10 })
    expect(page.events[0].event_type).toBe('subscription_changed')
    expect(page.has_more).toBe(false)
    const [, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit]
    expect(JSON.parse(String(init.body))).toMatchObject({ p_after_event_id: 0, p_limit: 10, p_principal_name: 'kepenk-web' })
  })

  it('uses the user JWT, not the principal secret, for entitlement and snapshot reads', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(true))
      .mockResolvedValueOnce(
        jsonResponse({
          ok: true,
          data: { business_id: '5b000000-0000-4000-8000-000000000001', subscription: null, entitlements: [] },
        })
      )
      .mockResolvedValueOnce(jsonResponse([{ id: '6b000000-0000-4000-8000-000000000001', business_id: '5b000000-0000-4000-8000-000000000001', role: 'owner', active: true }]))
    const { client, principalSecret } = makeClient(fetchImpl as unknown as typeof fetch)

    expect(await client.hasEntitlement('user.jwt.token', '5b000000-0000-4000-8000-000000000001', 'booking')).toBe(true)
    const snapshot = await client.getBusinessPlatformSnapshot('user.jwt.token', '5b000000-0000-4000-8000-000000000001')
    expect(snapshot.subscription).toBeNull()
    const memberships = await client.listMemberships('user.jwt.token')
    expect(memberships[0].role).toBe('owner')

    expect(principalSecret).not.toHaveBeenCalled()
    for (const call of fetchImpl.mock.calls as unknown as Array<[string, RequestInit]>) {
      expect((call[1].headers as Record<string, string>).authorization).toBe('Bearer user.jwt.token')
    }
    expect((fetchImpl.mock.calls[2] as unknown as [string])[0]).toContain('/rest/v1/memberships?select=id,business_id,role,active&active=eq.true')
  })
})
