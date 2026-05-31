/**
 * @kepenk/templates — Organik & Gıda Section Components
 *
 * 5 sector-specific sections:
 * 1. ProductShopGrid — ürün kartları (organik, fiyat, stok, ağırlık)
 * 2. FarmStorySection — çiftlik hikayesi & üretimin arkası
 * 3. NutritionFactsCard — besin değerleri görsel kartı
 * 4. FoodStatsRow — müşteri, sipariş, ürün istatistikleri
 * 5. OrderConsultForm — sipariş / abonelik talebi → WhatsApp
 */

'use client'

import { useState } from 'react'
import type { ComponentType } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// ═══════════════════════════════════════════
// 1. PRODUCT SHOP GRID
// ═══════════════════════════════════════════

interface FoodProduct {
 id: string
 emoji: string
 name: string
 weight?: string
 price: string
 oldPrice?: string
 badge?: string
 category?: string
 origin?: string
 inStock?: boolean
 isOrganic?: boolean
}

interface ProductShopGridContent {
 badge?: string
 title: string
 subtitle?: string
 categories?: string[]
 products: FoodProduct[]
 ctaText?: string
 ctaHref?: string
}

function ProductShopGrid({ content }: SectionProps<ProductShopGridContent>) {
 const [cat, setCat] = useState('Tümü')
 const categories = ['Tümü', ...(content.categories || [])]
 const products = cat === 'Tümü' ? (content.products || []) : (content.products || []).filter((p) => p.category === cat)

 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-bg)' }}>
 <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
 {content.badge && (
 <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
 style={{ color: 'var(--color-accent)' }}>
 {content.badge}
 </span>
 )}
 <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>
 {content.title}
 </h2>
 {content.subtitle && (
 <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
 )}

 {/* Category filter */}
 <div className="flex flex-wrap gap-2 mb-8">
 {categories.map((c) => (
 <button key={c} onClick={() => setCat(c)}
 className="text-xs font-semibold px-4 py-2 rounded-full transition-colors"
 style={{
 background: cat === c ? 'var(--color-accent)' : 'var(--color-surface)',
 color: cat === c ? 'var(--color-text-on-accent)' : 'var(--color-text-secondary)',
 border: '1px solid var(--color-border)',
 }}>
 {c}
 </button>
 ))}
 </div>

 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
 {products.map((p) => (
 <div key={p.id} className="rounded-2xl border overflow-hidden group"
 style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
 {/* Product image / emoji */}
 <div className="flex items-center justify-center relative"
 style={{ height: 140, background: 'var(--color-accent-light)' }}>
 <span className="text-6xl" role="img">{p.emoji}</span>
 <div className="absolute top-2 left-2 flex flex-col gap-1">
 {p.isOrganic && (
 <span className="text-xs font-bold px-2 py-0.5 rounded-full"
 style={{ background: '#16A34A', color: '#fff' }}>🌿 Organik</span>
 )}
 {p.badge && (
 <span className="text-xs font-bold px-2 py-0.5 rounded-full"
 style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>{p.badge}</span>
 )}
 {p.inStock === false && (
 <span className="text-xs font-bold px-2 py-0.5 rounded-full"
 style={{ background: '#6B7280', color: '#fff' }}>Stokta Yok</span>
 )}
 </div>
 </div>
 <div className="p-3">
 <p className="font-heading font-semibold text-sm mb-0.5 line-clamp-1"
 style={{ color: 'var(--color-text)' }}>{p.name}</p>
 {p.weight && (
 <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>⚖️ {p.weight}</p>
 )}
 {p.origin && (
 <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>📍 {p.origin}</p>
 )}
 <div className="flex items-center justify-between mt-2">
 <div>
 <span className="font-bold text-base" style={{ color: 'var(--color-accent)' }}>{p.price}</span>
 {p.oldPrice && (
 <span className="text-xs ml-1 line-through" style={{ color: 'var(--color-text-muted)' }}>{p.oldPrice}</span>
 )}
 </div>
 <a href={`#siparis`}
 className="text-xs font-bold px-2 py-1 rounded-full transition-opacity hover:opacity-80"
 style={{
 background: p.inStock === false ? 'var(--color-surface-muted)' : 'var(--color-accent)',
 color: p.inStock === false ? 'var(--color-text-muted)' : 'var(--color-text-on-accent)',
 pointerEvents: p.inStock === false ? 'none' : 'auto',
 }}>
 {p.inStock === false ? 'Yok' : 'Sipariş'}
 </a>
 </div>
 </div>
 </div>
 ))}
 </div>

 {content.ctaText && (
 <div className="text-center mt-8">
 <a href={content.ctaHref || '#'}
 className="inline-block px-8 py-3 rounded-full font-bold text-sm transition-transform hover:scale-105"
 style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
 {content.ctaText}
 </a>
 </div>
 )}
 </div>
 </section>
 )
}

