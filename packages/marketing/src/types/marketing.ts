/**
 * @kepenk/marketing — Meta CAPI + Audience + Ad Budget Types
 */

// ═══ Server Events (Meta Conversions API) ═══

export type CAPIEventName = 'Purchase' | 'AddToCart' | 'ViewContent' | 'Lead' | 'InitiateCheckout' | 'CompleteRegistration' | 'Search'

export interface CAPIServerEvent {
  event_name: CAPIEventName
  event_time: number           // Unix timestamp
  event_id: string             // Client+server dedup key
  user_data: CAPIUserData
  custom_data?: CAPICustomData
  event_source_url?: string
  action_source: 'website'
}

export interface CAPIUserData {
  em?: string                  // SHA256(email)
  ph?: string                  // SHA256(phone)
  fn?: string                  // SHA256(first_name)
  ln?: string                  // SHA256(last_name)
  ct?: string                  // SHA256(city)
  country?: string             // SHA256('tr')
  client_ip_address: string
  client_user_agent: string
  fbc?: string                 // Facebook click ID
  fbp?: string                 // Facebook browser ID
}

export interface CAPICustomData {
  value?: number
  currency?: string
  content_ids?: string[]
  content_type?: string
  order_id?: string
}

// ═══ Custom Audiences ═══

export type AudienceType = 'site_visitors' | 'cart_abandoners' | 'past_customers' | 'lookalike'

export interface CustomAudience {
  id: string
  name: string
  type: AudienceType
  platform: 'meta' | 'google'
  size: number
  status: 'building' | 'ready' | 'expired'
  description: string
  createdAt: string
  updatedAt: string
}

export const AUDIENCE_PRESETS: { type: AudienceType; label: string; desc: string; icon: string }[] = [
  { type: 'site_visitors', label: 'Site Ziyaretçileri', desc: 'Son 30 gün siteyi ziyaret eden ama satın almayan', icon: '🌐' },
  { type: 'cart_abandoners', label: 'Sepet Terk Edenler', desc: 'Sepete ekledi ama satın almadı', icon: '🛒' },
  { type: 'past_customers', label: 'Eski Müşteriler', desc: '30+ gündür gelmemiş mevcut müşteriler', icon: '👤' },
  { type: 'lookalike', label: 'Benzer Kitle', desc: 'En iyi müşterilerinize benzeyen kişiler', icon: '👥' },
]

// ═══ Ad Budget ═══

export type AdPlatform = 'meta' | 'google' | 'tiktok'

export interface AdBudget {
  id: string
  siteId: string
  yearMonth: string
  totalBudget: number          // kuruş
  spent: Record<AdPlatform, number>
  remaining: number
  commissionRate: number       // 0.10-0.15 (%10-15)
  commissionAmount: number
  campaigns: AdCampaign[]
}

export interface AdCampaign {
  id: string
  platform: AdPlatform
  name: string
  budget: number               // kuruş
  spent: number
  status: 'active' | 'paused' | 'completed'
  impressions: number
  clicks: number
  conversions: number
  ctr: number                  // click-through rate %
  roas: number                 // return on ad spend
}

export const PLATFORM_LABELS: Record<AdPlatform, { label: string; color: string; icon: string }> = {
  meta: { label: 'Meta (FB/IG)', color: '#1877F2', icon: '📘' },
  google: { label: 'Google Ads', color: '#4285F4', icon: '🔍' },
  tiktok: { label: 'TikTok Ads', color: '#000000', icon: '🎵' },
}

/**
 * Calculate ROAS (Return on Ad Spend).
 */
export function calculateROAS(revenue: number, adSpend: number): number {
  if (adSpend === 0) return 0
  return Math.round((revenue / adSpend) * 100) / 100
}

/**
 * Calculate CTR (Click-Through Rate).
 */
export function calculateCTR(clicks: number, impressions: number): number {
  if (impressions === 0) return 0
  return Math.round((clicks / impressions) * 10000) / 100
}
