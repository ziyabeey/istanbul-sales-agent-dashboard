// @ts-nocheck
'use client'

import {
  HeaderMinimalSticky as _h, HeroFullscreenOverlay as _hero, FooterWarmColumns as _f,
  WhatsAppFloating as _wa, CookieBannerBottomBar as _c, WorkingHoursCompact as _wh,
  FAQAccordion as _faq, TestimonialsCarousel as _tst,
  DoctorProfileHero as _dph, AppointmentBookingWidget as _abw,
  TreatmentAccordion as _ta, InsuranceLogosBar as _ilb, ClinicGalleryGrid as _cgg,
  ThemeRenderer, DOKTOR_TRUST_CONFIG, DOKTOR_TRUST_BUSINESS,
} from '@kepenk/templates'
void _h; void _hero; void _f; void _wa; void _c; void _wh; void _faq; void _tst
void _dph; void _abw; void _ta; void _ilb; void _cgg

export default function DoktorTrustClient() {
  const theme = DOKTOR_TRUST_CONFIG; const page = theme.pages[0]!; const business = DOKTOR_TRUST_BUSINESS
  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'MedicalBusiness', name: business.name, description: business.slogan, telephone: business.phone, address: { '@type': 'PostalAddress', streetAddress: business.address, addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={page} business={business} />
    </div>
  )
}
