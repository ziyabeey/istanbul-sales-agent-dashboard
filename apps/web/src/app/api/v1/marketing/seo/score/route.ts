/**
 * SEO Score & Audit API
 * ──────────────────────
 * GET /api/v1/marketing/seo/score — Site SEO score (0-100)
 * GET /api/v1/marketing/seo/audit — Detailed SEO audit with recommendations
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'score'

    // Get site data
    const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
    if (!esnafDoc.exists) return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })

    const esnaf = esnafDoc.data()!

    // Get pages
    const pagesSnap = await adminDb.collection('esnaflar').doc(esnafId).collection('pages').get()
    const pages = pagesSnap.docs.map((d: any) => d.data())

    // Audit checks
    const checks = {
      titles: { score: 0, max: 20, issues: [] as string[] },
      descriptions: { score: 0, max: 20, issues: [] as string[] },
      altTexts: { score: 0, max: 15, issues: [] as string[] },
      siteSpeed: { score: 0, max: 20, issues: [] as string[] },
      googleRegistration: { score: 0, max: 15, issues: [] as string[] },
      contentQuality: { score: 0, max: 10, issues: [] as string[] },
    }

    // 1. Title check (20 pts)
    const pagesWithTitle = pages.filter((p: any) => p.seo?.title && p.seo.title.length >= 10 && p.seo.title.length <= 60)
    const titleRatio = pages.length > 0 ? pagesWithTitle.length / pages.length : 0
    checks.titles.score = Math.round(titleRatio * 20)
    if (titleRatio < 1) {
      const missing = pages.length - pagesWithTitle.length
      checks.titles.issues.push(`${missing} sayfada SEO başlığı eksik veya uygunsuz uzunlukta`)
    }

    // 2. Description check (20 pts)
    const pagesWithDesc = pages.filter((p: any) => p.seo?.description && p.seo.description.length >= 50 && p.seo.description.length <= 160)
    const descRatio = pages.length > 0 ? pagesWithDesc.length / pages.length : 0
    checks.descriptions.score = Math.round(descRatio * 20)
    if (descRatio < 1) {
      const missing = pages.length - pagesWithDesc.length
      checks.descriptions.issues.push(`${missing} sayfada meta açıklama eksik veya uygunsuz`)
    }

    // 3. Alt text check (15 pts)
    // Estimate from products
    const productsSnap = await adminDb.collection('esnaflar').doc(esnafId).collection('products').limit(20).get()
    const products = productsSnap.docs.map((d: any) => d.data())
    const productsWithAlt = products.filter((p: any) => p.images?.some((img: any) => img.alt))
    const altRatio = products.length > 0 ? productsWithAlt.length / products.length : 1
    checks.altTexts.score = Math.round(altRatio * 15)
    if (altRatio < 1) {
      checks.altTexts.issues.push(`${products.length - productsWithAlt.length} ürün görselinde alt metin eksik`)
    }

    // 4. Site speed (20 pts) — estimated
    checks.siteSpeed.score = 15 // Default: decent (actual measurement via Lighthouse)
    checks.siteSpeed.issues.push('Detaylı hız testi için Lighthouse raporu çalıştırın')

    // 5. Google registration (15 pts)
    const hasGSC = esnaf.integrations?.searchConsole?.verified
    const hasGBP = esnaf.integrations?.googleBusiness?.connected
    checks.googleRegistration.score = (hasGSC ? 8 : 0) + (hasGBP ? 7 : 0)
    if (!hasGSC) checks.googleRegistration.issues.push('Google Search Console bağlı değil')
    if (!hasGBP) checks.googleRegistration.issues.push('Google Business Profile bağlı değil')

    // 6. Content quality (10 pts)
    const hasAbout = pages.some((p: any) => p.slug === 'hakkimizda' || p.slug === 'about')
    const hasContact = pages.some((p: any) => p.slug === 'iletisim' || p.slug === 'contact')
    checks.contentQuality.score = (hasAbout ? 5 : 0) + (hasContact ? 5 : 0)
    if (!hasAbout) checks.contentQuality.issues.push('"Hakkımızda" sayfası oluşturun')
    if (!hasContact) checks.contentQuality.issues.push('"İletişim" sayfası oluşturun')

    const totalScore = Object.values(checks).reduce((sum, c) => sum + c.score, 0)

    if (mode === 'audit') {
      return NextResponse.json({
        ok: true,
        score: totalScore,
        maxScore: 100,
        breakdown: checks,
        pagesAudited: pages.length,
        productsAudited: products.length,
      })
    }

    return NextResponse.json({
      ok: true,
      score: totalScore,
      maxScore: 100,
      breakdown: {
        titles: checks.titles.score,
        descriptions: checks.descriptions.score,
        altTexts: checks.altTexts.score,
        siteSpeed: checks.siteSpeed.score,
        googleRegistration: checks.googleRegistration.score,
        contentQuality: checks.contentQuality.score,
      },
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'SEO analizi başarısız', detay: error.message }, { status: 500 })
  }
}
