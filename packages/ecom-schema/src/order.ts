/**
 * @kepenk/ecom-schema — Order Schema
 * Full lifecycle: pending → confirmed → processing → shipped → delivered
 * e-Fatura/e-Arşiv support.
 */

import { z } from 'zod'
import { PriceSummarySchema, AppliedDiscountSchema } from './cart'
import { BuyerInfoSchema, AddressSchema } from './checkout'

/* ═══════ Shipping Event ═══════ */

export const ShippingEventSchema = z.object({
  status: z.string(),
  description: z.string(),
  location: z.string().optional(),
  timestamp: z.string(),
})
export type ShippingEvent = z.infer<typeof ShippingEventSchema>

/* ═══════ Order Activity ═══════ */

export const OrderActivitySchema = z.object({
  id: z.string(),
  type: z.enum([
    'created', 'confirmed', 'processing', 'shipped', 'delivered',
    'cancelled', 'refunded', 'note_added', 'status_changed',
    'payment_received', 'invoice_issued', 'tracking_updated',
  ]),
  description: z.string(),
  createdBy: z.enum(['system', 'esnaf', 'customer']),
  createdAt: z.string(),
  metadata: z.record(z.string(), z.string()).optional(),
})
export type OrderActivity = z.infer<typeof OrderActivitySchema>

/* ═══════ Internal Note ═══════ */

export const InternalNoteSchema = z.object({
  text: z.string().max(500),
  createdBy: z.string(),
  createdAt: z.string(),
})
export type InternalNote = z.infer<typeof InternalNoteSchema>

/* ═══════ Invoice (e-Fatura / e-Arşiv) ═══════ */

export const InvoiceSchema = z.object({
  type: z.enum(['individual', 'corporate']),
  documentType: z.enum(['e_fatura', 'e_arsiv']).default('e_arsiv'),
  number: z.string().optional(),
  status: z.enum(['pending', 'issued', 'cancelled']).default('pending'),
  pdfUrl: z.string().url().optional(),
  provider: z.string().optional(),         // parasut, elogo, edm, luca
  issuedAt: z.string().optional(),
})
export type Invoice = z.infer<typeof InvoiceSchema>

/* ═══════ Order Line Item ═══════ */

export const OrderLineItemSchema = z.object({
  id: z.string(),
  productId: z.string(),
  variantId: z.string(),
  quantity: z.number().int().positive(),
  productName: z.string(),
  variantChoices: z.record(z.string(), z.string()),
  price: z.number().nonnegative(),
  lineTotal: z.number().nonnegative(),
  imageUrl: z.string().optional(),
  sku: z.string().optional(),
  weight: z.number().nonnegative().optional(),
  taxRate: z.number().int().default(20),
  fulfillmentStatus: z.enum(['unfulfilled', 'fulfilled', 'returned']).default('unfulfilled'),
})
export type OrderLineItem = z.infer<typeof OrderLineItemSchema>

/* ═══════ Order Shipping ═══════ */

export const OrderShippingSchema = z.object({
  carrierId: z.string(),
  carrierName: z.string(),
  trackingNumber: z.string().optional(),
  trackingUrl: z.string().url().optional(),
  price: z.number().nonnegative(),
  events: z.array(ShippingEventSchema).default([]),
})
export type OrderShipping = z.infer<typeof OrderShippingSchema>

/* ═══════ Order Payment ═══════ */

export const OrderPaymentSchema = z.object({
  method: z.enum(['credit_card', 'bank_transfer', 'cash_on_delivery']),
  provider: z.string(),                              // iyzico, paytr
  transactionId: z.string().optional(),
  installmentCount: z.number().int().min(1).default(1),
  paidAmount: z.number().nonnegative(),
  refundedAmount: z.number().nonnegative().default(0),
})
export type OrderPayment = z.infer<typeof OrderPaymentSchema>

/* ═══════ Order ═══════ */

export const OrderSchema = z.object({
  id: z.string(),
  orderNumber: z.string(),                            // "KPN-2026-00142"
  esnafId: z.string(),
  purchaseFlowId: z.string(),

  status: z.enum([
    'pending', 'confirmed', 'processing',
    'shipped', 'delivered', 'cancelled', 'returned',
  ]).default('pending'),

  paymentStatus: z.enum([
    'pending', 'paid', 'partially_paid',
    'refunded', 'partially_refunded', 'failed',
  ]).default('pending'),

  fulfillmentStatus: z.enum([
    'unfulfilled', 'partially_fulfilled', 'fulfilled',
  ]).default('unfulfilled'),

  buyer: BuyerInfoSchema,
  invoice: InvoiceSchema,

  lineItems: z.array(OrderLineItemSchema),
  shippingAddress: AddressSchema.optional(),
  billingAddress: AddressSchema,

  shipping: OrderShippingSchema,
  payment: OrderPaymentSchema,
  priceSummary: PriceSummarySchema,
  appliedDiscounts: z.array(AppliedDiscountSchema).default([]),

  buyerNote: z.string().max(500).optional(),
  internalNotes: z.array(InternalNoteSchema).default([]),
  activities: z.array(OrderActivitySchema).default([]),

  createdAt: z.string(),
  updatedAt: z.string(),
})
export type Order = z.infer<typeof OrderSchema>
