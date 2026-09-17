import { z } from 'zod'
import { ayarlarPatchForEntitlementChanges, isCoreCanaryTenant, legacyDurumForSubscriptionStatus } from './canary'
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
 *
 * Concurrency (R1 KC-05 blocker 5): a run holds a durable single lease, the
 * global cursor only ever moves forward under that lease, and every tenant
 * write is guarded by the stored `core.lastEventId`. An overlapping or
 * resumed-after-pause worker therefore cannot overwrite a newer projection
 * nor leave the cursor ahead of what was applied.
 */
export const CORE_PROJECTION_LEASE_TTL_MS = 60_000

export interface CoreBusinessIndexEntry {
  esnafId: string | null
  slug: string | null
  updatedAt: string
}

export type LeaseAcquisition = { ok: true } | { ok: false; heldBy: string | null; expiresAt: string | null }
export type CursorAdvance = 'advanced' | 'stale' | 'lease_lost'
export type TenantWrite = 'applied' | 'stale'

export interface CoreProjectionStore {
  /** Durable single lease; an unexpired lease held by another owner refuses the run. */
  acquireLease(input: { owner: string; now: Date; ttlMs: number }): Promise<LeaseAcquisition>
  releaseLease(owner: string): Promise<void>
  getCursor(): Promise<number>
  /** Monotonic and lease-guarded: never moves backwards, never writes for a lost lease. */
  advanceCursor(input: { owner: string; afterEventId: number; at: string }): Promise<CursorAdvance>
  getBusinessIndex(businessId: string): Promise<CoreBusinessIndexEntry | null>
  setBusinessIndex(businessId: string, entry: CoreBusinessIndexEntry): Promise<void>
  /** Fallback lookup on the legacy collection (KC-03 shadow field). */
  findEsnafIdByBusinessId(businessId: string): Promise<string | null>
  /** Deep-merge write onto `esnaflar/{esnafId}`, refused when `core.lastEventId` is already newer. */
  mergeTenantProjection(esnafId: string, patch: Record<string, unknown>, input: { eventId: number }): Promise<TenantWrite>
  recordOrphan(event: CoreFeedEvent, reason: string): Promise<void>
}

export class InMemoryCoreProjectionStore implements CoreProjectionStore {
  cursor = 0
  cursorUpdatedAt: string | null = null
  leaseOwner: string | null = null
  leaseExpiresAt: string | null = null
  readonly index = new Map<string, CoreBusinessIndexEntry>()
  readonly tenants = new Map<string, Record<string, unknown>>()
  readonly orphans: Array<{ event: CoreFeedEvent; reason: string }> = []
  constructor(readonly shadowByBusinessId: Map<string, string> = new Map()) {}

  async acquireLease(input: { owner: string; now: Date; ttlMs: number }): Promise<LeaseAcquisition> {
    const live = this.leaseOwner && this.leaseExpiresAt && new Date(this.leaseExpiresAt).getTime() > input.now.getTime()
    if (live && this.leaseOwner !== input.owner) return { ok: false, heldBy: this.leaseOwner, expiresAt: this.leaseExpiresAt }
    this.leaseOwner = input.owner
    this.leaseExpiresAt = new Date(input.now.getTime() + input.ttlMs).toISOString()
    return { ok: true }
  }

  async releaseLease(owner: string): Promise<void> {
    if (this.leaseOwner === owner) {
      this.leaseOwner = null
      this.leaseExpiresAt = null
    }
  }

  async getCursor(): Promise<number> { return this.cursor }

  async advanceCursor(input: { owner: string; afterEventId: number; at: string }): Promise<CursorAdvance> {
    const expired = !this.leaseExpiresAt || new Date(this.leaseExpiresAt).getTime() <= new Date(input.at).getTime()
    if (this.leaseOwner !== input.owner || expired) return 'lease_lost'
    if (input.afterEventId <= this.cursor) return 'stale'
    this.cursor = input.afterEventId
    this.cursorUpdatedAt = input.at
    return 'advanced'
  }

  async getBusinessIndex(businessId: string): Promise<CoreBusinessIndexEntry | null> { return this.index.get(businessId) ?? null }
  async setBusinessIndex(businessId: string, entry: CoreBusinessIndexEntry): Promise<void> { this.index.set(businessId, entry) }
  async findEsnafIdByBusinessId(businessId: string): Promise<string | null> { return this.shadowByBusinessId.get(businessId) ?? null }

