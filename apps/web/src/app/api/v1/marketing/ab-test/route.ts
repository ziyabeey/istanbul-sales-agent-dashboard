/**
 * A/B Test Engine — Campaign & Content Optimization
 * GET  /api/v1/marketing/ab-test — List tests, results
 * POST /api/v1/marketing/ab-test — Create, assign, complete tests
 */
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { v4 as uuidv4 } from 'uuid'

type TestStatus = 'draft' | 'running' | 'paused' | 'completed' | 'winner_selected'
type TestType = 'campaign_message' | 'subject_line' | 'send_time' | 'landing_page' | 'cta_button' | 'pricing' | 'product_image'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const { searchParams } = new URL(request.url)
    const testId = searchParams.get('testId')

    if (testId) {
      const doc = await adminDb.collection('esnaflar').doc(esnafId).collection('ab_tests').doc(testId).get()
      if (!doc.exists) return NextResponse.json({ error: 'Test bulunamadı' }, { status: 404 })
      const test = doc.data()!

      // Calculate statistical significance
      const totalA = (test.variants?.A?.impressions || 0)
      const totalB = (test.variants?.B?.impressions || 0)
      const convA = (test.variants?.A?.conversions || 0)
      const convB = (test.variants?.B?.conversions || 0)
      const rateA = totalA > 0 ? convA / totalA : 0
      const rateB = totalB > 0 ? convB / totalB : 0

      // Simple z-test for significance (p < 0.05 → significant)
      const pooledRate = (convA + convB) / (totalA + totalB || 1)
      const se = Math.sqrt(pooledRate * (1 - pooledRate) * (1 / (totalA || 1) + 1 / (totalB || 1)))
      const zScore = se > 0 ? Math.abs(rateA - rateB) / se : 0
      const isSignificant = zScore > 1.96 // 95% confidence

      return NextResponse.json({
        ok: true, test,
        analysis: {
          variantA: { impressions: totalA, conversions: convA, rate: (rateA * 100).toFixed(1) + '%' },
          variantB: { impressions: totalB, conversions: convB, rate: (rateB * 100).toFixed(1) + '%' },
          winner: isSignificant ? (rateA > rateB ? 'A' : 'B') : null,
          isSignificant, confidence: isSignificant ? '95%+' : 'Yetersiz veri',
          zScore: zScore.toFixed(2),
          recommendation: isSignificant
            ? `Varyant ${rateA > rateB ? 'A' : 'B'} %${Math.abs((rateA - rateB) * 100).toFixed(1)} daha iyi performans gösteriyor`
            : `Henüz yeterli veri yok — en az ${Math.max(100 - totalA, 100 - totalB, 0)} impression daha gerekli`,
        },
      })
    }

    // List all tests
    const snap = await adminDb.collection('esnaflar').doc(esnafId)
      .collection('ab_tests').orderBy('createdAt', 'desc').limit(50).get()
    return NextResponse.json({ ok: true, tests: snap.docs.map((d: any) => ({ id: d.id, ...d.data() })) })
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
      case 'create': {
        const { name, type, variantA, variantB, trafficSplit, targetAudience } = body
        if (!name || !type || !variantA || !variantB) return NextResponse.json({ error: 'name, type, variantA, variantB gerekli' }, { status: 400 })

        const test = {
          id: uuidv4(), esnafId, name, type: type as TestType,
          status: 'draft' as TestStatus,
          variants: {
            A: { content: variantA, impressions: 0, clicks: 0, conversions: 0, revenue: 0 },
            B: { content: variantB, impressions: 0, clicks: 0, conversions: 0, revenue: 0 },
          },
          trafficSplit: trafficSplit || 50, // 50% each by default
          targetAudience: targetAudience || 'all',
          winnerId: null,
          createdAt: new Date().toISOString(), startedAt: null, completedAt: null,
        }

        await adminDb.collection('esnaflar').doc(esnafId).collection('ab_tests').doc(test.id).set(test)
        return NextResponse.json({ ok: true, test, mesaj: 'A/B test oluşturuldu' })
      }

      case 'start': {
        await adminDb.collection('esnaflar').doc(esnafId).collection('ab_tests').doc(body.testId)
          .update({ status: 'running', startedAt: new Date().toISOString() })
        return NextResponse.json({ ok: true, mesaj: 'Test başlatıldı' })
      }

      case 'pause': {
        await adminDb.collection('esnaflar').doc(esnafId).collection('ab_tests').doc(body.testId)
          .update({ status: 'paused' })
        return NextResponse.json({ ok: true, mesaj: 'Test duraklatıldı' })
      }

      case 'record_event': {
        // Record impression, click, or conversion for a variant
        const { testId, variant, eventType } = body // eventType: 'impression' | 'click' | 'conversion'
        if (!testId || !variant || !eventType) return NextResponse.json({ error: 'testId, variant (A/B), eventType gerekli' }, { status: 400 })

        const field = eventType === 'impression' ? 'impressions' : eventType === 'click' ? 'clicks' : 'conversions'
        const { FieldValue } = require('firebase-admin/firestore')
        await adminDb.collection('esnaflar').doc(esnafId).collection('ab_tests').doc(testId)
          .update({ [`variants.${variant}.${field}`]: FieldValue.increment(1) })

        if (eventType === 'conversion' && body.revenue) {
          await adminDb.collection('esnaflar').doc(esnafId).collection('ab_tests').doc(testId)
            .update({ [`variants.${variant}.revenue`]: FieldValue.increment(body.revenue) })
        }

        return NextResponse.json({ ok: true })
      }

      case 'assign_variant': {
        // Assign a visitor to a variant (deterministic by visitor hash)
        const { testId, visitorId } = body
        const doc = await adminDb.collection('esnaflar').doc(esnafId).collection('ab_tests').doc(testId).get()
        if (!doc.exists || doc.data()?.status !== 'running') return NextResponse.json({ error: 'Test çalışmıyor' }, { status: 400 })

        // Deterministic assignment via simple hash
        let hash = 0
        const key = `${testId}_${visitorId}`
        for (let i = 0; i < key.length; i++) hash = ((hash << 5) - hash) + key.charCodeAt(i)
        const split = doc.data()!.trafficSplit || 50
        const variant = (Math.abs(hash) % 100) < split ? 'A' : 'B'

        return NextResponse.json({ ok: true, variant, testId })
      }

      case 'select_winner': {
        const { testId, winnerId } = body
        await adminDb.collection('esnaflar').doc(esnafId).collection('ab_tests').doc(testId)
          .update({ status: 'winner_selected', winnerId, completedAt: new Date().toISOString() })
        return NextResponse.json({ ok: true, mesaj: `Varyant ${winnerId} kazanan seçildi` })
      }

      default:
        return NextResponse.json({ error: 'action: create, start, pause, record_event, assign_variant, select_winner' }, { status: 400 })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
