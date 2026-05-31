/**
 * @kepenk/templates — Plan-Based Contact Variants
 *
 * plan_free:       Simple centered form
 * plan_starter:    2-col form + contact info
 * plan_growth:     Glass card form + map embed
 * plan_pro:        Split layout + animated submit
 * plan_enterprise: Full-width split with map + multi-step
 */

'use client'

import { useState } from 'react'
import type { SectionProps } from '../../types/section-types'
import type { ContactContent } from '../../types/section-content'
import { registerSection } from '../../registry/section-registry'
import { EditableField } from '../../lib/EditableField'

type CP = SectionProps<ContactContent>
type Reg = React.ComponentType<SectionProps<Record<string, unknown>>>

function FormField({ field }: { field: ContactContent['fields'][0] }) {
  const base = "w-full px-4 py-3 rounded-lg border border-border bg-surface text-foreground placeholder:text-foreground-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors text-sm"
  if (field.type === 'textarea') return <textarea id={field.id} placeholder={field.placeholder} required={field.required} rows={4} className={base} />
  if (field.type === 'select') return (
    <select id={field.id} required={field.required} className={base}>
      <option value="">{field.placeholder || field.label}</option>
      {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
  return <input type={field.type} id={field.id} placeholder={field.placeholder} required={field.required} className={base} />
}

/* ═══ FREE ═══ */
function ContactFree({ content, business, isEditing, onContentChange }: CP) {
  return (
    <section className="bg-bg px-4 py-16 md:py-24">
      <div className="mx-auto max-w-lg">
        {content.badge && <span className="block text-center text-xs font-semibold tracking-wider uppercase text-accent mb-3">{content.badge}</span>}
        <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center leading-tight" placeholder="İletişim" />
        {content.subtitle && <EditableField value={content.subtitle} isEditing={isEditing} onChange={(v) => onContentChange?.('subtitle', v)} as="p" className="mt-3 text-base text-foreground-secondary text-center" placeholder="Açıklama" />}
        <form className="mt-8 space-y-4" onSubmit={e => e.preventDefault()}>
          {content.fields?.map(f => (
            <div key={f.id}>
              <label htmlFor={f.id} className="block text-sm font-medium text-foreground mb-1">{f.label}{f.required && <span className="text-red-500 ml-1">*</span>}</label>
              <FormField field={f} />
            </div>
          ))}
          <p className="text-xs text-foreground-secondary">{content.consentText} <a href={content.consentLink} className="underline text-accent">{content.consentLink && 'KVKK'}</a></p>
          <button type="submit" className="w-full py-3 rounded-md font-semibold bg-accent text-on-accent hover:bg-accent-hover transition-colors text-sm">{content.submitText || 'Gönder'}</button>
        </form>
      </div>
    </section>
  )
}

/* ═══ STARTER ═══ */
function ContactStarter({ content, business, isEditing, onContentChange }: CP) {
  return (
    <section className="bg-bg px-4 py-16 md:py-24">
      <div className="mx-auto" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="text-center mb-10">
          {content.badge && <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase bg-accent/10 text-accent rounded-full mb-4">{content.badge}</span>}
          <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground" placeholder="İletişim" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            {content.fields?.map(f => (
              <div key={f.id}>
                <label htmlFor={f.id} className="block text-sm font-medium text-foreground mb-1">{f.label}</label>
                <FormField field={f} />
              </div>
            ))}
            <p className="text-xs text-foreground-secondary">{content.consentText}</p>
            <button type="submit" className="w-full py-3 rounded-lg font-semibold bg-accent text-on-accent hover:bg-accent-hover transition-colors">{content.submitText || 'Gönder'}</button>
          </form>
          {content.contactInfo && (
            <div className="space-y-6">
              {content.contactInfo.phone && (
                <div className="flex items-start gap-3">
                  <span className="text-accent text-lg">📞</span>
                  <div><p className="font-semibold text-foreground text-sm">Telefon</p><a href={`tel:${content.contactInfo.phone}`} className="text-foreground-secondary text-sm hover:text-accent transition-colors">{content.contactInfo.phone}</a></div>
                </div>
              )}
              {content.contactInfo.email && (
                <div className="flex items-start gap-3">
                  <span className="text-accent text-lg">✉️</span>
                  <div><p className="font-semibold text-foreground text-sm">E-posta</p><a href={`mailto:${content.contactInfo.email}`} className="text-foreground-secondary text-sm hover:text-accent transition-colors">{content.contactInfo.email}</a></div>
                </div>
              )}
              {content.contactInfo.address && (
                <div className="flex items-start gap-3">
                  <span className="text-accent text-lg">📍</span>
                  <div><p className="font-semibold text-foreground text-sm">Adres</p><p className="text-foreground-secondary text-sm">{content.contactInfo.address}</p></div>
                </div>
              )}
              {content.contactInfo.workingHours && (
                <div className="flex items-start gap-3">
                  <span className="text-accent text-lg">🕐</span>
                  <div><p className="font-semibold text-foreground text-sm">Çalışma Saatleri</p><p className="text-foreground-secondary text-sm">{content.contactInfo.workingHours}</p></div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/* ═══ GROWTH ═══ */
function ContactGrowth({ content, business, isEditing, onContentChange }: CP) {
  return (
    <section className="relative bg-bg px-4 py-20 md:py-28 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="relative mx-auto" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="text-center mb-12">
          {content.badge && <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider uppercase bg-accent/10 text-accent rounded-full mb-5">{content.badge}</span>}
          <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-3xl md:text-4xl font-heading font-bold text-foreground" placeholder="İletişim" />
          {content.subtitle && <EditableField value={content.subtitle} isEditing={isEditing} onChange={(v) => onContentChange?.('subtitle', v)} as="p" className="mt-3 text-lg text-foreground-secondary max-w-xl mx-auto" placeholder="Açıklama" />}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 backdrop-blur-xl bg-surface/80 border border-border-subtle rounded-2xl p-8 shadow-xl">
            <form className="space-y-5" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content.fields?.slice(0, 2).map(f => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="block text-sm font-medium text-foreground mb-1.5">{f.label}</label>
                    <FormField field={f} />
                  </div>
                ))}
              </div>
              {content.fields?.slice(2).map(f => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="block text-sm font-medium text-foreground mb-1.5">{f.label}</label>
                  <FormField field={f} />
                </div>
              ))}
              <p className="text-xs text-foreground-secondary">{content.consentText}</p>
              <button type="submit" className="w-full py-3.5 rounded-xl font-bold bg-accent text-on-accent hover:bg-accent-hover transition-all hover:scale-[1.01] shadow-lg">{content.submitText || 'Gönder'}</button>
            </form>
          </div>
          <div className="lg:col-span-2 space-y-6">
            {content.contactInfo && (
              <div className="backdrop-blur-lg bg-surface/60 border border-border-subtle rounded-2xl p-6 space-y-5">
                {content.contactInfo.phone && <div className="flex items-center gap-3"><span className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">📞</span><div><p className="text-xs text-foreground-secondary uppercase tracking-wider">Telefon</p><p className="font-semibold text-foreground">{content.contactInfo.phone}</p></div></div>}
                {content.contactInfo.email && <div className="flex items-center gap-3"><span className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">✉️</span><div><p className="text-xs text-foreground-secondary uppercase tracking-wider">E-posta</p><p className="font-semibold text-foreground">{content.contactInfo.email}</p></div></div>}
                {content.contactInfo.address && <div className="flex items-center gap-3"><span className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">📍</span><div><p className="text-xs text-foreground-secondary uppercase tracking-wider">Adres</p><p className="font-semibold text-foreground">{content.contactInfo.address}</p></div></div>}
              </div>
            )}
            {content.contactInfo?.mapEmbedUrl && (
              <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-border-subtle">
                <iframe src={content.contactInfo.mapEmbedUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy" title="Konum" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══ PRO ═══ */
function ContactPro({ content, business, isEditing, onContentChange }: CP) {
  const [submitted, setSubmitted] = useState(false)
  return (
    <section className="relative bg-bg px-4 py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/3 via-transparent to-accent/5" />
      <div className="relative mx-auto" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            {content.badge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-xs font-bold tracking-wider uppercase text-accent">{content.badge}</span>
              </div>
            )}
            <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-[1.1]" placeholder="İletişim" />
            {content.subtitle && <EditableField value={content.subtitle} isEditing={isEditing} onChange={(v) => onContentChange?.('subtitle', v)} as="p" className="mt-4 text-lg text-foreground-secondary max-w-lg" placeholder="Açıklama" />}
            {content.contactInfo && (
              <div className="mt-8 space-y-4">
                {content.contactInfo.phone && <a href={`tel:${content.contactInfo.phone}`} className="flex items-center gap-3 group"><span className="w-12 h-12 rounded-xl bg-surface border border-border-subtle flex items-center justify-center text-accent group-hover:bg-accent/10 transition-colors">📞</span><span className="font-medium text-foreground group-hover:text-accent transition-colors">{content.contactInfo.phone}</span></a>}
                {content.contactInfo.email && <a href={`mailto:${content.contactInfo.email}`} className="flex items-center gap-3 group"><span className="w-12 h-12 rounded-xl bg-surface border border-border-subtle flex items-center justify-center text-accent group-hover:bg-accent/10 transition-colors">✉️</span><span className="font-medium text-foreground group-hover:text-accent transition-colors">{content.contactInfo.email}</span></a>}
                {content.contactInfo.address && <div className="flex items-center gap-3"><span className="w-12 h-12 rounded-xl bg-surface border border-border-subtle flex items-center justify-center text-accent">📍</span><span className="text-foreground-secondary">{content.contactInfo.address}</span></div>}
              </div>
            )}
          </div>
          <div className="bg-surface border border-border-subtle rounded-2xl p-8 shadow-xl">
            {submitted ? (
              <div className="py-12 text-center"><span className="text-5xl block mb-4">✅</span><p className="text-xl font-bold text-foreground">{content.successMessage || 'Mesajınız alındı!'}</p></div>
            ) : (
              <form className="space-y-5" onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
                {content.fields?.map(f => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="block text-sm font-medium text-foreground mb-1.5">{f.label}</label>
                    <FormField field={f} />
                  </div>
                ))}
                <p className="text-xs text-foreground-secondary">{content.consentText}</p>
                <button type="submit" className="group w-full py-4 rounded-xl font-bold bg-accent text-on-accent hover:bg-accent-hover transition-all hover:shadow-[0_0_30px_var(--color-accent)/40]">
                  <span className="flex items-center justify-center gap-2">{content.submitText || 'Gönder'}
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══ ENTERPRISE ═══ */
function ContactEnterprise({ content, business, isEditing, onContentChange }: CP) {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const totalSteps = 2

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-black to-accent/3" />
      <div className="relative z-10 mx-auto px-4 md:px-8 py-20 w-full" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            {content.badge && (
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-8">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-sm font-semibold tracking-wider uppercase text-white/90">{content.badge}</span>
              </div>
            )}
            <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.05]" placeholder="İletişim" />
            {content.subtitle && <EditableField value={content.subtitle} isEditing={isEditing} onChange={(v) => onContentChange?.('subtitle', v)} as="p" className="mt-6 text-lg text-white/50 max-w-lg" placeholder="Açıklama" />}
            {content.contactInfo && (
              <div className="mt-10 space-y-4">
                {content.contactInfo.phone && <a href={`tel:${content.contactInfo.phone}`} className="flex items-center gap-4 group"><span className="w-14 h-14 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center text-xl group-hover:bg-accent/10 transition-colors">📞</span><div><p className="text-xs text-white/40 uppercase tracking-wider">Telefon</p><p className="font-bold text-white group-hover:text-accent transition-colors">{content.contactInfo.phone}</p></div></a>}
                {content.contactInfo.email && <a href={`mailto:${content.contactInfo.email}`} className="flex items-center gap-4 group"><span className="w-14 h-14 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center text-xl group-hover:bg-accent/10 transition-colors">✉️</span><div><p className="text-xs text-white/40 uppercase tracking-wider">E-posta</p><p className="font-bold text-white group-hover:text-accent transition-colors">{content.contactInfo.email}</p></div></a>}
                {content.contactInfo.address && <div className="flex items-center gap-4"><span className="w-14 h-14 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center text-xl">📍</span><div><p className="text-xs text-white/40 uppercase tracking-wider">Adres</p><p className="text-white/70">{content.contactInfo.address}</p></div></div>}
              </div>
            )}
          </div>
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl">
            {/* Progress bar */}
            <div className="flex gap-2 mb-8">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= step ? 'bg-accent' : 'bg-white/10'}`} />
              ))}
            </div>
            {submitted ? (
              <div className="py-12 text-center"><span className="text-6xl block mb-4">✨</span><p className="text-2xl font-bold text-white">{content.successMessage || 'Mesajınız alındı!'}</p><p className="mt-2 text-white/50">En kısa sürede dönüş yapacağız.</p></div>
            ) : (
              <form className="space-y-5" onSubmit={e => { e.preventDefault(); if (step < totalSteps - 1) setStep(s => s + 1); else setSubmitted(true) }}>
                {step === 0 && (
                  <>
                    {content.fields?.slice(0, 2).map(f => (
                      <div key={f.id}>
                        <label htmlFor={f.id} className="block text-sm font-medium text-white/80 mb-1.5">{f.label}</label>
                        <input type={f.type} id={f.id} placeholder={f.placeholder} className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:ring-2 focus:ring-accent/40 focus:border-accent transition text-sm backdrop-blur" />
                      </div>
                    ))}
                  </>
                )}
                {step === 1 && (
                  <>
                    {content.fields?.slice(2).map(f => (
                      <div key={f.id}>
                        <label htmlFor={f.id} className="block text-sm font-medium text-white/80 mb-1.5">{f.label}</label>
                        {f.type === 'textarea'
                          ? <textarea id={f.id} placeholder={f.placeholder} rows={4} className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:ring-2 focus:ring-accent/40 transition text-sm backdrop-blur" />
                          : <input type={f.type} id={f.id} placeholder={f.placeholder} className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:ring-2 focus:ring-accent/40 transition text-sm backdrop-blur" />
                        }
                      </div>
                    ))}
                    <p className="text-xs text-white/40">{content.consentText}</p>
                  </>
                )}
                <div className="flex gap-3">
                  {step > 0 && <button type="button" onClick={() => setStep(s => s - 1)} className="px-6 py-3.5 rounded-xl font-semibold border border-white/20 text-white hover:bg-white/5 transition-colors">Geri</button>}
                  <button type="submit" className="flex-1 py-3.5 rounded-xl font-bold bg-accent text-on-accent hover:bg-accent-hover transition-all hover:shadow-[0_0_40px_var(--color-accent)/50]">
                    {step < totalSteps - 1 ? 'Devam' : content.submitText || 'Gönder'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══ REGISTER ═══ */
registerSection('contact', 'plan_free', ContactFree as unknown as Reg)
registerSection('contact', 'plan_starter', ContactStarter as unknown as Reg)
registerSection('contact', 'plan_growth', ContactGrowth as unknown as Reg)
registerSection('contact', 'plan_pro', ContactPro as unknown as Reg)
registerSection('contact', 'plan_enterprise', ContactEnterprise as unknown as Reg)

export { ContactFree, ContactStarter, ContactGrowth, ContactPro, ContactEnterprise }
