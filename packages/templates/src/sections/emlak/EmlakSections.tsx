/**
 * @kepenk/templates — Emlak & Gayrimenkul Section Components
 *
 * 5 sector-specific sections:
 * 1. PropertyListingGrid   — ilan kartları (fiyat, oda, m², konum)
 * 2. AgentProfileCard      — emlak danışmanı profili + sertifika
 * 3. NeighborhoodMap       — ilçe/semt bazlı interaktif filtre
 * 4. RealEstateStatsRow    — portföy, satış, müşteri istatistikleri
 * 5. ValuationRequestForm  — ekspertiz/değerleme talep formu → WhatsApp
 */

'use client'

import { useState } from 'react'
import type { ComponentType } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// ═══════════════════════════════════════════
// 1. PROPERTY LISTING GRID
// ═══════════════════════════════════════════

interface PropertyListing {
  id: string
  type: string         // Daire, Villa, Dükkan vb.
  title: string
  district: string
  price: string
  area?: string        // m²
  rooms?: string       // 2+1, 3+1 vb.
  floor?: string
  status?: 'sale' | 'rent'
  tag?: string
  image?: string
  emoji?: string
}

interface PropertyListingGridContent {
  badge?: string
  title: string
  subtitle?: string
  properties: PropertyListing[]
  ctaText?: string
  ctaHref?: string
}

