/**
 * Mobile Editing API — Text, Price, Photo, Stock, Hours
 * POST /api/v1/mobile/edit — All mobile editing operations
 */
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const body = await request.json()
    const now = new Date().toISOString()

    switch (body.type) {
      case 'text': {
        // Inline text editing — page content
        const { pageId, fieldPath, value } = body
        if (!pageId || !fieldPath) return NextResponse.json({ error: 'pageId ve fieldPath gerekli' }, { status: 400 })
        await adminDb.collection('esnaflar').doc(esnafId).collection('site_pages').doc(pageId)
          .update({ [fieldPath]: value, updatedAt: now })
        return NextResponse.json({ ok: true, mesaj: 'Metin güncellendi' })
      }

      case 'price': {
        // Quick price update
        const { productId, price, compareAtPrice } = body
        if (!productId) return NextResponse.json({ error: 'productId gerekli' }, { status: 400 })
        const updates: Record<string, any> = { updatedAt: now }
        if (price !== undefined) updates['pricing.basePrice'] = price
        if (compareAtPrice !== undefined) updates['pricing.compareAtPrice'] = compareAtPrice
        await adminDb.collection('esnaflar').doc(esnafId).collection('products').doc(productId).update(updates)
        return NextResponse.json({ ok: true, mesaj: 'Fiyat güncellendi' })
      }

      case 'bulk_price': {
        // Bulk price update — percentage increase/decrease
        const { productIds, percentage } = body
        if (!productIds?.length || !percentage) return NextResponse.json({ error: 'productIds ve percentage gerekli' }, { status: 400 })
        const batch = adminDb.batch()
        for (const pid of productIds.slice(0, 100)) {
          const ref = adminDb.collection('esnaflar').doc(esnafId).collection('products').doc(pid)
          const doc = await ref.get()
          if (doc.exists) {
            const current = doc.data()!.pricing?.basePrice || 0
            const newPrice = Math.round(current * (1 + percentage / 100) * 100) / 100
            batch.update(ref, { 'pricing.basePrice': newPrice, updatedAt: now })
          }
        }
        await batch.commit()
        return NextResponse.json({ ok: true, mesaj: `${productIds.length} ürün fiyatı %${percentage} güncellendi` })
      }

      case 'stock': {
        const { productId, variantId, quantity } = body
        if (!productId) return NextResponse.json({ error: 'productId gerekli' }, { status: 400 })
        const path = variantId ? `variants.${variantId}.stock` : 'inventory.quantity'
        await adminDb.collection('esnaflar').doc(esnafId).collection('products').doc(productId).update({ [path]: quantity, updatedAt: now })
        return NextResponse.json({ ok: true, mesaj: 'Stok güncellendi' })
      }

      case 'hours': {
        const { hours } = body  // { mon: {open: '09:00', close: '18:00'}, ... }
        await adminDb.collection('esnaflar').doc(esnafId).update({ 'businessInfo.workingHours': hours, updatedAt: now })
        return NextResponse.json({ ok: true, mesaj: 'Çalışma saatleri güncellendi' })
      }

      case 'announcement': {
        const { text, active } = body
        await adminDb.collection('esnaflar').doc(esnafId).update({
          'announcement.text': text || '', 'announcement.active': active ?? true, 'announcement.updatedAt': now,
        })
        return NextResponse.json({ ok: true, mesaj: active ? 'Duyuru yayınlandı' : 'Duyuru kapatıldı' })
      }

      case 'toggle_product': {
        const { productId, visible } = body
        await adminDb.collection('esnaflar').doc(esnafId).collection('products').doc(productId)
          .update({ 'status': visible ? 'active' : 'hidden', updatedAt: now })
        return NextResponse.json({ ok: true, mesaj: visible ? 'Ürün gösterildi' : 'Ürün gizlendi' })
      }

      default:
        return NextResponse.json({ error: 'type: text, price, bulk_price, stock, hours, announcement, toggle_product' }, { status: 400 })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
