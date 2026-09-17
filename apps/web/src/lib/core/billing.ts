import { z } from 'zod'
import { CORE_LEGACY_TENANT_PROVIDER, coreIdempotencyKey, type CorePlatformClient } from './coreClient'
import { CorePlatformError } from './errors'

/**
 * KC-04: Kepenk Billing -> Core command path.
 *
 * A server-verified provider payment (never a client claim) becomes exactly
 * one ChangeSubscription command whose idempotency key derives from the
 * provider event id. The event is persisted to a durable outbox with an
 * atomic create-if-absent before any network call, so a timeout is recovered
 * with the same key (K03 rule), a concurrent first callback for the same
 * payment converges on one canonical stored event (R1 KC-04 blocker 3), a
 * replay never produces a second subscription event, and the target business
 * is the Core tenant alias, cross-checked against the Firestore shadow
 * (missing alias -> deferred, shadow disagreement -> fail closed; R1 KC-04
 * blocker 2). Plan -> entitlement derivation lives in Core; Kepenk only
 * names the plan key.
 */
export const KEPENK_LAUNCH_PLAN_KEY = 'kepenk_standard'

/** One launch package: every legacy paket code maps to the same plan key (KC-00 product decision). */
export const PAKET_TO_PLAN_KEY: Readonly<Record<string, string>> = {
  TEMEL: KEPENK_LAUNCH_PLAN_KEY,
  STANDART: KEPENK_LAUNCH_PLAN_KEY,
  BUYUME: KEPENK_LAUNCH_PLAN_KEY,
  PREMIUM: KEPENK_LAUNCH_PLAN_KEY,
  PREMIUMPLUS: KEPENK_LAUNCH_PLAN_KEY,
}

export type BillingInterval = 'monthly' | 'annual'
/** The current İyzico checkout sells yearly packages ("Yıllık"). */
export const KEPENK_DEFAULT_BILLING_INTERVAL: BillingInterval = 'annual'

export const VerifiedPaymentEventSchema = z.object({
  provider: z.literal('iyzico'),
  paymentId: z.string().min(1).max(128),
  conversationId: z.string().min(1).max(256),
  esnafId: z.string().min(1).max(128),
  paket: z.string().min(1).max(32),
  paidAt: z.string().datetime(),
  billingInterval: z.enum(['monthly', 'annual']),
  amountMinor: z.number().int().nonnegative().nullable().optional(),
  currency: z.string().length(3).nullable().optional(),
})
export type VerifiedPaymentEvent = z.infer<typeof VerifiedPaymentEventSchema>

export function billingIdempotencyKey(event: Pick<VerifiedPaymentEvent, 'provider' | 'paymentId'>): string {
  return coreIdempotencyKey(`kc04-${event.provider}`, event.paymentId)
}

export function planKeyForPaket(paket: string): string | null {
  return PAKET_TO_PLAN_KEY[String(paket ?? '').toUpperCase()] ?? null
}

function addMonthsUtc(iso: string, months: number): string {
  const date = new Date(iso)
  const day = date.getUTCDate()
  const target = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + months, 1, date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds()))
  const lastDay = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0)).getUTCDate()
  target.setUTCDate(Math.min(day, lastDay))
  return target.toISOString()
}

export function subscriptionPeriod(paidAt: string, interval: BillingInterval): { start: string; end: string } {
  return { start: new Date(paidAt).toISOString(), end: addMonthsUtc(paidAt, interval === 'annual' ? 12 : 1) }
}

export type BillingOutboxStatus = 'pending' | 'deferred' | 'applied' | 'conflict' | 'failed'

export interface BillingOutboxRecord {
  key: string
  event: VerifiedPaymentEvent
  businessId: string | null
  status: BillingOutboxStatus
  attempts: number
  lastError: string | null
  nextAttemptAt: string | null
  createdAt: string
  updatedAt: string
  result: { eventId: number; version: number } | null
  /** Firestore shadow disagreed with the Core tenant alias: operator drift signal, never applied. */
  drift?: { shadowBusinessId: string; coreBusinessId: string } | null
}

