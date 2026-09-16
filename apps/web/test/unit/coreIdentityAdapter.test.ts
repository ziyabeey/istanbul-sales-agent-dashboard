import { describe, expect, it, vi } from 'vitest'
import type { CorePlatformClient } from '@/lib/core/coreClient'
import { CorePlatformError } from '@/lib/core/errors'
import { assessFirebaseIdentityLinkability, FIREBASE_LINK_MAX_AUTH_AGE_SECONDS, type VerifiedFirebaseIdentity } from '@/lib/core/firebaseIdentity'
import { legacyPhoneSubject, linkFirebaseIdentity, linkLegacyPhoneIdentity } from '@/lib/core/identityAdapter'

const USER = '11000000-0000-4000-8000-000000000001'
const NOW = new Date('2026-09-16T12:00:00Z')
const NOW_SECONDS = Math.floor(NOW.getTime() / 1000)

type CommandCall = [{ idempotencyKey: string; command: string; payload: Record<string, unknown> }]

function firebaseIdentity(overrides: Partial<VerifiedFirebaseIdentity> = {}): VerifiedFirebaseIdentity {
  return { uid: 'fb-uid-0001', email: 'owner@example.test', emailVerified: true, signInProvider: 'password', authTime: NOW_SECONDS - 30, ...overrides }
}

describe('legacy phone identity linking', () => {
  it('uses the digits-only phone as the alias subject with a deterministic idempotency key', async () => {
    const applyCommand = vi.fn(async () => ({ linked: true }))
    const client = { applyCommand } as unknown as CorePlatformClient
    expect(await linkLegacyPhoneIdentity(client, { phoneE164: '+905551234567', userId: USER })).toBe('linked')
    const [input] = applyCommand.mock.calls[0] as unknown as CommandCall
    expect(input.command).toBe('LinkIdentityAlias')
    expect(input.payload).toEqual({ provider: 'legacy-kepenk-phone', external_subject: '905551234567', user_id: USER })
    expect(input.idempotencyKey).toMatch(/^kc02-identity-[0-9a-f]{48}$/)
    expect(legacyPhoneSubject('+90 555 123 45 67')).toBe('905551234567')
  })

  it('is idempotent across logins: the same phone and user always produce the same key', async () => {
    const applyCommand = vi.fn(async () => ({ linked: false }))
    const client = { applyCommand } as unknown as CorePlatformClient
    await linkLegacyPhoneIdentity(client, { phoneE164: '+905551234567', userId: USER })
    await linkLegacyPhoneIdentity(client, { phoneE164: '+90 555 123 45 67', userId: USER })
    const keys = (applyCommand.mock.calls as unknown as CommandCall[]).map((c) => c[0].idempotencyKey)
    expect(keys[0]).toBe(keys[1])
  })

  it('reports replays, conflicts and outages without throwing into the login path, and never writes legacy tenants', async () => {
    const replay = { applyCommand: vi.fn(async () => ({ linked: false })) } as unknown as CorePlatformClient
    const conflict = { applyCommand: vi.fn(async () => { throw new CorePlatformError('IDENTITY_ALIAS_CONFLICT') }) } as unknown as CorePlatformClient
    const outage = { applyCommand: vi.fn(async () => { throw new CorePlatformError('CORE_UNAVAILABLE') }) } as unknown as CorePlatformClient
    expect(await linkLegacyPhoneIdentity(replay, { phoneE164: '+905551234567', userId: USER })).toBe('already_linked')
    expect(await linkLegacyPhoneIdentity(conflict, { phoneE164: '+905551234567', userId: USER })).toBe('conflict')
    expect(await linkLegacyPhoneIdentity(outage, { phoneE164: '+905551234567', userId: USER })).toBe('failed')
    expect(await linkLegacyPhoneIdentity(replay, { phoneE164: '', userId: USER })).toBe('skipped')
  })
})

