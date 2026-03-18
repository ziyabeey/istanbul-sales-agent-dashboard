/**
 * @kepenk/templates — Spor & Fitness Section Components
 *
 * 5 sector-specific sections for gym/fitness themes:
 * 1. ClassScheduleGrid — weekly class timetable
 * 2. MembershipTierCards — membership plan comparison
 * 3. TransformationGallery — member before/after transformations
 * 4. TrainerProfileCard — trainer showcase with certifications
 * 5. GymStatsRow — animated stats (members, area, programs)
 */

'use client'

import { useState } from 'react'
import type { ComponentType } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// ═══════════════════════════════════════════
// 1. CLASS SCHEDULE GRID
// ═══════════════════════════════════════════

interface ClassSlot {
  id: string
  name: string
  trainer?: string
  time: string
  duration?: string
  level?: 'Başlangıç' | 'Orta' | 'İleri' | 'Tüm Seviyeler'
  spots?: number
  color?: string
}

interface DaySchedule {
  day: string
  dayShort: string
  slots: ClassSlot[]
}

interface ClassScheduleContent {
  badge?: string
  title: string
  subtitle?: string
  schedule: DaySchedule[]
  ctaText?: string
  ctaHref?: string
}

function ClassScheduleGrid({ content }: SectionProps<ClassScheduleContent>) {
  const days = content.schedule || []
  const [activeDay, setActiveDay] = useState(0)
  const current = days[activeDay]

  const levelColor = (level?: string) => {
    if (level === 'Başlangıç') return '#22C55E'
    if (level === 'Orta') return '#F59E0B'
    if (level === 'İleri') return '#EF4444'
    return 'var(--color-accent)'
  }

  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {content.badge && (
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>
            {content.badge}
          </span>
        )}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>
          {content.title}
        </h2>
        {content.subtitle && (
          <p className="text-base mb-8" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
        )}

        {/* Day tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {days.map((d, i) => (
            <button
              key={d.day}
              onClick={() => setActiveDay(i)}
              className="px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all"
              style={{
                background: i === activeDay ? 'var(--color-accent)' : 'var(--color-surface)',
                color: i === activeDay ? 'var(--color-text-on-accent)' : 'var(--color-text-secondary)',
              }}
            >
              {d.dayShort}
            </button>
          ))}
        </div>

        {/* Slots */}
        {current && (
          <div className="space-y-3">
            {current.slots.length === 0 && (
              <p className="text-center py-8 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Bu gün programlanmış ders yok.
              </p>
            )}
            {current.slots.map((slot) => (
              <div
                key={slot.id}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: 'var(--color-surface)' }}
              >
                <div className="w-1 h-12 rounded-full shrink-0" style={{ background: slot.color || 'var(--color-accent)' }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>{slot.name}</h3>
                    {slot.level && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold text-white"
                        style={{ background: levelColor(slot.level) }}>
                        {slot.level}
                      </span>
                    )}
                  </div>
                  {slot.trainer && <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>👤 {slot.trainer}</p>}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold" style={{ color: 'var(--color-accent)' }}>{slot.time}</p>
                  {slot.duration && <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{slot.duration}</p>}
                </div>
                {slot.spots !== undefined && (
                  <div className="text-center shrink-0 hidden sm:block">
                    <p className="text-xs font-semibold" style={{ color: slot.spots > 0 ? 'var(--color-accent)' : '#EF4444' }}>
                      {slot.spots > 0 ? `${slot.spots} yer` : 'Dolu'}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {content.ctaText && (
          <div className="text-center mt-8">
            <a href={content.ctaHref || '#'} className="inline-block px-8 py-3 rounded-full font-bold text-sm transition-transform hover:scale-105"
              style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
              {content.ctaText}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

registerSection('class_schedule', 'grid', ClassScheduleGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('class_schedule', 'default', ClassScheduleGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 2. MEMBERSHIP TIER CARDS
// ═══════════════════════════════════════════

interface MembershipTier {
  id: string
  name: string
  tagline?: string
  price: string
  period: string
  originalPrice?: string
  features: { text: string; included: boolean }[]
  popular?: boolean
  badge?: string
  cta: { text: string; href: string }
}

interface MembershipTierContent {
  badge?: string
  title: string
  subtitle?: string
  tiers: MembershipTier[]
  note?: string
}

function MembershipTierCards({ content }: SectionProps<MembershipTierContent>) {
  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {content.badge && (
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>
            {content.badge}
          </span>
        )}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>
          {content.title}
        </h2>
        {content.subtitle && (
          <p className="text-base mb-12" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(content.tiers || []).map((tier) => (
            <div
              key={tier.id}
              className="relative rounded-2xl flex flex-col overflow-hidden transition-transform hover:-translate-y-1"
              style={{
                background: tier.popular ? 'var(--color-accent)' : 'var(--color-bg)',
                boxShadow: tier.popular ? '0 12px 40px -8px rgba(0,0,0,0.3)' : '0 2px 8px -2px rgba(0,0,0,0.1)',
              }}
            >
              {tier.popular && (
                <div className="text-center py-2 text-xs font-bold tracking-widest uppercase opacity-90"
                  style={{ background: 'rgba(0,0,0,0.15)', color: 'var(--color-text-on-accent)' }}>
                  ⚡ En Popüler
                </div>
              )}
              <div className="p-6 flex-1">
                {tier.badge && !tier.popular && (
                  <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded mb-3"
                    style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                    {tier.badge}
                  </span>
                )}
                <h3 className="text-xl font-heading font-bold mb-1"
                  style={{ color: tier.popular ? 'var(--color-text-on-accent)' : 'var(--color-text)' }}>
                  {tier.name}
                </h3>
                {tier.tagline && (
                  <p className="text-sm mb-4 opacity-80"
                    style={{ color: tier.popular ? 'var(--color-text-on-accent)' : 'var(--color-text-secondary)' }}>
                    {tier.tagline}
                  </p>
                )}
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-heading font-bold"
                    style={{ color: tier.popular ? 'var(--color-text-on-accent)' : 'var(--color-text)' }}>
                    {tier.price}
                  </span>
                  <span className="text-sm opacity-70"
                    style={{ color: tier.popular ? 'var(--color-text-on-accent)' : 'var(--color-text-secondary)' }}>
                    /{tier.period}
                  </span>
                  {tier.originalPrice && (
                    <span className="text-sm line-through opacity-50"
                      style={{ color: tier.popular ? 'var(--color-text-on-accent)' : 'var(--color-text-muted)' }}>
                      {tier.originalPrice}
                    </span>
                  )}
                </div>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span style={{ color: tier.popular ? 'rgba(255,255,255,0.8)' : (f.included ? 'var(--color-accent)' : '#9CA3AF') }}>
                        {f.included ? '✓' : '✗'}
                      </span>
                      <span style={{
                        color: tier.popular ? (f.included ? 'var(--color-text-on-accent)' : 'rgba(255,255,255,0.5)') : (f.included ? 'var(--color-text)' : 'var(--color-text-muted)'),
                        textDecoration: f.included ? 'none' : 'line-through',
                      }}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-6 pb-6">
                <a href={tier.cta.href} className="block text-center py-3 rounded-xl font-bold text-sm transition-opacity hover:opacity-90"
                  style={{
                    background: tier.popular ? 'rgba(255,255,255,0.2)' : 'var(--color-accent)',
                    color: tier.popular ? '#fff' : 'var(--color-text-on-accent)',
                    border: tier.popular ? '1px solid rgba(255,255,255,0.3)' : 'none',
                  }}>
                  {tier.cta.text}
                </a>
              </div>
            </div>
          ))}
        </div>

        {content.note && (
          <p className="text-xs mt-6 text-center" style={{ color: 'var(--color-text-muted)' }}>{content.note}</p>
        )}
      </div>
    </section>
  )
}

registerSection('membership_pricing', 'tiers', MembershipTierCards as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('membership_pricing', 'default', MembershipTierCards as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 3. TRANSFORMATION GALLERY
// ═══════════════════════════════════════════

interface Transformation {
  id: string
  name: string
  duration?: string
  weightLost?: string
  program?: string
  beforeImage?: string
  afterImage?: string
  quote?: string
}

interface TransformationContent {
  badge?: string
  title: string
  subtitle?: string
  items: Transformation[]
}

function TransformationGallery({ content }: SectionProps<TransformationContent>) {
  const items = content.items || []

  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {content.badge && (
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>
            {content.badge}
          </span>
        )}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>
          {content.title}
        </h2>
        {content.subtitle && (
          <p className="text-base mb-10" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t) => (
            <div key={t.id} className="rounded-2xl overflow-hidden" style={{ background: 'var(--color-surface)' }}>
              {/* Before / After mini */}
              <div className="flex h-48">
                <div className="flex-1 relative">
                  <div className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: t.beforeImage ? `url(${t.beforeImage})` : 'none', background: t.beforeImage ? undefined : 'var(--color-surface-muted)' }} />
                  {!t.beforeImage && <div className="absolute inset-0 flex items-center justify-center text-3xl">🏋️</div>}
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-black/60 text-white px-1.5 py-0.5 rounded">ÖNCE</span>
                </div>
                <div className="w-0.5" style={{ background: 'var(--color-accent)' }} />
                <div className="flex-1 relative">
                  <div className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: t.afterImage ? `url(${t.afterImage})` : 'none', background: t.afterImage ? undefined : 'var(--color-surface-muted)' }} />
                  {!t.afterImage && <div className="absolute inset-0 flex items-center justify-center text-3xl">💪</div>}
                  <span className="absolute bottom-2 right-2 text-[10px] font-bold bg-black/60 text-white px-1.5 py-0.5 rounded">SONRA</span>
                </div>
              </div>
              {/* Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>{t.name}</h3>
                  {t.weightLost && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded"
                      style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                      -{t.weightLost}
                    </span>
                  )}
                </div>
                <div className="flex gap-3 text-xs mb-2" style={{ color: 'var(--color-text-muted)' }}>
                  {t.duration && <span>⏱ {t.duration}</span>}
                  {t.program && <span>🏃 {t.program}</span>}
                </div>
                {t.quote && (
                  <p className="text-xs italic" style={{ color: 'var(--color-text-secondary)' }}>"{t.quote}"</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

registerSection('transformation', 'gallery', TransformationGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('transformation', 'default', TransformationGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 4. TRAINER PROFILE CARD
// ═══════════════════════════════════════════

interface TrainerProfile {
  id: string
  name: string
  title: string
  photo?: string
  specialties: string[]
  certifications?: string[]
  experience: string
  instagram?: string
  clientCount?: number
  availability?: string
}

interface TrainerProfileContent {
  badge?: string
  title: string
  subtitle?: string
  trainers: TrainerProfile[]
  bookingCta?: { text: string; href: string }
}

function TrainerProfileCard({ content }: SectionProps<TrainerProfileContent>) {
  const trainers = content.trainers || []

  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {content.badge && (
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>
            {content.badge}
          </span>
        )}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>
          {content.title}
        </h2>
        {content.subtitle && (
          <p className="text-base mb-10" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((t) => (
            <div key={t.id} className="rounded-2xl overflow-hidden" style={{ background: 'var(--color-bg)' }}>
              {/* Photo */}
              <div className="aspect-[3/4] relative overflow-hidden" style={{ background: 'var(--color-surface-muted)' }}>
                {t.photo ? (
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${t.photo})` }} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">🏋️‍♀️</div>
                )}
                {t.availability && (
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-black/70 text-white">
                      📅 {t.availability}
                    </span>
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="p-5">
                <h3 className="text-lg font-heading font-bold mb-0.5" style={{ color: 'var(--color-text)' }}>{t.name}</h3>
                <p className="text-sm font-medium mb-3" style={{ color: 'var(--color-accent)' }}>{t.title}</p>
                <div className="flex gap-4 text-xs mb-3" style={{ color: 'var(--color-text-muted)' }}>
                  <span>🏅 {t.experience}</span>
                  {t.clientCount && <span>👥 {t.clientCount}+ üye</span>}
                </div>
                {/* Specialties */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {t.specialties.map((s) => (
                    <span key={s} className="text-[10px] px-2 py-0.5 rounded"
                      style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                      {s}
                    </span>
                  ))}
                </div>
                {t.certifications && t.certifications.length > 0 && (
                  <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
                    🎓 {t.certifications.join(' · ')}
                  </p>
                )}
                {t.instagram && (
                  <a href={`https://instagram.com/${t.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
                    className="text-xs mt-2 block" style={{ color: 'var(--color-text-muted)' }}>
                    📷 {t.instagram}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {content.bookingCta && (
          <div className="text-center mt-10">
            <a href={content.bookingCta.href}
              className="inline-block px-8 py-3 rounded-full font-bold text-sm transition-transform hover:scale-105"
              style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
              {content.bookingCta.text}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

registerSection('team', 'trainer_cards', TrainerProfileCard as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 5. GYM STATS ROW
// ═══════════════════════════════════════════

interface GymStat {
  value: string
  label: string
  icon?: string
  suffix?: string
}

interface GymStatsContent {
  stats: GymStat[]
  bgVariant?: 'accent' | 'dark' | 'light'
}

function GymStatsRow({ content }: SectionProps<GymStatsContent>) {
  const stats = content.stats || []

  return (
    <section className="py-12 px-4" style={{
      background: content.bgVariant === 'accent' ? 'var(--color-accent)' : 'var(--color-surface)',
    }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        <div className={`grid gap-8 ${stats.length <= 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'}`}>
          {stats.map((s, i) => {
            const isAccent = content.bgVariant === 'accent'
            return (
              <div key={i} className="text-center">
                {s.icon && <div className="text-3xl mb-2">{s.icon}</div>}
                <div className="text-4xl md:text-5xl font-heading font-black mb-1"
                  style={{ color: isAccent ? 'var(--color-text-on-accent)' : 'var(--color-accent)' }}>
                  {s.value}{s.suffix}
                </div>
                <div className="text-sm font-medium"
                  style={{ color: isAccent ? 'rgba(255,255,255,0.8)' : 'var(--color-text-secondary)' }}>
                  {s.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

registerSection('stats', 'gym_row', GymStatsRow as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ Exports ═══
export { ClassScheduleGrid, MembershipTierCards, TransformationGallery, TrainerProfileCard, GymStatsRow }
