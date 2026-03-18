/**
 * @kepenk/supply — Supplier + Reorder Point + Purchase Order Types
 */

export type IntegrationMethod = 'email' | 'whatsapp' | 'portal' | 'api'
export type PaymentTerms = 'cod' | 'net15' | 'net30' | 'net60'

export interface Supplier {
  id: string
  businessId: string
  name: string
  contactName: string
  phone: string
  email?: string
  whatsappNumber?: string
  address?: string
  integrationMethod: IntegrationMethod
  rating: number               // 1-5
  avgLeadTimeDays: number
  onTimeDeliveryRate: number   // %
  qualityScore: number         // 1-100
  paymentTerms: PaymentTerms
  createdAt: string
}

export interface SupplierProduct {
  id: string
  supplierId: string
  productId: string
  supplierSKU?: string
  unitPrice: number            // kuruş
  minOrderQuantity: number
  leadTimeDays: number
  isPreferred: boolean
  lastPriceUpdate: string
}

// ═══ Purchase Order ═══

export type POStatus = 'draft' | 'sent' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'

export interface PurchaseOrder {
  id: string
  businessId: string
  supplierId: string
  supplierName: string
  items: POItem[]
  totalAmount: number          // kuruş
  status: POStatus
  sentVia: IntegrationMethod
  expectedDeliveryDate: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface POItem {
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export const PO_STATUS_LABELS: Record<POStatus, { label: string; color: string; icon: string }> = {
  draft:     { label: 'Taslak',      color: '#6B7280', icon: '📝' },
  sent:      { label: 'Gönderildi',  color: '#3B82F6', icon: '📤' },
  confirmed: { label: 'Onaylandı',   color: '#8B5CF6', icon: '✅' },
  shipped:   { label: 'Kargoda',     color: '#F59E0B', icon: '🚚' },
  delivered: { label: 'Teslim',      color: '#22C55E', icon: '📦' },
  cancelled: { label: 'İptal',       color: '#EF4444', icon: '❌' },
}

// ═══ Reorder Point ═══

/**
 * Calculate Reorder Point (ROP).
 * ROP = (avgDailyDemand × leadTimeDays) + safetyStock
 * safetyStock = Z × stdDevDemand × √(leadTimeDays)
 * Z = 1.65 for 95% service level
 */
export function calculateReorderPoint(
  avgDailyDemand: number,
  leadTimeDays: number,
  stdDevDemand: number,
  serviceLevel: number = 0.95,
): number {
  const Z = serviceLevel >= 0.99 ? 2.33 : serviceLevel >= 0.95 ? 1.65 : 1.28
  const safetyStock = Z * stdDevDemand * Math.sqrt(leadTimeDays)
  return Math.ceil(avgDailyDemand * leadTimeDays + safetyStock)
}

// ═══ Supplier Selection Score ═══

export interface SelectionWeights {
  price: number       // 0.30
  reliability: number // 0.25
  delivery: number    // 0.20
  availability: number // 0.15
  quality: number     // 0.10
}

export const DEFAULT_WEIGHTS: SelectionWeights = {
  price: 0.30, reliability: 0.25, delivery: 0.20, availability: 0.15, quality: 0.10,
}

/**
 * Score supplier for selection (0-100).
 */
export function scoreSupplier(
  supplier: { rating: number; onTimeDeliveryRate: number; qualityScore: number; unitPrice: number },
  lowestPrice: number,
  weights: SelectionWeights = DEFAULT_WEIGHTS,
): number {
  const priceScore = lowestPrice > 0 ? (lowestPrice / supplier.unitPrice) * 100 : 50
  const reliabilityScore = (supplier.rating / 5) * 100
  const deliveryScore = supplier.onTimeDeliveryRate
  const qualityScore = supplier.qualityScore
  const availabilityScore = 80 // default

  return Math.round(
    priceScore * weights.price +
    reliabilityScore * weights.reliability +
    deliveryScore * weights.delivery +
    availabilityScore * weights.availability +
    qualityScore * weights.quality
  )
}
