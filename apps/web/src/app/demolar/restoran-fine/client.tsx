// @ts-nocheck
'use client'

import React from 'react'
import {
  ThemeRenderer,
  RESTORAN_FINE_CONFIG,
  RESTORAN_FINE_BUSINESS
} from '@kepenk/templates'

export default function RestoranFineDemo() {
  const theme = RESTORAN_FINE_CONFIG;
  const business = RESTORAN_FINE_BUSINESS;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: business.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address,
      addressLocality: business.district,
      addressRegion: business.city,
      addressCountry: 'TR'
    },
    telephone: business.phone,
    url: `https://kepenk.ai/demolar/restoran-fine`
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="w-full flex-1 m-0 p-0 overflow-x-hidden">
        <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
      </main>
    </>
  )
}
