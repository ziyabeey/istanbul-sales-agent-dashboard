// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  TERZI_TADILAT_CONFIG,
  TERZI_TADILAT_BUSINESS
} from '@kepenk/templates'

export default function TerziTadilatClient() {
  const theme = TERZI_TADILAT_CONFIG;
  const business = TERZI_TADILAT_BUSINESS;

  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'TailorShop', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
