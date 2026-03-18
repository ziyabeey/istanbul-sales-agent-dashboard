'use client'
import { HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c, AutoServicesGrid as _asg, VehicleBrandsBar as _vbb, AutoPricingTable as _apt, AutoStatsRow as _asr, AutoBookingForm as _abf, ThemeRenderer, OTO_LUX_CONFIG, OTO_LUX_BUSINESS } from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _asg; void _vbb; void _apt; void _asr; void _abf
export default function Client() {
  const t = OTO_LUX_CONFIG, p = t.pages[0]!, b = OTO_LUX_BUSINESS
  return (<div lang="tr"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'AutoRepair', name: b.name, telephone: b.phone, address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.city, addressCountry: 'TR' } }) }} /><ThemeRenderer theme={t} page={p} business={b} /></div>)
}
