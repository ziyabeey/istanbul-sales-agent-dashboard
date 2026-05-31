// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  KARGO_DOSYA_CONFIG,
  KARGO_DOSYA_BUSINESS
} from '@kepenk/templates'

export default function KargoDosyaClient() {
  const theme = KARGO_DOSYA_CONFIG;
  const business = KARGO_DOSYA_BUSINESS;

  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'DeliveryService', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
