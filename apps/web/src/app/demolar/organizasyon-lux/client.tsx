// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  ORGANIZASYON_LUX_CONFIG,
  ORGANIZASYON_LUX_BUSINESS
} from '@kepenk/templates'

export default function OrganizasyonLuxClient() {
  const theme = ORGANIZASYON_LUX_CONFIG;
  const business = ORGANIZASYON_LUX_BUSINESS;

  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'EventPlanner', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
