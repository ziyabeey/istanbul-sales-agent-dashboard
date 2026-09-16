import { z } from 'zod'
import {
  CORE_ALIAS_BATCH_LIMIT,
  CORE_LEGACY_PHONE_PROVIDER,
  CORE_LEGACY_TENANT_PROVIDER,
  coreIdempotencyKey,
  type CorePlatformClient,
} from './coreClient'
import { CorePlatformError } from './errors'
import { decideBusinessSlug } from './slug'

/**
 * KC-03: esnaf -> business backfill, alias linking and shadow parity.
 *
 * Firestore `esnaflar/{esnafId}` stays authoritative for Kepenk data during
 * this step. The owner of every legacy tenant is derived from Core on each
 * run (legacy phone -> `legacy-kepenk-phone` identity alias -> user_id); the
 * Firestore `coreUserId` shadow is only a hint and is never used as owner
 * authority (R1 KC-03 blocker 2). A tenant whose shadow disagrees with Core
 * fails closed as drift, and a tenant Core cannot resolve is deferred even
 * when a shadow exists. For each Core-resolved owner the job issues one
 * idempotent ProvisionBusiness command (owner membership + tenant alias) and
 * records the resulting `business_id` on the legacy document as a shadow
 * field. Nothing is renamed on conflict, no business is created without an
 * owner, and re-running with the same keys creates zero new rows.
 */
export interface LegacyTenantDoc {
  id: string
  isletmeAdiTam?: string | null
  isletmeAdi?: string | null
  ad?: string | null
  slug?: string | null
  subdomain?: string | null
  durum?: string | null
  telefonTemiz?: string | null
  coreUserId?: string | null
  coreBusinessId?: string | null
}

export interface LegacyTenantSource {
  listTenants(input: { startAfter: string | null; limit: number }): Promise<LegacyTenantDoc[]>
  markLinked(esnafId: string, patch: Record<string, unknown>): Promise<void>
  saveReport(kind: 'backfill' | 'parity', report: Record<string, unknown>): Promise<void>
}

export function legacyTenantPhoneSubject(doc: LegacyTenantDoc): string | null {
  const digits = String(doc.telefonTemiz ?? '').replace(/\D/g, '')
  return digits.length >= 10 ? digits : null
}

/**
 * Owner authority for a legacy tenant. Only `core` may provision: the owner
 * was derived from Core (`legacy-kepenk-phone` identity alias). A Firestore
 * `coreUserId` shadow that Core does not confirm is `shadow_only` (deferred)
 * and one that contradicts Core is `shadow_mismatch` (fail closed, drift).
 */
export type OwnerResolution =
  | { kind: 'core'; userId: string }
  | { kind: 'shadow_mismatch'; shadowUserId: string; coreUserId: string }
  | { kind: 'shadow_only'; shadowUserId: string }
  | { kind: 'none' }

export type ResolvedTenant = LegacyTenantDoc & { ownerResolution: OwnerResolution }

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function shadowUserId(doc: LegacyTenantDoc): string | null {
  return typeof doc.coreUserId === 'string' && UUID_RE.test(doc.coreUserId) ? doc.coreUserId : null
}

/**
 * Owner resolution is read from Core on every run, never from a Kepenk-side
 * write: the KC-02 identity adapter linked `legacy-kepenk-phone:<phone> ->
 * user_id`, so the tenant's legacy phone is resolved through
 * `core_resolve_identity_aliases`. The Firestore `coreUserId` shadow is
 * compared against that answer but never substitutes for it.
 */
export async function resolveTenantOwners(client: CorePlatformClient, docs: LegacyTenantDoc[]): Promise<ResolvedTenant[]> {
  const subjects = [...new Set(docs.map((doc) => legacyTenantPhoneSubject(doc)).filter((s): s is string => s !== null))]
  const bySubject = new Map<string, string>()
  for (let i = 0; i < subjects.length; i += CORE_ALIAS_BATCH_LIMIT) {
    const aliases = await client.resolveIdentityAliases(CORE_LEGACY_PHONE_PROVIDER, subjects.slice(i, i + CORE_ALIAS_BATCH_LIMIT))
    for (const alias of aliases) bySubject.set(alias.external_subject, alias.user_id)
  }
  return docs.map((doc) => {
    const subject = legacyTenantPhoneSubject(doc)
    const derived = subject ? bySubject.get(subject) ?? null : null
    const shadow = shadowUserId(doc)
    let ownerResolution: OwnerResolution
    if (derived && shadow && shadow.toLowerCase() !== derived.toLowerCase()) {
      ownerResolution = { kind: 'shadow_mismatch', shadowUserId: shadow, coreUserId: derived }
    } else if (derived) {
      ownerResolution = { kind: 'core', userId: derived }
    } else if (shadow) {
      ownerResolution = { kind: 'shadow_only', shadowUserId: shadow }
    } else {
      ownerResolution = { kind: 'none' }
    }
    return { ...doc, ownerResolution }
  })
}

