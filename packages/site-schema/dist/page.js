"use strict";
/**
 * @kepenk/site-schema — Page Document Schema
 * Immutable JSON document representing a single page.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageRefSchema = exports.PageDocumentSchema = exports.PageMetaSchema = exports.SEOConfigSchema = void 0;
const zod_1 = require("zod");
const component_1 = require("./component");
// ── SEO Config (per-page overrides) ──
exports.SEOConfigSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    ogImage: component_1.MediaRefSchema.optional(),
    robots: zod_1.z.string().optional(),
    canonical: zod_1.z.string().optional(),
});
// ── Page Metadata ──
exports.PageMetaSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    slug: zod_1.z.string(),
    description: zod_1.z.string().default(''),
    ogImage: component_1.MediaRefSchema.optional(),
    customHead: zod_1.z.string().optional(),
    customCSS: zod_1.z.string().optional(),
});
// ── Page Document (immutable, content-hashed) ──
exports.PageDocumentSchema = zod_1.z.object({
    contentHash: zod_1.z.string(),
    pageId: zod_1.z.string(),
    siteId: zod_1.z.string(),
    // Component tree root
    root: component_1.ComponentNodeSchema,
    // Page-level metadata
    meta: exports.PageMetaSchema,
});
// ── Page Reference (pointer in manifest) ──
exports.PageRefSchema = zod_1.z.object({
    pageId: zod_1.z.string(),
    contentHash: zod_1.z.string(),
    slug: zod_1.z.string(),
    title: zod_1.z.string(),
    isHomePage: zod_1.z.boolean().default(false),
    isDynamic: zod_1.z.boolean().default(false),
    parentPageId: zod_1.z.string().optional(),
    seoOverrides: exports.SEOConfigSchema.optional(),
});
//# sourceMappingURL=page.js.map