import { describe, expect, it, vi } from 'vitest'
import {
  planTenantBackfill,
  provisionIdempotencyKey,
  runTenantBackfill,
  runTenantParityCheck,
  type LegacyTenantDoc,
  type LegacyTenantSource,
} from '@/lib/core/backfill'
import type { CorePlatformClient } from '@/lib/core/coreClient'
import { CorePlatformError } from '@/lib/core/errors'
import { decideBusinessSlug, slugifyBusinessName } from '@/lib/core/slug'

const OWNER = '11000000-0000-4000-8000-000000000001'
const OTHER = '22000000-0000-4000-8000-000000000002'
const BIZ = '5b000000-0000-4000-8000-000000000001'
const NOW = () => new Date('2026-09-16T12:00:00Z')

class MemorySource implements LegacyTenantSource {
  readonly patches = new Map<string, Record<string, unknown>>()
  readonly reports: Array<{ kind: string; report: Record<string, unknown> }> = []
  constructor(readonly docs: LegacyTenantDoc[]) {}
  async listTenants(input: { startAfter: string | null; limit: number }): Promise<LegacyTenantDoc[]> {
    const sorted = [...this.docs].sort((a, b) => a.id.localeCompare(b.id))
    const start = input.startAfter ? sorted.findIndex((d) => d.id === input.startAfter) + 1 : 0
    return sorted.slice(start, start + input.limit).map((d) => ({ ...d, ...(this.patches.get(d.id) ?? {}) }))
  }
  async markLinked(esnafId: string, patch: Record<string, unknown>): Promise<void> {
    this.patches.set(esnafId, { ...(this.patches.get(esnafId) ?? {}), ...patch })
  }
  async saveReport(kind: 'backfill' | 'parity', report: Record<string, unknown>): Promise<void> {
    this.reports.push({ kind, report })
  }
}

function fakeClient(overrides: Partial<Record<'applyCommand' | 'resolveTenantAliases' | 'resolveIdentityAliases', unknown>> = {}) {
  const applyCommand = vi.fn(async (input: { payload: { slug: string } }) => ({
    business_id: BIZ,
    slug: input.payload.slug,
    membership_id: '6b000000-0000-4000-8000-000000000001',
    created: true,
    tenant_alias_linked: true,
  }))
  const resolveTenantAliases = vi.fn(async () => [])
  // Default: Core knows every phone subject as OWNER; tests override for foreign/unknown cases.
  const resolveIdentityAliases = vi.fn(async (_provider: string, subjects: string[]) => subjects.map((subject) => ({ external_subject: subject, user_id: OWNER })))
  const client = { applyCommand, resolveTenantAliases, resolveIdentityAliases, ...overrides } as unknown as CorePlatformClient
  return { client, applyCommand, resolveTenantAliases, resolveIdentityAliases }
}

describe('slug policy', () => {
  it('folds Turkish letters like the Randevu worker and fails closed on reserved or empty slugs', () => {
    expect(slugifyBusinessName('Şık Berber Ünlü & Çırak')).toBe('sik-berber-unlu-cirak')
    expect(slugifyBusinessName('  İstanbul Güzellik  ')).toBe('istanbul-guzellik')
    expect(decideBusinessSlug({ existingSlug: 'mevcut-slug', name: 'X' })).toEqual({ ok: true, slug: 'mevcut-slug', source: 'existing' })
    expect(decideBusinessSlug({ existingSlug: 'Bad Slug!', name: 'Kepenk Berber' })).toEqual({ ok: true, slug: 'kepenk-berber', source: 'derived' })
    expect(decideBusinessSlug({ name: 'admin' })).toEqual({ ok: false, reason: 'reserved', candidate: 'admin' })
    expect(decideBusinessSlug({ name: '!!!' })).toEqual({ ok: false, reason: 'invalid', candidate: '' })
  })
})

