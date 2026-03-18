'use client'
import { HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c, JewelryCollectionGrid as _jcg, GoldPriceWidget as _gpw, JewelryServicesGrid as _jsg, JewelryStatsRow as _jsr, JewelryContactForm as _jcf, ThemeRenderer, KUYUMCU_DUGUN_CONFIG, KUYUMCU_DUGUN_BUSINESS } from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _jcg; void _gpw; void _jsg; void _jsr; void _jcf
export default function Client() {
  const t = KUYUMCU_DUGUN_CONFIG, p = t.pages[0]!, b = KUYUMCU_DUGUN_BUSINESS
  return (<div lang="tr"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'JewelryStore', name: b.name, telephone: b.phone, address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.city, addressCountry: 'TR' } }) }} /><ThemeRenderer theme={t} page={p} business={b} /></div>)
}
