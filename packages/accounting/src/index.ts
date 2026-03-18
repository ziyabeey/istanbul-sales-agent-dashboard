/**
 * @kepenk/accounting — Barrel Export
 */

export type {
  Transaction, TransactionType, TransactionCategory, TransactionSource,
  KDVRate, OCRResult, RecurringConfig,
} from './types/transaction'
export {
  INCOME_CATEGORIES, EXPENSE_CATEGORIES,
  calculateKDV, getNetAmount, formatTL,
} from './types/transaction'

export type { MonthlySummary, KDVBreakdown, DailyEntry } from './types/summary'
export { calculateProfitMargin, getNetKDV } from './types/summary'
