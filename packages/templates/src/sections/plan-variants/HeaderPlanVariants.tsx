/**
 * @kepenk/templates — Plan-Based Header Variants
 *
 * plan_free:       Minimal bar, logo + tel
 * plan_starter:    Sticky + blur on scroll
 * plan_growth:     Glass nav, backdrop-blur, gradient line
 * plan_pro:        Animated nav + smooth transitions
 * plan_enterprise: Mega header, topbar + main nav
 */

'use client'

import { useState, useEffect } from 'react'
import type { SectionProps } from '../../types/section-types'
import type { HeaderContent } from '../../types/section-content'
import { registerSection } from '../../registry/section-registry'
import { EditableField } from '../../lib/EditableField'

type HP = SectionProps<HeaderContent>
type Reg = React.ComponentType<SectionProps<Record<string, unknown>>>

function MobileMenu({ content, business, onClose }: { content: HeaderContent; business: any; onClose: () => void }) {
  return (
    <div className="lg:hidden bg-bg border-t border-border px-4 py-6 space-y-4">
      {content.menuItems?.map((item, i) => (
        <a key={i} href={item.href} className="block text-lg font-medium text-foreground hover:text-accent" onClick={onClose}>{item.label}</a>
      ))}
      {content.cta && (
        <a href={content.cta.href} className="block text-center px-6 py-3 rounded-lg font-semibold bg-accent text-on-accent">{content.cta.text}</a>
      )}
      {business.phone && (
        <div className="pt-4 border-t border-border-subtle text-sm text-foreground-secondary space-y-2">
          <a href={`tel:+${business.phoneClean}`}>Tel: {business.phone}</a>
        </div>
      )}
    </div>
  )
}

function HamburgerBtn({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button className="lg:hidden p-2 text-foreground" onClick={onClick} aria-label="Menu">
      {isOpen ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
      )}
    </button>
  )
}

/* ═══════════════════════════════════════════════
   FREE — Minimal bar, logo + phone
   ═══════════════════════════════════════════════ */

function HeaderFree({ content, business, isEditing, onContentChange }: HP) {
  const [isOpen, setIsOpen] = useState(false)
  const logoText = content.logo?.text ?? business.name

  return (
    <header className="bg-bg border-b border-border">
      <nav className="mx-auto flex items-center justify-between px-4 h-14" style={{ maxWidth: 'var(--container-default)' }}>
        <EditableField value={logoText} isEditing={isEditing} onChange={(v) => onContentChange?.('logo.text', v)} as="span" className="font-heading font-bold text-foreground" />
        <div className="hidden lg:flex items-center gap-6">
          {content.menuItems?.map((item, i) => (
            <a key={i} href={item.href} className="text-sm text-foreground-secondary hover:text-accent transition-colors">{item.label}</a>
          ))}
        </div>
        {business.phone && (
          <a href={`tel:+${business.phoneClean}`} className="hidden sm:inline text-sm font-medium text-accent">{business.phone}</a>
        )}
        <HamburgerBtn isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </nav>
      {isOpen && <MobileMenu content={content} business={business} onClose={() => setIsOpen(false)} />}
    </header>
  )
}

/* ═══════════════════════════════════════════════
   STARTER — Sticky + blur scroll
   ═══════════════════════════════════════════════ */

function HeaderStarter({ content, business, isEditing, onContentChange }: HP) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const logoText = content.logo?.text ?? business.name

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-bg/95 backdrop-blur-sm shadow-sm' : 'bg-bg'}`}>
      <nav className="mx-auto flex items-center justify-between px-4 lg:px-8 h-16" style={{ maxWidth: 'var(--container-default)' }}>
        <EditableField value={logoText} isEditing={isEditing} onChange={(v) => onContentChange?.('logo.text', v)} as="span" className="font-heading font-bold text-xl text-foreground" />
        <div className="hidden lg:flex items-center gap-8">
          {content.menuItems?.map((item, i) => (
            <a key={i} href={item.href} className="text-sm font-medium text-foreground-secondary hover:text-accent transition-colors">{item.label}</a>
          ))}
          {content.cta && (
            <a href={content.cta.href} className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-accent text-on-accent hover:bg-accent-hover transition-colors">{content.cta.text}</a>
          )}
        </div>
        <HamburgerBtn isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </nav>
      {isOpen && <MobileMenu content={content} business={business} onClose={() => setIsOpen(false)} />}
    </header>
  )
}

/* ═══════════════════════════════════════════════
   GROWTH — Glass nav, gradient line
   ═══════════════════════════════════════════════ */

