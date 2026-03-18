'use client'
import { HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c, PlumberServiceGrid as _psg, PlumberEmergencyBanner as _peb, PlumberPricingList as _ppl, PlumberStatsRow as _psr, PlumberCallForm as _pcf, ThemeRenderer, TESISATCI_KOMBI_CONFIG, TESISATCI_KOMBI_BUSINESS } from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _psg; void _peb; void _ppl; void _psr; void _pcf
export default function Client() {
  const t = TESISATCI_KOMBI_CONFIG, p = t.pages[0]!, b = TESISATCI_KOMBI_BUSINESS
  return (<div lang="tr"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Plumber', name: b.name, telephone: b.phone, address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.city, addressCountry: 'TR' } }) }} /><ThemeRenderer theme={t} page={p} business={b} /></div>)
}
