/**
 * @kepenk/templates — Plan-Based Gallery Variants
 *
 * plan_free:       Simple 2-col grid
 * plan_starter:    3-col grid + lightbox
 * plan_growth:     Masonry + category filter
 * plan_pro:        Bento asymmetric + tilt hover
 * plan_enterprise: Full-bleed carousel + 3D transforms
 */

'use client'

import { useState, useEffect, useRef } from 'react'
import type { SectionProps } from '../../types/section-types'
import type { GalleryContent } from '../../types/section-content'
import { registerSection } from '../../registry/section-registry'
import { EditableField } from '../../lib/EditableField'

type GP = SectionProps<GalleryContent>
type Reg = React.ComponentType<SectionProps<Record<string, unknown>>>

/* ═══ FREE ═══ */
function GalleryFree({ content, business, isEditing, onContentChange }: GP) {
  return (
    <section className="bg-bg px-4 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        {content.badge && <span className="block text-center text-xs font-semibold tracking-wider uppercase text-accent mb-3">{content.badge}</span>}
        <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center mb-8" placeholder="Galeri" />
        <div className="grid grid-cols-2 gap-3">
          {content.images?.map((img, i) => (
            <div key={img.id || i} className="aspect-square overflow-hidden rounded-lg">
              <img src={img.url} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══ STARTER ═══ */
function GalleryStarter({ content, business, isEditing, onContentChange }: GP) {
  const [lightbox, setLightbox] = useState<number | null>(null)
  return (
    <section className="bg-bg px-4 py-16 md:py-24">
      <div className="mx-auto" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="text-center mb-10">
          {content.badge && <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase bg-accent/10 text-accent rounded-full mb-4">{content.badge}</span>}
          <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground" placeholder="Galeri" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {content.images?.map((img, i) => (
            <button key={img.id || i} onClick={() => setLightbox(i)} className="aspect-square overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow group">
              <img src={img.url} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
            </button>
          ))}
        </div>
        {lightbox !== null && content.images && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
            <img src={content.images[lightbox].url} alt={content.images[lightbox].alt} className="max-w-full max-h-[85vh] rounded-xl object-contain" />
            <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur rounded-full text-white flex items-center justify-center hover:bg-white/20">✕</button>
          </div>
        )}
      </div>
    </section>
  )
}

/* ═══ GROWTH ═══ */
function GalleryGrowth({ content, business, isEditing, onContentChange }: GP) {
  const [filter, setFilter] = useState<string>('all')
  const categories = content.categories || [...new Set(content.images?.map(img => img.category).filter(Boolean))]
  const filtered = filter === 'all' ? content.images : content.images?.filter(img => img.category === filter)

  return (
    <section className="relative bg-bg px-4 py-20 md:py-28 overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="relative mx-auto" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="text-center mb-10">
          {content.badge && <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider uppercase bg-accent/10 text-accent rounded-full mb-5">{content.badge}</span>}
          <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-3xl md:text-4xl font-heading font-bold text-foreground" placeholder="Galeri" />
          {content.subtitle && <EditableField value={content.subtitle} isEditing={isEditing} onChange={(v) => onContentChange?.('subtitle', v)} as="p" className="mt-3 text-lg text-foreground-secondary max-w-xl mx-auto" placeholder="Açıklama" />}
        </div>
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === 'all' ? 'bg-accent text-on-accent' : 'bg-surface border border-border-subtle text-foreground-secondary hover:border-accent/30'}`}>Tümü</button>
            {categories.map(c => (
              <button key={c} onClick={() => setFilter(c!)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === c ? 'bg-accent text-on-accent' : 'bg-surface border border-border-subtle text-foreground-secondary hover:border-accent/30'}`}>{c}</button>
            ))}
          </div>
        )}
        {/* Masonry-like layout with CSS columns */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {filtered?.map((img, i) => (
            <div key={img.id || i} className="break-inside-avoid overflow-hidden rounded-xl group">
              <div className="relative overflow-hidden">
                <img src={img.url} alt={img.alt} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  {img.caption && <span className="text-white text-sm font-medium">{img.caption}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══ PRO ═══ */
function GalleryPro({ content, business, isEditing, onContentChange }: GP) {
  const [filter, setFilter] = useState<string>('all')
  const categories = content.categories || [...new Set(content.images?.map(img => img.category).filter(Boolean))]
  const filtered = filter === 'all' ? content.images : content.images?.filter(img => img.category === filter)

  return (
    <section className="relative bg-bg px-4 py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/3 via-transparent to-accent/5" />
      <div className="relative mx-auto" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            {content.badge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-4">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-xs font-bold tracking-wider uppercase text-accent">{content.badge}</span>
              </div>
            )}
            <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight" placeholder="Galeri" />
          </div>
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'all' ? 'bg-accent text-on-accent shadow-lg' : 'bg-surface border border-border-subtle text-foreground-secondary hover:border-accent/30'}`}>Tümü</button>
              {categories.map(c => (
                <button key={c} onClick={() => setFilter(c!)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === c ? 'bg-accent text-on-accent shadow-lg' : 'bg-surface border border-border-subtle text-foreground-secondary hover:border-accent/30'}`}>{c}</button>
              ))}
            </div>
          )}
        </div>
        {/* Bento-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {filtered?.map((img, i) => {
            const span = i % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''
            return (
              <div key={img.id || i} className={`group relative overflow-hidden rounded-xl ${span}`}>
                <img src={img.url} alt={img.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  {img.caption && <span className="text-white text-sm font-medium">{img.caption}</span>}
                  {img.category && <span className="absolute top-3 right-3 px-2 py-1 bg-white/20 backdrop-blur text-white text-xs rounded-full">{img.category}</span>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ═══ ENTERPRISE ═══ */
function GalleryEnterprise({ content, business, isEditing, onContentChange }: GP) {
  const [active, setActive] = useState(0)
  const [filter, setFilter] = useState<string>('all')
  const categories = content.categories || [...new Set(content.images?.map(img => img.category).filter(Boolean))]
  const filtered = filter === 'all' ? content.images : content.images?.filter(img => img.category === filter)
  const images = filtered || []

  // Auto-advance carousel
  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => setActive(a => (a + 1) % images.length), 5000)
    return () => clearInterval(timer)
  }, [images.length])

  return (
    <section className="relative bg-black py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent/3" />
      <div className="relative mx-auto px-4 md:px-8" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            {content.badge && (
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-6">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-sm font-semibold tracking-wider uppercase text-white/90">{content.badge}</span>
              </div>
            )}
            <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight" placeholder="Galeri" />
          </div>
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button onClick={() => { setFilter('all'); setActive(0) }} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === 'all' ? 'bg-accent text-on-accent' : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'}`}>Tümü</button>
              {categories.map(c => (
                <button key={c} onClick={() => { setFilter(c!); setActive(0) }} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === c ? 'bg-accent text-on-accent' : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'}`}>{c}</button>
              ))}
            </div>
          )}
        </div>

        {/* Featured image carousel */}
        {images.length > 0 && (
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-6">
            {images.map((img, i) => (
              <div key={img.id || i} className={`absolute inset-0 transition-all duration-700 ${i === active ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}>
                <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {img.caption && <div className="absolute bottom-6 left-6 text-white text-lg font-medium">{img.caption}</div>}
              </div>
            ))}
            {/* Nav dots */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              {images.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === active ? 'bg-accent w-8' : 'bg-white/30 hover:bg-white/50'}`} />
              ))}
            </div>
          </div>
        )}

        {/* Thumbnail strip */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {images.map((img, i) => (
            <button key={img.id || i} onClick={() => setActive(i)} className={`aspect-square rounded-lg overflow-hidden transition-all ${i === active ? 'ring-2 ring-accent' : 'opacity-60 hover:opacity-100'}`}>
              <img src={img.url} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══ REGISTER ═══ */
registerSection('gallery', 'plan_free', GalleryFree as unknown as Reg)
registerSection('gallery', 'plan_starter', GalleryStarter as unknown as Reg)
registerSection('gallery', 'plan_growth', GalleryGrowth as unknown as Reg)
registerSection('gallery', 'plan_pro', GalleryPro as unknown as Reg)
registerSection('gallery', 'plan_enterprise', GalleryEnterprise as unknown as Reg)

export { GalleryFree, GalleryStarter, GalleryGrowth, GalleryPro, GalleryEnterprise }
