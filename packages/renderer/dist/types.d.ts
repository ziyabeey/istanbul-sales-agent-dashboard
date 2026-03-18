/**
 * @kepenk/renderer — Component Renderer Props
 * Shared interface for all component renderers.
 */
import type { ComponentNode } from '@kepenk/site-schema';
export interface RendererProps {
    /** The component tree node to render */
    node: ComponentNode;
    /** Whether we are in editor mode (enables selection, editing) or published mode */
    isEditor: boolean;
    /** Pre-rendered children (from RenderTree recursion) */
    children?: React.ReactNode;
    /** Called when this component is selected in editor mode */
    onSelect?: (nodeId: string) => void;
    /** Called when this component's data is updated in editor mode */
    onUpdate?: (nodeId: string, changes: Partial<ComponentNode>) => void;
}
//# sourceMappingURL=types.d.ts.map