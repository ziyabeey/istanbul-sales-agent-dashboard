/**
 * E-Commerce Single Product API — Get, Update, Delete
 * ─────────────────────────────────────────────────────
 * GET    /api/v1/ecom/products/[id]
 * PUT    /api/v1/ecom/products/[id]
 * DELETE /api/v1/ecom/products/[id]
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { UpdateProductSchema } from '@kepenk/ecom-schema'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { id } = await params
    const docRef = adminDb.collection('esnaflar').doc(esnafId).collection('products').doc(id)
    const doc = await docRef.get()

    if (!doc.exists) {
      return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 })
    }

    return NextResponse.json({ ok: true, product: { id: doc.id, ...doc.data() } })
  } catch (error: any) {
    return NextResponse.json({ error: 'Ürün getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { id } = await params
    const body = await request.json()

    const parsed = UpdateProductSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({
        error: 'Geçersiz güncelleme verisi',
        issues: parsed.error.issues.map(i => ({ path: i.path.join('.'), message: i.message })),
      }, { status: 400 })
    }

    const docRef = adminDb.collection('esnaflar').doc(esnafId).collection('products').doc(id)
    const doc = await docRef.get()

    if (!doc.exists) {
      return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 })
    }

    const current = doc.data()!
    const updateData: Record<string, any> = {
      ...parsed.data,
      updatedAt: new Date().toISOString(),
      revision: (current.revision || 1) + 1,
    }

    // Recompute price range if variants changed
    if (parsed.data.variants) {
      const prices = parsed.data.variants.map(v => v.price)
      updateData.priceRange = { min: Math.min(...prices), max: Math.max(...prices) }
    }

    await docRef.update(updateData)

    return NextResponse.json({
      ok: true,
      product: { id, ...current, ...updateData },
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Ürün güncellenemedi', detay: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { id } = await params
    const docRef = adminDb.collection('esnaflar').doc(esnafId).collection('products').doc(id)
    const doc = await docRef.get()

    if (!doc.exists) {
      return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 })
    }

    // Soft delete: archive instead of delete
    await docRef.update({
      status: 'archived',
      updatedAt: new Date().toISOString(),
    })

    return NextResponse.json({ ok: true, mesaj: 'Ürün arşivlendi' })
  } catch (error: any) {
    return NextResponse.json({ error: 'Ürün silinemedi', detay: error.message }, { status: 500 })
  }
}
