'use client'

import { useState, useEffect, useCallback } from 'react'
import type { UnsplashPhoto } from '@/lib/unsplashService'

/**
 * useUnsplash — Unsplash görsel çekme hook'u
 * ─────────────────────────────────────────────────────────────────────────────
 * API route'u (/api/unsplash) üzerinden görselleri çeker.
 * Loading, error, ve retry state yönetimi built-in.
 * ─────────────────────────────────────────────────────────────────────────────
 */

interface UseUnsplashOptions {
    section?: 'hero' | 'showcase' | 'features'
    query?: string
    count?: number
    orientation?: 'landscape' | 'portrait' | 'squarish'
    autoFetch?: boolean
}

interface UseUnsplashReturn {
    photos: UnsplashPhoto[]
    loading: boolean
    error: string | null
    refetch: () => Promise<void>
}

export function useUnsplash(options: UseUnsplashOptions = {}): UseUnsplashReturn {
    const { section, query, count = 6, orientation = 'landscape', autoFetch = true } = options
    const [photos, setPhotos] = useState<UnsplashPhoto[]>([])
    const [loading, setLoading] = useState(autoFetch)
    const [error, setError] = useState<string | null>(null)

    const fetchPhotos = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const params = new URLSearchParams()
            if (section) params.set('section', section)
            if (query) params.set('query', query)
            if (count) params.set('count', String(count))
            if (orientation) params.set('orientation', orientation)

            const res = await fetch(`/api/unsplash?${params.toString()}`)
            if (!res.ok) {
                const data = await res.json().catch(() => ({}))
                throw new Error(data.error || `HTTP ${res.status}`)
            }

            const data = await res.json()
            setPhotos(data.photos || [])
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Görsel yükleme hatası'
            setError(msg)
            console.error('[useUnsplash]', msg)
        } finally {
            setLoading(false)
        }
    }, [section, query, count, orientation])

    useEffect(() => {
        if (autoFetch) fetchPhotos()
    }, [autoFetch, fetchPhotos])

    return { photos, loading, error, refetch: fetchPhotos }
}
