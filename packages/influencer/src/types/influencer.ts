/**
 * @kepenk/influencer — Influencer Profile + Campaign Types
 */

export type InfluencerTier = 'nano' | 'micro' | 'mid' | 'macro' | 'mega'
export type InfluencerCategory = 'food' | 'beauty' | 'fitness' | 'lifestyle' | 'tech' | 'fashion' | 'travel' | 'education'
export type VerificationStatus = 'pending' | 'verified' | 'rejected' | 'suspended'

export interface Influencer {
  id: string
  userId?: string

  fullName: string
  bio: string
  profilePhoto: string
  website?: string

  instagram?: InstagramProfile
  tiktok?: TiktokProfile

  categories: InfluencerCategory[]
  tier: InfluencerTier

  pricing: InfluencerPricing
  verificationStatus: VerificationStatus
  fraudScore: number           // 0-100 (high = trustworthy)

  completedCampaigns: number
  avgRating: number
  totalEarnings: number

  createdAt: string
  updatedAt: string
}

export interface InstagramProfile {
  username: string
  followersCount: number
  engagementRate: number
  avgLikes: number
  avgComments: number
  audienceDemographics?: {
    topCountries: { country: string; percentage: number }[]
    ageGroups: { range: string; percentage: number }[]
    genderSplit: { male: number; female: number }
  }
  lastSyncedAt: string
}

export interface TiktokProfile {
  username: string
  followersCount: number
  avgViews: number
  engagementRate: number
  lastSyncedAt: string
}

export interface InfluencerPricing {
  instagramPost: number
  instagramStory: number
  instagramReel: number
  tiktokVideo: number
  lastCalculatedAt: string
}

// ═══ Tier Labels ═══

export const TIER_LABELS: Record<InfluencerTier, { label: string; range: string; color: string }> = {
  nano:  { label: 'Nano',  range: '<5K',      color: '#6B7280' },
  micro: { label: 'Micro', range: '5K-50K',   color: '#3B82F6' },
  mid:   { label: 'Mid',   range: '50K-500K', color: '#8B5CF6' },
  macro: { label: 'Macro', range: '500K-1M',  color: '#F59E0B' },
  mega:  { label: 'Mega',  range: '1M+',      color: '#EF4444' },
}

export const CATEGORY_LABELS: Record<InfluencerCategory, { label: string; icon: string }> = {
  food:      { label: 'Yemek',     icon: '🍽️' },
  beauty:    { label: 'Güzellik',  icon: '💄' },
  fitness:   { label: 'Fitness',   icon: '💪' },
  lifestyle: { label: 'Yaşam',    icon: '✨' },
  tech:      { label: 'Teknoloji', icon: '📱' },
  fashion:   { label: 'Moda',      icon: '👗' },
  travel:    { label: 'Seyahat',   icon: '✈️' },
  education: { label: 'Eğitim',    icon: '📚' },
}

/**
 * Determine tier from follower count.
 */
export function getTierFromFollowers(count: number): InfluencerTier {
  if (count >= 1_000_000) return 'mega'
  if (count >= 500_000) return 'macro'
  if (count >= 50_000) return 'mid'
  if (count >= 5_000) return 'micro'
  return 'nano'
}
