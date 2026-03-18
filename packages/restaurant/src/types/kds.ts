/**
 * @kepenk/restaurant — KDS (Kitchen Display System) Types
 */

export interface KitchenOrder {
  id: string
  tableId: string
  tableNumber: number
  items: KitchenItem[]
  status: 'pending' | 'preparing' | 'ready'
  createdAt: string
  preparedAt?: string
  priority: 'normal' | 'rush'
}

export interface KitchenItem {
  id: string
  name: string
  quantity: number
  notes?: string
  modifiers?: string[]
  status: 'pending' | 'preparing' | 'ready'
}

export type TimerUrgency = 'green' | 'yellow' | 'red'

export interface TimerState {
  elapsedSeconds: number
  color: string
  urgency: TimerUrgency
  minutesDisplay: string
  secondsDisplay: string
}

/**
 * Calculates timer color based on elapsed time vs target.
 * green: <50% of target, yellow: 50-80%, red: >80%
 */
export function getTimerState(elapsedSeconds: number, targetMinutes: number = 15): TimerState {
  const ratio = elapsedSeconds / (targetMinutes * 60)
  const minutes = Math.floor(elapsedSeconds / 60)
  const seconds = elapsedSeconds % 60

  let color: string
  let urgency: TimerUrgency

  if (ratio < 0.5) {
    color = '#22C55E'
    urgency = 'green'
  } else if (ratio < 0.8) {
    color = '#F59E0B'
    urgency = 'yellow'
  } else {
    color = '#EF4444'
    urgency = 'red'
  }

  return {
    elapsedSeconds,
    color,
    urgency,
    minutesDisplay: String(minutes),
    secondsDisplay: String(seconds).padStart(2, '0'),
  }
}

/**
 * Check if a kitchen order is overdue.
 */
export function isOrderOverdue(createdAt: string, targetMinutes: number = 15): boolean {
  const elapsed = (Date.now() - new Date(createdAt).getTime()) / 1000
  return elapsed > targetMinutes * 60
}

/**
 * Sort orders: overdue first, then FIFO (oldest first).
 */
export function sortKitchenOrders(orders: KitchenOrder[]): KitchenOrder[] {
  return [...orders].sort((a, b) => {
    const aOverdue = isOrderOverdue(a.createdAt)
    const bOverdue = isOrderOverdue(b.createdAt)
    if (aOverdue && !bOverdue) return -1
    if (!aOverdue && bOverdue) return 1
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  })
}
