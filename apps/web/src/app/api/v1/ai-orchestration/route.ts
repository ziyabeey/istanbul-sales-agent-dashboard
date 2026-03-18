/**
 * AI Agent Orchestration API
 * GET /api/v1/ai-orchestration — Agents, routing, security, collective
 */
import { NextResponse } from 'next/server'
import {
  AI_MODELLER, AI_STACK, MALIYET_LIMITLERI, PRENSIPLER,
  HAIKU_GOREVLER, SONNET_GOREVLER, OPUS_GOREVLER, TIER_MODEL_LIMITLERI,
  AGENTLAR, INTER_AGENT, COLLECTIVE_INTELLIGENCE,
  AI_GUVENLIK, KALITE_FRAMEWORK, DASHBOARD_AI, AI_METRIKLERI,
} from '@/data/aiOrkestrasyonConfig'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'overview'

    const tumGorevler = [...HAIKU_GOREVLER, ...SONNET_GOREVLER, ...OPUS_GOREVLER]

    if (mode === 'overview') {
      return NextResponse.json({
        ok: true, modeller: AI_MODELLER, stack: AI_STACK,
        maliyetLimitleri: MALIYET_LIMITLERI, prensipler: PRENSIPLER,
        sayilar: {
          model: Object.keys(AI_MODELLER).length,
          agent: AGENTLAR.length,
          gorev: tumGorevler.length,
          haiku: HAIKU_GOREVLER.length, sonnet: SONNET_GOREVLER.length, opus: OPUS_GOREVLER.length,
          interAgentOlay: INTER_AGENT.eventDriven.length,
          ogrenmeAnlari: COLLECTIVE_INTELLIGENCE.ogrenmeAnlari.length,
          testSenaryo: KALITE_FRAMEWORK.testSenaryolari.length,
        },
      })
    }

    if (mode === 'routing') {
      return NextResponse.json({
        ok: true, haiku: HAIKU_GOREVLER, sonnet: SONNET_GOREVLER, opus: OPUS_GOREVLER,
        tierLimitleri: TIER_MODEL_LIMITLERI,
      })
    }

    if (mode === 'agents') {
      const id = searchParams.get('id')
      if (id) {
        const a = AGENTLAR.find(x => x.id === id)
        return a ? NextResponse.json({ ok: true, agent: a }) : NextResponse.json({ error: `Agent bulunamadı: ${id}` }, { status: 404 })
      }
      return NextResponse.json({ ok: true, agentlar: AGENTLAR })
    }

    if (mode === 'inter-agent') {
      return NextResponse.json({ ok: true, iletisim: INTER_AGENT })
    }

    if (mode === 'collective') {
      return NextResponse.json({ ok: true, intelligence: COLLECTIVE_INTELLIGENCE })
    }

    if (mode === 'security') {
      return NextResponse.json({ ok: true, guvenlik: AI_GUVENLIK })
    }

    if (mode === 'quality') {
      return NextResponse.json({ ok: true, kalite: KALITE_FRAMEWORK })
    }

    if (mode === 'dashboard-ai') {
      return NextResponse.json({ ok: true, asistan: DASHBOARD_AI })
    }

    if (mode === 'metrics') {
      return NextResponse.json({ ok: true, metrikler: AI_METRIKLERI })
    }

    return NextResponse.json({
      error: 'mode: overview, routing, agents, inter-agent, collective, security, quality, dashboard-ai, metrics',
    }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
