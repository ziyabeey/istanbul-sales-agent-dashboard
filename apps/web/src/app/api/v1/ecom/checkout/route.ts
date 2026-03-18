/**
 * Checkout API — Create & List
 * ─────────────────────────────
 * POST /api/v1/ecom/checkout — Create checkout from cart (immutable snapshot)
 * GET  /api/v1/ecom/checkout?checkoutId=xxx&esnafId=xxx — Get checkout
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { cartId, esnafId } = body

    if (!cartId || !esnafId) {
      return NextResponse.json({ error: 'cartId ve esnafId gerekli' }, { status: 400 })
    }

    // Fetch cart
    const cartDoc = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('carts').doc(cartId)
      .get()

    if (!cartDoc.exists) {
      return NextResponse.json({ error: 'Sepet bulunamadı' }, { status: 404 })
    }

    const cart = cartDoc.data()!
    if (!cart.lineItems || cart.lineItems.length === 0) {
      return NextResponse.json({ error: 'Sepet boş' }, { status: 422 })
    }

    const now = new Date().toISOString()
    const checkoutId = uuidv4()
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24h

    // Convert cart items to checkout line items (immutable snapshot)
    const lineItems = cart.lineItems.map((item: any) => ({
      id: item.id,
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity,
      productName: item.snapshot.productName,
      variantChoices: item.snapshot.variantChoices,
      price: item.snapshot.price,
      lineTotal: item.lineTotal,
      imageUrl: item.snapshot.imageUrl,
      sku: item.snapshot.sku,
      weight: item.snapshot.weight,
    }))

    const checkout = {
      id: checkoutId,
      cartId,
      purchaseFlowId: cart.purchaseFlowId,
      esnafId,
      revision: 1,
      buyerInfo: {
        email: cart.buyer?.email || '',
        firstName: '',
        lastName: '',
        phone: '',
      },
      invoiceType: 'individual',
      billingAddress: { sameAsShipping: true },
      lineItems,
      priceSummary: cart.priceSummary,
      appliedDiscounts: cart.appliedDiscounts || [],
      status: 'open',
      createdAt: now,
      updatedAt: now,
      expiresAt,
    }

    await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('checkouts').doc(checkoutId)
      .set(checkout)

    return NextResponse.json({ ok: true, checkout }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Checkout oluşturulamadı', detay: error.message }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const checkoutId = searchParams.get('checkoutId')
    const esnafId = searchParams.get('esnafId')

    if (!checkoutId || !esnafId) {
      return NextResponse.json({ error: 'checkoutId ve esnafId gerekli' }, { status: 400 })
    }

    const doc = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('checkouts').doc(checkoutId)
      .get()

    if (!doc.exists) {
      return NextResponse.json({ error: 'Checkout bulunamadı' }, { status: 404 })
    }

    const checkout = doc.data()!

    // Check expiry
    if (checkout.status === 'open' && new Date(checkout.expiresAt) < new Date()) {
      await adminDb
        .collection('esnaflar').doc(esnafId)
        .collection('checkouts').doc(checkoutId)
        .update({ status: 'expired' })
      checkout.status = 'expired'
    }

    return NextResponse.json({ ok: true, checkout })
  } catch (error: any) {
    return NextResponse.json({ error: 'Checkout getirilemedi', detay: error.message }, { status: 500 })
  }
}
