/**
 * @kepenk/restaurant — Barrel Export
 */

// Offline DB
export type {
  OfflineOrder, OrderItem, ItemModifier,
  OfflineProduct, ProductModifier, OfflineCategory,
  RestaurantTable, OrderStatus, PaymentStatus, SyncStatus,
} from './types/offlineDb'
export { DEXIE_STORES } from './types/offlineDb'

// Sync Engine
export type { SyncEvent, SyncState, ConflictResolution } from './types/syncEngine'
export { CONFLICT_RULES } from './types/syncEngine'

// KDS
export type { KitchenOrder, KitchenItem, TimerUrgency, TimerState } from './types/kds'
export { getTimerState, isOrderOverdue, sortKitchenOrders } from './types/kds'

// QR + Payment
export type {
  QRPayload, PaymentRequest, PaymentItem, PaymentResult,
  PaymentCallback, CartItem, CartState,
} from './types/qrPayment'
export { parseQRUrl, calculateCartTotal, calculateTip, TIP_OPTIONS } from './types/qrPayment'

// KPI
export type { DailyKPI, WaiterKPI, KitchenKPI, RevenueKPI } from './types/kpi'
export { formatDuration, formatCurrency } from './types/kpi'
