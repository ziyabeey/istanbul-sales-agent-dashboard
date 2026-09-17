import type { Firestore } from 'firebase-admin/firestore'
import { isSameOriginMutation } from '../apiGuard'
import { ProvisionResultSchema } from './backfill'
import { readCookie, verifyCoreCsrf } from './bffSession'
import { ChangeSubscriptionResultSchema, KEPENK_LAUNCH_PLAN_KEY, retryBackoffMs } from './billing'
import { CORE_BFF_SESSION_COOKIE } from './config'
import { CORE_LEGACY_TENANT_PROVIDER, coreIdempotencyKey, type CorePlatformClient } from './coreClient'
import { CorePlatformError } from './errors'
import { resolveCoreRequestContext, type CoreContextDeps } from './requestContext'
import { decideBusinessSlug } from './slug'

/** Minimal env shape so tests can pass partial environments. */
export type EnvLike = Record<string, string | undefined>

/**
 * KC-05: onboarding writes the canonical Core.
 *
 * A request that presents a Core BFF session must pass the same Origin +
 * CSRF + standard-session gate as every other Core mutation (R1 blocker 2)
 * and the check runs before any tenant is created. The Core intent is then
 * persisted as a durable saga (R1 blocker 3): ProvisionBusiness + the tester
 * trial ChangeSubscription carry stable idempotency keys and a stable trial
 * period, and a lost response is re-driven by replaying the stored payload,
 * so a retry never creates a second business, a second trial event or a
 * different period. Without a Core session the legacy path continues
 * unchanged and KC-03 backfill links the tenant later.
 */
export const CORE_TRIAL_DAYS_DEFAULT = 90

export function coreTrialDays(env: EnvLike = process.env): number {
  const parsed = Number.parseInt(env.CORE_TRIAL_DAYS ?? '', 10)
  return Number.isInteger(parsed) && parsed > 0 && parsed <= 365 ? parsed : CORE_TRIAL_DAYS_DEFAULT
}

export function isCoreOnboardingEnabled(env: EnvLike = process.env): boolean {
  return env.CORE_ONBOARDING_ENABLED === 'true'
}

// ---------------------------------------------------------------------------
// Gate
// ---------------------------------------------------------------------------
export type OnboardingGateRejection =
  | 'ORIGIN_REJECTED'
  | 'CSRF_REJECTED'
  | 'SESSION_INVALID'
  | 'SESSION_CLASS_UNVERIFIED'
  | 'RECOVERY_REQUIRED'
  | 'CORE_UNAVAILABLE'

export type OnboardingCoreGate =
  | { mode: 'disabled' }
  /** No Core BFF session presented: the intentional legacy onboarding path. */
  | { mode: 'legacy' }
  | { mode: 'core'; userId: string }
  /** A Core session was presented but the mutation gate failed: no tenant, no command. */
  | { mode: 'rejected'; reason: OnboardingGateRejection; status: 401 | 403 | 503 }

export async function resolveOnboardingCoreGate(request: Request, deps: CoreContextDeps | null, env: EnvLike = process.env): Promise<OnboardingCoreGate> {
  if (!isCoreOnboardingEnabled(env)) return { mode: 'disabled' }
  if (!readCookie(request, CORE_BFF_SESSION_COOKIE)) return { mode: 'legacy' }
  if (!deps) return { mode: 'rejected', reason: 'CORE_UNAVAILABLE', status: 503 }
  if (!isSameOriginMutation(request)) return { mode: 'rejected', reason: 'ORIGIN_REJECTED', status: 403 }
  if (!verifyCoreCsrf(request)) return { mode: 'rejected', reason: 'CSRF_REJECTED', status: 403 }

  const resolved = await resolveCoreRequestContext(request, deps)
  if (!resolved.ok) {
    if (resolved.reason === 'CORE_UNAVAILABLE') return { mode: 'rejected', reason: 'CORE_UNAVAILABLE', status: 503 }
    if (resolved.reason === 'SESSION_CLASS_UNVERIFIED') return { mode: 'rejected', reason: 'SESSION_CLASS_UNVERIFIED', status: 401 }
    if (resolved.reason === 'RECOVERY_REQUIRED') return { mode: 'rejected', reason: 'RECOVERY_REQUIRED', status: 403 }
    return { mode: 'rejected', reason: 'SESSION_INVALID', status: 401 }
  }
  if (resolved.context.recovery || resolved.context.sessionClass !== 'standard') {
    return { mode: 'rejected', reason: 'RECOVERY_REQUIRED', status: 403 }
  }
  return { mode: 'core', userId: resolved.context.userId }
}

// ---------------------------------------------------------------------------
// Durable saga
// ---------------------------------------------------------------------------
export type OnboardingSagaStatus = 'pending' | 'provisioned' | 'subscribed' | 'completed' | 'failed'

export interface OnboardingSagaRecord {
  esnafId: string
  ownerUserId: string
  name: string
  slug: string
  timezone: string
  /** Fixed at intent time; a redrive replays exactly this period. */
  trialStart: string
  trialEnd: string
  keys: { provision: string; trial: string }
  status: OnboardingSagaStatus
  businessId: string | null
  businessSlug: string | null
  created: boolean | null
  attempts: number
  lastError: string | null
  nextAttemptAt: string | null
  createdAt: string
  updatedAt: string
}

