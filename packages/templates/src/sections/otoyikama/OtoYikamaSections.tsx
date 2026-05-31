/**
 * @kepenk/templates — Oto Yıkama Section Components
 *
 * 1. CarWashPackages — yıkama paketleri (iç/dış/detaylı)
 * 2. CarWashServicesGrid — ek hizmetler (boya koruma, kaplama)
 * 3. CarWashBeforeAfter — öncesi/sonrası
 * 4. CarWashStatsRow — istatistikler
 * 5. CarWashBookingForm — randevu → WhatsApp
 */

'use client'

import { useState } from 'react'
import type { ComponentType } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// ═══ 1. CAR WASH PACKAGES ═══
interface WashPackage { id: string; emoji: string; name: string; price: string; duration: string; features: string[]; badge?: string; highlighted?: boolean }
interface CarWashPackagesContent { badge?: string; title: string; subtitle?: string; packages: WashPackage[] }
function CarWashPackages({ content }: SectionProps<CarWashPackagesContent>) {
 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
 <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
 {content.subtitle && <p className="text-base mb-8" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
 {(content.packages || []).map((p) => (
 <div key={p.id} className="rounded-2xl border p-6 text-center relative" style={{ background: p.highlighted ? 'var(--color-accent-light)' : 'var(--color-bg)', borderColor: p.highlighted ? 'var(--color-accent)' : 'var(--color-border)', transform: p.highlighted ? 'scale(1.03)' : 'none' }}>
 {p.badge && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>{p.badge}</span>}
 <span className="text-4xl block mb-3">{p.emoji}</span>
 <h3 className="font-heading font-bold text-lg" style={{ color: 'var(--color-text)' }}>{p.name}</h3>
 <div className="my-3"><span className="text-3xl font-bold" style={{ color: 'var(--color-accent)' }}>{p.price}</span></div>
 <p className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>⏱ {p.duration}</p>
 <ul className="space-y-1.5 mb-4 text-left">
 {p.features.map((f, i) => <li key={i} className="text-sm flex items-start gap-2" style={{ color: 'var(--color-text-secondary)' }}><span className="text-green-500 mt-0.5">✓</span> {f}</li>)}
 </ul>
 <a href="#randevu" className="inline-block w-full py-2.5 rounded-full font-bold text-sm" style={{ background: p.highlighted ? 'var(--color-accent)' : 'var(--color-surface-muted)', color: p.highlighted ? 'var(--color-text-on-accent)' : 'var(--color-text)' }}>Seç</a>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}
registerSection('booking', 'carwash_packages', CarWashPackages as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 2. CAR WASH SERVICES GRID ═══
interface CarWashService { id: string; emoji: string; name: string; description: string; price?: string; badge?: string }
interface CarWashServicesGridContent { badge?: string; title: string; services: CarWashService[] }
function CarWashServicesGrid({ content }: SectionProps<CarWashServicesGridContent>) {
 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-bg)' }}>
 <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
 {(content.services || []).map((s) => (
 <div key={s.id} className="rounded-2xl border p-5 hover:shadow-md transition-shadow relative" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
 {s.badge && <span className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>{s.badge}</span>}
 <span className="text-4xl mb-3 block">{s.emoji}</span>
 <h3 className="font-heading font-bold text-base mb-1" style={{ color: 'var(--color-text)' }}>{s.name}</h3>
 <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}>{s.description}</p>
 {s.price && <span className="text-sm font-bold" style={{ color: 'var(--color-accent)' }}>{s.price}</span>}
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}
registerSection('services', 'carwash_services', CarWashServicesGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 3. CAR WASH BEFORE AFTER ═══
interface BeforeAfterItem { id: string; service: string; beforeEmoji: string; afterEmoji: string; description?: string }
interface CarWashBeforeAfterContent { badge?: string; title: string; items: BeforeAfterItem[] }
function CarWashBeforeAfter({ content }: SectionProps<CarWashBeforeAfterContent>) {
 return (
 <section className="py-12 px-4" style={{ background: 'var(--color-accent-light)' }}>
 <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h2 className="text-2xl font-heading font-bold mb-6" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
 <div className="flex flex-wrap justify-center gap-6">
 {(content.items || []).map((item) => (
 <div key={item.id} className="rounded-xl border px-6 py-4 text-center" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
 <p className="text-xs font-bold mb-2" style={{ color: 'var(--color-accent)' }}>{item.service}</p>
 <div className="flex items-center gap-3">
 <span className="text-3xl">{item.beforeEmoji}</span>
 <span className="text-lg" style={{ color: 'var(--color-accent)' }}>→</span>
 <span className="text-3xl">{item.afterEmoji}</span>
 </div>
 {item.description && <p className="text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>{item.description}</p>}
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}
registerSection('gallery', 'carwash_before_after', CarWashBeforeAfter as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 4. CAR WASH STATS ROW ═══
interface CarWashStat { value: string; label: string; icon: string }
interface CarWashStatsRowContent { stats: CarWashStat[] }
function CarWashStatsRow({ content }: SectionProps<CarWashStatsRowContent>) {
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
registerSection('social_proof', 'carwash_stats_row', CarWashStatsRow as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 5. CAR WASH BOOKING FORM ═══
interface CarWashBookingContent { badge?: string; title: string; subtitle?: string; washTypes?: string[]; vehicleTypes?: string[]; whatsapp?: string; phone?: string; note?: string }
function CarWashBookingForm({ content }: SectionProps<CarWashBookingContent>) {
 const [form, setForm] = useState({ name: '', phone: '', wash: '', vehicle: '', plate: '', date: '' })
 const [sent, setSent] = useState(false)
 const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))
 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault(); if (!form.name || !form.phone) return
 const wa = content.whatsapp || content.phone?.replace(/\D/g, '') || ''
 const msg = `Oto Yikama Randevu%0AAdi: ${encodeURIComponent(form.name)}%0ATel: ${form.phone}${form.wash ? `%0APaket: ${encodeURIComponent(form.wash)}` : ''}${form.vehicle ? `%0AArac: ${encodeURIComponent(form.vehicle)}` : ''}${form.plate ? `%0APlaka: ${form.plate}` : ''}${form.date ? `%0ATarih: ${form.date}` : ''}`
 window.open(`https://wa.me/${wa}?text=${msg}`, '_blank'); setSent(true)
 }
 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
 <div className="mx-auto" style={{ maxWidth: '580px' }}>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
 {content.subtitle && <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
 {sent ? (
 <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--color-bg)' }}><div className="text-5xl mb-4">🚗✅</div><h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Randevunuz Alindi!</h3><p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Araciniz tertemiz olacak.</p></div>
 ) : (
 <form onSubmit={handleSubmit} className="rounded-2xl p-6 space-y-4" style={{ background: 'var(--color-bg)' }}>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Ad Soyad *</label><input type="text" required value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Adiniz" /></div>
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Telefon *</label><input type="tel" required value={form.phone} onChange={(e) => update('phone', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="0555 000 00 00" /></div>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {content.washTypes && <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Paket</label><select value={form.wash} onChange={(e) => update('wash', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}><option value="">Seciniz…</option>{content.washTypes.map((w) => <option key={w} value={w}>{w}</option>)}</select></div>}
 {content.vehicleTypes && <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Arac</label><select value={form.vehicle} onChange={(e) => update('vehicle', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}><option value="">Seciniz…</option>{content.vehicleTypes.map((v) => <option key={v} value={v}>{v}</option>)}</select></div>}
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Plaka</label><input type="text" value={form.plate} onChange={(e) => update('plate', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="34 ABC 123" /></div>
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Tarih</label><input type="date" value={form.date} onChange={(e) => update('date', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} /></div>
 </div>
 <button type="submit" className="w-full py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>🚗 Randevu Al (WhatsApp)</button>
 {content.note && <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>{content.note}</p>}
 </form>
 )}
 </div>
 </section>
 )
}
registerSection('booking', 'carwash_booking', CarWashBookingForm as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

export { CarWashPackages, CarWashServicesGrid, CarWashBeforeAfter, CarWashStatsRow, CarWashBookingForm }
