/**
 * @kepenk/support — Knowledge Base (RAG) Types
 *
 * Pipeline: MDX articles → chunk (500 tokens, 100 overlap) → embed (Vertex AI 768d) → Firestore vector search
 */

export interface KBArticle {
  id: string
  title: string
  slug: string
  content: string               // MDX string
  category: KBCategory
  subcategory?: string
  locale: 'tr'
  status: 'published' | 'draft'
  tags: string[]

  // Metrics
  viewCount: number
  helpfulCount: number
  unhelpfulCount: number

  // Embedding (full article — 768 dimensions Vertex AI text-embedding-004)
  embedding?: number[]

  createdAt: string
  updatedAt: string
  publishedAt?: string
  authorId?: string
}

export type KBCategory =
  | 'baslangic'         // Başlangıç rehberleri
  | 'site_yonetimi'     // Site kurulum ve yönetim
  | 'odeme'             // Ödeme ve abonelik
  | 'seo'               // SEO ve pazarlama
  | 'teknik'            // Teknik konular
  | 'api'               // API dokümantasyon
  | 'entegrasyon'       // Üçüncü parti entegrasyonlar
  | 'guvenlik'          // Güvenlik

export const KB_CATEGORY_LABELS: Record<KBCategory, { label: string; icon: string }> = {
  baslangic: { label: 'Başlangıç', icon: '🚀' },
  site_yonetimi: { label: 'Site Yönetimi', icon: '🌐' },
  odeme: { label: 'Ödeme', icon: '💳' },
  seo: { label: 'SEO & Pazarlama', icon: '📈' },
  teknik: { label: 'Teknik', icon: '⚙️' },
  api: { label: 'API', icon: '🔌' },
  entegrasyon: { label: 'Entegrasyonlar', icon: '🔗' },
  guvenlik: { label: 'Güvenlik', icon: '🔒' },
}

export interface KBChunk {
  id: string
  articleId: string
  articleTitle: string
  text: string                  // ~500 tokens
  startIndex: number
  endIndex: number
  embedding: number[]           // 768 dimensions
}

export interface RAGSearchResult {
  chunkId: string
  articleId: string
  articleTitle: string
  text: string
  score: number                 // cosine similarity
}

export interface AIResponseResult {
  response: string
  confidence: number            // 0-1
  sourceArticleIds: string[]
  autoSent: boolean             // confidence > 0.85
}

/**
 * Confidence thresholds for AI response actions.
 */
export const CONFIDENCE_THRESHOLDS = {
  AUTO_SEND: 0.85,              // Auto-respond
  SUGGEST_TO_AGENT: 0.50,      // Show as draft
  HUMAN_ONLY: 0,                // Skip AI
} as const
