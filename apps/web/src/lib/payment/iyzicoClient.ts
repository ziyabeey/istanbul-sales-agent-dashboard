/**
 * İyzico Payment Client
 * ──────────────────────
 * Turkey's leading payment gateway integration.
 * Supports: credit card tokenization, 3D Secure, installments, refunds.
 * 
 * NOTE: Uses İyzico REST API v2. In production, set env vars:
 *   IYZICO_API_KEY, IYZICO_SECRET_KEY, IYZICO_BASE_URL
 */

import crypto from 'crypto'

const IYZICO_API_KEY = process.env.IYZICO_API_KEY || ''
const IYZICO_SECRET_KEY = process.env.IYZICO_SECRET_KEY || ''
const IYZICO_BASE_URL = process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com'

/* ═══════ Auth Header Generation ═══════ */

function generateAuthorizationHeader(uri: string, body: string): string {
  const randomString = crypto.randomBytes(8).toString('hex')
  const hashStr = IYZICO_API_KEY + randomString + IYZICO_SECRET_KEY + body
  const hash = crypto.createHash('sha512').update(hashStr).digest('hex')
  const authorizationParams = `apiKey:${IYZICO_API_KEY}&randomKey:${randomString}&signature:${hash}`
  return `IYZWSv2 ${Buffer.from(authorizationParams).toString('base64')}`
}

