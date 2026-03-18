/**
 * @kepenk/renderer — Component Registry
 * Maps ComponentType enum values to their React renderer components.
 */
import { ComponentType } from '@kepenk/site-schema';
import type { RendererProps } from './types';
/**
 * COMPONENT_REGISTRY: The central mapping from ComponentType → React renderer.
 *
 * When adding a new component type:
 * 1. Add the type to ComponentType enum in @kepenk/site-schema
 * 2. Create the renderer component
 * 3. Register it here
 */
export declare const COMPONENT_REGISTRY: Partial<Record<ComponentType, React.FC<RendererProps>>>;
/**
 * Check if a renderer exists for a given component type.
 */
export declare function hasRenderer(type: ComponentType): boolean;
/**
 * Get the renderer for a given component type, or undefined.
 */
export declare function getRenderer(type: ComponentType): React.FC<RendererProps> | undefined;
//# sourceMappingURL=registry.d.ts.map