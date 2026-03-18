/**
 * @kepenk/ecom-schema — Product & Variant Schemas
 * Turkey-native: KDV dahil fiyat, universal variant model
 */

import { z } from 'zod'

/* ═══════ Media ═══════ */

export const ProductMediaSchema = z.object({
  id: z.string(),
  type: z.enum(['image', 'video']),
  url: z.string().url(),
  thumbnailUrl: z.string().url().optional(),
  alt: z.string().max(200).default(''),
  width: z.number().int().optional(),
  height: z.number().int().optional(),
  sortOrder: z.number().int().default(0),
})
export type ProductMedia = z.infer<typeof ProductMediaSchema>

/* ═══════ Dimensions ═══════ */

export const DimensionsSchema = z.object({
  length: z.number().positive().optional(),
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
  unit: z.enum(['cm', 'mm', 'm']).default('cm'),
})
export type Dimensions = z.infer<typeof DimensionsSchema>

/* ═══════ Digital File ═══════ */

export const DigitalFileSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  sizeBytes: z.number().int(),
  mimeType: z.string(),
})
export type DigitalFile = z.infer<typeof DigitalFileSchema>

/* ═══════ Product Option ═══════ */

export const ProductOptionSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(40),      // "Beden", "Renk", "Boyut"
  type: z.enum(['color', 'size', 'custom']).default('custom'),
  choices: z.array(z.object({
    value: z.string().min(1).max(40),
    description: z.string().max(100).optional(),
    colorHex: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  })).min(1).max(30),
  sortOrder: z.number().int().default(0),
})
export type ProductOption = z.infer<typeof ProductOptionSchema>

/* ═══════ Product Modifier ═══════ */

export const ProductModifierSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(40),
  type: z.enum(['text', 'select', 'checkbox']),
  required: z.boolean().default(false),
  options: z.array(z.object({
    value: z.string(),
    priceAdjustment: z.number().default(0),
  })).optional(),
  maxLength: z.number().int().optional(),
})
export type ProductModifier = z.infer<typeof ProductModifierSchema>

/* ═══════ Product Variant (Universal — Every Product ≥1 Variant) ═══════ */

export const InventorySchema = z.object({
  trackQuantity: z.boolean().default(false),
  quantity: z.number().int().default(0),
  allowBackorder: z.boolean().default(false),
  lowStockThreshold: z.number().int().default(5),
})
export type Inventory = z.infer<typeof InventorySchema>

export const ProductVariantSchema = z.object({
  id: z.string(),
  productId: z.string(),
  choices: z.record(z.string(), z.string()).default({}), // {} = default variant
  price: z.number().nonnegative(),              // ₺, KDV dahil
  compareAtPrice: z.number().nonnegative().optional(),  // Eski fiyat
  costPrice: z.number().nonnegative().optional(),       // Maliyet
  inventory: InventorySchema,
  sku: z.string().max(50).optional(),
  barcode: z.string().max(50).optional(),
  weight: z.number().nonnegative().optional(),  // gram
  mediaId: z.string().optional(),
  digitalFileId: z.string().optional(),
  visible: z.boolean().default(true),
})
export type ProductVariant = z.infer<typeof ProductVariantSchema>

/* ═══════ Info Section ═══════ */

export const InfoSectionSchema = z.object({
  title: z.string().min(1).max(60),
  content: z.string().max(2000),
})
export type InfoSection = z.infer<typeof InfoSectionSchema>

/* ═══════ Custom Field ═══════ */

export const CustomFieldSchema = z.object({
  name: z.string().min(1).max(40),
  required: z.boolean().default(false),
  type: z.enum(['text', 'number', 'select']),
  options: z.array(z.string()).optional(), // for select type
})
export type CustomField = z.infer<typeof CustomFieldSchema>

/* ═══════ Tax Config ═══════ */

export const TaxConfigSchema = z.object({
  rate: z.union([z.literal(1), z.literal(10), z.literal(20)]).default(20),
  includedInPrice: z.literal(true).default(true), // Türkiye: always true
})
export type TaxConfig = z.infer<typeof TaxConfigSchema>

/* ═══════ Product SEO ═══════ */

export const ProductSEOSchema = z.object({
  title: z.string().max(60).optional(),
  description: z.string().max(160).optional(),
  slug: z.string().min(1),
})
export type ProductSEO = z.infer<typeof ProductSEOSchema>

/* ═══════ AI Meta ═══════ */

export const ProductAiMetaSchema = z.object({
  generatedDescription: z.boolean().default(false),
  suggestedPrice: z.number().nonnegative().optional(),
  seoScore: z.number().int().min(0).max(100).optional(),
})
export type ProductAiMeta = z.infer<typeof ProductAiMetaSchema>

/* ═══════ Product ═══════ */

export const ProductSchema = z.object({
  id: z.string(),
  esnafId: z.string(),
  handle: z.string().min(1).max(80),
  numericId: z.number().int().nonnegative(),
  revision: z.number().int().default(1),

  name: z.string().min(1).max(120),
  description: z.string().max(5000).default(''),
  shortDescription: z.string().max(300).optional(),

  productType: z.enum(['physical', 'digital', 'service']),
  sectorId: z.string(),

  priceRange: z.object({
    min: z.number().nonnegative(),
    max: z.number().nonnegative(),
  }),
  currency: z.literal('TRY').default('TRY'),

  taxConfig: TaxConfigSchema,

  media: z.array(ProductMediaSchema).max(15).default([]),
  mainMediaIndex: z.number().int().default(0),

  options: z.array(ProductOptionSchema).max(6).default([]),
  variants: z.array(ProductVariantSchema).min(1).max(300),
  modifiers: z.array(ProductModifierSchema).max(5).default([]),

  categoryIds: z.array(z.string()).default([]),
  mainCategoryId: z.string().optional(),
  tags: z.array(z.string()).default([]),
  ribbon: z.string().max(20).optional(),

  seo: ProductSEOSchema,

  // Type-specific fields
  physical: z.object({
    weight: z.number().nonnegative().optional(),
    dimensions: DimensionsSchema.optional(),
    sku: z.string().max(50).optional(),
    barcode: z.string().max(50).optional(),
  }).optional(),

  digital: z.object({
    files: z.array(DigitalFileSchema),
    downloadExpiry: z.number().int().default(72),     // hours
    maxDownloads: z.number().int().default(3),
  }).optional(),

  service: z.object({
    duration: z.number().int().positive(),              // minutes
    bookingType: z.enum(['appointment', 'class']),
    location: z.enum(['business', 'customer', 'online']),
  }).optional(),

  infoSections: z.array(InfoSectionSchema).default([]),
  customFields: z.array(CustomFieldSchema).default([]),

  status: z.enum(['active', 'draft', 'archived']).default('draft'),
  visibility: z.enum(['visible', 'hidden']).default('visible'),

  aiMeta: ProductAiMetaSchema.optional(),

  createdAt: z.string(),
  updatedAt: z.string(),
})
export type Product = z.infer<typeof ProductSchema>

/* ═══════ Create/Update DTOs ═══════ */

export const CreateProductSchema = ProductSchema.omit({
  id: true,
  numericId: true,
  revision: true,
  priceRange: true,
  createdAt: true,
  updatedAt: true,
})
export type CreateProduct = z.infer<typeof CreateProductSchema>

export const UpdateProductSchema = CreateProductSchema.partial()
export type UpdateProduct = z.infer<typeof UpdateProductSchema>
