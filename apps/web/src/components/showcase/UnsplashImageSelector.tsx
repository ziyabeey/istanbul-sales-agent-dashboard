'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useUnsplash } from '@/hooks/useUnsplash'
import {
    triggerUnsplashDownload,
    buildPhotographerUrl,
    buildUnsplashUrl,
    buildOptimizedUrl,
    type UnsplashImage,
} from '@/lib/unsplashTriggerDownload'

/**
 * UnsplashImageSelector — Production-ready image picker
 * ─────────────────────────────────────────────────────────────────────────────
 * Compliant with Unsplash API Guidelines for Production Rate Limits:
 *
 *   ✓ HOTLINKING:  Images rendered via Unsplash CDN URLs (urls.regular)
 *   ✓ TRIGGER DL:  GET → links.download_location on image selection
 *   ✓ ATTRIBUTION: "Photo by [Name] on Unsplash" with UTM links
 *
 * Usage:
 * ```tsx
 * <UnsplashImageSelector
 *     onSelect={(photo) => handleImageSelected(photo)}
 *     defaultQuery="modern architecture"
 * />
 * ```
 * ─────────────────────────────────────────────────────────────────────────────
 */

interface UnsplashImageSelectorProps {
    onSelect: (photo: UnsplashImage) => void
    defaultQuery?: string
    maxResults?: number
    orientation?: 'landscape' | 'portrait' | 'squarish'
    className?: string
}

