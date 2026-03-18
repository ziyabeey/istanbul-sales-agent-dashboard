/**
 * @kepenk/accounting — Transaction Types
 */

export type TransactionType = 'income' | 'expense'
export type KDVRate = 0 | 1 | 10 | 20
export type TransactionSource = 'manual' | 'order' | 'booking' | 'ocr' | 'recurring'

export type TransactionCategory =
  // Gelir
  | 'sales' | 'service' | 'rental' | 'interest' | 'other_income'
  // Gider
  | 'rent' | 'salary' | 'materials' | 'utilities' | 'insurance'
  | 'advertising' | 'shipping' | 'taxes' | 'maintenance'
  | 'office_supplies' | 'food' | 'transportation' | 'other_expense'

export interface Transaction {
  id: string
  businessId: string
  type: TransactionType
  amount: number                // kuruş
  currency: 'TRY'
  category: TransactionCategory
  subcategory?: string
  description: string
  date: string                  // YYYY-MM-DD

  // KDV
  kdvRate: KDVRate
  kdvAmount: number             // kuruş
  withholding?: { rate: number; amount: number }

  // Source
  source: TransactionSource
  sourceOrderId?: string
  sourceBookingId?: string

  // OCR
  receiptUrl?: string
  ocrData?: OCRResult

  // Recurring
  isRecurring?: boolean
  recurringConfig?: RecurringConfig

  createdAt: string
  updatedAt: string
}

export interface OCRResult {
  merchant: string
  rawText: string
  confidence: number
  processedAt: string
}

export interface RecurringConfig {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
  nextDate: string
  endDate?: string
}

// ═══ Category Labels ═══

export const INCOME_CATEGORIES: { id: TransactionCategory; label: string; icon: string }[] = [
  { id: 'sales', label: 'Satış', icon: '🛒' },
  { id: 'service', label: 'Hizmet', icon: '💼' },
  { id: 'rental', label: 'Kira Geliri', icon: '🏠' },
  { id: 'interest', label: 'Faiz', icon: '🏦' },
  { id: 'other_income', label: 'Diğer Gelir', icon: '💰' },
]

export const EXPENSE_CATEGORIES: { id: TransactionCategory; label: string; icon: string }[] = [
  { id: 'rent', label: 'Kira', icon: '🏢' },
  { id: 'salary', label: 'Maaş', icon: '👥' },
  { id: 'materials', label: 'Malzeme', icon: '📦' },
  { id: 'utilities', label: 'Faturalar', icon: '💡' },
  { id: 'insurance', label: 'Sigorta', icon: '🛡️' },
  { id: 'advertising', label: 'Reklam', icon: '📢' },
  { id: 'shipping', label: 'Kargo', icon: '🚚' },
  { id: 'taxes', label: 'Vergi', icon: '📋' },
  { id: 'maintenance', label: 'Bakım', icon: '🔧' },
  { id: 'office_supplies', label: 'Ofis', icon: '🖊️' },
  { id: 'food', label: 'Gıda', icon: '🍽️' },
  { id: 'transportation', label: 'Ulaşım', icon: '🚗' },
  { id: 'other_expense', label: 'Diğer Gider', icon: '📎' },
]

// ═══ KDV Helpers ═══

/**
 * Calculate KDV amount from gross amount.
 * grossAmount includes KDV. KDV = gross - (gross / (1 + rate/100))
 */
export function calculateKDV(grossAmount: number, rate: KDVRate): number {
  if (rate === 0) return 0
  return Math.round(grossAmount - (grossAmount / (1 + rate / 100)))
}

/**
 * Calculate net amount (excluding KDV).
 */
export function getNetAmount(grossAmount: number, rate: KDVRate): number {
  return grossAmount - calculateKDV(grossAmount, rate)
}

/**
 * Format kuruş to ₺ display.
 */
export function formatTL(kurus: number): string {
  return `₺${(kurus / 100).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`
}
