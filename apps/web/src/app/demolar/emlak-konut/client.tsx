'use client'
import {
  HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c,
  PropertyListingGrid as _plg, AgentProfileCard as _apc, RealEstateStatsRow as _res, ValuationRequestForm as _vrf,
  ThemeRenderer, EMLAK_KONUT_CONFIG, EMLAK_KONUT_BUSINESS,
} from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _plg; void _apc; void _res; void _vrf

export default function EmlakKonutClient() {
  const theme = EMLAK_KONUT_CONFIG; const page = theme.pages[0]!; const business = EMLAK_KONUT_BUSINESS
  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'RealEstateAgent', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={page} business={business} />
    </div>
  )
}
