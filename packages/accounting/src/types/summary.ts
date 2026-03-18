/**
 * @kepenk/accounting — Monthly Summary + KDV Breakdown
 */

import type { TransactionCategory } from './transaction'

export interface MonthlySummary {
  yearMonth: string             // "2026-03"
  businessId: string
  totalIncome: number           // kuruş
  totalExpense: number
  netProfit: number
  profitMargin: number          // %

  kdvBreakdown: KDVBreakdown
  categoryBreakdown: Partial<Record<TransactionCategory, number>>
  dailyBreakdown: DailyEntry[]

  // Budget comparison
  budgetIncome?: number
  budgetExpense?: number
  incomeVariance?: number       // actual - budget
  expenseVariance?: number

  calculatedAt: string
}

export interface KDVBreakdown {
  collected: { rate1: number; rate10: number; rate20: number }
  paid: { rate1: number; rate10: number; rate20: number }
  netKdv: number                // collected - paid = ödenecek KDV
}

export interface DailyEntry {
  date: string
  income: number
  expense: number
}

/**
 * Calculate profit margin percentage.
 */
export function calculateProfitMargin(income: number, expense: number): number {
  if (income === 0) return 0
  return Math.round(((income - expense) / income) * 100)
}

/**
 * Get net KDV payable from breakdown.
 */
export function getNetKDV(bd: KDVBreakdown): number {
  const collected = bd.collected.rate1 + bd.collected.rate10 + bd.collected.rate20
  const paid = bd.paid.rate1 + bd.paid.rate10 + bd.paid.rate20
  return collected - paid
}
