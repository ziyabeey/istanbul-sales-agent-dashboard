/**
 * Single Checkout API — Get + Update
 * ────────────────────────────────────
 * GET /api/v1/ecom/checkout/[id]?esnafId=xxx
 * PUT /api/v1/ecom/checkout/[id] — Update buyer info, address, shipping, payment
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id: checkoutId } = await params
    const { searchParams } = new URL(request.url)
    const esnafId = searchParams.get('esnafId')

    if (!esnafId) {
      return NextResponse.json({ error: 'esnafId gerekli' }, { status: 400 })
    }

    const doc = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('checkouts').doc(checkoutId)
      .get()

    if (!doc.exists) {
      return NextResponse.json({ error: 'Checkout bulunamadı' }, { status: 404 })
    }

    return NextResponse.json({ ok: true, checkout: doc.data() })
  } catch (error: any) {
    return NextResponse.json({ error: 'Getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id: checkoutId } = await params
    const body = await request.json()
    const { esnafId, ...updateFields } = body

    if (!esnafId) {
      return NextResponse.json({ error: 'esnafId gerekli' }, { status: 400 })
    }

    const docRef = adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('checkouts').doc(checkoutId)

    const doc = await docRef.get()
    if (!doc.exists) {
      return NextResponse.json({ error: 'Checkout bulunamadı' }, { status: 404 })
    }

    const current = doc.data()!
    if (current.status !== 'open') {
      return NextResponse.json({ error: 'Bu checkout artık güncellenemez' }, { status: 422 })
    }

    // Allowed update fields
    const allowed: Record<string, any> = {}
    if (updateFields.buyerInfo) allowed.buyerInfo = updateFields.buyerInfo
    if (updateFields.invoiceType) allowed.invoiceType = updateFields.invoiceType
    if (updateFields.shippingAddress) allowed.shippingAddress = updateFields.shippingAddress
    if (updateFields.billingAddress) allowed.billingAddress = updateFields.billingAddress
    if (updateFields.selectedShipping) {
      allowed.selectedShipping = updateFields.selectedShipping
      // Recalc total with shipping
      allowed['priceSummary.shipping'] = updateFields.selectedShipping.price || 0
      allowed['priceSummary.total'] =
        (current.priceSummary.subtotal || 0) -
        (current.priceSummary.discount || 0) +
        (updateFields.selectedShipping.price || 0) +
        (current.priceSummary.additionalFees || 0)
    }
    if (updateFields.paymentMethod) {
      allowed.paymentMethod = updateFields.paymentMethod
      // If installments, recalc installment total
      if (updateFields.paymentMethod.creditCard?.installmentCount > 1 &&
          updateFields.paymentMethod.creditCard?.totalWithInstallment) {
        allowed['priceSummary.installmentTotal'] =
          updateFields.paymentMethod.creditCard.totalWithInstallment
      }
    }
    if (updateFields.buyerNote !== undefined) allowed.buyerNote = updateFields.buyerNote

    allowed.updatedAt = new Date().toISOString()
    allowed.revision = (current.revision || 1) + 1

    await docRef.update(allowed)

    return NextResponse.json({
      ok: true,
      checkout: { ...current, ...allowed },
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Güncelleme başarısız', detay: error.message }, { status: 500 })
  }
}
