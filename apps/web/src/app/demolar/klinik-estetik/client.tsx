// @ts-nocheck
'use client'


import React from 'react'
import {
  ThemeRenderer,
  KLINIK_ESTETIK_CONFIG,
  KLINIK_ESTETIK_BUSINESS
} from '@kepenk/templates'

export default function KlinikEstetikDemo() {
  const theme = KLINIK_ESTETIK_CONFIG;
  const business = KLINIK_ESTETIK_BUSINESS;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: KLINIK_ESTETIK_BUSINESS.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: KLINIK_ESTETIK_BUSINESS.address,
      addressLocality: KLINIK_ESTETIK_BUSINESS.district,
      addressRegion: KLINIK_ESTETIK_BUSINESS.city,
      addressCountry: 'TR'
    },
    telephone: KLINIK_ESTETIK_BUSINESS.phone,
    url: `https://kepenk.ai/demolar/klinik-estetik`
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
