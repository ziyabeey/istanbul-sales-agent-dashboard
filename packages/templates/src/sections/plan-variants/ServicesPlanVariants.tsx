/**
 * @kepenk/templates — Plan-Based Services Variants
 *
 * plan_free:       Basit liste, tek sutun
 * plan_starter:    2 sutun kart grid
 * plan_growth:     3 sutun grid, hover reveal
 * plan_pro:        Asimetrik showcase, dark/light kontrast
 * plan_enterprise: Tab-filtered mega showcase
 */

'use client'

import { useState } from 'react'
import type { SectionProps } from '../../types/section-types'
import type { ServicesContent } from '../../types/section-content'
import { registerSection } from '../../registry/section-registry'
import { EditableField } from '../../lib/EditableField'

type SP = SectionProps<ServicesContent>
type Reg = React.ComponentType<SectionProps<Record<string, unknown>>>

const ICON_MAP: Record<string, string> = {
  scissors: '\u2702\ufe0f', sparkles: '\u2728', crown: '\ud83d\udc51', palette: '\ud83c\udfa8',
  heart: '\u2764\ufe0f', star: '\u2b50', flame: '\ud83d\udd25', shield: '\ud83d\udee1\ufe0f',
  zap: '\u26a1', coffee: '\u2615', wrench: '\ud83d\udd27', home: '\ud83c\udfe0',
  pill: '\ud83d\udc8a', car: '\ud83d\ude97', camera: '\ud83d\udcf7', music: '\ud83c\udfb5',
}
function icon(key?: string) { return key ? (ICON_MAP[key] || '\u2022') : '\u2022' }

/* ═══════════════════════════════════════════════
   FREE — Basit liste, tek sutun
   ═══════════════════════════════════════════════ */

