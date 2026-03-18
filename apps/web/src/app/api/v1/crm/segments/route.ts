/**
 * Segments API — CRUD + Refresh
 * ─────────────────────────────
 * GET    /api/v1/crm/segments — List segments
 * POST   /api/v1/crm/segments — Create segment + run filter
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { v4 as uuidv4 } from 'uuid'
import { evaluateFilter } from '@/lib/crm/filterEngine'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const snapshot = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('segments')
      .orderBy('name', 'asc').get()

    const segments = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
    return NextResponse.json({ ok: true, segments })
  } catch (error: any) {
    return NextResponse.json({ error: 'Segmentler getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    if (!body.name || !body.filter) {
      return NextResponse.json({ error: 'name ve filter gerekli' }, { status: 400 })
    }

    // Check limit
    const existing = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('segments').count().get()
    if (existing.data().count >= 100) {
      return NextResponse.json({ error: 'Maksimum 100 segment oluşturulabilir' }, { status: 422 })
    }

    // Run filter to get initial count and reach
    const allContacts = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('contacts').get()

    const contacts = allContacts.docs.map((d: any) => d.data())
    const matched = contacts.filter((c: any) => evaluateFilter(c, body.filter))

    const estimatedReach = {
      whatsapp: matched.filter((c: any) => c.consent?.whatsappOptIn?.permitted).length,
      sms: matched.filter((c: any) => c.consent?.iys?.sms?.permitted).length,
      email: matched.filter((c: any) => c.consent?.iys?.email?.permitted).length,
    }

    const now = new Date().toISOString()
    const segment = {
      id: uuidv4(),
      esnafId,
      name: body.name,
      description: body.description || undefined,
      filter: body.filter,
      type: body.type || 'dynamic',
      refreshPolicy: {
        auto: body.refreshPolicy?.auto ?? true,
        intervalMinutes: body.refreshPolicy?.intervalMinutes ?? 60,
        lastRefreshedAt: now,
      },
      contactCount: matched.length,
      estimatedReach,
      usedInAutomations: [],
      usedInCampaigns: [],
      createdAt: now,
      updatedAt: now,
    }

    await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('segments').doc(segment.id)
      .set(segment)

    return NextResponse.json({ ok: true, segment }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Segment oluşturulamadı', detay: error.message }, { status: 500 })
  }
}
