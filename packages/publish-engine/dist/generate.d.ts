/**
 * @kepenk/publish-engine — HTML Document Generator
 * React SSR → full static HTML document.
 */
import type { SiteManifest, PageDocument, MasterPageDocument, PageRef } from '@kepenk/site-schema';
interface GenerateOptions {
    /** The site manifest */
    manifest: SiteManifest;
    /** The page document to render */
    page: PageDocument;
    /** The page reference from the manifest */
    pageRef: PageRef;
    /** The master page containing header, footer, globals */
    masterPage: MasterPageDocument;
}
/**
 * Generate a complete static HTML document from a page document.
 *
 * This is the core SSR function used by the publish pipeline.
 * It renders the React component tree to HTML and wraps it in a
 * full <!DOCTYPE html> shell with CSS variables, meta tags, and JSON-LD.
 */
export declare function generatePageHtml(options: GenerateOptions): string;
export {};
//# sourceMappingURL=generate.d.ts.map