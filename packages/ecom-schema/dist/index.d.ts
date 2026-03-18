/**
 * @kepenk/ecom-schema
 * E-commerce data models for kepenk.ai — Turkey-native.
 */
export { ProductSchema, ProductVariantSchema, ProductOptionSchema, ProductModifierSchema, ProductMediaSchema, InventorySchema, DimensionsSchema, DigitalFileSchema, InfoSectionSchema, CustomFieldSchema, TaxConfigSchema, ProductSEOSchema, ProductAiMetaSchema, CreateProductSchema, UpdateProductSchema, } from './product';
export type { Product, ProductVariant, ProductOption, ProductModifier, ProductMedia, Inventory, Dimensions, DigitalFile, InfoSection, CustomField, TaxConfig, ProductSEO, ProductAiMeta, CreateProduct, UpdateProduct, } from './product';
export { CategorySchema, CreateCategorySchema, UpdateCategorySchema } from './category';
export type { Category, CreateCategory, UpdateCategory } from './category';
export { CartSchema, CartLineItemSchema, CartLineItemSnapshotSchema, CartBuyerSchema, ModifierSelectionSchema, AppliedDiscountSchema, PriceSummarySchema, AddToCartSchema, } from './cart';
export type { Cart, CartLineItem, CartLineItemSnapshot, CartBuyer, ModifierSelection, AppliedDiscount, PriceSummary, AddToCart, } from './cart';
export { CheckoutSchema, AddressSchema, BuyerInfoSchema, InstallmentOptionSchema, SelectedShippingSchema, PaymentMethodSchema, CreditCardPaymentSchema, BankTransferPaymentSchema, CashOnDeliveryPaymentSchema, CheckoutLineItemSchema, } from './checkout';
export type { Checkout, Address, BuyerInfo, InstallmentOption, SelectedShipping, PaymentMethod, CreditCardPayment, BankTransferPayment, CashOnDeliveryPayment, CheckoutLineItem, } from './checkout';
export { OrderSchema, OrderLineItemSchema, OrderActivitySchema, OrderShippingSchema, OrderPaymentSchema, ShippingEventSchema, InternalNoteSchema, InvoiceSchema, } from './order';
export type { Order, OrderLineItem, OrderActivity, OrderShipping, OrderPayment, ShippingEvent, InternalNote, Invoice, } from './order';
export { CouponSchema, CreateCouponSchema, AutoDiscountSchema, CreateAutoDiscountSchema, } from './discount';
export type { Coupon, CreateCoupon, AutoDiscount, CreateAutoDiscount, } from './discount';
export declare const ECOM_CONSTANTS: {
    readonly currency: "TRY";
    readonly currencySymbol: "₺";
    readonly currencyLocale: "tr-TR";
    readonly vatRates: {
        readonly general: 20;
        readonly reduced1: 10;
        readonly reduced2: 1;
    };
    readonly taxIncludedInPrice: true;
    readonly maxProducts: 500;
    readonly maxOptionsPerProduct: 6;
    readonly maxChoicesPerOption: 30;
    readonly maxVariantsPerProduct: 300;
    readonly maxModifiersPerProduct: 5;
    readonly maxMediaPerProduct: 15;
    readonly maxCategories: 100;
    readonly maxCategoryDepth: 3;
    readonly maxCartItems: 50;
    readonly checkoutExpiryHours: 24;
    readonly cashOnDeliveryMaxAmount: 5000;
    readonly carriers: readonly ["yurtici", "aras", "ptt", "surat"];
    readonly invoiceProviders: readonly ["parasut", "elogo", "edm", "luca"];
};
//# sourceMappingURL=index.d.ts.map