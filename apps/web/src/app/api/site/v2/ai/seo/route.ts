/**
 * V2 AI SEO API — Optimize SEO metadata
 * ───────────────────────────────────────
 * POST /api/site/v2/ai/seo
 * 
 * Body:
 *   - pageTitle: string
 *   - pageContent: string
 *   - context: { businessName, sector, city? }
 */

import { NextResponse } from 'next/server'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { callClaudeJSON, type AITask } from '@/lib/ai/modelRouter'
import { SYSTEM_PROMPTS, buildSEOPrompt } from '@/lib/ai/promptTemplates'

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const body = await request.json()
    const { pageTitle, pageContent, context } = body

    if (!pageTitle || !pageContent || !context?.businessName || !context?.sector) {
      return NextResponse.json({ error: 'pageTitle, pageContent ve context gerekli' }, { status: 400 })
    }

    const seo = await callClaudeJSON({
      task: 'OPTIMIZE_SEO' as AITask,
      systemPrompt: SYSTEM_PROMPTS.seoOptimizer,
      userMessage: buildSEOPrompt(pageTitle, pageContent, context),
      temperature: 0.5,
    })

    return NextResponse.json({ ok: true, seo })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'SEO optimizasyonu başarısız', detay: error.message },
      { status: 500 }
    )
  }
}
