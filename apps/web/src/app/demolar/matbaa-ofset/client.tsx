'use client'
import { HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c, PrintProductGrid as _ppg, PrintProcessSteps as _pps, PrintMaterialBar as _pmb, PrintStatsRow as _psr, PrintQuoteForm as _pqf, ThemeRenderer, MATBAA_OFSET_CONFIG, MATBAA_OFSET_BUSINESS } from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _ppg; void _pps; void _pmb; void _psr; void _pqf
export default function Client() {
  const t = MATBAA_OFSET_CONFIG, p = t.pages[0]!, b = MATBAA_OFSET_BUSINESS
  return (<div lang="tr"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'LocalBusiness', name: b.name, telephone: b.phone, address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.city, addressCountry: 'TR' } }) }} /><ThemeRenderer theme={t} page={p} business={b} /></div>)
}
