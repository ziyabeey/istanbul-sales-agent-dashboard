/**
 * @kepenk/ecom-schema — Checkout Schema
 * Turkey-native: taksit, 81 il, TC Kimlik / Vergi No, e-Fatura fields.
 */
import { z } from 'zod';
export declare const AddressSchema: z.ZodObject<{
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
export type Address = z.infer<typeof AddressSchema>;
export declare const BuyerInfoSchema: z.ZodObject<{
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
export type BuyerInfo = z.infer<typeof BuyerInfoSchema>;
export declare const InstallmentOptionSchema: z.ZodObject<{
    installmentCount: z.ZodNumber;
    installmentAmount: z.ZodNumber;
    totalAmount: z.ZodNumber;
    interestRate: z.ZodNumber;
    bankName: z.ZodString;
    cardType: z.ZodOptional<z.ZodString>;
    isInterestFree: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    installmentCount: number;
    installmentAmount: number;
    totalAmount: number;
    interestRate: number;
    bankName: string;
    isInterestFree: boolean;
    cardType?: string | undefined;
}, {
    installmentCount: number;
    installmentAmount: number;
    totalAmount: number;
    interestRate: number;
    bankName: string;
    cardType?: string | undefined;
    isInterestFree?: boolean | undefined;
}>;
export type InstallmentOption = z.infer<typeof InstallmentOptionSchema>;
export declare const SelectedShippingSchema: z.ZodObject<{
    carrierId: z.ZodString;
    carrierName: z.ZodString;
    serviceType: z.ZodString;
    price: z.ZodNumber;
    estimatedDelivery: z.ZodString;
}, "strip", z.ZodTypeAny, {
    price: number;
    carrierId: string;
    carrierName: string;
    serviceType: string;
    estimatedDelivery: string;
}, {
    price: number;
    carrierId: string;
    carrierName: string;
    serviceType: string;
    estimatedDelivery: string;
}>;
export type SelectedShipping = z.infer<typeof SelectedShippingSchema>;
export declare const CreditCardPaymentSchema: z.ZodObject<{
    installmentCount: z.ZodDefault<z.ZodNumber>;
    installmentAmount: z.ZodOptional<z.ZodNumber>;
    totalWithInstallment: z.ZodOptional<z.ZodNumber>;
    bankName: z.ZodOptional<z.ZodString>;
    cardType: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    installmentCount: number;
    installmentAmount?: number | undefined;
    bankName?: string | undefined;
    cardType?: string | undefined;
    totalWithInstallment?: number | undefined;
}, {
    installmentCount?: number | undefined;
    installmentAmount?: number | undefined;
    bankName?: string | undefined;
    cardType?: string | undefined;
    totalWithInstallment?: number | undefined;
}>;
export type CreditCardPayment = z.infer<typeof CreditCardPaymentSchema>;
export declare const BankTransferPaymentSchema: z.ZodObject<{
    bankName: z.ZodString;
    iban: z.ZodString;
    referenceNote: z.ZodString;
}, "strip", z.ZodTypeAny, {
    bankName: string;
    iban: string;
    referenceNote: string;
}, {
    bankName: string;
    iban: string;
    referenceNote: string;
}>;
export type BankTransferPayment = z.infer<typeof BankTransferPaymentSchema>;
export declare const CashOnDeliveryPaymentSchema: z.ZodObject<{
    extraCharge: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    extraCharge: number;
}, {
    extraCharge?: number | undefined;
}>;
export type CashOnDeliveryPayment = z.infer<typeof CashOnDeliveryPaymentSchema>;
export declare const PaymentMethodSchema: z.ZodObject<{
    type: z.ZodEnum<["credit_card", "bank_transfer", "cash_on_delivery"]>;
    creditCard: z.ZodOptional<z.ZodObject<{
        installmentCount: z.ZodDefault<z.ZodNumber>;
        installmentAmount: z.ZodOptional<z.ZodNumber>;
        totalWithInstallment: z.ZodOptional<z.ZodNumber>;
        bankName: z.ZodOptional<z.ZodString>;
        cardType: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        installmentCount: number;
        installmentAmount?: number | undefined;
        bankName?: string | undefined;
        cardType?: string | undefined;
        totalWithInstallment?: number | undefined;
    }, {
        installmentCount?: number | undefined;
        installmentAmount?: number | undefined;
        bankName?: string | undefined;
        cardType?: string | undefined;
        totalWithInstallment?: number | undefined;
    }>>;
    bankTransfer: z.ZodOptional<z.ZodObject<{
        bankName: z.ZodString;
        iban: z.ZodString;
        referenceNote: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        bankName: string;
        iban: string;
        referenceNote: string;
    }, {
        bankName: string;
        iban: string;
        referenceNote: string;
    }>>;
    cashOnDelivery: z.ZodOptional<z.ZodObject<{
        extraCharge: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        extraCharge: number;
    }, {
        extraCharge?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    type: "credit_card" | "bank_transfer" | "cash_on_delivery";
    creditCard?: {
        installmentCount: number;
        installmentAmount?: number | undefined;
        bankName?: string | undefined;
        cardType?: string | undefined;
        totalWithInstallment?: number | undefined;
    } | undefined;
    bankTransfer?: {
        bankName: string;
        iban: string;
        referenceNote: string;
    } | undefined;
    cashOnDelivery?: {
        extraCharge: number;
    } | undefined;
}, {
    type: "credit_card" | "bank_transfer" | "cash_on_delivery";
    creditCard?: {
        installmentCount?: number | undefined;
        installmentAmount?: number | undefined;
        bankName?: string | undefined;
        cardType?: string | undefined;
        totalWithInstallment?: number | undefined;
    } | undefined;
    bankTransfer?: {
        bankName: string;
        iban: string;
        referenceNote: string;
    } | undefined;
    cashOnDelivery?: {
        extraCharge?: number | undefined;
    } | undefined;
}>;
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;
export declare const CheckoutLineItemSchema: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
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
}>;
export type CheckoutLineItem = z.infer<typeof CheckoutLineItemSchema>;
export declare const CheckoutSchema: z.ZodObject<{
    id: z.ZodString;
    cartId: z.ZodString;
    purchaseFlowId: z.ZodString;
    esnafId: z.ZodString;
    revision: z.ZodDefault<z.ZodNumber>;
    buyerInfo: z.ZodObject<{
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
    invoiceType: z.ZodDefault<z.ZodEnum<["individual", "corporate"]>>;
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
        sameAsShipping: z.ZodDefault<z.ZodBoolean>;
        address: z.ZodOptional<z.ZodObject<{
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
    }, "strip", z.ZodTypeAny, {
        sameAsShipping: boolean;
        address?: {
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
        sameAsShipping?: boolean | undefined;
        address?: {
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
    }>;
    selectedShipping: z.ZodOptional<z.ZodObject<{
        carrierId: z.ZodString;
        carrierName: z.ZodString;
        serviceType: z.ZodString;
        price: z.ZodNumber;
        estimatedDelivery: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        price: number;
        carrierId: string;
        carrierName: string;
        serviceType: string;
        estimatedDelivery: string;
    }, {
        price: number;
        carrierId: string;
        carrierName: string;
        serviceType: string;
        estimatedDelivery: string;
    }>>;
    paymentMethod: z.ZodOptional<z.ZodObject<{
        type: z.ZodEnum<["credit_card", "bank_transfer", "cash_on_delivery"]>;
        creditCard: z.ZodOptional<z.ZodObject<{
            installmentCount: z.ZodDefault<z.ZodNumber>;
            installmentAmount: z.ZodOptional<z.ZodNumber>;
            totalWithInstallment: z.ZodOptional<z.ZodNumber>;
            bankName: z.ZodOptional<z.ZodString>;
            cardType: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            installmentCount: number;
            installmentAmount?: number | undefined;
            bankName?: string | undefined;
            cardType?: string | undefined;
            totalWithInstallment?: number | undefined;
        }, {
            installmentCount?: number | undefined;
            installmentAmount?: number | undefined;
            bankName?: string | undefined;
            cardType?: string | undefined;
            totalWithInstallment?: number | undefined;
        }>>;
        bankTransfer: z.ZodOptional<z.ZodObject<{
            bankName: z.ZodString;
            iban: z.ZodString;
            referenceNote: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            bankName: string;
            iban: string;
            referenceNote: string;
        }, {
            bankName: string;
            iban: string;
            referenceNote: string;
        }>>;
        cashOnDelivery: z.ZodOptional<z.ZodObject<{
            extraCharge: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            extraCharge: number;
        }, {
            extraCharge?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "credit_card" | "bank_transfer" | "cash_on_delivery";
        creditCard?: {
            installmentCount: number;
            installmentAmount?: number | undefined;
            bankName?: string | undefined;
            cardType?: string | undefined;
            totalWithInstallment?: number | undefined;
        } | undefined;
        bankTransfer?: {
            bankName: string;
            iban: string;
            referenceNote: string;
        } | undefined;
        cashOnDelivery?: {
            extraCharge: number;
        } | undefined;
    }, {
        type: "credit_card" | "bank_transfer" | "cash_on_delivery";
        creditCard?: {
            installmentCount?: number | undefined;
            installmentAmount?: number | undefined;
            bankName?: string | undefined;
            cardType?: string | undefined;
            totalWithInstallment?: number | undefined;
        } | undefined;
        bankTransfer?: {
            bankName: string;
            iban: string;
            referenceNote: string;
        } | undefined;
        cashOnDelivery?: {
            extraCharge?: number | undefined;
        } | undefined;
    }>>;
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
    }, "strip", z.ZodTypeAny, {
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
    }>, "many">;
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
    status: z.ZodDefault<z.ZodEnum<["open", "completed", "expired", "abandoned"]>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    expiresAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "open" | "completed" | "expired" | "abandoned";
    id: string;
    esnafId: string;
    purchaseFlowId: string;
    revision: number;
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
    cartId: string;
    buyerInfo: {
        email: string;
        phone: string;
        firstName: string;
        lastName: string;
        tcKimlik?: string | undefined;
        taxId?: string | undefined;
        taxOffice?: string | undefined;
        companyName?: string | undefined;
    };
    invoiceType: "individual" | "corporate";
    billingAddress: {
        sameAsShipping: boolean;
        address?: {
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
    };
    expiresAt: string;
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
    selectedShipping?: {
        price: number;
        carrierId: string;
        carrierName: string;
        serviceType: string;
        estimatedDelivery: string;
    } | undefined;
    paymentMethod?: {
        type: "credit_card" | "bank_transfer" | "cash_on_delivery";
        creditCard?: {
            installmentCount: number;
            installmentAmount?: number | undefined;
            bankName?: string | undefined;
            cardType?: string | undefined;
            totalWithInstallment?: number | undefined;
        } | undefined;
        bankTransfer?: {
            bankName: string;
            iban: string;
            referenceNote: string;
        } | undefined;
        cashOnDelivery?: {
            extraCharge: number;
        } | undefined;
    } | undefined;
}, {
    id: string;
    esnafId: string;
    purchaseFlowId: string;
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
    cartId: string;
    buyerInfo: {
        email: string;
        phone: string;
        firstName: string;
        lastName: string;
        tcKimlik?: string | undefined;
        taxId?: string | undefined;
        taxOffice?: string | undefined;
        companyName?: string | undefined;
    };
    billingAddress: {
        sameAsShipping?: boolean | undefined;
        address?: {
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
    };
    expiresAt: string;
    status?: "open" | "completed" | "expired" | "abandoned" | undefined;
    revision?: number | undefined;
    appliedDiscounts?: {
        value: number;
        type: "percentage" | "fixed" | "free_shipping";
        id: string;
        name: string;
        discountAmount: number;
        source: "coupon" | "automatic";
        couponCode?: string | undefined;
    }[] | undefined;
    invoiceType?: "individual" | "corporate" | undefined;
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
    selectedShipping?: {
        price: number;
        carrierId: string;
        carrierName: string;
        serviceType: string;
        estimatedDelivery: string;
    } | undefined;
    paymentMethod?: {
        type: "credit_card" | "bank_transfer" | "cash_on_delivery";
        creditCard?: {
            installmentCount?: number | undefined;
            installmentAmount?: number | undefined;
            bankName?: string | undefined;
            cardType?: string | undefined;
            totalWithInstallment?: number | undefined;
        } | undefined;
        bankTransfer?: {
            bankName: string;
            iban: string;
            referenceNote: string;
        } | undefined;
        cashOnDelivery?: {
            extraCharge?: number | undefined;
        } | undefined;
    } | undefined;
}>;
export type Checkout = z.infer<typeof CheckoutSchema>;
//# sourceMappingURL=checkout.d.ts.map