// @ts-nocheck
'use client'

import {
  HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c,
  ProductShopGrid as _psg, FarmStorySection as _fss, FoodStatsRow as _fsr, OrderConsultForm as _ocf,
  ThemeRenderer, ORGANIK_PAZAR_CONFIG, ORGANIK_PAZAR_BUSINESS,
} from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _psg; void _fss; void _fsr; void _ocf

export default function OrganikPazarClient() {
  const theme = ORGANIK_PAZAR_CONFIG; const page = theme.pages[0]!; const business = ORGANIK_PAZAR_BUSINESS
  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Store', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={page} business={business} />
    </div>
  )
}
