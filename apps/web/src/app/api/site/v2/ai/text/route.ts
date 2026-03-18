/**
 * V2 AI Text API — Rewrite & Improve Text
 * ─────────────────────────────────────────
 * POST /api/site/v2/ai/text
 * 
 * Body:
 *   - action: 'rewrite' | 'improve'
 *   - text: string (original text)
 *   - instruction?: string (for rewrite)
 *   - goal?: 'more-engaging' | 'more-professional' | 'seo-friendly' | 'shorter' | 'longer' (for improve)
 *   - context: { businessName, sector }
 */

import { NextResponse } from 'next/server'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { callClaude, type AITask } from '@/lib/ai/modelRouter'
import {
  SYSTEM_PROMPTS,
  buildRewritePrompt,
  buildImprovePrompt,
} from '@/lib/ai/promptTemplates'

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const body = await request.json()
    const { action, text, instruction, goal, context } = body

    if (!text || !context?.businessName || !context?.sector) {
      return NextResponse.json({ error: 'text ve context gerekli' }, { status: 400 })
    }

    let result: string

    if (action === 'rewrite') {
      if (!instruction) {
        return NextResponse.json({ error: 'rewrite için instruction gerekli' }, { status: 400 })
      }
      result = await callClaude({
        task: 'REWRITE_TEXT' as AITask,
        systemPrompt: SYSTEM_PROMPTS.textRewriter,
        userMessage: buildRewritePrompt(text, instruction, context),
        temperature: 0.7,
      })
    } else if (action === 'improve') {
      if (!goal) {
        return NextResponse.json({ error: 'improve için goal gerekli' }, { status: 400 })
      }
      result = await callClaude({
        task: 'IMPROVE_TEXT' as AITask,
        systemPrompt: SYSTEM_PROMPTS.textRewriter,
        userMessage: buildImprovePrompt(text, goal, context),
        temperature: 0.7,
      })
    } else {
      return NextResponse.json({ error: 'action: rewrite veya improve olmalı' }, { status: 400 })
    }

    return NextResponse.json({ ok: true, result })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'AI metin işlemi başarısız', detay: error.message },
      { status: 500 }
    )
  }
}
