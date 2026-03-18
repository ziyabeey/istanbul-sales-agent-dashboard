"use strict";
/**
 * @kepenk/renderer — Component Registry
 * Maps ComponentType enum values to their React renderer components.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMPONENT_REGISTRY = void 0;
exports.hasRenderer = hasRenderer;
exports.getRenderer = getRenderer;
const site_schema_1 = require("@kepenk/site-schema");
const Layout_1 = require("./components/Layout");
const Content_1 = require("./components/Content");
const Esnaf_1 = require("./components/Esnaf");
/**
 * COMPONENT_REGISTRY: The central mapping from ComponentType → React renderer.
 *
 * When adding a new component type:
 * 1. Add the type to ComponentType enum in @kepenk/site-schema
 * 2. Create the renderer component
 * 3. Register it here
 */
exports.COMPONENT_REGISTRY = {
    // Layout containers
    [site_schema_1.ComponentType.SECTION]: Layout_1.SectionRenderer,
    [site_schema_1.ComponentType.CONTAINER]: Layout_1.ContainerRenderer,
    [site_schema_1.ComponentType.GRID]: Layout_1.GridRenderer,
    [site_schema_1.ComponentType.FLEX_ROW]: Layout_1.FlexRowRenderer,
    [site_schema_1.ComponentType.FLEX_COLUMN]: Layout_1.FlexColumnRenderer,
    [site_schema_1.ComponentType.HEADER]: Layout_1.HeaderRenderer,
    [site_schema_1.ComponentType.FOOTER]: Layout_1.FooterRenderer,
    // Content primitives
    [site_schema_1.ComponentType.TEXT]: Content_1.TextRenderer,
    [site_schema_1.ComponentType.HEADING]: Content_1.HeadingRenderer,
    [site_schema_1.ComponentType.IMAGE]: Content_1.ImageRenderer,
    [site_schema_1.ComponentType.BUTTON]: Content_1.ButtonRenderer,
    [site_schema_1.ComponentType.DIVIDER]: Content_1.DividerRenderer,
    [site_schema_1.ComponentType.SPACER]: Content_1.SpacerRenderer,
    // Esnaf-specific
    [site_schema_1.ComponentType.HERO_BANNER]: Esnaf_1.HeroBannerRenderer,
    [site_schema_1.ComponentType.WHATSAPP_CTA]: Esnaf_1.WhatsAppCTARenderer,
    [site_schema_1.ComponentType.PRICE_TABLE]: Esnaf_1.PriceTableRenderer,
    [site_schema_1.ComponentType.CONTACT_FORM]: Esnaf_1.ContactFormRenderer,
    [site_schema_1.ComponentType.WORKING_HOURS]: Esnaf_1.WorkingHoursRenderer,
    [site_schema_1.ComponentType.GOOGLE_MAP]: Esnaf_1.GoogleMapRenderer,
};
/**
 * Check if a renderer exists for a given component type.
 */
function hasRenderer(type) {
    return type in exports.COMPONENT_REGISTRY;
}
/**
 * Get the renderer for a given component type, or undefined.
 */
function getRenderer(type) {
    return exports.COMPONENT_REGISTRY[type];
}
//# sourceMappingURL=registry.js.map