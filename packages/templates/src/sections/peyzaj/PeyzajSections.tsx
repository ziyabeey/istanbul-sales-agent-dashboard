/**
 * @kepenk/templates — Peyzaj & Bahçe Section Components
 *
 * 5 sector-specific sections:
 * 1. ProjectPortfolioGrid — bahçe/peyzaj proje öncesi/sonrası galeri
 * 2. PlantCatalog — bitki kataloğu (tür, bakım, fiyat)
 * 3. LandscapePackages — peyzaj paketleri (küçük bahçe, villa, teras)
 * 4. GardenStatsRow — proje, m², müşteri istatistikleri
 * 5. GardenConsultForm — keşif/teklif talep formu → WhatsApp
 */

'use client'

import { useState } from 'react'
import type { ComponentType } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// ═══════════════════════════════════════════
// 1. PROJECT PORTFOLIO GRID
// ═══════════════════════════════════════════

interface PortfolioProject {
 id: string
 title: string
 type: string // Villa Bahçesi, Teras, Çatı Bahçesi vb.
 area?: string // m²
 duration?: string // Süre
 beforeEmoji?: string
 afterEmoji?: string
 description?: string
 tag?: string
}

interface ProjectPortfolioGridContent {
 badge?: string
 title: string
 subtitle?: string
 projects: PortfolioProject[]
 ctaText?: string
 ctaHref?: string
}

function ProjectPortfolioGrid({ content }: SectionProps<ProjectPortfolioGridContent>) {
 const [active, setActive] = useState<string | null>(null)

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
 <p className="text-base mb-10" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
 )}

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
 {(content.projects || []).map((p) => (
 <div key={p.id}
 className="rounded-2xl overflow-hidden border cursor-pointer transition-shadow hover:shadow-xl"
 style={{ background: 'var(--color-surface)', borderColor: active === p.id ? 'var(--color-accent)' : 'var(--color-border)' }}
 onClick={() => setActive(active === p.id ? null : p.id)}>
 {/* Before/After visual placeholder */}
 <div className="flex" style={{ height: 160, background: 'var(--color-surface-muted)' }}>
 <div className="flex-1 flex items-center justify-center text-5xl relative">
 <span>{p.beforeEmoji || '🪨'}</span>
 <span className="absolute bottom-2 left-2 text-xs font-bold px-2 py-0.5 rounded"
 style={{ background: 'rgba(0,0,0,0.5)', color: '#fff' }}>ÖNCE</span>
 </div>
 <div className="w-px" style={{ background: 'var(--color-accent)' }} />
 <div className="flex-1 flex items-center justify-center text-5xl relative"
 style={{ background: 'var(--color-accent-light)' }}>
 <span>{p.afterEmoji || '🌿'}</span>
 <span className="absolute bottom-2 right-2 text-xs font-bold px-2 py-0.5 rounded"
 style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>SONRA</span>
 </div>
 </div>

 <div className="p-4">
 <div className="flex items-start justify-between gap-2 mb-1">
 <h3 className="font-heading font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{p.title}</h3>
 {p.tag && (
 <span className="text-xs shrink-0 px-2 py-0.5 rounded-full"
 style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>{p.tag}</span>
 )}
 </div>
 <p className="text-xs mb-2" style={{ color: 'var(--color-text-muted)' }}>
 {p.type}{p.area ? ` • ${p.area}` : ''}{p.duration ? ` • ${p.duration}` : ''}
 </p>
 {active === p.id && p.description && (
 <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{p.description}</p>
 )}
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

registerSection('gallery', 'project_portfolio_grid', ProjectPortfolioGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 2. PLANT CATALOG
// ═══════════════════════════════════════════

interface PlantItem {
 id: string
 emoji: string
 name: string
 latinName?: string
 category?: string
 care?: string // Kolay/Orta/Zor
 sunlight?: string
 water?: string
 price?: string
 description?: string
}

interface PlantCatalogContent {
 badge?: string
 title: string
 subtitle?: string
 categories?: string[]
 plants: PlantItem[]
}

function PlantCatalog({ content }: SectionProps<PlantCatalogContent>) {
 const [cat, setCat] = useState('Tümü')
 const categories = ['Tümü', ...(content.categories || [])]
 const plants = cat === 'Tümü' ? (content.plants || []) : (content.plants || []).filter((p) => p.category === cat)

 const careColor = (c?: string) => {
 if (c === 'Kolay') return { bg: '#DCFCE7', text: '#16A34A' }
 if (c === 'Orta') return { bg: '#FEF9C3', text: '#B45309' }
 return { bg: '#FEE2E2', text: '#DC2626' }
 }

 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
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
 background: cat === c ? 'var(--color-accent)' : 'var(--color-bg)',
 color: cat === c ? 'var(--color-text-on-accent)' : 'var(--color-text-secondary)',
 border: '1px solid var(--color-border)',
 }}>
 {c}
 </button>
 ))}
 </div>

 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
 {plants.map((p) => {
 const cc = careColor(p.care)
 return (
 <div key={p.id} className="rounded-2xl border p-4 flex flex-col gap-2"
 style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
 <p className="text-4xl text-center">{p.emoji}</p>
 <h3 className="font-heading font-semibold text-sm text-center" style={{ color: 'var(--color-text)' }}>
 {p.name}
 </h3>
 {p.latinName && (
 <p className="text-xs text-center italic" style={{ color: 'var(--color-text-muted)' }}>{p.latinName}</p>
 )}
 <div className="flex flex-wrap gap-1 justify-center">
 {p.care && (
 <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: cc.bg, color: cc.text }}>
 {p.care}
 </span>
 )}
 {p.sunlight && (
 <span className="text-xs px-2 py-0.5 rounded-full"
 style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
 ☀️ {p.sunlight}
 </span>
 )}
 </div>
 {p.water && (
 <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>💧 {p.water}</p>
 )}
 {p.price && (
 <p className="text-xs font-bold text-center" style={{ color: 'var(--color-accent)' }}>{p.price}</p>
 )}
 </div>
 )
 })}
 </div>
 </div>
 </section>
 )
}

