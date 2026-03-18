/**
 * @kepenk/templates — Nakliyat Section Components
 *
 * 1. MovingPackages       — nakliyat paketleri
 * 2. MovingServicesGrid   — ek hizmetler
 * 3. MovingProcessSteps   — süreç adımları
 * 4. MovingStatsRow       — istatistikler
 * 5. MovingQuoteForm      — teklif formu → WhatsApp
 */
'use client'
import { useState } from 'react'
import type { ComponentType } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// ═══ 1. MOVING PACKAGES ═══
interface MovingPkg { id: string; emoji: string; name: string; price: string; features: string[]; badge?: string; highlighted?: boolean }
interface MovingPackagesContent { badge?: string; title: string; subtitle?: string; packages: MovingPkg[] }
function MovingPackages({ content }: SectionProps<MovingPackagesContent>) {
  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
        {content.subtitle && <p className="text-base mb-8" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(content.packages || []).map((p) => (
            <div key={p.id} className="rounded-2xl border p-6 text-center relative" style={{ background: p.highlighted ? 'var(--color-accent-light)' : 'var(--color-bg)', borderColor: p.highlighted ? 'var(--color-accent)' : 'var(--color-border)' }}>
              {p.badge && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>{p.badge}</span>}
              <span className="text-4xl block mb-3">{p.emoji}</span>
              <h3 className="font-heading font-bold text-lg" style={{ color: 'var(--color-text)' }}>{p.name}</h3>
              <div className="my-3"><span className="text-3xl font-bold" style={{ color: 'var(--color-accent)' }}>{p.price}</span></div>
              <ul className="space-y-1.5 mb-4 text-left">{p.features.map((f, i) => <li key={i} className="text-sm flex items-start gap-2" style={{ color: 'var(--color-text-secondary)' }}><span className="text-green-500 mt-0.5">✓</span> {f}</li>)}</ul>
              <a href="#teklif" className="inline-block w-full py-2.5 rounded-full font-bold text-sm" style={{ background: p.highlighted ? 'var(--color-accent)' : 'var(--color-surface-muted)', color: p.highlighted ? 'var(--color-text-on-accent)' : 'var(--color-text)' }}>Sec</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('booking', 'moving_packages', MovingPackages as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 2. MOVING SERVICES GRID ═══
interface MovingService { id: string; emoji: string; name: string; description: string; badge?: string }
interface MovingServicesGridContent { badge?: string; title: string; services: MovingService[] }
function MovingServicesGrid({ content }: SectionProps<MovingServicesGridContent>) {
  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(content.services || []).map((s) => (
            <div key={s.id} className="rounded-2xl border p-5 hover:shadow-md transition-shadow relative" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              {s.badge && <span className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>{s.badge}</span>}
              <span className="text-4xl mb-3 block">{s.emoji}</span>
              <h3 className="font-heading font-bold text-base mb-1" style={{ color: 'var(--color-text)' }}>{s.name}</h3>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'moving_services', MovingServicesGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 3. MOVING PROCESS STEPS ═══
interface MoveStep { step: number; emoji: string; title: string; description: string }
interface MovingProcessStepsContent { badge?: string; title: string; steps: MoveStep[] }
function MovingProcessSteps({ content }: SectionProps<MovingProcessStepsContent>) {
  return (
    <section className="py-12 px-4" style={{ background: 'var(--color-accent-light)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
        <h2 className="text-2xl font-heading font-bold mb-6" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {(content.steps || []).map((s) => (
            <div key={s.step} className="rounded-xl border px-5 py-4 text-center min-w-[140px] relative" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
              <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>{s.step}</span>
              <span className="text-3xl block mb-2">{s.emoji}</span>
              <p className="text-xs font-bold" style={{ color: 'var(--color-text)' }}>{s.title}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('gallery', 'moving_process', MovingProcessSteps as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 4. MOVING STATS ROW ═══
interface MovingStat { value: string; label: string; icon: string }
interface MovingStatsRowContent { stats: MovingStat[] }
function MovingStatsRow({ content }: SectionProps<MovingStatsRowContent>) {
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
registerSection('social_proof', 'moving_stats_row', MovingStatsRow as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 5. MOVING QUOTE FORM ═══
interface MovingQuoteContent { badge?: string; title: string; subtitle?: string; moveTypes?: string[]; whatsapp?: string; phone?: string; note?: string }
function MovingQuoteForm({ content }: SectionProps<MovingQuoteContent>) {
  const [form, setForm] = useState({ name: '', phone: '', type: '', from: '', to: '', date: '' })
  const [sent, setSent] = useState(false)
  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); if (!form.name || !form.phone) return
    const wa = content.whatsapp || content.phone?.replace(/\D/g, '') || ''
    const msg = `Nakliyat Teklif%0AAdi: ${encodeURIComponent(form.name)}%0ATel: ${form.phone}${form.type ? `%0ATur: ${encodeURIComponent(form.type)}` : ''}${form.from ? `%0ANereden: ${encodeURIComponent(form.from)}` : ''}${form.to ? `%0ANereye: ${encodeURIComponent(form.to)}` : ''}${form.date ? `%0ATarih: ${form.date}` : ''}`
    window.open(`https://wa.me/${wa}?text=${msg}`, '_blank'); setSent(true)
  }
  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto" style={{ maxWidth: '580px' }}>
        {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
        {content.subtitle && <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
        {sent ? (
          <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--color-bg)' }}><div className="text-5xl mb-4">🚚✅</div><h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Teklifiniz Alindi!</h3><p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Fiyat teklifi ile donus yapacagiz.</p></div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-2xl p-6 space-y-4" style={{ background: 'var(--color-bg)' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Ad Soyad *</label><input type="text" required value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Adiniz" /></div>
              <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Telefon *</label><input type="tel" required value={form.phone} onChange={(e) => update('phone', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="0555 000 00 00" /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {content.moveTypes && <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Tur</label><select value={form.type} onChange={(e) => update('type', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}><option value="">Seciniz…</option>{content.moveTypes.map((t) => <option key={t} value={t}>{t}</option>)}</select></div>}
              <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Tarih</label><input type="date" value={form.date} onChange={(e) => update('date', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Nereden</label><input type="text" value={form.from} onChange={(e) => update('from', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Mevcut adres" /></div>
              <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Nereye</label><input type="text" value={form.to} onChange={(e) => update('to', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Hedef adres" /></div>
            </div>
            <button type="submit" className="w-full py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>🚚 Teklif Al (WhatsApp)</button>
            {content.note && <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>{content.note}</p>}
          </form>
        )}
      </div>
    </section>
  )
}
registerSection('booking', 'moving_quote', MovingQuoteForm as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

export { MovingPackages, MovingServicesGrid, MovingProcessSteps, MovingStatsRow, MovingQuoteForm }
