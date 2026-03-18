/**
 * Pipeline Detail + Cards API
 * ────────────────────────────
 * GET  /api/v1/crm/pipelines/[id] — Pipeline with cards
 * PUT  /api/v1/crm/pipelines/[id] — Update pipeline stages
 * POST /api/v1/crm/pipelines/[id] — Add or move card
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { v4 as uuidv4 } from 'uuid'

interface RouteParams { params: Promise<{ id: string }> }

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { id } = await params
    const doc = await adminDb.collection('esnaflar').doc(esnafId).collection('pipelines').doc(id).get()
    if (!doc.exists) return NextResponse.json({ error: 'Pipeline bulunamadı' }, { status: 404 })

    const cardsSnap = await adminDb.collection('esnaflar').doc(esnafId)
      .collection('pipeline_cards')
      .where('pipelineId', '==', id)
      .orderBy('movedAt', 'desc').get()

    const cards = cardsSnap.docs.map((d: any) => ({ id: d.id, ...d.data() }))

    return NextResponse.json({
      ok: true,
      pipeline: { id: doc.id, ...doc.data() },
      cards,
    })
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

    await adminDb.collection('esnaflar').doc(esnafId).collection('pipelines').doc(id)
      .update({ ...body, updatedAt: new Date().toISOString() })

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: 'Güncelleme başarısız', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { id: pipelineId } = await params
    const body = await request.json()
    const { action } = body
    const now = new Date().toISOString()

    if (action === 'add_card') {
      if (!body.stageId || !body.contactId || !body.title) {
        return NextResponse.json({ error: 'stageId, contactId ve title gerekli' }, { status: 400 })
      }

      const card = {
        id: uuidv4(),
        pipelineId,
        stageId: body.stageId,
        contactId: body.contactId,
        title: body.title,
        value: body.value || undefined,
        customFields: body.customFields || {},
        assignedTo: body.assignedTo || undefined,
        dueDate: body.dueDate || undefined,
        activities: [{ text: 'Kart oluşturuldu', createdAt: now }],
        createdAt: now,
        updatedAt: now,
        movedAt: now,
      }

      await adminDb.collection('esnaflar').doc(esnafId).collection('pipeline_cards').doc(card.id).set(card)
      return NextResponse.json({ ok: true, card }, { status: 201 })
    }

    if (action === 'move_card') {
      if (!body.cardId || !body.newStageId) {
        return NextResponse.json({ error: 'cardId ve newStageId gerekli' }, { status: 400 })
      }

      const cardRef = adminDb.collection('esnaflar').doc(esnafId).collection('pipeline_cards').doc(body.cardId)
      const cardDoc = await cardRef.get()
      if (!cardDoc.exists) return NextResponse.json({ error: 'Kart bulunamadı' }, { status: 404 })

      const oldStageId = cardDoc.data()?.stageId

      // Get stage names
      const pipeDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('pipelines').doc(pipelineId).get()
      const stages = pipeDoc.data()?.stages || []
      const oldStageName = stages.find((s: any) => s.id === oldStageId)?.name || oldStageId
      const newStageName = stages.find((s: any) => s.id === body.newStageId)?.name || body.newStageId

      await cardRef.update({
        stageId: body.newStageId,
        movedAt: now,
        updatedAt: now,
        activities: [
          ...(cardDoc.data()?.activities || []),
          { text: `${oldStageName} → ${newStageName}`, createdAt: now },
        ],
      })

      return NextResponse.json({ ok: true, mesaj: `Kart "${newStageName}" aşamasına taşındı` })
    }

    return NextResponse.json({ error: 'action "add_card" veya "move_card" olmalı' }, { status: 400 })
  } catch (error: any) {
    return NextResponse.json({ error: 'İşlem başarısız', detay: error.message }, { status: 500 })
  }
}
