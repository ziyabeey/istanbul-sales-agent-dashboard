/**
 * Content Components: Text, Heading, Image, Button, Divider
 * Leaf/primitive content elements.
 */

import React from 'react'
import type { RendererProps } from '../types'
import { nodeToCSS } from '../layout-to-css'

// ── Text ──
// Paragraph text with alignment, size

export const TextRenderer: React.FC<RendererProps> = ({ node, isEditor, onSelect }) => {
  const css = nodeToCSS(node.layout, node.style)
  const data = node.data || {}

  const sizeMap: Record<string, string> = {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
  }

  const handleClick = (e: React.MouseEvent) => {
    if (isEditor && onSelect) {
      e.stopPropagation()
      onSelect(node.id)
    }
  }

  return (
    <p
      id={node.id}
      data-component-type={node.type}
      data-component-id={node.id}
      style={{
        fontSize: sizeMap[data.size as string] || '1rem',
        textAlign: (data.alignment as React.CSSProperties['textAlign']) || 'left',
        lineHeight: 1.7,
        margin: 0,
        ...css,
      }}
      onClick={handleClick}
      {...(/<[a-z][\s\S]*?>/i.test(data.text as string || '')
        ? { dangerouslySetInnerHTML: { __html: data.text as string } }
        : { children: data.text as string || '' }
      )}
    />
  )
}

// ── Heading ──
// h1-h6 with level prop

export const HeadingRenderer: React.FC<RendererProps> = ({ node, isEditor, onSelect }) => {
  const css = nodeToCSS(node.layout, node.style)
  const data = node.data || {}
  const level = (data.level as string) || 'h2'
  const Tag = level as keyof React.JSX.IntrinsicElements

  const sizeMap: Record<string, string> = {
    h1: '2.5rem',
    h2: '2rem',
    h3: '1.75rem',
    h4: '1.5rem',
    h5: '1.25rem',
    h6: '1rem',
  }

  const handleClick = (e: React.MouseEvent) => {
    if (isEditor && onSelect) {
      e.stopPropagation()
      onSelect(node.id)
    }
  }

  return (
    <Tag
      id={node.id}
      data-component-type={node.type}
      data-component-id={node.id}
      style={{
        fontSize: sizeMap[level] || '2rem',
        fontWeight: 700,
        textAlign: (data.alignment as React.CSSProperties['textAlign']) || 'left',
        lineHeight: 1.2,
        margin: 0,
        fontFamily: 'var(--font-heading, inherit)',
        ...css,
      }}
      onClick={handleClick}
      {...(/<[a-z][\s\S]*?>/i.test(data.text as string || '')
        ? { dangerouslySetInnerHTML: { __html: data.text as string } }
        : { children: data.text as string || '' }
      )}
    />
  )
}

// ── Image ──
// Optimized image with alt text

export const ImageRenderer: React.FC<RendererProps> = ({ node, isEditor, onSelect }) => {
  const css = nodeToCSS(node.layout, node.style)
  const data = node.data || {}

  const handleClick = (e: React.MouseEvent) => {
    if (isEditor && onSelect) {
      e.stopPropagation()
      onSelect(node.id)
    }
  }

  return (
    <img
      id={node.id}
      data-component-type={node.type}
      data-component-id={node.id}
      src={data.src as string || ''}
      alt={data.alt as string || ''}
      loading="lazy"
      style={{
        maxWidth: '100%',
        height: 'auto',
        display: 'block',
        objectFit: (data.objectFit as React.CSSProperties['objectFit']) || 'cover',
        ...css,
      }}
      onClick={handleClick}
    />
  )
}

// ── Button ──
// Styled button/link with variants

export const ButtonRenderer: React.FC<RendererProps> = ({ node, isEditor, onSelect }) => {
  const css = nodeToCSS(node.layout, node.style)
  const data = node.data || {}
  const variant = (data.variant as string) || 'primary'

  const variantStyles: Record<string, React.CSSProperties> = {
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
  }

  const handleClick = (e: React.MouseEvent) => {
    if (isEditor) {
      e.preventDefault()
      e.stopPropagation()
      onSelect?.(node.id)
      return
    }
    // In published mode, handle interactions
    if (node.interactions?.onClick) {
      const action = node.interactions.onClick
      if (action.type === 'navigate' || action.type === 'open-url') {
        if (action.openInNewTab) {
          window.open(action.target, '_blank')
        } else {
          window.location.href = action.target
        }
      } else if (action.type === 'phone') {
        window.location.href = `tel:${action.target}`
      } else if (action.type === 'whatsapp') {
        window.open(`https://wa.me/${action.target.replace(/\D/g, '')}`, '_blank')
      }
    }
  }

  return (
    <button
      id={node.id}
      data-component-type={node.type}
      data-component-id={node.id}
      style={{
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
      }}
      onClick={handleClick}
    >
      {data.icon && <span style={{ marginRight: '8px' }}>{data.icon as string}</span>}
      {data.text as string || 'Buton'}
    </button>
  )
}

// ── Divider ──
// Horizontal rule/separator

export const DividerRenderer: React.FC<RendererProps> = ({ node }) => {
  const css = nodeToCSS(node.layout, node.style)

  return (
    <hr
      id={node.id}
      data-component-type={node.type}
      data-component-id={node.id}
      style={{
        width: '100%',
        border: 'none',
        borderTop: '1px solid var(--color-border, #e5e7eb)',
        margin: '24px 0',
        ...css,
      }}
    />
  )
}

// ── Spacer ──
// Empty vertical space

export const SpacerRenderer: React.FC<RendererProps> = ({ node }) => {
  const data = node.data || {}
  return (
    <div
      id={node.id}
      data-component-type={node.type}
      data-component-id={node.id}
      style={{
        height: (data.height as string) || '40px',
        width: '100%',
      }}
    />
  )
}
