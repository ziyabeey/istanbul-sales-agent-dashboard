/**
 * Kitchen Display System (KDS) API
 * GET  /api/v1/restaurant/kitchen — Active orders, stats
 * POST /api/v1/restaurant/kitchen — Update status (bump system)
 */
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'orders'

    if (mode === 'orders') {
      const station = searchParams.get('station') // ızgara, soğuk, fırın, bar
      let query: any = adminDb.collection('esnaflar').doc(esnafId).collection('kitchen_orders')
        .where('status', 'in', ['new', 'in_progress', 'ready']).orderBy('receivedAt', 'asc')
      const snap = await query.limit(100).get()

      let orders = snap.docs.map((d: any) => {
        const data = d.data()
        const elapsed = Math.floor((Date.now() - new Date(data.receivedAt).getTime()) / 60000)
        return {
          id: d.id, ...data, elapsedMinutes: elapsed,
          isLate: elapsed > (data.estimatedPrepTime || 15),
          urgency: elapsed > 25 ? 'critical' : elapsed > 15 ? 'warning' : 'normal',
        }
      })

      // Station filter
      if (station) {
        orders = orders.filter((o: any) => o.items.some((i: any) => i.station === station || !i.station))
      }

      return NextResponse.json({
        ok: true, orders,
        columns: {
          new: orders.filter((o: any) => o.status === 'new'),
          in_progress: orders.filter((o: any) => o.status === 'in_progress'),
          ready: orders.filter((o: any) => o.status === 'ready'),
        },
        summary: { total: orders.length, late: orders.filter((o: any) => o.isLate).length },
      })
    }

    if (mode === 'stats') {
      // Kitchen performance metrics
      const today = new Date().toISOString().split('T')[0]
      const completedSnap = await adminDb.collection('esnaflar').doc(esnafId).collection('kitchen_orders')
        .where('status', 'in', ['ready', 'served']).limit(200).get()

      const completed = completedSnap.docs.map((d: any) => d.data()).filter((o: any) => o.completedAt?.startsWith(today))
      const prepTimes = completed.filter((o: any) => o.actualPrepTime).map((o: any) => o.actualPrepTime)
      const avgPrepTime = prepTimes.length > 0 ? Math.round(prepTimes.reduce((a: number, b: number) => a + b, 0) / prepTimes.length) : 0

      return NextResponse.json({
        ok: true,
        stats: {
          todayCompleted: completed.length,
          averagePrepTime: avgPrepTime,
          lateOrders: completed.filter((o: any) => (o.actualPrepTime || 0) > (o.estimatedPrepTime || 15)).length,
          bySource: {
            table: completed.filter((o: any) => o.source === 'table').length,
            takeaway: completed.filter((o: any) => o.source === 'takeaway').length,
            online: completed.filter((o: any) => o.source === 'online').length,
            delivery: completed.filter((o: any) => o.source === 'delivery').length,
          },
        },
      })
    }

    return NextResponse.json({ error: 'mode: orders, stats' }, { status: 400 })
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
      case 'bump': {
        // Bump = advance to next status (new→in_progress→ready→served)
        const { orderId, itemId } = body
        if (!orderId) return NextResponse.json({ error: 'orderId gerekli' }, { status: 400 })

        const doc = await adminDb.collection('esnaflar').doc(esnafId).collection('kitchen_orders').doc(orderId).get()
        if (!doc.exists) return NextResponse.json({ error: 'Sipariş bulunamadı' }, { status: 404 })
        const order = doc.data()!

        if (itemId) {
          // Bump single item
          const items = order.items.map((i: any) => {
            if (i.id !== itemId) return i
            const next = i.status === 'sent' ? 'preparing' : i.status === 'preparing' ? 'ready' : i.status
            return { ...i, status: next }
          })
          const allReady = items.every((i: any) => i.status === 'ready' || i.status === 'served')
          await doc.ref.update({ items, status: allReady ? 'ready' : 'in_progress', updatedAt: new Date().toISOString() })
        } else {
          // Bump entire order
          const nextStatus = order.status === 'new' ? 'in_progress' : order.status === 'in_progress' ? 'ready' : 'served'
          const updates: any = { status: nextStatus, updatedAt: new Date().toISOString() }
          if (nextStatus === 'in_progress') updates.startedAt = new Date().toISOString()
          if (nextStatus === 'ready') {
            updates.completedAt = new Date().toISOString()
            updates.actualPrepTime = Math.floor((Date.now() - new Date(order.receivedAt).getTime()) / 60000)
          }
          // Update all items to match
          updates.items = order.items.map((i: any) => ({ ...i, status: nextStatus === 'ready' ? 'ready' : nextStatus === 'in_progress' ? 'preparing' : i.status }))
          await doc.ref.update(updates)

          // Push notification to waiter when ready
          if (nextStatus === 'ready' && order.checkId) {
            // TODO: Send push notification — "Masa X siparişi hazır!"
          }
        }

        return NextResponse.json({ ok: true, mesaj: 'Durum güncellendi' })
      }

      case 'recall': {
        // Move back: ready → in_progress (mistake/redo)
        const { orderId } = body
        await adminDb.collection('esnaflar').doc(esnafId).collection('kitchen_orders').doc(orderId)
          .update({ status: 'in_progress', completedAt: null, actualPrepTime: null })
        return NextResponse.json({ ok: true, mesaj: 'Sipariş geri alındı' })
      }

      case 'cancel': {
        await adminDb.collection('esnaflar').doc(esnafId).collection('kitchen_orders').doc(body.orderId)
          .update({ status: 'cancelled', cancelledAt: new Date().toISOString(), cancelReason: body.reason || '' })
        return NextResponse.json({ ok: true, mesaj: 'Sipariş iptal edildi' })
      }

      default:
        return NextResponse.json({ error: 'action: bump, recall, cancel' }, { status: 400 })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
