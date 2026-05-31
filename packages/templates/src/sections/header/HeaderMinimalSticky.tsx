/**
 * @kepenk/templates — Header Section Components
 *
 * 9 variants: minimal_sticky, warm_medical, dark_glass, luxury_centered,
 * dark_industrial, corporate_mega, modern_app, overlay_menu, dual_bar
 */

'use client'

import { useState, useEffect } from 'react'
import type { SectionProps } from '../../types/section-types'
import type { HeaderContent } from '../../types/section-content'
import { registerSection } from '../../registry/section-registry'
import { EditableField } from '../../lib/EditableField'

// ─── MINIMAL STICKY ───

function HeaderMinimalSticky({ content, business, isEditing, onContentChange, settings }: SectionProps<HeaderContent>) {
 const [isOpen, setIsOpen] = useState(false)
 const [scrolled, setScrolled] = useState(false)

 useEffect(() => {
 const onScroll = () => setScrolled(window.scrollY > 10)
 window.addEventListener('scroll', onScroll, { passive: true })
 return () => window.removeEventListener('scroll', onScroll)
 }, [])

 const logoText = content.logo?.text ?? business.name

 return (
 <header
 className={`fixed top-0 inset-x-0 z-sticky transition-all ${
 scrolled ? 'bg-bg/95 backdrop-blur-sm shadow-sm' : 'bg-bg'
 }`}
 >
 <nav className="mx-auto flex items-center justify-between px-4 lg:px-8 h-16 lg:h-20" style={{ maxWidth: 'var(--container-xl)' }}>
 {/* Logo */}
 <div className="flex items-center gap-3">
 {content.logo?.type === 'image' && content.logo.imageUrl ? (
 <img src={content.logo.imageUrl} alt={content.logo.imageAlt ?? logoText} className="h-8 w-auto" />
 ) : (
 <EditableField
 value={logoText}
 isEditing={isEditing}
 onChange={(v) => onContentChange?.('logo.text', v)}
 as="span"
 className="font-heading font-bold text-xl text-foreground"
 />
 )}
 </div>

 {/* Desktop Nav */}
 <div className="hidden lg:flex items-center gap-8">
 {content.menuItems?.map((item, i) => (
 <a key={i} href={item.href} className="text-sm font-medium text-foreground-secondary hover:text-accent transition-colors">
 {item.label}
 </a>
 ))}
 {content.cta && (
 <a
 href={content.cta.href}
 className="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-accent text-on-accent hover:bg-accent-hover transition-colors"
 >
 {content.cta.text}
 </a>
 )}
 </div>

 {/* Mobile Hamburger */}
 <button
 className="lg:hidden p-2 text-foreground"
 onClick={() => setIsOpen(!isOpen)}
 aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'}
 >
 {isOpen ? (
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
 ) : (
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
 )}
 </button>
 </nav>

 {/* Mobile Menu */}
 {isOpen && (
 <div className="lg:hidden bg-bg border-t border-border px-4 py-6 space-y-4">
 {content.menuItems?.map((item, i) => (
 <a key={i} href={item.href} className="block text-lg font-medium text-foreground hover:text-accent" onClick={() => setIsOpen(false)}>
 {item.label}
 </a>
 ))}
 {content.cta && (
 <a href={content.cta.href} className="block text-center px-6 py-3 rounded-lg font-semibold bg-accent text-on-accent">
 {content.cta.text}
 </a>
 )}
 {business.phone && (
 <div className="pt-4 border-t border-border-subtle space-y-2 text-sm text-foreground-secondary">
 <a href={`tel:+${business.phoneClean}`} className="flex items-center gap-2">📞 {business.phone}</a>
 <span className="flex items-center gap-2">📍 {business.district}, {business.city}</span>
 </div>
 )}
 </div>
 )}
 </header>
 )
}

// Register
registerSection('header', 'minimal_sticky', HeaderMinimalSticky as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('header', 'default', HeaderMinimalSticky as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)

export { HeaderMinimalSticky }