export default function UnsplashImageSelector({
    onSelect,
    defaultQuery = 'modern architecture security',
    maxResults = 12,
    orientation = 'landscape',
    className = '',
}: UnsplashImageSelectorProps) {
    const [query, setQuery] = useState(defaultQuery)
    const [searchInput, setSearchInput] = useState(defaultQuery)
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [downloading, setDownloading] = useState<string | null>(null)
    const [previewPhoto, setPreviewPhoto] = useState<UnsplashImage | null>(null)
    const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

    const { photos, loading, error, refetch } = useUnsplash({
        query,
        count: maxResults,
        orientation,
    })

    /* Debounced search */
    const handleSearchChange = useCallback((value: string) => {
        setSearchInput(value)
        if (searchTimeout.current) clearTimeout(searchTimeout.current)
        searchTimeout.current = setTimeout(() => {
            if (value.trim().length >= 2) setQuery(value.trim())
        }, 500)
    }, [])

    /* ── CRITICAL: Trigger download on selection ──────────────────────── */
    const handleSelect = useCallback(async (photo: UnsplashImage) => {
        setSelectedId(photo.id)
        setDownloading(photo.id)

        // Trigger Unsplash download tracking (TOS requirement)
        await triggerUnsplashDownload(photo.links.download_location)

        setDownloading(null)
        onSelect(photo)
    }, [onSelect])

    /* Predefined search categories */
    const categories = [
        { label: 'Mimari', query: 'modern architecture security' },
        { label: 'Endüstriyel', query: 'industrial rolling shutter metallic' },
        { label: 'Konut', query: 'minimalist secure home entrance' },
        { label: 'İşyeri', query: 'modern storefront facade' },
        { label: 'Teknoloji', query: 'smart home technology' },
    ]

    return (
        <>
            <style>{`
                .kp-uis {
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                    background: #fff;
                    border-radius: 16px;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 4px 24px rgba(0,0,0,0.06);
                    overflow: hidden;
                }

                /* ── Header ───── */
                .kp-uis-header {
                    padding: 20px 20px 0;
                    border-bottom: 1px solid #f1f5f9;
                }
                .kp-uis-title {
                    font-size: 15px;
                    font-weight: 800;
                    color: #0f172a;
                    margin: 0 0 12px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .kp-uis-title svg { color: #64748b; }
                .kp-uis-unsplash-badge {
                    font-size: 10px;
                    font-weight: 700;
                    color: #94a3b8;
                    background: #f1f5f9;
                    padding: 2px 8px;
                    border-radius: 4px;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                /* ── Search ───── */
                .kp-uis-search {
                    position: relative;
                    margin-bottom: 12px;
                }
                .kp-uis-search-input {
                    width: 100%;
                    padding: 10px 12px 10px 36px;
                    border: 1px solid #e2e8f0;
                    border-radius: 10px;
                    font-size: 13px;
                    font-family: inherit;
                    outline: none;
                    background: #fafbfc;
                    transition: 0.15s;
                    box-sizing: border-box;
                }
                .kp-uis-search-input:focus {
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 3px rgba(59,130,246,0.08);
                    background: #fff;
                }
                .kp-uis-search-icon {
                    position: absolute;
                    left: 11px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #94a3b8;
                    pointer-events: none;
                }

                /* ── Categories ── */
                .kp-uis-cats {
                    display: flex;
                    gap: 6px;
                    overflow-x: auto;
                    padding-bottom: 14px;
                    scrollbar-width: none;
                }
                .kp-uis-cats::-webkit-scrollbar { display: none; }
                .kp-uis-cat {
                    flex-shrink: 0;
                    padding: 5px 12px;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 600;
                    border: 1px solid #e2e8f0;
                    background: #fff;
                    color: #64748b;
                    cursor: pointer;
                    transition: all 0.15s;
                    font-family: inherit;
                    white-space: nowrap;
                }
                .kp-uis-cat:hover { border-color: #94a3b8; color: #334155; }
                .kp-uis-cat.active {
                    background: #0f172a;
                    border-color: #0f172a;
                    color: #fff;
                }

                /* ── Grid ──────── */
                .kp-uis-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 8px;
                    padding: 16px;
                    max-height: 420px;
                    overflow-y: auto;
                }
                @media (max-width: 640px) {
                    .kp-uis-grid { grid-template-columns: repeat(2, 1fr); }
                }

                /* ── Image Card ── */
                .kp-uis-card {
                    position: relative;
                    border-radius: 10px;
                    overflow: hidden;
                    cursor: pointer;
                    aspect-ratio: 3/2;
                    background: #f1f5f9;
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .kp-uis-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
                }
                .kp-uis-card.selected {
                    box-shadow: 0 0 0 3px #3b82f6, 0 4px 16px rgba(59,130,246,0.2);
                }

                .kp-uis-card img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                    transition: transform 0.4s cubic-bezier(0.2, 0, 0, 1);
                }
                .kp-uis-card:hover img { transform: scale(1.04); }

                /* Selected check */
                .kp-uis-check {
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    width: 24px;
                    height: 24px;
                    background: #3b82f6;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    box-shadow: 0 2px 8px rgba(59,130,246,0.3);
                    animation: kpCheckIn 0.2s ease-out;
                }
                @keyframes kpCheckIn { from { transform: scale(0); } to { transform: scale(1); } }

                /* ── Attribution Overlay (Unsplash TOS) ── */
                .kp-uis-attr {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    padding: 24px 10px 8px;
                    background: linear-gradient(transparent, rgba(0,0,0,0.65));
                    opacity: 0;
                    transition: opacity 0.2s;
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                }
                .kp-uis-card:hover .kp-uis-attr { opacity: 1; }

                .kp-uis-credit {
                    font-size: 10px;
                    color: rgba(255,255,255,0.85);
                    line-height: 1.3;
                }
                .kp-uis-credit a {
                    color: #fff;
                    text-decoration: underline;
                    text-underline-offset: 2px;
                    text-decoration-color: rgba(255,255,255,0.4);
                    transition: text-decoration-color 0.15s;
                }
                .kp-uis-credit a:hover { text-decoration-color: #fff; }

                .kp-uis-use-btn {
                    flex-shrink: 0;
                    padding: 4px 10px;
                    background: #fff;
                    color: #0f172a;
                    border: none;
                    border-radius: 6px;
                    font-size: 11px;
                    font-weight: 700;
                    cursor: pointer;
                    font-family: inherit;
                    transition: 0.15s;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    white-space: nowrap;
                }
                .kp-uis-use-btn:hover { background: #f1f5f9; }

                /* ── Preview Modal ── */
                .kp-uis-preview {
                    position: fixed;
                    inset: 0;
                    z-index: 100000;
                    background: rgba(0,0,0,0.88);
                    backdrop-filter: blur(12px);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 24px;
                    animation: kpFadeIn 0.15s ease-out;
                }
                @keyframes kpFadeIn { from { opacity: 0; } to { opacity: 1; } }

                .kp-uis-preview-img {
                    max-width: 90vw;
                    max-height: 72vh;
                    border-radius: 12px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
                    animation: kpScaleIn 0.2s ease-out;
                }
                @keyframes kpScaleIn { from { transform: scale(0.96); opacity: 0; } to { transform: none; opacity: 1; } }

                .kp-uis-preview-bar {
                    margin-top: 20px;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    background: rgba(255,255,255,0.08);
                    padding: 12px 20px;
                    border-radius: 12px;
                    backdrop-filter: blur(8px);
                }
                .kp-uis-preview-credit {
                    font-size: 13px;
                    color: rgba(255,255,255,0.7);
                }
                .kp-uis-preview-credit a {
                    color: #fff;
                    text-decoration: underline;
                    text-underline-offset: 2px;
                }
                .kp-uis-preview-select {
                    padding: 8px 20px;
                    background: #fff;
                    color: #0f172a;
                    border: none;
                    border-radius: 8px;
                    font-size: 13px;
                    font-weight: 700;
                    cursor: pointer;
                    font-family: inherit;
                    transition: 0.15s;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .kp-uis-preview-select:hover { background: #f1f5f9; }
                .kp-uis-preview-close {
                    position: absolute;
                    top: 16px;
                    right: 20px;
                    width: 40px;
                    height: 40px;
                    background: rgba(255,255,255,0.1);
                    border: none;
                    border-radius: 10px;
                    color: #fff;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.15s;
                }
                .kp-uis-preview-close:hover { background: rgba(255,255,255,0.2); }

                /* ── Skeleton ──── */
                .kp-uis-skel {
                    border-radius: 10px;
                    aspect-ratio: 3/2;
                    background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
                    background-size: 200% 100%;
                    animation: kpShimmer 1.5s ease-in-out infinite;
                }
                @keyframes kpShimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

                /* ── Footer ────── */
                .kp-uis-footer {
                    padding: 10px 16px;
                    border-top: 1px solid #f1f5f9;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .kp-uis-powered {
                    font-size: 10px;
                    color: #94a3b8;
                }
                .kp-uis-powered a {
                    color: #64748b;
                    text-decoration: none;
                    font-weight: 700;
                }
                .kp-uis-powered a:hover { color: #334155; }
                .kp-uis-count {
                    font-size: 10px;
                    color: #94a3b8;
                    font-weight: 600;
                }

                /* ── Error ──── */
                .kp-uis-error {
                    padding: 24px;
                    text-align: center;
                    color: #ef4444;
                    font-size: 13px;
                }
                .kp-uis-error-btn {
                    margin-top: 8px;
                    padding: 6px 16px;
                    background: #fef2f2;
                    color: #ef4444;
                    border: 1px solid #fecaca;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    font-family: inherit;
                }

                /* ── Downloading indicator ── */
                .kp-uis-dl {
                    position: absolute;
                    inset: 0;
                    background: rgba(59,130,246,0.15);
                    backdrop-filter: blur(2px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 10px;
                }
                .kp-uis-dl-spin {
                    width: 20px;
                    height: 20px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-top-color: #fff;
                    border-radius: 50%;
                    animation: kpSpin 0.6s linear infinite;
                }
                @keyframes kpSpin { to { transform: rotate(360deg); } }
            `}</style>

            <div className={`kp-uis ${className}`}>
                {/* Header + Search */}
                <div className="kp-uis-header">
                    <div className="kp-uis-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                        Görsel Seç
                        <span className="kp-uis-unsplash-badge">Unsplash</span>
                    </div>

                    <div className="kp-uis-search">
                        <svg className="kp-uis-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            className="kp-uis-search-input"
                            type="text"
                            value={searchInput}
                            onChange={e => handleSearchChange(e.target.value)}
                            placeholder="Görsel ara... (ör: modern mimari)"
                        />
                    </div>

                    <div className="kp-uis-cats">
                        {categories.map(cat => (
                            <button
                                key={cat.query}
                                className={`kp-uis-cat${query === cat.query ? ' active' : ''}`}
                                onClick={() => { setQuery(cat.query); setSearchInput(cat.query) }}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                {error ? (
                    <div className="kp-uis-error">
                        <div>Görseller yüklenemedi</div>
                        <button className="kp-uis-error-btn" onClick={refetch}>Tekrar Dene</button>
                    </div>
                ) : (
                    <div className="kp-uis-grid">
                        {loading ? (
                            Array.from({ length: maxResults }).map((_, i) => (
                                <div key={i} className="kp-uis-skel" />
                            ))
                        ) : (
                            (photos as UnsplashImage[]).map(photo => (
                                <div
                                    key={photo.id}
                                    className={`kp-uis-card${selectedId === photo.id ? ' selected' : ''}`}
                                    onClick={() => setPreviewPhoto(photo)}
                                >
                                    {/* HOTLINKING: Direct Unsplash CDN URL */}
                                    <img
                                        src={buildOptimizedUrl(photo.urls.raw || photo.urls.regular, { w: 400, q: 80 })}
                                        alt={photo.alt_description || photo.description || 'Unsplash image'}
                                        loading="lazy"
                                        style={{ backgroundColor: photo.color }}
                                    />

                                    {/* Selected indicator */}
                                    {selectedId === photo.id && (
                                        <div className="kp-uis-check">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                    )}

                                    {/* Downloading spinner */}
                                    {downloading === photo.id && (
                                        <div className="kp-uis-dl">
                                            <div className="kp-uis-dl-spin" />
                                        </div>
                                    )}

                                    {/* ATTRIBUTION: Unsplash TOS compliant overlay */}
                                    <div className="kp-uis-attr">
                                        <div className="kp-uis-credit">
                                            Photo by{' '}
                                            <a
                                                href={buildPhotographerUrl(photo.user)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={e => e.stopPropagation()}
                                            >
                                                {photo.user.name}
                                            </a>
                                            {' '}on{' '}
                                            <a
                                                href={buildUnsplashUrl()}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={e => e.stopPropagation()}
                                            >
                                                Unsplash
                                            </a>
                                        </div>
                                        <button
                                            className="kp-uis-use-btn"
                                            onClick={e => { e.stopPropagation(); handleSelect(photo) }}
                                        >
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            Kullan
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Footer */}
                <div className="kp-uis-footer">
                    <div className="kp-uis-powered">
                        Powered by{' '}
                        <a href={buildUnsplashUrl()} target="_blank" rel="noopener noreferrer">Unsplash</a>
                    </div>
                    {!loading && <div className="kp-uis-count">{photos.length} görsel</div>}
                </div>
            </div>

            {/* ── Preview Modal ──────────────────────────────────────────── */}
            {previewPhoto && (
                <div className="kp-uis-preview" onClick={() => setPreviewPhoto(null)}>
                    <button className="kp-uis-preview-close" onClick={() => setPreviewPhoto(null)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                    <img
                        className="kp-uis-preview-img"
                        src={previewPhoto.urls.regular}
                        alt={previewPhoto.alt_description || 'Preview'}
                        onClick={e => e.stopPropagation()}
                    />
                    <div className="kp-uis-preview-bar" onClick={e => e.stopPropagation()}>
                        <div className="kp-uis-preview-credit">
                            Photo by{' '}
                            <a href={buildPhotographerUrl(previewPhoto.user)} target="_blank" rel="noopener noreferrer">
                                {previewPhoto.user.name}
                            </a>
                            {' '}on{' '}
                            <a href={buildUnsplashUrl()} target="_blank" rel="noopener noreferrer">
                                Unsplash
                            </a>
                        </div>
                        <button className="kp-uis-preview-select" onClick={() => { handleSelect(previewPhoto); setPreviewPhoto(null) }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Bu Görseli Kullan
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
