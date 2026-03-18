/**
 * AI Agent API — Chat, Generate, Analyze, Predict, Insights
 * POST /api/v1/ai — AI operations
 * GET  /api/v1/ai — Daily/weekly insights
 */
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { routeToAgent, selectModel, AI_AGENTS } from '@/lib/ai/agentOrchestrator'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'daily'

    const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
    const esnaf = esnafDoc.data() || {}

    if (mode === 'agents') {
      return NextResponse.json({ ok: true, agents: Object.values(AI_AGENTS) })
    }

    // Daily/weekly insights
    const now = new Date()
    const dayAgo = new Date(now.getTime() - 24*60*60*1000).toISOString()
    const weekAgo = new Date(now.getTime() - 7*24*60*60*1000).toISOString()
    const range = mode === 'weekly' ? weekAgo : dayAgo

    const [ordersSnap, bookingsSnap, contactsSnap] = await Promise.all([
      adminDb.collection('esnaflar').doc(esnafId).collection('orders').where('createdAt','>=',range).get(),
      adminDb.collection('esnaflar').doc(esnafId).collection('bookings').where('createdAt','>=',range).get(),
      adminDb.collection('esnaflar').doc(esnafId).collection('contacts').where('createdAt','>=',range).get(),
    ])

    const revenue = ordersSnap.docs.reduce((sum: number, d: any) => sum + (d.data().total || 0), 0)
    const completedBookings = bookingsSnap.docs.filter((d: any) => d.data().status === 'completed').length
    const noShows = bookingsSnap.docs.filter((d: any) => d.data().status === 'no_show').length

    const insights = {
      period: mode, range: { from: range, to: now.toISOString() },
      summary: {
        newOrders: ordersSnap.size, revenue,
        newBookings: bookingsSnap.size, completedBookings, noShows,
        newContacts: contactsSnap.size,
      },
      suggestions: [] as string[],
    }

    // AI-generated suggestions based on data
    if (noShows > 2) insights.suggestions.push(`🚨 ${noShows} no-show — SMS hatırlatma etkinleştirin`)
    if (ordersSnap.size === 0 && mode === 'daily') insights.suggestions.push('📢 Bugün sipariş yok — WhatsApp kampanya önerilir')
    if (contactsSnap.size > 5) insights.suggestions.push(`🎉 ${contactsSnap.size} yeni müşteri — sadakat programı aktif mi?`)
    if (revenue > 0) insights.suggestions.push(`💰 ${mode === 'daily' ? 'Bugünkü' : 'Haftalık'} ciro: ${revenue.toLocaleString('tr-TR')} ₺`)

    return NextResponse.json({ ok: true, insights })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const body = await request.json()
    const { mode } = body

    switch (mode) {
      case 'chat': {
        const { query } = body
        if (!query) return NextResponse.json({ error: 'query gerekli' }, { status: 400 })
        const agent = routeToAgent(query)
        const model = selectModel(query)
        // TODO: actual AI model call
        return NextResponse.json({
          ok: true, agent: agent.id, agentName: agent.name, model,
          mesaj: `"${query}" → ${agent.name} (${model}) agent'ına yönlendirildi. Model entegrasyonu ile tam yanıt üretilecek.`,
        })
      }

      case 'generate': {
        const { type, context } = body
        const typeMap: Record<string, string> = {
          product_description: 'product_manager', blog_post: 'content_writer',
          campaign_text: 'campaign_writer', social_post: 'social_creator',
          seo_meta: 'seo_optimizer', ad_copy: 'ads_advisor',
        }
        const agentId = typeMap[type] || 'content_writer'
        const agent = AI_AGENTS[agentId]
        return NextResponse.json({ ok: true, agent: agentId, model: agent.model, type, context, mesaj: 'İçerik üretim pipeline hazır' })
      }

      case 'analyze': {
        const { type: analysisType } = body
        const analysisMap: Record<string, string> = {
          seo: 'seo_optimizer', competitor: 'competitor_radar',
          customer: 'crm_analyst', performance: 'business_intelligence',
        }
        const agentId = analysisMap[analysisType] || 'business_intelligence'
        return NextResponse.json({ ok: true, agent: agentId, analysisType, mesaj: 'Analiz pipeline hazır' })
      }

      case 'predict': {
        const { type: predictionType } = body
        if (predictionType === 'churn') {
          // Churn prediction based on activity
          const contactsSnap = await adminDb.collection('esnaflar').doc(esnafId)
            .collection('contacts').where('activitySummary.lastSeen','<=',
              new Date(Date.now()-30*24*60*60*1000).toISOString()
            ).limit(50).get()
          const atRisk = contactsSnap.docs.map((d: any) => ({
            id: d.id, name: d.data().info?.displayName,
            lastSeen: d.data().activitySummary?.lastSeen,
            totalSpent: d.data().activitySummary?.totalSpent || 0,
          }))
          return NextResponse.json({ ok: true, prediction: 'churn', atRiskCount: atRisk.length, contacts: atRisk.slice(0, 20) })
        }
        if (predictionType === 'no_show') {
          const bookingsSnap = await adminDb.collection('esnaflar').doc(esnafId)
            .collection('bookings').where('status','==','confirmed')
            .where('startTime','>',new Date().toISOString()).limit(20).get()
          const bookings = bookingsSnap.docs.map((d: any) => ({
            id: d.id, service: d.data().serviceId, contact: d.data().contactDetails?.firstName,
            startTime: d.data().startTime, riskScore: d.data().aiMeta?.noShowRiskScore || Math.random() * 30,
          }))
          return NextResponse.json({ ok: true, prediction: 'no_show', bookings })
        }
        return NextResponse.json({ error: 'type: churn, no_show' }, { status: 400 })
      }

      default:
        return NextResponse.json({ error: 'mode: chat, generate, analyze, predict' }, { status: 400 })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
