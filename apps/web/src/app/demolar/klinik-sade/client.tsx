// @ts-nocheck
'use client'


import React from 'react'
import {
  ThemeRenderer,
  KLINIK_SADE_CONFIG,
  KLINIK_SADE_BUSINESS
} from '@kepenk/templates'

export default function KlinikSadeDemo() {
  const theme = KLINIK_SADE_CONFIG;
  const business = KLINIK_SADE_BUSINESS;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: KLINIK_SADE_BUSINESS.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: KLINIK_SADE_BUSINESS.address,
      addressLocality: KLINIK_SADE_BUSINESS.district,
      addressRegion: KLINIK_SADE_BUSINESS.city,
      addressCountry: 'TR'
    },
    telephone: KLINIK_SADE_BUSINESS.phone,
    url: `https://kepenk.ai/demolar/klinik-sade`
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="min-h-screen">
        <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
      </main>
    </>
  )
}
