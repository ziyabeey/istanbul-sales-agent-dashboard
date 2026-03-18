/**
 * AI Agent Orchestrator — Model routing + 17 agent registry
 */

type ModelTier = 'haiku' | 'sonnet' | 'opus'

interface AgentConfig {
  id: string
  name: string
  model: ModelTier
  scope: string
  maxLatencyMs: number
}

export const AI_AGENTS: Record<string, AgentConfig> = {
  // SITE & İÇERİK
  site_builder:     { id: 'site_builder',     name: 'Site Builder',        model: 'sonnet', scope: 'Sektör-bazlı site oluşturma', maxLatencyMs: 3000 },
  content_writer:   { id: 'content_writer',   name: 'Content Writer',      model: 'sonnet', scope: 'Sayfa içeriği, ürün açıklaması, blog', maxLatencyMs: 3000 },
  seo_optimizer:    { id: 'seo_optimizer',     name: 'SEO Optimizer',       model: 'sonnet', scope: 'SEO audit, meta tag, structured data', maxLatencyMs: 3000 },
  design_advisor:   { id: 'design_advisor',    name: 'Design Advisor',      model: 'haiku',  scope: 'Renk, font, layout önerisi', maxLatencyMs: 500 },

  // MÜŞTERİ İLETİŞİM
  whatsapp_rep:     { id: 'whatsapp_rep',      name: 'WhatsApp Temsilci',   model: 'sonnet', scope: 'WhatsApp AI müşteri temsilcisi', maxLatencyMs: 3000 },
  inbox_assistant:  { id: 'inbox_assistant',   name: 'Inbox Assistant',     model: 'haiku',  scope: 'Mesaj önerisi, sentiment analizi', maxLatencyMs: 500 },
  campaign_writer:  { id: 'campaign_writer',   name: 'Campaign Writer',     model: 'sonnet', scope: 'Kampanya metni (WA/SMS/email)', maxLatencyMs: 3000 },

  // E-TİCARET
  product_manager:  { id: 'product_manager',   name: 'Product Manager',     model: 'sonnet', scope: 'Ürün katalog yönetimi, fiyat analizi', maxLatencyMs: 3000 },
  order_assistant:  { id: 'order_assistant',    name: 'Order Assistant',     model: 'haiku',  scope: 'Sipariş durumu, kargo takibi', maxLatencyMs: 500 },

  // RANDEVU
  booking_agent:    { id: 'booking_agent',      name: 'Booking Agent',       model: 'sonnet', scope: 'WhatsApp conversational booking', maxLatencyMs: 3000 },
  schedule_optimizer:{ id: 'schedule_optimizer', name: 'Schedule Optimizer', model: 'sonnet', scope: 'Çizelge optimizasyonu, no-show tahmini', maxLatencyMs: 3000 },

  // CRM & SADAKAT
  crm_analyst:      { id: 'crm_analyst',        name: 'CRM Analyst',         model: 'sonnet', scope: 'Müşteri segmentasyon, churn tahmini', maxLatencyMs: 3000 },
  loyalty_manager:  { id: 'loyalty_manager',     name: 'Loyalty Manager',     model: 'haiku',  scope: 'Puan hesaplama, ödül önerisi', maxLatencyMs: 500 },

  // PAZARLAMA
  ads_advisor:      { id: 'ads_advisor',         name: 'Ads Advisor',         model: 'sonnet', scope: 'Google/Meta reklam önerisi', maxLatencyMs: 3000 },
  social_creator:   { id: 'social_creator',      name: 'Social Creator',      model: 'sonnet', scope: 'Sosyal medya içerik üretimi', maxLatencyMs: 3000 },

  // İŞ ZEKASI
  business_intelligence: { id: 'business_intelligence', name: 'Business Intelligence', model: 'opus',   scope: 'Günlük özet, trend analizi', maxLatencyMs: 15000 },
  competitor_radar: { id: 'competitor_radar',    name: 'Competitor Radar',    model: 'sonnet', scope: 'Rakip analizi, mahalle sıralaması', maxLatencyMs: 3000 },
}

/**
 * Route a natural language query to the best agent
 */
export function routeToAgent(query: string): AgentConfig {
  const q = query.toLowerCase()

  // Keyword-based routing
  if (/sipariş|ürün|stok|envanter|fiyat/.test(q)) {
    return /sipariş|kargo|teslimat/.test(q) ? AI_AGENTS.order_assistant : AI_AGENTS.product_manager
  }
  if (/randevu|booking|müsait|slot/.test(q)) return AI_AGENTS.booking_agent
  if (/seo|arama|google.*sıra|index/.test(q)) return AI_AGENTS.seo_optimizer
  if (/kampanya|reklam|ads|bütçe/.test(q)) return AI_AGENTS.ads_advisor
  if (/müşteri|segment|churn|crm/.test(q)) return AI_AGENTS.crm_analyst
  if (/sosyal|instagram|facebook|post/.test(q)) return AI_AGENTS.social_creator
  if (/blog|yazı|içerik/.test(q)) return AI_AGENTS.content_writer
  if (/sadakat|puan|ödül/.test(q)) return AI_AGENTS.loyalty_manager
  if (/rakip|rekabet/.test(q)) return AI_AGENTS.competitor_radar
  if (/whatsapp|mesaj|chatbot/.test(q)) return AI_AGENTS.whatsapp_rep
  if (/site|sayfa|tasarım|tema/.test(q)) return AI_AGENTS.site_builder
  if (/strateji|trend|gelir|performans|rapor/.test(q)) return AI_AGENTS.business_intelligence
  if (/program|çizelge|vardiya/.test(q)) return AI_AGENTS.schedule_optimizer

  // Default to business intelligence for general queries
  return AI_AGENTS.business_intelligence
}

/**
 * Select model tier based on query complexity
 */
export function selectModel(query: string): ModelTier {
  const q = query.toLowerCase()
  const wordCount = q.split(/\s+/).length

  // Short, factual queries → haiku
  if (wordCount <= 8 && /kaç|bugün|ne zaman|durum/.test(q)) return 'haiku'
  // Strategy/analysis → opus
  if (/strateji|plan|analiz|karşılaştır|tahmin|öner/.test(q) && wordCount > 15) return 'opus'
  // Default → sonnet
  return 'sonnet'
}
