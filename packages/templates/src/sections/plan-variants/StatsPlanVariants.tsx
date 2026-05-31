/**
 * @kepenk/templates — Plan-Based Stats Variants
 *
 * plan_free:       Horizontal row, plain text
 * plan_starter:    Card grid with icons
 * plan_growth:     Animated count-up on scroll
 * plan_pro:        Bento grid + gradient borders
 * plan_enterprise: Oversized kinetic counters + particle bg
 */

'use client'

import { useState, useEffect, useRef } from 'react'
import type { SectionProps } from '../../types/section-types'
import type { StatsContent } from '../../types/section-content'
import { registerSection } from '../../registry/section-registry'

type SP = SectionProps<StatsContent>
type Reg = React.ComponentType<SectionProps<Record<string, unknown>>>

function useCountUp(target: number, active: boolean, duration = 2000) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const steps = 60; let step = 0
    const timer = setInterval(() => {
      step++
      const p = Math.min(step / steps, 1)
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (step >= steps) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [active, target, duration])
  return val
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, vis }
}

/* ═══ FREE ═══ */
function StatsFree({ content }: SP) {
  return (
    <section className="bg-bg px-4 py-12 md:py-16">
      <div className="mx-auto max-w-2xl flex flex-wrap justify-center gap-8 md:gap-12">
        {content.stats.map((s, i) => (
          <div key={i} className="text-center">
            <span className="block text-3xl font-bold text-accent">{s.value}{s.suffix || ''}</span>
            <span className="text-sm text-foreground-secondary">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ═══ STARTER ═══ */
function StatsStarter({ content }: SP) {
  return (
    <section className="bg-bg px-4 py-16 md:py-20">
      <div className="mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6" style={{ maxWidth: 'var(--container-default)' }}>
        {content.stats.map((s, i) => (
          <div key={i} className="bg-surface rounded-xl p-5 text-center shadow-sm border border-border-subtle">
            {s.icon && <span className="text-2xl mb-2 block">{s.icon}</span>}
            <span className="block text-2xl md:text-3xl font-bold text-accent">{s.value}{s.suffix || ''}</span>
            <span className="text-sm text-foreground-secondary mt-1 block">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ═══ GROWTH ═══ */
function StatsGrowth({ content }: SP) {
  const { ref, vis } = useInView(0.3)
  return (
    <section ref={ref} className="relative bg-bg px-4 py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/3 to-transparent" />
      <div className="relative mx-auto grid grid-cols-2 md:grid-cols-4 gap-6" style={{ maxWidth: 'var(--container-default)' }}>
        {content.stats.map((s, i) => {
          const num = parseInt(s.value.replace(/[^0-9]/g, ''), 10) || 0
          return (
            <div key={i} className={`backdrop-blur-lg bg-surface/60 border border-border-subtle rounded-2xl p-6 md:p-8 text-center transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${i * 150}ms` }}>
              {s.icon && <span className="text-3xl mb-3 block">{s.icon}</span>}
              <CountUpDisplay target={num} active={vis} suffix={s.suffix} />
              <span className="text-sm text-foreground-secondary mt-2 block uppercase tracking-wider">{s.label}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function CountUpDisplay({ target, active, suffix }: { target: number; active: boolean; suffix?: string }) {
  const val = useCountUp(target, active)
  return <span className="block text-3xl md:text-4xl font-bold text-accent tabular-nums">{val}{suffix || ''}</span>
}

/* ═══ PRO ═══ */
function StatsPro({ content }: SP) {
  const { ref, vis } = useInView(0.2)
  return (
    <section ref={ref} className="relative bg-bg px-4 py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/3 via-transparent to-accent/5" />
      <div className="relative mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6" style={{ maxWidth: 'var(--container-default)' }}>
        {content.stats.map((s, i) => {
          const num = parseInt(s.value.replace(/[^0-9]/g, ''), 10) || 0
          return (
            <div key={i} className={`group relative transition-all duration-600 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${i * 150}ms` }}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/30 to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
              <div className="relative bg-surface border border-border-subtle rounded-2xl p-6 md:p-8 text-center">
                {s.icon && <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">{s.icon}</span>}
                <CountUpDisplay target={num} active={vis} suffix={s.suffix} />
                <span className="text-sm text-foreground-secondary mt-2 block uppercase tracking-wider">{s.label}</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ═══ ENTERPRISE ═══ */
function StatsEnterprise({ content }: SP) {
  const { ref, vis } = useInView(0.15)
  return (
    <section ref={ref} className="relative bg-black px-4 py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent/3" />
      <div className="relative mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8" style={{ maxWidth: 'var(--container-default)' }}>
        {content.stats.map((s, i) => {
          const num = parseInt(s.value.replace(/[^0-9]/g, ''), 10) || 0
          return (
            <div key={i} className={`backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 text-center transition-all duration-700 hover:bg-white/10 hover:border-accent/30 ${vis ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{ transitionDelay: `${i * 200}ms` }}>
              {s.icon && <span className="text-4xl mb-4 block">{s.icon}</span>}
              <span className="block text-5xl md:text-6xl lg:text-7xl font-bold text-accent tabular-nums">
                {vis ? <CountUpDisplay target={num} active={vis} suffix={s.suffix} /> : '0'}
              </span>
              <span className="text-sm text-white/50 mt-3 block uppercase tracking-widest">{s.label}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ═══ REGISTER ═══ */
registerSection('stats', 'plan_free', StatsFree as unknown as Reg)
registerSection('stats', 'plan_starter', StatsStarter as unknown as Reg)
registerSection('stats', 'plan_growth', StatsGrowth as unknown as Reg)
registerSection('stats', 'plan_pro', StatsPro as unknown as Reg)
registerSection('stats', 'plan_enterprise', StatsEnterprise as unknown as Reg)

export { StatsFree, StatsStarter, StatsGrowth, StatsPro, StatsEnterprise }
