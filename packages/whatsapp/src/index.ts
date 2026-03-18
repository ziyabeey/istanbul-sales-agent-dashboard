/**
 * @kepenk/whatsapp — Barrel Export
 */

// Webhook
export type {
  WebhookVerifyQuery, WebhookPayload, WebhookEntry, WebhookChange,
  WebhookValue, WebhookContact, IncomingMessage, MessageStatus, MessageType,
} from './types/webhook'
export { parseIncomingMessage } from './types/webhook'

// Sender
export type {
  SendTextPayload, SendButtonPayload, SendListPayload, SendTemplatePayload,
  ButtonConfig, ListSection, TemplateParameter,
} from './types/sender'
export {
  buildTextPayload, buildButtonPayload, buildListPayload, buildTemplatePayload,
  getApiUrl,
} from './types/sender'

// Conversation Engine
export type {
  Conversation, ConversationMessage, ToolCallLog, ConversationContext,
  ConversationIntent, PendingBooking, ConversationTool, ConversationToolName,
  EscalationRule, ConversationState,
} from './types/conversation'
export {
  CONVERSATION_TOOL_NAMES, TOOL_COSTS, ESCALATION_RULES,
  isWithin24hWindow, WA_PRICING_TURKEY,
} from './types/conversation'

// Utils
export { generateTimeSlots, getAvailableSlots, isWithinWorkingHours } from './utils/timeSlots'
