/**
 * Restaurant Inventory API — Stock CRUD + Recipe Deduction + Low Stock
 * GET  /api/v1/restaurant/inventory — List, low stock
 * POST /api/v1/restaurant/inventory — CRUD, adjust, deduct
 */
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'list'

    if (mode === 'low_stock') {
      const snap = await adminDb.collection('esnaflar').doc(esnafId).collection('restaurant_inventory').get()
      const lowItems = snap.docs.map((d: any) => ({ id: d.id, ...d.data() })).filter((i: any) => i.currentStock <= i.minimumStock)
      return NextResponse.json({ ok: true, lowStockItems: lowItems, count: lowItems.length })
    }

    const category = searchParams.get('category')
    let query: any = adminDb.collection('esnaflar').doc(esnafId).collection('restaurant_inventory').orderBy('name')
    if (category) query = query.where('category', '==', category)
    const snap = await query.limit(500).get()

    return NextResponse.json({
      ok: true,
      items: snap.docs.map((d: any) => ({ id: d.id, ...d.data() })),
      categories: [...new Set(snap.docs.map((d: any) => d.data().category))],
    })
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
      case 'create': {
        const item = {
          id: uuidv4(), esnafId, name: body.name, category: body.category || 'Genel',
          unit: body.unit || 'kg', currentStock: body.currentStock || 0,
          minimumStock: body.minimumStock || 5, maximumStock: body.maximumStock || null,
          unitCost: body.unitCost || 0, lastPurchaseDate: null, lastPurchasePrice: null,
          supplier: body.supplier || null, autoDeduct: body.autoDeduct ?? true,
          lowStockAlert: true, expiryDate: body.expiryDate || null,
          createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        }
        await adminDb.collection('esnaflar').doc(esnafId).collection('restaurant_inventory').doc(item.id).set(item)
        return NextResponse.json({ ok: true, item }, { status: 201 })
      }

      case 'update': {
        const { itemId, ...updates } = body
        const { action: _, ...safe } = updates
        await adminDb.collection('esnaflar').doc(esnafId).collection('restaurant_inventory').doc(itemId).update({ ...safe, updatedAt: new Date().toISOString() })
        return NextResponse.json({ ok: true, mesaj: 'Stok güncellendi' })
      }

      case 'adjust': {
        // Manual stock count adjustment
        const { itemId, newQuantity, reason } = body
        const doc = await adminDb.collection('esnaflar').doc(esnafId).collection('restaurant_inventory').doc(itemId).get()
        if (!doc.exists) return NextResponse.json({ error: 'Malzeme bulunamadı' }, { status: 404 })
        const oldQty = doc.data()!.currentStock
        await doc.ref.update({ currentStock: newQuantity, updatedAt: new Date().toISOString() })

        // Log adjustment
        await adminDb.collection('esnaflar').doc(esnafId).collection('inventory_log').add({
          itemId, itemName: doc.data()!.name, type: 'adjustment',
          oldQuantity: oldQty, newQuantity, difference: newQuantity - oldQty,
          reason: reason || 'Sayım düzeltmesi', at: new Date().toISOString(),
        })

        return NextResponse.json({ ok: true, mesaj: `Stok: ${oldQty} → ${newQuantity}` })
      }

      case 'deduct': {
        // Recipe-based deduction when an order is prepared
        const { recipeId, servings } = body
        if (!recipeId) return NextResponse.json({ error: 'recipeId gerekli' }, { status: 400 })

        const recipeDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('recipes').doc(recipeId).get()
        if (!recipeDoc.exists) return NextResponse.json({ error: 'Reçete bulunamadı' }, { status: 404 })
        const recipe = recipeDoc.data()!
        const multiplier = (servings || 1) / (recipe.servings || 1)

        const deducted: any[] = []
        const lowStock: any[] = []

        for (const ing of recipe.ingredients) {
          if (!ing.inventoryItemId) continue
          const deductQty = ing.quantity * multiplier * (ing.wasteFactor || 1)
          const invDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('restaurant_inventory').doc(ing.inventoryItemId).get()
          if (!invDoc.exists) continue

          const current = invDoc.data()!.currentStock || 0
          const newStock = Math.max(current - deductQty, 0)
          await invDoc.ref.update({ currentStock: newStock, updatedAt: new Date().toISOString() })

          deducted.push({ name: ing.name, deducted: deductQty, remaining: newStock })
          if (newStock <= (invDoc.data()!.minimumStock || 0)) lowStock.push(ing.name)
        }

        return NextResponse.json({
          ok: true, deducted, lowStockWarnings: lowStock,
          mesaj: lowStock.length > 0 ? `⚠️ Düşük stok: ${lowStock.join(', ')}` : 'Stok düşüldü',
        })
      }

      case 'purchase': {
        // Record a stock purchase
        const { itemId, quantity, price, supplier } = body
        const { FieldValue } = require('firebase-admin/firestore')
        await adminDb.collection('esnaflar').doc(esnafId).collection('restaurant_inventory').doc(itemId).update({
          currentStock: FieldValue.increment(quantity),
          lastPurchaseDate: new Date().toISOString(), lastPurchasePrice: price, supplier: supplier || null,
          unitCost: price && quantity ? price / quantity : undefined, updatedAt: new Date().toISOString(),
        })
        return NextResponse.json({ ok: true, mesaj: `${quantity} birim eklendi` })
      }

      default:
        return NextResponse.json({ error: 'action: create, update, adjust, deduct, purchase' }, { status: 400 })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
