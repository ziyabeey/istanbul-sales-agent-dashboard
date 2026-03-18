/**
 * Ads Integration API — Google & Meta Ads
 * ─────────────────────────────────────────
 * GET  /api/v1/marketing/ads/stats — Combined ads stats
 * POST /api/v1/marketing/ads/connect — Connect platform
 * GET  /api/v1/marketing/ads/campaigns — List ad campaigns
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'stats'
    const period = searchParams.get('period') || '30d'

    const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
    const esnaf = esnafDoc.data() || {}

    const connectedPlatforms = {
      google: esnaf.integrations?.googleAds?.connected || false,
      meta: esnaf.integrations?.metaAds?.connected || false,
    }

    if (mode === 'campaigns') {
      // List ad campaigns from Firestore cache
      const snapshot = await adminDb.collection('esnaflar').doc(esnafId)
        .collection('ad_campaigns').orderBy('updatedAt', 'desc').limit(20).get()

      const campaigns = snapshot.docs.map((d: any) => d.data())
      return NextResponse.json({ ok: true, connectedPlatforms, campaigns })
    }

    // Stats mode — aggregate from cached data
    const statsDoc = await adminDb.collection('esnaflar').doc(esnafId)
      .collection('analytics_cache').doc(`ads_${period}`).get()

    const stats = statsDoc.exists ? statsDoc.data() : {
      google: {
        impressions: 0, clicks: 0, ctr: 0, cpc: 0,
        conversions: 0, cost: 0, roas: 0,
      },
      meta: {
        impressions: 0, clicks: 0, ctr: 0, cpc: 0,
        conversions: 0, cost: 0, roas: 0,
      },
      total: {
        impressions: 0, clicks: 0, conversions: 0, totalSpend: 0,
        totalRevenue: 0, overallROAS: 0,
      },
    }

    return NextResponse.json({ ok: true, connectedPlatforms, period, stats })
  } catch (error: any) {
    return NextResponse.json({ error: 'Reklam verileri getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    const { platform, accessToken, accountId } = body

    if (!platform || !['google', 'meta'].includes(platform)) {
      return NextResponse.json({ error: 'platform "google" veya "meta" olmalı' }, { status: 400 })
    }
    if (!accessToken) return NextResponse.json({ error: 'accessToken gerekli' }, { status: 400 })

    const now = new Date().toISOString()

    if (platform === 'google') {
      await adminDb.collection('esnaflar').doc(esnafId).update({
        'integrations.googleAds': {
          connected: true,
          accountId,
          connectedAt: now,
          commission: 0, // %0 — Wix'ten farklı!
        },
      })
    } else {
      await adminDb.collection('esnaflar').doc(esnafId).update({
        'integrations.metaAds': {
          connected: true,
          accountId,
          connectedAt: now,
          pixelId: body.pixelId,
          catalogSyncEnabled: body.catalogSync || false,
        },
      })
    }

    // Store token securely (encrypted in production)
    await adminDb.collection('esnaf_secrets').doc(esnafId).set({
      [`${platform}_ads_token`]: accessToken,
      updatedAt: now,
    }, { merge: true })

    return NextResponse.json({ ok: true, mesaj: `${platform === 'google' ? 'Google' : 'Meta'} Ads bağlantısı kuruldu` })
  } catch (error: any) {
    return NextResponse.json({ error: 'Bağlantı kurulamadı', detay: error.message }, { status: 500 })
  }
}
