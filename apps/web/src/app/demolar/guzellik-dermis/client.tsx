'use client'

import {
  HeaderMinimalSticky as _h,
  HeroFullscreenOverlay as _hero,
  TestimonialsCarousel as _tst,
  AboutSplitLeft as _about,
  WorkingHoursCompact as _wh,
  ContactSimpleForm as _contact,
  FooterWarmColumns as _footer,
  WhatsAppFloating as _wa,
  CookieBannerBottomBar as _cookie,
  StatsAnimatedRow as _stats,
  CTAFullWidthBanner as _cta,
  BeforeAfterSlider as _ba,
  ServicePriceMenu as _svc,
  StaffCarousel as _staff,
  LoyaltyPackageCards as _pkg,
  InstagramFeedGrid as _insta,
  FAQAccordion as _faq,
  ThemeRenderer,
  GUZELLIK_DERMIS_CONFIG,
  GUZELLIK_DERMIS_BUSINESS,
} from '@kepenk/templates'

void _h; void _hero; void _tst; void _about; void _wh; void _contact; void _footer; void _wa; void _cookie
void _stats; void _cta; void _ba; void _svc; void _staff; void _pkg; void _insta; void _faq

export default function GuzellikDermisClient() {
  const theme = GUZELLIK_DERMIS_CONFIG
  const page = theme.pages[0]!
  const business = GUZELLIK_DERMIS_BUSINESS

  return (
    <div lang="tr">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalBusiness',
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
