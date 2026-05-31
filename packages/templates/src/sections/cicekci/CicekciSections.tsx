/**
 * @kepenk/templates — Çiçekçi Section Components
 *
 * 1. FloristProductGrid — çiçek/buket kartları (kategori filtreli)
 * 2. FloristOccasionBar — vesile kartları (doğum günü, düğün, taziye)
 * 3. FloristDeliveryInfo — teslimat bilgisi bannerı
 * 4. FloristStatsRow — istatistikler
 * 5. FloristOrderForm — sipariş formu → WhatsApp
 */

'use client'

import { useState } from 'react'
import type { ComponentType } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// ═══ 1. FLORIST PRODUCT GRID ═══

interface FlowerItem { id: string; emoji: string; name: string; price: string; category?: string; badge?: string; description?: string }
interface FloristProductGridContent { badge?: string; title: string; subtitle?: string; categories?: string[]; items: FlowerItem[] }

function FloristProductGrid({ content }: SectionProps<FloristProductGridContent>) {
 const cats = content.categories || [...new Set((content.items || []).map((i) => i.category).filter((c): c is string => !!c))]
 const [active, setActive] = useState('Tümü')
 const filtered = active === 'Tümü' ? content.items : (content.items || []).filter((i) => i.category === active)
 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
 <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
 {content.subtitle && <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
 {cats.length > 0 && <div className="flex flex-wrap gap-2 mb-6">{['Tümü', ...cats].map((c) => <button key={c} onClick={() => setActive(c)} className="px-4 py-1.5 rounded-full text-xs font-semibold transition-colors" style={{ background: active === c ? 'var(--color-accent)' : 'var(--color-bg)', color: active === c ? 'var(--color-text-on-accent)' : 'var(--color-text-secondary)', border: `1px solid ${active === c ? 'var(--color-accent)' : 'var(--color-border)'}` }}>{c}</button>)}</div>}
 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
 {(filtered || []).map((item) => (
 <div key={item.id} className="rounded-2xl border overflow-hidden group cursor-pointer hover:shadow-md transition-shadow" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
 <div className="flex items-center justify-center relative" style={{ height: 130, background: 'var(--color-accent-light)' }}>
 <span className="text-5xl group-hover:scale-110 transition-transform">{item.emoji}</span>
 {item.badge && <span className="absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>{item.badge}</span>}
 </div>
 <div className="p-3">
 <p className="font-heading font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{item.name}</p>
 {item.description && <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{item.description}</p>}
 <p className="text-sm font-bold mt-1" style={{ color: 'var(--color-accent)' }}>{item.price}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}
registerSection('gallery', 'florist_products', FloristProductGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 2. FLORIST OCCASION BAR ═══

interface Occasion { id: string; emoji: string; name: string; description?: string }
interface FloristOccasionBarContent { badge?: string; title?: string; occasions: Occasion[] }

function FloristOccasionBar({ content }: SectionProps<FloristOccasionBarContent>) {
 return (
 <section className="py-10 px-4" style={{ background: 'var(--color-accent-light)' }}>
 <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
 {content.title && <p className="text-center text-sm font-bold mb-6" style={{ color: 'var(--color-accent)' }}>{content.title}</p>}
 <div className="flex flex-wrap justify-center gap-4 md:gap-6">
 {(content.occasions || []).map((o) => (
 <div key={o.id} className="rounded-xl border px-5 py-4 text-center min-w-[120px] hover:shadow-md transition-shadow cursor-pointer" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
 <span className="text-3xl block mb-2">{o.emoji}</span>
 <p className="text-xs font-bold" style={{ color: 'var(--color-text)' }}>{o.name}</p>
 {o.description && <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{o.description}</p>}
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}
registerSection('services', 'florist_occasions', FloristOccasionBar as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 3. FLORIST DELIVERY INFO ═══

interface FloristDeliveryInfoContent { badge?: string; title: string; subtitle?: string; features?: { icon: string; text: string }[]; note?: string }

function FloristDeliveryInfo({ content }: SectionProps<FloristDeliveryInfoContent>) {
 return (
 <section className="py-8 px-4" style={{ background: 'var(--color-surface)' }}>
 <div className="mx-auto text-center" style={{ maxWidth: '700px' }}>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h3 className="text-xl font-heading font-bold mb-3" style={{ color: 'var(--color-text)' }}>{content.title}</h3>
 {content.subtitle && <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
 {content.features && <div className="flex flex-wrap justify-center gap-4">{content.features.map((f, i) => <div key={i} className="flex items-center gap-2 text-sm"><span className="text-lg">{f.icon}</span><span style={{ color: 'var(--color-text)' }}>{f.text}</span></div>)}</div>}
 {content.note && <p className="text-xs mt-3" style={{ color: 'var(--color-text-muted)' }}>{content.note}</p>}
 </div>
 </section>
 )
}
registerSection('social_proof', 'florist_delivery', FloristDeliveryInfo as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 4. FLORIST STATS ROW ═══
interface FloristStat { value: string; label: string; icon: string }
interface FloristStatsRowContent { stats: FloristStat[] }
function FloristStatsRow({ content }: SectionProps<FloristStatsRowContent>) {
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
registerSection('social_proof', 'florist_stats_row', FloristStatsRow as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 5. FLORIST ORDER FORM ═══
interface FloristOrderContent { badge?: string; title: string; subtitle?: string; occasions?: string[]; budgetRanges?: string[]; whatsapp?: string; phone?: string; note?: string }
function FloristOrderForm({ content }: SectionProps<FloristOrderContent>) {
 const [form, setForm] = useState({ name: '', phone: '', occasion: '', budget: '', date: '', address: '', note: '' })
 const [sent, setSent] = useState(false)
 const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))
 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault(); if (!form.name || !form.phone) return
 const wa = content.whatsapp || content.phone?.replace(/\D/g, '') || ''
 const msg = `Çiçek Siparişi%0AAdı: ${encodeURIComponent(form.name)}%0ATel: ${form.phone}${form.occasion ? `%0AVesile: ${encodeURIComponent(form.occasion)}` : ''}${form.budget ? `%0ABütçe: ${encodeURIComponent(form.budget)}` : ''}${form.date ? `%0ATarih: ${form.date}` : ''}${form.address ? `%0AAdres: ${encodeURIComponent(form.address)}` : ''}${form.note ? `%0ANot: ${encodeURIComponent(form.note)}` : ''}`
 window.open(`https://wa.me/${wa}?text=${msg}`, '_blank'); setSent(true)
 }
 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
 <div className="mx-auto" style={{ maxWidth: '580px' }}>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
 {content.subtitle && <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
 {sent ? (
 <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--color-bg)' }}><div className="text-5xl mb-4">💐✅</div><h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Siparişiniz Alındı!</h3><p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Çiçekleriniz hazırlanıyor.</p></div>
 ) : (
 <form onSubmit={handleSubmit} className="rounded-2xl p-6 space-y-4" style={{ background: 'var(--color-bg)' }}>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Ad Soyad *</label><input type="text" required value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Adınız" /></div>
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Telefon *</label><input type="tel" required value={form.phone} onChange={(e) => update('phone', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="0555 000 00 00" /></div>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {content.occasions && <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Vesile</label><select value={form.occasion} onChange={(e) => update('occasion', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}><option value="">Seçiniz…</option>{content.occasions.map((o) => <option key={o} value={o}>{o}</option>)}</select></div>}
 {content.budgetRanges && <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Bütçe</label><select value={form.budget} onChange={(e) => update('budget', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}><option value="">Seçiniz…</option>{content.budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}</select></div>}
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Teslimat Tarihi</label><input type="date" value={form.date} onChange={(e) => update('date', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} /></div>
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Teslimat Adresi</label><input type="text" value={form.address} onChange={(e) => update('address', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Adres" /></div>
 </div>
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Not</label><textarea rows={2} value={form.note} onChange={(e) => update('note', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none resize-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Kart mesajı, renk tercihi…"></textarea></div>
 <button type="submit" className="w-full py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>💐 Sipariş Ver (WhatsApp)</button>
 {content.note && <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>{content.note}</p>}
 </form>
 )}
 </div>
 </section>
 )
}
registerSection('booking', 'florist_order', FloristOrderForm as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

export { FloristProductGrid, FloristOccasionBar, FloristDeliveryInfo, FloristStatsRow, FloristOrderForm }
