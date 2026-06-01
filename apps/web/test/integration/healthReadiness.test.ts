import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { GET } from '@/app/api/health/readiness/route'

type ApiResponse<T> = {
    status: number
    ok: boolean
    json: () => Promise<T>
}

const TRACKED_ENV = [
    'NODE_ENV',
    'ADMIN_SECRET_TOKEN',
    'SESSION_SECRET',
    'FIREBASE_PROJECT_ID',
    'FIREBASE_CLIENT_EMAIL',
    'FIREBASE_PRIVATE_KEY',
    'NEXT_PUBLIC_APP_URL',
    'KEPENK_DEMO_MODE',
    'NEXT_PUBLIC_DEMO_MODE',
    'DEMO_MODE',
    'KEPENK_SITE_GENERATION_ENABLED',
    'KEPENK_SITE_PUBLISH_ENABLED',
    'KEPENK_SITE_EDITOR_SAVE_ENABLED',
    'KEPENK_SITE_EDITOR_PUBLISH_ENABLED',
    'CRON_SECRET',
    'GEMINI_API_KEY',
    'GOOGLE_API_KEY',
    'CF_ACCOUNT_ID',
    'CF_PAGES_TOKEN',
    'CF_API_TOKEN',
    'CF_ZONE_ID',
] as const

const originalEnv = Object.fromEntries(
    TRACKED_ENV.map((name) => [name, process.env[name]])
) as Record<(typeof TRACKED_ENV)[number], string | undefined>

function clearTrackedEnv() {
    for (const name of TRACKED_ENV) {
        delete process.env[name]
    }
}

function readinessRequest(token?: string): Request {
    const headers = token ? { 'x-admin-token': token } : undefined
    return new Request('http://localhost/api/health/readiness', { headers })
}

async function callReadiness(token?: string) {
    return GET(readinessRequest(token)) as Promise<ApiResponse<Record<string, unknown>>>
}

function setProductionReadyEnv() {
    process.env.NODE_ENV = 'production'
    process.env.ADMIN_SECRET_TOKEN = 'admin-secret-value'
    process.env.SESSION_SECRET = 'session-secret-value'
    process.env.FIREBASE_PROJECT_ID = 'kepenk-prod'
    process.env.FIREBASE_CLIENT_EMAIL = 'firebase@example.com'
    process.env.FIREBASE_PRIVATE_KEY = 'firebase-private-key-value'
}

describe('internal health readiness route', () => {
    beforeEach(() => {
        clearTrackedEnv()
    })

    afterEach(() => {
        for (const name of TRACKED_ENV) {
            const originalValue = originalEnv[name]
            if (originalValue === undefined) {
                delete process.env[name]
            } else {
                process.env[name] = originalValue
            }
        }
    })

    it('ADMIN_SECRET_TOKEN yoksa 401 doner', async () => {
        const response = await callReadiness('anything')
        const body = await response.json()

        expect(response.status).toBe(401)
        expect(body).toEqual({ error: 'Yetkisiz', code: 'UNAUTHORIZED' })
    })

    it('x-admin-token eksikse 401 doner', async () => {
        process.env.ADMIN_SECRET_TOKEN = 'admin-secret-value'

        const response = await callReadiness()
        const body = await response.json()

        expect(response.status).toBe(401)
        expect(body).toEqual({ error: 'Yetkisiz', code: 'UNAUTHORIZED' })
    })

    it('x-admin-token yanlissa 401 doner', async () => {
        process.env.ADMIN_SECRET_TOKEN = 'admin-secret-value'

        const response = await callReadiness('wrong-token')
        const body = await response.json()

        expect(response.status).toBe(401)
        expect(body).toEqual({ error: 'Yetkisiz', code: 'UNAUTHORIZED' })
    })

    it('dogru token ile safe readiness body doner', async () => {
        setProductionReadyEnv()

        const response = await callReadiness('admin-secret-value')
        const body = await response.json()

        expect(response.status).toBe(200)
        expect(body).toMatchObject({
            ok: true,
            service: 'kepenk-web',
            firebaseAdmin: 'ok',
        })
        expect(body.time).toEqual(expect.any(String))
        expect(body.controlledLaunch).toEqual(expect.any(Object))
        expect(body.features).toEqual(expect.any(Object))
    })

    it('response secret degerleri icermez', async () => {
        setProductionReadyEnv()
        process.env.NEXT_PUBLIC_APP_URL = 'https://kepenk.ai'
        process.env.KEPENK_SITE_PUBLISH_ENABLED = 'true'
        process.env.CF_ACCOUNT_ID = 'cf-account-secret-value'
        process.env.CF_PAGES_TOKEN = 'cf-pages-secret-value'
        process.env.CF_API_TOKEN = 'cf-api-secret-value'
        process.env.CF_ZONE_ID = 'cf-zone-secret-value'

        const response = await callReadiness('admin-secret-value')
        const body = await response.json()
        const serialized = JSON.stringify(body)

        expect(response.status).toBe(200)
        expect(serialized).not.toContain('admin-secret-value')
        expect(serialized).not.toContain('session-secret-value')
        expect(serialized).not.toContain('firebase-private-key-value')
        expect(serialized).not.toContain('cf-account-secret-value')
        expect(serialized).not.toContain('cf-pages-secret-value')
        expect(serialized).not.toContain('cf-api-secret-value')
        expect(serialized).not.toContain('cf-zone-secret-value')
    })
})
