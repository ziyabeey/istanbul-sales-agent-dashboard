import { z } from 'zod'
import { isCoreCanaryTenant, legacyDurumForSubscriptionStatus } from './canary'
import { CORE_LEGACY_TENANT_PROVIDER, type CoreFeedEvent, type CorePlatformClient } from './coreClient'

/** Minimal env shape so tests can pass partial environments. */
export type EnvLike = Record<string, string | undefined>

/**
 * KC-05: Core -> Firestore one-way projection.
 *
 * A durable job reads `core_read_change_feed` from a stored cursor and writes
 * the derived read model onto the legacy tenant document (`esnaflar/{id}.core`).
 * Nothing here decides authorization (K04 §11): the projection may be stale
 * or deliberately paused and every authority decision still comes from Core.
 * Writes are deterministic merges keyed by event order, so replaying the
 * feed from any earlier cursor converges to the same state.
 */
export interface CoreBusinessIndexEntry {
  esnafId: string | null
  slug: string | null
  updatedAt: string
}

export interface CoreProjectionStore {
  getCursor(): Promise<number>
  setCursor(afterEventId: number, at: string): Promise<void>
  getBusinessIndex(businessId: string): Promise<CoreBusinessIndexEntry | null>
  setBusinessIndex(businessId: string, entry: CoreBusinessIndexEntry): Promise<void>
  /** Fallback lookup on the legacy collection (KC-03 shadow field). */
  findEsnafIdByBusinessId(businessId: string): Promise<string | null>
  /** Deep-merge write onto `esnaflar/{esnafId}`. */
  mergeTenantProjection(esnafId: string, patch: Record<string, unknown>): Promise<void>
  recordOrphan(event: CoreFeedEvent, reason: string): Promise<void>
}

export class InMemoryCoreProjectionStore implements CoreProjectionStore {
  cursor = 0
  cursorUpdatedAt: string | null = null
  readonly index = new Map<string, CoreBusinessIndexEntry>()
  readonly tenants = new Map<string, Record<string, unknown>>()
  readonly orphans: Array<{ event: CoreFeedEvent; reason: string }> = []
  constructor(readonly shadowByBusinessId: Map<string, string> = new Map()) {}
  async getCursor(): Promise<number> { return this.cursor }
  async setCursor(afterEventId: number, at: string): Promise<void> { this.cursor = afterEventId; this.cursorUpdatedAt = at }
  async getBusinessIndex(businessId: string): Promise<CoreBusinessIndexEntry | null> { return this.index.get(businessId) ?? null }
  async setBusinessIndex(businessId: string, entry: CoreBusinessIndexEntry): Promise<void> { this.index.set(businessId, entry) }
  async findEsnafIdByBusinessId(businessId: string): Promise<string | null> { return this.shadowByBusinessId.get(businessId) ?? null }
  async mergeTenantProjection(esnafId: string, patch: Record<string, unknown>): Promise<void> {
    this.tenants.set(esnafId, deepMerge(this.tenants.get(esnafId) ?? {}, patch))
  }
  async recordOrphan(event: CoreFeedEvent, reason: string): Promise<void> { this.orphans.push({ event, reason }) }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

/** Firestore `set(..., { merge: true })` semantics for the in-memory store. */
export function deepMerge(base: Record<string, unknown>, patch: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...base }
  for (const [key, value] of Object.entries(patch)) {
    out[key] = isPlainObject(value) && isPlainObject(out[key]) ? deepMerge(out[key] as Record<string, unknown>, value) : value
  }
  return out
}

const EntitlementChangeSchema = z.object({
  entitlement_key: z.string(),
  granted: z.boolean(),
  limit_value: z.number().int().nullable().optional(),
  valid_until: z.string().nullable().optional(),
})

const SubscriptionPayloadSchema = z.object({
  status: z.enum(['trial', 'active', 'past_due', 'cancelled']),
  current_period_start: z.string().nullable().optional(),
  current_period_end: z.string().nullable().optional(),
  entitlements: z.array(EntitlementChangeSchema).nullable().optional(),
})

const EntitlementPayloadSchema = z.object({
  entitlement_key: z.string(),
  limit_value: z.number().int().nullable().optional(),
  valid_until: z.string().nullable().optional(),
})

const TenantAliasPayloadSchema = z.object({ provider: z.string(), external_id: z.string() })
const ProvisionPayloadSchema = z.object({ slug: z.string().optional(), name: z.string().optional(), owner_user_id: z.string().optional() })

export interface ProjectionReport {
  startedAt: string
  finishedAt: string
  cursorBefore: number
  cursorAfter: number
  fetched: number
  applied: number
  orphans: number
  hasMore: boolean
  /** Age of the newest projected event when the job ran (ms), or null when nothing was fetched. */
  lagMs: number | null
}

export interface ProjectionRunInput {
  store: CoreProjectionStore
  client: CorePlatformClient
  limit?: number
  now?: () => Date
  env?: EnvLike
}

