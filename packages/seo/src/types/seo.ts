/**
 * @kepenk/seo — JSON-LD Structured Data + llms.txt + AI Mention Tracking
 */

// ═══ JSON-LD ═══

export type SchemaOrgType =
  | 'Restaurant' | 'BarberShop' | 'BeautySalon' | 'Dentist'
  | 'MedicalBusiness' | 'LegalService' | 'ExerciseGym' | 'LocalBusiness'

export const SECTOR_SCHEMA_MAP: Record<string, SchemaOrgType> = {
  restoran: 'Restaurant',
  berber: 'BarberShop',
  guzellik: 'BeautySalon',
  disci: 'Dentist',
  doktor: 'MedicalBusiness',
  avukat: 'LegalService',
  spor: 'ExerciseGym',
  eczane: 'LocalBusiness',
}

export interface LocalBusinessLD {
  '@context': 'https://schema.org'
  '@type': SchemaOrgType
  name: string
  description: string
  url: string
  telephone?: string
  email?: string
  address?: {
    '@type': 'PostalAddress'
    streetAddress: string
    addressLocality: string
    addressRegion?: string
    addressCountry: 'TR'
  }
  geo?: {
    '@type': 'GeoCoordinates'
    latitude: number
    longitude: number
  }
  openingHoursSpecification?: object[]
  priceRange?: string
  image?: string
  aggregateRating?: {
    '@type': 'AggregateRating'
    ratingValue: number
    reviewCount: number
  }
  hasOfferCatalog?: object
  hasMenu?: { '@type': 'Menu'; url: string }
  mainEntity?: object[]
}

export interface SiteDataForLD {
  businessName: string
  description: string
  sector: string
  url: string
  phone?: string
  email?: string
  address?: string
  city?: string
  region?: string
  location?: { lat: number; lng: number }
  workingHours?: Record<string, { open: string; close: string }>
  priceRange?: string
  logoUrl?: string
  rating?: number
  reviewCount?: number
  services?: { name: string; description: string; price: number }[]
  menuUrl?: string
  faq?: { question: string; answer: string }[]
}

/**
 * Generate JSON-LD for a site.
 */
export function generateLocalBusinessLD(site: SiteDataForLD): LocalBusinessLD {
  const schemaType = SECTOR_SCHEMA_MAP[site.sector] || 'LocalBusiness'

  return {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: site.businessName,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    address: site.address ? {
      '@type': 'PostalAddress',
      streetAddress: site.address,
      addressLocality: site.city || '',
      addressRegion: site.region,
      addressCountry: 'TR',
    } : undefined,
    geo: site.location ? {
      '@type': 'GeoCoordinates',
      latitude: site.location.lat,
      longitude: site.location.lng,
    } : undefined,
    priceRange: site.priceRange || '₺₺',
    image: site.logoUrl,
    aggregateRating: (site.rating && site.reviewCount) ? {
      '@type': 'AggregateRating',
      ratingValue: site.rating,
      reviewCount: site.reviewCount,
    } : undefined,
    hasMenu: (site.sector === 'restoran' && site.menuUrl) ? {
      '@type': 'Menu', url: site.menuUrl,
    } : undefined,
    mainEntity: site.faq?.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

// ═══ llms.txt ═══

/**
 * Generate llms.txt content for AI crawlers.
 */
export function generateLlmsTxt(site: SiteDataForLD): string {
  const lines: string[] = [
    `# ${site.businessName}`,
    '',
    `> ${site.description}`,
    '',
  ]

  if (site.services?.length) {
    lines.push('## Hizmetler')
    for (const s of site.services) {
      lines.push(`- ${s.name}: ${s.description} (₺${s.price / 100})`)
    }
    lines.push('')
  }

  lines.push('## İletişim')
  if (site.address) lines.push(`- Adres: ${site.address}`)
  if (site.phone) lines.push(`- Telefon: ${site.phone}`)
  lines.push(`- Web: ${site.url}`)
  lines.push('')

  return lines.join('\n')
}

// ═══ AI Mention Tracking ═══

export type AIMentionPlatform = 'openai' | 'perplexity' | 'anthropic' | 'gemini'

export interface AIMention {
  id: string
  siteId: string
  platform: AIMentionPlatform
  query: string                // "Kadıköy'de en iyi berber"
  response: string             // AI yanıt snippet'i
  mentioned: boolean
  mentionedUrl?: string
  checkedAt: string
}

export interface AIMentionSummary {
  siteId: string
  period: string               // '2026-03'
  totalChecks: number
  mentionCount: number
  mentionRate: number          // 0-1
  byPlatform: Record<AIMentionPlatform, { checks: number; mentions: number }>
}

export const AI_MENTION_PLATFORMS: Record<AIMentionPlatform, { label: string; icon: string; color: string }> = {
  openai:     { label: 'ChatGPT',    icon: '🤖', color: '#10A37F' },
  perplexity: { label: 'Perplexity', icon: '🔍', color: '#20B2AA' },
  anthropic:  { label: 'Claude',     icon: '🧠', color: '#D4A373' },
  gemini:     { label: 'Gemini',     icon: '✨', color: '#4285F4' },
}
