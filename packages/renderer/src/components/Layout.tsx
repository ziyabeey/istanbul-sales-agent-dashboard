/**
 * Layout Components: Section, Container, Grid, FlexRow, FlexColumn, Header, Footer
 * These are container components that arrange child elements.
 */

import React from 'react'
import type { RendererProps } from '../types'
import { nodeToCSS } from '../layout-to-css'

// ── Header ──
// Global site header (sticky navigation bar)

export const HeaderRenderer: React.FC<RendererProps> = ({ node, isEditor, children, onSelect }) => {
  const css = nodeToCSS(node.layout, node.style)

  const handleClick = (e: React.MouseEvent) => {
    if (isEditor && onSelect) {
      e.stopPropagation()
      onSelect(node.id)
    }
  }

  return (
    <header
      id={node.id}
      data-component-type={node.type}
      data-component-id={node.id}
      style={{
        width: '100%',
        ...css,
      }}
      onClick={handleClick}
    >
      {children}
    </header>
  )
}

// ── Footer ──
// Global site footer

export const FooterRenderer: React.FC<RendererProps> = ({ node, isEditor, children, onSelect }) => {
  const css = nodeToCSS(node.layout, node.style)

  const handleClick = (e: React.MouseEvent) => {
    if (isEditor && onSelect) {
      e.stopPropagation()
      onSelect(node.id)
    }
  }

  return (
    <footer
      id={node.id}
      data-component-type={node.type}
      data-component-id={node.id}
      style={{
        width: '100%',
        ...css,
      }}
      onClick={handleClick}
    >
      {children}
    </footer>
  )
}

// ── Section ──
// Full-width page section with background, min-height, optional overlay

export const SectionRenderer: React.FC<RendererProps> = ({ node, isEditor, children, onSelect }) => {
  const css = nodeToCSS(node.layout, node.style)

  const handleClick = (e: React.MouseEvent) => {
    if (isEditor && onSelect) {
      e.stopPropagation()
      onSelect(node.id)
    }
  }

  return (
    <section
      id={node.id}
      data-component-type={node.type}
      data-component-id={node.id}
      style={{
        width: '100%',
        position: 'relative',
        ...css,
      }}
      onClick={handleClick}
    >
      {/* Background overlay for images */}
      {node.style?.backgroundImage?.url && node.data?.overlayOpacity && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: node.data.overlayColor || 'rgba(0,0,0,0.4)',
            opacity: node.data.overlayOpacity as number,
            zIndex: 0,
          }}
        />
      )}
      <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        {children}
      </div>
    </section>
  )
}

// ── Container ──
// Max-width content wrapper, centers content horizontally

export const ContainerRenderer: React.FC<RendererProps> = ({ node, isEditor, children, onSelect }) => {
  const css = nodeToCSS(node.layout, node.style)

  const handleClick = (e: React.MouseEvent) => {
    if (isEditor && onSelect) {
      e.stopPropagation()
      onSelect(node.id)
    }
  }

  return (
    <div
      id={node.id}
      data-component-type={node.type}
      data-component-id={node.id}
      style={{
        width: '100%',
        maxWidth: css.maxWidth || '1200px',
        marginLeft: 'auto',
        marginRight: 'auto',
        ...css,
      }}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}

// ── Grid ──
// CSS Grid layout container

export const GridRenderer: React.FC<RendererProps> = ({ node, isEditor, children, onSelect }) => {
  const css = nodeToCSS(node.layout, node.style)

  const handleClick = (e: React.MouseEvent) => {
    if (isEditor && onSelect) {
      e.stopPropagation()
      onSelect(node.id)
    }
  }

  return (
    <div
      id={node.id}
      data-component-type={node.type}
      data-component-id={node.id}
      style={{
        display: 'grid',
        ...css,
      }}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}

// ── FlexRow ──
// Horizontal flex container

export const FlexRowRenderer: React.FC<RendererProps> = ({ node, isEditor, children, onSelect }) => {
  const css = nodeToCSS(node.layout, node.style)

  const handleClick = (e: React.MouseEvent) => {
    if (isEditor && onSelect) {
      e.stopPropagation()
      onSelect(node.id)
    }
  }

  return (
    <div
      id={node.id}
      data-component-type={node.type}
      data-component-id={node.id}
      style={{
        display: 'flex',
        flexDirection: 'row',
        ...css,
      }}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}

// ── FlexColumn ──
// Vertical flex container

export const FlexColumnRenderer: React.FC<RendererProps> = ({ node, isEditor, children, onSelect }) => {
  const css = nodeToCSS(node.layout, node.style)

  const handleClick = (e: React.MouseEvent) => {
    if (isEditor && onSelect) {
      e.stopPropagation()
      onSelect(node.id)
    }
  }

  return (
    <div
      id={node.id}
      data-component-type={node.type}
      data-component-id={node.id}
      style={{
        display: 'flex',
        flexDirection: 'column',
        ...css,
      }}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}
