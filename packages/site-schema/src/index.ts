/**
 * @kepenk/site-schema
 * Single source of truth for all site data structures.
 */

// ── Component Types ──
export {
  ComponentType,
  CONTAINER_TYPES,
  LEAF_TYPES,
  DROP_RULES,
} from './component-types'

// ── Component Node ──
export {
  ComponentNodeSchema,
  SizeValueSchema,
  SpacingSchema,
  MediaRefSchema,
  BorderDefSchema,
  AnimationDefSchema,
  InteractionDefSchema,
  LayoutSchema,
  StyleSchema,
  VisibilitySchema,
  AiMetaSchema,
  InteractionsSchema,
  DEFAULT_VISIBILITY,
  DEFAULT_SPACING,
} from './component'
export type {
  ComponentNode,
  SizeValue,
  Spacing,
  MediaRef,
  BorderDef,
  AnimationDef,
  InteractionDef,
  Layout,
  Style,
  Visibility,
  AiMeta,
  Interactions,
} from './component'

// ── Page ──
export {
  PageDocumentSchema,
  PageRefSchema,
  PageMetaSchema,
  SEOConfigSchema,
} from './page'
export type {
  PageDocument,
  PageRef,
  PageMeta,
  SEOConfig,
} from './page'

// ── Manifest ──
export {
  SiteManifestSchema,
  SiteConfigSchema,
  SiteSEOSchema,
  BrandColorsSchema,
  ContactInfoSchema,
  WorkingHoursSchema,
  RedirectRuleSchema,
  NavItemSchema,
} from './manifest'
export type {
  SiteManifest,
  SiteConfig,
  SiteSEO,
  BrandColors,
  ContactInfo,
  WorkingHours,
  RedirectRule,
  NavItem,
} from './manifest'

// ── Master Page ──
export {
  MasterPageDocumentSchema,
  GlobalStylesSchema,
} from './master-page'
export type {
  MasterPageDocument,
  GlobalStyles,
} from './master-page'

// ── Validators & Utilities ──
export {
  computeContentHash,
  slugify,
  validateManifest,
  validatePage,
  validateComponent,
  validateMasterPage,
  generateComponentId,
  generatePageId,
  generateSiteId,
} from './validators'
