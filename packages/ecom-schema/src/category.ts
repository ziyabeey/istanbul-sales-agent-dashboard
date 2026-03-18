/**
 * @kepenk/ecom-schema — Category Schema
 * Hierarchical categories, max 3 levels deep.
 */

import { z } from 'zod'

export const CategorySchema = z.object({
  id: z.string(),
  esnafId: z.string(),
  name: z.string().min(1).max(60),
  slug: z.string().min(1).max(80),
  description: z.string().max(300).optional(),
  image: z.object({
    url: z.string().url(),
    alt: z.string().max(200).default(''),
  }).optional(),
  parentId: z.string().optional(),    // Max 3 level depth
  sortOrder: z.number().int().default(0),
  status: z.enum(['active', 'inactive']).default('active'),
  productCount: z.number().int().nonnegative().default(0),
  createdAt: z.string(),
  updatedAt: z.string(),
})
export type Category = z.infer<typeof CategorySchema>

export const CreateCategorySchema = CategorySchema.omit({
  id: true,
  productCount: true,
  createdAt: true,
  updatedAt: true,
})
export type CreateCategory = z.infer<typeof CreateCategorySchema>

export const UpdateCategorySchema = CreateCategorySchema.partial()
export type UpdateCategory = z.infer<typeof UpdateCategorySchema>
