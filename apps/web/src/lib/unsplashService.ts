/**
 * UnsplashService.ts — Kepenk AI Unsplash API Entegrasyonu
 * ─────────────────────────────────────────────────────────────────────────────
 * Modüler, production-ready Unsplash API istemcisi.
 * 
 * Özellikler:
 *   • In-memory LRU cache (TTL: 1 saat)
 *   • Rate limiting (Unsplash: 50 req/saat)
 *   • Circuit breaker pattern (3 hata → 30sn bekleme)
 *   • Fallback görsel sistemi
 *   • TypeScript strict mode
 *
 * Env:
 *   UNSPLASH_ACCESS_KEY — Unsplash API anahtarı
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ── Types ──────────────────────────────────────────────────────────────── */

export interface UnsplashPhoto {
    id: string
    width: number
    height: number
    description: string | null
    alt_description: string | null
    color: string
    blur_hash: string | null
    urls: {
        raw: string
        full: string
        regular: string   // 1080px
        small: string     // 400px
        thumb: string     // 200px
    }
    links: {
        download_location: string  // Required by Unsplash TOS
        html: string
    }
    user: {
        name: string
        username: string
        links: { html: string }
    }
}

export interface UnsplashSearchResult {
    total: number
    total_pages: number
    results: UnsplashPhoto[]
}

export interface UnsplashQuery {
    query: string
    page?: number
    perPage?: number
    orientation?: 'landscape' | 'portrait' | 'squarish'
    orderBy?: 'relevant' | 'latest'
    color?: string
    contentFilter?: 'low' | 'high'
}

export interface UnsplashServiceConfig {
    accessKey: string
    cacheMaxSize?: number      // max cached queries (default: 100)
    cacheTTL?: number          // ms (default: 1 hour)
    rateLimitPerHour?: number  // (default: 50 — Unsplash limit)
}

/* ── Cache Entry ────────────────────────────────────────────────────────── */

interface CacheEntry<T> {
    data: T
    timestamp: number
    accessCount: number
}

/* ── Circuit Breaker State ──────────────────────────────────────────────── */

interface CircuitState {
    failures: number
    lastFailure: number
    state: 'closed' | 'open' | 'half-open'
}

/* ── Fallback Photos ────────────────────────────────────────────────────── */

const FALLBACK_PHOTOS: UnsplashPhoto[] = [
    {
        id: 'fallback-1',
        width: 1920, height: 1080,
        description: 'Modern architecture with clean lines',
        alt_description: 'Premium modern architecture',
        color: '#1a1a2e',
        blur_hash: null,
        urls: {
            raw: '/images/hero-fallback-1.jpg',
            full: '/images/hero-fallback-1.jpg',
            regular: '/images/hero-fallback-1.jpg',
            small: '/images/hero-fallback-1.jpg',
            thumb: '/images/hero-fallback-1.jpg',
        },
        links: { download_location: '#', html: '#' },
        user: { name: 'Kepenk AI', username: 'kepenk', links: { html: '#' } },
    },
    {
        id: 'fallback-2',
        width: 1920, height: 1080,
        description: 'Minimalist secure home entrance',
        alt_description: 'Secure modern home design',
        color: '#2d3436',
        blur_hash: null,
        urls: {
            raw: '/images/hero-fallback-2.jpg',
            full: '/images/hero-fallback-2.jpg',
            regular: '/images/hero-fallback-2.jpg',
            small: '/images/hero-fallback-2.jpg',
            thumb: '/images/hero-fallback-2.jpg',
        },
        links: { download_location: '#', html: '#' },
        user: { name: 'Kepenk AI', username: 'kepenk', links: { html: '#' } },
    },
]

/* ── Predefined Queries ─────────────────────────────────────────────────── */

export const KEPENK_QUERIES = {
    hero: [
        'modern architecture security premium',
        'minimalist secure home entrance',
        'industrial rolling shutter metallic',
    ],
    showcase: [
        'modern storefront design',
        'luxury retail security',
        'commercial building facade',
        'premium residential gate',
        'industrial warehouse modern',
        'smart home security system',
    ],
    features: [
        'smart technology interface',
        'mobile app dashboard',
        'cloud computing abstract',
    ],
} as const

/* ══════════════════════════════════════════════════════════════════════════
   UNSPLASH SERVICE CLASS
   ══════════════════════════════════════════════════════════════════════════ */

export class UnsplashService {
    private readonly accessKey: string
    private readonly baseUrl = 'https://api.unsplash.com'
    private readonly cache = new Map<string, CacheEntry<UnsplashSearchResult>>()
    private readonly cacheMaxSize: number
    private readonly cacheTTL: number
    private readonly rateLimitPerHour: number

