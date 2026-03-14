/**
 * apiGuard.test.ts — API Authentication Guard Testleri
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { apiGuard } from '@/lib/apiGuard'

function makeReq(headers: Record<string, string> = {}): Request {
    return new Request('http://localhost/api/test', {
        method: 'GET',
        headers: new Headers(headers),
    })
}

describe('apiGuard', () => {
    beforeEach(() => {
        process.env.CRON_SECRET = 'test-cron-secret-123'
        process.env.ADMIN_SECRET_TOKEN = 'test-admin-token-456'
        process.env.ADK_BEARER_TOKEN = 'test-adk-bearer-789'
    })

    describe('requireCronSecret', () => {
        it('gecerli x-cron-secret ile ok:true donmeli', async () => {
            const result = await apiGuard(
                makeReq({ 'x-cron-secret': 'test-cron-secret-123' }),
                { requireCronSecret: true }
            )
            expect(result.ok).toBe(true)
        })

        it('gecerli Bearer token ile ok:true donmeli', async () => {
            const result = await apiGuard(
                makeReq({ 'authorization': 'Bearer test-cron-secret-123' }),
                { requireCronSecret: true }
            )
            expect(result.ok).toBe(true)
        })

        it('gecersiz secret ile 401 donmeli', async () => {
            const result = await apiGuard(
                makeReq({ 'x-cron-secret': 'wrong-secret' }),
                { requireCronSecret: true }
            )
            expect(result.ok).toBe(false)
            if (!result.ok) {
                expect(result.response.status).toBe(401)
            }
        })

        it('header olmadan 401 donmeli', async () => {
            const result = await apiGuard(makeReq(), { requireCronSecret: true })
            expect(result.ok).toBe(false)
        })
    })

    describe('requireAdminToken', () => {
        it('gecerli x-admin-token ile ok:true donmeli', async () => {
            const result = await apiGuard(
                makeReq({ 'x-admin-token': 'test-admin-token-456' }),
                { requireAdminToken: true }
            )
            expect(result.ok).toBe(true)
        })

        it('gecersiz admin token ile 403 donmeli', async () => {
            const result = await apiGuard(
                makeReq({ 'x-admin-token': 'wrong-token' }),
                { requireAdminToken: true }
            )
            expect(result.ok).toBe(false)
            if (!result.ok) {
                expect(result.response.status).toBe(403)
            }
        })
    })

    describe('requireADKBearer', () => {
        it('gecerli ADK Bearer ile ok:true donmeli', async () => {
            const result = await apiGuard(
                makeReq({ 'authorization': 'Bearer test-adk-bearer-789' }),
                { requireADKBearer: true }
            )
            expect(result.ok).toBe(true)
        })

        it('gecersiz ADK Bearer ile 401 donmeli', async () => {
            const result = await apiGuard(
                makeReq({ 'authorization': 'Bearer wrong-token' }),
                { requireADKBearer: true }
            )
            expect(result.ok).toBe(false)
            if (!result.ok) {
                expect(result.response.status).toBe(401)
            }
        })

        it('Bearer prefix olmadan 401 donmeli', async () => {
            const result = await apiGuard(
                makeReq({ 'authorization': 'test-adk-bearer-789' }),
                { requireADKBearer: true }
            )
            expect(result.ok).toBe(false)
        })
    })

    describe('opsiyonsuz cagri', () => {
        it('hicbir guard yokken ok:true donmeli', async () => {
            const result = await apiGuard(makeReq())
            expect(result.ok).toBe(true)
        })

        it('bos options objesi ile ok:true donmeli', async () => {
            const result = await apiGuard(makeReq(), {})
            expect(result.ok).toBe(true)
        })
    })

    describe('coklu guard', () => {
        it('hem cron hem admin gecerli ise ok:true', async () => {
            const result = await apiGuard(
                makeReq({
                    'x-cron-secret': 'test-cron-secret-123',
                    'x-admin-token': 'test-admin-token-456',
                }),
                { requireCronSecret: true, requireAdminToken: true }
            )
            expect(result.ok).toBe(true)
        })

        it('cron gecerli admin gecersiz ise 403 donmeli', async () => {
            const result = await apiGuard(
                makeReq({
                    'x-cron-secret': 'test-cron-secret-123',
                    'x-admin-token': 'wrong',
                }),
                { requireCronSecret: true, requireAdminToken: true }
            )
            expect(result.ok).toBe(false)
        })
    })
})
