/**
 * @kepenk/support — Barrel Export
 */

// Ticket
export type {
  Ticket, TicketMessage, TicketAttachment,
  TicketStatus, TicketPriority, TicketCategory, SLATarget,
} from './types/ticket'
export {
  SLA_TARGETS, PRIORITY_LABELS, STATUS_LABELS,
  isSLABreached, getSLARemaining,
} from './types/ticket'

// Knowledge Base (RAG)
export type {
  KBArticle, KBChunk, KBCategory,
  RAGSearchResult, AIResponseResult,
} from './types/knowledgeBase'
export { KB_CATEGORY_LABELS, CONFIDENCE_THRESHOLDS } from './types/knowledgeBase'
