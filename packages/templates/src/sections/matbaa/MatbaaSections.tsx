/**
 * @kepenk/templates — Matbaa / Baskı Section Components
 *
 * 1. PrintProductGrid     — baskı ürünleri (kartvizit, broşür, afiş)
 * 2. PrintProcessSteps    — süreç adımları
 * 3. PrintMaterialBar     — malzeme/kağıt türleri
 * 4. PrintStatsRow        — istatistikler
 * 5. PrintQuoteForm       — teklif formu → WhatsApp
 */

'use client'

import { useState } from 'react'
import type { ComponentType } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// ═══ 1. PRINT PRODUCT GRID ═══
interface PrintProduct { id: string; emoji: string; name: string; description: string; minPrice?: string; badge?: string }
interface PrintProductGridContent { badge?: string; title: string; subtitle?: string; products: PrintProduct[] }
function PrintProductGrid({ content }: SectionProps<PrintProductGridContent>) {
  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
        {content.subtitle && <p className="text-base mb-8" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(content.products || []).map((p) => (
            <div key={p.id} className="rounded-2xl border p-5 hover:shadow-md transition-shadow relative" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
              {p.badge && <span className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>{p.badge}</span>}
              <span className="text-4xl mb-3 block">{p.emoji}</span>
              <h3 className="font-heading font-bold text-base mb-1" style={{ color: 'var(--color-text)' }}>{p.name}</h3>
              <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}>{p.description}</p>
              {p.minPrice && <span className="text-sm font-bold" style={{ color: 'var(--color-accent)' }}>{p.minPrice}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'print_products', PrintProductGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 2. PRINT PROCESS STEPS ═══
interface ProcessStep { step: number; emoji: string; title: string; description: string }
interface PrintProcessStepsContent { badge?: string; title: string; steps: ProcessStep[] }
function PrintProcessSteps({ content }: SectionProps<PrintProcessStepsContent>) {
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
registerSection('gallery', 'print_process', PrintProcessSteps as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 3. PRINT MATERIAL BAR ═══
interface Material { id: string; emoji: string; name: string; spec?: string }
interface PrintMaterialBarContent { title?: string; materials: Material[] }
function PrintMaterialBar({ content }: SectionProps<PrintMaterialBarContent>) {
  return (
    <section className="py-8 px-4" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto text-center" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {content.title && <p className="text-sm font-bold mb-4" style={{ color: 'var(--color-accent)' }}>{content.title}</p>}
        <div className="flex flex-wrap justify-center gap-3">
          {(content.materials || []).map((m) => (
            <div key={m.id} className="rounded-lg border px-3 py-2 text-center" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
              <span className="text-xl block">{m.emoji}</span>
              <p className="text-xs font-semibold" style={{ color: 'var(--color-text)' }}>{m.name}</p>
              {m.spec && <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{m.spec}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('social_proof', 'print_materials', PrintMaterialBar as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 4. PRINT STATS ROW ═══
interface PrintStat { value: string; label: string; icon: string }
interface PrintStatsRowContent { stats: PrintStat[] }
function PrintStatsRow({ content }: SectionProps<PrintStatsRowContent>) {
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
registerSection('social_proof', 'print_stats_row', PrintStatsRow as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 5. PRINT QUOTE FORM ═══
interface PrintQuoteContent { badge?: string; title: string; subtitle?: string; productTypes?: string[]; whatsapp?: string; phone?: string; note?: string }
function PrintQuoteForm({ content }: SectionProps<PrintQuoteContent>) {
  const [form, setForm] = useState({ name: '', phone: '', product: '', quantity: '', message: '' })
  const [sent, setSent] = useState(false)
  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); if (!form.name || !form.phone) return
    const wa = content.whatsapp || content.phone?.replace(/\D/g, '') || ''
    const msg = `Baski Teklif%0AAdi: ${encodeURIComponent(form.name)}%0ATel: ${form.phone}${form.product ? `%0AUrun: ${encodeURIComponent(form.product)}` : ''}${form.quantity ? `%0AAdet: ${form.quantity}` : ''}${form.message ? `%0ANot: ${encodeURIComponent(form.message)}` : ''}`
    window.open(`https://wa.me/${wa}?text=${msg}`, '_blank'); setSent(true)
  }
  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto" style={{ maxWidth: '580px' }}>
        {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
        {content.subtitle && <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
        {sent ? (
          <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--color-bg)' }}><div className="text-5xl mb-4">🖨️✅</div><h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Teklifiniz Alindi!</h3><p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Fiyat teklifimiz ile donus yapacagiz.</p></div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-2xl p-6 space-y-4" style={{ background: 'var(--color-bg)' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Ad Soyad *</label><input type="text" required value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Adiniz" /></div>
              <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Telefon *</label><input type="tel" required value={form.phone} onChange={(e) => update('phone', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="0555 000 00 00" /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {content.productTypes && <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Urun</label><select value={form.product} onChange={(e) => update('product', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}><option value="">Seciniz…</option>{content.productTypes.map((p) => <option key={p} value={p}>{p}</option>)}</select></div>}
              <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Adet</label><input type="number" value={form.quantity} onChange={(e) => update('quantity', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="500" /></div>
            </div>
            <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Detay</label><textarea rows={2} value={form.message} onChange={(e) => update('message', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none resize-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Boyut, renk, kagit turu…"></textarea></div>
            <button type="submit" className="w-full py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>🖨️ Teklif Al (WhatsApp)</button>
            {content.note && <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>{content.note}</p>}
          </form>
        )}
      </div>
    </section>
  )
}
registerSection('booking', 'print_quote', PrintQuoteForm as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

export { PrintProductGrid, PrintProcessSteps, PrintMaterialBar, PrintStatsRow, PrintQuoteForm }
