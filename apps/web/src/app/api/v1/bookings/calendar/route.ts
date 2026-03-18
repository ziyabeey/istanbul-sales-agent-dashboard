/**
 * Calendar Sync + Resources API
 * ───────────────────────────────
 * GET/POST /api/v1/bookings/calendar — Calendar sync management
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
    const mode = searchParams.get('mode') || 'status'

    if (mode === 'resources') {
      const snapshot = await adminDb.collection('esnaflar').doc(esnafId)
        .collection('booking_resources').where('status', '==', 'active').get()
      const resources = snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() }))
      return NextResponse.json({ ok: true, resources })
    }

    // Calendar sync status
    const staffSnap = await adminDb.collection('esnaflar').doc(esnafId)
      .collection('booking_staff').where('status', '==', 'active').get()

    const calendarStatus = staffSnap.docs
      .filter((d: any) => d.data().externalCalendar?.syncEnabled)
      .map((d: any) => ({
        staffId: d.id,
        staffName: d.data().name,
        provider: d.data().externalCalendar.provider,
        syncDirection: d.data().externalCalendar.syncDirection,
        lastSync: d.data().externalCalendar.lastSyncAt,
      }))

    return NextResponse.json({ ok: true, connectedCalendars: calendarStatus })
  } catch (error: any) {
    return NextResponse.json({ error: 'Getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()

    // Add resource
    if (body.mode === 'add_resource') {
      if (!body.name || !body.typeId) return NextResponse.json({ error: 'name ve typeId gerekli' }, { status: 400 })

      const countRes = await adminDb.collection('esnaflar').doc(esnafId).collection('booking_resources').count().get()
      if (countRes.data().count >= 30) return NextResponse.json({ error: 'Maksimum 30 kaynak' }, { status: 422 })

      const resource = {
        id: uuidv4(), esnafId, name: body.name, typeId: body.typeId,
        availability: body.availability || 'business_hours', customHours: body.customHours,
        status: 'active',
      }
      await adminDb.collection('esnaflar').doc(esnafId).collection('booking_resources').doc(resource.id).set(resource)
      return NextResponse.json({ ok: true, resource }, { status: 201 })
    }

    // Connect calendar
    if (body.mode === 'connect') {
      const { staffId, provider, calendarId, accessToken } = body
      if (!staffId || !provider) return NextResponse.json({ error: 'staffId ve provider gerekli' }, { status: 400 })

      await adminDb.collection('esnaflar').doc(esnafId).collection('booking_staff').doc(staffId).update({
        externalCalendar: {
          provider,
          calendarId: calendarId || 'primary',
          syncEnabled: true,
          syncDirection: body.syncDirection || 'both',
          lastSyncAt: null,
        },
      })

      if (accessToken) {
        await adminDb.collection('esnaf_secrets').doc(esnafId).set({
          [`calendar_${staffId}_token`]: accessToken,
          updatedAt: new Date().toISOString(),
        }, { merge: true })
      }

      return NextResponse.json({ ok: true, mesaj: `${provider} takvimi bağlandı` })
    }

    // Manual sync trigger
    if (body.mode === 'sync') {
      // TODO: Trigger background sync job for all connected calendars
      return NextResponse.json({ ok: true, mesaj: 'Senkronizasyon tetiklendi' })
    }

    // Recurring booking
    if (body.mode === 'recurring') {
      const { serviceId, staffId, startTime, frequency, occurrences, contactDetails } = body
      if (!serviceId || !staffId || !startTime || !frequency || !occurrences || !contactDetails) {
        return NextResponse.json({ error: 'Tüm alanlar gerekli' }, { status: 400 })
      }

      const serviceDoc = await adminDb.collection('esnaflar').doc(esnafId)
        .collection('booking_services').doc(serviceId).get()
      if (!serviceDoc.exists) return NextResponse.json({ error: 'Hizmet bulunamadı' }, { status: 404 })
      const service = serviceDoc.data()!
      const duration = service.duration

      const parentId = uuidv4()
      const now = new Date().toISOString()
      const batch = adminDb.batch()
      const bookings: any[] = []

      const intervals: Record<string, number> = { weekly: 7, biweekly: 14, monthly: 30 }
      const interval = intervals[frequency] || 7

      for (let i = 0; i < Math.min(occurrences, 52); i++) {
        const start = new Date(new Date(startTime).getTime() + i * interval * 24 * 60 * 60 * 1000)
        const end = new Date(start.getTime() + duration * 60 * 1000)
        const bk = {
          id: i === 0 ? parentId : uuidv4(),
          esnafId, revision: 1, status: 'confirmed',
          serviceId, staffId, resourceIds: [],
          startTime: start.toISOString(), endTime: end.toISOString(),
          timezone: 'Europe/Istanbul',
          contactId: body.contactId || uuidv4(),
          contactDetails,
          participants: 1,
          location: { type: service.location?.type || 'business' },
          payment: { status: 'not_paid', method: 'in_person', totalPrice: service.pricing?.basePrice || 0 },
          notifications: { confirmationSent: false, reminderSent: false, followUpSent: false, reviewRequestSent: false },
          attendance: 'booked',
          recurringConfig: { parentBookingId: parentId, frequency, occurrences, currentOccurrence: i + 1 },
          createdAt: now, updatedAt: now,
        }
        const ref = adminDb.collection('esnaflar').doc(esnafId).collection('bookings').doc(bk.id)
        batch.set(ref, bk)
        bookings.push(bk)
      }

      await batch.commit()
      return NextResponse.json({ ok: true, bookings: bookings.length, parentId }, { status: 201 })
    }

    return NextResponse.json({ error: 'mode gerekli: add_resource, connect, sync, recurring' }, { status: 400 })
  } catch (error: any) {
    return NextResponse.json({ error: 'İşlem başarısız', detay: error.message }, { status: 500 })
  }
}
