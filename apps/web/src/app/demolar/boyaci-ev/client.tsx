'use client'
import { HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c, PaintServiceGrid as _psg, PaintColorPalette as _pcp, PaintProcessSteps as _pps, PaintStatsRow as _psr, PaintQuoteForm as _pqf, ThemeRenderer, BOYACI_EV_CONFIG, BOYACI_EV_BUSINESS } from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _psg; void _pcp; void _pps; void _psr; void _pqf
export default function Client() {
  const t = BOYACI_EV_CONFIG, p = t.pages[0]!, b = BOYACI_EV_BUSINESS
  return (<div lang="tr"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'HousePainter', name: b.name, telephone: b.phone, address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.city, addressCountry: 'TR' } }) }} /><ThemeRenderer theme={t} page={p} business={b} /></div>)
}
