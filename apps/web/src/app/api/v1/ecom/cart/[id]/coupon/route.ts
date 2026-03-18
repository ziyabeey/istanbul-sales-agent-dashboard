/**
 * Apply Coupon to Cart
 * ────────────────────
 * POST /api/v1/ecom/cart/[id]/coupon — Validate & apply coupon
 * DELETE /api/v1/ecom/cart/[id]/coupon — Remove coupon
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { id: cartId } = await params
    const body = await request.json()
    const { esnafId, couponCode } = body

    if (!esnafId || !couponCode) {
      return NextResponse.json({ error: 'esnafId ve couponCode gerekli' }, { status: 400 })
    }

    // Find coupon
    const couponSnap = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('coupons')
      .where('code', '==', couponCode.toUpperCase())
      .where('status', '==', 'active')
      .limit(1)
      .get()

    if (couponSnap.empty) {
      return NextResponse.json({ error: 'Geçersiz veya süresi dolmuş kupon kodu' }, { status: 404 })
    }

    const couponDoc = couponSnap.docs[0]
    const coupon = couponDoc.data()

    // Validate usage limit
    if (coupon.totalUsageLimit && coupon.currentUsageCount >= coupon.totalUsageLimit) {
      return NextResponse.json({ error: 'Bu kupon kullanım limitine ulaşmış' }, { status: 422 })
    }

    // Validate date range
    const now = new Date()
    if (coupon.startsAt && new Date(coupon.startsAt) > now) {
      return NextResponse.json({ error: 'Bu kupon henüz aktif değil' }, { status: 422 })
    }
    if (coupon.endsAt && new Date(coupon.endsAt) < now) {
      return NextResponse.json({ error: 'Bu kuponun süresi dolmuş' }, { status: 422 })
    }

    // Fetch cart
    const cartRef = adminDb.collection('esnaflar').doc(esnafId).collection('carts').doc(cartId)
    const cartDoc = await cartRef.get()
    if (!cartDoc.exists) return NextResponse.json({ error: 'Sepet bulunamadı' }, { status: 404 })

    const cart = cartDoc.data()!
    const subtotal = cart.priceSummary?.subtotal || 0

    // Validate min subtotal
    if (coupon.minSubtotal && subtotal < coupon.minSubtotal) {
      return NextResponse.json({
        error: `Minimum sepet tutarı ₺${coupon.minSubtotal}. Mevcut: ₺${subtotal}`,
      }, { status: 422 })
    }

    // Calculate discount
    let discountAmount = 0
    switch (coupon.discountType) {
      case 'percentage_off':
        discountAmount = subtotal * (coupon.value / 100)
        if (coupon.maxDiscountAmount) {
          discountAmount = Math.min(discountAmount, coupon.maxDiscountAmount)
        }
        break
      case 'fixed_amount_off':
        discountAmount = Math.min(coupon.value, subtotal)
        break
      case 'free_shipping':
        discountAmount = cart.priceSummary?.shipping || 0
        break
    }

    discountAmount = Math.round(discountAmount * 100) / 100

    // Apply to cart
    const appliedDiscount = {
      id: couponDoc.id,
      name: coupon.name,
      type: coupon.discountType === 'free_shipping' ? 'free_shipping' : (coupon.discountType === 'percentage_off' ? 'percentage' : 'fixed'),
      value: coupon.value,
      discountAmount,
      source: 'coupon',
      couponCode: coupon.code,
    }

    const newTotal = Math.max(0, subtotal - discountAmount + (cart.priceSummary?.shipping || 0))

    await cartRef.update({
      couponCode: coupon.code,
      appliedDiscounts: [appliedDiscount],
      'priceSummary.discount': discountAmount,
      'priceSummary.total': newTotal,
      updatedAt: new Date().toISOString(),
    })

    return NextResponse.json({
      ok: true,
      coupon: { code: coupon.code, name: coupon.name, discountAmount },
      newTotal,
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Kupon uygulanamadı', detay: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id: cartId } = await params
    const body = await request.json()
    const { esnafId } = body

    if (!esnafId) return NextResponse.json({ error: 'esnafId gerekli' }, { status: 400 })

    const cartRef = adminDb.collection('esnaflar').doc(esnafId).collection('carts').doc(cartId)
    const cartDoc = await cartRef.get()
    if (!cartDoc.exists) return NextResponse.json({ error: 'Sepet bulunamadı' }, { status: 404 })

    const cart = cartDoc.data()!
    const subtotal = cart.priceSummary?.subtotal || 0
    const shipping = cart.priceSummary?.shipping || 0

    await cartRef.update({
      couponCode: null,
      appliedDiscounts: [],
      'priceSummary.discount': 0,
      'priceSummary.total': subtotal + shipping,
      updatedAt: new Date().toISOString(),
    })

    return NextResponse.json({ ok: true, newTotal: subtotal + shipping })
  } catch (error: any) {
    return NextResponse.json({ error: 'Kupon kaldırılamadı', detay: error.message }, { status: 500 })
  }
}
