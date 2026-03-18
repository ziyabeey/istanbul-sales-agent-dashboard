/**
 * @kepenk/influencer — Campaign + Post Monitoring Types
 */

export type CampaignContentType = 'instagram_post' | 'instagram_story' | 'instagram_reel' | 'tiktok_video'

export type CampaignStatus =
  | 'pending' | 'accepted' | 'content_submitted' | 'published'
  | 'verified' | 'payment_released' | 'disputed' | 'cancelled'

export interface InfluencerCampaign {
  id: string
  esnafId: string
  influencerId: string

  type: CampaignContentType
  brief: string
  requirements: CampaignRequirements

  agreedPrice: number
  commissionRate: number       // 0.15 = %15
  commissionAmount: number
  netPayment: number
  escrowId?: string

  status: CampaignStatus
  postUrl?: string
  postId?: string
  publishedAt?: string
  lastVerifiedAt?: string
  isPostStillLive?: boolean

  deadline: string
  paymentReleasedAt?: string
  createdAt: string
  updatedAt: string
}

export interface CampaignRequirements {
  hashtags: string[]
  mentions: string[]
  keepDuration: number         // days
  deliverables: string[]
}

export const STATUS_LABELS: Record<CampaignStatus, { label: string; color: string }> = {
  pending:           { label: 'Bekliyor',         color: '#F59E0B' },
  accepted:          { label: 'Kabul Edildi',     color: '#3B82F6' },
  content_submitted: { label: 'İçerik Gönderildi', color: '#8B5CF6' },
  published:         { label: 'Yayınlandı',       color: '#22C55E' },
  verified:          { label: 'Doğrulandı',       color: '#10B981' },
  payment_released:  { label: 'Ödeme Yapıldı',   color: '#059669' },
  disputed:          { label: 'İtiraz Edildi',    color: '#EF4444' },
  cancelled:         { label: 'İptal',            color: '#6B7280' },
}

/**
 * Calculate commission and net payment.
 */
export function calculatePayment(agreedPrice: number, commissionRate: number = 0.15) {
  const commissionAmount = Math.round(agreedPrice * commissionRate)
  return {
    commissionAmount,
    netPayment: agreedPrice - commissionAmount,
  }
}
