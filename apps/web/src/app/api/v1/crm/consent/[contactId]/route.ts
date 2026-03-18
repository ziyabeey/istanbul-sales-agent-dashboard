/**
 * Consent & KVKK API
 * ───────────────────
 * GET    /api/v1/crm/consent/[contactId] — İzin durumu
 * PUT    /api/v1/crm/consent/[contactId] — İzin güncelle (İYS sync)
 * POST   /api/v1/crm/consent/gdpr/erase  — KVKK veri silme talebi
 * GET    /api/v1/crm/consent/gdpr/export — KVKK veri export
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

interface RouteParams { params: Promise<{ contactId: string }> }

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { contactId } = await params
    const doc = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('contacts').doc(contactId).get()

    if (!doc.exists) return NextResponse.json({ error: 'Müşteri bulunamadı' }, { status: 404 })

    const consent = doc.data()?.consent || {}
    return NextResponse.json({ ok: true, contactId, consent })
  } catch (error: any) {
    return NextResponse.json({ error: 'İzin bilgisi getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { contactId } = await params
    const body = await request.json()
    const now = new Date().toISOString()

    const updates: Record<string, any> = { updatedAt: now }

    // Update KVKK
    if (body.kvkk !== undefined) {
      updates['consent.kvkk'] = { ...body.kvkk, acceptedAt: body.kvkk.accepted ? now : undefined }
    }

    // Update İYS channels
    for (const channel of ['sms', 'email', 'phone'] as const) {
      if (body.iys?.[channel] !== undefined) {
        updates[`consent.iys.${channel}`] = {
          permitted: body.iys[channel].permitted,
          updatedAt: now,
        }
        // İYS API sync: Production → POST to https://api.iys.org.tr
        // await syncToIYS(esnafId, contactId, channel, body.iys[channel].permitted)
      }
    }

    // Update WhatsApp opt-in
    if (body.whatsappOptIn !== undefined) {
      updates['consent.whatsappOptIn'] = {
        permitted: body.whatsappOptIn.permitted,
        optedInAt: body.whatsappOptIn.permitted ? now : undefined,
        method: body.whatsappOptIn.method || 'api',
      }
    }

    await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('contacts').doc(contactId)
      .update(updates)

    return NextResponse.json({ ok: true, mesaj: 'İzin bilgileri güncellendi' })
  } catch (error: any) {
    return NextResponse.json({ error: 'İzin güncellenemedi', detay: error.message }, { status: 500 })
  }
}
