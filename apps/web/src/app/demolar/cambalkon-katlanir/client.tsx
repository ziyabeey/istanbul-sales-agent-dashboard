'use client'
import { HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c, GlassBalconyServiceGrid as _gbsg, GlassBalconyGallery as _gbg, GlassBalconyProcessSteps as _gbps, GlassBalconyStatsRow as _gbsr, GlassBalconyQuoteForm as _gbqf, ThemeRenderer, CAMBALKON_KATLANIR_CONFIG, CAMBALKON_KATLANIR_BUSINESS } from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _gbsg; void _gbg; void _gbps; void _gbsr; void _gbqf
export default function Client() {
  const t = CAMBALKON_KATLANIR_CONFIG, p = t.pages[0]!, b = CAMBALKON_KATLANIR_BUSINESS
  return (<div lang="tr"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'HomeAndConstructionBusiness', name: b.name, telephone: b.phone, address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.city, addressCountry: 'TR' } }) }} /><ThemeRenderer theme={t} page={p} business={b} /></div>)
}
