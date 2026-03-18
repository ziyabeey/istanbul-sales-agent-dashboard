/**
 * @kepenk/chatbot — RAG Pipeline + Document Types
 *
 * Document → Chunk → Embed → Pinecone → Query → Claude → Response
 * Pinecone namespace isolation per org.
 */

export type DocStatus = 'uploading' | 'processing' | 'indexed' | 'error'
export type DocFileType = 'pdf' | 'docx' | 'xlsx' | 'txt' | 'md'

export interface RAGDocument {
  id: string
  orgId: string
  name: string
  fileUrl: string
  fileType: DocFileType
  fileSize: number             // bytes
  chunkCount: number
  status: DocStatus
  errorMessage?: string
  uploadedBy: string
  createdAt: string
  indexedAt?: string
}

export interface RAGChunk {
  id: string
  docId: string
  docName: string
  chunkIndex: number
  text: string
  tokenCount: number
  embedding?: number[]         // 1536-dim (text-embedding-3-small)
}

export interface RAGQuery {
  question: string
  orgId: string
  topK: number                 // default: 10
  minScore: number             // default: 0.7
}

export interface RAGResult {
  answer: string
  sources: RAGSource[]
  confidence: number           // 0-1
  tokensUsed: number
  latencyMs: number
}

export interface RAGSource {
  docId: string
  docName: string
  chunkIndex: number
  text: string                 // matched chunk snippet
  score: number                // similarity score
}

// Chunking config
export const CHUNK_CONFIG = {
  chunkSize: 1000,
  chunkOverlap: 200,
  embeddingModel: 'text-embedding-3-small',
  embeddingDimension: 1536,
  pineconeIndex: 'kepenk-chatbot',
  namespacePrefix: 'org_',
} as const

export interface ChatMessage {
  id: string
  orgId: string
  userId: string
  role: 'user' | 'assistant'
  content: string
  sources?: RAGSource[]
  createdAt: string
}
