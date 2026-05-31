// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  TERZI_GELENEKSEL_CONFIG,
  TERZI_GELENEKSEL_BUSINESS
} from '@kepenk/templates'

export default function TerziGelenekselClient() {
  const theme = TERZI_GELENEKSEL_CONFIG;
  const business = TERZI_GELENEKSEL_BUSINESS;

  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'TailorShop', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