  async mergeTenantProjection(esnafId: string, patch: Record<string, unknown>, input: { eventId: number }): Promise<TenantWrite> {
    const current = this.tenants.get(esnafId) ?? {}
    const last = (current.core as Record<string, unknown> | undefined)?.lastEventId
    if (typeof last === 'number' && last >= input.eventId) return 'stale'
    this.tenants.set(esnafId, deepMerge(current, patch))
    return 'applied'
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
  owner: string
  lease: 'acquired' | 'busy'
  heldBy: string | null
  cursorBefore: number
  cursorAfter: number
  fetched: number
  applied: number
  /** Events skipped because a newer projection already exists for that tenant. */
  stale: number
  orphans: number
  hasMore: boolean
  /** The lease was taken over mid-run: the worker stopped instead of clobbering. */
  interrupted: boolean
  /** Age of the newest projected event when the job ran (ms), or null when nothing was fetched. */
  lagMs: number | null
}

export interface ProjectionRunInput {
  store: CoreProjectionStore
  client: CorePlatformClient
  limit?: number
  now?: () => Date
  env?: EnvLike
  /** Worker identity for the durable lease. */
  owner?: string
  leaseTtlMs?: number
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

export async function projectEvent(
  store: CoreProjectionStore,
  event: CoreFeedEvent,
  now: string,
  env: EnvLike = process.env
): Promise<'applied' | 'indexed' | 'orphan' | 'stale'> {
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
  const canary = isCoreCanaryTenant(esnafId, env)

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
    if (canary) {
      // Canary: the legacy root fields are a projection of Core, never an authority.
      patch.durum = legacyDurumForSubscriptionStatus(payload.data.status)
      patch.durumKaynak = 'core-projection'
      // R1 KC-05 blocker 1: paid `ayarlar.*` flags are derived from Core
      // entitlements here, not from the legacy `paket` value at payment time.
      if (payload.data.entitlements) Object.assign(patch, prefixedAyarlar(ayarlarPatchForEntitlementChanges(payload.data.entitlements)))
    }
  } else if (event.event_type === 'entitlement_granted' || event.event_type === 'entitlement_revoked') {
    const payload = EntitlementPayloadSchema.safeParse(event.payload)
    if (!payload.success) {
      await store.recordOrphan(event, 'malformed entitlement payload')
      return 'orphan'
    }
    const change = {
      entitlement_key: payload.data.entitlement_key,
      granted: event.event_type === 'entitlement_granted',
      limit_value: payload.data.limit_value ?? null,
      valid_until: payload.data.valid_until ?? null,
    }
    ;(patch.core as Record<string, unknown>).entitlements = entitlementPatch([change], event.event_id)
    if (canary) Object.assign(patch, prefixedAyarlar(ayarlarPatchForEntitlementChanges([change])))
  }

  return store.mergeTenantProjection(esnafId, patch, { eventId: event.event_id })
}

/** `ayarlar.x` dotted paths so a merge never replaces the whole settings map. */
function prefixedAyarlar(flags: Record<string, boolean>): Record<string, boolean> {
  const out: Record<string, boolean> = {}
  for (const [key, value] of Object.entries(flags)) out[`ayarlar.${key}`] = value
  return out
}

export async function runCoreProjection(input: ProjectionRunInput): Promise<ProjectionReport> {
  const now = input.now ?? (() => new Date())
  const limit = Math.min(Math.max(input.limit ?? 100, 1), 100)
  const owner = input.owner ?? 'core-projection'
  const ttlMs = input.leaseTtlMs ?? CORE_PROJECTION_LEASE_TTL_MS
  const report: ProjectionReport = {
    startedAt: now().toISOString(),
    finishedAt: '',
    owner,
    lease: 'busy',
    heldBy: null,
    cursorBefore: 0,
    cursorAfter: 0,
    fetched: 0,
    applied: 0,
    stale: 0,
    orphans: 0,
    hasMore: false,
    interrupted: false,
    lagMs: null,
  }

  const lease = await input.store.acquireLease({ owner, now: now(), ttlMs })
  if (!lease.ok) {
    // Another worker owns the feed: do nothing rather than race it.
    report.heldBy = lease.heldBy
    report.finishedAt = now().toISOString()
    return report
  }
  report.lease = 'acquired'

  try {
    const cursorBefore = await input.store.getCursor()
    report.cursorBefore = cursorBefore
    report.cursorAfter = cursorBefore

    const page = await input.client.readChangeFeed({ afterEventId: cursorBefore, limit })
    report.fetched = page.events.length
    report.hasMore = page.has_more

    for (const event of page.events) {
      const at = now().toISOString()
      const outcome = await projectEvent(input.store, event, at, input.env)
      if (outcome === 'orphan') report.orphans++
      else if (outcome === 'stale') report.stale++
      else report.applied++

      const advanced = await input.store.advanceCursor({ owner, afterEventId: event.event_id, at })
      if (advanced === 'lease_lost') {
        // The lease was taken over (or expired): stop instead of dragging the
        // cursor past a newer worker's position.
        report.interrupted = true
        break
      }
      if (advanced === 'advanced') report.cursorAfter = event.event_id
      report.lagMs = Math.max(0, now().getTime() - new Date(event.created_at).getTime())
    }
  } finally {
    if (!report.interrupted) await input.store.releaseLease(owner)
  }

  report.finishedAt = now().toISOString()
  return report
}