    /* Rate limit tracking */
    private requestCount = 0
    private requestWindowStart = Date.now()

    /* Circuit breaker */
    private circuit: CircuitState = {
        failures: 0,
        lastFailure: 0,
        state: 'closed',
    }
    private readonly circuitThreshold = 3       // failures before open
    private readonly circuitRecoveryMs = 30_000 // 30s cooldown

    constructor(config: UnsplashServiceConfig) {
        this.accessKey = config.accessKey
        this.cacheMaxSize = config.cacheMaxSize ?? 100
        this.cacheTTL = config.cacheTTL ?? 60 * 60 * 1000  // 1 hour
        this.rateLimitPerHour = config.rateLimitPerHour ?? 50
    }

    /* ── Public: Search Photos ──────────────────────────────────────────── */

    async search(params: UnsplashQuery): Promise<UnsplashSearchResult> {
        const cacheKey = this.buildCacheKey(params)

        // 1. Check cache
        const cached = this.getFromCache(cacheKey)
        if (cached) return cached

        // 2. Check circuit breaker
        if (!this.isCircuitAllowed()) {
            console.warn('[Unsplash] Circuit breaker OPEN — returning fallback')
            return this.fallbackResult(params.query)
        }

        // 3. Check rate limit
        if (!this.isRateLimitAllowed()) {
            console.warn('[Unsplash] Rate limit exceeded — returning fallback')
            return this.fallbackResult(params.query)
        }

        // 4. Make API call
        try {
            const result = await this.fetchSearch(params)
            this.recordSuccess()
            this.putInCache(cacheKey, result)
            return result
        } catch (error) {
            this.recordFailure()
            console.error('[Unsplash] API error:', error instanceof Error ? error.message : error)
            return this.fallbackResult(params.query)
        }
    }

    /* ── Public: Get Random Photo ───────────────────────────────────────── */

