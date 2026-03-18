/**
 * @kepenk/templates — Doktor & Klinik Section Components
 *
 * 5 sector-specific sections for doctor/clinic themes:
 * 1. DoctorProfileHero — doctor bio with credentials
 * 2. AppointmentBookingWidget — inline appointment form
 * 3. TreatmentAccordion — collapsible treatment list with prices
 * 4. InsuranceLogosBar — accepted insurance providers
 * 5. ClinicGalleryGrid — clinic photos grid with lightbox
 */

'use client'

import { useState } from 'react'
import type { ComponentType } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// ═══════════════════════════════════════════
// 1. DOCTOR PROFILE HERO
// ═══════════════════════════════════════════

interface Education {
  institution: string
  degree: string
  year?: string
}

interface DoctorProfileContent {
  badge?: string
  name: string
  title: string
  subtitle?: string
  photo?: string
  experience: string
  patientCount?: string
  rating?: number
  education?: Education[]
  certifications?: string[]
  memberships?: string[]
  languages?: string[]
  ctaBooking?: { text: string; href: string }
  ctaPhone?: { text: string; href: string }
}

function DoctorProfileHero({ content }: SectionProps<DoctorProfileContent>) {
  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto flex flex-col md:flex-row gap-10 items-center" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {/* Photo */}
        <div className="shrink-0">
          <div
            className="rounded-2xl overflow-hidden shadow-xl"
            style={{ width: 260, height: 340, background: 'var(--color-surface-muted)' }}
          >
            {content.photo ? (
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${content.photo})` }} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-7xl">👨‍⚕️</div>
            )}
          </div>
          {/* Rating badge */}
          {content.rating && (
            <div className="mt-3 text-center">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold"
                style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                ⭐ {content.rating} / 5
              </span>
            </div>
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
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-1" style={{ color: 'var(--color-text)' }}>
            {content.name}
          </h1>
          <p className="text-lg font-medium mb-1" style={{ color: 'var(--color-accent)' }}>{content.title}</p>
          {content.subtitle && (
            <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
          )}

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="text-center px-4 py-3 rounded-xl" style={{ background: 'var(--color-surface)' }}>
              <p className="text-xl font-bold" style={{ color: 'var(--color-accent)' }}>{content.experience}</p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Deneyim</p>
            </div>
            {content.patientCount && (
              <div className="text-center px-4 py-3 rounded-xl" style={{ background: 'var(--color-surface)' }}>
                <p className="text-xl font-bold" style={{ color: 'var(--color-accent)' }}>{content.patientCount}</p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Hasta</p>
              </div>
            )}
          </div>

          {/* Education */}
          {content.education && content.education.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>
                🎓 Eğitim
              </p>
              {content.education.map((e, i) => (
                <div key={i} className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                  <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{e.degree}</span>
                  {' — '}{e.institution}{e.year ? ` (${e.year})` : ''}
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {content.certifications && content.certifications.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>
                🏅 Sertifikalar
              </p>
              <div className="flex flex-wrap gap-2">
                {content.certifications.map((c) => (
                  <span key={c} className="text-xs px-2 py-1 rounded"
                    style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {content.languages && (
            <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              🌐 {content.languages.join(' · ')}
            </p>
          )}

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            {content.ctaBooking && (
              <a href={content.ctaBooking.href}
                className="px-6 py-3 rounded-xl font-bold text-sm transition-transform hover:scale-105"
                style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
                {content.ctaBooking.text}
              </a>
            )}
            {content.ctaPhone && (
              <a href={content.ctaPhone.href}
                className="px-6 py-3 rounded-xl font-bold text-sm border transition-opacity hover:opacity-80"
                style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}>
                {content.ctaPhone.text}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

registerSection('team', 'doctor_profile_hero', DoctorProfileHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('about', 'doctor_hero', DoctorProfileHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 2. APPOINTMENT BOOKING WIDGET
// ═══════════════════════════════════════════

interface AppointmentContent {
  badge?: string
  title: string
  subtitle?: string
  services?: { id: string; name: string; duration: string }[]
  insurances?: string[]
  whatsapp?: string
  phone?: string
  email?: string
  note?: string
}

function AppointmentBookingWidget({ content }: SectionProps<AppointmentContent>) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('')
  const [date, setDate] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone) return
    const msg = `Merhaba, randevu almak istiyorum.%0Aİsim: ${encodeURIComponent(name)}%0ATelefon: ${phone}${service ? `%0AHizmet: ${encodeURIComponent(service)}` : ''}${date ? `%0ATerih Tarih: ${date}` : ''}`
    const waNumber = content.whatsapp || content.phone?.replace(/\D/g, '') || ''
    window.open(`https://wa.me/${waNumber}?text=${msg}`, '_blank')
    setSubmitted(true)
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

        {submitted ? (
          <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--color-bg)' }}>
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Talebiniz Alındı</h3>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              WhatsApp üzerinden iletişime geçilecektir.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-2xl p-6 space-y-4" style={{ background: 'var(--color-bg)' }}>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-text)' }}>
                Ad Soyad *
              </label>
              <input
                type="text" required value={name} onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                placeholder="Adınız Soyadınız"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-text)' }}>
                Telefon *
              </label>
              <input
                type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                placeholder="0555 000 00 00"
              />
            </div>
            {content.services && content.services.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-text)' }}>
                  Hizmet
                </label>
                <select
                  value={service} onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                >
                  <option value="">Seçiniz…</option>
                  {content.services.map((s) => (
                    <option key={s.id} value={s.name}>{s.name} ({s.duration})</option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-text)' }}>
                Tercih Edilen Tarih
              </label>
              <input
                type="date" value={date} onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              />
            </div>
            <button type="submit"
              className="w-full py-3 rounded-xl font-bold text-sm transition-opacity hover:opacity-90"
              style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
              📅 Randevu Talebinde Bulun
            </button>
            {content.note && (
              <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>{content.note}</p>
            )}
          </form>
        )}

        {/* Contact shortcuts */}
        <div className="flex gap-3 mt-4 justify-center">
          {content.whatsapp && (
            <a href={`https://wa.me/${content.whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
              💬 WhatsApp
            </a>
          )}
          {content.phone && (
            <a href={`tel:${content.phone}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
              📞 Ara
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

registerSection('booking', 'appointment_widget', AppointmentBookingWidget as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('booking', 'doctor_booking', AppointmentBookingWidget as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 3. TREATMENT ACCORDION
// ═══════════════════════════════════════════

interface Treatment {
  id: string
  name: string
  duration?: string
  price?: string
  description?: string
  included?: string[]
  icon?: string
}

interface TreatmentAccordionContent {
  badge?: string
  title: string
  subtitle?: string
  treatments: Treatment[]
  ctaText?: string
  ctaHref?: string
}

function TreatmentAccordion({ content }: SectionProps<TreatmentAccordionContent>) {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto" style={{ maxWidth: '700px' }}>
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

        <div className="space-y-2">
          {(content.treatments || []).map((t) => (
            <div key={t.id} className="rounded-xl overflow-hidden border"
              style={{ borderColor: open === t.id ? 'var(--color-accent)' : 'var(--color-border)' }}>
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
                style={{ background: open === t.id ? 'var(--color-accent-light)' : 'var(--color-surface)' }}
                onClick={() => setOpen(open === t.id ? null : t.id)}
              >
                <div className="flex items-center gap-3">
                  {t.icon && <span className="text-xl">{t.icon}</span>}
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{t.name}</p>
                    {t.duration && (
                      <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>⏱ {t.duration}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {t.price && (
                    <span className="font-bold text-sm" style={{ color: 'var(--color-accent)' }}>{t.price}</span>
                  )}
                  <span className="text-sm transition-transform duration-200"
                    style={{ color: 'var(--color-accent)', transform: open === t.id ? 'rotate(180deg)' : 'none', display: 'inline-block' }}>
                    ▾
                  </span>
                </div>
              </button>
              {open === t.id && (
                <div className="px-5 py-4" style={{ background: 'var(--color-bg)' }}>
                  {t.description && (
                    <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>{t.description}</p>
                  )}
                  {t.included && t.included.length > 0 && (
                    <ul className="space-y-1">
                      {t.included.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                          <span style={{ color: 'var(--color-accent)' }}>✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
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

registerSection('services', 'treatment_accordion', TreatmentAccordion as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 4. INSURANCE LOGOS BAR
// ═══════════════════════════════════════════

interface InsuranceProvider {
  id: string
  name: string
  logo?: string
  type?: 'SGK' | 'ozel' | 'uluslararasi'
}

interface InsuranceContent {
  badge?: string
  title: string
  subtitle?: string
  providers: InsuranceProvider[]
  note?: string
}

function InsuranceLogosBar({ content }: SectionProps<InsuranceContent>) {
  const providers = content.providers || []

  const typeLabel = (type?: string) => {
    if (type === 'SGK') return { label: 'SGK', color: '#0077B6' }
    if (type === 'uluslararasi') return { label: '🌐', color: '#7C3AED' }
    return { label: 'Özel', color: '#059669' }
  }

  return (
    <section className="py-10 px-4" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {content.badge && (
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-2"
            style={{ color: 'var(--color-accent)' }}>
            {content.badge}
          </span>
        )}
        <h2 className="text-xl md:text-2xl font-heading font-bold mb-1" style={{ color: 'var(--color-text)' }}>
          {content.title}
        </h2>
        {content.subtitle && (
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
        )}
        <div className="flex flex-wrap gap-3">
          {providers.map((p) => {
            const { label, color } = typeLabel(p.type)
            return (
              <div key={p.id}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-shadow hover:shadow-sm"
                style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
                {p.logo ? (
                  <img src={p.logo} alt={p.name} className="h-5 object-contain" />
                ) : (
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded"
                    style={{ background: color + '20', color }}>
                    {label}
                  </span>
                )}
                <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{p.name}</span>
              </div>
            )
          })}
        </div>
        {content.note && (
          <p className="text-xs mt-4" style={{ color: 'var(--color-text-muted)' }}>* {content.note}</p>
        )}
      </div>
    </section>
  )
}

registerSection('social_proof', 'insurance_logos', InsuranceLogosBar as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 5. CLINIC GALLERY GRID
// ═══════════════════════════════════════════

interface ClinicPhoto {
  id: string
  image?: string
  caption?: string
  category?: string
  emoji?: string
}

interface ClinicGalleryContent {
  badge?: string
  title: string
  subtitle?: string
  photos: ClinicPhoto[]
}

function ClinicGalleryGrid({ content }: SectionProps<ClinicGalleryContent>) {
  const [active, setActive] = useState<string | null>(null)
  const photos = content.photos || []
  const activePhoto = photos.find((p) => p.id === active)

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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {photos.map((p) => (
            <div
              key={p.id}
              className="group relative rounded-xl overflow-hidden cursor-pointer aspect-[4/3]"
              style={{ background: 'var(--color-surface-muted)' }}
              onClick={() => setActive(p.id)}
            >
              {p.image ? (
                <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${p.image})` }} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  {p.emoji || '🏥'}
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              {p.caption && (
                <p className="absolute bottom-2 left-2 right-2 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {p.caption}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {active && activePhoto && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setActive(null)}>
            <div className="relative max-w-3xl w-full rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}>
              {activePhoto.image ? (
                <img src={activePhoto.image} alt={activePhoto.caption} className="w-full object-contain max-h-[80vh]" />
              ) : (
                <div className="aspect-video bg-gray-800 flex items-center justify-center text-8xl">
                  {activePhoto.emoji || '🏥'}
                </div>
              )}
              {activePhoto.caption && (
                <p className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 text-white text-sm">
                  {activePhoto.caption}
                </p>
              )}
              <button onClick={() => setActive(null)}
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

registerSection('gallery', 'clinic_grid', ClinicGalleryGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ Exports ═══
export { DoctorProfileHero, AppointmentBookingWidget, TreatmentAccordion, InsuranceLogosBar, ClinicGalleryGrid }
