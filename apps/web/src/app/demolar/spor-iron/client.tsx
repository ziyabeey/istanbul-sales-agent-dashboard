'use client'

import {
  HeaderMinimalSticky as _h,
  HeroFullscreenOverlay as _hero,
  TestimonialsCarousel as _tst,
  WorkingHoursCompact as _wh,
  FooterMinimal as _footer,
  WhatsAppFloating as _wa,
  CookieBannerBottomBar as _cookie,
  MapFullWidth as _map,
  StatsAnimatedRow as _stats,
  FAQAccordion as _faq,
  ClassScheduleGrid as _cls,
  MembershipTierCards as _mem,
  TransformationGallery as _tra,
  TrainerProfileCard as _trn,
  GymStatsRow as _gym,
  ThemeRenderer,
  SPOR_IRON_CONFIG,
  SPOR_IRON_BUSINESS,
} from '@kepenk/templates'

void _h; void _hero; void _tst; void _wh; void _footer; void _wa; void _cookie
void _map; void _stats; void _faq; void _cls; void _mem; void _tra; void _trn; void _gym

export default function SporIronClient() {
  const theme = SPOR_IRON_CONFIG
  const page = theme.pages[0]!
  const business = SPOR_IRON_BUSINESS

  return (
    <div lang="tr">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HealthClub',
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
