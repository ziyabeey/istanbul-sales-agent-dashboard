/**
 * AI Model Router — Routes AI tasks to the appropriate Claude model.
 * 
 * Model Matrix (from blueprint §8.1):
 *   - Haiku: Simple tasks (typo fix, alt text, button text, format phone)
 *   - Sonnet: Medium tasks (page content, layout, SEO, section gen, rewrite)
 *   - Opus: Complex tasks (full site gen, competitor analysis, strategy)
 */

import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

/* ═══════ Task Types ═══════ */

export type AITask =
  // Haiku — fast, simple
  | 'FIX_TYPO'
  | 'GENERATE_ALT_TEXT'
  | 'SUGGEST_BUTTON_TEXT'
  | 'FORMAT_PHONE'
  | 'TRANSLATE_LABEL'
  // Sonnet — medium complexity
  | 'GENERATE_SECTION'
  | 'GENERATE_PAGE_CONTENT'
  | 'REWRITE_TEXT'
  | 'OPTIMIZE_SEO'
  | 'SUGGEST_LAYOUT'
  | 'SUGGEST_COLORS'
  | 'GENERATE_FAQ'
  | 'IMPROVE_TEXT'
  // Opus — complex
  | 'GENERATE_FULL_SITE'
  | 'ANALYZE_COMPETITOR'
  | 'GENERATE_CONTENT_STRATEGY'
  | 'REDESIGN_SITE'

type ClaudeModel = 'claude-3-5-haiku-latest' | 'claude-sonnet-4-20250514' | 'claude-opus-4-20250514'

const TASK_MODEL_MAP: Record<AITask, ClaudeModel> = {
  // Haiku
  FIX_TYPO: 'claude-3-5-haiku-latest',
  GENERATE_ALT_TEXT: 'claude-3-5-haiku-latest',
  SUGGEST_BUTTON_TEXT: 'claude-3-5-haiku-latest',
  FORMAT_PHONE: 'claude-3-5-haiku-latest',
  TRANSLATE_LABEL: 'claude-3-5-haiku-latest',
  // Sonnet
  GENERATE_SECTION: 'claude-sonnet-4-20250514',
  GENERATE_PAGE_CONTENT: 'claude-sonnet-4-20250514',
  REWRITE_TEXT: 'claude-sonnet-4-20250514',
  OPTIMIZE_SEO: 'claude-sonnet-4-20250514',
  SUGGEST_LAYOUT: 'claude-sonnet-4-20250514',
  SUGGEST_COLORS: 'claude-sonnet-4-20250514',
  GENERATE_FAQ: 'claude-sonnet-4-20250514',
  IMPROVE_TEXT: 'claude-sonnet-4-20250514',
  // Opus
  GENERATE_FULL_SITE: 'claude-opus-4-20250514',
  ANALYZE_COMPETITOR: 'claude-opus-4-20250514',
  GENERATE_CONTENT_STRATEGY: 'claude-opus-4-20250514',
  REDESIGN_SITE: 'claude-opus-4-20250514',
}

export function getModelForTask(task: AITask): ClaudeModel {
  return TASK_MODEL_MAP[task] || 'claude-sonnet-4-20250514'
}

/* ═══════ Call Claude ═══════ */

export interface AICallOptions {
  task: AITask
  systemPrompt: string
  userMessage: string
  maxTokens?: number
  temperature?: number
}

export async function callClaude(options: AICallOptions): Promise<string> {
  const { task, systemPrompt, userMessage, maxTokens = 2048, temperature = 0.7 } = options
  const model = getModelForTask(task)

  const response = await anthropic.messages.create({
    model,
    max_tokens: maxTokens,
    temperature,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }],
  })

  const textBlock = response.content.find(b => b.type === 'text')
  return textBlock?.text || ''
}

/**
 * Call Claude expecting a JSON response.
 * Strips markdown code fences if present.
 */
export async function callClaudeJSON<T = any>(options: AICallOptions): Promise<T> {
  const raw = await callClaude(options)

  // Strip markdown code fences
  let cleaned = raw.trim()
  if (cleaned.startsWith('```json')) cleaned = cleaned.slice(7)
  else if (cleaned.startsWith('```')) cleaned = cleaned.slice(3)
  if (cleaned.endsWith('```')) cleaned = cleaned.slice(0, -3)

  return JSON.parse(cleaned.trim())
}
