import { describe, expect, it, vi } from 'vitest'
import type { CoreFeedEvent, CorePlatformClient } from '@/lib/core/coreClient'
import { InMemoryCoreProjectionStore, projectEvent, runCoreProjection } from '@/lib/core/projection'

const BIZ = '5b000000-0000-4000-8000-000000000001'
const OTHER = '5b000000-0000-4000-8000-000000000002'
const NOW = () => new Date('2026-09-16T12:00:10Z')

function event(id: number, type: CoreFeedEvent['event_type'], payload: Record<string, unknown>, extra: Partial<CoreFeedEvent> = {}): CoreFeedEvent {
  return { event_id: id, business_id: BIZ, event_type: type, plan_key: null, payload, policy_version: null, created_at: '2026-09-16T12:00:00Z', ...extra }
}

const EVENTS: CoreFeedEvent[] = [
  event(1, 'business_provisioned', { slug: 'kepenk-berber', owner_user_id: '11000000-0000-4000-8000-000000000001' }),
  event(2, 'tenant_alias_linked', { provider: 'legacy-kepenk-firestore', external_id: 'esnaf-1' }),
  event(3, 'subscription_changed', {
    status: 'active',
    current_period_start: '2026-09-16T00:00:00Z',
    current_period_end: '2027-09-16T00:00:00Z',
    entitlements: [
      { entitlement_key: 'booking', granted: true, limit_value: null, valid_until: '2027-09-16T00:00:00Z' },
      { entitlement_key: 'messaging_credits', granted: true, limit_value: null, valid_until: '2027-09-16T00:00:00Z' },
    ],
  }, { plan_key: 'kepenk_standard', policy_version: 1 }),
  event(4, 'entitlement_granted', { entitlement_key: 'custom_domain', limit_value: null, valid_until: null }),
  event(5, 'entitlement_revoked', { entitlement_key: 'messaging_credits', limit_value: null, valid_until: null }),
  event(6, 'subscription_changed', { status: 'cancelled', entitlements: [{ entitlement_key: 'booking', granted: false, limit_value: null, valid_until: null }] }, { plan_key: 'kepenk_standard', policy_version: 1 }),
]

function feedClient(events: CoreFeedEvent[], pageSize = 100) {
  const readChangeFeed = vi.fn(async ({ afterEventId, limit }: { afterEventId: number; limit?: number }) => {
    const size = Math.min(limit ?? 100, pageSize)
    const page = events.filter((e) => e.event_id > afterEventId).slice(0, size)
    const last = page.at(-1)?.event_id ?? afterEventId
    return { events: page, next_after_event_id: last, has_more: events.some((e) => e.event_id > last) }
  })
  return { client: { readChangeFeed } as unknown as CorePlatformClient, readChangeFeed }
}