export type BackfillDecision =
  | { kind: 'already_linked'; businessId: string }
  | { kind: 'deleted' }
  | { kind: 'deferred_no_owner'; shadowOnly: boolean }
  | { kind: 'owner_shadow_mismatch'; shadowUserId: string; coreUserId: string }
  | { kind: 'invalid_name' }
  | { kind: 'slug_invalid' | 'slug_reserved'; candidate: string }
  | { kind: 'ready'; ownerUserId: string; name: string; slug: string; slugSource: 'existing' | 'derived' }

export function legacyTenantDisplayName(doc: LegacyTenantDoc): string {
  return String(doc.isletmeAdiTam || doc.isletmeAdi || doc.ad || '').trim()
}

/** Only a Core-derived owner may provision; the Firestore `coreUserId` shadow alone never does. */
export function planTenantBackfill(doc: LegacyTenantDoc & { ownerResolution?: OwnerResolution }): BackfillDecision {
  if (doc.durum === 'silindi') return { kind: 'deleted' }
  if (typeof doc.coreBusinessId === 'string' && UUID_RE.test(doc.coreBusinessId)) {
    return { kind: 'already_linked', businessId: doc.coreBusinessId }
  }
  // Without a Core resolution a Firestore coreUserId is only an unconfirmed shadow.
  const shadow = shadowUserId(doc)
  const resolution: OwnerResolution = doc.ownerResolution ?? (shadow ? { kind: 'shadow_only', shadowUserId: shadow } : { kind: 'none' })
  if (resolution.kind === 'shadow_mismatch') {
    return { kind: 'owner_shadow_mismatch', shadowUserId: resolution.shadowUserId, coreUserId: resolution.coreUserId }
  }
  if (resolution.kind !== 'core') return { kind: 'deferred_no_owner', shadowOnly: resolution.kind === 'shadow_only' }
  const ownerUserId = resolution.userId

  const name = legacyTenantDisplayName(doc)
  if (name.length < 2 || name.length > 120) return { kind: 'invalid_name' }

  const slug = decideBusinessSlug({ existingSlug: doc.subdomain || doc.slug, name })
  if (!slug.ok) return { kind: slug.reason === 'reserved' ? 'slug_reserved' : 'slug_invalid', candidate: slug.candidate }

  return { kind: 'ready', ownerUserId, name, slug: slug.slug, slugSource: slug.source }
}

export const ProvisionResultSchema = z.object({
  business_id: z.string().uuid(),
  slug: z.string(),
  membership_id: z.string().uuid().nullable(),
  created: z.boolean(),
  tenant_alias_linked: z.boolean(),
})

export function provisionIdempotencyKey(esnafId: string): string {
  return coreIdempotencyKey('kc03-provision', esnafId)
}

export interface BackfillReport {
  kind: 'backfill'
  startedAt: string
  finishedAt: string
  dryRun: boolean
  scanned: number
  provisioned: number
  replayed: number
  alreadyLinked: number
  deferredNoOwner: number
  /** Deferred tenants that carry a Firestore coreUserId shadow Core did not confirm. */
  deferredShadowOnly: number
  deleted: number
  invalid: Array<{ esnafId: string; reason: string; candidate?: string }>
  slugConflicts: Array<{ esnafId: string; slug: string }>
  ownerMismatch: string[]
  /** Firestore coreUserId contradicts the Core-derived owner: fail closed, never provisioned. */
  ownerShadowMismatch: Array<{ esnafId: string; shadowUserId: string; coreUserId: string }>
  errors: Array<{ esnafId: string; code: string }>
  lastEsnafId: string | null
  exhausted: boolean
}

export interface BackfillRunInput {
  source: LegacyTenantSource
  client: CorePlatformClient
  batchSize?: number
  startAfter?: string | null
  dryRun?: boolean
  now?: () => Date
}

