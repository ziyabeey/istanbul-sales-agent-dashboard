/**
 * @kepenk/support — Ticket Types
 */

export type TicketStatus = 'open' | 'assigned' | 'in_progress' | 'waiting_customer' | 'resolved' | 'closed'
export type TicketPriority = 'P1' | 'P2' | 'P3' | 'P4'
export type TicketCategory = 'billing' | 'technical' | 'feature_request' | 'bug' | 'account' | 'other'

export interface Ticket {
  id: string
  userId: string
  siteId?: string

  // Content
  subject: string
  description: string
  category: TicketCategory
  attachments?: TicketAttachment[]

  // Status
  status: TicketStatus
  priority: TicketPriority

  // Assignment
  assignedTo?: string
  assignedAt?: string

  // AI
  aiResponse?: string
  aiConfidence?: number       // 0-1
  aiResolved?: boolean
  aiSourceArticleIds?: string[]

  // SLA
  slaDeadline?: string
  slaBreached?: boolean

  // Messages
  messages: TicketMessage[]

  // Meta
  createdAt: string
  updatedAt: string
  resolvedAt?: string
  closedAt?: string
}

export interface TicketAttachment {
  url: string
  name: string
  size: number
}

export interface TicketMessage {
  id: string
  senderId: string
  senderType: 'customer' | 'agent' | 'ai'
  content: string
  attachments?: { url: string; name: string }[]
  createdAt: string
}

// ═══ SLA Definitions ═══

export interface SLATarget {
  firstResponseMinutes: number
  resolutionMinutes: number
}

export const SLA_TARGETS: Record<TicketPriority, SLATarget> = {
  P1: { firstResponseMinutes: 15, resolutionMinutes: 240 },      // 15dk / 4 saat
  P2: { firstResponseMinutes: 60, resolutionMinutes: 480 },      // 1sa / 8 saat
  P3: { firstResponseMinutes: 240, resolutionMinutes: 2880 },    // 4sa / 2 iş günü
  P4: { firstResponseMinutes: 1440, resolutionMinutes: 7200 },   // 1 gün / 5 iş günü
}

export const PRIORITY_LABELS: Record<TicketPriority, { label: string; color: string }> = {
  P1: { label: 'Kritik', color: '#EF4444' },
  P2: { label: 'Yüksek', color: '#F59E0B' },
  P3: { label: 'Orta', color: '#3B82F6' },
  P4: { label: 'Düşük', color: '#6B7280' },
}

export const STATUS_LABELS: Record<TicketStatus, { label: string; color: string }> = {
  open: { label: 'Açık', color: '#22C55E' },
  assigned: { label: 'Atandı', color: '#8B5CF6' },
  in_progress: { label: 'İşleniyor', color: '#3B82F6' },
  waiting_customer: { label: 'Müşteri Bekleniyor', color: '#F59E0B' },
  resolved: { label: 'Çözüldü', color: '#10B981' },
  closed: { label: 'Kapatıldı', color: '#6B7280' },
}

/**
 * Check if SLA is breached.
 */
export function isSLABreached(createdAt: string, priority: TicketPriority): boolean {
  const target = SLA_TARGETS[priority]
  const elapsed = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60)
  return elapsed > target.firstResponseMinutes
}

/**
 * Calculate remaining SLA time in minutes.
 */
export function getSLARemaining(createdAt: string, priority: TicketPriority): number {
  const target = SLA_TARGETS[priority]
  const elapsed = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60)
  return Math.max(0, target.firstResponseMinutes - elapsed)
}