export interface OnboardingSagaStore {
  get(esnafId: string): Promise<OnboardingSagaRecord | null>
  /** Atomic create-if-absent: the stored intent is canonical for every later run. */
  create(record: OnboardingSagaRecord): Promise<'created' | 'exists'>
  put(record: OnboardingSagaRecord): Promise<void>
  listDue(input: { now: Date; limit: number }): Promise<OnboardingSagaRecord[]>
}

export const ONBOARDING_SAGA_OPEN_STATUSES: readonly OnboardingSagaStatus[] = ['pending', 'provisioned', 'subscribed']

export class InMemoryOnboardingSagaStore implements OnboardingSagaStore {
  readonly records = new Map<string, OnboardingSagaRecord>()
  async get(esnafId: string): Promise<OnboardingSagaRecord | null> {
    const record = this.records.get(esnafId)
    return record ? { ...record } : null
  }
  async create(record: OnboardingSagaRecord): Promise<'created' | 'exists'> {
    if (this.records.has(record.esnafId)) return 'exists'
    this.records.set(record.esnafId, { ...record })
    return 'created'
  }
  async put(record: OnboardingSagaRecord): Promise<void> {
    this.records.set(record.esnafId, { ...record })
  }
  async listDue(input: { now: Date; limit: number }): Promise<OnboardingSagaRecord[]> {
    return [...this.records.values()]
      .filter((r) => ONBOARDING_SAGA_OPEN_STATUSES.includes(r.status) && (!r.nextAttemptAt || new Date(r.nextAttemptAt) <= input.now))
      .slice(0, input.limit)
      .map((r) => ({ ...r }))
  }
}

export function newOnboardingSaga(input: {
  esnafId: string
  ownerUserId: string
  name: string
  slug: string
  timezone?: string
  now: Date
  env?: EnvLike
}): OnboardingSagaRecord {
  const at = input.now.toISOString()
  const trialEnd = new Date(input.now.getTime() + coreTrialDays(input.env ?? process.env) * 24 * 60 * 60 * 1000)
  return {
    esnafId: input.esnafId,
    ownerUserId: input.ownerUserId,
    name: input.name.trim(),
    slug: input.slug,
    timezone: input.timezone ?? 'Europe/Istanbul',
    trialStart: at,
    trialEnd: trialEnd.toISOString(),
    keys: { provision: coreIdempotencyKey('kc05-onboard', input.esnafId), trial: coreIdempotencyKey('kc05-trial', input.esnafId) },
    status: 'pending',
    businessId: null,
    businessSlug: null,
    created: null,
    attempts: 0,
    lastError: null,
    nextAttemptAt: null,
    createdAt: at,
    updatedAt: at,
  }
}

export type OnboardingCoreOutcome =
  | { status: 'invalid_slug'; candidate: string }
  | { status: 'provisioned'; businessId: string; slug: string; trialUntil: string; created: boolean }
  | { status: 'failed'; code: string; step: 'provision' | 'trial' | 'shadow'; retryable: boolean }

const NON_RETRYABLE_CODES = new Set<string>([
  'BUSINESS_SLUG_TAKEN',
  'INVALID_BUSINESS_NAME',
  'INVALID_BUSINESS_SLUG',
  'TENANT_ALIAS_CONFLICT',
  'TENANT_ALIAS_BUSINESS_TAKEN',
  'USER_NOT_FOUND',
  'INVALID_PLATFORM_PAYLOAD',
  'INVALID_PLATFORM_COMMAND',
  'INVALID_IDEMPOTENCY_KEY',
  'INVALID_SUBSCRIPTION_PERIOD',
  'INVALID_SUBSCRIPTION_STATUS',
  'PLAN_NOT_FOUND',
  'PLATFORM_IDEMPOTENCY_CONFLICT',
  'OWNER_MISMATCH',
])

export interface OnboardingSagaDeps {
  store: OnboardingSagaStore
  client: Pick<CorePlatformClient, 'applyCommand'>
  db: Firestore | null
  now?: () => Date
}

