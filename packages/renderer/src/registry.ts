/**
 * @kepenk/renderer — Component Registry
 * Maps ComponentType enum values to their React renderer components.
 */

import { ComponentType } from '@kepenk/site-schema'
import type { RendererProps } from './types'

import {
  HeaderRenderer,
  FooterRenderer,
  SectionRenderer,
  ContainerRenderer,
  GridRenderer,
  FlexRowRenderer,
  FlexColumnRenderer,
} from './components/Layout'

import {
  TextRenderer,
  HeadingRenderer,
  ImageRenderer,
  ButtonRenderer,
  DividerRenderer,
  SpacerRenderer,
} from './components/Content'

import {
  HeroBannerRenderer,
  WhatsAppCTARenderer,
  PriceTableRenderer,
  ContactFormRenderer,
  WorkingHoursRenderer,
  GoogleMapRenderer,
} from './components/Esnaf'

/**
 * COMPONENT_REGISTRY: The central mapping from ComponentType → React renderer.
 * 
 * When adding a new component type:
 * 1. Add the type to ComponentType enum in @kepenk/site-schema
 * 2. Create the renderer component
 * 3. Register it here
 */
export const COMPONENT_REGISTRY: Partial<Record<ComponentType, React.FC<RendererProps>>> = {
  // Layout containers
  [ComponentType.SECTION]: SectionRenderer,
  [ComponentType.CONTAINER]: ContainerRenderer,
  [ComponentType.GRID]: GridRenderer,
  [ComponentType.FLEX_ROW]: FlexRowRenderer,
  [ComponentType.FLEX_COLUMN]: FlexColumnRenderer,
  [ComponentType.HEADER]: HeaderRenderer,
  [ComponentType.FOOTER]: FooterRenderer,

  // Content primitives
  [ComponentType.TEXT]: TextRenderer,
  [ComponentType.HEADING]: HeadingRenderer,
  [ComponentType.IMAGE]: ImageRenderer,
  [ComponentType.BUTTON]: ButtonRenderer,
  [ComponentType.DIVIDER]: DividerRenderer,
  [ComponentType.SPACER]: SpacerRenderer,

  // Esnaf-specific
  [ComponentType.HERO_BANNER]: HeroBannerRenderer,
  [ComponentType.WHATSAPP_CTA]: WhatsAppCTARenderer,
  [ComponentType.PRICE_TABLE]: PriceTableRenderer,
  [ComponentType.CONTACT_FORM]: ContactFormRenderer,
  [ComponentType.WORKING_HOURS]: WorkingHoursRenderer,
  [ComponentType.GOOGLE_MAP]: GoogleMapRenderer,
}

/**
 * Check if a renderer exists for a given component type.
 */
export function hasRenderer(type: ComponentType): boolean {
  return type in COMPONENT_REGISTRY
}

/**
 * Get the renderer for a given component type, or undefined.
 */
export function getRenderer(type: ComponentType): React.FC<RendererProps> | undefined {
  return COMPONENT_REGISTRY[type]
}
