/**
 * AI Business Intelligence API
 * ─────────────────────────────
 * GET  /api/v1/marketing/intelligence — AI insights, health score, seasonal, competitors
 * POST /api/v1/marketing/intelligence — Ask AI a question
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import {
  PAZAR_VERILERI, RAKIPLER, OZELLIK_MATRISI, KONUMLANDIRMA,
  HENDEK_KATMANLARI, HEDEF_METRIKLER, YATIRIMCI_HIKAYESI,
  SEKTOR_ONCELIKLENDIRME, TEHDIT_DEGERLENDIRMESI,
} from '@/data/pazarVerileri'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'insights'

    switch (mode) {
      // ═══ YENİ: Pazar Genel Görünümü ═══
      case 'market-overview': {
        return NextResponse.json({
          ok: true,
          pazar: {
            esnafSayisi: PAZAR_VERILERI.esnafSayisi,
            toplamKobi: PAZAR_VERILERI.toplamKobi,
            yeniAcilis2025: PAZAR_VERILERI.yeniAcilis2025,
            sektorDagilimi: PAZAR_VERILERI.sektorDagilimi,
            dijitalOlgunluk: PAZAR_VERILERI.dijitalOlgunluk,
            ekonomi: PAZAR_VERILERI.ekonomi,
          },
          devletDestekleri: PAZAR_VERILERI.devletDestekleri,
          sektorOnceliklendirme: SEKTOR_ONCELIKLENDIRME,
          hedefMetrikler: HEDEF_METRIKLER,
          yatirimciHikayesi: YATIRIMCI_HIKAYESI,
        })
      }

      // ═══ YENİ: Rakip Karşılaştırma Matrisi ═══
      case 'competitor-matrix': {
        const kategori = searchParams.get('kategori') // eticaret, restoran_pos, randevu, global, ai_builder
        let filteredRakipler = RAKIPLER
        if (kategori) filteredRakipler = RAKIPLER.filter(r => r.kategori === kategori)

        return NextResponse.json({
          ok: true,
          rakipler: filteredRakipler.map(r => ({
            id: r.id, ad: r.ad, kategori: r.kategori,
            kullaniciSayisi: r.kullaniciSayisi,
            fiyatlandirma: r.fiyatlandirma,
            gucluYanlar: r.gucluYanlar,
            zayifYanlar: r.zayifYanlar,
            tehditSeviyesi: r.tehditSeviyesi,
            turkiyeMevcut: r.turkiyeMevcut,
            vsKepenk: r.vsKepenk,
          })),
          ozellikMatrisi: OZELLIK_MATRISI,
          hendekKatmanlari: HENDEK_KATMANLARI,
          tehditDegerlendirmesi: TEHDIT_DEGERLENDIRMESI,
        })
      }

      // ═══ YENİ: Konumlandırma & Mesajlaşma ═══
      case 'positioning': {
        return NextResponse.json({
          ok: true,
          konumlandirma: KONUMLANDIRMA,
          sektorOnceliklendirme: SEKTOR_ONCELIKLENDIRME,
        })
      }
      case 'health-score': {
        // Digital health score — weighted 6-factor
        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        const esnaf = esnafDoc.data() || {}

        const scores = {
          seo: 0,         // From SEO score API (cached)
          speed: 0,       // Core Web Vitals
          content: 0,     // Content freshness
          social: 0,      // Social media presence
          reviews: 0,     // Google review rating
          competitor: 0,  // Relative position
        }

        // SEO
        const seoCache = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('analytics_cache').doc('seo_score').get()
        scores.seo = seoCache.exists ? (seoCache.data()?.score || 0) : 50

        // Speed (from Lighthouse cache)
        const speedCache = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('analytics_cache').doc('speed_score').get()
        scores.speed = speedCache.exists ? (speedCache.data()?.score || 0) : 70

        // Content freshness — last update recency
        const lastUpdate = esnaf.lastPublishedAt || esnaf.updatedAt
        if (lastUpdate) {
          const daysSinceUpdate = (Date.now() - new Date(lastUpdate).getTime()) / (1000 * 60 * 60 * 24)
          scores.content = daysSinceUpdate < 7 ? 100 : daysSinceUpdate < 30 ? 70 : daysSinceUpdate < 90 ? 40 : 10
        }

        // Social
        const socialPlatforms = ['instagram', 'facebook', 'tiktok', 'googleBusiness', 'youtube']
        const connectedSocial = socialPlatforms.filter(p => esnaf.integrations?.[p]?.connected).length
        scores.social = Math.min(100, connectedSocial * 20)

        // Reviews
        const gbpCache = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('analytics_cache').doc('gbp_insights').get()
        const avgRating = gbpCache.exists ? (gbpCache.data()?.averageRating || 0) : 0
        scores.reviews = Math.min(100, avgRating * 20)

        // Competitor (from radar cache)
        const radarCache = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('analytics_cache').doc('competitor_rank').get()
        scores.competitor = radarCache.exists ? (radarCache.data()?.score || 0) : 50

        // Weighted overall
        const weights = { seo: 25, speed: 20, content: 15, social: 15, reviews: 15, competitor: 10 }
        const overall = Math.round(
          Object.entries(scores).reduce((sum, [k, v]) => sum + v * (weights[k as keyof typeof weights] / 100), 0)
        )

        return NextResponse.json({ ok: true, overallScore: overall, breakdown: scores, weights })
      }

      case 'seasonal': {
        // Turkish seasonal calendar
        const now = new Date()
        const events = getUpcomingEvents(now)

        return NextResponse.json({
          ok: true,
          upcoming: events.slice(0, 5),
          current: events.find(e => e.isActive),
        })
      }

      case 'competitors': {
        const competitorsSnap = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('competitors').orderBy('rank', 'asc').limit(10).get()

        const competitors = competitorsSnap.docs.map((d: any) => d.data())
        return NextResponse.json({ ok: true, competitors })
      }

      case 'insights':
      default: {
        // AI proactive insights — from cache
        const insightsSnap = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('ai_insights')
          .where('dismissed', '==', false)
          .orderBy('priority', 'asc')
          .limit(10).get()

        const insights = insightsSnap.docs.map((d: any) => ({ id: d.id, ...d.data() }))

        // If no cached insights, generate basic ones
        if (insights.length === 0) {
          return NextResponse.json({
            ok: true,
            insights: [
              { type: 'tip', icon: '💡', message: 'Google Business Profile bağlayarak harita aramalarında görünür olun', priority: 1 },
              { type: 'tip', icon: '📸', message: 'Ürün fotoğraflarınıza alt metin ekleyin — Google Görseller\'de bulunursunuz', priority: 2 },
              { type: 'seasonal', icon: '📅', message: 'Yaklaşan özel günler için kampanya planlamayı unutmayın', priority: 3 },
            ],
          })
        }

        return NextResponse.json({ ok: true, insights })
      }
    }
  } catch (error: any) {
    return NextResponse.json({ error: 'İş zekası getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    const { question } = body

    if (!question) return NextResponse.json({ error: 'question gerekli' }, { status: 400 })

    // TODO: Route to AI with context (modelRouter)
    // For now, return a placeholder response
    return NextResponse.json({
      ok: true,
      answer: `"${question}" sorunuz analiz ediliyor. Bu özellik AI entegrasyonu ile tam çalışacaktır.`,
      model: 'sonnet',
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'AI yanıt verilemedi', detay: error.message }, { status: 500 })
  }
}

/* ═══════ Turkish Seasonal Calendar ═══════ */

