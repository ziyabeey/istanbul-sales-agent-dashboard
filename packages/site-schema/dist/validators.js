"use strict";
/**
 * @kepenk/site-schema — Validators & Utilities
 * Content hashing, Turkish slug generation, schema validation helpers.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeContentHash = computeContentHash;
exports.slugify = slugify;
exports.validateManifest = validateManifest;
exports.validatePage = validatePage;
exports.validateComponent = validateComponent;
exports.validateMasterPage = validateMasterPage;
exports.generateComponentId = generateComponentId;
exports.generatePageId = generatePageId;
exports.generateSiteId = generateSiteId;
const crypto_1 = require("crypto");
const manifest_1 = require("./manifest");
const page_1 = require("./page");
const component_1 = require("./component");
const master_page_1 = require("./master-page");
// ── Content Hash ──
/**
 * Compute a content hash for immutable storage.
 * SHA-256 of the JSON string, truncated to 16 hex characters.
 */
function computeContentHash(data) {
    const json = JSON.stringify(data);
    const hash = (0, crypto_1.createHash)('sha256').update(json).digest('hex');
    return hash.substring(0, 16);
}
// ── Turkish Slug Generation ──
/** Turkish character map for URL-safe slugs */
const TURKISH_CHAR_MAP = {
    'ç': 'c', 'Ç': 'C',
    'ğ': 'g', 'Ğ': 'G',
    'ı': 'i', 'İ': 'I',
    'ö': 'o', 'Ö': 'O',
    'ş': 's', 'Ş': 'S',
    'ü': 'u', 'Ü': 'U',
};
/**
 * Generate a URL-safe slug from Turkish text.
 * - Converts Turkish characters (ç→c, ş→s, ı→i, ğ→g, ö→o, ü→u)
 * - Lowercases everything
 * - Replaces spaces with hyphens
 * - Strips non-alphanumeric characters
 * - Max 60 characters
 */
function slugify(text) {
    let slug = text;
    // Replace Turkish characters
    for (const [from, to] of Object.entries(TURKISH_CHAR_MAP)) {
        slug = slug.replace(new RegExp(from, 'g'), to);
    }
    slug = slug
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-') // spaces → hyphens
        .replace(/[^a-z0-9-]/g, '') // strip non-alphanumeric
        .replace(/-+/g, '-') // collapse multiple hyphens
        .replace(/^-|-$/g, ''); // strip leading/trailing hyphens
    // Max 60 characters
    if (slug.length > 60) {
        slug = slug.substring(0, 60).replace(/-$/, '');
    }
    return slug;
}
// ── Schema Validation ──
function validateManifest(data) {
    const result = manifest_1.SiteManifestSchema.safeParse(data);
    if (result.success) {
        return { success: true, data: result.data };
    }
    return {
        success: false,
        errors: result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`),
    };
}
function validatePage(data) {
    const result = page_1.PageDocumentSchema.safeParse(data);
    if (result.success) {
        return { success: true, data: result.data };
    }
    return {
        success: false,
        errors: result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`),
    };
}
function validateComponent(data) {
    const result = component_1.ComponentNodeSchema.safeParse(data);
    if (result.success) {
        return { success: true, data: result.data };
    }
    return {
        success: false,
        errors: result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`),
    };
}
function validateMasterPage(data) {
    const result = master_page_1.MasterPageDocumentSchema.safeParse(data);
    if (result.success) {
        return { success: true, data: result.data };
    }
    return {
        success: false,
        errors: result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`),
    };
}
// ── ID Generators ──
/** Generate a unique component ID with type prefix */
function generateComponentId(type) {
    const shortId = Math.random().toString(36).substring(2, 8);
    return `${type}-${shortId}`;
}
/** Generate a unique page ID */
function generatePageId() {
    return `page-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
}
/** Generate a unique site ID */
function generateSiteId() {
    return `site-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}
//# sourceMappingURL=validators.js.map