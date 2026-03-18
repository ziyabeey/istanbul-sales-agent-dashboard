/**
 * Single Segment API — Get, Update, Delete, Refresh, Contacts
 * ────────────────────────────────────────────────────────────
 * GET    /api/v1/crm/segments/[id]
 * PUT    /api/v1/crm/segments/[id]
 * DELETE /api/v1/crm/segments/[id]
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { evaluateFilter } from '@/lib/crm/filterEngine'

interface RouteParams { params: Promise<{ id: string }> }

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { id } = await params
    const { searchParams } = new URL(request.url)
    const includeContacts = searchParams.get('includeContacts') === 'true'

    const doc = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('segments').doc(id).get()

    if (!doc.exists) return NextResponse.json({ error: 'Segment bulunamadı' }, { status: 404 })

    const segment = doc.data()!
    let matchedContacts: any[] | undefined

    if (includeContacts) {
      const allContacts = await adminDb
        .collection('esnaflar').doc(esnafId)
        .collection('contacts').get()
      const contacts = allContacts.docs.map((d: any) => ({ id: d.id, ...d.data() }))
      matchedContacts = contacts.filter((c: any) => evaluateFilter(c, segment.filter))
    }

    return NextResponse.json({
      ok: true,
      segment: { id: doc.id, ...segment },
      contacts: matchedContacts,
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

    const docRef = adminDb.collection('esnaflar').doc(esnafId).collection('segments').doc(id)
    const doc = await docRef.get()
    if (!doc.exists) return NextResponse.json({ error: 'Segment bulunamadı' }, { status: 404 })

    const now = new Date().toISOString()

    // If filter changed, re-evaluate
    if (body.filter) {
      const allContacts = await adminDb.collection('esnaflar').doc(esnafId).collection('contacts').get()
      const contacts = allContacts.docs.map((d: any) => d.data())
      const matched = contacts.filter((c: any) => evaluateFilter(c, body.filter))

      body.contactCount = matched.length
      body.estimatedReach = {
        whatsapp: matched.filter((c: any) => c.consent?.whatsappOptIn?.permitted).length,
        sms: matched.filter((c: any) => c.consent?.iys?.sms?.permitted).length,
        email: matched.filter((c: any) => c.consent?.iys?.email?.permitted).length,
      }
      body['refreshPolicy.lastRefreshedAt'] = now
    }

    await docRef.update({ ...body, updatedAt: now })
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: 'Güncelleme başarısız', detay: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { id } = await params
    await adminDb.collection('esnaflar').doc(esnafId).collection('segments').doc(id).delete()
    return NextResponse.json({ ok: true, mesaj: 'Segment silindi' })
  } catch (error: any) {
    return NextResponse.json({ error: 'Silme başarısız', detay: error.message }, { status: 500 })
  }
}
