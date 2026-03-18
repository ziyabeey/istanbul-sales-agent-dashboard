/**
 * AI Model Client — Claude API Wrapper for all 17 agents
 * ─────────────────────────────────────────────────────────
 * Handles model selection, token limits, cost tracking, PII filtering
 */

import { stripPIIForAI, checkOutputForPII, detectPromptInjection, AI_COST_LIMITS } from '@/lib/security/aiSecurity'

type ModelTier = 'haiku' | 'sonnet' | 'opus'

interface AIModelConfig {
  model: string
  maxTokens: number
  temperature: number
}

const MODEL_MAP: Record<ModelTier, AIModelConfig> = {
  haiku:  { model: 'claude-3-5-haiku-20241022', maxTokens: 4096, temperature: 0.3 },
  sonnet: { model: 'claude-3-5-sonnet-20241022', maxTokens: 8192, temperature: 0.5 },
  opus:   { model: 'claude-3-opus-20240229',     maxTokens: 16384, temperature: 0.7 },
}

interface AICallOptions {
  tier: ModelTier
  systemPrompt: string
  userMessage: string
  esnafId: string
  agentId?: string       // Which of the 17 agents
  temperature?: number
  maxTokens?: number
}

interface AICallResult {
  content: string
  model: string
  inputTokens: number
  outputTokens: number
  latencyMs: number
  piiFiltered: boolean
}

/**
 * Call Claude AI with security, PII filtering, and cost tracking
 */
