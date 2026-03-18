/**
 * Restaurant Menu API — Items + Categories + Public Menu
 * GET  /api/v1/restaurant/menu — List items/categories/public menu
 * POST /api/v1/restaurant/menu — Create/update items + categories
 */
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'items'

    // Public menu — no auth required (QR menü)
    if (mode === 'public') {
      const esnafId = searchParams.get('esnafId')
      if (!esnafId) return NextResponse.json({ error: 'esnafId gerekli' }, { status: 400 })

      const catSnap = await adminDb.collection('esnaflar').doc(esnafId)
        .collection('menu_categories').orderBy('sortOrder').get()
      const itemSnap = await adminDb.collection('esnaflar').doc(esnafId)
        .collection('menu_items').where('availability.status', '==', 'available').orderBy('sortOrder').get()

      return NextResponse.json({
        ok: true,
        categories: catSnap.docs.map((d: any) => ({ id: d.id, ...d.data() })),
        items: itemSnap.docs.map((d: any) => {
          const data = d.data()
          return { id: d.id, name: data.name, description: data.shortDescription || data.description, categoryId: data.categoryId, pricing: data.pricing, image: data.image, tags: data.tags, allergens: data.allergens, calories: data.calories, featured: data.featured, newItem: data.newItem, chefRecommendation: data.chefRecommendation }
        }),
      })
    }

    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

    if (mode === 'categories') {
      const snap = await adminDb.collection('esnaflar').doc(esnafId)
        .collection('menu_categories').orderBy('sortOrder').get()
      return NextResponse.json({ ok: true, categories: snap.docs.map((d: any) => ({ id: d.id, ...d.data() })) })
    }

    if (mode === 'item') {
      const id = searchParams.get('id')
      if (!id) return NextResponse.json({ error: 'id gerekli' }, { status: 400 })
      const doc = await adminDb.collection('esnaflar').doc(esnafId).collection('menu_items').doc(id).get()
      if (!doc.exists) return NextResponse.json({ error: 'Menü öğesi bulunamadı' }, { status: 404 })
      return NextResponse.json({ ok: true, item: { id: doc.id, ...doc.data() } })
    }

    // Default: all items
    const categoryId = searchParams.get('categoryId')
    let query: any = adminDb.collection('esnaflar').doc(esnafId).collection('menu_items').orderBy('sortOrder')
    if (categoryId) query = query.where('categoryId', '==', categoryId)
    const snap = await query.limit(200).get()
    return NextResponse.json({ ok: true, items: snap.docs.map((d: any) => ({ id: d.id, ...d.data() })) })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const body = await request.json()

    switch (body.action) {
      case 'create_item': {
        const { name, categoryId, pricing, description, tags, allergens, image, preparationTime } = body
        if (!name || !categoryId || !pricing?.basePrice) return NextResponse.json({ error: 'name, categoryId, pricing.basePrice gerekli' }, { status: 400 })

        const item = {
          id: uuidv4(), esnafId, name, description: description || '', shortDescription: (description || '').slice(0, 100),
          categoryId, subcategoryId: body.subcategoryId || null,
          pricing: { basePrice: pricing.basePrice, currency: 'TRY', taxRate: 10, portions: pricing.portions || [], extras: pricing.extras || [] },
          recipeId: body.recipeId || null, image: image || null, gallery: body.gallery || [],
          tags: tags || [], allergens: allergens || [], calories: body.calories || null, preparationTime: preparationTime || 15,
          availability: { status: 'available', availableDays: null, availableHours: null },
          sortOrder: body.sortOrder || 0, featured: body.featured || false, newItem: body.newItem || true, chefRecommendation: body.chefRecommendation || false,
          stats: { totalOrders: 0, averageRating: null, lastOrderedAt: null },
          createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        }
        await adminDb.collection('esnaflar').doc(esnafId).collection('menu_items').doc(item.id).set(item)
        return NextResponse.json({ ok: true, item }, { status: 201 })
      }

      case 'update_item': {
        const { itemId, ...updates } = body
        if (!itemId) return NextResponse.json({ error: 'itemId gerekli' }, { status: 400 })
        const { action: _, ...safeUpdates } = updates
        await adminDb.collection('esnaflar').doc(esnafId).collection('menu_items').doc(itemId).update({ ...safeUpdates, updatedAt: new Date().toISOString() })
        return NextResponse.json({ ok: true, mesaj: 'Menü öğesi güncellendi' })
      }

      case 'update_availability': {
        const { itemId, status: avStatus } = body
        await adminDb.collection('esnaflar').doc(esnafId).collection('menu_items').doc(itemId)
          .update({ 'availability.status': avStatus, updatedAt: new Date().toISOString() })
        return NextResponse.json({ ok: true, mesaj: avStatus === 'sold_out' ? 'Tükendi olarak işaretlendi' : 'Müsaitlik güncellendi' })
      }

      case 'delete_item': {
        await adminDb.collection('esnaflar').doc(esnafId).collection('menu_items').doc(body.itemId).delete()
        return NextResponse.json({ ok: true, mesaj: 'Menü öğesi silindi' })
      }

      case 'create_category': {
        const cat = {
          id: uuidv4(), esnafId, name: body.name, icon: body.icon || '🍽️',
          sortOrder: body.sortOrder || 0, parentId: body.parentId || null, itemCount: 0, image: body.image || null,
        }
        await adminDb.collection('esnaflar').doc(esnafId).collection('menu_categories').doc(cat.id).set(cat)
        return NextResponse.json({ ok: true, category: cat }, { status: 201 })
      }

      case 'update_category': {
        const { categoryId, ...catUpdates } = body
        const { action: _a, ...safeCatUpdates } = catUpdates
        await adminDb.collection('esnaflar').doc(esnafId).collection('menu_categories').doc(categoryId).update(safeCatUpdates)
        return NextResponse.json({ ok: true, mesaj: 'Kategori güncellendi' })
      }

      default:
        return NextResponse.json({ error: 'action: create_item, update_item, update_availability, delete_item, create_category, update_category' }, { status: 400 })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
