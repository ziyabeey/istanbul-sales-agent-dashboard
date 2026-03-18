/**
 * @kepenk/ecom-schema — Order Schema
 * Full lifecycle: pending → confirmed → processing → shipped → delivered
 * e-Fatura/e-Arşiv support.
 */
import { z } from 'zod';
export declare const ShippingEventSchema: z.ZodObject<{
    status: z.ZodString;
    description: z.ZodString;
    location: z.ZodOptional<z.ZodString>;
    timestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: string;
    description: string;
    timestamp: string;
    location?: string | undefined;
}, {
    status: string;
    description: string;
    timestamp: string;
    location?: string | undefined;
}>;
export type ShippingEvent = z.infer<typeof ShippingEventSchema>;
export declare const OrderActivitySchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["created", "confirmed", "processing", "shipped", "delivered", "cancelled", "refunded", "note_added", "status_changed", "payment_received", "invoice_issued", "tracking_updated"]>;
    description: z.ZodString;
    createdBy: z.ZodEnum<["system", "esnaf", "customer"]>;
    createdAt: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    type: "created" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded" | "note_added" | "status_changed" | "payment_received" | "invoice_issued" | "tracking_updated";
    id: string;
    createdAt: string;
    description: string;
    createdBy: "customer" | "system" | "esnaf";
    metadata?: Record<string, string> | undefined;
}, {
    type: "created" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded" | "note_added" | "status_changed" | "payment_received" | "invoice_issued" | "tracking_updated";
    id: string;
    createdAt: string;
    description: string;
    createdBy: "customer" | "system" | "esnaf";
    metadata?: Record<string, string> | undefined;
}>;
export type OrderActivity = z.infer<typeof OrderActivitySchema>;
export declare const InternalNoteSchema: z.ZodObject<{
    text: z.ZodString;
    createdBy: z.ZodString;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    text: string;
    createdBy: string;
}, {
    createdAt: string;
    text: string;
    createdBy: string;
}>;
export type InternalNote = z.infer<typeof InternalNoteSchema>;
export declare const InvoiceSchema: z.ZodObject<{
    type: z.ZodEnum<["individual", "corporate"]>;
    documentType: z.ZodDefault<z.ZodEnum<["e_fatura", "e_arsiv"]>>;
    number: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<["pending", "issued", "cancelled"]>>;
    pdfUrl: z.ZodOptional<z.ZodString>;
    provider: z.ZodOptional<z.ZodString>;
    issuedAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "individual" | "corporate";
    status: "cancelled" | "pending" | "issued";
    documentType: "e_fatura" | "e_arsiv";
    number?: string | undefined;
    pdfUrl?: string | undefined;
    provider?: string | undefined;
    issuedAt?: string | undefined;
}, {
    type: "individual" | "corporate";
    number?: string | undefined;
    status?: "cancelled" | "pending" | "issued" | undefined;
    documentType?: "e_fatura" | "e_arsiv" | undefined;
    pdfUrl?: string | undefined;
    provider?: string | undefined;
    issuedAt?: string | undefined;
}>;
export type Invoice = z.infer<typeof InvoiceSchema>;
export declare const OrderLineItemSchema: z.ZodObject<{
    id: z.ZodString;
    productId: z.ZodString;
    variantId: z.ZodString;
    quantity: z.ZodNumber;
    productName: z.ZodString;
    variantChoices: z.ZodRecord<z.ZodString, z.ZodString>;
    price: z.ZodNumber;
    lineTotal: z.ZodNumber;
    imageUrl: z.ZodOptional<z.ZodString>;
    sku: z.ZodOptional<z.ZodString>;
    weight: z.ZodOptional<z.ZodNumber>;
    taxRate: z.ZodDefault<z.ZodNumber>;
    fulfillmentStatus: z.ZodDefault<z.ZodEnum<["unfulfilled", "fulfilled", "returned"]>>;
}, "strip", z.ZodTypeAny, {
    productName: string;
    variantChoices: Record<string, string>;
    price: number;
    id: string;
    productId: string;
    variantId: string;
    quantity: number;
    lineTotal: number;
    taxRate: number;
    fulfillmentStatus: "unfulfilled" | "fulfilled" | "returned";
    sku?: string | undefined;
    weight?: number | undefined;
    imageUrl?: string | undefined;
}, {
    productName: string;
    variantChoices: Record<string, string>;
    price: number;
    id: string;
    productId: string;
    variantId: string;
    quantity: number;
    lineTotal: number;
    sku?: string | undefined;
    weight?: number | undefined;
    imageUrl?: string | undefined;
    taxRate?: number | undefined;
    fulfillmentStatus?: "unfulfilled" | "fulfilled" | "returned" | undefined;
}>;
export type OrderLineItem = z.infer<typeof OrderLineItemSchema>;
export declare const OrderShippingSchema: z.ZodObject<{
    carrierId: z.ZodString;
    carrierName: z.ZodString;
    trackingNumber: z.ZodOptional<z.ZodString>;
    trackingUrl: z.ZodOptional<z.ZodString>;
    price: z.ZodNumber;
    events: z.ZodDefault<z.ZodArray<z.ZodObject<{
        status: z.ZodString;
        description: z.ZodString;
        location: z.ZodOptional<z.ZodString>;
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: string;
        description: string;
        timestamp: string;
        location?: string | undefined;
    }, {
        status: string;
        description: string;
        timestamp: string;
        location?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    price: number;
    carrierId: string;
    carrierName: string;
    events: {
        status: string;
        description: string;
        timestamp: string;
        location?: string | undefined;
    }[];
    trackingNumber?: string | undefined;
    trackingUrl?: string | undefined;
}, {
    price: number;
    carrierId: string;
    carrierName: string;
    trackingNumber?: string | undefined;
    trackingUrl?: string | undefined;
    events?: {
        status: string;
        description: string;
        timestamp: string;
        location?: string | undefined;
    }[] | undefined;
}>;
export type OrderShipping = z.infer<typeof OrderShippingSchema>;
export declare const OrderPaymentSchema: z.ZodObject<{
    method: z.ZodEnum<["credit_card", "bank_transfer", "cash_on_delivery"]>;
    provider: z.ZodString;
    transactionId: z.ZodOptional<z.ZodString>;
    installmentCount: z.ZodDefault<z.ZodNumber>;
    paidAmount: z.ZodNumber;
    refundedAmount: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    installmentCount: number;
    provider: string;
    method: "credit_card" | "bank_transfer" | "cash_on_delivery";
    paidAmount: number;
    refundedAmount: number;
    transactionId?: string | undefined;
}, {
    provider: string;
    method: "credit_card" | "bank_transfer" | "cash_on_delivery";
    paidAmount: number;
    installmentCount?: number | undefined;
    transactionId?: string | undefined;
    refundedAmount?: number | undefined;
}>;
export type OrderPayment = z.infer<typeof OrderPaymentSchema>;
export declare const OrderSchema: z.ZodObject<{
    id: z.ZodString;
    orderNumber: z.ZodString;
    esnafId: z.ZodString;
    purchaseFlowId: z.ZodString;
    status: z.ZodDefault<z.ZodEnum<["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "returned"]>>;
    paymentStatus: z.ZodDefault<z.ZodEnum<["pending", "paid", "partially_paid", "refunded", "partially_refunded", "failed"]>>;
    fulfillmentStatus: z.ZodDefault<z.ZodEnum<["unfulfilled", "partially_fulfilled", "fulfilled"]>>;
    buyer: z.ZodObject<{
        email: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodString;
        phone: z.ZodString;
        tcKimlik: z.ZodOptional<z.ZodString>;
        taxId: z.ZodOptional<z.ZodString>;
        taxOffice: z.ZodOptional<z.ZodString>;
        companyName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        phone: string;
        firstName: string;
        lastName: string;
        tcKimlik?: string | undefined;
        taxId?: string | undefined;
        taxOffice?: string | undefined;
        companyName?: string | undefined;
    }, {
        email: string;
        phone: string;
        firstName: string;
        lastName: string;
        tcKimlik?: string | undefined;
        taxId?: string | undefined;
        taxOffice?: string | undefined;
        companyName?: string | undefined;
    }>;
    invoice: z.ZodObject<{
        type: z.ZodEnum<["individual", "corporate"]>;
        documentType: z.ZodDefault<z.ZodEnum<["e_fatura", "e_arsiv"]>>;
        number: z.ZodOptional<z.ZodString>;
        status: z.ZodDefault<z.ZodEnum<["pending", "issued", "cancelled"]>>;
        pdfUrl: z.ZodOptional<z.ZodString>;
        provider: z.ZodOptional<z.ZodString>;
        issuedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "individual" | "corporate";
        status: "cancelled" | "pending" | "issued";
        documentType: "e_fatura" | "e_arsiv";
        number?: string | undefined;
        pdfUrl?: string | undefined;
        provider?: string | undefined;
        issuedAt?: string | undefined;
    }, {
        type: "individual" | "corporate";
        number?: string | undefined;
        status?: "cancelled" | "pending" | "issued" | undefined;
        documentType?: "e_fatura" | "e_arsiv" | undefined;
        pdfUrl?: string | undefined;
        provider?: string | undefined;
        issuedAt?: string | undefined;
    }>;
    lineItems: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        productId: z.ZodString;
        variantId: z.ZodString;
        quantity: z.ZodNumber;
        productName: z.ZodString;
        variantChoices: z.ZodRecord<z.ZodString, z.ZodString>;
        price: z.ZodNumber;
        lineTotal: z.ZodNumber;
        imageUrl: z.ZodOptional<z.ZodString>;
        sku: z.ZodOptional<z.ZodString>;
        weight: z.ZodOptional<z.ZodNumber>;
        taxRate: z.ZodDefault<z.ZodNumber>;
        fulfillmentStatus: z.ZodDefault<z.ZodEnum<["unfulfilled", "fulfilled", "returned"]>>;
    }, "strip", z.ZodTypeAny, {
        productName: string;
        variantChoices: Record<string, string>;
        price: number;
        id: string;
        productId: string;
        variantId: string;
        quantity: number;
        lineTotal: number;
        taxRate: number;
        fulfillmentStatus: "unfulfilled" | "fulfilled" | "returned";
        sku?: string | undefined;
        weight?: number | undefined;
        imageUrl?: string | undefined;
    }, {
        productName: string;
        variantChoices: Record<string, string>;
        price: number;
        id: string;
        productId: string;
        variantId: string;
        quantity: number;
        lineTotal: number;
        sku?: string | undefined;
        weight?: number | undefined;
        imageUrl?: string | undefined;
        taxRate?: number | undefined;
        fulfillmentStatus?: "unfulfilled" | "fulfilled" | "returned" | undefined;
    }>, "many">;
    shippingAddress: z.ZodOptional<z.ZodObject<{
        fullName: z.ZodString;
        addressLine1: z.ZodString;
        addressLine2: z.ZodOptional<z.ZodString>;
        district: z.ZodString;
        city: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodDefault<z.ZodLiteral<"TR">>;
        phone: z.ZodString;
        notes: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        fullName: string;
        addressLine1: string;
        district: string;
        city: string;
        postalCode: string;
        country: "TR";
        phone: string;
        addressLine2?: string | undefined;
        notes?: string | undefined;
    }, {
        fullName: string;
        addressLine1: string;
        district: string;
        city: string;
        postalCode: string;
        phone: string;
        addressLine2?: string | undefined;
        country?: "TR" | undefined;
        notes?: string | undefined;
    }>>;
    billingAddress: z.ZodObject<{
        fullName: z.ZodString;
        addressLine1: z.ZodString;
        addressLine2: z.ZodOptional<z.ZodString>;
        district: z.ZodString;
        city: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodDefault<z.ZodLiteral<"TR">>;
        phone: z.ZodString;
        notes: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        fullName: string;
        addressLine1: string;
        district: string;
        city: string;
        postalCode: string;
        country: "TR";
        phone: string;
        addressLine2?: string | undefined;
        notes?: string | undefined;
    }, {
        fullName: string;
        addressLine1: string;
        district: string;
        city: string;
        postalCode: string;
        phone: string;
        addressLine2?: string | undefined;
        country?: "TR" | undefined;
        notes?: string | undefined;
    }>;
    shipping: z.ZodObject<{
        carrierId: z.ZodString;
        carrierName: z.ZodString;
        trackingNumber: z.ZodOptional<z.ZodString>;
        trackingUrl: z.ZodOptional<z.ZodString>;
        price: z.ZodNumber;
        events: z.ZodDefault<z.ZodArray<z.ZodObject<{
            status: z.ZodString;
            description: z.ZodString;
            location: z.ZodOptional<z.ZodString>;
            timestamp: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            status: string;
            description: string;
            timestamp: string;
            location?: string | undefined;
        }, {
            status: string;
            description: string;
            timestamp: string;
            location?: string | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        price: number;
        carrierId: string;
        carrierName: string;
        events: {
            status: string;
            description: string;
            timestamp: string;
            location?: string | undefined;
        }[];
        trackingNumber?: string | undefined;
        trackingUrl?: string | undefined;
    }, {
        price: number;
        carrierId: string;
        carrierName: string;
        trackingNumber?: string | undefined;
        trackingUrl?: string | undefined;
        events?: {
            status: string;
            description: string;
            timestamp: string;
            location?: string | undefined;
        }[] | undefined;
    }>;
    payment: z.ZodObject<{
        method: z.ZodEnum<["credit_card", "bank_transfer", "cash_on_delivery"]>;
        provider: z.ZodString;
        transactionId: z.ZodOptional<z.ZodString>;
        installmentCount: z.ZodDefault<z.ZodNumber>;
        paidAmount: z.ZodNumber;
        refundedAmount: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        installmentCount: number;
        provider: string;
        method: "credit_card" | "bank_transfer" | "cash_on_delivery";
        paidAmount: number;
        refundedAmount: number;
        transactionId?: string | undefined;
    }, {
        provider: string;
        method: "credit_card" | "bank_transfer" | "cash_on_delivery";
        paidAmount: number;
        installmentCount?: number | undefined;
        transactionId?: string | undefined;
        refundedAmount?: number | undefined;
    }>;
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
    buyerNote: z.ZodOptional<z.ZodString>;
    internalNotes: z.ZodDefault<z.ZodArray<z.ZodObject<{
        text: z.ZodString;
        createdBy: z.ZodString;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        text: string;
        createdBy: string;
    }, {
        createdAt: string;
        text: string;
        createdBy: string;
    }>, "many">>;
    activities: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<["created", "confirmed", "processing", "shipped", "delivered", "cancelled", "refunded", "note_added", "status_changed", "payment_received", "invoice_issued", "tracking_updated"]>;
        description: z.ZodString;
        createdBy: z.ZodEnum<["system", "esnaf", "customer"]>;
        createdAt: z.ZodString;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        type: "created" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded" | "note_added" | "status_changed" | "payment_received" | "invoice_issued" | "tracking_updated";
        id: string;
        createdAt: string;
        description: string;
        createdBy: "customer" | "system" | "esnaf";
        metadata?: Record<string, string> | undefined;
    }, {
        type: "created" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded" | "note_added" | "status_changed" | "payment_received" | "invoice_issued" | "tracking_updated";
        id: string;
        createdAt: string;
        description: string;
        createdBy: "customer" | "system" | "esnaf";
        metadata?: Record<string, string> | undefined;
    }>, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "pending" | "returned";
    id: string;
    shipping: {
        price: number;
        carrierId: string;
        carrierName: string;
        events: {
            status: string;
            description: string;
            timestamp: string;
            location?: string | undefined;
        }[];
        trackingNumber?: string | undefined;
        trackingUrl?: string | undefined;
    };
    esnafId: string;
    purchaseFlowId: string;
    buyer: {
        email: string;
        phone: string;
        firstName: string;
        lastName: string;
        tcKimlik?: string | undefined;
        taxId?: string | undefined;
        taxOffice?: string | undefined;
        companyName?: string | undefined;
    };
    lineItems: {
        productName: string;
        variantChoices: Record<string, string>;
        price: number;
        id: string;
        productId: string;
        variantId: string;
        quantity: number;
        lineTotal: number;
        taxRate: number;
        fulfillmentStatus: "unfulfilled" | "fulfilled" | "returned";
        sku?: string | undefined;
        weight?: number | undefined;
        imageUrl?: string | undefined;
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
    createdAt: string;
    updatedAt: string;
    billingAddress: {
        fullName: string;
        addressLine1: string;
        district: string;
        city: string;
        postalCode: string;
        country: "TR";
        phone: string;
        addressLine2?: string | undefined;
        notes?: string | undefined;
    };
    fulfillmentStatus: "unfulfilled" | "fulfilled" | "partially_fulfilled";
    orderNumber: string;
    paymentStatus: "refunded" | "pending" | "paid" | "partially_paid" | "partially_refunded" | "failed";
    invoice: {
        type: "individual" | "corporate";
        status: "cancelled" | "pending" | "issued";
        documentType: "e_fatura" | "e_arsiv";
        number?: string | undefined;
        pdfUrl?: string | undefined;
        provider?: string | undefined;
        issuedAt?: string | undefined;
    };
    payment: {
        installmentCount: number;
        provider: string;
        method: "credit_card" | "bank_transfer" | "cash_on_delivery";
        paidAmount: number;
        refundedAmount: number;
        transactionId?: string | undefined;
    };
    internalNotes: {
        createdAt: string;
        text: string;
        createdBy: string;
    }[];
    activities: {
        type: "created" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded" | "note_added" | "status_changed" | "payment_received" | "invoice_issued" | "tracking_updated";
        id: string;
        createdAt: string;
        description: string;
        createdBy: "customer" | "system" | "esnaf";
        metadata?: Record<string, string> | undefined;
    }[];
    buyerNote?: string | undefined;
    shippingAddress?: {
        fullName: string;
        addressLine1: string;
        district: string;
        city: string;
        postalCode: string;
        country: "TR";
        phone: string;
        addressLine2?: string | undefined;
        notes?: string | undefined;
    } | undefined;
}, {
    id: string;
    shipping: {
        price: number;
        carrierId: string;
        carrierName: string;
        trackingNumber?: string | undefined;
        trackingUrl?: string | undefined;
        events?: {
            status: string;
            description: string;
            timestamp: string;
            location?: string | undefined;
        }[] | undefined;
    };
    esnafId: string;
    purchaseFlowId: string;
    buyer: {
        email: string;
        phone: string;
        firstName: string;
        lastName: string;
        tcKimlik?: string | undefined;
        taxId?: string | undefined;
        taxOffice?: string | undefined;
        companyName?: string | undefined;
    };
    lineItems: {
        productName: string;
        variantChoices: Record<string, string>;
        price: number;
        id: string;
        productId: string;
        variantId: string;
        quantity: number;
        lineTotal: number;
        sku?: string | undefined;
        weight?: number | undefined;
        imageUrl?: string | undefined;
        taxRate?: number | undefined;
        fulfillmentStatus?: "unfulfilled" | "fulfilled" | "returned" | undefined;
    }[];
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
    billingAddress: {
        fullName: string;
        addressLine1: string;
        district: string;
        city: string;
        postalCode: string;
        phone: string;
        addressLine2?: string | undefined;
        country?: "TR" | undefined;
        notes?: string | undefined;
    };
    orderNumber: string;
    invoice: {
        type: "individual" | "corporate";
        number?: string | undefined;
        status?: "cancelled" | "pending" | "issued" | undefined;
        documentType?: "e_fatura" | "e_arsiv" | undefined;
        pdfUrl?: string | undefined;
        provider?: string | undefined;
        issuedAt?: string | undefined;
    };
    payment: {
        provider: string;
        method: "credit_card" | "bank_transfer" | "cash_on_delivery";
        paidAmount: number;
        installmentCount?: number | undefined;
        transactionId?: string | undefined;
        refundedAmount?: number | undefined;
    };
    status?: "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "pending" | "returned" | undefined;
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
    shippingAddress?: {
        fullName: string;
        addressLine1: string;
        district: string;
        city: string;
        postalCode: string;
        phone: string;
        addressLine2?: string | undefined;
        country?: "TR" | undefined;
        notes?: string | undefined;
    } | undefined;
    fulfillmentStatus?: "unfulfilled" | "fulfilled" | "partially_fulfilled" | undefined;
    paymentStatus?: "refunded" | "pending" | "paid" | "partially_paid" | "partially_refunded" | "failed" | undefined;
    internalNotes?: {
        createdAt: string;
        text: string;
        createdBy: string;
    }[] | undefined;
    activities?: {
        type: "created" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded" | "note_added" | "status_changed" | "payment_received" | "invoice_issued" | "tracking_updated";
        id: string;
        createdAt: string;
        description: string;
        createdBy: "customer" | "system" | "esnaf";
        metadata?: Record<string, string> | undefined;
    }[] | undefined;
}>;
export type Order = z.infer<typeof OrderSchema>;
//# sourceMappingURL=order.d.ts.map