/**
 * @kepenk/templates — Hero Section Components
 *
 * fullscreen_overlay: Most common hero — full-screen photo + dark overlay + centered text.
 */

'use client'

import type { SectionProps } from '../../types/section-types'
import type { HeroContent } from '../../types/section-content'
import { registerSection } from '../../registry/section-registry'
import { EditableField } from '../../lib/EditableField'

function HeroFullscreenOverlay({ content, business, isEditing, onContentChange }: SectionProps<HeroContent>) {
 const overlayOpacity = content.overlayOpacity ?? 0.5

 return (
 <section
 className="relative flex items-center justify-center text-center text-white min-h-[80vh] md:min-h-screen overflow-hidden"
 style={{
 backgroundImage: content.backgroundImage ? `url(${content.backgroundImage})` : undefined,
 backgroundSize: 'cover',
 backgroundPosition: 'center',
 }}
 >
 {/* Overlay */}
 <div className="absolute inset-0" style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }} />

 {/* Content */}
 <div className="relative z-10 px-4 md:px-8 max-w-4xl mx-auto">
 {/* Badge */}
 {content.badge && (
 <div className="mb-4 md:mb-6">
 <span className="inline-block text-xs md:text-sm font-medium tracking-wider uppercase text-white/70 border-b border-white/30 pb-1">
 {content.badge}
 </span>
 </div>
 )}

 {/* Title */}
 <EditableField
 value={content.title}
 isEditing={isEditing}
 onChange={(v) => onContentChange?.('title', v)}
 as="h1"
 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-tight tracking-tight"
 placeholder="İşletme Adınız"
 />

 {/* Subtitle */}
 {content.subtitle && (
 <EditableField
 value={content.subtitle}
 isEditing={isEditing}
 onChange={(v) => onContentChange?.('subtitle', v)}
 as="p"
 className="mt-4 md:mt-6 text-base md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
 placeholder="Kısa açıklama yazın..."
 />
 )}

 {/* CTA Buttons */}
 <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
 {content.cta1 && (
 <a
 href={content.cta1.href}
 className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold bg-accent text-on-accent hover:bg-accent-hover transition-colors text-base"
 >
 {content.cta1.text}
 </a>
 )}
 {content.cta2 && (
 <a
 href={content.cta2.href}
 className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold border border-white/30 text-white hover:bg-white hover:text-black transition-colors text-base"
 >
 {content.cta2.text}
 </a>
 )}
 </div>

 {/* Badges (location, hours, etc.) */}
 {content.badges && content.badges.length > 0 && (
 <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-white/70">
 {content.badges.map((badge, i) => (
 <span key={i} className="flex items-center gap-1.5">
 <span className="text-base">{badge.icon === 'map-pin' ? '📍' : badge.icon === 'clock' ? '⏰' : '•'}</span>
 {badge.text}
 </span>
 ))}
 </div>
 )}
 </div>
 </section>
 )
}

registerSection('hero', 'fullscreen_overlay', HeroFullscreenOverlay as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('hero', 'default', HeroFullscreenOverlay as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)

export { HeroFullscreenOverlay }
