"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpacerRenderer = exports.DividerRenderer = exports.ButtonRenderer = exports.ImageRenderer = exports.HeadingRenderer = exports.TextRenderer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const layout_to_css_1 = require("../layout-to-css");
// ── Text ──
// Paragraph text with alignment, size
const TextRenderer = ({ node, isEditor, onSelect }) => {
    const css = (0, layout_to_css_1.nodeToCSS)(node.layout, node.style);
    const data = node.data || {};
    const sizeMap = {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
    };
    const handleClick = (e) => {
        if (isEditor && onSelect) {
            e.stopPropagation();
            onSelect(node.id);
        }
    };
    return ((0, jsx_runtime_1.jsx)("p", { id: node.id, "data-component-type": node.type, "data-component-id": node.id, style: {
            fontSize: sizeMap[data.size] || '1rem',
            textAlign: data.alignment || 'left',
            lineHeight: 1.7,
            margin: 0,
            ...css,
        }, onClick: handleClick, ...(/<[a-z][\s\S]*?>/i.test(data.text || '')
            ? { dangerouslySetInnerHTML: { __html: data.text } }
            : { children: data.text || '' }) }));
};
exports.TextRenderer = TextRenderer;
// ── Heading ──
// h1-h6 with level prop
const HeadingRenderer = ({ node, isEditor, onSelect }) => {
    const css = (0, layout_to_css_1.nodeToCSS)(node.layout, node.style);
    const data = node.data || {};
    const level = data.level || 'h2';
    const Tag = level;
    const sizeMap = {
        h1: '2.5rem',
        h2: '2rem',
        h3: '1.75rem',
        h4: '1.5rem',
        h5: '1.25rem',
        h6: '1rem',
    };
    const handleClick = (e) => {
        if (isEditor && onSelect) {
            e.stopPropagation();
            onSelect(node.id);
        }
    };
    return ((0, jsx_runtime_1.jsx)(Tag, { id: node.id, "data-component-type": node.type, "data-component-id": node.id, style: {
            fontSize: sizeMap[level] || '2rem',
            fontWeight: 700,
            textAlign: data.alignment || 'left',
            lineHeight: 1.2,
            margin: 0,
            fontFamily: 'var(--font-heading, inherit)',
            ...css,
        }, onClick: handleClick, ...(/<[a-z][\s\S]*?>/i.test(data.text || '')
            ? { dangerouslySetInnerHTML: { __html: data.text } }
            : { children: data.text || '' }) }));
};
exports.HeadingRenderer = HeadingRenderer;
// ── Image ──
// Optimized image with alt text
const ImageRenderer = ({ node, isEditor, onSelect }) => {
    const css = (0, layout_to_css_1.nodeToCSS)(node.layout, node.style);
    const data = node.data || {};
    const handleClick = (e) => {
        if (isEditor && onSelect) {
            e.stopPropagation();
            onSelect(node.id);
        }
    };
    return ((0, jsx_runtime_1.jsx)("img", { id: node.id, "data-component-type": node.type, "data-component-id": node.id, src: data.src || '', alt: data.alt || '', loading: "lazy", style: {
            maxWidth: '100%',
            height: 'auto',
            display: 'block',
            objectFit: data.objectFit || 'cover',
            ...css,
        }, onClick: handleClick }));
};
exports.ImageRenderer = ImageRenderer;
// ── Button ──
// Styled button/link with variants
const ButtonRenderer = ({ node, isEditor, onSelect }) => {
    const css = (0, layout_to_css_1.nodeToCSS)(node.layout, node.style);
    const data = node.data || {};
    const variant = data.variant || 'primary';
    const variantStyles = {
        primary: {
            backgroundColor: 'var(--color-accent, #c84b31)',
            color: '#ffffff',
            border: 'none',
        },
        secondary: {
            backgroundColor: 'transparent',
            color: 'var(--color-accent, #c84b31)',
            border: '2px solid var(--color-accent, #c84b31)',
        },
        ghost: {
            backgroundColor: 'transparent',
            color: 'var(--color-text, #1a1a2e)',
            border: '1px solid currentColor',
        },
    };
    const handleClick = (e) => {
        if (isEditor) {
            e.preventDefault();
            e.stopPropagation();
            onSelect?.(node.id);
            return;
        }
        // In published mode, handle interactions
        if (node.interactions?.onClick) {
            const action = node.interactions.onClick;
            if (action.type === 'navigate' || action.type === 'open-url') {
                if (action.openInNewTab) {
                    window.open(action.target, '_blank');
                }
                else {
                    window.location.href = action.target;
                }
            }
            else if (action.type === 'phone') {
                window.location.href = `tel:${action.target}`;
            }
            else if (action.type === 'whatsapp') {
                window.open(`https://wa.me/${action.target.replace(/\D/g, '')}`, '_blank');
            }
        }
    };
    return ((0, jsx_runtime_1.jsxs)("button", { id: node.id, "data-component-type": node.type, "data-component-id": node.id, style: {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px 28px',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontFamily: 'inherit',
            ...(variantStyles[variant] || variantStyles.primary),
            ...css,
        }, onClick: handleClick, children: [data.icon && (0, jsx_runtime_1.jsx)("span", { style: { marginRight: '8px' }, children: data.icon }), data.text || 'Buton'] }));
};
exports.ButtonRenderer = ButtonRenderer;
// ── Divider ──
// Horizontal rule/separator
const DividerRenderer = ({ node }) => {
    const css = (0, layout_to_css_1.nodeToCSS)(node.layout, node.style);
    return ((0, jsx_runtime_1.jsx)("hr", { id: node.id, "data-component-type": node.type, "data-component-id": node.id, style: {
            width: '100%',
            border: 'none',
            borderTop: '1px solid var(--color-border, #e5e7eb)',
            margin: '24px 0',
            ...css,
        } }));
};
exports.DividerRenderer = DividerRenderer;
// ── Spacer ──
// Empty vertical space
const SpacerRenderer = ({ node }) => {
    const data = node.data || {};
    return ((0, jsx_runtime_1.jsx)("div", { id: node.id, "data-component-type": node.type, "data-component-id": node.id, style: {
            height: data.height || '40px',
            width: '100%',
        } }));
};
exports.SpacerRenderer = SpacerRenderer;
//# sourceMappingURL=Content.js.map