/**
 * Unified Inbox API
 * ──────────────────
 * GET  /api/v1/crm/inbox/conversations — List conversations
 * POST /api/v1/crm/inbox/conversations — Create or get conversation for contact
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || undefined
    const limit = Math.min(parseInt(searchParams.get('limit') || '30'), 50)

    let query = adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('conversations')
      .orderBy('updatedAt', 'desc')
      .limit(limit) as any

    if (status) query = query.where('status', '==', status)

    const snapshot = await query.get()
    const conversations = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))

    return NextResponse.json({ ok: true, conversations })
  } catch (error: any) {
    return NextResponse.json({ error: 'Sohbetler getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    if (!body.contactId) return NextResponse.json({ error: 'contactId gerekli' }, { status: 400 })

    // Check if conversation exists for this contact
    const existing = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('conversations')
      .where('contactId', '==', body.contactId)
      .where('status', 'in', ['open', 'assigned'])
      .limit(1).get()

    if (!existing.empty) {
      return NextResponse.json({ ok: true, conversation: { id: existing.docs[0].id, ...existing.docs[0].data() } })
    }

    const now = new Date().toISOString()
    const conversation = {
      id: uuidv4(),
      contactId: body.contactId,
      esnafId,
      status: 'open',
      tags: [],
      unreadCount: 0,
      createdAt: now,
      updatedAt: now,
    }

    await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('conversations').doc(conversation.id)
      .set(conversation)

    return NextResponse.json({ ok: true, conversation }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Sohbet oluşturulamadı', detay: error.message }, { status: 500 })
  }
}
