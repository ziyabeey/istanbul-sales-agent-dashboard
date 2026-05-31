// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  RESTORAN_TABLEDOT_CONFIG,
  RESTORAN_TABLEDOT_BUSINESS
} from '@kepenk/templates'

export default function RestoranTabledotClient() {
  const theme = RESTORAN_TABLEDOT_CONFIG;
  const business = RESTORAN_TABLEDOT_BUSINESS;

  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Restaurant', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount }, servesCuisine: 'Fine Dining' }) }} />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
