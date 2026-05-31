/**
 * @kepenk/templates — Plan-Based Hero Variants
 *
 * plan_free:       Tek sutun, bg renk, metin merkez, animasyonsuz
 * plan_starter:    2 sutun split, gradient overlay, fadeUp
 * plan_growth:     Parallax scroll, glassmorphism overlay
 * plan_pro:        Asimetrik 60/40, animated CTA, Ken Burns
 * plan_enterprise: Full-bleed cinematic, particle bg
 */

'use client'

import { useState, useEffect, useRef } from 'react'
import type { SectionProps } from '../../types/section-types'
import type { HeroContent } from '../../types/section-content'
import { registerSection } from '../../registry/section-registry'
import { EditableField } from '../../lib/EditableField'

type HP = SectionProps<HeroContent>
type Reg = React.ComponentType<SectionProps<Record<string, unknown>>>

/* ═══════════════════════════════════════════════
   FREE — Minimal, tek sutun, bg renk, sade
   ═══════════════════════════════════════════════ */

function HeroFree({ content, business, isEditing, onContentChange }: HP) {
  return (
    <section className="bg-bg px-4 py-16 md:py-24">
      <div className="mx-auto max-w-xl text-center">
        {content.badge && (
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-accent mb-3">
            {content.badge}
          </span>
        )}
        <EditableField
          value={content.title}
          isEditing={isEditing}
          onChange={(v) => onContentChange?.('title', v)}
          as="h1"
          className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight"
          placeholder="Isletme Adiniz"
        />
        {content.subtitle && (
          <EditableField
            value={content.subtitle}
            isEditing={isEditing}
            onChange={(v) => onContentChange?.('subtitle', v)}
            as="p"
            className="mt-4 text-base text-foreground-secondary leading-relaxed"
            placeholder="Kisa aciklama"
          />
        )}
        {content.cta1 && (
          <div className="mt-8">
            <a
              href={content.cta1.href}
              className="inline-flex items-center px-6 py-3 rounded-md font-semibold bg-accent text-on-accent hover:bg-accent-hover transition-colors text-sm"
            >
              {content.cta1.text}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   STARTER — 2 sutun split, gradient overlay
   ═══════════════════════════════════════════════ */

function HeroStarter({ content, business, isEditing, onContentChange }: HP) {
  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-[1]" />
      {content.backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${content.backgroundImage})` }}
        />
      )}
      {!content.backgroundImage && <div className="absolute inset-0 bg-surface-muted" />}

      <div className="relative z-10 mx-auto px-4 md:px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center" style={{ maxWidth: 'var(--container-default)' }}>
        <div>
          {content.badge && (
            <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase bg-accent/20 text-accent rounded-full mb-4">
              {content.badge}
            </span>
          )}
          <EditableField
            value={content.title}
            isEditing={isEditing}
            onChange={(v) => onContentChange?.('title', v)}
            as="h1"
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight"
            placeholder="Isletme Adiniz"
          />
          {content.subtitle && (
            <EditableField
              value={content.subtitle}
              isEditing={isEditing}
              onChange={(v) => onContentChange?.('subtitle', v)}
              as="p"
              className="mt-4 text-base md:text-lg text-white/80 max-w-lg leading-relaxed"
              placeholder="Kisa aciklama"
            />
          )}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            {content.cta1 && (
              <a href={content.cta1.href} className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg font-semibold bg-accent text-on-accent hover:bg-accent-hover transition-colors">
                {content.cta1.text}
              </a>
            )}
            {content.cta2 && (
              <a href={content.cta2.href} className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors">
                {content.cta2.text}
              </a>
            )}
          </div>
        </div>
        <div className="hidden md:block" />
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   GROWTH — Parallax, glassmorphism
   ═══════════════════════════════════════════════ */

function HeroGrowth({ content, business, isEditing, onContentChange }: HP) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax bg */}
      {content.backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url(${content.backgroundImage})`,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
      )}
      <div className="absolute inset-0 bg-black/40" />

      {/* Glassmorphism card */}
      <div className="relative z-10 mx-auto px-4 md:px-8" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 md:p-12 lg:p-16 text-center shadow-2xl">
          {content.badge && (
            <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider uppercase bg-accent/20 text-accent backdrop-blur rounded-full mb-6">
              {content.badge}
            </span>
          )}
          <EditableField
            value={content.title}
            isEditing={isEditing}
            onChange={(v) => onContentChange?.('title', v)}
            as="h1"
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight"
            placeholder="Isletme Adiniz"
          />
          {content.subtitle && (
            <EditableField
              value={content.subtitle}
              isEditing={isEditing}
              onChange={(v) => onContentChange?.('subtitle', v)}
              as="p"
              className="mt-5 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
              placeholder="Kisa aciklama"
            />
          )}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {content.cta1 && (
              <a href={content.cta1.href} className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold bg-accent text-on-accent hover:bg-accent-hover transition-all hover:scale-105 shadow-lg">
                {content.cta1.text}
              </a>
            )}
            {content.cta2 && (
              <a href={content.cta2.href} className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold border border-white/30 text-white backdrop-blur hover:bg-white/10 transition-colors">
                {content.cta2.text}
              </a>
            )}
          </div>
          {content.badges && content.badges.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white/60">
              {content.badges.map((b, i) => (
                <span key={i} className="flex items-center gap-1.5 backdrop-blur-sm bg-white/5 px-3 py-1 rounded-full">
                  {b.text}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   PRO — Asimetrik 60/40, Ken Burns, animated CTA
   ═══════════════════════════════════════════════ */

function HeroPro({ content, business, isEditing, onContentChange }: HP) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Ken Burns animated bg */}
      {content.backgroundImage && (
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center animate-[kenburns_20s_ease-in-out_infinite_alternate]"
            style={{ backgroundImage: `url(${content.backgroundImage})` }}
          />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

      <div className="relative z-10 mx-auto px-4 md:px-8 w-full" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* 60% text */}
          <div className="lg:col-span-3">
            {content.badge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full mb-6">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-xs font-bold tracking-wider uppercase text-accent">{content.badge}</span>
              </div>
            )}
            <EditableField
              value={content.title}
              isEditing={isEditing}
              onChange={(v) => onContentChange?.('title', v)}
              as="h1"
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-[1.1] tracking-tight"
              placeholder="Isletme Adiniz"
            />
            {content.subtitle && (
              <EditableField
                value={content.subtitle}
                isEditing={isEditing}
                onChange={(v) => onContentChange?.('subtitle', v)}
                as="p"
                className="mt-6 text-lg md:text-xl text-white/70 max-w-xl leading-relaxed"
                placeholder="Kisa aciklama"
              />
            )}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              {content.cta1 && (
                <a href={content.cta1.href} className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold bg-accent text-on-accent hover:bg-accent-hover transition-all hover:shadow-[0_0_30px_var(--color-accent)/40] hover:scale-[1.02]">
                  {content.cta1.text}
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </a>
              )}
              {content.cta2 && (
                <a href={content.cta2.href} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold border-2 border-white/20 text-white hover:border-white/50 transition-all">
                  {content.cta2.text}
                </a>
              )}
            </div>
          </div>
          {/* 40% decorative space */}
          <div className="hidden lg:flex lg:col-span-2 items-center justify-center">
            {content.badges && content.badges.length > 0 && (
              <div className="space-y-3">
                {content.badges.map((b, i) => (
                  <div key={i} className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-white/80 flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    {b.text}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ken Burns keyframe */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes kenburns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.1) translate(-1%, -1%); }
        }
      `}} />
    </section>
  )
}

/* ═══════════════════════════════════════════════
   ENTERPRISE — Full-bleed cinematic
   ═══════════════════════════════════════════════ */

function HeroEnterprise({ content, business, isEditing, onContentChange }: HP) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = []

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1,
        a: Math.random() * 0.5 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.a})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {content.backgroundImage && (
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${content.backgroundImage})` }} />
      )}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-[2]" />

      <div className="relative z-10 mx-auto px-4 md:px-8 text-center w-full" style={{ maxWidth: 'var(--container-default)' }}>
        {content.badge && (
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-8">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-semibold tracking-wider uppercase text-white/90">{content.badge}</span>
          </div>
        )}
        <EditableField
          value={content.title}
          isEditing={isEditing}
          onChange={(v) => onContentChange?.('title', v)}
          as="h1"
          className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-white leading-[1.05] tracking-tight"
          placeholder="Isletme Adiniz"
        />
        {content.subtitle && (
          <EditableField
            value={content.subtitle}
            isEditing={isEditing}
            onChange={(v) => onContentChange?.('subtitle', v)}
            as="p"
            className="mt-6 text-lg md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed font-light"
            placeholder="Kisa aciklama"
          />
        )}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {content.cta1 && (
            <a href={content.cta1.href} className="group relative inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full font-bold bg-accent text-on-accent overflow-hidden transition-all hover:shadow-[0_0_40px_var(--color-accent)/50] hover:scale-105">
              <span className="relative z-10">{content.cta1.text}</span>
            </a>
          )}
          {content.cta2 && (
            <a href={content.cta2.href} className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full font-semibold border border-white/20 text-white/90 hover:bg-white/5 backdrop-blur transition-all">
              {content.cta2.text}
            </a>
          )}
        </div>
        {content.badges && content.badges.length > 0 && (
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
            {content.badges.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                {b.text}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════
   REGISTER
   ═══════════════════════════════════════════════ */

registerSection('hero', 'plan_free', HeroFree as unknown as Reg)
registerSection('hero', 'plan_starter', HeroStarter as unknown as Reg)
registerSection('hero', 'plan_growth', HeroGrowth as unknown as Reg)
registerSection('hero', 'plan_pro', HeroPro as unknown as Reg)
registerSection('hero', 'plan_enterprise', HeroEnterprise as unknown as Reg)

export { HeroFree, HeroStarter, HeroGrowth, HeroPro, HeroEnterprise }