export interface BillingOutboxStore {
  get(key: string): Promise<BillingOutboxRecord | null>
  /** Atomic create-if-absent: the first writer wins, every later writer sees 'exists'. */
  create(record: BillingOutboxRecord): Promise<'created' | 'exists'>
  put(record: BillingOutboxRecord): Promise<void>
  listDue(input: { now: Date; limit: number }): Promise<BillingOutboxRecord[]>
}

/** Canonical business routing for a legacy tenant: Core tenant alias is authority, the shadow is only cross-checked. */
export interface BusinessRouting {
  coreBusinessId: string | null
  shadowBusinessId: string | null
}

export async function resolveCoreBusinessAlias(client: Pick<CorePlatformClient, 'resolveTenantAliases'>, esnafId: string): Promise<string | null> {
  const aliases = await client.resolveTenantAliases(CORE_LEGACY_TENANT_PROVIDER, [esnafId])
  return aliases.find((alias) => alias.external_id === esnafId)?.business_id ?? null
}

export class InMemoryBillingOutboxStore implements BillingOutboxStore {
  readonly records = new Map<string, BillingOutboxRecord>()
  async get(key: string): Promise<BillingOutboxRecord | null> {
    const record = this.records.get(key)
    return record ? { ...record } : null
  }
  async create(record: BillingOutboxRecord): Promise<'created' | 'exists'> {
    if (this.records.has(record.key)) return 'exists'
    this.records.set(record.key, { ...record })
    return 'created'
  }
  async put(record: BillingOutboxRecord): Promise<void> {
    this.records.set(record.key, { ...record })
  }
  async listDue(input: { now: Date; limit: number }): Promise<BillingOutboxRecord[]> {
    return [...this.records.values()]
      .filter((r) => (r.status === 'pending' || r.status === 'deferred') && (!r.nextAttemptAt || new Date(r.nextAttemptAt) <= input.now))
      .slice(0, input.limit)
      .map((r) => ({ ...r }))
  }
}

export const ChangeSubscriptionResultSchema = z.object({
  business_id: z.string().uuid(),
  plan_key: z.string(),
  status: z.string(),
  version: z.number().int(),
  event_id: z.number().int(),
  policy_version: z.number().int(),
})

export interface ApplyPaymentDeps {
  store: BillingOutboxStore
  client: CorePlatformClient
  /** Canonical routing: Core tenant alias (authority) + Firestore shadow (cross-check only). */
  resolveBusinessRouting: (esnafId: string) => Promise<BusinessRouting>
  now?: () => Date
}

export type ApplyPaymentOutcome = { key: string; status: BillingOutboxStatus; businessId: string | null }

export function retryBackoffMs(attempts: number): number {
  return Math.min(30_000 * 2 ** Math.max(attempts - 1, 0), 60 * 60 * 1000)
}

export function newOutboxRecord(event: VerifiedPaymentEvent, at: string): BillingOutboxRecord {
  return { key: billingIdempotencyKey(event), event, businessId: null, status: 'pending', attempts: 0, lastError: null, nextAttemptAt: null, createdAt: at, updatedAt: at, result: null, drift: null }
}

/**
 * Durably records the verified payment first (atomic create-if-absent), then
 * tries to apply it to Core. A concurrent first callback that loses the
 * create re-reads the canonical stored event, so one key always carries one
 * payload (period derived from the stored paidAt, never from the caller's
 * clock) and Core sees one commercial event.
 */
export async function applyVerifiedPayment(deps: ApplyPaymentDeps, eventInput: VerifiedPaymentEvent): Promise<ApplyPaymentOutcome> {
  const event = VerifiedPaymentEventSchema.parse(eventInput)
  const now = deps.now ?? (() => new Date())
  const key = billingIdempotencyKey(event)

  let record = await deps.store.get(key)
  if (!record) {
    const fresh = newOutboxRecord(event, now().toISOString())
    const created = await deps.store.create(fresh)
    record = created === 'created' ? fresh : ((await deps.store.get(key)) ?? fresh)
  }
  if (record.status === 'applied') return { key, status: 'applied', businessId: record.businessId }
  if (record.status === 'conflict') return { key, status: 'conflict', businessId: record.businessId }
  return attempt(deps, record, now)
}

