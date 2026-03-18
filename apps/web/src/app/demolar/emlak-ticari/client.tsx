'use client'
import {
  HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c,
  PropertyListingGrid as _plg, RealEstateStatsRow as _res, AgentProfileCard as _apc, ValuationRequestForm as _vrf,
  ThemeRenderer, EMLAK_TICARI_CONFIG, EMLAK_TICARI_BUSINESS,
} from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _plg; void _res; void _apc; void _vrf

export default function EmlakTicariClient() {
  const theme = EMLAK_TICARI_CONFIG; const page = theme.pages[0]!; const business = EMLAK_TICARI_BUSINESS
  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'RealEstateAgent', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={page} business={business} />
    </div>
  )
}
