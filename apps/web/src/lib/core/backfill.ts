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
 * this step. For every legacy tenant whose owner already exists in Core
 * (`coreUserId`, written by the KC-02 identity adapter) the job issues one
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
 * Owner resolution is read from Core, never from a Kepenk-side write: the
 * KC-02 identity adapter linked `legacy-kepenk-phone:<phone> -> user_id`, so
 * a tenant whose phone resolves to a Core user has an owner. Returns a copy of
 * the page with `coreUserId` filled where Core knows the owner.
 */
export async function resolveTenantOwners(client: CorePlatformClient, docs: LegacyTenantDoc[]): Promise<LegacyTenantDoc[]> {
  const pending = docs.filter((doc) => !doc.coreUserId && legacyTenantPhoneSubject(doc))
  if (pending.length === 0) return docs.map((doc) => ({ ...doc }))
  const bySubject = new Map<string, string>()
  const subjects = [...new Set(pending.map((doc) => legacyTenantPhoneSubject(doc) as string))]
  for (let i = 0; i < subjects.length; i += CORE_ALIAS_BATCH_LIMIT) {
    const aliases = await client.resolveIdentityAliases(CORE_LEGACY_PHONE_PROVIDER, subjects.slice(i, i + CORE_ALIAS_BATCH_LIMIT))
    for (const alias of aliases) bySubject.set(alias.external_subject, alias.user_id)
  }
  return docs.map((doc) => {
    if (doc.coreUserId) return { ...doc }
    const subject = legacyTenantPhoneSubject(doc)
    const resolved = subject ? bySubject.get(subject) : undefined
    return resolved ? { ...doc, coreUserId: resolved } : { ...doc }
  })
}

export type BackfillDecision =
  | { kind: 'already_linked'; businessId: string }
  | { kind: 'deleted' }
  | { kind: 'deferred_no_owner' }
  | { kind: 'invalid_name' }
  | { kind: 'slug_invalid' | 'slug_reserved'; candidate: string }
  | { kind: 'ready'; ownerUserId: string; name: string; slug: string; slugSource: 'existing' | 'derived' }

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function legacyTenantDisplayName(doc: LegacyTenantDoc): string {
  return String(doc.isletmeAdiTam || doc.isletmeAdi || doc.ad || '').trim()
}

export function planTenantBackfill(doc: LegacyTenantDoc): BackfillDecision {
  if (doc.durum === 'silindi') return { kind: 'deleted' }
  if (typeof doc.coreBusinessId === 'string' && UUID_RE.test(doc.coreBusinessId)) {
    return { kind: 'already_linked', businessId: doc.coreBusinessId }
  }
  if (typeof doc.coreUserId !== 'string' || !UUID_RE.test(doc.coreUserId)) return { kind: 'deferred_no_owner' }

  const name = legacyTenantDisplayName(doc)
  if (name.length < 2 || name.length > 120) return { kind: 'invalid_name' }

  const slug = decideBusinessSlug({ existingSlug: doc.subdomain || doc.slug, name })
  if (!slug.ok) return { kind: slug.reason === 'reserved' ? 'slug_reserved' : 'slug_invalid', candidate: slug.candidate }

  return { kind: 'ready', ownerUserId: doc.coreUserId, name, slug: slug.slug, slugSource: slug.source }
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
  deleted: number
  invalid: Array<{ esnafId: string; reason: string; candidate?: string }>
  slugConflicts: Array<{ esnafId: string; slug: string }>
  ownerMismatch: string[]
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
    deleted: 0,
    invalid: [],
    slugConflicts: [],
    ownerMismatch: [],
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
    zeroDrift: false,
  }

  let startAfter: string | null = null
  while (report.scanned < maxTenants) {
    const page = await input.source.listTenants({ startAfter, limit: pageSize })
    if (page.length === 0) break
    report.scanned += page.length
    startAfter = page[page.length - 1].id

    const live = page.filter((doc) => doc.durum !== 'silindi')
    const linked = live.filter((doc) => typeof doc.coreBusinessId === 'string' && UUID_RE.test(doc.coreBusinessId))
    report.linked += linked.length
    report.unlinked += live.length - linked.length
    report.deferredNoOwner += live.filter((doc) => !doc.coreBusinessId && !doc.coreUserId).length

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

    if (page.length < pageSize) break
  }

  report.zeroDrift =
    report.aliasMissing.length === 0 &&
    report.aliasMismatch.length === 0 &&
    report.ownerAliasMissing.length === 0 &&
    report.ownerAliasMismatch.length === 0
  await input.source.saveReport('parity', report as unknown as Record<string, unknown>)
  return report
}