async function iyzicoRequest<T>(endpoint: string, body: Record<string, any>): Promise<T> {
  const bodyStr = JSON.stringify(body)
  const uri = `/v2${endpoint}`
  const authorization = generateAuthorizationHeader(uri, bodyStr)

  const res = await fetch(`${IYZICO_BASE_URL}${uri}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authorization,
      'x-iyzi-rnd': crypto.randomBytes(8).toString('hex'),
    },
    body: bodyStr,
  })

  const data = await res.json()
  return data as T
}

/* ═══════ Types ═══════ */

export interface PaymentRequest {
  conversationId: string        // purchaseFlowId
  price: number                 // KDV dahil toplam
  paidPrice: number             // Taksitli toplam (tek çekim ise price ile aynı)
  installment: number           // 1 = tek çekim, 2-12 = taksit
  currency: 'TRY'
  basketId: string              // checkoutId
  paymentChannel: 'WEB'
  paymentGroup: 'PRODUCT'
  paymentCard: {
    cardHolderName: string
    cardNumber: string
    expireMonth: string
    expireYear: string
    cvc: string
    registerCard?: 0 | 1
  }
  buyer: {
    id: string
    name: string
    surname: string
    email: string
    gsmNumber: string           // +905XXXXXXXXX
    identityNumber: string      // TC Kimlik
    registrationAddress: string
    city: string
    country: 'Turkey'
    ip: string
  }
  shippingAddress: {
    contactName: string
    city: string
    country: 'Turkey'
    address: string
  }
  billingAddress: {
    contactName: string
    city: string
    country: 'Turkey'
    address: string
  }
  basketItems: Array<{
    id: string
    name: string
    category1: string
    itemType: 'PHYSICAL' | 'VIRTUAL'
    price: number               // KDV dahil
  }>
}

export interface PaymentResponse {
  status: 'success' | 'failure'
  errorCode?: string
  errorMessage?: string
  conversationId: string
  paymentId?: string
  price?: number
  paidPrice?: number
  installment?: number
  fraudStatus?: number
  authCode?: string
  cardAssociation?: string      // VISA, MASTER_CARD, TROY
  cardFamily?: string           // Bonus, Maximum, World
  binNumber?: string
  itemTransactions?: Array<{
    itemId: string
    paymentTransactionId: string
    transactionStatus: number
    price: number
    paidPrice: number
  }>
}

export interface ThreeDSInitResponse {
  status: 'success' | 'failure'
  errorMessage?: string
  threeDSHtmlContent?: string   // Base64 encoded HTML to show in iframe
  conversationId?: string
}

export interface RefundResponse {
  status: 'success' | 'failure'
  errorMessage?: string
  paymentId?: string
  paymentTransactionId?: string
  price?: number
}

/* ═══════ Payment Functions ═══════ */

/**
 * Process a non-3DS payment directly.
 */
export async function processPayment(request: PaymentRequest): Promise<PaymentResponse> {
  return iyzicoRequest<PaymentResponse>('/payment/auth', {
    locale: 'tr',
    ...request,
    price: request.price.toFixed(2),
    paidPrice: request.paidPrice.toFixed(2),
    basketItems: request.basketItems.map(item => ({
      ...item,
      price: item.price.toFixed(2),
    })),
  })
}

/**
 * Initialize 3D Secure payment flow.
 * Returns HTML content to display in iframe for bank verification.
 */
export async function initThreeDSecure(
  request: PaymentRequest,
  callbackUrl: string
): Promise<ThreeDSInitResponse> {
  return iyzicoRequest<ThreeDSInitResponse>('/payment/3dsecure/initialize', {
    locale: 'tr',
    ...request,
    price: request.price.toFixed(2),
    paidPrice: request.paidPrice.toFixed(2),
    callbackUrl,
    basketItems: request.basketItems.map(item => ({
      ...item,
      price: item.price.toFixed(2),
    })),
  })
}

/**
 * Complete 3D Secure payment after bank callback.
 */
export async function completeThreeDSecure(paymentId: string): Promise<PaymentResponse> {
  return iyzicoRequest<PaymentResponse>('/payment/3dsecure/auth', {
    locale: 'tr',
    paymentId,
  })
}

/**
 * Process a refund for a specific transaction.
 */
export async function processRefund(
  paymentTransactionId: string,
  amount: number,
  conversationId: string
): Promise<RefundResponse> {
  return iyzicoRequest<RefundResponse>('/payment/refund', {
    locale: 'tr',
    conversationId,
    paymentTransactionId,
    price: amount.toFixed(2),
    currency: 'TRY',
  })
}

/**
 * Retrieve installment options from İyzico for a BIN number.
 */
export async function getInstallmentInfo(
  binNumber: string,
  price: number
): Promise<any> {
  return iyzicoRequest('/payment/iyzi-pos/installment', {
    locale: 'tr',
    binNumber: binNumber.substring(0, 6),
    price: price.toFixed(2),
  })
}

/**
 * Build payment request from checkout data.
 */
export function buildPaymentRequest(
  checkout: any,
  cardData: any,
  clientIp: string
): PaymentRequest {
  const buyer = checkout.buyerInfo
  const shipping = checkout.shippingAddress
  const billing = checkout.billingAddress?.address || shipping

  return {
    conversationId: checkout.purchaseFlowId,
    price: checkout.priceSummary.total,
    paidPrice: checkout.priceSummary.installmentTotal || checkout.priceSummary.total,
    installment: checkout.paymentMethod?.creditCard?.installmentCount || 1,
    currency: 'TRY',
    basketId: checkout.id,
    paymentChannel: 'WEB',
    paymentGroup: 'PRODUCT',
    paymentCard: {
      cardHolderName: cardData.cardHolderName,
      cardNumber: cardData.cardNumber,
      expireMonth: cardData.expireMonth,
      expireYear: cardData.expireYear,
      cvc: cardData.cvc,
      registerCard: cardData.saveCard ? 1 : 0,
    },
    buyer: {
      id: buyer.email,
      name: buyer.firstName,
      surname: buyer.lastName,
      email: buyer.email,
      gsmNumber: buyer.phone,
      identityNumber: buyer.tcKimlik || '11111111111',
      registrationAddress: shipping?.addressLine1 || '',
      city: shipping?.city || '',
      country: 'Turkey',
      ip: clientIp,
    },
    shippingAddress: {
      contactName: shipping?.fullName || `${buyer.firstName} ${buyer.lastName}`,
      city: shipping?.city || '',
      country: 'Turkey',
      address: shipping?.addressLine1 || '',
    },
    billingAddress: {
      contactName: billing?.fullName || `${buyer.firstName} ${buyer.lastName}`,
      city: billing?.city || '',
      country: 'Turkey',
      address: billing?.addressLine1 || '',
    },
    basketItems: checkout.lineItems.map((item: any) => ({
      id: item.id,
      name: item.productName,
      category1: 'Ürünler',
      itemType: 'PHYSICAL' as const,
      price: item.lineTotal,
    })),
  }
}
