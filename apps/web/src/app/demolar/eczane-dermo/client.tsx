'use client'
import { HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c, PharmacyServicesGrid as _psg, PharmacyProductCards as _ppc, PharmacyDutyInfo as _pdi, PharmacyStatsRow as _psr, PharmacyContactForm as _pcf, ThemeRenderer, ECZANE_DERMO_CONFIG, ECZANE_DERMO_BUSINESS } from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _psg; void _ppc; void _pdi; void _psr; void _pcf
export default function Client() {
  const t = ECZANE_DERMO_CONFIG, p = t.pages[0]!, b = ECZANE_DERMO_BUSINESS
  return (<div lang="tr"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Pharmacy', name: b.name, telephone: b.phone, address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.city, addressCountry: 'TR' } }) }} /><ThemeRenderer theme={t} page={p} business={b} /></div>)
}
