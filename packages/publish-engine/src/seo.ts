/**
 * @kepenk/publish-engine — SEO Utilities
 * Meta tags, JSON-LD structured data, sitemap, and robots.txt generation.
 */

import type { SiteManifest, PageRef } from '@kepenk/site-schema'

/**
 * Build HTML meta tags string for a page.
 */
export function buildMetaTags(page: PageRef, manifest: SiteManifest): string {
  const title = page.seoOverrides?.title ||
    manifest.seo.titleTemplate
      .replace('{pageName}', page.title)
      .replace('{businessName}', manifest.siteConfig.businessName)

  const description = page.seoOverrides?.description || manifest.seo.defaultDescription
  const baseUrl = `https://${manifest.siteConfig.customDomain || manifest.siteConfig.domain}`
  const canonical = page.seoOverrides?.canonical || `${baseUrl}/${page.slug}`.replace(/\/$/, '')
  const robots = page.seoOverrides?.robots || manifest.seo.robots
  const ogImageUrl = manifest.seo.ogImage?.url || ''

  return `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <link rel="canonical" href="${canonical}">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="tr_TR">
    ${ogImageUrl ? `<meta property="og:image" content="${ogImageUrl}">` : ''}
    <meta name="robots" content="${robots}">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="UTF-8">`.trim()
}

/**
 * Build JSON-LD LocalBusiness structured data.
 */
export function buildJsonLd(manifest: SiteManifest): object {
  const contact = manifest.siteConfig.contactInfo
  const baseUrl = `https://${manifest.siteConfig.customDomain || manifest.siteConfig.domain}`

  const jsonLd: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: manifest.siteConfig.businessName,
    telephone: contact.phone,
    url: baseUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address,
      addressCountry: 'TR',
    },
  }

  if (contact.email) {
    jsonLd.email = contact.email
  }

  if (contact.coordinates) {
    jsonLd.geo = {
      '@type': 'GeoCoordinates',
      latitude: contact.coordinates.lat,
      longitude: contact.coordinates.lng,
    }
  }

  if (contact.workingHours.length > 0) {
    jsonLd.openingHoursSpecification = contact.workingHours
      .filter(wh => !wh.isClosed)
      .map(wh => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: wh.day,
        opens: wh.opens,
        closes: wh.closes,
      }))
  }

  if (manifest.siteConfig.businessSlogan) {
    jsonLd.slogan = manifest.siteConfig.businessSlogan
  }

  return jsonLd
}

/**
 * Generate an XML sitemap string.
 */
export function generateSitemap(manifest: SiteManifest): string {
  const baseUrl = `https://${manifest.siteConfig.customDomain || manifest.siteConfig.domain}`
  const lastmod = manifest.updatedAt.split('T')[0] // YYYY-MM-DD

  const urls = manifest.pages.map(page => {
    const loc = page.isHomePage ? baseUrl : `${baseUrl}/${page.slug}`
    const priority = page.isHomePage ? '1.0' : '0.8'
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`
}

/**
 * Generate a robots.txt string.
 */
export function generateRobots(manifest: SiteManifest): string {
  const baseUrl = `https://${manifest.siteConfig.customDomain || manifest.siteConfig.domain}`
  return `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml`
}

/** Escape HTML special characters */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