async function attempt(deps: ApplyPaymentDeps, record: BillingOutboxRecord, now: () => Date): Promise<ApplyPaymentOutcome> {
  const save = async (patch: Partial<BillingOutboxRecord>) => {
    record = { ...record, ...patch, updatedAt: now().toISOString() }
    await deps.store.put(record)
  }

  const planKey = planKeyForPaket(record.event.paket)
  if (!planKey) {
    await save({ status: 'failed', lastError: 'UNKNOWN_PAKET', attempts: record.attempts + 1 })
    return { key: record.key, status: 'failed', businessId: record.businessId }
  }

  let businessId = record.businessId
  if (!businessId) {
    const routing = await deps.resolveBusinessRouting(record.event.esnafId)
    if (!routing.coreBusinessId) {
      // No Core tenant alias yet (KC-03 has not linked this tenant): the shadow alone never routes money.
      await save({ status: 'deferred', lastError: 'BUSINESS_NOT_LINKED', attempts: record.attempts + 1, nextAttemptAt: new Date(now().getTime() + retryBackoffMs(record.attempts + 1)).toISOString() })
      return { key: record.key, status: 'deferred', businessId: null }
    }
    if (routing.shadowBusinessId && routing.shadowBusinessId.toLowerCase() !== routing.coreBusinessId.toLowerCase()) {
      // Stale or foreign shadow: fail closed with a drift signal instead of moving a payment to the wrong business.
      await save({ status: 'failed', lastError: 'BUSINESS_SHADOW_MISMATCH', attempts: record.attempts + 1, nextAttemptAt: null, drift: { shadowBusinessId: routing.shadowBusinessId, coreBusinessId: routing.coreBusinessId } })
      return { key: record.key, status: 'failed', businessId: null }
    }
    businessId = routing.coreBusinessId
  }

  const period = subscriptionPeriod(record.event.paidAt, record.event.billingInterval)
  try {
    const result = await deps.client.applyCommand(
      {
        idempotencyKey: record.key,
        command: 'ChangeSubscription',
        payload: {
          business_id: businessId,
          plan_key: planKey,
          status: 'active',
          current_period_start: period.start,
          current_period_end: period.end,
          source: {
            provider: record.event.provider,
            event_id: record.event.paymentId,
            conversation_id: record.event.conversationId,
            paket: record.event.paket,
            billing_interval: record.event.billingInterval,
          },
        },
      },
      ChangeSubscriptionResultSchema
    )
    await save({ status: 'applied', businessId, attempts: record.attempts + 1, lastError: null, nextAttemptAt: null, result: { eventId: result.event_id, version: result.version } })
    return { key: record.key, status: 'applied', businessId }
  } catch (error) {
    const attempts = record.attempts + 1
    if (error instanceof CorePlatformError) {
      if (error.code === 'PLATFORM_IDEMPOTENCY_CONFLICT') {
        await save({ status: 'conflict', businessId, attempts, lastError: error.code, nextAttemptAt: null })
        return { key: record.key, status: 'conflict', businessId }
      }
      if (error.retryable) {
        await save({ status: 'pending', businessId, attempts, lastError: error.code, nextAttemptAt: new Date(now().getTime() + retryBackoffMs(attempts)).toISOString() })
        return { key: record.key, status: 'pending', businessId }
      }
      await save({ status: 'failed', businessId, attempts, lastError: error.code, nextAttemptAt: null })
      return { key: record.key, status: 'failed', businessId }
    }
    await save({ status: 'pending', businessId, attempts, lastError: 'UNEXPECTED', nextAttemptAt: new Date(now().getTime() + retryBackoffMs(attempts)).toISOString() })
    return { key: record.key, status: 'pending', businessId }
  }
}

export interface OutboxRunReport {
  processed: number
  applied: number
  deferred: number
  pending: number
  conflict: number
  failed: number
}

/** Re-drives pending/deferred records with their original keys (never new ones). */
export async function processBillingOutbox(deps: ApplyPaymentDeps, input: { limit?: number } = {}): Promise<OutboxRunReport> {
  const now = deps.now ?? (() => new Date())
  const report: OutboxRunReport = { processed: 0, applied: 0, deferred: 0, pending: 0, conflict: 0, failed: 0 }
  const due = await deps.store.listDue({ now: now(), limit: Math.min(Math.max(input.limit ?? 25, 1), 200) })
  for (const record of due) {
    report.processed++
    const outcome = await attempt(deps, record, now)
    report[outcome.status]++
  }
  return report
}
