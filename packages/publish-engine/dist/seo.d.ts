/**
 * @kepenk/publish-engine — SEO Utilities
 * Meta tags, JSON-LD structured data, sitemap, and robots.txt generation.
 */
import type { SiteManifest, PageRef } from '@kepenk/site-schema';
/**
 * Build HTML meta tags string for a page.
 */
export declare function buildMetaTags(page: PageRef, manifest: SiteManifest): string;
/**
 * Build JSON-LD LocalBusiness structured data.
 */
export declare function buildJsonLd(manifest: SiteManifest): object;
/**
 * Generate an XML sitemap string.
 */
export declare function generateSitemap(manifest: SiteManifest): string;
/**
 * Generate a robots.txt string.
 */
export declare function generateRobots(manifest: SiteManifest): string;
//# sourceMappingURL=seo.d.ts.map