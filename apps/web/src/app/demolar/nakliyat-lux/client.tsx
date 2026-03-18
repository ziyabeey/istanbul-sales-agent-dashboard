'use client'
import { HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c, MovingPackages as _mp, MovingServicesGrid as _msg, MovingProcessSteps as _mps, MovingStatsRow as _msr, MovingQuoteForm as _mqf, ThemeRenderer, NAKLIYAT_LUX_CONFIG, NAKLIYAT_LUX_BUSINESS } from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _mp; void _msg; void _mps; void _msr; void _mqf
export default function Client() {
  const t = NAKLIYAT_LUX_CONFIG, p = t.pages[0]!, b = NAKLIYAT_LUX_BUSINESS
  return (<div lang="tr"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'MovingCompany', name: b.name, telephone: b.phone, address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.city, addressCountry: 'TR' } }) }} /><ThemeRenderer theme={t} page={p} business={b} /></div>)
}
