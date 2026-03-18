/**
 * @kepenk/templates — FAQ, Testimonials, About, Stats, CTA components
 *
 * Common universal sections with their default variants.
 */

'use client'

import { useState } from 'react'
import type { SectionProps } from '../../types/section-types'
import type {
  FAQContent, TestimonialsContent, AboutContent,
  StatsContent, CTAContent, ContactContent,
  WorkingHoursContent, ProcessStepsContent,
} from '../../types/section-content'
import { registerSection } from '../../registry/section-registry'
import { EditableField } from '../../lib/EditableField'

// ─── FAQ ACCORDION ───

function FAQAccordion({ content, isEditing, onContentChange }: SectionProps<FAQContent>) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section className="px-4 md:px-8" style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-md)' }}>
        <EditableField
          value={content.title}
          isEditing={isEditing}
          onChange={(v) => onContentChange?.('title', v)}
          as="h2"
          className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground text-center mb-10"
        />

        <div className="space-y-0 divide-y divide-border">
          {content.questions?.map((q, i) => {
            const isOpen = openId === q.id
            return (
              <div key={q.id || i}>
                <button
                  className="w-full flex items-center justify-between py-5 text-left group"
                  onClick={() => setOpenId(isOpen ? null : q.id)}
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-foreground group-hover:text-accent transition-colors pr-4">{q.question}</span>
                  <svg
                    className={`w-5 h-5 shrink-0 text-foreground-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="pb-5 pr-8 text-sm text-foreground-secondary leading-relaxed">
                    {q.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {content.ctaText && (
          <div className="mt-10 text-center">
            <p className="text-foreground-secondary mb-3">{content.ctaDescription}</p>
            <a href={content.ctaHref ?? '#'} className="inline-flex items-center gap-2 text-accent font-semibold hover:underline">
              {content.ctaText} →
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── TESTIMONIALS CAROUSEL ───

function TestimonialsCarousel({ content }: SectionProps<TestimonialsContent>) {
  const [current, setCurrent] = useState(0)
  const reviews = content.reviews ?? []

  return (
    <section className="px-4 md:px-8 bg-surface" style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}>
      <div className="mx-auto text-center" style={{ maxWidth: 'var(--container-md)' }}>
        {content.badge && (
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-accent mb-3">{content.badge}</span>
        )}
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-10">{content.title}</h2>

        {reviews.length > 0 && (
          <div>
            {/* Quote mark */}
            <div className="text-6xl text-accent/20 font-serif leading-none mb-4">"</div>

            <p className="text-lg md:text-xl text-foreground leading-relaxed italic max-w-2xl mx-auto">
              {reviews[current]?.text}
            </p>

            {/* Stars */}
            <div className="mt-4 flex items-center justify-center gap-1">
              {Array.from({ length: reviews[current]?.rating ?? 5 }).map((_, i) => (
                <span key={i} className="text-yellow-400">⭐</span>
              ))}
            </div>

            {/* Author */}
            <p className="mt-4 font-semibold text-foreground">{reviews[current]?.name}</p>
            {reviews[current]?.service && (
              <p className="text-sm text-foreground-secondary">{reviews[current].service}</p>
            )}

            {/* Navigation dots */}
            {reviews.length > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? 'bg-accent' : 'bg-accent/20'}`}
                    aria-label={`Yorum ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {content.overallRating && (
          <div className="mt-8 text-sm text-foreground-secondary">
            {content.overallRating.source} puanı: <span className="font-bold text-foreground">{content.overallRating.value}</span> ({content.overallRating.count} değerlendirme)
          </div>
        )}
      </div>
    </section>
  )
}

// ─── ABOUT SPLIT LEFT ───

function AboutSplitLeft({ content, isEditing, onContentChange }: SectionProps<AboutContent>) {
  return (
    <section className="px-4 md:px-8" style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}>
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center" style={{ maxWidth: 'var(--container-lg)' }}>
        {/* Text */}
        <div>
          {content.badge && (
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-accent mb-3">{content.badge}</span>
          )}
          <EditableField
            value={content.title}
            isEditing={isEditing}
            onChange={(v) => onContentChange?.('title', v)}
            as="h2"
            className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground leading-tight"
          />
          <div className="mt-6 text-foreground-secondary leading-relaxed space-y-4 whitespace-pre-line">
            {content.description}
          </div>

          {/* Stats */}
          {content.stats && content.stats.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-6">
              {content.stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-accent">{stat.value}</div>
                  <div className="text-sm text-foreground-secondary mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Signature */}
          {content.signature && (
            <div className="mt-8 flex items-center gap-3">
              {content.signature.photo && (
                <img src={content.signature.photo} alt={content.signature.name} className="w-12 h-12 rounded-full object-cover" />
              )}
              <div>
                <div className="font-semibold text-foreground">— {content.signature.name}</div>
                <div className="text-sm text-foreground-secondary">{content.signature.role}</div>
              </div>
            </div>
          )}
        </div>

        {/* Image */}
        {content.image && (
          <div className="overflow-hidden rounded-xl lg:rounded-2xl">
            <img src={content.image} alt={content.title} className="w-full h-auto object-cover" />
          </div>
        )}
      </div>
    </section>
  )
}

// ─── STATS ANIMATED ROW ───

function StatsAnimatedRow({ content }: SectionProps<StatsContent>) {
  return (
    <section className="bg-surface">
      <div className="mx-auto px-4 md:px-8 py-12 md:py-16" style={{ maxWidth: 'var(--container-lg)' }}>
        <div className="flex flex-wrap justify-around gap-8">
          {content.stats?.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent">{stat.value}{stat.suffix}</div>
              <div className="mt-2 text-sm text-foreground-secondary">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA FULL WIDTH BANNER ───

function CTAFullWidthBanner({ content }: SectionProps<CTAContent>) {
  return (
    <section
      className="relative text-center text-white overflow-hidden"
      style={{
        paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)',
        backgroundImage: content.backgroundImage ? `url(${content.backgroundImage})` : undefined,
        backgroundSize: 'cover', backgroundPosition: 'center',
        backgroundColor: content.backgroundImage ? undefined : 'var(--color-accent)',
      }}
    >
      {content.backgroundImage && <div className="absolute inset-0 bg-black/50" />}
      <div className="relative z-10 px-4 md:px-8">
        {content.badge && (
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-white/70 mb-3">{content.badge}</span>
        )}
        <h2 className="text-2xl md:text-4xl font-heading font-bold">{content.title}</h2>
        {content.subtitle && <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">{content.subtitle}</p>}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={content.cta.href} className="px-8 py-3.5 rounded-lg font-semibold bg-white text-black hover:bg-white/90 transition-colors">
            {content.cta.text}
          </a>
          {content.secondaryCta && (
            <a href={content.secondaryCta.href} className="px-8 py-3.5 rounded-lg font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors">
              {content.secondaryCta.text}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── CONTACT SIMPLE FORM ───

function ContactSimpleForm({ content }: SectionProps<ContactContent>) {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="px-4 md:px-8" style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-sm)' }}>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center mb-8">{content.title}</h2>
        {content.subtitle && <p className="text-center text-foreground-secondary mb-8">{content.subtitle}</p>}

        {submitted ? (
          <div className="text-center p-8 bg-success-light rounded-xl">
            <p className="text-success font-semibold">✓ {content.successMessage}</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} className="space-y-4">
            {content.fields?.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {field.label} {field.required && <span className="text-error">*</span>}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    placeholder={field.placeholder}
                    required={field.required}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-bg text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent-hover transition-shadow"
                  />
                ) : field.type === 'select' ? (
                  <select
                    required={field.required}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-bg text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
                  >
                    <option value="">{field.placeholder ?? 'Seçiniz'}</option>
                    {field.options?.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                  </select>
                ) : (
                  <input
                    type={field.type === 'email' ? 'email' : field.type === 'phone' ? 'tel' : 'text'}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-bg text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent-hover transition-shadow"
                  />
                )}
              </div>
            ))}

            {/* KVKK Consent */}
            <label className="flex items-start gap-2 text-sm text-foreground-secondary">
              <input type="checkbox" required className="mt-1 accent-accent" />
              <span>
                {content.consentText}{' '}
                <a href={content.consentLink} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                  Aydınlatma Metni
                </a>
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold bg-accent text-on-accent hover:bg-accent-hover transition-colors"
            >
              {content.submitText}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

// ─── WORKING HOURS COMPACT ───

function WorkingHoursCompact({ content }: SectionProps<WorkingHoursContent>) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()

  return (
    <section className="px-4 md:px-8" style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-xs)' }}>
        <h2 className="text-2xl font-heading font-bold text-foreground text-center mb-8">{content.title}</h2>
        <div className="space-y-0 divide-y divide-border-subtle">
          {content.hours?.map((h, i) => {
            const isToday = content.todayHighlight && h.day.toLowerCase() === today
            return (
              <div key={i} className={`flex items-center justify-between py-3 ${isToday ? 'font-bold border-l-3 border-accent pl-3' : ''}`}>
                <span className="text-foreground">{h.day}</span>
                <span className={h.open ? 'text-foreground-secondary' : 'text-error font-medium'}>
                  {h.open ? `${h.open} - ${h.close}` : 'KAPALI'}
                </span>
              </div>
            )
          })}
        </div>
        {content.note && <p className="mt-6 text-sm text-foreground-muted text-center italic">{content.note}</p>}
      </div>
    </section>
  )
}

// ─── PROCESS STEPS HORIZONTAL ───

function ProcessStepsHorizontal({ content }: SectionProps<ProcessStepsContent>) {
  return (
    <section className="px-4 md:px-8" style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}>
      <div className="mx-auto text-center" style={{ maxWidth: 'var(--container-lg)' }}>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-12">{content.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.steps?.map((step, i) => (
            <div key={i} className="relative">
              <div className="w-12 h-12 mx-auto rounded-full bg-accent text-on-accent flex items-center justify-center font-bold text-lg">
                {step.number}
              </div>
              {/* Connector line (desktop) */}
              {i < (content.steps?.length ?? 0) - 1 && (
                <div className="hidden lg:block absolute top-6 left-[calc(50%+28px)] w-[calc(100%-56px)] h-0.5 bg-border" />
              )}
              <h3 className="mt-4 font-heading font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-foreground-secondary">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Register all ───
registerSection('faq', 'accordion', FAQAccordion as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('faq', 'default', FAQAccordion as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('testimonials', 'carousel', TestimonialsCarousel as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('testimonials', 'default', TestimonialsCarousel as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('about', 'split_left', AboutSplitLeft as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('about', 'default', AboutSplitLeft as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('stats', 'animated_row', StatsAnimatedRow as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('stats', 'default', StatsAnimatedRow as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('cta', 'full_width_banner', CTAFullWidthBanner as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('cta', 'default', CTAFullWidthBanner as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('contact', 'simple_form', ContactSimpleForm as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('contact', 'default', ContactSimpleForm as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('working_hours', 'compact', WorkingHoursCompact as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('working_hours', 'default', WorkingHoursCompact as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('process_steps', 'horizontal_timeline', ProcessStepsHorizontal as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('process_steps', 'default', ProcessStepsHorizontal as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)

export {
  FAQAccordion,
  TestimonialsCarousel,
  AboutSplitLeft,
  StatsAnimatedRow,
  CTAFullWidthBanner,
  ContactSimpleForm,
  WorkingHoursCompact,
  ProcessStepsHorizontal,
}
