"use strict";
/**
 * @kepenk/ecom-schema
 * E-commerce data models for kepenk.ai — Turkey-native.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECOM_CONSTANTS = exports.CreateAutoDiscountSchema = exports.AutoDiscountSchema = exports.CreateCouponSchema = exports.CouponSchema = exports.InvoiceSchema = exports.InternalNoteSchema = exports.ShippingEventSchema = exports.OrderPaymentSchema = exports.OrderShippingSchema = exports.OrderActivitySchema = exports.OrderLineItemSchema = exports.OrderSchema = exports.CheckoutLineItemSchema = exports.CashOnDeliveryPaymentSchema = exports.BankTransferPaymentSchema = exports.CreditCardPaymentSchema = exports.PaymentMethodSchema = exports.SelectedShippingSchema = exports.InstallmentOptionSchema = exports.BuyerInfoSchema = exports.AddressSchema = exports.CheckoutSchema = exports.AddToCartSchema = exports.PriceSummarySchema = exports.AppliedDiscountSchema = exports.ModifierSelectionSchema = exports.CartBuyerSchema = exports.CartLineItemSnapshotSchema = exports.CartLineItemSchema = exports.CartSchema = exports.UpdateCategorySchema = exports.CreateCategorySchema = exports.CategorySchema = exports.UpdateProductSchema = exports.CreateProductSchema = exports.ProductAiMetaSchema = exports.ProductSEOSchema = exports.TaxConfigSchema = exports.CustomFieldSchema = exports.InfoSectionSchema = exports.DigitalFileSchema = exports.DimensionsSchema = exports.InventorySchema = exports.ProductMediaSchema = exports.ProductModifierSchema = exports.ProductOptionSchema = exports.ProductVariantSchema = exports.ProductSchema = void 0;
// ── Product ──
var product_1 = require("./product");
Object.defineProperty(exports, "ProductSchema", { enumerable: true, get: function () { return product_1.ProductSchema; } });
Object.defineProperty(exports, "ProductVariantSchema", { enumerable: true, get: function () { return product_1.ProductVariantSchema; } });
Object.defineProperty(exports, "ProductOptionSchema", { enumerable: true, get: function () { return product_1.ProductOptionSchema; } });
Object.defineProperty(exports, "ProductModifierSchema", { enumerable: true, get: function () { return product_1.ProductModifierSchema; } });
Object.defineProperty(exports, "ProductMediaSchema", { enumerable: true, get: function () { return product_1.ProductMediaSchema; } });
Object.defineProperty(exports, "InventorySchema", { enumerable: true, get: function () { return product_1.InventorySchema; } });
Object.defineProperty(exports, "DimensionsSchema", { enumerable: true, get: function () { return product_1.DimensionsSchema; } });
Object.defineProperty(exports, "DigitalFileSchema", { enumerable: true, get: function () { return product_1.DigitalFileSchema; } });
Object.defineProperty(exports, "InfoSectionSchema", { enumerable: true, get: function () { return product_1.InfoSectionSchema; } });
Object.defineProperty(exports, "CustomFieldSchema", { enumerable: true, get: function () { return product_1.CustomFieldSchema; } });
Object.defineProperty(exports, "TaxConfigSchema", { enumerable: true, get: function () { return product_1.TaxConfigSchema; } });
Object.defineProperty(exports, "ProductSEOSchema", { enumerable: true, get: function () { return product_1.ProductSEOSchema; } });
Object.defineProperty(exports, "ProductAiMetaSchema", { enumerable: true, get: function () { return product_1.ProductAiMetaSchema; } });
Object.defineProperty(exports, "CreateProductSchema", { enumerable: true, get: function () { return product_1.CreateProductSchema; } });
Object.defineProperty(exports, "UpdateProductSchema", { enumerable: true, get: function () { return product_1.UpdateProductSchema; } });
// ── Category ──
var category_1 = require("./category");
Object.defineProperty(exports, "CategorySchema", { enumerable: true, get: function () { return category_1.CategorySchema; } });
Object.defineProperty(exports, "CreateCategorySchema", { enumerable: true, get: function () { return category_1.CreateCategorySchema; } });
Object.defineProperty(exports, "UpdateCategorySchema", { enumerable: true, get: function () { return category_1.UpdateCategorySchema; } });
// ── Cart ──
var cart_1 = require("./cart");
Object.defineProperty(exports, "CartSchema", { enumerable: true, get: function () { return cart_1.CartSchema; } });
Object.defineProperty(exports, "CartLineItemSchema", { enumerable: true, get: function () { return cart_1.CartLineItemSchema; } });
Object.defineProperty(exports, "CartLineItemSnapshotSchema", { enumerable: true, get: function () { return cart_1.CartLineItemSnapshotSchema; } });
Object.defineProperty(exports, "CartBuyerSchema", { enumerable: true, get: function () { return cart_1.CartBuyerSchema; } });
Object.defineProperty(exports, "ModifierSelectionSchema", { enumerable: true, get: function () { return cart_1.ModifierSelectionSchema; } });
Object.defineProperty(exports, "AppliedDiscountSchema", { enumerable: true, get: function () { return cart_1.AppliedDiscountSchema; } });
Object.defineProperty(exports, "PriceSummarySchema", { enumerable: true, get: function () { return cart_1.PriceSummarySchema; } });
Object.defineProperty(exports, "AddToCartSchema", { enumerable: true, get: function () { return cart_1.AddToCartSchema; } });
// ── Checkout ──
var checkout_1 = require("./checkout");
Object.defineProperty(exports, "CheckoutSchema", { enumerable: true, get: function () { return checkout_1.CheckoutSchema; } });
Object.defineProperty(exports, "AddressSchema", { enumerable: true, get: function () { return checkout_1.AddressSchema; } });
Object.defineProperty(exports, "BuyerInfoSchema", { enumerable: true, get: function () { return checkout_1.BuyerInfoSchema; } });
Object.defineProperty(exports, "InstallmentOptionSchema", { enumerable: true, get: function () { return checkout_1.InstallmentOptionSchema; } });
Object.defineProperty(exports, "SelectedShippingSchema", { enumerable: true, get: function () { return checkout_1.SelectedShippingSchema; } });
Object.defineProperty(exports, "PaymentMethodSchema", { enumerable: true, get: function () { return checkout_1.PaymentMethodSchema; } });
Object.defineProperty(exports, "CreditCardPaymentSchema", { enumerable: true, get: function () { return checkout_1.CreditCardPaymentSchema; } });
Object.defineProperty(exports, "BankTransferPaymentSchema", { enumerable: true, get: function () { return checkout_1.BankTransferPaymentSchema; } });
Object.defineProperty(exports, "CashOnDeliveryPaymentSchema", { enumerable: true, get: function () { return checkout_1.CashOnDeliveryPaymentSchema; } });
Object.defineProperty(exports, "CheckoutLineItemSchema", { enumerable: true, get: function () { return checkout_1.CheckoutLineItemSchema; } });
// ── Order ──
var order_1 = require("./order");
Object.defineProperty(exports, "OrderSchema", { enumerable: true, get: function () { return order_1.OrderSchema; } });
Object.defineProperty(exports, "OrderLineItemSchema", { enumerable: true, get: function () { return order_1.OrderLineItemSchema; } });
Object.defineProperty(exports, "OrderActivitySchema", { enumerable: true, get: function () { return order_1.OrderActivitySchema; } });
Object.defineProperty(exports, "OrderShippingSchema", { enumerable: true, get: function () { return order_1.OrderShippingSchema; } });
Object.defineProperty(exports, "OrderPaymentSchema", { enumerable: true, get: function () { return order_1.OrderPaymentSchema; } });
Object.defineProperty(exports, "ShippingEventSchema", { enumerable: true, get: function () { return order_1.ShippingEventSchema; } });
Object.defineProperty(exports, "InternalNoteSchema", { enumerable: true, get: function () { return order_1.InternalNoteSchema; } });
Object.defineProperty(exports, "InvoiceSchema", { enumerable: true, get: function () { return order_1.InvoiceSchema; } });
// ── Discount ──
var discount_1 = require("./discount");
Object.defineProperty(exports, "CouponSchema", { enumerable: true, get: function () { return discount_1.CouponSchema; } });
Object.defineProperty(exports, "CreateCouponSchema", { enumerable: true, get: function () { return discount_1.CreateCouponSchema; } });
Object.defineProperty(exports, "AutoDiscountSchema", { enumerable: true, get: function () { return discount_1.AutoDiscountSchema; } });
Object.defineProperty(exports, "CreateAutoDiscountSchema", { enumerable: true, get: function () { return discount_1.CreateAutoDiscountSchema; } });
// ── Constants ──
exports.ECOM_CONSTANTS = {
    currency: 'TRY',
    currencySymbol: '₺',
    currencyLocale: 'tr-TR',
    vatRates: { general: 20, reduced1: 10, reduced2: 1 },
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
    carriers: ['yurtici', 'aras', 'ptt', 'surat'],
    invoiceProviders: ['parasut', 'elogo', 'edm', 'luca'],
};
//# sourceMappingURL=index.js.map