// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  KARGO_MOTO_CONFIG,
  KARGO_MOTO_BUSINESS
} from '@kepenk/templates'

export default function KargoMotoClient() {
  const theme = KARGO_MOTO_CONFIG;
  const business = KARGO_MOTO_BUSINESS;

  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'DeliveryService', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
