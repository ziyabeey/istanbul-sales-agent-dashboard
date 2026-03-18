/**
 * @kepenk/influencer — Barrel Export
 */

export type {
  Influencer, InstagramProfile, TiktokProfile, InfluencerPricing,
  InfluencerTier, InfluencerCategory, VerificationStatus,
} from './types/influencer'
export { TIER_LABELS, CATEGORY_LABELS, getTierFromFollowers } from './types/influencer'

export type {
  InfluencerCampaign, CampaignContentType, CampaignStatus, CampaignRequirements,
} from './types/campaign'
export { STATUS_LABELS, calculatePayment } from './types/campaign'

export type { PricingFactors, PricingPlatform, PricingContentType } from './utils/pricing'
export { calculateInfluencerPrice, calculateAllPrices } from './utils/pricing'
