'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useUnsplash } from '@/hooks/useUnsplash'
import type { UnsplashPhoto } from '@/lib/unsplashService'

/**
 * HeroShowcase — Premium hero section with auto-rotating Unsplash images.
 * ─────────────────────────────────────────────────────────────────────────────
 * Features:
 *   • Auto-crossfade between high-res images (8s interval)
 *   • Parallax scroll effect on background
 *   • Blur-up placeholder loading
 *   • Photographer credit (Unsplash TOS)
 *   • Responsive gradient overlay
 * ─────────────────────────────────────────────────────────────────────────────
 */

interface HeroShowcaseProps {
    title?: string
    subtitle?: string
    ctaText?: string
    ctaHref?: string
    overlayOpacity?: number
}

export default function HeroShowcase({
    title = 'Güvenliğin Yeni Nesil Yüzü',
    subtitle = 'Kepenk AI ile işletmenizi akıllı, güvenli ve şık hale getirin.',
    ctaText = 'Hemen Başlayın',
    ctaHref = '/kayit',
    overlayOpacity = 0.55,
}: HeroShowcaseProps) {
    const { photos, loading } = useUnsplash({ section: 'hero', count: 4 })
    const [current, setCurrent] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [scrollY, setScrollY] = useState(0)
    const heroRef = useRef<HTMLDivElement>(null)

    /* Parallax scroll tracker */
    useEffect(() => {
        const handler = () => setScrollY(window.scrollY)
        window.addEventListener('scroll', handler, { passive: true })
        return () => window.removeEventListener('scroll', handler)
    }, [])

    /* Auto-rotate images */
    useEffect(() => {
        if (photos.length <= 1) return
        const timer = setInterval(() => {
            setIsTransitioning(true)
            setTimeout(() => {
                setCurrent(prev => (prev + 1) % photos.length)
                setTimeout(() => setIsTransitioning(false), 100)
            }, 600)
        }, 8000)
        return () => clearInterval(timer)
    }, [photos.length])

    const activePhoto = photos[current]
    const nextPhoto = photos[(current + 1) % (photos.length || 1)]

    return (
        <>
            <style>{`
                .kp-hero {
                    position: relative;
                    width: 100%;
                    height: 100vh;
                    min-height: 600px;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                }

                .kp-hero-bg {
                    position: absolute;
                    inset: 0;
                    background-size: cover;
                    background-position: center;
                    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                    will-change: transform, opacity;
                }
                .kp-hero-bg.active { opacity: 1; }
                .kp-hero-bg.inactive { opacity: 0; }

                .kp-hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        180deg,
                        rgba(15, 23, 42, 0.3) 0%,
                        rgba(15, 23, 42, 0.6) 50%,
                        rgba(15, 23, 42, 0.85) 100%
                    );
                    z-index: 1;
                }

                .kp-hero-content {
                    position: relative;
                    z-index: 2;
                    text-align: center;
                    padding: 0 24px;
                    max-width: 800px;
                    animation: kpHeroIn 1s ease-out both;
                }
                @keyframes kpHeroIn {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: none; }
                }

                .kp-hero-title {
                    font-size: clamp(2.5rem, 6vw, 4.5rem);
                    font-weight: 900;
                    color: #fff;
                    line-height: 1.1;
                    margin-bottom: 20px;
                    letter-spacing: -0.02em;
                    text-shadow: 0 2px 20px rgba(0,0,0,0.3);
                }

                .kp-hero-subtitle {
                    font-size: clamp(1rem, 2vw, 1.25rem);
                    color: rgba(255,255,255,0.8);
                    line-height: 1.6;
                    margin-bottom: 36px;
                    font-weight: 400;
                    max-width: 600px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .kp-hero-cta {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 16px 36px;
                    background: #fff;
                    color: #0f172a;
                    font-size: 15px;
                    font-weight: 700;
                    border: none;
                    border-radius: 12px;
                    cursor: pointer;
                    text-decoration: none;
                    transition: all 0.2s;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                }
                .kp-hero-cta:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
                    background: #f8fafc;
                }
                .kp-hero-cta svg { transition: transform 0.2s; }
                .kp-hero-cta:hover svg { transform: translateX(3px); }

                .kp-hero-credit {
                    position: absolute;
                    bottom: 16px;
                    right: 20px;
                    z-index: 3;
                    font-size: 11px;
                    color: rgba(255,255,255,0.4);
                    text-decoration: none;
                    transition: color 0.2s;
                }
                .kp-hero-credit:hover { color: rgba(255,255,255,0.7); }

                .kp-hero-dots {
                    position: absolute;
                    bottom: 24px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 3;
                    display: flex;
                    gap: 8px;
                }
                .kp-hero-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.3);
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s;
                    padding: 0;
                }
                .kp-hero-dot.active {
                    background: #fff;
                    width: 24px;
                    border-radius: 4px;
                }

                .kp-hero-loading {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .kp-hero-spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid rgba(255,255,255,0.1);
                    border-top-color: rgba(255,255,255,0.5);
                    border-radius: 50%;
                    animation: kpSpin 0.8s linear infinite;
                }
                @keyframes kpSpin { to { transform: rotate(360deg); } }
            `}</style>

            <section className="kp-hero" ref={heroRef}>
                {loading ? (
                    <div className="kp-hero-loading">
                        <div className="kp-hero-spinner" />
                    </div>
                ) : (
                    <>
                        {/* Background images */}
                        {activePhoto && (
                            <div
                                className={`kp-hero-bg ${isTransitioning ? 'inactive' : 'active'}`}
                                style={{
                                    backgroundImage: `url(${activePhoto.urls.regular})`,
                                    transform: `translateY(${scrollY * 0.3}px) scale(1.05)`,
                                }}
                            />
                        )}
                        {nextPhoto && (
                            <div
                                className={`kp-hero-bg ${isTransitioning ? 'active' : 'inactive'}`}
                                style={{
                                    backgroundImage: `url(${nextPhoto.urls.regular})`,
                                    transform: `translateY(${scrollY * 0.3}px) scale(1.05)`,
                                }}
                            />
                        )}

                        {/* Overlay */}
                        <div className="kp-hero-overlay" style={{ opacity: overlayOpacity }} />

                        {/* Content */}
                        <div className="kp-hero-content">
                            <h1 className="kp-hero-title">{title}</h1>
                            <p className="kp-hero-subtitle">{subtitle}</p>
                            <a className="kp-hero-cta" href={ctaHref}>
                                {ctaText}
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                                </svg>
                            </a>
                        </div>

                        {/* Navigation dots */}
                        {photos.length > 1 && (
                            <div className="kp-hero-dots">
                                {photos.map((_, i) => (
                                    <button
                                        key={i}
                                        className={`kp-hero-dot${i === current ? ' active' : ''}`}
                                        onClick={() => setCurrent(i)}
                                        aria-label={`Görsel ${i + 1}`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Photographer credit (Unsplash TOS) */}
                        {activePhoto?.user && activePhoto.user.name !== 'Kepenk AI' && (
                            <a
                                className="kp-hero-credit"
                                href={`${activePhoto.user.links.html}?utm_source=kepenk&utm_medium=referral`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Photo by {activePhoto.user.name} on Unsplash
                            </a>
                        )}
                    </>
                )}
            </section>
        </>
    )
}
