/**
 * Staff API + Schedule
 * ─────────────────────
 * GET  /api/v1/bookings/staff — List
 * POST /api/v1/bookings/staff — Add staff + schedule override + exceptions
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const snapshot = await adminDb.collection('esnaflar').doc(esnafId)
      .collection('booking_staff').where('status', '==', 'active').get()

    const staff = snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() }))
    return NextResponse.json({ ok: true, staff, count: staff.length })
  } catch (error: any) {
    return NextResponse.json({ error: 'Getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()

    // Schedule exception mode
    if (body.mode === 'add_exception' && body.staffId) {
      const ref = adminDb.collection('esnaflar').doc(esnafId).collection('booking_staff').doc(body.staffId)
      const doc = await ref.get()
      if (!doc.exists) return NextResponse.json({ error: 'Çalışan bulunamadı' }, { status: 404 })

      const exceptions = doc.data()!.exceptions || []
      exceptions.push({
        date: body.date,
        type: body.type || 'closed',
        reason: body.reason || '',
        hours: body.hours,
      })
      await ref.update({ exceptions })
      return NextResponse.json({ ok: true, mesaj: 'İstisna eklendi' })
    }

    // Schedule update mode
    if (body.mode === 'update_schedule' && body.staffId) {
      await adminDb.collection('esnaflar').doc(esnafId).collection('booking_staff').doc(body.staffId)
        .update({ scheduleOverride: body.schedule })
      return NextResponse.json({ ok: true, mesaj: 'Çalışma saatleri güncellendi' })
    }

    // Add staff
    if (!body.name) return NextResponse.json({ error: 'name gerekli' }, { status: 400 })

    const countRes = await adminDb.collection('esnaflar').doc(esnafId).collection('booking_staff').count().get()
    if (countRes.data().count >= 20) {
      return NextResponse.json({ error: 'Maksimum 20 çalışan eklenebilir' }, { status: 422 })
    }

    const staff = {
      id: uuidv4(),
      esnafId,
      name: body.name,
      role: body.role || 'Çalışan',
      email: body.email,
      phone: body.phone,
      avatar: body.avatar,
      bio: body.bio,
      serviceIds: body.serviceIds || [],
      scheduleOverride: body.scheduleOverride,
      exceptions: [],
      priority: body.priority || 3,
      externalCalendar: body.externalCalendar,
      accessRole: body.accessRole || 'staff',
      status: 'active',
      createdAt: new Date().toISOString(),
    }

    await adminDb.collection('esnaflar').doc(esnafId).collection('booking_staff').doc(staff.id).set(staff)
    return NextResponse.json({ ok: true, staff }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Çalışan eklenemedi', detay: error.message }, { status: 500 })
  }
}
