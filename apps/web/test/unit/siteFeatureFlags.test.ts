import { afterEach, describe, expect, it } from 'vitest'
import {
    SITE_FEATURE_DISABLED_CODE,
    isSiteEditorPublishEnabled,
    isSiteEditorSaveEnabled,
    isSiteGenerationEnabled,
    isSitePublishEnabled,
    siteFeatureDisabledResponse,
} from '@/lib/site/siteFeatureFlags'

const FLAG_NAMES = [
    'KEPENK_SITE_GENERATION_ENABLED',
    'KEPENK_SITE_PUBLISH_ENABLED',
    'KEPENK_SITE_EDITOR_SAVE_ENABLED',
    'KEPENK_SITE_EDITOR_PUBLISH_ENABLED',
] as const

const originalEnv = Object.fromEntries(
    FLAG_NAMES.map((name) => [name, process.env[name]])
) as Record<(typeof FLAG_NAMES)[number], string | undefined>

function clearFlags() {
    for (const name of FLAG_NAMES) {
        delete process.env[name]
    }
}

describe('siteFeatureFlags', () => {
    afterEach(() => {
        for (const name of FLAG_NAMES) {
            const originalValue = originalEnv[name]
            if (originalValue === undefined) {
                delete process.env[name]
            } else {
                process.env[name] = originalValue
            }
        }
    })

    it('tum flagler varsayilan olarak kapali gelir', () => {
        clearFlags()

        expect(isSiteGenerationEnabled()).toBe(false)
        expect(isSitePublishEnabled()).toBe(false)
        expect(isSiteEditorSaveEnabled()).toBe(false)
        expect(isSiteEditorPublishEnabled()).toBe(false)
    })

    it('yalnizca exact true ilgili flagi acar', () => {
        clearFlags()
        process.env.KEPENK_SITE_GENERATION_ENABLED = 'true'
        process.env.KEPENK_SITE_PUBLISH_ENABLED = 'true'
        process.env.KEPENK_SITE_EDITOR_SAVE_ENABLED = 'true'
        process.env.KEPENK_SITE_EDITOR_PUBLISH_ENABLED = 'true'

        expect(isSiteGenerationEnabled()).toBe(true)
        expect(isSitePublishEnabled()).toBe(true)
        expect(isSiteEditorSaveEnabled()).toBe(true)
        expect(isSiteEditorPublishEnabled()).toBe(true)
    })

    it('true disindaki degerler flagleri acmaz', () => {
        clearFlags()
        process.env.KEPENK_SITE_GENERATION_ENABLED = '1'
        process.env.KEPENK_SITE_PUBLISH_ENABLED = 'TRUE'
        process.env.KEPENK_SITE_EDITOR_SAVE_ENABLED = 'false'
        process.env.KEPENK_SITE_EDITOR_PUBLISH_ENABLED = 'yes'

        expect(isSiteGenerationEnabled()).toBe(false)
        expect(isSitePublishEnabled()).toBe(false)
        expect(isSiteEditorSaveEnabled()).toBe(false)
        expect(isSiteEditorPublishEnabled()).toBe(false)
    })

    it('disabled response 503 ve sabit kod doner', async () => {
        const response = siteFeatureDisabledResponse()
        const body = await response.json()

        expect(response.status).toBe(503)
        expect(body).toEqual({
            error: 'Bu işlem kontrollü lansmanda kapalı',
            code: SITE_FEATURE_DISABLED_CODE,
        })
    })
})
