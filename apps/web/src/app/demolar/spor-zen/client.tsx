'use client'

import {
  HeaderMinimalSticky as _h,
  HeroFullscreenOverlay as _hero,
  TestimonialsCarousel as _tst,
  WorkingHoursCompact as _wh,
  FooterWarmColumns as _footer,
  WhatsAppFloating as _wa,
  CookieBannerBottomBar as _cookie,
  StatsAnimatedRow as _stats,
  ClassScheduleGrid as _cls,
  MembershipTierCards as _mem,
  TrainerProfileCard as _trn,
  GymStatsRow as _gym,
  ThemeRenderer,
  SPOR_ZEN_CONFIG,
  SPOR_ZEN_BUSINESS,
} from '@kepenk/templates'

void _h; void _hero; void _tst; void _wh; void _footer; void _wa; void _cookie
void _stats; void _cls; void _mem; void _trn; void _gym

export default function SporZenClient() {
  const theme = SPOR_ZEN_CONFIG
  const page = theme.pages[0]!
  const business = SPOR_ZEN_BUSINESS

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
