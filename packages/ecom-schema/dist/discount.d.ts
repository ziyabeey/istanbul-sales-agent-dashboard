/**
 * @kepenk/ecom-schema — Discount & Coupon Schemas
 * Stackable: kupon + otomatik indirim birlikte çalışır.
 */
import { z } from 'zod';
export declare const CouponSchema: z.ZodObject<{
    id: z.ZodString;
    esnafId: z.ZodString;
    code: z.ZodString;
    name: z.ZodString;
    discountType: z.ZodEnum<["percentage_off", "fixed_amount_off", "free_shipping", "buy_x_get_y"]>;
    value: z.ZodNumber;
    maxDiscountAmount: z.ZodOptional<z.ZodNumber>;
    buyQuantity: z.ZodOptional<z.ZodNumber>;
    getQuantity: z.ZodOptional<z.ZodNumber>;
    getDiscountPercent: z.ZodOptional<z.ZodNumber>;
    scope: z.ZodDefault<z.ZodEnum<["all", "categories", "products", "min_subtotal"]>>;
    scopeIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    minSubtotal: z.ZodOptional<z.ZodNumber>;
    totalUsageLimit: z.ZodOptional<z.ZodNumber>;
    perCustomerLimit: z.ZodDefault<z.ZodNumber>;
    currentUsageCount: z.ZodDefault<z.ZodNumber>;
    startsAt: z.ZodString;
    endsAt: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<["active", "expired", "disabled"]>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: number;
    code: string;
    status: "active" | "expired" | "disabled";
    id: string;
    name: string;
    esnafId: string;
    createdAt: string;
    updatedAt: string;
    discountType: "free_shipping" | "percentage_off" | "fixed_amount_off" | "buy_x_get_y";
    scope: "all" | "categories" | "products" | "min_subtotal";
    scopeIds: string[];
    perCustomerLimit: number;
    currentUsageCount: number;
    startsAt: string;
    maxDiscountAmount?: number | undefined;
    buyQuantity?: number | undefined;
    getQuantity?: number | undefined;
    getDiscountPercent?: number | undefined;
    minSubtotal?: number | undefined;
    totalUsageLimit?: number | undefined;
    endsAt?: string | undefined;
}, {
    value: number;
    code: string;
    id: string;
    name: string;
    esnafId: string;
    createdAt: string;
    updatedAt: string;
    discountType: "free_shipping" | "percentage_off" | "fixed_amount_off" | "buy_x_get_y";
    startsAt: string;
    status?: "active" | "expired" | "disabled" | undefined;
    maxDiscountAmount?: number | undefined;
    buyQuantity?: number | undefined;
    getQuantity?: number | undefined;
    getDiscountPercent?: number | undefined;
    scope?: "all" | "categories" | "products" | "min_subtotal" | undefined;
    scopeIds?: string[] | undefined;
    minSubtotal?: number | undefined;
    totalUsageLimit?: number | undefined;
    perCustomerLimit?: number | undefined;
    currentUsageCount?: number | undefined;
    endsAt?: string | undefined;
}>;
export type Coupon = z.infer<typeof CouponSchema>;
export declare const CreateCouponSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    esnafId: z.ZodString;
    code: z.ZodString;
    name: z.ZodString;
    discountType: z.ZodEnum<["percentage_off", "fixed_amount_off", "free_shipping", "buy_x_get_y"]>;
    value: z.ZodNumber;
    maxDiscountAmount: z.ZodOptional<z.ZodNumber>;
    buyQuantity: z.ZodOptional<z.ZodNumber>;
    getQuantity: z.ZodOptional<z.ZodNumber>;
    getDiscountPercent: z.ZodOptional<z.ZodNumber>;
    scope: z.ZodDefault<z.ZodEnum<["all", "categories", "products", "min_subtotal"]>>;
    scopeIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    minSubtotal: z.ZodOptional<z.ZodNumber>;
    totalUsageLimit: z.ZodOptional<z.ZodNumber>;
    perCustomerLimit: z.ZodDefault<z.ZodNumber>;
    currentUsageCount: z.ZodDefault<z.ZodNumber>;
    startsAt: z.ZodString;
    endsAt: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<["active", "expired", "disabled"]>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "id" | "createdAt" | "updatedAt" | "currentUsageCount">, "strip", z.ZodTypeAny, {
    value: number;
    code: string;
    status: "active" | "expired" | "disabled";
    name: string;
    esnafId: string;
    discountType: "free_shipping" | "percentage_off" | "fixed_amount_off" | "buy_x_get_y";
    scope: "all" | "categories" | "products" | "min_subtotal";
    scopeIds: string[];
    perCustomerLimit: number;
    startsAt: string;
    maxDiscountAmount?: number | undefined;
    buyQuantity?: number | undefined;
    getQuantity?: number | undefined;
    getDiscountPercent?: number | undefined;
    minSubtotal?: number | undefined;
    totalUsageLimit?: number | undefined;
    endsAt?: string | undefined;
}, {
    value: number;
    code: string;
    name: string;
    esnafId: string;
    discountType: "free_shipping" | "percentage_off" | "fixed_amount_off" | "buy_x_get_y";
    startsAt: string;
    status?: "active" | "expired" | "disabled" | undefined;
    maxDiscountAmount?: number | undefined;
    buyQuantity?: number | undefined;
    getQuantity?: number | undefined;
    getDiscountPercent?: number | undefined;
    scope?: "all" | "categories" | "products" | "min_subtotal" | undefined;
    scopeIds?: string[] | undefined;
    minSubtotal?: number | undefined;
    totalUsageLimit?: number | undefined;
    perCustomerLimit?: number | undefined;
    endsAt?: string | undefined;
}>;
export type CreateCoupon = z.infer<typeof CreateCouponSchema>;
export declare const AutoDiscountSchema: z.ZodObject<{
    id: z.ZodString;
    esnafId: z.ZodString;
    name: z.ZodString;
    discountType: z.ZodEnum<["percentage_off", "fixed_amount_off", "quantity_pricing", "buy_x_get_y"]>;
    value: z.ZodNumber;
    tiers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        minQuantity: z.ZodNumber;
        discountPercent: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        minQuantity: number;
        discountPercent: number;
    }, {
        minQuantity: number;
        discountPercent: number;
    }>, "many">>;
    buyQuantity: z.ZodOptional<z.ZodNumber>;
    getQuantity: z.ZodOptional<z.ZodNumber>;
    getDiscountPercent: z.ZodOptional<z.ZodNumber>;
    scope: z.ZodDefault<z.ZodEnum<["all", "categories", "products"]>>;
    scopeIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    startsAt: z.ZodString;
    endsAt: z.ZodOptional<z.ZodString>;
    priority: z.ZodDefault<z.ZodNumber>;
    status: z.ZodDefault<z.ZodEnum<["active", "scheduled", "expired", "disabled"]>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: number;
    status: "active" | "expired" | "disabled" | "scheduled";
    id: string;
    name: string;
    esnafId: string;
    createdAt: string;
    updatedAt: string;
    discountType: "percentage_off" | "fixed_amount_off" | "buy_x_get_y" | "quantity_pricing";
    scope: "all" | "categories" | "products";
    scopeIds: string[];
    startsAt: string;
    priority: number;
    buyQuantity?: number | undefined;
    getQuantity?: number | undefined;
    getDiscountPercent?: number | undefined;
    endsAt?: string | undefined;
    tiers?: {
        minQuantity: number;
        discountPercent: number;
    }[] | undefined;
}, {
    value: number;
    id: string;
    name: string;
    esnafId: string;
    createdAt: string;
    updatedAt: string;
    discountType: "percentage_off" | "fixed_amount_off" | "buy_x_get_y" | "quantity_pricing";
    startsAt: string;
    status?: "active" | "expired" | "disabled" | "scheduled" | undefined;
    buyQuantity?: number | undefined;
    getQuantity?: number | undefined;
    getDiscountPercent?: number | undefined;
    scope?: "all" | "categories" | "products" | undefined;
    scopeIds?: string[] | undefined;
    endsAt?: string | undefined;
    tiers?: {
        minQuantity: number;
        discountPercent: number;
    }[] | undefined;
    priority?: number | undefined;
}>;
export type AutoDiscount = z.infer<typeof AutoDiscountSchema>;
export declare const CreateAutoDiscountSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    esnafId: z.ZodString;
    name: z.ZodString;
    discountType: z.ZodEnum<["percentage_off", "fixed_amount_off", "quantity_pricing", "buy_x_get_y"]>;
    value: z.ZodNumber;
    tiers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        minQuantity: z.ZodNumber;
        discountPercent: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        minQuantity: number;
        discountPercent: number;
    }, {
        minQuantity: number;
        discountPercent: number;
    }>, "many">>;
    buyQuantity: z.ZodOptional<z.ZodNumber>;
    getQuantity: z.ZodOptional<z.ZodNumber>;
    getDiscountPercent: z.ZodOptional<z.ZodNumber>;
    scope: z.ZodDefault<z.ZodEnum<["all", "categories", "products"]>>;
    scopeIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    startsAt: z.ZodString;
    endsAt: z.ZodOptional<z.ZodString>;
    priority: z.ZodDefault<z.ZodNumber>;
    status: z.ZodDefault<z.ZodEnum<["active", "scheduled", "expired", "disabled"]>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    value: number;
    status: "active" | "expired" | "disabled" | "scheduled";
    name: string;
    esnafId: string;
    discountType: "percentage_off" | "fixed_amount_off" | "buy_x_get_y" | "quantity_pricing";
    scope: "all" | "categories" | "products";
    scopeIds: string[];
    startsAt: string;
    priority: number;
    buyQuantity?: number | undefined;
    getQuantity?: number | undefined;
    getDiscountPercent?: number | undefined;
    endsAt?: string | undefined;
    tiers?: {
        minQuantity: number;
        discountPercent: number;
    }[] | undefined;
}, {
    value: number;
    name: string;
    esnafId: string;
    discountType: "percentage_off" | "fixed_amount_off" | "buy_x_get_y" | "quantity_pricing";
    startsAt: string;
    status?: "active" | "expired" | "disabled" | "scheduled" | undefined;
    buyQuantity?: number | undefined;
    getQuantity?: number | undefined;
    getDiscountPercent?: number | undefined;
    scope?: "all" | "categories" | "products" | undefined;
    scopeIds?: string[] | undefined;
    endsAt?: string | undefined;
    tiers?: {
        minQuantity: number;
        discountPercent: number;
    }[] | undefined;
    priority?: number | undefined;
}>;
export type CreateAutoDiscount = z.infer<typeof CreateAutoDiscountSchema>;
//# sourceMappingURL=discount.d.ts.map