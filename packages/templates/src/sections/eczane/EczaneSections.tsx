/**
 * @kepenk/templates — Eczane Section Components
 *
 * 1. PharmacyServicesGrid — hizmet kartları (reçete, dermokozmetik vb.)
 * 2. PharmacyProductCards — ürün kartları
 * 3. PharmacyDutyInfo — nöbetçi eczane bilgisi
 * 4. PharmacyStatsRow — istatistikler
 * 5. PharmacyContactForm — iletişim / reçete gönderme → WhatsApp
 */

'use client'

import { useState } from 'react'
import type { ComponentType } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// ═══ 1. PHARMACY SERVICES GRID ═══

interface PharmService { id: string; emoji: string; name: string; description: string; badge?: string }
interface PharmacyServicesGridContent { badge?: string; title: string; subtitle?: string; services: PharmService[] }

function PharmacyServicesGrid({ content }: SectionProps<PharmacyServicesGridContent>) {
 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
 <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
 {content.subtitle && <p className="text-base mb-8" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
 {(content.services || []).map((s) => (
 <div key={s.id} className="rounded-2xl border p-5 hover:shadow-md transition-shadow relative" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
 {s.badge && <span className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>{s.badge}</span>}
 <span className="text-4xl mb-3 block">{s.emoji}</span>
 <h3 className="font-heading font-bold text-base mb-1" style={{ color: 'var(--color-text)' }}>{s.name}</h3>
 <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{s.description}</p>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}
registerSection('services', 'pharmacy_services_grid', PharmacyServicesGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 2. PHARMACY PRODUCT CARDS ═══

interface PharmProduct { id: string; emoji: string; name: string; brand?: string; price?: string; badge?: string; category?: string }
interface PharmacyProductCardsContent { badge?: string; title: string; subtitle?: string; products: PharmProduct[] }

function PharmacyProductCards({ content }: SectionProps<PharmacyProductCardsContent>) {
 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-bg)' }}>
 <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
 {content.subtitle && <p className="text-base mb-8" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
 {(content.products || []).map((p) => (
 <div key={p.id} className="rounded-2xl border overflow-hidden group" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
 <div className="flex items-center justify-center relative" style={{ height: 120, background: 'var(--color-accent-light)' }}>
 <span className="text-4xl group-hover:scale-110 transition-transform">{p.emoji}</span>
 {p.badge && <span className="absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>{p.badge}</span>}
 </div>
 <div className="p-3">
 <p className="font-heading font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{p.name}</p>
 {p.brand && <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{p.brand}</p>}
 {p.price && <p className="text-sm font-bold mt-1" style={{ color: 'var(--color-accent)' }}>{p.price}</p>}
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}
registerSection('gallery', 'pharmacy_products', PharmacyProductCards as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 3. PHARMACY DUTY INFO ═══

interface PharmacyDutyInfoContent { badge?: string; title: string; subtitle?: string; dutyPhone?: string; dutyNote?: string; features?: { icon: string; text: string }[] }

function PharmacyDutyInfo({ content }: SectionProps<PharmacyDutyInfoContent>) {
 return (
 <section className="py-12 px-4" style={{ background: 'var(--color-accent-light)' }}>
 <div className="mx-auto text-center" style={{ maxWidth: '600px' }}>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h2 className="text-2xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
 {content.subtitle && <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
 {content.dutyPhone && <a href={`tel:${content.dutyPhone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm mb-4" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>📞 {content.dutyPhone}</a>}
 {content.features && <div className="flex flex-wrap justify-center gap-4 mt-4">{content.features.map((f, i) => (
 <div key={i} className="flex items-center gap-2 text-sm"><span className="text-lg">{f.icon}</span><span style={{ color: 'var(--color-text)' }}>{f.text}</span></div>
 ))}</div>}
 {content.dutyNote && <p className="text-xs mt-4" style={{ color: 'var(--color-text-muted)' }}>{content.dutyNote}</p>}
 </div>
 </section>
 )
}
registerSection('social_proof', 'pharmacy_duty', PharmacyDutyInfo as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 4. PHARMACY STATS ROW ═══
interface PharmStat { value: string; label: string; icon: string }
interface PharmacyStatsRowContent { stats: PharmStat[] }
function PharmacyStatsRow({ content }: SectionProps<PharmacyStatsRowContent>) {
 return (
 <section className="py-10 px-4" style={{ background: 'var(--color-accent)' }}>
 <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
 <div className="flex flex-wrap justify-center gap-8 md:gap-14">
 {(content.stats || []).map((s, i) => (
 <div key={i} className="text-center">
 <p className="text-3xl mb-1">{s.icon}</p>
 <p className="text-2xl md:text-3xl font-heading font-bold" style={{ color: 'var(--color-text-on-accent)' }}>{s.value}</p>
 <p className="text-xs opacity-80" style={{ color: 'var(--color-text-on-accent)' }}>{s.label}</p>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}
registerSection('social_proof', 'pharmacy_stats_row', PharmacyStatsRow as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 5. PHARMACY CONTACT FORM ═══
interface PharmContactContent { badge?: string; title: string; subtitle?: string; subjects?: string[]; whatsapp?: string; phone?: string; note?: string }
function PharmacyContactForm({ content }: SectionProps<PharmContactContent>) {
 const [form, setForm] = useState({ name: '', phone: '', subject: '', message: '' })
 const [sent, setSent] = useState(false)
 const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))
 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault(); if (!form.name || !form.phone) return
 const wa = content.whatsapp || content.phone?.replace(/\D/g, '') || ''
 const msg = `Eczane İletişim%0AAdı: ${encodeURIComponent(form.name)}%0ATel: ${form.phone}${form.subject ? `%0AKonu: ${encodeURIComponent(form.subject)}` : ''}${form.message ? `%0AMesaj: ${encodeURIComponent(form.message)}` : ''}`
 window.open(`https://wa.me/${wa}?text=${msg}`, '_blank'); setSent(true)
 }
 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
 <div className="mx-auto" style={{ maxWidth: '580px' }}>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
 {content.subtitle && <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
 {sent ? (
 <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--color-bg)' }}><div className="text-5xl mb-4">💊✅</div><h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Mesajınız Alındı!</h3><p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>En kısa sürede dönüş yapacağız.</p></div>
 ) : (
 <form onSubmit={handleSubmit} className="rounded-2xl p-6 space-y-4" style={{ background: 'var(--color-bg)' }}>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Ad Soyad *</label><input type="text" required value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Adınız" /></div>
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Telefon *</label><input type="tel" required value={form.phone} onChange={(e) => update('phone', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="0555 000 00 00" /></div>
 </div>
 {content.subjects && <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Konu</label><select value={form.subject} onChange={(e) => update('subject', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}><option value="">Seçiniz…</option>{content.subjects.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>}
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Mesajınız</label><textarea rows={3} value={form.message} onChange={(e) => update('message', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none resize-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Reçete veya ilaç bilgisi…" /></div>
 <button type="submit" className="w-full py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>💊 Gönder (WhatsApp)</button>
 {content.note && <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>{content.note}</p>}
 </form>
 )}
 </div>
 </section>
 )
}
registerSection('booking', 'pharmacy_contact', PharmacyContactForm as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

export { PharmacyServicesGrid, PharmacyProductCards, PharmacyDutyInfo, PharmacyStatsRow, PharmacyContactForm }
