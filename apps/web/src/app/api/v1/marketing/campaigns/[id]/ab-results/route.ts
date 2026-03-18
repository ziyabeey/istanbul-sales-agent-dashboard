/**
 * Campaign Email Templates API
 * ──────────────────────────────
 * GET /api/v1/marketing/campaigns/[id]/ab-results — A/B test results
 * (Alias for /campaigns/[id]/stats?mode=ab-results)
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

    // Forward to stats endpoint with ab-results mode
    const statsUrl = new URL(request.url)
    statsUrl.pathname = `/api/v1/marketing/campaigns/${id}/stats`
    statsUrl.searchParams.set('mode', 'ab-results')

    const doc = await adminDb.collection('esnaflar').doc(esnafId).collection('campaigns').doc(id).get()
    if (!doc.exists) return NextResponse.json({ error: 'Kampanya bulunamadı' }, { status: 404 })

    const campaign = doc.data()!
    if (!campaign.abTest?.enabled) {
      return NextResponse.json({ ok: false, mesaj: 'Bu kampanyada A/B test aktif değil' })
    }

    const variants = campaign.abTest.variants || []
    const variantStats = await Promise.all(
      variants.map(async (v: any) => {
        const statsDoc = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('campaign_variant_stats').doc(`${id}_${v.id}`).get()
        const stats = statsDoc.exists ? statsDoc.data()! : { sent: 0, delivered: 0, opened: 0, clicked: 0, conversions: 0, revenue: 0 }
        
        return {
          id: v.id,
          name: v.name,
          percentage: v.percentage,
          content: v.content,
          stats,
          rates: {
            openRate: stats.delivered > 0 ? Math.round((stats.opened / stats.delivered) * 100) : 0,
            clickRate: stats.opened > 0 ? Math.round((stats.clicked / stats.opened) * 100) : 0,
            conversionRate: stats.clicked > 0 ? Math.round((stats.conversions / stats.clicked) * 100) : 0,
          },
        }
      })
    )

    const metric = campaign.abTest.winnerCriteria?.metric || 'open_rate'
    const sortKey = metric === 'open_rate' ? 'openRate' : metric === 'click_rate' ? 'clickRate' : 'conversionRate'
    const sorted = [...variantStats].sort((a, b) => (b.rates as any)[sortKey] - (a.rates as any)[sortKey])

    return NextResponse.json({
      ok: true,
      campaign: { id, name: campaign.name },
      winnerCriteria: metric,
      evaluateAfterHours: campaign.abTest.winnerCriteria?.evaluateAfterHours || 24,
      autoApplyWinner: campaign.abTest.winnerCriteria?.autoSelectWinner ?? true,
      winner: sorted[0],
      variants: variantStats,
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'A/B sonuçları getirilemedi', detay: error.message }, { status: 500 })
  }
}
