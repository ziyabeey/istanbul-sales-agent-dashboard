"use strict";
/**
 * @kepenk/site-schema — Component Node Schema
 * Recursive component tree node: the core building block of every page.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_SPACING = exports.DEFAULT_VISIBILITY = exports.ComponentNodeSchema = exports.InteractionsSchema = exports.AiMetaSchema = exports.VisibilitySchema = exports.StyleSchema = exports.LayoutSchema = exports.InteractionDefSchema = exports.AnimationDefSchema = exports.BorderDefSchema = exports.MediaRefSchema = exports.SpacingSchema = exports.SizeValueSchema = void 0;
const zod_1 = require("zod");
const component_types_1 = require("./component-types");
// ── Primitive Value Schemas ──
exports.SizeValueSchema = zod_1.z.object({
    value: zod_1.z.number(),
    unit: zod_1.z.enum(['px', '%', 'vw', 'vh', 'rem', 'fr', 'auto', 'min-content', 'max-content']),
});
exports.SpacingSchema = zod_1.z.object({
    top: zod_1.z.string(),
    right: zod_1.z.string(),
    bottom: zod_1.z.string(),
    left: zod_1.z.string(),
});
exports.MediaRefSchema = zod_1.z.object({
    url: zod_1.z.string(),
    alt: zod_1.z.string(),
    width: zod_1.z.number(),
    height: zod_1.z.number(),
    format: zod_1.z.enum(['webp', 'jpg', 'png', 'svg']),
    blurhash: zod_1.z.string().optional(),
});
exports.BorderDefSchema = zod_1.z.object({
    width: zod_1.z.string(),
    style: zod_1.z.enum(['solid', 'dashed', 'dotted', 'none']),
    color: zod_1.z.string(),
});
exports.AnimationDefSchema = zod_1.z.object({
    type: zod_1.z.enum([
        'fade-in', 'fade-out', 'slide-up', 'slide-down', 'slide-left', 'slide-right',
        'scale-in', 'scale-out', 'bounce', 'rotate', 'none',
    ]),
    duration: zod_1.z.number().optional(), // ms
    delay: zod_1.z.number().optional(), // ms
    easing: zod_1.z.string().optional(), // CSS easing function
});
exports.InteractionDefSchema = zod_1.z.object({
    type: zod_1.z.enum(['navigate', 'scroll-to', 'open-url', 'open-popup', 'whatsapp', 'phone']),
    target: zod_1.z.string(), // URL, section ID, phone number, etc.
    openInNewTab: zod_1.z.boolean().optional(),
});
// ── Layout Schema ──
exports.LayoutSchema = zod_1.z.object({
    display: zod_1.z.enum(['flex', 'grid', 'block']).optional(),
    flexDirection: zod_1.z.enum(['row', 'column']).optional(),
    justifyContent: zod_1.z.string().optional(),
    alignItems: zod_1.z.string().optional(),
    gap: zod_1.z.string().optional(),
    gridTemplateColumns: zod_1.z.string().optional(),
    gridTemplateRows: zod_1.z.string().optional(),
    padding: exports.SpacingSchema.optional(),
    margin: exports.SpacingSchema.optional(),
    width: exports.SizeValueSchema.optional(),
    height: exports.SizeValueSchema.optional(),
    minHeight: exports.SizeValueSchema.optional(),
    maxWidth: exports.SizeValueSchema.optional(),
    overflow: zod_1.z.enum(['hidden', 'visible', 'auto']).optional(),
    position: zod_1.z.enum(['relative', 'sticky']).optional(),
    zIndex: zod_1.z.number().optional(),
});
// ── Style Schema ──
exports.StyleSchema = zod_1.z.object({
    backgroundColor: zod_1.z.string().optional(),
    backgroundImage: exports.MediaRefSchema.optional(),
    backgroundSize: zod_1.z.enum(['cover', 'contain', 'auto']).optional(),
    backgroundPosition: zod_1.z.string().optional(),
    borderRadius: zod_1.z.string().optional(),
    border: exports.BorderDefSchema.optional(),
    boxShadow: zod_1.z.string().optional(),
    opacity: zod_1.z.number().min(0).max(1).optional(),
    color: zod_1.z.string().optional(),
});
// ── Visibility Schema ──
exports.VisibilitySchema = zod_1.z.object({
    desktop: zod_1.z.boolean(),
    tablet: zod_1.z.boolean(),
    mobile: zod_1.z.boolean(),
});
// ── AI Metadata ──
exports.AiMetaSchema = zod_1.z.object({
    generatedBy: zod_1.z.enum(['haiku', 'sonnet', 'opus']),
    prompt: zod_1.z.string().optional(),
    confidence: zod_1.z.number().min(0).max(1),
    lastOptimized: zod_1.z.string().optional(),
});
// ── Interactions Schema ──
exports.InteractionsSchema = zod_1.z.object({
    onClick: exports.InteractionDefSchema.optional(),
    onHover: exports.AnimationDefSchema.optional(),
    onScroll: exports.AnimationDefSchema.optional(),
    entrance: exports.AnimationDefSchema.optional(),
});
// ── ComponentNode Schema (recursive via z.lazy) ──
// Use z.infer output type to avoid input/output mismatch from .default()
exports.ComponentNodeSchema = zod_1.z.lazy(() => zod_1.z.object({
    id: zod_1.z.string(),
    type: zod_1.z.nativeEnum(component_types_1.ComponentType),
    // Layout properties (CSS-native)
    layout: exports.LayoutSchema.optional(),
    // Responsive overrides
    responsive: zod_1.z.object({
        tablet: exports.LayoutSchema.optional(),
        mobile: exports.LayoutSchema.optional(),
    }).optional(),
    // Visual styling
    style: exports.StyleSchema.optional(),
    // Component-specific data (varies by type)
    data: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional(),
    // Children (recursive)
    children: zod_1.z.array(exports.ComponentNodeSchema).default([]),
    // Interaction & animation
    interactions: exports.InteractionsSchema.optional(),
    // Visibility per breakpoint
    visibility: exports.VisibilitySchema.default({
        desktop: true,
        tablet: true,
        mobile: true,
    }),
    // AI metadata
    aiMeta: exports.AiMetaSchema.optional(),
}));
// ── Default Visibility ──
exports.DEFAULT_VISIBILITY = {
    desktop: true,
    tablet: true,
    mobile: true,
};
// ── Default Spacing ──
exports.DEFAULT_SPACING = {
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
};
//# sourceMappingURL=component.js.map