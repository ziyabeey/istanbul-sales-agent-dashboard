/**
 * @kepenk/restaurant — Sync Engine Types
 *
 * Conflict strategy:
 * - Order status:  SERVER wins (kitchen/waiter may have updated)
 * - Order items:   CLIENT wins (customer modifications)
 * - Payment:       SERVER wins (iyzico callback)
 */

export interface SyncEvent {
  type: 'push' | 'pull' | 'conflict'
  orderId: string
  timestamp: string
  details: string
}

export interface SyncState {
  isOnline: boolean
  lastSyncAt: string | null
  pendingCount: number
  conflictCount: number
  events: SyncEvent[]
}

export interface ConflictResolution {
  orderId: string
  field: string
  localValue: unknown
  serverValue: unknown
  winner: 'local' | 'server'
  reason: string
}

/**
 * Which side wins for each field category.
 */
export const CONFLICT_RULES: Record<string, 'server' | 'client'> = {
  status: 'server',
  paymentStatus: 'server',
  paymentId: 'server',
  items: 'client',
  customerNote: 'client',
  tipAmount: 'client',
  waiterId: 'server',
  preparedAt: 'server',
  deliveredAt: 'server',
}
