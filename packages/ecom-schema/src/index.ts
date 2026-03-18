/**
 * @kepenk/ecom-schema
 * E-commerce data models for kepenk.ai — Turkey-native.
 */

// ── Product ──
export {
  ProductSchema, ProductVariantSchema, ProductOptionSchema, ProductModifierSchema,
  ProductMediaSchema, InventorySchema, DimensionsSchema, DigitalFileSchema,
  InfoSectionSchema, CustomFieldSchema, TaxConfigSchema, ProductSEOSchema,
  ProductAiMetaSchema, CreateProductSchema, UpdateProductSchema,
} from './product'
export type {
  Product, ProductVariant, ProductOption, ProductModifier,
  ProductMedia, Inventory, Dimensions, DigitalFile,
  InfoSection, CustomField, TaxConfig, ProductSEO,
  ProductAiMeta, CreateProduct, UpdateProduct,
} from './product'

// ── Category ──
export { CategorySchema, CreateCategorySchema, UpdateCategorySchema } from './category'
export type { Category, CreateCategory, UpdateCategory } from './category'

// ── Cart ──
export {
  CartSchema, CartLineItemSchema, CartLineItemSnapshotSchema,
  CartBuyerSchema, ModifierSelectionSchema, AppliedDiscountSchema,
  PriceSummarySchema, AddToCartSchema,
} from './cart'
export type {
  Cart, CartLineItem, CartLineItemSnapshot,
  CartBuyer, ModifierSelection, AppliedDiscount,
  PriceSummary, AddToCart,
} from './cart'

// ── Checkout ──
export {
  CheckoutSchema, AddressSchema, BuyerInfoSchema,
  InstallmentOptionSchema, SelectedShippingSchema,
  PaymentMethodSchema, CreditCardPaymentSchema,
  BankTransferPaymentSchema, CashOnDeliveryPaymentSchema,
  CheckoutLineItemSchema,
} from './checkout'
export type {
  Checkout, Address, BuyerInfo,
  InstallmentOption, SelectedShipping,
  PaymentMethod, CreditCardPayment,
  BankTransferPayment, CashOnDeliveryPayment,
  CheckoutLineItem,
} from './checkout'

// ── Order ──
export {
  OrderSchema, OrderLineItemSchema, OrderActivitySchema,
  OrderShippingSchema, OrderPaymentSchema,
  ShippingEventSchema, InternalNoteSchema, InvoiceSchema,
} from './order'
export type {
  Order, OrderLineItem, OrderActivity,
  OrderShipping, OrderPayment,
  ShippingEvent, InternalNote, Invoice,
} from './order'

// ── Discount ──
export {
  CouponSchema, CreateCouponSchema,
  AutoDiscountSchema, CreateAutoDiscountSchema,
} from './discount'
export type {
  Coupon, CreateCoupon,
  AutoDiscount, CreateAutoDiscount,
} from './discount'

// ── Constants ──
export const ECOM_CONSTANTS = {
  currency: 'TRY' as const,
  currencySymbol: '₺',
  currencyLocale: 'tr-TR',
  vatRates: { general: 20, reduced1: 10, reduced2: 1 } as const,
  taxIncludedInPrice: true,
  maxProducts: 500,
  maxOptionsPerProduct: 6,
  maxChoicesPerOption: 30,
  maxVariantsPerProduct: 300,
  maxModifiersPerProduct: 5,
  maxMediaPerProduct: 15,
  maxCategories: 100,
  maxCategoryDepth: 3,
  maxCartItems: 50,
  checkoutExpiryHours: 24,
  cashOnDeliveryMaxAmount: 5000,
  carriers: ['yurtici', 'aras', 'ptt', 'surat'] as const,
  invoiceProviders: ['parasut', 'elogo', 'edm', 'luca'] as const,
} as const
