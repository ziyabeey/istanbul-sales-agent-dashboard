// @ts-nocheck
'use client'


import React from 'react'
import {
  ThemeRenderer,
  KLINIK_MODERN_CONFIG,
  KLINIK_MODERN_BUSINESS
} from '@kepenk/templates'

export default function KlinikModernDemo() {
  const theme = KLINIK_MODERN_CONFIG;
  const business = KLINIK_MODERN_BUSINESS;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: KLINIK_MODERN_BUSINESS.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: KLINIK_MODERN_BUSINESS.address,
      addressLocality: KLINIK_MODERN_BUSINESS.district,
      addressRegion: KLINIK_MODERN_BUSINESS.city,
      addressCountry: 'TR'
    },
    telephone: KLINIK_MODERN_BUSINESS.phone,
    url: `https://kepenk.ai/demolar/klinik-modern`
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