export async function runTenantBackfill(input: BackfillRunInput): Promise<BackfillReport> {
  const now = input.now ?? (() => new Date())
  const batchSize = Math.min(Math.max(input.batchSize ?? 50, 1), 500)
  const report: BackfillReport = {
    kind: 'backfill',
    startedAt: now().toISOString(),
    finishedAt: '',
    dryRun: input.dryRun === true,
    scanned: 0,
    provisioned: 0,
    replayed: 0,
    alreadyLinked: 0,
    deferredNoOwner: 0,
    deferredShadowOnly: 0,
    deleted: 0,
    invalid: [],
    slugConflicts: [],
    ownerMismatch: [],
    ownerShadowMismatch: [],
    errors: [],
    lastEsnafId: null,
    exhausted: false,
  }

  const page = await input.source.listTenants({ startAfter: input.startAfter ?? null, limit: batchSize })
  report.exhausted = page.length < batchSize
  const tenants = await resolveTenantOwners(input.client, page)

  for (const doc of tenants) {
    report.scanned++
    report.lastEsnafId = doc.id
    const decision = planTenantBackfill(doc)
    switch (decision.kind) {
      case 'already_linked':
        report.alreadyLinked++
        continue
      case 'deleted':
        report.deleted++
        continue
      case 'deferred_no_owner':
        report.deferredNoOwner++
        if (decision.shadowOnly) report.deferredShadowOnly++
        continue
      case 'owner_shadow_mismatch':
        report.ownerShadowMismatch.push({ esnafId: doc.id, shadowUserId: decision.shadowUserId, coreUserId: decision.coreUserId })
        continue
      case 'invalid_name':
        report.invalid.push({ esnafId: doc.id, reason: 'invalid_name' })
        continue
      case 'slug_invalid':
      case 'slug_reserved':
        report.invalid.push({ esnafId: doc.id, reason: decision.kind, candidate: decision.candidate })
        continue
      case 'ready':
        break
    }
    if (report.dryRun) continue

    try {
      const result = await input.client.applyCommand(
        {
          idempotencyKey: provisionIdempotencyKey(doc.id),
          command: 'ProvisionBusiness',
          payload: {
            owner_user_id: decision.ownerUserId,
            name: decision.name,
            slug: decision.slug,
            timezone: 'Europe/Istanbul',
            tenant_alias: { provider: CORE_LEGACY_TENANT_PROVIDER, external_id: doc.id },
          },
        },
        ProvisionResultSchema
      )

      if (!result.membership_id) {
        // The alias already belongs to a business this owner is not a member of.
        // Never bind the legacy tenant to somebody else's business.
        report.ownerMismatch.push(doc.id)
        continue
      }

      await input.source.markLinked(doc.id, {
        coreUserId: decision.ownerUserId,
        coreBusinessId: result.business_id,
        coreBusinessSlug: result.slug,
        coreBusinessLinkedAt: now().toISOString(),
        coreBackfill: { created: result.created, slugSource: decision.slugSource, idempotencyKey: provisionIdempotencyKey(doc.id) },
      })
      if (result.created) report.provisioned++
      else report.replayed++
    } catch (error) {
      if (error instanceof CorePlatformError) {
        if (error.code === 'BUSINESS_SLUG_TAKEN') {
          report.slugConflicts.push({ esnafId: doc.id, slug: decision.slug })
        } else {
          report.errors.push({ esnafId: doc.id, code: error.code })
        }
      } else {
        report.errors.push({ esnafId: doc.id, code: 'UNEXPECTED' })
      }
    }
  }

  report.finishedAt = now().toISOString()
  await input.source.saveReport('backfill', report as unknown as Record<string, unknown>)
  return report
}

export interface ParityReport {
  kind: 'parity'
  checkedAt: string
  scanned: number
  linked: number
  unlinked: number
  deferredNoOwner: number
  aliasMatch: number
  aliasMissing: string[]
  aliasMismatch: Array<{ esnafId: string; firestoreBusinessId: string; coreBusinessId: string }>
  ownerAliasMatch: number
  ownerAliasMissing: string[]
  ownerAliasMismatch: Array<{ esnafId: string; firestoreUserId: string; coreUserId: string }>
  /** Every live tenant was visited (no page left unread). */
  exhausted: boolean
  /** The scan stopped at maxTenants with tenants possibly left unread; never zero drift. */
  truncated: boolean
  /**
   * Full cutover invariant (R1 KC-03 blocker 1): exhaustive, not truncated,
   * zero unlinked/deferred live tenants and empty alias/owner drift lists.
   */
  zeroDrift: boolean
}

