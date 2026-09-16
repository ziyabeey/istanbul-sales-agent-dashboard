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

    expect(report).toMatchObject({ cursorBefore: 0, cursorAfter: 6, fetched: 6, applied: 6, orphans: 0, hasMore: false, lagMs: 10_000 })
    expect(store.index.get(BIZ)).toMatchObject({ esnafId: 'esnaf-1', slug: 'kepenk-berber' })

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
  })

  it('is idempotent: replaying from an earlier cursor converges to the same state', async () => {
    const store = new InMemoryCoreProjectionStore()
    const { client } = feedClient(EVENTS)
    await runCoreProjection({ store, client, now: NOW, env: {} })
    const first = JSON.stringify(store.tenants.get('esnaf-1'))

    store.cursor = 0
    await runCoreProjection({ store, client, now: NOW, env: {} })
    expect(JSON.stringify(store.tenants.get('esnaf-1'))).toBe(first)
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

  it('writes the legacy durum only for canary tenants and only as a projection of Core status', async () => {
    const store = new InMemoryCoreProjectionStore()
    const { client } = feedClient(EVENTS.slice(0, 3))
    await runCoreProjection({ store, client, now: NOW, env: { CORE_CANARY_TENANTS: 'esnaf-1, esnaf-9' } })
    const tenant = store.tenants.get('esnaf-1') as Record<string, unknown>
    expect(tenant.durum).toBe('aktif')
    expect(tenant.durumKaynak).toBe('core-projection')
    expect(tenant.paket).toBeUndefined()

    await projectEvent(store, EVENTS[5], NOW().toISOString(), { CORE_CANARY_TENANTS: 'esnaf-1' })
    expect((store.tenants.get('esnaf-1') as Record<string, unknown>).durum).toBe('pasif')
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
