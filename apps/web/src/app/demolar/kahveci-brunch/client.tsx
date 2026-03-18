'use client'
import { HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c, CoffeeMenuGrid as _cmg, CoffeeBeanShowcase as _cbs, CoffeeAtmosphere as _ca, CoffeeStatsRow as _csr, CoffeeOrderForm as _cof, ThemeRenderer, KAHVECI_BRUNCH_CONFIG, KAHVECI_BRUNCH_BUSINESS } from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _cmg; void _cbs; void _ca; void _csr; void _cof
export default function Client() {
  const t = KAHVECI_BRUNCH_CONFIG, p = t.pages[0]!, b = KAHVECI_BRUNCH_BUSINESS
  return (<div lang="tr"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'CafeOrCoffeeShop', name: b.name, telephone: b.phone, address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.city, addressCountry: 'TR' } }) }} /><ThemeRenderer theme={t} page={p} business={b} /></div>)
}
