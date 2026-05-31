/**
 * @kepenk/templates — Plan-Based Testimonials Variants
 *
 * plan_free:       Single-col list
 * plan_starter:    Card grid with stars
 * plan_growth:     Glassmorphism + overall rating badge
 * plan_pro:        Carousel/slider
 * plan_enterprise: Masonry + animated rating counter
 */

'use client'

import { useState, useEffect, useRef } from 'react'
import type { SectionProps } from '../../types/section-types'
import type { TestimonialsContent } from '../../types/section-content'
import { registerSection } from '../../registry/section-registry'
import { EditableField } from '../../lib/EditableField'

type TP = SectionProps<TestimonialsContent>
type Reg = React.ComponentType<SectionProps<Record<string, unknown>>>

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <span key={n} className={n <= rating ? 'text-yellow-400' : 'text-foreground-secondary/20'}>★</span>
      ))}
    </div>
  )
}

/* ═══ FREE ═══ */
function TestimonialsFree({ content, business, isEditing, onContentChange }: TP) {
  return (
    <section className="bg-bg px-4 py-16 md:py-24">
      <div className="mx-auto max-w-xl">
        {content.badge && <span className="block text-center text-xs font-semibold tracking-wider uppercase text-accent mb-3">{content.badge}</span>}
        <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center mb-8" placeholder="Müşteri Yorumları" />
        <div className="space-y-4">
          {content.reviews?.map(r => (
            <div key={r.id} className="border border-border rounded-lg p-4">
              <Stars rating={r.rating} />
              <p className="mt-2 text-sm text-foreground-secondary leading-relaxed">{r.text}</p>
              <p className="mt-3 text-xs font-semibold text-foreground">{r.name}{r.date && <span className="text-foreground-secondary font-normal"> · {r.date}</span>}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══ STARTER ═══ */
function TestimonialsStarter({ content, business, isEditing, onContentChange }: TP) {
  return (
    <section className="bg-bg px-4 py-16 md:py-24">
      <div className="mx-auto" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="text-center mb-10">
          {content.badge && <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase bg-accent/10 text-accent rounded-full mb-4">{content.badge}</span>}
          <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground" placeholder="Yorumlar" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.reviews?.map(r => (
            <div key={r.id} className="bg-surface border border-border-subtle rounded-xl p-6 shadow-sm">
              <Stars rating={r.rating} />
              <p className="mt-3 text-sm text-foreground-secondary leading-relaxed line-clamp-4">{r.text}</p>
              <div className="mt-4 flex items-center gap-3">
                {r.photo ? <img src={r.photo} alt={r.name} className="w-8 h-8 rounded-full object-cover" /> : <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs font-bold">{r.name[0]}</div>}
                <div><p className="text-sm font-semibold text-foreground">{r.name}</p>{r.service && <p className="text-xs text-foreground-secondary">{r.service}</p>}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══ GROWTH ═══ */
function TestimonialsGrowth({ content, business, isEditing, onContentChange }: TP) {
  return (
    <section className="relative bg-bg px-4 py-20 md:py-28 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="relative mx-auto" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="text-center mb-12">
          {content.badge && <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider uppercase bg-accent/10 text-accent rounded-full mb-5">{content.badge}</span>}
          <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-3xl md:text-4xl font-heading font-bold text-foreground" placeholder="Yorumlar" />
          {content.overallRating && (
            <div className="mt-6 inline-flex items-center gap-3 backdrop-blur-lg bg-surface/60 border border-border-subtle rounded-full px-6 py-3">
              <span className="text-2xl font-bold text-accent">{content.overallRating.value}</span>
              <Stars rating={Math.round(content.overallRating.value)} />
              <span className="text-sm text-foreground-secondary">({content.overallRating.count} yorum)</span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.reviews?.map(r => (
            <div key={r.id} className="backdrop-blur-lg bg-surface/60 border border-border-subtle rounded-2xl p-6 hover:shadow-lg hover:border-accent/20 transition-all">
              <div className="flex items-center justify-between mb-3">
                <Stars rating={r.rating} />
                {r.source && <span className="text-xs text-foreground-secondary/50 uppercase">{r.source}</span>}
              </div>
              <p className="text-sm text-foreground-secondary leading-relaxed">{r.text}</p>
              <div className="mt-4 flex items-center gap-3">
                {r.photo ? <img src={r.photo} alt={r.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-accent/20" /> : <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">{r.name[0]}</div>}
                <div><p className="font-semibold text-foreground text-sm">{r.name}</p><p className="text-xs text-foreground-secondary">{r.service || r.date}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══ PRO ═══ */
function TestimonialsPro({ content, business, isEditing, onContentChange }: TP) {
  const [active, setActive] = useState(0)
  const reviews = content.reviews || []

  useEffect(() => {
    if (reviews.length <= 1) return
    const t = setInterval(() => setActive(a => (a + 1) % reviews.length), 6000)
    return () => clearInterval(t)
  }, [reviews.length])

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
            <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground" placeholder="Yorumlar" />
          </div>
          {content.overallRating && (
            <div className="flex items-center gap-3 bg-surface border border-border-subtle rounded-xl px-6 py-4">
              <span className="text-3xl font-bold text-accent">{content.overallRating.value}</span>
              <div><Stars rating={Math.round(content.overallRating.value)} /><p className="text-xs text-foreground-secondary mt-1">{content.overallRating.count} yorum · {content.overallRating.source}</p></div>
            </div>
          )}
        </div>
        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${active * 100}%)` }}>
              {reviews.map(r => (
                <div key={r.id} className="w-full flex-shrink-0 bg-surface border border-border-subtle rounded-2xl p-8 md:p-12">
                  <Stars rating={r.rating} />
                  <p className="mt-4 text-lg md:text-xl text-foreground leading-relaxed italic">"{r.text}"</p>
                  <div className="mt-6 flex items-center gap-4">
                    {r.photo ? <img src={r.photo} alt={r.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-accent/30" /> : <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent text-lg font-bold">{r.name[0]}</div>}
                    <div><p className="font-bold text-foreground">{r.name}</p><p className="text-sm text-foreground-secondary">{r.service}{r.date && ` · ${r.date}`}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2">
            {reviews.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === active ? 'bg-accent w-8' : 'bg-foreground-secondary/20 hover:bg-foreground-secondary/40'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══ ENTERPRISE ═══ */
function TestimonialsEnterprise({ content, business, isEditing, onContentChange }: TP) {
  const [vis, setVis] = useState(false)
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative bg-black py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent/3" />
      <div className="relative mx-auto px-4 md:px-8" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="text-center mb-12">
          {content.badge && (
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm font-semibold tracking-wider uppercase text-white/90">{content.badge}</span>
            </div>
          )}
          <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white" placeholder="Yorumlar" />
          {content.overallRating && (
            <div className={`mt-8 inline-flex items-center gap-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl px-8 py-4 transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="text-4xl font-bold text-accent">{content.overallRating.value}</span>
              <div className="text-left"><Stars rating={Math.round(content.overallRating.value)} /><p className="text-xs text-white/40 mt-1">{content.overallRating.count} yorum</p></div>
            </div>
          )}
        </div>
        {/* Masonry */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {content.reviews?.map((r, i) => (
            <div key={r.id} className={`break-inside-avoid backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-accent/30 transition-all duration-500 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="flex items-center justify-between mb-3">
                <Stars rating={r.rating} />
                {r.source && <span className="text-xs text-white/30 uppercase">{r.source}</span>}
              </div>
              <p className="text-sm text-white/70 leading-relaxed">{r.text}</p>
              <div className="mt-4 flex items-center gap-3">
                {r.photo ? <img src={r.photo} alt={r.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10" /> : <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">{r.name[0]}</div>}
                <div><p className="font-semibold text-white text-sm">{r.name}</p><p className="text-xs text-white/40">{r.service}{r.date && ` · ${r.date}`}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══ REGISTER ═══ */
registerSection('testimonials', 'plan_free', TestimonialsFree as unknown as Reg)
registerSection('testimonials', 'plan_starter', TestimonialsStarter as unknown as Reg)
registerSection('testimonials', 'plan_growth', TestimonialsGrowth as unknown as Reg)
registerSection('testimonials', 'plan_pro', TestimonialsPro as unknown as Reg)
registerSection('testimonials', 'plan_enterprise', TestimonialsEnterprise as unknown as Reg)

export { TestimonialsFree, TestimonialsStarter, TestimonialsGrowth, TestimonialsPro, TestimonialsEnterprise }
