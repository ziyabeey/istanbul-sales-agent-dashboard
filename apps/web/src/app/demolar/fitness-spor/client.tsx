// @ts-nocheck
'use client'

import {
  HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c,
  ClassScheduleGrid as _csg, MembershipPackages as _mp, FitnessStatsRow as _fsr, TrialBookingForm as _tbf,
  ThemeRenderer, FITNESS_SPOR_CONFIG, FITNESS_SPOR_BUSINESS,
} from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _csg; void _mp; void _fsr; void _tbf
export default function Client() {
  const theme = FITNESS_SPOR_CONFIG; const page = theme.pages[0]!; const biz = FITNESS_SPOR_BUSINESS
  return (<div lang="tr"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SportsActivityLocation', name: biz.name, telephone: biz.phone, address: { '@type': 'PostalAddress', addressLocality: biz.district, addressRegion: biz.city, addressCountry: 'TR' } }) }} /><ThemeRenderer theme={theme} page={page} business={biz} /></div>)
}