registerSection('services', 'plant_catalog', PlantCatalog as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 3. LANDSCAPE PACKAGES
// ═══════════════════════════════════════════

interface LandscapePackage {
 id: string
 emoji: string
 name: string
 subtitle?: string
 areaRange?: string
 price?: string
 features: string[]
 isPopular?: boolean
 ctaText?: string
 ctaHref?: string
}

interface LandscapePackagesContent {
 badge?: string
 title: string
 subtitle?: string
 packages: LandscapePackage[]
}

function LandscapePackages({ content }: SectionProps<LandscapePackagesContent>) {
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
 <p className="text-base mb-10" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
 )}

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
 {(content.packages || []).map((pkg) => (
 <div key={pkg.id}
 className="rounded-2xl border-2 flex flex-col overflow-hidden relative"
 style={{
 background: pkg.isPopular ? 'var(--color-accent)' : 'var(--color-surface)',
 borderColor: pkg.isPopular ? 'var(--color-accent)' : 'var(--color-border)',
 }}>
 {pkg.isPopular && (
 <div className="text-xs font-bold text-center py-1.5"
 style={{ background: 'rgba(0,0,0,0.2)', color: 'var(--color-text-on-accent)' }}>
 ⭐ EN ÇOK TERCİH
 </div>
 )}
 <div className="p-6 flex flex-col flex-1 gap-3">
 <p className="text-4xl">{pkg.emoji}</p>
 <h3 className="font-heading font-bold text-xl"
 style={{ color: pkg.isPopular ? 'var(--color-text-on-accent)' : 'var(--color-text)' }}>
 {pkg.name}
 </h3>
 {pkg.subtitle && (
 <p className="text-sm opacity-80"
 style={{ color: pkg.isPopular ? 'var(--color-text-on-accent)' : 'var(--color-text-secondary)' }}>
 {pkg.subtitle}
 </p>
 )}
 {pkg.areaRange && (
 <p className="text-xs font-semibold"
 style={{ color: pkg.isPopular ? 'rgba(255,255,255,0.8)' : 'var(--color-text-muted)' }}>
 📐 {pkg.areaRange}
 </p>
 )}
 {pkg.price && (
 <p className="text-2xl font-bold"
 style={{ color: pkg.isPopular ? 'var(--color-text-on-accent)' : 'var(--color-accent)' }}>
 {pkg.price}
 </p>
 )}
 <ul className="space-y-1.5 flex-1">
 {pkg.features.map((f, i) => (
 <li key={i} className="flex items-start gap-2 text-sm"
 style={{ color: pkg.isPopular ? 'var(--color-text-on-accent)' : 'var(--color-text-secondary)' }}>
 <span style={{ color: pkg.isPopular ? 'var(--color-text-on-accent)' : 'var(--color-accent)' }}>✓</span>
 {f}
 </li>
 ))}
 </ul>
 <a href={pkg.ctaHref || '#'}
 className="block text-center py-2.5 rounded-full font-bold text-sm mt-2 transition-opacity hover:opacity-90"
 style={{
 background: pkg.isPopular ? 'rgba(0,0,0,0.2)' : 'var(--color-accent)',
 color: 'var(--color-text-on-accent)',
 border: pkg.isPopular ? '2px solid rgba(255,255,255,0.4)' : 'none',
 }}>
 {pkg.ctaText || 'Teklif Al'}
 </a>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}

registerSection('booking', 'landscape_packages', LandscapePackages as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 4. GARDEN STATS ROW
// ═══════════════════════════════════════════

interface GardenStat {
 value: string
 label: string
 icon: string
}

interface GardenStatsRowContent {
 stats: GardenStat[]
}

function GardenStatsRow({ content }: SectionProps<GardenStatsRowContent>) {
 return (
 <section className="py-10 px-4" style={{ background: 'var(--color-accent)' }}>
 <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
 <div className="flex flex-wrap justify-center gap-8 md:gap-14">
 {(content.stats || []).map((s, i) => (
 <div key={i} className="text-center">
 <p className="text-3xl mb-1">{s.icon}</p>
 <p className="text-2xl md:text-3xl font-heading font-bold"
 style={{ color: 'var(--color-text-on-accent)' }}>{s.value}</p>
 <p className="text-xs opacity-80" style={{ color: 'var(--color-text-on-accent)' }}>{s.label}</p>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}

registerSection('social_proof', 'garden_stats_row', GardenStatsRow as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 5. GARDEN CONSULT FORM
// ═══════════════════════════════════════════

interface GardenConsultContent {
 badge?: string
 title: string
 subtitle?: string
 gardenTypes?: string[]
 services?: string[]
 whatsapp?: string
 phone?: string
 isFreeVisit?: boolean
 note?: string
}

function GardenConsultForm({ content }: SectionProps<GardenConsultContent>) {
 const [form, setForm] = useState({ name: '', phone: '', district: '', type: '', service: '', area: '', note: '' })
 const [sent, setSent] = useState(false)
 const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault()
 if (!form.name || !form.phone) return
 const waNum = content.whatsapp || content.phone?.replace(/\D/g, '') || ''
 const msg = `Bahçe/Peyzaj Danışmanlık%0AAdı: ${encodeURIComponent(form.name)}%0ATelefon: ${form.phone}${form.district ? `%0ASemt: ${encodeURIComponent(form.district)}` : ''}${form.type ? `%0ABahçe Tipi: ${encodeURIComponent(form.type)}` : ''}${form.service ? `%0AHizmet: ${encodeURIComponent(form.service)}` : ''}${form.area ? `%0AM²: ${form.area}` : ''}${form.note ? `%0ANot: ${encodeURIComponent(form.note)}` : ''}`
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
 {content.isFreeVisit && (
 <div className="mb-5 p-4 rounded-xl flex items-center gap-3"
 style={{ background: 'var(--color-accent-light)', border: '1px solid var(--color-accent)' }}>
 <span className="text-2xl">🌿</span>
 <p className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
 <strong>Ücretsiz keşif</strong> yapıyor ve teklif hazırlıyoruz
 </p>
 </div>
 )}

 {sent ? (
 <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--color-bg)' }}>
 <div className="text-5xl mb-4">🌱✅</div>
 <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Talebiniz Alındı</h3>
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
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Semt / İlçe</label>
 <input type="text" value={form.district} onChange={(e) => update('district', e.target.value)}
 className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
 style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
 placeholder="Beşiktaş, Maltepe vb." />
 </div>
 <div>
 <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Bahçe m²</label>
 <input type="number" value={form.area} onChange={(e) => update('area', e.target.value)}
 className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
 style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
 placeholder="250" />
 </div>
 </div>
 {content.gardenTypes && (
 <div>
 <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Bahçe Tipi</label>
 <select value={form.type} onChange={(e) => update('type', e.target.value)}
 className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
 style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
 <option value="">Seçiniz…</option>
 {content.gardenTypes.map((t) => <option key={t} value={t}>{t}</option>)}
 </select>
 </div>
 )}
 {content.services && (
 <div>
 <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Hizmet</label>
 <select value={form.service} onChange={(e) => update('service', e.target.value)}
 className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
 style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
 <option value="">Seçiniz…</option>
 {content.services.map((s) => <option key={s} value={s}>{s}</option>)}
 </select>
 </div>
 )}
 <div>
 <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Notunuz</label>
 <textarea rows={2} value={form.note} onChange={(e) => update('note', e.target.value)}
 className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none resize-none"
 style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
 placeholder="Beklentileriniz, özel istekler…" />
 </div>
 <button type="submit"
 className="w-full py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
 style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
 🌿 Ücretsiz Keşif Talebi (WhatsApp)
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

registerSection('booking', 'garden_consult', GardenConsultForm as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ Exports ═══
export { ProjectPortfolioGrid, PlantCatalog, LandscapePackages, GardenStatsRow, GardenConsultForm }
