/**
 * Rate Limiter — Tiered rate limiting for all API layers
 * ───────────────────────────────────────────────────────
 * In-memory (single instance) + Firestore (distributed)
 */

interface RateLimitConfig {
  windowMs: number
  maxRequests: number
  keyBy: 'esnafId' | 'ip' | 'ip_fingerprint' | 'apiKey'
}

export const RATE_LIMITS: Record<string, RateLimitConfig> = {
  dashboard_api: { windowMs: 60_000, maxRequests: 200, keyBy: 'esnafId' },
  customer_api:  { windowMs: 60_000, maxRequests: 60,  keyBy: 'ip' },
  auth_endpoints:{ windowMs: 900_000, maxRequests: 10,  keyBy: 'ip' },       // 15 min window
  webhook:       { windowMs: 1_000,  maxRequests: 30,  keyBy: 'esnafId' },
  ai_endpoints:  { windowMs: 60_000, maxRequests: 20,  keyBy: 'esnafId' },
  external_api:  { windowMs: 60_000, maxRequests: 100, keyBy: 'apiKey' },
}

// In-memory store (single Cloud Run instance)
const store = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(
  tier: keyof typeof RATE_LIMITS,
  key: string,
): { allowed: boolean; remaining: number; retryAfter?: number } {
  const config = RATE_LIMITS[tier]
  if (!config) return { allowed: true, remaining: 999 }

  const storeKey = `${tier}:${key}`
  const now = Date.now()

  let entry = store.get(storeKey)
  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + config.windowMs }
    store.set(storeKey, entry)
  }

  entry.count++

  if (entry.count > config.maxRequests) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
    return { allowed: false, remaining: 0, retryAfter }
  }

  return { allowed: true, remaining: config.maxRequests - entry.count }
}

// Cleanup stale entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetAt) store.delete(key)
  }
}, 5 * 60_000)

/**
 * Rate limit response helper
 */
export function rateLimitResponse(retryAfter: number) {
  return {
    error: 'rate_limit',
    message: 'Çok fazla istek. Lütfen bekleyin.',
    retryAfter,
  }
}