function entitlementPatch(changes: Array<z.infer<typeof EntitlementChangeSchema>>, eventId: number): Record<string, unknown> {
  const patch: Record<string, unknown> = {}
  for (const change of changes) {
    patch[change.entitlement_key] = {
      granted: change.granted,
      limitValue: change.limit_value ?? null,
      validUntil: change.valid_until ?? null,
      eventId,
    }
  }
  return patch
}

async function resolveEsnafId(store: CoreProjectionStore, event: CoreFeedEvent, now: string): Promise<{ esnafId: string | null; slug: string | null }> {
  const indexed = await store.getBusinessIndex(event.business_id)
  let esnafId = indexed?.esnafId ?? null
  let slug = indexed?.slug ?? null

  if (event.event_type === 'business_provisioned') {
    const payload = ProvisionPayloadSchema.safeParse(event.payload)
    if (payload.success && payload.data.slug) slug = payload.data.slug
  }
  if (event.event_type === 'tenant_alias_linked') {
    const payload = TenantAliasPayloadSchema.safeParse(event.payload)
    if (payload.success && payload.data.provider === CORE_LEGACY_TENANT_PROVIDER) esnafId = payload.data.external_id
  }
  if (!esnafId) esnafId = await store.findEsnafIdByBusinessId(event.business_id)

  if (esnafId !== (indexed?.esnafId ?? null) || slug !== (indexed?.slug ?? null)) {
    await store.setBusinessIndex(event.business_id, { esnafId, slug, updatedAt: now })
  }
  return { esnafId, slug }
}

export async function projectEvent(store: CoreProjectionStore, event: CoreFeedEvent, now: string, env: EnvLike = process.env): Promise<'applied' | 'indexed' | 'orphan'> {
  const { esnafId, slug } = await resolveEsnafId(store, event, now)
  if (!esnafId) {
    // ProvisionBusiness emits business_provisioned before tenant_alias_linked:
    // the slug is indexed now and written to the tenant with the alias event.
    if (event.event_type === 'business_provisioned') return 'indexed'
    await store.recordOrphan(event, 'no legacy tenant for business_id')
    return 'orphan'
  }

  const base: Record<string, unknown> = {
    core: {
      businessId: event.business_id,
      ...(slug ? { slug } : {}),
      lastEventId: event.event_id,
      projectedAt: now,
    },
  }
  const patch: Record<string, unknown> = base

  if (event.event_type === 'subscription_changed') {
    const payload = SubscriptionPayloadSchema.safeParse(event.payload)
    if (!payload.success) {
      await store.recordOrphan(event, 'malformed subscription payload')
      return 'orphan'
    }
    const core = patch.core as Record<string, unknown>
    core.subscription = {
      planKey: event.plan_key,
      status: payload.data.status,
      currentPeriodStart: payload.data.current_period_start ?? null,
      currentPeriodEnd: payload.data.current_period_end ?? null,
      policyVersion: event.policy_version,
      eventId: event.event_id,
      updatedAt: event.created_at,
    }
    if (payload.data.entitlements) core.entitlements = entitlementPatch(payload.data.entitlements, event.event_id)
    if (isCoreCanaryTenant(esnafId, env)) {
      // Canary: the legacy root field is a projection of Core, never an authority.
      patch.durum = legacyDurumForSubscriptionStatus(payload.data.status)
      patch.durumKaynak = 'core-projection'
    }
  } else if (event.event_type === 'entitlement_granted' || event.event_type === 'entitlement_revoked') {
    const payload = EntitlementPayloadSchema.safeParse(event.payload)
    if (!payload.success) {
      await store.recordOrphan(event, 'malformed entitlement payload')
      return 'orphan'
    }
    ;(patch.core as Record<string, unknown>).entitlements = entitlementPatch(
      [{ entitlement_key: payload.data.entitlement_key, granted: event.event_type === 'entitlement_granted', limit_value: payload.data.limit_value ?? null, valid_until: payload.data.valid_until ?? null }],
      event.event_id
    )
  }

  await store.mergeTenantProjection(esnafId, patch)
  return 'applied'
}

export async function runCoreProjection(input: ProjectionRunInput): Promise<ProjectionReport> {
  const now = input.now ?? (() => new Date())
  const limit = Math.min(Math.max(input.limit ?? 100, 1), 100)
  const cursorBefore = await input.store.getCursor()
  const report: ProjectionReport = {
    startedAt: now().toISOString(),
    finishedAt: '',
    cursorBefore,
    cursorAfter: cursorBefore,
    fetched: 0,
    applied: 0,
    orphans: 0,
    hasMore: false,
    lagMs: null,
  }

  const page = await input.client.readChangeFeed({ afterEventId: cursorBefore, limit })
  report.fetched = page.events.length
  report.hasMore = page.has_more

  for (const event of page.events) {
    const at = now().toISOString()
    const outcome = await projectEvent(input.store, event, at, input.env)
    if (outcome === 'orphan') report.orphans++
    else report.applied++
    await input.store.setCursor(event.event_id, at)
    report.cursorAfter = event.event_id
    report.lagMs = Math.max(0, now().getTime() - new Date(event.created_at).getTime())
  }

  report.finishedAt = now().toISOString()
  return report
}
