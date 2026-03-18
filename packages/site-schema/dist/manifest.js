"use strict";
/**
 * @kepenk/site-schema — Site Manifest Schema
 * Atomic state pointer: the single source of truth for a site's current state.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteManifestSchema = exports.NavItemSchema = exports.RedirectRuleSchema = exports.SiteSEOSchema = exports.SiteConfigSchema = exports.ContactInfoSchema = exports.BrandColorsSchema = exports.WorkingHoursSchema = void 0;
const zod_1 = require("zod");
const component_1 = require("./component");
const page_1 = require("./page");
// ── Working Hours ──
exports.WorkingHoursSchema = zod_1.z.object({
    day: zod_1.z.enum([
        'Monday', 'Tuesday', 'Wednesday', 'Thursday',
        'Friday', 'Saturday', 'Sunday',
    ]),
    opens: zod_1.z.string(), // "09:00"
    closes: zod_1.z.string(), // "18:00"
    isClosed: zod_1.z.boolean().default(false),
});
// ── Brand Colors ──
exports.BrandColorsSchema = zod_1.z.object({
    primary: zod_1.z.string(),
    secondary: zod_1.z.string(),
    accent: zod_1.z.string(),
    background: zod_1.z.string(),
    text: zod_1.z.string(),
});
// ── Contact Info ──
exports.ContactInfoSchema = zod_1.z.object({
    phone: zod_1.z.string(),
    whatsapp: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    address: zod_1.z.string(),
    coordinates: zod_1.z.object({
        lat: zod_1.z.number(),
        lng: zod_1.z.number(),
    }).optional(),
    workingHours: zod_1.z.array(exports.WorkingHoursSchema).default([]),
});
// ── Site Config ──
exports.SiteConfigSchema = zod_1.z.object({
    domain: zod_1.z.string(), // e.g., "ahmet-kasap.kepenk.site"
    customDomain: zod_1.z.string().optional(), // e.g., "ahmetkasap.com"
    locale: zod_1.z.literal('tr-TR').default('tr-TR'),
    timezone: zod_1.z.literal('Europe/Istanbul').default('Europe/Istanbul'),
    sectorId: zod_1.z.string(), // kasap, berber, eczane, etc.
    businessName: zod_1.z.string(),
    businessSlogan: zod_1.z.string().optional(),
    brandColors: exports.BrandColorsSchema,
    fonts: zod_1.z.object({
        heading: zod_1.z.string(),
        body: zod_1.z.string(),
    }),
    logo: component_1.MediaRefSchema.optional(),
    favicon: component_1.MediaRefSchema.optional(),
    socialLinks: zod_1.z.record(zod_1.z.string(), zod_1.z.string()).default({}),
    contactInfo: exports.ContactInfoSchema,
});
// ── SEO Defaults ──
exports.SiteSEOSchema = zod_1.z.object({
    titleTemplate: zod_1.z.string().default('{pageName} | {businessName}'),
    defaultDescription: zod_1.z.string().default(''),
    ogImage: component_1.MediaRefSchema.optional(),
    robots: zod_1.z.string().default('index, follow'),
    canonical: zod_1.z.string().default(''),
    structuredData: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).default({}),
});
// ── Redirect Rule ──
exports.RedirectRuleSchema = zod_1.z.object({
    from: zod_1.z.string(),
    to: zod_1.z.string(),
    type: zod_1.z.union([zod_1.z.literal(301), zod_1.z.literal(302)]),
    createdAt: zod_1.z.string(),
});
// ── Navigation Item (recursive) ──
exports.NavItemSchema = zod_1.z.lazy(() => zod_1.z.object({
    pageId: zod_1.z.string(),
    label: zod_1.z.string(),
    children: zod_1.z.array(exports.NavItemSchema).default([]),
    isVisible: zod_1.z.boolean().default(true),
    openInNewTab: zod_1.z.boolean().default(false),
    externalUrl: zod_1.z.string().optional(),
}));
// ── Site Manifest ──
exports.SiteManifestSchema = zod_1.z.object({
    manifestId: zod_1.z.string(),
    siteId: zod_1.z.string(),
    esnafId: zod_1.z.string(),
    version: zod_1.z.number().int().min(0),
    publishedVersion: zod_1.z.number().int().default(-1),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
    // Page references (content-hash pointers)
    pages: zod_1.z.array(page_1.PageRefSchema),
    masterPage: zod_1.z.string(), // content-hash of master page JSON
    // Site-level config
    siteConfig: exports.SiteConfigSchema,
    // SEO defaults
    seo: exports.SiteSEOSchema,
    // Redirect rules
    redirects: zod_1.z.array(exports.RedirectRuleSchema).default([]),
    // Navigation menu structure
    navigation: zod_1.z.array(exports.NavItemSchema).default([]),
});
//# sourceMappingURL=manifest.js.map