/**
 * @kepenk/templates — Plan-Based About Variants
 *
 * plan_free:       Tek sutun, centered text
 * plan_starter:    Image + text split
 * plan_growth:     Glassmorphism + animated stats
 * plan_pro:        Asymmetric 60/40 + values
 * plan_enterprise: Full-bleed parallax + animated counters
 */

'use client'

import { useState, useEffect, useRef } from 'react'
import type { SectionProps } from '../../types/section-types'
import type { AboutContent } from '../../types/section-content'
import { registerSection } from '../../registry/section-registry'
import { EditableField } from '../../lib/EditableField'

type AP = SectionProps<AboutContent>
type Reg = React.ComponentType<SectionProps<Record<string, unknown>>>

/* ═══ FREE ═══ */
function AboutFree({ content, business, isEditing, onContentChange }: AP) {
  return (
    <section className="bg-bg px-4 py-16 md:py-24">
      <div className="mx-auto max-w-xl text-center">
        {content.badge && <span className="inline-block text-xs font-semibold tracking-wider uppercase text-accent mb-3">{content.badge}</span>}
        <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-tight" placeholder="Hakkımızda" />
        <EditableField value={content.description} isEditing={isEditing} onChange={(v) => onContentChange?.('description', v)} as="p" className="mt-4 text-base text-foreground-secondary leading-relaxed" placeholder="İşletmeniz hakkında" />
        {content.stats && content.stats.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {content.stats.map((s, i) => (
              <div key={i} className="text-center">
                <span className="block text-2xl font-bold text-accent">{s.value}</span>
                <span className="text-xs text-foreground-secondary uppercase tracking-wide">{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/* ═══ STARTER ═══ */
function AboutStarter({ content, business, isEditing, onContentChange }: AP) {
  return (
    <section className="bg-bg px-4 py-16 md:py-24">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
          {content.image
            ? <img src={content.image} alt={content.title} className="w-full h-full object-cover" loading="lazy" />
            : <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center"><span className="text-6xl opacity-30">🏢</span></div>}
        </div>
        <div>
          {content.badge && <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase bg-accent/10 text-accent rounded-full mb-4">{content.badge}</span>}
          <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground leading-tight" placeholder="Hakkımızda" />
          <EditableField value={content.description} isEditing={isEditing} onChange={(v) => onContentChange?.('description', v)} as="p" className="mt-4 text-base text-foreground-secondary leading-relaxed" placeholder="Detaylı bilgi" />
          {content.stats && content.stats.length > 0 && (
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {content.stats.map((s, i) => (
                <div key={i} className="bg-surface rounded-lg p-3 text-center shadow-sm">
                  <span className="block text-xl font-bold text-accent">{s.value}</span>
                  <span className="text-xs text-foreground-secondary">{s.label}</span>
                </div>
              ))}
            </div>
          )}
          {content.signature && (
            <div className="mt-6 flex items-center gap-3">
              {content.signature.photo && <img src={content.signature.photo} alt={content.signature.name} className="w-10 h-10 rounded-full object-cover" />}
              <div>
                <p className="font-semibold text-foreground text-sm">{content.signature.name}</p>
                <p className="text-xs text-foreground-secondary">{content.signature.role}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/* ═══ GROWTH ═══ */
function AboutGrowth({ content, business, isEditing, onContentChange }: AP) {
  const [vis, setVis] = useState(false)
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative bg-bg px-4 py-20 md:py-28 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="relative mx-auto" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
            {content.image
              ? <img src={content.image} alt={content.title} className="w-full h-full object-cover" loading="lazy" />
              : <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center"><span className="text-8xl opacity-20">✨</span></div>}
          </div>
          <div className="backdrop-blur-xl bg-surface/80 border border-border-subtle rounded-2xl p-8 md:p-10 shadow-xl">
            {content.badge && <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider uppercase bg-accent/10 text-accent rounded-full mb-5">{content.badge}</span>}
            <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight" placeholder="Hakkımızda" />
            <EditableField value={content.description} isEditing={isEditing} onChange={(v) => onContentChange?.('description', v)} as="p" className="mt-4 text-base text-foreground-secondary leading-relaxed" placeholder="Hikayeniz" />
            {content.stats && content.stats.length > 0 && (
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {content.stats.map((s, i) => (
                  <div key={i} className={`text-center transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                    <span className="block text-2xl md:text-3xl font-bold text-accent">{s.value}</span>
                    <span className="text-xs text-foreground-secondary uppercase tracking-wide">{s.label}</span>
                  </div>
                ))}
              </div>
            )}
            {content.signature && (
              <div className="mt-8 pt-6 border-t border-border-subtle flex items-center gap-4">
                {content.signature.photo && <img src={content.signature.photo} alt={content.signature.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-accent/20" />}
                <div>
                  <p className="font-semibold text-foreground">{content.signature.name}</p>
                  <p className="text-sm text-foreground-secondary">{content.signature.role}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        {content.values && content.values.length > 0 && (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.values.map((v, i) => (
              <div key={i} className={`backdrop-blur-lg bg-surface/60 border border-border-subtle rounded-xl p-6 transition-all duration-500 hover:shadow-lg hover:border-accent/20 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${300 + i * 100}ms` }}>
                {v.icon && <span className="text-2xl mb-3 block">{v.icon}</span>}
                <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/* ═══ PRO ═══ */
function AboutPro({ content, business, isEditing, onContentChange }: AP) {
  const [vis, setVis] = useState(false)
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative bg-bg px-4 py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/3 via-transparent to-accent/5" />
      <div className="relative mx-auto" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-3">
            {content.badge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-xs font-bold tracking-wider uppercase text-accent">{content.badge}</span>
              </div>
            )}
            <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-[1.1] tracking-tight" placeholder="Hakkımızda" />
            <EditableField value={content.description} isEditing={isEditing} onChange={(v) => onContentChange?.('description', v)} as="p" className="mt-6 text-lg text-foreground-secondary leading-relaxed max-w-2xl" placeholder="Hikayeniz" />
            {content.stats && content.stats.length > 0 && (
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {content.stats.map((s, i) => (
                  <div key={i} className={`group relative transition-all duration-600 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${i * 120}ms` }}>
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-accent/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur" />
                    <div className="relative bg-surface border border-border-subtle rounded-lg p-4 text-center">
                      <span className="block text-2xl md:text-3xl font-bold text-accent">{s.value}</span>
                      <span className="text-xs text-foreground-secondary uppercase tracking-wider mt-1 block">{s.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {content.signature && (
              <div className="mt-10 flex items-center gap-4">
                {content.signature.photo && <img src={content.signature.photo} alt={content.signature.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-accent/30" />}
                <div>
                  <p className="font-bold text-foreground">{content.signature.name}</p>
                  <p className="text-sm text-foreground-secondary">{content.signature.role}</p>
                </div>
              </div>
            )}
          </div>
          <div className="lg:col-span-2">
            {content.image ? (
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl">
                <img src={content.image} alt={content.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ) : content.values && content.values.length > 0 ? (
              <div className="space-y-4">
                {content.values.map((v, i) => (
                  <div key={i} className={`group bg-surface border border-border-subtle rounded-xl p-5 transition-all duration-300 hover:border-accent/30 hover:shadow-lg ${vis ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ transitionDelay: `${400 + i * 100}ms` }}>
                    <div className="flex items-start gap-4">
                      {v.icon && <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">{v.icon}</span>}
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{v.title}</h3>
                        <p className="text-sm text-foreground-secondary leading-relaxed">{v.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center"><span className="text-8xl opacity-20">🏆</span></div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══ ENTERPRISE ═══ */
function AboutEnterprise({ content, business, isEditing, onContentChange }: AP) {
  const [scrollY, setScrollY] = useState(0)
  const [vis, setVis] = useState(false)
  const [counts, setCounts] = useState<number[]>([])
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!vis || !content.stats) return
    const targets = content.stats.map(s => parseInt(s.value.replace(/[^0-9]/g, ''), 10) || 0)
    const steps = 60; let step = 0
    const timer = setInterval(() => {
      step++
      const p = Math.min(step / steps, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCounts(targets.map(t => Math.round(t * eased)))
      if (step >= steps) clearInterval(timer)
    }, 33)
    return () => clearInterval(timer)
  }, [vis, content.stats])

  return (
    <section ref={ref} className="relative min-h-[80vh] flex items-center overflow-hidden bg-black">
      {content.image && (
        <div className="absolute inset-0 bg-cover bg-center will-change-transform opacity-40" style={{ backgroundImage: `url(${content.image})`, transform: `translateY(${scrollY * 0.15}px)` }} />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
      <div className="relative z-10 mx-auto px-4 md:px-8 py-20 w-full" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            {content.badge && (
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-8">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-sm font-semibold tracking-wider uppercase text-white/90">{content.badge}</span>
              </div>
            )}
            <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.05] tracking-tight" placeholder="Hakkımızda" />
            <EditableField value={content.description} isEditing={isEditing} onChange={(v) => onContentChange?.('description', v)} as="p" className="mt-6 text-lg md:text-xl text-white/60 leading-relaxed max-w-xl" placeholder="Hikayeniz" />
            {content.signature && (
              <div className="mt-8 flex items-center gap-4">
                {content.signature.photo && <img src={content.signature.photo} alt={content.signature.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-white/20" />}
                <div>
                  <p className="font-bold text-white">{content.signature.name}</p>
                  <p className="text-sm text-white/50">{content.signature.role}</p>
                </div>
              </div>
            )}
          </div>
          {content.stats && content.stats.length > 0 && (
            <div className="grid grid-cols-2 gap-6">
              {content.stats.map((s, i) => (
                <div key={i} className={`backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 text-center transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 200}ms` }}>
                  <span className="block text-4xl md:text-5xl lg:text-6xl font-bold text-accent tabular-nums">{counts[i] ?? 0}</span>
                  <span className="mt-2 block text-sm text-white/50 uppercase tracking-wider">{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {content.values && content.values.length > 0 && (
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.values.map((v, i) => (
              <div key={i} className={`group backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-500 hover:bg-white/10 hover:border-accent/30 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${600 + i * 100}ms` }}>
                {v.icon && <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">{v.icon}</span>}
                <h3 className="font-semibold text-white mb-2">{v.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/* ═══ REGISTER ═══ */
registerSection('about', 'plan_free', AboutFree as unknown as Reg)
registerSection('about', 'plan_starter', AboutStarter as unknown as Reg)
registerSection('about', 'plan_growth', AboutGrowth as unknown as Reg)
registerSection('about', 'plan_pro', AboutPro as unknown as Reg)
registerSection('about', 'plan_enterprise', AboutEnterprise as unknown as Reg)

export { AboutFree, AboutStarter, AboutGrowth, AboutPro, AboutEnterprise }
