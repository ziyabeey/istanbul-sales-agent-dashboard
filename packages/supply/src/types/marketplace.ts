/**
 * @kepenk/supply — Premium Supplier Marketplace Types
 */

export type MarketplaceVerification = 'basic' | 'verified' | 'premium' | 'elite'
export type MarketplaceTier = 'free' | 'growth' | 'premium' | 'enterprise'

export interface PremiumSupplier {
  id: string
  name: string
  logo: string
  description: string
  categories: string[]
  certifications: string[]
  products: MarketplaceProduct[]
  story?: { origin: string; process: string; sustainability?: string }
  verificationLevel: MarketplaceVerification
  subscriptionTier: MarketplaceTier
  rating: number
  orderCount: number
  createdAt: string
}

export interface MarketplaceProduct {
  name: string
  description: string
  price: number               // kuruş
  unit: string                // kg, adet, lt, paket
  moq: number                 // minimum order quantity
  image?: string
}

// Commission model
export const COMMISSION_RATES = {
  newBuyer: 0.20,       // %20 for new buyers
  repeat: 0.12,         // %12 for repeat orders
  direct: 0.00,         // %0 for direct (+ transaction fee)
} as const

// Listing tiers
export const LISTING_TIERS: Record<MarketplaceTier, { label: string; maxProducts: number; price: number; features: string[] }> = {
  free:       { label: 'Ücretsiz',   maxProducts: 5,    price: 0,     features: ['5 ürün', 'Temel profil'] },
  growth:     { label: 'Büyüme',     maxProducts: 50,   price: 14900, features: ['50 ürün', 'Öne çıkan etiket', 'Analitik'] },
  premium:    { label: 'Premium',    maxProducts: -1,    price: 39900, features: ['Sınırsız ürün', 'Öne çıkan profil', 'Öncelikli sıralama'] },
  enterprise: { label: 'Enterprise', maxProducts: -1,    price: 0,     features: ['Sınırsız', 'API erişimi', 'Özel entegrasyon', 'Teklif alma'] },
}

export const VERIFICATION_LABELS: Record<MarketplaceVerification, { label: string; color: string; icon: string }> = {
  basic:    { label: 'Temel',    color: '#6B7280', icon: '⚪' },
  verified: { label: 'Onaylı',  color: '#3B82F6', icon: '🔵' },
  premium:  { label: 'Premium', color: '#F59E0B', icon: '⭐' },
  elite:    { label: 'Elite',   color: '#8B5CF6', icon: '💎' },
}
