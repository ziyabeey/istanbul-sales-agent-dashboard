/**
 * @kepenk/renderer — Layout to CSS Converter
 * Converts ComponentNode.layout and ComponentNode.style to React CSSProperties.
 */

import type { Layout, Style, Spacing, SizeValue } from '@kepenk/site-schema'
import type { CSSProperties } from 'react'

/** Convert a SizeValue to a CSS string */
function sizeToCSS(size: SizeValue): string {
  if (size.unit === 'auto') return 'auto'
  if (size.unit === 'min-content') return 'min-content'
  if (size.unit === 'max-content') return 'max-content'
  return `${size.value}${size.unit}`
}

/** Convert Spacing to individual CSS properties */
function spacingToCSS(spacing: Spacing, prefix: 'padding' | 'margin'): CSSProperties {
  return {
    [`${prefix}Top`]: spacing.top,
    [`${prefix}Right`]: spacing.right,
    [`${prefix}Bottom`]: spacing.bottom,
    [`${prefix}Left`]: spacing.left,
  } as CSSProperties
}

/** Convert a Layout object to React CSSProperties */
export function layoutToCSS(layout?: Layout): CSSProperties {
  if (!layout) return {}

  const css: CSSProperties = {}

  if (layout.display) css.display = layout.display
  if (layout.flexDirection) css.flexDirection = layout.flexDirection
  if (layout.justifyContent) css.justifyContent = layout.justifyContent
  if (layout.alignItems) css.alignItems = layout.alignItems
  if (layout.gap) css.gap = layout.gap
  if (layout.gridTemplateColumns) css.gridTemplateColumns = layout.gridTemplateColumns
  if (layout.gridTemplateRows) css.gridTemplateRows = layout.gridTemplateRows
  if (layout.overflow) css.overflow = layout.overflow
  if (layout.position) css.position = layout.position
  if (layout.zIndex !== undefined) css.zIndex = layout.zIndex
  if (layout.width) css.width = sizeToCSS(layout.width)
  if (layout.height) css.height = sizeToCSS(layout.height)
  if (layout.minHeight) css.minHeight = sizeToCSS(layout.minHeight)
  if (layout.maxWidth) css.maxWidth = sizeToCSS(layout.maxWidth)
  if (layout.padding) Object.assign(css, spacingToCSS(layout.padding, 'padding'))
  if (layout.margin) Object.assign(css, spacingToCSS(layout.margin, 'margin'))

  return css
}

/** Convert a Style object to React CSSProperties */
export function styleToCSS(style?: Style): CSSProperties {
  if (!style) return {}

  const css: CSSProperties = {}

  if (style.backgroundColor) css.backgroundColor = style.backgroundColor
  if (style.backgroundSize) css.backgroundSize = style.backgroundSize
  if (style.backgroundPosition) css.backgroundPosition = style.backgroundPosition
  if (style.borderRadius) css.borderRadius = style.borderRadius
  if (style.boxShadow) css.boxShadow = style.boxShadow
  if (style.opacity !== undefined) css.opacity = style.opacity
  if (style.color) css.color = style.color

  // Background image
  if (style.backgroundImage?.url) {
    css.backgroundImage = `url(${style.backgroundImage.url})`
  }

  // Border
  if (style.border) {
    css.border = `${style.border.width} ${style.border.style} ${style.border.color}`
  }

  return css
}

/** Merge layout + style into a single CSSProperties object */
export function nodeToCSS(layout?: Layout, style?: Style): CSSProperties {
  return {
    ...layoutToCSS(layout),
    ...styleToCSS(style),
  }
}
