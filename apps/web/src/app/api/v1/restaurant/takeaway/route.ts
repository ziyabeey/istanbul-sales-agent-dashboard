/**
 * Restaurant Takeaway & Delivery API
 * GET  /api/v1/restaurant/takeaway — List takeaway/delivery orders
 * POST /api/v1/restaurant/takeaway — Create, update status
 */
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { v4 as uuidv4 } from 'uuid'

const DELIVERY_ZONES = [
  { id: 'zone_0_3', range: '0-3 km', fee: 0, estimatedTime: '20-30 dk' },
  { id: 'zone_3_5', range: '3-5 km', fee: 15, estimatedTime: '30-45 dk' },
  { id: 'zone_5_8', range: '5-8 km', fee: 30, estimatedTime: '45-60 dk' },
]

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') // preparing, ready, out_for_delivery, delivered
    const type = searchParams.get('type') // takeaway, delivery

    let query: any = adminDb.collection('esnaflar').doc(esnafId).collection('takeaway_orders').orderBy('createdAt', 'desc')
    if (status) query = query.where('status', '==', status)
    if (type) query = query.where('orderType', '==', type)
    const snap = await query.limit(100).get()

    return NextResponse.json({
      ok: true,
      orders: snap.docs.map((d: any) => ({ id: d.id, ...d.data() })),
      deliveryZones: DELIVERY_ZONES,
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
        const { orderType, items, customerName, customerPhone, deliveryAddress, deliveryZoneId, scheduledFor, packagingNotes, cutlery } = body
        if (!items?.length || !customerPhone) return NextResponse.json({ error: 'items ve customerPhone gerekli' }, { status: 400 })

        let deliveryFee = 0
        if (orderType === 'delivery' && deliveryZoneId) {
          const zone = DELIVERY_ZONES.find(z => z.id === deliveryZoneId)
          deliveryFee = zone?.fee || 0
        }

        const subtotal = items.reduce((s: number, i: any) => s + (i.price * i.quantity), 0)

        const order = {
          id: uuidv4(), esnafId, orderType: orderType || 'takeaway',
          orderNumber: `PKT-${Date.now().toString().slice(-6)}`,
          items, customerName: customerName || '', customerPhone,
          deliveryAddress: deliveryAddress || null, deliveryZoneId: deliveryZoneId || null, deliveryFee,
          subtotal, total: subtotal + deliveryFee,
          status: 'received', // received → preparing → ready → out_for_delivery → delivered
          scheduledFor: scheduledFor || null, // İleri tarihli sipariş
          packagingNotes: packagingNotes || null, cutlery: cutlery ?? true,
          estimatedTime: orderType === 'delivery' ? (DELIVERY_ZONES.find(z => z.id === deliveryZoneId)?.estimatedTime || '30-45 dk') : '20-30 dk',
          courierId: null, courierName: null, paymentStatus: body.paymentStatus || 'unpaid',
          createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        }

        await adminDb.collection('esnaflar').doc(esnafId).collection('takeaway_orders').doc(order.id).set(order)

        // Create kitchen order
        const kitchenOrder = {
          id: uuidv4(), esnafId, source: orderType === 'delivery' ? 'delivery' : 'takeaway',
          orderId: order.id, tableName: `${orderType === 'delivery' ? '🛵' : '📦'} ${order.orderNumber}`,
          items: items.map((i: any) => ({ id: uuidv4(), menuItemId: i.menuItemId, menuItemName: i.name, quantity: i.quantity, portionName: i.portionName || null, extras: i.extras || [], specialRequests: i.specialRequests || null, status: 'sent', station: null })),
          priority: 'normal', status: 'new', receivedAt: new Date().toISOString(), estimatedPrepTime: 20, notes: packagingNotes || null,
        }
        await adminDb.collection('esnaflar').doc(esnafId).collection('kitchen_orders').doc(kitchenOrder.id).set(kitchenOrder)

        return NextResponse.json({ ok: true, order, kitchenOrderId: kitchenOrder.id }, { status: 201 })
      }

      case 'update_status': {
        const { orderId, status: newStatus, courierId, courierName } = body
        const updates: any = { status: newStatus, updatedAt: new Date().toISOString() }
        if (courierId) { updates.courierId = courierId; updates.courierName = courierName }
        if (newStatus === 'delivered') updates.deliveredAt = new Date().toISOString()

        await adminDb.collection('esnaflar').doc(esnafId).collection('takeaway_orders').doc(orderId).update(updates)

        // TODO: Send WhatsApp notification based on status
        // ready: "Siparişiniz hazır! Gelip alabilirsiniz."
        // out_for_delivery: "Siparişiniz yola çıktı! Tahmini teslimat: 15 dk"
        // delivered: "Siparişiniz teslim edildi. Afiyet olsun! 🍽️"

        return NextResponse.json({ ok: true, mesaj: `Sipariş durumu → ${newStatus}` })
      }

      default:
        return NextResponse.json({ error: 'action: create, update_status' }, { status: 400 })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
