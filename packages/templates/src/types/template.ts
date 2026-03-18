/**
 * @kepenk/templates — Core Type Definitions
 * Template system types for block-based site builder.
 */

/** Desteklenen blok tipleri */
export type BlockType =
  | 'header'
  | 'hero'
  | 'services'
  | 'team'
  | 'gallery'
  | 'testimonials'
  | 'booking'
  | 'pricing'
  | 'faq'
  | 'contact'
  | 'map'
  | 'working_hours'
  | 'whatsapp_cta'
  | 'social_proof'
  | 'menu'
  | 'before_after'
  | 'blog_preview'
  | 'cta'
  | 'footer'

/** Bir şablondaki tek blok (section) tanımı */
export interface BlockConfig {
  id: string
  type: BlockType
  variant: string
  order: number
  required: boolean
  defaultContent: Record<string, unknown>
}

/** Site teması */
export interface SiteTheme {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  textSecondary: string
  border: string
  radius: string
  fontHeading: string
  fontBody: string
}

/** Sektör şablon tanımı */
export interface SectorTemplate {
  id: string
  sectorId: string
  name: string
  description: string
  thumbnail: string
  blocks: BlockConfig[]
  theme: SiteTheme
  seoSchema: string
  requiredBlocks: BlockType[]
  optionalBlocks: BlockType[]
}

/** Sektör konfigürasyonu */
export interface SectorConfig {
  id: string
  name: string
  icon: string
  description: string
  color: string
  templates: SectorTemplate[]
}
