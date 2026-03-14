module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/XinXia/apps/web/src/lib/unsplashService.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

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
 */ /* ── Types ──────────────────────────────────────────────────────────────── */ __turbopack_context__.s([
    "KEPENK_QUERIES",
    ()=>KEPENK_QUERIES,
    "UnsplashService",
    ()=>UnsplashService,
    "getUnsplashService",
    ()=>getUnsplashService
]);
/* ── Fallback Photos ────────────────────────────────────────────────────── */ const FALLBACK_PHOTOS = [
    {
        id: 'fallback-1',
        width: 1920,
        height: 1080,
        description: 'Modern architecture with clean lines',
        alt_description: 'Premium modern architecture',
        color: '#1a1a2e',
        blur_hash: null,
        urls: {
            raw: '/images/hero-fallback-1.jpg',
            full: '/images/hero-fallback-1.jpg',
            regular: '/images/hero-fallback-1.jpg',
            small: '/images/hero-fallback-1.jpg',
            thumb: '/images/hero-fallback-1.jpg'
        },
        links: {
            download_location: '#',
            html: '#'
        },
        user: {
            name: 'Kepenk AI',
            username: 'kepenk',
            links: {
                html: '#'
            }
        }
    },
    {
        id: 'fallback-2',
        width: 1920,
        height: 1080,
        description: 'Minimalist secure home entrance',
        alt_description: 'Secure modern home design',
        color: '#2d3436',
        blur_hash: null,
        urls: {
            raw: '/images/hero-fallback-2.jpg',
            full: '/images/hero-fallback-2.jpg',
            regular: '/images/hero-fallback-2.jpg',
            small: '/images/hero-fallback-2.jpg',
            thumb: '/images/hero-fallback-2.jpg'
        },
        links: {
            download_location: '#',
            html: '#'
        },
        user: {
            name: 'Kepenk AI',
            username: 'kepenk',
            links: {
                html: '#'
            }
        }
    }
];
const KEPENK_QUERIES = {
    hero: [
        'modern architecture security premium',
        'minimalist secure home entrance',
        'industrial rolling shutter metallic'
    ],
    showcase: [
        'modern storefront design',
        'luxury retail security',
        'commercial building facade',
        'premium residential gate',
        'industrial warehouse modern',
        'smart home security system'
    ],
    features: [
        'smart technology interface',
        'mobile app dashboard',
        'cloud computing abstract'
    ]
};
class UnsplashService {
    accessKey;
    baseUrl = 'https://api.unsplash.com';
    cache = new Map();
    cacheMaxSize;
    cacheTTL;
    rateLimitPerHour;
    /* Rate limit tracking */ requestCount = 0;
    requestWindowStart = Date.now();
    /* Circuit breaker */ circuit = {
        failures: 0,
        lastFailure: 0,
        state: 'closed'
    };
    circuitThreshold = 3 // failures before open
    ;
    circuitRecoveryMs = 30_000 // 30s cooldown
    ;
    constructor(config){
        this.accessKey = config.accessKey;
        this.cacheMaxSize = config.cacheMaxSize ?? 100;
        this.cacheTTL = config.cacheTTL ?? 60 * 60 * 1000; // 1 hour
        this.rateLimitPerHour = config.rateLimitPerHour ?? 50;
    }
    /* ── Public: Search Photos ──────────────────────────────────────────── */ async search(params) {
        const cacheKey = this.buildCacheKey(params);
        // 1. Check cache
        const cached = this.getFromCache(cacheKey);
        if (cached) return cached;
        // 2. Check circuit breaker
        if (!this.isCircuitAllowed()) {
            console.warn('[Unsplash] Circuit breaker OPEN — returning fallback');
            return this.fallbackResult(params.query);
        }
        // 3. Check rate limit
        if (!this.isRateLimitAllowed()) {
            console.warn('[Unsplash] Rate limit exceeded — returning fallback');
            return this.fallbackResult(params.query);
        }
        // 4. Make API call
        try {
            const result = await this.fetchSearch(params);
            this.recordSuccess();
            this.putInCache(cacheKey, result);
            return result;
        } catch (error) {
            this.recordFailure();
            console.error('[Unsplash] API error:', error instanceof Error ? error.message : error);
            return this.fallbackResult(params.query);
        }
    }
    /* ── Public: Get Random Photo ───────────────────────────────────────── */ async random(query, count = 1) {
        const cacheKey = `random:${query}:${count}`;
        const cached = this.getFromCache(cacheKey);
        if (cached) return cached.results;
        if (!this.isCircuitAllowed() || !this.isRateLimitAllowed()) {
            return FALLBACK_PHOTOS.slice(0, count);
        }
        try {
            const url = new URL(`${this.baseUrl}/photos/random`);
            url.searchParams.set('query', query);
            url.searchParams.set('count', String(Math.min(count, 30)));
            url.searchParams.set('orientation', 'landscape');
            url.searchParams.set('content_filter', 'high');
            const res = await fetch(url.toString(), {
                headers: this.headers(),
                next: {
                    revalidate: 3600
                }
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            const data = await res.json();
            const photos = Array.isArray(data) ? data : [
                data
            ];
            this.recordSuccess();
            this.putInCache(cacheKey, {
                total: photos.length,
                total_pages: 1,
                results: photos
            });
            return photos;
        } catch (error) {
            this.recordFailure();
            console.error('[Unsplash] Random photo error:', error);
            return FALLBACK_PHOTOS.slice(0, count);
        }
    }
    /* ── Public: Trigger Download (Unsplash TOS) ───────────────────────── */ async trackDownload(downloadLocation) {
        if (downloadLocation === '#') return;
        try {
            await fetch(downloadLocation, {
                headers: this.headers()
            });
        } catch  {
        // Non-critical — don't throw
        }
    }
    /* ── Public: Get Curated Photos for Section ────────────────────────── */ async getForSection(section, count = 6) {
        const queries = KEPENK_QUERIES[section];
        const photosPerQuery = Math.ceil(count / queries.length);
        const allPhotos = [];
        for (const query of queries){
            const result = await this.search({
                query,
                perPage: photosPerQuery,
                orientation: 'landscape',
                contentFilter: 'high'
            });
            allPhotos.push(...result.results);
            if (allPhotos.length >= count) break;
        }
        return allPhotos.slice(0, count);
    }
    /* ── Public: Cache Stats ────────────────────────────────────────────── */ getStats() {
        return {
            cacheSize: this.cache.size,
            cacheMaxSize: this.cacheMaxSize,
            requestsInWindow: this.requestCount,
            rateLimitPerHour: this.rateLimitPerHour,
            circuitState: this.circuit.state,
            circuitFailures: this.circuit.failures
        };
    }
    /* ── Public: Clear Cache ────────────────────────────────────────────── */ clearCache() {
        this.cache.clear();
    }
    /* ── Private: HTTP ──────────────────────────────────────────────────── */ headers() {
        return {
            'Authorization': `Client-ID ${this.accessKey}`,
            'Accept-Version': 'v1',
            'Accept': 'application/json'
        };
    }
    async fetchSearch(params) {
        const url = new URL(`${this.baseUrl}/search/photos`);
        url.searchParams.set('query', params.query);
        url.searchParams.set('page', String(params.page ?? 1));
        url.searchParams.set('per_page', String(params.perPage ?? 10));
        url.searchParams.set('content_filter', params.contentFilter ?? 'high');
        if (params.orientation) url.searchParams.set('orientation', params.orientation);
        if (params.orderBy) url.searchParams.set('order_by', params.orderBy);
        if (params.color) url.searchParams.set('color', params.color);
        this.requestCount++;
        const res = await fetch(url.toString(), {
            headers: this.headers(),
            next: {
                revalidate: 3600
            }
        });
        if (!res.ok) {
            // Track Unsplash rate limit headers
            const remaining = res.headers.get('X-Ratelimit-Remaining');
            if (remaining && parseInt(remaining) < 5) {
                console.warn(`[Unsplash] API rate limit low: ${remaining} remaining`);
            }
            throw new Error(`Unsplash API ${res.status}: ${res.statusText}`);
        }
        return res.json();
    }
    /* ── Private: Cache ─────────────────────────────────────────────────── */ buildCacheKey(params) {
        return `search:${params.query}:${params.page ?? 1}:${params.perPage ?? 10}:${params.orientation ?? 'any'}`;
    }
    getFromCache(key) {
        const entry = this.cache.get(key);
        if (!entry) return null;
        if (Date.now() - entry.timestamp > this.cacheTTL) {
            this.cache.delete(key);
            return null;
        }
        entry.accessCount++;
        return entry.data;
    }
    putInCache(key, data) {
        // LRU eviction
        if (this.cache.size >= this.cacheMaxSize) {
            let lruKey = '';
            let lruAccess = Infinity;
            for (const [k, v] of this.cache.entries()){
                if (v.accessCount < lruAccess) {
                    lruAccess = v.accessCount;
                    lruKey = k;
                }
            }
            if (lruKey) this.cache.delete(lruKey);
        }
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
            accessCount: 1
        });
    }
    /* ── Private: Rate Limiting ─────────────────────────────────────────── */ isRateLimitAllowed() {
        const now = Date.now();
        const windowMs = 60 * 60 * 1000 // 1 hour
        ;
        if (now - this.requestWindowStart > windowMs) {
            this.requestCount = 0;
            this.requestWindowStart = now;
        }
        return this.requestCount < this.rateLimitPerHour;
    }
    /* ── Private: Circuit Breaker ───────────────────────────────────────── */ isCircuitAllowed() {
        if (this.circuit.state === 'closed') return true;
        if (this.circuit.state === 'open') {
            if (Date.now() - this.circuit.lastFailure > this.circuitRecoveryMs) {
                this.circuit.state = 'half-open';
                return true;
            }
            return false;
        }
        // half-open: allow one request
        return true;
    }
    recordSuccess() {
        if (this.circuit.state === 'half-open') {
            this.circuit.state = 'closed';
            this.circuit.failures = 0;
        }
    }
    recordFailure() {
        this.circuit.failures++;
        this.circuit.lastFailure = Date.now();
        if (this.circuit.failures >= this.circuitThreshold) {
            this.circuit.state = 'open';
            console.warn(`[Unsplash] Circuit breaker OPENED after ${this.circuit.failures} failures`);
        }
    }
    /* ── Private: Fallback ──────────────────────────────────────────────── */ fallbackResult(query) {
        return {
            total: FALLBACK_PHOTOS.length,
            total_pages: 1,
            results: FALLBACK_PHOTOS
        };
    }
}
/* ══════════════════════════════════════════════════════════════════════════
   SINGLETON INSTANCE
   ══════════════════════════════════════════════════════════════════════════ */ let _instance = null;