describe('planTenantBackfill', () => {
  const core = { kind: 'core' as const, userId: OWNER }

  it('classifies deleted, linked, ownerless, invalid and ready tenants; the coreUserId shadow alone never makes a tenant ready', () => {
    expect(planTenantBackfill({ id: 'a', durum: 'silindi', coreUserId: OWNER })).toEqual({ kind: 'deleted' })
    expect(planTenantBackfill({ id: 'b', coreBusinessId: BIZ, coreUserId: OWNER })).toEqual({ kind: 'already_linked', businessId: BIZ })
    expect(planTenantBackfill({ id: 'c', isletmeAdiTam: 'Berber' })).toEqual({ kind: 'deferred_no_owner', shadowOnly: false })
    expect(planTenantBackfill({ id: 'c2', coreUserId: OWNER, isletmeAdiTam: 'Berber' })).toEqual({ kind: 'deferred_no_owner', shadowOnly: true })
    expect(planTenantBackfill({ id: 'c3', coreUserId: OWNER, isletmeAdiTam: 'Berber', ownerResolution: { kind: 'shadow_only', shadowUserId: OWNER } })).toEqual({ kind: 'deferred_no_owner', shadowOnly: true })
    expect(planTenantBackfill({ id: 'c4', coreUserId: OTHER, isletmeAdiTam: 'Berber', ownerResolution: { kind: 'shadow_mismatch', shadowUserId: OTHER, coreUserId: OWNER } })).toEqual({ kind: 'owner_shadow_mismatch', shadowUserId: OTHER, coreUserId: OWNER })
    expect(planTenantBackfill({ id: 'd', ad: 'x', ownerResolution: core })).toEqual({ kind: 'invalid_name' })
    expect(planTenantBackfill({ id: 'e', isletmeAdiTam: 'Admin', ownerResolution: core })).toEqual({ kind: 'slug_reserved', candidate: 'admin' })
    expect(planTenantBackfill({ id: 'f', coreUserId: OWNER, isletmeAdiTam: 'Kepenk Berber', subdomain: 'kepenk-berber-eski', ownerResolution: core })).toEqual({
      kind: 'ready',
      ownerUserId: OWNER,
      name: 'Kepenk Berber',
      slug: 'kepenk-berber-eski',
      slugSource: 'existing',
    })
  })
})

