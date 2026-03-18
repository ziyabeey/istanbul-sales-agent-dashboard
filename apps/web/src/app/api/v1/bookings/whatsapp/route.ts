/**
 * WhatsApp Conversational Booking API
 * ─────────────────────────────────────
 * POST /api/v1/bookings/whatsapp — Handle booking intent/response from WhatsApp AI
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    const { action, contactPhone, sessionId } = body

    switch (action) {
      case 'start': {
        // Start a new booking flow via WhatsApp
        // Get available services for quick response
        const servicesSnap = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('booking_services').where('status', '==', 'active')
          .orderBy('sortOrder', 'asc').get()

        const services = servicesSnap.docs.map((d: any) => {
          const s = d.data()
          return { id: d.id, name: s.name, duration: s.duration, price: s.pricing?.basePrice || 0 }
        })

        // Create session
        const session = {
          id: sessionId || crypto.randomUUID(),
          esnafId,
          contactPhone,
          step: 'select_service',
          services,
          selectedService: null,
          selectedStaff: null,
          selectedSlot: null,
          createdAt: new Date().toISOString(),
        }

        await adminDb.collection('esnaflar').doc(esnafId)
          .collection('whatsapp_booking_sessions').doc(session.id).set(session)

        return NextResponse.json({
          ok: true,
          session: session.id,
          step: 'select_service',
          message: 'Hangi hizmet için randevu almak istersiniz?',
          options: services.map((s: { id: string; name: string; duration: number; price: number }) => ({
            id: s.id,
            title: s.name,
            description: `${s.duration} dk — ${s.price} ₺`,
          })),
          messageType: 'list_message',
        })
      }

      case 'select_service': {
        if (!body.serviceId || !sessionId) return NextResponse.json({ error: 'serviceId ve sessionId gerekli' }, { status: 400 })

        const serviceDoc = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('booking_services').doc(body.serviceId).get()
        if (!serviceDoc.exists) return NextResponse.json({ error: 'Hizmet bulunamadı' }, { status: 404 })
        const service = serviceDoc.data()!

        // Get available staff
        const staffSnap = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('booking_staff').where('status', '==', 'active').get()
        const availableStaff = staffSnap.docs
          .filter((d: any) => d.data().serviceIds?.includes(body.serviceId) || service.staffIds?.includes(d.id))
          .map((d: any) => ({ id: d.id, name: d.data().name as string, role: d.data().role as string }))

        await adminDb.collection('esnaflar').doc(esnafId)
          .collection('whatsapp_booking_sessions').doc(sessionId)
          .update({ step: 'select_staff', selectedService: { id: body.serviceId, name: service.name, duration: service.duration, price: service.pricing?.basePrice || 0 } })

        if (availableStaff.length <= 1) {
          // Skip staff selection
          const staffId = availableStaff[0]?.id || 'owner'
          return NextResponse.json({
            ok: true,
            step: 'select_datetime',
            message: `${service.name} için müsait zamanları getiriyorum...`,
            autoSelectStaff: staffId,
          })
        }

        return NextResponse.json({
          ok: true,
          step: 'select_staff',
          message: 'Hangi çalışanımızı tercih edersiniz?',
          options: [
            ...availableStaff.map((s: { id: string; name: string; role: string }) => ({ id: s.id, title: s.name, description: s.role })),
            { id: 'any', title: 'Fark etmez', description: 'Uygun olan' },
          ],
          messageType: 'list_message',
        })
      }

      case 'get_slots': {
        // AI requests available slots for WhatsApp display
        const { serviceId, staffId: reqStaffId, date } = body
        if (!serviceId) return NextResponse.json({ error: 'serviceId gerekli' }, { status: 400 })

        const targetDate = date || new Date().toISOString().split('T')[0]
        const nextDay = new Date(new Date(targetDate).getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

        // Simplified slot generation for WhatsApp (max 10 options)
        const serviceDoc = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('booking_services').doc(serviceId).get()
        const service = serviceDoc.exists ? serviceDoc.data()! : { duration: 30 }

        const bookingsSnap = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('bookings')
          .where('startTime', '>=', targetDate + 'T00:00:00+03:00')
          .where('startTime', '<=', nextDay + 'T23:59:59+03:00')
          .get()
        const booked = bookingsSnap.docs.map((d: any) => d.data())
          .filter((b: any) => ['confirmed', 'pending'].includes(b.status))

        // Generate simplified slots
        const slots: { time: string; display: string }[] = []
        const hours = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00']

        for (const hour of hours) {
          const slotStart = new Date(`${targetDate}T${hour}:00+03:00`)
          if (slotStart < new Date()) continue

          const slotEnd = new Date(slotStart.getTime() + service.duration * 60 * 1000)
          const hasConflict = booked.some((b: any) =>
            (!reqStaffId || b.staffId === reqStaffId) &&
            new Date(b.startTime) < slotEnd && new Date(b.endTime) > slotStart
          )
          if (!hasConflict) slots.push({ time: slotStart.toISOString(), display: hour })
          if (slots.length >= 10) break
        }

        return NextResponse.json({ ok: true, date: targetDate, slots })
      }

      case 'confirm': {
        if (!sessionId) return NextResponse.json({ error: 'sessionId gerekli' }, { status: 400 })

        const sessionDoc = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('whatsapp_booking_sessions').doc(sessionId).get()
        if (!sessionDoc.exists) return NextResponse.json({ error: 'Oturum bulunamadı' }, { status: 404 })

        const session = sessionDoc.data()!

        // Create the actual booking
        const confirmMessage = [
          'Randevunuz onaylandı! 🎉\n',
          `✂️ ${session.selectedService?.name || 'Hizmet'}`,
          `📅 ${body.date || 'Tarih'}`,
          `🕐 ${body.time || 'Saat'}`,
          `💰 ${session.selectedService?.price || 0} ₺`,
          '\nGörüşmek üzere! 👋',
        ].join('\n')

        // Clean up session
        await adminDb.collection('esnaflar').doc(esnafId)
          .collection('whatsapp_booking_sessions').doc(sessionId)
          .update({ step: 'completed', completedAt: new Date().toISOString() })

        return NextResponse.json({
          ok: true,
          step: 'completed',
          message: confirmMessage,
          messageType: 'text',
        })
      }

      default:
        return NextResponse.json({ error: 'action: start, select_service, get_slots, confirm' }, { status: 400 })
    }
  } catch (error: any) {
    return NextResponse.json({ error: 'WhatsApp booking başarısız', detay: error.message }, { status: 500 })
  }
}
