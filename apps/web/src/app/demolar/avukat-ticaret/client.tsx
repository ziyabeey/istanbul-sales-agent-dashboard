'use client'
import {
  HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c,
  LegalPracticeAreas as _lpa, AttorneyProfileCard as _apc, CaseResultsShowcase as _crs, ConsultationWidget as _cw,
  ThemeRenderer, AVUKAT_TICARET_CONFIG, AVUKAT_TICARET_BUSINESS,
} from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _lpa; void _apc; void _crs; void _cw

export default function AvukatTicaretClient() {
  const theme = AVUKAT_TICARET_CONFIG; const page = theme.pages[0]!; const business = AVUKAT_TICARET_BUSINESS
  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'LegalService', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={page} business={business} />
    </div>
  )
}
