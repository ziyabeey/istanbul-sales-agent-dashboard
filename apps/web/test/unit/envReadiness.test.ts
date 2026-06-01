import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
    getControlledLaunchEnvReadiness,
    getFeatureEnvReadiness,
    isProductionEnvReady,
} from '@/lib/envReadiness'

const TRACKED_ENV = [
    'NODE_ENV',
    'SESSION_SECRET',
    'FIREBASE_PROJECT_ID',
    'FIREBASE_CLIENT_EMAIL',
    'FIREBASE_PRIVATE_KEY',
    'NEXT_PUBLIC_APP_URL',
    'ADMIN_SECRET_TOKEN',
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

function setProductionRequiredEnv() {
    process.env.SESSION_SECRET = 'super-secret-session-value'
    process.env.FIREBASE_PROJECT_ID = 'kepenk-prod'
    process.env.FIREBASE_CLIENT_EMAIL = 'firebase@example.com'
    process.env.FIREBASE_PRIVATE_KEY = 'private-key-value'
}

function snapshot(value: unknown): string {
    return JSON.stringify(value)
}

describe('envReadiness', () => {
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

    it('production required env eksikken hazir degildir', () => {
        process.env.NODE_ENV = 'production'

        const readiness = getControlledLaunchEnvReadiness()

        expect(readiness.ready).toBe(false)
        expect(isProductionEnvReady()).toBe(false)
        expect(readiness.missingRequired).toEqual([
            'SESSION_SECRET',
            'FIREBASE_PROJECT_ID',
            'FIREBASE_CLIENT_EMAIL',
            'FIREBASE_PRIVATE_KEY',
        ])
    })

    it('tum production required env varsa hazirdir', () => {
        process.env.NODE_ENV = 'production'
        setProductionRequiredEnv()

        const readiness = getControlledLaunchEnvReadiness()

        expect(readiness.ready).toBe(true)
        expect(isProductionEnvReady()).toBe(true)
        expect(readiness.missingRequired).toEqual([])
    })

    it('feature flag kapaliyken provider env gerekli degildir', () => {
        const readiness = getFeatureEnvReadiness()

        expect(readiness.siteGeneration).toEqual({
            enabled: false,
            ready: true,
            missingRequired: [],
        })
        expect(readiness.sitePublish.ready).toBe(true)
        expect(readiness.siteEditorSave.ready).toBe(true)
        expect(readiness.siteEditorPublish.ready).toBe(true)
    })

    it('generation flag acikken conditional env eksikse hazir degildir', () => {
        process.env.KEPENK_SITE_GENERATION_ENABLED = 'true'
        setProductionRequiredEnv()

        const readiness = getFeatureEnvReadiness()

        expect(readiness.siteGeneration.enabled).toBe(true)
        expect(readiness.siteGeneration.ready).toBe(false)
        expect(readiness.siteGeneration.missingRequired).toEqual([
            'CRON_SECRET',
            'NEXT_PUBLIC_APP_URL',
            'GEMINI_API_KEY_OR_GOOGLE_API_KEY',
        ])
    })

    it('generation flag acikken GEMINI_API_KEY ai gereksinimini karsilar', () => {
        process.env.KEPENK_SITE_GENERATION_ENABLED = 'true'
        setProductionRequiredEnv()
        process.env.CRON_SECRET = 'cron-secret'
        process.env.NEXT_PUBLIC_APP_URL = 'https://kepenk.ai'
        process.env.GEMINI_API_KEY = 'gemini-secret-value'

        const readiness = getFeatureEnvReadiness()

        expect(readiness.siteGeneration.ready).toBe(true)
        expect(readiness.siteGeneration.missingRequired).toEqual([])
    })

    it('generation flag acikken GOOGLE_API_KEY ai gereksinimini karsilar', () => {
        process.env.KEPENK_SITE_GENERATION_ENABLED = 'true'
        setProductionRequiredEnv()
        process.env.CRON_SECRET = 'cron-secret'
        process.env.NEXT_PUBLIC_APP_URL = 'https://kepenk.ai'
        process.env.GOOGLE_API_KEY = 'google-secret-value'

        const readiness = getFeatureEnvReadiness()

        expect(readiness.siteGeneration.ready).toBe(true)
        expect(readiness.siteGeneration.missingRequired).toEqual([])
    })

    it('production demo mode true ise problem olarak raporlar ama degeri sizdirmaz', () => {
        process.env.NODE_ENV = 'production'
        setProductionRequiredEnv()
        process.env.KEPENK_DEMO_MODE = 'true'

        const readiness = getControlledLaunchEnvReadiness()

        expect(readiness.ready).toBe(false)
        expect(readiness.problems).toEqual(['PRODUCTION_DEMO_MODE_ENABLED:KEPENK_DEMO_MODE'])
        expect(snapshot(readiness)).not.toContain('true')
    })

    it('readiness objesi secret degerleri icermez', () => {
        process.env.NODE_ENV = 'production'
        setProductionRequiredEnv()
        process.env.NEXT_PUBLIC_APP_URL = 'https://kepenk.ai'
        process.env.ADMIN_SECRET_TOKEN = 'admin-secret-value'
        process.env.KEPENK_SITE_PUBLISH_ENABLED = 'true'
        process.env.CF_ACCOUNT_ID = 'cf-account-secret'

        const combined = {
            controlled: getControlledLaunchEnvReadiness(),
            features: getFeatureEnvReadiness(),
        }
        const serialized = snapshot(combined)

        expect(serialized).not.toContain('super-secret-session-value')
        expect(serialized).not.toContain('private-key-value')
        expect(serialized).not.toContain('admin-secret-value')
        expect(serialized).not.toContain('cf-account-secret')
    })
})
