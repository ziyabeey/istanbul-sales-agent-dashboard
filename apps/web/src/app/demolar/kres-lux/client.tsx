'use client'
import { HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c, KinderProgramGrid as _kpg, KinderAgeGroups as _kag, KinderFacilities as _kfc, KinderStatsRow as _ksr, KinderEnrollForm as _kef, ThemeRenderer, KRES_LUX_CONFIG, KRES_LUX_BUSINESS } from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _kpg; void _kag; void _kfc; void _ksr; void _kef
export default function Client() {
  const t = KRES_LUX_CONFIG, p = t.pages[0]!, b = KRES_LUX_BUSINESS
  return (<div lang="tr"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'ChildCare', name: b.name, telephone: b.phone, address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.city, addressCountry: 'TR' } }) }} /><ThemeRenderer theme={t} page={p} business={b} /></div>)
}