/** Runs (or re-drives) one saga from its stored state; every Core call replays the stored payload and key. */
export async function runOnboardingSaga(deps: OnboardingSagaDeps, record: OnboardingSagaRecord): Promise<OnboardingCoreOutcome> {
  const now = deps.now ?? (() => new Date())
  let current: OnboardingSagaRecord = { ...record }
  const save = async (patch: Partial<OnboardingSagaRecord>) => {
    current = { ...current, ...patch, updatedAt: now().toISOString() }
    await deps.store.put(current)
  }
  const fail = async (step: 'provision' | 'trial' | 'shadow', code: string): Promise<OnboardingCoreOutcome> => {
    const retryable = !NON_RETRYABLE_CODES.has(code)
    const attempts = current.attempts + 1
    await save({
      status: retryable ? current.status : 'failed',
      attempts,
      lastError: code,
      nextAttemptAt: retryable ? new Date(now().getTime() + retryBackoffMs(attempts)).toISOString() : null,
    })
    return { status: 'failed', step, code, retryable }
  }
  const errorCode = (error: unknown) => (error instanceof CorePlatformError ? error.code : 'UNEXPECTED')

  if (current.status === 'failed') {
    return { status: 'failed', step: current.businessId ? 'trial' : 'provision', code: current.lastError ?? 'FAILED', retryable: false }
  }

  if (current.status === 'pending') {
    let provisioned
    try {
      provisioned = await deps.client.applyCommand(
        {
          idempotencyKey: current.keys.provision,
          command: 'ProvisionBusiness',
          payload: {
            owner_user_id: current.ownerUserId,
            name: current.name,
            slug: current.slug,
            timezone: current.timezone,
            tenant_alias: { provider: CORE_LEGACY_TENANT_PROVIDER, external_id: current.esnafId },
          },
        },
        ProvisionResultSchema
      )
    } catch (error) {
      return fail('provision', errorCode(error))
    }
    // A business that already belonged to someone else is never bound to this tenant.
    if (!provisioned.membership_id) return fail('provision', 'OWNER_MISMATCH')
    await save({ status: 'provisioned', businessId: provisioned.business_id, businessSlug: provisioned.slug, created: provisioned.created, lastError: null, nextAttemptAt: null })
  }

  if (current.status === 'provisioned') {
    try {
      await deps.client.applyCommand(
        {
          idempotencyKey: current.keys.trial,
          command: 'ChangeSubscription',
          payload: {
            business_id: current.businessId,
            plan_key: KEPENK_LAUNCH_PLAN_KEY,
            status: 'trial',
            current_period_start: current.trialStart,
            current_period_end: current.trialEnd,
            source: { provider: 'kepenk-onboarding', event_id: current.esnafId },
          },
        },
        ChangeSubscriptionResultSchema
      )
    } catch (error) {
      return fail('trial', errorCode(error))
    }
    await save({ status: 'subscribed', lastError: null, nextAttemptAt: null })
  }

  if (current.status === 'subscribed') {
    if (deps.db) {
      try {
        await deps.db.collection('esnaflar').doc(current.esnafId).update({
          coreUserId: current.ownerUserId,
          coreBusinessId: current.businessId,
          coreBusinessSlug: current.businessSlug ?? current.slug,
          coreBusinessLinkedAt: current.trialStart,
          coreOnboarding: { status: 'provisioned', trialUntil: current.trialEnd, created: current.created ?? false },
        })
      } catch {
        return fail('shadow', 'FIRESTORE_WRITE_FAILED')
      }
    }
    await save({ status: 'completed', lastError: null, nextAttemptAt: null })
  }

  return {
    status: 'provisioned',
    businessId: current.businessId ?? '',
    slug: current.businessSlug ?? current.slug,
    trialUntil: current.trialEnd,
    created: current.created ?? false,
  }
}

export interface OnboardingCoreInput {
  ownerUserId: string
  client: Pick<CorePlatformClient, 'applyCommand'>
  store: OnboardingSagaStore
  db: Firestore | null
  esnafId: string
  name: string
  slug?: string | null
  timezone?: string
  now?: () => Date
  env?: EnvLike
}

/** Persists the onboarding intent first (create-if-absent), then runs the saga from the stored record. */
export async function provisionCoreForNewTenant(input: OnboardingCoreInput): Promise<OnboardingCoreOutcome> {
  const now = input.now ?? (() => new Date())
  const slug = decideBusinessSlug({ existingSlug: input.slug, name: input.name })
  if (!slug.ok) return { status: 'invalid_slug', candidate: slug.candidate }

  const fresh = newOnboardingSaga({ esnafId: input.esnafId, ownerUserId: input.ownerUserId, name: input.name, slug: slug.slug, timezone: input.timezone, now: now(), env: input.env })
  const created = await input.store.create(fresh)
  const record = created === 'created' ? fresh : ((await input.store.get(input.esnafId)) ?? fresh)
  return runOnboardingSaga({ store: input.store, client: input.client, db: input.db, now }, record)
}

export interface OnboardingRedriveReport {
  processed: number
  completed: number
  retried: number
  failed: number
}

/** Outbox-style redrive of open sagas (called from the signed billing outbox job). */
export async function redriveOnboardingSagas(input: OnboardingSagaDeps & { limit?: number }): Promise<OnboardingRedriveReport> {
  const now = input.now ?? (() => new Date())
  const due = await input.store.listDue({ now: now(), limit: Math.min(Math.max(input.limit ?? 25, 1), 100) })
  const report: OnboardingRedriveReport = { processed: 0, completed: 0, retried: 0, failed: 0 }
  for (const record of due) {
    report.processed++
    const outcome = await runOnboardingSaga({ store: input.store, client: input.client, db: input.db, now }, record)
    if (outcome.status === 'provisioned') report.completed++
    else if (outcome.status === 'failed' && outcome.retryable) report.retried++
    else report.failed++
  }
  return report
}
