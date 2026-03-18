/**
 * @kepenk/restaurant — Offline DB Types (Dexie Schema)
 */

export interface OfflineOrder {
  id: string
  restaurantId: string
  tableId: string
  items: OrderItem[]
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentId?: string
  totalAmount: number       // kuruş
  tipAmount: number
  customerNote?: string
  waiterId?: string
  createdAt: string
  preparedAt?: string
  deliveredAt?: string
  updatedAt: string
  syncStatus: SyncStatus
  syncedAt?: string
  firestoreId?: string
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded'
export type SyncStatus = 'pending' | 'synced' | 'conflict'

export interface OrderItem {
  id: string
  productId: string
  name: string
  quantity: number
  unitPrice: number         // kuruş
  notes?: string
  modifiers?: ItemModifier[]
  status: 'pending' | 'preparing' | 'ready'
}

export interface ItemModifier {
  name: string
  price: number             // ek ücret kuruş (0 = ücretsiz)
}

export interface OfflineProduct {
  id: string
  restaurantId: string
  name: string
  description?: string
  price: number             // kuruş
  categoryId: string
  imageUrl?: string
  isAvailable: boolean
  modifiers?: ProductModifier[]
  sortOrder: number
  updatedAt: string
}

export interface ProductModifier {
  id: string
  name: string
  price: number
}

export interface OfflineCategory {
  id: string
  restaurantId: string
  name: string
  icon?: string
  sortOrder: number
}

export interface RestaurantTable {
  id: string
  restaurantId: string
  number: number
  qrUrl: string
  status: 'free' | 'occupied'
  currentOrderId?: string
}

/** Dexie v4 index layout for RestaurantOfflineDB */
export const DEXIE_STORES = {
  orders: 'id, restaurantId, tableId, status, syncStatus, createdAt',
  products: 'id, restaurantId, categoryId, isAvailable',
  categories: 'id, restaurantId, sortOrder',
} as const
