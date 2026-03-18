/**
 * @kepenk/ecom-schema — Cart Schema
 * Server-side cart with purchaseFlowId correlation, product snapshot pattern.
 */
import { z } from 'zod';
export declare const CartLineItemSnapshotSchema: z.ZodObject<{
    productName: z.ZodString;
    variantChoices: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodString>>;
    price: z.ZodNumber;
    compareAtPrice: z.ZodOptional<z.ZodNumber>;
    sku: z.ZodOptional<z.ZodString>;
    weight: z.ZodOptional<z.ZodNumber>;
    imageUrl: z.ZodOptional<z.ZodString>;
    productType: z.ZodEnum<["physical", "digital", "service"]>;
}, "strip", z.ZodTypeAny, {
    productName: string;
    variantChoices: Record<string, string>;
    price: number;
    productType: "physical" | "digital" | "service";
    compareAtPrice?: number | undefined;
    sku?: string | undefined;
    weight?: number | undefined;
    imageUrl?: string | undefined;
}, {
    productName: string;
    price: number;
    productType: "physical" | "digital" | "service";
    variantChoices?: Record<string, string> | undefined;
    compareAtPrice?: number | undefined;
    sku?: string | undefined;
    weight?: number | undefined;
    imageUrl?: string | undefined;
}>;
export type CartLineItemSnapshot = z.infer<typeof CartLineItemSnapshotSchema>;
export declare const ModifierSelectionSchema: z.ZodObject<{
    modifierId: z.ZodString;
    value: z.ZodString;
    priceAdjustment: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    value: string;
    modifierId: string;
    priceAdjustment: number;
}, {
    value: string;
    modifierId: string;
    priceAdjustment?: number | undefined;
}>;
export type ModifierSelection = z.infer<typeof ModifierSelectionSchema>;
export declare const CartLineItemSchema: z.ZodObject<{
    id: z.ZodString;
    productId: z.ZodString;
    variantId: z.ZodString;
    quantity: z.ZodNumber;
    snapshot: z.ZodObject<{
        productName: z.ZodString;
        variantChoices: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodString>>;
        price: z.ZodNumber;
        compareAtPrice: z.ZodOptional<z.ZodNumber>;
        sku: z.ZodOptional<z.ZodString>;
        weight: z.ZodOptional<z.ZodNumber>;
        imageUrl: z.ZodOptional<z.ZodString>;
        productType: z.ZodEnum<["physical", "digital", "service"]>;
    }, "strip", z.ZodTypeAny, {
        productName: string;
        variantChoices: Record<string, string>;
        price: number;
        productType: "physical" | "digital" | "service";
        compareAtPrice?: number | undefined;
        sku?: string | undefined;
        weight?: number | undefined;
        imageUrl?: string | undefined;
    }, {
        productName: string;
        price: number;
        productType: "physical" | "digital" | "service";
        variantChoices?: Record<string, string> | undefined;
        compareAtPrice?: number | undefined;
        sku?: string | undefined;
        weight?: number | undefined;
        imageUrl?: string | undefined;
    }>;
    modifierSelections: z.ZodOptional<z.ZodArray<z.ZodObject<{
        modifierId: z.ZodString;
        value: z.ZodString;
        priceAdjustment: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        modifierId: string;
        priceAdjustment: number;
    }, {
        value: string;
        modifierId: string;
        priceAdjustment?: number | undefined;
    }>, "many">>;
    customFieldValues: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    lineTotal: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    productId: string;
    variantId: string;
    quantity: number;
    snapshot: {
        productName: string;
        variantChoices: Record<string, string>;
        price: number;
        productType: "physical" | "digital" | "service";
        compareAtPrice?: number | undefined;
        sku?: string | undefined;
        weight?: number | undefined;
        imageUrl?: string | undefined;
    };
    lineTotal: number;
    modifierSelections?: {
        value: string;
        modifierId: string;
        priceAdjustment: number;
    }[] | undefined;
    customFieldValues?: Record<string, string> | undefined;
}, {
    id: string;
    productId: string;
    variantId: string;
    quantity: number;
    snapshot: {
        productName: string;
        price: number;
        productType: "physical" | "digital" | "service";
        variantChoices?: Record<string, string> | undefined;
        compareAtPrice?: number | undefined;
        sku?: string | undefined;
        weight?: number | undefined;
        imageUrl?: string | undefined;
    };
    lineTotal: number;
    modifierSelections?: {
        value: string;
        modifierId: string;
        priceAdjustment?: number | undefined;
    }[] | undefined;
    customFieldValues?: Record<string, string> | undefined;
}>;
export type CartLineItem = z.infer<typeof CartLineItemSchema>;
export declare const AppliedDiscountSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    type: z.ZodEnum<["percentage", "fixed", "free_shipping"]>;
    value: z.ZodNumber;
    discountAmount: z.ZodNumber;
    source: z.ZodEnum<["coupon", "automatic"]>;
    couponCode: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    value: number;
    type: "percentage" | "fixed" | "free_shipping";
    id: string;
    name: string;
    discountAmount: number;
    source: "coupon" | "automatic";
    couponCode?: string | undefined;
}, {
    value: number;
    type: "percentage" | "fixed" | "free_shipping";
    id: string;
    name: string;
    discountAmount: number;
    source: "coupon" | "automatic";
    couponCode?: string | undefined;
}>;
export type AppliedDiscount = z.infer<typeof AppliedDiscountSchema>;
export declare const PriceSummarySchema: z.ZodObject<{
    subtotal: z.ZodNumber;
    shipping: z.ZodDefault<z.ZodNumber>;
    discount: z.ZodDefault<z.ZodNumber>;
    additionalFees: z.ZodDefault<z.ZodNumber>;
    tax: z.ZodDefault<z.ZodNumber>;
    total: z.ZodNumber;
    installmentTotal: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    subtotal: number;
    shipping: number;
    discount: number;
    additionalFees: number;
    tax: number;
    total: number;
    installmentTotal?: number | undefined;
}, {
    subtotal: number;
    total: number;
    shipping?: number | undefined;
    discount?: number | undefined;
    additionalFees?: number | undefined;
    tax?: number | undefined;
    installmentTotal?: number | undefined;
}>;
export type PriceSummary = z.infer<typeof PriceSummarySchema>;
export declare const CartBuyerSchema: z.ZodObject<{
    type: z.ZodEnum<["visitor", "member"]>;
    visitorId: z.ZodOptional<z.ZodString>;
    memberId: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "visitor" | "member";
    email?: string | undefined;
    visitorId?: string | undefined;
    memberId?: string | undefined;
}, {
    type: "visitor" | "member";
    email?: string | undefined;
    visitorId?: string | undefined;
    memberId?: string | undefined;
}>;
export type CartBuyer = z.infer<typeof CartBuyerSchema>;
export declare const CartSchema: z.ZodObject<{
    id: z.ZodString;
    esnafId: z.ZodString;
    purchaseFlowId: z.ZodString;
    revision: z.ZodDefault<z.ZodNumber>;
    buyer: z.ZodObject<{
        type: z.ZodEnum<["visitor", "member"]>;
        visitorId: z.ZodOptional<z.ZodString>;
        memberId: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "visitor" | "member";
        email?: string | undefined;
        visitorId?: string | undefined;
        memberId?: string | undefined;
    }, {
        type: "visitor" | "member";
        email?: string | undefined;
        visitorId?: string | undefined;
        memberId?: string | undefined;
    }>;
    lineItems: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        productId: z.ZodString;
        variantId: z.ZodString;
        quantity: z.ZodNumber;
        snapshot: z.ZodObject<{
            productName: z.ZodString;
            variantChoices: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodString>>;
            price: z.ZodNumber;
            compareAtPrice: z.ZodOptional<z.ZodNumber>;
            sku: z.ZodOptional<z.ZodString>;
            weight: z.ZodOptional<z.ZodNumber>;
            imageUrl: z.ZodOptional<z.ZodString>;
            productType: z.ZodEnum<["physical", "digital", "service"]>;
        }, "strip", z.ZodTypeAny, {
            productName: string;
            variantChoices: Record<string, string>;
            price: number;
            productType: "physical" | "digital" | "service";
            compareAtPrice?: number | undefined;
            sku?: string | undefined;
            weight?: number | undefined;
            imageUrl?: string | undefined;
        }, {
            productName: string;
            price: number;
            productType: "physical" | "digital" | "service";
            variantChoices?: Record<string, string> | undefined;
            compareAtPrice?: number | undefined;
            sku?: string | undefined;
            weight?: number | undefined;
            imageUrl?: string | undefined;
        }>;
        modifierSelections: z.ZodOptional<z.ZodArray<z.ZodObject<{
            modifierId: z.ZodString;
            value: z.ZodString;
            priceAdjustment: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            value: string;
            modifierId: string;
            priceAdjustment: number;
        }, {
            value: string;
            modifierId: string;
            priceAdjustment?: number | undefined;
        }>, "many">>;
        customFieldValues: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        lineTotal: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        productId: string;
        variantId: string;
        quantity: number;
        snapshot: {
            productName: string;
            variantChoices: Record<string, string>;
            price: number;
            productType: "physical" | "digital" | "service";
            compareAtPrice?: number | undefined;
            sku?: string | undefined;
            weight?: number | undefined;
            imageUrl?: string | undefined;
        };
        lineTotal: number;
        modifierSelections?: {
            value: string;
            modifierId: string;
            priceAdjustment: number;
        }[] | undefined;
        customFieldValues?: Record<string, string> | undefined;
    }, {
        id: string;
        productId: string;
        variantId: string;
        quantity: number;
        snapshot: {
            productName: string;
            price: number;
            productType: "physical" | "digital" | "service";
            variantChoices?: Record<string, string> | undefined;
            compareAtPrice?: number | undefined;
            sku?: string | undefined;
            weight?: number | undefined;
            imageUrl?: string | undefined;
        };
        lineTotal: number;
        modifierSelections?: {
            value: string;
            modifierId: string;
            priceAdjustment?: number | undefined;
        }[] | undefined;
        customFieldValues?: Record<string, string> | undefined;
    }>, "many">>;
    appliedDiscounts: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        type: z.ZodEnum<["percentage", "fixed", "free_shipping"]>;
        value: z.ZodNumber;
        discountAmount: z.ZodNumber;
        source: z.ZodEnum<["coupon", "automatic"]>;
        couponCode: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: "percentage" | "fixed" | "free_shipping";
        id: string;
        name: string;
        discountAmount: number;
        source: "coupon" | "automatic";
        couponCode?: string | undefined;
    }, {
        value: number;
        type: "percentage" | "fixed" | "free_shipping";
        id: string;
        name: string;
        discountAmount: number;
        source: "coupon" | "automatic";
        couponCode?: string | undefined;
    }>, "many">>;
    couponCode: z.ZodOptional<z.ZodString>;
    buyerNote: z.ZodOptional<z.ZodString>;
    priceSummary: z.ZodObject<{
        subtotal: z.ZodNumber;
        shipping: z.ZodDefault<z.ZodNumber>;
        discount: z.ZodDefault<z.ZodNumber>;
        additionalFees: z.ZodDefault<z.ZodNumber>;
        tax: z.ZodDefault<z.ZodNumber>;
        total: z.ZodNumber;
        installmentTotal: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        subtotal: number;
        shipping: number;
        discount: number;
        additionalFees: number;
        tax: number;
        total: number;
        installmentTotal?: number | undefined;
    }, {
        subtotal: number;
        total: number;
        shipping?: number | undefined;
        discount?: number | undefined;
        additionalFees?: number | undefined;
        tax?: number | undefined;
        installmentTotal?: number | undefined;
    }>;
    currency: z.ZodDefault<z.ZodLiteral<"TRY">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    lastActivityAt: z.ZodString;
    abandonedNotificationSent: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id: string;
    esnafId: string;
    purchaseFlowId: string;
    revision: number;
    buyer: {
        type: "visitor" | "member";
        email?: string | undefined;
        visitorId?: string | undefined;
        memberId?: string | undefined;
    };
    lineItems: {
        id: string;
        productId: string;
        variantId: string;
        quantity: number;
        snapshot: {
            productName: string;
            variantChoices: Record<string, string>;
            price: number;
            productType: "physical" | "digital" | "service";
            compareAtPrice?: number | undefined;
            sku?: string | undefined;
            weight?: number | undefined;
            imageUrl?: string | undefined;
        };
        lineTotal: number;
        modifierSelections?: {
            value: string;
            modifierId: string;
            priceAdjustment: number;
        }[] | undefined;
        customFieldValues?: Record<string, string> | undefined;
    }[];
    appliedDiscounts: {
        value: number;
        type: "percentage" | "fixed" | "free_shipping";
        id: string;
        name: string;
        discountAmount: number;
        source: "coupon" | "automatic";
        couponCode?: string | undefined;
    }[];
    priceSummary: {
        subtotal: number;
        shipping: number;
        discount: number;
        additionalFees: number;
        tax: number;
        total: number;
        installmentTotal?: number | undefined;
    };
    currency: "TRY";
    createdAt: string;
    updatedAt: string;
    lastActivityAt: string;
    abandonedNotificationSent: boolean;
    couponCode?: string | undefined;
    buyerNote?: string | undefined;
}, {
    id: string;
    esnafId: string;
    purchaseFlowId: string;
    buyer: {
        type: "visitor" | "member";
        email?: string | undefined;
        visitorId?: string | undefined;
        memberId?: string | undefined;
    };
    priceSummary: {
        subtotal: number;
        total: number;
        shipping?: number | undefined;
        discount?: number | undefined;
        additionalFees?: number | undefined;
        tax?: number | undefined;
        installmentTotal?: number | undefined;
    };
    createdAt: string;
    updatedAt: string;
    lastActivityAt: string;
    couponCode?: string | undefined;
    revision?: number | undefined;
    lineItems?: {
        id: string;
        productId: string;
        variantId: string;
        quantity: number;
        snapshot: {
            productName: string;
            price: number;
            productType: "physical" | "digital" | "service";
            variantChoices?: Record<string, string> | undefined;
            compareAtPrice?: number | undefined;
            sku?: string | undefined;
            weight?: number | undefined;
            imageUrl?: string | undefined;
        };
        lineTotal: number;
        modifierSelections?: {
            value: string;
            modifierId: string;
            priceAdjustment?: number | undefined;
        }[] | undefined;
        customFieldValues?: Record<string, string> | undefined;
    }[] | undefined;
    appliedDiscounts?: {
        value: number;
        type: "percentage" | "fixed" | "free_shipping";
        id: string;
        name: string;
        discountAmount: number;
        source: "coupon" | "automatic";
        couponCode?: string | undefined;
    }[] | undefined;
    buyerNote?: string | undefined;
    currency?: "TRY" | undefined;
    abandonedNotificationSent?: boolean | undefined;
}>;
export type Cart = z.infer<typeof CartSchema>;
export declare const AddToCartSchema: z.ZodObject<{
    productId: z.ZodString;
    variantId: z.ZodString;
    quantity: z.ZodDefault<z.ZodNumber>;
    modifierSelections: z.ZodOptional<z.ZodArray<z.ZodObject<{
        modifierId: z.ZodString;
        value: z.ZodString;
        priceAdjustment: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        modifierId: string;
        priceAdjustment: number;
    }, {
        value: string;
        modifierId: string;
        priceAdjustment?: number | undefined;
    }>, "many">>;
    customFieldValues: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    productId: string;
    variantId: string;
    quantity: number;
    modifierSelections?: {
        value: string;
        modifierId: string;
        priceAdjustment: number;
    }[] | undefined;
    customFieldValues?: Record<string, string> | undefined;
}, {
    productId: string;
    variantId: string;
    quantity?: number | undefined;
    modifierSelections?: {
        value: string;
        modifierId: string;
        priceAdjustment?: number | undefined;
    }[] | undefined;
    customFieldValues?: Record<string, string> | undefined;
}>;
export type AddToCart = z.infer<typeof AddToCartSchema>;
//# sourceMappingURL=cart.d.ts.map