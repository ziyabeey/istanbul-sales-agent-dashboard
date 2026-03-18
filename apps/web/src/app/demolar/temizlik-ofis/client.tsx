'use client'
import { HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c, CleaningServiceGrid as _csg, CleaningPackages as _cp, CleaningProcessSteps as _cps, CleaningStatsRow as _csr, CleaningBookingForm as _cbf, ThemeRenderer, TEMIZLIK_OFIS_CONFIG, TEMIZLIK_OFIS_BUSINESS } from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _csg; void _cp; void _cps; void _csr; void _cbf
export default function Client() {
  const t = TEMIZLIK_OFIS_CONFIG, p = t.pages[0]!, b = TEMIZLIK_OFIS_BUSINESS
  return (<div lang="tr"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'CleaningService', name: b.name, telephone: b.phone, address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.city, addressCountry: 'TR' } }) }} /><ThemeRenderer theme={t} page={p} business={b} /></div>)
}
