// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  CICEKCI_MAHALLE_CONFIG,
  CICEKCI_MAHALLE_BUSINESS
} from '@kepenk/templates'

export default function CicekciMahalleClient() {
  const theme = CICEKCI_MAHALLE_CONFIG;
  const business = CICEKCI_MAHALLE_BUSINESS;

  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'MovingCompany', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating || '4.9', reviewCount: business.reviewCount || '150' } }) }} />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
