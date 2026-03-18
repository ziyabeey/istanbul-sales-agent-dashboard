/**
 * E-Commerce Cart API — Create & Get
 * ─────────────────────────────────────
 * POST /api/v1/ecom/cart — Create new cart
 * GET  /api/v1/ecom/cart?cartId=xxx — Get cart by ID
 */

import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { esnafId, buyer } = body

    if (!esnafId) {
      return NextResponse.json({ error: 'esnafId gerekli' }, { status: 400 })
    }

    const now = new Date().toISOString()
    const cartId = uuidv4()
    const purchaseFlowId = uuidv4()

    const cart = {
      id: cartId,
      esnafId,
      purchaseFlowId,
      revision: 1,
      buyer: buyer || { type: 'visitor', visitorId: uuidv4() },
      lineItems: [],
      appliedDiscounts: [],
      priceSummary: {
        subtotal: 0,
        shipping: 0,
        discount: 0,
        additionalFees: 0,
        tax: 0,
        total: 0,
      },
      currency: 'TRY',
      createdAt: now,
      updatedAt: now,
      lastActivityAt: now,
      abandonedNotificationSent: false,
    }

    await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('carts').doc(cartId)
      .set(cart)

    return NextResponse.json({ ok: true, cart }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Sepet oluşturulamadı', detay: error.message }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const cartId = searchParams.get('cartId')
    const esnafId = searchParams.get('esnafId')

    if (!cartId || !esnafId) {
      return NextResponse.json({ error: 'cartId ve esnafId gerekli' }, { status: 400 })
    }

    const doc = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('carts').doc(cartId)
      .get()

    if (!doc.exists) {
      return NextResponse.json({ error: 'Sepet bulunamadı' }, { status: 404 })
    }

    return NextResponse.json({ ok: true, cart: doc.data() })
  } catch (error: any) {
    return NextResponse.json({ error: 'Sepet getirilemedi', detay: error.message }, { status: 500 })
  }
}
