'use client'
import { HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c, PetServicesGrid as _psg, VetTeamSection as _vt, VetStatsRow as _vsr, PetAppointmentForm as _paf, ThemeRenderer, VET_CERRAHI_CONFIG, VET_CERRAHI_BUSINESS } from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _psg; void _vt; void _vsr; void _paf
export default function Client() {
  const t = VET_CERRAHI_CONFIG, p = t.pages[0]!, b = VET_CERRAHI_BUSINESS
  return (<div lang="tr"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'VeterinaryCare', name: b.name, telephone: b.phone, address: { '@type': 'PostalAddress', addressLocality: b.district, addressRegion: b.city, addressCountry: 'TR' } }) }} /><ThemeRenderer theme={t} page={p} business={b} /></div>)
}
