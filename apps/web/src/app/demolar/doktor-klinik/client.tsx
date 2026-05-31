// @ts-nocheck
'use client'

import {
  HeaderMinimalSticky as _h, HeroFullscreenOverlay as _hero, FooterWarmColumns as _f,
  WhatsAppFloating as _wa, CookieBannerBottomBar as _c, WorkingHoursCompact as _wh,
  DoctorProfileHero as _dph, AppointmentBookingWidget as _abw,
  TreatmentAccordion as _ta, InsuranceLogosBar as _ilb,
  ThemeRenderer, DOKTOR_KLINIK_CONFIG, DOKTOR_KLINIK_BUSINESS,
} from '@kepenk/templates'
void _h; void _hero; void _f; void _wa; void _c; void _wh; void _dph; void _abw; void _ta; void _ilb

export default function DoktorKlinikClient() {
  const theme = DOKTOR_KLINIK_CONFIG; const page = theme.pages[0]!; const business = DOKTOR_KLINIK_BUSINESS
  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'MedicalBusiness', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={page} business={business} />
    </div>
  )
}
