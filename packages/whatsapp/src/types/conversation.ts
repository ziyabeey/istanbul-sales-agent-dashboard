/**
 * @kepenk/whatsapp — Conversation Engine Types
 *
 * Claude tool-use powered conversation state machine.
 * States: idle → active → (human_handoff | completed)
 */

export type ConversationState = 'idle' | 'active' | 'human_handoff' | 'completed'

export interface Conversation {
  id: string                     // = phoneNumber
  esnafId: string
  state: ConversationState
  messageHistory: ConversationMessage[]
  context: ConversationContext
  humanAgent?: string            // assigned agent name/id
  createdAt: string
  lastMessageAt: string
  updatedAt: string
}

export interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  toolCalls?: ToolCallLog[]
}

export interface ToolCallLog {
  name: string
  input: Record<string, unknown>
  result: Record<string, unknown>
  success: boolean
}

export interface ConversationContext {
  customerName?: string
  lastIntent?: ConversationIntent
  pendingBooking?: PendingBooking
  failedToolCount: number        // 3+ → auto escalate
}

export type ConversationIntent =
  | 'greeting'
  | 'booking_inquiry'
  | 'booking_create'
  | 'order_status'
  | 'services_inquiry'
  | 'pricing_inquiry'
  | 'complaint'
  | 'human_request'
  | 'other'

export interface PendingBooking {
  date?: string
  time?: string
  serviceId?: string
  customerName?: string
  customerPhone?: string
  notes?: string
}

// ═══ Claude Tool Definitions ═══

export interface ConversationTool {
  name: string
  description: string
  inputSchema: Record<string, unknown>
}

export const CONVERSATION_TOOL_NAMES = [
  'check_availability',
  'create_booking',
  'get_order_status',
  'get_services_list',
  'generate_payment_link',
  'escalate_to_human',
] as const

export type ConversationToolName = typeof CONVERSATION_TOOL_NAMES[number]

/**
 * Tool costs for billing/analytics.
 */
export const TOOL_COSTS: Record<ConversationToolName, number> = {
  check_availability: 0,
  create_booking: 1,
  get_order_status: 0,
  get_services_list: 0,
  generate_payment_link: 1,
  escalate_to_human: 0,
}

// ═══ Escalation Rules ═══

export interface EscalationRule {
  trigger: string
  action: 'escalate' | 'warn'
  priority: 'low' | 'medium' | 'high'
}

export const ESCALATION_RULES: EscalationRule[] = [
  { trigger: 'customer_requests_human', action: 'escalate', priority: 'medium' },
  { trigger: 'failed_tools_3_plus', action: 'escalate', priority: 'high' },
  { trigger: 'complaint_detected', action: 'escalate', priority: 'high' },
  { trigger: 'sensitive_topic', action: 'warn', priority: 'low' },
]

// ═══ 24h Window ═══

/**
 * Check if we're within the 24h conversational window.
 * Inside window: any message type OK (free).
 * Outside window: only approved templates.
 */
export function isWithin24hWindow(lastCustomerMessageAt: string): boolean {
  const elapsed = Date.now() - new Date(lastCustomerMessageAt).getTime()
  return elapsed < 24 * 60 * 60 * 1000
}

// ═══ Pricing (Turkey 2025) ═══

export const WA_PRICING_TURKEY = {
  service: 0,          // free since Nov 2024
  utility_in_window: 0,
  utility_out_window: 0.0053,  // USD per msg
  marketing: 0.0109,
  authentication: 0.0203,
} as const
