/**
 * @kepenk/templates — Plan-Based CTA Variants
 *
 * plan_free:       Centered text + button
 * plan_starter:    Gradient bg + split layout
 * plan_growth:     Glass card + animated button
 * plan_pro:        Asymmetric + animated gradient border
 * plan_enterprise: Full-bleed with particle/gradient bg
 */

'use client'

import type { SectionProps } from '../../types/section-types'
import type { CTAContent } from '../../types/section-content'
import { registerSection } from '../../registry/section-registry'
import { EditableField } from '../../lib/EditableField'

type CTP = SectionProps<CTAContent>
type Reg = React.ComponentType<SectionProps<Record<string, unknown>>>

/* ═══ FREE ═══ */
function CTAFree({ content, business, isEditing, onContentChange }: CTP) {
  return (
    <section className="bg-surface px-4 py-12 md:py-16">
      <div className="mx-auto max-w-xl text-center">
        <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-tight" placeholder="Hemen Başlayın" />
        {content.subtitle && <EditableField value={content.subtitle} isEditing={isEditing} onChange={(v) => onContentChange?.('subtitle', v)} as="p" className="mt-3 text-base text-foreground-secondary" placeholder="Açıklama" />}
        <div className="mt-6">
          <a href={content.cta.href} className="inline-flex items-center px-6 py-3 rounded-md font-semibold bg-accent text-on-accent hover:bg-accent-hover transition-colors text-sm">{content.cta.text}</a>
        </div>
      </div>
    </section>
  )
}

/* ═══ STARTER ═══ */
function CTAStarter({ content, business, isEditing, onContentChange }: CTP) {
  return (
    <section className="relative overflow-hidden px-4 py-16 md:py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-hover" />
      <div className="relative mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center" style={{ maxWidth: 'var(--container-default)' }}>
        <div>
          {content.badge && <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase bg-white/20 text-white rounded-full mb-4">{content.badge}</span>}
          <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white leading-tight" placeholder="Hemen Başlayın" />
          {content.subtitle && <EditableField value={content.subtitle} isEditing={isEditing} onChange={(v) => onContentChange?.('subtitle', v)} as="p" className="mt-3 text-base text-white/80" placeholder="Açıklama" />}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
          <a href={content.cta.href} className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg font-bold bg-white text-accent hover:bg-white/90 transition-colors shadow-lg">{content.cta.text}</a>
          {content.secondaryCta && <a href={content.secondaryCta.href} className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors">{content.secondaryCta.text}</a>}
        </div>
      </div>
    </section>
  )
}

/* ═══ GROWTH ═══ */
function CTAGrowth({ content, business, isEditing, onContentChange }: CTP) {
  return (
    <section className="relative bg-bg px-4 py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-accent/10" />
      <div className="relative mx-auto" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="backdrop-blur-xl bg-surface/80 border border-border-subtle rounded-2xl p-10 md:p-14 text-center shadow-xl">
          {content.badge && <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider uppercase bg-accent/10 text-accent rounded-full mb-6">{content.badge}</span>}
          <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight" placeholder="Başlayın" />
          {content.subtitle && <EditableField value={content.subtitle} isEditing={isEditing} onChange={(v) => onContentChange?.('subtitle', v)} as="p" className="mt-4 text-lg text-foreground-secondary max-w-xl mx-auto" placeholder="Açıklama" />}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={content.cta.href} className="group inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold bg-accent text-on-accent hover:bg-accent-hover transition-all hover:scale-[1.02] shadow-lg">
              {content.cta.text}
              <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </a>
            {content.secondaryCta && <a href={content.secondaryCta.href} className="inline-flex items-center px-8 py-4 rounded-xl font-semibold border border-border-subtle text-foreground hover:border-accent/30 transition-colors">{content.secondaryCta.text}</a>}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══ PRO ═══ */
function CTAPro({ content, business, isEditing, onContentChange }: CTP) {
  return (
    <section className="relative bg-bg px-4 py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/8" />
      <div className="relative mx-auto" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
          <div className="lg:col-span-3">
            {content.badge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-xs font-bold tracking-wider uppercase text-accent">{content.badge}</span>
              </div>
            )}
            <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-[1.1]" placeholder="Başlayın" />
            {content.subtitle && <EditableField value={content.subtitle} isEditing={isEditing} onChange={(v) => onContentChange?.('subtitle', v)} as="p" className="mt-4 text-lg text-foreground-secondary max-w-lg" placeholder="Açıklama" />}
          </div>
          <div className="lg:col-span-2 flex flex-col gap-4">
            <a href={content.cta.href} className="group relative inline-flex items-center justify-center px-8 py-5 rounded-2xl font-bold text-on-accent overflow-hidden transition-all hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-hover" />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent via-accent-hover to-accent rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity" />
              <span className="relative z-10 flex items-center gap-2">{content.cta.text}<svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></span>
            </a>
            {content.secondaryCta && <a href={content.secondaryCta.href} className="inline-flex items-center justify-center px-8 py-5 rounded-2xl font-semibold border-2 border-border-subtle text-foreground hover:border-accent/40 transition-colors">{content.secondaryCta.text}</a>}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══ ENTERPRISE ═══ */
function CTAEnterprise({ content, business, isEditing, onContentChange }: CTP) {
  return (
    <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-black">
      {content.backgroundImage && <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${content.backgroundImage})` }} />}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-accent/20" />
      <div className="relative z-10 mx-auto px-4 md:px-8 py-20 w-full text-center" style={{ maxWidth: 'var(--container-default)' }}>
        {content.badge && (
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-8">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-semibold tracking-wider uppercase text-white/90">{content.badge}</span>
          </div>
        )}
        <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white leading-[1.05] tracking-tight" placeholder="Başlayın" />
        {content.subtitle && <EditableField value={content.subtitle} isEditing={isEditing} onChange={(v) => onContentChange?.('subtitle', v)} as="p" className="mt-6 text-xl text-white/50 max-w-2xl mx-auto" placeholder="Açıklama" />}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={content.cta.href} className="group relative inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full font-bold text-on-accent overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_50px_var(--color-accent)/50]">
            <div className="absolute inset-0 bg-accent" />
            <span className="relative z-10">{content.cta.text}</span>
          </a>
          {content.secondaryCta && <a href={content.secondaryCta.href} className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full font-semibold border border-white/20 text-white/90 hover:bg-white/5 backdrop-blur transition-all">{content.secondaryCta.text}</a>}
        </div>
      </div>
    </section>
  )
}

/* ═══ REGISTER ═══ */
registerSection('cta', 'plan_free', CTAFree as unknown as Reg)
registerSection('cta', 'plan_starter', CTAStarter as unknown as Reg)
registerSection('cta', 'plan_growth', CTAGrowth as unknown as Reg)
registerSection('cta', 'plan_pro', CTAPro as unknown as Reg)
registerSection('cta', 'plan_enterprise', CTAEnterprise as unknown as Reg)

export { CTAFree, CTAStarter, CTAGrowth, CTAPro, CTAEnterprise }
