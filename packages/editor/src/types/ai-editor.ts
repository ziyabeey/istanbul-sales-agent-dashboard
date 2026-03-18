/**
 * @kepenk/editor — AI Editor Types
 */

export interface AIEditorMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  toolResults?: AIToolResult[]
  tokenCost?: number
  timestamp: string
}

export interface AIToolResult {
  blockId?: string
  action: string
  success: boolean
  description?: string
}

export interface AIUsage {
  tokensUsed: number
  tokensLimit: number
  operations: AIOperation[]
}

export interface AIOperation {
  type: string
  cost: number
  timestamp: string
}

export const TOKEN_LIMITS: Record<string, number> = {
  baslangic: 20,
  buyume: 50,
  pro: 150,
  enterprise: -1,  // unlimited
}

export const TOOL_COSTS: Record<string, number> = {
  update_block_content: 1,
  change_block_image: 1,
  change_theme_colors: 1,
  add_block: 2,
  remove_block: 1,
  swap_block_variant: 2,
  reorder_blocks: 1,
}

/** Quick action buttons for the AI chat */
export const AI_QUICK_ACTIONS = [
  { id: 'color', icon: '🎨', label: 'Renk Değiştir', prompt: 'Sitemin renklerini değiştirmek istiyorum.' },
  { id: 'text', icon: '📝', label: 'Metin Düzenle', prompt: 'Sitedeki metinleri düzenlemek istiyorum.' },
  { id: 'image', icon: '🖼️', label: 'Görsel Değiştir', prompt: 'Sitedeki görselleri değiştirmek istiyorum.' },
  { id: 'add', icon: '➕', label: 'Bölüm Ekle', prompt: 'Siteye yeni bir bölüm eklemek istiyorum.' },
  { id: 'swap', icon: '🔄', label: 'Bölüm Değiştir', prompt: 'Bir bölümün tasarımını değiştirmek istiyorum.' },
] as const
