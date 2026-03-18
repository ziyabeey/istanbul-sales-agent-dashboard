"use strict";
/**
 * @kepenk/ecom-schema — Order Schema
 * Full lifecycle: pending → confirmed → processing → shipped → delivered
 * e-Fatura/e-Arşiv support.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = exports.OrderPaymentSchema = exports.OrderShippingSchema = exports.OrderLineItemSchema = exports.InvoiceSchema = exports.InternalNoteSchema = exports.OrderActivitySchema = exports.ShippingEventSchema = void 0;
const zod_1 = require("zod");
const cart_1 = require("./cart");
const checkout_1 = require("./checkout");
/* ═══════ Shipping Event ═══════ */
exports.ShippingEventSchema = zod_1.z.object({
    status: zod_1.z.string(),
    description: zod_1.z.string(),
    location: zod_1.z.string().optional(),
    timestamp: zod_1.z.string(),
});
/* ═══════ Order Activity ═══════ */
exports.OrderActivitySchema = zod_1.z.object({
    id: zod_1.z.string(),
    type: zod_1.z.enum([
        'created', 'confirmed', 'processing', 'shipped', 'delivered',
        'cancelled', 'refunded', 'note_added', 'status_changed',
        'payment_received', 'invoice_issued', 'tracking_updated',
    ]),
    description: zod_1.z.string(),
    createdBy: zod_1.z.enum(['system', 'esnaf', 'customer']),
    createdAt: zod_1.z.string(),
    metadata: zod_1.z.record(zod_1.z.string(), zod_1.z.string()).optional(),
});
/* ═══════ Internal Note ═══════ */
exports.InternalNoteSchema = zod_1.z.object({
    text: zod_1.z.string().max(500),
    createdBy: zod_1.z.string(),
    createdAt: zod_1.z.string(),
});
/* ═══════ Invoice (e-Fatura / e-Arşiv) ═══════ */
exports.InvoiceSchema = zod_1.z.object({
    type: zod_1.z.enum(['individual', 'corporate']),
    documentType: zod_1.z.enum(['e_fatura', 'e_arsiv']).default('e_arsiv'),
    number: zod_1.z.string().optional(),
    status: zod_1.z.enum(['pending', 'issued', 'cancelled']).default('pending'),
    pdfUrl: zod_1.z.string().url().optional(),
    provider: zod_1.z.string().optional(), // parasut, elogo, edm, luca
    issuedAt: zod_1.z.string().optional(),
});
/* ═══════ Order Line Item ═══════ */
exports.OrderLineItemSchema = zod_1.z.object({
    id: zod_1.z.string(),
    productId: zod_1.z.string(),
    variantId: zod_1.z.string(),
    quantity: zod_1.z.number().int().positive(),
    productName: zod_1.z.string(),
    variantChoices: zod_1.z.record(zod_1.z.string(), zod_1.z.string()),
    price: zod_1.z.number().nonnegative(),
    lineTotal: zod_1.z.number().nonnegative(),
    imageUrl: zod_1.z.string().optional(),
    sku: zod_1.z.string().optional(),
    weight: zod_1.z.number().nonnegative().optional(),
    taxRate: zod_1.z.number().int().default(20),
    fulfillmentStatus: zod_1.z.enum(['unfulfilled', 'fulfilled', 'returned']).default('unfulfilled'),
});
/* ═══════ Order Shipping ═══════ */
exports.OrderShippingSchema = zod_1.z.object({
    carrierId: zod_1.z.string(),
    carrierName: zod_1.z.string(),
    trackingNumber: zod_1.z.string().optional(),
    trackingUrl: zod_1.z.string().url().optional(),
    price: zod_1.z.number().nonnegative(),
    events: zod_1.z.array(exports.ShippingEventSchema).default([]),
});
/* ═══════ Order Payment ═══════ */
exports.OrderPaymentSchema = zod_1.z.object({
    method: zod_1.z.enum(['credit_card', 'bank_transfer', 'cash_on_delivery']),
    provider: zod_1.z.string(), // iyzico, paytr
    transactionId: zod_1.z.string().optional(),
    installmentCount: zod_1.z.number().int().min(1).default(1),
    paidAmount: zod_1.z.number().nonnegative(),
    refundedAmount: zod_1.z.number().nonnegative().default(0),
});
/* ═══════ Order ═══════ */
exports.OrderSchema = zod_1.z.object({
    id: zod_1.z.string(),
    orderNumber: zod_1.z.string(), // "KPN-2026-00142"
    esnafId: zod_1.z.string(),
    purchaseFlowId: zod_1.z.string(),
    status: zod_1.z.enum([
        'pending', 'confirmed', 'processing',
        'shipped', 'delivered', 'cancelled', 'returned',
    ]).default('pending'),
    paymentStatus: zod_1.z.enum([
        'pending', 'paid', 'partially_paid',
        'refunded', 'partially_refunded', 'failed',
    ]).default('pending'),
    fulfillmentStatus: zod_1.z.enum([
        'unfulfilled', 'partially_fulfilled', 'fulfilled',
    ]).default('unfulfilled'),
    buyer: checkout_1.BuyerInfoSchema,
    invoice: exports.InvoiceSchema,
    lineItems: zod_1.z.array(exports.OrderLineItemSchema),
    shippingAddress: checkout_1.AddressSchema.optional(),
    billingAddress: checkout_1.AddressSchema,
    shipping: exports.OrderShippingSchema,
    payment: exports.OrderPaymentSchema,
    priceSummary: cart_1.PriceSummarySchema,
    appliedDiscounts: zod_1.z.array(cart_1.AppliedDiscountSchema).default([]),
    buyerNote: zod_1.z.string().max(500).optional(),
    internalNotes: zod_1.z.array(exports.InternalNoteSchema).default([]),
    activities: zod_1.z.array(exports.OrderActivitySchema).default([]),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
});
//# sourceMappingURL=order.js.map