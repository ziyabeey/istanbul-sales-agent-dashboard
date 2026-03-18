/**
 * @kepenk/site-schema — Component Node Schema
 * Recursive component tree node: the core building block of every page.
 */

import { z } from 'zod'
import { ComponentType } from './component-types'

// ── Primitive Value Schemas ──

export const SizeValueSchema = z.object({
  value: z.number(),
  unit: z.enum(['px', '%', 'vw', 'vh', 'rem', 'fr', 'auto', 'min-content', 'max-content']),
})
export type SizeValue = z.infer<typeof SizeValueSchema>

export const SpacingSchema = z.object({
  top: z.string(),
  right: z.string(),
  bottom: z.string(),
  left: z.string(),
})
export type Spacing = z.infer<typeof SpacingSchema>

export const MediaRefSchema = z.object({
  url: z.string(),
  alt: z.string(),
  width: z.number(),
  height: z.number(),
  format: z.enum(['webp', 'jpg', 'png', 'svg']),
  blurhash: z.string().optional(),
})
export type MediaRef = z.infer<typeof MediaRefSchema>

export const BorderDefSchema = z.object({
  width: z.string(),
  style: z.enum(['solid', 'dashed', 'dotted', 'none']),
  color: z.string(),
})
export type BorderDef = z.infer<typeof BorderDefSchema>

export const AnimationDefSchema = z.object({
  type: z.enum([
    'fade-in', 'fade-out', 'slide-up', 'slide-down', 'slide-left', 'slide-right',
    'scale-in', 'scale-out', 'bounce', 'rotate', 'none',
  ]),
  duration: z.number().optional(), // ms
  delay: z.number().optional(),    // ms
  easing: z.string().optional(),   // CSS easing function
})
export type AnimationDef = z.infer<typeof AnimationDefSchema>

export const InteractionDefSchema = z.object({
  type: z.enum(['navigate', 'scroll-to', 'open-url', 'open-popup', 'whatsapp', 'phone']),
  target: z.string(), // URL, section ID, phone number, etc.
  openInNewTab: z.boolean().optional(),
})
export type InteractionDef = z.infer<typeof InteractionDefSchema>

// ── Layout Schema ──

export const LayoutSchema = z.object({
  display: z.enum(['flex', 'grid', 'block']).optional(),
  flexDirection: z.enum(['row', 'column']).optional(),
  justifyContent: z.string().optional(),
  alignItems: z.string().optional(),
  gap: z.string().optional(),
  gridTemplateColumns: z.string().optional(),
  gridTemplateRows: z.string().optional(),
  padding: SpacingSchema.optional(),
  margin: SpacingSchema.optional(),
  width: SizeValueSchema.optional(),
  height: SizeValueSchema.optional(),
  minHeight: SizeValueSchema.optional(),
  maxWidth: SizeValueSchema.optional(),
  overflow: z.enum(['hidden', 'visible', 'auto']).optional(),
  position: z.enum(['relative', 'sticky']).optional(),
  zIndex: z.number().optional(),
})
export type Layout = z.infer<typeof LayoutSchema>

// ── Style Schema ──

export const StyleSchema = z.object({
  backgroundColor: z.string().optional(),
  backgroundImage: MediaRefSchema.optional(),
  backgroundSize: z.enum(['cover', 'contain', 'auto']).optional(),
  backgroundPosition: z.string().optional(),
  borderRadius: z.string().optional(),
  border: BorderDefSchema.optional(),
  boxShadow: z.string().optional(),
  opacity: z.number().min(0).max(1).optional(),
  color: z.string().optional(),
})
export type Style = z.infer<typeof StyleSchema>

// ── Visibility Schema ──

export const VisibilitySchema = z.object({
  desktop: z.boolean(),
  tablet: z.boolean(),
  mobile: z.boolean(),
})
export type Visibility = z.infer<typeof VisibilitySchema>

// ── AI Metadata ──

export const AiMetaSchema = z.object({
  generatedBy: z.enum(['haiku', 'sonnet', 'opus']),
  prompt: z.string().optional(),
  confidence: z.number().min(0).max(1),
  lastOptimized: z.string().optional(),
})
export type AiMeta = z.infer<typeof AiMetaSchema>

// ── Interactions Schema ──

export const InteractionsSchema = z.object({
  onClick: InteractionDefSchema.optional(),
  onHover: AnimationDefSchema.optional(),
  onScroll: AnimationDefSchema.optional(),
  entrance: AnimationDefSchema.optional(),
})
export type Interactions = z.infer<typeof InteractionsSchema>

// ── ComponentNode Schema (recursive via z.lazy) ──

// Use z.infer output type to avoid input/output mismatch from .default()
export const ComponentNodeSchema: z.ZodType<ComponentNode, z.ZodTypeDef, any> = z.lazy(() =>
  z.object({
    id: z.string(),
    type: z.nativeEnum(ComponentType),

    // Layout properties (CSS-native)
    layout: LayoutSchema.optional(),

    // Responsive overrides
    responsive: z.object({
      tablet: LayoutSchema.optional(),
      mobile: LayoutSchema.optional(),
    }).optional(),

    // Visual styling
    style: StyleSchema.optional(),

    // Component-specific data (varies by type)
    data: z.record(z.string(), z.any()).optional(),

    // Children (recursive)
    children: z.array(ComponentNodeSchema).default([]),

    // Interaction & animation
    interactions: InteractionsSchema.optional(),

    // Visibility per breakpoint
    visibility: VisibilitySchema.default({
      desktop: true,
      tablet: true,
      mobile: true,
    }),

    // AI metadata
    aiMeta: AiMetaSchema.optional(),
  })
)

export interface ComponentNode {
  id: string
  type: ComponentType

  layout?: Layout
  responsive?: {
    tablet?: Layout
    mobile?: Layout
  }
  style?: Style
  data?: Record<string, any>
  children: ComponentNode[]
  interactions?: Interactions
  visibility: Visibility
  aiMeta?: AiMeta
}

// ── Default Visibility ──

export const DEFAULT_VISIBILITY: Visibility = {
  desktop: true,
  tablet: true,
  mobile: true,
}

// ── Default Spacing ──

export const DEFAULT_SPACING: Spacing = {
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
}
