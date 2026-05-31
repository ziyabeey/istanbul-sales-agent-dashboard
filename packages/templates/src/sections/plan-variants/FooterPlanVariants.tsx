/**
 * @kepenk/templates — Plan-Based Footer Variants
 *
 * plan_free:       Tek satir copyright
 * plan_starter:    2 sutun (bilgi + linkler)
 * plan_growth:     3 sutun + newsletter
 * plan_pro:        Rich 4 sutun + harita link
 * plan_enterprise: Mega footer, 5+ sutun, sitemap
 */

'use client'

import type { SectionProps } from '../../types/section-types'
import type { FooterContent } from '../../types/section-content'
import { registerSection } from '../../registry/section-registry'

type FP = SectionProps<FooterContent>
type Reg = React.ComponentType<SectionProps<Record<string, unknown>>>

function SocialIcon({ platform }: { platform: string }) {
  const label = platform === 'instagram' ? 'IG' : platform === 'facebook' ? 'FB' : platform === 'twitter' ? 'X' : platform === 'youtube' ? 'YT' : platform === 'tiktok' ? 'TK' : platform === 'linkedin' ? 'LI' : platform[0]?.toUpperCase()
  return <span className="text-sm">{label}</span>
}

/* ═══════════════════════════════════════════════
   FREE — Tek satir copyright
   ═══════════════════════════════════════════════ */

