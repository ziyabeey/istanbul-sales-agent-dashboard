/**
 * Contact Notes API
 * ──────────────────
 * GET  /api/v1/crm/contacts/[id]/notes — List notes
 * POST /api/v1/crm/contacts/[id]/notes — Add note
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
    const snapshot = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('contact_notes')
      .where('contactId', '==', id)
      .orderBy('createdAt', 'desc')
      .limit(100).get()

    const notes = snapshot.docs.map((doc: any) => doc.data())
    return NextResponse.json({ ok: true, notes })
  } catch (error: any) {
    return NextResponse.json({ error: 'Notlar getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { id } = await params
    const body = await request.json()
    if (!body.text) return NextResponse.json({ error: 'text gerekli' }, { status: 400 })

    const note = {
      id: uuidv4(),
      contactId: id,
      esnafId,
      text: body.text.substring(0, 2000),
      pinned: body.pinned || false,
      createdBy: esnafId,
      createdAt: new Date().toISOString(),
    }

    await adminDb.collection('esnaflar').doc(esnafId).collection('contact_notes').add(note)

    // Log activity
    await adminDb.collection('esnaflar').doc(esnafId).collection('contact_activities').add({
      contactId: id, esnafId, type: 'note.added',
      data: { preview: body.text.substring(0, 100) },
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ ok: true, note }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Not eklenemedi', detay: error.message }, { status: 500 })
  }
}
