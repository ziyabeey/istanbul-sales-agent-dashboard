/**
 * @kepenk/templates — Plan-Based FAQ Variants
 *
 * plan_free:       Simple details/summary accordion
 * plan_starter:    Styled accordion with icons
 * plan_growth:     2-col accordion + CTA sidebar
 * plan_pro:        Animated expand + search
 * plan_enterprise: Categorized grid + search
 */

'use client'

import { useState } from 'react'
import type { SectionProps } from '../../types/section-types'
import type { FAQContent } from '../../types/section-content'
import { registerSection } from '../../registry/section-registry'
import { EditableField } from '../../lib/EditableField'

type FP = SectionProps<FAQContent>
type Reg = React.ComponentType<SectionProps<Record<string, unknown>>>

/* ═══ FREE ═══ */
function FAQFree({ content, business, isEditing, onContentChange }: FP) {
  return (
    <section className="bg-bg px-4 py-16 md:py-24">
      <div className="mx-auto max-w-xl">
        {content.badge && <span className="block text-center text-xs font-semibold tracking-wider uppercase text-accent mb-3">{content.badge}</span>}
        <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center mb-8" placeholder="Sıkça Sorulan Sorular" />
        <div className="space-y-2">
          {content.questions?.map(q => (
            <details key={q.id} className="group border border-border rounded-lg">
              <summary className="flex items-center justify-between cursor-pointer px-4 py-3 text-sm font-medium text-foreground list-none">
                {q.question}
                <span className="transition-transform group-open:rotate-45 text-accent">+</span>
              </summary>
              <div className="px-4 pb-4 text-sm text-foreground-secondary leading-relaxed">{q.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══ STARTER ═══ */
function FAQStarter({ content, business, isEditing, onContentChange }: FP) {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <section className="bg-bg px-4 py-16 md:py-24">
      <div className="mx-auto" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="text-center mb-10">
          {content.badge && <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase bg-accent/10 text-accent rounded-full mb-4">{content.badge}</span>}
          <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground" placeholder="SSS" />
        </div>
        <div className="max-w-2xl mx-auto space-y-3">
          {content.questions?.map(q => (
            <div key={q.id} className="border border-border-subtle rounded-xl overflow-hidden shadow-sm">
              <button onClick={() => setOpen(open === q.id ? null : q.id)} className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-foreground hover:bg-surface/50 transition-colors">
                <span className="flex items-center gap-3"><span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-xs font-bold">?</span>{q.question}</span>
                <span className={`text-accent transition-transform duration-300 ${open === q.id ? 'rotate-180' : ''}`}>▼</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open === q.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-5 pb-4 pl-16 text-sm text-foreground-secondary leading-relaxed">{q.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══ GROWTH ═══ */
function FAQGrowth({ content, business, isEditing, onContentChange }: FP) {
  const [open, setOpen] = useState<string | null>(content.questions?.[0]?.id || null)
  return (
    <section className="relative bg-bg px-4 py-20 md:py-28 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="relative mx-auto" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="text-center mb-12">
          {content.badge && <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider uppercase bg-accent/10 text-accent rounded-full mb-5">{content.badge}</span>}
          <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-3xl md:text-4xl font-heading font-bold text-foreground" placeholder="SSS" />
          {content.subtitle && <EditableField value={content.subtitle} isEditing={isEditing} onChange={(v) => onContentChange?.('subtitle', v)} as="p" className="mt-3 text-lg text-foreground-secondary max-w-xl mx-auto" placeholder="Açıklama" />}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-3">
            {content.questions?.map(q => (
              <div key={q.id} className="backdrop-blur-lg bg-surface/60 border border-border-subtle rounded-xl overflow-hidden">
                <button onClick={() => setOpen(open === q.id ? null : q.id)} className="w-full flex items-center justify-between px-6 py-4 text-left font-medium text-foreground hover:bg-accent/5 transition-colors">
                  {q.question}
                  <span className={`w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs transition-transform duration-300 ${open === q.id ? 'rotate-180' : ''}`}>▼</span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${open === q.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-5 text-sm text-foreground-secondary leading-relaxed border-t border-border-subtle pt-3">{q.answer}</div>
                </div>
              </div>
            ))}
          </div>
          {content.ctaText && (
            <div className="backdrop-blur-xl bg-surface/80 border border-border-subtle rounded-2xl p-8 text-center self-start sticky top-24">
              <span className="text-4xl block mb-4">💬</span>
              <h3 className="font-bold text-foreground text-lg mb-2">{content.ctaText}</h3>
              {content.ctaDescription && <p className="text-sm text-foreground-secondary mb-6">{content.ctaDescription}</p>}
              {content.ctaHref && <a href={content.ctaHref} className="inline-flex items-center px-6 py-3 rounded-xl font-semibold bg-accent text-on-accent hover:bg-accent-hover transition-all">{content.ctaText}</a>}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/* ═══ PRO ═══ */
function FAQPro({ content, business, isEditing, onContentChange }: FP) {
  const [open, setOpen] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const filtered = content.questions?.filter(q => !search || q.question.toLowerCase().includes(search.toLowerCase()) || q.answer.toLowerCase().includes(search.toLowerCase()))

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
            <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground" placeholder="SSS" />
          </div>
          <div className="relative">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Soru ara..." className="w-full md:w-72 px-4 py-3 pl-10 rounded-xl border border-border-subtle bg-surface text-foreground placeholder:text-foreground-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/40 text-sm" />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary/50">🔍</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered?.map(q => (
            <div key={q.id} className="group bg-surface border border-border-subtle rounded-xl overflow-hidden hover:border-accent/20 transition-colors">
              <button onClick={() => setOpen(open === q.id ? null : q.id)} className="w-full flex items-center justify-between px-6 py-5 text-left font-medium text-foreground">
                {q.question}
                <span className={`w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-xs transition-transform duration-300 flex-shrink-0 ml-3 ${open === q.id ? 'rotate-180' : ''}`}>▼</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open === q.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-5 text-sm text-foreground-secondary leading-relaxed">{q.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══ ENTERPRISE ═══ */
function FAQEnterprise({ content, business, isEditing, onContentChange }: FP) {
  const [open, setOpen] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const filtered = content.questions?.filter(q => !search || q.question.toLowerCase().includes(search.toLowerCase()) || q.answer.toLowerCase().includes(search.toLowerCase()))

  return (
    <section className="relative bg-black py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent/3" />
      <div className="relative mx-auto px-4 md:px-8" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="text-center mb-12">
          {content.badge && (
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm font-semibold tracking-wider uppercase text-white/90">{content.badge}</span>
            </div>
          )}
          <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white" placeholder="SSS" />
          <div className="mt-8 max-w-md mx-auto relative">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Soru arayın..." className="w-full px-5 py-4 pl-12 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:ring-2 focus:ring-accent/40 text-sm backdrop-blur" />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">🔍</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered?.map(q => (
            <div key={q.id} className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-accent/30 transition-colors">
              <button onClick={() => setOpen(open === q.id ? null : q.id)} className="w-full flex items-center justify-between px-6 py-5 text-left font-medium text-white">
                {q.question}
                <span className={`w-8 h-8 rounded-lg bg-white/10 text-accent flex items-center justify-center text-xs transition-transform duration-300 flex-shrink-0 ml-3 ${open === q.id ? 'rotate-180' : ''}`}>▼</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open === q.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-5 text-sm text-white/50 leading-relaxed border-t border-white/5 pt-3">{q.answer}</div>
              </div>
            </div>
          ))}
        </div>
        {content.ctaText && content.ctaHref && (
          <div className="mt-12 text-center">
            <p className="text-white/40 mb-4">{content.ctaDescription || 'Sorunuza cevap bulamadınız mı?'}</p>
            <a href={content.ctaHref} className="inline-flex items-center px-8 py-4 rounded-full font-bold bg-accent text-on-accent hover:bg-accent-hover transition-all hover:shadow-[0_0_40px_var(--color-accent)/50]">{content.ctaText}</a>
          </div>
        )}
      </div>
    </section>
  )
}

/* ═══ REGISTER ═══ */
registerSection('faq', 'plan_free', FAQFree as unknown as Reg)
registerSection('faq', 'plan_starter', FAQStarter as unknown as Reg)
registerSection('faq', 'plan_growth', FAQGrowth as unknown as Reg)
registerSection('faq', 'plan_pro', FAQPro as unknown as Reg)
registerSection('faq', 'plan_enterprise', FAQEnterprise as unknown as Reg)

export { FAQFree, FAQStarter, FAQGrowth, FAQPro, FAQEnterprise }
