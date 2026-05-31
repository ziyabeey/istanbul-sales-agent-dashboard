/**
 * @kepenk/templates — Avukat & Hukuk Bürosu Section Components
 *
 * 5 sector-specific sections:
 * 1. LegalPracticeAreas — uzmanlık alanları accordion/grid
 * 2. AttorneyProfileCard — avukat bio + unvanlar + CV
 * 3. CaseResultsShowcase — dava sonuçları / başarı hikayeleri
 * 4. LegalFAQAccordion — hukuki SSS (sektöre özel)
 * 5. ConsultationWidget — danışma talebi formu (WhatsApp yönlendirmeli)
 */

'use client'

import { useState } from 'react'
import type { ComponentType } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// ════════════════════════════════════════════
// 1. LEGAL PRACTICE AREAS
// ════════════════════════════════════════════

interface PracticeArea {
 id: string
 icon: string
 name: string
 description: string
 subAreas?: string[]
 ctaText?: string
 ctaHref?: string
}

interface LegalPracticeAreasContent {
 badge?: string
 title: string
 subtitle?: string
 areas: PracticeArea[]
 layout?: 'grid' | 'accordion'
}

function LegalPracticeAreas({ content }: SectionProps<LegalPracticeAreasContent>) {
 const [open, setOpen] = useState<string | null>(null)
 const areas = content.areas || []

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

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {areas.map((area) => (
 <div
 key={area.id}
 className="rounded-xl border overflow-hidden transition-shadow hover:shadow-md cursor-pointer"
 style={{
 borderColor: open === area.id ? 'var(--color-accent)' : 'var(--color-border)',
 background: 'var(--color-surface)',
 }}
 onClick={() => setOpen(open === area.id ? null : area.id)}
 >
 <div className="flex items-start gap-4 p-5">
 <span className="text-2xl shrink-0">{area.icon}</span>
 <div className="flex-1 min-w-0">
 <div className="flex items-center justify-between gap-2">
 <h3 className="font-heading font-semibold text-base" style={{ color: 'var(--color-text)' }}>
 {area.name}
 </h3>
 <span className="text-sm shrink-0 transition-transform duration-200"
 style={{
 color: 'var(--color-accent)',
 transform: open === area.id ? 'rotate(180deg)' : 'none',
 display: 'inline-block',
 }}>
 ▾
 </span>
 </div>
 <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>{area.description}</p>
 </div>
 </div>

 {open === area.id && (
 <div className="px-5 pb-5 pt-0" style={{ borderTop: '1px solid var(--color-border)' }}>
 {area.subAreas && area.subAreas.length > 0 && (
 <ul className="space-y-1 mt-3">
 {area.subAreas.map((s, i) => (
 <li key={i} className="flex items-center gap-2 text-sm"
 style={{ color: 'var(--color-text-secondary)' }}>
 <span style={{ color: 'var(--color-accent)' }}>▸</span>
 {s}
 </li>
 ))}
 </ul>
 )}
 {area.ctaText && (
 <a href={area.ctaHref || '#'}
 className="inline-block mt-4 text-sm font-semibold"
 style={{ color: 'var(--color-accent)' }}
 onClick={(e) => e.stopPropagation()}>
 {area.ctaText} →
 </a>
 )}
 </div>
 )}
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}

registerSection('services', 'legal_practice_areas', LegalPracticeAreas as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ════════════════════════════════════════════
// 2. ATTORNEY PROFILE CARD
// ════════════════════════════════════════════

interface BarAssociation {
 name: string
 year?: string
}

interface AttorneyProfileContent {
 badge?: string
 name: string
 title: string
 photo?: string
 bio?: string
 experience: string
 caseCount?: string
 winRate?: string
 education?: { degree: string; institution: string; year?: string }[]
 barMemberships?: BarAssociation[]
 languages?: string[]
 ctaConsultation?: { text: string; href: string }
 ctaLinkedIn?: string
}

function AttorneyProfileCard({ content }: SectionProps<AttorneyProfileContent>) {
 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
 <div className="mx-auto flex flex-col lg:flex-row gap-10 items-start" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
 {/* Photo column */}
 <div className="shrink-0 w-full lg:w-64">
 <div
 className="rounded-2xl overflow-hidden mx-auto lg:mx-0"
 style={{ width: 240, height: 300, background: 'var(--color-surface-muted)', maxWidth: '100%' }}
 >
 {content.photo ? (
 <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${content.photo})` }} />
 ) : (
 <div className="w-full h-full flex items-center justify-center text-7xl">⚖️</div>
 )}
 </div>
 {/* Stats under photo */}
 <div className="mt-4 space-y-2">
 {[
 { label: 'Deneyim', value: content.experience },
 { label: 'Dava', value: content.caseCount },
 { label: 'Başarı', value: content.winRate },
 ].filter((s) => s.value).map((s) => (
 <div key={s.label} className="flex justify-between text-sm px-1"
 style={{ color: 'var(--color-text-secondary)' }}>
 <span>{s.label}</span>
 <span className="font-bold" style={{ color: 'var(--color-accent)' }}>{s.value}</span>
 </div>
 ))}
 </div>
 </div>

 {/* Info column */}
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
 <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>{content.bio}</p>
 )}

 {/* Education */}
 {content.education && content.education.length > 0 && (
 <div className="mb-5">
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

 {/* Bar memberships */}
 {content.barMemberships && content.barMemberships.length > 0 && (
 <div className="mb-5">
 <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>
 ⚖️ Baro Üyelikleri
 </p>
 <div className="flex flex-wrap gap-2">
 {content.barMemberships.map((b, i) => (
 <span key={i} className="text-xs px-2 py-1 rounded"
 style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
 {b.name}{b.year ? ` (${b.year})` : ''}
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

 <div className="flex flex-wrap gap-3">
 {content.ctaConsultation && (
 <a href={content.ctaConsultation.href}
 className="px-6 py-3 rounded-lg font-bold text-sm transition-opacity hover:opacity-90"
 style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
 {content.ctaConsultation.text}
 </a>
 )}
 {content.ctaLinkedIn && (
 <a href={content.ctaLinkedIn} target="_blank" rel="noopener noreferrer"
 className="px-6 py-3 rounded-lg font-bold text-sm border transition-opacity hover:opacity-80"
 style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}>
 LinkedIn →
 </a>
 )}
 </div>
 </div>
 </div>
 </section>
 )
}

registerSection('team', 'attorney_profile', AttorneyProfileCard as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ════════════════════════════════════════════
// 3. CASE RESULTS SHOWCASE
// ════════════════════════════════════════════

interface CaseResult {
 id: string
 category: string
 title: string
 result: string
 detail?: string
 year?: number
 highlighted?: boolean
}

interface CaseResultsContent {
 badge?: string
 title: string
 subtitle?: string
 disclaimer?: string
 results: CaseResult[]
}

function CaseResultsShowcase({ content }: SectionProps<CaseResultsContent>) {
 const results = content.results || []

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

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
 {results.map((r) => (
 <div
 key={r.id}
 className="rounded-xl p-5 flex flex-col gap-3 border"
 style={{
 background: r.highlighted ? 'var(--color-accent)' : 'var(--color-surface)',
 borderColor: r.highlighted ? 'transparent' : 'var(--color-border)',
 }}
 >
 <div className="flex items-center justify-between gap-2">
 <span
 className="text-xs font-semibold px-2 py-0.5 rounded"
 style={{
 background: r.highlighted ? 'rgba(255,255,255,0.2)' : 'var(--color-accent-light)',
 color: r.highlighted ? '#fff' : 'var(--color-accent)',
 }}
 >
 {r.category}
 </span>
 {r.year && (
 <span className="text-xs" style={{ color: r.highlighted ? 'rgba(255,255,255,0.7)' : 'var(--color-text-muted)' }}>
 {r.year}
 </span>
 )}
 </div>
 <h3 className="font-heading font-semibold text-sm leading-snug"
 style={{ color: r.highlighted ? '#fff' : 'var(--color-text)' }}>
 {r.title}
 </h3>
 <p className="font-bold text-base"
 style={{ color: r.highlighted ? '#fff' : 'var(--color-accent)' }}>
 {r.result}
 </p>
 {r.detail && (
 <p className="text-xs" style={{ color: r.highlighted ? 'rgba(255,255,255,0.8)' : 'var(--color-text-secondary)' }}>
 {r.detail}
 </p>
 )}
 </div>
 ))}
 </div>

 {content.disclaimer && (
 <p className="text-xs mt-6" style={{ color: 'var(--color-text-muted)' }}>* {content.disclaimer}</p>
 )}
 </div>
 </section>
 )
}

registerSection('social_proof', 'case_results', CaseResultsShowcase as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ════════════════════════════════════════════
// 4. LEGAL FAQ ACCORDION
// ════════════════════════════════════════════

interface LegalFAQItem {
 id: string
 question: string
 answer: string
 category?: string
}

interface LegalFAQContent {
 badge?: string
 title: string
 subtitle?: string
 items: LegalFAQItem[]
 ctaText?: string
 ctaHref?: string
}

function LegalFAQAccordion({ content }: SectionProps<LegalFAQContent>) {
 const [open, setOpen] = useState<string | null>(null)
 const items = content.items || []

 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
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
 {items.map((item) => (
 <div key={item.id} className="rounded-xl border overflow-hidden"
 style={{ borderColor: open === item.id ? 'var(--color-accent)' : 'var(--color-border)' }}>
 <button
 className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
 style={{ background: open === item.id ? 'var(--color-accent-light)' : 'var(--color-bg)' }}
 onClick={() => setOpen(open === item.id ? null : item.id)}
 >
 <span className="font-semibold text-sm pr-4" style={{ color: 'var(--color-text)' }}>
 {item.question}
 </span>
 <span className="text-lg shrink-0 transition-transform duration-200"
 style={{
 color: 'var(--color-accent)',
 transform: open === item.id ? 'rotate(45deg)' : 'none',
 display: 'inline-block',
 }}>
 +
 </span>
 </button>
 {open === item.id && (
 <div className="px-5 py-4" style={{ background: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}>
 <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
 {item.answer}
 </p>
 </div>
 )}
 </div>
 ))}
 </div>

 {content.ctaText && (
 <div className="text-center mt-8">
 <a href={content.ctaHref || '#'}
 className="inline-block px-8 py-3 rounded-lg font-bold text-sm transition-opacity hover:opacity-90"
 style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
 {content.ctaText}
 </a>
 </div>
 )}
 </div>
 </section>
 )
}

registerSection('faq', 'legal_faq', LegalFAQAccordion as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ════════════════════════════════════════════
// 5. CONSULTATION WIDGET
// ════════════════════════════════════════════

interface ConsultationContent {
 badge?: string
 title: string
 subtitle?: string
 practiceAreas?: string[]
 whatsapp?: string
 phone?: string
 email?: string
 isFreeFirst?: boolean
 freeMinutes?: number
 note?: string
}

function ConsultationWidget({ content }: SectionProps<ConsultationContent>) {
 const [name, setName] = useState('')
 const [phone, setPhone] = useState('')
 const [area, setArea] = useState('')
 const [message, setMessage] = useState('')
 const [sent, setSent] = useState(false)

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault()
 if (!name || !phone) return
 const waNum = content.whatsapp || content.phone?.replace(/\D/g, '') || ''
 const text = `Merhaba, danışmanlık talep ediyorum.%0AİSİM: ${encodeURIComponent(name)}%0ATEL: ${phone}${area ? `%0AKONU: ${encodeURIComponent(area)}` : ''}${message ? `%0AAÇIKLAMA: ${encodeURIComponent(message)}` : ''}`
 window.open(`https://wa.me/${waNum}?text=${text}`, '_blank')
 setSent(true)
 }

 return (
 <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-bg)' }}>
 <div className="mx-auto" style={{ maxWidth: '600px' }}>
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
 <div className="mb-6 p-4 rounded-xl flex items-center gap-3"
 style={{ background: 'var(--color-accent-light)', border: '1px solid var(--color-accent)' }}>
 <span className="text-2xl">⚖️</span>
 <p className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
 İlk {content.freeMinutes || 15} dakika <strong>ücretsiz</strong> ön değerlendirme görüşmesi
 </p>
 </div>
 )}

 {sent ? (
 <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--color-surface)' }}>
 <div className="text-5xl mb-4">✅</div>
 <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
 Talebiniz İletildi
 </h3>
 <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
 En kısa sürede WhatsApp üzerinden iletişime geçeceğiz.
 </p>
 </div>
 ) : (
 <form onSubmit={handleSubmit} className="rounded-2xl p-6 space-y-4"
 style={{ background: 'var(--color-surface)' }}>
 <div>
 <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
 Ad Soyad *
 </label>
 <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
 className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
 style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
 placeholder="Adınız Soyadınız" />
 </div>
 <div>
 <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
 Telefon *
 </label>
 <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
 className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
 style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
 placeholder="0555 000 00 00" />
 </div>
 {content.practiceAreas && content.practiceAreas.length > 0 && (
 <div>
 <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
 Hukuki Konu
 </label>
 <select value={area} onChange={(e) => setArea(e.target.value)}
 className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
 style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
 <option value="">Seçiniz…</option>
 {content.practiceAreas.map((a) => (
 <option key={a} value={a}>{a}</option>
 ))}
 </select>
 </div>
 )}
 <div>
 <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
 Kısa Açıklama
 </label>
 <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)}
 className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none resize-none"
 style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
 placeholder="Durumunuzu kısaca anlatın…" />
 </div>
 <button type="submit"
 className="w-full py-3 rounded-lg font-bold text-sm transition-opacity hover:opacity-90"
 style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
 💬 Danışma Talep Et (WhatsApp)
 </button>
 {content.note && (
 <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>{content.note}</p>
 )}
 </form>
 )}

 <div className="flex gap-3 mt-4 justify-center flex-wrap">
 {content.phone && (
 <a href={`tel:${content.phone.replace(/\D/g, '')}`}
 className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border"
 style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
 📞 {content.phone}
 </a>
 )}
 {content.email && (
 <a href={`mailto:${content.email}`}
 className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border"
 style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
 ✉️ E-posta
 </a>
 )}
 </div>
 </div>
 </section>
 )
}

registerSection('booking', 'consultation_widget', ConsultationWidget as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('contact', 'consultation_legal', ConsultationWidget as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ Exports ═══
export { LegalPracticeAreas, AttorneyProfileCard, CaseResultsShowcase, LegalFAQAccordion, ConsultationWidget }
