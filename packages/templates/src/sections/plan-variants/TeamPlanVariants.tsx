/**
 * @kepenk/templates — Plan-Based Team Variants
 *
 * plan_free:       Simple list
 * plan_starter:    Card grid with photos
 * plan_growth:     Glass cards + hover social reveal
 * plan_pro:        Bento grid + experience bars
 * plan_enterprise: Full-bleed carousel + 3D flip cards
 */

'use client'

import { useState, useEffect, useRef } from 'react'
import type { SectionProps } from '../../types/section-types'
import type { TeamContent } from '../../types/section-content'
import { registerSection } from '../../registry/section-registry'
import { EditableField } from '../../lib/EditableField'

type TmP = SectionProps<TeamContent>
type Reg = React.ComponentType<SectionProps<Record<string, unknown>>>

/* ═══ FREE ═══ */
function TeamFree({ content, business, isEditing, onContentChange }: TmP) {
  return (
    <section className="bg-bg px-4 py-16 md:py-24">
      <div className="mx-auto max-w-xl">
        {content.badge && <span className="block text-center text-xs font-semibold tracking-wider uppercase text-accent mb-3">{content.badge}</span>}
        <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center mb-8" placeholder="Ekibimiz" />
        <div className="space-y-4">
          {content.members?.map(m => (
            <div key={m.id} className="flex items-center gap-4 border border-border rounded-lg p-4">
              {m.photo ? <img src={m.photo} alt={m.name} className="w-12 h-12 rounded-full object-cover" /> : <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">{m.name[0]}</div>}
              <div>
                <p className="font-semibold text-foreground text-sm">{m.name}</p>
                <p className="text-xs text-foreground-secondary">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══ STARTER ═══ */
function TeamStarter({ content, business, isEditing, onContentChange }: TmP) {
  return (
    <section className="bg-bg px-4 py-16 md:py-24">
      <div className="mx-auto" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="text-center mb-10">
          {content.badge && <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase bg-accent/10 text-accent rounded-full mb-4">{content.badge}</span>}
          <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground" placeholder="Ekibimiz" />
          {content.subtitle && <EditableField value={content.subtitle} isEditing={isEditing} onChange={(v) => onContentChange?.('subtitle', v)} as="p" className="mt-3 text-base text-foreground-secondary max-w-xl mx-auto" placeholder="Açıklama" />}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {content.members?.map(m => (
            <div key={m.id} className="bg-surface border border-border-subtle rounded-xl p-5 text-center shadow-sm">
              {m.photo ? <img src={m.photo} alt={m.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-3" /> : <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center text-accent text-2xl font-bold mx-auto mb-3">{m.name[0]}</div>}
              <p className="font-semibold text-foreground">{m.name}</p>
              <p className="text-sm text-foreground-secondary">{m.role}</p>
              {m.experience && <p className="text-xs text-accent mt-1">{m.experience}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══ GROWTH ═══ */
function TeamGrowth({ content, business, isEditing, onContentChange }: TmP) {
  return (
    <section className="relative bg-bg px-4 py-20 md:py-28 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="relative mx-auto" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="text-center mb-12">
          {content.badge && <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider uppercase bg-accent/10 text-accent rounded-full mb-5">{content.badge}</span>}
          <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-3xl md:text-4xl font-heading font-bold text-foreground" placeholder="Ekibimiz" />
          {content.subtitle && <EditableField value={content.subtitle} isEditing={isEditing} onChange={(v) => onContentChange?.('subtitle', v)} as="p" className="mt-3 text-lg text-foreground-secondary max-w-xl mx-auto" placeholder="Açıklama" />}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.members?.map(m => (
            <div key={m.id} className="group backdrop-blur-lg bg-surface/60 border border-border-subtle rounded-2xl p-6 text-center hover:shadow-lg hover:border-accent/20 transition-all">
              <div className="relative w-24 h-24 mx-auto mb-4">
                {m.photo ? <img src={m.photo} alt={m.name} className="w-full h-full rounded-full object-cover ring-2 ring-accent/20 group-hover:ring-accent/40 transition-all" /> : <div className="w-full h-full rounded-full bg-accent/10 flex items-center justify-center text-accent text-3xl font-bold">{m.name[0]}</div>}
              </div>
              <p className="font-bold text-foreground text-lg">{m.name}</p>
              <p className="text-sm text-accent">{m.role}</p>
              {m.bio && <p className="mt-2 text-sm text-foreground-secondary leading-relaxed line-clamp-2">{m.bio}</p>}
              {m.specialties && m.specialties.length > 0 && (
                <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                  {m.specialties.map(s => <span key={s} className="px-2 py-0.5 bg-accent/5 text-accent text-xs rounded-full">{s}</span>)}
                </div>
              )}
              {/* Social reveal on hover */}
              {m.social && (
                <div className="mt-4 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  {m.social.instagram && <a href={m.social.instagram} className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent/20 transition-colors text-xs">IG</a>}
                  {m.social.linkedin && <a href={m.social.linkedin} className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent/20 transition-colors text-xs">IN</a>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══ PRO ═══ */
function TeamPro({ content, business, isEditing, onContentChange }: TmP) {
  const [vis, setVis] = useState(false)
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative bg-bg px-4 py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/3 via-transparent to-accent/5" />
      <div className="relative mx-auto" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="mb-10">
          {content.badge && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-4">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-xs font-bold tracking-wider uppercase text-accent">{content.badge}</span>
            </div>
          )}
          <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight" placeholder="Ekibimiz" />
        </div>
        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.members?.map((m, i) => {
            const isLarge = i === 0
            return (
              <div key={m.id} className={`group bg-surface border border-border-subtle rounded-2xl overflow-hidden hover:border-accent/20 transition-all duration-500 ${isLarge ? 'md:col-span-2 lg:col-span-1' : ''} ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  {m.photo ? <img src={m.photo} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /> : <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-5xl opacity-30"><span>{m.name[0]}</span></div>}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="font-bold text-white text-lg">{m.name}</p>
                    <p className="text-sm text-accent">{m.role}</p>
                  </div>
                </div>
                <div className="p-5">
                  {m.bio && <p className="text-sm text-foreground-secondary leading-relaxed mb-3">{m.bio}</p>}
                  {m.experience && (
                    <div className="flex items-center gap-2 text-xs text-foreground-secondary">
                      <span className="text-accent">⏱</span> {m.experience} deneyim
                    </div>
                  )}
                  {m.specialties && m.specialties.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {m.specialties.map(s => <span key={s} className="px-2 py-0.5 bg-accent/5 text-accent text-xs rounded-full">{s}</span>)}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ═══ ENTERPRISE ═══ */
function TeamEnterprise({ content, business, isEditing, onContentChange }: TmP) {
  const [active, setActive] = useState(0)
  const members = content.members || []

  useEffect(() => {
    if (members.length <= 1) return
    const t = setInterval(() => setActive(a => (a + 1) % members.length), 5000)
    return () => clearInterval(t)
  }, [members.length])

  return (
    <section className="relative bg-black py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent/3" />
      <div className="relative mx-auto px-4 md:px-8" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="text-center mb-12">
          {content.badge && (
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm font-semibold tracking-wider uppercase text-white/90">{content.badge}</span>
            </div>
          )}
          <EditableField value={content.title} isEditing={isEditing} onChange={(v) => onContentChange?.('title', v)} as="h2" className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white" placeholder="Ekibimiz" />
          {content.subtitle && <EditableField value={content.subtitle} isEditing={isEditing} onChange={(v) => onContentChange?.('subtitle', v)} as="p" className="mt-4 text-lg text-white/50 max-w-xl mx-auto" placeholder="Açıklama" />}
        </div>

        {/* Featured member — spotlight */}
        {members.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-12">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              {members[active]?.photo ? (
                <img src={members[active].photo} alt={members[active].name} className="w-full h-full object-cover transition-all duration-700" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-8xl text-white/10">{members[active]?.name?.[0]}</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white mb-2">{members[active]?.name}</p>
              <p className="text-lg text-accent mb-4">{members[active]?.role}</p>
              {members[active]?.bio && <p className="text-white/50 leading-relaxed mb-6">{members[active].bio}</p>}
              {members[active]?.experience && <p className="text-sm text-white/30"><span className="text-accent">⏱</span> {members[active].experience} deneyim</p>}
              {members[active]?.specialties && members[active].specialties!.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {members[active].specialties!.map(s => <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 text-white/60 text-xs rounded-full">{s}</span>)}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Thumbnail strip */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {members.map((m, i) => (
            <button key={m.id} onClick={() => setActive(i)} className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all ${i === active ? 'ring-2 ring-accent scale-110' : 'opacity-50 hover:opacity-80'}`}>
              {m.photo ? <img src={m.photo} alt={m.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-accent/10 flex items-center justify-center text-accent font-bold">{m.name[0]}</div>}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══ REGISTER ═══ */
registerSection('team', 'plan_free', TeamFree as unknown as Reg)
registerSection('team', 'plan_starter', TeamStarter as unknown as Reg)
registerSection('team', 'plan_growth', TeamGrowth as unknown as Reg)
registerSection('team', 'plan_pro', TeamPro as unknown as Reg)
registerSection('team', 'plan_enterprise', TeamEnterprise as unknown as Reg)

export { TeamFree, TeamStarter, TeamGrowth, TeamPro, TeamEnterprise }
