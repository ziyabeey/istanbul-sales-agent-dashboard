// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  SPOR_BEAST_CONFIG,
  SPOR_BEAST_BUSINESS
} from '@kepenk/templates'

export default function SporBeastClient() {
  const theme = SPOR_BEAST_CONFIG;
  const business = SPOR_BEAST_BUSINESS;

  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'HealthClub', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
