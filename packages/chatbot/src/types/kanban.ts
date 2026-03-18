/**
 * @kepenk/chatbot — Kanban Board + AI Task Distribution Types
 */

export type CardPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface KanbanBoard {
  id: string
  orgId: string
  name: string
  columns: KanbanColumn[]
  createdAt: string
}

export interface KanbanColumn {
  id: string
  title: string
  cardOrder: string[]
  color: string
  wipLimit?: number
}

export interface KanbanCard {
  id: string
  boardId: string
  columnId: string

  title: string
  description?: string

  assignees: string[]
  assignedByAI?: boolean

  priority: CardPriority
  labels: string[]

  dueDate?: string
  estimatedHours?: number
  actualHours?: number

  parentCardId?: string
  attachments?: { name: string; url: string }[]
  comments?: { userId: string; text: string; createdAt: string }[]

  requiredSkills?: string[]
  aiAssignmentScore?: number

  createdAt: string
  updatedAt: string
}

export const PRIORITY_LABELS: Record<CardPriority, { label: string; color: string; icon: string }> = {
  low:    { label: 'Düşük',   color: '#6B7280', icon: '⬜' },
  medium: { label: 'Orta',    color: '#3B82F6', icon: '🟦' },
  high:   { label: 'Yüksek',  color: '#F59E0B', icon: '🟧' },
  urgent: { label: 'Acil',    color: '#EF4444', icon: '🟥' },
}

export const DEFAULT_COLUMNS: Omit<KanbanColumn, 'cardOrder'>[] = [
  { id: 'todo',       title: 'Yapılacak',   color: '#6B7280' },
  { id: 'in_progress', title: 'Devam Eden',  color: '#3B82F6' },
  { id: 'review',     title: 'İnceleme',    color: '#F59E0B' },
  { id: 'done',       title: 'Tamamlanan',  color: '#22C55E' },
]

// ═══ AI Task Distribution ═══

export interface AssignmentScore {
  userId: string
  userName: string
  skillScore: number           // 0-40
  workloadScore: number        // 0-30
  availabilityScore: number    // 0-15
  performanceScore: number     // 0-15
  totalScore: number           // 0-100
  confidence: number           // 0-1
}

export const ASSIGNMENT_WEIGHTS = {
  skill: 0.40,
  workload: 0.30,
  availability: 0.15,
  performance: 0.15,
} as const

// confidence < 0.7 → ask manager; >= 0.7 → auto-assign
export const AUTO_ASSIGN_THRESHOLD = 0.7

/**
 * Calculate assignment score for a user.
 */
export function calculateAssignmentScore(
  skillMatch: number,          // 0-1
  openTaskCount: number,
  maxTasks: number,
  isAvailable: boolean,
  completionRate: number,      // 0-1
): AssignmentScore {
  const skillScore = Math.round(skillMatch * 40)
  const workloadScore = Math.round((1 - Math.min(openTaskCount / maxTasks, 1)) * 30)
  const availabilityScore = isAvailable ? 15 : 0
  const performanceScore = Math.round(completionRate * 15)
  const totalScore = skillScore + workloadScore + availabilityScore + performanceScore
  const confidence = totalScore / 100

  return {
    userId: '', userName: '',
    skillScore, workloadScore, availabilityScore, performanceScore,
    totalScore, confidence,
  }
}
