// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  FOTO_DOGUM_CONFIG,
  FOTO_DOGUM_BUSINESS
} from '@kepenk/templates'

export default function FotoDogumClient() {
  const theme = FOTO_DOGUM_CONFIG;
  const business = FOTO_DOGUM_BUSINESS;

  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'LocalBusiness', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
