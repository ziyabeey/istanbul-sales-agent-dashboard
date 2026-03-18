/**
 * @kepenk/studio — Design Template + Canvas Types
 *
 * Fabric.js v7 based design editor for social media posts,
 * stories, menus, and marketing materials.
 */

export type DesignCategory =
  | 'instagram_post'
  | 'instagram_story'
  | 'facebook_post'
  | 'whatsapp_status'
  | 'twitter_post'
  | 'youtube_thumbnail'
  | 'menu_poster'

export interface DesignTemplate {
  id: string
  name: string
  category: DesignCategory
  width: number
  height: number
  canvasJSON: string           // Fabric.js toJSON()
  thumbnail: string
  sectorId?: string
  placeholders: Placeholder[]
  tags: string[]
  isPremium: boolean
  createdAt: string
}

export interface Placeholder {
  objectName: string           // Fabric.js object name
  type: 'text' | 'image' | 'logo' | 'qr'
  label: string                // "İşletme Adı", "Ürün Fotoğrafı"
  dataField?: string           // Auto-fill: 'businessName', 'logoUrl', 'phone'
}

// ═══ Size Presets (2026) ═══

export interface SizePreset {
  category: DesignCategory
  label: string
  width: number
  height: number
  icon: string
}

export const SIZE_PRESETS: SizePreset[] = [
  { category: 'instagram_post', label: 'Instagram Post', width: 1080, height: 1080, icon: '📱' },
  { category: 'instagram_story', label: 'Instagram Story', width: 1080, height: 1920, icon: '📲' },
  { category: 'facebook_post', label: 'Facebook Post', width: 1080, height: 1080, icon: '👤' },
  { category: 'whatsapp_status', label: 'WhatsApp Durum', width: 1080, height: 1920, icon: '💬' },
  { category: 'twitter_post', label: 'X/Twitter Post', width: 1200, height: 675, icon: '🐦' },
  { category: 'youtube_thumbnail', label: 'YouTube Thumbnail', width: 1280, height: 720, icon: '▶️' },
  { category: 'menu_poster', label: 'Menü Afişi (A4)', width: 2480, height: 3508, icon: '🍽️' },
]

// ═══ Export ═══

export type ExportFormat = 'png' | 'jpeg' | 'webp'

export interface ExportConfig {
  format: ExportFormat
  quality: number              // 0-1 for jpeg/webp
  multiplier: number           // 2x for retina
}

export const EXPORT_PRESETS: Record<string, ExportConfig> = {
  high_png: { format: 'png', quality: 1, multiplier: 2 },
  social_jpeg: { format: 'jpeg', quality: 0.92, multiplier: 1 },
  web_webp: { format: 'webp', quality: 0.85, multiplier: 1 },
}

// ═══ Canvas Object Types ═══

export type CanvasObjectType = 'text' | 'image' | 'rect' | 'circle' | 'line' | 'group'

export interface CanvasObjectProperties {
  fill?: string
  stroke?: string
  strokeWidth?: number
  opacity?: number
  fontSize?: number
  fontFamily?: string
  fontWeight?: string
  textAlign?: 'left' | 'center' | 'right'
  shadow?: { color: string; blur: number; offsetX: number; offsetY: number }
}
