/**
 * Single Order API — Get, Update Status, Fulfill
 * ─────────────────────────────────────────────────
 * GET /api/v1/ecom/orders/[id]
 * PUT /api/v1/ecom/orders/[id] — Update status, add note, add tracking
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { v4 as uuidv4 } from 'uuid'

interface RouteParams {
  params: Promise<{ id: string }>
}

const VALID_TRANSITIONS: Record<string, string[]> = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['processing', 'cancelled'],
  processing: ['shipped', 'cancelled'],
  shipped: ['delivered', 'returned'],
  delivered: ['returned'],
  cancelled: [],
  returned: [],
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { id } = await params
    const doc = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('orders').doc(id)
      .get()

    if (!doc.exists) return NextResponse.json({ error: 'Sipariş bulunamadı' }, { status: 404 })

    return NextResponse.json({ ok: true, order: doc.data() })
  } catch (error: any) {
    return NextResponse.json({ error: 'Getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { id } = await params
    const body = await request.json()
    const { action, ...data } = body

    const docRef = adminDb.collection('esnaflar').doc(esnafId).collection('orders').doc(id)
    const doc = await docRef.get()
    if (!doc.exists) return NextResponse.json({ error: 'Sipariş bulunamadı' }, { status: 404 })

    const order = doc.data()!
    const now = new Date().toISOString()
    const updates: Record<string, any> = { updatedAt: now }
    const newActivity: any = { id: uuidv4(), createdBy: 'esnaf', createdAt: now }

    switch (action) {
      case 'update_status': {
        const { newStatus } = data
        const allowed = VALID_TRANSITIONS[order.status] || []
        if (!allowed.includes(newStatus)) {
          return NextResponse.json({
            error: `"${order.status}" → "${newStatus}" geçişi yapılamaz`,
            allowedTransitions: allowed,
          }, { status: 422 })
        }
        updates.status = newStatus
        newActivity.type = 'status_changed'
        newActivity.description = `Durum güncellendi: ${newStatus}`
        newActivity.metadata = { from: order.status, to: newStatus }

        // Auto-update fulfillment status
        if (newStatus === 'shipped') updates.fulfillmentStatus = 'fulfilled'
        if (newStatus === 'cancelled') {
          updates.fulfillmentStatus = 'unfulfilled'
          if (order.paymentStatus === 'paid') {
            updates.paymentStatus = 'refunded'
            newActivity.metadata.refund = true
          }
        }
        break
      }

      case 'add_tracking': {
        const { trackingNumber, trackingUrl, carrierId } = data
        updates['shipping.trackingNumber'] = trackingNumber
        if (trackingUrl) updates['shipping.trackingUrl'] = trackingUrl
        if (carrierId) updates['shipping.carrierId'] = carrierId
        newActivity.type = 'tracking_updated'
        newActivity.description = `Kargo takip: ${trackingNumber}`
        break
      }

      case 'add_note': {
        const { text } = data
        if (!text) return NextResponse.json({ error: 'Not metni gerekli' }, { status: 400 })
        const notes = [...(order.internalNotes || []), { text, createdBy: esnafId, createdAt: now }]
        updates.internalNotes = notes
        newActivity.type = 'note_added'
        newActivity.description = 'İç not eklendi'
        break
      }

      case 'confirm_payment': {
        // For bank transfer orders
        if (order.paymentStatus !== 'pending') {
          return NextResponse.json({ error: 'Ödeme zaten onaylı' }, { status: 422 })
        }
        updates.paymentStatus = 'paid'
        updates['payment.paidAmount'] = order.priceSummary.total
        newActivity.type = 'payment_received'
        newActivity.description = 'Havale onaylandı'
        break
      }

      default:
        return NextResponse.json({ error: 'Geçersiz aksiyon', validActions: ['update_status', 'add_tracking', 'add_note', 'confirm_payment'] }, { status: 400 })
    }

    // Append activity
    const activities = [...(order.activities || []), newActivity]
    updates.activities = activities

    await docRef.update(updates)

    return NextResponse.json({ ok: true, order: { ...order, ...updates } })
  } catch (error: any) {
    return NextResponse.json({ error: 'Güncelleme başarısız', detay: error.message }, { status: 500 })
  }
}
