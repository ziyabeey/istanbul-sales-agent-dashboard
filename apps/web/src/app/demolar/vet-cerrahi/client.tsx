// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  VET_CERRAHI_CONFIG,
  VET_CERRAHI_BUSINESS
} from '@kepenk/templates'

export default function VetCerrahiClient() {
  const theme = VET_CERRAHI_CONFIG;
  const business = VET_CERRAHI_BUSINESS;

  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'VeterinaryCare', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
