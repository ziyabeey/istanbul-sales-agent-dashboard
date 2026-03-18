/**
 * Contacts API — List, Create, Query
 * ───────────────────────────────────
 * GET  /api/v1/crm/contacts — List contacts (paginated, searchable)
 * POST /api/v1/crm/contacts — Create new contact
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
    const limit = Math.min(parseInt(searchParams.get('limit') || '25'), 50)
    const offset = parseInt(searchParams.get('offset') || '0')
    const search = searchParams.get('search') || ''
    const labelId = searchParams.get('labelId') || ''
    const tier = searchParams.get('tier') || ''
    const sortBy = searchParams.get('sortBy') || 'updatedAt'
    const sortDir = (searchParams.get('sortDir') || 'desc') as 'asc' | 'desc'

    let query = adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('contacts')
      .orderBy(sortBy, sortDir)
      .limit(limit)
      .offset(offset) as any

    if (labelId) query = query.where('labelIds', 'array-contains', labelId)
    if (tier) query = query.where('identityTier', '==', tier)

    const snapshot = await query.get()
    let contacts = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))

    // Client-side name search (Firestore doesn't support full-text search well)
    if (search) {
      const q = search.toLowerCase()
      contacts = contacts.filter((c: any) =>
        c.info?.displayName?.toLowerCase().includes(q) ||
        c.info?.firstName?.toLowerCase().includes(q) ||
        c.info?.lastName?.toLowerCase().includes(q) ||
        c.channels?.phones?.some((p: any) => p.number?.includes(q)) ||
        c.channels?.emails?.some((e: any) => e.email?.toLowerCase().includes(q)) ||
        c.channels?.whatsapp?.number?.includes(q)
      )
    }

    // Total count
    const countSnap = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('contacts')
      .count().get()
    const total = countSnap.data().count

    return NextResponse.json({
      ok: true,
      contacts,
      pagination: { total, limit, offset, hasMore: offset + limit < total },
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Müşteriler getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    const now = new Date().toISOString()
    const id = uuidv4()

    // Build display name
    const firstName = body.info?.firstName || ''
    const lastName = body.info?.lastName || ''
    const displayName = body.info?.displayName || `${firstName} ${lastName}`.trim() || 'İsimsiz Müşteri'

    const contact = {
      id,
      esnafId,
      revision: 1,
      identityTier: body.identityTier || 'contact',
      info: {
        firstName,
        lastName,
        locale: 'tr-TR',
        ...body.info,
        displayName, // Force computed after spread
      },
      channels: {
        emails: [],
        phones: [],
        addresses: [],
        ...body.channels,
      },
      labelIds: body.labelIds || [],
      extendedFields: body.extendedFields || {},
      source: body.source || { channel: 'manual' },
      billing: body.billing || undefined,
      consent: {
        kvkk: { accepted: false, version: '1.0' },
        iys: {
          sms: { permitted: false },
          email: { permitted: false },
          phone: { permitted: false },
        },
        whatsappOptIn: { permitted: false },
        ...body.consent,
      },
      activitySummary: {
        totalOrders: 0, totalSpent: 0, averageOrderValue: 0,
        totalBookings: 0, totalMessages: 0, emailOpens: 0, emailClicks: 0,
        smsDelivered: 0, whatsappMessages: 0, websiteVisits: 0, referralCount: 0,
        loyaltyPoints: 0,
      },
      aiMeta: {
        behavioralTags: [], churnRisk: 'low', predictedLifetimeValue: 0,
        preferredChannel: 'whatsapp',
      },
      createdAt: now,
      updatedAt: now,
    }

    await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('contacts').doc(id)
      .set(contact)

    // Log activity
    await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('contact_activities')
      .add({
        id: uuidv4(),
        contactId: id,
        esnafId,
        type: 'contact.created',
        data: { source: contact.source.channel },
        createdAt: now,
      })

    return NextResponse.json({ ok: true, contact }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Müşteri oluşturulamadı', detay: error.message }, { status: 500 })
  }
}
