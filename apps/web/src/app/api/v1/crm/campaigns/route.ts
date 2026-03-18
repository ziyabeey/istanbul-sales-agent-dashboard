/**
 * Campaigns API
 * ─────────────
 * GET  /api/v1/crm/campaigns — List
 * POST /api/v1/crm/campaigns — Create campaign
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const snapshot = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('campaigns')
      .orderBy('createdAt', 'desc').get()

    const campaigns = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
    return NextResponse.json({ ok: true, campaigns })
  } catch (error: any) {
    return NextResponse.json({ error: 'Kampanyalar getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    if (!body.name || !body.type) return NextResponse.json({ error: 'name ve type gerekli' }, { status: 400 })

    const now = new Date().toISOString()
    const campaign = {
      id: uuidv4(),
      esnafId,
      name: body.name,
      type: body.type,
      status: 'draft',
      targetSegmentId: body.targetSegmentId || undefined,
      targetFilter: body.targetFilter || undefined,
      content: body.content || {},
      abTest: body.abTest || { enabled: false },
      scheduledAt: body.scheduledAt || undefined,
      stats: {
        totalRecipients: 0, sent: 0, delivered: 0, opened: 0,
        clicked: 0, bounced: 0, unsubscribed: 0, revenue: 0,
      },
      createdAt: now,
      updatedAt: now,
    }

    await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('campaigns').doc(campaign.id)
      .set(campaign)

    return NextResponse.json({ ok: true, campaign }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Kampanya oluşturulamadı', detay: error.message }, { status: 500 })
  }
}
