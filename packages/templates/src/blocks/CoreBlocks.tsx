import React from 'react'
import * as LucideIcons from 'lucide-react'
import { BlockNode, BlockStyleProps } from '../types/ast-types'
import { BusinessData } from '../types/section-types'
import { resolveTemplateVars } from '../lib/template-resolver'

interface BlockComponentProps {
  node: BlockNode
  business: BusinessData
  children?: React.ReactNode
  isEditMode?: boolean
}

// Convert JSON styles to React CSSProperties
function mapStyles(styles?: BlockStyleProps): React.CSSProperties {
  if (!styles) return {}
  
  // Create a clean object for React styles
  const reactStyles: any = { ...styles }
  
  // Remove pseudo-classes from inline styles (we'll need a different strategy for these later, 
  // like generating a dynamic <style> tag or using a CSS-in-JS library, 
  // but for Phase 1 we stick to basic inline styles mapping)
  delete reactStyles._hover
  delete reactStyles._focus
  delete reactStyles._active
  delete reactStyles._sm
  delete reactStyles._md
  delete reactStyles._lg
  delete reactStyles._xl

  return reactStyles as React.CSSProperties
}

// Helper to resolve dynamic content using the existing template resolver
function getDynamicContent(content?: string, dynamicPath?: string, business?: BusinessData) {
  if (dynamicPath && business) {
    // E.g. dynamicPath = "business.name" -> we need a way to extract it.
    // resolveTemplateVars already supports {{business.name}} syntax.
    const resolved = resolveTemplateVars({ text: `{{${dynamicPath}}}` }, business)
    return (resolved as any).text || content
  }
  return content
}

function useEditModeProps(node: BlockNode, isEditMode?: boolean, existingClassName?: string) {
  if (!isEditMode) return { className: existingClassName }
  return {
    'data-node-id': node.id,
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation()
      window.parent.postMessage({ type: 'ke-select-node', nodeId: node.id, nodeType: node.type }, '*')
    },
    className: existingClassName ? `${existingClassName} outline-dashed outline-1 outline-transparent hover:outline-blue-500 hover:bg-blue-50/10 transition-all cursor-pointer` : 'outline-dashed outline-1 outline-transparent hover:outline-blue-500 hover:bg-blue-50/10 transition-all cursor-pointer'
  }
}

export const BoxBlock = ({ node, children, isEditMode }: BlockComponentProps) => {
  return (
    <div style={mapStyles(node.styles)} {...useEditModeProps(node, isEditMode, node.className)}>
      {children}
    </div>
  )
}

export const FlexBlock = ({ node, children, isEditMode }: BlockComponentProps) => {
  const styles = mapStyles(node.styles)
  styles.display = 'flex'
  return (
    <div style={styles} {...useEditModeProps(node, isEditMode, node.className)}>
      {children}
    </div>
  )
}

export const GridBlock = ({ node, children, isEditMode }: BlockComponentProps) => {
  const styles = mapStyles(node.styles)
  styles.display = 'grid'
  return (
    <div style={styles} {...useEditModeProps(node, isEditMode, node.className)}>
      {children}
    </div>
  )
}

export const TypographyBlock = ({ node, business, isEditMode }: BlockComponentProps) => {
  const props = node.typographyProps || {}
  const content = getDynamicContent(props.content, props.dynamicContentPath, business)
  const Tag = props.variant || 'p'
  
  return (
    <Tag style={mapStyles(node.styles)} {...useEditModeProps(node, isEditMode, node.className)}>
      {content}
    </Tag>
  )
}

export const ImageBlock = ({ node, business, isEditMode }: BlockComponentProps) => {
  const props = node.imageProps || {}
  const src = getDynamicContent(props.src, props.dynamicSrcPath, business) || '/placeholder.jpg'
  
  const styles = mapStyles(node.styles)
  if (props.objectFit) {
    styles.objectFit = props.objectFit
  }

  return (
    <img 
      src={src} 
      alt={props.alt || ''} 
      style={styles} 
      {...useEditModeProps(node, isEditMode, node.className)}
    />
  )
}

export const ButtonBlock = ({ node, business, children, isEditMode }: BlockComponentProps) => {
  const props = node.buttonProps || {}
  const content = getDynamicContent(props.content, props.dynamicContentPath, business)
  
  if (props.action === 'link' || props.href) {
    return (
      <a 
        href={props.href || '#'} 
        target={props.target} 
        style={mapStyles(node.styles)} 
        {...useEditModeProps(node, isEditMode, node.className)}
      >
        {content}
        {children}
      </a>
    )
  }

  return (
    <button 
      type={props.action === 'submit' ? 'submit' : 'button'}
      style={mapStyles(node.styles)} 
      {...useEditModeProps(node, isEditMode, node.className)}
    >
      {content}
      {children}
    </button>
  )
}

export const IconBlock = ({ node, isEditMode }: BlockComponentProps) => {
  const props = node.iconProps
  if (!props || !props.name) return null

  // Capitalize name to match Lucide exports (e.g. "target" -> "Target")
  const iconName = props.name.charAt(0).toUpperCase() + props.name.slice(1)
  const IconComponent = (LucideIcons as any)[iconName]

  if (!IconComponent) return null

  return (
    <IconComponent 
      size={props.size || 24} 
      color={props.color || 'currentColor'} 
      style={mapStyles(node.styles)}
      {...useEditModeProps(node, isEditMode, node.className)}
    />
  )
}

export const SpacerBlock = ({ node, isEditMode }: BlockComponentProps) => {
  // A simple block just for spacing
  return <div style={mapStyles(node.styles)} aria-hidden="true" {...useEditModeProps(node, isEditMode, node.className)} />
}
