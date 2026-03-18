'use client'
import {
  HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c,
  PlantCatalog as _pc, ProjectPortfolioGrid as _ppg, GardenStatsRow as _gsr, GardenConsultForm as _gcf,
  ThemeRenderer, PEYZAJ_ORGANIK_CONFIG, PEYZAJ_ORGANIK_BUSINESS,
} from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _pc; void _ppg; void _gsr; void _gcf

export default function PeyzajOrganikClient() {
  const theme = PEYZAJ_ORGANIK_CONFIG; const page = theme.pages[0]!; const business = PEYZAJ_ORGANIK_BUSINESS
  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'LocalBusiness', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={page} business={business} />
    </div>
  )
}
