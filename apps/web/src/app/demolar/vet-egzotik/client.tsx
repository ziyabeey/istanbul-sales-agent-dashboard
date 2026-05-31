// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  VET_EGZOTIK_CONFIG,
  VET_EGZOTIK_BUSINESS
} from '@kepenk/templates'

export default function VetEgzotikClient() {
  const theme = VET_EGZOTIK_CONFIG;
  const business = VET_EGZOTIK_BUSINESS;

  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'VeterinaryCare', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
