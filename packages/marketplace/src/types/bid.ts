/**
 * @kepenk/marketplace — Bid + Credit + Escrow Types
 */

export type BidStatus = 'pending' | 'accepted' | 'rejected' | 'withdrawn'

export interface Bid {
  id: string
  jobId: string
  providerId: string

  amount: number               // TRY
  message: string
  estimatedDays: number
  warranty?: string

  isAutoBid: boolean
  creditCost: number

  status: BidStatus

  providerSnapshot: ProviderSnapshot

  createdAt: string
}

export interface ProviderSnapshot {
  name: string
  rating: number
  completedJobs: number
  responseTime: string
  profilePhoto?: string
}

export const BID_STATUS_LABELS: Record<BidStatus, { label: string; color: string }> = {
  pending:   { label: 'Bekliyor',       color: '#F59E0B' },
  accepted:  { label: 'Kabul Edildi',   color: '#22C55E' },
  rejected:  { label: 'Reddedildi',     color: '#EF4444' },
  withdrawn: { label: 'Geri Çekildi',   color: '#6B7280' },
}

// ═══ Credit System ═══

export type CreditComplexity = 'easy' | 'medium' | 'hard'

export const CREDIT_COSTS: Record<CreditComplexity, number> = {
  easy: 2,    // temizlik
  medium: 3,  // boya, tesisat
  hard: 5,    // tadilat, elektrik
}

export const CREDIT_PRICE_TRY = 5  // ₺5 per credit

export const CREDIT_PACKAGES: { credits: number; price: number; bonus: number; label: string }[] = [
  { credits: 10,  price: 5000,   bonus: 0,  label: '10 Kredi' },
  { credits: 30,  price: 13500,  bonus: 3,  label: '30 + 3 Bonus' },
  { credits: 100, price: 40000,  bonus: 15, label: '100 + 15 Bonus' },
  { credits: 250, price: 87500,  bonus: 50, label: '250 + 50 Bonus' },
]

// High-rated providers (4.5+) get 20% credit discount
export function getCreditCost(complexity: CreditComplexity, providerRating: number): number {
  const base = CREDIT_COSTS[complexity]
  return providerRating >= 4.5 ? Math.ceil(base * 0.8) : base
}

// ═══ Escrow ═══

export const MARKETPLACE_COMMISSION_RATE = 0.10 // %10

export interface EscrowPayment {
  id: string
  jobId: string
  bidId: string
  customerId: string
  providerId: string
  subMerchantKey: string

  totalAmount: number          // TRY
  commissionAmount: number     // TRY
  providerAmount: number       // TRY (totalAmount - commissionAmount)

  paymentTransactionId?: string
  status: 'pending' | 'paid' | 'approved' | 'disapproved' | 'refunded'

  paidAt?: string
  approvedAt?: string
  refundedAt?: string
  createdAt: string
}

/**
 * Calculate escrow split.
 */
export function calculateEscrow(totalAmount: number, commissionRate: number = MARKETPLACE_COMMISSION_RATE) {
  const commissionAmount = Math.round(totalAmount * commissionRate * 100) / 100
  return {
    totalAmount,
    commissionAmount,
    providerAmount: Math.round((totalAmount - commissionAmount) * 100) / 100,
  }
}

// ═══ Provider (Usta) ═══

export interface ServiceProvider {
  id: string
  userId: string
  name: string
  profilePhoto?: string
  bio: string
  phone: string
  categories: string[]
  serviceRadius: number        // km

  subMerchantKey?: string      // iyzico SubMerchant

  rating: number
  completedJobs: number
  responseTimeMinutes: number
  repeatRate: number           // %

  creditBalance: number
  totalEarnings: number

  autoBidConfig?: AutoBidConfig

  verificationStatus: 'pending' | 'verified' | 'rejected'
  identityVerified: boolean
  addressVerified: boolean

  createdAt: string
}

export interface AutoBidConfig {
  enabled: boolean
  categories: string[]
  maxDistanceKm: number
  minBudget: number
  maxBudget: number
  autoMessage: string
  pricingStrategy: 'competitive' | 'premium' | 'fixed'
  fixedPriceRules?: Record<string, number>
}
