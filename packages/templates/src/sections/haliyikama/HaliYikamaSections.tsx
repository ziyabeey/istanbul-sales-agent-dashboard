/**
 * @kepenk/templates — Halı Yıkama Section Components
 *
 * 1. CarpetServiceGrid — hizmetler (halı, koltuk, perde)
 * 2. CarpetPricingTable — fiyat tablosu (m² bazlı)
 * 3. CarpetProcessSteps — süreç adımları
 * 4. CarpetStatsRow — istatistikler
 * 5. CarpetPickupForm — teslim alma formu → WhatsApp
 */
'use client'
import { useState } from 'react'
import type { ComponentType } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// ═══ 1. CARPET SERVICE GRID ═══
interface CarpetService { id: string; emoji: string; name: string; description: string; priceUnit?: string; badge?: string }
interface CarpetServiceGridContent { badge?: string; title: string; subtitle?: string; services: CarpetService[] }
function CarpetServiceGrid({ content }: SectionProps<CarpetServiceGridContent>) {
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
 <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}>{s.description}</p>
 {s.priceUnit && <span className="text-sm font-bold" style={{ color: 'var(--color-accent)' }}>{s.priceUnit}</span>}
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}
registerSection('services', 'carpet_services', CarpetServiceGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 2. CARPET PRICING TABLE ═══
interface CarpetPrice { type: string; price: string; unit: string }
interface CarpetPricingTableContent { badge?: string; title: string; prices: CarpetPrice[] }
function CarpetPricingTable({ content }: SectionProps<CarpetPricingTableContent>) {
 return (
 <section className="py-12 px-4" style={{ background: 'var(--color-accent-light)' }}>
 <div className="mx-auto" style={{ maxWidth: '600px' }}>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h2 className="text-2xl font-heading font-bold mb-6" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
 <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
 {(content.prices || []).map((p, i) => (
 <div key={i} className="flex items-center justify-between px-5 py-3" style={{ borderBottom: i < (content.prices || []).length - 1 ? '1px solid var(--color-border)' : 'none' }}>
 <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{p.type}</span>
 <div className="text-right"><span className="text-lg font-bold" style={{ color: 'var(--color-accent)' }}>{p.price}</span><span className="text-xs ml-1" style={{ color: 'var(--color-text-muted)' }}>/{p.unit}</span></div>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}
registerSection('booking', 'carpet_pricing', CarpetPricingTable as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 3. CARPET PROCESS STEPS ═══
interface CarpetStep { step: number; emoji: string; title: string; description: string }
interface CarpetProcessStepsContent { badge?: string; title: string; steps: CarpetStep[] }
function CarpetProcessSteps({ content }: SectionProps<CarpetProcessStepsContent>) {
 return (
 <section className="py-12 px-4" style={{ background: 'var(--color-bg)' }}>
 <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h2 className="text-2xl font-heading font-bold mb-6" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
 <div className="flex flex-wrap justify-center gap-4">
 {(content.steps || []).map((s) => (
 <div key={s.step} className="rounded-xl border px-5 py-4 text-center min-w-[130px] relative" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
 <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>{s.step}</span>
 <span className="text-3xl block mb-2">{s.emoji}</span>
 <p className="text-xs font-bold" style={{ color: 'var(--color-text)' }}>{s.title}</p>
 <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{s.description}</p>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}
registerSection('gallery', 'carpet_process', CarpetProcessSteps as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 4. CARPET STATS ROW ═══
interface CarpetStat { value: string; label: string; icon: string }
interface CarpetStatsRowContent { stats: CarpetStat[] }
function CarpetStatsRow({ content }: SectionProps<CarpetStatsRowContent>) {
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
registerSection('social_proof', 'carpet_stats_row', CarpetStatsRow as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 5. CARPET PICKUP FORM ═══
interface CarpetPickupContent { badge?: string; title: string; subtitle?: string; serviceTypes?: string[]; whatsapp?: string; phone?: string; note?: string }
function CarpetPickupForm({ content }: SectionProps<CarpetPickupContent>) {
 const [form, setForm] = useState({ name: '', phone: '', service: '', address: '', date: '' })
 const [sent, setSent] = useState(false)
 const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))
 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault(); if (!form.name || !form.phone) return
 const wa = content.whatsapp || content.phone?.replace(/\D/g, '') || ''
 const msg = `Hali Yikama%0AAdi: ${encodeURIComponent(form.name)}%0ATel: ${form.phone}${form.service ? `%0AHizmet: ${encodeURIComponent(form.service)}` : ''}${form.address ? `%0AAdres: ${encodeURIComponent(form.address)}` : ''}${form.date ? `%0ATarih: ${form.date}` : ''}`
 window.open(`https://wa.me/${wa}?text=${msg}`, '_blank'); setSent(true)
 }
 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
 <div className="mx-auto" style={{ maxWidth: '580px' }}>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
 {content.subtitle && <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
 {sent ? (
 <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--color-bg)' }}><div className="text-5xl mb-4">🧹✅</div><h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Talebiniz Alindi!</h3><p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Halilariniz alinacak.</p></div>
 ) : (
 <form onSubmit={handleSubmit} className="rounded-2xl p-6 space-y-4" style={{ background: 'var(--color-bg)' }}>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Ad Soyad *</label><input type="text" required value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Adiniz" /></div>
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Telefon *</label><input type="tel" required value={form.phone} onChange={(e) => update('phone', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="0555 000 00 00" /></div>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {content.serviceTypes && <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Hizmet</label><select value={form.service} onChange={(e) => update('service', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}><option value="">Seciniz…</option>{content.serviceTypes.map((t) => <option key={t} value={t}>{t}</option>)}</select></div>}
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Tarih</label><input type="date" value={form.date} onChange={(e) => update('date', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} /></div>
 </div>
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Adres</label><input type="text" value={form.address} onChange={(e) => update('address', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Teslim alma adresi" /></div>
 <button type="submit" className="w-full py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>🧹 Teslim Al (WhatsApp)</button>
 {content.note && <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>{content.note}</p>}
 </form>
 )}
 </div>
 </section>
 )
}
registerSection('booking', 'carpet_pickup', CarpetPickupForm as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

export { CarpetServiceGrid, CarpetPricingTable, CarpetProcessSteps, CarpetStatsRow, CarpetPickupForm }
