// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  PASTANE_TATLI_CONFIG,
  PASTANE_TATLI_BUSINESS
} from '@kepenk/templates'

export default function PastaneTatliClient() {
  const theme = PASTANE_TATLI_CONFIG;
  const business = PASTANE_TATLI_BUSINESS;

  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Bakery', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
