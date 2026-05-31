/**
 * @kepenk/templates — Veteriner Section Components
 *
 * 5 sector-specific sections:
 * 1. PetServicesGrid — hizmet kartları (aşı, muayene, cerrahi, bakım)
 * 2. VetTeamSection — veteriner hekim profilleri & uzmanlıklar
 * 3. PetGalleryMasonry — hasta hayvan önce/sonra & mutlu evcil galeri
 * 4. VetStatsRow — istatistikler (muayene, aşı, operasyon)
 * 5. PetAppointmentForm — randevu talebi → WhatsApp
 */

'use client'

import { useState } from 'react'
import type { ComponentType } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// ═══════════════════════════════════════════
// 1. PET SERVICES GRID
// ═══════════════════════════════════════════

interface PetService {
 id: string
 emoji: string
 name: string
 description: string
 price?: string
 duration?: string
 badge?: string
 forPets?: string[]
}

interface PetServicesGridContent {
 badge?: string
 title: string
 subtitle?: string
 services: PetService[]
 ctaText?: string
 ctaHref?: string
}

function PetServicesGrid({ content }: SectionProps<PetServicesGridContent>) {
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
 <p className="text-base mb-8" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
 )}

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
 {(content.services || []).map((s) => (
 <div key={s.id} className="rounded-2xl border p-5 hover:shadow-md transition-shadow relative"
 style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
 {s.badge && (
 <span className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full"
 style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>{s.badge}</span>
 )}
 <span className="text-4xl mb-3 block">{s.emoji}</span>
 <h3 className="font-heading font-bold text-base mb-1" style={{ color: 'var(--color-text)' }}>{s.name}</h3>
 <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>{s.description}</p>
 <div className="flex items-center justify-between">
 <div>
 {s.price && <span className="text-sm font-bold" style={{ color: 'var(--color-accent)' }}>{s.price}</span>}
 {s.duration && <span className="text-xs ml-2" style={{ color: 'var(--color-text-muted)' }}>⏱ {s.duration}</span>}
 </div>
 {s.forPets && (
 <div className="flex gap-1">
 {s.forPets.map((p) => (
 <span key={p} className="text-xs px-2 py-0.5 rounded-full"
 style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>{p}</span>
 ))}
 </div>
 )}
 </div>
 </div>
 ))}
 </div>

 {content.ctaText && (
 <div className="text-center mt-8">
 <a href={content.ctaHref || '#'} className="inline-block px-8 py-3 rounded-full font-bold text-sm transition-transform hover:scale-105"
 style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>{content.ctaText}</a>
 </div>
 )}
 </div>
 </section>
 )
}

