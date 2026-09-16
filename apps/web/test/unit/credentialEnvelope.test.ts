import crypto from 'node:crypto'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  CREDENTIAL_ENVELOPE_PREFIX,
  credentialAktifKid,
  credentialEnvelopeCoz,
  credentialRotationGerekli,
  tokenCoz,
  tokenGecerliMi,
  tokenSifrele,
} from '@/lib/tokenSifreleme'
import {
  EnvCredentialResolver,
  PLATFORM_CREDENTIAL_REFS,
  prepareEncryptedCredentialValues,
  resolveRequiredCredential,
} from '@/lib/credentials/credentialResolver'

const KEY_A = '11'.repeat(32)
const KEY_B = '22'.repeat(32)
const KEY_C = '33'.repeat(32)

const TRACKED_ENV = [
  'CREDENTIAL_ACTIVE_KID',
  'CREDENTIAL_KEYRING_JSON',
  'TOKEN_ENCRYPTION_KEY',
  'TWILIO_ACCOUNT_SID',
  'TWILIO_AUTH_TOKEN',
  'TWILIO_WHATSAPP_FROM',
  'UNSPLASH_ACCESS_KEY',
  'NEXT_PUBLIC_UNSPLASH_ACCESS_KEY',
] as const

const originalEnv = Object.fromEntries(
  TRACKED_ENV.map((name) => [name, process.env[name]])
) as Record<(typeof TRACKED_ENV)[number], string | undefined>

function clearTrackedEnv() {
  for (const name of TRACKED_ENV) delete process.env[name]
}

function setKeyring(
  activeKid: string,
  keys: Record<string, { keyHex: string; status: 'active' | 'decrypt_only' | 'revoked' }>
) {
  process.env.CREDENTIAL_ACTIVE_KID = activeKid
  process.env.CREDENTIAL_KEYRING_JSON = JSON.stringify(keys)
}

function legacyEncrypt(plaintext: string, keyHex: string): string {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(keyHex, 'hex'), iv)
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
  return `${iv.toString('hex')}:${cipher.getAuthTag().toString('hex')}:${encrypted.toString('hex')}`
}

beforeEach(() => {
  clearTrackedEnv()
})

afterEach(() => {
  for (const name of TRACKED_ENV) {
    const value = originalEnv[name]
    if (value === undefined) delete process.env[name]
    else process.env[name] = value
  }
})

