/**
 * Availability / Slots API — Dynamic computation (never persisted)
 * ──────────────────────────────────────────────────────────────────
 * GET /api/v1/bookings/availability — Available time slots
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { calculateAvailableSlots } from '@/lib/booking/slotEngine'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const serviceId = searchParams.get('serviceId')
    const staffId = searchParams.get('staffId')
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')

    if (!serviceId || !dateFrom || !dateTo) {
      return NextResponse.json({ error: 'serviceId, dateFrom, dateTo gerekli' }, { status: 400 })
    }

    // 1. Get service
    const serviceDoc = await adminDb.collection('esnaflar').doc(esnafId)
      .collection('booking_services').doc(serviceId).get()
    if (!serviceDoc.exists) return NextResponse.json({ error: 'Hizmet bulunamadı' }, { status: 404 })
    const service = serviceDoc.data()!

    // 2. Get staff
    let staffList: any[]
    if (staffId) {
      const staffDoc = await adminDb.collection('esnaflar').doc(esnafId)
        .collection('booking_staff').doc(staffId).get()
      if (!staffDoc.exists) return NextResponse.json({ error: 'Çalışan bulunamadı' }, { status: 404 })
      staffList = [staffDoc.data()!]
    } else {
      const staffSnap = await adminDb.collection('esnaflar').doc(esnafId)
        .collection('booking_staff').where('status', '==', 'active').get()
      staffList = staffSnap.docs.map((d: any) => d.data())
    }

    // 3. Get business schedule
    const scheduleDoc = await adminDb.collection('esnaflar').doc(esnafId)
      .collection('settings').doc('booking_schedule').get()
    const schedule = scheduleDoc.exists ? scheduleDoc.data()! : {
      defaultHours: {
        monday: [{ start: '09:00', end: '19:00' }],
        tuesday: [{ start: '09:00', end: '19:00' }],
        wednesday: [{ start: '09:00', end: '19:00' }],
        thursday: [{ start: '09:00', end: '19:00' }],
        friday: [{ start: '09:00', end: '19:00' }],
        saturday: [{ start: '09:00', end: '17:00' }],
      },
      exceptions: [],
      turkeyDefaults: { observeReligiousHolidays: true, observeNationalHolidays: true },
    }

    // 4. Get existing bookings in range
    const bookingsSnap = await adminDb.collection('esnaflar').doc(esnafId)
      .collection('bookings')
      .where('startTime', '>=', dateFrom + 'T00:00:00+03:00')
      .where('startTime', '<=', dateTo + 'T23:59:59+03:00')
      .get()
    const existingBookings = bookingsSnap.docs.map((d: any) => d.data())

    // 5. Get external calendar blocks (from cache)
    const calBlocksSnap = await adminDb.collection('esnaflar').doc(esnafId)
      .collection('calendar_blocks')
      .where('start', '>=', dateFrom + 'T00:00:00+03:00')
      .where('start', '<=', dateTo + 'T23:59:59+03:00')
      .get()
    const externalBlocks = calBlocksSnap.docs.map((d: any) => d.data())

    // 6. Get policy
    let slotInterval = 30
    let minAdvanceHours = 2
    if (service.policyId) {
      const policyDoc = await adminDb.collection('esnaflar').doc(esnafId)
        .collection('booking_policies').doc(service.policyId).get()
      if (policyDoc.exists) {
        slotInterval = policyDoc.data()!.bookingRules?.slotInterval || 30
        minAdvanceHours = policyDoc.data()!.bookingRules?.minAdvanceNotice || 2
      }
    }

    // 7. Calculate slots
    const slots = calculateAvailableSlots(
      service as any, staffList as any, schedule as any,
      existingBookings, externalBlocks, dateFrom, dateTo,
      slotInterval, minAdvanceHours
    )

    return NextResponse.json({
      ok: true,
      service: { id: serviceId, name: service.name, duration: service.duration },
      dateRange: { from: dateFrom, to: dateTo },
      slots,
      slotCount: slots.length,
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Müsaitlik hesaplanamadı', detay: error.message }, { status: 500 })
  }
}
