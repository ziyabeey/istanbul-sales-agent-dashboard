'use client'
import {
  HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c,
  PropertyListingGrid as _plg, NeighborhoodMap as _nm, AgentProfileCard as _apc, RealEstateStatsRow as _res, ValuationRequestForm as _vrf,
  ThemeRenderer, EMLAK_LUX_CONFIG, EMLAK_LUX_BUSINESS,
} from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _plg; void _nm; void _apc; void _res; void _vrf

export default function EmlakLuxClient() {
  const theme = EMLAK_LUX_CONFIG; const page = theme.pages[0]!; const business = EMLAK_LUX_BUSINESS
  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'RealEstateAgent', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={page} business={business} />
    </div>
  )
}
