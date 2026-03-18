/**
 * Dunning & Payment Recovery API
 * GET  /api/v1/customer-success/dunning — Dunning status, schedule
 * POST /api/v1/customer-success/dunning — Trigger retry, pause, resume, cancel
 */
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { DUNNING_AKISI, IPTAL_MUDAHALELERI, WIN_BACK_KAMPANYASI } from '@/data/onboardingConfig'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'status'

    if (mode === 'status') {
      const dunningDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('billing').doc('dunning').get()
      if (!dunningDoc.exists) return NextResponse.json({ ok: true, dunningActive: false, mesaj: 'Ödeme sorunu yok' })

      const dunning = dunningDoc.data()!
      const daysSinceFailure = Math.floor((Date.now() - new Date(dunning.firstFailureAt).getTime()) / (1000 * 60 * 60 * 24))
      const currentStep = DUNNING_AKISI.filter(s => s.gun <= daysSinceFailure).pop()

      return NextResponse.json({
        ok: true, dunningActive: true,
        status: dunning.status, // active | paused | recovered | cancelled
        daysSinceFailure, currentStep, retryCount: dunning.retryCount || 0,
        nextRetry: dunning.nextRetryAt, schedule: DUNNING_AKISI,
      })
    }

    if (mode === 'cancel-reasons') {
      return NextResponse.json({ ok: true, sebepler: IPTAL_MUDAHALELERI })
    }

    if (mode === 'winback') {
      const winbackDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('billing').doc('winback').get()
      return NextResponse.json({
        ok: true,
        kampanya: WIN_BACK_KAMPANYASI,
        sentMessages: winbackDoc.exists ? (winbackDoc.data()!.sent || []) : [],
      })
    }

    return NextResponse.json({ error: 'mode: status, cancel-reasons, winback' }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const body = await request.json()

    switch (body.action) {
      case 'start_dunning': {
        // Triggered by payment failure webhook
        const { failedPaymentId, amount, reason } = body
        await adminDb.collection('esnaflar').doc(esnafId).collection('billing').doc('dunning').set({
          status: 'active', firstFailureAt: new Date().toISOString(),
          failedPaymentId, amount, reason: reason || 'card_declined',
          retryCount: 0, nextRetryAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // +4h
        })
        return NextResponse.json({ ok: true, mesaj: 'Dunning başlatıldı — 4 saat sonra ilk retry' })
      }

      case 'retry_payment': {
        const dunningDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('billing').doc('dunning').get()
        if (!dunningDoc.exists) return NextResponse.json({ error: 'Aktif dunning yok' }, { status: 404 })

        // TODO: iyzico retry API call
        const { FieldValue } = require('firebase-admin/firestore')
        await dunningDoc.ref.update({
          retryCount: FieldValue.increment(1), lastRetryAt: new Date().toISOString(),
          nextRetryAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        })

        return NextResponse.json({ ok: true, mesaj: 'Ödeme tekrar deneniyor...' })
      }

      case 'payment_recovered': {
        await adminDb.collection('esnaflar').doc(esnafId).collection('billing').doc('dunning').update({
          status: 'recovered', recoveredAt: new Date().toISOString(),
        })
        return NextResponse.json({ ok: true, mesaj: '✅ Ödeme başarılı — dunning sonlandırıldı' })
      }

      case 'pause_subscription': {
        await adminDb.collection('esnaflar').doc(esnafId).update({
          subscriptionStatus: 'paused', pausedAt: new Date().toISOString(),
        })
        await adminDb.collection('esnaflar').doc(esnafId).collection('billing').doc('dunning').update({
          status: 'paused', pausedAt: new Date().toISOString(),
        })
        // TODO: Disable site, WhatsApp AI, POS — but keep data for 60 days
        return NextResponse.json({ ok: true, mesaj: 'Abonelik duraklatıldı. Veriler 60 gün korunur.' })
      }

      case 'resume_subscription': {
        await adminDb.collection('esnaflar').doc(esnafId).update({
          subscriptionStatus: 'active', resumedAt: new Date().toISOString(),
        })
        return NextResponse.json({ ok: true, mesaj: '✅ Abonelik yeniden aktif!' })
      }

      case 'cancel_with_reason': {
        const { reasonId, feedback } = body
        const mudahale = IPTAL_MUDAHALELERI.find(m => m.sebepId === reasonId)

        await adminDb.collection('esnaflar').doc(esnafId).collection('billing').doc('cancel_request').set({
          reasonId, feedback: feedback || '', mudahaleTeklifi: mudahale?.teklif || '',
          requestedAt: new Date().toISOString(), status: 'pending_intervention',
        })

        return NextResponse.json({
          ok: true,
          mudahale: mudahale ? { teklif: mudahale.teklif, mesaj: mudahale.mesaj } : null,
          mesaj: mudahale ? 'İptal isteğinizi aldık. Size bir teklifimiz var:' : 'İptal isteğiniz alındı.',
          // Return intervention offer — UI shows before confirming cancel
        })
      }

      case 'freeze_account': {
        // 6 months free freeze instead of cancel
        await adminDb.collection('esnaflar').doc(esnafId).update({
          subscriptionStatus: 'frozen', frozenAt: new Date().toISOString(),
          frozenUntil: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
        })
        return NextResponse.json({ ok: true, mesaj: '❄️ Hesabınız 6 ay boyunca donduruldu. Verileriniz korunuyor.' })
      }

      default:
        return NextResponse.json({ error: 'action: start_dunning, retry_payment, payment_recovered, pause_subscription, resume_subscription, cancel_with_reason, freeze_account' }, { status: 400 })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
