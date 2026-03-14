/**
 * rateLimiter.ts — API Rate Limiting (In-Memory Token Bucket)
 * 
 * Tier'ler:
 * - Public API: 60 req/dk
 * - Authenticated: 120 req/dk
 * - Webhook: 300 req/dk
 * - Admin: 600 req/dk
 */

interface BucketEntry {
  tokens: number
  lastRefill: number
}

const buckets = new Map<string, BucketEntry>()

// Temizleme — 5dk'da bir eski bucket'ları sil
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of buckets.entries()) {
      if (now - entry.lastRefill > 10 * 60 * 1000) buckets.delete(key)
    }
  }, 5 * 60 * 1000)
}

export type RateLimitTier = 'public' | 'authenticated' | 'webhook' | 'admin' | 'ai_operation' | 'gemini_api' | 'google_ads' | 'google_gmb'

const TIER_CONFIG: Record<RateLimitTier, { maxTokens: number; refillRate: number }> = {
  public:        { maxTokens: 60,  refillRate: 1 },
  authenticated: { maxTokens: 120, refillRate: 2 },
  webhook:       { maxTokens: 300, refillRate: 5 },
  admin:         { maxTokens: 600, refillRate: 10 },
  ai_operation:  { maxTokens: 5,   refillRate: 1 },   // Esnaf başına sn/5 AI işlem
  gemini_api:    { maxTokens: 10,  refillRate: 0.17 }, // 10 req/dk (Gemini free tier)
  google_ads:    { maxTokens: 20,  refillRate: 0.33 }, // 20 req/dk (Ads API)
  google_gmb:    { maxTokens: 30,  refillRate: 0.5 },  // 30 req/dk (GMB API)
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetMs: number
  retryAfter?: number
}

export function checkRateLimit(
  identifier: string,
  tier: RateLimitTier = 'public',
  cost: number = 1
): RateLimitResult {
  const config = TIER_CONFIG[tier]
  const key = `${tier}:${identifier}`
  const now = Date.now()

  let bucket = buckets.get(key)
  if (!bucket) {
    bucket = { tokens: config.maxTokens, lastRefill: now }
    buckets.set(key, bucket)
  }

  const elapsed = now - bucket.lastRefill
  const refillAmount = Math.floor(elapsed / 1000) * config.refillRate
  if (refillAmount > 0) {
    bucket.tokens = Math.min(config.maxTokens, bucket.tokens + refillAmount)
    bucket.lastRefill = now
  }

  if (bucket.tokens >= cost) {
    bucket.tokens -= cost
    return { allowed: true, remaining: bucket.tokens, resetMs: Math.ceil((config.maxTokens - bucket.tokens) / config.refillRate) * 1000 }
  }

  const retryAfter = Math.ceil(cost / config.refillRate) * 1000
  return { allowed: false, remaining: 0, resetMs: retryAfter, retryAfter }
}

export function getClientIP(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || request.headers.get('cf-connecting-ip')
    || '127.0.0.1'
}

// Backward compatibility — eski route'lar bu ismi kullanıyor
export const rateLimitCheck = checkRateLimit

