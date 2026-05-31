/**
 * @kepenk/templates — Services Section Components
 *
 * card_grid: 2×3 or 3×3 card grid with icon, name, description, price.
 */

'use client'

import type { SectionProps } from '../../types/section-types'
import type { ServicesContent } from '../../types/section-content'
import { registerSection } from '../../registry/section-registry'
import { EditableField } from '../../lib/EditableField'

function ServicesCardGrid({ content, business, isEditing, onContentChange, settings }: SectionProps<ServicesContent>) {
 return (
 <section
 className="px-4 md:px-8"
 style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}
 >
 <div className="mx-auto" style={{ maxWidth: 'var(--container-lg)' }}>
 {/* Header */}
 <div className="text-center mb-12 md:mb-16">
 {content.badge && (
 <span className="inline-block text-xs font-semibold tracking-wider uppercase text-accent mb-3">
 {content.badge}
 </span>
 )}
 <EditableField
 value={content.title}
 isEditing={isEditing}
 onChange={(v) => onContentChange?.('title', v)}
 as="h2"
 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground leading-tight"
 placeholder="Hizmetlerimiz"
 />
 {content.subtitle && (
 <EditableField
 value={content.subtitle}
 isEditing={isEditing}
 onChange={(v) => onContentChange?.('subtitle', v)}
 as="p"
 className="mt-4 text-foreground-secondary max-w-2xl mx-auto"
 />
 )}
 </div>

 {/* Services Grid */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
 {content.services?.map((service: any, i: number) => (
 <div
 key={service.id || i}
 className="relative bg-surface rounded-xl p-6 hover:shadow-lg transition-shadow group"
 >
 {/* Popular Badge */}
 {service.popular && (
 <span className="absolute -top-2 right-4 px-3 py-0.5 text-xs font-semibold bg-accent text-on-accent rounded-full">
 Popüler
 </span>
 )}

 {/* Icon */}
 {service.icon && (
 <div className="w-12 h-12 bg-accent-light text-accent rounded-lg flex items-center justify-center mb-4 text-xl">
 {service.icon === 'scissors' ? '✂️' :
 service.icon === 'sparkles' ? '✨' :
 service.icon === 'crown' ? '👑' :
 service.icon === 'palette' ? '🎨' :
 service.icon === 'heart' ? '❤️' :
 service.icon === 'star' ? '⭐' : '•'}
 </div>
 )}

 {/* Image (if no icon) */}
 {service.image && !service.icon && (
 <div className="mb-4 overflow-hidden rounded-lg aspect-video">
 <img
 src={service.image}
 alt={service.name}
 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
 />
 </div>
 )}

 {/* Name */}
 <EditableField
 value={service.name}
 isEditing={isEditing}
 onChange={(v) => onContentChange?.(`services[${i}].name`, v)}
 as="h3"
 className="font-heading font-semibold text-lg text-foreground"
 placeholder="Hizmet Adı"
 />

 {/* Description */}
 {service.description && (
 <p className="mt-2 text-sm text-foreground-secondary leading-relaxed">
 {service.description}
 </p>
 )}

 {/* Price + Duration */}
 <div className="mt-4 flex items-center gap-3">
 {service.price && (
 <span className="font-bold text-lg text-accent">{service.price}</span>
 )}
 {service.priceNote && (
 <span className="text-xs text-foreground-muted">{service.priceNote}</span>
 )}
 {service.duration && (
 <span className="text-sm text-foreground-secondary">· {service.duration}</span>
 )}
 </div>
 </div>
 ))}
 </div>

 {/* Bottom CTA */}
 {content.ctaText && (
 <div className="text-center mt-12">
 <a
 href={content.ctaHref ?? '#'}
 className="inline-flex items-center gap-2 text-accent font-semibold hover:underline"
 >
 {content.ctaText} →
 </a>
 </div>
 )}
 </div>
 </section>
 )
}

registerSection('services', 'card_grid', ServicesCardGrid as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('services', 'default', ServicesCardGrid as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)

export { ServicesCardGrid }
