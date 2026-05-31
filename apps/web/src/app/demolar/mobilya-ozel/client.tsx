// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  MOBILYA_OZEL_CONFIG,
  MOBILYA_OZEL_BUSINESS
} from '@kepenk/templates'

export default function MobilyaOzelClient() {
  const theme = MOBILYA_OZEL_CONFIG;
  const business = MOBILYA_OZEL_BUSINESS;

  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FurnitureStore', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
