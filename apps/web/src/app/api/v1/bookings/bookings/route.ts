/**
 * Bookings CRUD + Lifecycle API
 * ───────────────────────────────
 * GET  /api/v1/bookings/bookings — List bookings
 * POST /api/v1/bookings/bookings — Create booking
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
    const status = searchParams.get('status')
    const staffId = searchParams.get('staffId')
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100)

    let query: any = adminDb.collection('esnaflar').doc(esnafId).collection('bookings')
    if (status) query = query.where('status', '==', status)
    if (staffId) query = query.where('staffId', '==', staffId)
    if (dateFrom) query = query.where('startTime', '>=', dateFrom)
    if (dateTo) query = query.where('startTime', '<=', dateTo)

    const snapshot = await query.orderBy('startTime', 'desc').limit(limit).get()
    const bookings = snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() }))

    return NextResponse.json({ ok: true, bookings, count: bookings.length })
  } catch (error: any) {
    return NextResponse.json({ error: 'Randevular getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    const { serviceId, staffId, startTime, contactDetails } = body

    if (!serviceId || !staffId || !startTime || !contactDetails) {
      return NextResponse.json({ error: 'serviceId, staffId, startTime, contactDetails gerekli' }, { status: 400 })
    }

    // Get service for duration + pricing
    const serviceDoc = await adminDb.collection('esnaflar').doc(esnafId)
      .collection('booking_services').doc(serviceId).get()
    if (!serviceDoc.exists) return NextResponse.json({ error: 'Hizmet bulunamadı' }, { status: 404 })
    const service = serviceDoc.data()!

    const start = new Date(startTime)
    const end = new Date(start.getTime() + service.duration * 60 * 1000)

    // Double-booking check
    const conflictSnap = await adminDb.collection('esnaflar').doc(esnafId)
      .collection('bookings')
      .where('staffId', '==', staffId)
      .where('startTime', '>=', new Date(start.getTime() - 60 * 60 * 1000).toISOString())
      .where('startTime', '<=', end.toISOString())
      .get()

    const hasConflict = conflictSnap.docs.some((d: any) => {
      const b = d.data()
      if (!['confirmed', 'pending'].includes(b.status)) return false
      return new Date(b.startTime) < end && new Date(b.endTime) > start
    })

    if (hasConflict) {
      return NextResponse.json({ error: 'Bu zaman diliminde çakışan randevu var' }, { status: 409 })
    }

    // Get or create CRM contact
    let contactId = body.contactId
    if (!contactId) {
      contactId = uuidv4()
      await adminDb.collection('esnaflar').doc(esnafId).collection('contacts').doc(contactId).set({
        id: contactId,
        esnafId,
        identityTier: 'contact',
        info: {
          firstName: contactDetails.firstName,
          lastName: contactDetails.lastName,
          displayName: `${contactDetails.firstName} ${contactDetails.lastName}`.trim(),
        },
        channels: {
          phones: contactDetails.phone ? [{ number: contactDetails.phone, primary: true }] : [],
          emails: contactDetails.email ? [{ email: contactDetails.email, primary: true }] : [],
        },
        source: { channel: 'booking', sourceInfo: service.name },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    }

    // Determine approval mode
    let bookingStatus: string = 'pending'
    if (service.policyId) {
      const policyDoc = await adminDb.collection('esnaflar').doc(esnafId)
        .collection('booking_policies').doc(service.policyId).get()
      if (policyDoc.exists && policyDoc.data()!.bookingRules?.approvalMode === 'auto') {
        bookingStatus = 'confirmed'
      }
    }

    const now = new Date().toISOString()
    const booking = {
      id: uuidv4(),
      esnafId,
      revision: 1,
      status: bookingStatus,
      serviceId,
      variantId: body.variantId,
      staffId,
      resourceIds: body.resourceIds || [],
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      timezone: 'Europe/Istanbul',
      contactId,
      contactDetails: {
        firstName: contactDetails.firstName,
        lastName: contactDetails.lastName,
        phone: contactDetails.phone,
        email: contactDetails.email,
        formResponses: contactDetails.formResponses,
      },
      participants: body.participants || 1,
      location: body.location || { type: service.location.type, address: service.location.businessAddress },
      payment: {
        status: 'not_paid',
        method: body.paymentMethod || 'in_person',
        totalPrice: service.pricing.basePrice || 0,
      },
      notifications: { confirmationSent: false, reminderSent: false, followUpSent: false, reviewRequestSent: false },
      attendance: 'booked',
      aiMeta: {
        noShowRiskScore: 0,
        bookingSource: body.source || 'website',
      },
      internalNote: body.internalNote,
      customerNote: body.customerNote,
      createdAt: now,
      updatedAt: now,
    }

    await adminDb.collection('esnaflar').doc(esnafId).collection('bookings').doc(booking.id).set(booking)

    // Log activity on contact
    await adminDb.collection('esnaflar').doc(esnafId).collection('contacts').doc(contactId)
      .collection('activities').add({
        type: 'booking_created',
        description: `${service.name} randevusu oluşturuldu — ${start.toLocaleDateString('tr-TR')}`,
        bookingId: booking.id,
        createdAt: now,
      })

    return NextResponse.json({ ok: true, booking }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Randevu oluşturulamadı', detay: error.message }, { status: 500 })
  }
}
