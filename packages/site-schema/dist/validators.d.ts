/**
 * @kepenk/site-schema — Validators & Utilities
 * Content hashing, Turkish slug generation, schema validation helpers.
 */
import type { SiteManifest } from './manifest';
import type { PageDocument } from './page';
import type { ComponentNode } from './component';
import type { MasterPageDocument } from './master-page';
/**
 * Compute a content hash for immutable storage.
 * SHA-256 of the JSON string, truncated to 16 hex characters.
 */
export declare function computeContentHash(data: unknown): string;
/**
 * Generate a URL-safe slug from Turkish text.
 * - Converts Turkish characters (ç→c, ş→s, ı→i, ğ→g, ö→o, ü→u)
 * - Lowercases everything
 * - Replaces spaces with hyphens
 * - Strips non-alphanumeric characters
 * - Max 60 characters
 */
export declare function slugify(text: string): string;
export declare function validateManifest(data: unknown): {
    success: true;
    data: SiteManifest;
} | {
    success: false;
    errors: string[];
};
export declare function validatePage(data: unknown): {
    success: true;
    data: PageDocument;
} | {
    success: false;
    errors: string[];
};
export declare function validateComponent(data: unknown): {
    success: true;
    data: ComponentNode;
} | {
    success: false;
    errors: string[];
};
export declare function validateMasterPage(data: unknown): {
    success: true;
    data: MasterPageDocument;
} | {
    success: false;
    errors: string[];
};
/** Generate a unique component ID with type prefix */
export declare function generateComponentId(type: string): string;
/** Generate a unique page ID */
export declare function generatePageId(): string;
/** Generate a unique site ID */
export declare function generateSiteId(): string;
//# sourceMappingURL=validators.d.ts.map