describe('verified firebase identity linking (Issue #10 migration decision)', () => {
  it('links firebase:<uid> -> user_id with the same command family and a key distinct from the phone alias', async () => {
    const applyCommand = vi.fn(async () => ({ linked: true }))
    const client = { applyCommand } as unknown as CorePlatformClient
    expect(await linkFirebaseIdentity(client, { uid: 'fb-uid-0001', userId: USER })).toBe('linked')
    await linkLegacyPhoneIdentity(client, { phoneE164: '+905551234567', userId: USER })
    const calls = applyCommand.mock.calls as unknown as CommandCall[]
    expect(calls[0][0].command).toBe('LinkIdentityAlias')
    expect(calls[0][0].payload).toEqual({ provider: 'firebase', external_subject: 'fb-uid-0001', user_id: USER })
    expect(calls[0][0].idempotencyKey).toMatch(/^kc02-identity-[0-9a-f]{48}$/)
    expect(calls[0][0].idempotencyKey).not.toBe(calls[1][0].idempotencyKey)
  })

  it('is idempotent per uid+user, maps conflicts/outages, and skips an empty uid', async () => {
    const applyCommand = vi.fn(async () => ({ linked: false }))
    const client = { applyCommand } as unknown as CorePlatformClient
    expect(await linkFirebaseIdentity(client, { uid: 'fb-uid-0001', userId: USER })).toBe('already_linked')
    expect(await linkFirebaseIdentity(client, { uid: ' fb-uid-0001 ', userId: USER })).toBe('already_linked')
    const keys = (applyCommand.mock.calls as unknown as CommandCall[]).map((c) => c[0].idempotencyKey)
    expect(keys[0]).toBe(keys[1])

    const taken = { applyCommand: vi.fn(async () => { throw new CorePlatformError('IDENTITY_ALIAS_USER_TAKEN') }) } as unknown as CorePlatformClient
    const outage = { applyCommand: vi.fn(async () => { throw new CorePlatformError('CORE_UNAVAILABLE') }) } as unknown as CorePlatformClient
    expect(await linkFirebaseIdentity(taken, { uid: 'fb-uid-0001', userId: USER })).toBe('conflict')
    expect(await linkFirebaseIdentity(outage, { uid: 'fb-uid-0001', userId: USER })).toBe('failed')
    expect(await linkFirebaseIdentity(client, { uid: '   ', userId: USER })).toBe('skipped')
  })

  it('only accepts a real sign-in provider with a fresh auth_time and a well-formed uid', () => {
    expect(assessFirebaseIdentityLinkability(firebaseIdentity(), NOW)).toEqual({ ok: true })
    expect(assessFirebaseIdentityLinkability(firebaseIdentity({ signInProvider: 'google.com', emailVerified: false }), NOW)).toEqual({ ok: true })
    expect(assessFirebaseIdentityLinkability(firebaseIdentity({ authTime: NOW_SECONDS - FIREBASE_LINK_MAX_AUTH_AGE_SECONDS }), NOW)).toEqual({ ok: true })

    expect(assessFirebaseIdentityLinkability(firebaseIdentity({ signInProvider: 'anonymous' }), NOW)).toEqual({ ok: false, reason: 'UNVERIFIED_SIGN_IN_PROVIDER' })
    expect(assessFirebaseIdentityLinkability(firebaseIdentity({ signInProvider: 'custom' }), NOW)).toEqual({ ok: false, reason: 'UNVERIFIED_SIGN_IN_PROVIDER' })
    expect(assessFirebaseIdentityLinkability(firebaseIdentity({ signInProvider: null }), NOW)).toEqual({ ok: false, reason: 'UNVERIFIED_SIGN_IN_PROVIDER' })
    expect(assessFirebaseIdentityLinkability(firebaseIdentity({ authTime: NOW_SECONDS - FIREBASE_LINK_MAX_AUTH_AGE_SECONDS - 1 }), NOW)).toEqual({ ok: false, reason: 'STALE_FIREBASE_LOGIN' })
    expect(assessFirebaseIdentityLinkability(firebaseIdentity({ authTime: NOW_SECONDS + 3600 }), NOW)).toEqual({ ok: false, reason: 'STALE_FIREBASE_LOGIN' })
    expect(assessFirebaseIdentityLinkability(firebaseIdentity({ authTime: null }), NOW)).toEqual({ ok: false, reason: 'STALE_FIREBASE_LOGIN' })
    expect(assessFirebaseIdentityLinkability(firebaseIdentity({ uid: '' }), NOW)).toEqual({ ok: false, reason: 'MISSING_UID' })
    expect(assessFirebaseIdentityLinkability(firebaseIdentity({ uid: 'has space' }), NOW)).toEqual({ ok: false, reason: 'MISSING_UID' })
    expect(assessFirebaseIdentityLinkability(firebaseIdentity({ uid: 'x'.repeat(129) }), NOW)).toEqual({ ok: false, reason: 'MISSING_UID' })
  })
})
