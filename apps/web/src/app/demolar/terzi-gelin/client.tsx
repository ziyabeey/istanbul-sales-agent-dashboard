// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  TERZI_GELIN_CONFIG,
  TERZI_GELIN_BUSINESS
} from '@kepenk/templates'

export default function TerziGelinClient() {
  const theme = TERZI_GELIN_CONFIG;
  const business = TERZI_GELIN_BUSINESS;

  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'TailorShop', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
