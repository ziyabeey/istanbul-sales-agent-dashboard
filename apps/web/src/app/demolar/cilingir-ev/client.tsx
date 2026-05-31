// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  CILINGIR_EV_CONFIG,
  CILINGIR_EV_BUSINESS
} from '@kepenk/templates'

export default function CilingirEvClient() {
  const theme = CILINGIR_EV_CONFIG;
  const business = CILINGIR_EV_BUSINESS;

  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'MovingCompany', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating || '4.9', reviewCount: business.reviewCount || '150' } }) }} />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
