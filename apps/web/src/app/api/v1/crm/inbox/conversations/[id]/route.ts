/**
 * Single Conversation API — Detail + Messages
 * ─────────────────────────────────────────────
 * GET  /api/v1/crm/inbox/conversations/[id] — Get conversation + messages
 * POST /api/v1/crm/inbox/conversations/[id] — Send message / add internal note
 * PUT  /api/v1/crm/inbox/conversations/[id] — Update status / assign
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
    const doc = await adminDb.collection('esnaflar').doc(esnafId).collection('conversations').doc(id).get()
    if (!doc.exists) return NextResponse.json({ error: 'Sohbet bulunamadı' }, { status: 404 })

    const messagesSnap = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('inbox_messages')
      .where('conversationId', '==', id)
      .orderBy('createdAt', 'asc')
      .limit(200).get()

    const messages = messagesSnap.docs.map((d: any) => d.data())

    // Mark as read
    await adminDb.collection('esnaflar').doc(esnafId).collection('conversations').doc(id)
      .update({ unreadCount: 0 })

    return NextResponse.json({
      ok: true,
      conversation: { id: doc.id, ...doc.data() },
      messages,
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { id } = await params
    const body = await request.json()
    const now = new Date().toISOString()

    const message = {
      id: uuidv4(),
      conversationId: id,
      channel: body.channel || 'internal_note',
      direction: 'outgoing' as const,
      content: {
        type: body.content?.type || 'text',
        text: body.content?.text || body.text || '',
        mediaUrl: body.content?.mediaUrl || undefined,
      },
      status: 'sent',
      visibility: body.channel === 'internal_note' ? 'internal' : 'all',
      createdAt: now,
    }

    await adminDb.collection('esnaflar').doc(esnafId).collection('inbox_messages').add(message)

    // Update conversation last message
    await adminDb.collection('esnaflar').doc(esnafId).collection('conversations').doc(id).update({
      lastMessage: {
        channel: message.channel,
        preview: (message.content.text || '').substring(0, 120),
        direction: 'outgoing',
        timestamp: now,
      },
      updatedAt: now,
    })

    // TODO: Actually send via WhatsApp/SMS/Email provider based on channel

    return NextResponse.json({ ok: true, message }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Mesaj gönderilemedi', detay: error.message }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { id } = await params
    const body = await request.json()

    const updates: Record<string, any> = { updatedAt: new Date().toISOString() }
    if (body.status) updates.status = body.status
    if (body.assignedTo !== undefined) updates.assignedTo = body.assignedTo
    if (body.tags) updates.tags = body.tags
    if (body.aiSummary) updates.aiSummary = body.aiSummary

    await adminDb.collection('esnaflar').doc(esnafId).collection('conversations').doc(id).update(updates)
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: 'Güncelleme başarısız', detay: error.message }, { status: 500 })
  }
}
