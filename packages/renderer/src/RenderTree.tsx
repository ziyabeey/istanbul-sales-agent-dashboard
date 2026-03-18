/**
 * @kepenk/renderer — RenderTree
 * Recursive React component that walks a ComponentNode tree
 * and renders each node using the component registry.
 */

import React from 'react'
import type { ComponentNode } from '@kepenk/site-schema'
import { COMPONENT_REGISTRY } from './registry'

interface RenderTreeProps {
  /** Root component node to render */
  node: ComponentNode
  /** Editor mode enables selection and editing interactions */
  isEditor: boolean
  /** Called when a component is selected (editor mode) */
  onSelect?: (nodeId: string) => void
  /** Called when a component's data changes (editor mode) */
  onUpdate?: (nodeId: string, changes: Partial<ComponentNode>) => void
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
export const RenderTree: React.FC<RenderTreeProps> = ({ node, isEditor, onSelect, onUpdate }) => {
  // Skip invisible nodes based on current context
  // In SSR/publish mode, we still render but use CSS to hide
  // (actual responsive hiding would be done via media queries in production)
  if (!node.visibility.desktop && !node.visibility.tablet && !node.visibility.mobile) {
    return null
  }

  // Look up the renderer for this component type
  const Renderer = COMPONENT_REGISTRY[node.type]

  // If no renderer found, render a debug placeholder in editor mode, or skip in published mode
  if (!Renderer) {
    if (isEditor) {
      return (
        <div
          data-component-type={node.type}
          data-component-id={node.id}
          style={{
            padding: '16px',
            border: '1px dashed #ccc',
            borderRadius: '6px',
            textAlign: 'center',
            color: '#999',
            fontSize: '13px',
            margin: '4px 0',
          }}
        >
          🧩 {node.type} ({node.id}) — Renderer bulunamadı
        </div>
      )
    }
    return null
  }

  // Recursively render children
  const renderedChildren = node.children.length > 0 ? (
    <>
      {node.children.map((child) => (
        <RenderTree
          key={child.id}
          node={child}
          isEditor={isEditor}
          onSelect={onSelect}
          onUpdate={onUpdate}
        />
      ))}
    </>
  ) : undefined

  // Render this node with its children
  return (
    <Renderer
      node={node}
      isEditor={isEditor}
      onSelect={onSelect}
      onUpdate={onUpdate}
    >
      {renderedChildren}
    </Renderer>
  )
}

/**
 * SiteShell: Wraps page content with master page elements (header, footer, globals).
 * Used during SSR to produce the full page structure.
 */
interface SiteShellProps {
  header: ComponentNode
  footer: ComponentNode
  globalComponents?: ComponentNode[]
  children?: React.ReactNode
  isEditor: boolean
  onSelect?: (nodeId: string) => void
  onUpdate?: (nodeId: string, changes: Partial<ComponentNode>) => void
}

export const SiteShell: React.FC<SiteShellProps> = ({
  header,
  footer,
  globalComponents = [],
  children,
  isEditor,
  onSelect,
  onUpdate,
}) => {
  return (
    <>
      {/* Global header */}
      <RenderTree node={header} isEditor={isEditor} onSelect={onSelect} onUpdate={onUpdate} />

      {/* Page content (passed as children) */}
      <main>{children}</main>

      {/* Global footer */}
      <RenderTree node={footer} isEditor={isEditor} onSelect={onSelect} onUpdate={onUpdate} />

      {/* Global floating components (WhatsApp bubble, cookie banner, etc.) */}
      {globalComponents.map((comp) => (
        <RenderTree
          key={comp.id}
          node={comp}
          isEditor={isEditor}
          onSelect={onSelect}
          onUpdate={onUpdate}
        />
      ))}
    </>
  )
}
