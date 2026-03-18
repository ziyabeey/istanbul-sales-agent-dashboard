/**
 * @kepenk/security — Prompt Injection Guard
 *
 * Sanitizes user input before sending to Claude.
 * Validates AI tool_use actions before execution.
 *
 * Attack vectors covered:
 * 1. Direct instruction override ("ignore previous instructions")
 * 2. Role-play ("pretend you are...")
 * 3. Data exfiltration ("reveal your system prompt")
 * 4. Encoding bypass (hex, unicode, base64)
 * 5. Zero-width character injection
 */

const INJECTION_PATTERNS: RegExp[] = [
  // Direct instruction override
  /ignore\s+(all\s+)?previous\s+instructions/i,
  /önceki\s+talimatları?\s+(unut|görmezden\s+gel|iptal)/i,
  /system\s*prompt/i,
  /you\s+are\s+now/i,
  /sen\s+artık/i,
  /new\s+instructions?/i,
  /yeni\s+talimat/i,

  // Role-play
  /pretend\s+(to\s+be|you('re|'re))/i,
  /act\s+as\s+(if|a)/i,
  /role\s*play/i,

  // Data exfiltration
  /reveal\s+your\s+(system|prompt|instructions)/i,
  /what\s+(are|is)\s+your\s+(system|prompt|instructions)/i,
  /talimatlarını?\s+göster/i,

  // Encoding bypass
  /\\x[0-9a-f]{2}/i,
  /\\u[0-9a-f]{4}/i,
  /data:text\/plain;base64/i,
]

export interface SanitizeResult {
  sanitized: string
  injectionDetected: boolean
  detectedPatterns: string[]
}

/**
 * Sanitize user input before sending to LLM.
 */
export function sanitizeUserInput(input: string, maxLength = 4096): SanitizeResult {
  const detectedPatterns: string[] = []

  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(input)) {
      detectedPatterns.push(pattern.source)
    }
  }

  // Remove dangerous Unicode chars
  const sanitized = input
    .replace(/[\u200B-\u200F\u2028-\u202F\uFEFF]/g, '')  // Zero-width chars
    .replace(/[\u0000-\u001F]/g, '')                       // Control chars
    .trim()
    .substring(0, maxLength)

  return {
    sanitized,
    injectionDetected: detectedPatterns.length > 0,
    detectedPatterns,
  }
}

export interface AIActionValidation {
  valid: boolean
  reason?: string
}

/**
 * Validate AI tool_use output BEFORE executing the action.
 */
export function validateAIAction(
  action: string,
  params: Record<string, unknown>,
  context: { tenantId: string; userRole: string },
): AIActionValidation {
  // 1. Tenant isolation — no cross-tenant access
  if (params.siteId && params.siteId !== context.tenantId) {
    return { valid: false, reason: 'Cross-tenant access attempt' }
  }

  // 2. Date validation — no bookings in the past
  if (action === 'create_booking' && params.date) {
    const bookingDate = new Date(params.date as string)
    if (bookingDate < new Date()) {
      return { valid: false, reason: 'Cannot create booking in the past' }
    }
  }

  // 3. Amount validation — sanity check
  if (params.amount && typeof params.amount === 'number') {
    if (params.amount < 0 || params.amount > 1_000_000) {
      return { valid: false, reason: 'Amount out of valid range' }
    }
  }

  return { valid: true }
}
