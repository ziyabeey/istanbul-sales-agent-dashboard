'use client'
import { HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c, CarpetServiceGrid as _csg, CarpetPricingTable as _cpt, CarpetProcessSteps as _cps, CarpetStatsRow as _csr, CarpetPickupForm as _cpf, ThemeRenderer, HALIYIKAMA_EV_CONFIG, HALIYIKAMA_EV_BUSINESS } from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _csg; void _cpt; void _cps; void _csr; void _cpf
export default function Client() {
  const t = HALIYIKAMA_EV_CONFIG, p = t.pages[0]!, b = HALIYIKAMA_EV_BUSINESS
  return (<div lang="tr"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Laundry', name: b.name, telephone: b.phone, address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.city, addressCountry: 'TR' } }) }} /><ThemeRenderer theme={t} page={p} business={b} /></div>)
}
