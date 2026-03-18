/**
 * @kepenk/templates — Oto Servis & Tamir Section Components
 *
 * 5 sector-specific sections:
 * 1. ServicePriceGrid    — hizmet + fiyat kartları
 * 2. VehicleAppointment  — araç bilgisi alarak randevu formu
 * 3. MaintenancePackages — bakım paket kartları (basic/full/premium)
 * 4. WorkshopPhotoGrid   — atölye fotoğraf galerisi
 * 5. ServiceStatsRow     — ustalar, yıl, araç sayısı istatistik satırı
 */

'use client'

import { useState } from 'react'
import type { ComponentType } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// ═══════════════════════════════════════════
// 1. SERVICE PRICE GRID
// ═══════════════════════════════════════════

interface OtoService {
  id: string
  icon: string
  name: string
  duration?: string
  price?: string
  description?: string
}

interface ServicePriceGridContent {
  badge?: string
  title: string
  subtitle?: string
  services: OtoService[]
  ctaText?: string
  ctaHref?: string
}

function ServicePriceGrid({ content }: SectionProps<ServicePriceGridContent>) {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(content.services || []).map((s) => (
            <div key={s.id}
              className="rounded-xl border p-5 flex gap-4 items-start transition-shadow hover:shadow-md"
              style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              <span className="text-2xl shrink-0">{s.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-sm mb-1" style={{ color: 'var(--color-text)' }}>
                  {s.name}
                </h3>
                {s.description && (
                  <p className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>{s.description}</p>
                )}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  {s.duration && (
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>⏱ {s.duration}</span>
                  )}
                  {s.price && (
                    <span className="font-bold text-sm" style={{ color: 'var(--color-accent)' }}>{s.price}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {content.ctaText && (
          <div className="text-center mt-8">
            <a href={content.ctaHref || '#'}
              className="inline-block px-8 py-3 rounded-xl font-bold text-sm transition-transform hover:scale-105"
              style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
              {content.ctaText}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

registerSection('services', 'service_price_grid', ServicePriceGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 2. VEHICLE APPOINTMENT FORM
// ═══════════════════════════════════════════

interface VehicleAppointmentContent {
  badge?: string
  title: string
  subtitle?: string
  serviceTypes?: string[]
  whatsapp?: string
  phone?: string
  note?: string
}

function VehicleAppointment({ content }: SectionProps<VehicleAppointmentContent>) {
  const [form, setForm] = useState({ name: '', phone: '', plate: '', brand: '', service: '', date: '' })
  const [sent, setSent] = useState(false)

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    const waNum = content.whatsapp || content.phone?.replace(/\D/g, '') || ''
    const msg = `Servis Randevu Talebi%0AAdı: ${encodeURIComponent(form.name)}%0ATelefon: ${form.phone}${form.plate ? `%0APlaka: ${form.plate}` : ''}${form.brand ? `%0AAraç: ${encodeURIComponent(form.brand)}` : ''}${form.service ? `%0AHizmet: ${encodeURIComponent(form.service)}` : ''}${form.date ? `%0ATercih Gün: ${form.date}` : ''}`
    window.open(`https://wa.me/${waNum}?text=${msg}`, '_blank')
    setSent(true)
  }

  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto" style={{ maxWidth: '640px' }}>
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

        {sent ? (
          <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--color-bg)' }}>
            <div className="text-5xl mb-4">🚗✅</div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Randevu Talebiniz Alındı</h3>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>WhatsApp üzerinden onay gelecek.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-2xl p-6 space-y-4"
            style={{ background: 'var(--color-bg)' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Ad Soyad *</label>
                <input type="text" required value={form.name} onChange={(e) => update('name', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  placeholder="Adınız Soyadınız" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Telefon *</label>
                <input type="tel" required value={form.phone} onChange={(e) => update('phone', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  placeholder="0555 000 00 00" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Plaka</label>
                <input type="text" value={form.plate} onChange={(e) => update('plate', e.target.value.toUpperCase())}
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none uppercase font-mono"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  placeholder="34 ABC 123" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Araç Marka/Model</label>
                <input type="text" value={form.brand} onChange={(e) => update('brand', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  placeholder="Toyota Corolla 2020" />
              </div>
            </div>
            {content.serviceTypes && content.serviceTypes.length > 0 && (
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Hizmet</label>
                <select value={form.service} onChange={(e) => update('service', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                  <option value="">Seçiniz…</option>
                  {content.serviceTypes.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Tercih Edilen Tarih</label>
              <input type="date" value={form.date} onChange={(e) => update('date', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} />
            </div>
            <button type="submit"
              className="w-full py-3 rounded-xl font-bold text-sm transition-opacity hover:opacity-90"
              style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
              🚗 Servis Randevusu Al (WhatsApp)
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

registerSection('booking', 'vehicle_appointment', VehicleAppointment as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 3. MAINTENANCE PACKAGES
// ═══════════════════════════════════════════

interface MaintenancePkg {
  id: string
  name: string
  price: string
  priceNote?: string
  features: string[]
  popular?: boolean
  ctaText?: string
  ctaHref?: string
}

interface MaintenancePackagesContent {
  badge?: string
  title: string
  subtitle?: string
  packages: MaintenancePkg[]
}

function MaintenancePackages({ content }: SectionProps<MaintenancePackagesContent>) {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {(content.packages || []).map((pkg) => (
            <div
              key={pkg.id}
              className="rounded-2xl p-6 flex flex-col relative"
              style={{
                background: pkg.popular ? 'var(--color-accent)' : 'var(--color-surface)',
                border: pkg.popular ? 'none' : '1px solid var(--color-border)',
              }}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: 'var(--color-text)', color: 'var(--color-bg)' }}>
                  EN POPÜLER
                </span>
              )}
              <h3 className="font-heading font-bold text-lg mb-1"
                style={{ color: pkg.popular ? 'var(--color-text-on-accent)' : 'var(--color-text)' }}>
                {pkg.name}
              </h3>
              <p className="text-3xl font-bold mb-1"
                style={{ color: pkg.popular ? 'var(--color-text-on-accent)' : 'var(--color-accent)' }}>
                {pkg.price}
              </p>
              {pkg.priceNote && (
                <p className="text-xs mb-4"
                  style={{ color: pkg.popular ? 'rgba(255,255,255,0.7)' : 'var(--color-text-muted)' }}>
                  {pkg.priceNote}
                </p>
              )}
              <ul className="space-y-2 flex-1 mb-5">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm"
                    style={{ color: pkg.popular ? 'rgba(255,255,255,0.9)' : 'var(--color-text-secondary)' }}>
                    <span style={{ color: pkg.popular ? '#fff' : 'var(--color-accent)' }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href={pkg.ctaHref || '#'}
                className="block text-center py-2.5 rounded-xl font-bold text-sm transition-opacity hover:opacity-90"
                style={{
                  background: pkg.popular ? 'rgba(255,255,255,0.2)' : 'var(--color-accent)',
                  color: pkg.popular ? '#fff' : 'var(--color-text-on-accent)',
                  border: pkg.popular ? '1px solid rgba(255,255,255,0.3)' : 'none',
                }}>
                {pkg.ctaText || 'Randevu Al'}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

registerSection('pricing', 'maintenance_packages', MaintenancePackages as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 4. WORKSHOP PHOTO GRID
// ═══════════════════════════════════════════

interface WorkshopPhoto {
  id: string
  image?: string
  caption?: string
  emoji?: string
}

interface WorkshopPhotoGridContent {
  badge?: string
  title: string
  subtitle?: string
  photos: WorkshopPhoto[]
}

function WorkshopPhotoGrid({ content }: SectionProps<WorkshopPhotoGridContent>) {
  const [selected, setSelected] = useState<string | null>(null)
  const photos = content.photos || []
  const active = photos.find((p) => p.id === selected)

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
          <p className="text-base mb-8" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {photos.map((p) => (
            <div key={p.id}
              className="group relative rounded-xl overflow-hidden cursor-pointer aspect-video"
              style={{ background: 'var(--color-surface-muted)' }}
              onClick={() => setSelected(p.id)}>
              {p.image ? (
                <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${p.image})` }} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  {p.emoji || '🔧'}
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              {p.caption && (
                <p className="absolute bottom-2 left-2 right-2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {p.caption}
                </p>
              )}
            </div>
          ))}
        </div>

        {selected && active && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}>
            <div className="relative max-w-3xl w-full rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}>
              {active.image ? (
                <img src={active.image} alt={active.caption} className="w-full object-contain max-h-[80vh]" />
              ) : (
                <div className="aspect-video bg-gray-800 flex items-center justify-center text-8xl">
                  {active.emoji || '🔧'}
                </div>
              )}
              {active.caption && (
                <p className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 text-white text-sm">
                  {active.caption}
                </p>
              )}
              <button onClick={() => setSelected(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center text-lg">
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

registerSection('gallery', 'workshop_photos', WorkshopPhotoGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 5. SERVICE STATS ROW
// ═══════════════════════════════════════════

interface ServiceStat {
  value: string
  label: string
  icon: string
}

interface ServiceStatsRowContent {
  stats: ServiceStat[]
}

function ServiceStatsRow({ content }: SectionProps<ServiceStatsRowContent>) {
  return (
    <section className="py-10 px-4" style={{ background: 'var(--color-accent)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {(content.stats || []).map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl mb-1">{s.icon}</p>
              <p className="text-2xl font-heading font-bold" style={{ color: 'var(--color-text-on-accent)' }}>
                {s.value}
              </p>
              <p className="text-xs font-medium opacity-80" style={{ color: 'var(--color-text-on-accent)' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

registerSection('social_proof', 'service_stats_row', ServiceStatsRow as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ Exports ═══
export { ServicePriceGrid, VehicleAppointment, MaintenancePackages, WorkshopPhotoGrid, ServiceStatsRow }
