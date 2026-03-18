/**
 * Meta Tag Engine — Auto-generates SEO meta tags
 * ────────────────────────────────────────────────
 * Pattern-based, sector-aware title/description generation.
 * Handles: title, description, OG tags, canonical, robots.
 */

import { SECTOR_KEYWORDS } from './structuredData'

/* ═══════ Turkish Slug ═══════ */

const TURKISH_CHAR_MAP: Record<string, string> = {
  'ç': 'c', 'Ç': 'c', 'ğ': 'g', 'Ğ': 'g', 'ı': 'i', 'İ': 'i',
  'ö': 'o', 'Ö': 'o', 'ş': 's', 'Ş': 's', 'ü': 'u', 'Ü': 'u',
}

export function turkishSlugify(text: string): string {
  let slug = text.toLowerCase()
  for (const [tr, en] of Object.entries(TURKISH_CHAR_MAP)) {
    slug = slug.replace(new RegExp(tr, 'g'), en)
  }
  return slug.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

/* ═══════ Meta Tag Generation ═══════ */

export interface PageSEOInput {
  pageTitle: string
  businessName: string
  sector: string
  district: string
  city: string
  phone?: string
  customDescription?: string
  customTitle?: string
  pageSlug: string
  domain: string
  imageUrl?: string
  pageType: 'home' | 'product' | 'category' | 'service' | 'blog' | 'contact' | 'about' | 'other'
}

export interface GeneratedMetaTags {
  title: string
  description: string
  canonical: string
  robots: string
  og: {
    title: string
    description: string
    url: string
    type: string
    image?: string
    locale: string
    siteName: string
  }
}

export function generateMetaTags(input: PageSEOInput): GeneratedMetaTags {
  const { pageTitle, businessName, sector, district, city, phone, customDescription, customTitle, pageSlug, domain, imageUrl, pageType } = input

  // Title: max 60 chars
  const title = customTitle || truncate(
    pageType === 'home'
      ? `${businessName} - ${district}, ${city} | ${getSectorLabel(sector)}`
      : `${pageTitle} | ${businessName} - ${district}, ${city}`,
    60
  )

  // Description: max 160 chars
  const sectorKws = SECTOR_KEYWORDS[sector] || []
  const kwSnippet = sectorKws.slice(0, 3).join(', ')
  const description = customDescription || truncate(
    pageType === 'home'
      ? `${businessName}, ${district} bölgesinde ${getSectorLabel(sector)} hizmeti. ${kwSnippet}. ${phone ? `☎ ${phone}` : ''}`
      : `${pageTitle} - ${businessName}. ${district}, ${city} bölgesinde ${kwSnippet}.`,
    160
  )

  // Canonical: exclude filter/sort params
  const canonical = `https://${domain}${pageSlug === '/' ? '' : `/${pageSlug}`}`

  return {
    title,
    description,
    canonical,
    robots: 'index, follow',
    og: {
      title,
      description,
      url: canonical,
      type: pageType === 'product' ? 'product' : 'website',
      image: imageUrl,
      locale: 'tr_TR',
      siteName: businessName,
    },
  }
}

/* ═══════ Robots.txt Generator ═══════ */

export function generateRobotsTxt(domain: string, customRules?: string[]): string {
  const rules = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /dashboard/',
    'Disallow: /checkout/',
    `Sitemap: https://${domain}/sitemap.xml`,
    '',
    ...(customRules || []),
  ]
  return rules.join('\n')
}

/* ═══════ Sitemap Generator ═══════ */

export interface SitemapEntry {
  loc: string
  lastmod?: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
  images?: { loc: string; title?: string }[]
}

export function generateSitemapXml(domain: string, entries: SitemapEntry[]): string {
  const urls = entries.map(entry => {
    const images = (entry.images || []).map(img =>
      `    <image:image>\n      <image:loc>${img.loc}</image:loc>${img.title ? `\n      <image:title>${escapeXml(img.title)}</image:title>` : ''}\n    </image:image>`
    ).join('\n')

    return `  <url>\n    <loc>https://${domain}${entry.loc}</loc>${entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''}${entry.changefreq ? `\n    <changefreq>${entry.changefreq}</changefreq>` : ''}${entry.priority !== undefined ? `\n    <priority>${entry.priority}</priority>` : ''}${images ? `\n${images}` : ''}\n  </url>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>`
}

/* ═══════ IndexNow ═══════ */

export async function submitIndexNow(urls: string[], apiKey: string): Promise<void> {
  // Bing + Yandex IndexNow API
  const payload = {
    host: new URL(urls[0]).host,
    key: apiKey,
    urlList: urls,
  }

  const engines = [
    'https://api.indexnow.org/indexnow',
    'https://yandex.com/indexnow',
  ]

  await Promise.allSettled(
    engines.map(engine =>
      fetch(engine, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    )
  )
}

/* ═══════ Helpers ═══════ */

function truncate(text: string, max: number): string {
  return text.length <= max ? text : text.substring(0, max - 3) + '...'
}

function escapeXml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function getSectorLabel(sector: string): string {
  const labels: Record<string, string> = {
    kasap: 'kasap', berber: 'erkek kuaförü', restoran: 'restoran',
    eczane: 'eczane', kuafor: 'kuaför', kafe: 'kafe',
    pastane: 'pastane', spor_salonu: 'spor salonu',
    dis_hekimi: 'diş hekimliği', veteriner: 'veteriner',
    tamirci: 'oto tamir', terzi: 'terzilik', fotograf: 'fotoğrafçılık',
  }
  return labels[sector] || sector
}
