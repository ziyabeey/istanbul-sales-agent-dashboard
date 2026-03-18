/**
 * Contact Activity Timeline
 * ─────────────────────────
 * GET /api/v1/crm/contacts/[id]/activities — Full activity history
 * POST /api/v1/crm/contacts/[id]/activities — Log new activity
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
    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100)
    const type = searchParams.get('type') || undefined

    let query = adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('contact_activities')
      .where('contactId', '==', id)
      .orderBy('createdAt', 'desc')
      .limit(limit) as any

    if (type) query = query.where('type', '==', type)

    const snapshot = await query.get()
    const activities = snapshot.docs.map((doc: any) => doc.data())

    return NextResponse.json({ ok: true, activities, count: activities.length })
  } catch (error: any) {
    return NextResponse.json({ error: 'Aktiviteler getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { id } = await params
    const body = await request.json()

    if (!body.type) return NextResponse.json({ error: 'type gerekli' }, { status: 400 })

    const activity = {
      id: uuidv4(),
      contactId: id,
      esnafId,
      type: body.type,
      data: body.data || {},
      channel: body.channel || undefined,
      createdAt: new Date().toISOString(),
    }

    await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('contact_activities')
      .add(activity)

    return NextResponse.json({ ok: true, activity }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Aktivite kaydedilemedi', detay: error.message }, { status: 500 })
  }
}
