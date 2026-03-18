'use client'

import { useState, useCallback, useRef } from 'react'
import { useEditorStore } from '../../store/editor-store'

/* ── Sector-smart Unsplash queries ──────────────────────────────────────── */

const SEKTOR_UNSPLASH_QUERIES: Record<number, { label: string; queries: { label: string; query: string }[] }> = {
    1: { label: 'Restoran', queries: [{ label: 'Yemek', query: 'restaurant food turkish cuisine' }, { label: 'Mekan', query: 'restaurant interior warm' }, { label: 'Mutfak', query: 'chef cooking kitchen' }, { label: 'Masa', query: 'table setting dinner' }] },
    2: { label: 'Kafe', queries: [{ label: 'Kahve', query: 'coffee latte art espresso' }, { label: 'Mekan', query: 'coffee shop cozy interior' }, { label: 'Yiyecek', query: 'pastry cake bakery' }] },
    3: { label: 'Berber', queries: [{ label: 'Kesim', query: 'haircut barber' }, { label: 'Mekan', query: 'barber shop interior' }, { label: 'Ekipman', query: 'barber tools scissors' }] },
    4: { label: 'Kuafor', queries: [{ label: 'Sac', query: 'hair salon styling' }, { label: 'Salon', query: 'beauty salon interior' }, { label: 'Renk', query: 'hair color dye' }] },
    5: { label: 'Guzellik', queries: [{ label: 'Bakim', query: 'facial treatment skincare' }, { label: 'Salon', query: 'beauty salon pink' }, { label: 'Makyaj', query: 'makeup cosmetics' }] },
    6: { label: 'Spor', queries: [{ label: 'Salon', query: 'gym fitness equipment' }, { label: 'Egzersiz', query: 'workout training exercise' }, { label: 'Yoga', query: 'yoga meditation wellness' }] },
    7: { label: 'Doktor', queries: [{ label: 'Klinik', query: 'medical clinic interior' }, { label: 'Doktor', query: 'doctor professional portrait' }, { label: 'Saglik', query: 'healthcare stethoscope' }] },
    8: { label: 'Dis', queries: [{ label: 'Klinik', query: 'dental clinic modern' }, { label: 'Gulus', query: 'smile teeth whitening' }, { label: 'Ekipman', query: 'dental equipment chair' }] },
    9: { label: 'Eczane', queries: [{ label: 'Eczane', query: 'pharmacy drugstore interior' }, { label: 'Ilac', query: 'medicine pills health' }, { label: 'Danisma', query: 'pharmacist consultation' }] },
    10: { label: 'Hukuk', queries: [{ label: 'Ofis', query: 'law office professional' }, { label: 'Adalet', query: 'justice scales legal' }, { label: 'Toplanti', query: 'business meeting conference' }] },
    11: { label: 'Oto', queries: [{ label: 'Servis', query: 'car repair automotive service' }, { label: 'Araba', query: 'automobile showroom modern' }, { label: 'Mekanik', query: 'mechanic tools garage' }] },
    12: { label: 'Emlak', queries: [{ label: 'Ev', query: 'real estate house modern' }, { label: 'Ic Mekan', query: 'interior design living room' }, { label: 'Bina', query: 'apartment building architecture' }] },
    13: { label: 'Cicek', queries: [{ label: 'Buket', query: 'flower bouquet colorful' }, { label: 'Dukkan', query: 'flower shop florist' }, { label: 'Bahce', query: 'garden flowers nature' }] },
    14: { label: 'Fotograf', queries: [{ label: 'Studio', query: 'photography studio lighting' }, { label: 'Kamera', query: 'camera lens equipment' }, { label: 'Portre', query: 'portrait photography professional' }] },
    15: { label: 'Pet Shop', queries: [{ label: 'Hayvan', query: 'pet shop cute animals' }, { label: 'Kopek', query: 'dog grooming pet care' }, { label: 'Kedi', query: 'cat kitten adorable' }] },
    16: { label: 'Market', queries: [{ label: 'Raf', query: 'grocery store shelves' }, { label: 'Meyve', query: 'fresh fruits vegetables' }, { label: 'Market', query: 'supermarket aisle modern' }] },
    17: { label: 'Kirtasiye', queries: [{ label: 'Malzeme', query: 'stationery supplies colorful' }, { label: 'Dukkan', query: 'bookstore stationery shop' }, { label: 'Kalem', query: 'pens notebooks office supplies' }] },
    18: { label: 'Mobilya', queries: [{ label: 'Salon', query: 'furniture showroom modern' }, { label: 'Koltuk', query: 'sofa living room interior' }, { label: 'Ahsap', query: 'wood craftsmanship furniture' }] },
    19: { label: 'Insaat', queries: [{ label: 'Santiye', query: 'construction site building' }, { label: 'Mimar', query: 'architecture blueprint design' }, { label: 'Ekip', query: 'construction workers team' }] },
    20: { label: 'Egitim', queries: [{ label: 'Sinif', query: 'classroom education modern' }, { label: 'Ogrenci', query: 'students learning study' }, { label: 'Kitap', query: 'books library education' }] },
    21: { label: 'Elektronik', queries: [{ label: 'Teknoloji', query: 'electronics technology gadgets' }, { label: 'Tamir', query: 'phone repair electronics service' }, { label: 'Dukkan', query: 'electronics store display' }] },
    22: { label: 'Tekstil', queries: [{ label: 'Kumas', query: 'textile fabric colorful' }, { label: 'Magaza', query: 'clothing store boutique' }, { label: 'Moda', query: 'fashion design clothing' }] },
    23: { label: 'Pastane', queries: [{ label: 'Pasta', query: 'cake bakery pastry' }, { label: 'Tatli', query: 'dessert sweet chocolate' }, { label: 'Dukkan', query: 'bakery shop display' }] },
    24: { label: 'Oto Yikama', queries: [{ label: 'Yikama', query: 'car wash clean water' }, { label: 'Detay', query: 'car detailing polish' }, { label: 'Ekipman', query: 'car wash equipment' }] },
}

