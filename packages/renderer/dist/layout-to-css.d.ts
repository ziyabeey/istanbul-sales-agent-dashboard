/**
 * @kepenk/renderer — Layout to CSS Converter
 * Converts ComponentNode.layout and ComponentNode.style to React CSSProperties.
 */
import type { Layout, Style } from '@kepenk/site-schema';
import type { CSSProperties } from 'react';
/** Convert a Layout object to React CSSProperties */
export declare function layoutToCSS(layout?: Layout): CSSProperties;
/** Convert a Style object to React CSSProperties */
export declare function styleToCSS(style?: Style): CSSProperties;
/** Merge layout + style into a single CSSProperties object */
export declare function nodeToCSS(layout?: Layout, style?: Style): CSSProperties;
//# sourceMappingURL=layout-to-css.d.ts.map