export interface ParityRunInput {
  source: LegacyTenantSource
  client: CorePlatformClient
  pageSize?: number
  maxTenants?: number
  now?: () => Date
}

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size))
  return out
}

/** Firestore stays authoritative; this only measures drift between the shadow fields and Core. */
export async function runTenantParityCheck(input: ParityRunInput): Promise<ParityReport> {
  const now = input.now ?? (() => new Date())
  const pageSize = Math.min(Math.max(input.pageSize ?? CORE_ALIAS_BATCH_LIMIT, 1), CORE_ALIAS_BATCH_LIMIT)
  const maxTenants = input.maxTenants ?? 10_000
  const report: ParityReport = {
    kind: 'parity',
    checkedAt: now().toISOString(),
    scanned: 0,
    linked: 0,
    unlinked: 0,
    deferredNoOwner: 0,
    aliasMatch: 0,
    aliasMissing: [],
    aliasMismatch: [],
    ownerAliasMatch: 0,
    ownerAliasMissing: [],
    ownerAliasMismatch: [],
    exhausted: false,
    truncated: false,
    zeroDrift: false,
  }

  let startAfter: string | null = null
  for (;;) {
    const page = await input.source.listTenants({ startAfter, limit: pageSize })
    if (page.length === 0) {
      report.exhausted = true
      break
    }
    report.scanned += page.length
    startAfter = page[page.length - 1].id

    const resolvedPage = await resolveTenantOwners(input.client, page)
    const live = resolvedPage.filter((doc) => doc.durum !== 'silindi')
    const linked = live.filter((doc) => typeof doc.coreBusinessId === 'string' && UUID_RE.test(doc.coreBusinessId))
    report.linked += linked.length
    report.unlinked += live.length - linked.length
    // Deferred = unlinked tenants Core cannot resolve an owner for; the Firestore shadow does not count.
    report.deferredNoOwner += live.filter((doc) => !doc.coreBusinessId && doc.ownerResolution.kind !== 'core').length

    for (const batch of chunk(linked, CORE_ALIAS_BATCH_LIMIT)) {
      const aliases = await input.client.resolveTenantAliases(CORE_LEGACY_TENANT_PROVIDER, batch.map((doc) => doc.id))
      const byEsnaf = new Map(aliases.map((alias) => [alias.external_id, alias.business_id]))
      for (const doc of batch) {
        const coreBusinessId = byEsnaf.get(doc.id)
        if (!coreBusinessId) report.aliasMissing.push(doc.id)
        else if (coreBusinessId.toLowerCase() !== String(doc.coreBusinessId).toLowerCase()) {
          report.aliasMismatch.push({ esnafId: doc.id, firestoreBusinessId: String(doc.coreBusinessId), coreBusinessId })
        } else report.aliasMatch++
      }
    }

    const withOwner = live.filter((doc) => typeof doc.coreUserId === 'string' && UUID_RE.test(doc.coreUserId) && doc.telefonTemiz)
    for (const batch of chunk(withOwner, CORE_ALIAS_BATCH_LIMIT)) {
      const subjects = batch.map((doc) => String(doc.telefonTemiz).replace(/\D/g, ''))
      const aliases = await input.client.resolveIdentityAliases(CORE_LEGACY_PHONE_PROVIDER, subjects)
      const bySubject = new Map(aliases.map((alias) => [alias.external_subject, alias.user_id]))
      batch.forEach((doc, index) => {
        const coreUserId = bySubject.get(subjects[index])
        if (!coreUserId) report.ownerAliasMissing.push(doc.id)
        else if (coreUserId.toLowerCase() !== String(doc.coreUserId).toLowerCase()) {
          report.ownerAliasMismatch.push({ esnafId: doc.id, firestoreUserId: String(doc.coreUserId), coreUserId })
        } else report.ownerAliasMatch++
      })
    }

    if (page.length < pageSize) {
      report.exhausted = true
      break
    }
    if (report.scanned >= maxTenants) {
      report.truncated = true
      break
    }
  }

  report.zeroDrift =
    report.exhausted &&
    !report.truncated &&
    report.unlinked === 0 &&
    report.deferredNoOwner === 0 &&
    report.aliasMissing.length === 0 &&
    report.aliasMismatch.length === 0 &&
    report.ownerAliasMissing.length === 0 &&
    report.ownerAliasMismatch.length === 0
  await input.source.saveReport('parity', report as unknown as Record<string, unknown>)
  return report
}
