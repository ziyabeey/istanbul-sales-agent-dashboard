'use client'

import { useState, useCallback, useRef } from 'react'

interface UnsplashPhotoResult {
    id: string
    alt_description: string | null
    urls: {
        regular: string
        small: string
        thumb: string
    }
    user: {
        name: string
    }
}

interface UseUnsplashSearchReturn {
    photos: UnsplashPhotoResult[]
    loading: boolean
    search: string
    setSearch: (q: string) => void
}

export function useUnsplashSearch(initialQuery = ''): UseUnsplashSearchReturn {
    const [photos, setPhotos] = useState<UnsplashPhotoResult[]>([])
    const [loading, setLoading] = useState(false)
    const [search, setSearchState] = useState(initialQuery)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const doFetch = useCallback(async (query: string) => {
        if (!query.trim()) {
            setPhotos([])
            return
        }
        setLoading(true)
        try {
            const res = await fetch(`/api/unsplash?query=${encodeURIComponent(query)}&count=12`)
            const data = await res.json()
            setPhotos(data.photos || [])
        } catch {
            setPhotos([])
        } finally {
            setLoading(false)
        }
    }, [])

    const setSearch = useCallback((q: string) => {
        setSearchState(q)
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => doFetch(q), 500)
    }, [doFetch])

    return { photos, loading, search, setSearch }
}
