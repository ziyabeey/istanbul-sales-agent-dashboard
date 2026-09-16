import type { Firestore } from 'firebase-admin/firestore'
import { KEPENK_LAUNCH_PLAN_KEY, ChangeSubscriptionResultSchema } from './billing'
import { ProvisionResultSchema } from './backfill'
import { CORE_LEGACY_TENANT_PROVIDER, coreIdempotencyKey, type CorePlatformClient } from './coreClient'
import { CorePlatformError } from './errors'
import { resolveCoreRequestContext, type CoreContextDeps } from './requestContext'
import { decideBusinessSlug } from './slug'

/** Minimal env shape so tests can pass partial environments. */
export type EnvLike = Record<string, string | undefined>

/**
 * KC-05: onboarding writes the canonical Core.
 *
 * When the onboarding request carries a Core BFF session, the new legacy
 * tenant is provisioned in Core for that user (ProvisionBusiness + legacy
 * alias) and receives the tester trial (ChangeSubscription status=trial).
 * Both commands are idempotent per esnafId, so a retried onboarding never
 * creates a second business or a second trial. Without a Core session the
 * legacy path continues unchanged and the tenant is picked up later by the
 * KC-03 backfill once its owner exists in Core.
 */
export const CORE_TRIAL_DAYS_DEFAULT = 90

export function coreTrialDays(env: EnvLike = process.env): number {
  const parsed = Number.parseInt(env.CORE_TRIAL_DAYS ?? '', 10)
  return Number.isInteger(parsed) && parsed > 0 && parsed <= 365 ? parsed : CORE_TRIAL_DAYS_DEFAULT
}

export function isCoreOnboardingEnabled(env: EnvLike = process.env): boolean {
  return env.CORE_ONBOARDING_ENABLED === 'true'
}

export type OnboardingCoreOutcome =
  | { status: 'disabled' }
  | { status: 'no_core_session' }
  | { status: 'recovery_session' }
  | { status: 'invalid_slug'; candidate: string }
  | { status: 'provisioned'; businessId: string; slug: string; trialUntil: string; created: boolean }
  | { status: 'failed'; code: string; step: 'provision' | 'trial' | 'shadow' }

export interface OnboardingCoreInput {
  request: Request
  deps: CoreContextDeps & { client: CorePlatformClient }
  db: Firestore | null
  esnafId: string
  name: string
  slug?: string | null
  timezone?: string
  now?: () => Date
  env?: EnvLike
}

export async function provisionCoreForNewTenant(input: OnboardingCoreInput): Promise<OnboardingCoreOutcome> {
  const env = input.env ?? process.env
  if (!isCoreOnboardingEnabled(env)) return { status: 'disabled' }
  const now = input.now ?? (() => new Date())

  const resolved = await resolveCoreRequestContext(input.request, input.deps)
  if (!resolved.ok) return { status: 'no_core_session' }
  if (resolved.context.recovery) return { status: 'recovery_session' }

  const slug = decideBusinessSlug({ existingSlug: input.slug, name: input.name })
  if (!slug.ok) return { status: 'invalid_slug', candidate: slug.candidate }

  let provisioned
  try {
    provisioned = await input.deps.client.applyCommand(
      {
        idempotencyKey: coreIdempotencyKey('kc05-onboard', input.esnafId),
        command: 'ProvisionBusiness',
        payload: {
          owner_user_id: resolved.context.userId,
          name: input.name.trim(),
          slug: slug.slug,
          timezone: input.timezone ?? 'Europe/Istanbul',
          tenant_alias: { provider: CORE_LEGACY_TENANT_PROVIDER, external_id: input.esnafId },
        },
      },
      ProvisionResultSchema
    )
  } catch (error) {
    return { status: 'failed', step: 'provision', code: error instanceof CorePlatformError ? error.code : 'UNEXPECTED' }
  }
  if (!provisioned.membership_id) {
    return { status: 'failed', step: 'provision', code: 'OWNER_MISMATCH' }
  }

  const start = now()
  const trialUntil = new Date(start.getTime() + coreTrialDays(env) * 24 * 60 * 60 * 1000)
  try {
    await input.deps.client.applyCommand(
      {
        idempotencyKey: coreIdempotencyKey('kc05-trial', input.esnafId),
        command: 'ChangeSubscription',
        payload: {
          business_id: provisioned.business_id,
          plan_key: KEPENK_LAUNCH_PLAN_KEY,
          status: 'trial',
          current_period_start: start.toISOString(),
          current_period_end: trialUntil.toISOString(),
          source: { provider: 'kepenk-onboarding', event_id: input.esnafId },
        },
      },
      ChangeSubscriptionResultSchema
    )
  } catch (error) {
    return { status: 'failed', step: 'trial', code: error instanceof CorePlatformError ? error.code : 'UNEXPECTED' }
  }

  if (input.db) {
    try {
      await input.db.collection('esnaflar').doc(input.esnafId).update({
        coreUserId: resolved.context.userId,
        coreBusinessId: provisioned.business_id,
        coreBusinessSlug: provisioned.slug,
        coreBusinessLinkedAt: start.toISOString(),
        coreOnboarding: { status: 'provisioned', trialUntil: trialUntil.toISOString(), created: provisioned.created },
      })
    } catch {
      return { status: 'failed', step: 'shadow', code: 'FIRESTORE_WRITE_FAILED' }
    }
  }

  return { status: 'provisioned', businessId: provisioned.business_id, slug: provisioned.slug, trialUntil: trialUntil.toISOString(), created: provisioned.created }
}