/* ── Turkish-to-English search translation ──────────────────────────────── */

const TURKCE_ARAMALAR: Record<string, string> = {
    'yemek': 'food cuisine',
    'restoran': 'restaurant dining',
    'berber': 'barber shop',
    'kuafor': 'hair salon',
    'guzellik': 'beauty salon',
    'spor': 'gym fitness',
    'doktor': 'doctor medical',
    'dis': 'dental teeth',
    'kahve': 'coffee',
    'cicek': 'flowers bouquet',
    'araba': 'car automotive',
    'dugun': 'wedding ceremony',
    'mekan': 'interior design',
    'insan': 'professional portrait',
    'mutfak': 'kitchen cooking',
    'masa': 'table setting',
    'bahce': 'garden nature',
    'ofis': 'modern office',
    'teknoloji': 'technology digital',
    'moda': 'fashion style',
    'sanat': 'art creative',
    'muzik': 'music instruments',
    'deniz': 'sea ocean beach',
    'dag': 'mountain landscape',
    'sehir': 'city urban skyline',
    'gece': 'night dark moody',
    'gunesli': 'sunny bright daylight',
    'doga': 'nature green outdoors',
    'hayvan': 'animals pets',
    'bebek': 'baby newborn',
    'aile': 'family together',
    'cocuk': 'children kids playing',
    'okul': 'school education classroom',
    'universite': 'university campus',
    'hastane': 'hospital medical facility',
    'eczane': 'pharmacy medicine',
    'avukat': 'lawyer legal office',
    'muhasebe': 'accounting finance',
    'emlak': 'real estate property',
    'insaat': 'construction building',
    'mobilya': 'furniture interior',
    'elektronik': 'electronics gadgets',
    'kiyafet': 'clothing apparel',
    'ayakkabi': 'shoes footwear',
    'canta': 'bag accessories',
    'saat': 'watch jewelry',
    'parfum': 'perfume fragrance',
    'kozmetik': 'cosmetics beauty',
    'kasap': 'butcher meat',
    'balik': 'fish seafood',
    'manav': 'produce fruits vegetables',
    'firinci': 'bread bakery oven',
    'tatli': 'dessert sweet pastry',
    'pasta': 'cake celebration',
    'cay': 'tea traditional',
    'nargile': 'hookah lounge',
    'otel': 'hotel accommodation luxury',
    'pansiyon': 'guesthouse cozy',
    'kamp': 'camping outdoor adventure',
    'bisiklet': 'bicycle cycling',
    'motor': 'motorcycle biker',
}

