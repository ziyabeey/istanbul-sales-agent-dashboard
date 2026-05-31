// @ts-nocheck
'use client'


import React from 'react'
import {
  ThemeRenderer,
  KLINIK_KURUMSAL_CONFIG,
  KLINIK_KURUMSAL_BUSINESS
} from '@kepenk/templates'

export default function KlinikKurumsalDemo() {
  const theme = KLINIK_KURUMSAL_CONFIG;
  const business = KLINIK_KURUMSAL_BUSINESS;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: KLINIK_KURUMSAL_BUSINESS.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: KLINIK_KURUMSAL_BUSINESS.address,
      addressLocality: KLINIK_KURUMSAL_BUSINESS.district,
      addressRegion: KLINIK_KURUMSAL_BUSINESS.city,
      addressCountry: 'TR'
    },
    telephone: KLINIK_KURUMSAL_BUSINESS.phone,
    url: `https://kepenk.ai/demolar/klinik-kurumsal`
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
