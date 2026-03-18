/**
 * Coupon CRUD API
 * ───────────────
 * GET    /api/v1/ecom/coupons — List coupons
 * POST   /api/v1/ecom/coupons — Create coupon
 * PUT    /api/v1/ecom/coupons — Update coupon
 * DELETE /api/v1/ecom/coupons — Delete coupon
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const snapshot = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('coupons')
      .orderBy('createdAt', 'desc')
      .get()

    const coupons = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
    return NextResponse.json({ ok: true, coupons })
  } catch (error: any) {
    return NextResponse.json({ error: 'Kuponlar getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()

    if (!body.code || !body.name || !body.discountType) {
      return NextResponse.json({ error: 'code, name ve discountType gerekli' }, { status: 400 })
    }

    const couponsRef = adminDb.collection('esnaflar').doc(esnafId).collection('coupons')

    // Check for duplicate code
    const existing = await couponsRef.where('code', '==', body.code.toUpperCase()).limit(1).get()
    if (!existing.empty) {
      return NextResponse.json({ error: 'Bu kupon kodu zaten mevcut' }, { status: 409 })
    }

    const now = new Date().toISOString()
    const couponData = {
      ...body,
      esnafId,
      code: body.code.toUpperCase(),
      currentUsageCount: 0,
      status: 'active',
      createdAt: now,
      updatedAt: now,
    }

    const docRef = await couponsRef.add(couponData)
    return NextResponse.json({ ok: true, coupon: { id: docRef.id, ...couponData } }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Kupon oluşturulamadı', detay: error.message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    const { id, ...updates } = body
    if (!id) return NextResponse.json({ error: 'id gerekli' }, { status: 400 })

    const docRef = adminDb.collection('esnaflar').doc(esnafId).collection('coupons').doc(id)
    const doc = await docRef.get()
    if (!doc.exists) return NextResponse.json({ error: 'Kupon bulunamadı' }, { status: 404 })

    await docRef.update({ ...updates, updatedAt: new Date().toISOString() })
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: 'Güncelleme başarısız', detay: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    const { id } = body
    if (!id) return NextResponse.json({ error: 'id gerekli' }, { status: 400 })

    await adminDb.collection('esnaflar').doc(esnafId).collection('coupons').doc(id).delete()
    return NextResponse.json({ ok: true, mesaj: 'Kupon silindi' })
  } catch (error: any) {
    return NextResponse.json({ error: 'Silme başarısız', detay: error.message }, { status: 500 })
  }
}
