/**
 * AI Product Generation
 * ─────────────────────
 * POST /api/v1/ecom/products/ai-generate
 * 
 * Takes minimal product info → generates full product content:
 *   - Professional Turkish description
 *   - Short description
 *   - SEO (title, description, slug)
 *   - Suggested tags
 *   - Info sections (iade politikası, bakım, vb.)
 */

import { NextResponse } from 'next/server'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { callClaudeJSON } from '@/lib/ai/modelRouter'
import type { AITask } from '@/lib/ai/modelRouter'

interface AIProductInput {
  name: string
  category: string
  sector: string
  price?: number
  keywords?: string[]
  existingDescription?: string
  action: 'generate' | 'improve' | 'seo_only'
}

const SYSTEM_PROMPT = `Sen Türkiye'deki küçük işletmeler (esnaf) için profesyonel ürün içeriği oluşturan bir AI asistanısın.

KURALLAR:
- Tüm içerik Türkçe olmalı
- Doğal, ikna edici ve SEO uyumlu yaz
- Fiyat belirtme — sadece açıklama ve özellikler
- Emoji kullanma, profesyonel ton kullan
- Ürün açıklamaları 200-500 kelime arası olmalı
- Anahtar kelimeleri doğal şekilde kullan
- Hedef kitle: Türk tüketiciler`

function buildProductPrompt(input: AIProductInput): string {
  const { name, category, sector, price, keywords, existingDescription, action } = input

  if (action === 'improve' && existingDescription) {
    return `Bu ürün açıklamasını geliştir:

Ürün: ${name}
Kategori: ${category}
Sektör: ${sector}
Mevcut Açıklama: ${existingDescription}

Daha profesyonel, SEO uyumlu ve ikna edici hale getir.

JSON formatında yanıt ver:
{
  "description": "Geliştirilmiş açıklama",
  "shortDescription": "Max 300 karakter kısa açıklama",
  "seo": { "title": "Max 60 karakter", "description": "Max 160 karakter", "slug": "url-uyumlu-slug" },
  "tags": ["etiket1", "etiket2"],
  "infoSections": [{ "title": "Bölüm Başlığı", "content": "İçerik" }]
}`
  }

  if (action === 'seo_only') {
    return `Bu ürün için SEO optimizasyonu yap:

Ürün: ${name}
Kategori: ${category}
Sektör: ${sector}
${existingDescription ? `Açıklama: ${existingDescription}` : ''}

JSON formatında yanıt ver:
{
  "seo": { "title": "Max 60 karakter SEO başlığı", "description": "Max 160 karakter meta açıklama", "slug": "url-uyumlu-slug" },
  "tags": ["seo", "etiketleri"]
}`
  }

  return `Bu ürün için tam içerik oluştur:

Ürün Adı: ${name}
Kategori: ${category}
Sektör: ${sector}
${price ? `Yaklaşık Fiyat: ₺${price}` : ''}
${keywords?.length ? `Anahtar Kelimeler: ${keywords.join(', ')}` : ''}

JSON formatında yanıt ver:
{
  "description": "Profesyonel ürün açıklaması (200-500 kelime)",
  "shortDescription": "Kısa açıklama (max 300 karakter)",
  "seo": {
    "title": "SEO başlığı (max 60 karakter)",
    "description": "Meta açıklama (max 160 karakter)",
    "slug": "url-uyumlu-slug"
  },
  "tags": ["ilgili", "etiketler", "max10"],
  "infoSections": [
    { "title": "Ürün Özellikleri", "content": "Detaylı özellik bilgisi" },
    { "title": "İade ve Değişim", "content": "İade politikası" },
    { "title": "Teslimat Bilgisi", "content": "Kargo bilgisi" }
  ],
  "suggestedOptions": [
    { "name": "Beden", "choices": ["S", "M", "L", "XL"] }
  ]
}`
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body: AIProductInput = await request.json()

    if (!body.name || !body.category || !body.sector) {
      return NextResponse.json({ error: 'name, category ve sector gerekli' }, { status: 400 })
    }

    const action = body.action || 'generate'
    const userPrompt = buildProductPrompt({ ...body, action })

    const task: AITask = action === 'seo_only' ? 'OPTIMIZE_SEO' : 'GENERATE_SECTION'

    const result = await callClaudeJSON({
      task,
      systemPrompt: SYSTEM_PROMPT,
      userMessage: userPrompt,
    })

    return NextResponse.json({
      ok: true,
      action,
      generated: result,
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'AI oluşturma başarısız', detay: error.message }, { status: 500 })
  }
}
