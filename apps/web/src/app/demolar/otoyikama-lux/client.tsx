'use client'
import { HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c, CarWashPackages as _cwp, CarWashServicesGrid as _cwsg, CarWashBeforeAfter as _cwba, CarWashStatsRow as _cwsr, CarWashBookingForm as _cwbf, ThemeRenderer, OTOYIKAMA_LUX_CONFIG, OTOYIKAMA_LUX_BUSINESS } from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _cwp; void _cwsg; void _cwba; void _cwsr; void _cwbf
export default function Client() {
  const t = OTOYIKAMA_LUX_CONFIG, p = t.pages[0]!, b = OTOYIKAMA_LUX_BUSINESS
  return (<div lang="tr"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'AutoWash', name: b.name, telephone: b.phone, address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.city, addressCountry: 'TR' } }) }} /><ThemeRenderer theme={t} page={p} business={b} /></div>)
}
