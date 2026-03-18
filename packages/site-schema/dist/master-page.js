"use strict";
/**
 * @kepenk/site-schema — Master Page Schema
 * Global elements shared across all pages: header, footer, floating components.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterPageDocumentSchema = exports.GlobalStylesSchema = void 0;
const zod_1 = require("zod");
const component_1 = require("./component");
// ── Global Styles ──
exports.GlobalStylesSchema = zod_1.z.object({
    cssVariables: zod_1.z.record(zod_1.z.string(), zod_1.z.string()).default({}),
    customCSS: zod_1.z.string().optional(),
});
// ── Master Page Document ──
exports.MasterPageDocumentSchema = zod_1.z.object({
    contentHash: zod_1.z.string(),
    siteId: zod_1.z.string(),
    // Global components
    header: component_1.ComponentNodeSchema,
    footer: component_1.ComponentNodeSchema,
    globalComponents: zod_1.z.array(component_1.ComponentNodeSchema).default([]),
    // Global styles (CSS variables)
    globalStyles: exports.GlobalStylesSchema,
});
//# sourceMappingURL=master-page.js.map