export async function callAI(options: AICallOptions): Promise<AICallResult> {
  const startTime = Date.now()
  const config = MODEL_MAP[options.tier]

  // 1. Detect prompt injection
  const injection = detectPromptInjection(options.userMessage)
  if (injection.isSuspicious) {
    console.warn(`[AI-SECURITY] Prompt injection detected for esnaf ${options.esnafId}: ${injection.matchedPattern}`)
    return {
      content: 'Bu isteği işleyemiyorum. Lütfen farklı bir şekilde sorun.',
      model: config.model, inputTokens: 0, outputTokens: 0, latencyMs: 0, piiFiltered: false,
    }
  }

  // 2. Strip PII from user message
  const { cleaned: safeMessage, strippedFields } = stripPIIForAI(options.userMessage)
  if (strippedFields.length > 0) {
    console.log(`[AI-PII] Stripped fields: ${strippedFields.join(', ')} for esnaf ${options.esnafId}`)
  }

  // 3. Call Claude API
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    // Fallback: return template response when API key not configured
    return {
      content: generateFallbackResponse(options.tier, options.agentId, safeMessage),
      model: config.model, inputTokens: 0, outputTokens: 0,
      latencyMs: Date.now() - startTime, piiFiltered: strippedFields.length > 0,
    }
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: config.model,
        max_tokens: options.maxTokens || config.maxTokens,
        temperature: options.temperature ?? config.temperature,
        system: options.systemPrompt,
        messages: [{ role: 'user', content: safeMessage }],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Claude API error ${response.status}: ${errorText}`)
    }

    const result = await response.json()
    const content = result.content?.[0]?.text || ''

    // 4. Check output for PII leakage
    const piiCheck = checkOutputForPII(content)

    return {
      content: piiCheck.hasPII ? piiCheck.maskedOutput : content,
      model: config.model,
      inputTokens: result.usage?.input_tokens || 0,
      outputTokens: result.usage?.output_tokens || 0,
      latencyMs: Date.now() - startTime,
      piiFiltered: piiCheck.hasPII || strippedFields.length > 0,
    }
  } catch (error: any) {
    console.error(`[AI-ERROR] ${error.message}`)
    return {
      content: generateFallbackResponse(options.tier, options.agentId, safeMessage),
      model: config.model, inputTokens: 0, outputTokens: 0,
      latencyMs: Date.now() - startTime, piiFiltered: strippedFields.length > 0,
    }
  }
}

/* ═══════ Agent System Prompts ═══════ */

export const AGENT_PROMPTS: Record<string, string> = {
  site_builder: 'Sen kepenk.ai site oluşturma asistanısın. Türk esnafları için sektöre özel web siteleri tasarla. Renk, font, layout önerisi yap.',
  content_writer: 'Sen kepenk.ai içerik yazarısın. Ürün açıklaması, blog yazısı, sayfa içeriği yaz. SEO-uyumlu, Türkçe, sektöre özel.',
  seo_optimizer: 'Sen kepenk.ai SEO uzmanısın. Meta tag optimize et, structured data öner, keyword analizi yap. Türk pazarına özel.',
  design_advisor: 'Sen kepenk.ai tasarım danışmanısın. Renk paleti, font eşleşmesi, layout önerisi ver. Modern ve profesyonel.',
  whatsapp_rep: 'Sen kepenk.ai WhatsApp müşteri temsilcisisin. Türkçe, samimi, yardımcı. Sipariş, randevu, bilgi sorularını yanıtla.',
  inbox_assistant: 'Sen kepenk.ai mesaj asistanısın. Müşteri mesajlarını analiz et, duygu tespiti yap, yanıt önerisi ver.',
  campaign_writer: 'Sen kepenk.ai kampanya metin yazarısın. WhatsApp, SMS, e-posta kampanya metni yaz. Kısa, etkili, çağrıya yönelik.',
  product_manager: 'Sen kepenk.ai ürün yöneticisisin. Ürün açıklaması, fiyat analizi, kategori önerisi yap.',
  order_assistant: 'Sen kepenk.ai sipariş asistanısın. Sipariş durumu, kargo takibi, iade süreci hakkında bilgi ver.',
  booking_agent: 'Sen kepenk.ai randevu asistanısın. Müsait slot bul, randevu oluştur, hatırlatma yap. Doğal konuşma.',
  schedule_optimizer: 'Sen kepenk.ai çizelge optimizasyon uzmanısın. No-show tahmini, kapasite analizi, verimli çizelge öner.',
  crm_analyst: 'Sen kepenk.ai CRM analistsin. Müşteri segmentasyonu, churn tahmini, RFM analizi yap.',
  loyalty_manager: 'Sen kepenk.ai sadakat programı yöneticisisin. Puan hesapla, ödül öner, tier yükseltme analizi yap.',
  ads_advisor: 'Sen kepenk.ai reklam danışmanısın. Google/Meta Ads kampanya önerisi, bütçe dağılımı, hedef kitle analizi.',
  social_creator: 'Sen kepenk.ai sosyal medya içerik üreticisisin. Instagram, Facebook, TikTok içerik ve caption yaz.',
  business_intelligence: 'Sen kepenk.ai iş zekası uzmanısın. Günlük/haftalık rapor, trend analizi, stratejik öneri ver.',
  competitor_radar: 'Sen kepenk.ai rakip analiz uzmanısın. Mahalle/bölge rakip karşılaştırması, fiyat analizi yap.',
}

/** Convenience: Call with agent ID */
export async function callAgent(
  agentId: string,
  userMessage: string,
  esnafId: string,
  tier?: ModelTier,
): Promise<AICallResult> {
  const systemPrompt = AGENT_PROMPTS[agentId] || AGENT_PROMPTS.inbox_assistant
  return callAI({
    tier: tier || selectModelTier(agentId),
    systemPrompt, userMessage, esnafId, agentId,
  })
}

function selectModelTier(agentId: string): ModelTier {
  const opusAgents = ['business_intelligence']
  const haikuAgents = ['design_advisor', 'order_assistant', 'loyalty_manager', 'inbox_assistant']

  if (opusAgents.includes(agentId)) return 'opus'
  if (haikuAgents.includes(agentId)) return 'haiku'
  return 'sonnet'
}

/* ═══════ Fallback Responses ═══════ */

function generateFallbackResponse(tier: ModelTier, agentId?: string, message?: string): string {
  const agentName = agentId ? (AGENT_PROMPTS[agentId] ? agentId : 'genel') : 'genel'
  return `[${tier.toUpperCase()} — ${agentName}] AI model yanıtı: "${(message || '').slice(0, 100)}..." konusunda analiz yapılıyor. Gerçek Claude API entegrasyonu için ANTHROPIC_API_KEY ortam değişkenini ayarlayın.`
}
