import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const TRACKED_ENV = [
    'FIREBASE_PROJECT_ID',
    'GOOGLE_CLOUD_PROJECT',
    'FIREBASE_CLIENT_EMAIL',
    'FIREBASE_PRIVATE_KEY',
    'K_SERVICE',
    'GOOGLE_APPLICATION_CREDENTIALS',
    'FIRESTORE_EMULATOR_HOST',
] as const

const originalEnv = Object.fromEntries(
    TRACKED_ENV.map((name) => [name, process.env[name]])
) as Record<(typeof TRACKED_ENV)[number], string | undefined>

function clearEnv() {
    for (const name of TRACKED_ENV) delete process.env[name]
}

async function loadFirebaseAdmin() {
    // test/setup.ts globally mocks this app module; opt this focused regression out.
    vi.doUnmock('@/lib/firebaseAdmin')
    const initializeApp = vi.fn((options: Record<string, unknown>) => ({ options }))
    const getApps = vi.fn(() => [])
    const cert = vi.fn((value: Record<string, unknown>) => ({ kind: 'cert', value }))
    const applicationDefault = vi.fn(() => ({ kind: 'adc' }))
    const db = { collection: vi.fn() }
    const getFirestore = vi.fn(() => db)

    vi.doMock('firebase-admin/app', () => ({
        initializeApp,
        getApps,
        cert,
        applicationDefault,
    }))
    vi.doMock('firebase-admin/firestore', () => ({
        getFirestore,
        Timestamp: {},
        FieldValue: { increment: vi.fn() },
    }))

    const firebaseAdminModule = await import('@/lib/firebaseAdmin')
    return { firebaseAdminModule, initializeApp, cert, applicationDefault, getFirestore, db }
}

describe('firebaseAdmin runtime credentials', () => {
    beforeEach(() => {
        vi.resetModules()
        vi.clearAllMocks()
        clearEnv()
    })

    afterEach(() => {
        vi.resetModules()
        vi.restoreAllMocks()
        for (const name of TRACKED_ENV) {
            const value = originalEnv[name]
            if (value === undefined) delete process.env[name]
            else process.env[name] = value
        }
    })

    it('Cloud Run uses application-default credentials and exposes Firestore', async () => {
        process.env.FIREBASE_PROJECT_ID = 'cs-project-ljhot8la'
        process.env.GOOGLE_CLOUD_PROJECT = 'cs-project-ljhot8la'
        process.env.K_SERVICE = 'kepenk-web-staging'

        const ctx = await loadFirebaseAdmin()

        expect(ctx.applicationDefault).toHaveBeenCalledTimes(1)
        expect(ctx.cert).not.toHaveBeenCalled()
        expect(ctx.initializeApp).toHaveBeenCalledWith({
            credential: { kind: 'adc' },
            projectId: 'cs-project-ljhot8la',
        })
        expect(ctx.getFirestore).toHaveBeenCalledTimes(1)
        expect(ctx.firebaseAdminModule.adminDb).toBe(ctx.db)
    })

    it('legacy complete credential set remains supported', async () => {
        process.env.FIREBASE_PROJECT_ID = 'legacy-project'
        process.env.FIREBASE_CLIENT_EMAIL = 'legacy@example.com'
        process.env.FIREBASE_PRIVATE_KEY = 'line1\\nline2'

        const ctx = await loadFirebaseAdmin()

        expect(ctx.applicationDefault).not.toHaveBeenCalled()
        expect(ctx.cert).toHaveBeenCalledWith({
            projectId: 'legacy-project',
            clientEmail: 'legacy@example.com',
            privateKey: 'line1\nline2',
        })
        expect(ctx.getFirestore).toHaveBeenCalledTimes(1)
    })

    it('partial legacy credential fails closed instead of silently switching to ADC', async () => {
        process.env.FIREBASE_PROJECT_ID = 'cs-project-ljhot8la'
        process.env.K_SERVICE = 'kepenk-web-staging'
        process.env.FIREBASE_CLIENT_EMAIL = 'stale@example.com'

        const ctx = await loadFirebaseAdmin()

        expect(ctx.applicationDefault).not.toHaveBeenCalled()
        expect(ctx.cert).not.toHaveBeenCalled()
        expect(ctx.getFirestore).not.toHaveBeenCalled()
        expect(ctx.firebaseAdminModule.adminDb).toBeNull()
    })
})
