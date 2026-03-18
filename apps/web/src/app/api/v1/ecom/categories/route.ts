/**
 * E-Commerce Categories API — List & Create & Update & Delete
 * ────────────────────────────────────────────────────────────
 * GET    /api/v1/ecom/categories
 * POST   /api/v1/ecom/categories
 * PUT    /api/v1/ecom/categories  (body.id required)
 * DELETE /api/v1/ecom/categories  (body.id required)
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { CreateCategorySchema, UpdateCategorySchema } from '@kepenk/ecom-schema'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const catsRef = adminDb.collection('esnaflar').doc(esnafId).collection('categories')
    const snapshot = await catsRef.orderBy('sortOrder', 'asc').get()
    const categories = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))

    return NextResponse.json({ ok: true, categories })
  } catch (error: any) {
    return NextResponse.json({ error: 'Kategoriler getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    const parsed = CreateCategorySchema.safeParse({ ...body, esnafId })

    if (!parsed.success) {
      return NextResponse.json({
        error: 'Geçersiz kategori verisi',
        issues: parsed.error.issues.map(i => ({ path: i.path.join('.'), message: i.message })),
      }, { status: 400 })
    }

    const catsRef = adminDb.collection('esnaflar').doc(esnafId).collection('categories')

    // Check limit
    const countSnap = await catsRef.count().get()
    if (countSnap.data().count >= 100) {
      return NextResponse.json({ error: 'Maksimum kategori sayısına (100) ulaşıldı' }, { status: 422 })
    }

    // Validate depth (max 3 levels)
    if (parsed.data.parentId) {
      const parentDoc = await catsRef.doc(parsed.data.parentId).get()
      if (!parentDoc.exists) {
        return NextResponse.json({ error: 'Üst kategori bulunamadı' }, { status: 400 })
      }
      const parentData = parentDoc.data()!
      if (parentData.parentId) {
        // Parent already has a parent → this would be level 3
        const grandParent = await catsRef.doc(parentData.parentId).get()
        if (grandParent.exists && grandParent.data()?.parentId) {
          return NextResponse.json({ error: 'Maksimum kategori derinliği (3) aşılır' }, { status: 422 })
        }
      }
    }

    const now = new Date().toISOString()
    const catDoc = {
      ...parsed.data,
      productCount: 0,
      createdAt: now,
      updatedAt: now,
    }

    const docRef = await catsRef.add(catDoc)

    return NextResponse.json({
      ok: true,
      category: { id: docRef.id, ...catDoc },
    }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Kategori oluşturulamadı', detay: error.message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    const { id, ...updateFields } = body

    if (!id) return NextResponse.json({ error: 'id gerekli' }, { status: 400 })

    const parsed = UpdateCategorySchema.safeParse(updateFields)
    if (!parsed.success) {
      return NextResponse.json({
        error: 'Geçersiz güncelleme verisi',
        issues: parsed.error.issues.map(i => ({ path: i.path.join('.'), message: i.message })),
      }, { status: 400 })
    }

    const docRef = adminDb.collection('esnaflar').doc(esnafId).collection('categories').doc(id)
    const doc = await docRef.get()

    if (!doc.exists) return NextResponse.json({ error: 'Kategori bulunamadı' }, { status: 404 })

    await docRef.update({
      ...parsed.data,
      updatedAt: new Date().toISOString(),
    })

    return NextResponse.json({ ok: true, category: { id, ...doc.data(), ...parsed.data } })
  } catch (error: any) {
    return NextResponse.json({ error: 'Kategori güncellenemedi', detay: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    const { id } = body

    if (!id) return NextResponse.json({ error: 'id gerekli' }, { status: 400 })

    const docRef = adminDb.collection('esnaflar').doc(esnafId).collection('categories').doc(id)
    const doc = await docRef.get()

    if (!doc.exists) return NextResponse.json({ error: 'Kategori bulunamadı' }, { status: 404 })

    // Check if category has products
    const catData = doc.data()!
    if (catData.productCount > 0) {
      return NextResponse.json({
        error: `Bu kategoride ${catData.productCount} ürün var. Önce ürünleri taşıyın.`,
      }, { status: 422 })
    }

    // Check for child categories
    const childSnap = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('categories')
      .where('parentId', '==', id)
      .limit(1)
      .get()

    if (!childSnap.empty) {
      return NextResponse.json({
        error: 'Bu kategorinin alt kategorileri var. Önce alt kategorileri silin.',
      }, { status: 422 })
    }

    await docRef.delete()

    return NextResponse.json({ ok: true, mesaj: 'Kategori silindi' })
  } catch (error: any) {
    return NextResponse.json({ error: 'Kategori silinemedi', detay: error.message }, { status: 500 })
  }
}
