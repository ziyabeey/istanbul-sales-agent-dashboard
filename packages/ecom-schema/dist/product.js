"use strict";
/**
 * @kepenk/ecom-schema — Product & Variant Schemas
 * Turkey-native: KDV dahil fiyat, universal variant model
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductSchema = exports.CreateProductSchema = exports.ProductSchema = exports.ProductAiMetaSchema = exports.ProductSEOSchema = exports.TaxConfigSchema = exports.CustomFieldSchema = exports.InfoSectionSchema = exports.ProductVariantSchema = exports.InventorySchema = exports.ProductModifierSchema = exports.ProductOptionSchema = exports.DigitalFileSchema = exports.DimensionsSchema = exports.ProductMediaSchema = void 0;
const zod_1 = require("zod");
/* ═══════ Media ═══════ */
exports.ProductMediaSchema = zod_1.z.object({
    id: zod_1.z.string(),
    type: zod_1.z.enum(['image', 'video']),
    url: zod_1.z.string().url(),
    thumbnailUrl: zod_1.z.string().url().optional(),
    alt: zod_1.z.string().max(200).default(''),
    width: zod_1.z.number().int().optional(),
    height: zod_1.z.number().int().optional(),
    sortOrder: zod_1.z.number().int().default(0),
});
/* ═══════ Dimensions ═══════ */
exports.DimensionsSchema = zod_1.z.object({
    length: zod_1.z.number().positive().optional(),
    width: zod_1.z.number().positive().optional(),
    height: zod_1.z.number().positive().optional(),
    unit: zod_1.z.enum(['cm', 'mm', 'm']).default('cm'),
});
/* ═══════ Digital File ═══════ */
exports.DigitalFileSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    url: zod_1.z.string(),
    sizeBytes: zod_1.z.number().int(),
    mimeType: zod_1.z.string(),
});
/* ═══════ Product Option ═══════ */
exports.ProductOptionSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string().min(1).max(40), // "Beden", "Renk", "Boyut"
    type: zod_1.z.enum(['color', 'size', 'custom']).default('custom'),
    choices: zod_1.z.array(zod_1.z.object({
        value: zod_1.z.string().min(1).max(40),
        description: zod_1.z.string().max(100).optional(),
        colorHex: zod_1.z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
    })).min(1).max(30),
    sortOrder: zod_1.z.number().int().default(0),
});
/* ═══════ Product Modifier ═══════ */
exports.ProductModifierSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string().min(1).max(40),
    type: zod_1.z.enum(['text', 'select', 'checkbox']),
    required: zod_1.z.boolean().default(false),
    options: zod_1.z.array(zod_1.z.object({
        value: zod_1.z.string(),
        priceAdjustment: zod_1.z.number().default(0),
    })).optional(),
    maxLength: zod_1.z.number().int().optional(),
});
/* ═══════ Product Variant (Universal — Every Product ≥1 Variant) ═══════ */
exports.InventorySchema = zod_1.z.object({
    trackQuantity: zod_1.z.boolean().default(false),
    quantity: zod_1.z.number().int().default(0),
    allowBackorder: zod_1.z.boolean().default(false),
    lowStockThreshold: zod_1.z.number().int().default(5),
});
exports.ProductVariantSchema = zod_1.z.object({
    id: zod_1.z.string(),
    productId: zod_1.z.string(),
    choices: zod_1.z.record(zod_1.z.string(), zod_1.z.string()).default({}), // {} = default variant
    price: zod_1.z.number().nonnegative(), // ₺, KDV dahil
    compareAtPrice: zod_1.z.number().nonnegative().optional(), // Eski fiyat
    costPrice: zod_1.z.number().nonnegative().optional(), // Maliyet
    inventory: exports.InventorySchema,
    sku: zod_1.z.string().max(50).optional(),
    barcode: zod_1.z.string().max(50).optional(),
    weight: zod_1.z.number().nonnegative().optional(), // gram
    mediaId: zod_1.z.string().optional(),
    digitalFileId: zod_1.z.string().optional(),
    visible: zod_1.z.boolean().default(true),
});
/* ═══════ Info Section ═══════ */
exports.InfoSectionSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(60),
    content: zod_1.z.string().max(2000),
});
/* ═══════ Custom Field ═══════ */
exports.CustomFieldSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(40),
    required: zod_1.z.boolean().default(false),
    type: zod_1.z.enum(['text', 'number', 'select']),
    options: zod_1.z.array(zod_1.z.string()).optional(), // for select type
});
/* ═══════ Tax Config ═══════ */
exports.TaxConfigSchema = zod_1.z.object({
    rate: zod_1.z.union([zod_1.z.literal(1), zod_1.z.literal(10), zod_1.z.literal(20)]).default(20),
    includedInPrice: zod_1.z.literal(true).default(true), // Türkiye: always true
});
/* ═══════ Product SEO ═══════ */
exports.ProductSEOSchema = zod_1.z.object({
    title: zod_1.z.string().max(60).optional(),
    description: zod_1.z.string().max(160).optional(),
    slug: zod_1.z.string().min(1),
});
/* ═══════ AI Meta ═══════ */
exports.ProductAiMetaSchema = zod_1.z.object({
    generatedDescription: zod_1.z.boolean().default(false),
    suggestedPrice: zod_1.z.number().nonnegative().optional(),
    seoScore: zod_1.z.number().int().min(0).max(100).optional(),
});
/* ═══════ Product ═══════ */
exports.ProductSchema = zod_1.z.object({
    id: zod_1.z.string(),
    esnafId: zod_1.z.string(),
    handle: zod_1.z.string().min(1).max(80),
    numericId: zod_1.z.number().int().nonnegative(),
    revision: zod_1.z.number().int().default(1),
    name: zod_1.z.string().min(1).max(120),
    description: zod_1.z.string().max(5000).default(''),
    shortDescription: zod_1.z.string().max(300).optional(),
    productType: zod_1.z.enum(['physical', 'digital', 'service']),
    sectorId: zod_1.z.string(),
    priceRange: zod_1.z.object({
        min: zod_1.z.number().nonnegative(),
        max: zod_1.z.number().nonnegative(),
    }),
    currency: zod_1.z.literal('TRY').default('TRY'),
    taxConfig: exports.TaxConfigSchema,
    media: zod_1.z.array(exports.ProductMediaSchema).max(15).default([]),
    mainMediaIndex: zod_1.z.number().int().default(0),
    options: zod_1.z.array(exports.ProductOptionSchema).max(6).default([]),
    variants: zod_1.z.array(exports.ProductVariantSchema).min(1).max(300),
    modifiers: zod_1.z.array(exports.ProductModifierSchema).max(5).default([]),
    categoryIds: zod_1.z.array(zod_1.z.string()).default([]),
    mainCategoryId: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).default([]),
    ribbon: zod_1.z.string().max(20).optional(),
    seo: exports.ProductSEOSchema,
    // Type-specific fields
    physical: zod_1.z.object({
        weight: zod_1.z.number().nonnegative().optional(),
        dimensions: exports.DimensionsSchema.optional(),
        sku: zod_1.z.string().max(50).optional(),
        barcode: zod_1.z.string().max(50).optional(),
    }).optional(),
    digital: zod_1.z.object({
        files: zod_1.z.array(exports.DigitalFileSchema),
        downloadExpiry: zod_1.z.number().int().default(72), // hours
        maxDownloads: zod_1.z.number().int().default(3),
    }).optional(),
    service: zod_1.z.object({
        duration: zod_1.z.number().int().positive(), // minutes
        bookingType: zod_1.z.enum(['appointment', 'class']),
        location: zod_1.z.enum(['business', 'customer', 'online']),
    }).optional(),
    infoSections: zod_1.z.array(exports.InfoSectionSchema).default([]),
    customFields: zod_1.z.array(exports.CustomFieldSchema).default([]),
    status: zod_1.z.enum(['active', 'draft', 'archived']).default('draft'),
    visibility: zod_1.z.enum(['visible', 'hidden']).default('visible'),
    aiMeta: exports.ProductAiMetaSchema.optional(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
});
/* ═══════ Create/Update DTOs ═══════ */
exports.CreateProductSchema = exports.ProductSchema.omit({
    id: true,
    numericId: true,
    revision: true,
    priceRange: true,
    createdAt: true,
    updatedAt: true,
});
exports.UpdateProductSchema = exports.CreateProductSchema.partial();
//# sourceMappingURL=product.js.map