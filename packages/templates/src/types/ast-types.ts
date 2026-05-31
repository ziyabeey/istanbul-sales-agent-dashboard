export type BlockType = 
  | 'Flex' 
  | 'Grid' 
  | 'Box' 
  | 'Typography' 
  | 'Image' 
  | 'Button' 
  | 'Icon' 
  | 'Spacer'

export interface BlockStyleProps {
  // Layout
  display?: 'flex' | 'grid' | 'block' | 'inline-block' | 'none'
  position?: 'relative' | 'absolute' | 'fixed' | 'sticky' | 'static'
  top?: string
  right?: string
  bottom?: string
  left?: string
  zIndex?: number | string

  // Flexbox / Grid
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  gap?: string
  gridTemplateColumns?: string
  gridTemplateRows?: string

  // Spacing & Sizing
  padding?: string
  paddingTop?: string
  paddingRight?: string
  paddingBottom?: string
  paddingLeft?: string
  margin?: string
  marginTop?: string
  marginRight?: string
  marginBottom?: string
  marginLeft?: string
  width?: string
  height?: string
  maxWidth?: string
  maxHeight?: string
  minWidth?: string
  minHeight?: string

  // Visual
  backgroundColor?: string
  color?: string
  opacity?: number | string
  borderRadius?: string
  border?: string
  boxShadow?: string
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto'
  
  // Typography
  fontSize?: string
  fontWeight?: string | number
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  lineHeight?: string | number
  letterSpacing?: string
  
  // Transitions
  transition?: string
  transform?: string

  // Pseudo-classes (simplified for JSON structure)
  _hover?: Partial<BlockStyleProps>
  _focus?: Partial<BlockStyleProps>
  _active?: Partial<BlockStyleProps>

  // Responsive (mobile-first approach)
  _sm?: Partial<BlockStyleProps>
  _md?: Partial<BlockStyleProps>
  _lg?: Partial<BlockStyleProps>
  _xl?: Partial<BlockStyleProps>
}

// Props specific to certain blocks
export interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'caption' | 'label'
  content?: string
  // If content is dynamic (resolved from BusinessData)
  dynamicContentPath?: string 
}

export interface ImageProps {
  src?: string
  alt?: string
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  dynamicSrcPath?: string // To fetch from business data like business.logo
}

export interface ButtonProps {
  href?: string
  target?: '_blank' | '_self'
  action?: 'submit' | 'link' | 'scroll'
  content?: string
  dynamicContentPath?: string
}

export interface IconProps {
  name: string // e.g., 'Target', 'Settings' (Lucide icon name)
  size?: number | string
  color?: string
}

export interface BlockNode {
  id: string // Unique ID for editor
  type: BlockType
  styles?: BlockStyleProps
  
  // Type-specific props
  typographyProps?: TypographyProps
  imageProps?: ImageProps
  buttonProps?: ButtonProps
  iconProps?: IconProps
  
  // Extensibility
  className?: string // Custom tailwind classes if needed
  
  // Children recursion
  children?: BlockNode[]
}
