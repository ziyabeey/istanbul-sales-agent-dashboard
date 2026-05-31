// @ts-nocheck
'use client'


import React from 'react'
import {
  ThemeRenderer,
  KLINIK_VIP_CONFIG,
  KLINIK_VIP_BUSINESS
} from '@kepenk/templates'

export default function KlinikVipDemo() {
  const theme = KLINIK_VIP_CONFIG;
  const business = KLINIK_VIP_BUSINESS;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: KLINIK_VIP_BUSINESS.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: KLINIK_VIP_BUSINESS.address,
      addressLocality: KLINIK_VIP_BUSINESS.district,
      addressRegion: KLINIK_VIP_BUSINESS.city,
      addressCountry: 'TR'
    },
    telephone: KLINIK_VIP_BUSINESS.phone,
    url: `https://kepenk.ai/demolar/klinik-vip`
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
