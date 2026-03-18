/**
 * Google Search Console API
 * ──────────────────────────
 * GET /api/v1/marketing/seo/search-console — GSC data
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'queries'
    const period = searchParams.get('period') || '30d'

    const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
    const gscConnected = esnafDoc.data()?.integrations?.searchConsole?.verified

    if (!gscConnected) {
      return NextResponse.json({
        ok: false,
        connected: false,
        mesaj: 'Google Search Console bağlı değil. Bağlamak için Ayarlar → Entegrasyonlar sayfasını ziyaret edin.',
      }, { status: 200 })
    }

    // Read from cache (synced via background cron)
    const cacheDoc = await adminDb.collection('esnaflar').doc(esnafId)
      .collection('analytics_cache').doc(`gsc_${mode}_${period}`).get()

    if (!cacheDoc.exists) {
      return NextResponse.json({
        ok: true,
        connected: true,
        data: mode === 'queries' ? { queries: [], totalClicks: 0, totalImpressions: 0, avgPosition: 0, avgCTR: 0 }
          : mode === 'pages' ? { pages: [] }
          : mode === 'indexing' ? { indexedPages: 0, errorPages: 0, validPages: 0 }
          : {},
        mesaj: 'Veriler henüz senkronize edilmedi. İlk senkronizasyon 24 saat içinde tamamlanır.',
      })
    }

    return NextResponse.json({ ok: true, connected: true, period, ...cacheDoc.data() })
  } catch (error: any) {
    return NextResponse.json({ error: 'GSC verileri getirilemedi', detay: error.message }, { status: 500 })
  }
}
