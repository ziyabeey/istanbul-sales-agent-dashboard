/**
 * Automations API — CRUD + Control
 * ──────────────────────────────────
 * GET    /api/v1/crm/automations — List
 * POST   /api/v1/crm/automations — Create
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
      .collection('automations')
      .orderBy('updatedAt', 'desc').get()

    const automations = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
    return NextResponse.json({ ok: true, automations })
  } catch (error: any) {
    return NextResponse.json({ error: 'Otomasyonlar getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    if (!body.name || !body.trigger) return NextResponse.json({ error: 'name ve trigger gerekli' }, { status: 400 })

    // Check limit
    const existing = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('automations').count().get()
    if (existing.data().count >= 50) {
      return NextResponse.json({ error: 'Maksimum 50 otomasyon oluşturulabilir' }, { status: 422 })
    }

    const now = new Date().toISOString()
    const id = uuidv4()

    // Build default action chain if not provided
    const endActionId = uuidv4()
    const rootActionId = body.rootActionId || endActionId
    const actions = body.actions || {
      [endActionId]: { id: endActionId, type: 'end', config: {}, nextActionIds: [] },
    }

    const automation = {
      id,
      esnafId,
      name: body.name,
      description: body.description || undefined,
      status: body.status || 'draft',
      trigger: body.trigger,
      rootActionId,
      actions,
      stats: {
        totalRuns: 0, successfulRuns: 0, failedRuns: 0,
        averageCompletionTime: 0,
      },
      createdAt: now,
      updatedAt: now,
    }

    await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('automations').doc(id)
      .set(automation)

    return NextResponse.json({ ok: true, automation }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Otomasyon oluşturulamadı', detay: error.message }, { status: 500 })
  }
}
