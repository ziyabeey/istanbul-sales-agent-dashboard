'use client'
import { HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c, BakeryMenuGrid as _bmg, BakeryStorySection as _bs, CakeGalleryGrid as _cg, BakeryStatsRow as _bsr, CakeOrderForm as _cof, ThemeRenderer, PASTANE_LUX_CONFIG, PASTANE_LUX_BUSINESS } from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _bmg; void _bs; void _cg; void _bsr; void _cof
export default function Client() {
  const t = PASTANE_LUX_CONFIG, p = t.pages[0]!, b = PASTANE_LUX_BUSINESS
  return (<div lang="tr"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Bakery', name: b.name, telephone: b.phone, address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.city, addressCountry: 'TR' } }) }} /><ThemeRenderer theme={t} page={p} business={b} /></div>)
}
