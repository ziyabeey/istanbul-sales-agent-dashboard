"use strict";
/**
 * @kepenk/ecom-schema — Cart Schema
 * Server-side cart with purchaseFlowId correlation, product snapshot pattern.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddToCartSchema = exports.CartSchema = exports.CartBuyerSchema = exports.PriceSummarySchema = exports.AppliedDiscountSchema = exports.CartLineItemSchema = exports.ModifierSelectionSchema = exports.CartLineItemSnapshotSchema = void 0;
const zod_1 = require("zod");
/* ═══════ Cart Line Item ═══════ */
exports.CartLineItemSnapshotSchema = zod_1.z.object({
    productName: zod_1.z.string(),
    variantChoices: zod_1.z.record(zod_1.z.string(), zod_1.z.string()).default({}),
    price: zod_1.z.number().nonnegative(),
    compareAtPrice: zod_1.z.number().nonnegative().optional(),
    sku: zod_1.z.string().optional(),
    weight: zod_1.z.number().nonnegative().optional(),
    imageUrl: zod_1.z.string().optional(),
    productType: zod_1.z.enum(['physical', 'digital', 'service']),
});
exports.ModifierSelectionSchema = zod_1.z.object({
    modifierId: zod_1.z.string(),
    value: zod_1.z.string(),
    priceAdjustment: zod_1.z.number().default(0),
});
exports.CartLineItemSchema = zod_1.z.object({
    id: zod_1.z.string(),
    productId: zod_1.z.string(),
    variantId: zod_1.z.string(),
    quantity: zod_1.z.number().int().positive().max(99),
    snapshot: exports.CartLineItemSnapshotSchema,
    modifierSelections: zod_1.z.array(exports.ModifierSelectionSchema).optional(),
    customFieldValues: zod_1.z.record(zod_1.z.string(), zod_1.z.string()).optional(),
    lineTotal: zod_1.z.number().nonnegative(),
});
/* ═══════ Applied Discount ═══════ */
exports.AppliedDiscountSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    type: zod_1.z.enum(['percentage', 'fixed', 'free_shipping']),
    value: zod_1.z.number().nonnegative(),
    discountAmount: zod_1.z.number().nonnegative(),
    source: zod_1.z.enum(['coupon', 'automatic']),
    couponCode: zod_1.z.string().optional(),
});
/* ═══════ Price Summary ═══════ */
exports.PriceSummarySchema = zod_1.z.object({
    subtotal: zod_1.z.number().nonnegative(),
    shipping: zod_1.z.number().nonnegative().default(0),
    discount: zod_1.z.number().nonnegative().default(0),
    additionalFees: zod_1.z.number().nonnegative().default(0),
    tax: zod_1.z.number().nonnegative().default(0),
    total: zod_1.z.number().nonnegative(),
    installmentTotal: zod_1.z.number().nonnegative().optional(),
});
/* ═══════ Cart ═══════ */
exports.CartBuyerSchema = zod_1.z.object({
    type: zod_1.z.enum(['visitor', 'member']),
    visitorId: zod_1.z.string().optional(),
    memberId: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
});
exports.CartSchema = zod_1.z.object({
    id: zod_1.z.string(),
    esnafId: zod_1.z.string(),
    purchaseFlowId: zod_1.z.string(),
    revision: zod_1.z.number().int().default(1),
    buyer: exports.CartBuyerSchema,
    lineItems: zod_1.z.array(exports.CartLineItemSchema).max(50).default([]),
    appliedDiscounts: zod_1.z.array(exports.AppliedDiscountSchema).default([]),
    couponCode: zod_1.z.string().optional(),
    buyerNote: zod_1.z.string().max(500).optional(),
    priceSummary: exports.PriceSummarySchema,
    currency: zod_1.z.literal('TRY').default('TRY'),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
    lastActivityAt: zod_1.z.string(),
    abandonedNotificationSent: zod_1.z.boolean().default(false),
});
/* ═══════ Add to Cart DTO ═══════ */
exports.AddToCartSchema = zod_1.z.object({
    productId: zod_1.z.string(),
    variantId: zod_1.z.string(),
    quantity: zod_1.z.number().int().positive().max(99).default(1),
    modifierSelections: zod_1.z.array(exports.ModifierSelectionSchema).optional(),
    customFieldValues: zod_1.z.record(zod_1.z.string(), zod_1.z.string()).optional(),
});
//# sourceMappingURL=cart.js.map