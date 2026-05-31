// @ts-nocheck
'use client'

import {
  HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c,
  PropertyListingGrid as _plg, NeighborhoodMap as _nm, RealEstateStatsRow as _res, ValuationRequestForm as _vrf,
  ThemeRenderer, EMLAK_YATIRIM_CONFIG, EMLAK_YATIRIM_BUSINESS,
} from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _plg; void _nm; void _res; void _vrf

export default function EmlakYatirimClient() {
  const theme = EMLAK_YATIRIM_CONFIG; const page = theme.pages[0]!; const business = EMLAK_YATIRIM_BUSINESS
  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'RealEstateAgent', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={page} business={business} />
    </div>
  )
}
