/**
 * @kepenk/influencer — AI Pricing Algorithm
 *
 * CPM-based pricing with engagement, niche, and Turkey PPP multipliers.
 */

export type PricingPlatform = 'instagram' | 'tiktok'
export type PricingContentType = 'post' | 'story' | 'reel' | 'video'

export interface PricingFactors {
  followers: number
  engagementRate: number       // %
  platform: PricingPlatform
  contentType: PricingContentType
  niche: string
  location?: string
}

// CPM = Cost Per Mille — ₺ per 1000 impressions
const PLATFORM_CPM: Record<string, number> = {
  instagram_post: 35,
  instagram_story: 20,
  instagram_reel: 45,
  tiktok_video: 30,
}

const NICHE_MULTIPLIER: Record<string, number> = {
  food: 1.2,
  beauty: 1.3,
  fitness: 1.1,
  lifestyle: 1.0,
  tech: 1.4,
  fashion: 1.2,
  travel: 0.9,
  education: 0.8,
}

// Turkey Purchasing Power Parity multiplier vs USA
const TR_PPP_MULTIPLIER = 0.35

/**
 * Calculate suggested price for influencer content.
 * Returns TRY amount (not kuruş).
 */
export function calculateInfluencerPrice(factors: PricingFactors): number {
  const key = `${factors.platform}_${factors.contentType}`
  const baseCPM = PLATFORM_CPM[key] || 30

  // Engagement multiplier
  let engMul = 1.0
  if (factors.engagementRate > 8) engMul = 1.5
  else if (factors.engagementRate > 5) engMul = 1.2
  else if (factors.engagementRate > 2) engMul = 1.0
  else engMul = 0.7

  const nicheMul = NICHE_MULTIPLIER[factors.niche] || 1.0

  // Estimated reach ≈ followers × (engagement% / 100) × 5
  const estimatedReach = factors.followers * (factors.engagementRate / 100) * 5
  const basePrice = (estimatedReach / 1000) * baseCPM

  const adjusted = basePrice * engMul * nicheMul * TR_PPP_MULTIPLIER

  // Clamp ₺200 – ₺50,000
  return Math.round(Math.min(Math.max(adjusted, 200), 50000))
}

/**
 * Calculate all content type prices for an influencer.
 */
export function calculateAllPrices(
  followers: number,
  engagementRate: number,
  niche: string,
): Record<string, number> {
  const types: [PricingPlatform, PricingContentType][] = [
    ['instagram', 'post'], ['instagram', 'story'],
    ['instagram', 'reel'], ['tiktok', 'video'],
  ]
  const result: Record<string, number> = {}
  for (const [platform, contentType] of types) {
    const key = `${platform}_${contentType}`
    result[key] = calculateInfluencerPrice({ followers, engagementRate, platform, contentType, niche })
  }
  return result
}
