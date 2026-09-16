import { describe, expect, it, vi } from 'vitest'
import type { Firestore } from 'firebase-admin/firestore'
import { findUniqueActiveTenantByPhone } from '@/lib/auth/legacyAccountResolver'
import type { CorePlatformClient } from '@/lib/core/coreClient'
import { CorePlatformError } from '@/lib/core/errors'
import { adaptLegacyIdentity, legacyPhoneSubject, linkLegacyPhoneIdentity, recordCoreUserOnLegacyTenant } from '@/lib/core/identityAdapter'

vi.mock('@/lib/auth/legacyAccountResolver', () => ({
  findUniqueActiveTenantByPhone: vi.fn(async () => ({ kind: 'none' })),
}))

const mockedResolver = vi.mocked(findUniqueActiveTenantByPhone)
const USER = '11000000-0000-4000-8000-000000000001'

function fakeDb(existing: Record<string, unknown> | null) {
  const update = vi.fn(async () => undefined)
  const get = vi.fn(async () => ({ exists: existing !== null, data: () => existing ?? undefined }))
  const db = { collection: vi.fn(() => ({ doc: vi.fn(() => ({ get, update })) })) } as unknown as Firestore
  return { db, update, get }
}

describe('legacy phone identity linking', () => {
  it('uses the digits-only phone as the alias subject with a deterministic idempotency key', async () => {
    const applyCommand = vi.fn(async () => ({ linked: true }))
    const client = { applyCommand } as unknown as CorePlatformClient
    expect(await linkLegacyPhoneIdentity(client, { phoneE164: '+905551234567', userId: USER })).toBe('linked')
    const [input] = applyCommand.mock.calls[0] as unknown as [{ idempotencyKey: string; command: string; payload: Record<string, unknown> }]
    expect(input.command).toBe('LinkIdentityAlias')
    expect(input.payload).toEqual({ provider: 'legacy-kepenk-phone', external_subject: '905551234567', user_id: USER })
    expect(input.idempotencyKey).toMatch(/^kc02-identity-[0-9a-f]{48}$/)
    expect(legacyPhoneSubject('+90 555 123 45 67')).toBe('905551234567')
  })

  it('reports replays, conflicts and outages without throwing into the login path', async () => {
    const replay = { applyCommand: vi.fn(async () => ({ linked: false })) } as unknown as CorePlatformClient
    const conflict = { applyCommand: vi.fn(async () => { throw new CorePlatformError('IDENTITY_ALIAS_CONFLICT') }) } as unknown as CorePlatformClient
    const outage = { applyCommand: vi.fn(async () => { throw new CorePlatformError('CORE_UNAVAILABLE') }) } as unknown as CorePlatformClient
    expect(await linkLegacyPhoneIdentity(replay, { phoneE164: '+905551234567', userId: USER })).toBe('already_linked')
    expect(await linkLegacyPhoneIdentity(conflict, { phoneE164: '+905551234567', userId: USER })).toBe('conflict')
    expect(await linkLegacyPhoneIdentity(outage, { phoneE164: '+905551234567', userId: USER })).toBe('failed')
  })
})

describe('legacy tenant shadow field', () => {
  it('writes coreUserId once for a uniquely resolved tenant and never rebinds another user', async () => {
    mockedResolver.mockResolvedValue({ kind: 'unique', account: { tenantId: 'esnaf-1', telefonTemiz: '905551234567', durum: 'aktif' } } as never)

    const fresh = fakeDb({ ad: 'Test' })
    expect(await recordCoreUserOnLegacyTenant(fresh.db, { phoneE164: '+905551234567', userId: USER, now: new Date('2026-09-16T12:00:00Z') }))
      .toEqual({ status: 'written', esnafId: 'esnaf-1' })
    expect(fresh.update).toHaveBeenCalledWith({ coreUserId: USER, coreUserLinkedAt: '2026-09-16T12:00:00.000Z' })

    const same = fakeDb({ coreUserId: USER })
    expect(await recordCoreUserOnLegacyTenant(same.db, { phoneE164: '+905551234567', userId: USER })).toEqual({ status: 'unchanged', esnafId: 'esnaf-1' })
    expect(same.update).not.toHaveBeenCalled()

    const foreign = fakeDb({ coreUserId: '22000000-0000-4000-8000-000000000002' })
    expect(await recordCoreUserOnLegacyTenant(foreign.db, { phoneE164: '+905551234567', userId: USER })).toEqual({ status: 'failed', esnafId: 'esnaf-1' })
    expect(foreign.update).not.toHaveBeenCalled()
  })

  it('does nothing for unknown or ambiguous phones', async () => {
    const db = fakeDb({})
    mockedResolver.mockResolvedValueOnce({ kind: 'none' } as never)
    expect(await recordCoreUserOnLegacyTenant(db.db, { phoneE164: '+905551234567', userId: USER })).toEqual({ status: 'not_found', esnafId: null })
    mockedResolver.mockResolvedValueOnce({ kind: 'ambiguous', count: 2 } as never)
    expect(await recordCoreUserOnLegacyTenant(db.db, { phoneE164: '+905551234567', userId: USER })).toEqual({ status: 'ambiguous', esnafId: null })
    expect(db.update).not.toHaveBeenCalled()
  })

  it('adaptLegacyIdentity combines both steps and degrades gracefully', async () => {
    mockedResolver.mockResolvedValue({ kind: 'unique', account: { tenantId: 'esnaf-9', telefonTemiz: '905551234567', durum: 'aktif' } } as never)
    const client = { applyCommand: vi.fn(async () => ({ linked: true })) } as unknown as CorePlatformClient
    const db = fakeDb({})
    expect(await adaptLegacyIdentity({ client, db: db.db }, { phoneE164: '+905551234567', userId: USER })).toEqual({
      identityAlias: 'linked',
      legacyEsnafId: 'esnaf-9',
      legacyTenantShadow: 'written',
    })
    expect(await adaptLegacyIdentity({ client, db: null }, { phoneE164: '+905551234567', userId: USER })).toMatchObject({ legacyTenantShadow: 'skipped' })
  })
})
