/**
 * Webhook System API
 * POST /api/v1/webhooks — CRUD + Test
 * GET  /api/v1/webhooks — List
 */
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { v4 as uuidv4 } from 'uuid'

const EVENTS = [
  'site.published','order.created','order.paid','order.shipped','order.cancelled',
  'cart.abandoned','inventory.low_stock','booking.created','booking.confirmed',
  'booking.cancelled','booking.completed','booking.no_show','contact.created',
  'contact.updated','campaign.sent','campaign.opened','campaign.clicked',
  'loyalty.points_earned','loyalty.tier_changed','blog.post_published',
  'customer.registered','customer.logged_in',
] as const

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const snap = await adminDb.collection('esnaflar').doc(esnafId).collection('webhooks').get()
    const webhooks = snap.docs.map((d: any) => ({ id: d.id, ...d.data() }))
    return NextResponse.json({ ok: true, webhooks, availableEvents: EVENTS })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const body = await request.json()

    if (body.action === 'delete' && body.webhookId) {
      await adminDb.collection('esnaflar').doc(esnafId).collection('webhooks').doc(body.webhookId).delete()
      return NextResponse.json({ ok: true, mesaj: 'Silindi' })
    }
    if (body.action === 'test' && body.webhookId) {
      const doc = await adminDb.collection('esnaflar').doc(esnafId).collection('webhooks').doc(body.webhookId).get()
      if (!doc.exists) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 })
      try {
        const res = await fetch(doc.data()!.url, {
          method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Kepenk-Event': 'test.ping' },
          body: JSON.stringify({ event: 'test.ping', timestamp: new Date().toISOString() }),
          signal: AbortSignal.timeout(5000),
        })
        return NextResponse.json({ ok: true, status: res.status, success: res.ok })
      } catch (err: any) {
        return NextResponse.json({ ok: false, error: err.message })
      }
    }

    // Create
    if (!body.url || !body.events?.length) return NextResponse.json({ error: 'url ve events gerekli' }, { status: 400 })
    const countRes = await adminDb.collection('esnaflar').doc(esnafId).collection('webhooks').count().get()
    if (countRes.data().count >= 50) return NextResponse.json({ error: 'Max 50 webhook' }, { status: 422 })

    const webhook = { id: uuidv4(), esnafId, url: body.url, events: body.events, secret: crypto.randomUUID(), status: 'active', failCount: 0, createdAt: new Date().toISOString() }
    await adminDb.collection('esnaflar').doc(esnafId).collection('webhooks').doc(webhook.id).set(webhook)
    return NextResponse.json({ ok: true, webhook }, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
