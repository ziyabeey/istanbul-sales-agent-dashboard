/**
 * @kepenk/templates — Terzi / Moda Atölyesi Section Components
 *
 * 1. TailorServicesGrid — hizmet kartları (dikim, tadilat, gelin)
 * 2. FabricShowcase — kumaş/koleksiyon vitrini
 * 3. TailorPortfolioGrid — portfolio/galeri
 * 4. TailorStatsRow — istatistikler
 * 5. TailorBookingForm — randevu/ölçü → WhatsApp
 */

'use client'

import { useState } from 'react'
import type { ComponentType } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// ═══ 1. TAILOR SERVICES GRID ═══

interface TailorService { id: string; emoji: string; name: string; description: string; price?: string; duration?: string; badge?: string }
interface TailorServicesGridContent { badge?: string; title: string; subtitle?: string; services: TailorService[] }

function TailorServicesGrid({ content }: SectionProps<TailorServicesGridContent>) {
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
 <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>{s.description}</p>
 <div className="flex items-center gap-3">
 {s.price && <span className="text-sm font-bold" style={{ color: 'var(--color-accent)' }}>{s.price}</span>}
 {s.duration && <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>⏱ {s.duration}</span>}
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}
registerSection('services', 'tailor_services_grid', TailorServicesGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 2. FABRIC SHOWCASE ═══

interface FabricItem { id: string; emoji: string; name: string; origin?: string; category?: string; badge?: string }
interface FabricShowcaseContent { badge?: string; title: string; subtitle?: string; fabrics: FabricItem[] }

function FabricShowcase({ content }: SectionProps<FabricShowcaseContent>) {
 return (
 <section className="py-12 px-4" style={{ background: 'var(--color-accent-light)' }}>
 <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h2 className="text-2xl font-heading font-bold mb-6" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
 <div className="flex flex-wrap justify-center gap-4">
 {(content.fabrics || []).map((f) => (
 <div key={f.id} className="rounded-xl border px-4 py-3 text-center min-w-[110px] hover:shadow-md transition-shadow relative" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
 {f.badge && <span className="absolute -top-2 right-1 text-xs font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)', fontSize: '10px' }}>{f.badge}</span>}
 <span className="text-3xl block mb-1">{f.emoji}</span>
 <p className="text-xs font-semibold" style={{ color: 'var(--color-text)' }}>{f.name}</p>
 {f.origin && <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{f.origin}</p>}
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}
registerSection('gallery', 'fabric_showcase', FabricShowcase as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 3. TAILOR PORTFOLIO GRID ═══
interface PortfolioItem { id: string; emoji: string; title: string; category?: string; badge?: string }
interface TailorPortfolioGridContent { badge?: string; title: string; items: PortfolioItem[] }
function TailorPortfolioGrid({ content }: SectionProps<TailorPortfolioGridContent>) {
 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-bg)' }}>
 <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
 {(content.items || []).map((item) => (
 <div key={item.id} className="rounded-2xl border overflow-hidden group cursor-pointer" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
 <div className="flex items-center justify-center relative" style={{ height: 120, background: 'var(--color-accent-light)' }}>
 <span className="text-4xl group-hover:scale-110 transition-transform">{item.emoji}</span>
 {item.badge && <span className="absolute top-2 right-2 text-xs font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>{item.badge}</span>}
 </div>
 <div className="p-3 text-center">
 <p className="font-heading font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{item.title}</p>
 {item.category && <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{item.category}</p>}
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}
registerSection('gallery', 'tailor_portfolio', TailorPortfolioGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 4. TAILOR STATS ROW ═══
interface TailorStat { value: string; label: string; icon: string }
interface TailorStatsRowContent { stats: TailorStat[] }
function TailorStatsRow({ content }: SectionProps<TailorStatsRowContent>) {
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
registerSection('social_proof', 'tailor_stats_row', TailorStatsRow as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 5. TAILOR BOOKING FORM ═══
interface TailorBookingContent { badge?: string; title: string; subtitle?: string; serviceTypes?: string[]; occasions?: string[]; whatsapp?: string; phone?: string; note?: string }
function TailorBookingForm({ content }: SectionProps<TailorBookingContent>) {
 const [form, setForm] = useState({ name: '', phone: '', service: '', occasion: '', date: '', note: '' })
 const [sent, setSent] = useState(false)
 const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))
 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault(); if (!form.name || !form.phone) return
 const wa = content.whatsapp || content.phone?.replace(/\D/g, '') || ''
 const msg = `Terzi Randevusu%0AAdı: ${encodeURIComponent(form.name)}%0ATel: ${form.phone}${form.service ? `%0AHizmet: ${encodeURIComponent(form.service)}` : ''}${form.occasion ? `%0AVesilesi: ${encodeURIComponent(form.occasion)}` : ''}${form.date ? `%0ATarih: ${form.date}` : ''}${form.note ? `%0ANot: ${encodeURIComponent(form.note)}` : ''}`
 window.open(`https://wa.me/${wa}?text=${msg}`, '_blank'); setSent(true)
 }
 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
 <div className="mx-auto" style={{ maxWidth: '580px' }}>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
 {content.subtitle && <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
 {sent ? (
 <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--color-bg)' }}><div className="text-5xl mb-4">🧵✅</div><h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Randevunuz Alındı!</h3><p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Ölçü randevunuz için hazırız.</p></div>
 ) : (
 <form onSubmit={handleSubmit} className="rounded-2xl p-6 space-y-4" style={{ background: 'var(--color-bg)' }}>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Ad Soyad *</label><input type="text" required value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Adınız" /></div>
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Telefon *</label><input type="tel" required value={form.phone} onChange={(e) => update('phone', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="0555 000 00 00" /></div>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {content.serviceTypes && <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Hizmet</label><select value={form.service} onChange={(e) => update('service', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}><option value="">Seçiniz…</option>{content.serviceTypes.map((t) => <option key={t} value={t}>{t}</option>)}</select></div>}
 {content.occasions && <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Vesilesi</label><select value={form.occasion} onChange={(e) => update('occasion', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}><option value="">Seçiniz…</option>{content.occasions.map((o) => <option key={o} value={o}>{o}</option>)}</select></div>}
 </div>
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Tarih</label><input type="date" value={form.date} onChange={(e) => update('date', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} /></div>
 <button type="submit" className="w-full py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>🧵 Randevu Al (WhatsApp)</button>
 {content.note && <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>{content.note}</p>}
 </form>
 )}
 </div>
 </section>
 )
}
registerSection('booking', 'tailor_booking', TailorBookingForm as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

export { TailorServicesGrid, FabricShowcase, TailorPortfolioGrid, TailorStatsRow, TailorBookingForm }
