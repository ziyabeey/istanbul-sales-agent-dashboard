import React from 'react'
import { BlockNode } from '../types/ast-types'
import { BusinessData } from '../types/section-types'
import { 
  BoxBlock, 
  FlexBlock, 
  GridBlock, 
  TypographyBlock, 
  ImageBlock, 
  ButtonBlock, 
  IconBlock, 
  SpacerBlock 
} from '../blocks/CoreBlocks'

interface BlockRendererProps {
  node: BlockNode
  business: BusinessData
  isEditMode?: boolean
}

export function BlockRenderer({ node, business, isEditMode }: BlockRendererProps) {
  // Recursively render children
  const renderChildren = () => {
    if (!node.children || node.children.length === 0) return null
    return node.children.map((childNode, index) => (
      <BlockRenderer 
        key={childNode.id || `node-${index}`} 
        node={childNode} 
        business={business} 
        isEditMode={isEditMode}
      />
    ))
  }

  // Switch based on node type
  switch (node.type) {
    case 'Box':
      return <BoxBlock node={node} business={business} isEditMode={isEditMode}>{renderChildren()}</BoxBlock>
    
    case 'Flex':
      return <FlexBlock node={node} business={business} isEditMode={isEditMode}>{renderChildren()}</FlexBlock>
    
    case 'Grid':
      return <GridBlock node={node} business={business} isEditMode={isEditMode}>{renderChildren()}</GridBlock>
    
    case 'Typography':
      return <TypographyBlock node={node} business={business} isEditMode={isEditMode} />
    
    case 'Image':
      return <ImageBlock node={node} business={business} isEditMode={isEditMode} />
    
    case 'Button':
      return <ButtonBlock node={node} business={business} isEditMode={isEditMode}>{renderChildren()}</ButtonBlock>
    
    case 'Icon':
      return <IconBlock node={node} business={business} isEditMode={isEditMode} />
    
    case 'Spacer':
      return <SpacerBlock node={node} business={business} isEditMode={isEditMode} />
      
    default:
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Bilinmeyen blok tipi: ${node.type}`)
      }
      return null
  }
}
