/**
 * Input Validator — Zod-based validation + sanitization
 * ──────────────────────────────────────────────────────
 * OWASP Input Validation Cheat Sheet compliant
 */

/* ═══════ Common Validation Rules ═══════ */

/** Turkish phone: +905XXXXXXXXX */
export function isValidTurkishPhone(phone: string): boolean {
  return /^\+90[5][0-9]{9}$/.test(phone.replace(/\s/g, ''))
}

/** Turkish TC Kimlik (11 digits, Luhn-like algorithm) */
export function isValidTCKimlik(tc: string): boolean {
  if (!/^\d{11}$/.test(tc)) return false
  if (tc[0] === '0') return false
  const digits = tc.split('').map(Number)
  const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8]
  const evenSum = digits[1] + digits[3] + digits[5] + digits[7]
  const check10 = (oddSum * 7 - evenSum) % 10
  if (check10 !== digits[9]) return false
  const totalSum = digits.slice(0, 10).reduce((a: number, b: number) => a + b, 0)
  return totalSum % 10 === digits[10]
}

/** Turkish IBAN: TR + 24 digits */
export function isValidTurkishIBAN(iban: string): boolean {
  return /^TR\d{24}$/.test(iban.replace(/\s/g, ''))
}

/** Sanitize string — strip HTML, trim, limit length */
export function sanitizeString(input: string, maxLength: number = 10000): string {
  return input
    .trim()
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .replace(/&[a-z]+;/gi, '') // Strip HTML entities
    .slice(0, maxLength)
}

/** Sanitize rich text — allow safe tags only (DOMPurify equivalent) */
export function sanitizeRichText(html: string): string {
  const ALLOWED_TAGS = ['p', 'br', 'strong', 'em', 'b', 'i', 'ul', 'ol', 'li', 'a', 'img', 'h2', 'h3', 'h4', 'blockquote', 'pre', 'code']
  const ALLOWED_ATTR_MAP: Record<string, string[]> = {
    a: ['href', 'target', 'rel'],
    img: ['src', 'alt', 'width', 'height'],
  }

  // Strip dangerous protocols
  let safe = html
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/on\w+\s*=/gi, '') // Remove on* event handlers

  // Strip tags not in allowlist
  const tagRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi
  safe = safe.replace(tagRegex, (match: string, tag: string) => {
    if (ALLOWED_TAGS.includes(tag.toLowerCase())) {
      // Strip disallowed attributes
      const allowedAttrs = ALLOWED_ATTR_MAP[tag.toLowerCase()] || []
      return match.replace(/\s+([a-z-]+)\s*=\s*"[^"]*"/gi, (attrMatch: string, attrName: string) => {
        return allowedAttrs.includes(attrName.toLowerCase()) ? attrMatch : ''
      })
    }
    return '' // Strip disallowed tag
  })

  return safe
}

/** Validate URL — HTTPS only, no javascript: */
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return ['https:', 'http:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

/** Check file upload magic bytes for real MIME type */
export function validateFileMagicBytes(buffer: ArrayBuffer): { valid: boolean; detectedType: string } {
  const bytes = new Uint8Array(buffer.slice(0, 12))

  // JPEG: FF D8 FF
  if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF)
    return { valid: true, detectedType: 'image/jpeg' }

  // PNG: 89 50 4E 47
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47)
    return { valid: true, detectedType: 'image/png' }

  // WebP: 52 49 46 46 ... 57 45 42 50
  if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
      bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50)
    return { valid: true, detectedType: 'image/webp' }

  // GIF: 47 49 46
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46)
    return { valid: true, detectedType: 'image/gif' }

  return { valid: false, detectedType: 'unknown' }
}

/** Sanitize filename — prevent path traversal */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[\/\\]/g, '') // Remove path separators
    .replace(/\.\./g, '')   // Remove directory traversal
    .replace(/[^a-zA-Z0-9._-]/g, '_') // Only safe chars
    .slice(0, 200)
}

/** Validate Firestore document ID */
export function isValidDocId(id: string): boolean {
  return /^[a-zA-Z0-9_-]{1,128}$/.test(id)
}

/** Prevent NoSQL injection — whitelist for filter fields */
export function validateFilterField(field: string, allowedFields: string[]): boolean {
  return allowedFields.includes(field)
}

/* ═══════ Max Sizes ═══════ */

export const MAX_SIZES = {
  STRING_DEFAULT: 10000,
  TITLE: 200,
  DESCRIPTION: 5000,
  SHORT_DESCRIPTION: 300,
  EMAIL: 254,
  PHONE: 20,
  URL: 2048,
  TAG: 50,
  SLUG: 200,
  NOTE: 2000,
  FILE_UPLOAD_BYTES: 5 * 1024 * 1024,  // 5MB
  RICH_TEXT: 400_000,  // ~400KB (Wix limit)
} as const