function ServicesFree({ content, business, isEditing, onContentChange }: SP) {
  return (
    <section className="bg-bg px-4" style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}>
      <div className="mx-auto max-w-xl">
        {content.badge && <span className="block text-xs font-semibold tracking-wider uppercase text-accent mb-2">{content.badge}</span>}
        <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-2xl font-heading font-bold text-foreground" placeholder="Hizmetlerimiz" />
        {content.subtitle && <p className="mt-2 text-sm text-foreground-secondary">{content.subtitle}</p>}

        <div className="mt-8 divide-y divide-border">
          {content.services?.map((s, i) => (
            <div key={s.id || i} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <span className="text-lg">{icon(s.icon)}</span>
                <div>
                  <span className="font-semibold text-foreground">{s.name}</span>
                  {s.description && <p className="text-xs text-foreground-muted mt-0.5">{s.description}</p>}
                </div>
              </div>
              {s.price && <span className="font-bold text-accent whitespace-nowrap">{s.price}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   STARTER — 2 sutun kart grid
   ═══════════════════════════════════════════════ */

function ServicesStarter({ content, business, isEditing, onContentChange }: SP) {
  return (
    <section className="px-4 md:px-8" style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="text-center mb-10">
          {content.badge && <span className="inline-block text-xs font-semibold tracking-wider uppercase text-accent mb-2">{content.badge}</span>}
          <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-2xl md:text-3xl font-heading font-bold text-foreground" placeholder="Hizmetlerimiz" />
          {content.subtitle && <p className="mt-3 text-foreground-secondary max-w-xl mx-auto">{content.subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {content.services?.map((s, i) => (
            <div key={s.id || i} className="relative bg-surface rounded-lg p-5 border border-border-subtle hover:shadow-md transition-shadow">
              {s.popular && <span className="absolute -top-2 right-3 px-2 py-0.5 text-[10px] font-bold bg-accent text-on-accent rounded-full">Populer</span>}
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{icon(s.icon)}</span>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-foreground">{s.name}</h3>
                  {s.description && <p className="mt-1 text-sm text-foreground-secondary leading-relaxed">{s.description}</p>}
                  <div className="mt-3 flex items-center gap-2">
                    {s.price && <span className="font-bold text-accent">{s.price}</span>}
                    {s.duration && <span className="text-xs text-foreground-muted">· {s.duration}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   GROWTH — 3 sutun grid, hover reveal
   ═══════════════════════════════════════════════ */

function ServicesGrowth({ content, business, isEditing, onContentChange }: SP) {
  return (
    <section className="px-4 md:px-8" style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="text-center mb-12">
          {content.badge && <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase bg-accent/10 text-accent rounded-full mb-3">{content.badge}</span>}
          <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-3xl md:text-4xl font-heading font-bold text-foreground" placeholder="Hizmetlerimiz" />
          {content.subtitle && <p className="mt-4 text-foreground-secondary max-w-2xl mx-auto">{content.subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.services?.map((s, i) => (
            <div key={s.id || i} className="group relative backdrop-blur-sm bg-surface/80 border border-border-subtle rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              {s.popular && <span className="absolute -top-2.5 right-4 px-3 py-1 text-[10px] font-bold bg-accent text-on-accent rounded-full shadow">Populer</span>}
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 text-xl group-hover:bg-accent/20 transition-colors">
                {icon(s.icon)}
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground">{s.name}</h3>
              {s.description && <p className="mt-2 text-sm text-foreground-secondary leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">{s.description}</p>}
              <div className="mt-4 flex items-center gap-2">
                {s.price && <span className="font-bold text-lg text-accent">{s.price}</span>}
                {s.duration && <span className="text-xs text-foreground-muted">· {s.duration}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   PRO — Asimetrik showcase, dark/light kontrast
   ═══════════════════════════════════════════════ */

function ServicesPro({ content, business, isEditing, onContentChange }: SP) {
  return (
    <section className="px-4 md:px-8" style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left sidebar header (2/5) */}
          <div className="lg:col-span-2 lg:sticky lg:top-24">
            {content.badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full mb-4">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                <span className="text-xs font-bold tracking-wider uppercase text-accent">{content.badge}</span>
              </div>
            )}
            <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight" placeholder="Hizmetlerimiz" />
            {content.subtitle && <p className="mt-4 text-foreground-secondary leading-relaxed">{content.subtitle}</p>}
            {content.ctaText && (
              <a href={content.ctaHref ?? '#'} className="mt-6 inline-flex items-center gap-2 text-accent font-semibold hover:underline">
                {content.ctaText} &rarr;
              </a>
            )}
          </div>
          {/* Right grid (3/5) */}
          <div className="lg:col-span-3 space-y-4">
            {content.services?.map((s, i) => (
              <div key={s.id || i} className={`group relative rounded-xl p-6 border transition-all hover:shadow-lg ${i % 2 === 0 ? 'bg-surface border-border-subtle' : 'bg-surface-muted border-transparent'}`}>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-accent group-hover:text-on-accent transition-colors">
                    {icon(s.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-heading font-bold text-lg text-foreground">{s.name}</h3>
                      {s.popular && <span className="px-2 py-0.5 text-[10px] font-bold bg-accent text-on-accent rounded-full flex-shrink-0">Populer</span>}
                    </div>
                    {s.description && <p className="mt-1.5 text-sm text-foreground-secondary leading-relaxed">{s.description}</p>}
                    <div className="mt-3 flex items-center gap-3">
                      {s.price && <span className="font-bold text-xl text-accent">{s.price}</span>}
                      {s.duration && <span className="text-sm text-foreground-muted bg-surface-muted px-2 py-0.5 rounded">{s.duration}</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   ENTERPRISE — Tab-filtered mega showcase
   ═══════════════════════════════════════════════ */

function ServicesEnterprise({ content, business, isEditing, onContentChange }: SP) {
  const categories = content.categories ?? [...new Set(content.services?.map(s => s.category).filter(Boolean))]
  const [activeTab, setActiveTab] = useState<string | null>(null)

  const filtered = activeTab
    ? content.services?.filter(s => s.category === activeTab)
    : content.services

  return (
    <section className="px-4 md:px-8" style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="text-center mb-12">
          {content.badge && (
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/5 border border-accent/20 rounded-full mb-4 text-xs font-bold tracking-wider uppercase text-accent">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" /> {content.badge}
            </span>
          )}
          <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-3xl md:text-5xl font-heading font-bold text-foreground" placeholder="Hizmetlerimiz" />
          {content.subtitle && <p className="mt-4 text-lg text-foreground-secondary max-w-2xl mx-auto">{content.subtitle}</p>}
        </div>

        {/* Tab filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <button onClick={() => setActiveTab(null)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!activeTab ? 'bg-accent text-on-accent shadow' : 'bg-surface text-foreground-secondary hover:bg-surface-muted'}`}>
              Tumu
            </button>
            {categories.map((cat, i) => cat && (
              <button key={i} onClick={() => setActiveTab(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === cat ? 'bg-accent text-on-accent shadow' : 'bg-surface text-foreground-secondary hover:bg-surface-muted'}`}>
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Full-width cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered?.map((s, i) => (
            <div key={s.id || i} className="group bg-surface border border-border-subtle rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              {s.image && (
                <div className="aspect-video overflow-hidden">
                  <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-lg">{icon(s.icon)}</div>
                  {s.popular && <span className="px-2.5 py-1 text-[10px] font-bold bg-accent text-on-accent rounded-full">Populer</span>}
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground">{s.name}</h3>
                {s.description && <p className="mt-2 text-sm text-foreground-secondary leading-relaxed">{s.description}</p>}
                <div className="mt-4 pt-4 border-t border-border-subtle flex items-center justify-between">
                  {s.price && <span className="font-bold text-2xl text-accent">{s.price}</span>}
                  {s.duration && <span className="text-sm text-foreground-muted">{s.duration}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {content.ctaText && (
          <div className="text-center mt-12">
            <a href={content.ctaHref ?? '#'} className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold bg-accent text-on-accent hover:bg-accent-hover transition-all hover:scale-105">
              {content.ctaText}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   REGISTER
   ═══════════════════════════════════════════════ */

registerSection('services', 'plan_free', ServicesFree as unknown as Reg)
registerSection('services', 'plan_starter', ServicesStarter as unknown as Reg)
registerSection('services', 'plan_growth', ServicesGrowth as unknown as Reg)
registerSection('services', 'plan_pro', ServicesPro as unknown as Reg)
registerSection('services', 'plan_enterprise', ServicesEnterprise as unknown as Reg)

export { ServicesFree, ServicesStarter, ServicesGrowth, ServicesPro, ServicesEnterprise }
