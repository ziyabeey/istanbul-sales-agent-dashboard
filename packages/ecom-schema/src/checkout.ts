/**
 * @kepenk/ecom-schema — Checkout Schema
 * Turkey-native: taksit, 81 il, TC Kimlik / Vergi No, e-Fatura fields.
 */

import { z } from 'zod'
import { PriceSummarySchema, AppliedDiscountSchema } from './cart'

/* ═══════ Address ═══════ */

export const AddressSchema = z.object({
  fullName: z.string().min(2).max(80),
  addressLine1: z.string().min(5).max(200),
  addressLine2: z.string().max(200).optional(),
  district: z.string().min(1).max(60),          // İlçe
  city: z.string().min(1).max(40),              // İl (81 il)
  postalCode: z.string().regex(/^\d{5}$/),
  country: z.literal('TR').default('TR'),
  phone: z.string().min(10).max(15),
  notes: z.string().max(200).optional(),
})
export type Address = z.infer<typeof AddressSchema>

/* ═══════ Buyer Info ═══════ */

export const BuyerInfoSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).max(40),
  lastName: z.string().min(1).max(40),
  phone: z.string().min(10).max(15),             // +90 5XX XXX XXXX
  tcKimlik: z.string().length(11).optional(),     // Bireysel fatura
  taxId: z.string().length(10).optional(),        // Kurumsal fatura (VKN)
  taxOffice: z.string().max(60).optional(),
  companyName: z.string().max(100).optional(),
})
export type BuyerInfo = z.infer<typeof BuyerInfoSchema>

/* ═══════ Installment (Taksit — Wix'in en büyük TR eksikliği) ═══════ */

export const InstallmentOptionSchema = z.object({
  installmentCount: z.number().int().min(1).max(12),
  installmentAmount: z.number().nonnegative(),        // Her taksit tutarı ₺
  totalAmount: z.number().nonnegative(),              // Taksitli toplam
  interestRate: z.number().nonnegative(),              // Faiz oranı %
  bankName: z.string(),
  cardType: z.string().optional(),                     // Visa, Mastercard, Troy
  isInterestFree: z.boolean().default(false),
})
export type InstallmentOption = z.infer<typeof InstallmentOptionSchema>

/* ═══════ Selected Shipping ═══════ */

export const SelectedShippingSchema = z.object({
  carrierId: z.string(),
  carrierName: z.string(),
  serviceType: z.string(),
  price: z.number().nonnegative(),
  estimatedDelivery: z.string(),
})
export type SelectedShipping = z.infer<typeof SelectedShippingSchema>

/* ═══════ Payment Method ═══════ */

export const CreditCardPaymentSchema = z.object({
  installmentCount: z.number().int().min(1).max(12).default(1),
  installmentAmount: z.number().nonnegative().optional(),
  totalWithInstallment: z.number().nonnegative().optional(),
  bankName: z.string().optional(),
  cardType: z.string().optional(),
})
export type CreditCardPayment = z.infer<typeof CreditCardPaymentSchema>

export const BankTransferPaymentSchema = z.object({
  bankName: z.string(),
  iban: z.string(),
  referenceNote: z.string(),
})
export type BankTransferPayment = z.infer<typeof BankTransferPaymentSchema>

export const CashOnDeliveryPaymentSchema = z.object({
  extraCharge: z.number().nonnegative().default(0),
})
export type CashOnDeliveryPayment = z.infer<typeof CashOnDeliveryPaymentSchema>

export const PaymentMethodSchema = z.object({
  type: z.enum(['credit_card', 'bank_transfer', 'cash_on_delivery']),
  creditCard: CreditCardPaymentSchema.optional(),
  bankTransfer: BankTransferPaymentSchema.optional(),
  cashOnDelivery: CashOnDeliveryPaymentSchema.optional(),
})
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>

/* ═══════ Checkout Line Item ═══════ */

export const CheckoutLineItemSchema = z.object({
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
})
export type CheckoutLineItem = z.infer<typeof CheckoutLineItemSchema>

/* ═══════ Checkout ═══════ */

export const CheckoutSchema = z.object({
  id: z.string(),
  cartId: z.string(),
  purchaseFlowId: z.string(),
  esnafId: z.string(),
  revision: z.number().int().default(1),

  buyerInfo: BuyerInfoSchema,
  invoiceType: z.enum(['individual', 'corporate']).default('individual'),

  shippingAddress: AddressSchema.optional(),
  billingAddress: z.object({
    sameAsShipping: z.boolean().default(true),
    address: AddressSchema.optional(),
  }),

  selectedShipping: SelectedShippingSchema.optional(),
  paymentMethod: PaymentMethodSchema.optional(),

  lineItems: z.array(CheckoutLineItemSchema),
  priceSummary: PriceSummarySchema,
  appliedDiscounts: z.array(AppliedDiscountSchema).default([]),

  status: z.enum(['open', 'completed', 'expired', 'abandoned']).default('open'),

  createdAt: z.string(),
  updatedAt: z.string(),
  expiresAt: z.string(),   // 24 hours
})
export type Checkout = z.infer<typeof CheckoutSchema>
