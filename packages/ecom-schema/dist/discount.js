"use strict";
/**
 * @kepenk/ecom-schema — Discount & Coupon Schemas
 * Stackable: kupon + otomatik indirim birlikte çalışır.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAutoDiscountSchema = exports.AutoDiscountSchema = exports.CreateCouponSchema = exports.CouponSchema = void 0;
const zod_1 = require("zod");
/* ═══════ Coupon (Müşteri kod girer) ═══════ */
exports.CouponSchema = zod_1.z.object({
    id: zod_1.z.string(),
    esnafId: zod_1.z.string(),
    code: zod_1.z.string().min(3).max(20).toUpperCase(),
    name: zod_1.z.string().min(1).max(60),
    discountType: zod_1.z.enum([
        'percentage_off',
        'fixed_amount_off',
        'free_shipping',
        'buy_x_get_y',
    ]),
    // Discount value
    value: zod_1.z.number().nonnegative(), // % or ₺ amount
    maxDiscountAmount: zod_1.z.number().nonnegative().optional(), // Cap for percentage
    // Buy X Get Y
    buyQuantity: zod_1.z.number().int().positive().optional(),
    getQuantity: zod_1.z.number().int().positive().optional(),
    getDiscountPercent: zod_1.z.number().min(0).max(100).optional(),
    // Scope
    scope: zod_1.z.enum(['all', 'categories', 'products', 'min_subtotal']).default('all'),
    scopeIds: zod_1.z.array(zod_1.z.string()).default([]), // Category or product IDs
    minSubtotal: zod_1.z.number().nonnegative().optional(),
    // Limits
    totalUsageLimit: zod_1.z.number().int().positive().optional(),
    perCustomerLimit: zod_1.z.number().int().positive().default(1),
    currentUsageCount: zod_1.z.number().int().nonnegative().default(0),
    // Schedule
    startsAt: zod_1.z.string(),
    endsAt: zod_1.z.string().optional(),
    status: zod_1.z.enum(['active', 'expired', 'disabled']).default('active'),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
});
exports.CreateCouponSchema = exports.CouponSchema.omit({
    id: true,
    currentUsageCount: true,
    createdAt: true,
    updatedAt: true,
});
/* ═══════ Automatic Discount (Kod gerekmez) ═══════ */
exports.AutoDiscountSchema = zod_1.z.object({
    id: zod_1.z.string(),
    esnafId: zod_1.z.string(),
    name: zod_1.z.string().min(1).max(60),
    discountType: zod_1.z.enum([
        'percentage_off',
        'fixed_amount_off',
        'quantity_pricing',
        'buy_x_get_y',
    ]),
    value: zod_1.z.number().nonnegative(),
    // Quantity pricing tiers
    tiers: zod_1.z.array(zod_1.z.object({
        minQuantity: zod_1.z.number().int().positive(),
        discountPercent: zod_1.z.number().min(0).max(100),
    })).optional(),
    // Buy X Get Y
    buyQuantity: zod_1.z.number().int().positive().optional(),
    getQuantity: zod_1.z.number().int().positive().optional(),
    getDiscountPercent: zod_1.z.number().min(0).max(100).optional(),
    // Scope
    scope: zod_1.z.enum(['all', 'categories', 'products']).default('all'),
    scopeIds: zod_1.z.array(zod_1.z.string()).default([]),
    // Schedule (Ramazan, Bayram, 11.11, Yılbaşı kampanyaları)
    startsAt: zod_1.z.string(),
    endsAt: zod_1.z.string().optional(),
    priority: zod_1.z.number().int().default(0), // Higher = applied first
    status: zod_1.z.enum(['active', 'scheduled', 'expired', 'disabled']).default('active'),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
});
exports.CreateAutoDiscountSchema = exports.AutoDiscountSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
//# sourceMappingURL=discount.js.map