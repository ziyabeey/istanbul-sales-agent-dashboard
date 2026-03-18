/**
 * V2 AI Section API — Generate section content via AI
 * ────────────────────────────────────────────────────
 * POST /api/site/v2/ai/section
 * 
 * Body:
 *   - sectionType: string
 *   - context: { businessName, sector, slogan?, services?, address?, phone? }
 */

import { NextResponse } from 'next/server'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { callClaudeJSON, type AITask } from '@/lib/ai/modelRouter'
import { SYSTEM_PROMPTS, buildSectionPrompt } from '@/lib/ai/promptTemplates'

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const body = await request.json()
    const { sectionType, context } = body

    if (!sectionType || !context?.businessName || !context?.sector) {
      return NextResponse.json({ error: 'sectionType ve context gerekli' }, { status: 400 })
    }

    const content = await callClaudeJSON({
      task: 'GENERATE_SECTION' as AITask,
      systemPrompt: SYSTEM_PROMPTS.sectionGenerator,
      userMessage: buildSectionPrompt(sectionType, context),
      temperature: 0.8,
    })

    return NextResponse.json({ ok: true, content })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Bölüm oluşturma başarısız', detay: error.message },
      { status: 500 }
    )
  }
}