describe('runTenantBackfill', () => {
  it('resolves owners from Core identity aliases instead of a Kepenk-side write', async () => {
    const source = new MemorySource([
      { id: 'esnaf-1', telefonTemiz: '905551234567', isletmeAdiTam: 'Telefonla Bulunan' },
      { id: 'esnaf-2', telefonTemiz: '905550000000', isletmeAdiTam: 'Core Bilmiyor' },
      { id: 'esnaf-3', isletmeAdiTam: 'Telefonsuz' },
    ])
    const resolveIdentityAliases = vi.fn(async () => [{ external_subject: '905551234567', user_id: OWNER }])
    const { client, applyCommand } = fakeClient({ resolveIdentityAliases })

    const report = await runTenantBackfill({ source, client, now: NOW })
    expect(resolveIdentityAliases).toHaveBeenCalledWith('legacy-kepenk-phone', ['905551234567', '905550000000'])
    expect(report).toMatchObject({ provisioned: 1, deferredNoOwner: 2 })
    expect(applyCommand).toHaveBeenCalledTimes(1)
    expect(source.patches.get('esnaf-1')).toMatchObject({ coreUserId: OWNER, coreBusinessId: BIZ })
    expect(source.patches.has('esnaf-2')).toBe(false)
  })

  it('never trusts the Firestore coreUserId shadow as owner authority: mismatch fails closed, unconfirmed shadow defers, zero provisioning', async () => {
    const source = new MemorySource([
      { id: 'esnaf-foreign', coreUserId: OTHER, telefonTemiz: '905551110001', isletmeAdiTam: 'Yabanci Golge' },
      { id: 'esnaf-stale', coreUserId: OTHER, isletmeAdiTam: 'Telefonsuz Golge' },
      { id: 'esnaf-unknown', coreUserId: OWNER, telefonTemiz: '905559990009', isletmeAdiTam: 'Core Bilmiyor' },
      { id: 'esnaf-confirmed', coreUserId: OWNER, telefonTemiz: '905551110002', isletmeAdiTam: 'Dogrulanan' },
    ])
    const resolveIdentityAliases = vi.fn(async () => [
      { external_subject: '905551110001', user_id: OWNER },
      { external_subject: '905551110002', user_id: OWNER },
    ])
    const { client, applyCommand } = fakeClient({ resolveIdentityAliases })

    const report = await runTenantBackfill({ source, client, now: NOW })
    expect(report.ownerShadowMismatch).toEqual([{ esnafId: 'esnaf-foreign', shadowUserId: OTHER, coreUserId: OWNER }])
    expect(report).toMatchObject({ provisioned: 1, deferredNoOwner: 2, deferredShadowOnly: 2 })
    expect(applyCommand).toHaveBeenCalledTimes(1)
    const [input] = applyCommand.mock.calls[0] as unknown as [{ payload: { owner_user_id: string; tenant_alias: { external_id: string } } }]
    expect(input.payload.owner_user_id).toBe(OWNER)
    expect(input.payload.tenant_alias.external_id).toBe('esnaf-confirmed')
    expect(source.patches.has('esnaf-foreign')).toBe(false)
    expect(source.patches.has('esnaf-stale')).toBe(false)
    expect(source.patches.has('esnaf-unknown')).toBe(false)
  })

  it('provisions ready tenants once with a deterministic key and records the shadow business id', async () => {
    const source = new MemorySource([
      { id: 'esnaf-1', telefonTemiz: '905551234567', isletmeAdiTam: 'Kepenk Berber' },
      { id: 'esnaf-2', isletmeAdiTam: 'Sahipsiz' },
      { id: 'esnaf-3', durum: 'silindi' },
    ])
    const { client, applyCommand } = fakeClient()

    const first = await runTenantBackfill({ source, client, now: NOW })
    expect(first).toMatchObject({ scanned: 3, provisioned: 1, replayed: 0, deferredNoOwner: 1, deleted: 1, exhausted: true })
    expect(applyCommand).toHaveBeenCalledTimes(1)
    const [input] = applyCommand.mock.calls[0] as unknown as [{ idempotencyKey: string; command: string; payload: Record<string, unknown> }]
    expect(input.command).toBe('ProvisionBusiness')
    expect(input.idempotencyKey).toBe(provisionIdempotencyKey('esnaf-1'))
    expect(input.payload).toEqual({
      owner_user_id: OWNER,
      name: 'Kepenk Berber',
      slug: 'kepenk-berber',
      timezone: 'Europe/Istanbul',
      tenant_alias: { provider: 'legacy-kepenk-firestore', external_id: 'esnaf-1' },
    })
    expect(source.patches.get('esnaf-1')).toMatchObject({ coreUserId: OWNER, coreBusinessId: BIZ, coreBusinessSlug: 'kepenk-berber', coreBusinessLinkedAt: '2026-09-16T12:00:00.000Z' })
    expect(source.reports.at(-1)?.kind).toBe('backfill')

    // Second run: the shadow field short-circuits; zero commands, zero new rows.
    const second = await runTenantBackfill({ source, client, now: NOW })
    expect(second).toMatchObject({ scanned: 3, provisioned: 0, replayed: 0, alreadyLinked: 1 })
    expect(applyCommand).toHaveBeenCalledTimes(1)
  })

  it('counts a Core-side replay as linked without creating anything, and never binds a foreign business', async () => {
    const source = new MemorySource([
      { id: 'esnaf-1-replay', telefonTemiz: '905551234501', isletmeAdiTam: 'Tekrar' },
      { id: 'esnaf-2-hijack', telefonTemiz: '905551234502', isletmeAdiTam: 'Hijack' },
    ])
    const applyCommand = vi
      .fn()
      .mockResolvedValueOnce({ business_id: BIZ, slug: 'tekrar', membership_id: '6b000000-0000-4000-8000-000000000001', created: false, tenant_alias_linked: true })
      .mockResolvedValueOnce({ business_id: BIZ, slug: 'tekrar', membership_id: null, created: false, tenant_alias_linked: true })
    const { client } = fakeClient({ applyCommand })

    const report = await runTenantBackfill({ source, client, now: NOW })
    expect(report).toMatchObject({ provisioned: 0, replayed: 1, ownerMismatch: ['esnaf-2-hijack'] })
    expect(source.patches.get('esnaf-1-replay')?.coreBusinessId).toBe(BIZ)
    expect(source.patches.has('esnaf-2-hijack')).toBe(false)
  })

  it('reports slug conflicts without renaming or retrying, and keeps other errors per tenant', async () => {
    const source = new MemorySource([
      { id: 'esnaf-1-conflict', telefonTemiz: '905551234511', isletmeAdiTam: 'Taken Name' },
      { id: 'esnaf-2-outage', telefonTemiz: '905551234512', isletmeAdiTam: 'Outage' },
      { id: 'esnaf-3-ok', telefonTemiz: '905551234513', isletmeAdiTam: 'Fine' },
    ])
    const applyCommand = vi
      .fn()
      .mockRejectedValueOnce(new CorePlatformError('BUSINESS_SLUG_TAKEN'))
      .mockRejectedValueOnce(new CorePlatformError('CORE_UNAVAILABLE'))
      .mockResolvedValueOnce({ business_id: BIZ, slug: 'fine', membership_id: '6b000000-0000-4000-8000-000000000001', created: true, tenant_alias_linked: true })
    const { client } = fakeClient({ applyCommand })

    const report = await runTenantBackfill({ source, client, now: NOW })
    expect(report.slugConflicts).toEqual([{ esnafId: 'esnaf-1-conflict', slug: 'taken-name' }])
    expect(report.errors).toEqual([{ esnafId: 'esnaf-2-outage', code: 'CORE_UNAVAILABLE' }])
    expect(report.provisioned).toBe(1)
    expect(applyCommand).toHaveBeenCalledTimes(3)
    expect(source.patches.has('esnaf-1-conflict')).toBe(false)
    expect(source.patches.has('esnaf-2-outage')).toBe(false)
    expect(source.patches.get('esnaf-3-ok')?.coreBusinessId).toBe(BIZ)
  })

  it('dry runs plan without issuing commands and pages through the collection with a cursor', async () => {
    const docs = Array.from({ length: 5 }, (_, i) => ({ id: `esnaf-${i}`, telefonTemiz: `90555123460${i}`, isletmeAdiTam: `Dukkan ${i}` }))
    const source = new MemorySource(docs)
    const { client, applyCommand } = fakeClient()

    const dry = await runTenantBackfill({ source, client, dryRun: true, batchSize: 2, now: NOW })
    expect(dry).toMatchObject({ dryRun: true, scanned: 2, provisioned: 0, lastEsnafId: 'esnaf-1', exhausted: false })
    expect(applyCommand).not.toHaveBeenCalled()

    const page2 = await runTenantBackfill({ source, client, batchSize: 2, startAfter: dry.lastEsnafId, now: NOW })
    expect(page2).toMatchObject({ scanned: 2, provisioned: 2, lastEsnafId: 'esnaf-3', exhausted: false })
    const page3 = await runTenantBackfill({ source, client, batchSize: 2, startAfter: page2.lastEsnafId, now: NOW })
    expect(page3).toMatchObject({ scanned: 1, provisioned: 1, exhausted: true })
  })
})

