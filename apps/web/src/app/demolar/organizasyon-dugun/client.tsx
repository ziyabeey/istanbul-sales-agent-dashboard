// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  ORGANIZASYON_DUGUN_CONFIG,
  ORGANIZASYON_DUGUN_BUSINESS
} from '@kepenk/templates'

export default function OrganizasyonDugunClient() {
  const theme = ORGANIZASYON_DUGUN_CONFIG;
  const business = ORGANIZASYON_DUGUN_BUSINESS;

  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'EventPlanner', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
