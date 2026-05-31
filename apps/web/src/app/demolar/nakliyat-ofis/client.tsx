// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  NAKLIYAT_OFIS_CONFIG,
  NAKLIYAT_OFIS_BUSINESS
} from '@kepenk/templates'

export default function NakliyatOfisClient() {
  const theme = NAKLIYAT_OFIS_CONFIG;
  const business = NAKLIYAT_OFIS_BUSINESS;

  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'MovingCompany', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
