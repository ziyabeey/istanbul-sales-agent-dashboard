/**
 * Unsplash API Route — /api/unsplash
 * ─────────────────────────────────────────────────────────────────────────────
 * Serverless endpoint that proxies Unsplash API requests.
 * Keeps API key server-side, adds caching headers, and rate limits per client.
 *
 * GET /api/unsplash?section=hero|showcase|features&count=6
 * GET /api/unsplash?query=modern+architecture&per_page=10&orientation=landscape
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { NextRequest, NextResponse } from 'next/server'
import { getUnsplashService, KEPENK_QUERIES, type UnsplashQuery } from '@/lib/unsplashService'
import { checkRateLimit, getClientIP } from '@/lib/rateLimiter'

export const runtime = 'nodejs'
export const revalidate = 3600  // ISR: 1 hour

export async function GET(req: NextRequest) {
    /* 1. Rate limit check */
    const ip = getClientIP(req)
    const limit = checkRateLimit(`unsplash:${ip}`, 'public')
    if (!limit.allowed) {
        return NextResponse.json(
            { error: 'Too many requests', retryAfter: limit.retryAfter },
            {
                status: 429,
                headers: {
                    'Retry-After': String(Math.ceil((limit.retryAfter ?? 60000) / 1000)),
                    'X-RateLimit-Remaining': String(limit.remaining),
                },
            }
        )
    }

    /* 2. Parse params */
    const { searchParams } = req.nextUrl
    const section = searchParams.get('section') as keyof typeof KEPENK_QUERIES | null
    const query = searchParams.get('query')
    const count = Math.min(parseInt(searchParams.get('count') || '6'), 30)

    const service = getUnsplashService()

    try {
        /* 3a. Section-based query (curated) */
        if (section && section in KEPENK_QUERIES) {
            const photos = await service.getForSection(section, count)
            return NextResponse.json(
                { photos, stats: service.getStats() },
                {
                    headers: {
                        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
                        'X-Cache': 'unsplash-section',
                    },
                }
            )
        }

        /* 3b. Custom query */
        if (query) {
            const params: UnsplashQuery = {
                query,
                perPage: count,
                orientation: (searchParams.get('orientation') as 'landscape' | 'portrait') || 'landscape',
                contentFilter: 'high',
            }
            const result = await service.search(params)
            return NextResponse.json(
                { photos: result.results, total: result.total, stats: service.getStats() },
                {
                    headers: {
                        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
                        'X-Cache': 'unsplash-search',
                    },
                }
            )
        }

        /* 3c. No params → return hero photos */
        const heroPhotos = await service.getForSection('hero', 3)
        return NextResponse.json(
            { photos: heroPhotos, stats: service.getStats() },
            {
                headers: {
                    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
                    'X-Cache': 'unsplash-hero',
                },
            }
        )
    } catch (error) {
        console.error('[API/unsplash] Error:', error)
        return NextResponse.json(
            { error: 'Internal server error', photos: [] },
            { status: 500 }
        )
    }
}
