'use client'
import { HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c, CleaningServicesGrid as _csg, BeforeAfterShowcase as _bas, CleaningPackages as _cp, CleaningBookingForm as _cbf, ThemeRenderer, TEMIZLIK_EKO_CONFIG, TEMIZLIK_EKO_BUSINESS } from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _csg; void _bas; void _cp; void _cbf
export default function Client() {
  const t = TEMIZLIK_EKO_CONFIG, p = t.pages[0]!, b = TEMIZLIK_EKO_BUSINESS
  return (<div lang="tr"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'LocalBusiness', name: b.name, telephone: b.phone, address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.city, addressCountry: 'TR' } }) }} /><ThemeRenderer theme={t} page={p} business={b} /></div>)
}
