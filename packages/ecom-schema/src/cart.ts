/**
 * @kepenk/ecom-schema — Cart Schema
 * Server-side cart with purchaseFlowId correlation, product snapshot pattern.
 */

import { z } from 'zod'

/* ═══════ Cart Line Item ═══════ */

export const CartLineItemSnapshotSchema = z.object({
  productName: z.string(),
  variantChoices: z.record(z.string(), z.string()).default({}),
  price: z.number().nonnegative(),
  compareAtPrice: z.number().nonnegative().optional(),
  sku: z.string().optional(),
  weight: z.number().nonnegative().optional(),
  imageUrl: z.string().optional(),
  productType: z.enum(['physical', 'digital', 'service']),
})
export type CartLineItemSnapshot = z.infer<typeof CartLineItemSnapshotSchema>

export const ModifierSelectionSchema = z.object({
  modifierId: z.string(),
  value: z.string(),
  priceAdjustment: z.number().default(0),
})
export type ModifierSelection = z.infer<typeof ModifierSelectionSchema>

export const CartLineItemSchema = z.object({
  id: z.string(),
  productId: z.string(),
  variantId: z.string(),
  quantity: z.number().int().positive().max(99),
  snapshot: CartLineItemSnapshotSchema,
  modifierSelections: z.array(ModifierSelectionSchema).optional(),
  customFieldValues: z.record(z.string(), z.string()).optional(),
  lineTotal: z.number().nonnegative(),
})
export type CartLineItem = z.infer<typeof CartLineItemSchema>

/* ═══════ Applied Discount ═══════ */

export const AppliedDiscountSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['percentage', 'fixed', 'free_shipping']),
  value: z.number().nonnegative(),
  discountAmount: z.number().nonnegative(),
  source: z.enum(['coupon', 'automatic']),
  couponCode: z.string().optional(),
})
export type AppliedDiscount = z.infer<typeof AppliedDiscountSchema>

/* ═══════ Price Summary ═══════ */

export const PriceSummarySchema = z.object({
  subtotal: z.number().nonnegative(),
  shipping: z.number().nonnegative().default(0),
  discount: z.number().nonnegative().default(0),
  additionalFees: z.number().nonnegative().default(0),
  tax: z.number().nonnegative().default(0),
  total: z.number().nonnegative(),
  installmentTotal: z.number().nonnegative().optional(),
})
export type PriceSummary = z.infer<typeof PriceSummarySchema>

/* ═══════ Cart ═══════ */

export const CartBuyerSchema = z.object({
  type: z.enum(['visitor', 'member']),
  visitorId: z.string().optional(),
  memberId: z.string().optional(),
  email: z.string().email().optional(),
})
export type CartBuyer = z.infer<typeof CartBuyerSchema>

export const CartSchema = z.object({
  id: z.string(),
  esnafId: z.string(),
  purchaseFlowId: z.string(),
  revision: z.number().int().default(1),
  buyer: CartBuyerSchema,
  lineItems: z.array(CartLineItemSchema).max(50).default([]),
  appliedDiscounts: z.array(AppliedDiscountSchema).default([]),
  couponCode: z.string().optional(),
  buyerNote: z.string().max(500).optional(),
  priceSummary: PriceSummarySchema,
  currency: z.literal('TRY').default('TRY'),
  createdAt: z.string(),
  updatedAt: z.string(),
  lastActivityAt: z.string(),
  abandonedNotificationSent: z.boolean().default(false),
})
export type Cart = z.infer<typeof CartSchema>

/* ═══════ Add to Cart DTO ═══════ */

export const AddToCartSchema = z.object({
  productId: z.string(),
  variantId: z.string(),
  quantity: z.number().int().positive().max(99).default(1),
  modifierSelections: z.array(ModifierSelectionSchema).optional(),
  customFieldValues: z.record(z.string(), z.string()).optional(),
})
export type AddToCart = z.infer<typeof AddToCartSchema>
