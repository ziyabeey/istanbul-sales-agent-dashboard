/**
 * @kepenk/site-schema — Component Type Enum
 * All available component types for esnaf sites.
 */
export declare enum ComponentType {
    SECTION = "section",
    CONTAINER = "container",
    GRID = "grid",
    FLEX_ROW = "flex-row",
    FLEX_COLUMN = "flex-column",
    TEXT = "text",
    HEADING = "heading",
    IMAGE = "image",
    VIDEO = "video",
    BUTTON = "button",
    ICON = "icon",
    DIVIDER = "divider",
    SPACER = "spacer",
    HERO_BANNER = "hero-banner",
    SERVICE_CARD = "service-card",
    SERVICE_GRID = "service-grid",
    PRODUCT_CARD = "product-card",
    PRODUCT_GRID = "product-grid",
    PRICE_TABLE = "price-table",
    TESTIMONIAL = "testimonial",
    TESTIMONIAL_SLIDER = "testimonial-slider",
    CONTACT_FORM = "contact-form",
    WHATSAPP_CTA = "whatsapp-cta",
    GOOGLE_MAP = "google-map",
    WORKING_HOURS = "working-hours",
    GALLERY = "gallery",
    BEFORE_AFTER = "before-after",
    MENU_LIST = "menu-list",
    TEAM_MEMBER = "team-member",
    FAQ_ACCORDION = "faq-accordion",
    SOCIAL_PROOF = "social-proof",
    INSTAGRAM_FEED = "instagram-feed",
    HEADER = "header",
    FOOTER = "footer",
    NAV_MENU = "nav-menu",
    POPUP = "popup",
    FLOATING_ACTION = "floating-action"
}
/** Component types that can act as containers (accept children) */
export declare const CONTAINER_TYPES: Set<ComponentType>;
/** Component types that are leaf nodes (no children) */
export declare const LEAF_TYPES: Set<ComponentType>;
/**
 * Drop rules: which component types can be dropped inside which container types.
 * Key = parent type, Value = allowed child types.
 * If a type is not in the map, it doesn't accept drops.
 */
export declare const DROP_RULES: Partial<Record<ComponentType, ComponentType[]>>;
//# sourceMappingURL=component-types.d.ts.map