'use client'
import {
  HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c,
  ProjectPortfolioGrid as _ppg, LandscapePackages as _lp, GardenStatsRow as _gsr, GardenConsultForm as _gcf,
  ThemeRenderer, PEYZAJ_LUX_CONFIG, PEYZAJ_LUX_BUSINESS,
} from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _ppg; void _lp; void _gsr; void _gcf

export default function PeyzajLuxClient() {
  const theme = PEYZAJ_LUX_CONFIG; const page = theme.pages[0]!; const business = PEYZAJ_LUX_BUSINESS
  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'LocalBusiness', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={page} business={business} />
    </div>
  )
}
