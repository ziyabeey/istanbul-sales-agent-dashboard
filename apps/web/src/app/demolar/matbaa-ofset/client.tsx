// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  MATBAA_OFSET_CONFIG,
  MATBAA_OFSET_BUSINESS
} from '@kepenk/templates'

export default function MatbaaOfsetClient() {
  const theme = MATBAA_OFSET_CONFIG;
  const business = MATBAA_OFSET_BUSINESS;

  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'LocalBusiness', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
