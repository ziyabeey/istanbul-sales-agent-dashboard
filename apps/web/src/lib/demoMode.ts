export const DEMO_ESNAF_ID = 'demo-berber-01'

export const DEMO_USER = {
    id: 'demo-owner-01',
    esnafId: DEMO_ESNAF_ID,
    ad: 'Mert Kaya',
    email: 'mert@modaustaberber.demo',
    rol: 'owner',
}

function flagEnabled(value: string | undefined): boolean {
    return ['1', 'true', 'yes', 'on'].includes((value || '').toLowerCase())
}

export function isDemoModeEnabled(): boolean {
    const explicit =
        process.env.KEPENK_DEMO_MODE ??
        process.env.DEMO_MODE ??
        process.env.NEXT_PUBLIC_DEMO_MODE

    if (explicit !== undefined) return flagEnabled(explicit)

    return process.env.NODE_ENV !== 'production'
}

export function isDemoEsnafId(id?: string | null): boolean {
    return id === DEMO_ESNAF_ID
}

export function isDemoSession(esnafId?: string | null): boolean {
    return isDemoModeEnabled() && isDemoEsnafId(esnafId)
}

export function safeDemoRedirectPath(path?: string | null): string {
    if (!path || !path.startsWith('/') || path.startsWith('//')) return '/dashboard'
    return path
}
