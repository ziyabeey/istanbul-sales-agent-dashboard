/**
 * Campaign Stats + A/B Results API
 * ──────────────────────────────────
 * GET /api/v1/marketing/campaigns/[id]/stats — Campaign performance
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
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'stats'

    const doc = await adminDb.collection('esnaflar').doc(esnafId).collection('campaigns').doc(id).get()
    if (!doc.exists) return NextResponse.json({ error: 'Kampanya bulunamadı' }, { status: 404 })

    const campaign = doc.data()!

    if (mode === 'ab-results') {
      if (!campaign.abTest?.enabled) {
        return NextResponse.json({ ok: false, mesaj: 'Bu kampanyada A/B test aktif değil' })
      }

      // Get per-variant stats from cache
      const variants = campaign.abTest.variants || []
      const variantStats = await Promise.all(
        variants.map(async (v: any) => {
          const statsDoc = await adminDb.collection('esnaflar').doc(esnafId)
            .collection('campaign_variant_stats').doc(`${id}_${v.id}`).get()

          return {
            id: v.id,
            name: v.name,
            percentage: v.percentage,
            stats: statsDoc.exists ? statsDoc.data() : {
              sent: 0, delivered: 0, opened: 0, clicked: 0, conversions: 0, revenue: 0,
            },
          }
        })
      )

      // Determine winner
      const metric = campaign.abTest.winnerCriteria?.metric || 'open_rate'
      const sorted = [...variantStats].sort((a, b) => {
        const aRate = getRate(a.stats, metric)
        const bRate = getRate(b.stats, metric)
        return bRate - aRate
      })

      return NextResponse.json({
        ok: true,
        abTest: {
          variants: variantStats,
          winnerCriteria: metric,
          winner: sorted[0]?.id,
          winnerName: sorted[0]?.name,
          confidence: variantStats.length > 1 ? calculateConfidence(sorted[0].stats, sorted[1].stats, metric) : 0,
        },
      })
    }

    // Regular stats
    const stats = campaign.stats || {}

    // Channel breakdown
    const channelStatsSnap = await adminDb.collection('esnaflar').doc(esnafId)
      .collection('campaign_channel_stats').where('campaignId', '==', id).get()

    const byChannel: Record<string, any> = {}
    channelStatsSnap.docs.forEach((d: any) => {
      const data = d.data()
      byChannel[data.channel] = {
        sent: data.sent || 0,
        delivered: data.delivered || 0,
        opened: data.opened || 0,
        clicked: data.clicked || 0,
        conversions: data.conversions || 0,
        revenue: data.revenue || 0,
      }
    })

    // Compute rates
    const deliveryRate = stats.sent > 0 ? Math.round((stats.delivered || 0) / stats.sent * 100) : 0
    const openRate = stats.delivered > 0 ? Math.round((stats.opened || 0) / stats.delivered * 100) : 0
    const clickRate = stats.opened > 0 ? Math.round((stats.clicked || 0) / stats.opened * 100) : 0
    const conversionRate = stats.clicked > 0 ? Math.round((stats.conversions || 0) / stats.clicked * 100) : 0

    return NextResponse.json({
      ok: true,
      campaign: { id, name: campaign.name, type: campaign.type, status: campaign.status },
      stats: {
        ...stats,
        deliveryRate,
        openRate,
        clickRate,
        conversionRate,
        roi: stats.cost > 0 ? Math.round(((stats.revenue || 0) - stats.cost) / stats.cost * 100) : 0,
      },
      byChannel,
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'İstatistikler getirilemedi', detay: error.message }, { status: 500 })
  }
}

function getRate(stats: any, metric: string): number {
  const delivered = stats.delivered || stats.sent || 1
  const opened = stats.opened || 1
  switch (metric) {
    case 'open_rate': return (stats.opened || 0) / delivered
    case 'click_rate': return (stats.clicked || 0) / opened
    case 'conversion_rate': return (stats.conversions || 0) / opened
    case 'revenue': return stats.revenue || 0
    default: return 0
  }
}

function calculateConfidence(winner: any, loser: any, metric: string): number {
  const wRate = getRate(winner, metric)
  const lRate = getRate(loser, metric)
  if (lRate === 0) return wRate > 0 ? 99 : 0
  const diff = Math.abs(wRate - lRate) / lRate
  // Simplified confidence (real: chi-squared or z-test)
  const n = Math.min(winner.sent || 0, loser.sent || 0)
  if (n < 50) return Math.min(50, Math.round(diff * 100))
  if (n < 200) return Math.min(80, Math.round(diff * 100))
  return Math.min(99, Math.round(diff * 100 + 20))
}
