'use client'
import { HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c, ElectricianServiceGrid as _esg, ElectricianEmergencyBanner as _eeb, ElectricianPricingList as _epl, ElectricianStatsRow as _esr, ElectricianCallForm as _ecf, ThemeRenderer, ELEKTRIKCI_SANAYI_CONFIG, ELEKTRIKCI_SANAYI_BUSINESS } from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _esg; void _eeb; void _epl; void _esr; void _ecf
export default function Client() {
  const t = ELEKTRIKCI_SANAYI_CONFIG, p = t.pages[0]!, b = ELEKTRIKCI_SANAYI_BUSINESS
  return (<div lang="tr"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Electrician', name: b.name, telephone: b.phone, address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.city, addressCountry: 'TR' } }) }} /><ThemeRenderer theme={t} page={p} business={b} /></div>)
}
