"use strict";
/**
 * @kepenk/site-schema
 * Single source of truth for all site data structures.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSiteId = exports.generatePageId = exports.generateComponentId = exports.validateMasterPage = exports.validateComponent = exports.validatePage = exports.validateManifest = exports.slugify = exports.computeContentHash = exports.GlobalStylesSchema = exports.MasterPageDocumentSchema = exports.NavItemSchema = exports.RedirectRuleSchema = exports.WorkingHoursSchema = exports.ContactInfoSchema = exports.BrandColorsSchema = exports.SiteSEOSchema = exports.SiteConfigSchema = exports.SiteManifestSchema = exports.SEOConfigSchema = exports.PageMetaSchema = exports.PageRefSchema = exports.PageDocumentSchema = exports.DEFAULT_SPACING = exports.DEFAULT_VISIBILITY = exports.InteractionsSchema = exports.AiMetaSchema = exports.VisibilitySchema = exports.StyleSchema = exports.LayoutSchema = exports.InteractionDefSchema = exports.AnimationDefSchema = exports.BorderDefSchema = exports.MediaRefSchema = exports.SpacingSchema = exports.SizeValueSchema = exports.ComponentNodeSchema = exports.DROP_RULES = exports.LEAF_TYPES = exports.CONTAINER_TYPES = exports.ComponentType = void 0;
// ── Component Types ──
var component_types_1 = require("./component-types");
Object.defineProperty(exports, "ComponentType", { enumerable: true, get: function () { return component_types_1.ComponentType; } });
Object.defineProperty(exports, "CONTAINER_TYPES", { enumerable: true, get: function () { return component_types_1.CONTAINER_TYPES; } });
Object.defineProperty(exports, "LEAF_TYPES", { enumerable: true, get: function () { return component_types_1.LEAF_TYPES; } });
Object.defineProperty(exports, "DROP_RULES", { enumerable: true, get: function () { return component_types_1.DROP_RULES; } });
// ── Component Node ──
var component_1 = require("./component");
Object.defineProperty(exports, "ComponentNodeSchema", { enumerable: true, get: function () { return component_1.ComponentNodeSchema; } });
Object.defineProperty(exports, "SizeValueSchema", { enumerable: true, get: function () { return component_1.SizeValueSchema; } });
Object.defineProperty(exports, "SpacingSchema", { enumerable: true, get: function () { return component_1.SpacingSchema; } });
Object.defineProperty(exports, "MediaRefSchema", { enumerable: true, get: function () { return component_1.MediaRefSchema; } });
Object.defineProperty(exports, "BorderDefSchema", { enumerable: true, get: function () { return component_1.BorderDefSchema; } });
Object.defineProperty(exports, "AnimationDefSchema", { enumerable: true, get: function () { return component_1.AnimationDefSchema; } });
Object.defineProperty(exports, "InteractionDefSchema", { enumerable: true, get: function () { return component_1.InteractionDefSchema; } });
Object.defineProperty(exports, "LayoutSchema", { enumerable: true, get: function () { return component_1.LayoutSchema; } });
Object.defineProperty(exports, "StyleSchema", { enumerable: true, get: function () { return component_1.StyleSchema; } });
Object.defineProperty(exports, "VisibilitySchema", { enumerable: true, get: function () { return component_1.VisibilitySchema; } });
Object.defineProperty(exports, "AiMetaSchema", { enumerable: true, get: function () { return component_1.AiMetaSchema; } });
Object.defineProperty(exports, "InteractionsSchema", { enumerable: true, get: function () { return component_1.InteractionsSchema; } });
Object.defineProperty(exports, "DEFAULT_VISIBILITY", { enumerable: true, get: function () { return component_1.DEFAULT_VISIBILITY; } });
Object.defineProperty(exports, "DEFAULT_SPACING", { enumerable: true, get: function () { return component_1.DEFAULT_SPACING; } });
// ── Page ──
var page_1 = require("./page");
Object.defineProperty(exports, "PageDocumentSchema", { enumerable: true, get: function () { return page_1.PageDocumentSchema; } });
Object.defineProperty(exports, "PageRefSchema", { enumerable: true, get: function () { return page_1.PageRefSchema; } });
Object.defineProperty(exports, "PageMetaSchema", { enumerable: true, get: function () { return page_1.PageMetaSchema; } });
Object.defineProperty(exports, "SEOConfigSchema", { enumerable: true, get: function () { return page_1.SEOConfigSchema; } });
// ── Manifest ──
var manifest_1 = require("./manifest");
Object.defineProperty(exports, "SiteManifestSchema", { enumerable: true, get: function () { return manifest_1.SiteManifestSchema; } });
Object.defineProperty(exports, "SiteConfigSchema", { enumerable: true, get: function () { return manifest_1.SiteConfigSchema; } });
Object.defineProperty(exports, "SiteSEOSchema", { enumerable: true, get: function () { return manifest_1.SiteSEOSchema; } });
Object.defineProperty(exports, "BrandColorsSchema", { enumerable: true, get: function () { return manifest_1.BrandColorsSchema; } });
Object.defineProperty(exports, "ContactInfoSchema", { enumerable: true, get: function () { return manifest_1.ContactInfoSchema; } });
Object.defineProperty(exports, "WorkingHoursSchema", { enumerable: true, get: function () { return manifest_1.WorkingHoursSchema; } });
Object.defineProperty(exports, "RedirectRuleSchema", { enumerable: true, get: function () { return manifest_1.RedirectRuleSchema; } });
Object.defineProperty(exports, "NavItemSchema", { enumerable: true, get: function () { return manifest_1.NavItemSchema; } });
// ── Master Page ──
var master_page_1 = require("./master-page");
Object.defineProperty(exports, "MasterPageDocumentSchema", { enumerable: true, get: function () { return master_page_1.MasterPageDocumentSchema; } });
Object.defineProperty(exports, "GlobalStylesSchema", { enumerable: true, get: function () { return master_page_1.GlobalStylesSchema; } });
// ── Validators & Utilities ──
var validators_1 = require("./validators");
Object.defineProperty(exports, "computeContentHash", { enumerable: true, get: function () { return validators_1.computeContentHash; } });
Object.defineProperty(exports, "slugify", { enumerable: true, get: function () { return validators_1.slugify; } });
Object.defineProperty(exports, "validateManifest", { enumerable: true, get: function () { return validators_1.validateManifest; } });
Object.defineProperty(exports, "validatePage", { enumerable: true, get: function () { return validators_1.validatePage; } });
Object.defineProperty(exports, "validateComponent", { enumerable: true, get: function () { return validators_1.validateComponent; } });
Object.defineProperty(exports, "validateMasterPage", { enumerable: true, get: function () { return validators_1.validateMasterPage; } });
Object.defineProperty(exports, "generateComponentId", { enumerable: true, get: function () { return validators_1.generateComponentId; } });
Object.defineProperty(exports, "generatePageId", { enumerable: true, get: function () { return validators_1.generatePageId; } });
Object.defineProperty(exports, "generateSiteId", { enumerable: true, get: function () { return validators_1.generateSiteId; } });
//# sourceMappingURL=index.js.map