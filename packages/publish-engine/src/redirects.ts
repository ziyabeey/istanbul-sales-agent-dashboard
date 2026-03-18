/**
 * @kepenk/publish-engine — Redirect Manager
 * Compiles redirect rules for Firebase Hosting and Cloudflare Pages.
 */

import type { SiteManifest } from '@kepenk/site-schema'

interface RedirectRule {
  from: string
  to: string
  type: 301 | 302
  createdAt: string
}

/**
 * Generate a redirect rule for slug changes.
 */
export function createSlugRedirect(oldSlug: string, newSlug: string): RedirectRule {
  return {
    from: `/${oldSlug}`,
    to: `/${newSlug}`,
    type: 301,
    createdAt: new Date().toISOString(),
  }
}

/**
 * Export redirects to Cloudflare Pages _redirects format.
 * Format: /old-path /new-path 301
 */
export function toCloudflareRedirects(redirects: RedirectRule[]): string {
  if (redirects.length === 0) return ''
  return redirects
    .map(r => `${r.from} ${r.to} ${r.type}`)
    .join('\n')
}

/**
 * Export redirects to Firebase Hosting rewrites format.
 */
export function toFirebaseRedirects(redirects: RedirectRule[]): Array<{
  source: string
  destination: string
  type: number
}> {
  return redirects.map(r => ({
    source: r.from,
    destination: r.to,
    type: r.type,
  }))
}

/**
 * Build the full deploy manifest for static site output.
 * Returns a map of output file paths → content.
 */
export function buildDeployManifest(
  manifest: SiteManifest,
  pageHtmls: Map<string, string>,
  sitemap: string,
  robots: string,
): Map<string, string> {
  const output = new Map<string, string>()

  // Pages
  for (const pageRef of manifest.pages) {
    const html = pageHtmls.get(pageRef.pageId)
    if (!html) continue

    const outputPath = pageRef.isHomePage
      ? 'index.html'
      : `${pageRef.slug}/index.html`

    output.set(outputPath, html)
  }

  // SEO files
  output.set('sitemap.xml', sitemap)
  output.set('robots.txt', robots)

  // Cloudflare _redirects
  const redirects = toCloudflareRedirects(manifest.redirects as RedirectRule[])
  if (redirects) {
    output.set('_redirects', redirects)
  }

  return output
}
