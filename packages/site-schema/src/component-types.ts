/**
 * @kepenk/site-schema — Component Type Enum
 * All available component types for esnaf sites.
 */

export enum ComponentType {
  // ── Layout ──
  SECTION = 'section',
  CONTAINER = 'container',
  GRID = 'grid',
  FLEX_ROW = 'flex-row',
  FLEX_COLUMN = 'flex-column',

  // ── Content ──
  TEXT = 'text',
  HEADING = 'heading',
  IMAGE = 'image',
  VIDEO = 'video',
  BUTTON = 'button',
  ICON = 'icon',
  DIVIDER = 'divider',
  SPACER = 'spacer',

  // ── Esnaf-Specific ──
  HERO_BANNER = 'hero-banner',
  SERVICE_CARD = 'service-card',
  SERVICE_GRID = 'service-grid',
  PRODUCT_CARD = 'product-card',
  PRODUCT_GRID = 'product-grid',
  PRICE_TABLE = 'price-table',
  TESTIMONIAL = 'testimonial',
  TESTIMONIAL_SLIDER = 'testimonial-slider',
  CONTACT_FORM = 'contact-form',
  WHATSAPP_CTA = 'whatsapp-cta',
  GOOGLE_MAP = 'google-map',
  WORKING_HOURS = 'working-hours',
  GALLERY = 'gallery',
  BEFORE_AFTER = 'before-after',
  MENU_LIST = 'menu-list',
  TEAM_MEMBER = 'team-member',
  FAQ_ACCORDION = 'faq-accordion',
  SOCIAL_PROOF = 'social-proof',
  INSTAGRAM_FEED = 'instagram-feed',

  // ── Navigation ──
  HEADER = 'header',
  FOOTER = 'footer',
  NAV_MENU = 'nav-menu',

  // ── Global ──
  POPUP = 'popup',
  FLOATING_ACTION = 'floating-action',
}

/** Component types that can act as containers (accept children) */
export const CONTAINER_TYPES = new Set<ComponentType>([
  ComponentType.SECTION,
  ComponentType.CONTAINER,
  ComponentType.GRID,
  ComponentType.FLEX_ROW,
  ComponentType.FLEX_COLUMN,
  ComponentType.HEADER,
  ComponentType.FOOTER,
  ComponentType.POPUP,
])

/** Component types that are leaf nodes (no children) */
export const LEAF_TYPES = new Set<ComponentType>([
  ComponentType.TEXT,
  ComponentType.HEADING,
  ComponentType.IMAGE,
  ComponentType.VIDEO,
  ComponentType.BUTTON,
  ComponentType.ICON,
  ComponentType.DIVIDER,
  ComponentType.SPACER,
  ComponentType.WHATSAPP_CTA,
  ComponentType.GOOGLE_MAP,
])

/**
 * Drop rules: which component types can be dropped inside which container types.
 * Key = parent type, Value = allowed child types.
 * If a type is not in the map, it doesn't accept drops.
 */
export const DROP_RULES: Partial<Record<ComponentType, ComponentType[]>> = {
  [ComponentType.SECTION]: [
    ComponentType.CONTAINER, ComponentType.GRID, ComponentType.FLEX_ROW,
    ComponentType.FLEX_COLUMN, ComponentType.TEXT, ComponentType.HEADING,
    ComponentType.IMAGE, ComponentType.VIDEO, ComponentType.BUTTON,
    ComponentType.DIVIDER, ComponentType.SPACER, ComponentType.HERO_BANNER,
    ComponentType.SERVICE_GRID, ComponentType.PRODUCT_GRID, ComponentType.PRICE_TABLE,
    ComponentType.TESTIMONIAL_SLIDER, ComponentType.CONTACT_FORM, ComponentType.WHATSAPP_CTA,
    ComponentType.GOOGLE_MAP, ComponentType.WORKING_HOURS, ComponentType.GALLERY,
    ComponentType.BEFORE_AFTER, ComponentType.MENU_LIST, ComponentType.FAQ_ACCORDION,
    ComponentType.SOCIAL_PROOF, ComponentType.INSTAGRAM_FEED,
  ],
  [ComponentType.CONTAINER]: [
    ComponentType.TEXT, ComponentType.HEADING, ComponentType.IMAGE,
    ComponentType.VIDEO, ComponentType.BUTTON, ComponentType.ICON,
    ComponentType.DIVIDER, ComponentType.SPACER, ComponentType.GRID,
    ComponentType.FLEX_ROW, ComponentType.FLEX_COLUMN,
    ComponentType.SERVICE_CARD, ComponentType.PRODUCT_CARD, ComponentType.TESTIMONIAL,
    ComponentType.TEAM_MEMBER, ComponentType.WHATSAPP_CTA,
  ],
  [ComponentType.GRID]: [
    ComponentType.CONTAINER, ComponentType.SERVICE_CARD,
    ComponentType.PRODUCT_CARD, ComponentType.TESTIMONIAL,
    ComponentType.TEAM_MEMBER, ComponentType.IMAGE,
  ],
  [ComponentType.FLEX_ROW]: [
    ComponentType.CONTAINER, ComponentType.FLEX_COLUMN,
    ComponentType.TEXT, ComponentType.HEADING, ComponentType.IMAGE,
    ComponentType.BUTTON, ComponentType.ICON,
  ],
  [ComponentType.FLEX_COLUMN]: [
    ComponentType.CONTAINER, ComponentType.FLEX_ROW,
    ComponentType.TEXT, ComponentType.HEADING, ComponentType.IMAGE,
    ComponentType.BUTTON, ComponentType.ICON, ComponentType.DIVIDER,
  ],
}
