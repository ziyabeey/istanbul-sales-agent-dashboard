/**
 * Credential encryption — AES-256-GCM with a versioned key envelope.
 *
 * New writes: kcred.v1.<base64url-json>
 * Legacy reads: iv:authTag:ciphertext (hex)
 *
 * Preferred env:
 *   CREDENTIAL_ACTIVE_KID
 *   CREDENTIAL_KEYRING_JSON
 *
 * Keyring example:
 * {
 *   "2026-09": { "keyHex": "<64 hex>", "status": "active" },
 *   "2026-06": { "keyHex": "<64 hex>", "status": "decrypt_only" }
 * }
 *
 * TOKEN_ENCRYPTION_KEY remains decrypt-only migration authority for old
 * ciphertext. If no keyring is configured yet, the same valid legacy key may
 * bootstrap a versioned `legacy-bootstrap` envelope without writing the old
 * unversioned format again.
 */

import crypto from 'node:crypto'
import {
    EncryptionEnvelopeV1Schema,
    type CredentialVersionStatus,
    type EncryptionEnvelopeV1,
} from '../../../../packages/security/src/credentials'

const ALGORITHM = 'aes-256-gcm'
const ENVELOPE_ALGORITHM = 'A256GCM' as const
const IV_LENGTH = 16
const TAG_LENGTH = 16
const ENVELOPE_PREFIX = 'kcred.v1.'
export const CREDENTIAL_ENVELOPE_PREFIX = ENVELOPE_PREFIX
const LEGACY_BOOTSTRAP_KID = 'legacy-bootstrap'

type KeyringEntry = {
    keyHex: string
    status: CredentialVersionStatus
}

type KeyringConfig = Record<string, KeyringEntry>

function parseHexKey(keyHex: string, label: string): Buffer {
    if (!/^[0-9a-fA-F]{64}$/.test(keyHex)) {
        throw new Error(`[TOKEN_SIFRELEME] ${label} 64 karakter hex olmalıdır`)
    }
    return Buffer.from(keyHex, 'hex')
}

function legacyKeyHex(): string | null {
    const value = process.env.TOKEN_ENCRYPTION_KEY?.trim()
    if (!value) return null
    parseHexKey(value, 'TOKEN_ENCRYPTION_KEY')
    return value
}

function configuredKeyring(): KeyringConfig {
    const serialized = process.env.CREDENTIAL_KEYRING_JSON?.trim()

    if (!serialized) {
        const legacy = legacyKeyHex()
        if (!legacy) {
            throw new Error(
                '[TOKEN_SIFRELEME] CREDENTIAL_KEYRING_JSON veya migration için TOKEN_ENCRYPTION_KEY zorunludur'
            )
        }
        return {
            [LEGACY_BOOTSTRAP_KID]: {
                keyHex: legacy,
                status: 'active',
            },
        }
    }

    let parsed: unknown
    try {
        parsed = JSON.parse(serialized)
    } catch {
        throw new Error('[TOKEN_SIFRELEME] CREDENTIAL_KEYRING_JSON geçerli JSON olmalıdır')
    }

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        throw new Error('[TOKEN_SIFRELEME] CREDENTIAL_KEYRING_JSON bir key map olmalıdır')
    }

    const ring: KeyringConfig = {}
    for (const [kid, raw] of Object.entries(parsed)) {
        if (!kid.trim()) throw new Error('[TOKEN_SIFRELEME] Credential kid boş olamaz')
        if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
            throw new Error(`[TOKEN_SIFRELEME] Credential key ${kid} geçersiz`)
        }

        const candidate = raw as Record<string, unknown>
        const keyHex = typeof candidate.keyHex === 'string' ? candidate.keyHex.trim() : ''
        const status = candidate.status
        parseHexKey(keyHex, `Credential key ${kid}`)

        if (status !== 'active' && status !== 'decrypt_only' && status !== 'revoked') {
            throw new Error(`[TOKEN_SIFRELEME] Credential key ${kid} status geçersiz`)
        }
        ring[kid] = { keyHex, status }
    }

    if (Object.keys(ring).length === 0) {
        throw new Error('[TOKEN_SIFRELEME] Credential keyring boş olamaz')
    }

    return ring
}

function activeKid(): string {
    const configured = process.env.CREDENTIAL_ACTIVE_KID?.trim()
    if (configured) return configured

    if (!process.env.CREDENTIAL_KEYRING_JSON?.trim() && legacyKeyHex()) {
        return LEGACY_BOOTSTRAP_KID
    }

    throw new Error('[TOKEN_SIFRELEME] CREDENTIAL_ACTIVE_KID zorunludur')
}

function activeEncryptionKey(): { kid: string; key: Buffer } {
    const ring = configuredKeyring()
    const kid = activeKid()
    const entry = ring[kid]
    if (!entry) throw new Error(`[TOKEN_SIFRELEME] Aktif credential key bulunamadı: ${kid}`)
    if (entry.status !== 'active') {
        throw new Error(`[TOKEN_SIFRELEME] Yazma key'i active olmalıdır: ${kid}`)
    }
    return { kid, key: parseHexKey(entry.keyHex, `Credential key ${kid}`) }
}

