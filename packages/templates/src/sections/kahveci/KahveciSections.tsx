/**
 * @kepenk/templates — Kahveci Section Components
 *
 * 1. CoffeeMenuGrid — kahve menüsü (sıcak, soğuk, yiyecek)
 * 2. CoffeeBeanShowcase — çekirdek/kavurma vitrini
 * 3. CoffeeAtmosphere — atmosfer/ambiyans bölümü
 * 4. CoffeeStatsRow — istatistikler
 * 5. CoffeeOrderForm — sipariş/rezervasyon → WhatsApp
 */

'use client'

import { useState } from 'react'
import type { ComponentType } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// ═══ 1. COFFEE MENU GRID ═══

interface CoffeeMenuItem { id: string; emoji: string; name: string; price: string; category?: string; badge?: string; description?: string }
interface CoffeeMenuGridContent { badge?: string; title: string; subtitle?: string; categories?: string[]; items: CoffeeMenuItem[] }

function CoffeeMenuGrid({ content }: SectionProps<CoffeeMenuGridContent>) {
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
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {(filtered || []).map((item) => (
 <div key={item.id} className="rounded-2xl border p-4 flex gap-4 items-center hover:shadow-md transition-shadow" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
 <span className="text-4xl flex-shrink-0">{item.emoji}</span>
 <div className="flex-1 min-w-0">
 <div className="flex items-center gap-2">
 <h3 className="font-heading font-bold text-sm truncate" style={{ color: 'var(--color-text)' }}>{item.name}</h3>
 {item.badge && <span className="text-xs font-bold px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>{item.badge}</span>}
 </div>
 {item.description && <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--color-text-muted)' }}>{item.description}</p>}
 <p className="text-sm font-bold mt-1" style={{ color: 'var(--color-accent)' }}>{item.price}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}
registerSection('services', 'coffee_menu_grid', CoffeeMenuGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 2. COFFEE BEAN SHOWCASE ═══

interface BeanItem { id: string; emoji: string; name: string; origin?: string; roast?: string; flavor?: string; badge?: string }
interface CoffeeBeanShowcaseContent { badge?: string; title: string; beans: BeanItem[] }

function CoffeeBeanShowcase({ content }: SectionProps<CoffeeBeanShowcaseContent>) {
 return (
 <section className="py-12 px-4" style={{ background: 'var(--color-accent-light)' }}>
 <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h2 className="text-2xl font-heading font-bold mb-6" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
 <div className="flex flex-wrap justify-center gap-4">
 {(content.beans || []).map((b) => (
 <div key={b.id} className="rounded-xl border px-4 py-3 text-center min-w-[130px] hover:shadow-md transition-shadow relative" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
 {b.badge && <span className="absolute -top-2 right-1 text-xs font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)', fontSize: '10px' }}>{b.badge}</span>}
 <span className="text-3xl block mb-1">{b.emoji}</span>
 <p className="text-xs font-bold" style={{ color: 'var(--color-text)' }}>{b.name}</p>
 {b.origin && <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{b.origin}</p>}
 {b.roast && <p className="text-xs" style={{ color: 'var(--color-accent)' }}>{b.roast}</p>}
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}
registerSection('gallery', 'coffee_beans', CoffeeBeanShowcase as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 3. COFFEE ATMOSPHERE ═══
interface AtmosphereFeature { icon: string; title: string; description: string }
interface CoffeeAtmosphereContent { badge?: string; title: string; subtitle?: string; features: AtmosphereFeature[] }
function CoffeeAtmosphere({ content }: SectionProps<CoffeeAtmosphereContent>) {
 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-bg)' }}>
 <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
 {content.subtitle && <p className="text-base mb-8" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
 {(content.features || []).map((f, i) => (
 <div key={i} className="rounded-2xl border p-5 text-center" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
 <span className="text-4xl block mb-3">{f.icon}</span>
 <h3 className="font-heading font-bold text-base mb-1" style={{ color: 'var(--color-text)' }}>{f.title}</h3>
 <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{f.description}</p>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}
registerSection('services', 'coffee_atmosphere', CoffeeAtmosphere as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 4. COFFEE STATS ROW ═══
interface CoffeeStat { value: string; label: string; icon: string }
interface CoffeeStatsRowContent { stats: CoffeeStat[] }
function CoffeeStatsRow({ content }: SectionProps<CoffeeStatsRowContent>) {
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
registerSection('social_proof', 'coffee_stats_row', CoffeeStatsRow as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 5. COFFEE ORDER FORM ═══
interface CoffeeOrderContent { badge?: string; title: string; subtitle?: string; orderTypes?: string[]; whatsapp?: string; phone?: string; note?: string }
function CoffeeOrderForm({ content }: SectionProps<CoffeeOrderContent>) {
 const [form, setForm] = useState({ name: '', phone: '', type: '', message: '' })
 const [sent, setSent] = useState(false)
 const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))
 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault(); if (!form.name || !form.phone) return
 const wa = content.whatsapp || content.phone?.replace(/\D/g, '') || ''
 const msg = `Kahve Sipariş%0AAdı: ${encodeURIComponent(form.name)}%0ATel: ${form.phone}${form.type ? `%0ATür: ${encodeURIComponent(form.type)}` : ''}${form.message ? `%0ANot: ${encodeURIComponent(form.message)}` : ''}`
 window.open(`https://wa.me/${wa}?text=${msg}`, '_blank'); setSent(true)
 }
 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
 <div className="mx-auto" style={{ maxWidth: '580px' }}>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
 {content.subtitle && <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
 {sent ? (
 <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--color-bg)' }}><div className="text-5xl mb-4">☕✅</div><h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Siparişiniz Alındı!</h3><p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Kahveniz hazırlanıyor.</p></div>
 ) : (
 <form onSubmit={handleSubmit} className="rounded-2xl p-6 space-y-4" style={{ background: 'var(--color-bg)' }}>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Ad Soyad *</label><input type="text" required value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Adınız" /></div>
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Telefon *</label><input type="tel" required value={form.phone} onChange={(e) => update('phone', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="0555 000 00 00" /></div>
 </div>
 {content.orderTypes && <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Sipariş Türü</label><select value={form.type} onChange={(e) => update('type', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}><option value="">Seçiniz…</option>{content.orderTypes.map((t) => <option key={t} value={t}>{t}</option>)}</select></div>}
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Not</label><textarea rows={2} value={form.message} onChange={(e) => update('message', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none resize-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Detay…"></textarea></div>
 <button type="submit" className="w-full py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>☕ Sipariş Ver (WhatsApp)</button>
 {content.note && <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>{content.note}</p>}
 </form>
 )}
 </div>
 </section>
 )
}
registerSection('booking', 'coffee_order', CoffeeOrderForm as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

export { CoffeeMenuGrid, CoffeeBeanShowcase, CoffeeAtmosphere, CoffeeStatsRow, CoffeeOrderForm }