describe('P0-05 versioned credential envelope', () => {
  it('always writes v1 envelope with the active kid', () => {
    setKeyring('k-current', {
      'k-current': { keyHex: KEY_A, status: 'active' },
    })

    const ciphertext = tokenSifrele('secret-value')
    const envelope = credentialEnvelopeCoz(ciphertext)

    expect(ciphertext.startsWith(CREDENTIAL_ENVELOPE_PREFIX)).toBe(true)
    expect(ciphertext.split(':')).toHaveLength(1)
    expect(envelope).toMatchObject({ v: 1, kid: 'k-current', alg: 'A256GCM' })
    expect(credentialAktifKid()).toBe('k-current')
    expect(tokenCoz(ciphertext)).toBe('secret-value')
    expect(credentialRotationGerekli(ciphertext)).toBe(false)
  })

  it('decrypts a previous decrypt-only key and marks it for rotation', () => {
    setKeyring('k-old', {
      'k-old': { keyHex: KEY_A, status: 'active' },
    })
    const oldCiphertext = tokenSifrele('refresh-token')

    setKeyring('k-new', {
      'k-old': { keyHex: KEY_A, status: 'decrypt_only' },
      'k-new': { keyHex: KEY_B, status: 'active' },
    })

    expect(tokenCoz(oldCiphertext)).toBe('refresh-token')
    expect(credentialRotationGerekli(oldCiphertext)).toBe(true)
    expect(credentialEnvelopeCoz(tokenSifrele('new-secret'))?.kid).toBe('k-new')
  })

  it('rejects ciphertext whose key has been revoked', () => {
    setKeyring('k-a', {
      'k-a': { keyHex: KEY_A, status: 'active' },
    })
    const ciphertext = tokenSifrele('must-not-read-after-revoke')

    setKeyring('k-b', {
      'k-a': { keyHex: KEY_A, status: 'revoked' },
      'k-b': { keyHex: KEY_B, status: 'active' },
    })

    expect(() => tokenCoz(ciphertext)).toThrow(/revoked/)
    expect(tokenGecerliMi(ciphertext)).toBe(false)
  })

  it('detects envelope tampering through GCM authentication and AAD', () => {
    setKeyring('k-current', {
      'k-current': { keyHex: KEY_A, status: 'active' },
    })
    const ciphertext = tokenSifrele('tamper-resistant')
    const envelope = credentialEnvelopeCoz(ciphertext)!
    const tamperedEnvelope = {
      ...envelope,
      ciphertext: `${envelope.ciphertext.slice(0, -2)}AA`,
    }
    const tampered = `${CREDENTIAL_ENVELOPE_PREFIX}${Buffer.from(
      JSON.stringify(tamperedEnvelope),
      'utf8'
    ).toString('base64url')}`

    expect(() => tokenCoz(tampered)).toThrow()
  })

  it('reads pre-P0-05 legacy ciphertext only with TOKEN_ENCRYPTION_KEY', () => {
    process.env.TOKEN_ENCRYPTION_KEY = KEY_C
    setKeyring('k-current', {
      'k-current': { keyHex: KEY_A, status: 'active' },
    })

    const legacy = legacyEncrypt('legacy-refresh-token', KEY_C)
    expect(tokenCoz(legacy)).toBe('legacy-refresh-token')
    expect(credentialRotationGerekli(legacy)).toBe(true)

    delete process.env.TOKEN_ENCRYPTION_KEY
    expect(() => tokenCoz(legacy)).toThrow(/TOKEN_ENCRYPTION_KEY/)
  })

  it('can bootstrap versioned writes from the existing legacy key without writing legacy format', () => {
    process.env.TOKEN_ENCRYPTION_KEY = KEY_A

    const ciphertext = tokenSifrele('bootstrap-secret')
    expect(ciphertext.startsWith(CREDENTIAL_ENVELOPE_PREFIX)).toBe(true)
    expect(credentialEnvelopeCoz(ciphertext)?.kid).toBe('legacy-bootstrap')
    expect(tokenCoz(ciphertext)).toBe('bootstrap-secret')
  })

  it('fails closed when neither keyring nor legacy migration key exists', () => {
    expect(() => tokenSifrele('no-key')).toThrow(/CREDENTIAL_KEYRING_JSON|TOKEN_ENCRYPTION_KEY/)
  })
})

describe('P0-05 credential resolvers', () => {
  it('resolves platform env credentials without exposing env names to provider clients', async () => {
    process.env.TWILIO_ACCOUNT_SID = 'AC-test'
    process.env.TWILIO_AUTH_TOKEN = 'twilio-secret'
    process.env.TWILIO_WHATSAPP_FROM = 'whatsapp:+15550001111'

    const credential = await resolveRequiredCredential(
      new EnvCredentialResolver(),
      PLATFORM_CREDENTIAL_REFS.twilio,
      ['accountSid', 'authToken', 'fromNumber']
    )

    expect(credential.values).toEqual({
      accountSid: 'AC-test',
      authToken: 'twilio-secret',
      fromNumber: 'whatsapp:+15550001111',
    })
  })

  it('fails closed when a required platform credential field is missing', async () => {
    process.env.TWILIO_ACCOUNT_SID = 'AC-test'
    process.env.TWILIO_AUTH_TOKEN = 'twilio-secret'

    await expect(resolveRequiredCredential(
      new EnvCredentialResolver(),
      PLATFORM_CREDENTIAL_REFS.twilio,
      ['accountSid', 'authToken', 'fromNumber']
    )).rejects.toThrow(/fromNumber/)
  })

  it('never resolves a confidential Unsplash key from NEXT_PUBLIC env', async () => {
    process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY = 'must-not-be-used'

    const resolved = await new EnvCredentialResolver().resolve(PLATFORM_CREDENTIAL_REFS.unsplash)
    expect(resolved?.values.accessKey).toBeUndefined()
  })

  it('prepares encrypted-store payloads with the active kid and no immediate rotation debt', () => {
    setKeyring('k-current', {
      'k-current': { keyHex: KEY_A, status: 'active' },
    })

    const prepared = prepareEncryptedCredentialValues({
      accessToken: 'access',
      refreshToken: 'refresh',
    })

    expect(prepared.kid).toBe('k-current')
    expect(prepared.needsRotation).toBe(false)
    expect(JSON.parse(tokenCoz(prepared.envelope))).toEqual({
      accessToken: 'access',
      refreshToken: 'refresh',
    })
  })
})
