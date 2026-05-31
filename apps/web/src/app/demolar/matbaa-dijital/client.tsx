// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  MATBAA_DIJITAL_CONFIG,
  MATBAA_DIJITAL_BUSINESS
} from '@kepenk/templates'

export default function MatbaaDijitalClient() {
  const theme = MATBAA_DIJITAL_CONFIG;
  const business = MATBAA_DIJITAL_BUSINESS;

  return (
    <div lang="tr">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: business.name,
            telephone: business.phone,
            address: {
              '@type': 'PostalAddress',
              addressLocality: business.district,
              addressRegion: business.city,
              addressCountry: 'TR'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: business.rating,
              reviewCount: business.reviewCount
            }
          })
        }}
      />
      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
    </div>
  )
}
