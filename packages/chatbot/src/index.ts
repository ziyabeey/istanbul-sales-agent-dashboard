/**
 * @kepenk/chatbot — Barrel Export
 */

export type {
  RAGDocument, RAGChunk, RAGQuery, RAGResult, RAGSource, ChatMessage,
  DocStatus, DocFileType,
} from './types/rag'
export { CHUNK_CONFIG } from './types/rag'

export type {
  KanbanBoard, KanbanColumn, KanbanCard, CardPriority, AssignmentScore,
} from './types/kanban'
export {
  PRIORITY_LABELS, DEFAULT_COLUMNS, ASSIGNMENT_WEIGHTS, AUTO_ASSIGN_THRESHOLD,
  calculateAssignmentScore,
} from './types/kanban'

export type { OrgKPI, TeamMemberKPI } from './types/kpi'
