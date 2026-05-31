/**
 * @kepenk/templates — Footer Section Components
 *
 * minimal: Single row — logo + copyright + social icons + legal links.
 * warm_columns: 3-4 column layout with contact info.
 */

'use client'

import type { SectionProps } from '../../types/section-types'
import type { FooterContent } from '../../types/section-content'
import { registerSection } from '../../registry/section-registry'

// ─── MINIMAL FOOTER ───

function FooterMinimal({ content }: SectionProps<FooterContent>) {
 return (
 <footer className="bg-surface border-t border-border">
 <div className="mx-auto px-4 md:px-8 py-6" style={{ maxWidth: 'var(--container-xl)' }}>
 <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground-secondary">
 <span className="font-heading font-semibold text-foreground">{content.businessName}</span>
 <span>{content.copyright}</span>
 <div className="flex items-center gap-4">
 {content.legal?.map((link, i) => (
 <a key={i} href={link.href} className="hover:text-accent transition-colors underline-offset-2 hover:underline">
 {link.label}
 </a>
 ))}
 </div>
 {content.poweredBy && (
 <span className="text-xs text-foreground-muted">{content.poweredBy}</span>
 )}
 </div>
 </div>
 </footer>
 )
}

// ─── WARM COLUMNS FOOTER ───

function FooterWarmColumns({ content }: SectionProps<FooterContent>) {
 return (
 <footer className="bg-surface">
 <div className="mx-auto px-4 md:px-8 py-12 md:py-16" style={{ maxWidth: 'var(--container-xl)' }}>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
 {/* Column 1: Logo + Description */}
 <div className="lg:col-span-1">
 <h3 className="font-heading font-bold text-lg text-foreground">{content.businessName}</h3>
 {content.description && (
 <p className="mt-3 text-sm text-foreground-secondary leading-relaxed">{content.description}</p>
 )}
 {/* Social Icons */}
 <div className="mt-4 flex items-center gap-3">
 {content.social?.map((s, i) => (
 <a
 key={i}
 href={s.url}
 target="_blank"
 rel="noopener noreferrer"
 className="w-9 h-9 bg-accent-subtle rounded-full flex items-center justify-center text-foreground-secondary hover:bg-accent hover:text-on-accent transition-colors"
 aria-label={s.platform}
 >
 <span className="text-sm">
 {s.platform === 'instagram' ? 'IG' :
 s.platform === 'facebook' ? 'FB' :
 s.platform === 'twitter' ? 'X' :
 s.platform === 'youtube' ? 'YT' :
 s.platform === 'tiktok' ? 'TK' :
 s.platform === 'linkedin' ? 'LI' : s.platform[0]?.toUpperCase()}
 </span>
 </a>
 ))}
 </div>
 </div>

 {/* Dynamic Columns */}
 {content.columns?.map((col, i) => (
 <div key={i}>
 <h4 className="font-heading font-semibold text-sm uppercase tracking-wide text-foreground mb-4">{col.title}</h4>
 <ul className="space-y-2.5">
 {col.links.map((link, j) => (
 <li key={j}>
 <a href={link.href} className="text-sm text-foreground-secondary hover:text-accent transition-colors">
 {link.label}
 </a>
 </li>
 ))}
 </ul>
 </div>
 ))}

 {/* Contact Column */}
 <div>
 <h4 className="font-heading font-semibold text-sm uppercase tracking-wide text-foreground mb-4">İletişim</h4>
 <ul className="space-y-2.5 text-sm text-foreground-secondary">
 {content.contact?.phone && (
 <li><a href={`tel:${content.contact.phone}`} className="hover:text-accent transition-colors">📞 {content.contact.phone}</a></li>
 )}
 {content.contact?.email && (
 <li><a href={`mailto:${content.contact.email}`} className="hover:text-accent transition-colors">✉️ {content.contact.email}</a></li>
 )}
 {content.contact?.address && (
 <li className="leading-relaxed">📍 {content.contact.address}</li>
 )}
 </ul>
 </div>
 </div>

 {/* Bottom Bar */}
 <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground-muted">
 <span>{content.copyright}</span>
 <div className="flex items-center gap-4">
 {content.legal?.map((link, i) => (
 <a key={i} href={link.href} className="hover:text-accent transition-colors underline-offset-2 hover:underline">
 {link.label}
 </a>
 ))}
 </div>
 {content.poweredBy && <span>{content.poweredBy}</span>}
 </div>
 </div>
 </footer>
 )
}

registerSection('footer', 'minimal', FooterMinimal as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('footer', 'warm_columns', FooterWarmColumns as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('footer', 'default', FooterWarmColumns as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)

export { FooterMinimal, FooterWarmColumns }
