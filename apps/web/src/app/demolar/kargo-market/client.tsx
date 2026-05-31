// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  KARGO_MARKET_CONFIG,
  KARGO_MARKET_BUSINESS
} from '@kepenk/templates'

export default function KargoMarketClient() {
  const theme = KARGO_MARKET_CONFIG;
  const business = KARGO_MARKET_BUSINESS;

  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'DeliveryService', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
