/**
 * @kepenk/site-schema — Master Page Schema
 * Global elements shared across all pages: header, footer, floating components.
 */

import { z } from 'zod'
import { ComponentNodeSchema } from './component'
import type { ComponentNode } from './component'

// ── Global Styles ──

export const GlobalStylesSchema = z.object({
  cssVariables: z.record(z.string(), z.string()).default({}),
  customCSS: z.string().optional(),
})
export type GlobalStyles = z.infer<typeof GlobalStylesSchema>

// ── Master Page Document ──

export const MasterPageDocumentSchema = z.object({
  contentHash: z.string(),
  siteId: z.string(),

  // Global components
  header: ComponentNodeSchema,
  footer: ComponentNodeSchema,
  globalComponents: z.array(ComponentNodeSchema).default([]),

  // Global styles (CSS variables)
  globalStyles: GlobalStylesSchema,
})

export interface MasterPageDocument {
  contentHash: string
  siteId: string
  header: ComponentNode
  footer: ComponentNode
  globalComponents: ComponentNode[]
  globalStyles: GlobalStyles
}
