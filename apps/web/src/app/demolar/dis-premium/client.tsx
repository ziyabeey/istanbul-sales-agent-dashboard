'use client'
import {
  HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c,
  DentalTreatmentGrid as _dtg, SmileBeforeAfter as _sba, DentistProfileCard as _dpc, ClinicStatsRow as _csr, DentalAppointmentForm as _daf,
  ThemeRenderer, DIS_PREMIUM_CONFIG, DIS_PREMIUM_BUSINESS,
} from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _dtg; void _sba; void _dpc; void _csr; void _daf

export default function DisPremiumClient() {
  const theme = DIS_PREMIUM_CONFIG; const page = theme.pages[0]!; const business = DIS_PREMIUM_BUSINESS
  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Dentist', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={page} business={business} />
    </div>
  )
}
