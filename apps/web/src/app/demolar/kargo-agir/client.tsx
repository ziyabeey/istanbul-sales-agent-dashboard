'use client'
import { HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c, CourierServiceGrid as _csg, CourierZoneMap as _czm, CourierPricingList as _cpl, CourierStatsRow as _csr, CourierOrderForm as _cof, ThemeRenderer, KARGO_AGIR_CONFIG, KARGO_AGIR_BUSINESS } from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _csg; void _czm; void _cpl; void _csr; void _cof
export default function Client() {
  const t = KARGO_AGIR_CONFIG, p = t.pages[0]!, b = KARGO_AGIR_BUSINESS
  return (<div lang="tr"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'DeliveryService', name: b.name, telephone: b.phone, address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.city, addressCountry: 'TR' } }) }} /><ThemeRenderer theme={t} page={p} business={b} /></div>)
}
