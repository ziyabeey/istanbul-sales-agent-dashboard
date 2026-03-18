/**
 * @kepenk/publish-engine — Redirect Manager
 * Compiles redirect rules for Firebase Hosting and Cloudflare Pages.
 */
import type { SiteManifest } from '@kepenk/site-schema';
interface RedirectRule {
    from: string;
    to: string;
    type: 301 | 302;
    createdAt: string;
}
/**
 * Generate a redirect rule for slug changes.
 */
export declare function createSlugRedirect(oldSlug: string, newSlug: string): RedirectRule;
/**
 * Export redirects to Cloudflare Pages _redirects format.
 * Format: /old-path /new-path 301
 */
export declare function toCloudflareRedirects(redirects: RedirectRule[]): string;
/**
 * Export redirects to Firebase Hosting rewrites format.
 */
export declare function toFirebaseRedirects(redirects: RedirectRule[]): Array<{
    source: string;
    destination: string;
    type: number;
}>;
/**
 * Build the full deploy manifest for static site output.
 * Returns a map of output file paths → content.
 */
export declare function buildDeployManifest(manifest: SiteManifest, pageHtmls: Map<string, string>, sitemap: string, robots: string): Map<string, string>;
export {};
//# sourceMappingURL=redirects.d.ts.map