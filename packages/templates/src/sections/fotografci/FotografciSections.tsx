/**
 * @kepenk/templates — Fotoğrafçı Section Components
 *
 * 1. PhotoPortfolioGrid   — fotoğraf portföyü grid (kategori filtreli)
 * 2. PhotoPackageCards     — çekim paketleri (düğün, doğum, ürün vb.)
 * 3. ClientTestimonials    — müşteri yorumları slider
 * 4. PhotoStatsRow         — istatistikler
 * 5. ShootingBookingForm   — çekim randevusu → WhatsApp
 */

'use client'

import { useState } from 'react'
import type { ComponentType } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// ═══ 1. PHOTO PORTFOLIO GRID ═══

interface PortfolioItem { id: string; emoji: string; title: string; category: string; description?: string }
interface PhotoPortfolioGridContent { badge?: string; title: string; subtitle?: string; categories?: string[]; items: PortfolioItem[] }

function PhotoPortfolioGrid({ content }: SectionProps<PhotoPortfolioGridContent>) {
  const cats = content.categories || [...new Set((content.items || []).map((i) => i.category))]
  const [active, setActive] = useState('Tümü')
  const filtered = active === 'Tümü' ? content.items : (content.items || []).filter((i) => i.category === active)

  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
        {content.subtitle && <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
        <div className="flex flex-wrap gap-2 mb-8">
          {['Tümü', ...cats].map((c) => (
            <button key={c} onClick={() => setActive(c)} className="text-xs font-bold px-4 py-2 rounded-full transition-colors"
              style={{ background: active === c ? 'var(--color-accent)' : 'var(--color-bg)', color: active === c ? 'var(--color-text-on-accent)' : 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {(filtered || []).map((item) => (
            <div key={item.id} className="rounded-2xl border overflow-hidden group cursor-pointer" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
              <div className="flex items-center justify-center" style={{ height: 140, background: 'var(--color-accent-light)' }}>
                <span className="text-5xl group-hover:scale-110 transition-transform">{item.emoji}</span>
              </div>
              <div className="p-3">
                <p className="font-heading font-semibold text-sm truncate" style={{ color: 'var(--color-text)' }}>{item.title}</p>
                <p className="text-xs" style={{ color: 'var(--color-accent)' }}>{item.category}</p>
                {item.description && <p className="text-xs mt-1 line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>{item.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('gallery', 'photo_portfolio_grid', PhotoPortfolioGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 2. PHOTO PACKAGE CARDS ═══

interface PhotoPkg { id: string; emoji: string; name: string; subtitle?: string; price: string; duration?: string; features: string[]; isPopular?: boolean; ctaText?: string; ctaHref?: string }
interface PhotoPackageCardsContent { badge?: string; title: string; subtitle?: string; packages: PhotoPkg[] }

function PhotoPackageCards({ content }: SectionProps<PhotoPackageCardsContent>) {
  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
        {content.subtitle && <p className="text-base mb-10" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(content.packages || []).map((pkg) => (
            <div key={pkg.id} className="rounded-2xl border-2 flex flex-col overflow-hidden relative"
              style={{ background: pkg.isPopular ? 'var(--color-accent)' : 'var(--color-surface)', borderColor: pkg.isPopular ? 'var(--color-accent)' : 'var(--color-border)' }}>
              {pkg.isPopular && <div className="text-xs font-bold text-center py-1.5" style={{ background: 'rgba(0,0,0,0.2)', color: 'var(--color-text-on-accent)' }}>⭐ EN POPÜLER</div>}
              <div className="p-6 flex flex-col flex-1 gap-3">
                <p className="text-4xl">{pkg.emoji}</p>
                <h3 className="font-heading font-bold text-xl" style={{ color: pkg.isPopular ? 'var(--color-text-on-accent)' : 'var(--color-text)' }}>{pkg.name}</h3>
                {pkg.subtitle && <p className="text-sm opacity-80" style={{ color: pkg.isPopular ? 'var(--color-text-on-accent)' : 'var(--color-text-secondary)' }}>{pkg.subtitle}</p>}
                <div>
                  <span className="text-3xl font-bold" style={{ color: pkg.isPopular ? 'var(--color-text-on-accent)' : 'var(--color-accent)' }}>{pkg.price}</span>
                  {pkg.duration && <span className="text-sm opacity-60 ml-1" style={{ color: pkg.isPopular ? 'var(--color-text-on-accent)' : 'var(--color-text-muted)' }}>{pkg.duration}</span>}
                </div>
                <ul className="space-y-1.5 flex-1">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: pkg.isPopular ? 'var(--color-text-on-accent)' : 'var(--color-text-secondary)' }}>
                      <span style={{ color: pkg.isPopular ? 'var(--color-text-on-accent)' : 'var(--color-accent)' }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <a href={pkg.ctaHref || '#'} className="block text-center py-2.5 rounded-full font-bold text-sm mt-2 transition-opacity hover:opacity-90"
                  style={{ background: pkg.isPopular ? 'rgba(0,0,0,0.2)' : 'var(--color-accent)', color: 'var(--color-text-on-accent)', border: pkg.isPopular ? '2px solid rgba(255,255,255,0.4)' : 'none' }}>
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
registerSection('booking', 'photo_package_cards', PhotoPackageCards as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 3. CLIENT TESTIMONIALS ═══

interface Testimonial { id: string; name: string; role?: string; text: string; rating: number; emoji?: string }
interface ClientTestimonialsContent { badge?: string; title: string; subtitle?: string; testimonials: Testimonial[] }

function ClientTestimonials({ content }: SectionProps<ClientTestimonialsContent>) {
  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
        {content.subtitle && <p className="text-base mb-10" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(content.testimonials || []).map((t) => (
            <div key={t.id} className="rounded-2xl border p-5 flex flex-col gap-3" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{t.emoji || '👤'}</span>
                <div>
                  <p className="font-heading font-bold text-sm" style={{ color: 'var(--color-text)' }}>{t.name}</p>
                  {t.role && <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{t.role}</p>}
                </div>
              </div>
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--color-text-secondary)' }}>&ldquo;{t.text}&rdquo;</p>
              <div className="flex gap-0.5">{Array.from({ length: t.rating }).map((_, i) => <span key={i}>⭐</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('social_proof', 'client_testimonials', ClientTestimonials as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 4. PHOTO STATS ROW ═══

interface PhotoStat { value: string; label: string; icon: string }
interface PhotoStatsRowContent { stats: PhotoStat[] }

function PhotoStatsRow({ content }: SectionProps<PhotoStatsRowContent>) {
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
registerSection('social_proof', 'photo_stats_row', PhotoStatsRow as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 5. SHOOTING BOOKING FORM ═══

interface ShootingBookingContent { badge?: string; title: string; subtitle?: string; shootTypes?: string[]; locations?: string[]; whatsapp?: string; phone?: string; note?: string }

function ShootingBookingForm({ content }: SectionProps<ShootingBookingContent>) {
  const [form, setForm] = useState({ name: '', phone: '', shootType: '', date: '', location: '', note: '' })
  const [sent, setSent] = useState(false)
  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    const wa = content.whatsapp || content.phone?.replace(/\D/g, '') || ''
    const msg = `Çekim Talebi%0AAdı: ${encodeURIComponent(form.name)}%0ATel: ${form.phone}${form.shootType ? `%0ATür: ${encodeURIComponent(form.shootType)}` : ''}${form.date ? `%0ATarih: ${form.date}` : ''}${form.location ? `%0AKonum: ${encodeURIComponent(form.location)}` : ''}${form.note ? `%0ANot: ${encodeURIComponent(form.note)}` : ''}`
    window.open(`https://wa.me/${wa}?text=${msg}`, '_blank')
    setSent(true)
  }
  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto" style={{ maxWidth: '580px' }}>
        {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
        {content.subtitle && <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
        {sent ? (
          <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--color-bg)' }}>
            <div className="text-5xl mb-4">📸✅</div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Talebiniz Alındı!</h3>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>En kısa sürede dönüş yapacağız.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-2xl p-6 space-y-4" style={{ background: 'var(--color-bg)' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Ad Soyad *</label>
                <input type="text" required value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Adınız" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Telefon *</label>
                <input type="tel" required value={form.phone} onChange={(e) => update('phone', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="0555 000 00 00" />
              </div>
            </div>
            {content.shootTypes && (
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Çekim Türü</label>
                <select value={form.shootType} onChange={(e) => update('shootType', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                  <option value="">Seçiniz…</option>
                  {content.shootTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Tarih</label>
                <input type="date" value={form.date} onChange={(e) => update('date', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} />
              </div>
              {content.locations && (
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Konum</label>
                  <select value={form.location} onChange={(e) => update('location', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                    <option value="">Seçiniz…</option>
                    {content.locations.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Notunuz</label>
              <textarea rows={2} value={form.note} onChange={(e) => update('note', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none resize-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Konsept fikri, kişi sayısı…" />
            </div>
            <button type="submit" className="w-full py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>📸 Teklif Al (WhatsApp)</button>
            {content.note && <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>{content.note}</p>}
          </form>
        )}
      </div>
    </section>
  )
}
registerSection('booking', 'shooting_booking', ShootingBookingForm as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

export { PhotoPortfolioGrid, PhotoPackageCards, ClientTestimonials, PhotoStatsRow, ShootingBookingForm }
