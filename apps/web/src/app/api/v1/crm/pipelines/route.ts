/**
 * Pipelines API — CRUD + Cards
 * ─────────────────────────────
 * GET  /api/v1/crm/pipelines — List pipelines
 * POST /api/v1/crm/pipelines — Create pipeline
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
      .collection('pipelines')
      .orderBy('createdAt', 'desc').get()

    const pipelines = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
    return NextResponse.json({ ok: true, pipelines })
  } catch (error: any) {
    return NextResponse.json({ error: 'Pipeline\'lar getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    if (!body.name) return NextResponse.json({ error: 'name gerekli' }, { status: 400 })

    const now = new Date().toISOString()
    const defaultStages = body.stages || [
      { id: uuidv4(), name: 'Yeni Lead', order: 0, color: '#3b82f6', isWinStage: false, isLostStage: false },
      { id: uuidv4(), name: 'İletişimde', order: 1, color: '#f59e0b', isWinStage: false, isLostStage: false },
      { id: uuidv4(), name: 'Teklif Gönderildi', order: 2, color: '#8b5cf6', isWinStage: false, isLostStage: false },
      { id: uuidv4(), name: 'Kazanıldı', order: 3, color: '#10b981', isWinStage: true, isLostStage: false },
      { id: uuidv4(), name: 'Kaybedildi', order: 4, color: '#ef4444', isWinStage: false, isLostStage: true },
    ]

    if (defaultStages.length > 15) {
      return NextResponse.json({ error: 'Maksimum 15 aşama oluşturulabilir' }, { status: 422 })
    }

    const pipeline = {
      id: uuidv4(),
      esnafId,
      name: body.name,
      stages: defaultStages,
      createdAt: now,
      updatedAt: now,
    }

    await adminDb.collection('esnaflar').doc(esnafId)
      .collection('pipelines').doc(pipeline.id).set(pipeline)

    return NextResponse.json({ ok: true, pipeline }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Pipeline oluşturulamadı', detay: error.message }, { status: 500 })
  }
}
