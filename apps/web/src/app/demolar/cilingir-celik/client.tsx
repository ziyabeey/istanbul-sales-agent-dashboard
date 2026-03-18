'use client'
import { HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c, LocksmithServiceGrid as _lsg, LocksmithEmergencyBanner as _leb, LocksmithPricingList as _lpl, LocksmithStatsRow as _lsr, LocksmithCallForm as _lcf, ThemeRenderer, CILINGIR_CELIK_CONFIG, CILINGIR_CELIK_BUSINESS } from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _lsg; void _leb; void _lpl; void _lsr; void _lcf
export default function Client() {
  const t = CILINGIR_CELIK_CONFIG, p = t.pages[0]!, b = CILINGIR_CELIK_BUSINESS
  return (<div lang="tr"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Locksmith', name: b.name, telephone: b.phone, address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.city, addressCountry: 'TR' } }) }} /><ThemeRenderer theme={t} page={p} business={b} /></div>)
}