describe('runCoreProjection', () => {
  it('projects business, alias, subscription and entitlement events onto the legacy tenant and advances the cursor', async () => {
    const store = new InMemoryCoreProjectionStore()
    const { client } = feedClient(EVENTS)
    const report = await runCoreProjection({ store, client, now: NOW, env: {} })

    expect(report).toMatchObject({ lease: 'acquired', cursorBefore: 0, cursorAfter: 6, fetched: 6, applied: 6, stale: 0, orphans: 0, hasMore: false, interrupted: false, lagMs: 10_000 })
    expect(store.index.get(BIZ)).toMatchObject({ esnafId: 'esnaf-1', slug: 'kepenk-berber' })
    // The lease is handed back for the next tick.
    expect(store.leaseOwner).toBeNull()

    const tenant = store.tenants.get('esnaf-1') as Record<string, unknown>
    const core = tenant.core as Record<string, unknown>
    expect(core.businessId).toBe(BIZ)
    expect(core.slug).toBe('kepenk-berber')
    expect(core.lastEventId).toBe(6)
    expect(core.subscription).toMatchObject({ planKey: 'kepenk_standard', status: 'cancelled', policyVersion: 1, eventId: 6 })
    expect(core.entitlements).toEqual({
      booking: { granted: false, limitValue: null, validUntil: null, eventId: 6 },
      messaging_credits: { granted: false, limitValue: null, validUntil: null, eventId: 5 },
      custom_domain: { granted: true, limitValue: null, validUntil: null, eventId: 4 },
    })
    // Legacy root commercial fields are untouched for non-canary tenants.
    expect(tenant.durum).toBeUndefined()
    expect(tenant['ayarlar.customDomain']).toBeUndefined()
  })

  it('is idempotent: replaying from an earlier cursor converges to the same state and rewrites nothing', async () => {
    const store = new InMemoryCoreProjectionStore()
    const { client } = feedClient(EVENTS)
    await runCoreProjection({ store, client, now: NOW, env: {} })
    const first = JSON.stringify(store.tenants.get('esnaf-1'))

    store.cursor = 0
    const replay = await runCoreProjection({ store, client, now: NOW, env: {} })
    expect(JSON.stringify(store.tenants.get('esnaf-1'))).toBe(first)
    // Every replayed event is refused by the monotonic guard: no rewrite at all.
    expect(replay).toMatchObject({ fetched: 6, applied: 0, stale: 6, orphans: 0 })
    expect(store.orphans).toEqual([])
  })

  it('pages with the stored cursor and reports has_more', async () => {
    const store = new InMemoryCoreProjectionStore()
    const { client, readChangeFeed } = feedClient(EVENTS, 4)
    const page1 = await runCoreProjection({ store, client, limit: 4, now: NOW, env: {} })
    expect(page1).toMatchObject({ fetched: 4, cursorAfter: 4, hasMore: true })
    const page2 = await runCoreProjection({ store, client, limit: 4, now: NOW, env: {} })
    expect(page2).toMatchObject({ cursorBefore: 4, fetched: 2, cursorAfter: 6, hasMore: false })
    expect(readChangeFeed).toHaveBeenLastCalledWith({ afterEventId: 4, limit: 4 })
  })

  it('writes the legacy durum and the paid ayarlar flags only for canary tenants, only as a projection of Core', async () => {
    const store = new InMemoryCoreProjectionStore()
    const { client } = feedClient(EVENTS.slice(0, 4))
    await runCoreProjection({ store, client, now: NOW, env: { CORE_CANARY_TENANTS: 'esnaf-1, esnaf-9' } })
    const tenant = store.tenants.get('esnaf-1') as Record<string, unknown>
    expect(tenant.durum).toBe('aktif')
    expect(tenant.durumKaynak).toBe('core-projection')
    expect(tenant.paket).toBeUndefined()
    // KC-05 blocker 1: the paid flag arrives from the Core entitlement event, not from `paket`.
    expect(tenant['ayarlar.randevuSistemi']).toBe(true)
    expect(tenant['ayarlar.customDomain']).toBe(true)

    await projectEvent(store, EVENTS[5], NOW().toISOString(), { CORE_CANARY_TENANTS: 'esnaf-1' })
    const after = store.tenants.get('esnaf-1') as Record<string, unknown>
    expect(after.durum).toBe('pasif')
    expect(after['ayarlar.randevuSistemi']).toBe(false)
  })

  it('records orphans for businesses without a legacy tenant and keeps going, using the shadow lookup as fallback', async () => {
    const store = new InMemoryCoreProjectionStore(new Map([[OTHER, 'esnaf-shadow']]))
    const { client } = feedClient([
      event(1, 'subscription_changed', { status: 'active', entitlements: [] }, { business_id: '5b000000-0000-4000-8000-0000000000ff', plan_key: 'kepenk_standard' }),
      event(2, 'entitlement_granted', { entitlement_key: 'booking' }, { business_id: OTHER }),
    ])
    const report = await runCoreProjection({ store, client, now: NOW, env: {} })
    expect(report).toMatchObject({ applied: 1, orphans: 1, cursorAfter: 2 })
    expect(store.orphans[0].reason).toContain('no legacy tenant')
    expect((store.tenants.get('esnaf-shadow')?.core as Record<string, unknown>).entitlements).toEqual({ booking: { granted: true, limitValue: null, validUntil: null, eventId: 2 } })
  })
})

describe('projection concurrency (two workers)', () => {
  it('refuses to run while another worker holds the durable lease', async () => {
    const store = new InMemoryCoreProjectionStore()
    const { client, readChangeFeed } = feedClient(EVENTS)
    expect(await store.acquireLease({ owner: 'worker-a', now: NOW(), ttlMs: 60_000 })).toEqual({ ok: true })

    const blocked = await runCoreProjection({ store, client, owner: 'worker-b', now: NOW, env: {} })
    expect(blocked).toMatchObject({ lease: 'busy', heldBy: 'worker-a', fetched: 0, applied: 0, cursorAfter: 0 })
    expect(readChangeFeed).not.toHaveBeenCalled()
    expect(store.tenants.size).toBe(0)
    expect(store.cursor).toBe(0)
  })

  it('a worker whose lease lapsed stops instead of advancing the cursor, and its late writes lose to the newer projection', async () => {
    const store = new InMemoryCoreProjectionStore()
    const { client } = feedClient(EVENTS)

    // Worker A resumes after its lease has lapsed: it may still apply the event it
    // holds, but it can no longer move the shared cursor.
    const stalled = await runCoreProjection({ store, client, owner: 'worker-a', leaseTtlMs: 0, now: NOW, env: {} })
    expect(stalled).toMatchObject({ lease: 'acquired', interrupted: true, cursorAfter: 0 })
    expect(store.cursor).toBe(0)

    // Worker B takes the feed over and projects everything from the untouched cursor.
    const takeover = await runCoreProjection({ store, client, owner: 'worker-b', now: NOW, env: {} })
    expect(takeover).toMatchObject({ lease: 'acquired', cursorAfter: 6, interrupted: false })
    const projected = store.tenants.get('esnaf-1') as Record<string, unknown>
    expect((projected.core as Record<string, unknown>).lastEventId).toBe(6)

    // Worker A finally delivers an older event: the monotonic guard refuses it.
    expect(await projectEvent(store, EVENTS[2], NOW().toISOString(), {})).toBe('stale')
    expect(JSON.stringify(store.tenants.get('esnaf-1'))).toBe(JSON.stringify(projected))
    expect(await store.advanceCursor({ owner: 'worker-a', afterEventId: 3, at: NOW().toISOString() })).toBe('lease_lost')
    expect(store.cursor).toBe(6)
  })
})
