// @ts-nocheck
'use client'

import React from 'react'
import {
  ThemeRenderer,
  RESTORAN_KLASIK_CONFIG,
  RESTORAN_KLASIK_BUSINESS
} from '@kepenk/templates'

export default function RestoranKlasikDemo() {
  const theme = RESTORAN_KLASIK_CONFIG;
  const business = RESTORAN_KLASIK_BUSINESS;

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
    url: `https://kepenk.ai/demolar/restoran-klasik`
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
