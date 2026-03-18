"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteShell = exports.RenderTree = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const registry_1 = require("./registry");
/**
 * RenderTree: The core rendering primitive.
 *
 * Given a ComponentNode tree, recursively renders each node by:
 * 1. Looking up its type in COMPONENT_REGISTRY
 * 2. Passing layout/style as inline CSS
 * 3. Recursing into children
 *
 * Used by both:
 * - Editor canvas (isEditor=true) → live preview with selection/editing
 * - Publish engine SSR (isEditor=false) → static HTML generation
 */
const RenderTree = ({ node, isEditor, onSelect, onUpdate }) => {
    // Skip invisible nodes based on current context
    // In SSR/publish mode, we still render but use CSS to hide
    // (actual responsive hiding would be done via media queries in production)
    if (!node.visibility.desktop && !node.visibility.tablet && !node.visibility.mobile) {
        return null;
    }
    // Look up the renderer for this component type
    const Renderer = registry_1.COMPONENT_REGISTRY[node.type];
    // If no renderer found, render a debug placeholder in editor mode, or skip in published mode
    if (!Renderer) {
        if (isEditor) {
            return ((0, jsx_runtime_1.jsxs)("div", { "data-component-type": node.type, "data-component-id": node.id, style: {
                    padding: '16px',
                    border: '1px dashed #ccc',
                    borderRadius: '6px',
                    textAlign: 'center',
                    color: '#999',
                    fontSize: '13px',
                    margin: '4px 0',
                }, children: ["\uD83E\uDDE9 ", node.type, " (", node.id, ") \u2014 Renderer bulunamad\u0131"] }));
        }
        return null;
    }
    // Recursively render children
    const renderedChildren = node.children.length > 0 ? ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: node.children.map((child) => ((0, jsx_runtime_1.jsx)(exports.RenderTree, { node: child, isEditor: isEditor, onSelect: onSelect, onUpdate: onUpdate }, child.id))) })) : undefined;
    // Render this node with its children
    return ((0, jsx_runtime_1.jsx)(Renderer, { node: node, isEditor: isEditor, onSelect: onSelect, onUpdate: onUpdate, children: renderedChildren }));
};
exports.RenderTree = RenderTree;
const SiteShell = ({ header, footer, globalComponents = [], children, isEditor, onSelect, onUpdate, }) => {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(exports.RenderTree, { node: header, isEditor: isEditor, onSelect: onSelect, onUpdate: onUpdate }), (0, jsx_runtime_1.jsx)("main", { children: children }), (0, jsx_runtime_1.jsx)(exports.RenderTree, { node: footer, isEditor: isEditor, onSelect: onSelect, onUpdate: onUpdate }), globalComponents.map((comp) => ((0, jsx_runtime_1.jsx)(exports.RenderTree, { node: comp, isEditor: isEditor, onSelect: onSelect, onUpdate: onUpdate }, comp.id)))] }));
};
exports.SiteShell = SiteShell;
//# sourceMappingURL=RenderTree.js.map