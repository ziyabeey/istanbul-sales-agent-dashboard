/**
 * unsplashTriggerDownload.ts — Unsplash TOS Download Trigger
 * ─────────────────────────────────────────────────────────────────────────────
 * CRITICAL for Unsplash Production Rate Limit approval.
 *
 * Per Unsplash API Guidelines (https://help.unsplash.com/en/articles/2511258):
 *   "When a user performs a download action (like selecting for use),
 *    you must send a request to the download_location endpoint."
 *
 * This function MUST be called when a user:
 *   • Selects an image to use in their kepenk.ai project
 *   • Downloads an image to their device
 *   • Sets an image as a background/hero/cover
 *
 * It is NOT a file download — it's a tracking ping that tells Unsplash
 * the image was "used", which is how photographers get paid.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ── Types ──────────────────────────────────────────────────────────────── */

export interface UnsplashPhotoLinks {
    download_location: string
    html: string
}

export interface UnsplashPhotoUser {
    name: string
    username: string
    links: { html: string }
}

export interface UnsplashPhotoUrls {
    raw: string
    full: string
    regular: string   // 1080w — use for display
    small: string     // 400w
    thumb: string     // 200w
}

export interface UnsplashImage {
    id: string
    width: number
    height: number
    color: string
    blur_hash: string | null
    description: string | null
    alt_description: string | null
    urls: UnsplashPhotoUrls
    links: UnsplashPhotoLinks
    user: UnsplashPhotoUser
}

/* ── Constants ──────────────────────────────────────────────────────────── */

const UTM_SOURCE = 'kepenk_ai'
const UTM_MEDIUM = 'referral'

/* ── Download Trigger ───────────────────────────────────────────────────── */

/**
 * Triggers the Unsplash download tracking endpoint.
 * 
 * MUST be called when a user selects/uses an image.
 * This is NOT a file download — it's a tracking ping.
 * 
 * @param downloadLocation — The `links.download_location` URL from the API response
 * @param clientId — Optional explicit client ID (falls back to env)
 * @returns Promise<boolean> — true if successful
 * 
 * @example
 * ```ts
 * const success = await triggerUnsplashDownload(
 *     photo.links.download_location
 * )
 * ```
 */
export async function triggerUnsplashDownload(
    downloadLocation: string,
    clientId?: string,
): Promise<boolean> {
    // Skip fallback/placeholder images
    if (!downloadLocation || downloadLocation === '#') return true

    const key = clientId
        || process.env.UNSPLASH_ACCESS_KEY
        || process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
        || ''

    if (!key) {
        console.warn('[Unsplash] No API key — skipping download trigger')
        return false
    }

    try {
        const url = new URL(downloadLocation)
        url.searchParams.set('client_id', key)

        const res = await fetch(url.toString(), {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
        })

        if (!res.ok) {
            console.error(`[Unsplash] Download trigger failed: ${res.status} ${res.statusText}`)
            return false
        }

        return true
    } catch (error) {
        // Non-blocking — log but don't throw
        console.error('[Unsplash] Download trigger error:', error instanceof Error ? error.message : error)
        return false
    }
}

/* ── Server-side trigger (for API routes) ───────────────────────────────── */

/**
 * Server-side version that uses the server env key.
 * Call from API routes / Server Actions.
 */
export async function triggerUnsplashDownloadServer(
    downloadLocation: string,
): Promise<boolean> {
    const key = process.env.UNSPLASH_ACCESS_KEY || ''
    return triggerUnsplashDownload(downloadLocation, key)
}

/* ── Attribution Helpers ────────────────────────────────────────────────── */

/**
 * Builds a properly attributed photographer profile URL.
 * Appends utm_source and utm_medium per Unsplash guidelines.
 */
export function buildPhotographerUrl(user: UnsplashPhotoUser): string {
    return `${user.links.html}?utm_source=${UTM_SOURCE}&utm_medium=${UTM_MEDIUM}`
}

/**
 * Builds the Unsplash attribution URL.
 */
export function buildUnsplashUrl(): string {
    return `https://unsplash.com/?utm_source=${UTM_SOURCE}&utm_medium=${UTM_MEDIUM}`
}

/**
 * Builds an optimized image URL with Unsplash CDN parameters.
 * Uses the `raw` URL and applies custom width/quality/format.
 * 
 * @example
 * ```ts
 * const url = buildOptimizedUrl(photo.urls.raw, { w: 800, q: 80 })
 * ```
 */
export function buildOptimizedUrl(
    rawUrl: string,
    options: { w?: number; h?: number; q?: number; fit?: 'crop' | 'clamp' | 'max'; fm?: 'jpg' | 'webp' | 'avif' } = {}
): string {
    if (!rawUrl || rawUrl.startsWith('/')) return rawUrl
    const url = new URL(rawUrl)
    if (options.w) url.searchParams.set('w', String(options.w))
    if (options.h) url.searchParams.set('h', String(options.h))
    if (options.q) url.searchParams.set('q', String(options.q))
    if (options.fit) url.searchParams.set('fit', options.fit)
    if (options.fm) url.searchParams.set('fm', options.fm)
    url.searchParams.set('auto', 'format')
    return url.toString()
}
