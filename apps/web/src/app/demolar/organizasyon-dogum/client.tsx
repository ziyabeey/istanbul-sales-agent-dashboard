'use client'
import { HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c, EventServiceGrid as _esg, EventPackages as _ep, EventGalleryGrid as _egg, EventStatsRow as _esr, EventBookingForm as _ebf, ThemeRenderer, ORGANIZASYON_DOGUM_CONFIG, ORGANIZASYON_DOGUM_BUSINESS } from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _esg; void _ep; void _egg; void _esr; void _ebf
export default function Client() {
  const t = ORGANIZASYON_DOGUM_CONFIG, p = t.pages[0]!, b = ORGANIZASYON_DOGUM_BUSINESS
  return (<div lang="tr"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'EventPlanner', name: b.name, telephone: b.phone, address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.city, addressCountry: 'TR' } }) }} /><ThemeRenderer theme={t} page={p} business={b} /></div>)
}
