/**
 * Cart Items API — Add, Update, Remove
 * ──────────────────────────────────────
 * POST   /api/v1/ecom/cart/[id]/items — Add item
 * PUT    /api/v1/ecom/cart/[id]/items — Update item quantity
 * DELETE /api/v1/ecom/cart/[id]/items — Remove item
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { v4 as uuidv4 } from 'uuid'

interface RouteParams {
  params: Promise<{ id: string }>
}

function recalcPriceSummary(lineItems: any[]) {
  const subtotal = lineItems.reduce((sum: number, item: any) => sum + item.lineTotal, 0)
  return {
    subtotal,
    shipping: 0,
    discount: 0,
    additionalFees: 0,
    tax: 0,
    total: subtotal,
  }
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { id: cartId } = await params
    const body = await request.json()
    const { esnafId, productId, variantId, quantity = 1, modifierSelections, customFieldValues } = body

    if (!esnafId || !productId || !variantId) {
      return NextResponse.json({ error: 'esnafId, productId, variantId gerekli' }, { status: 400 })
    }

    const cartRef = adminDb.collection('esnaflar').doc(esnafId).collection('carts').doc(cartId)
    const cartDoc = await cartRef.get()

    if (!cartDoc.exists) {
      return NextResponse.json({ error: 'Sepet bulunamadı' }, { status: 404 })
    }

    // Fetch product + variant for snapshot
    const productDoc = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('products').doc(productId)
      .get()

    if (!productDoc.exists) {
      return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 })
    }

    const product = productDoc.data()!
    const variant = product.variants?.find((v: any) => v.id === variantId)

    if (!variant) {
      return NextResponse.json({ error: 'Varyant bulunamadı' }, { status: 404 })
    }

    // Check inventory
    if (variant.inventory?.trackQuantity && variant.inventory.quantity < quantity) {
      return NextResponse.json({
        error: 'Yetersiz stok',
        available: variant.inventory.quantity,
      }, { status: 422 })
    }

    const cart = cartDoc.data()!
    const lineItems = [...(cart.lineItems || [])]

    // Check if same product+variant already in cart
    const existingIdx = lineItems.findIndex(
      (item: any) => item.productId === productId && item.variantId === variantId
    )

    const modifierTotal = (modifierSelections || []).reduce(
      (sum: number, m: any) => sum + (m.priceAdjustment || 0), 0
    )

    if (existingIdx >= 0) {
      // Update quantity
      lineItems[existingIdx].quantity += quantity
      lineItems[existingIdx].lineTotal =
        lineItems[existingIdx].quantity * (variant.price + modifierTotal)
    } else {
      // Check cart item limit
      if (lineItems.length >= 50) {
        return NextResponse.json({ error: 'Sepet maksimum 50 ürün içerebilir' }, { status: 422 })
      }

      const newItem = {
        id: uuidv4(),
        productId,
        variantId,
        quantity,
        snapshot: {
          productName: product.name,
          variantChoices: variant.choices || {},
          price: variant.price,
          compareAtPrice: variant.compareAtPrice,
          sku: variant.sku,
          weight: variant.weight,
          imageUrl: product.media?.[0]?.url,
          productType: product.productType,
        },
        modifierSelections: modifierSelections || undefined,
        customFieldValues: customFieldValues || undefined,
        lineTotal: quantity * (variant.price + modifierTotal),
      }

      lineItems.push(newItem)
    }

    const priceSummary = recalcPriceSummary(lineItems)
    const now = new Date().toISOString()

    await cartRef.update({
      lineItems,
      priceSummary,
      updatedAt: now,
      lastActivityAt: now,
      revision: (cart.revision || 1) + 1,
    })

    return NextResponse.json({
      ok: true,
      cart: { ...cart, lineItems, priceSummary, updatedAt: now },
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Ürün eklenemedi', detay: error.message }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id: cartId } = await params
    const body = await request.json()
    const { esnafId, itemId, quantity } = body

    if (!esnafId || !itemId || quantity === undefined) {
      return NextResponse.json({ error: 'esnafId, itemId, quantity gerekli' }, { status: 400 })
    }

    const cartRef = adminDb.collection('esnaflar').doc(esnafId).collection('carts').doc(cartId)
    const cartDoc = await cartRef.get()

    if (!cartDoc.exists) {
      return NextResponse.json({ error: 'Sepet bulunamadı' }, { status: 404 })
    }

    const cart = cartDoc.data()!
    const lineItems = [...(cart.lineItems || [])]
    const itemIdx = lineItems.findIndex((item: any) => item.id === itemId)

    if (itemIdx < 0) {
      return NextResponse.json({ error: 'Sepet öğesi bulunamadı' }, { status: 404 })
    }

    if (quantity <= 0) {
      lineItems.splice(itemIdx, 1)
    } else {
      const modifierTotal = (lineItems[itemIdx].modifierSelections || []).reduce(
        (sum: number, m: any) => sum + (m.priceAdjustment || 0), 0
      )
      lineItems[itemIdx].quantity = quantity
      lineItems[itemIdx].lineTotal = quantity * (lineItems[itemIdx].snapshot.price + modifierTotal)
    }

    const priceSummary = recalcPriceSummary(lineItems)
    const now = new Date().toISOString()

    await cartRef.update({ lineItems, priceSummary, updatedAt: now, lastActivityAt: now })

    return NextResponse.json({ ok: true, cart: { ...cart, lineItems, priceSummary } })
  } catch (error: any) {
    return NextResponse.json({ error: 'Güncelleme başarısız', detay: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id: cartId } = await params
    const body = await request.json()
    const { esnafId, itemId } = body

    if (!esnafId || !itemId) {
      return NextResponse.json({ error: 'esnafId ve itemId gerekli' }, { status: 400 })
    }

    const cartRef = adminDb.collection('esnaflar').doc(esnafId).collection('carts').doc(cartId)
    const cartDoc = await cartRef.get()

    if (!cartDoc.exists) {
      return NextResponse.json({ error: 'Sepet bulunamadı' }, { status: 404 })
    }

    const cart = cartDoc.data()!
    const lineItems = (cart.lineItems || []).filter((item: any) => item.id !== itemId)
    const priceSummary = recalcPriceSummary(lineItems)
    const now = new Date().toISOString()

    await cartRef.update({ lineItems, priceSummary, updatedAt: now, lastActivityAt: now })

    return NextResponse.json({ ok: true, cart: { ...cart, lineItems, priceSummary } })
  } catch (error: any) {
    return NextResponse.json({ error: 'Silme başarısız', detay: error.message }, { status: 500 })
  }
}
