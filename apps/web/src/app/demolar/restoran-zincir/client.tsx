// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  RESTORAN_ZINCIR_CONFIG,
  RESTORAN_ZINCIR_BUSINESS
} from '@kepenk/templates'

export default function RestoranZincirClient() {
  const theme = RESTORAN_ZINCIR_CONFIG;
  const business = RESTORAN_ZINCIR_BUSINESS;

  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FastFoodRestaurant', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount }, servesCuisine: 'Burgers' }) }} />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
