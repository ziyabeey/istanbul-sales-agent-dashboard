"use strict";
/**
 * @kepenk/ecom-schema — Category Schema
 * Hierarchical categories, max 3 levels deep.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategorySchema = exports.CreateCategorySchema = exports.CategorySchema = void 0;
const zod_1 = require("zod");
exports.CategorySchema = zod_1.z.object({
    id: zod_1.z.string(),
    esnafId: zod_1.z.string(),
    name: zod_1.z.string().min(1).max(60),
    slug: zod_1.z.string().min(1).max(80),
    description: zod_1.z.string().max(300).optional(),
    image: zod_1.z.object({
        url: zod_1.z.string().url(),
        alt: zod_1.z.string().max(200).default(''),
    }).optional(),
    parentId: zod_1.z.string().optional(), // Max 3 level depth
    sortOrder: zod_1.z.number().int().default(0),
    status: zod_1.z.enum(['active', 'inactive']).default('active'),
    productCount: zod_1.z.number().int().nonnegative().default(0),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
});
exports.CreateCategorySchema = exports.CategorySchema.omit({
    id: true,
    productCount: true,
    createdAt: true,
    updatedAt: true,
});
exports.UpdateCategorySchema = exports.CreateCategorySchema.partial();
//# sourceMappingURL=category.js.map