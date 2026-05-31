/**
 * @kepenk/templates — Kreş / Anaokulu Section Components
 *
 * 1. KinderProgramGrid — eğitim programları
 * 2. KinderAgeGroups — yaş grupları
 * 3. KinderFacilities — tesis/alan özellikleri
 * 4. KinderStatsRow — istatistikler
 * 5. KinderEnrollForm — kayıt formu → WhatsApp
 */

'use client'

import { useState } from 'react'
import type { ComponentType } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// ═══ 1. KINDER PROGRAM GRID ═══
interface KinderProgram { id: string; emoji: string; name: string; description: string; ageRange?: string; badge?: string }
interface KinderProgramGridContent { badge?: string; title: string; subtitle?: string; programs: KinderProgram[] }
function KinderProgramGrid({ content }: SectionProps<KinderProgramGridContent>) {
 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
 <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
 {content.subtitle && <p className="text-base mb-8" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
 {(content.programs || []).map((p) => (
 <div key={p.id} className="rounded-2xl border p-5 hover:shadow-md transition-shadow relative" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
 {p.badge && <span className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>{p.badge}</span>}
 <span className="text-4xl mb-3 block">{p.emoji}</span>
 <h3 className="font-heading font-bold text-base mb-1" style={{ color: 'var(--color-text)' }}>{p.name}</h3>
 <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}>{p.description}</p>
 {p.ageRange && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>{p.ageRange}</span>}
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}
registerSection('services', 'kinder_programs', KinderProgramGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 2. KINDER AGE GROUPS ═══
interface AgeGroup { id: string; emoji: string; name: string; range: string; capacity?: string }
interface KinderAgeGroupsContent { badge?: string; title?: string; groups: AgeGroup[] }
function KinderAgeGroups({ content }: SectionProps<KinderAgeGroupsContent>) {
 return (
 <section className="py-10 px-4" style={{ background: 'var(--color-accent-light)' }}>
 <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
 {content.title && <p className="text-center text-sm font-bold mb-6" style={{ color: 'var(--color-accent)' }}>{content.title}</p>}
 <div className="flex flex-wrap justify-center gap-4">
 {(content.groups || []).map((g) => (
 <div key={g.id} className="rounded-xl border px-5 py-4 text-center min-w-[120px]" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
 <span className="text-3xl block mb-2">{g.emoji}</span>
 <p className="text-xs font-bold" style={{ color: 'var(--color-text)' }}>{g.name}</p>
 <p className="text-xs" style={{ color: 'var(--color-accent)' }}>{g.range}</p>
 {g.capacity && <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{g.capacity}</p>}
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}
registerSection('gallery', 'kinder_age_groups', KinderAgeGroups as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 3. KINDER FACILITIES ═══
interface Facility { icon: string; title: string; description: string }
interface KinderFacilitiesContent { badge?: string; title: string; facilities: Facility[] }
function KinderFacilities({ content }: SectionProps<KinderFacilitiesContent>) {
 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-bg)' }}>
 <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
 {(content.facilities || []).map((f, i) => (
 <div key={i} className="rounded-2xl border p-4 text-center" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
 <span className="text-3xl block mb-2">{f.icon}</span>
 <h3 className="font-heading font-bold text-sm mb-1" style={{ color: 'var(--color-text)' }}>{f.title}</h3>
 <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{f.description}</p>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}
registerSection('services', 'kinder_facilities', KinderFacilities as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 4. KINDER STATS ROW ═══
interface KinderStat { value: string; label: string; icon: string }
interface KinderStatsRowContent { stats: KinderStat[] }
function KinderStatsRow({ content }: SectionProps<KinderStatsRowContent>) {
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
registerSection('social_proof', 'kinder_stats_row', KinderStatsRow as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ 5. KINDER ENROLL FORM ═══
interface KinderEnrollContent { badge?: string; title: string; subtitle?: string; ageGroups?: string[]; whatsapp?: string; phone?: string; note?: string }
function KinderEnrollForm({ content }: SectionProps<KinderEnrollContent>) {
 const [form, setForm] = useState({ parent: '', phone: '', child: '', age: '', message: '' })
 const [sent, setSent] = useState(false)
 const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))
 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault(); if (!form.parent || !form.phone) return
 const wa = content.whatsapp || content.phone?.replace(/\D/g, '') || ''
 const msg = `Kres Kayit%0AVeli: ${encodeURIComponent(form.parent)}%0ATel: ${form.phone}${form.child ? `%0ACocuk: ${encodeURIComponent(form.child)}` : ''}${form.age ? `%0AYas: ${encodeURIComponent(form.age)}` : ''}${form.message ? `%0ANot: ${encodeURIComponent(form.message)}` : ''}`
 window.open(`https://wa.me/${wa}?text=${msg}`, '_blank'); setSent(true)
 }
 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
 <div className="mx-auto" style={{ maxWidth: '580px' }}>
 {content.badge && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>{content.badge}</span>}
 <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>{content.title}</h2>
 {content.subtitle && <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>}
 {sent ? (
 <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--color-bg)' }}><div className="text-5xl mb-4">👶✅</div><h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Kaydiniz Alindi!</h3><p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>En kisa surede donus yapacagiz.</p></div>
 ) : (
 <form onSubmit={handleSubmit} className="rounded-2xl p-6 space-y-4" style={{ background: 'var(--color-bg)' }}>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Veli Adi *</label><input type="text" required value={form.parent} onChange={(e) => update('parent', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Adiniz" /></div>
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Telefon *</label><input type="tel" required value={form.phone} onChange={(e) => update('phone', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="0555 000 00 00" /></div>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Cocuk Adi</label><input type="text" value={form.child} onChange={(e) => update('child', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Cocugunuzun adi" /></div>
 {content.ageGroups && <div><label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Yas Grubu</label><select value={form.age} onChange={(e) => update('age', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}><option value="">Seciniz…</option>{content.ageGroups.map((a) => <option key={a} value={a}>{a}</option>)}</select></div>}
 </div>
 <button type="submit" className="w-full py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>👶 Kayit Ol (WhatsApp)</button>
 {content.note && <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>{content.note}</p>}
 </form>
 )}
 </div>
 </section>
 )
}
registerSection('booking', 'kinder_enroll', KinderEnrollForm as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

export { KinderProgramGrid, KinderAgeGroups, KinderFacilities, KinderStatsRow, KinderEnrollForm }
