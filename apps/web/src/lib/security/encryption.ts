/**
 * Encryption — AES-256-GCM for sensitive fields
 * ────────────────────────────────────────────────
 * TC Kimlik, IBAN, API keys — application-level encryption
 */

import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 16
const AUTH_TAG_LENGTH = 16

/**
 * Encrypt sensitive field value
 * Key should come from Google Cloud KMS or env variable
 */
export function encryptField(plaintext: string, encryptionKey: string): string {
  const key = Buffer.from(encryptionKey, 'hex') // 32 bytes = 256 bits
  const iv = randomBytes(IV_LENGTH)
  const cipher = createCipheriv(ALGORITHM, key, iv, { authTagLength: AUTH_TAG_LENGTH } as any)

  let encrypted = cipher.update(plaintext, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  const authTag = cipher.getAuthTag()

  // Format: iv:authTag:ciphertext (all hex)
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`
}

/**
 * Decrypt sensitive field value
 */
export function decryptField(encryptedValue: string, encryptionKey: string): string {
  const parts = encryptedValue.split(':')
  if (parts.length !== 3) throw new Error('Invalid encrypted format')

  const [ivHex, authTagHex, ciphertext] = parts
  const key = Buffer.from(encryptionKey, 'hex')
  const iv = Buffer.from(ivHex, 'hex')
  const authTag = Buffer.from(authTagHex, 'hex')

  const decipher = createDecipheriv(ALGORITHM, key, iv, { authTagLength: AUTH_TAG_LENGTH } as any)
  decipher.setAuthTag(authTag)

  let decrypted = decipher.update(ciphertext, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

/**
 * Hash a value for non-reversible storage (e.g., IP addresses, analytics IDs)
 */
export function hashValue(value: string): string {
  const { createHash } = require('crypto')
  return createHash('sha256').update(value).digest('hex')
}

/**
 * Mask sensitive values for display
 */
export function maskValue(value: string, type: 'tc_kimlik' | 'iban' | 'card' | 'phone' | 'email'): string {
  switch (type) {
    case 'tc_kimlik': return value.slice(0, 3) + '****' + value.slice(-2)     // 123****89
    case 'iban':      return value.slice(0, 4) + '****' + value.slice(-4)     // TR12****5678
    case 'card':      return '**** **** **** ' + value.slice(-4)              // **** **** **** 4242
    case 'phone':     return value.slice(0, 4) + '***' + value.slice(-2)     // +905***42
    case 'email': {
      const [user, domain] = value.split('@')
      return user[0] + '***@' + domain                                        // a***@gmail.com
    }
    default:          return '***'
  }
}

/* Fields that require application-level encryption */
export const ENCRYPTED_FIELDS = [
  'contact.billing.tcKimlik',
  'contact.billing.taxId',
  'esnaf.bankAccount.iban',
  'esnaf.paymentSettings.iyzicoApiKey',
  'esnaf.paymentSettings.paytrMerchantKey',
] as const
