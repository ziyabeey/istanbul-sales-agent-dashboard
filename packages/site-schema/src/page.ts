/**
 * @kepenk/site-schema — Page Document Schema
 * Immutable JSON document representing a single page.
 */

import { z } from 'zod'
import { ComponentNodeSchema, MediaRefSchema } from './component'
import type { ComponentNode, MediaRef } from './component'

// ── SEO Config (per-page overrides) ──

export const SEOConfigSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  ogImage: MediaRefSchema.optional(),
  robots: z.string().optional(),
  canonical: z.string().optional(),
})
export type SEOConfig = z.infer<typeof SEOConfigSchema>

// ── Page Metadata ──

export const PageMetaSchema = z.object({
  title: z.string().min(1),
  slug: z.string(),
  description: z.string().default(''),
  ogImage: MediaRefSchema.optional(),
  customHead: z.string().optional(),
  customCSS: z.string().optional(),
})
export type PageMeta = z.infer<typeof PageMetaSchema>

// ── Page Document (immutable, content-hashed) ──

export const PageDocumentSchema = z.object({
  contentHash: z.string(),
  pageId: z.string(),
  siteId: z.string(),

  // Component tree root
  root: ComponentNodeSchema,

  // Page-level metadata
  meta: PageMetaSchema,
})

export interface PageDocument {
  contentHash: string
  pageId: string
  siteId: string
  root: ComponentNode
  meta: PageMeta
}

// ── Page Reference (pointer in manifest) ──

export const PageRefSchema = z.object({
  pageId: z.string(),
  contentHash: z.string(),
  slug: z.string(),
  title: z.string(),
  isHomePage: z.boolean().default(false),
  isDynamic: z.boolean().default(false),
  parentPageId: z.string().optional(),
  seoOverrides: SEOConfigSchema.optional(),
})

export interface PageRef {
  pageId: string
  contentHash: string
  slug: string
  title: string
  isHomePage: boolean
  isDynamic: boolean
  parentPageId?: string
  seoOverrides?: SEOConfig
}
