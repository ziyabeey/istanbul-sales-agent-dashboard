export type FirebaseCredentialMode = 'legacy' | 'adc' | 'unavailable'

type EnvLike = Record<string, string | undefined>

const PROJECT_REQUIREMENT = 'FIREBASE_PROJECT_ID_OR_GOOGLE_CLOUD_PROJECT'
const CREDENTIAL_REQUIREMENT = 'FIREBASE_CREDENTIALS_OR_ADC'

function has(env: EnvLike, name: string): boolean {
    return Boolean(env[name]?.trim())
}

export function getFirebaseRuntimeReadiness(env: EnvLike = process.env) {
    const projectId = env.FIREBASE_PROJECT_ID?.trim() || env.GOOGLE_CLOUD_PROJECT?.trim() || null
    const hasClientEmail = has(env, 'FIREBASE_CLIENT_EMAIL')
    const hasPrivateKey = has(env, 'FIREBASE_PRIVATE_KEY')
    const legacyConfigured = hasClientEmail || hasPrivateKey
    const legacyComplete = hasClientEmail && hasPrivateKey

    const adcRuntime = Boolean(
        projectId &&
        (
            has(env, 'K_SERVICE') ||
            has(env, 'GOOGLE_APPLICATION_CREDENTIALS') ||
            has(env, 'FIRESTORE_EMULATOR_HOST')
        )
    )

    const missingRequired: string[] = []

    if (!projectId) {
        missingRequired.push(PROJECT_REQUIREMENT)
    }

    if (legacyConfigured && !legacyComplete) {
        if (!hasClientEmail) missingRequired.push('FIREBASE_CLIENT_EMAIL')
        if (!hasPrivateKey) missingRequired.push('FIREBASE_PRIVATE_KEY')
    } else if (!legacyComplete && !adcRuntime) {
        missingRequired.push(CREDENTIAL_REQUIREMENT)
    }

    let credentialMode: FirebaseCredentialMode = 'unavailable'
    if (projectId && legacyComplete) {
        credentialMode = 'legacy'
    } else if (projectId && !legacyConfigured && adcRuntime) {
        credentialMode = 'adc'
    }

    return {
        ready: missingRequired.length === 0 && credentialMode !== 'unavailable',
        projectId,
        credentialMode,
        missingRequired,
        requirements: [PROJECT_REQUIREMENT, CREDENTIAL_REQUIREMENT],
    }
}
