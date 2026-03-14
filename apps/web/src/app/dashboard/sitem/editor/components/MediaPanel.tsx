'use client'

import { useState, useCallback } from 'react'
import { useEditorStore } from '../store/editor-store'

function unsplashUrl(val?: string): string {
    if (!val) return ''
    if (val.startsWith('http')) return val
    return `https://images.unsplash.com/${val}?auto=format&fit=crop&w=800&q=80`
}

/**
 * MediaPanel — Media library panel for the LeftBar.
 * Provides Unsplash search and image management within the editor.
 */
export default function MediaPanel() {
    const siteData = useEditorStore(s => s.siteData)
    const updateSiteData = useEditorStore(s => s.updateSiteData)
    const [searchQuery, setSearchQuery] = useState('')
    const [photos, setPhotos] = useState<Array<{ id: string; urls: { small: string; regular: string }; alt_description: string | null; user: { name: string } }>>([])
    const [loading, setLoading] = useState(false)
    const [searched, setSearched] = useState(false)

    const handleSearch = useCallback(async () => {
        if (!searchQuery.trim()) return
        setLoading(true)
        setSearched(true)
        try {
            const res = await fetch(`/api/unsplash?query=${encodeURIComponent(searchQuery)}&count=12&orientation=landscape`)
            const data = await res.json()
            setPhotos(data.photos || [])
        } catch {
            setPhotos([])
        } finally {
            setLoading(false)
        }
    }, [searchQuery])

    const handleSelectAsHero = useCallback((url: string) => {
        updateSiteData({ unsplash: url })
    }, [updateSiteData])

    const quickCategories = [
        { label: 'Mimari', q: 'modern architecture' },
        { label: 'Mağaza', q: 'modern storefront' },
        { label: 'Restoran', q: 'restaurant interior' },
        { label: 'Güvenlik', q: 'security system' },
        { label: 'Teknoloji', q: 'technology abstract' },
        { label: 'Doğa', q: 'nature landscape' },
    ]

    return (
        <>
            <style>{`
                .ke-media-panel { display: flex; flex-direction: column; height: 100%; }
                .ke-media-search { display: flex; gap: 6px; padding: 12px; }
                .ke-media-input {
                    flex: 1; padding: 8px 10px; border: 1px solid #e2e8f0;
                    border-radius: 8px; font-size: 12px; font-family: inherit;
                    outline: none; background: #f8fafc; box-sizing: border-box;
                }
                .ke-media-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 2px rgba(59,130,246,0.08); }
                .ke-media-search-btn {
                    padding: 8px 14px; background: #2563eb; color: #fff;
                    border: none; border-radius: 8px; font-size: 11px;
                    font-weight: 700; cursor: pointer; font-family: inherit;
                    white-space: nowrap;
                }
                .ke-media-search-btn:hover { background: #1d4ed8; }

                .ke-media-cats {
                    display: flex; flex-wrap: wrap; gap: 4px;
                    padding: 0 12px 10px;
                }
                .ke-media-cat-btn {
                    padding: 4px 10px; border: 1px solid #e2e8f0;
                    border-radius: 6px; font-size: 10px; font-weight: 700;
                    background: #fff; color: #64748b; cursor: pointer;
                    font-family: inherit; transition: 0.15s;
                }
                .ke-media-cat-btn:hover { border-color: #93c5fd; color: #2563eb; }

                .ke-media-grid {
                    display: grid; grid-template-columns: repeat(2, 1fr);
                    gap: 6px; padding: 0 12px 12px;
                    flex: 1; overflow-y: auto;
                }
                .ke-media-item {
                    aspect-ratio: 3/2; border-radius: 8px; overflow: hidden;
                    cursor: pointer; position: relative; background: #f1f5f9;
                    border: 2px solid transparent; transition: 0.15s;
                }
                .ke-media-item:hover { border-color: #3b82f6; }
                .ke-media-item img { width: 100%; height: 100%; object-fit: cover; display: block; }
                .ke-media-item-overlay {
                    position: absolute; bottom: 0; left: 0; right: 0;
                    background: linear-gradient(transparent, rgba(0,0,0,0.6));
                    padding: 16px 6px 6px; opacity: 0; transition: 0.15s;
                }
                .ke-media-item:hover .ke-media-item-overlay { opacity: 1; }
                .ke-media-item-btn {
                    width: 100%; padding: 5px; background: #fff; color: #0f172a;
                    border: none; border-radius: 5px; font-size: 10px;
                    font-weight: 700; cursor: pointer; font-family: inherit;
                }
                .ke-media-item-btn:hover { background: #f1f5f9; }

                .ke-media-hero-section {
                    padding: 10px 12px; border-bottom: 1px solid #f1f5f9;
                }
                .ke-media-hero-label {
                    font-size: 10px; font-weight: 800; color: #94a3b8;
                    text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px;
                }
                .ke-media-hero-thumb {
                    width: 100%; height: 70px; object-fit: cover;
                    border-radius: 8px; border: 1px solid #e2e8f0;
                }

                .ke-media-empty {
                    text-align: center; padding: 32px 20px; color: #94a3b8;
                }
                .ke-media-empty-icon { margin-bottom: 8px; color: #cbd5e1; }
                .ke-media-empty-text { font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 4px; }
                .ke-media-empty-desc { font-size: 11px; }

                .ke-media-skel {
                    aspect-ratio: 3/2; border-radius: 8px;
                    background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
                    background-size: 200% 100%;
                    animation: keShimmer 1.5s ease-in-out infinite;
                }
                @keyframes keShimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
            `}</style>

            <div className="ke-media-panel">
                {/* Current hero image */}
                {siteData?.unsplash && (
                    <div className="ke-media-hero-section">
                        <div className="ke-media-hero-label">Mevcut Hero Görsel</div>
                        <img className="ke-media-hero-thumb" src={unsplashUrl(siteData.unsplash)} alt="Hero" />
                    </div>
                )}

                {/* Search */}
                <div className="ke-media-search">
                    <input
                        className="ke-media-input"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Görsel ara..."
                        onKeyDown={e => { if (e.key === 'Enter') handleSearch() }}
                    />
                    <button className="ke-media-search-btn" onClick={handleSearch}>
                        {loading ? '...' : 'Ara'}
                    </button>
                </div>

                {/* Quick categories */}
                <div className="ke-media-cats">
                    {quickCategories.map(cat => (
                        <button
                            key={cat.q}
                            className="ke-media-cat-btn"
                            onClick={() => { setSearchQuery(cat.q); setTimeout(() => { setSearchQuery(cat.q) }, 0) }}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Results */}
                <div className="ke-media-grid">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, i) => <div key={i} className="ke-media-skel" />)
                    ) : photos.length > 0 ? (
                        photos.map(photo => (
                            <div key={photo.id} className="ke-media-item" onClick={() => handleSelectAsHero(photo.urls.regular)}>
                                <img src={photo.urls.small} alt={photo.alt_description || 'Unsplash'} loading="lazy" />
                                <div className="ke-media-item-overlay">
                                    <button className="ke-media-item-btn" onClick={e => { e.stopPropagation(); handleSelectAsHero(photo.urls.regular) }}>
                                        Hero Olarak Kullan
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : !searched ? (
                        <div className="ke-media-empty" style={{ gridColumn: '1 / -1' }}>
                            <div className="ke-media-empty-icon">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <polyline points="21 15 16 10 5 21" />
                                </svg>
                            </div>
                            <div className="ke-media-empty-text">Medya Kütüphanesi</div>
                            <div className="ke-media-empty-desc">Unsplash&apos;tan yüksek kaliteli görseller arayın</div>
                        </div>
                    ) : (
                        <div className="ke-media-empty" style={{ gridColumn: '1 / -1' }}>
                            <div className="ke-media-empty-text">Sonuç bulunamadı</div>
                            <div className="ke-media-empty-desc">Farklı anahtar kelimeler deneyin</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
