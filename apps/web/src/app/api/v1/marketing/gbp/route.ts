/**
 * Google Business Profile API
 * ────────────────────────────
 * GET  /api/v1/marketing/gbp/reviews — List reviews
 * POST /api/v1/marketing/gbp/reviews — Reply to review
 * GET  /api/v1/marketing/gbp/insights — GBP performance insights
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'reviews'

    if (mode === 'insights') {
      const insightsDoc = await adminDb.collection('esnaflar').doc(esnafId)
        .collection('analytics_cache').doc('gbp_insights').get()

      return NextResponse.json({
        ok: true,
        insights: insightsDoc.exists ? insightsDoc.data() : {
          totalSearches: 0,
          directSearches: 0,
          discoverySearches: 0,
          totalViews: 0,
          mapViews: 0,
          searchViews: 0,
          websiteClicks: 0,
          phoneCallClicks: 0,
          directionClicks: 0,
          photoViews: 0,
          averageRating: 0,
          totalReviews: 0,
        },
      })
    }

    // Reviews
    const snapshot = await adminDb.collection('esnaflar').doc(esnafId)
      .collection('gbp_reviews')
      .orderBy('createdAt', 'desc')
      .limit(50).get()

    const reviews = snapshot.docs.map((d: any) => d.data())
    return NextResponse.json({ ok: true, reviews })
  } catch (error: any) {
    return NextResponse.json({ error: 'GBP verileri getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    const { reviewId, replyText } = body

    if (!reviewId || !replyText) {
      return NextResponse.json({ error: 'reviewId ve replyText gerekli' }, { status: 400 })
    }

    // Save reply in Firestore
    await adminDb.collection('esnaflar').doc(esnafId)
      .collection('gbp_reviews').doc(reviewId)
      .update({
        reply: replyText,
        repliedAt: new Date().toISOString(),
      })

    // TODO: Actually post via Google Business Profile API
    // await gbpApi.accounts.locations.reviews.updateReply(...)

    return NextResponse.json({ ok: true, mesaj: 'Yorum yanıtlandı' })
  } catch (error: any) {
    return NextResponse.json({ error: 'Yanıt gönderilemedi', detay: error.message }, { status: 500 })
  }
}
