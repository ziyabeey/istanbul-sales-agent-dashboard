export type MvpFeatureKey =
    | 'dashboardSummary'
    | 'conversations'
    | 'customers'
    | 'appointments'
    | 'sitePreview'
    | 'demoStatus'
    | 'setupWizard'
    | 'voiceInbox'
    | 'siteEditor'
    | 'siteGeneration'
    | 'domainManagement'
    | 'agents'
    | 'payments'
    | 'twilioMessaging'
    | 'cloudflarePublish'
    | 'adsMarketing'
    | 'ecommerce'
    | 'restaurantOs'
    | 'b2b'
    | 'finance'
    | 'contentStudio'
    | 'reports'

export type MvpFeatureFlags = Record<MvpFeatureKey, boolean>

export function isMvpTestReleaseEnabled(): boolean {
    return process.env.NEXT_PUBLIC_KEPENK_MVP_TEST_RELEASE === 'true'
}

const DEFAULT_FEATURE_FLAGS: MvpFeatureFlags = {
    dashboardSummary: true,
    conversations: true,
    customers: true,
    appointments: true,
    sitePreview: true,
    demoStatus: true,
    setupWizard: true,
    voiceInbox: true,
    siteEditor: true,
    siteGeneration: true,
    domainManagement: true,
    agents: true,
    payments: true,
    twilioMessaging: true,
    cloudflarePublish: true,
    adsMarketing: true,
    ecommerce: true,
    restaurantOs: true,
    b2b: true,
    finance: true,
    contentStudio: true,
    reports: true,
}

const MVP_TEST_RELEASE_FLAGS: MvpFeatureFlags = {
    dashboardSummary: true,
    conversations: true,
    customers: true,
    appointments: true,
    sitePreview: true,
    demoStatus: true,
    setupWizard: false,
    voiceInbox: false,
    siteEditor: false,
    siteGeneration: false,
    domainManagement: false,
    agents: false,
    payments: false,
    twilioMessaging: false,
    cloudflarePublish: false,
    adsMarketing: false,
    ecommerce: false,
    restaurantOs: false,
    b2b: false,
    finance: false,
    contentStudio: false,
    reports: false,
}

export const MVP_FEATURE_FLAGS: MvpFeatureFlags = isMvpTestReleaseEnabled()
    ? MVP_TEST_RELEASE_FLAGS
    : DEFAULT_FEATURE_FLAGS
