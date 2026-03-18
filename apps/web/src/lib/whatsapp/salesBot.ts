/**
 * WhatsApp Sales Bot Engine
 * ─────────────────────────
 * Conversational commerce: product search, order status, cart via WhatsApp.
 * 
 * Flow: Customer WhatsApp → Meta Webhook → Parse intent → Respond
 */

import { adminDb } from '@/lib/firebaseAdmin'

export interface WAMessage {
  from: string           // +905XXXXXXXXX
  text: string
  esnafId: string
}

export interface WAResponse {
  to: string
  text: string
  buttons?: Array<{ id: string; title: string }>
}

/* ═══════ Intent Detection ═══════ */

type Intent = 'product_search' | 'order_status' | 'catalog' | 'price' | 'cart' | 'greeting' | 'unknown'

function detectIntent(text: string): { intent: Intent; params: Record<string, string> } {
  const lower = text.toLowerCase().trim()

  if (/^(merhaba|selam|hey|slm|mrb)/.test(lower)) {
    return { intent: 'greeting', params: {} }
  }
  if (/sipariş|takip|kargo|nerede/.test(lower)) {
    const orderMatch = lower.match(/KPN-\d{4}-\d{5}/i)
    return { intent: 'order_status', params: { orderNumber: orderMatch?.[0] || '' } }
  }
  if (/fiyat|kaç\s?tl|ne\s?kadar/.test(lower)) {
    return { intent: 'price', params: { query: lower.replace(/fiyat|kaç\s?tl|ne\s?kadar/g, '').trim() } }
  }
  if (/ürün|ara|bul|var\s?mı/.test(lower)) {
    return { intent: 'product_search', params: { query: lower.replace(/ürün|ara|bul|var\s?mı/g, '').trim() } }
  }
  if (/katalog|tüm\s?ürün|liste/.test(lower)) {
    return { intent: 'catalog', params: {} }
  }
  if (/sepet|ekle|satın\s?al/.test(lower)) {
    return { intent: 'cart', params: {} }
  }

  return { intent: 'unknown', params: { text: lower } }
}

/* ═══════ Response Handlers ═══════ */

async function handleGreeting(esnafId: string): Promise<WAResponse['text']> {
  const doc = await adminDb.collection('esnaflar').doc(esnafId).get()
  const name = doc.exists ? doc.data()?.businessName || doc.data()?.name || 'Mağaza' : 'Mağaza'
  return `Merhaba! 👋 ${name}'a hoş geldiniz.\n\nSize nasıl yardımcı olabilirim?\n\n📦 *Ürün ara* — Ürün adı yazın\n🔍 *Sipariş takip* — Sipariş numaranızı yazın\n📋 *Katalog* — Tüm ürünleri görün`
}

async function handleProductSearch(esnafId: string, query: string): Promise<WAResponse['text']> {
  if (!query) return 'Ne aramak istiyorsunuz? Ürün adını yazın.'

  const snapshot = await adminDb
    .collection('esnaflar').doc(esnafId)
    .collection('products')
    .where('status', '==', 'active')
    .limit(20)
    .get()

  const results = snapshot.docs
    .map((doc: any) => doc.data())
    .filter((p: any) => p.name.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5)

  if (results.length === 0) return `"${query}" için sonuç bulunamadı. 😔\n\nBaşka bir ürün adı deneyin.`

  const list = results.map((p: any, i: number) =>
    `${i + 1}. *${p.name}*\n   💰 ₺${p.priceRange?.min?.toLocaleString('tr-TR') || '—'}`
  ).join('\n\n')

  return `🔍 "${query}" için sonuçlar:\n\n${list}\n\nDetay için ürün numarasını yazın.`
}

async function handleOrderStatus(esnafId: string, orderNumber: string): Promise<WAResponse['text']> {
  if (!orderNumber) return 'Sipariş numaranızı yazın (örn: KPN-2026-00142)'

  const snapshot = await adminDb
    .collection('esnaflar').doc(esnafId)
    .collection('orders')
    .where('orderNumber', '==', orderNumber.toUpperCase())
    .limit(1)
    .get()

  if (snapshot.empty) return `${orderNumber} numaralı sipariş bulunamadı. 😔`

  const order = snapshot.docs[0].data()
  const statusLabels: Record<string, string> = {
    pending: '⏳ Beklemede',
    confirmed: '✅ Onaylandı',
    processing: '📦 Hazırlanıyor',
    shipped: '🚚 Kargoda',
    delivered: '✅ Teslim Edildi',
    cancelled: '❌ İptal Edildi',
  }

  let text = `📦 Sipariş: *${order.orderNumber}*\n\n📋 Durum: ${statusLabels[order.status] || order.status}\n💰 Tutar: ₺${order.priceSummary?.total?.toLocaleString('tr-TR')}`

  if (order.shipping?.trackingNumber) {
    text += `\n🚚 Takip No: ${order.shipping.trackingNumber}`
    if (order.shipping.carrierName) text += ` (${order.shipping.carrierName})`
  }

  return text
}

async function handleCatalog(esnafId: string): Promise<WAResponse['text']> {
  const snapshot = await adminDb
    .collection('esnaflar').doc(esnafId)
    .collection('categories')
    .orderBy('sortOrder', 'asc')
    .limit(10)
    .get()

  if (snapshot.empty) {
    const products = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('products')
      .where('status', '==', 'active')
      .limit(10)
      .get()

    const list = products.docs.map((doc: any, i: number) => {
      const p = doc.data()
      return `${i + 1}. *${p.name}* — ₺${p.priceRange?.min?.toLocaleString('tr-TR') || '—'}`
    }).join('\n')

    return `📋 Ürünlerimiz:\n\n${list}\n\nDetay için ürün numarasını yazın.`
  }

  const list = snapshot.docs.map((doc: any, i: number) => {
    const c = doc.data()
    return `${i + 1}. 📁 *${c.name}*${c.productCount ? ` (${c.productCount} ürün)` : ''}`
  }).join('\n')

  return `📋 Kategoriler:\n\n${list}\n\nKategori numarasını yazarak ürünleri görün.`
}

/* ═══════ Main Handler ═══════ */

export async function handleWhatsAppMessage(msg: WAMessage): Promise<WAResponse> {
  const { intent, params } = detectIntent(msg.text)

  let responseText: string

  switch (intent) {
    case 'greeting':
      responseText = await handleGreeting(msg.esnafId)
      break
    case 'product_search':
    case 'price':
      responseText = await handleProductSearch(msg.esnafId, params.query || msg.text)
      break
    case 'order_status':
      responseText = await handleOrderStatus(msg.esnafId, params.orderNumber || '')
      break
    case 'catalog':
      responseText = await handleCatalog(msg.esnafId)
      break
    default:
      responseText = await handleProductSearch(msg.esnafId, msg.text)
  }

  return { to: msg.from, text: responseText }
}