describe('runTenantParityCheck', () => {
  it('reports zero drift only for an exhaustive scan where every live tenant is linked and every shadow matches Core', async () => {
    const source = new MemorySource([
      { id: 'esnaf-1', coreUserId: OWNER, coreBusinessId: BIZ, telefonTemiz: '905551234567' },
      { id: 'esnaf-2', coreUserId: OWNER, coreBusinessId: '5b000000-0000-4000-8000-000000000002', telefonTemiz: '905551234568' },
      { id: 'esnaf-4', durum: 'silindi', coreBusinessId: BIZ },
    ])
    const resolveTenantAliases = vi.fn(async () => [
      { external_id: 'esnaf-1', business_id: BIZ, slug: 'kepenk-berber' },
      { external_id: 'esnaf-2', business_id: '5b000000-0000-4000-8000-000000000002', slug: 'ikinci' },
    ])
    const { client, resolveIdentityAliases } = fakeClient({ resolveTenantAliases })

    const report = await runTenantParityCheck({ source, client, now: NOW })
    expect(report).toMatchObject({ scanned: 3, linked: 2, unlinked: 0, deferredNoOwner: 0, aliasMatch: 2, ownerAliasMatch: 2, exhausted: true, truncated: false, zeroDrift: true })
    expect(resolveTenantAliases).toHaveBeenCalledWith('legacy-kepenk-firestore', ['esnaf-1', 'esnaf-2'])
    expect(resolveIdentityAliases).toHaveBeenCalledWith('legacy-kepenk-phone', ['905551234567', '905551234568'])
    expect(source.reports.at(-1)?.kind).toBe('parity')
  })

  it('is never zero drift while live tenants are unlinked or deferred, and never when the scan was truncated', async () => {
    const unlinked = new MemorySource([
      { id: 'esnaf-1', coreUserId: OWNER, coreBusinessId: BIZ, telefonTemiz: '905551234567' },
      { id: 'esnaf-2', coreUserId: OWNER, telefonTemiz: '905551234568' },
      { id: 'esnaf-3' },
    ])
    const resolveTenantAliases = vi.fn(async () => [{ external_id: 'esnaf-1', business_id: BIZ, slug: 'kepenk-berber' }])
    const { client } = fakeClient({ resolveTenantAliases })
    const partial = await runTenantParityCheck({ source: unlinked, client, now: NOW })
    expect(partial).toMatchObject({ scanned: 3, linked: 1, unlinked: 2, deferredNoOwner: 1, aliasMatch: 1, exhausted: true, truncated: false, zeroDrift: false })

    const shadowOnly = new MemorySource([{ id: 'esnaf-1', coreUserId: OWNER, isletmeAdiTam: 'Golge' }])
    const shadowReport = await runTenantParityCheck({ source: shadowOnly, client, now: NOW })
    expect(shadowReport).toMatchObject({ unlinked: 1, deferredNoOwner: 1, zeroDrift: false })

    const many = new MemorySource(Array.from({ length: 4 }, (_, i) => ({ id: `esnaf-${i}`, coreUserId: OWNER, coreBusinessId: BIZ, telefonTemiz: `90555123470${i}` })))
    const allAliases = vi.fn(async (_provider: string, ids: string[]) => ids.map((id) => ({ external_id: id, business_id: BIZ, slug: id })))
    const { client: fullClient } = fakeClient({ resolveTenantAliases: allAliases })
    const truncated = await runTenantParityCheck({ source: many, client: fullClient, pageSize: 2, maxTenants: 2, now: NOW })
    expect(truncated).toMatchObject({ scanned: 2, truncated: true, exhausted: false, zeroDrift: false })
    const complete = await runTenantParityCheck({ source: many, client: fullClient, pageSize: 2, now: NOW })
    expect(complete).toMatchObject({ scanned: 4, truncated: false, exhausted: true, unlinked: 0, zeroDrift: true })
  })

  it('surfaces missing and mismatching aliases as drift', async () => {
    const source = new MemorySource([
      { id: 'esnaf-1', coreUserId: OWNER, coreBusinessId: BIZ, telefonTemiz: '905551234567' },
      { id: 'esnaf-2', coreUserId: OWNER, coreBusinessId: '5b000000-0000-4000-8000-000000000009', telefonTemiz: '905551234568' },
    ])
    const resolveTenantAliases = vi.fn(async () => [{ external_id: 'esnaf-2', business_id: BIZ, slug: 'x' }])
    const resolveIdentityAliases = vi.fn(async () => [{ external_subject: '905551234568', user_id: OTHER }])
    const { client } = fakeClient({ resolveTenantAliases, resolveIdentityAliases })

    const report = await runTenantParityCheck({ source, client, now: NOW })
    expect(report.aliasMissing).toEqual(['esnaf-1'])
    expect(report.aliasMismatch).toEqual([{ esnafId: 'esnaf-2', firestoreBusinessId: '5b000000-0000-4000-8000-000000000009', coreBusinessId: BIZ }])
    expect(report.ownerAliasMissing).toEqual(['esnaf-1'])
    expect(report.ownerAliasMismatch).toEqual([{ esnafId: 'esnaf-2', firestoreUserId: OWNER, coreUserId: OTHER }])
    expect(report.zeroDrift).toBe(false)
  })
})
