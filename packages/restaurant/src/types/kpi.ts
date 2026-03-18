/**
 * @kepenk/restaurant — KPI Types (Waiter + Kitchen + Revenue)
 */

export interface DailyKPI {
  date: string              // YYYY-MM-DD
  restaurantId: string
  waiters: Record<string, WaiterKPI>
  kitchen: KitchenKPI
  revenue: RevenueKPI
}

export interface WaiterKPI {
  waiterId: string
  name: string
  deliveryCount: number
  avgDeliverySeconds: number
  overdueCount: number
  rating: number            // 1-5
}

export interface KitchenKPI {
  totalOrders: number
  avgPrepSeconds: number
  overdueCount: number
  cancelCount: number
  busiestHour: number       // 0-23
}

export interface RevenueKPI {
  totalRevenue: number      // kuruş
  tipTotal: number          // kuruş
  orderCount: number
  avgOrderValue: number     // kuruş
  topSellingItems: { name: string; count: number }[]
}

/**
 * Format seconds to M:SS display.
 */
export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.round(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

/**
 * Format kuruş to TL display.
 */
export function formatCurrency(kurus: number): string {
  return `₺${(kurus / 100).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`
}
