/**
 * @kepenk/ecom-schema — Product & Variant Schemas
 * Turkey-native: KDV dahil fiyat, universal variant model
 */
import { z } from 'zod';
export declare const ProductMediaSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["image", "video"]>;
    url: z.ZodString;
    thumbnailUrl: z.ZodOptional<z.ZodString>;
    alt: z.ZodDefault<z.ZodString>;
    width: z.ZodOptional<z.ZodNumber>;
    height: z.ZodOptional<z.ZodNumber>;
    sortOrder: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    type: "image" | "video";
    url: string;
    id: string;
    alt: string;
    sortOrder: number;
    thumbnailUrl?: string | undefined;
    width?: number | undefined;
    height?: number | undefined;
}, {
    type: "image" | "video";
    url: string;
    id: string;
    alt?: string | undefined;
    sortOrder?: number | undefined;
    thumbnailUrl?: string | undefined;
    width?: number | undefined;
    height?: number | undefined;
}>;
export type ProductMedia = z.infer<typeof ProductMediaSchema>;
export declare const DimensionsSchema: z.ZodObject<{
    length: z.ZodOptional<z.ZodNumber>;
    width: z.ZodOptional<z.ZodNumber>;
    height: z.ZodOptional<z.ZodNumber>;
    unit: z.ZodDefault<z.ZodEnum<["cm", "mm", "m"]>>;
}, "strip", z.ZodTypeAny, {
    unit: "cm" | "mm" | "m";
    length?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
}, {
    length?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
    unit?: "cm" | "mm" | "m" | undefined;
}>;
export type Dimensions = z.infer<typeof DimensionsSchema>;
export declare const DigitalFileSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    url: z.ZodString;
    sizeBytes: z.ZodNumber;
    mimeType: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
    id: string;
    name: string;
    sizeBytes: number;
    mimeType: string;
}, {
    url: string;
    id: string;
    name: string;
    sizeBytes: number;
    mimeType: string;
}>;
export type DigitalFile = z.infer<typeof DigitalFileSchema>;
export declare const ProductOptionSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    type: z.ZodDefault<z.ZodEnum<["color", "size", "custom"]>>;
    choices: z.ZodArray<z.ZodObject<{
        value: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        colorHex: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        description?: string | undefined;
        colorHex?: string | undefined;
    }, {
        value: string;
        description?: string | undefined;
        colorHex?: string | undefined;
    }>, "many">;
    sortOrder: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    type: "custom" | "color" | "size";
    id: string;
    name: string;
    sortOrder: number;
    choices: {
        value: string;
        description?: string | undefined;
        colorHex?: string | undefined;
    }[];
}, {
    id: string;
    name: string;
    choices: {
        value: string;
        description?: string | undefined;
        colorHex?: string | undefined;
    }[];
    type?: "custom" | "color" | "size" | undefined;
    sortOrder?: number | undefined;
}>;
export type ProductOption = z.infer<typeof ProductOptionSchema>;
export declare const ProductModifierSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    type: z.ZodEnum<["text", "select", "checkbox"]>;
    required: z.ZodDefault<z.ZodBoolean>;
    options: z.ZodOptional<z.ZodArray<z.ZodObject<{
        value: z.ZodString;
        priceAdjustment: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        priceAdjustment: number;
    }, {
        value: string;
        priceAdjustment?: number | undefined;
    }>, "many">>;
    maxLength: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    type: "text" | "select" | "checkbox";
    id: string;
    name: string;
    required: boolean;
    options?: {
        value: string;
        priceAdjustment: number;
    }[] | undefined;
    maxLength?: number | undefined;
}, {
    type: "text" | "select" | "checkbox";
    id: string;
    name: string;
    options?: {
        value: string;
        priceAdjustment?: number | undefined;
    }[] | undefined;
    maxLength?: number | undefined;
    required?: boolean | undefined;
}>;
export type ProductModifier = z.infer<typeof ProductModifierSchema>;
export declare const InventorySchema: z.ZodObject<{
    trackQuantity: z.ZodDefault<z.ZodBoolean>;
    quantity: z.ZodDefault<z.ZodNumber>;
    allowBackorder: z.ZodDefault<z.ZodBoolean>;
    lowStockThreshold: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    quantity: number;
    trackQuantity: boolean;
    allowBackorder: boolean;
    lowStockThreshold: number;
}, {
    quantity?: number | undefined;
    trackQuantity?: boolean | undefined;
    allowBackorder?: boolean | undefined;
    lowStockThreshold?: number | undefined;
}>;
export type Inventory = z.infer<typeof InventorySchema>;
export declare const ProductVariantSchema: z.ZodObject<{
    id: z.ZodString;
    productId: z.ZodString;
    choices: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodString>>;
    price: z.ZodNumber;
    compareAtPrice: z.ZodOptional<z.ZodNumber>;
    costPrice: z.ZodOptional<z.ZodNumber>;
    inventory: z.ZodObject<{
        trackQuantity: z.ZodDefault<z.ZodBoolean>;
        quantity: z.ZodDefault<z.ZodNumber>;
        allowBackorder: z.ZodDefault<z.ZodBoolean>;
        lowStockThreshold: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        quantity: number;
        trackQuantity: boolean;
        allowBackorder: boolean;
        lowStockThreshold: number;
    }, {
        quantity?: number | undefined;
        trackQuantity?: boolean | undefined;
        allowBackorder?: boolean | undefined;
        lowStockThreshold?: number | undefined;
    }>;
    sku: z.ZodOptional<z.ZodString>;
    barcode: z.ZodOptional<z.ZodString>;
    weight: z.ZodOptional<z.ZodNumber>;
    mediaId: z.ZodOptional<z.ZodString>;
    digitalFileId: z.ZodOptional<z.ZodString>;
    visible: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    price: number;
    id: string;
    productId: string;
    choices: Record<string, string>;
    inventory: {
        quantity: number;
        trackQuantity: boolean;
        allowBackorder: boolean;
        lowStockThreshold: number;
    };
    visible: boolean;
    compareAtPrice?: number | undefined;
    sku?: string | undefined;
    weight?: number | undefined;
    costPrice?: number | undefined;
    barcode?: string | undefined;
    mediaId?: string | undefined;
    digitalFileId?: string | undefined;
}, {
    price: number;
    id: string;
    productId: string;
    inventory: {
        quantity?: number | undefined;
        trackQuantity?: boolean | undefined;
        allowBackorder?: boolean | undefined;
        lowStockThreshold?: number | undefined;
    };
    compareAtPrice?: number | undefined;
    sku?: string | undefined;
    weight?: number | undefined;
    choices?: Record<string, string> | undefined;
    costPrice?: number | undefined;
    barcode?: string | undefined;
    mediaId?: string | undefined;
    digitalFileId?: string | undefined;
    visible?: boolean | undefined;
}>;
export type ProductVariant = z.infer<typeof ProductVariantSchema>;
export declare const InfoSectionSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export type InfoSection = z.infer<typeof InfoSectionSchema>;
export declare const CustomFieldSchema: z.ZodObject<{
    name: z.ZodString;
    required: z.ZodDefault<z.ZodBoolean>;
    type: z.ZodEnum<["text", "number", "select"]>;
    options: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    type: "number" | "text" | "select";
    name: string;
    required: boolean;
    options?: string[] | undefined;
}, {
    type: "number" | "text" | "select";
    name: string;
    options?: string[] | undefined;
    required?: boolean | undefined;
}>;
export type CustomField = z.infer<typeof CustomFieldSchema>;
export declare const TaxConfigSchema: z.ZodObject<{
    rate: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<1>, z.ZodLiteral<10>, z.ZodLiteral<20>]>>;
    includedInPrice: z.ZodDefault<z.ZodLiteral<true>>;
}, "strip", z.ZodTypeAny, {
    rate: 1 | 10 | 20;
    includedInPrice: true;
}, {
    rate?: 1 | 10 | 20 | undefined;
    includedInPrice?: true | undefined;
}>;
export type TaxConfig = z.infer<typeof TaxConfigSchema>;
export declare const ProductSEOSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    slug: z.ZodString;
}, "strip", z.ZodTypeAny, {
    slug: string;
    description?: string | undefined;
    title?: string | undefined;
}, {
    slug: string;
    description?: string | undefined;
    title?: string | undefined;
}>;
export type ProductSEO = z.infer<typeof ProductSEOSchema>;
export declare const ProductAiMetaSchema: z.ZodObject<{
    generatedDescription: z.ZodDefault<z.ZodBoolean>;
    suggestedPrice: z.ZodOptional<z.ZodNumber>;
    seoScore: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    generatedDescription: boolean;
    suggestedPrice?: number | undefined;
    seoScore?: number | undefined;
}, {
    generatedDescription?: boolean | undefined;
    suggestedPrice?: number | undefined;
    seoScore?: number | undefined;
}>;
export type ProductAiMeta = z.infer<typeof ProductAiMetaSchema>;
export declare const ProductSchema: z.ZodObject<{
    id: z.ZodString;
    esnafId: z.ZodString;
    handle: z.ZodString;
    numericId: z.ZodNumber;
    revision: z.ZodDefault<z.ZodNumber>;
    name: z.ZodString;
    description: z.ZodDefault<z.ZodString>;
    shortDescription: z.ZodOptional<z.ZodString>;
    productType: z.ZodEnum<["physical", "digital", "service"]>;
    sectorId: z.ZodString;
    priceRange: z.ZodObject<{
        min: z.ZodNumber;
        max: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        min: number;
        max: number;
    }, {
        min: number;
        max: number;
    }>;
    currency: z.ZodDefault<z.ZodLiteral<"TRY">>;
    taxConfig: z.ZodObject<{
        rate: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<1>, z.ZodLiteral<10>, z.ZodLiteral<20>]>>;
        includedInPrice: z.ZodDefault<z.ZodLiteral<true>>;
    }, "strip", z.ZodTypeAny, {
        rate: 1 | 10 | 20;
        includedInPrice: true;
    }, {
        rate?: 1 | 10 | 20 | undefined;
        includedInPrice?: true | undefined;
    }>;
    media: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<["image", "video"]>;
        url: z.ZodString;
        thumbnailUrl: z.ZodOptional<z.ZodString>;
        alt: z.ZodDefault<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
        sortOrder: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        type: "image" | "video";
        url: string;
        id: string;
        alt: string;
        sortOrder: number;
        thumbnailUrl?: string | undefined;
        width?: number | undefined;
        height?: number | undefined;
    }, {
        type: "image" | "video";
        url: string;
        id: string;
        alt?: string | undefined;
        sortOrder?: number | undefined;
        thumbnailUrl?: string | undefined;
        width?: number | undefined;
        height?: number | undefined;
    }>, "many">>;
    mainMediaIndex: z.ZodDefault<z.ZodNumber>;
    options: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        type: z.ZodDefault<z.ZodEnum<["color", "size", "custom"]>>;
        choices: z.ZodArray<z.ZodObject<{
            value: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            colorHex: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            value: string;
            description?: string | undefined;
            colorHex?: string | undefined;
        }, {
            value: string;
            description?: string | undefined;
            colorHex?: string | undefined;
        }>, "many">;
        sortOrder: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        type: "custom" | "color" | "size";
        id: string;
        name: string;
        sortOrder: number;
        choices: {
            value: string;
            description?: string | undefined;
            colorHex?: string | undefined;
        }[];
    }, {
        id: string;
        name: string;
        choices: {
            value: string;
            description?: string | undefined;
            colorHex?: string | undefined;
        }[];
        type?: "custom" | "color" | "size" | undefined;
        sortOrder?: number | undefined;
    }>, "many">>;
    variants: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        productId: z.ZodString;
        choices: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodString>>;
        price: z.ZodNumber;
        compareAtPrice: z.ZodOptional<z.ZodNumber>;
        costPrice: z.ZodOptional<z.ZodNumber>;
        inventory: z.ZodObject<{
            trackQuantity: z.ZodDefault<z.ZodBoolean>;
            quantity: z.ZodDefault<z.ZodNumber>;
            allowBackorder: z.ZodDefault<z.ZodBoolean>;
            lowStockThreshold: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            quantity: number;
            trackQuantity: boolean;
            allowBackorder: boolean;
            lowStockThreshold: number;
        }, {
            quantity?: number | undefined;
            trackQuantity?: boolean | undefined;
            allowBackorder?: boolean | undefined;
            lowStockThreshold?: number | undefined;
        }>;
        sku: z.ZodOptional<z.ZodString>;
        barcode: z.ZodOptional<z.ZodString>;
        weight: z.ZodOptional<z.ZodNumber>;
        mediaId: z.ZodOptional<z.ZodString>;
        digitalFileId: z.ZodOptional<z.ZodString>;
        visible: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        price: number;
        id: string;
        productId: string;
        choices: Record<string, string>;
        inventory: {
            quantity: number;
            trackQuantity: boolean;
            allowBackorder: boolean;
            lowStockThreshold: number;
        };
        visible: boolean;
        compareAtPrice?: number | undefined;
        sku?: string | undefined;
        weight?: number | undefined;
        costPrice?: number | undefined;
        barcode?: string | undefined;
        mediaId?: string | undefined;
        digitalFileId?: string | undefined;
    }, {
        price: number;
        id: string;
        productId: string;
        inventory: {
            quantity?: number | undefined;
            trackQuantity?: boolean | undefined;
            allowBackorder?: boolean | undefined;
            lowStockThreshold?: number | undefined;
        };
        compareAtPrice?: number | undefined;
        sku?: string | undefined;
        weight?: number | undefined;
        choices?: Record<string, string> | undefined;
        costPrice?: number | undefined;
        barcode?: string | undefined;
        mediaId?: string | undefined;
        digitalFileId?: string | undefined;
        visible?: boolean | undefined;
    }>, "many">;
    modifiers: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        type: z.ZodEnum<["text", "select", "checkbox"]>;
        required: z.ZodDefault<z.ZodBoolean>;
        options: z.ZodOptional<z.ZodArray<z.ZodObject<{
            value: z.ZodString;
            priceAdjustment: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            value: string;
            priceAdjustment: number;
        }, {
            value: string;
            priceAdjustment?: number | undefined;
        }>, "many">>;
        maxLength: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        type: "text" | "select" | "checkbox";
        id: string;
        name: string;
        required: boolean;
        options?: {
            value: string;
            priceAdjustment: number;
        }[] | undefined;
        maxLength?: number | undefined;
    }, {
        type: "text" | "select" | "checkbox";
        id: string;
        name: string;
        options?: {
            value: string;
            priceAdjustment?: number | undefined;
        }[] | undefined;
        maxLength?: number | undefined;
        required?: boolean | undefined;
    }>, "many">>;
    categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    mainCategoryId: z.ZodOptional<z.ZodString>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    ribbon: z.ZodOptional<z.ZodString>;
    seo: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        slug: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        description?: string | undefined;
        title?: string | undefined;
    }, {
        slug: string;
        description?: string | undefined;
        title?: string | undefined;
    }>;
    physical: z.ZodOptional<z.ZodObject<{
        weight: z.ZodOptional<z.ZodNumber>;
        dimensions: z.ZodOptional<z.ZodObject<{
            length: z.ZodOptional<z.ZodNumber>;
            width: z.ZodOptional<z.ZodNumber>;
            height: z.ZodOptional<z.ZodNumber>;
            unit: z.ZodDefault<z.ZodEnum<["cm", "mm", "m"]>>;
        }, "strip", z.ZodTypeAny, {
            unit: "cm" | "mm" | "m";
            length?: number | undefined;
            width?: number | undefined;
            height?: number | undefined;
        }, {
            length?: number | undefined;
            width?: number | undefined;
            height?: number | undefined;
            unit?: "cm" | "mm" | "m" | undefined;
        }>>;
        sku: z.ZodOptional<z.ZodString>;
        barcode: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        sku?: string | undefined;
        weight?: number | undefined;
        barcode?: string | undefined;
        dimensions?: {
            unit: "cm" | "mm" | "m";
            length?: number | undefined;
            width?: number | undefined;
            height?: number | undefined;
        } | undefined;
    }, {
        sku?: string | undefined;
        weight?: number | undefined;
        barcode?: string | undefined;
        dimensions?: {
            length?: number | undefined;
            width?: number | undefined;
            height?: number | undefined;
            unit?: "cm" | "mm" | "m" | undefined;
        } | undefined;
    }>>;
    digital: z.ZodOptional<z.ZodObject<{
        files: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            url: z.ZodString;
            sizeBytes: z.ZodNumber;
            mimeType: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
            id: string;
            name: string;
            sizeBytes: number;
            mimeType: string;
        }, {
            url: string;
            id: string;
            name: string;
            sizeBytes: number;
            mimeType: string;
        }>, "many">;
        downloadExpiry: z.ZodDefault<z.ZodNumber>;
        maxDownloads: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        files: {
            url: string;
            id: string;
            name: string;
            sizeBytes: number;
            mimeType: string;
        }[];
        downloadExpiry: number;
        maxDownloads: number;
    }, {
        files: {
            url: string;
            id: string;
            name: string;
            sizeBytes: number;
            mimeType: string;
        }[];
        downloadExpiry?: number | undefined;
        maxDownloads?: number | undefined;
    }>>;
    service: z.ZodOptional<z.ZodObject<{
        duration: z.ZodNumber;
        bookingType: z.ZodEnum<["appointment", "class"]>;
        location: z.ZodEnum<["business", "customer", "online"]>;
    }, "strip", z.ZodTypeAny, {
        duration: number;
        bookingType: "appointment" | "class";
        location: "business" | "customer" | "online";
    }, {
        duration: number;
        bookingType: "appointment" | "class";
        location: "business" | "customer" | "online";
    }>>;
    infoSections: z.ZodDefault<z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        content: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        title: string;
        content: string;
    }, {
        title: string;
        content: string;
    }>, "many">>;
    customFields: z.ZodDefault<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        required: z.ZodDefault<z.ZodBoolean>;
        type: z.ZodEnum<["text", "number", "select"]>;
        options: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        type: "number" | "text" | "select";
        name: string;
        required: boolean;
        options?: string[] | undefined;
    }, {
        type: "number" | "text" | "select";
        name: string;
        options?: string[] | undefined;
        required?: boolean | undefined;
    }>, "many">>;
    status: z.ZodDefault<z.ZodEnum<["active", "draft", "archived"]>>;
    visibility: z.ZodDefault<z.ZodEnum<["visible", "hidden"]>>;
    aiMeta: z.ZodOptional<z.ZodObject<{
        generatedDescription: z.ZodDefault<z.ZodBoolean>;
        suggestedPrice: z.ZodOptional<z.ZodNumber>;
        seoScore: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        generatedDescription: boolean;
        suggestedPrice?: number | undefined;
        seoScore?: number | undefined;
    }, {
        generatedDescription?: boolean | undefined;
        suggestedPrice?: number | undefined;
        seoScore?: number | undefined;
    }>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    options: {
        type: "custom" | "color" | "size";
        id: string;
        name: string;
        sortOrder: number;
        choices: {
            value: string;
            description?: string | undefined;
            colorHex?: string | undefined;
        }[];
    }[];
    status: "active" | "draft" | "archived";
    productType: "physical" | "digital" | "service";
    id: string;
    name: string;
    esnafId: string;
    revision: number;
    currency: "TRY";
    createdAt: string;
    updatedAt: string;
    description: string;
    handle: string;
    numericId: number;
    sectorId: string;
    priceRange: {
        min: number;
        max: number;
    };
    taxConfig: {
        rate: 1 | 10 | 20;
        includedInPrice: true;
    };
    media: {
        type: "image" | "video";
        url: string;
        id: string;
        alt: string;
        sortOrder: number;
        thumbnailUrl?: string | undefined;
        width?: number | undefined;
        height?: number | undefined;
    }[];
    mainMediaIndex: number;
    variants: {
        price: number;
        id: string;
        productId: string;
        choices: Record<string, string>;
        inventory: {
            quantity: number;
            trackQuantity: boolean;
            allowBackorder: boolean;
            lowStockThreshold: number;
        };
        visible: boolean;
        compareAtPrice?: number | undefined;
        sku?: string | undefined;
        weight?: number | undefined;
        costPrice?: number | undefined;
        barcode?: string | undefined;
        mediaId?: string | undefined;
        digitalFileId?: string | undefined;
    }[];
    modifiers: {
        type: "text" | "select" | "checkbox";
        id: string;
        name: string;
        required: boolean;
        options?: {
            value: string;
            priceAdjustment: number;
        }[] | undefined;
        maxLength?: number | undefined;
    }[];
    categoryIds: string[];
    tags: string[];
    seo: {
        slug: string;
        description?: string | undefined;
        title?: string | undefined;
    };
    infoSections: {
        title: string;
        content: string;
    }[];
    customFields: {
        type: "number" | "text" | "select";
        name: string;
        required: boolean;
        options?: string[] | undefined;
    }[];
    visibility: "visible" | "hidden";
    physical?: {
        sku?: string | undefined;
        weight?: number | undefined;
        barcode?: string | undefined;
        dimensions?: {
            unit: "cm" | "mm" | "m";
            length?: number | undefined;
            width?: number | undefined;
            height?: number | undefined;
        } | undefined;
    } | undefined;
    digital?: {
        files: {
            url: string;
            id: string;
            name: string;
            sizeBytes: number;
            mimeType: string;
        }[];
        downloadExpiry: number;
        maxDownloads: number;
    } | undefined;
    service?: {
        duration: number;
        bookingType: "appointment" | "class";
        location: "business" | "customer" | "online";
    } | undefined;
    shortDescription?: string | undefined;
    mainCategoryId?: string | undefined;
    ribbon?: string | undefined;
    aiMeta?: {
        generatedDescription: boolean;
        suggestedPrice?: number | undefined;
        seoScore?: number | undefined;
    } | undefined;
}, {
    productType: "physical" | "digital" | "service";
    id: string;
    name: string;
    esnafId: string;
    createdAt: string;
    updatedAt: string;
    handle: string;
    numericId: number;
    sectorId: string;
    priceRange: {
        min: number;
        max: number;
    };
    taxConfig: {
        rate?: 1 | 10 | 20 | undefined;
        includedInPrice?: true | undefined;
    };
    variants: {
        price: number;
        id: string;
        productId: string;
        inventory: {
            quantity?: number | undefined;
            trackQuantity?: boolean | undefined;
            allowBackorder?: boolean | undefined;
            lowStockThreshold?: number | undefined;
        };
        compareAtPrice?: number | undefined;
        sku?: string | undefined;
        weight?: number | undefined;
        choices?: Record<string, string> | undefined;
        costPrice?: number | undefined;
        barcode?: string | undefined;
        mediaId?: string | undefined;
        digitalFileId?: string | undefined;
        visible?: boolean | undefined;
    }[];
    seo: {
        slug: string;
        description?: string | undefined;
        title?: string | undefined;
    };
    options?: {
        id: string;
        name: string;
        choices: {
            value: string;
            description?: string | undefined;
            colorHex?: string | undefined;
        }[];
        type?: "custom" | "color" | "size" | undefined;
        sortOrder?: number | undefined;
    }[] | undefined;
    status?: "active" | "draft" | "archived" | undefined;
    physical?: {
        sku?: string | undefined;
        weight?: number | undefined;
        barcode?: string | undefined;
        dimensions?: {
            length?: number | undefined;
            width?: number | undefined;
            height?: number | undefined;
            unit?: "cm" | "mm" | "m" | undefined;
        } | undefined;
    } | undefined;
    digital?: {
        files: {
            url: string;
            id: string;
            name: string;
            sizeBytes: number;
            mimeType: string;
        }[];
        downloadExpiry?: number | undefined;
        maxDownloads?: number | undefined;
    } | undefined;
    service?: {
        duration: number;
        bookingType: "appointment" | "class";
        location: "business" | "customer" | "online";
    } | undefined;
    revision?: number | undefined;
    currency?: "TRY" | undefined;
    description?: string | undefined;
    shortDescription?: string | undefined;
    media?: {
        type: "image" | "video";
        url: string;
        id: string;
        alt?: string | undefined;
        sortOrder?: number | undefined;
        thumbnailUrl?: string | undefined;
        width?: number | undefined;
        height?: number | undefined;
    }[] | undefined;
    mainMediaIndex?: number | undefined;
    modifiers?: {
        type: "text" | "select" | "checkbox";
        id: string;
        name: string;
        options?: {
            value: string;
            priceAdjustment?: number | undefined;
        }[] | undefined;
        maxLength?: number | undefined;
        required?: boolean | undefined;
    }[] | undefined;
    categoryIds?: string[] | undefined;
    mainCategoryId?: string | undefined;
    tags?: string[] | undefined;
    ribbon?: string | undefined;
    infoSections?: {
        title: string;
        content: string;
    }[] | undefined;
    customFields?: {
        type: "number" | "text" | "select";
        name: string;
        options?: string[] | undefined;
        required?: boolean | undefined;
    }[] | undefined;
    visibility?: "visible" | "hidden" | undefined;
    aiMeta?: {
        generatedDescription?: boolean | undefined;
        suggestedPrice?: number | undefined;
        seoScore?: number | undefined;
    } | undefined;
}>;
export type Product = z.infer<typeof ProductSchema>;
export declare const CreateProductSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    esnafId: z.ZodString;
    handle: z.ZodString;
    numericId: z.ZodNumber;
    revision: z.ZodDefault<z.ZodNumber>;
    name: z.ZodString;
    description: z.ZodDefault<z.ZodString>;
    shortDescription: z.ZodOptional<z.ZodString>;
    productType: z.ZodEnum<["physical", "digital", "service"]>;
    sectorId: z.ZodString;
    priceRange: z.ZodObject<{
        min: z.ZodNumber;
        max: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        min: number;
        max: number;
    }, {
        min: number;
        max: number;
    }>;
    currency: z.ZodDefault<z.ZodLiteral<"TRY">>;
    taxConfig: z.ZodObject<{
        rate: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<1>, z.ZodLiteral<10>, z.ZodLiteral<20>]>>;
        includedInPrice: z.ZodDefault<z.ZodLiteral<true>>;
    }, "strip", z.ZodTypeAny, {
        rate: 1 | 10 | 20;
        includedInPrice: true;
    }, {
        rate?: 1 | 10 | 20 | undefined;
        includedInPrice?: true | undefined;
    }>;
    media: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<["image", "video"]>;
        url: z.ZodString;
        thumbnailUrl: z.ZodOptional<z.ZodString>;
        alt: z.ZodDefault<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
        sortOrder: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        type: "image" | "video";
        url: string;
        id: string;
        alt: string;
        sortOrder: number;
        thumbnailUrl?: string | undefined;
        width?: number | undefined;
        height?: number | undefined;
    }, {
        type: "image" | "video";
        url: string;
        id: string;
        alt?: string | undefined;
        sortOrder?: number | undefined;
        thumbnailUrl?: string | undefined;
        width?: number | undefined;
        height?: number | undefined;
    }>, "many">>;
    mainMediaIndex: z.ZodDefault<z.ZodNumber>;
    options: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        type: z.ZodDefault<z.ZodEnum<["color", "size", "custom"]>>;
        choices: z.ZodArray<z.ZodObject<{
            value: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            colorHex: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            value: string;
            description?: string | undefined;
            colorHex?: string | undefined;
        }, {
            value: string;
            description?: string | undefined;
            colorHex?: string | undefined;
        }>, "many">;
        sortOrder: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        type: "custom" | "color" | "size";
        id: string;
        name: string;
        sortOrder: number;
        choices: {
            value: string;
            description?: string | undefined;
            colorHex?: string | undefined;
        }[];
    }, {
        id: string;
        name: string;
        choices: {
            value: string;
            description?: string | undefined;
            colorHex?: string | undefined;
        }[];
        type?: "custom" | "color" | "size" | undefined;
        sortOrder?: number | undefined;
    }>, "many">>;
    variants: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        productId: z.ZodString;
        choices: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodString>>;
        price: z.ZodNumber;
        compareAtPrice: z.ZodOptional<z.ZodNumber>;
        costPrice: z.ZodOptional<z.ZodNumber>;
        inventory: z.ZodObject<{
            trackQuantity: z.ZodDefault<z.ZodBoolean>;
            quantity: z.ZodDefault<z.ZodNumber>;
            allowBackorder: z.ZodDefault<z.ZodBoolean>;
            lowStockThreshold: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            quantity: number;
            trackQuantity: boolean;
            allowBackorder: boolean;
            lowStockThreshold: number;
        }, {
            quantity?: number | undefined;
            trackQuantity?: boolean | undefined;
            allowBackorder?: boolean | undefined;
            lowStockThreshold?: number | undefined;
        }>;
        sku: z.ZodOptional<z.ZodString>;
        barcode: z.ZodOptional<z.ZodString>;
        weight: z.ZodOptional<z.ZodNumber>;
        mediaId: z.ZodOptional<z.ZodString>;
        digitalFileId: z.ZodOptional<z.ZodString>;
        visible: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        price: number;
        id: string;
        productId: string;
        choices: Record<string, string>;
        inventory: {
            quantity: number;
            trackQuantity: boolean;
            allowBackorder: boolean;
            lowStockThreshold: number;
        };
        visible: boolean;
        compareAtPrice?: number | undefined;
        sku?: string | undefined;
        weight?: number | undefined;
        costPrice?: number | undefined;
        barcode?: string | undefined;
        mediaId?: string | undefined;
        digitalFileId?: string | undefined;
    }, {
        price: number;
        id: string;
        productId: string;
        inventory: {
            quantity?: number | undefined;
            trackQuantity?: boolean | undefined;
            allowBackorder?: boolean | undefined;
            lowStockThreshold?: number | undefined;
        };
        compareAtPrice?: number | undefined;
        sku?: string | undefined;
        weight?: number | undefined;
        choices?: Record<string, string> | undefined;
        costPrice?: number | undefined;
        barcode?: string | undefined;
        mediaId?: string | undefined;
        digitalFileId?: string | undefined;
        visible?: boolean | undefined;
    }>, "many">;
    modifiers: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        type: z.ZodEnum<["text", "select", "checkbox"]>;
        required: z.ZodDefault<z.ZodBoolean>;
        options: z.ZodOptional<z.ZodArray<z.ZodObject<{
            value: z.ZodString;
            priceAdjustment: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            value: string;
            priceAdjustment: number;
        }, {
            value: string;
            priceAdjustment?: number | undefined;
        }>, "many">>;
        maxLength: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        type: "text" | "select" | "checkbox";
        id: string;
        name: string;
        required: boolean;
        options?: {
            value: string;
            priceAdjustment: number;
        }[] | undefined;
        maxLength?: number | undefined;
    }, {
        type: "text" | "select" | "checkbox";
        id: string;
        name: string;
        options?: {
            value: string;
            priceAdjustment?: number | undefined;
        }[] | undefined;
        maxLength?: number | undefined;
        required?: boolean | undefined;
    }>, "many">>;
    categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    mainCategoryId: z.ZodOptional<z.ZodString>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    ribbon: z.ZodOptional<z.ZodString>;
    seo: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        slug: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        description?: string | undefined;
        title?: string | undefined;
    }, {
        slug: string;
        description?: string | undefined;
        title?: string | undefined;
    }>;
    physical: z.ZodOptional<z.ZodObject<{
        weight: z.ZodOptional<z.ZodNumber>;
        dimensions: z.ZodOptional<z.ZodObject<{
            length: z.ZodOptional<z.ZodNumber>;
            width: z.ZodOptional<z.ZodNumber>;
            height: z.ZodOptional<z.ZodNumber>;
            unit: z.ZodDefault<z.ZodEnum<["cm", "mm", "m"]>>;
        }, "strip", z.ZodTypeAny, {
            unit: "cm" | "mm" | "m";
            length?: number | undefined;
            width?: number | undefined;
            height?: number | undefined;
        }, {
            length?: number | undefined;
            width?: number | undefined;
            height?: number | undefined;
            unit?: "cm" | "mm" | "m" | undefined;
        }>>;
        sku: z.ZodOptional<z.ZodString>;
        barcode: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        sku?: string | undefined;
        weight?: number | undefined;
        barcode?: string | undefined;
        dimensions?: {
            unit: "cm" | "mm" | "m";
            length?: number | undefined;
            width?: number | undefined;
            height?: number | undefined;
        } | undefined;
    }, {
        sku?: string | undefined;
        weight?: number | undefined;
        barcode?: string | undefined;
        dimensions?: {
            length?: number | undefined;
            width?: number | undefined;
            height?: number | undefined;
            unit?: "cm" | "mm" | "m" | undefined;
        } | undefined;
    }>>;
    digital: z.ZodOptional<z.ZodObject<{
        files: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            url: z.ZodString;
            sizeBytes: z.ZodNumber;
            mimeType: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
            id: string;
            name: string;
            sizeBytes: number;
            mimeType: string;
        }, {
            url: string;
            id: string;
            name: string;
            sizeBytes: number;
            mimeType: string;
        }>, "many">;
        downloadExpiry: z.ZodDefault<z.ZodNumber>;
        maxDownloads: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        files: {
            url: string;
            id: string;
            name: string;
            sizeBytes: number;
            mimeType: string;
        }[];
        downloadExpiry: number;
        maxDownloads: number;
    }, {
        files: {
            url: string;
            id: string;
            name: string;
            sizeBytes: number;
            mimeType: string;
        }[];
        downloadExpiry?: number | undefined;
        maxDownloads?: number | undefined;
    }>>;
    service: z.ZodOptional<z.ZodObject<{
        duration: z.ZodNumber;
        bookingType: z.ZodEnum<["appointment", "class"]>;
        location: z.ZodEnum<["business", "customer", "online"]>;
    }, "strip", z.ZodTypeAny, {
        duration: number;
        bookingType: "appointment" | "class";
        location: "business" | "customer" | "online";
    }, {
        duration: number;
        bookingType: "appointment" | "class";
        location: "business" | "customer" | "online";
    }>>;
    infoSections: z.ZodDefault<z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        content: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        title: string;
        content: string;
    }, {
        title: string;
        content: string;
    }>, "many">>;
    customFields: z.ZodDefault<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        required: z.ZodDefault<z.ZodBoolean>;
        type: z.ZodEnum<["text", "number", "select"]>;
        options: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        type: "number" | "text" | "select";
        name: string;
        required: boolean;
        options?: string[] | undefined;
    }, {
        type: "number" | "text" | "select";
        name: string;
        options?: string[] | undefined;
        required?: boolean | undefined;
    }>, "many">>;
    status: z.ZodDefault<z.ZodEnum<["active", "draft", "archived"]>>;
    visibility: z.ZodDefault<z.ZodEnum<["visible", "hidden"]>>;
    aiMeta: z.ZodOptional<z.ZodObject<{
        generatedDescription: z.ZodDefault<z.ZodBoolean>;
        suggestedPrice: z.ZodOptional<z.ZodNumber>;
        seoScore: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        generatedDescription: boolean;
        suggestedPrice?: number | undefined;
        seoScore?: number | undefined;
    }, {
        generatedDescription?: boolean | undefined;
        suggestedPrice?: number | undefined;
        seoScore?: number | undefined;
    }>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "id" | "revision" | "createdAt" | "updatedAt" | "numericId" | "priceRange">, "strip", z.ZodTypeAny, {
    options: {
        type: "custom" | "color" | "size";
        id: string;
        name: string;
        sortOrder: number;
        choices: {
            value: string;
            description?: string | undefined;
            colorHex?: string | undefined;
        }[];
    }[];
    status: "active" | "draft" | "archived";
    productType: "physical" | "digital" | "service";
    name: string;
    esnafId: string;
    currency: "TRY";
    description: string;
    handle: string;
    sectorId: string;
    taxConfig: {
        rate: 1 | 10 | 20;
        includedInPrice: true;
    };
    media: {
        type: "image" | "video";
        url: string;
        id: string;
        alt: string;
        sortOrder: number;
        thumbnailUrl?: string | undefined;
        width?: number | undefined;
        height?: number | undefined;
    }[];
    mainMediaIndex: number;
    variants: {
        price: number;
        id: string;
        productId: string;
        choices: Record<string, string>;
        inventory: {
            quantity: number;
            trackQuantity: boolean;
            allowBackorder: boolean;
            lowStockThreshold: number;
        };
        visible: boolean;
        compareAtPrice?: number | undefined;
        sku?: string | undefined;
        weight?: number | undefined;
        costPrice?: number | undefined;
        barcode?: string | undefined;
        mediaId?: string | undefined;
        digitalFileId?: string | undefined;
    }[];
    modifiers: {
        type: "text" | "select" | "checkbox";
        id: string;
        name: string;
        required: boolean;
        options?: {
            value: string;
            priceAdjustment: number;
        }[] | undefined;
        maxLength?: number | undefined;
    }[];
    categoryIds: string[];
    tags: string[];
    seo: {
        slug: string;
        description?: string | undefined;
        title?: string | undefined;
    };
    infoSections: {
        title: string;
        content: string;
    }[];
    customFields: {
        type: "number" | "text" | "select";
        name: string;
        required: boolean;
        options?: string[] | undefined;
    }[];
    visibility: "visible" | "hidden";
    physical?: {
        sku?: string | undefined;
        weight?: number | undefined;
        barcode?: string | undefined;
        dimensions?: {
            unit: "cm" | "mm" | "m";
            length?: number | undefined;
            width?: number | undefined;
            height?: number | undefined;
        } | undefined;
    } | undefined;
    digital?: {
        files: {
            url: string;
            id: string;
            name: string;
            sizeBytes: number;
            mimeType: string;
        }[];
        downloadExpiry: number;
        maxDownloads: number;
    } | undefined;
    service?: {
        duration: number;
        bookingType: "appointment" | "class";
        location: "business" | "customer" | "online";
    } | undefined;
    shortDescription?: string | undefined;
    mainCategoryId?: string | undefined;
    ribbon?: string | undefined;
    aiMeta?: {
        generatedDescription: boolean;
        suggestedPrice?: number | undefined;
        seoScore?: number | undefined;
    } | undefined;
}, {
    productType: "physical" | "digital" | "service";
    name: string;
    esnafId: string;
    handle: string;
    sectorId: string;
    taxConfig: {
        rate?: 1 | 10 | 20 | undefined;
        includedInPrice?: true | undefined;
    };
    variants: {
        price: number;
        id: string;
        productId: string;
        inventory: {
            quantity?: number | undefined;
            trackQuantity?: boolean | undefined;
            allowBackorder?: boolean | undefined;
            lowStockThreshold?: number | undefined;
        };
        compareAtPrice?: number | undefined;
        sku?: string | undefined;
        weight?: number | undefined;
        choices?: Record<string, string> | undefined;
        costPrice?: number | undefined;
        barcode?: string | undefined;
        mediaId?: string | undefined;
        digitalFileId?: string | undefined;
        visible?: boolean | undefined;
    }[];
    seo: {
        slug: string;
        description?: string | undefined;
        title?: string | undefined;
    };
    options?: {
        id: string;
        name: string;
        choices: {
            value: string;
            description?: string | undefined;
            colorHex?: string | undefined;
        }[];
        type?: "custom" | "color" | "size" | undefined;
        sortOrder?: number | undefined;
    }[] | undefined;
    status?: "active" | "draft" | "archived" | undefined;
    physical?: {
        sku?: string | undefined;
        weight?: number | undefined;
        barcode?: string | undefined;
        dimensions?: {
            length?: number | undefined;
            width?: number | undefined;
            height?: number | undefined;
            unit?: "cm" | "mm" | "m" | undefined;
        } | undefined;
    } | undefined;
    digital?: {
        files: {
            url: string;
            id: string;
            name: string;
            sizeBytes: number;
            mimeType: string;
        }[];
        downloadExpiry?: number | undefined;
        maxDownloads?: number | undefined;
    } | undefined;
    service?: {
        duration: number;
        bookingType: "appointment" | "class";
        location: "business" | "customer" | "online";
    } | undefined;
    currency?: "TRY" | undefined;
    description?: string | undefined;
    shortDescription?: string | undefined;
    media?: {
        type: "image" | "video";
        url: string;
        id: string;
        alt?: string | undefined;
        sortOrder?: number | undefined;
        thumbnailUrl?: string | undefined;
        width?: number | undefined;
        height?: number | undefined;
    }[] | undefined;
    mainMediaIndex?: number | undefined;
    modifiers?: {
        type: "text" | "select" | "checkbox";
        id: string;
        name: string;
        options?: {
            value: string;
            priceAdjustment?: number | undefined;
        }[] | undefined;
        maxLength?: number | undefined;
        required?: boolean | undefined;
    }[] | undefined;
    categoryIds?: string[] | undefined;
    mainCategoryId?: string | undefined;
    tags?: string[] | undefined;
    ribbon?: string | undefined;
    infoSections?: {
        title: string;
        content: string;
    }[] | undefined;
    customFields?: {
        type: "number" | "text" | "select";
        name: string;
        options?: string[] | undefined;
        required?: boolean | undefined;
    }[] | undefined;
    visibility?: "visible" | "hidden" | undefined;
    aiMeta?: {
        generatedDescription?: boolean | undefined;
        suggestedPrice?: number | undefined;
        seoScore?: number | undefined;
    } | undefined;
}>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
export declare const UpdateProductSchema: z.ZodObject<{
    options: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        type: z.ZodDefault<z.ZodEnum<["color", "size", "custom"]>>;
        choices: z.ZodArray<z.ZodObject<{
            value: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            colorHex: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            value: string;
            description?: string | undefined;
            colorHex?: string | undefined;
        }, {
            value: string;
            description?: string | undefined;
            colorHex?: string | undefined;
        }>, "many">;
        sortOrder: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        type: "custom" | "color" | "size";
        id: string;
        name: string;
        sortOrder: number;
        choices: {
            value: string;
            description?: string | undefined;
            colorHex?: string | undefined;
        }[];
    }, {
        id: string;
        name: string;
        choices: {
            value: string;
            description?: string | undefined;
            colorHex?: string | undefined;
        }[];
        type?: "custom" | "color" | "size" | undefined;
        sortOrder?: number | undefined;
    }>, "many">>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["active", "draft", "archived"]>>>;
    productType: z.ZodOptional<z.ZodEnum<["physical", "digital", "service"]>>;
    physical: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        weight: z.ZodOptional<z.ZodNumber>;
        dimensions: z.ZodOptional<z.ZodObject<{
            length: z.ZodOptional<z.ZodNumber>;
            width: z.ZodOptional<z.ZodNumber>;
            height: z.ZodOptional<z.ZodNumber>;
            unit: z.ZodDefault<z.ZodEnum<["cm", "mm", "m"]>>;
        }, "strip", z.ZodTypeAny, {
            unit: "cm" | "mm" | "m";
            length?: number | undefined;
            width?: number | undefined;
            height?: number | undefined;
        }, {
            length?: number | undefined;
            width?: number | undefined;
            height?: number | undefined;
            unit?: "cm" | "mm" | "m" | undefined;
        }>>;
        sku: z.ZodOptional<z.ZodString>;
        barcode: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        sku?: string | undefined;
        weight?: number | undefined;
        barcode?: string | undefined;
        dimensions?: {
            unit: "cm" | "mm" | "m";
            length?: number | undefined;
            width?: number | undefined;
            height?: number | undefined;
        } | undefined;
    }, {
        sku?: string | undefined;
        weight?: number | undefined;
        barcode?: string | undefined;
        dimensions?: {
            length?: number | undefined;
            width?: number | undefined;
            height?: number | undefined;
            unit?: "cm" | "mm" | "m" | undefined;
        } | undefined;
    }>>>;
    digital: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        files: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            url: z.ZodString;
            sizeBytes: z.ZodNumber;
            mimeType: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
            id: string;
            name: string;
            sizeBytes: number;
            mimeType: string;
        }, {
            url: string;
            id: string;
            name: string;
            sizeBytes: number;
            mimeType: string;
        }>, "many">;
        downloadExpiry: z.ZodDefault<z.ZodNumber>;
        maxDownloads: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        files: {
            url: string;
            id: string;
            name: string;
            sizeBytes: number;
            mimeType: string;
        }[];
        downloadExpiry: number;
        maxDownloads: number;
    }, {
        files: {
            url: string;
            id: string;
            name: string;
            sizeBytes: number;
            mimeType: string;
        }[];
        downloadExpiry?: number | undefined;
        maxDownloads?: number | undefined;
    }>>>;
    service: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        duration: z.ZodNumber;
        bookingType: z.ZodEnum<["appointment", "class"]>;
        location: z.ZodEnum<["business", "customer", "online"]>;
    }, "strip", z.ZodTypeAny, {
        duration: number;
        bookingType: "appointment" | "class";
        location: "business" | "customer" | "online";
    }, {
        duration: number;
        bookingType: "appointment" | "class";
        location: "business" | "customer" | "online";
    }>>>;
    name: z.ZodOptional<z.ZodString>;
    esnafId: z.ZodOptional<z.ZodString>;
    currency: z.ZodOptional<z.ZodDefault<z.ZodLiteral<"TRY">>>;
    description: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    handle: z.ZodOptional<z.ZodString>;
    shortDescription: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    sectorId: z.ZodOptional<z.ZodString>;
    taxConfig: z.ZodOptional<z.ZodObject<{
        rate: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<1>, z.ZodLiteral<10>, z.ZodLiteral<20>]>>;
        includedInPrice: z.ZodDefault<z.ZodLiteral<true>>;
    }, "strip", z.ZodTypeAny, {
        rate: 1 | 10 | 20;
        includedInPrice: true;
    }, {
        rate?: 1 | 10 | 20 | undefined;
        includedInPrice?: true | undefined;
    }>>;
    media: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<["image", "video"]>;
        url: z.ZodString;
        thumbnailUrl: z.ZodOptional<z.ZodString>;
        alt: z.ZodDefault<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
        sortOrder: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        type: "image" | "video";
        url: string;
        id: string;
        alt: string;
        sortOrder: number;
        thumbnailUrl?: string | undefined;
        width?: number | undefined;
        height?: number | undefined;
    }, {
        type: "image" | "video";
        url: string;
        id: string;
        alt?: string | undefined;
        sortOrder?: number | undefined;
        thumbnailUrl?: string | undefined;
        width?: number | undefined;
        height?: number | undefined;
    }>, "many">>>;
    mainMediaIndex: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    variants: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        productId: z.ZodString;
        choices: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodString>>;
        price: z.ZodNumber;
        compareAtPrice: z.ZodOptional<z.ZodNumber>;
        costPrice: z.ZodOptional<z.ZodNumber>;
        inventory: z.ZodObject<{
            trackQuantity: z.ZodDefault<z.ZodBoolean>;
            quantity: z.ZodDefault<z.ZodNumber>;
            allowBackorder: z.ZodDefault<z.ZodBoolean>;
            lowStockThreshold: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            quantity: number;
            trackQuantity: boolean;
            allowBackorder: boolean;
            lowStockThreshold: number;
        }, {
            quantity?: number | undefined;
            trackQuantity?: boolean | undefined;
            allowBackorder?: boolean | undefined;
            lowStockThreshold?: number | undefined;
        }>;
        sku: z.ZodOptional<z.ZodString>;
        barcode: z.ZodOptional<z.ZodString>;
        weight: z.ZodOptional<z.ZodNumber>;
        mediaId: z.ZodOptional<z.ZodString>;
        digitalFileId: z.ZodOptional<z.ZodString>;
        visible: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        price: number;
        id: string;
        productId: string;
        choices: Record<string, string>;
        inventory: {
            quantity: number;
            trackQuantity: boolean;
            allowBackorder: boolean;
            lowStockThreshold: number;
        };
        visible: boolean;
        compareAtPrice?: number | undefined;
        sku?: string | undefined;
        weight?: number | undefined;
        costPrice?: number | undefined;
        barcode?: string | undefined;
        mediaId?: string | undefined;
        digitalFileId?: string | undefined;
    }, {
        price: number;
        id: string;
        productId: string;
        inventory: {
            quantity?: number | undefined;
            trackQuantity?: boolean | undefined;
            allowBackorder?: boolean | undefined;
            lowStockThreshold?: number | undefined;
        };
        compareAtPrice?: number | undefined;
        sku?: string | undefined;
        weight?: number | undefined;
        choices?: Record<string, string> | undefined;
        costPrice?: number | undefined;
        barcode?: string | undefined;
        mediaId?: string | undefined;
        digitalFileId?: string | undefined;
        visible?: boolean | undefined;
    }>, "many">>;
    modifiers: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        type: z.ZodEnum<["text", "select", "checkbox"]>;
        required: z.ZodDefault<z.ZodBoolean>;
        options: z.ZodOptional<z.ZodArray<z.ZodObject<{
            value: z.ZodString;
            priceAdjustment: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            value: string;
            priceAdjustment: number;
        }, {
            value: string;
            priceAdjustment?: number | undefined;
        }>, "many">>;
        maxLength: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        type: "text" | "select" | "checkbox";
        id: string;
        name: string;
        required: boolean;
        options?: {
            value: string;
            priceAdjustment: number;
        }[] | undefined;
        maxLength?: number | undefined;
    }, {
        type: "text" | "select" | "checkbox";
        id: string;
        name: string;
        options?: {
            value: string;
            priceAdjustment?: number | undefined;
        }[] | undefined;
        maxLength?: number | undefined;
        required?: boolean | undefined;
    }>, "many">>>;
    categoryIds: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    mainCategoryId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    tags: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    ribbon: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    seo: z.ZodOptional<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        slug: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        description?: string | undefined;
        title?: string | undefined;
    }, {
        slug: string;
        description?: string | undefined;
        title?: string | undefined;
    }>>;
    infoSections: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        content: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        title: string;
        content: string;
    }, {
        title: string;
        content: string;
    }>, "many">>>;
    customFields: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        required: z.ZodDefault<z.ZodBoolean>;
        type: z.ZodEnum<["text", "number", "select"]>;
        options: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        type: "number" | "text" | "select";
        name: string;
        required: boolean;
        options?: string[] | undefined;
    }, {
        type: "number" | "text" | "select";
        name: string;
        options?: string[] | undefined;
        required?: boolean | undefined;
    }>, "many">>>;
    visibility: z.ZodOptional<z.ZodDefault<z.ZodEnum<["visible", "hidden"]>>>;
    aiMeta: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        generatedDescription: z.ZodDefault<z.ZodBoolean>;
        suggestedPrice: z.ZodOptional<z.ZodNumber>;
        seoScore: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        generatedDescription: boolean;
        suggestedPrice?: number | undefined;
        seoScore?: number | undefined;
    }, {
        generatedDescription?: boolean | undefined;
        suggestedPrice?: number | undefined;
        seoScore?: number | undefined;
    }>>>;
}, "strip", z.ZodTypeAny, {
    options?: {
        type: "custom" | "color" | "size";
        id: string;
        name: string;
        sortOrder: number;
        choices: {
            value: string;
            description?: string | undefined;
            colorHex?: string | undefined;
        }[];
    }[] | undefined;
    status?: "active" | "draft" | "archived" | undefined;
    productType?: "physical" | "digital" | "service" | undefined;
    physical?: {
        sku?: string | undefined;
        weight?: number | undefined;
        barcode?: string | undefined;
        dimensions?: {
            unit: "cm" | "mm" | "m";
            length?: number | undefined;
            width?: number | undefined;
            height?: number | undefined;
        } | undefined;
    } | undefined;
    digital?: {
        files: {
            url: string;
            id: string;
            name: string;
            sizeBytes: number;
            mimeType: string;
        }[];
        downloadExpiry: number;
        maxDownloads: number;
    } | undefined;
    service?: {
        duration: number;
        bookingType: "appointment" | "class";
        location: "business" | "customer" | "online";
    } | undefined;
    name?: string | undefined;
    esnafId?: string | undefined;
    currency?: "TRY" | undefined;
    description?: string | undefined;
    handle?: string | undefined;
    shortDescription?: string | undefined;
    sectorId?: string | undefined;
    taxConfig?: {
        rate: 1 | 10 | 20;
        includedInPrice: true;
    } | undefined;
    media?: {
        type: "image" | "video";
        url: string;
        id: string;
        alt: string;
        sortOrder: number;
        thumbnailUrl?: string | undefined;
        width?: number | undefined;
        height?: number | undefined;
    }[] | undefined;
    mainMediaIndex?: number | undefined;
    variants?: {
        price: number;
        id: string;
        productId: string;
        choices: Record<string, string>;
        inventory: {
            quantity: number;
            trackQuantity: boolean;
            allowBackorder: boolean;
            lowStockThreshold: number;
        };
        visible: boolean;
        compareAtPrice?: number | undefined;
        sku?: string | undefined;
        weight?: number | undefined;
        costPrice?: number | undefined;
        barcode?: string | undefined;
        mediaId?: string | undefined;
        digitalFileId?: string | undefined;
    }[] | undefined;
    modifiers?: {
        type: "text" | "select" | "checkbox";
        id: string;
        name: string;
        required: boolean;
        options?: {
            value: string;
            priceAdjustment: number;
        }[] | undefined;
        maxLength?: number | undefined;
    }[] | undefined;
    categoryIds?: string[] | undefined;
    mainCategoryId?: string | undefined;
    tags?: string[] | undefined;
    ribbon?: string | undefined;
    seo?: {
        slug: string;
        description?: string | undefined;
        title?: string | undefined;
    } | undefined;
    infoSections?: {
        title: string;
        content: string;
    }[] | undefined;
    customFields?: {
        type: "number" | "text" | "select";
        name: string;
        required: boolean;
        options?: string[] | undefined;
    }[] | undefined;
    visibility?: "visible" | "hidden" | undefined;
    aiMeta?: {
        generatedDescription: boolean;
        suggestedPrice?: number | undefined;
        seoScore?: number | undefined;
    } | undefined;
}, {
    options?: {
        id: string;
        name: string;
        choices: {
            value: string;
            description?: string | undefined;
            colorHex?: string | undefined;
        }[];
        type?: "custom" | "color" | "size" | undefined;
        sortOrder?: number | undefined;
    }[] | undefined;
    status?: "active" | "draft" | "archived" | undefined;
    productType?: "physical" | "digital" | "service" | undefined;
    physical?: {
        sku?: string | undefined;
        weight?: number | undefined;
        barcode?: string | undefined;
        dimensions?: {
            length?: number | undefined;
            width?: number | undefined;
            height?: number | undefined;
            unit?: "cm" | "mm" | "m" | undefined;
        } | undefined;
    } | undefined;
    digital?: {
        files: {
            url: string;
            id: string;
            name: string;
            sizeBytes: number;
            mimeType: string;
        }[];
        downloadExpiry?: number | undefined;
        maxDownloads?: number | undefined;
    } | undefined;
    service?: {
        duration: number;
        bookingType: "appointment" | "class";
        location: "business" | "customer" | "online";
    } | undefined;
    name?: string | undefined;
    esnafId?: string | undefined;
    currency?: "TRY" | undefined;
    description?: string | undefined;
    handle?: string | undefined;
    shortDescription?: string | undefined;
    sectorId?: string | undefined;
    taxConfig?: {
        rate?: 1 | 10 | 20 | undefined;
        includedInPrice?: true | undefined;
    } | undefined;
    media?: {
        type: "image" | "video";
        url: string;
        id: string;
        alt?: string | undefined;
        sortOrder?: number | undefined;
        thumbnailUrl?: string | undefined;
        width?: number | undefined;
        height?: number | undefined;
    }[] | undefined;
    mainMediaIndex?: number | undefined;
    variants?: {
        price: number;
        id: string;
        productId: string;
        inventory: {
            quantity?: number | undefined;
            trackQuantity?: boolean | undefined;
            allowBackorder?: boolean | undefined;
            lowStockThreshold?: number | undefined;
        };
        compareAtPrice?: number | undefined;
        sku?: string | undefined;
        weight?: number | undefined;
        choices?: Record<string, string> | undefined;
        costPrice?: number | undefined;
        barcode?: string | undefined;
        mediaId?: string | undefined;
        digitalFileId?: string | undefined;
        visible?: boolean | undefined;
    }[] | undefined;
    modifiers?: {
        type: "text" | "select" | "checkbox";
        id: string;
        name: string;
        options?: {
            value: string;
            priceAdjustment?: number | undefined;
        }[] | undefined;
        maxLength?: number | undefined;
        required?: boolean | undefined;
    }[] | undefined;
    categoryIds?: string[] | undefined;
    mainCategoryId?: string | undefined;
    tags?: string[] | undefined;
    ribbon?: string | undefined;
    seo?: {
        slug: string;
        description?: string | undefined;
        title?: string | undefined;
    } | undefined;
    infoSections?: {
        title: string;
        content: string;
    }[] | undefined;
    customFields?: {
        type: "number" | "text" | "select";
        name: string;
        options?: string[] | undefined;
        required?: boolean | undefined;
    }[] | undefined;
    visibility?: "visible" | "hidden" | undefined;
    aiMeta?: {
        generatedDescription?: boolean | undefined;
        suggestedPrice?: number | undefined;
        seoScore?: number | undefined;
    } | undefined;
}>;
export type UpdateProduct = z.infer<typeof UpdateProductSchema>;
//# sourceMappingURL=product.d.ts.map