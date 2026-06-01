/**
 * sessionManager.test.ts — JWT Oluştur / Dogrula Testleri
 */
import { afterEach, beforeEach, describe, it, expect } from 'vitest'

const TEST_SESSION_SECRET = 'test-secret-key-for-vitest-32char!'
let originalNodeEnv: string | undefined
let originalSessionSecret: string | undefined

// SESSION_SECRET env var ayarla (test ortami)
beforeEach(() => {
    originalNodeEnv = process.env.NODE_ENV
    originalSessionSecret = process.env.SESSION_SECRET
    process.env.NODE_ENV = 'test'
    process.env.SESSION_SECRET = TEST_SESSION_SECRET
})

afterEach(() => {
    if (originalNodeEnv === undefined) {
        delete process.env.NODE_ENV
    } else {
        process.env.NODE_ENV = originalNodeEnv
    }

    if (originalSessionSecret === undefined) {
        delete process.env.SESSION_SECRET
    } else {
        process.env.SESSION_SECRET = originalSessionSecret
    }
})

import { jwtOlustur, jwtDogrula } from '@/lib/sessionManager'

describe('sessionManager — JWT', () => {
    describe('jwtOlustur', () => {
        it('gecerli bir JWT string donmeli', async () => {
            const token = await jwtOlustur('esnaf-123')
            expect(token).toBeTruthy()
            expect(typeof token).toBe('string')
            expect(token.split('.')).toHaveLength(3)
        })

        it('farkli esnafId ile farkli token uretmeli', async () => {
            const t1 = await jwtOlustur('esnaf-1')
            const t2 = await jwtOlustur('esnaf-2')
            expect(t1).not.toBe(t2)
        })
    })

    describe('jwtDogrula', () => {
        it('kendi urettigi tokeni dogrulamali', async () => {
            const token = await jwtOlustur('esnaf-abc')
            const payload = await jwtDogrula(token)
            expect(payload).not.toBeNull()
            expect(payload!.esnafId).toBe('esnaf-abc')
        })

        it('gecersiz token icin null donmeli', async () => {
            const result = await jwtDogrula('invalid.token.here')
            expect(result).toBeNull()
        })

        it('bos string icin null donmeli', async () => {
            const result = await jwtDogrula('')
            expect(result).toBeNull()
        })

        it('manipule edilmis tokeni reddetmeli', async () => {
            const token = await jwtOlustur('esnaf-hack')
            const parts = token.split('.')
            parts[2] = 'bozuk-signature-xyz'
            const result = await jwtDogrula(parts.join('.'))
            expect(result).toBeNull()
        })

        it('farkli secret ile uretilmis tokeni reddetmeli', async () => {
            const token = await jwtOlustur('esnaf-x')
            process.env.SESSION_SECRET = 'different-secret-key-32-chars!!!'
            const result = await jwtDogrula(token)
            expect(result).toBeNull()
            process.env.SESSION_SECRET = TEST_SESSION_SECRET
        })

        it('production ortaminda SESSION_SECRET yoksa token uretmemeli', async () => {
            process.env.NODE_ENV = 'production'
            delete process.env.SESSION_SECRET

            await expect(jwtOlustur('esnaf-prod')).rejects.toThrow('SESSION_SECRET')
        })
    })

    describe('roundtrip', () => {
        it('olustur-dogrula tam dongu calismali', async () => {
            const esnafId = 'tam-dongu-test-456'
            const token = await jwtOlustur(esnafId)
            const payload = await jwtDogrula(token)
            expect(payload).not.toBeNull()
            expect(payload!.esnafId).toBe(esnafId)
        })
    })
})
