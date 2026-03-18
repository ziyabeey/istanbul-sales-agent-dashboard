/**
 * Waitlist API
 * ─────────────
 * GET  /api/v1/bookings/waitlist — List
 * POST /api/v1/bookings/waitlist — Add to waitlist or remove
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
    const serviceId = searchParams.get('serviceId')

    let query: any = adminDb.collection('esnaflar').doc(esnafId).collection('waitlist')
    if (serviceId) query = query.where('serviceId', '==', serviceId)

    const snapshot = await query.where('status', '==', 'waiting').orderBy('position', 'asc').get()
    const entries = snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() }))

    return NextResponse.json({ ok: true, waitlist: entries, count: entries.length })
  } catch (error: any) {
    return NextResponse.json({ error: 'Bekleme listesi getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()

    // Remove from waitlist
    if (body.action === 'remove' && body.waitlistId) {
      await adminDb.collection('esnaflar').doc(esnafId).collection('waitlist').doc(body.waitlistId)
        .update({ status: 'cancelled' })
      return NextResponse.json({ ok: true, mesaj: 'Bekleme listesinden çıkarıldı' })
    }

    const { serviceId, contactId, contactDetails } = body
    if (!serviceId || !contactDetails) {
      return NextResponse.json({ error: 'serviceId ve contactDetails gerekli' }, { status: 400 })
    }

    // Check waitlist limit (from policy)
    const existingSnap = await adminDb.collection('esnaflar').doc(esnafId)
      .collection('waitlist').where('serviceId', '==', serviceId).where('status', '==', 'waiting').get()

    if (existingSnap.size >= 20) {
      return NextResponse.json({ error: 'Bekleme listesi dolu' }, { status: 422 })
    }

    const entry = {
      id: uuidv4(),
      esnafId,
      serviceId,
      staffId: body.staffId,
      contactId: contactId || uuidv4(),
      contactDetails: {
        firstName: contactDetails.firstName,
        phone: contactDetails.phone,
      },
      preferredDate: body.preferredDate,
      preferredTimeRange: body.preferredTimeRange,
      status: 'waiting',
      position: existingSnap.size + 1,
      createdAt: new Date().toISOString(),
    }

    await adminDb.collection('esnaflar').doc(esnafId).collection('waitlist').doc(entry.id).set(entry)
    return NextResponse.json({ ok: true, entry, position: entry.position }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Bekleme listesine eklenemedi', detay: error.message }, { status: 500 })
  }
}