    async random(query: string, count = 1): Promise<UnsplashPhoto[]> {
        const cacheKey = `random:${query}:${count}`
        const cached = this.getFromCache(cacheKey)
        if (cached) return cached.results

        if (!this.isCircuitAllowed() || !this.isRateLimitAllowed()) {
            return FALLBACK_PHOTOS.slice(0, count)
        }

        try {
            const url = new URL(`${this.baseUrl}/photos/random`)
            url.searchParams.set('query', query)
            url.searchParams.set('count', String(Math.min(count, 30)))
            url.searchParams.set('orientation', 'landscape')
            url.searchParams.set('content_filter', 'high')

            const res = await fetch(url.toString(), {
                headers: this.headers(),
                next: { revalidate: 3600 },
            })

            if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)

            const data = await res.json()
            const photos: UnsplashPhoto[] = Array.isArray(data) ? data : [data]

            this.recordSuccess()
            this.putInCache(cacheKey, { total: photos.length, total_pages: 1, results: photos })

            return photos
        } catch (error) {
            this.recordFailure()
            console.error('[Unsplash] Random photo error:', error)
            return FALLBACK_PHOTOS.slice(0, count)
        }
    }

    /* ── Public: Trigger Download (Unsplash TOS) ───────────────────────── */

    async trackDownload(downloadLocation: string): Promise<void> {
        if (downloadLocation === '#') return
        try {
            await fetch(downloadLocation, { headers: this.headers() })
        } catch {
            // Non-critical — don't throw
        }
    }

    /* ── Public: Get Curated Photos for Section ────────────────────────── */

    async getForSection(section: keyof typeof KEPENK_QUERIES, count = 6): Promise<UnsplashPhoto[]> {
        const queries = KEPENK_QUERIES[section]
        const photosPerQuery = Math.ceil(count / queries.length)
        const allPhotos: UnsplashPhoto[] = []

        for (const query of queries) {
            const result = await this.search({
                query,
                perPage: photosPerQuery,
                orientation: 'landscape',
                contentFilter: 'high',
            })
            allPhotos.push(...result.results)
            if (allPhotos.length >= count) break
        }

        return allPhotos.slice(0, count)
    }

    /* ── Public: Cache Stats ────────────────────────────────────────────── */

    getStats() {
        return {
            cacheSize: this.cache.size,
            cacheMaxSize: this.cacheMaxSize,
            requestsInWindow: this.requestCount,
            rateLimitPerHour: this.rateLimitPerHour,
            circuitState: this.circuit.state,
            circuitFailures: this.circuit.failures,
        }
    }

    /* ── Public: Clear Cache ────────────────────────────────────────────── */

    clearCache(): void {
        this.cache.clear()
    }

    /* ── Private: HTTP ──────────────────────────────────────────────────── */

    private headers(): Record<string, string> {
        return {
            'Authorization': `Client-ID ${this.accessKey}`,
            'Accept-Version': 'v1',
            'Accept': 'application/json',
        }
    }

    private async fetchSearch(params: UnsplashQuery): Promise<UnsplashSearchResult> {
        const url = new URL(`${this.baseUrl}/search/photos`)
        url.searchParams.set('query', params.query)
        url.searchParams.set('page', String(params.page ?? 1))
        url.searchParams.set('per_page', String(params.perPage ?? 10))
        url.searchParams.set('content_filter', params.contentFilter ?? 'high')
        if (params.orientation) url.searchParams.set('orientation', params.orientation)
        if (params.orderBy) url.searchParams.set('order_by', params.orderBy)
        if (params.color) url.searchParams.set('color', params.color)

        this.requestCount++

        const res = await fetch(url.toString(), {
            headers: this.headers(),
            next: { revalidate: 3600 },
        })

        if (!res.ok) {
            // Track Unsplash rate limit headers
            const remaining = res.headers.get('X-Ratelimit-Remaining')
            if (remaining && parseInt(remaining) < 5) {
                console.warn(`[Unsplash] API rate limit low: ${remaining} remaining`)
            }
            throw new Error(`Unsplash API ${res.status}: ${res.statusText}`)
        }

        return res.json()
    }

    /* ── Private: Cache ─────────────────────────────────────────────────── */

    private buildCacheKey(params: UnsplashQuery): string {
        return `search:${params.query}:${params.page ?? 1}:${params.perPage ?? 10}:${params.orientation ?? 'any'}`
    }

    private getFromCache(key: string): UnsplashSearchResult | null {
        const entry = this.cache.get(key)
        if (!entry) return null
        if (Date.now() - entry.timestamp > this.cacheTTL) {
            this.cache.delete(key)
            return null
        }
        entry.accessCount++
        return entry.data
    }

    private putInCache(key: string, data: UnsplashSearchResult): void {
        // LRU eviction
        if (this.cache.size >= this.cacheMaxSize) {
            let lruKey = ''
            let lruAccess = Infinity
            for (const [k, v] of this.cache.entries()) {
                if (v.accessCount < lruAccess) {
                    lruAccess = v.accessCount
                    lruKey = k
                }
            }
            if (lruKey) this.cache.delete(lruKey)
        }
        this.cache.set(key, { data, timestamp: Date.now(), accessCount: 1 })
    }

    /* ── Private: Rate Limiting ─────────────────────────────────────────── */

    private isRateLimitAllowed(): boolean {
        const now = Date.now()
        const windowMs = 60 * 60 * 1000 // 1 hour
        if (now - this.requestWindowStart > windowMs) {
            this.requestCount = 0
            this.requestWindowStart = now
        }
        return this.requestCount < this.rateLimitPerHour
    }

    /* ── Private: Circuit Breaker ───────────────────────────────────────── */

    private isCircuitAllowed(): boolean {
        if (this.circuit.state === 'closed') return true
        if (this.circuit.state === 'open') {
            if (Date.now() - this.circuit.lastFailure > this.circuitRecoveryMs) {
                this.circuit.state = 'half-open'
                return true
            }
            return false
        }
        // half-open: allow one request
        return true
    }

    private recordSuccess(): void {
        if (this.circuit.state === 'half-open') {
            this.circuit.state = 'closed'
            this.circuit.failures = 0
        }
    }

    private recordFailure(): void {
        this.circuit.failures++
        this.circuit.lastFailure = Date.now()
        if (this.circuit.failures >= this.circuitThreshold) {
            this.circuit.state = 'open'
            console.warn(`[Unsplash] Circuit breaker OPENED after ${this.circuit.failures} failures`)
        }
    }

    /* ── Private: Fallback ──────────────────────────────────────────────── */

    private fallbackResult(query: string): UnsplashSearchResult {
        return {
            total: FALLBACK_PHOTOS.length,
            total_pages: 1,
            results: FALLBACK_PHOTOS,
        }
    }
}

/* ══════════════════════════════════════════════════════════════════════════
   SINGLETON INSTANCE
   ══════════════════════════════════════════════════════════════════════════ */

let _instance: UnsplashService | null = null

export function getUnsplashService(): UnsplashService {
    if (!_instance) {
        const accessKey = process.env.UNSPLASH_ACCESS_KEY || process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || ''
        if (!accessKey) {
            console.warn('[Unsplash] No UNSPLASH_ACCESS_KEY found — using fallback mode')
        }
        _instance = new UnsplashService({ accessKey })
    }
    return _instance
}
