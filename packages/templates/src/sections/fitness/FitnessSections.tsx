/**
 * @kepenk/templates — Fitness & Spor Section Components
 *
 * 5 sector-specific sections:
 * 1. ClassScheduleGrid     — haftalık ders programı (yoga, crossfit, pilates vb.)
 * 2. TrainerProfileCard    — antrenör profilleri & sertifikalar
 * 3. MembershipPackages    — üyelik paketleri (aylık/yıllık)
 * 4. FitnessStatsRow       — üye, ders, alan istatistikleri
 * 5. TrialBookingForm      — deneme dersi / üyelik talebi → WhatsApp
 */

'use client'

import { useState } from 'react'
import type { ComponentType } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// ═══════════════════════════════════════════
// 1. CLASS SCHEDULE GRID
// ═══════════════════════════════════════════

interface FitnessClass {
  id: string
  time: string
  name: string
  trainer?: string
  duration?: string
  intensity?: string // Düşük / Orta / Yüksek
  capacity?: string
  emoji?: string
}

interface DaySchedule {
  day: string
  classes: FitnessClass[]
}

interface ClassScheduleGridContent {
  badge?: string
  title: string
  subtitle?: string
  schedule: DaySchedule[]
  ctaText?: string
  ctaHref?: string
}

function ClassScheduleGrid({ content }: SectionProps<ClassScheduleGridContent>) {
  const days = (content.schedule || []).map((d) => d.day)
  const [activeDay, setActiveDay] = useState(days[0] || '')

  const intensityColor = (i?: string) => {
    if (i === 'Düşük') return { bg: '#DCFCE7', text: '#16A34A' }
    if (i === 'Orta') return { bg: '#FEF9C3', text: '#B45309' }
    return { bg: '#FEE2E2', text: '#DC2626' }
  }

  const activeSchedule = (content.schedule || []).find((d) => d.day === activeDay)

  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {content.badge && (
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: 'var(--color-accent)' }}>{content.badge}</span>
        )}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>
          {content.title}
        </h2>
        {content.subtitle && (
          <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
        )}

        {/* Day tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {days.map((d) => (
            <button key={d} onClick={() => setActiveDay(d)}
              className="text-xs font-bold px-4 py-2 rounded-full transition-colors"
              style={{
                background: activeDay === d ? 'var(--color-accent)' : 'var(--color-bg)',
                color: activeDay === d ? 'var(--color-text-on-accent)' : 'var(--color-text-secondary)',
                border: '1px solid var(--color-border)',
              }}>
              {d}
            </button>
          ))}
        </div>

        {/* Classes */}
        <div className="space-y-3">
          {(activeSchedule?.classes || []).map((c) => {
            const ic = intensityColor(c.intensity)
            return (
              <div key={c.id} className="flex items-center gap-4 p-4 rounded-xl border"
                style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
                <span className="text-3xl shrink-0">{c.emoji || '🏋️'}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-mono font-bold" style={{ color: 'var(--color-accent)' }}>{c.time}</span>
                    <h3 className="font-heading font-semibold text-sm truncate" style={{ color: 'var(--color-text)' }}>{c.name}</h3>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {c.trainer && `👤 ${c.trainer}`}{c.duration ? ` • ${c.duration}` : ''}{c.capacity ? ` • ${c.capacity}` : ''}
                  </p>
                </div>
                {c.intensity && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0" style={{ background: ic.bg, color: ic.text }}>
                    {c.intensity}
                  </span>
                )}
              </div>
            )
          })}
          {(activeSchedule?.classes || []).length === 0 && (
            <p className="text-sm text-center py-8" style={{ color: 'var(--color-text-muted)' }}>Bu gün için ders bulunmuyor.</p>
          )}
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

