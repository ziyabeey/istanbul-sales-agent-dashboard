/**
 * @kepenk/site-schema — Validators & Utilities
 * Content hashing, Turkish slug generation, schema validation helpers.
 */

import { createHash } from 'crypto'
import { SiteManifestSchema } from './manifest'
import { PageDocumentSchema } from './page'
import { ComponentNodeSchema } from './component'
import { MasterPageDocumentSchema } from './master-page'
import type { SiteManifest } from './manifest'
import type { PageDocument } from './page'
import type { ComponentNode } from './component'
import type { MasterPageDocument } from './master-page'

// ── Content Hash ──

/**
 * Compute a content hash for immutable storage.
 * SHA-256 of the JSON string, truncated to 16 hex characters.
 */
export function computeContentHash(data: unknown): string {
  const json = JSON.stringify(data)
  const hash = createHash('sha256').update(json).digest('hex')
  return hash.substring(0, 16)
}

// ── Turkish Slug Generation ──

/** Turkish character map for URL-safe slugs */
const TURKISH_CHAR_MAP: Record<string, string> = {
  'ç': 'c', 'Ç': 'C',
  'ğ': 'g', 'Ğ': 'G',
  'ı': 'i', 'İ': 'I',
  'ö': 'o', 'Ö': 'O',
  'ş': 's', 'Ş': 'S',
  'ü': 'u', 'Ü': 'U',
}

/**
 * Generate a URL-safe slug from Turkish text.
 * - Converts Turkish characters (ç→c, ş→s, ı→i, ğ→g, ö→o, ü→u)
 * - Lowercases everything
 * - Replaces spaces with hyphens
 * - Strips non-alphanumeric characters
 * - Max 60 characters
 */
export function slugify(text: string): string {
  let slug = text

  // Replace Turkish characters
  for (const [from, to] of Object.entries(TURKISH_CHAR_MAP)) {
    slug = slug.replace(new RegExp(from, 'g'), to)
  }

  slug = slug
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // spaces → hyphens
    .replace(/[^a-z0-9-]/g, '')  // strip non-alphanumeric
    .replace(/-+/g, '-')         // collapse multiple hyphens
    .replace(/^-|-$/g, '')       // strip leading/trailing hyphens

  // Max 60 characters
  if (slug.length > 60) {
    slug = slug.substring(0, 60).replace(/-$/, '')
  }

  return slug
}

// ── Schema Validation ──

export function validateManifest(data: unknown): { success: true; data: SiteManifest } | { success: false; errors: string[] } {
  const result = SiteManifestSchema.safeParse(data)
  if (result.success) {
    return { success: true, data: result.data as SiteManifest }
  }
  return {
    success: false,
    errors: result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`),
  }
}

export function validatePage(data: unknown): { success: true; data: PageDocument } | { success: false; errors: string[] } {
  const result = PageDocumentSchema.safeParse(data)
  if (result.success) {
    return { success: true, data: result.data as PageDocument }
  }
  return {
    success: false,
    errors: result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`),
  }
}

export function validateComponent(data: unknown): { success: true; data: ComponentNode } | { success: false; errors: string[] } {
  const result = ComponentNodeSchema.safeParse(data)
  if (result.success) {
    return { success: true, data: result.data as ComponentNode }
  }
  return {
    success: false,
    errors: result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`),
  }
}

export function validateMasterPage(data: unknown): { success: true; data: MasterPageDocument } | { success: false; errors: string[] } {
  const result = MasterPageDocumentSchema.safeParse(data)
  if (result.success) {
    return { success: true, data: result.data as MasterPageDocument }
  }
  return {
    success: false,
    errors: result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`),
  }
}

// ── ID Generators ──

/** Generate a unique component ID with type prefix */
export function generateComponentId(type: string): string {
  const shortId = Math.random().toString(36).substring(2, 8)
  return `${type}-${shortId}`
}

/** Generate a unique page ID */
export function generatePageId(): string {
  return `page-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`
}

/** Generate a unique site ID */
export function generateSiteId(): string {
  return `site-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`
}
