'use client'
import { HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c, MusicCourseGrid as _mcg, MusicTeacherGrid as _mtg, MusicPricingTable as _mpt, MusicStatsRow as _msr, MusicTrialForm as _mtf, ThemeRenderer, MUZIK_LUX_CONFIG, MUZIK_LUX_BUSINESS } from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _mcg; void _mtg; void _mpt; void _msr; void _mtf
export default function Client() {
  const t = MUZIK_LUX_CONFIG, p = t.pages[0]!, b = MUZIK_LUX_BUSINESS
  return (<div lang="tr"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'MusicSchool', name: b.name, telephone: b.phone, address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.city, addressCountry: 'TR' } }) }} /><ThemeRenderer theme={t} page={p} business={b} /></div>)
}
