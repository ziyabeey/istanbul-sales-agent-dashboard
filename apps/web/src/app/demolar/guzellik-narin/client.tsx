'use client'

import {
  // Global section registrations
  HeaderMinimalSticky as _h,
  HeroFullscreenOverlay as _hero,
  TestimonialsCarousel as _tst,
  AboutSplitLeft as _about,
  WorkingHoursCompact as _wh,
  ContactSimpleForm as _contact,
  FooterWarmColumns as _footer,
  WhatsAppFloating as _wa,
  CookieBannerBottomBar as _cookie,
  MapFullWidth as _map,
  StatsAnimatedRow as _stats,
  CTAFullWidthBanner as _cta,
  // Güzellik sections
  BeforeAfterSlider as _ba,
  ServicePriceMenu as _svc,
  StaffCarousel as _staff,
  LoyaltyPackageCards as _pkg,
  InstagramFeedGrid as _insta,
  // Booking
  FAQAccordion as _faq,
  // Renderer + config
  ThemeRenderer,
  GUZELLIK_NARIN_CONFIG,
  GUZELLIK_NARIN_BUSINESS,
} from '@kepenk/templates'

void _h; void _hero; void _tst; void _about; void _wh; void _contact; void _footer; void _wa; void _cookie
void _map; void _stats; void _cta; void _ba; void _svc; void _staff; void _pkg; void _insta; void _faq

export default function GuzellikNarinClient() {
  const theme = GUZELLIK_NARIN_CONFIG
  const page = theme.pages[0]!
  const business = GUZELLIK_NARIN_BUSINESS

  return (
    <div lang="tr">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BeautySalon',
            name: business.name,
            description: business.slogan,
            telephone: business.phone,
            address: {
              '@type': 'PostalAddress',
              streetAddress: business.address,
              addressLocality: business.district,
              addressRegion: business.city,
              addressCountry: 'TR',
            },
            geo: business.coordinates
              ? { '@type': 'GeoCoordinates', latitude: business.coordinates.lat, longitude: business.coordinates.lng }
              : undefined,
            aggregateRating: business.rating
              ? { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount }
              : undefined,
          }),
        }}
      />
      <ThemeRenderer theme={theme} page={page} business={business} />
    </div>
  )
}
