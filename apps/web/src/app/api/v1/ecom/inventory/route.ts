/**
 * Inventory Management API — List & Bulk Operations
 * ──────────────────────────────────────────────────
 * GET  /api/v1/ecom/inventory — Get inventory overview (low stock, out of stock)
 * POST /api/v1/ecom/inventory — Bulk stock adjustment
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const filter = searchParams.get('filter') // 'low_stock' | 'out_of_stock' | 'all'

    const productsRef = adminDb.collection('esnaflar').doc(esnafId).collection('products')
    const snapshot = await productsRef
      .where('status', '==', 'active')
      .get()

    const inventory: any[] = []
    let totalProducts = 0
    let lowStockCount = 0
    let outOfStockCount = 0

    snapshot.docs.forEach((doc: any) => {
      const product = doc.data()
      totalProducts++

      const variants = product.variants || []
      for (const variant of variants) {
        if (!variant.inventory?.trackQuantity) continue

        const qty = variant.inventory.quantity || 0
        const threshold = variant.inventory.lowStockThreshold || 5
        const isLow = qty > 0 && qty <= threshold
        const isOut = qty <= 0

        if (isOut) outOfStockCount++
        else if (isLow) lowStockCount++

        // Apply filter
        if (filter === 'low_stock' && !isLow) continue
        if (filter === 'out_of_stock' && !isOut) continue

        inventory.push({
          productId: doc.id,
          productName: product.name,
          variantId: variant.id,
          variantChoices: variant.choices,
          sku: variant.sku,
          quantity: qty,
          lowStockThreshold: threshold,
          isLowStock: isLow,
          isOutOfStock: isOut,
          allowBackorder: variant.inventory.allowBackorder || false,
        })
      }
    })

    // Sort: out of stock first, then low stock, then by qty
    inventory.sort((a, b) => {
      if (a.isOutOfStock && !b.isOutOfStock) return -1
      if (!a.isOutOfStock && b.isOutOfStock) return 1
      if (a.isLowStock && !b.isLowStock) return -1
      if (!a.isLowStock && b.isLowStock) return 1
      return a.quantity - b.quantity
    })

    return NextResponse.json({
      ok: true,
      summary: { totalProducts, lowStockCount, outOfStockCount, trackedVariants: inventory.length },
      inventory,
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Envanter getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    const { adjustments } = body
    // adjustments: Array<{ productId, variantId, adjustment: number, reason?: string }>

    if (!adjustments || !Array.isArray(adjustments) || adjustments.length === 0) {
      return NextResponse.json({ error: 'adjustments dizisi gerekli' }, { status: 400 })
    }

    if (adjustments.length > 50) {
      return NextResponse.json({ error: 'Tek seferde en fazla 50 düzenleme yapılabilir' }, { status: 422 })
    }

    const results: any[] = []
    const batch = adminDb.batch()

    for (const adj of adjustments) {
      const { productId, variantId, adjustment, reason } = adj
      if (!productId || !variantId || adjustment === undefined) continue

      const docRef = adminDb
        .collection('esnaflar').doc(esnafId)
        .collection('products').doc(productId)

      const doc = await docRef.get()
      if (!doc.exists) {
        results.push({ productId, variantId, ok: false, error: 'Ürün bulunamadı' })
        continue
      }

      const product = doc.data()!
      const variants = [...(product.variants || [])]
      const vIdx = variants.findIndex((v: any) => v.id === variantId)

      if (vIdx < 0) {
        results.push({ productId, variantId, ok: false, error: 'Varyant bulunamadı' })
        continue
      }

      const oldQty = variants[vIdx].inventory?.quantity || 0
      const newQty = Math.max(0, oldQty + adjustment)
      variants[vIdx] = {
        ...variants[vIdx],
        inventory: { ...variants[vIdx].inventory, quantity: newQty },
      }

      batch.update(docRef, {
        variants,
        updatedAt: new Date().toISOString(),
      })

      results.push({
        productId, variantId, ok: true,
        oldQuantity: oldQty, newQuantity: newQty, adjustment,
        reason: reason || undefined,
      })
    }

    await batch.commit()

    return NextResponse.json({ ok: true, results })
  } catch (error: any) {
    return NextResponse.json({ error: 'Envanter güncellenemedi', detay: error.message }, { status: 500 })
  }
}
