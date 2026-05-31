// @ts-nocheck
'use client'

import { HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c, TireServiceGrid as _tsg, TireBrandBar as _tbb, TirePricingTable as _tpt, TireStatsRow as _tsr, TireBookingForm as _tbf, ThemeRenderer, LASTIKCI_KIS_CONFIG, LASTIKCI_KIS_BUSINESS } from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _tsg; void _tbb; void _tpt; void _tsr; void _tbf
export default function Client() {
  const theme = LASTIKCI_KIS_CONFIG;
  const business = LASTIKCI_KIS_BUSINESS;

  const t = LASTIKCI_KIS_CONFIG, p = t.pages[0]!, b = LASTIKCI_KIS_BUSINESS
  return (<div lang="tr"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'TireShop', name: b.name, telephone: b.phone, address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.city, addressCountry: 'TR' } }) }} /><ThemeRenderer theme={t} page={p} business={b} /></div>)
}
