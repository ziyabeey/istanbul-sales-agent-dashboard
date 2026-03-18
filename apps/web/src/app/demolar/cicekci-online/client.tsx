'use client'
import { HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c, FloristProductGrid as _fpg, FloristOccasionBar as _fob, FloristDeliveryInfo as _fdi, FloristStatsRow as _fsr, FloristOrderForm as _fof, ThemeRenderer, CICEKCI_ONLINE_CONFIG, CICEKCI_ONLINE_BUSINESS } from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _fpg; void _fob; void _fdi; void _fsr; void _fof
export default function Client() {
  const t = CICEKCI_ONLINE_CONFIG, p = t.pages[0]!, b = CICEKCI_ONLINE_BUSINESS
  return (<div lang="tr"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Florist', name: b.name, telephone: b.phone, address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.city, addressCountry: 'TR' } }) }} /><ThemeRenderer theme={t} page={p} business={b} /></div>)
}
