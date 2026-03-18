/**
 * 3D Secure Callback Handler
 * ───────────────────────────
 * POST /api/v1/ecom/payment/3ds-callback
 * 
 * Called by İyzico after 3DS verification.
 * Completes payment → creates order → redirects to success page.
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { completeThreeDSecure } from '@/lib/payment/iyzicoClient'
import { v4 as uuidv4 } from 'uuid'

function generateOrderNumber(): string {
  const year = new Date().getFullYear()
  const seq = Math.floor(Math.random() * 99999).toString().padStart(5, '0')
  return `KPN-${year}-${seq}`
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const status = formData.get('status') as string
    const paymentId = formData.get('paymentId') as string
    const conversationId = formData.get('conversationId') as string

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://app.kepenk.ai'

    if (status !== 'success' || !paymentId) {
      return NextResponse.redirect(`${baseUrl}/odeme/hata?reason=3ds_failed`)
    }

    // Complete 3DS payment
    const result = await completeThreeDSecure(paymentId)

    if (result.status !== 'success') {
      return NextResponse.redirect(
        `${baseUrl}/odeme/hata?reason=${encodeURIComponent(result.errorMessage || 'payment_failed')}`
      )
    }

    // Find pending payment by conversationId (purchaseFlowId)
    const pendingQuery = await adminDb
      .collectionGroup('pendingPayments')
      .where('conversationId', '==', conversationId)
      .limit(1)
      .get()

    if (pendingQuery.empty) {
      return NextResponse.redirect(`${baseUrl}/odeme/hata?reason=pending_not_found`)
    }

    const pending = pendingQuery.docs[0].data()
    const { checkoutId, esnafId } = pending

    // Fetch checkout
    const checkoutDoc = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('checkouts').doc(checkoutId)
      .get()

    if (!checkoutDoc.exists) {
      return NextResponse.redirect(`${baseUrl}/odeme/hata?reason=checkout_not_found`)
    }

    const checkout = checkoutDoc.data()!
    const now = new Date().toISOString()
    const orderId = uuidv4()
    const orderNumber = generateOrderNumber()

    // Create order
    const order = {
      id: orderId,
      orderNumber,
      esnafId,
      purchaseFlowId: checkout.purchaseFlowId,
      status: 'confirmed',
      paymentStatus: 'paid',
      fulfillmentStatus: 'unfulfilled',
      buyer: checkout.buyerInfo,
      invoice: { type: checkout.invoiceType || 'individual', documentType: 'e_arsiv', status: 'pending' },
      lineItems: checkout.lineItems.map((item: any) => ({
        ...item, taxRate: 20, fulfillmentStatus: 'unfulfilled',
      })),
      shippingAddress: checkout.shippingAddress,
      billingAddress: checkout.billingAddress?.address || checkout.shippingAddress,
      shipping: {
        carrierId: checkout.selectedShipping?.carrierId || '',
        carrierName: checkout.selectedShipping?.carrierName || '',
        price: checkout.selectedShipping?.price || 0,
        events: [{ status: 'order_placed', description: 'Sipariş alındı', timestamp: now }],
      },
      payment: {
        method: 'credit_card',
        provider: 'iyzico',
        transactionId: result.paymentId,
        installmentCount: result.installment || 1,
        paidAmount: parseFloat(String(result.paidPrice || checkout.priceSummary.total)),
        refundedAmount: 0,
      },
      priceSummary: checkout.priceSummary,
      appliedDiscounts: checkout.appliedDiscounts || [],
      buyerNote: checkout.buyerNote,
      internalNotes: [],
      activities: [{
        id: uuidv4(),
        type: 'created',
        description: 'Sipariş oluşturuldu (3D Secure)',
        createdBy: 'system',
        createdAt: now,
      }],
      createdAt: now,
      updatedAt: now,
    }

    await adminDb.collection('esnaflar').doc(esnafId).collection('orders').doc(orderId).set(order)
    await adminDb.collection('esnaflar').doc(esnafId).collection('checkouts').doc(checkoutId).update({ status: 'completed', updatedAt: now })

    // Clean up pending payment
    await pendingQuery.docs[0].ref.delete()

    // Redirect to success page
    return NextResponse.redirect(`${baseUrl}/odeme/basarili?order=${orderNumber}`)
  } catch (error: any) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://app.kepenk.ai'
    return NextResponse.redirect(`${baseUrl}/odeme/hata?reason=server_error`)
  }
}
