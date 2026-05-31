// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  VET_PETSHOP_CONFIG,
  VET_PETSHOP_BUSINESS
} from '@kepenk/templates'

export default function VetPetshopClient() {
  const theme = VET_PETSHOP_CONFIG;
  const business = VET_PETSHOP_BUSINESS;

  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'VeterinaryCare', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
