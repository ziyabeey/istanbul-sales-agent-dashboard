/**
 * @kepenk/site-schema — Page Document Schema
 * Immutable JSON document representing a single page.
 */
import { z } from 'zod';
import type { ComponentNode } from './component';
export declare const SEOConfigSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    ogImage: z.ZodOptional<z.ZodObject<{
        url: z.ZodString;
        alt: z.ZodString;
        width: z.ZodNumber;
        height: z.ZodNumber;
        format: z.ZodEnum<["webp", "jpg", "png", "svg"]>;
        blurhash: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        alt: string;
        width: number;
        height: number;
        format: "webp" | "jpg" | "png" | "svg";
        blurhash?: string | undefined;
    }, {
        url: string;
        alt: string;
        width: number;
        height: number;
        format: "webp" | "jpg" | "png" | "svg";
        blurhash?: string | undefined;
    }>>;
    robots: z.ZodOptional<z.ZodString>;
    canonical: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    description?: string | undefined;
    ogImage?: {
        url: string;
        alt: string;
        width: number;
        height: number;
        format: "webp" | "jpg" | "png" | "svg";
        blurhash?: string | undefined;
    } | undefined;
    robots?: string | undefined;
    canonical?: string | undefined;
}, {
    title?: string | undefined;
    description?: string | undefined;
    ogImage?: {
        url: string;
        alt: string;
        width: number;
        height: number;
        format: "webp" | "jpg" | "png" | "svg";
        blurhash?: string | undefined;
    } | undefined;
    robots?: string | undefined;
    canonical?: string | undefined;
}>;
export type SEOConfig = z.infer<typeof SEOConfigSchema>;
export declare const PageMetaSchema: z.ZodObject<{
    title: z.ZodString;
    slug: z.ZodString;
    description: z.ZodDefault<z.ZodString>;
    ogImage: z.ZodOptional<z.ZodObject<{
        url: z.ZodString;
        alt: z.ZodString;
        width: z.ZodNumber;
        height: z.ZodNumber;
        format: z.ZodEnum<["webp", "jpg", "png", "svg"]>;
        blurhash: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        alt: string;
        width: number;
        height: number;
        format: "webp" | "jpg" | "png" | "svg";
        blurhash?: string | undefined;
    }, {
        url: string;
        alt: string;
        width: number;
        height: number;
        format: "webp" | "jpg" | "png" | "svg";
        blurhash?: string | undefined;
    }>>;
    customHead: z.ZodOptional<z.ZodString>;
    customCSS: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    slug: string;
    ogImage?: {
        url: string;
        alt: string;
        width: number;
        height: number;
        format: "webp" | "jpg" | "png" | "svg";
        blurhash?: string | undefined;
    } | undefined;
    customHead?: string | undefined;
    customCSS?: string | undefined;
}, {
    title: string;
    slug: string;
    description?: string | undefined;
    ogImage?: {
        url: string;
        alt: string;
        width: number;
        height: number;
        format: "webp" | "jpg" | "png" | "svg";
        blurhash?: string | undefined;
    } | undefined;
    customHead?: string | undefined;
    customCSS?: string | undefined;
}>;
export type PageMeta = z.infer<typeof PageMetaSchema>;
export declare const PageDocumentSchema: z.ZodObject<{
    contentHash: z.ZodString;
    pageId: z.ZodString;
    siteId: z.ZodString;
    root: z.ZodType<ComponentNode, z.ZodTypeDef, any>;
    meta: z.ZodObject<{
        title: z.ZodString;
        slug: z.ZodString;
        description: z.ZodDefault<z.ZodString>;
        ogImage: z.ZodOptional<z.ZodObject<{
            url: z.ZodString;
            alt: z.ZodString;
            width: z.ZodNumber;
            height: z.ZodNumber;
            format: z.ZodEnum<["webp", "jpg", "png", "svg"]>;
            blurhash: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            alt: string;
            width: number;
            height: number;
            format: "webp" | "jpg" | "png" | "svg";
            blurhash?: string | undefined;
        }, {
            url: string;
            alt: string;
            width: number;
            height: number;
            format: "webp" | "jpg" | "png" | "svg";
            blurhash?: string | undefined;
        }>>;
        customHead: z.ZodOptional<z.ZodString>;
        customCSS: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        description: string;
        slug: string;
        ogImage?: {
            url: string;
            alt: string;
            width: number;
            height: number;
            format: "webp" | "jpg" | "png" | "svg";
            blurhash?: string | undefined;
        } | undefined;
        customHead?: string | undefined;
        customCSS?: string | undefined;
    }, {
        title: string;
        slug: string;
        description?: string | undefined;
        ogImage?: {
            url: string;
            alt: string;
            width: number;
            height: number;
            format: "webp" | "jpg" | "png" | "svg";
            blurhash?: string | undefined;
        } | undefined;
        customHead?: string | undefined;
        customCSS?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    contentHash: string;
    pageId: string;
    siteId: string;
    root: ComponentNode;
    meta: {
        title: string;
        description: string;
        slug: string;
        ogImage?: {
            url: string;
            alt: string;
            width: number;
            height: number;
            format: "webp" | "jpg" | "png" | "svg";
            blurhash?: string | undefined;
        } | undefined;
        customHead?: string | undefined;
        customCSS?: string | undefined;
    };
}, {
    contentHash: string;
    pageId: string;
    siteId: string;
    meta: {
        title: string;
        slug: string;
        description?: string | undefined;
        ogImage?: {
            url: string;
            alt: string;
            width: number;
            height: number;
            format: "webp" | "jpg" | "png" | "svg";
            blurhash?: string | undefined;
        } | undefined;
        customHead?: string | undefined;
        customCSS?: string | undefined;
    };
    root?: any;
}>;
export interface PageDocument {
    contentHash: string;
    pageId: string;
    siteId: string;
    root: ComponentNode;
    meta: PageMeta;
}
export declare const PageRefSchema: z.ZodObject<{
    pageId: z.ZodString;
    contentHash: z.ZodString;
    slug: z.ZodString;
    title: z.ZodString;
    isHomePage: z.ZodDefault<z.ZodBoolean>;
    isDynamic: z.ZodDefault<z.ZodBoolean>;
    parentPageId: z.ZodOptional<z.ZodString>;
    seoOverrides: z.ZodOptional<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        ogImage: z.ZodOptional<z.ZodObject<{
            url: z.ZodString;
            alt: z.ZodString;
            width: z.ZodNumber;
            height: z.ZodNumber;
            format: z.ZodEnum<["webp", "jpg", "png", "svg"]>;
            blurhash: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            alt: string;
            width: number;
            height: number;
            format: "webp" | "jpg" | "png" | "svg";
            blurhash?: string | undefined;
        }, {
            url: string;
            alt: string;
            width: number;
            height: number;
            format: "webp" | "jpg" | "png" | "svg";
            blurhash?: string | undefined;
        }>>;
        robots: z.ZodOptional<z.ZodString>;
        canonical: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        title?: string | undefined;
        description?: string | undefined;
        ogImage?: {
            url: string;
            alt: string;
            width: number;
            height: number;
            format: "webp" | "jpg" | "png" | "svg";
            blurhash?: string | undefined;
        } | undefined;
        robots?: string | undefined;
        canonical?: string | undefined;
    }, {
        title?: string | undefined;
        description?: string | undefined;
        ogImage?: {
            url: string;
            alt: string;
            width: number;
            height: number;
            format: "webp" | "jpg" | "png" | "svg";
            blurhash?: string | undefined;
        } | undefined;
        robots?: string | undefined;
        canonical?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    title: string;
    slug: string;
    contentHash: string;
    pageId: string;
    isHomePage: boolean;
    isDynamic: boolean;
    parentPageId?: string | undefined;
    seoOverrides?: {
        title?: string | undefined;
        description?: string | undefined;
        ogImage?: {
            url: string;
            alt: string;
            width: number;
            height: number;
            format: "webp" | "jpg" | "png" | "svg";
            blurhash?: string | undefined;
        } | undefined;
        robots?: string | undefined;
        canonical?: string | undefined;
    } | undefined;
}, {
    title: string;
    slug: string;
    contentHash: string;
    pageId: string;
    isHomePage?: boolean | undefined;
    isDynamic?: boolean | undefined;
    parentPageId?: string | undefined;
    seoOverrides?: {
        title?: string | undefined;
        description?: string | undefined;
        ogImage?: {
            url: string;
            alt: string;
            width: number;
            height: number;
            format: "webp" | "jpg" | "png" | "svg";
            blurhash?: string | undefined;
        } | undefined;
        robots?: string | undefined;
        canonical?: string | undefined;
    } | undefined;
}>;
export interface PageRef {
    pageId: string;
    contentHash: string;
    slug: string;
    title: string;
    isHomePage: boolean;
    isDynamic: boolean;
    parentPageId?: string;
    seoOverrides?: SEOConfig;
}
//# sourceMappingURL=page.d.ts.map