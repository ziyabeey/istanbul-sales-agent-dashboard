'use client'
import { HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c, FurnitureProductGrid as _fpg, FurnitureRoomShowcase as _frs, FurnitureMaterialBar as _fmb, FurnitureStatsRow as _fsr, FurnitureInquiryForm as _fif, ThemeRenderer, MOBILYA_EV_CONFIG, MOBILYA_EV_BUSINESS } from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _fpg; void _frs; void _fmb; void _fsr; void _fif
export default function Client() {
  const t = MOBILYA_EV_CONFIG, p = t.pages[0]!, b = MOBILYA_EV_BUSINESS
  return (<div lang="tr"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FurnitureStore', name: b.name, telephone: b.phone, address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.city, addressCountry: 'TR' } }) }} /><ThemeRenderer theme={t} page={p} business={b} /></div>)
}
