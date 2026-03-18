/**
 * @kepenk/ecom-schema — Discount & Coupon Schemas
 * Stackable: kupon + otomatik indirim birlikte çalışır.
 */

import { z } from 'zod'

/* ═══════ Coupon (Müşteri kod girer) ═══════ */

export const CouponSchema = z.object({
  id: z.string(),
  esnafId: z.string(),
  code: z.string().min(3).max(20).toUpperCase(),
  name: z.string().min(1).max(60),

  discountType: z.enum([
    'percentage_off',
    'fixed_amount_off',
    'free_shipping',
    'buy_x_get_y',
  ]),

  // Discount value
  value: z.number().nonnegative(),                // % or ₺ amount
  maxDiscountAmount: z.number().nonnegative().optional(), // Cap for percentage

  // Buy X Get Y
  buyQuantity: z.number().int().positive().optional(),
  getQuantity: z.number().int().positive().optional(),
  getDiscountPercent: z.number().min(0).max(100).optional(),

  // Scope
  scope: z.enum(['all', 'categories', 'products', 'min_subtotal']).default('all'),
  scopeIds: z.array(z.string()).default([]),       // Category or product IDs
  minSubtotal: z.number().nonnegative().optional(),

  // Limits
  totalUsageLimit: z.number().int().positive().optional(),
  perCustomerLimit: z.number().int().positive().default(1),
  currentUsageCount: z.number().int().nonnegative().default(0),

  // Schedule
  startsAt: z.string(),
  endsAt: z.string().optional(),

  status: z.enum(['active', 'expired', 'disabled']).default('active'),

  createdAt: z.string(),
  updatedAt: z.string(),
})
export type Coupon = z.infer<typeof CouponSchema>

export const CreateCouponSchema = CouponSchema.omit({
  id: true,
  currentUsageCount: true,
  createdAt: true,
  updatedAt: true,
})
export type CreateCoupon = z.infer<typeof CreateCouponSchema>

/* ═══════ Automatic Discount (Kod gerekmez) ═══════ */

export const AutoDiscountSchema = z.object({
  id: z.string(),
  esnafId: z.string(),
  name: z.string().min(1).max(60),

  discountType: z.enum([
    'percentage_off',
    'fixed_amount_off',
    'quantity_pricing',
    'buy_x_get_y',
  ]),

  value: z.number().nonnegative(),

  // Quantity pricing tiers
  tiers: z.array(z.object({
    minQuantity: z.number().int().positive(),
    discountPercent: z.number().min(0).max(100),
  })).optional(),

  // Buy X Get Y
  buyQuantity: z.number().int().positive().optional(),
  getQuantity: z.number().int().positive().optional(),
  getDiscountPercent: z.number().min(0).max(100).optional(),

  // Scope
  scope: z.enum(['all', 'categories', 'products']).default('all'),
  scopeIds: z.array(z.string()).default([]),

  // Schedule (Ramazan, Bayram, 11.11, Yılbaşı kampanyaları)
  startsAt: z.string(),
  endsAt: z.string().optional(),

  priority: z.number().int().default(0),          // Higher = applied first
  status: z.enum(['active', 'scheduled', 'expired', 'disabled']).default('active'),

  createdAt: z.string(),
  updatedAt: z.string(),
})
export type AutoDiscount = z.infer<typeof AutoDiscountSchema>

export const CreateAutoDiscountSchema = AutoDiscountSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
export type CreateAutoDiscount = z.infer<typeof CreateAutoDiscountSchema>