/* ── Color filter options ───────────────────────────────────────────────── */

const COLOR_OPTIONS = [
    { value: 'black', hex: '#000000' },
    { value: 'white', hex: '#ffffff' },
    { value: 'red', hex: '#ef4444' },
    { value: 'orange', hex: '#f97316' },
    { value: 'yellow', hex: '#eab308' },
    { value: 'green', hex: '#22c55e' },
    { value: 'blue', hex: '#3b82f6' },
    { value: 'purple', hex: '#8b5cf6' },
] as const

/* ── Orientation options ────────────────────────────────────────────────── */

const ORIENTATION_OPTIONS = [
    { value: 'landscape' as const, label: 'Yatay' },
    { value: 'portrait' as const, label: 'Dikey' },
    { value: 'squarish' as const, label: 'Kare' },
]

/* ── Photo type from API ────────────────────────────────────────────────── */

interface UnsplashPhoto {
    id: string
    width: number
    height: number
    description: string | null
    alt_description: string | null
    color: string
    urls: {
        raw: string
        full: string
        regular: string
        small: string
        thumb: string
    }
    user: {
        name: string
        username: string
        links: { html: string }
    }
}

/* ── Search icon SVG ────────────────────────────────────────────────────── */

function SearchIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="#64748b" strokeWidth="1.5" />
            <path d="M9.5 9.5L13 13" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}

/* ══════════════════════════════════════════════════════════════════════════
   UNSPLASH PANEL
   ══════════════════════════════════════════════════════════════════════════ */

