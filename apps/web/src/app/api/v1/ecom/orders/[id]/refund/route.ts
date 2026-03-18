/**
 * Order Refund API
 * ────────────────
 * POST /api/v1/ecom/orders/[id]/refund
 * 
 * Processes full or partial refund via İyzico.
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { processRefund } from '@/lib/payment/iyzicoClient'
import { v4 as uuidv4 } from 'uuid'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { id: orderId } = await params
    const body = await request.json()
    const { amount, reason } = body

    const docRef = adminDb.collection('esnaflar').doc(esnafId).collection('orders').doc(orderId)
    const doc = await docRef.get()

    if (!doc.exists) return NextResponse.json({ error: 'Sipariş bulunamadı' }, { status: 404 })

    const order = doc.data()!

    // Validate refund
    if (order.paymentStatus === 'refunded') {
      return NextResponse.json({ error: 'Bu sipariş zaten iade edildi' }, { status: 422 })
    }

    if (order.payment.method !== 'credit_card') {
      return NextResponse.json({ error: 'Otomatik iade sadece kredi kartı ödemeleri için geçerlidir' }, { status: 422 })
    }

    const refundAmount = amount || order.payment.paidAmount
    const maxRefundable = order.payment.paidAmount - order.payment.refundedAmount

    if (refundAmount > maxRefundable) {
      return NextResponse.json({
        error: `Maksimum iade tutarı: ₺${maxRefundable}`,
      }, { status: 422 })
    }

    // Get first transaction ID for refund
    const transactionId = order.payment.transactionId
    if (!transactionId) {
      return NextResponse.json({ error: 'İşlem ID bulunamadı' }, { status: 422 })
    }

    // Process refund via İyzico
    const result = await processRefund(transactionId, refundAmount, order.purchaseFlowId)

    if (result.status !== 'success') {
      return NextResponse.json({
        error: 'İade işlemi başarısız',
        detay: result.errorMessage,
      }, { status: 422 })
    }

    // Update order
    const now = new Date().toISOString()
    const newRefundedAmount = order.payment.refundedAmount + refundAmount
    const isFullRefund = newRefundedAmount >= order.payment.paidAmount

    const updates: Record<string, any> = {
      'payment.refundedAmount': newRefundedAmount,
      paymentStatus: isFullRefund ? 'refunded' : 'partially_refunded',
      status: isFullRefund ? 'returned' : order.status,
      updatedAt: now,
      activities: [
        ...(order.activities || []),
        {
          id: uuidv4(),
          type: 'refunded',
          description: `₺${refundAmount} iade edildi${reason ? `: ${reason}` : ''}`,
          createdBy: 'esnaf',
          createdAt: now,
          metadata: {
            amount: String(refundAmount),
            isFullRefund: String(isFullRefund),
          },
        },
      ],
    }

    await docRef.update(updates)

    return NextResponse.json({
      ok: true,
      refund: {
        amount: refundAmount,
        totalRefunded: newRefundedAmount,
        isFullRefund,
        status: isFullRefund ? 'refunded' : 'partially_refunded',
      },
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'İade işlenemedi', detay: error.message }, { status: 500 })
  }
}
