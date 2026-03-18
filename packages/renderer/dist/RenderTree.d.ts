/**
 * @kepenk/renderer — RenderTree
 * Recursive React component that walks a ComponentNode tree
 * and renders each node using the component registry.
 */
import React from 'react';
import type { ComponentNode } from '@kepenk/site-schema';
interface RenderTreeProps {
    /** Root component node to render */
    node: ComponentNode;
    /** Editor mode enables selection and editing interactions */
    isEditor: boolean;
    /** Called when a component is selected (editor mode) */
    onSelect?: (nodeId: string) => void;
    /** Called when a component's data changes (editor mode) */
    onUpdate?: (nodeId: string, changes: Partial<ComponentNode>) => void;
}
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
export declare const RenderTree: React.FC<RenderTreeProps>;
/**
 * SiteShell: Wraps page content with master page elements (header, footer, globals).
 * Used during SSR to produce the full page structure.
 */
interface SiteShellProps {
    header: ComponentNode;
    footer: ComponentNode;
    globalComponents?: ComponentNode[];
    children?: React.ReactNode;
    isEditor: boolean;
    onSelect?: (nodeId: string) => void;
    onUpdate?: (nodeId: string, changes: Partial<ComponentNode>) => void;
}
export declare const SiteShell: React.FC<SiteShellProps>;
export {};
//# sourceMappingURL=RenderTree.d.ts.map