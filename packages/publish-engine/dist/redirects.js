"use strict";
/**
 * @kepenk/publish-engine — Redirect Manager
 * Compiles redirect rules for Firebase Hosting and Cloudflare Pages.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSlugRedirect = createSlugRedirect;
exports.toCloudflareRedirects = toCloudflareRedirects;
exports.toFirebaseRedirects = toFirebaseRedirects;
exports.buildDeployManifest = buildDeployManifest;
/**
 * Generate a redirect rule for slug changes.
 */
function createSlugRedirect(oldSlug, newSlug) {
    return {
        from: `/${oldSlug}`,
        to: `/${newSlug}`,
        type: 301,
        createdAt: new Date().toISOString(),
    };
}
/**
 * Export redirects to Cloudflare Pages _redirects format.
 * Format: /old-path /new-path 301
 */
function toCloudflareRedirects(redirects) {
    if (redirects.length === 0)
        return '';
    return redirects
        .map(r => `${r.from} ${r.to} ${r.type}`)
        .join('\n');
}
/**
 * Export redirects to Firebase Hosting rewrites format.
 */
function toFirebaseRedirects(redirects) {
    return redirects.map(r => ({
        source: r.from,
        destination: r.to,
        type: r.type,
    }));
}
/**
 * Build the full deploy manifest for static site output.
 * Returns a map of output file paths → content.
 */
function buildDeployManifest(manifest, pageHtmls, sitemap, robots) {
    const output = new Map();
    // Pages
    for (const pageRef of manifest.pages) {
        const html = pageHtmls.get(pageRef.pageId);
        if (!html)
            continue;
        const outputPath = pageRef.isHomePage
            ? 'index.html'
            : `${pageRef.slug}/index.html`;
        output.set(outputPath, html);
    }
    // SEO files
    output.set('sitemap.xml', sitemap);
    output.set('robots.txt', robots);
    // Cloudflare _redirects
    const redirects = toCloudflareRedirects(manifest.redirects);
    if (redirects) {
        output.set('_redirects', redirects);
    }
    return output;
}
//# sourceMappingURL=redirects.js.map