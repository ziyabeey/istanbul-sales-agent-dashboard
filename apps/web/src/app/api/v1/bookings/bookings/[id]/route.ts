/**
 * Booking Detail + Lifecycle API
 * ────────────────────────────────
 * GET  /api/v1/bookings/bookings/[id] — Detail
 * PUT  /api/v1/bookings/bookings/[id] — Lifecycle actions (confirm/decline/cancel/reschedule/attendance)
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

interface RouteParams { params: Promise<{ id: string }> }

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    const { id } = await params

    const doc = await adminDb.collection('esnaflar').doc(esnafId).collection('bookings').doc(id).get()
    if (!doc.exists) return NextResponse.json({ error: 'Randevu bulunamadı' }, { status: 404 })

    // Get service name
    const booking = doc.data()!
    const serviceDoc = await adminDb.collection('esnaflar').doc(esnafId)
      .collection('booking_services').doc(booking.serviceId).get()

    return NextResponse.json({
      ok: true,
      booking: { id: doc.id, ...booking },
      service: serviceDoc.exists ? { id: serviceDoc.id, name: serviceDoc.data()!.name } : null,
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
    const { action } = body
    const now = new Date().toISOString()

    const ref = adminDb.collection('esnaflar').doc(esnafId).collection('bookings').doc(id)
    const doc = await ref.get()
    if (!doc.exists) return NextResponse.json({ error: 'Randevu bulunamadı' }, { status: 404 })
    const booking = doc.data()!

    switch (action) {
      case 'confirm':
        await ref.update({ status: 'confirmed', updatedAt: now })
        return NextResponse.json({ ok: true, mesaj: 'Randevu onaylandı' })

      case 'decline':
        await ref.update({ status: 'declined', updatedAt: now, 'cancellation': { cancelledBy: 'staff', reason: body.reason || '', cancelledAt: now, refundStatus: 'full' } })
        // Check waitlist
        await checkAndNotifyWaitlist(esnafId, booking)
        return NextResponse.json({ ok: true, mesaj: 'Randevu reddedildi' })

      case 'cancel': {
        const cancelledBy = body.cancelledBy || 'staff'
        await ref.update({
          status: 'cancelled',
          updatedAt: now,
          cancellation: {
            cancelledBy,
            reason: body.reason || '',
            cancelledAt: now,
            refundStatus: body.refundStatus || 'none',
            refundAmount: body.refundAmount,
            cancellationFee: body.cancellationFee,
          },
        })
        // Check waitlist for freed slot
        await checkAndNotifyWaitlist(esnafId, booking)
        return NextResponse.json({ ok: true, mesaj: 'Randevu iptal edildi' })
      }

      case 'reschedule': {
        if (!body.newStartTime) return NextResponse.json({ error: 'newStartTime gerekli' }, { status: 400 })
        const serviceDoc = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('booking_services').doc(booking.serviceId).get()
        const duration = serviceDoc.exists ? serviceDoc.data()!.duration : 30
        const newStart = new Date(body.newStartTime)
        const newEnd = new Date(newStart.getTime() + duration * 60 * 1000)

        await ref.update({
          startTime: newStart.toISOString(),
          endTime: newEnd.toISOString(),
          staffId: body.newStaffId || booking.staffId,
          updatedAt: now,
          revision: (booking.revision || 0) + 1,
        })
        return NextResponse.json({ ok: true, mesaj: `Randevu ${newStart.toLocaleDateString('tr-TR')} tarihine taşındı` })
      }

      case 'attendance': {
        const attendance = body.attendance // 'checked_in' | 'no_show'
        if (!attendance) return NextResponse.json({ error: 'attendance gerekli' }, { status: 400 })

        const updates: Record<string, any> = { attendance, updatedAt: now }
        if (attendance === 'checked_in') {
          updates.checkedInAt = now
          updates.status = 'completed'
        } else if (attendance === 'no_show') {
          updates.status = 'no_show'
          // Check waitlist
          await checkAndNotifyWaitlist(esnafId, booking)
        }

        await ref.update(updates)
        return NextResponse.json({ ok: true, mesaj: attendance === 'checked_in' ? 'Giriş yapıldı' : 'Gelmedi olarak işaretlendi' })
      }

      case 'payment': {
        await ref.update({
          'payment.status': body.paymentStatus || 'fully_paid',
          'payment.transactionId': body.transactionId,
          'payment.method': body.method || 'in_person',
          updatedAt: now,
        })
        return NextResponse.json({ ok: true, mesaj: 'Ödeme kaydedildi' })
      }

      default:
        return NextResponse.json({ error: 'action: confirm, decline, cancel, reschedule, attendance, payment' }, { status: 400 })
    }
  } catch (error: any) {
    return NextResponse.json({ error: 'İşlem başarısız', detay: error.message }, { status: 500 })
  }
}

async function checkAndNotifyWaitlist(esnafId: string, booking: any) {
  const waitlistSnap = await adminDb.collection('esnaflar').doc(esnafId)
    .collection('waitlist')
    .where('serviceId', '==', booking.serviceId)
    .where('status', '==', 'waiting')
    .orderBy('position', 'asc')
    .limit(1).get()

  if (!waitlistSnap.empty) {
    const next = waitlistSnap.docs[0]
    await next.ref.update({
      status: 'notified',
      notifiedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 min hold
    })
    // TODO: Send WhatsApp/SMS notification to waitlist contact
  }
}
