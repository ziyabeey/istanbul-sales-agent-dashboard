/**
 * AI SEO Recommendations API
 * ───────────────────────────
 * GET /api/v1/marketing/seo/recommendations — AI SEO önerileri
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
    const esnaf = esnafDoc.data() || {}

    const pagesSnap = await adminDb.collection('esnaflar').doc(esnafId).collection('pages').get()
    const pages = pagesSnap.docs.map((d: any) => d.data())

    const productsSnap = await adminDb.collection('esnaflar').doc(esnafId).collection('products').limit(50).get()
    const products = productsSnap.docs.map((d: any) => d.data())

    const recommendations: { type: string; priority: 'high' | 'medium' | 'low'; icon: string; message: string; autoFixable: boolean }[] = []

    // Missing meta tags
    const noTitle = pages.filter((p: any) => !p.seo?.title)
    if (noTitle.length > 0) {
      recommendations.push({
        type: 'meta_tags',
        priority: 'high',
        icon: '📝',
        message: `${noTitle.length} sayfanızda SEO başlığı eksik — AI ile oluşturalım mı?`,
        autoFixable: true,
      })
    }

    const noDesc = pages.filter((p: any) => !p.seo?.description)
    if (noDesc.length > 0) {
      recommendations.push({
        type: 'meta_description',
        priority: 'high',
        icon: '📝',
        message: `${noDesc.length} sayfanızda meta açıklama eksik — AI ile oluşturalım mı?`,
        autoFixable: true,
      })
    }

    // Missing alt texts
    const noAlt = products.filter((p: any) => p.images?.some((img: any) => !img.alt))
    if (noAlt.length > 0) {
      recommendations.push({
        type: 'alt_text',
        priority: 'medium',
        icon: '🖼️',
        message: `${noAlt.length} ürün görselinizde alt metin yok — otomatik ekleyelim mi?`,
        autoFixable: true,
      })
    }

    // Google integrations
    if (!esnaf.integrations?.searchConsole?.verified) {
      recommendations.push({
        type: 'gsc_connection',
        priority: 'high',
        icon: '🔍',
        message: 'Google Search Console bağlı değil — Google aramalarda görünürlüğünüzü takip edemiyorsunuz',
        autoFixable: false,
      })
    }

    if (!esnaf.integrations?.googleBusiness?.connected) {
      recommendations.push({
        type: 'gbp_connection',
        priority: 'high',
        icon: '📍',
        message: 'Google Business Profile bağlı değil — Google Haritalar\'da daha görünür olun',
        autoFixable: false,
      })
    }

    // Content suggestions
    const hasAbout = pages.some((p: any) => p.slug === 'hakkimizda' || p.slug === 'about')
    if (!hasAbout) {
      recommendations.push({
        type: 'content',
        priority: 'medium',
        icon: '📄',
        message: '"Hakkımızda" sayfası oluşturun — güven oluşturur ve SEO\'ya katkı sağlar',
        autoFixable: true,
      })
    }

    const hasFAQ = pages.some((p: any) => p.slug === 'sss' || p.slug === 'faq')
    if (!hasFAQ) {
      recommendations.push({
        type: 'content',
        priority: 'low',
        icon: '❓',
        message: 'SSS (Sıkça Sorulan Sorular) sayfası ekleyin — Google\'da "Soru-Cevap" olarak görünebilir',
        autoFixable: true,
      })
    }

    // Performance
    recommendations.push({
      type: 'performance',
      priority: 'low',
      icon: '⚡',
      message: 'Görselleri WebP/AVIF formatına dönüştürün — sayfa hızını artırır',
      autoFixable: true,
    })

    return NextResponse.json({
      ok: true,
      recommendations: recommendations.sort((a, b) => {
        const order = { high: 0, medium: 1, low: 2 }
        return order[a.priority] - order[b.priority]
      }),
      totalIssues: recommendations.length,
      autoFixable: recommendations.filter(r => r.autoFixable).length,
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Öneriler getirilemedi', detay: error.message }, { status: 500 })
  }
}
