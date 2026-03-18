"use strict";
/**
 * @kepenk/site-schema — Component Type Enum
 * All available component types for esnaf sites.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DROP_RULES = exports.LEAF_TYPES = exports.CONTAINER_TYPES = exports.ComponentType = void 0;
var ComponentType;
(function (ComponentType) {
    // ── Layout ──
    ComponentType["SECTION"] = "section";
    ComponentType["CONTAINER"] = "container";
    ComponentType["GRID"] = "grid";
    ComponentType["FLEX_ROW"] = "flex-row";
    ComponentType["FLEX_COLUMN"] = "flex-column";
    // ── Content ──
    ComponentType["TEXT"] = "text";
    ComponentType["HEADING"] = "heading";
    ComponentType["IMAGE"] = "image";
    ComponentType["VIDEO"] = "video";
    ComponentType["BUTTON"] = "button";
    ComponentType["ICON"] = "icon";
    ComponentType["DIVIDER"] = "divider";
    ComponentType["SPACER"] = "spacer";
    // ── Esnaf-Specific ──
    ComponentType["HERO_BANNER"] = "hero-banner";
    ComponentType["SERVICE_CARD"] = "service-card";
    ComponentType["SERVICE_GRID"] = "service-grid";
    ComponentType["PRODUCT_CARD"] = "product-card";
    ComponentType["PRODUCT_GRID"] = "product-grid";
    ComponentType["PRICE_TABLE"] = "price-table";
    ComponentType["TESTIMONIAL"] = "testimonial";
    ComponentType["TESTIMONIAL_SLIDER"] = "testimonial-slider";
    ComponentType["CONTACT_FORM"] = "contact-form";
    ComponentType["WHATSAPP_CTA"] = "whatsapp-cta";
    ComponentType["GOOGLE_MAP"] = "google-map";
    ComponentType["WORKING_HOURS"] = "working-hours";
    ComponentType["GALLERY"] = "gallery";
    ComponentType["BEFORE_AFTER"] = "before-after";
    ComponentType["MENU_LIST"] = "menu-list";
    ComponentType["TEAM_MEMBER"] = "team-member";
    ComponentType["FAQ_ACCORDION"] = "faq-accordion";
    ComponentType["SOCIAL_PROOF"] = "social-proof";
    ComponentType["INSTAGRAM_FEED"] = "instagram-feed";
    // ── Navigation ──
    ComponentType["HEADER"] = "header";
    ComponentType["FOOTER"] = "footer";
    ComponentType["NAV_MENU"] = "nav-menu";
    // ── Global ──
    ComponentType["POPUP"] = "popup";
    ComponentType["FLOATING_ACTION"] = "floating-action";
})(ComponentType || (exports.ComponentType = ComponentType = {}));
/** Component types that can act as containers (accept children) */
exports.CONTAINER_TYPES = new Set([
    ComponentType.SECTION,
    ComponentType.CONTAINER,
    ComponentType.GRID,
    ComponentType.FLEX_ROW,
    ComponentType.FLEX_COLUMN,
    ComponentType.HEADER,
    ComponentType.FOOTER,
    ComponentType.POPUP,
]);
/** Component types that are leaf nodes (no children) */
exports.LEAF_TYPES = new Set([
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
]);
/**
 * Drop rules: which component types can be dropped inside which container types.
 * Key = parent type, Value = allowed child types.
 * If a type is not in the map, it doesn't accept drops.
 */
exports.DROP_RULES = {
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
};
//# sourceMappingURL=component-types.js.map