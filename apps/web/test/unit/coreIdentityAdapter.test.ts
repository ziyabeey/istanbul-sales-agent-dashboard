import { describe, expect, it, vi } from 'vitest'
import type { CorePlatformClient } from '@/lib/core/coreClient'
import { CorePlatformError } from '@/lib/core/errors'
import { legacyPhoneSubject, linkLegacyPhoneIdentity } from '@/lib/core/identityAdapter'

const USER = '11000000-0000-4000-8000-000000000001'

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

  it('is idempotent across logins: the same phone and user always produce the same key', async () => {
    const applyCommand = vi.fn(async () => ({ linked: false }))
    const client = { applyCommand } as unknown as CorePlatformClient
    await linkLegacyPhoneIdentity(client, { phoneE164: '+905551234567', userId: USER })
    await linkLegacyPhoneIdentity(client, { phoneE164: '+90 555 123 45 67', userId: USER })
    const keys = (applyCommand.mock.calls as unknown as Array<[{ idempotencyKey: string }]>).map((c) => c[0].idempotencyKey)
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