function HeaderGrowth({ content, business, isEditing, onContentChange }: HP) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const logoText = content.logo?.text ?? business.name

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-bg/80 backdrop-blur-xl shadow-lg' : 'bg-transparent'}`}>
      {/* Gradient accent line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />
      <nav className="mx-auto flex items-center justify-between px-4 lg:px-8 h-16 lg:h-18" style={{ maxWidth: 'var(--container-default)' }}>
        <EditableField value={logoText} isEditing={isEditing} onChange={(v) => onContentChange?.('logo.text', v)} as="span" className="font-heading font-bold text-xl text-foreground" />
        <div className="hidden lg:flex items-center gap-8">
          {content.menuItems?.map((item, i) => (
            <a key={i} href={item.href} className="text-sm font-medium text-foreground-secondary hover:text-accent transition-all hover:-translate-y-0.5">{item.label}</a>
          ))}
          {content.cta && (
            <a href={content.cta.href} className="px-6 py-2.5 rounded-xl text-sm font-bold bg-accent text-on-accent hover:bg-accent-hover transition-all hover:shadow-lg hover:scale-105 backdrop-blur">{content.cta.text}</a>
          )}
        </div>
        <HamburgerBtn isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </nav>
      {isOpen && <MobileMenu content={content} business={business} onClose={() => setIsOpen(false)} />}
    </header>
  )
}

/* ═══════════════════════════════════════════════
   PRO — Animated nav, smooth transitions
   ═══════════════════════════════════════════════ */

function HeaderPro({ content, business, isEditing, onContentChange }: HP) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const logoText = content.logo?.text ?? business.name

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-bg/90 backdrop-blur-2xl shadow-xl py-0' : 'bg-transparent py-2'}`}>
      <nav className="mx-auto flex items-center justify-between px-4 lg:px-8 h-16 lg:h-20" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-on-accent text-sm font-bold">
            {logoText.charAt(0)}
          </div>
          <EditableField value={logoText} isEditing={isEditing} onChange={(v) => onContentChange?.('logo.text', v)} as="span" className="font-heading font-bold text-xl text-foreground" />
        </div>
        <div className="hidden lg:flex items-center gap-1">
          {content.menuItems?.map((item, i) => (
            <a key={i} href={item.href} className="px-4 py-2 rounded-lg text-sm font-medium text-foreground-secondary hover:text-accent hover:bg-accent/5 transition-all">{item.label}</a>
          ))}
        </div>
        <div className="hidden lg:flex items-center gap-3">
          {business.phone && (
            <a href={`tel:+${business.phoneClean}`} className="text-sm text-foreground-muted hover:text-accent transition-colors">{business.phone}</a>
          )}
          {content.cta && (
            <a href={content.cta.href} className="group px-6 py-2.5 rounded-xl text-sm font-bold bg-accent text-on-accent hover:bg-accent-hover transition-all hover:shadow-[0_0_20px_var(--color-accent)/30]">
              {content.cta.text}
            </a>
          )}
        </div>
        <HamburgerBtn isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </nav>
      {isOpen && <MobileMenu content={content} business={business} onClose={() => setIsOpen(false)} />}
    </header>
  )
}

/* ═══════════════════════════════════════════════
   ENTERPRISE — Mega header, topbar + main nav
   ═══════════════════════════════════════════════ */

function HeaderEnterprise({ content, business, isEditing, onContentChange }: HP) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const logoText = content.logo?.text ?? business.name

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Top bar */}
      <div className={`bg-surface-muted text-xs transition-all duration-300 overflow-hidden ${scrolled ? 'h-0' : 'h-9'}`}>
        <div className="mx-auto flex items-center justify-between px-4 lg:px-8 h-9" style={{ maxWidth: 'var(--container-default)' }}>
          <div className="flex items-center gap-4 text-foreground-muted">
            {business.phone && <a href={`tel:+${business.phoneClean}`} className="hover:text-accent transition-colors">{business.phone}</a>}
            {business.email && <span className="hidden md:inline">{business.email}</span>}
          </div>
          <div className="flex items-center gap-3 text-foreground-muted">
            {business.district && <span>{business.district}, {business.city}</span>}
          </div>
        </div>
      </div>
      {/* Main nav */}
      <nav className={`transition-all duration-500 ${scrolled ? 'bg-bg/95 backdrop-blur-2xl shadow-2xl' : 'bg-bg/80 backdrop-blur-lg'}`}>
        <div className="mx-auto flex items-center justify-between px-4 lg:px-8 h-16 lg:h-20" style={{ maxWidth: 'var(--container-default)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-hover rounded-xl flex items-center justify-center text-on-accent font-bold shadow">
              {logoText.charAt(0)}
            </div>
            <EditableField value={logoText} isEditing={isEditing} onChange={(v) => onContentChange?.('logo.text', v)} as="span" className="font-heading font-bold text-xl text-foreground" />
          </div>
          <div className="hidden lg:flex items-center gap-1">
            {content.menuItems?.map((item, i) => (
              <a key={i} href={item.href} className="px-4 py-2 rounded-lg text-sm font-medium text-foreground-secondary hover:text-accent hover:bg-accent/5 transition-all">{item.label}</a>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-3">
            {content.cta && (
              <a href={content.cta.href} className="px-7 py-3 rounded-xl text-sm font-bold bg-accent text-on-accent hover:bg-accent-hover transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]">{content.cta.text}</a>
            )}
          </div>
          <HamburgerBtn isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </div>
      </nav>
      {isOpen && <MobileMenu content={content} business={business} onClose={() => setIsOpen(false)} />}
    </header>
  )
}

/* ═══════════════════════════════════════════════
   REGISTER
   ═══════════════════════════════════════════════ */

registerSection('header', 'plan_free', HeaderFree as unknown as Reg)
registerSection('header', 'plan_starter', HeaderStarter as unknown as Reg)
registerSection('header', 'plan_growth', HeaderGrowth as unknown as Reg)
registerSection('header', 'plan_pro', HeaderPro as unknown as Reg)
registerSection('header', 'plan_enterprise', HeaderEnterprise as unknown as Reg)

export { HeaderFree, HeaderStarter, HeaderGrowth, HeaderPro, HeaderEnterprise }
