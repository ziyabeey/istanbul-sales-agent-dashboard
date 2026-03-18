/**
 * SEO Structured Data Engine
 * ──────────────────────────
 * Generates JSON-LD structured data based on sector + page type.
 * Supports: LocalBusiness, Product, FAQPage, Service, BreadcrumbList, WebSite
 */

/* ═══════ Sector → Schema.org Type Mapping ═══════ */

const SECTOR_SCHEMA_MAP: Record<string, string> = {
  kasap: 'Butcher',
  berber: 'BarberShop',
  restoran: 'Restaurant',
  eczane: 'Pharmacy',
  kuafor: 'HairSalon',
  oto_yikama: 'AutoWash',
  spor_salonu: 'ExerciseGym',
  dis_hekimi: 'Dentist',
  veteriner: 'VeterinaryCare',
  tamirci: 'AutoRepair',
  terzi: 'TailoringShop',
  fotograf: 'Photographer',
  kafe: 'CafeOrCoffeeShop',
  pastane: 'Bakery',
  cicekcl: 'Florist',
  default: 'LocalBusiness',
}

/* ═══════ Sector Keywords ═══════ */

export const SECTOR_KEYWORDS: Record<string, string[]> = {
  kasap: ['taze et', 'kasap', 'kuzu eti', 'dana eti', 'sucuk', 'pastırma', 'eve teslimat'],
  berber: ['erkek kuaförü', 'saç kesimi', 'sakal tıraşı', 'berber', 'randevu'],
  restoran: ['yemek siparişi', 'restoran', 'menü', 'online sipariş', 'paket servis'],
  eczane: ['eczane', 'ilaç', 'nöbetçi eczane', 'reçete'],
  kuafor: ['kuaför', 'saç boyama', 'fön', 'bakım', 'manikür'],
  kafe: ['kafe', 'kahve', 'brunch', 'tatlı', 'çalışma alanı'],
  pastane: ['pastane', 'pasta', 'börek', 'poğaça', 'sipariş'],
  spor_salonu: ['spor salonu', 'fitness', 'pt', 'antrenman'],
}

/* ═══════ Interfaces ═══════ */

export interface BusinessInfo {
  name: string
  sector: string
  description?: string
  phone?: string
  email?: string
  address?: {
    street?: string
    district: string    // İlçe
    city: string        // İl
    postalCode?: string
  }
  geo?: { lat: number; lng: number }
  openingHours?: { day: string; open: string; close: string }[]
  priceRange?: string
  logoUrl?: string
  domain: string
  socialLinks?: { instagram?: string; facebook?: string; googleMaps?: string }
  paymentMethods?: string[]
}

/* ═══════ JSON-LD Generators ═══════ */

export function generateLocalBusinessJsonLd(biz: BusinessInfo): object {
  const schemaType = SECTOR_SCHEMA_MAP[biz.sector] || SECTOR_SCHEMA_MAP.default

  return {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: biz.name,
    description: biz.description || `${biz.name}, ${biz.address?.district} bölgesinde ${biz.sector} hizmeti.`,
    url: `https://${biz.domain}`,
    telephone: biz.phone,
    email: biz.email,
    address: biz.address ? {
      '@type': 'PostalAddress',
      streetAddress: biz.address.street,
      addressLocality: biz.address.district,
      addressRegion: biz.address.city,
      postalCode: biz.address.postalCode,
      addressCountry: 'TR',
    } : undefined,
    geo: biz.geo ? {
      '@type': 'GeoCoordinates',
      latitude: biz.geo.lat,
      longitude: biz.geo.lng,
    } : undefined,
    openingHoursSpecification: biz.openingHours?.map(h => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.day,
      opens: h.open,
      closes: h.close,
    })),
    priceRange: biz.priceRange || '₺₺',
    image: biz.logoUrl,
    sameAs: [biz.socialLinks?.instagram, biz.socialLinks?.facebook, biz.socialLinks?.googleMaps].filter(Boolean),
    areaServed: biz.address ? {
      '@type': 'City',
      name: `${biz.address.district}, ${biz.address.city}`,
    } : undefined,
    paymentAccepted: biz.paymentMethods || ['Nakit', 'Kredi Kartı', 'Havale'],
    currenciesAccepted: 'TRY',
  }
}

export function generateProductJsonLd(product: {
  name: string; description: string; image: string; sku?: string;
  price: number; currency?: string; availability?: string; brand?: string;
  rating?: { value: number; count: number }
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku,
    brand: product.brand ? { '@type': 'Brand', name: product.brand } : undefined,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency || 'TRY',
      availability: `https://schema.org/${product.availability || 'InStock'}`,
    },
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating.value,
      reviewCount: product.rating.count,
    } : undefined,
  }
}

export function generateFAQJsonLd(faqs: { question: string; answer: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateWebSiteJsonLd(domain: string, name: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url: `https://${domain}`,
    potentialAction: {
      '@type': 'SearchAction',
      target: `https://${domain}/arama?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateServiceJsonLd(service: {
  name: string; description: string; provider: string;
  areaServed: string; price?: number
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: { '@type': 'LocalBusiness', name: service.provider },
    areaServed: { '@type': 'City', name: service.areaServed },
    offers: service.price ? {
      '@type': 'Offer',
      price: service.price,
      priceCurrency: 'TRY',
    } : undefined,
  }
}
