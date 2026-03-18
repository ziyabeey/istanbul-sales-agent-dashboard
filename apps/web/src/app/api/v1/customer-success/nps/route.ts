/**
 * NPS & Customer Feedback API
 * GET  /api/v1/customer-success/nps — NPS scores, history, actions
 * POST /api/v1/customer-success/nps — Record score, send survey, follow-up
 */
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { NPS_CONFIG } from '@/data/onboardingConfig'

function classifyNPS(score: number): 'promoter' | 'passive' | 'detractor' {
  if (score >= 9) return 'promoter'
  if (score >= 7) return 'passive'
  return 'detractor'
}

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'latest'

    if (mode === 'latest') {
      const latestSnap = await adminDb.collection('esnaflar').doc(esnafId).collection('nps_responses')
        .orderBy('respondedAt', 'desc').limit(1).get()

      if (latestSnap.empty) return NextResponse.json({ ok: true, hasResponse: false, config: NPS_CONFIG })
      const latest = latestSnap.docs[0].data()
      return NextResponse.json({ ok: true, hasResponse: true, latest, config: NPS_CONFIG })
    }

    if (mode === 'history') {
      const historySnap = await adminDb.collection('esnaflar').doc(esnafId).collection('nps_responses')
        .orderBy('respondedAt', 'desc').limit(12).get()

      const responses = historySnap.docs.map((d: any) => ({ id: d.id, ...d.data() }))
      const scores = responses.map((r: any) => r.score)
      const avgNps = scores.length > 0 ? Math.round(scores.reduce((a: number, b: number) => a + b, 0) / scores.length) : 0
      const trend = scores.length >= 2 ? (scores[0] > scores[1] ? 'improving' : scores[0] < scores[1] ? 'declining' : 'stable') : 'insufficient_data'

      return NextResponse.json({ ok: true, responses, averageScore: avgNps, trend, totalResponses: responses.length })
    }

    if (mode === 'aggregate') {
      // Platform-wide NPS (for admin dashboard)
      const allNpsSnap = await adminDb.collectionGroup('nps_responses')
        .orderBy('respondedAt', 'desc').limit(500).get()

      const allScores = allNpsSnap.docs.map((d: any) => d.data().score).filter((s: any) => typeof s === 'number')
      const promoters = allScores.filter((s: number) => s >= 9).length
      const detractors = allScores.filter((s: number) => s <= 6).length
      const totalResponses = allScores.length
      const npsScore = totalResponses > 0 ? Math.round(((promoters - detractors) / totalResponses) * 100) : 0

      return NextResponse.json({
        ok: true,
        platformNPS: npsScore,
        breakdown: { promoters, passives: totalResponses - promoters - detractors, detractors },
        totalResponses,
        hedefler: NPS_CONFIG.hedefler,
      })
    }

    return NextResponse.json({ error: 'mode: latest, history, aggregate' }, { status: 400 })
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
      case 'record_score': {
        const { score, feedback } = body
        if (score === undefined || score < 0 || score > 10) return NextResponse.json({ error: 'score: 0-10 arası gerekli' }, { status: 400 })

        const category = classifyNPS(score)
        const takipSorusu = NPS_CONFIG.takipSorulari[category]
        const aksiyonlar = NPS_CONFIG.aksiyonlar[category]

        const response = {
          score, category, feedback: feedback || '',
          respondedAt: new Date().toISOString(),
          followUpSent: false, actionsTaken: [],
        }

        await adminDb.collection('esnaflar').doc(esnafId).collection('nps_responses').add(response)

        // Update cached NPS on esnaf profile
        await adminDb.collection('esnaflar').doc(esnafId).update({
          lastNpsScore: score, lastNpsCategory: category, lastNpsAt: new Date().toISOString(),
        })

        return NextResponse.json({
          ok: true, category, takipSorusu, aksiyonlar,
          mesaj: category === 'promoter' ? 'Çok teşekkürler! 🙏' : category === 'passive' ? 'Teşekkürler! Gelişmek için dinliyoruz.' : 'Geri bildiriminiz çok değerli. Hemen ilgileniyoruz.',
        })
      }

      case 'record_followup': {
        const { responseId, followUpAnswer } = body
        await adminDb.collection('esnaflar').doc(esnafId).collection('nps_responses').doc(responseId).update({
          followUpAnswer, followUpSent: true, followUpAt: new Date().toISOString(),
        })
        return NextResponse.json({ ok: true, mesaj: 'Takip yanıtı kaydedildi' })
      }

      case 'schedule_survey': {
        // Schedule NPS survey for a specific date
        const nextSurveyDate = new Date(Date.now() + NPS_CONFIG.siklık * 24 * 60 * 60 * 1000)
        await adminDb.collection('esnaflar').doc(esnafId).update({
          nextNpsSurveyAt: nextSurveyDate.toISOString(),
        })
        return NextResponse.json({ ok: true, nextSurveyAt: nextSurveyDate.toISOString() })
      }

      default:
        return NextResponse.json({ error: 'action: record_score, record_followup, schedule_survey' }, { status: 400 })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