export default function UnsplashPanel() {
    /* ── Store ── */
    const siteData = useEditorStore(s => s.siteData)
    const updateSiteData = useEditorStore(s => s.updateSiteData)

    /* ── Local state ── */
    const [query, setQuery] = useState('')
    const [photos, setPhotos] = useState<UnsplashPhoto[]>([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [orientation, setOrientation] = useState<'landscape' | 'portrait' | 'squarish'>('landscape')
    const [colorFilter, setColorFilter] = useState<string | null>(null)
    const [hoveredId, setHoveredId] = useState<string | null>(null)
    const [totalResults, setTotalResults] = useState(0)

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const abortRef = useRef<AbortController | null>(null)

    /* ── Translate Turkish query to English ── */
    const translateQuery = useCallback((input: string): string => {
        const trimmed = input.trim().toLowerCase()
        // Exact match
        if (TURKCE_ARAMALAR[trimmed]) return TURKCE_ARAMALAR[trimmed]
        // Try each word
        const words = trimmed.split(/\s+/)
        const translated = words.map(w => TURKCE_ARAMALAR[w] || w)
        const result = translated.join(' ')
        // If nothing changed, return as-is (might already be English)
        return result
    }, [])

    /* ── Fetch photos ── */
    const fetchPhotos = useCallback(async (
        searchQuery: string,
        pageNum: number,
        orient: string,
        color: string | null,
        append: boolean,
    ) => {
        if (!searchQuery.trim()) return

        // Cancel any in-flight request
        if (abortRef.current) abortRef.current.abort()
        const controller = new AbortController()
        abortRef.current = controller

        if (append) {
            setLoadingMore(true)
        } else {
            setLoading(true)
        }

        try {
            const englishQuery = translateQuery(searchQuery)
            const params = new URLSearchParams({
                query: englishQuery,
                count: '12',
                orientation: orient,
            })
            if (color) params.set('color', color)
            if (pageNum > 1) params.set('page', String(pageNum))

            const res = await fetch(`/api/unsplash?${params.toString()}`, {
                signal: controller.signal,
            })

            if (!res.ok) throw new Error('API error')

            const data = await res.json()
            const newPhotos: UnsplashPhoto[] = data.photos || []
            const total: number = data.total || 0

            setTotalResults(total)

            if (append) {
                setPhotos(prev => [...prev, ...newPhotos])
            } else {
                setPhotos(newPhotos)
            }

            setHasMore(newPhotos.length >= 12 && (append ? photos.length + newPhotos.length < total : newPhotos.length < total))
        } catch (err: unknown) {
            if (err instanceof DOMException && err.name === 'AbortError') return
            // Silently handle other errors — keep existing photos
        } finally {
            setLoading(false)
            setLoadingMore(false)
        }
    }, [translateQuery, photos.length])

    /* ── Debounced search trigger ── */
    const triggerSearch = useCallback((searchQuery: string, orient: string, color: string | null) => {
        if (debounceRef.current) clearTimeout(debounceRef.current)
        setPage(1)
        debounceRef.current = setTimeout(() => {
            fetchPhotos(searchQuery, 1, orient, color, false)
        }, 500)
    }, [fetchPhotos])

    /* ── Input change handler ── */
    const handleInputChange = useCallback((value: string) => {
        setQuery(value)
        triggerSearch(value, orientation, colorFilter)
    }, [orientation, colorFilter, triggerSearch])

    /* ── Suggestion chip click ── */
    const handleChipClick = useCallback((chipQuery: string) => {
        setQuery(chipQuery)
        setPage(1)
        if (debounceRef.current) clearTimeout(debounceRef.current)
        fetchPhotos(chipQuery, 1, orientation, colorFilter, false)
    }, [orientation, colorFilter, fetchPhotos])

    /* ── Orientation change ── */
    const handleOrientationChange = useCallback((orient: 'landscape' | 'portrait' | 'squarish') => {
        setOrientation(orient)
        if (query.trim()) {
            setPage(1)
            if (debounceRef.current) clearTimeout(debounceRef.current)
            fetchPhotos(query, 1, orient, colorFilter, false)
        }
    }, [query, colorFilter, fetchPhotos])

    /* ── Color filter change ── */
    const handleColorChange = useCallback((color: string) => {
        const newColor = colorFilter === color ? null : color
        setColorFilter(newColor)
        if (query.trim()) {
            setPage(1)
            if (debounceRef.current) clearTimeout(debounceRef.current)
            fetchPhotos(query, 1, orientation, newColor, false)
        }
    }, [query, orientation, colorFilter, fetchPhotos])

    /* ── Load more ── */
    const handleLoadMore = useCallback(() => {
        const nextPage = page + 1
        setPage(nextPage)
        fetchPhotos(query, nextPage, orientation, colorFilter, true)
    }, [page, query, orientation, colorFilter, fetchPhotos])

    /* ── Set as hero image ── */
    const handleSetHero = useCallback((url: string) => {
        updateSiteData({ unsplash: url })
    }, [updateSiteData])

    /* ── Sector suggestions ── */
    const sektorId = siteData?.sektorId
    const sektorQueries = sektorId ? SEKTOR_UNSPLASH_QUERIES[sektorId] : null

    return (
        <>
            <style>{`
                .ke-us-root {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    overflow: hidden;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                    color: #e2e8f0;
                }
                .ke-us-header {
                    padding: 12px 12px 0;
                    flex-shrink: 0;
                }
                .ke-us-title {
                    font-size: 13px;
                    font-weight: 600;
                    color: #f1f5f9;
                    margin: 0 0 10px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .ke-us-title-icon {
                    font-size: 15px;
                }
                .ke-us-search-wrap {
                    position: relative;
                    margin-bottom: 8px;
                }
                .ke-us-search-icon {
                    position: absolute;
                    left: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    pointer-events: none;
                    display: flex;
                    align-items: center;
                }
                .ke-us-search {
                    width: 100%;
                    height: 34px;
                    padding: 0 10px 0 30px;
                    border: 1px solid #334155;
                    border-radius: 8px;
                    background: #1e293b;
                    color: #e2e8f0;
                    font-size: 12px;
                    outline: none;
                    transition: border-color 0.15s;
                }
                .ke-us-search:focus {
                    border-color: #3b82f6;
                }
                .ke-us-search::placeholder {
                    color: #64748b;
                }

                /* Sector suggestion chips */
                .ke-us-chips-wrap {
                    margin-bottom: 8px;
                }
                .ke-us-chips-label {
                    font-size: 10px;
                    color: #64748b;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 4px;
                }
                .ke-us-chips {
                    display: flex;
                    gap: 4px;
                    overflow-x: auto;
                    padding-bottom: 4px;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                .ke-us-chips::-webkit-scrollbar {
                    display: none;
                }
                .ke-us-chip {
                    flex-shrink: 0;
                    padding: 4px 10px;
                    border-radius: 12px;
                    background: #1e293b;
                    border: 1px solid #334155;
                    color: #94a3b8;
                    font-size: 11px;
                    cursor: pointer;
                    transition: all 0.15s;
                    white-space: nowrap;
                }
                .ke-us-chip:hover {
                    background: #334155;
                    color: #e2e8f0;
                    border-color: #475569;
                }
                .ke-us-chip--active {
                    background: #1e3a5f;
                    border-color: #3b82f6;
                    color: #60a5fa;
                }

                /* Filters */
                .ke-us-filters {
                    padding: 0 12px;
                    margin-bottom: 8px;
                    flex-shrink: 0;
                }
                .ke-us-filter-row {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    margin-bottom: 6px;
                }
                .ke-us-filter-label {
                    font-size: 10px;
                    color: #64748b;
                    flex-shrink: 0;
                    width: 42px;
                }
                .ke-us-orient-pills {
                    display: flex;
                    gap: 2px;
                    flex: 1;
                }
                .ke-us-orient-pill {
                    flex: 1;
                    padding: 4px 0;
                    border-radius: 6px;
                    background: transparent;
                    border: 1px solid #334155;
                    color: #94a3b8;
                    font-size: 10px;
                    cursor: pointer;
                    transition: all 0.15s;
                    text-align: center;
                }
                .ke-us-orient-pill:hover {
                    border-color: #475569;
                    color: #e2e8f0;
                }
                .ke-us-orient-pill--active {
                    background: #1e3a5f;
                    border-color: #3b82f6;
                    color: #60a5fa;
                }
                .ke-us-colors {
                    display: flex;
                    gap: 4px;
                    flex: 1;
                }
                .ke-us-color-dot {
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    cursor: pointer;
                    border: 2px solid transparent;
                    transition: all 0.15s;
                    flex-shrink: 0;
                }
                .ke-us-color-dot:hover {
                    transform: scale(1.15);
                }
                .ke-us-color-dot--active {
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
                }
                .ke-us-color-dot--white {
                    border-color: #475569;
                }

                /* Results count */
                .ke-us-results-info {
                    padding: 0 12px;
                    font-size: 10px;
                    color: #64748b;
                    margin-bottom: 6px;
                    flex-shrink: 0;
                }

                /* Grid */
                .ke-us-scroll {
                    flex: 1;
                    overflow-y: auto;
                    overflow-x: hidden;
                    padding: 0 12px 12px;
                    scrollbar-width: thin;
                    scrollbar-color: #334155 transparent;
                }
                .ke-us-scroll::-webkit-scrollbar {
                    width: 4px;
                }
                .ke-us-scroll::-webkit-scrollbar-track {
                    background: transparent;
                }
                .ke-us-scroll::-webkit-scrollbar-thumb {
                    background: #334155;
                    border-radius: 2px;
                }
                .ke-us-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 6px;
                }
                .ke-us-img-wrap {
                    position: relative;
                    overflow: hidden;
                    border-radius: 6px;
                    background: #1e293b;
                    cursor: pointer;
                }
                .ke-us-img {
                    display: block;
                    width: 100%;
                    height: auto;
                    aspect-ratio: auto;
                    object-fit: cover;
                    transition: transform 0.2s;
                }
                .ke-us-img-wrap:hover .ke-us-img {
                    transform: scale(1.05);
                }
                .ke-us-overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.55);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 4px;
                    opacity: 0;
                    transition: opacity 0.2s;
                }
                .ke-us-img-wrap:hover .ke-us-overlay {
                    opacity: 1;
                }
                .ke-us-hero-btn {
                    padding: 4px 10px;
                    border-radius: 6px;
                    background: #3b82f6;
                    color: #fff;
                    font-size: 10px;
                    font-weight: 600;
                    border: none;
                    cursor: pointer;
                    transition: background 0.15s;
                }
                .ke-us-hero-btn:hover {
                    background: #2563eb;
                }
                .ke-us-photographer {
                    font-size: 9px;
                    color: rgba(255, 255, 255, 0.7);
                    max-width: 90%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    text-align: center;
                }

                /* Loading skeleton */
                .ke-us-skeleton-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 6px;
                }
                .ke-us-skeleton {
                    border-radius: 6px;
                    background: #1e293b;
                    animation: ke-us-pulse 1.2s ease-in-out infinite;
                }
                @keyframes ke-us-pulse {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 0.8; }
                }

                /* Load more */
                .ke-us-load-more {
                    display: block;
                    width: 100%;
                    margin-top: 8px;
                    padding: 8px 0;
                    border: 1px solid #334155;
                    border-radius: 8px;
                    background: transparent;
                    color: #94a3b8;
                    font-size: 11px;
                    cursor: pointer;
                    transition: all 0.15s;
                }
                .ke-us-load-more:hover {
                    background: #1e293b;
                    border-color: #475569;
                    color: #e2e8f0;
                }
                .ke-us-load-more:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                /* Empty state */
                .ke-us-empty {
                    text-align: center;
                    padding: 32px 12px;
                    color: #64748b;
                    font-size: 12px;
                }
                .ke-us-empty-icon {
                    font-size: 28px;
                    margin-bottom: 8px;
                    opacity: 0.5;
                }
                .ke-us-empty-hint {
                    font-size: 10px;
                    color: #475569;
                    margin-top: 4px;
                }
            `}</style>

            <div className="ke-us-root">
                {/* Header */}
                <div className="ke-us-header">
                    <div className="ke-us-title">
                        <span className="ke-us-title-icon">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <rect x="1" y="3" width="13" height="9" rx="1.5" stroke="#60a5fa" strokeWidth="1.2" />
                                <circle cx="5" cy="7" r="1.5" stroke="#60a5fa" strokeWidth="1" />
                                <path d="M9 12L11.5 7.5L14 12" stroke="#60a5fa" strokeWidth="1" strokeLinejoin="round" />
                                <path d="M1 10L4.5 7L7 9" stroke="#60a5fa" strokeWidth="1" strokeLinejoin="round" />
                            </svg>
                        </span>
                        Unsplash Gorseller
                    </div>

                    {/* Search input */}
                    <div className="ke-us-search-wrap">
                        <span className="ke-us-search-icon">
                            <SearchIcon />
                        </span>
                        <input
                            className="ke-us-search"
                            type="text"
                            placeholder="Gorsel ara... (Turkce)"
                            value={query}
                            onChange={(e) => handleInputChange(e.target.value)}
                        />
                    </div>

                    {/* Sector chips */}
                    {sektorQueries && (
                        <div className="ke-us-chips-wrap">
                            <div className="ke-us-chips-label">{sektorQueries.label} onerileri</div>
                            <div className="ke-us-chips">
                                {sektorQueries.queries.map((sq) => (
                                    <button
                                        key={sq.query}
                                        className={`ke-us-chip${query === sq.label ? ' ke-us-chip--active' : ''}`}
                                        onClick={() => handleChipClick(sq.label)}
                                        type="button"
                                    >
                                        {sq.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Filters */}
                <div className="ke-us-filters">
                    {/* Orientation */}
                    <div className="ke-us-filter-row">
                        <span className="ke-us-filter-label">Yon</span>
                        <div className="ke-us-orient-pills">
                            {ORIENTATION_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    className={`ke-us-orient-pill${orientation === opt.value ? ' ke-us-orient-pill--active' : ''}`}
                                    onClick={() => handleOrientationChange(opt.value)}
                                    type="button"
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color */}
                    <div className="ke-us-filter-row">
                        <span className="ke-us-filter-label">Renk</span>
                        <div className="ke-us-colors">
                            {COLOR_OPTIONS.map((c) => (
                                <button
                                    key={c.value}
                                    className={`ke-us-color-dot${colorFilter === c.value ? ' ke-us-color-dot--active' : ''}${c.value === 'white' ? ' ke-us-color-dot--white' : ''}`}
                                    style={{ background: c.hex }}
                                    onClick={() => handleColorChange(c.value)}
                                    type="button"
                                    title={c.value}
                                    aria-label={`Renk filtresi: ${c.value}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results info */}
                {totalResults > 0 && !loading && (
                    <div className="ke-us-results-info">
                        {totalResults.toLocaleString('tr-TR')} sonuc bulundu
                    </div>
                )}

                {/* Scrollable grid area */}
                <div className="ke-us-scroll">
                    {/* Loading state */}
                    {loading && (
                        <div className="ke-us-skeleton-grid">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="ke-us-skeleton"
                                    style={{
                                        height: `${60 + (i % 3) * 15}px`,
                                        animationDelay: `${i * 0.08}s`,
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Photos grid */}
                    {!loading && photos.length > 0 && (
                        <>
                            <div className="ke-us-grid">
                                {photos.map((photo) => (
                                    <div
                                        key={photo.id}
                                        className="ke-us-img-wrap"
                                        onMouseEnter={() => setHoveredId(photo.id)}
                                        onMouseLeave={() => setHoveredId(null)}
                                    >
                                        <img
                                            className="ke-us-img"
                                            src={photo.urls.small}
                                            alt={photo.alt_description || photo.description || 'Unsplash gorsel'}
                                            loading="lazy"
                                        />
                                        {hoveredId === photo.id && (
                                            <div className="ke-us-overlay">
                                                <button
                                                    className="ke-us-hero-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleSetHero(photo.urls.regular)
                                                    }}
                                                    type="button"
                                                >
                                                    Hero Yap
                                                </button>
                                                <span className="ke-us-photographer">
                                                    {photo.user.name}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Load more */}
                            {hasMore && (
                                <button
                                    className="ke-us-load-more"
                                    onClick={handleLoadMore}
                                    disabled={loadingMore}
                                    type="button"
                                >
                                    {loadingMore ? 'Yukleniyor...' : 'Daha Fazla Yukle'}
                                </button>
                            )}
                        </>
                    )}

                    {/* Empty state */}
                    {!loading && photos.length === 0 && (
                        <div className="ke-us-empty">
                            <div className="ke-us-empty-icon">
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                                    <rect x="3" y="7" width="30" height="22" rx="3" stroke="#475569" strokeWidth="1.5" />
                                    <circle cx="12" cy="16" r="3" stroke="#475569" strokeWidth="1.2" />
                                    <path d="M22 29L28 19L33 29" stroke="#475569" strokeWidth="1.2" strokeLinejoin="round" />
                                    <path d="M3 24L10 17L17 22" stroke="#475569" strokeWidth="1.2" strokeLinejoin="round" />
                                </svg>
                            </div>
                            {query.trim()
                                ? 'Sonuc bulunamadi'
                                : 'Gorsel aramak icin yukariya yazin'}
                            <div className="ke-us-empty-hint">
                                Turkce arama yapabilirsiniz
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
