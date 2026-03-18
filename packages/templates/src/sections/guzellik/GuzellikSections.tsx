/**
 * @kepenk/templates — Güzellik & Kuaför Section Components
 *
 * 5 sector-specific sections for beauty/salon themes:
 * 1. BeforeAfterSlider — interactive before/after comparison
 * 2. ServicePriceMenu — elegant service + price list
 * 3. StaffCarousel     — expert team carousel
 * 4. LoyaltyPackageCards — loyalty/package cards (Bakım, VIP, Gelin)
 * 5. InstagramFeedGrid — 6-grid Instagram-style gallery mockup
 */

'use client'

import { useState, useRef, useCallback } from 'react'
import type { ComponentType } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// ═══════════════════════════════════════════
// 1. BEFORE / AFTER SLIDER
// ═══════════════════════════════════════════

interface BeforeAfterItem {
  id: string
  title?: string
  before: string   // image URL
  after: string    // image URL
  treatment?: string
}

interface BeforeAfterContent {
  badge?: string
  title: string
  subtitle?: string
  items: BeforeAfterItem[]
  note?: string
}

function BeforeAfterSlider({ content }: SectionProps<BeforeAfterContent>) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [sliderX, setSliderX] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const items = content.items || []
  const current = items[activeIndex]

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 0), 100)
    setSliderX(pct)
  }, [])

  const onMouseDown = () => { dragging.current = true }
  const onMouseMove = (e: React.MouseEvent) => { if (dragging.current) updateSlider(e.clientX) }
  const onMouseUp = () => { dragging.current = false }
  const onTouchMove = (e: React.TouchEvent) => { updateSlider(e.touches[0].clientX) }

  if (!current) return null

  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {content.badge && (
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>
            {content.badge}
          </span>
        )}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>
          {content.title}
        </h2>
        {content.subtitle && (
          <p className="text-base mb-10" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
        )}

        {/* Thumbnail row */}
        {items.length > 1 && (
          <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
            {items.map((item, i) => (
              <button
                key={item.id}
                onClick={() => { setActiveIndex(i); setSliderX(50) }}
                className="shrink-0 rounded-lg overflow-hidden border-2 transition-all"
                style={{
                  borderColor: i === activeIndex ? 'var(--color-accent)' : 'transparent',
                  width: 72, height: 56,
                }}
              >
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${item.after || '/defaults/guzellik-ba.jpg'})` }} />
              </button>
            ))}
          </div>
        )}

        {/* Slider */}
        <div
          ref={containerRef}
          className="relative rounded-2xl overflow-hidden cursor-col-resize select-none"
          style={{ aspectRatio: '16/9', background: 'var(--color-surface-muted)' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchMove={onTouchMove}
          onTouchEnd={onMouseUp}
        >
          {/* AFTER (full) */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${current.after || '/defaults/guzellik-after.jpg'})` }}
          />
          {/* BEFORE (clipped) */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${current.before || '/defaults/guzellik-before.jpg'})`,
              clipPath: `inset(0 ${100 - sliderX}% 0 0)`,
            }}
          />
          {/* Divider */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
            style={{ left: `${sliderX}%` }}
          >
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center"
              style={{ color: 'var(--color-accent)' }}
            >
              ⇔
            </div>
          </div>
          {/* Labels */}
          <span className="absolute bottom-3 left-4 text-xs font-semibold bg-black/50 text-white px-2 py-1 rounded">Önce</span>
          <span className="absolute bottom-3 right-4 text-xs font-semibold bg-black/50 text-white px-2 py-1 rounded">Sonra</span>
        </div>

        {current.treatment && (
          <p className="text-sm text-center mt-4 font-medium" style={{ color: 'var(--color-accent)' }}>
            ✨ {current.treatment}
          </p>
        )}

        {content.note && (
          <p className="text-xs mt-4 text-center" style={{ color: 'var(--color-text-muted)' }}>{content.note}</p>
        )}
      </div>
    </section>
  )
}

registerSection('before_after', 'slider', BeforeAfterSlider as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('before_after', 'default', BeforeAfterSlider as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 2. SERVICE PRICE MENU
// ═══════════════════════════════════════════

interface ServicePriceCategory {
  id: string
  icon?: string
  name: string
  items: { id: string; name: string; duration?: string; price: string; note?: string }[]
}

interface ServicePriceContent {
  badge?: string
  title: string
  subtitle?: string
  categories: ServicePriceCategory[]
  currencyNote?: string
}

function ServicePriceMenu({ content }: SectionProps<ServicePriceContent>) {
  const [open, setOpen] = useState<string | null>(content.categories?.[0]?.id ?? null)

  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto" style={{ maxWidth: '640px' }}>
        {content.badge && (
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>
            {content.badge}
          </span>
        )}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>
          {content.title}
        </h2>
        {content.subtitle && (
          <p className="text-base mb-10" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
        )}

        <div className="space-y-3">
          {(content.categories || []).map((cat) => (
            <div key={cat.id} className="rounded-xl overflow-hidden" style={{ background: 'var(--color-bg)' }}>
              {/* Category header */}
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpen(open === cat.id ? null : cat.id)}
              >
                <span className="flex items-center gap-3 font-semibold text-base" style={{ color: 'var(--color-text)' }}>
                  {cat.icon && <span className="text-xl">{cat.icon}</span>}
                  {cat.name}
                </span>
                <span
                  className="text-lg transition-transform duration-200"
                  style={{
                    color: 'var(--color-accent)',
                    transform: open === cat.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  ▾
                </span>
              </button>

              {/* Items */}
              {open === cat.id && (
                <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
                  {cat.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between px-5 py-3 gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{item.name}</p>
                        {item.duration && (
                          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>⏱ {item.duration}</p>
                        )}
                        {item.note && (
                          <p className="text-xs italic" style={{ color: 'var(--color-text-muted)' }}>{item.note}</p>
                        )}
                      </div>
                      <span className="font-bold shrink-0 text-sm" style={{ color: 'var(--color-accent)' }}>{item.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {content.currencyNote && (
          <p className="text-xs mt-6 text-center" style={{ color: 'var(--color-text-muted)' }}>{content.currencyNote}</p>
        )}
      </div>
    </section>
  )
}

registerSection('services', 'price_menu', ServicePriceMenu as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 3. STAFF CAROUSEL
// ═══════════════════════════════════════════

interface StaffMember {
  id: string
  name: string
  role: string
  photo?: string
  specialties?: string[]
  experience?: string
  instagram?: string
}

interface StaffCarouselContent {
  badge?: string
  title: string
  subtitle?: string
  members: StaffMember[]
  bookingCta?: { text: string; href: string }
}

function StaffCarousel({ content }: SectionProps<StaffCarouselContent>) {
  const [current, setCurrent] = useState(0)
  const members = content.members || []
  const total = members.length

  const prev = () => setCurrent((c) => (c - 1 + total) % total)
  const next = () => setCurrent((c) => (c + 1) % total)

  if (!total) return null
  const m = members[current]

  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-md, 768px)' }}>
        {content.badge && (
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>
            {content.badge}
          </span>
        )}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>
          {content.title}
        </h2>
        {content.subtitle && (
          <p className="text-base mb-10" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
        )}

        <div className="relative flex flex-col md:flex-row gap-8 items-center rounded-2xl p-8"
          style={{ background: 'var(--color-surface)' }}>
          {/* Photo */}
          <div className="shrink-0">
            <div
              className="w-40 h-40 rounded-full bg-cover bg-center border-4"
              style={{
                backgroundImage: m.photo ? `url(${m.photo})` : 'none',
                background: m.photo ? undefined : 'var(--color-accent-light)',
                borderColor: 'var(--color-accent)',
              }}
            >
              {!m.photo && (
                <div className="w-full h-full rounded-full flex items-center justify-center text-4xl">👩‍🔬</div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-heading font-bold mb-1" style={{ color: 'var(--color-text)' }}>{m.name}</h3>
            <p className="text-sm font-medium mb-4" style={{ color: 'var(--color-accent)' }}>{m.role}</p>
            {m.experience && (
              <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>🏅 {m.experience} deneyim</p>
            )}
            {m.specialties && m.specialties.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                {m.specialties.map((s) => (
                  <span key={s} className="text-xs px-3 py-1 rounded-full border"
                    style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}>
                    {s}
                  </span>
                ))}
              </div>
            )}
            {m.instagram && (
              <a href={`https://instagram.com/${m.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
                className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
                📷 {m.instagram}
              </a>
            )}
          </div>

          {/* Nav buttons */}
          {total > 1 && (
            <div className="absolute top-1/2 -translate-y-1/2 left-3 right-3 flex justify-between pointer-events-none">
              <button onClick={prev} className="pointer-events-auto w-8 h-8 rounded-full bg-white/80 shadow flex items-center justify-center"
                style={{ color: 'var(--color-accent)' }}>‹</button>
              <button onClick={next} className="pointer-events-auto w-8 h-8 rounded-full bg-white/80 shadow flex items-center justify-center"
                style={{ color: 'var(--color-accent)' }}>›</button>
            </div>
          )}
        </div>

        {/* Dots */}
        {total > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {members.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className="w-2 h-2 rounded-full transition-all"
                style={{ background: i === current ? 'var(--color-accent)' : 'var(--color-border)' }}
              />
            ))}
          </div>
        )}

        {content.bookingCta && (
          <div className="text-center mt-8">
            <a href={content.bookingCta.href}
              className="inline-block px-8 py-3 rounded-full font-semibold text-sm transition-transform hover:scale-105"
              style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
              {content.bookingCta.text}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

registerSection('team', 'staff_carousel', StaffCarousel as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 4. LOYALTY PACKAGE CARDS
// ═══════════════════════════════════════════

interface LoyaltyPackage {
  id: string
  name: string
  tagline?: string
  price: string
  period?: string    // e.g. 'aylık', 'tek seferlik'
  features: string[]
  popular?: boolean
  cta?: { text: string; href: string }
  badge?: string
}

interface LoyaltyPackageContent {
  badge?: string
  title: string
  subtitle?: string
  packages: LoyaltyPackage[]
  note?: string
}

function LoyaltyPackageCards({ content }: SectionProps<LoyaltyPackageContent>) {
  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {content.badge && (
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>
            {content.badge}
          </span>
        )}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>
          {content.title}
        </h2>
        {content.subtitle && (
          <p className="text-base mb-12" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(content.packages || []).map((pkg) => (
            <div
              key={pkg.id}
              className="relative rounded-2xl p-6 flex flex-col transition-transform hover:-translate-y-1"
              style={{
                background: pkg.popular ? 'var(--color-accent)' : 'var(--color-bg)',
                color: pkg.popular ? 'var(--color-text-on-accent)' : 'var(--color-text)',
                boxShadow: pkg.popular ? '0 8px 32px -4px rgba(0,0,0,0.2)' : '0 2px 8px -2px rgba(0,0,0,0.08)',
              }}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white"
                    style={{ color: 'var(--color-accent)' }}>
                    ⭐ En Popüler
                  </span>
                </div>
              )}
              {pkg.badge && !pkg.popular && (
                <span className="inline-block text-xs font-semibold mb-2 px-2 py-0.5 rounded"
                  style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                  {pkg.badge}
                </span>
              )}

              <h3 className="text-xl font-heading font-bold mb-1">{pkg.name}</h3>
              {pkg.tagline && <p className="text-sm mb-4 opacity-80">{pkg.tagline}</p>}

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold">{pkg.price}</span>
                {pkg.period && <span className="text-sm opacity-70">/ {pkg.period}</span>}
              </div>

              <ul className="space-y-2 flex-1 mb-6">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span style={{ color: pkg.popular ? 'rgba(255,255,255,0.9)' : 'var(--color-accent)' }}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {pkg.cta && (
                <a
                  href={pkg.cta.href}
                  className="block text-center py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
                  style={{
                    background: pkg.popular ? 'rgba(255,255,255,0.2)' : 'var(--color-accent)',
                    color: pkg.popular ? '#fff' : 'var(--color-text-on-accent)',
                    border: pkg.popular ? '1px solid rgba(255,255,255,0.3)' : 'none',
                  }}
                >
                  {pkg.cta.text}
                </a>
              )}
            </div>
          ))}
        </div>

        {content.note && (
          <p className="text-xs mt-8 text-center" style={{ color: 'var(--color-text-muted)' }}>{content.note}</p>
        )}
      </div>
    </section>
  )
}

registerSection('pricing', 'loyalty_packages', LoyaltyPackageCards as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 5. INSTAGRAM FEED GRID
// ═══════════════════════════════════════════

interface InstaPost {
  id: string
  image?: string
  caption?: string
  likes?: number
  type?: 'photo' | 'video' | 'reel'
}

interface InstagramFeedContent {
  badge?: string
  title: string
  subtitle?: string
  handle: string
  profileUrl?: string
  posts: InstaPost[]
  cta?: { text: string; href: string }
}

function InstagramFeedGrid({ content }: SectionProps<InstagramFeedContent>) {
  const posts = content.posts || []

  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            {content.badge && (
              <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>
                {content.badge}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-1" style={{ color: 'var(--color-text)' }}>
              {content.title}
            </h2>
            {content.subtitle && (
              <p className="text-base" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
            )}
          </div>
          {content.handle && (
            <a
              href={content.profileUrl || `https://instagram.com/${content.handle.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors hover:opacity-80 shrink-0"
              style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
            >
              📷 {content.handle}
            </a>
          )}
        </div>

        {/* Grid (6 posts) */}
        <div className="grid grid-cols-3 gap-1 md:gap-2 rounded-2xl overflow-hidden">
          {posts.slice(0, 6).map((post, i) => (
            <div key={post.id} className="group relative aspect-square overflow-hidden" style={{ background: 'var(--color-surface-muted)' }}>
              {post.image ? (
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${post.image})` }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl">
                  {['💄', '✨', '💅', '🌸', '💇‍♀️', '🪞'][i % 6]}
                </div>
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center">
                  {post.likes && <p className="text-sm font-semibold">♥ {post.likes.toLocaleString('tr-TR')}</p>}
                  {post.type === 'reel' && <span className="text-xs">▶ Reel</span>}
                  {post.type === 'video' && <span className="text-xs">🎬 Video</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {content.cta && (
          <div className="text-center mt-8">
            <a
              href={content.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 rounded-full font-semibold text-sm transition-transform hover:scale-105"
              style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}
            >
              {content.cta.text}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

registerSection('instagram_feed', 'grid', InstagramFeedGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('instagram_feed', 'default', InstagramFeedGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ Exports ═══
export { BeforeAfterSlider, ServicePriceMenu, StaffCarousel, LoyaltyPackageCards, InstagramFeedGrid }
