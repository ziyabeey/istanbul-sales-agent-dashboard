'use client'
import {
  HeaderMinimalSticky as _h, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _c,
  ServicePriceGrid as _spg, VehicleAppointment as _va, MaintenancePackages as _mp, ServiceStatsRow as _ssr,
  ThemeRenderer, OTO_FILO_CONFIG, OTO_FILO_BUSINESS,
} from '@kepenk/templates'
void _h; void _f; void _wa; void _c; void _spg; void _va; void _mp; void _ssr

export default function OtoFiloClient() {
  const theme = OTO_FILO_CONFIG; const page = theme.pages[0]!; const business = OTO_FILO_BUSINESS
  return (
    <div lang="tr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'AutoRepair', name: business.name, telephone: business.phone, address: { '@type': 'PostalAddress', addressLocality: business.district, addressRegion: business.city, addressCountry: 'TR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount } }) }} />
      <ThemeRenderer theme={theme} page={page} business={business} />
    </div>
  )
}
