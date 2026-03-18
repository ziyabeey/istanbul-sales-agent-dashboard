/**
 * @kepenk/templates — Diş Kliniği Section Components
 *
 * 5 sector-specific sections:
 * 1. DentalTreatmentGrid    — tedavi kartları (fiyat + süre + ikon)
 * 2. SmileBeforeAfter       — öncesi/sonrası karşılaştırma slider
 * 3. DentistProfileCard     — diş hekimi özgeçmiş + sertifika
 * 4. ClinicStatsRow         — hasta, yıl, puan istatistikleri
 * 5. DentalAppointmentForm  — araç-bilgili randevu formu → WhatsApp
 */

'use client'

import { useState, useRef } from 'react'
import type { ComponentType } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// ═══════════════════════════════════════════
// 1. DENTAL TREATMENT GRID
// ═══════════════════════════════════════════

interface DentalTreatment {
  id: string
  icon: string
  name: string
  duration?: string
  price?: string
  description?: string
  tag?: string
}

interface DentalTreatmentGridContent {
  badge?: string
  title: string
  subtitle?: string
  treatments: DentalTreatment[]
  ctaText?: string
  ctaHref?: string
}

function DentalTreatmentGrid({ content }: SectionProps<DentalTreatmentGridContent>) {
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
          {(content.treatments || []).map((t) => (
            <div key={t.id}
              className="rounded-2xl border p-6 flex flex-col gap-3 transition-shadow hover:shadow-lg"
              style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              <div className="flex items-center justify-between">
                <span className="text-3xl">{t.icon}</span>
                {t.tag && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                    {t.tag}
                  </span>
                )}
              </div>
              <h3 className="font-heading font-semibold text-base" style={{ color: 'var(--color-text)' }}>
                {t.name}
              </h3>
              {t.description && (
                <p className="text-sm flex-1" style={{ color: 'var(--color-text-secondary)' }}>{t.description}</p>
              )}
              <div className="flex items-center justify-between gap-2 pt-2"
                style={{ borderTop: '1px solid var(--color-border)' }}>
                {t.duration && (
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>⏱ {t.duration}</span>
                )}
                {t.price && (
                  <span className="font-bold text-sm" style={{ color: 'var(--color-accent)' }}>{t.price}</span>
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

registerSection('services', 'dental_treatment_grid', DentalTreatmentGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 2. SMILE BEFORE / AFTER
// ═══════════════════════════════════════════

interface BeforeAfterItem {
  id: string
  label: string
  treatment?: string
  beforeEmoji?: string
  afterEmoji?: string
  beforeImg?: string
  afterImg?: string
}

interface SmileBeforeAfterContent {
  badge?: string
  title: string
  subtitle?: string
  items: BeforeAfterItem[]
}

function SmileBeforeAfter({ content }: SectionProps<SmileBeforeAfterContent>) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [dragPos, setDragPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const items = content.items || []
  const active = items[activeIdx]

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pos = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100))
    setDragPos(pos)
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
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2 text-center" style={{ color: 'var(--color-text)' }}>
          {content.title}
        </h2>
        {content.subtitle && (
          <p className="text-base mb-10 text-center" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
        )}

        {/* Tabs */}
        {items.length > 1 && (
          <div className="flex gap-2 justify-center mb-6 flex-wrap">
            {items.map((item, i) => (
              <button key={item.id} onClick={() => { setActiveIdx(i); setDragPos(50) }}
                className="text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                style={{
                  background: i === activeIdx ? 'var(--color-accent)' : 'var(--color-surface-elevated)',
                  color: i === activeIdx ? 'var(--color-text-on-accent)' : 'var(--color-text-secondary)',
                }}>
                {item.label}
              </button>
            ))}
          </div>
        )}

        {active && (
          <div className="mx-auto" style={{ maxWidth: 600 }}>
            <div
              ref={containerRef}
              className="relative rounded-2xl overflow-hidden cursor-col-resize select-none"
              style={{ height: '300px', background: 'var(--color-surface-muted)' }}
              onMouseMove={(e) => handleMove(e.clientX)}
              onTouchMove={(e) => handleMove(e.touches[0].clientX)}
            >
              {/* Before side */}
              <div className="absolute inset-0 flex items-center justify-center text-8xl">
                {active.beforeImg
                  ? <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${active.beforeImg})` }} />
                  : <span>{active.beforeEmoji || '😟'}</span>
                }
              </div>
              {/* After side (clipped) */}
              <div className="absolute inset-0 overflow-hidden flex items-center justify-center text-8xl"
                style={{ clipPath: `inset(0 ${100 - dragPos}% 0 0)`, background: 'var(--color-bg)' }}>
                {active.afterImg
                  ? <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${active.afterImg})` }} />
                  : <span>{active.afterEmoji || '😁'}</span>
                }
              </div>
              {/* Divider */}
              <div className="absolute top-0 bottom-0 w-0.5 flex items-center justify-center"
                style={{ left: `${dragPos}%`, background: 'var(--color-accent)' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
                  ↔
                </div>
              </div>
              {/* Labels */}
              <span className="absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-full"
                style={{ background: 'rgba(0,0,0,0.6)', color: '#fff' }}>ÖNCE</span>
              <span className="absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full"
                style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>SONRA</span>
            </div>
            {active.treatment && (
              <p className="text-center text-sm mt-3" style={{ color: 'var(--color-text-muted)' }}>
                Uygulanan Tedavi: <span className="font-semibold" style={{ color: 'var(--color-accent)' }}>{active.treatment}</span>
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

registerSection('before_after', 'smile_before_after', SmileBeforeAfter as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 3. DENTIST PROFILE CARD
// ═══════════════════════════════════════════

interface DentistCert {
  name: string
  issuer?: string
  year?: string
}

interface DentistProfileContent {
  badge?: string
  name: string
  title: string
  photo?: string
  bio?: string
  experience: string
  patientCount?: string
  rating?: string
  specializations?: string[]
  education?: { degree: string; institution: string; year?: string }[]
  certificates?: DentistCert[]
  languages?: string[]
  ctaText?: string
  ctaHref?: string
}

function DentistProfileCard({ content }: SectionProps<DentistProfileContent>) {
  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto flex flex-col lg:flex-row gap-10 items-start"
        style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {/* Photo */}
        <div className="shrink-0 w-full lg:w-60">
          <div className="rounded-2xl overflow-hidden mx-auto lg:mx-0"
            style={{ width: 220, height: 280, background: 'var(--color-surface)', maxWidth: '100%' }}>
            {content.photo ? (
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${content.photo})` }} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-7xl">🦷</div>
            )}
          </div>
          <div className="mt-3 space-y-1.5">
            {[{ l: 'Deneyim', v: content.experience }, { l: 'Hasta', v: content.patientCount }, { l: 'Puan', v: content.rating }]
              .filter((s) => s.v).map((s) => (
                <div key={s.l} className="flex justify-between text-sm px-1"
                  style={{ color: 'var(--color-text-secondary)' }}>
                  <span>{s.l}</span>
                  <span className="font-bold" style={{ color: 'var(--color-accent)' }}>{s.v}</span>
                </div>
              ))}
          </div>
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
            <div className="flex flex-wrap gap-2 mb-5">
              {content.specializations.map((s) => (
                <span key={s} className="text-xs px-3 py-1 rounded-full"
                  style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                  {s}
                </span>
              ))}
            </div>
          )}
          {content.education && (
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>🎓 Eğitim</p>
              {content.education.map((e, i) => (
                <div key={i} className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                  <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{e.degree}</span>
                  {' — '}{e.institution}{e.year ? ` (${e.year})` : ''}
                </div>
              ))}
            </div>
          )}
          {content.certificates && content.certificates.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>🏅 Sertifikalar</p>
              {content.certificates.map((c, i) => (
                <div key={i} className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                  <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{c.name}</span>
                  {c.issuer ? ` — ${c.issuer}` : ''}{c.year ? ` (${c.year})` : ''}
                </div>
              ))}
            </div>
          )}
          {content.ctaText && (
            <a href={content.ctaHref || '#'}
              className="inline-block px-6 py-3 rounded-full font-bold text-sm mt-2 transition-opacity hover:opacity-90"
              style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
              {content.ctaText}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

registerSection('team', 'dentist_profile', DentistProfileCard as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 4. CLINIC STATS ROW
// ═══════════════════════════════════════════

interface ClinicStat {
  value: string
  label: string
  icon: string
}

interface ClinicStatsRowContent {
  stats: ClinicStat[]
}

function ClinicStatsRow({ content }: SectionProps<ClinicStatsRowContent>) {
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

registerSection('social_proof', 'clinic_stats_row', ClinicStatsRow as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 5. DENTAL APPOINTMENT FORM
// ═══════════════════════════════════════════

interface DentalAppointmentContent {
  badge?: string
  title: string
  subtitle?: string
  treatmentTypes?: string[]
  whatsapp?: string
  phone?: string
  note?: string
  isFreeFirst?: boolean
}

function DentalAppointmentForm({ content }: SectionProps<DentalAppointmentContent>) {
  const [form, setForm] = useState({ name: '', phone: '', age: '', treatment: '', complaint: '' })
  const [sent, setSent] = useState(false)
  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    const waNum = content.whatsapp || content.phone?.replace(/\D/g, '') || ''
    const msg = `Diş Klinik Randevu%0AAdı: ${encodeURIComponent(form.name)}%0ATelefon: ${form.phone}${form.age ? `%0AYaş: ${form.age}` : ''}${form.treatment ? `%0ATedavi: ${encodeURIComponent(form.treatment)}` : ''}${form.complaint ? `%0AŞikayet: ${encodeURIComponent(form.complaint)}` : ''}`
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
          <p className="text-base mb-8" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
        )}
        {content.isFreeFirst && (
          <div className="mb-5 p-4 rounded-xl flex items-center gap-3"
            style={{ background: 'var(--color-accent-light)', border: '1px solid var(--color-accent)' }}>
            <span className="text-2xl">😁</span>
            <p className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
              İlk muayene <strong>ücretsizdir</strong>
            </p>
          </div>
        )}
        {sent ? (
          <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--color-bg)' }}>
            <div className="text-5xl mb-4">🦷✅</div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Randevunuz Alındı</h3>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>WhatsApp\'tan onay gelecek.</p>
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
            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Yaş</label>
              <input type="number" value={form.age} onChange={(e) => update('age', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                placeholder="Yaşınız" />
            </div>
            {content.treatmentTypes && content.treatmentTypes.length > 0 && (
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Tedavi</label>
                <select value={form.treatment} onChange={(e) => update('treatment', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                  <option value="">Seçiniz…</option>
                  {content.treatmentTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Şikayetiniz</label>
              <textarea rows={3} value={form.complaint} onChange={(e) => update('complaint', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none resize-none"
                style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                placeholder="Diş ağrısı, kırık diş vb." />
            </div>
            <button type="submit"
              className="w-full py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
              style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
              🦷 Randevu Al (WhatsApp)
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

registerSection('booking', 'dental_appointment', DentalAppointmentForm as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ Exports ═══
export { DentalTreatmentGrid, SmileBeforeAfter, DentistProfileCard, ClinicStatsRow, DentalAppointmentForm }
