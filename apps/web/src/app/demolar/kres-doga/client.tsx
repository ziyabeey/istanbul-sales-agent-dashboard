// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  KRES_DOGA_CONFIG,
  KRES_DOGA_BUSINESS
} from '@kepenk/templates'

export default function KresDogaClient() {
  const theme = KRES_DOGA_CONFIG;
  const business = KRES_DOGA_BUSINESS;

  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'ChildCare', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
