// @ts-nocheck
'use client'

import { HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c, JewelryProductGrid as _jpg, JewelryCollections as _jc, JewelryMaterialBar as _jmb, JewelryStatsRow as _jsr, JewelryInquiryForm as _jif, ThemeRenderer, KUYUMCU_PIRLANTA_CONFIG, KUYUMCU_PIRLANTA_BUSINESS } from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _jpg; void _jc; void _jmb; void _jsr; void _jif
export default function Client() {
  const theme = KUYUMCU_PIRLANTA_CONFIG;
  const business = KUYUMCU_PIRLANTA_BUSINESS;

  const t = KUYUMCU_PIRLANTA_CONFIG, p = t.pages[0]!, b = KUYUMCU_PIRLANTA_BUSINESS
  return (<div lang="tr"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'JewelryStore', name: b.name, telephone: b.phone, address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.city, addressCountry: 'TR' } }) }} /><ThemeRenderer theme={t} page={p} business={b} /></div>)
}
