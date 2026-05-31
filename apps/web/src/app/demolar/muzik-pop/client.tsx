// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  MUZIK_POP_CONFIG,
  MUZIK_POP_BUSINESS
} from '@kepenk/templates'

export default function MuzikPopClient() {
  const theme = MUZIK_POP_CONFIG;
  const business = MUZIK_POP_BUSINESS;

  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'MusicSchool', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