function PropertyListingGrid({ content }: SectionProps<PropertyListingGridContent>) {
  const [filter, setFilter] = useState<'all' | 'sale' | 'rent'>('all')
  const properties = (content.properties || []).filter((p) => filter === 'all' || p.status === filter)

  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {content.badge && (
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: 'var(--color-accent)' }}>
            {content.badge}
          </span>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold" style={{ color: 'var(--color-text)' }}>
              {content.title}
            </h2>
            {content.subtitle && (
              <p className="text-base mt-1" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
            )}
          </div>
          <div className="flex gap-2 shrink-0">
            {(['all', 'sale', 'rent'] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className="text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                style={{
                  background: filter === f ? 'var(--color-accent)' : 'var(--color-surface)',
                  color: filter === f ? 'var(--color-text-on-accent)' : 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                }}>
                {f === 'all' ? 'Tümü' : f === 'sale' ? 'Satılık' : 'Kiralık'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {properties.map((p) => (
            <div key={p.id}
              className="rounded-2xl overflow-hidden border transition-shadow hover:shadow-xl"
              style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              {/* Image / Emoji placeholder */}
              <div className="w-full relative" style={{ height: 180, background: 'var(--color-surface-muted)' }}>
                {p.image ? (
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${p.image})` }} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl">
                    {p.emoji || '🏠'}
                  </div>
                )}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: p.status === 'rent' ? '#7C3AED' : 'var(--color-accent)', color: '#fff' }}>
                    {p.status === 'rent' ? 'KİRALIK' : 'SATILIK'}
                  </span>
                  {p.tag && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/90"
                      style={{ color: 'var(--color-accent)' }}>{p.tag}</span>
                  )}
                </div>
              </div>

              <div className="p-4">
                <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--color-text-muted)' }}>
                  {p.type} • {p.district}
                </p>
                <h3 className="font-heading font-semibold text-sm mb-2 line-clamp-1"
                  style={{ color: 'var(--color-text)' }}>
                  {p.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {p.area && (
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                      📐 {p.area}
                    </span>
                  )}
                  {p.rooms && (
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                      🛏 {p.rooms}
                    </span>
                  )}
                  {p.floor && (
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                      🏢 {p.floor}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg" style={{ color: 'var(--color-accent)' }}>{p.price}</span>
                  <a href={`#contact`}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full transition-opacity hover:opacity-80"
                    style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
                    İletişim
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

registerSection('services', 'property_listing_grid', PropertyListingGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 2. AGENT PROFILE CARD
// ═══════════════════════════════════════════

interface AgentProfileContent {
  badge?: string
  name: string
  title: string
  photo?: string
  bio?: string
  experience: string
  transactionCount?: string
  rating?: string
  specializations?: string[]
  certifications?: string[]
  languages?: string[]
  phone?: string
  whatsapp?: string
  email?: string
}

function AgentProfileCard({ content }: SectionProps<AgentProfileContent>) {
  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto flex flex-col lg:flex-row gap-10 items-start"
        style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {/* Photo */}
        <div className="shrink-0 w-full lg:w-52">
          <div className="rounded-2xl overflow-hidden mx-auto lg:mx-0"
            style={{ width: 200, height: 260, background: 'var(--color-bg)', maxWidth: '100%' }}>
            {content.photo
              ? <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${content.photo})` }} />
              : <div className="w-full h-full flex items-center justify-center text-7xl">🏠</div>
            }
          </div>
          <div className="mt-3 space-y-1.5">
            {[{ l: 'Deneyim', v: content.experience }, { l: 'İşlem', v: content.transactionCount }, { l: 'Puan', v: content.rating }]
              .filter((s) => s.v).map((s) => (
                <div key={s.l} className="flex justify-between text-sm px-1"
                  style={{ color: 'var(--color-text-secondary)' }}>
                  <span>{s.l}</span>
                  <span className="font-bold" style={{ color: 'var(--color-accent)' }}>{s.v}</span>
                </div>
              ))}
          </div>
          {content.phone && (
            <a href={`tel:${content.phone.replace(/\D/g, '')}`}
              className="mt-3 block text-center text-sm font-bold px-4 py-2.5 rounded-full transition-opacity hover:opacity-90"
              style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
              📞 {content.phone}
            </a>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          {content.badge && (
            <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: 'var(--color-accent)' }}>
              {content.badge}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-1" style={{ color: 'var(--color-text)' }}>
            {content.name}
          </h2>
          <p className="text-base font-medium mb-4" style={{ color: 'var(--color-accent)' }}>{content.title}</p>
          {content.bio && (
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--color-text-secondary)' }}>{content.bio}</p>
          )}
          {content.specializations && (
            <div className="flex flex-wrap gap-2 mb-4">
              {content.specializations.map((s) => (
                <span key={s} className="text-xs px-3 py-1 rounded-full"
                  style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                  {s}
                </span>
              ))}
            </div>
          )}
          {content.certifications && (
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>🏅 Sertifikalar</p>
              {content.certifications.map((c) => (
                <p key={c} className="text-sm mb-0.5" style={{ color: 'var(--color-text-secondary)' }}>✓ {c}</p>
              ))}
            </div>
          )}
          {content.languages && (
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              🌐 {content.languages.join(', ')}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

registerSection('team', 'agent_profile', AgentProfileCard as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 3. NEIGHBORHOOD MAP (text-based)
// ═══════════════════════════════════════════

interface NeighborhoodInfo {
  id: string
  name: string
  avgPrice?: string
  propertyCount?: string
  features?: string[]
  emoji?: string
}

interface NeighborhoodMapContent {
  badge?: string
  title: string
  subtitle?: string
  neighborhoods: NeighborhoodInfo[]
}

function NeighborhoodMap({ content }: SectionProps<NeighborhoodMapContent>) {
  const [active, setActive] = useState<string | null>(null)
  const neighborhoods = content.neighborhoods || []
  const activeNbh = neighborhoods.find((n) => n.id === active)

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

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Neighborhood tiles */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {neighborhoods.map((n) => (
              <button key={n.id}
                className="rounded-xl p-4 text-left transition-all"
                style={{
                  background: active === n.id ? 'var(--color-accent)' : 'var(--color-surface)',
                  border: `1px solid ${active === n.id ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  color: active === n.id ? 'var(--color-text-on-accent)' : 'var(--color-text)',
                }}
                onClick={() => setActive(active === n.id ? null : n.id)}>
                <p className="text-2xl mb-1">{n.emoji || '📍'}</p>
                <p className="font-semibold text-sm">{n.name}</p>
                {n.avgPrice && (
                  <p className="text-xs mt-1 opacity-80">{n.avgPrice}</p>
                )}
              </button>
            ))}
          </div>

          {/* Neighborhood detail */}
          <div className="lg:w-72 shrink-0">
            {activeNbh ? (
              <div className="rounded-2xl p-5 h-full"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                <p className="text-3xl mb-2">{activeNbh.emoji || '📍'}</p>
                <h3 className="font-heading font-bold text-xl mb-2" style={{ color: 'var(--color-text)' }}>
                  {activeNbh.name}
                </h3>
                {activeNbh.avgPrice && (
                  <div className="mb-2">
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Ortalama Fiyat</p>
                    <p className="font-bold text-lg" style={{ color: 'var(--color-accent)' }}>{activeNbh.avgPrice}</p>
                  </div>
                )}
                {activeNbh.propertyCount && (
                  <div className="mb-3">
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Portföy</p>
                    <p className="font-semibold" style={{ color: 'var(--color-text)' }}>{activeNbh.propertyCount} İlan</p>
                  </div>
                )}
                {activeNbh.features && (
                  <ul className="space-y-1">
                    {activeNbh.features.map((f) => (
                      <li key={f} className="text-sm flex items-start gap-2"
                        style={{ color: 'var(--color-text-secondary)' }}>
                        <span style={{ color: 'var(--color-accent)' }}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <div className="rounded-2xl p-5 h-full flex items-center justify-center"
                style={{ background: 'var(--color-surface)', border: '2px dashed var(--color-border)' }}>
                <p className="text-sm text-center" style={{ color: 'var(--color-text-muted)' }}>
                  Semt seçin, detayları görün ↑
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

registerSection('gallery', 'neighborhood_map', NeighborhoodMap as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 4. REAL ESTATE STATS ROW
// ═══════════════════════════════════════════

interface RealEstateStat {
  value: string
  label: string
  icon: string
}

interface RealEstateStatsRowContent {
  stats: RealEstateStat[]
}

function RealEstateStatsRow({ content }: SectionProps<RealEstateStatsRowContent>) {
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

registerSection('social_proof', 'real_estate_stats', RealEstateStatsRow as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 5. VALUATION REQUEST FORM
// ═══════════════════════════════════════════

interface ValuationFormContent {
  badge?: string
  title: string
  subtitle?: string
  propertyTypes?: string[]
  purposes?: string[]
  whatsapp?: string
  phone?: string
  isFreeValuation?: boolean
  note?: string
}

function ValuationRequestForm({ content }: SectionProps<ValuationFormContent>) {
  const [form, setForm] = useState({ name: '', phone: '', district: '', type: '', purpose: '', area: '' })
  const [sent, setSent] = useState(false)
  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    const waNum = content.whatsapp || content.phone?.replace(/\D/g, '') || ''
    const msg = `Emlak Değerleme Talebi%0AAdı: ${encodeURIComponent(form.name)}%0ATelefon: ${form.phone}${form.district ? `%0ASemt: ${encodeURIComponent(form.district)}` : ''}${form.type ? `%0ATapu: ${encodeURIComponent(form.type)}` : ''}${form.purpose ? `%0AAmaç: ${encodeURIComponent(form.purpose)}` : ''}${form.area ? `%0AM²: ${form.area}` : ''}`
    window.open(`https://wa.me/${waNum}?text=${msg}`, '_blank')
    setSent(true)
  }

  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto" style={{ maxWidth: '600px' }}>
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
        {content.isFreeValuation && (
          <div className="mb-5 p-4 rounded-xl flex items-center gap-3"
            style={{ background: 'var(--color-accent-light)', border: '1px solid var(--color-accent)' }}>
            <span className="text-2xl">🏷️</span>
            <p className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
              Ücretsiz <strong>piyasa değer analizi</strong> yapıyoruz
            </p>
          </div>
        )}

        {sent ? (
          <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--color-bg)' }}>
            <div className="text-5xl mb-4">🏠✅</div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Talebiniz Alındı</h3>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>En kısa sürede dönüş yapacağız.</p>
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
                  placeholder="Kadıköy, Beşiktaş vb." />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>m²</label>
                <input type="number" value={form.area} onChange={(e) => update('area', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  placeholder="120" />
              </div>
            </div>
            {content.propertyTypes && (
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Mülk Tipi</label>
                <select value={form.type} onChange={(e) => update('type', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                  <option value="">Seçiniz…</option>
                  {content.propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            )}
            {content.purposes && (
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Amaç</label>
                <select value={form.purpose} onChange={(e) => update('purpose', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                  <option value="">Seçiniz…</option>
                  {content.purposes.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            )}
            <button type="submit"
              className="w-full py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
              style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
              🏠 Değerleme Talebi Gönder (WhatsApp)
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

registerSection('booking', 'valuation_request', ValuationRequestForm as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ Exports ═══
export { PropertyListingGrid, AgentProfileCard, NeighborhoodMap, RealEstateStatsRow, ValuationRequestForm }