function envelopeDecryptionKey(kid: string): Buffer {
    const entry = configuredKeyring()[kid]
    if (!entry) throw new Error(`[TOKEN_SIFRELEME] Credential key bulunamadı: ${kid}`)
    if (entry.status === 'revoked') {
        throw new Error(`[TOKEN_SIFRELEME] Credential key revoked: ${kid}`)
    }
    return parseHexKey(entry.keyHex, `Credential key ${kid}`)
}

function legacyDecryptionKey(): Buffer {
    const value = legacyKeyHex()
    if (!value) {
        throw new Error('[TOKEN_SIFRELEME] Legacy decrypt için TOKEN_ENCRYPTION_KEY zorunludur')
    }
    return parseHexKey(value, 'TOKEN_ENCRYPTION_KEY')
}

function aadFor(kid: string): Buffer {
    return Buffer.from(`kepenk-credential:v1:${kid}:${ENVELOPE_ALGORITHM}`, 'utf8')
}

function encodeEnvelope(envelope: EncryptionEnvelopeV1): string {
    const json = JSON.stringify(EncryptionEnvelopeV1Schema.parse(envelope))
    return `${ENVELOPE_PREFIX}${Buffer.from(json, 'utf8').toString('base64url')}`
}

export function credentialEnvelopeCoz(ciphertext: string): EncryptionEnvelopeV1 | null {
    if (!ciphertext.startsWith(ENVELOPE_PREFIX)) return null

    try {
        const encoded = ciphertext.slice(ENVELOPE_PREFIX.length)
        const json = Buffer.from(encoded, 'base64url').toString('utf8')
        return EncryptionEnvelopeV1Schema.parse(JSON.parse(json))
    } catch {
        throw new Error('[TOKEN_SIFRELEME] Geçersiz credential envelope')
    }
}

/** New writes always use the versioned envelope and the active kid. */
export function tokenSifrele(plaintext: string): string {
    if (!plaintext) throw new Error('[TOKEN_SIFRELEME] Şifrelenecek credential boş olamaz')

    const { kid, key } = activeEncryptionKey()
    const iv = crypto.randomBytes(IV_LENGTH)
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv, { authTagLength: TAG_LENGTH })
    cipher.setAAD(aadFor(kid))

    const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
    const authTag = cipher.getAuthTag()

    return encodeEnvelope({
        v: 1,
        kid,
        alg: ENVELOPE_ALGORITHM,
        iv: iv.toString('base64url'),
        tag: authTag.toString('base64url'),
        ciphertext: encrypted.toString('base64url'),
    })
}

function decryptEnvelope(envelope: EncryptionEnvelopeV1): string {
    const key = envelopeDecryptionKey(envelope.kid)
    const iv = Buffer.from(envelope.iv, 'base64url')
    const authTag = Buffer.from(envelope.tag, 'base64url')
    const encrypted = Buffer.from(envelope.ciphertext, 'base64url')

    if (iv.length !== IV_LENGTH || authTag.length !== TAG_LENGTH || encrypted.length === 0) {
        throw new Error('[TOKEN_SIFRELEME] Geçersiz credential envelope binary alanları')
    }

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv, { authTagLength: TAG_LENGTH })
    decipher.setAAD(aadFor(envelope.kid))
    decipher.setAuthTag(authTag)
    return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8')
}

function decryptLegacyCiphertext(ciphertext: string): string {
    const parts = ciphertext.split(':')
    if (parts.length !== 3) {
        throw new Error('[TOKEN_SIFRELEME] Geçersiz legacy şifreli metin formatı')
    }

    const [ivHex, authTagHex, encryptedHex] = parts
    const iv = Buffer.from(ivHex, 'hex')
    const authTag = Buffer.from(authTagHex, 'hex')
    const encrypted = Buffer.from(encryptedHex, 'hex')

    if (iv.length !== IV_LENGTH || authTag.length !== TAG_LENGTH || encrypted.length === 0) {
        throw new Error('[TOKEN_SIFRELEME] Geçersiz legacy binary alanları')
    }

    const decipher = crypto.createDecipheriv(ALGORITHM, legacyDecryptionKey(), iv, {
        authTagLength: TAG_LENGTH,
    })
    decipher.setAuthTag(authTag)
    return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8')
}

/** Reads both P0-05 envelopes and pre-P0-05 ciphertext during the migration window. */
export function tokenCoz(ciphertext: string): string {
    const envelope = credentialEnvelopeCoz(ciphertext)
    if (envelope) return decryptEnvelope(envelope)
    return decryptLegacyCiphertext(ciphertext)
}

export function tokenGecerliMi(ciphertext: string): boolean {
    try {
        tokenCoz(ciphertext)
        return true
    } catch {
        return false
    }
}

/** True when a successful read should be re-encrypted with the active kid. */
export function credentialRotationGerekli(ciphertext: string): boolean {
    const envelope = credentialEnvelopeCoz(ciphertext)
    if (!envelope) return true

    const entry = configuredKeyring()[envelope.kid]
    if (!entry || entry.status === 'revoked') return true
    return envelope.kid !== activeKid() || entry.status !== 'active'
}

export function credentialAktifKid(): string {
    return activeKid()
}
