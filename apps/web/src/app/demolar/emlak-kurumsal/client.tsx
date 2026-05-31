// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  EMLAK_KURUMSAL_CONFIG,
  EMLAK_KURUMSAL_BUSINESS,
  FooterWarmColumns as _fwc,
  PropertyListingGrid as _plg,
  ValuationRequestForm as _vrf,
  RealEstateStatsRow as _rsr,
  TestimonialsCarousel as _tc,
  FAQAccordion as _faq
} from '@kepenk/templates'

void _fwc; void _plg; void _vrf; void _rsr; void _tc; void _faq;

export default function EmlakKurumsalClient() {
  const theme = EMLAK_KURUMSAL_CONFIG; 
  const page = theme.pages[0]!; 
  const business = EMLAK_KURUMSAL_BUSINESS;
  
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
      <ThemeRenderer theme={theme} page={page} business={business} />
    </div>
  )
}
