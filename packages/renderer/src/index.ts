/**
 * @kepenk/renderer
 * Shared rendering engine for editor canvas and SSG publish.
 */

// ── Core ──
export { RenderTree, SiteShell } from './RenderTree'
export { COMPONENT_REGISTRY, hasRenderer, getRenderer } from './registry'
export { layoutToCSS, styleToCSS, nodeToCSS } from './layout-to-css'
export type { RendererProps } from './types'

// ── Layout Components ──
export {
  HeaderRenderer,
  FooterRenderer,
  SectionRenderer,
  ContainerRenderer,
  GridRenderer,
  FlexRowRenderer,
  FlexColumnRenderer,
} from './components/Layout'

// ── Content Components ──
export {
  TextRenderer,
  HeadingRenderer,
  ImageRenderer,
  ButtonRenderer,
  DividerRenderer,
  SpacerRenderer,
} from './components/Content'

// ── Esnaf-Specific Components ──
export {
  HeroBannerRenderer,
  WhatsAppCTARenderer,
  PriceTableRenderer,
  ContactFormRenderer,
  WorkingHoursRenderer,
  GoogleMapRenderer,
} from './components/Esnaf'