function getUnsplashService() {
    if (!_instance) {
        const accessKey = process.env.UNSPLASH_ACCESS_KEY || process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || '';
        if (!accessKey) {
            console.warn('[Unsplash] No UNSPLASH_ACCESS_KEY found — using fallback mode');
        }
        _instance = new UnsplashService({
            accessKey
        });
    }
    return _instance;
}
}),
"[project]/XinXia/apps/web/src/lib/rateLimiter.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * rateLimiter.ts — API Rate Limiting (In-Memory Token Bucket)
 * 
 * Tier'ler:
 * - Public API: 60 req/dk
 * - Authenticated: 120 req/dk
 * - Webhook: 300 req/dk
 * - Admin: 600 req/dk
 */ __turbopack_context__.s([
    "checkRateLimit",
    ()=>checkRateLimit,
    "getClientIP",
    ()=>getClientIP,
    "rateLimitCheck",
    ()=>rateLimitCheck
]);
const buckets = new Map();
// Temizleme — 5dk'da bir eski bucket'ları sil
if (typeof setInterval !== 'undefined') {
    setInterval(()=>{
        const now = Date.now();
        for (const [key, entry] of buckets.entries()){
            if (now - entry.lastRefill > 10 * 60 * 1000) buckets.delete(key);
        }
    }, 5 * 60 * 1000);
}
const TIER_CONFIG = {
    public: {
        maxTokens: 60,
        refillRate: 1
    },
    authenticated: {
        maxTokens: 120,
        refillRate: 2
    },
    webhook: {
        maxTokens: 300,
        refillRate: 5
    },
    admin: {
        maxTokens: 600,
        refillRate: 10
    },
    ai_operation: {
        maxTokens: 5,
        refillRate: 1
    },
    gemini_api: {
        maxTokens: 10,
        refillRate: 0.17
    },
    google_ads: {
        maxTokens: 20,
        refillRate: 0.33
    },
    google_gmb: {
        maxTokens: 30,
        refillRate: 0.5
    }
};
function checkRateLimit(identifier, tier = 'public', cost = 1) {
    const config = TIER_CONFIG[tier];
    const key = `${tier}:${identifier}`;
    const now = Date.now();
    let bucket = buckets.get(key);
    if (!bucket) {
        bucket = {
            tokens: config.maxTokens,
            lastRefill: now
        };
        buckets.set(key, bucket);
    }
    const elapsed = now - bucket.lastRefill;
    const refillAmount = Math.floor(elapsed / 1000) * config.refillRate;
    if (refillAmount > 0) {
        bucket.tokens = Math.min(config.maxTokens, bucket.tokens + refillAmount);
        bucket.lastRefill = now;
    }
    if (bucket.tokens >= cost) {
        bucket.tokens -= cost;
        return {
            allowed: true,
            remaining: bucket.tokens,
            resetMs: Math.ceil((config.maxTokens - bucket.tokens) / config.refillRate) * 1000
        };
    }
    const retryAfter = Math.ceil(cost / config.refillRate) * 1000;
    return {
        allowed: false,
        remaining: 0,
        resetMs: retryAfter,
        retryAfter
    };
}
function getClientIP(request) {
    return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || request.headers.get('cf-connecting-ip') || '127.0.0.1';
}
const rateLimitCheck = checkRateLimit;
}),
"[project]/XinXia/apps/web/src/app/api/unsplash/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "revalidate",
    ()=>revalidate,
    "runtime",
    ()=>runtime
]);
/**
 * Unsplash API Route — /api/unsplash
 * ─────────────────────────────────────────────────────────────────────────────
 * Serverless endpoint that proxies Unsplash API requests.
 * Keeps API key server-side, adds caching headers, and rate limits per client.
 *
 * GET /api/unsplash?section=hero|showcase|features&count=6
 * GET /api/unsplash?query=modern+architecture&per_page=10&orientation=landscape
 * ─────────────────────────────────────────────────────────────────────────────
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$lib$2f$unsplashService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/apps/web/src/lib/unsplashService.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$lib$2f$rateLimiter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/apps/web/src/lib/rateLimiter.ts [app-route] (ecmascript)");
;
;
;
const runtime = 'nodejs';
const revalidate = 3600 // ISR: 1 hour
;
async function GET(req) {
    /* 1. Rate limit check */ const ip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$lib$2f$rateLimiter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getClientIP"])(req);
    const limit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$lib$2f$rateLimiter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkRateLimit"])(`unsplash:${ip}`, 'public');
    if (!limit.allowed) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Too many requests',
            retryAfter: limit.retryAfter
        }, {
            status: 429,
            headers: {
                'Retry-After': String(Math.ceil((limit.retryAfter ?? 60000) / 1000)),
                'X-RateLimit-Remaining': String(limit.remaining)
            }
        });
    }
    /* 2. Parse params */ const { searchParams } = req.nextUrl;
    const section = searchParams.get('section');
    const query = searchParams.get('query');
    const count = Math.min(parseInt(searchParams.get('count') || '6'), 30);
    const service = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$lib$2f$unsplashService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUnsplashService"])();
    try {
        /* 3a. Section-based query (curated) */ if (section && section in __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$lib$2f$unsplashService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KEPENK_QUERIES"]) {
            const photos = await service.getForSection(section, count);
            return __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                photos,
                stats: service.getStats()
            }, {
                headers: {
                    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
                    'X-Cache': 'unsplash-section'
                }
            });
        }
        /* 3b. Custom query */ if (query) {
            const params = {
                query,
                perPage: count,
                orientation: searchParams.get('orientation') || 'landscape',
                contentFilter: 'high'
            };
            const result = await service.search(params);
            return __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                photos: result.results,
                total: result.total,
                stats: service.getStats()
            }, {
                headers: {
                    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
                    'X-Cache': 'unsplash-search'
                }
            });
        }
        /* 3c. No params → return hero photos */ const heroPhotos = await service.getForSection('hero', 3);
        return __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            photos: heroPhotos,
            stats: service.getStats()
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
                'X-Cache': 'unsplash-hero'
            }
        });
    } catch (error) {
        console.error('[API/unsplash] Error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error',
            photos: []
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0e4b4e3e._.js.map