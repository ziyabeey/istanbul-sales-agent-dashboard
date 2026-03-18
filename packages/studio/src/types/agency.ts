/**
 * @kepenk/studio — Agency Types
 *
 * Agency listing system for professional design services.
 * Zero commission — agencies pay nothing, esnaf finds them in studio.
 */

export type AgencyStatus = 'pending' | 'approved' | 'rejected'
export type VerificationLevel = 'basic' | 'verified' | 'premium'

export interface Agency {
  id: string
  name: string
  logo: string
  website?: string
  description: string
  services: string[]
  portfolio: PortfolioItem[]
  contact: {
    email: string
    phone: string
    whatsapp?: string
  }
  status: AgencyStatus
  rating: number               // 0-5
  reviewCount: number
  verificationLevel: VerificationLevel
  sectorFocus?: string[]
  cityId?: string
  createdAt: string
  approvedAt?: string
}

export interface PortfolioItem {
  title: string
  image: string
  description?: string
}

export const VERIFICATION_LABELS: Record<VerificationLevel, { label: string; color: string; icon: string }> = {
  basic: { label: 'Temel', color: '#6B7280', icon: '⚪' },
  verified: { label: 'Onaylı', color: '#3B82F6', icon: '🔵' },
  premium: { label: 'Premium', color: '#F59E0B', icon: '⭐' },
}
