// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  TERZI_ERKEK_CONFIG,
  TERZI_ERKEK_BUSINESS
} from '@kepenk/templates'

export default function TerziErkekClient() {
  const theme = TERZI_ERKEK_CONFIG;
  const business = TERZI_ERKEK_BUSINESS;

  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'TailorShop', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
