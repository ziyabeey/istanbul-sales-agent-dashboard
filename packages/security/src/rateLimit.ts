/**
 * @kepenk/security — Rate Limiting Types + Config
 *
 * @upstash/ratelimit + @upstash/redis
 * Different limits per endpoint type.
 */

export type RateLimitTier = 'api' | 'ai' | 'payment' | 'webhook' | 'auth' | 'invitation'

export interface RateLimitConfig {
  tier: RateLimitTier
  windowMs: number            // sliding window in ms
  maxRequests: number
  prefix: string
}

export const RATE_LIMITS: Record<RateLimitTier, RateLimitConfig> = {
  api:        { tier: 'api',        windowMs: 10_000,    maxRequests: 100,  prefix: 'rl:api' },
  ai:         { tier: 'ai',         windowMs: 10_000,    maxRequests: 10,   prefix: 'rl:ai' },
  payment:    { tier: 'payment',    windowMs: 60_000,    maxRequests: 5,    prefix: 'rl:payment' },
  webhook:    { tier: 'webhook',    windowMs: 1_000,     maxRequests: 500,  prefix: 'rl:webhook' },
  auth:       { tier: 'auth',       windowMs: 900_000,   maxRequests: 5,    prefix: 'rl:auth' },
  invitation: { tier: 'invitation', windowMs: 3_600_000, maxRequests: 3,    prefix: 'rl:invite' },
}

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number               // epoch ms
}
