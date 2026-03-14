/**
 * rateLimiter.test.ts — Rate Limiter Token Bucket Testleri
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { checkRateLimit, type RateLimitTier } from '@/lib/rateLimiter'

describe('rateLimiter', () => {
    const id = 'test-user-' + Date.now()

    describe('checkRateLimit — public tier', () => {
        it('ilk istekte izin vermeli', () => {
            const result = checkRateLimit(`pub-${Date.now()}`, 'public')
            expect(result.allowed).toBe(true)
            expect(result.remaining).toBe(59) // 60 - 1
        })

        it('60 istek sonra reddetmeli', () => {
            const testId = `pub-exhaust-${Date.now()}`
            for (let i = 0; i < 60; i++) {
                checkRateLimit(testId, 'public')
            }
            const result = checkRateLimit(testId, 'public')
            expect(result.allowed).toBe(false)
            expect(result.remaining).toBe(0)
        })
    })

    describe('checkRateLimit — ai_operation tier', () => {
        it('5 istek limitinde çalışmalı', () => {
            const testId = `ai-${Date.now()}`
            for (let i = 0; i < 5; i++) {
                const r = checkRateLimit(testId, 'ai_operation')
                expect(r.allowed).toBe(true)
            }
            const overflow = checkRateLimit(testId, 'ai_operation')
            expect(overflow.allowed).toBe(false)
        })
    })

    describe('checkRateLimit — Google API tier\'leri', () => {
        it('gemini_api tier çalışmalı', () => {
            const r = checkRateLimit(`gemini-${Date.now()}`, 'gemini_api')
            expect(r.allowed).toBe(true)
            expect(r.remaining).toBe(9) // 10 - 1
        })

        it('google_ads tier çalışmalı', () => {
            const r = checkRateLimit(`ads-${Date.now()}`, 'google_ads')
            expect(r.allowed).toBe(true)
            expect(r.remaining).toBe(19) // 20 - 1
        })

        it('google_gmb tier çalışmalı', () => {
            const r = checkRateLimit(`gmb-${Date.now()}`, 'google_gmb')
            expect(r.allowed).toBe(true)
            expect(r.remaining).toBe(29) // 30 - 1
        })
    })

    describe('checkRateLimit — cost parametresi', () => {
        it('cost > 1 ile doğru token düşüşü yapmalı', () => {
            const testId = `cost-${Date.now()}`
            const r = checkRateLimit(testId, 'public', 10)
            expect(r.allowed).toBe(true)
            expect(r.remaining).toBe(50) // 60 - 10
        })

        it('cost > remaining olduğunda reddetmeli', () => {
            const testId = `cost-over-${Date.now()}`
            checkRateLimit(testId, 'ai_operation', 5) // 5 token harca
            const r = checkRateLimit(testId, 'ai_operation', 1)
            expect(r.allowed).toBe(false)
        })
    })

    describe('retryAfter', () => {
        it('reddedildiğinde retryAfter dönmeli', () => {
            const testId = `retry-${Date.now()}`
            for (let i = 0; i < 60; i++) checkRateLimit(testId, 'public')
            const r = checkRateLimit(testId, 'public')
            expect(r.retryAfter).toBeDefined()
            expect(r.retryAfter).toBeGreaterThan(0)
        })
    })
})
