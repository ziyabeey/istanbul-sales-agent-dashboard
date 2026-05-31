// @ts-nocheck
'use client'

import {
  HeaderMinimalSticky as _h, FooterWarmColumns as _f,
  WhatsAppFloating as _wa, CookieBannerBottomBar as _c,
  DoctorProfileHero as _dph, AppointmentBookingWidget as _abw,
  TreatmentAccordion as _ta, InsuranceLogosBar as _ilb, ClinicGalleryGrid as _cgg,
  ThemeRenderer, DOKTOR_DENTA_CONFIG, DOKTOR_DENTA_BUSINESS,
} from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _dph; void _abw; void _ta; void _ilb; void _cgg

export default function DoktorDentaClient() {
  const theme = DOKTOR_DENTA_CONFIG; const page = theme.pages[0]!; const business = DOKTOR_DENTA_BUSINESS
  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Dentist', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={page} business={business} />
    </div>
  )
}