registerSection('services', 'class_schedule_grid', ClassScheduleGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 2. TRAINER PROFILE CARD
// ═══════════════════════════════════════════

interface TrainerProfile {
  id: string
  emoji: string
  name: string
  title: string
  specialties: string[]
  certifications?: string[]
  experience?: string
  quote?: string
}

interface TrainerProfileCardContent {
  badge?: string
  title: string
  subtitle?: string
  trainers: TrainerProfile[]
}

function TrainerProfileCard({ content }: SectionProps<TrainerProfileCardContent>) {
  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {content.badge && (
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: 'var(--color-accent)' }}>{content.badge}</span>
        )}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>
          {content.title}
        </h2>
        {content.subtitle && (
          <p className="text-base mb-10" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(content.trainers || []).map((t) => (
            <div key={t.id} className="rounded-2xl border p-5 flex flex-col gap-3"
              style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              <div className="flex items-center gap-3">
                <span className="text-5xl">{t.emoji}</span>
                <div>
                  <h3 className="font-heading font-bold text-base" style={{ color: 'var(--color-text)' }}>{t.name}</h3>
                  <p className="text-xs" style={{ color: 'var(--color-accent)' }}>{t.title}</p>
                  {t.experience && <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{t.experience}</p>}
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {t.specialties.map((s) => (
                  <span key={s} className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>{s}</span>
                ))}
              </div>
              {t.certifications && (
                <div className="flex flex-wrap gap-1">
                  {t.certifications.map((c) => (
                    <span key={c} className="text-xs px-2 py-0.5 rounded-full border"
                      style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>🏅 {c}</span>
                  ))}
                </div>
              )}
              {t.quote && (
                <p className="text-xs italic leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

registerSection('team', 'trainer_profile', TrainerProfileCard as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 3. MEMBERSHIP PACKAGES
// ═══════════════════════════════════════════

interface MembershipPkg {
  id: string
  emoji: string
  name: string
  subtitle?: string
  price: string
  period?: string
  features: string[]
  isPopular?: boolean
  ctaText?: string
  ctaHref?: string
}

interface MembershipPackagesContent {
  badge?: string
  title: string
  subtitle?: string
  packages: MembershipPkg[]
}

function MembershipPackages({ content }: SectionProps<MembershipPackagesContent>) {
  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {content.badge && (
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: 'var(--color-accent)' }}>{content.badge}</span>
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
                  style={{ background: 'rgba(0,0,0,0.2)', color: 'var(--color-text-on-accent)' }}>🔥 EN POPÜLER</div>
              )}
              <div className="p-6 flex flex-col flex-1 gap-3">
                <p className="text-4xl">{pkg.emoji}</p>
                <h3 className="font-heading font-bold text-xl"
                  style={{ color: pkg.isPopular ? 'var(--color-text-on-accent)' : 'var(--color-text)' }}>{pkg.name}</h3>
                {pkg.subtitle && (
                  <p className="text-sm opacity-80"
                    style={{ color: pkg.isPopular ? 'var(--color-text-on-accent)' : 'var(--color-text-secondary)' }}>{pkg.subtitle}</p>
                )}
                <div>
                  <span className="text-3xl font-bold"
                    style={{ color: pkg.isPopular ? 'var(--color-text-on-accent)' : 'var(--color-accent)' }}>{pkg.price}</span>
                  {pkg.period && <span className="text-sm opacity-60"
                    style={{ color: pkg.isPopular ? 'var(--color-text-on-accent)' : 'var(--color-text-muted)' }}> / {pkg.period}</span>}
                </div>
                <ul className="space-y-1.5 flex-1">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm"
                      style={{ color: pkg.isPopular ? 'var(--color-text-on-accent)' : 'var(--color-text-secondary)' }}>
                      <span style={{ color: pkg.isPopular ? 'var(--color-text-on-accent)' : 'var(--color-accent)' }}>✓</span>{f}
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
                  {pkg.ctaText || 'Üye Ol'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

registerSection('booking', 'membership_packages', MembershipPackages as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 4. FITNESS STATS ROW
// ═══════════════════════════════════════════

interface FitnessStat { value: string; label: string; icon: string }
interface FitnessStatsRowContent { stats: FitnessStat[] }

function FitnessStatsRow({ content }: SectionProps<FitnessStatsRowContent>) {
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

registerSection('social_proof', 'fitness_stats_row', FitnessStatsRow as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 5. TRIAL BOOKING FORM
// ═══════════════════════════════════════════

interface TrialBookingContent {
  badge?: string
  title: string
  subtitle?: string
  classTypes?: string[]
  timeSlots?: string[]
  whatsapp?: string
  phone?: string
  isFreeTrialAvailable?: boolean
  note?: string
}

function TrialBookingForm({ content }: SectionProps<TrialBookingContent>) {
  const [form, setForm] = useState({ name: '', phone: '', classType: '', time: '', goal: '', note: '' })
  const [sent, setSent] = useState(false)
  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    const waNum = content.whatsapp || content.phone?.replace(/\D/g, '') || ''
    const msg = `Fitness Üyelik/Deneme%0AAdı: ${encodeURIComponent(form.name)}%0ATelefon: ${form.phone}${form.classType ? `%0ADers: ${encodeURIComponent(form.classType)}` : ''}${form.time ? `%0ASaat: ${encodeURIComponent(form.time)}` : ''}${form.goal ? `%0AHedef: ${encodeURIComponent(form.goal)}` : ''}${form.note ? `%0ANot: ${encodeURIComponent(form.note)}` : ''}`
    window.open(`https://wa.me/${waNum}?text=${msg}`, '_blank')
    setSent(true)
  }

  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto" style={{ maxWidth: '580px' }}>
        {content.badge && (
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: 'var(--color-accent)' }}>{content.badge}</span>
        )}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>
          {content.title}
        </h2>
        {content.subtitle && (
          <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
        )}
        {content.isFreeTrialAvailable && (
          <div className="mb-5 p-4 rounded-xl flex items-center gap-3"
            style={{ background: 'var(--color-accent-light)', border: '1px solid var(--color-accent)' }}>
            <span className="text-2xl">🎁</span>
            <p className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
              <strong>İlk ders ücretsiz!</strong> Hemen deneyin, karar verin.
            </p>
          </div>
        )}

        {sent ? (
          <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--color-bg)' }}>
            <div className="text-5xl mb-4">💪✅</div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Kaydınız Alındı!</h3>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Antrenörlerimiz sizi arayacak.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-2xl p-6 space-y-4" style={{ background: 'var(--color-bg)' }}>
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
            {content.classTypes && (
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Ders Türü</label>
                <select value={form.classType} onChange={(e) => update('classType', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                  <option value="">Seçiniz…</option>
                  {content.classTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            )}
            {content.timeSlots && (
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Tercih Edilen Saat</label>
                <select value={form.time} onChange={(e) => update('time', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                  <option value="">Seçiniz…</option>
                  {content.timeSlots.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Hedefiniz</label>
              <input type="text" value={form.goal} onChange={(e) => update('goal', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                placeholder="Kilo verme, kas yapma, esneklik…" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Notunuz</label>
              <textarea rows={2} value={form.note} onChange={(e) => update('note', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none resize-none"
                style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                placeholder="Sağlık durumunuz, özel notlar…" />
            </div>
            <button type="submit"
              className="w-full py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
              style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
              💪 Ücretsiz Deneme Dersi Al (WhatsApp)
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

registerSection('booking', 'trial_booking', TrialBookingForm as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ Exports ═══
export { ClassScheduleGrid, TrainerProfileCard, MembershipPackages, FitnessStatsRow, TrialBookingForm }