function getUpcomingEvents(now: Date) {
  const year = now.getFullYear()
  const events = [
    { name: 'Sevgililer Günü', date: `${year}-02-14`, type: 'commercial', icon: '❤️', duration: 1 },
    { name: 'Anneler Günü', date: `${year}-05-11`, type: 'commercial', icon: '🌸', duration: 1 },
    { name: 'Babalar Günü', date: `${year}-06-15`, type: 'commercial', icon: '👔', duration: 1 },
    { name: 'Yaz Sezonu Başlangıcı', date: `${year}-06-01`, type: 'seasonal', icon: '☀️', duration: 90 },
    { name: 'Okul Açılışı', date: `${year}-09-15`, type: 'seasonal', icon: '📚', duration: 14 },
    { name: '11.11 İndirimi', date: `${year}-11-11`, type: 'commercial', icon: '🛒', duration: 1 },
    { name: 'Black Friday', date: `${year}-11-28`, type: 'commercial', icon: '🏷️', duration: 4 },
    { name: 'Yılbaşı', date: `${year}-12-31`, type: 'holiday', icon: '🎉', duration: 1 },
    { name: 'Ramazan', date: `${year}-03-01`, type: 'religious', icon: '🌙', duration: 30 },
    { name: 'Ramazan Bayramı', date: `${year}-03-31`, type: 'holiday', icon: '🎊', duration: 3 },
    { name: 'Kurban Bayramı', date: `${year}-06-07`, type: 'holiday', icon: '🐑', duration: 4 },
  ].map(e => {
    const eventDate = new Date(e.date)
    const daysUntil = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    const isActive = daysUntil <= 0 && daysUntil > -e.duration
    return { ...e, daysUntil, isActive }
  }).filter(e => e.daysUntil > -e.duration)
    .sort((a, b) => a.daysUntil - b.daysUntil)

  return events
}
