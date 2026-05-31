// @ts-nocheck
'use client'

import { ThemeRenderer, OTO_HIZLI_CONFIG, OTO_HIZLI_BUSINESS } from '@kepenk/templates'

export default function Client() {
  const t = OTO_HIZLI_CONFIG, p = t.pages[0]!, b = OTO_HIZLI_BUSINESS
  return (
    <div lang="tr">
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify({ 
            '@context': 'https://schema.org', 
            '@type': 'AutoRepair', 
            name: b.name, 
            telephone: b.phone, 
            address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.city, addressCountry: 'TR' } 
          }) 
        }} 
      />
      <ThemeRenderer theme={t} page={p} business={b} />
    </div>
  )
}
