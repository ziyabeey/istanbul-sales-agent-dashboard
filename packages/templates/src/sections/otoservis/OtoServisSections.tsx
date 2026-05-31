/**
 * @kepenk/templates — Oto Servis Section Components
 *
 * 1. AutoServicesGrid — hizmet kartları (bakım, lastik, kaporta vb.)
 * 2. VehicleBrandsBar — desteklenen marka logoları
 * 3. AutoPricingTable — servis fiyat tablosu
 * 4. AutoStatsRow — istatistikler
 * 5. AutoBookingForm — servis randevusu → WhatsApp
 */

'use client'

import { useState } from 'react'
import type { ComponentType } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// ═══ 1. AUTO SERVICES GRID ═══

interface AutoService { id: string; emoji: string; name: string; description: string; price?: string; duration?: string; badge?: string }
interface AutoServicesGridContent { badge?: string; title: string; subtitle?: string; services: AutoService[]; ctaText?: string; ctaHref?: string }

function AutoServicesGrid({ content }: SectionProps<AutoServicesGridContent>) {
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
 {content.ctaText && <div className="text-center mt-8"><a href={content.ctaHref || '#'} className="inline-block px-8 py-3 rounded-full font-bold text-sm transition-transform hover:scale-105" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>{content.ctaText}</a></div>}
 </div>
 </section>
 )
}
registerSection('services', 'auto_services_grid', AutoServicesGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 2. VEHICLE BRANDS BAR ═══

interface VehicleBrand { id: string; emoji: string; name: string }
interface VehicleBrandsBarContent { badge?: string; title?: string; brands: VehicleBrand[] }

function VehicleBrandsBar({ content }: SectionProps<VehicleBrandsBarContent>) {
 return (
 <section className="py-10 px-4" style={{ background: 'var(--color-bg)' }}>
 <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
 {content.title && <p className="text-center text-sm font-semibold mb-6" style={{ color: 'var(--color-text-muted)' }}>{content.title}</p>}
 <div className="flex flex-wrap justify-center gap-6 md:gap-10">
 {(content.brands || []).map((b) => (
 <div key={b.id} className="flex flex-col items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
 <span className="text-3xl">{b.emoji}</span>
 <span className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>{b.name}</span>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}
registerSection('social_proof', 'vehicle_brands_bar', VehicleBrandsBar as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 3. AUTO PRICING TABLE ═══

interface AutoPriceRow { id: string; service: string; price: string; note?: string }
interface AutoPricingTableContent { badge?: string; title: string; subtitle?: string; rows: AutoPriceRow[]; ctaText?: string; ctaHref?: string; note?: string }

function AutoPricingTable({ content }: SectionProps<AutoPricingTableContent>) {
 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-bg)' }}>
 <div className="mx-auto" style={{ maxWidth: '700px' }}>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
 {content.subtitle && <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
 <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
 {(content.rows || []).map((row, i) => (
 <div key={row.id} className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: i < (content.rows.length - 1) ? '1px solid var(--color-border)' : 'none' }}>
 <div>
 <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{row.service}</p>
 {row.note && <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{row.note}</p>}
 </div>
 <span className="text-sm font-bold whitespace-nowrap" style={{ color: 'var(--color-accent)' }}>{row.price}</span>
 </div>
 ))}
 </div>
 {content.ctaText && <div className="text-center mt-6"><a href={content.ctaHref || '#'} className="inline-block px-8 py-3 rounded-full font-bold text-sm" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>{content.ctaText}</a></div>}
 {content.note && <p className="text-xs text-center mt-4" style={{ color: 'var(--color-text-muted)' }}>{content.note}</p>}
 </div>
 </section>
 )
}
registerSection('booking', 'auto_pricing_table', AutoPricingTable as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 4. AUTO STATS ROW ═══
interface AutoStat { value: string; label: string; icon: string }
interface AutoStatsRowContent { stats: AutoStat[] }
function AutoStatsRow({ content }: SectionProps<AutoStatsRowContent>) {
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
registerSection('social_proof', 'auto_stats_row', AutoStatsRow as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 5. AUTO BOOKING FORM ═══
interface AutoBookingContent { badge?: string; title: string; subtitle?: string; serviceTypes?: string[]; vehicleTypes?: string[]; whatsapp?: string; phone?: string; note?: string }
function AutoBookingForm({ content }: SectionProps<AutoBookingContent>) {
 const [form, setForm] = useState({ name: '', phone: '', service: '', vehicle: '', plate: '', date: '', note: '' })
 const [sent, setSent] = useState(false)
 const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))
 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault(); if (!form.name || !form.phone) return
 const wa = content.whatsapp || content.phone?.replace(/\D/g, '') || ''
 const msg = `Servis Randevusu%0AAdı: ${encodeURIComponent(form.name)}%0ATel: ${form.phone}${form.service ? `%0AHizmet: ${encodeURIComponent(form.service)}` : ''}${form.vehicle ? `%0AAraç: ${encodeURIComponent(form.vehicle)}` : ''}${form.plate ? `%0APlaka: ${form.plate}` : ''}${form.date ? `%0ATarih: ${form.date}` : ''}${form.note ? `%0ANot: ${encodeURIComponent(form.note)}` : ''}`
 window.open(`https://wa.me/${wa}?text=${msg}`, '_blank'); setSent(true)
 }
 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
 <div className="mx-auto" style={{ maxWidth: '580px' }}>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
 {content.subtitle && <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
 {sent ? (
 <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--color-bg)' }}><div className="text-5xl mb-4">🔧✅</div><h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Randevunuz Alındı!</h3><p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>En kısa sürede dönüş yapacağız.</p></div>
 ) : (
 <form onSubmit={handleSubmit} className="rounded-2xl p-6 space-y-4" style={{ background: 'var(--color-bg)' }}>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Ad Soyad *</label><input type="text" required value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Adınız" /></div>
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Telefon *</label><input type="tel" required value={form.phone} onChange={(e) => update('phone', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="0555 000 00 00" /></div>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {content.serviceTypes && <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Hizmet</label><select value={form.service} onChange={(e) => update('service', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}><option value="">Seçiniz…</option>{content.serviceTypes.map((t) => <option key={t} value={t}>{t}</option>)}</select></div>}
 {content.vehicleTypes && <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Araç Tipi</label><select value={form.vehicle} onChange={(e) => update('vehicle', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}><option value="">Seçiniz…</option>{content.vehicleTypes.map((v) => <option key={v} value={v}>{v}</option>)}</select></div>}
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Plaka</label><input type="text" value={form.plate} onChange={(e) => update('plate', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="34 ABC 123" /></div>
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Tarih</label><input type="date" value={form.date} onChange={(e) => update('date', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} /></div>
 </div>
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Not</label><textarea rows={2} value={form.note} onChange={(e) => update('note', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none resize-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Arıza detayı…" /></div>
 <button type="submit" className="w-full py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>🔧 Randevu Al (WhatsApp)</button>
 {content.note && <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>{content.note}</p>}
 </form>
 )}
 </div>
 </section>
 )
}
registerSection('booking', 'auto_booking', AutoBookingForm as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

export { AutoServicesGrid, VehicleBrandsBar, AutoPricingTable, AutoStatsRow, AutoBookingForm }
