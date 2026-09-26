import { getFirebaseRuntimeReadiness } from './firebaseRuntime'

const CONTROLLED_LAUNCH_REQUIRED_ENV = [
    'SESSION_SECRET',
] as const

const CONTROLLED_LAUNCH_RECOMMENDED_ENV = [
    'NEXT_PUBLIC_APP_URL',
    'ADMIN_SECRET_TOKEN',
] as const

const DEMO_MODE_ENV = [
    'KEPENK_DEMO_MODE',
    'NEXT_PUBLIC_DEMO_MODE',
    'DEMO_MODE',
] as const

type EnvName = string

type FeatureReadiness = {
    enabled: boolean
    ready: boolean
    missingRequired: EnvName[]
}

type FeatureReadinessMap = {
    siteGeneration: FeatureReadiness
    sitePublish: FeatureReadiness
    siteEditorSave: FeatureReadiness
    siteEditorPublish: FeatureReadiness
}

function hasEnv(name: EnvName): boolean {
    return Boolean(process.env[name]?.trim())
}

function exactTrue(name: EnvName): boolean {
    return process.env[name] === 'true'
}

function missing(names: readonly EnvName[]): EnvName[] {
    return names.filter((name) => !hasEnv(name))
}

function firebaseMissing(): EnvName[] {
    return getFirebaseRuntimeReadiness().missingRequired
}

function feature(enabledEnvName: EnvName, required: readonly EnvName[], includeFirebase = false): FeatureReadiness {
    const enabled = exactTrue(enabledEnvName)
    if (!enabled) {
        return { enabled: false, ready: true, missingRequired: [] }
    }

    const missingRequired = [
        ...(includeFirebase ? firebaseMissing() : []),
        ...missing(required),
    ]
    return { enabled: true, ready: missingRequired.length === 0, missingRequired }
}

export function getControlledLaunchEnvReadiness() {
    const firebase = getFirebaseRuntimeReadiness()
    const missingRequired = [
        ...missing(CONTROLLED_LAUNCH_REQUIRED_ENV),
        ...firebase.missingRequired,
    ]
    const missingRecommended = missing(CONTROLLED_LAUNCH_RECOMMENDED_ENV)
    const problems = process.env.NODE_ENV === 'production'
        ? DEMO_MODE_ENV
            .filter((name) => exactTrue(name))
            .map((name) => `PRODUCTION_DEMO_MODE_ENABLED:${name}`)
        : []

    return {
        ready: missingRequired.length === 0 && problems.length === 0,
        required: [
            ...CONTROLLED_LAUNCH_REQUIRED_ENV,
            ...firebase.requirements,
        ],
        missingRequired,
        recommended: [...CONTROLLED_LAUNCH_RECOMMENDED_ENV],
        missingRecommended,
        problems,
        firebaseCredentialMode: firebase.credentialMode,
    }
}

export function getFeatureEnvReadiness(): FeatureReadinessMap {
    const generationMissing = [
        ...firebaseMissing(),
        ...missing(['SERVICE_AUTH_SECRET']),
    ]

    if (!hasEnv('INTERNAL_APP_URL') && !hasEnv('NEXT_PUBLIC_APP_URL')) {
        generationMissing.push('INTERNAL_APP_URL_OR_NEXT_PUBLIC_APP_URL')
    }

    if (!hasEnv('GEMINI_API_KEY') && !hasEnv('GOOGLE_API_KEY')) {
        generationMissing.push('GEMINI_API_KEY_OR_GOOGLE_API_KEY')
    }

    return {
        siteGeneration: exactTrue('KEPENK_SITE_GENERATION_ENABLED')
            ? {
                enabled: true,
                ready: generationMissing.length === 0,
                missingRequired: generationMissing,
            }
            : { enabled: false, ready: true, missingRequired: [] },
        sitePublish: feature('KEPENK_SITE_PUBLISH_ENABLED', [
            'CF_ACCOUNT_ID',
            'CF_PAGES_TOKEN',
            'CF_API_TOKEN',
            'CF_ZONE_ID',
        ], true),
        siteEditorSave: feature('KEPENK_SITE_EDITOR_SAVE_ENABLED', [], true),
        siteEditorPublish: feature('KEPENK_SITE_EDITOR_PUBLISH_ENABLED', [
            'NEXT_PUBLIC_APP_URL',
        ], true),
    }
}

export function isProductionEnvReady(): boolean {
    if (process.env.NODE_ENV !== 'production') return true
    return getControlledLaunchEnvReadiness().ready
}
