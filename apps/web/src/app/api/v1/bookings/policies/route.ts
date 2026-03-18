/**
 * Booking Policies API
 * ──────────────────────
 * GET  /api/v1/bookings/policies — List
 * POST /api/v1/bookings/policies — Create
 * PUT via POST body.mode=update — Update
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const snapshot = await adminDb.collection('esnaflar').doc(esnafId).collection('booking_policies').get()
    const policies = snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() }))

    return NextResponse.json({ ok: true, policies })
  } catch (error: any) {
    return NextResponse.json({ error: 'Politikalar getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()

    // Update mode
    if (body.mode === 'update' && body.policyId) {
      const { mode: _, policyId, ...updates } = body
      await adminDb.collection('esnaflar').doc(esnafId).collection('booking_policies').doc(policyId)
        .update({ ...updates, updatedAt: new Date().toISOString() })
      return NextResponse.json({ ok: true, mesaj: 'Politika güncellendi' })
    }

    if (!body.name) return NextResponse.json({ error: 'name gerekli' }, { status: 400 })

    const policy = {
      id: uuidv4(),
      esnafId,
      name: body.name,
      bookingRules: {
        minAdvanceNotice: body.bookingRules?.minAdvanceNotice ?? 2,
        maxAdvanceBooking: body.bookingRules?.maxAdvanceBooking ?? 60,
        slotInterval: body.bookingRules?.slotInterval ?? 30,
        approvalMode: body.bookingRules?.approvalMode ?? 'auto',
        allowOnlineBooking: body.bookingRules?.allowOnlineBooking ?? true,
        allowWalkIn: body.bookingRules?.allowWalkIn ?? true,
        allowGroupBooking: body.bookingRules?.allowGroupBooking ?? false,
        maxGroupSize: body.bookingRules?.maxGroupSize,
      },
      cancellationWindows: body.cancellationWindows || [
        { beforeHours: 48, fee: { type: 'none' }, refundPercentage: 100 },
        { beforeHours: 24, fee: { type: 'percentage', amount: 50 }, refundPercentage: 50 },
        { beforeHours: 0, fee: { type: 'percentage', amount: 100 }, refundPercentage: 0 },
      ],
      customerActions: {
        canCancel: body.customerActions?.canCancel ?? true,
        canReschedule: body.customerActions?.canReschedule ?? true,
        cancelDeadlineHours: body.customerActions?.cancelDeadlineHours ?? 24,
        rescheduleDeadlineHours: body.customerActions?.rescheduleDeadlineHours ?? 24,
      },
      waitlist: {
        enabled: body.waitlist?.enabled ?? false,
        maxSize: body.waitlist?.maxSize ?? 10,
        holdTimeMinutes: body.waitlist?.holdTimeMinutes ?? 30,
        autoNotify: body.waitlist?.autoNotify ?? true,
        autoBook: body.waitlist?.autoBook ?? false,
      },
      noShow: {
        autoMarkAfterMinutes: body.noShow?.autoMarkAfterMinutes ?? 30,
        fee: { enabled: false, amount: 0, type: 'fixed' as const },
        aiPrevention: {
          enabled: body.noShow?.aiPrevention?.enabled ?? true,
          extraReminderForHighRisk: true,
          requireDepositAfterNoShows: 2,
        },
      },
      createdAt: new Date().toISOString(),
    }

    await adminDb.collection('esnaflar').doc(esnafId).collection('booking_policies').doc(policy.id).set(policy)
    return NextResponse.json({ ok: true, policy }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Politika oluşturulamadı', detay: error.message }, { status: 500 })
  }
}
