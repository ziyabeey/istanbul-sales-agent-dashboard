/**
 * @kepenk/templates — Müzik Okulu Section Components
 *
 * 1. MusicCourseGrid      — kurs/ders kartları (piyano, gitar, vokal)
 * 2. MusicTeacherGrid     — öğretmen profilleri
 * 3. MusicPricingTable    — fiyat paketleri
 * 4. MusicStatsRow        — istatistikler
 * 5. MusicTrialForm       — deneme dersi → WhatsApp
 */

'use client'

import { useState } from 'react'
import type { ComponentType } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// ═══ 1. MUSIC COURSE GRID ═══
interface MusicCourse { id: string; emoji: string; name: string; description: string; level?: string; duration?: string; badge?: string }
interface MusicCourseGridContent { badge?: string; title: string; subtitle?: string; courses: MusicCourse[] }
function MusicCourseGrid({ content }: SectionProps<MusicCourseGridContent>) {
  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
        {content.subtitle && <p className="text-base mb-8" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(content.courses || []).map((c) => (
            <div key={c.id} className="rounded-2xl border p-5 hover:shadow-md transition-shadow relative" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
              {c.badge && <span className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>{c.badge}</span>}
              <span className="text-4xl mb-3 block">{c.emoji}</span>
              <h3 className="font-heading font-bold text-base mb-1" style={{ color: 'var(--color-text)' }}>{c.name}</h3>
              <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>{c.description}</p>
              <div className="flex flex-wrap gap-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                {c.level && <span>📊 {c.level}</span>}
                {c.duration && <span>⏱ {c.duration}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'music_course_grid', MusicCourseGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 2. MUSIC TEACHER GRID ═══
interface MusicTeacher { id: string; name: string; instrument: string; experience: string; education?: string }
interface MusicTeacherGridContent { badge?: string; title: string; teachers: MusicTeacher[] }
function MusicTeacherGrid({ content }: SectionProps<MusicTeacherGridContent>) {
  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(content.teachers || []).map((t) => (
            <div key={t.id} className="rounded-2xl border p-5 text-center" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl" style={{ background: 'var(--color-accent-light)' }}>🎵</div>
              <h3 className="font-heading font-bold text-base" style={{ color: 'var(--color-text)' }}>{t.name}</h3>
              <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-accent)' }}>{t.instrument}</p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{t.experience}</p>
              {t.education && <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>🎓 {t.education}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('team', 'music_teacher_grid', MusicTeacherGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 3. MUSIC PRICING TABLE ═══
interface MusicPlan { id: string; name: string; price: string; period: string; features: string[]; badge?: string; highlighted?: boolean }
interface MusicPricingTableContent { badge?: string; title: string; plans: MusicPlan[] }
function MusicPricingTable({ content }: SectionProps<MusicPricingTableContent>) {
  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(content.plans || []).map((p) => (
            <div key={p.id} className="rounded-2xl border p-6 text-center relative" style={{ background: p.highlighted ? 'var(--color-accent-light)' : 'var(--color-bg)', borderColor: p.highlighted ? 'var(--color-accent)' : 'var(--color-border)', transform: p.highlighted ? 'scale(1.03)' : 'none' }}>
              {p.badge && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>{p.badge}</span>}
              <h3 className="font-heading font-bold text-lg mt-2" style={{ color: 'var(--color-text)' }}>{p.name}</h3>
              <div className="my-4"><span className="text-3xl font-bold" style={{ color: 'var(--color-accent)' }}>{p.price}</span><span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>/{p.period}</span></div>
              <ul className="space-y-2 mb-6 text-left">{p.features.map((f, i) => <li key={i} className="text-sm flex items-start gap-2" style={{ color: 'var(--color-text-secondary)' }}><span className="text-green-500 mt-0.5">✓</span> {f}</li>)}</ul>
              <a href="#trial" className="inline-block w-full py-2.5 rounded-full font-bold text-sm" style={{ background: p.highlighted ? 'var(--color-accent)' : 'var(--color-surface-muted)', color: p.highlighted ? 'var(--color-text-on-accent)' : 'var(--color-text)' }}>Sec</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('booking', 'music_pricing', MusicPricingTable as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 4. MUSIC STATS ROW ═══
interface MusicStat { value: string; label: string; icon: string }
interface MusicStatsRowContent { stats: MusicStat[] }
function MusicStatsRow({ content }: SectionProps<MusicStatsRowContent>) {
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
registerSection('social_proof', 'music_stats_row', MusicStatsRow as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 5. MUSIC TRIAL FORM ═══
interface MusicTrialContent { badge?: string; title: string; subtitle?: string; instruments?: string[]; levels?: string[]; whatsapp?: string; phone?: string; note?: string }
function MusicTrialForm({ content }: SectionProps<MusicTrialContent>) {
  const [form, setForm] = useState({ name: '', phone: '', instrument: '', level: '', message: '' })
  const [sent, setSent] = useState(false)
  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); if (!form.name || !form.phone) return
    const wa = content.whatsapp || content.phone?.replace(/\D/g, '') || ''
    const msg = `Deneme Dersi%0AAdi: ${encodeURIComponent(form.name)}%0ATel: ${form.phone}${form.instrument ? `%0AEnstruman: ${encodeURIComponent(form.instrument)}` : ''}${form.level ? `%0ASeviye: ${encodeURIComponent(form.level)}` : ''}${form.message ? `%0ANot: ${encodeURIComponent(form.message)}` : ''}`
    window.open(`https://wa.me/${wa}?text=${msg}`, '_blank'); setSent(true)
  }
  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto" style={{ maxWidth: '580px' }}>
        {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
        {content.subtitle && <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
        {sent ? (
          <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--color-bg)' }}><div className="text-5xl mb-4">🎵✅</div><h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Kaydiniz Alindi!</h3><p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Deneme dersiniz icin haziriz.</p></div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-2xl p-6 space-y-4" style={{ background: 'var(--color-bg)' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Ad Soyad *</label><input type="text" required value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Adiniz" /></div>
              <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Telefon *</label><input type="tel" required value={form.phone} onChange={(e) => update('phone', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="0555 000 00 00" /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {content.instruments && <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Enstruman</label><select value={form.instrument} onChange={(e) => update('instrument', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}><option value="">Seciniz…</option>{content.instruments.map((i) => <option key={i} value={i}>{i}</option>)}</select></div>}
              {content.levels && <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Seviye</label><select value={form.level} onChange={(e) => update('level', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}><option value="">Seciniz…</option>{content.levels.map((l) => <option key={l} value={l}>{l}</option>)}</select></div>}
            </div>
            <button type="submit" className="w-full py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>🎵 Deneme Dersi (WhatsApp)</button>
            {content.note && <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>{content.note}</p>}
          </form>
        )}
      </div>
    </section>
  )
}
registerSection('booking', 'music_trial', MusicTrialForm as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

export { MusicCourseGrid, MusicTeacherGrid, MusicPricingTable, MusicStatsRow, MusicTrialForm }
