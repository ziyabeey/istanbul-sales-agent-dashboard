import { NextResponse } from 'next/server'

export const SITE_FEATURE_DISABLED_CODE = 'SITE_FEATURE_DISABLED'

function isEnabled(envName: string): boolean {
    return process.env[envName] === 'true'
}

export function isSiteGenerationEnabled(): boolean {
    return isEnabled('KEPENK_SITE_GENERATION_ENABLED')
}

export function isSitePublishEnabled(): boolean {
    return isEnabled('KEPENK_SITE_PUBLISH_ENABLED')
}

export function isSiteEditorSaveEnabled(): boolean {
    return isEnabled('KEPENK_SITE_EDITOR_SAVE_ENABLED')
}

export function isSiteEditorPublishEnabled(): boolean {
    return isEnabled('KEPENK_SITE_EDITOR_PUBLISH_ENABLED')
}

export function siteFeatureDisabledResponse(): NextResponse {
    return NextResponse.json(
        {
            error: 'Bu işlem kontrollü lansmanda kapalı',
            code: SITE_FEATURE_DISABLED_CODE,
        },
        { status: 503 }
    )
}
