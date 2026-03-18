/**
 * AI Blog Post Generator
 * ───────────────────────
 * POST /api/v1/blog/ai-generate — AI-powered blog content
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    const { mode } = body

    const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
    const esnaf = esnafDoc.data() || {}
    const sector = esnaf.spiSectorId || esnaf.spiCategory || 'genel'

    switch (mode) {
      case 'generate_post': {
        // AI generates full blog post
        const { topic, targetKeyword, tone, length } = body
        if (!topic) return NextResponse.json({ error: 'topic gerekli' }, { status: 400 })

        // Sector-specific blog templates
        const sectorPrompts: Record<string, string[]> = {
          kasap: ['Et muhafaza ipuçları', 'Sezonluk et rehberi', 'Bayram et hazırlığı', 'Sağlıklı et pişirme'],
          berber: ['Saç bakım rehberi', 'Erkek saç trendleri', 'Sakal bakımı', 'Cilt bakımı'],
          restoran: ['Tarif paylaşımları', 'Mevsimlik menü', 'Şef önerileri'],
          eczane: ['Sağlık haberleri', 'Mevsimsel hastalıklar', 'İlaç kullanımı'],
          kuafor: ['Saç bakım trendleri', 'Boya sonrası bakım', 'Saç sağlığı'],
        }

        // TODO: Actual AI model call (Claude Sonnet)
        // For now, return structured prompt for AI
        const targetLength = length === 'short' ? '500-800' : length === 'long' ? '1500-2500' : '800-1500'

        return NextResponse.json({
          ok: true,
          aiPrompt: {
            role: 'SEO-optimized blog writer for Turkish small business',
            context: { sector, businessName: esnaf.isletmeAdi, location: esnaf.il },
            topic,
            targetKeyword,
            tone: tone || 'professional_friendly',
            length: targetLength,
            sectorTemplates: sectorPrompts[sector] || [],
          },
          mesaj: 'AI blog yazısı üretim prompt\'u hazır. Model entegrasyonu ile tam içerik üretilecek.',
        })
      }

      case 'seo_optimize': {
        // Optimize existing post for SEO
        const { postId } = body
        if (!postId) return NextResponse.json({ error: 'postId gerekli' }, { status: 400 })

        const postDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('blog_posts').doc(postId).get()
        if (!postDoc.exists) return NextResponse.json({ error: 'Yazı bulunamadı' }, { status: 404 })

        const post = postDoc.data()!
        const content = post.content || ''
        const title = post.title || ''

        // Basic SEO analysis
        const wordCount = content.split(/\s+/).filter(Boolean).length
        const hasHeadings = /^#{1,3}\s/m.test(content)
        const hasImages = post.images?.length > 0 || !!post.coverImage
        const hasLinks = /\[.*?\]\(.*?\)/.test(content)
        const titleLength = title.length
        const descLength = (post.seo?.description || '').length

        const score = [
          wordCount >= 300 ? 20 : Math.round(wordCount / 300 * 20),
          hasHeadings ? 15 : 0,
          hasImages ? 15 : 0,
          hasLinks ? 10 : 0,
          titleLength >= 30 && titleLength <= 60 ? 15 : titleLength > 0 ? 8 : 0,
          descLength >= 120 && descLength <= 160 ? 15 : descLength > 0 ? 8 : 0,
          post.tags?.length >= 3 ? 10 : post.tags?.length > 0 ? 5 : 0,
        ].reduce((a: number, b: number) => a + b, 0)

        const recommendations: string[] = []
        if (wordCount < 300) recommendations.push('İçerik en az 300 kelime olmalı (şu an: ' + wordCount + ')')
        if (!hasHeadings) recommendations.push('Alt başlıklar (## H2, ### H3) ekleyin')
        if (!hasImages) recommendations.push('En az 1 görsel ekleyin')
        if (!hasLinks) recommendations.push('İç veya dış bağlantılar ekleyin')
        if (titleLength > 60) recommendations.push('Başlık 60 karakteri geçmemeli')
        if (descLength === 0) recommendations.push('Meta description ekleyin (120-160 karakter)')
        if (!post.tags?.length) recommendations.push('En az 3 etiket ekleyin')

        await adminDb.collection('esnaflar').doc(esnafId).collection('blog_posts').doc(postId)
          .update({ aiSeoScore: score })

        return NextResponse.json({ ok: true, seoScore: score, recommendations, wordCount })
      }

      case 'content_calendar': {
        // Generate content calendar
        const weeks = body.weeks || 4

        const sectorTopics: Record<string, string[]> = {
          kasap: ['Et saklama yöntemleri', 'Haftalık özel menü önerileri', 'Mevsimsel et rehberi', 'Sağlıklı pişirme teknikleri', 'Bayram hazırlıkları', 'Et alırken dikkat edilecekler', 'Mangal sezonu ipuçları', 'Protein kaynakları'],
          berber: ['Bu sezonun saç trendleri', 'Evde saç bakımı', 'Sakal modelleri rehberi', 'Cilt bakım rutini', 'Saç dökülmesine çözümler', 'Düğün öncesi bakım', 'Erkek bakım ürünleri', 'Saç şekillendirme ipuçları'],
          default: ['Sektör haberleri', 'Müşteri hikayeleri', 'İpuçları ve püf noktaları', 'Ürün tanıtımları', 'Sezonsal içerik', 'SSS yanıtları', 'Ekip tanıtımı', 'Kampanya duyuruları'],
        }

        const topics = sectorTopics[sector] || sectorTopics.default
        const calendar = Array.from({ length: Math.min(weeks, 12) }, (_, i) => ({
          week: i + 1,
          topic: topics[i % topics.length],
          suggestedDate: new Date(Date.now() + (i * 7 + 2) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          type: i % 3 === 0 ? 'rehber' : i % 3 === 1 ? 'ipucu' : 'haber',
        }))

        return NextResponse.json({ ok: true, calendar, weeks: calendar.length })
      }

      default:
        return NextResponse.json({ error: 'mode: generate_post, seo_optimize, content_calendar' }, { status: 400 })
    }
  } catch (error: any) {
    return NextResponse.json({ error: 'AI işlemi başarısız', detay: error.message }, { status: 500 })
  }
}
