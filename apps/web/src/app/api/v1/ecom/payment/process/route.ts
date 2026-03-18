/**
 * Payment Processing API
 * ──────────────────────
 * POST /api/v1/ecom/payment/process
 * 
 * Handles all payment methods:
 *  - credit_card: İyzico (non-3DS or 3DS init)
 *  - bank_transfer: Manual confirmation pending
 *  - cash_on_delivery: Order created immediately
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { headers } from 'next/headers'
import { v4 as uuidv4 } from 'uuid'
import {
  processPayment,
  initThreeDSecure,
  buildPaymentRequest,
} from '@/lib/payment/iyzicoClient'

function generateOrderNumber(): string {
  const year = new Date().getFullYear()
  const seq = Math.floor(Math.random() * 99999).toString().padStart(5, '0')
  return `KPN-${year}-${seq}`
}

async function createOrder(checkout: any, paymentResult: any, esnafId: string) {
  const now = new Date().toISOString()
  const orderId = uuidv4()
  const orderNumber = generateOrderNumber()

  const order = {
    id: orderId,
    orderNumber,
    esnafId,
    purchaseFlowId: checkout.purchaseFlowId,
    status: 'confirmed',
    paymentStatus: paymentResult.method === 'bank_transfer' ? 'pending' : 'paid',
    fulfillmentStatus: 'unfulfilled',
    buyer: checkout.buyerInfo,
    invoice: {
      type: checkout.invoiceType || 'individual',
      documentType: 'e_arsiv',
      status: 'pending',
    },
    lineItems: checkout.lineItems.map((item: any) => ({
      ...item,
      taxRate: 20,
      fulfillmentStatus: 'unfulfilled',
    })),
    shippingAddress: checkout.shippingAddress,
    billingAddress: checkout.billingAddress?.address || checkout.shippingAddress,
    shipping: {
      carrierId: checkout.selectedShipping?.carrierId || '',
      carrierName: checkout.selectedShipping?.carrierName || '',
      price: checkout.selectedShipping?.price || 0,
      events: [{
        status: 'order_placed',
        description: 'Sipariş alındı',
        timestamp: now,
      }],
    },
    payment: {
      method: paymentResult.method,
      provider: paymentResult.provider || 'iyzico',
      transactionId: paymentResult.transactionId,
      installmentCount: paymentResult.installmentCount || 1,
      paidAmount: paymentResult.paidAmount || checkout.priceSummary.total,
      refundedAmount: 0,
    },
    priceSummary: checkout.priceSummary,
    appliedDiscounts: checkout.appliedDiscounts || [],
    buyerNote: checkout.buyerNote,
    internalNotes: [],
    activities: [{
      id: uuidv4(),
      type: 'created',
      description: 'Sipariş oluşturuldu',
      createdBy: 'system',
      createdAt: now,
    }],
    createdAt: now,
    updatedAt: now,
  }

  await adminDb
    .collection('esnaflar').doc(esnafId)
    .collection('orders').doc(orderId)
    .set(order)

  // Mark checkout as completed
  await adminDb
    .collection('esnaflar').doc(esnafId)
    .collection('checkouts').doc(checkout.id)
    .update({ status: 'completed', updatedAt: now })

  return order
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { checkoutId, esnafId, paymentMethod, cardData } = body

    if (!checkoutId || !esnafId || !paymentMethod) {
      return NextResponse.json({ error: 'checkoutId, esnafId, paymentMethod gerekli' }, { status: 400 })
    }

    // Fetch checkout
    const checkoutDoc = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('checkouts').doc(checkoutId)
      .get()

    if (!checkoutDoc.exists) {
      return NextResponse.json({ error: 'Checkout bulunamadı' }, { status: 404 })
    }

    const checkout = checkoutDoc.data()!

    if (checkout.status !== 'open') {
      return NextResponse.json({ error: 'Bu checkout artık aktif değil' }, { status: 422 })
    }

    // Check expiry
    if (new Date(checkout.expiresAt) < new Date()) {
      await adminDb
        .collection('esnaflar').doc(esnafId)
        .collection('checkouts').doc(checkoutId)
        .update({ status: 'expired' })
      return NextResponse.json({ error: 'Checkout süresi doldu' }, { status: 422 })
    }

    const headersList = await headers()
    const clientIp = headersList.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1'

    /* ═══════ Credit Card Payment ═══════ */
    if (paymentMethod === 'credit_card') {
      if (!cardData) {
        return NextResponse.json({ error: 'Kart bilgisi gerekli' }, { status: 400 })
      }

      const paymentRequest = buildPaymentRequest(checkout, cardData, clientIp)
      const use3DS = cardData.use3DS !== false // Default: 3DS enabled

      if (use3DS) {
        // 3D Secure flow
        const callbackUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://app.kepenk.ai'}/api/v1/ecom/payment/3ds-callback`
        const threeDSResult = await initThreeDSecure(paymentRequest, callbackUrl)

        if (threeDSResult.status !== 'success') {
          return NextResponse.json({
            error: '3D Secure başlatılamadı',
            detay: threeDSResult.errorMessage,
          }, { status: 422 })
        }

        // Store pending payment info for callback
        await adminDb
          .collection('esnaflar').doc(esnafId)
          .collection('pendingPayments').doc(checkout.purchaseFlowId)
          .set({
            checkoutId,
            esnafId,
            conversationId: threeDSResult.conversationId,
            createdAt: new Date().toISOString(),
          })

        return NextResponse.json({
          ok: true,
          requires3DS: true,
          threeDSHtmlContent: threeDSResult.threeDSHtmlContent,
        })
      } else {
        // Non-3DS direct payment
        const result = await processPayment(paymentRequest)

        if (result.status !== 'success') {
          return NextResponse.json({
            error: 'Ödeme başarısız',
            detay: result.errorMessage,
            errorCode: result.errorCode,
          }, { status: 422 })
        }

        const order = await createOrder(checkout, {
          method: 'credit_card',
          provider: 'iyzico',
          transactionId: result.paymentId,
          installmentCount: result.installment || 1,
          paidAmount: parseFloat(String(result.paidPrice || checkout.priceSummary.total)),
        }, esnafId)

        return NextResponse.json({
          ok: true,
          requires3DS: false,
          order: { id: order.id, orderNumber: order.orderNumber },
        })
      }
    }

    /* ═══════ Bank Transfer ═══════ */
    if (paymentMethod === 'bank_transfer') {
      // Fetch esnaf bank details
      const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
      const esnafData = esnafDoc.exists ? esnafDoc.data()! : {}
      const bankInfo = esnafData.bankInfo || {
        bankName: 'Banka bilgisi girilmemiş',
        iban: '',
        accountHolder: '',
      }

      const order = await createOrder(checkout, {
        method: 'bank_transfer',
        provider: 'manual',
        transactionId: `BT-${checkout.purchaseFlowId.substring(0, 8)}`,
        installmentCount: 1,
        paidAmount: 0,
      }, esnafId)

      return NextResponse.json({
        ok: true,
        order: { id: order.id, orderNumber: order.orderNumber },
        bankInfo: {
          bankName: bankInfo.bankName,
          iban: bankInfo.iban,
          accountHolder: bankInfo.accountHolder,
          referenceNote: order.orderNumber,
          amount: checkout.priceSummary.total,
          deadline: '48 saat',
        },
      })
    }

    /* ═══════ Cash on Delivery ═══════ */
    if (paymentMethod === 'cash_on_delivery') {
      const maxCOD = 5000
      if (checkout.priceSummary.total > maxCOD) {
        return NextResponse.json({
          error: `Kapıda ödeme limiti ₺${maxCOD}. Toplam: ₺${checkout.priceSummary.total}`,
        }, { status: 422 })
      }

      const order = await createOrder(checkout, {
        method: 'cash_on_delivery',
        provider: 'cod',
        transactionId: `COD-${checkout.purchaseFlowId.substring(0, 8)}`,
        installmentCount: 1,
        paidAmount: 0,
      }, esnafId)

      return NextResponse.json({
        ok: true,
        order: { id: order.id, orderNumber: order.orderNumber },
        codNote: 'Ödeme kapıda teslimatta alınacaktır.',
      })
    }

    return NextResponse.json({ error: 'Geçersiz ödeme yöntemi' }, { status: 400 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Ödeme işlenemedi', detay: error.message }, { status: 500 })
  }
}
