/**
 * E-Commerce Products API — List & Create
 * ─────────────────────────────────────────
 * GET  /api/v1/ecom/products — List products (paginated)
 * POST /api/v1/ecom/products — Create new product
 */

import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { CreateProductSchema } from '@kepenk/ecom-schema'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50)
    const offset = parseInt(searchParams.get('offset') || '0')
    const status = searchParams.get('status') || undefined
    const categoryId = searchParams.get('categoryId') || undefined
    const search = searchParams.get('q') || undefined

    let query = adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('products')
      .orderBy('numericId', 'desc')
      .limit(limit)
      .offset(offset)

    if (status) {
      query = query.where('status', '==', status) as any
    }
    if (categoryId) {
      query = query.where('categoryIds', 'array-contains', categoryId) as any
    }

    const snapshot = await query.get()
    const products = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))

    // Count total
    const countSnap = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('products')
      .count()
      .get()
    const total = countSnap.data().count

    return NextResponse.json({
      ok: true,
      products,
      pagination: { total, limit, offset, hasMore: offset + limit < total },
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Ürünler getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    const parsed = CreateProductSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({
        error: 'Geçersiz ürün verisi',
        issues: parsed.error.issues.map(i => ({ path: i.path.join('.'), message: i.message })),
      }, { status: 400 })
    }

    const data = parsed.data
    const productsRef = adminDb.collection('esnaflar').doc(esnafId).collection('products')

    // Check product limit
    const countSnap = await productsRef.count().get()
    if (countSnap.data().count >= 500) {
      return NextResponse.json({ error: 'Maksimum ürün sayısına (500) ulaşıldı' }, { status: 422 })
    }

    // Auto-increment numericId
    const lastDoc = await productsRef.orderBy('numericId', 'desc').limit(1).get()
    const nextId = lastDoc.empty ? 1 : (lastDoc.docs[0].data().numericId || 0) + 1

    // Compute price range from variants
    const prices = data.variants.map(v => v.price)
    const priceRange = { min: Math.min(...prices), max: Math.max(...prices) }

    const now = new Date().toISOString()
    const productDoc = {
      ...data,
      esnafId,
      numericId: nextId,
      revision: 1,
      priceRange,
      createdAt: now,
      updatedAt: now,
    }

    const docRef = await productsRef.add(productDoc)

    return NextResponse.json({
      ok: true,
      product: { id: docRef.id, ...productDoc },
    }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Ürün oluşturulamadı', detay: error.message }, { status: 500 })
  }
}
