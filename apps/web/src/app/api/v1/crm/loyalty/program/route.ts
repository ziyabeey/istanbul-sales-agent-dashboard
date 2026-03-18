/**
 * Loyalty Program API
 * ────────────────────
 * GET  /api/v1/crm/loyalty/program — Get program config
 * PUT  /api/v1/crm/loyalty/program — Update program
 * POST /api/v1/crm/loyalty/earn    — Award points
 * POST /api/v1/crm/loyalty/redeem  — Redeem points
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const doc = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('loyalty').doc('program').get()

    if (!doc.exists) {
      return NextResponse.json({ ok: true, program: null, mesaj: 'Sadakat programı henüz kurulmamış' })
    }

    return NextResponse.json({ ok: true, program: doc.data() })
  } catch (error: any) {
    return NextResponse.json({ error: 'Program getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    const now = new Date().toISOString()

    await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('loyalty').doc('program')
      .set({ ...body, esnafId, updatedAt: now }, { merge: true })

    return NextResponse.json({ ok: true, mesaj: 'Sadakat programı güncellendi' })
  } catch (error: any) {
    return NextResponse.json({ error: 'Güncelleme başarısız', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    const { action, contactId, points, reason } = body

    if (!action || !contactId || !points) {
      return NextResponse.json({ error: 'action, contactId ve points gerekli' }, { status: 400 })
    }

    const contactRef = adminDb.collection('esnaflar').doc(esnafId).collection('contacts').doc(contactId)
    const contactDoc = await contactRef.get()
    if (!contactDoc.exists) return NextResponse.json({ error: 'Müşteri bulunamadı' }, { status: 404 })

    const currentPoints = contactDoc.data()?.activitySummary?.loyaltyPoints || 0

    if (action === 'earn') {
      await contactRef.update({
        'activitySummary.loyaltyPoints': currentPoints + points,
        updatedAt: new Date().toISOString(),
      })

      // Log activity
      await adminDb.collection('esnaflar').doc(esnafId).collection('contact_activities').add({
        contactId,
        esnafId,
        type: 'loyalty.earned',
        data: { points, reason: reason || 'manual', newBalance: currentPoints + points },
        createdAt: new Date().toISOString(),
      })

      return NextResponse.json({ ok: true, points: currentPoints + points })
    }

    if (action === 'redeem') {
      if (currentPoints < points) {
        return NextResponse.json({ error: `Yetersiz puan. Mevcut: ${currentPoints}, İstenen: ${points}` }, { status: 422 })
      }

      await contactRef.update({
        'activitySummary.loyaltyPoints': currentPoints - points,
        updatedAt: new Date().toISOString(),
      })

      await adminDb.collection('esnaflar').doc(esnafId).collection('contact_activities').add({
        contactId,
        esnafId,
        type: 'loyalty.redeemed',
        data: { points, reason: reason || 'manual', newBalance: currentPoints - points },
        createdAt: new Date().toISOString(),
      })

      return NextResponse.json({ ok: true, points: currentPoints - points })
    }

    return NextResponse.json({ error: 'action "earn" veya "redeem" olmalı' }, { status: 400 })
  } catch (error: any) {
    return NextResponse.json({ error: 'İşlem başarısız', detay: error.message }, { status: 500 })
  }
}
