// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  PEYZAJ_MODERN_CONFIG,
  PEYZAJ_MODERN_BUSINESS
} from '@kepenk/templates'

export default function PeyzajModernClient() {
  const theme = PEYZAJ_MODERN_CONFIG;
  const business = PEYZAJ_MODERN_BUSINESS;

  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'LandscapingService', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
