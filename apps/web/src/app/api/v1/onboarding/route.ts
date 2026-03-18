/**
 * Onboarding API — Checklist, Progress, Activate, Drip
 * GET  /api/v1/onboarding — Checklist status, progress, drip schedule
 * POST /api/v1/onboarding — Update step, trigger drip, mark complete
 */
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import {
  ONBOARDING_CHECKLIST, PROGRESS_BAR, DRIP_KAMPANYASI,
  SEKTOR_ONBOARDING_SORULARI, ISLETME_TIPLERI, AKTIVASYON_MILESTONES,
} from '@/data/onboardingConfig'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'checklist'

    if (mode === 'checklist') {
      // Get user's onboarding progress
      const progressDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('onboarding').doc('progress').get()
      const progress = progressDoc.exists ? progressDoc.data()! : {}

      const items = ONBOARDING_CHECKLIST.map(item => ({
        ...item,
        durum: progress[item.id] || item.varsayilanDurum,
        tamamlanmaTarihi: progress[`${item.id}_at`] || null,
      }))

      const tamamlanan = items.filter(i => i.durum === 'tamamlandi').length
      const yuzde = Math.round((tamamlanan / items.length) * 100)

      return NextResponse.json({
        ok: true, items, yuzde,
        progressBar: { ...PROGRESS_BAR, mevcutYuzde: yuzde, mevcutMesaj: PROGRESS_BAR.format.replace('{yuzde}', String(yuzde)) },
        tumTamamlandi: tamamlanan === items.length,
      })
    }

    if (mode === 'questions') {
      // Get sector-specific onboarding questions
      const sektor = searchParams.get('sektor') || 'genel'
      const sorular = SEKTOR_ONBOARDING_SORULARI[sektor] || SEKTOR_ONBOARDING_SORULARI.genel
      return NextResponse.json({ ok: true, sektor, sorular, toplamSoru: sorular.length })
    }

    if (mode === 'sectors') {
      return NextResponse.json({ ok: true, sektorler: ISLETME_TIPLERI })
    }

    if (mode === 'drip-schedule') {
      // Show upcoming drip messages for this user
      const progressDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('onboarding').doc('drip').get()
      const sent = progressDoc.exists ? (progressDoc.data()!.sentMessages || []) : []

      const upcoming = DRIP_KAMPANYASI.filter(d => !sent.includes(d.id)).map(d => ({
        id: d.id, gun: d.gun, tip: d.tip, kosul: d.kosul || null,
      }))

      return NextResponse.json({ ok: true, sent, upcoming })
    }

    if (mode === 'milestones') {
      const progressDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('onboarding').doc('milestones').get()
      const achieved = progressDoc.exists ? progressDoc.data()! : {}

      const milestones = AKTIVASYON_MILESTONES.map(m => ({
        ...m, tamamlandi: !!achieved[m.id], tamamlanmaTarihi: achieved[`${m.id}_at`] || null,
      }))

      return NextResponse.json({ ok: true, milestones, aktivasyonTamamlandi: !!achieved['ilk_odeme'] })
    }

    return NextResponse.json({ error: 'mode: checklist, questions, sectors, drip-schedule, milestones' }, { status: 400 })
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
      case 'complete_step': {
        const { stepId } = body
        if (!stepId) return NextResponse.json({ error: 'stepId gerekli' }, { status: 400 })

        await adminDb.collection('esnaflar').doc(esnafId).collection('onboarding').doc('progress').set({
          [stepId]: 'tamamlandi',
          [`${stepId}_at`]: new Date().toISOString(),
        }, { merge: true })

        // Check if all complete → celebration trigger
        const progressDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('onboarding').doc('progress').get()
        const progress = progressDoc.data() || {}
        const allComplete = ONBOARDING_CHECKLIST.every(item => progress[item.id] === 'tamamlandi')

        return NextResponse.json({
          ok: true, stepId, mesaj: 'Adım tamamlandı! 🎉',
          tumTamamlandi: allComplete,
          kutlama: allComplete ? { animasyon: 'konfeti', mesaj: 'Tebrikler! İşletmeniz tamamen hazır! 🎉', odul: 'İlk ay %20 indirim veya 7 gün premium deneme' } : null,
        })
      }

      case 'record_milestone': {
        const { milestoneId } = body
        await adminDb.collection('esnaflar').doc(esnafId).collection('onboarding').doc('milestones').set({
          [milestoneId]: true,
          [`${milestoneId}_at`]: new Date().toISOString(),
        }, { merge: true })

        // First payment = ACTIVATION
        if (milestoneId === 'ilk_odeme') {
          await adminDb.collection('esnaflar').doc(esnafId).update({
            activated: true, activatedAt: new Date().toISOString(),
          })
          return NextResponse.json({
            ok: true, mesaj: '🎉🎉🎉 TEBRİKLER! İlk ödemenizi aldınız!', aktivasyonTamamlandi: true,
            // TODO: Send celebration WhatsApp message
          })
        }

        return NextResponse.json({ ok: true, mesaj: `Milestone tamamlandı: ${milestoneId}` })
      }

      case 'mark_drip_sent': {
        const { messageId } = body
        const { FieldValue } = require('firebase-admin/firestore')
        await adminDb.collection('esnaflar').doc(esnafId).collection('onboarding').doc('drip').set({
          sentMessages: FieldValue.arrayUnion(messageId),
          [`${messageId}_sentAt`]: new Date().toISOString(),
        }, { merge: true })
        return NextResponse.json({ ok: true, mesaj: `Drip mesajı gönderildi: ${messageId}` })
      }

      case 'save_answers': {
        // Save onboarding chat answers
        const { sektor, answers } = body
        await adminDb.collection('esnaflar').doc(esnafId).collection('onboarding').doc('answers').set({
          sektor, answers, answeredAt: new Date().toISOString(),
        })
        return NextResponse.json({ ok: true, mesaj: 'Cevaplar kaydedildi' })
      }

      default:
        return NextResponse.json({ error: 'action: complete_step, record_milestone, mark_drip_sent, save_answers' }, { status: 400 })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
