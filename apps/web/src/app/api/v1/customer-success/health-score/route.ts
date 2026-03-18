/**
 * Customer Health Score API
 * GET  /api/v1/customer-success/health-score — 5-dimension health score
 * POST /api/v1/customer-success/health-score — Recalculate, override, alert
 */
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { HEALTH_SCORE_BOYUTLARI, HEALTH_SCORE_KATEGORILERI } from '@/data/onboardingConfig'

function calculateDimensionScore(boyutId: string, data: any): number {
  switch (boyutId) {
    case 'urun_kullanimi': {
      let score = 0
      const weeklyLogins = data.weeklyLogins || 0
      score += weeklyLogins >= 3 ? 100 : weeklyLogins >= 1 ? 50 : 0

      const avgSession = data.avgSessionMinutes || 0
      score += avgSession >= 15 ? 100 : avgSession >= 2 ? 50 : 0

      const activeFeatures = data.activeFeatures || 0
      score += activeFeatures >= 3 ? 100 : activeFeatures >= 2 ? 50 : 0

      const daysSinceLogin = data.daysSinceLogin ?? 999
      score += daysSinceLogin < 7 ? 100 : daysSinceLogin < 14 ? 50 : 0

      return Math.round(score / 4)
    }
    case 'ozellik_benimseme': {
      const coreUsed = data.coreFeatures || 0
      const advancedUsed = data.advancedFeatures || 0
      const core = coreUsed >= 2 ? 100 : coreUsed >= 1 ? 50 : 0
      const advanced = advancedUsed > 0 ? 100 : 0
      return Math.round((core * 0.7 + advanced * 0.3))
    }
    case 'destek_etkilesimi': {
      const trend = data.supportTrend || 'stable' // increasing | stable | decreasing
      const trendScore = trend === 'decreasing' ? 100 : trend === 'stable' ? 50 : 0
      const responseRate = Math.min(100, (data.whatsappResponseRate || 0) * 100 / 60 * 100)
      return Math.round((trendScore + Math.min(100, responseRate)) / 2)
    }
    case 'nps_sentiment': {
      const nps = data.npsScore ?? 0
      return nps > 40 ? 100 : nps > 0 ? 50 : 0
    }
    case 'odeme_sagligi': {
      const successRate = data.paymentSuccessRate ?? 100
      return successRate > 95 ? 100 : successRate > 80 ? 50 : 0
    }
    default: return 50
  }
}

function getKategori(score: number) {
  if (score >= 70) return { ...HEALTH_SCORE_KATEGORILERI.yesil, kategori: 'yesil' as const }
  if (score >= 40) return { ...HEALTH_SCORE_KATEGORILERI.sari, kategori: 'sari' as const }
  return { ...HEALTH_SCORE_KATEGORILERI.kirmizi, kategori: 'kirmizi' as const }
}

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'score'

    if (mode === 'score') {
      // Get cached or compute
      const cacheDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('analytics_cache').doc('health_score').get()
      if (cacheDoc.exists) {
        const cached = cacheDoc.data()!
        const cacheAge = Date.now() - new Date(cached.computedAt).getTime()
        if (cacheAge < 24 * 60 * 60 * 1000) { // <24h cache
          return NextResponse.json({ ok: true, ...cached, fromCache: true })
        }
      }

      // Compute from activity data
      const activityDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('analytics_cache').doc('user_activity').get()
      const activity = activityDoc.exists ? activityDoc.data()! : {}

      const boyutSkorlari = HEALTH_SCORE_BOYUTLARI.map(boyut => {
        const skor = calculateDimensionScore(boyut.id, activity)
        return { id: boyut.id, ad: boyut.ad, agirlik: boyut.agirlik, skor }
      })

      const toplamSkor = Math.round(boyutSkorlari.reduce((sum, b) => sum + b.skor * (b.agirlik / 100), 0))
      const kategori = getKategori(toplamSkor)

      const result = {
        toplamSkor, kategori: kategori.kategori, anlam: kategori.anlam, renk: kategori.renk,
        boyutlar: boyutSkorlari, model: HEALTH_SCORE_BOYUTLARI, computedAt: new Date().toISOString(),
      }

      // Cache the result
      await adminDb.collection('esnaflar').doc(esnafId).collection('analytics_cache').doc('health_score').set(result)

      return NextResponse.json({ ok: true, ...result })
    }

    if (mode === 'history') {
      const historySnap = await adminDb.collection('esnaflar').doc(esnafId).collection('health_score_history')
        .orderBy('computedAt', 'desc').limit(30).get()
      return NextResponse.json({
        ok: true,
        history: historySnap.docs.map((d: any) => ({ id: d.id, ...d.data() })),
      })
    }

    if (mode === 'alerts') {
      // Get active health alerts
      const alertsSnap = await adminDb.collection('esnaflar').doc(esnafId).collection('health_alerts')
        .where('resolved', '==', false).orderBy('createdAt', 'desc').limit(10).get()
      return NextResponse.json({
        ok: true,
        alerts: alertsSnap.docs.map((d: any) => ({ id: d.id, ...d.data() })),
      })
    }

    return NextResponse.json({ error: 'mode: score, history, alerts' }, { status: 400 })
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
      case 'recalculate': {
        // Force recalculate health score
        await adminDb.collection('esnaflar').doc(esnafId).collection('analytics_cache').doc('health_score').delete()
        return NextResponse.json({ ok: true, mesaj: 'Health score yeniden hesaplanacak' })
      }

      case 'resolve_alert': {
        const { alertId, resolution } = body
        await adminDb.collection('esnaflar').doc(esnafId).collection('health_alerts').doc(alertId).update({
          resolved: true, resolvedAt: new Date().toISOString(), resolution: resolution || '',
        })
        return NextResponse.json({ ok: true, mesaj: 'Alert çözüldü' })
      }

      case 'update_activity': {
        // Update user activity metrics (called by event tracking)
        const { metrics } = body
        await adminDb.collection('esnaflar').doc(esnafId).collection('analytics_cache').doc('user_activity').set({
          ...metrics, updatedAt: new Date().toISOString(),
        }, { merge: true })
        return NextResponse.json({ ok: true, mesaj: 'Aktivite güncellendi' })
      }

      default:
        return NextResponse.json({ error: 'action: recalculate, resolve_alert, update_activity' }, { status: 400 })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
