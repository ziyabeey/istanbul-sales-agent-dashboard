"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlexColumnRenderer = exports.FlexRowRenderer = exports.GridRenderer = exports.ContainerRenderer = exports.SectionRenderer = exports.FooterRenderer = exports.HeaderRenderer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const layout_to_css_1 = require("../layout-to-css");
// ── Header ──
// Global site header (sticky navigation bar)
const HeaderRenderer = ({ node, isEditor, children, onSelect }) => {
    const css = (0, layout_to_css_1.nodeToCSS)(node.layout, node.style);
    const handleClick = (e) => {
        if (isEditor && onSelect) {
            e.stopPropagation();
            onSelect(node.id);
        }
    };
    return ((0, jsx_runtime_1.jsx)("header", { id: node.id, "data-component-type": node.type, "data-component-id": node.id, style: {
            width: '100%',
            ...css,
        }, onClick: handleClick, children: children }));
};
exports.HeaderRenderer = HeaderRenderer;
// ── Footer ──
// Global site footer
const FooterRenderer = ({ node, isEditor, children, onSelect }) => {
    const css = (0, layout_to_css_1.nodeToCSS)(node.layout, node.style);
    const handleClick = (e) => {
        if (isEditor && onSelect) {
            e.stopPropagation();
            onSelect(node.id);
        }
    };
    return ((0, jsx_runtime_1.jsx)("footer", { id: node.id, "data-component-type": node.type, "data-component-id": node.id, style: {
            width: '100%',
            ...css,
        }, onClick: handleClick, children: children }));
};
exports.FooterRenderer = FooterRenderer;
// ── Section ──
// Full-width page section with background, min-height, optional overlay
const SectionRenderer = ({ node, isEditor, children, onSelect }) => {
    const css = (0, layout_to_css_1.nodeToCSS)(node.layout, node.style);
    const handleClick = (e) => {
        if (isEditor && onSelect) {
            e.stopPropagation();
            onSelect(node.id);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("section", { id: node.id, "data-component-type": node.type, "data-component-id": node.id, style: {
            width: '100%',
            position: 'relative',
            ...css,
        }, onClick: handleClick, children: [node.style?.backgroundImage?.url && node.data?.overlayOpacity && ((0, jsx_runtime_1.jsx)("div", { style: {
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: node.data.overlayColor || 'rgba(0,0,0,0.4)',
                    opacity: node.data.overlayOpacity,
                    zIndex: 0,
                } })), (0, jsx_runtime_1.jsx)("div", { style: { position: 'relative', zIndex: 1, width: '100%' }, children: children })] }));
};
exports.SectionRenderer = SectionRenderer;
// ── Container ──
// Max-width content wrapper, centers content horizontally
const ContainerRenderer = ({ node, isEditor, children, onSelect }) => {
    const css = (0, layout_to_css_1.nodeToCSS)(node.layout, node.style);
    const handleClick = (e) => {
        if (isEditor && onSelect) {
            e.stopPropagation();
            onSelect(node.id);
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { id: node.id, "data-component-type": node.type, "data-component-id": node.id, style: {
            width: '100%',
            maxWidth: css.maxWidth || '1200px',
            marginLeft: 'auto',
            marginRight: 'auto',
            ...css,
        }, onClick: handleClick, children: children }));
};
exports.ContainerRenderer = ContainerRenderer;
// ── Grid ──
// CSS Grid layout container
const GridRenderer = ({ node, isEditor, children, onSelect }) => {
    const css = (0, layout_to_css_1.nodeToCSS)(node.layout, node.style);
    const handleClick = (e) => {
        if (isEditor && onSelect) {
            e.stopPropagation();
            onSelect(node.id);
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { id: node.id, "data-component-type": node.type, "data-component-id": node.id, style: {
            display: 'grid',
            ...css,
        }, onClick: handleClick, children: children }));
};
exports.GridRenderer = GridRenderer;
// ── FlexRow ──
// Horizontal flex container
const FlexRowRenderer = ({ node, isEditor, children, onSelect }) => {
    const css = (0, layout_to_css_1.nodeToCSS)(node.layout, node.style);
    const handleClick = (e) => {
        if (isEditor && onSelect) {
            e.stopPropagation();
            onSelect(node.id);
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { id: node.id, "data-component-type": node.type, "data-component-id": node.id, style: {
            display: 'flex',
            flexDirection: 'row',
            ...css,
        }, onClick: handleClick, children: children }));
};
exports.FlexRowRenderer = FlexRowRenderer;
// ── FlexColumn ──
// Vertical flex container
const FlexColumnRenderer = ({ node, isEditor, children, onSelect }) => {
    const css = (0, layout_to_css_1.nodeToCSS)(node.layout, node.style);
    const handleClick = (e) => {
        if (isEditor && onSelect) {
            e.stopPropagation();
            onSelect(node.id);
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { id: node.id, "data-component-type": node.type, "data-component-id": node.id, style: {
            display: 'flex',
            flexDirection: 'column',
            ...css,
        }, onClick: handleClick, children: children }));
};
exports.FlexColumnRenderer = FlexColumnRenderer;
//# sourceMappingURL=Layout.js.map