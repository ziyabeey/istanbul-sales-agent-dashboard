// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  RESTORAN_NAR_CONFIG,
  RESTORAN_NAR_BUSINESS
} from '@kepenk/templates'

export default function RestoranNarClient() {
  const theme = RESTORAN_NAR_CONFIG;
  const business = RESTORAN_NAR_BUSINESS;

  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Restaurant', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount }, servesCuisine: 'Mediterranean' }) }} />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
