// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  EMLAK_ELITE_CONFIG,
  EMLAK_ELITE_BUSINESS
} from '@kepenk/templates'

export default function EmlakEliteClient() {
  const theme = EMLAK_ELITE_CONFIG; 
  const page = theme.pages[0]!; 
  const business = EMLAK_ELITE_BUSINESS;
  
  return (
    <div lang="tr">
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify({ 
            '@context': 'https://schema.org', 
            '@type': 'RealEstateAgent', 
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
