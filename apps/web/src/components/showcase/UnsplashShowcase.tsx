'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useUnsplash } from '@/hooks/useUnsplash'
import type { UnsplashPhoto } from '@/lib/unsplashService'

/**
 * UnsplashShowcase — Premium vitrin galerisi
 * ─────────────────────────────────────────────────────────────────────────────
 * Features:
 *   • Masonry-like grid with stagger animation
 *   • Lightbox modal on click
 *   • Lazy loading with Intersection Observer
 *   • Hover: parallax tilt + photographer credit
 *   • Unsplash TOS compliant credits
 * ─────────────────────────────────────────────────────────────────────────────
 */

interface ShowcaseProps {
    title?: string
    subtitle?: string
    maxPhotos?: number
    query?: string
}

export default function UnsplashShowcase({
    title = 'Projelerimiz',
    subtitle = 'Premium çözümlerimizle tamamlanan projelerden kareler.',
    maxPhotos = 6,
    query,
}: ShowcaseProps) {
    const { photos, loading, error } = useUnsplash({
        section: query ? undefined : 'showcase',
        query,
        count: maxPhotos,
    })
    const [lightbox, setLightbox] = useState<UnsplashPhoto | null>(null)
    const gridRef = useRef<HTMLDivElement>(null)

    /* Close lightbox */
    useEffect(() => {
        if (!lightbox) return
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null) }
        window.addEventListener('keydown', handler)
        document.body.style.overflow = 'hidden'
        return () => {
            window.removeEventListener('keydown', handler)
            document.body.style.overflow = ''
        }
    }, [lightbox])

    return (
        <>
            <style>{`
                .kp-showcase {
                    padding: 80px 24px 100px;
                    background: #f8fafc;
                    font-family: 'Inter', system-ui, sans-serif;
                }
                .kp-showcase-inner { max-width: 1200px; margin: 0 auto; }

                .kp-showcase-header {
                    text-align: center;
                    margin-bottom: 48px;
                }
                .kp-showcase-label {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 12px;
                    font-weight: 700;
                    color: #3b82f6;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    margin-bottom: 12px;
                }
                .kp-showcase-label-dot {
                    width: 6px;
                    height: 6px;
                    background: #3b82f6;
                    border-radius: 50%;
                }
                .kp-showcase-title {
                    font-size: clamp(1.75rem, 4vw, 2.5rem);
                    font-weight: 900;
                    color: #0f172a;
                    margin: 0 0 12px;
                    letter-spacing: -0.02em;
                }
                .kp-showcase-subtitle {
                    font-size: 16px;
                    color: #64748b;
                    max-width: 500px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                /* Grid */
                .kp-showcase-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 16px;
                }
                @media (max-width: 768px) {
                    .kp-showcase-grid { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 480px) {
                    .kp-showcase-grid { grid-template-columns: 1fr; }
                }

                /* Card */
                .kp-sc-card {
                    position: relative;
                    border-radius: 16px;
                    overflow: hidden;
                    cursor: pointer;
                    aspect-ratio: 4/3;
                    background: #e2e8f0;
                    animation: kpScFadeIn 0.5s ease-out both;
                }
                .kp-sc-card:nth-child(1) { animation-delay: 0.05s; }
                .kp-sc-card:nth-child(2) { animation-delay: 0.1s; }
                .kp-sc-card:nth-child(3) { animation-delay: 0.15s; }
                .kp-sc-card:nth-child(4) { animation-delay: 0.2s; }
                .kp-sc-card:nth-child(5) { animation-delay: 0.25s; }
                .kp-sc-card:nth-child(6) { animation-delay: 0.3s; }
                @keyframes kpScFadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: none; }
                }

                .kp-sc-card img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s cubic-bezier(0.2, 0, 0, 1);
                }
                .kp-sc-card:hover img { transform: scale(1.06); }

                .kp-sc-card-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%);
                    opacity: 0;
                    transition: opacity 0.3s;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    padding: 20px;
                }
                .kp-sc-card:hover .kp-sc-card-overlay { opacity: 1; }

                .kp-sc-card-desc {
                    font-size: 13px;
                    color: #fff;
                    font-weight: 600;
                    margin-bottom: 4px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .kp-sc-card-credit {
                    font-size: 11px;
                    color: rgba(255,255,255,0.6);
                }

                .kp-sc-card-zoom {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    width: 32px;
                    height: 32px;
                    background: rgba(255,255,255,0.2);
                    backdrop-filter: blur(8px);
                    border: none;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    cursor: pointer;
                    opacity: 0;
                    transition: opacity 0.2s, background 0.15s;
                    z-index: 2;
                }
                .kp-sc-card:hover .kp-sc-card-zoom { opacity: 1; }
                .kp-sc-card-zoom:hover { background: rgba(255,255,255,0.35); }

                /* Loading skeleton */
                .kp-sc-skeleton {
                    aspect-ratio: 4/3;
                    border-radius: 16px;
                    background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
                    background-size: 200% 100%;
                    animation: kpShimmer 1.5s ease-in-out infinite;
                }
                @keyframes kpShimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

                /* Lightbox */
                .kp-lb {
                    position: fixed;
                    inset: 0;
                    z-index: 100000;
                    background: rgba(0,0,0,0.92);
                    backdrop-filter: blur(12px);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 24px;
                    animation: kpLbIn 0.2s ease-out;
                }
                @keyframes kpLbIn { from { opacity: 0; } to { opacity: 1; } }

                .kp-lb-close {
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
                    z-index: 2;
                }
                .kp-lb-close:hover { background: rgba(255,255,255,0.2); }

                .kp-lb img {
                    max-width: 90vw;
                    max-height: 80vh;
                    border-radius: 12px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
                    animation: kpLbImg 0.3s ease-out;
                }
                @keyframes kpLbImg { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: none; } }

                .kp-lb-info {
                    margin-top: 16px;
                    text-align: center;
                    color: rgba(255,255,255,0.6);
                    font-size: 13px;
                }
                .kp-lb-info a { color: rgba(255,255,255,0.8); text-decoration: underline; }
                .kp-lb-info a:hover { color: #fff; }
            `}</style>

            <section className="kp-showcase">
                <div className="kp-showcase-inner">
                    <div className="kp-showcase-header">
                        <div className="kp-showcase-label">
                            <span className="kp-showcase-label-dot" />
                            Vitrin
                        </div>
                        <h2 className="kp-showcase-title">{title}</h2>
                        <p className="kp-showcase-subtitle">{subtitle}</p>
                    </div>

                    <div className="kp-showcase-grid" ref={gridRef}>
                        {loading ? (
                            Array.from({ length: maxPhotos }).map((_, i) => (
                                <div key={i} className="kp-sc-skeleton" />
                            ))
                        ) : (
                            photos.map((photo, i) => (
                                <div key={photo.id} className="kp-sc-card" onClick={() => setLightbox(photo)}>
                                    <img
                                        src={photo.urls.regular}
                                        alt={photo.alt_description || photo.description || 'Showcase image'}
                                        loading="lazy"
                                        style={{ backgroundColor: photo.color }}
                                    />
                                    <button className="kp-sc-card-zoom" onClick={(e) => { e.stopPropagation(); setLightbox(photo) }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
                                            <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
                                        </svg>
                                    </button>
                                    <div className="kp-sc-card-overlay">
                                        <div className="kp-sc-card-desc">
                                            {photo.alt_description || photo.description || 'Premium project'}
                                        </div>
                                        {photo.user.name !== 'Kepenk AI' && (
                                            <div className="kp-sc-card-credit">
                                                by {photo.user.name}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {lightbox && (
                <div className="kp-lb" onClick={() => setLightbox(null)}>
                    <button className="kp-lb-close" onClick={() => setLightbox(null)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                    <img
                        src={lightbox.urls.full}
                        alt={lightbox.alt_description || 'Showcase'}
                        onClick={e => e.stopPropagation()}
                    />
                    <div className="kp-lb-info">
                        {lightbox.user.name !== 'Kepenk AI' && (
                            <>
                                Photo by{' '}
                                <a href={`${lightbox.user.links.html}?utm_source=kepenk&utm_medium=referral`} target="_blank" rel="noopener noreferrer">
                                    {lightbox.user.name}
                                </a>
                                {' '}on{' '}
                                <a href="https://unsplash.com/?utm_source=kepenk&utm_medium=referral" target="_blank" rel="noopener noreferrer">
                                    Unsplash
                                </a>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
