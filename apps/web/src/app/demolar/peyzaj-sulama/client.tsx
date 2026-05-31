// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  PEYZAJ_SULAMA_CONFIG,
  PEYZAJ_SULAMA_BUSINESS
} from '@kepenk/templates'

export default function PeyzajSulamaClient() {
  const theme = PEYZAJ_SULAMA_CONFIG;
  const business = PEYZAJ_SULAMA_BUSINESS;

  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'LandscapingService', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