registerSection('services', 'product_shop_grid', ProductShopGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 2. FARM STORY SECTION
// ═══════════════════════════════════════════

interface FarmStoryContent {
 badge?: string
 title: string
 story: string
 foundedYear?: string
 location?: string
 certifications?: string[]
 values?: Array<{ icon: string; title: string; description: string }>
 ownerName?: string
 ownerTitle?: string
}

function FarmStorySection({ content }: SectionProps<FarmStoryContent>) {
 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
 <div className="mx-auto flex flex-col lg:flex-row gap-10 items-start"
 style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
 {/* Left: story */}
 <div className="flex-1">
 {content.badge && (
 <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
 style={{ color: 'var(--color-accent)' }}>
 {content.badge}
 </span>
 )}
 <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4" style={{ color: 'var(--color-text)' }}>
 {content.title}
 </h2>
 <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--color-text-secondary)' }}>{content.story}</p>
 {content.certifications && (
 <div className="flex flex-wrap gap-2 mb-4">
 {content.certifications.map((c) => (
 <span key={c} className="text-xs font-semibold px-3 py-1 rounded-full border"
 style={{ color: 'var(--color-accent)', borderColor: 'var(--color-accent)' }}>
 🏅 {c}
 </span>
 ))}
 </div>
 )}
 {(content.foundedYear || content.location) && (
 <div className="flex flex-wrap gap-4">
 {content.foundedYear && (
 <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>📅 {content.foundedYear}'den beri</div>
 )}
 {content.location && (
 <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>📍 {content.location}</div>
 )}
 {content.ownerName && (
 <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>👨‍🌾 {content.ownerName}</div>
 )}
 </div>
 )}
 </div>

 {/* Right: values */}
 {content.values && (
 <div className="lg:w-80 shrink-0 space-y-3">
 {content.values.map((v, i) => (
 <div key={i} className="flex items-start gap-3 p-4 rounded-xl"
 style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
 <span className="text-2xl shrink-0">{v.icon}</span>
 <div>
 <p className="font-semibold text-sm mb-0.5" style={{ color: 'var(--color-text)' }}>{v.title}</p>
 <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{v.description}</p>
 </div>
 </div>
 ))}
 </div>
 )}
 </div>
 </section>
 )
}

