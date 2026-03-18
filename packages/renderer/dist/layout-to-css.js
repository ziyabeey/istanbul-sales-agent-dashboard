"use strict";
/**
 * @kepenk/renderer — Layout to CSS Converter
 * Converts ComponentNode.layout and ComponentNode.style to React CSSProperties.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.layoutToCSS = layoutToCSS;
exports.styleToCSS = styleToCSS;
exports.nodeToCSS = nodeToCSS;
/** Convert a SizeValue to a CSS string */
function sizeToCSS(size) {
    if (size.unit === 'auto')
        return 'auto';
    if (size.unit === 'min-content')
        return 'min-content';
    if (size.unit === 'max-content')
        return 'max-content';
    return `${size.value}${size.unit}`;
}
/** Convert Spacing to individual CSS properties */
function spacingToCSS(spacing, prefix) {
    return {
        [`${prefix}Top`]: spacing.top,
        [`${prefix}Right`]: spacing.right,
        [`${prefix}Bottom`]: spacing.bottom,
        [`${prefix}Left`]: spacing.left,
    };
}
/** Convert a Layout object to React CSSProperties */
function layoutToCSS(layout) {
    if (!layout)
        return {};
    const css = {};
    if (layout.display)
        css.display = layout.display;
    if (layout.flexDirection)
        css.flexDirection = layout.flexDirection;
    if (layout.justifyContent)
        css.justifyContent = layout.justifyContent;
    if (layout.alignItems)
        css.alignItems = layout.alignItems;
    if (layout.gap)
        css.gap = layout.gap;
    if (layout.gridTemplateColumns)
        css.gridTemplateColumns = layout.gridTemplateColumns;
    if (layout.gridTemplateRows)
        css.gridTemplateRows = layout.gridTemplateRows;
    if (layout.overflow)
        css.overflow = layout.overflow;
    if (layout.position)
        css.position = layout.position;
    if (layout.zIndex !== undefined)
        css.zIndex = layout.zIndex;
    if (layout.width)
        css.width = sizeToCSS(layout.width);
    if (layout.height)
        css.height = sizeToCSS(layout.height);
    if (layout.minHeight)
        css.minHeight = sizeToCSS(layout.minHeight);
    if (layout.maxWidth)
        css.maxWidth = sizeToCSS(layout.maxWidth);
    if (layout.padding)
        Object.assign(css, spacingToCSS(layout.padding, 'padding'));
    if (layout.margin)
        Object.assign(css, spacingToCSS(layout.margin, 'margin'));
    return css;
}
/** Convert a Style object to React CSSProperties */
function styleToCSS(style) {
    if (!style)
        return {};
    const css = {};
    if (style.backgroundColor)
        css.backgroundColor = style.backgroundColor;
    if (style.backgroundSize)
        css.backgroundSize = style.backgroundSize;
    if (style.backgroundPosition)
        css.backgroundPosition = style.backgroundPosition;
    if (style.borderRadius)
        css.borderRadius = style.borderRadius;
    if (style.boxShadow)
        css.boxShadow = style.boxShadow;
    if (style.opacity !== undefined)
        css.opacity = style.opacity;
    if (style.color)
        css.color = style.color;
    // Background image
    if (style.backgroundImage?.url) {
        css.backgroundImage = `url(${style.backgroundImage.url})`;
    }
    // Border
    if (style.border) {
        css.border = `${style.border.width} ${style.border.style} ${style.border.color}`;
    }
    return css;
}
/** Merge layout + style into a single CSSProperties object */
function nodeToCSS(layout, style) {
    return {
        ...layoutToCSS(layout),
        ...styleToCSS(style),
    };
}
//# sourceMappingURL=layout-to-css.js.map