registerSection('services', 'pet_services_grid', PetServicesGrid as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 2. VET TEAM SECTION
// ═══════════════════════════════════════════

interface VetProfile {
 id: string
 emoji: string
 name: string
 title: string
 specialties: string[]
 education?: string
 experience?: string
 languages?: string[]
}

interface VetTeamSectionContent {
 badge?: string
 title: string
 subtitle?: string
 vets: VetProfile[]
}

function VetTeamSection({ content }: SectionProps<VetTeamSectionContent>) {
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
 {(content.vets || []).map((v) => (
 <div key={v.id} className="rounded-2xl border p-5 flex flex-col gap-3"
 style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
 <div className="flex items-center gap-3">
 <span className="text-5xl">{v.emoji}</span>
 <div>
 <h3 className="font-heading font-bold text-base" style={{ color: 'var(--color-text)' }}>{v.name}</h3>
 <p className="text-xs" style={{ color: 'var(--color-accent)' }}>{v.title}</p>
 {v.experience && <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{v.experience}</p>}
 </div>
 </div>
 <div className="flex flex-wrap gap-1">
 {v.specialties.map((s) => (
 <span key={s} className="text-xs px-2 py-0.5 rounded-full"
 style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>{s}</span>
 ))}
 </div>
 {v.education && <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>🎓 {v.education}</p>}
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}

registerSection('team', 'vet_team', VetTeamSection as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 3. PET GALLERY MASONRY
// ═══════════════════════════════════════════

interface PetGalleryItem {
 id: string
 emoji: string
 petName: string
 breed?: string
 story?: string
 tag?: string
}

interface PetGalleryMasonryContent {
 badge?: string
 title: string
 subtitle?: string
 items: PetGalleryItem[]
}

function PetGalleryMasonry({ content }: SectionProps<PetGalleryMasonryContent>) {
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
 <p className="text-base mb-8" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
 )}
 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
 {(content.items || []).map((item) => (
 <div key={item.id} className="rounded-2xl border overflow-hidden group"
 style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
 <div className="flex items-center justify-center relative"
 style={{ height: 120, background: 'var(--color-accent-light)' }}>
 <span className="text-5xl group-hover:scale-110 transition-transform">{item.emoji}</span>
 {item.tag && (
 <span className="absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full"
 style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>{item.tag}</span>
 )}
 </div>
 <div className="p-3">
 <p className="font-heading font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{item.petName}</p>
 {item.breed && <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{item.breed}</p>}
 {item.story && <p className="text-xs mt-1 line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>{item.story}</p>}
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}

registerSection('gallery', 'pet_gallery', PetGalleryMasonry as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 4. VET STATS ROW
// ═══════════════════════════════════════════

interface VetStat { value: string; label: string; icon: string }
interface VetStatsRowContent { stats: VetStat[] }

function VetStatsRow({ content }: SectionProps<VetStatsRowContent>) {
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

registerSection('social_proof', 'vet_stats_row', VetStatsRow as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 5. PET APPOINTMENT FORM
// ═══════════════════════════════════════════

interface PetAppointmentContent {
 badge?: string
 title: string
 subtitle?: string
 petTypes?: string[]
 reasons?: string[]
 whatsapp?: string
 phone?: string
 emergencyNote?: string
 note?: string
}

function PetAppointmentForm({ content }: SectionProps<PetAppointmentContent>) {
 const [form, setForm] = useState({ ownerName: '', phone: '', petName: '', petType: '', reason: '', note: '' })
 const [sent, setSent] = useState(false)
 const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault()
 if (!form.ownerName || !form.phone) return
 const waNum = content.whatsapp || content.phone?.replace(/\D/g, '') || ''
 const msg = `Veteriner Randevu%0ASahip: ${encodeURIComponent(form.ownerName)}%0ATelefon: ${form.phone}${form.petName ? `%0AHayvan: ${encodeURIComponent(form.petName)}` : ''}${form.petType ? `%0ATür: ${encodeURIComponent(form.petType)}` : ''}${form.reason ? `%0ANeden: ${encodeURIComponent(form.reason)}` : ''}${form.note ? `%0ANot: ${encodeURIComponent(form.note)}` : ''}`
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
 {content.emergencyNote && (
 <div className="mb-5 p-4 rounded-xl flex items-center gap-3"
 style={{ background: '#FEE2E2', border: '1px solid #DC2626' }}>
 <span className="text-2xl">🚨</span>
 <p className="text-sm font-medium" style={{ color: '#DC2626' }}>{content.emergencyNote}</p>
 </div>
 )}

 {sent ? (
 <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--color-bg)' }}>
 <div className="text-5xl mb-4">🐾✅</div>
 <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Randevunuz Alındı!</h3>
 <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>En kısa sürede sizi arayacağız.</p>
 </div>
 ) : (
 <form onSubmit={handleSubmit} className="rounded-2xl p-6 space-y-4" style={{ background: 'var(--color-bg)' }}>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Sahip Adı *</label>
 <input type="text" required value={form.ownerName} onChange={(e) => update('ownerName', e.target.value)}
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
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Hayvan Adı</label>
 <input type="text" value={form.petName} onChange={(e) => update('petName', e.target.value)}
 className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
 style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
 placeholder="Pamuk, Boncuk…" />
 </div>
 {content.petTypes && (
 <div>
 <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Hayvan Türü</label>
 <select value={form.petType} onChange={(e) => update('petType', e.target.value)}
 className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
 style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
 <option value="">Seçiniz…</option>
 {content.petTypes.map((t) => <option key={t} value={t}>{t}</option>)}
 </select>
 </div>
 )}
 </div>
 {content.reasons && (
 <div>
 <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Randevu Nedeni</label>
 <select value={form.reason} onChange={(e) => update('reason', e.target.value)}
 className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
 style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
 <option value="">Seçiniz…</option>
 {content.reasons.map((r) => <option key={r} value={r}>{r}</option>)}
 </select>
 </div>
 )}
 <div>
 <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Notunuz</label>
 <textarea rows={2} value={form.note} onChange={(e) => update('note', e.target.value)}
 className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none resize-none"
 style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
 placeholder="Belirtiler, özel durum…" />
 </div>
 <button type="submit"
 className="w-full py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
 style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
 🐾 Randevu Al (WhatsApp)
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

registerSection('booking', 'pet_appointment', PetAppointmentForm as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ Exports ═══
export { PetServicesGrid, VetTeamSection, PetGalleryMasonry, VetStatsRow, PetAppointmentForm }
