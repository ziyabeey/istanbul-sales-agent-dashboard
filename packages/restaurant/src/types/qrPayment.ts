/**
 * @kepenk/restaurant — QR Code + Payment Types
 */

export interface QRPayload {
  restaurantId: string
  tableId: string
  timestamp: number
  signature: string
}

/**
 * Validates a QR signature (HMAC-SHA256 based).
 * In production, this runs server-side with QR_HMAC_SECRET env var.
 * Client-side: only parse the URL and send to API for validation.
 */
export function parseQRUrl(url: string): QRPayload | null {
  try {
    const u = new URL(url)
    const parts = u.pathname.split('/')
    // Expected: /r/{restaurantId}/t/{tableId}
    const rIdx = parts.indexOf('r')
    const tIdx = parts.indexOf('t')
    if (rIdx === -1 || tIdx === -1) return null

    return {
      restaurantId: parts[rIdx + 1],
      tableId: parts[tIdx + 1],
      timestamp: Number(u.searchParams.get('ts') || 0),
      signature: u.searchParams.get('sig') || '',
    }
  } catch {
    return null
  }
}

// ═══ Payment (iyzico) ═══

export interface PaymentRequest {
  orderId: string
  restaurantId: string
  tableId: string
  items: PaymentItem[]
  totalAmount: number    // kuruş
  tipAmount: number      // kuruş
}

export interface PaymentItem {
  name: string
  price: number          // kuruş
  quantity: number
}

export interface PaymentResult {
  success: boolean
  checkoutFormContent?: string
  token?: string
  errorMessage?: string
}

export interface PaymentCallback {
  token: string
  status: 'success' | 'failure'
  paymentId: string
  conversationId: string  // = orderId
  paidPrice: string
}

// ═══ Cart (client-side Zustand state shape) ═══

export interface CartItem {
  id: string
  productId: string
  name: string
  unitPrice: number      // kuruş
  quantity: number
  notes?: string
  modifiers?: { name: string; price: number }[]
}

export interface CartState {
  items: CartItem[]
  tableId: string
  restaurantId: string
  tipPercent: number     // 0, 5, 10, 15, 20
}

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    const modTotal = (item.modifiers || []).reduce((ms, m) => ms + m.price, 0)
    return sum + (item.unitPrice + modTotal) * item.quantity
  }, 0)
}

export function calculateTip(total: number, tipPercent: number): number {
  return Math.round(total * (tipPercent / 100))
}

export const TIP_OPTIONS = [0, 5, 10, 15, 20] as const
