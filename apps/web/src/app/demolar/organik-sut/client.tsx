// @ts-nocheck
'use client'

import {
  HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c,
  ProductShopGrid as _psg, NutritionFactsCard as _nfc, FarmStorySection as _fss, OrderConsultForm as _ocf,
  ThemeRenderer, ORGANIK_SUT_CONFIG, ORGANIK_SUT_BUSINESS,
} from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _psg; void _nfc; void _fss; void _ocf

export default function OrganikSutClient() {
  const theme = ORGANIK_SUT_CONFIG; const page = theme.pages[0]!; const business = ORGANIK_SUT_BUSINESS
  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FoodEstablishment', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' } }) }} />
      <ThemeRenderer theme={theme} page={page} business={business} />
    </div>
  )
}
