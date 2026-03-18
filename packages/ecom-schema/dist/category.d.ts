/**
 * @kepenk/ecom-schema — Category Schema
 * Hierarchical categories, max 3 levels deep.
 */
import { z } from 'zod';
export declare const CategorySchema: z.ZodObject<{
    id: z.ZodString;
    esnafId: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodObject<{
        url: z.ZodString;
        alt: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        alt: string;
    }, {
        url: string;
        alt?: string | undefined;
    }>>;
    parentId: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodNumber>;
    status: z.ZodDefault<z.ZodEnum<["active", "inactive"]>>;
    productCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "active" | "inactive";
    id: string;
    name: string;
    esnafId: string;
    createdAt: string;
    updatedAt: string;
    slug: string;
    sortOrder: number;
    productCount: number;
    description?: string | undefined;
    image?: {
        url: string;
        alt: string;
    } | undefined;
    parentId?: string | undefined;
}, {
    id: string;
    name: string;
    esnafId: string;
    createdAt: string;
    updatedAt: string;
    slug: string;
    status?: "active" | "inactive" | undefined;
    description?: string | undefined;
    image?: {
        url: string;
        alt?: string | undefined;
    } | undefined;
    parentId?: string | undefined;
    sortOrder?: number | undefined;
    productCount?: number | undefined;
}>;
export type Category = z.infer<typeof CategorySchema>;
export declare const CreateCategorySchema: z.ZodObject<Omit<{
    id: z.ZodString;
    esnafId: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodObject<{
        url: z.ZodString;
        alt: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        alt: string;
    }, {
        url: string;
        alt?: string | undefined;
    }>>;
    parentId: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodNumber>;
    status: z.ZodDefault<z.ZodEnum<["active", "inactive"]>>;
    productCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "id" | "createdAt" | "updatedAt" | "productCount">, "strip", z.ZodTypeAny, {
    status: "active" | "inactive";
    name: string;
    esnafId: string;
    slug: string;
    sortOrder: number;
    description?: string | undefined;
    image?: {
        url: string;
        alt: string;
    } | undefined;
    parentId?: string | undefined;
}, {
    name: string;
    esnafId: string;
    slug: string;
    status?: "active" | "inactive" | undefined;
    description?: string | undefined;
    image?: {
        url: string;
        alt?: string | undefined;
    } | undefined;
    parentId?: string | undefined;
    sortOrder?: number | undefined;
}>;
export type CreateCategory = z.infer<typeof CreateCategorySchema>;
export declare const UpdateCategorySchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["active", "inactive"]>>>;
    name: z.ZodOptional<z.ZodString>;
    esnafId: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    image: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        url: z.ZodString;
        alt: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        alt: string;
    }, {
        url: string;
        alt?: string | undefined;
    }>>>;
    parentId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    sortOrder: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    status?: "active" | "inactive" | undefined;
    name?: string | undefined;
    esnafId?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    image?: {
        url: string;
        alt: string;
    } | undefined;
    parentId?: string | undefined;
    sortOrder?: number | undefined;
}, {
    status?: "active" | "inactive" | undefined;
    name?: string | undefined;
    esnafId?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    image?: {
        url: string;
        alt?: string | undefined;
    } | undefined;
    parentId?: string | undefined;
    sortOrder?: number | undefined;
}>;
export type UpdateCategory = z.infer<typeof UpdateCategorySchema>;
//# sourceMappingURL=category.d.ts.map