function FooterFree({ content }: FP) {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-foreground-muted" style={{ maxWidth: 'var(--container-default)' }}>
        <span className="font-heading font-semibold text-foreground">{content.businessName}</span>
        <span>{content.copyright}</span>
        {content.poweredBy && <span className="text-xs">{content.poweredBy}</span>}
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════
   STARTER — 2 sutun
   ═══════════════════════════════════════════════ */

function FooterStarter({ content }: FP) {
  return (
    <footer className="bg-surface">
      <div className="mx-auto px-4 md:px-8 py-10" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-heading font-bold text-lg text-foreground">{content.businessName}</h3>
            {content.description && <p className="mt-2 text-sm text-foreground-secondary leading-relaxed">{content.description}</p>}
            <div className="mt-4 flex gap-2">
              {content.social?.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-accent-subtle rounded-full flex items-center justify-center text-foreground-muted hover:bg-accent hover:text-on-accent transition-colors">
                  <SocialIcon platform={s.platform} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wide text-foreground mb-3">Iletisim</h4>
            <ul className="space-y-2 text-sm text-foreground-secondary">
              {content.contact?.phone && <li><a href={`tel:${content.contact.phone}`} className="hover:text-accent transition-colors">{content.contact.phone}</a></li>}
              {content.contact?.email && <li><a href={`mailto:${content.contact.email}`} className="hover:text-accent transition-colors">{content.contact.email}</a></li>}
              {content.contact?.address && <li>{content.contact.address}</li>}
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-foreground-muted">
          <span>{content.copyright}</span>
          <div className="flex gap-4">
            {content.legal?.map((l, i) => <a key={i} href={l.href} className="hover:text-accent transition-colors hover:underline">{l.label}</a>)}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════
   GROWTH — 3 sutun + newsletter
   ═══════════════════════════════════════════════ */

function FooterGrowth({ content }: FP) {
  return (
    <footer className="bg-surface">
      <div className="mx-auto px-4 md:px-8 py-12 md:py-16" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading font-bold text-xl text-foreground">{content.businessName}</h3>
            {content.description && <p className="mt-3 text-sm text-foreground-secondary leading-relaxed">{content.description}</p>}
            <div className="mt-4 flex gap-2">
              {content.social?.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-accent/10 rounded-lg flex items-center justify-center text-foreground-muted hover:bg-accent hover:text-on-accent transition-all">
                  <SocialIcon platform={s.platform} />
                </a>
              ))}
            </div>
          </div>
          {content.columns?.slice(0, 1).map((col, i) => (
            <div key={i}>
              <h4 className="font-heading font-semibold text-sm uppercase tracking-wide text-foreground mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link, j) => <li key={j}><a href={link.href} className="text-sm text-foreground-secondary hover:text-accent transition-colors">{link.label}</a></li>)}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wide text-foreground mb-4">Iletisim</h4>
            <ul className="space-y-2.5 text-sm text-foreground-secondary">
              {content.contact?.phone && <li><a href={`tel:${content.contact.phone}`} className="hover:text-accent transition-colors">{content.contact.phone}</a></li>}
              {content.contact?.email && <li><a href={`mailto:${content.contact.email}`} className="hover:text-accent transition-colors">{content.contact.email}</a></li>}
              {content.contact?.address && <li className="leading-relaxed">{content.contact.address}</li>}
            </ul>
            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-xs text-foreground-muted mb-2">Bultenimize abone olun</p>
              <div className="flex">
                <input type="email" placeholder="E-posta" className="flex-1 px-3 py-2 text-sm bg-bg border border-border rounded-l-lg outline-none focus:border-accent" />
                <button className="px-4 py-2 text-sm font-semibold bg-accent text-on-accent rounded-r-lg hover:bg-accent-hover transition-colors">Gonder</button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-foreground-muted">
          <span>{content.copyright}</span>
          <div className="flex gap-4">
            {content.legal?.map((l, i) => <a key={i} href={l.href} className="hover:text-accent transition-colors hover:underline">{l.label}</a>)}
          </div>
          {content.poweredBy && <span>{content.poweredBy}</span>}
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════
   PRO — Rich 4 sutun
   ═══════════════════════════════════════════════ */

function FooterPro({ content }: FP) {
  return (
    <footer className="bg-surface">
      <div className="mx-auto px-4 md:px-8 py-14 md:py-20" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-on-accent text-sm font-bold">{content.businessName?.charAt(0)}</div>
              <h3 className="font-heading font-bold text-lg text-foreground">{content.businessName}</h3>
            </div>
            {content.description && <p className="text-sm text-foreground-secondary leading-relaxed">{content.description}</p>}
            <div className="mt-5 flex gap-2">
              {content.social?.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-foreground-muted hover:bg-accent hover:text-on-accent transition-all hover:scale-110">
                  <SocialIcon platform={s.platform} />
                </a>
              ))}
            </div>
          </div>
          {content.columns?.map((col, i) => (
            <div key={i}>
              <h4 className="font-heading font-semibold text-sm uppercase tracking-wide text-foreground mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link, j) => <li key={j}><a href={link.href} className="text-sm text-foreground-secondary hover:text-accent transition-colors">{link.label}</a></li>)}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wide text-foreground mb-4">Iletisim</h4>
            <ul className="space-y-2.5 text-sm text-foreground-secondary">
              {content.contact?.phone && <li><a href={`tel:${content.contact.phone}`} className="hover:text-accent transition-colors">{content.contact.phone}</a></li>}
              {content.contact?.email && <li><a href={`mailto:${content.contact.email}`} className="hover:text-accent transition-colors">{content.contact.email}</a></li>}
              {content.contact?.address && <li className="leading-relaxed">{content.contact.address}</li>}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground-muted">
          <span>{content.copyright}</span>
          <div className="flex items-center gap-6">
            {content.legal?.map((l, i) => <a key={i} href={l.href} className="hover:text-accent transition-colors hover:underline">{l.label}</a>)}
          </div>
          {content.poweredBy && <span>{content.poweredBy}</span>}
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════
   ENTERPRISE — Mega footer, 5+ sutun
   ═══════════════════════════════════════════════ */

function FooterEnterprise({ content }: FP) {
  return (
    <footer className="bg-surface">
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-accent via-accent-hover to-accent" />
      <div className="mx-auto px-4 md:px-8 py-16 md:py-20" style={{ maxWidth: 'var(--container-default)' }}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-hover rounded-xl flex items-center justify-center text-on-accent font-bold shadow">{content.businessName?.charAt(0)}</div>
              <h3 className="font-heading font-bold text-xl text-foreground">{content.businessName}</h3>
            </div>
            {content.description && <p className="text-sm text-foreground-secondary leading-relaxed">{content.description}</p>}
            <div className="mt-5 flex gap-2">
              {content.social?.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-foreground-muted hover:bg-accent hover:text-on-accent transition-all">
                  <SocialIcon platform={s.platform} />
                </a>
              ))}
            </div>
          </div>
          {content.columns?.map((col, i) => (
            <div key={i}>
              <h4 className="font-heading font-semibold text-sm uppercase tracking-wide text-foreground mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link, j) => <li key={j}><a href={link.href} className="text-sm text-foreground-secondary hover:text-accent transition-colors">{link.label}</a></li>)}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wide text-foreground mb-4">Iletisim</h4>
            <ul className="space-y-2 text-sm text-foreground-secondary">
              {content.contact?.phone && <li><a href={`tel:${content.contact.phone}`} className="hover:text-accent transition-colors">{content.contact.phone}</a></li>}
              {content.contact?.email && <li><a href={`mailto:${content.contact.email}`} className="hover:text-accent transition-colors">{content.contact.email}</a></li>}
              {content.contact?.address && <li className="leading-relaxed">{content.contact.address}</li>}
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground-muted">
            <span>{content.copyright}</span>
            <div className="flex flex-wrap items-center gap-6">
              {content.legal?.map((l, i) => <a key={i} href={l.href} className="hover:text-accent transition-colors hover:underline">{l.label}</a>)}
            </div>
            {content.poweredBy && <span>{content.poweredBy}</span>}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════
   REGISTER
   ═══════════════════════════════════════════════ */

registerSection('footer', 'plan_free', FooterFree as unknown as Reg)
registerSection('footer', 'plan_starter', FooterStarter as unknown as Reg)
registerSection('footer', 'plan_growth', FooterGrowth as unknown as Reg)
registerSection('footer', 'plan_pro', FooterPro as unknown as Reg)
registerSection('footer', 'plan_enterprise', FooterEnterprise as unknown as Reg)

export { FooterFree, FooterStarter, FooterGrowth, FooterPro, FooterEnterprise }
