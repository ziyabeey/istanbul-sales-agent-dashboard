// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  SPOR_STUDIO_CONFIG,
  SPOR_STUDIO_BUSINESS
} from '@kepenk/templates'

export default function SporStudioClient() {
  const theme = SPOR_STUDIO_CONFIG;
  const business = SPOR_STUDIO_BUSINESS;

  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'HealthClub', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
