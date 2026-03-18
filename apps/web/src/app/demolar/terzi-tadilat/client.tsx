'use client'
import { HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c, TailorServicesGrid as _tsg, FabricShowcase as _fs, TailorPortfolioGrid as _tpg, TailorStatsRow as _tsr, TailorBookingForm as _tbf, ThemeRenderer, TERZI_TADILAT_CONFIG, TERZI_TADILAT_BUSINESS } from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _tsg; void _fs; void _tpg; void _tsr; void _tbf
export default function Client() {
  const t = TERZI_TADILAT_CONFIG, p = t.pages[0]!, b = TERZI_TADILAT_BUSINESS
  return (<div lang="tr"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'LocalBusiness', name: b.name, telephone: b.phone, address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.city, addressCountry: 'TR' } }) }} /><ThemeRenderer theme={t} page={p} business={b} /></div>)
}
