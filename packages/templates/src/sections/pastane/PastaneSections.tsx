/**
 * @kepenk/templates — Pastane Section Components
 *
 * 1. BakeryMenuGrid — ürün menüsü (pasta, kurabiye, ekmek vb.)
 * 2. BakeryStorySection — hikaye & felsefe
 * 3. CakeGalleryGrid — pasta galeri (düğün, doğum günü vb.)
 * 4. BakeryStatsRow — istatistikler
 * 5. CakeOrderForm — sipariş / özel pasta talebi → WhatsApp
 */

'use client'

import { useState } from 'react'
import type { ComponentType } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// ═══ 1. BAKERY MENU GRID ═══

interface BakeryItem { id: string; emoji: string; name: string; description: string; price?: string; badge?: string; category?: string }
interface BakeryMenuGridContent { badge?: string; title: string; subtitle?: string; categories?: string[]; items: BakeryItem[] }

function BakeryMenuGrid({ content }: SectionProps<BakeryMenuGridContent>) {
 const cats = content.categories || [...new Set((content.items || []).map((i) => i.category).filter((c): c is string => !!c))]
 const [active, setActive] = useState('Tümü')
 const filtered = active === 'Tümü' ? content.items : (content.items || []).filter((i) => i.category === active)
 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
 <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
 {content.subtitle && <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
 {cats.length > 0 && <div className="flex flex-wrap gap-2 mb-8">
 {['Tümü', ...cats].map((c) => (
 <button key={c} onClick={() => setActive(c)} className="text-xs font-bold px-4 py-2 rounded-full transition-colors"
 style={{ background: active === c ? 'var(--color-accent)' : 'var(--color-bg)', color: active === c ? 'var(--color-text-on-accent)' : 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>{c}</button>
 ))}
 </div>}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
 {(filtered || []).map((item) => (
 <div key={item.id} className="rounded-2xl border p-5 hover:shadow-md transition-shadow relative" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
 {item.badge && <span className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>{item.badge}</span>}
 <span className="text-4xl mb-3 block">{item.emoji}</span>
 <h3 className="font-heading font-bold text-base mb-1" style={{ color: 'var(--color-text)' }}>{item.name}</h3>
 <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}>{item.description}</p>
 {item.price && <span className="text-sm font-bold" style={{ color: 'var(--color-accent)' }}>{item.price}</span>}
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}
registerSection('services', 'bakery_menu_grid', BakeryMenuGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 2. BAKERY STORY SECTION ═══

interface BakeryStoryContent { badge?: string; title: string; story: string; highlights?: { icon: string; text: string }[]; founderEmoji?: string; founderName?: string; founderQuote?: string }

function BakeryStorySection({ content }: SectionProps<BakeryStoryContent>) {
 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-bg)' }}>
 <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
 <div>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
 <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>{content.story}</p>
 {content.highlights && <div className="flex flex-wrap gap-4">{content.highlights.map((h, i) => (
 <div key={i} className="flex items-center gap-2 text-sm"><span className="text-xl">{h.icon}</span><span style={{ color: 'var(--color-text)' }}>{h.text}</span></div>
 ))}</div>}
 </div>
 <div className="rounded-2xl p-6 flex flex-col items-center text-center" style={{ background: 'var(--color-surface)' }}>
 <span className="text-6xl mb-4">{content.founderEmoji || '👨‍🍳'}</span>
 {content.founderName && <p className="font-heading font-bold text-lg mb-2" style={{ color: 'var(--color-text)' }}>{content.founderName}</p>}
 {content.founderQuote && <p className="text-sm italic" style={{ color: 'var(--color-text-secondary)' }}>&ldquo;{content.founderQuote}&rdquo;</p>}
 </div>
 </div>
 </div>
 </section>
 )
}
registerSection('about', 'bakery_story', BakeryStorySection as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 3. CAKE GALLERY GRID ═══

interface CakeItem { id: string; emoji: string; title: string; category?: string; description?: string; tag?: string }
interface CakeGalleryGridContent { badge?: string; title: string; subtitle?: string; items: CakeItem[] }

function CakeGalleryGrid({ content }: SectionProps<CakeGalleryGridContent>) {
 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
 <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
 {content.subtitle && <p className="text-base mb-8" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
 {(content.items || []).map((item) => (
 <div key={item.id} className="rounded-2xl border overflow-hidden group cursor-pointer" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
 <div className="flex items-center justify-center relative" style={{ height: 130, background: 'var(--color-accent-light)' }}>
 <span className="text-5xl group-hover:scale-110 transition-transform">{item.emoji}</span>
 {item.tag && <span className="absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>{item.tag}</span>}
 </div>
 <div className="p-3">
 <p className="font-heading font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{item.title}</p>
 {item.category && <p className="text-xs" style={{ color: 'var(--color-accent)' }}>{item.category}</p>}
 {item.description && <p className="text-xs mt-1 line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>{item.description}</p>}
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}
registerSection('gallery', 'cake_gallery', CakeGalleryGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 4. BAKERY STATS ROW ═══
interface BakeryStat { value: string; label: string; icon: string }
interface BakeryStatsRowContent { stats: BakeryStat[] }
function BakeryStatsRow({ content }: SectionProps<BakeryStatsRowContent>) {
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
registerSection('social_proof', 'bakery_stats_row', BakeryStatsRow as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 5. CAKE ORDER FORM ═══
interface CakeOrderContent { badge?: string; title: string; subtitle?: string; cakeTypes?: string[]; sizeOptions?: string[]; whatsapp?: string; phone?: string; note?: string }
function CakeOrderForm({ content }: SectionProps<CakeOrderContent>) {
 const [form, setForm] = useState({ name: '', phone: '', cakeType: '', size: '', date: '', message: '', note: '' })
 const [sent, setSent] = useState(false)
 const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))
 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault(); if (!form.name || !form.phone) return
 const wa = content.whatsapp || content.phone?.replace(/\D/g, '') || ''
 const msg = `Pasta Siparişi%0AAdı: ${encodeURIComponent(form.name)}%0ATel: ${form.phone}${form.cakeType ? `%0ATür: ${encodeURIComponent(form.cakeType)}` : ''}${form.size ? `%0ABoyut: ${encodeURIComponent(form.size)}` : ''}${form.date ? `%0ATarih: ${form.date}` : ''}${form.message ? `%0AMesaj: ${encodeURIComponent(form.message)}` : ''}${form.note ? `%0ANot: ${encodeURIComponent(form.note)}` : ''}`
 window.open(`https://wa.me/${wa}?text=${msg}`, '_blank'); setSent(true)
 }
 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
 <div className="mx-auto" style={{ maxWidth: '580px' }}>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
 {content.subtitle && <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
 {sent ? (
 <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--color-bg)' }}><div className="text-5xl mb-4">🎂✅</div><h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Siparişiniz Alındı!</h3><p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>En kısa sürede dönüş yapacağız.</p></div>
 ) : (
 <form onSubmit={handleSubmit} className="rounded-2xl p-6 space-y-4" style={{ background: 'var(--color-bg)' }}>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Ad Soyad *</label><input type="text" required value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Adınız" /></div>
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Telefon *</label><input type="tel" required value={form.phone} onChange={(e) => update('phone', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="0555 000 00 00" /></div>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {content.cakeTypes && <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Pasta Türü</label><select value={form.cakeType} onChange={(e) => update('cakeType', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}><option value="">Seçiniz…</option>{content.cakeTypes.map((t) => <option key={t} value={t}>{t}</option>)}</select></div>}
 {content.sizeOptions && <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Boyut</label><select value={form.size} onChange={(e) => update('size', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}><option value="">Seçiniz…</option>{content.sizeOptions.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>}
 </div>
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Teslimat Tarihi</label><input type="date" value={form.date} onChange={(e) => update('date', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} /></div>
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Pasta Üzeri Mesaj</label><input type="text" value={form.message} onChange={(e) => update('message', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="İyi ki doğdun Ayşe!" /></div>
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Notunuz</label><textarea rows={2} value={form.note} onChange={(e) => update('note', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none resize-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Alerji, özel istek…" /></div>
 <button type="submit" className="w-full py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>🎂 Sipariş Ver (WhatsApp)</button>
 {content.note && <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>{content.note}</p>}
 </form>
 )}
 </div>
 </section>
 )
}
registerSection('booking', 'cake_order', CakeOrderForm as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

export { BakeryMenuGrid, BakeryStorySection, CakeGalleryGrid, BakeryStatsRow, CakeOrderForm }
