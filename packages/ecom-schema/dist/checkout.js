"use strict";
/**
 * @kepenk/ecom-schema — Checkout Schema
 * Turkey-native: taksit, 81 il, TC Kimlik / Vergi No, e-Fatura fields.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutSchema = exports.CheckoutLineItemSchema = exports.PaymentMethodSchema = exports.CashOnDeliveryPaymentSchema = exports.BankTransferPaymentSchema = exports.CreditCardPaymentSchema = exports.SelectedShippingSchema = exports.InstallmentOptionSchema = exports.BuyerInfoSchema = exports.AddressSchema = void 0;
const zod_1 = require("zod");
const cart_1 = require("./cart");
/* ═══════ Address ═══════ */
exports.AddressSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(2).max(80),
    addressLine1: zod_1.z.string().min(5).max(200),
    addressLine2: zod_1.z.string().max(200).optional(),
    district: zod_1.z.string().min(1).max(60), // İlçe
    city: zod_1.z.string().min(1).max(40), // İl (81 il)
    postalCode: zod_1.z.string().regex(/^\d{5}$/),
    country: zod_1.z.literal('TR').default('TR'),
    phone: zod_1.z.string().min(10).max(15),
    notes: zod_1.z.string().max(200).optional(),
});
/* ═══════ Buyer Info ═══════ */
exports.BuyerInfoSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    firstName: zod_1.z.string().min(1).max(40),
    lastName: zod_1.z.string().min(1).max(40),
    phone: zod_1.z.string().min(10).max(15), // +90 5XX XXX XXXX
    tcKimlik: zod_1.z.string().length(11).optional(), // Bireysel fatura
    taxId: zod_1.z.string().length(10).optional(), // Kurumsal fatura (VKN)
    taxOffice: zod_1.z.string().max(60).optional(),
    companyName: zod_1.z.string().max(100).optional(),
});
/* ═══════ Installment (Taksit — Wix'in en büyük TR eksikliği) ═══════ */
exports.InstallmentOptionSchema = zod_1.z.object({
    installmentCount: zod_1.z.number().int().min(1).max(12),
    installmentAmount: zod_1.z.number().nonnegative(), // Her taksit tutarı ₺
    totalAmount: zod_1.z.number().nonnegative(), // Taksitli toplam
    interestRate: zod_1.z.number().nonnegative(), // Faiz oranı %
    bankName: zod_1.z.string(),
    cardType: zod_1.z.string().optional(), // Visa, Mastercard, Troy
    isInterestFree: zod_1.z.boolean().default(false),
});
/* ═══════ Selected Shipping ═══════ */
exports.SelectedShippingSchema = zod_1.z.object({
    carrierId: zod_1.z.string(),
    carrierName: zod_1.z.string(),
    serviceType: zod_1.z.string(),
    price: zod_1.z.number().nonnegative(),
    estimatedDelivery: zod_1.z.string(),
});
/* ═══════ Payment Method ═══════ */
exports.CreditCardPaymentSchema = zod_1.z.object({
    installmentCount: zod_1.z.number().int().min(1).max(12).default(1),
    installmentAmount: zod_1.z.number().nonnegative().optional(),
    totalWithInstallment: zod_1.z.number().nonnegative().optional(),
    bankName: zod_1.z.string().optional(),
    cardType: zod_1.z.string().optional(),
});
exports.BankTransferPaymentSchema = zod_1.z.object({
    bankName: zod_1.z.string(),
    iban: zod_1.z.string(),
    referenceNote: zod_1.z.string(),
});
exports.CashOnDeliveryPaymentSchema = zod_1.z.object({
    extraCharge: zod_1.z.number().nonnegative().default(0),
});
exports.PaymentMethodSchema = zod_1.z.object({
    type: zod_1.z.enum(['credit_card', 'bank_transfer', 'cash_on_delivery']),
    creditCard: exports.CreditCardPaymentSchema.optional(),
    bankTransfer: exports.BankTransferPaymentSchema.optional(),
    cashOnDelivery: exports.CashOnDeliveryPaymentSchema.optional(),
});
/* ═══════ Checkout Line Item ═══════ */
exports.CheckoutLineItemSchema = zod_1.z.object({
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
});
/* ═══════ Checkout ═══════ */
exports.CheckoutSchema = zod_1.z.object({
    id: zod_1.z.string(),
    cartId: zod_1.z.string(),
    purchaseFlowId: zod_1.z.string(),
    esnafId: zod_1.z.string(),
    revision: zod_1.z.number().int().default(1),
    buyerInfo: exports.BuyerInfoSchema,
    invoiceType: zod_1.z.enum(['individual', 'corporate']).default('individual'),
    shippingAddress: exports.AddressSchema.optional(),
    billingAddress: zod_1.z.object({
        sameAsShipping: zod_1.z.boolean().default(true),
        address: exports.AddressSchema.optional(),
    }),
    selectedShipping: exports.SelectedShippingSchema.optional(),
    paymentMethod: exports.PaymentMethodSchema.optional(),
    lineItems: zod_1.z.array(exports.CheckoutLineItemSchema),
    priceSummary: cart_1.PriceSummarySchema,
    appliedDiscounts: zod_1.z.array(cart_1.AppliedDiscountSchema).default([]),
    status: zod_1.z.enum(['open', 'completed', 'expired', 'abandoned']).default('open'),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
    expiresAt: zod_1.z.string(), // 24 hours
});
//# sourceMappingURL=checkout.js.map