registerSection('team', 'farm_story', FarmStorySection as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 3. NUTRITION FACTS CARD
// ═══════════════════════════════════════════

interface NutritionFact {
 label: string
 value: string
 unit?: string
 icon?: string
 highlight?: boolean
}

interface NutritionFactsContent {
 badge?: string
 title: string
 subtitle?: string
 productName?: string
 servingSize?: string
 calories?: string
 facts: NutritionFact[]
 note?: string
}

function NutritionFactsCard({ content }: SectionProps<NutritionFactsContent>) {
 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-bg)' }}>
 <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
 {content.badge && (
 <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
 style={{ color: 'var(--color-accent)' }}>
 {content.badge}
 </span>
 )}
 <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>
 {content.title}
 </h2>
 {content.subtitle && (
 <p className="text-base mb-8" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
 )}

 <div className="flex flex-col lg:flex-row gap-8">
 {/* Nutrition facts panel */}
 <div className="rounded-2xl overflow-hidden border"
 style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', maxWidth: 360 }}>
 <div className="p-4" style={{ background: 'var(--color-accent)' }}>
 <p className="font-heading font-bold text-2xl" style={{ color: 'var(--color-text-on-accent)' }}>
 Besin Değerleri
 </p>
 {content.productName && (
 <p className="text-sm opacity-80" style={{ color: 'var(--color-text-on-accent)' }}>{content.productName}</p>
 )}
 {content.servingSize && (
 <p className="text-xs opacity-70" style={{ color: 'var(--color-text-on-accent)' }}>Porsiyon: {content.servingSize}</p>
 )}
 </div>
 {content.calories && (
 <div className="px-4 py-3 border-b flex items-baseline justify-between"
 style={{ borderColor: 'var(--color-border)' }}>
 <span className="font-bold" style={{ color: 'var(--color-text)' }}>Kalori</span>
 <span className="text-3xl font-bold" style={{ color: 'var(--color-accent)' }}>{content.calories}</span>
 </div>
 )}
 <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
 {(content.facts || []).map((f, i) => (
 <div key={i} className="px-4 py-2.5 flex items-center justify-between">
 <span className="text-sm flex items-center gap-2"
 style={{ color: f.highlight ? 'var(--color-accent)' : 'var(--color-text-secondary)', fontWeight: f.highlight ? 600 : 400 }}>
 {f.icon && f.icon} {f.label}
 </span>
 <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
 {f.value}{f.unit ? ` ${f.unit}` : ''}
 </span>
 </div>
 ))}
 </div>
 {content.note && (
 <p className="text-xs p-3" style={{ color: 'var(--color-text-muted)' }}>{content.note}</p>
 )}
 </div>

 {/* Highlights */}
 <div className="flex-1">
 <div className="grid grid-cols-2 gap-4">
 {(content.facts || []).filter((f) => f.highlight).map((f, i) => (
 <div key={i} className="rounded-2xl p-5 flex flex-col items-center justify-center text-center"
 style={{ background: 'var(--color-accent-light)', border: '1px solid var(--color-border)' }}>
 {f.icon && <p className="text-3xl mb-2">{f.icon}</p>}
 <p className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>
 {f.value}{f.unit ? ` ${f.unit}` : ''}
 </p>
 <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{f.label}</p>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 </section>
 )
}

registerSection('gallery', 'nutrition_facts', NutritionFactsCard as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 4. FOOD STATS ROW
// ═══════════════════════════════════════════

interface FoodStat { value: string; label: string; icon: string }
interface FoodStatsRowContent { stats: FoodStat[] }

function FoodStatsRow({ content }: SectionProps<FoodStatsRowContent>) {
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

registerSection('social_proof', 'food_stats_row', FoodStatsRow as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 5. ORDER CONSULT FORM
// ═══════════════════════════════════════════

interface OrderConsultContent {
 badge?: string
 title: string
 subtitle?: string
 plans?: string[]
 frequencies?: string[]
 whatsapp?: string
 phone?: string
 hasSubscription?: boolean
 freeDeliveryNote?: string
 note?: string
}

function OrderConsultForm({ content }: SectionProps<OrderConsultContent>) {
 const [form, setForm] = useState({ name: '', phone: '', plan: '', frequency: '', address: '', note: '' })
 const [sent, setSent] = useState(false)
 const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault()
 if (!form.name || !form.phone) return
 const waNum = content.whatsapp || content.phone?.replace(/\D/g, '') || ''
 const msg = `Organik Sipariş / Abonelik%0AAdı: ${encodeURIComponent(form.name)}%0ATelefon: ${form.phone}${form.plan ? `%0APaket: ${encodeURIComponent(form.plan)}` : ''}${form.frequency ? `%0ASıklık: ${encodeURIComponent(form.frequency)}` : ''}${form.address ? `%0AAdres: ${encodeURIComponent(form.address)}` : ''}${form.note ? `%0ANot: ${encodeURIComponent(form.note)}` : ''}`
 window.open(`https://wa.me/${waNum}?text=${msg}`, '_blank')
 setSent(true)
 }

 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
 <div className="mx-auto" style={{ maxWidth: '580px' }}>
 {content.badge && (
 <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
 style={{ color: 'var(--color-accent)' }}>
 {content.badge}
 </span>
 )}
 <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>
 {content.title}
 </h2>
 {content.subtitle && (
 <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
 )}
 {content.freeDeliveryNote && (
 <div className="mb-5 p-4 rounded-xl flex items-center gap-3"
 style={{ background: 'var(--color-accent-light)', border: '1px solid var(--color-accent)' }}>
 <span className="text-2xl">🚚</span>
 <p className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>{content.freeDeliveryNote}</p>
 </div>
 )}

 {sent ? (
 <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--color-bg)' }}>
 <div className="text-5xl mb-4">🌱✅</div>
 <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Siparişiniz Alındı!</h3>
 <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>En kısa sürede sizi arayacağız.</p>
 </div>
 ) : (
 <form onSubmit={handleSubmit} className="rounded-2xl p-6 space-y-4"
 style={{ background: 'var(--color-bg)' }}>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Ad Soyad *</label>
 <input type="text" required value={form.name} onChange={(e) => update('name', e.target.value)}
 className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
 style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
 placeholder="Adınız Soyadınız" />
 </div>
 <div>
 <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Telefon *</label>
 <input type="tel" required value={form.phone} onChange={(e) => update('phone', e.target.value)}
 className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
 style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
 placeholder="0555 000 00 00" />
 </div>
 </div>
 {content.plans && (
 <div>
 <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Paket</label>
 <select value={form.plan} onChange={(e) => update('plan', e.target.value)}
 className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
 style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
 <option value="">Seçiniz…</option>
 {content.plans.map((p) => <option key={p} value={p}>{p}</option>)}
 </select>
 </div>
 )}
 {content.hasSubscription && content.frequencies && (
 <div>
 <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Teslimat Sıklığı</label>
 <select value={form.frequency} onChange={(e) => update('frequency', e.target.value)}
 className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
 style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
 <option value="">Seçiniz…</option>
 {content.frequencies.map((f) => <option key={f} value={f}>{f}</option>)}
 </select>
 </div>
 )}
 <div>
 <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Teslimat Adresi</label>
 <input type="text" value={form.address} onChange={(e) => update('address', e.target.value)}
 className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
 style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
 placeholder="Mahalleniz ve ilçe" />
 </div>
 <div>
 <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Notunuz</label>
 <textarea rows={2} value={form.note} onChange={(e) => update('note', e.target.value)}
 className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none resize-none"
 style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
 placeholder="Alerjiniz, tercih ettiğiniz ürünler…" />
 </div>
 <button type="submit"
 className="w-full py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
 style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
 🌿 Sipariş Ver / Abone Ol (WhatsApp)
 </button>
 {content.note && (
 <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>{content.note}</p>
 )}
 </form>
 )}
 </div>
 </section>
 )
}

registerSection('booking', 'order_consult', OrderConsultForm as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ Exports ═══
export { ProductShopGrid, FarmStorySection, NutritionFactsCard, FoodStatsRow, OrderConsultForm }
