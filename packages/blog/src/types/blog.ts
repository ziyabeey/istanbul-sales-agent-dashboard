/**
 * @kepenk/blog — Blog Post + AI Generation Types
 */

export type BlogStatus = 'draft' | 'scheduled' | 'published' | 'archived'

export interface BlogPost {
  id: string
  siteId: string
  title: string
  slug: string
  content: string              // Markdown
  metaDescription: string      // 150-160 chars
  keywords: string[]
  category?: string
  faq: BlogFAQ[]
  coverImageUrl?: string

  status: BlogStatus
  scheduledAt?: string
  publishedAt?: string

  aiGenerated: boolean
  seoScore: number             // 0-100
  readTimeMinutes: number
  viewCount: number

  createdAt: string
  updatedAt: string
}

export interface BlogFAQ {
  question: string
  answer: string
}

// ═══ AI Generation ═══

export interface BlogGenerationRequest {
  siteId: string
  topic?: string
  sector: string
  businessName: string
  targetKeywords?: string[]
  tone?: BlogTone
}

export type BlogTone = 'professional' | 'casual' | 'educational'

export interface GeneratedBlog {
  title: string
  metaDescription: string
  slug: string
  keywords: string[]
  content: string              // Markdown
  faq: BlogFAQ[]
  estimatedReadTime: number
  seoScore: number
}

// ═══ Autopilot ═══

export interface AutopilotPlan {
  siteId: string
  month: string                // "2026-03"
  topics: AutopilotTopic[]
  approved: boolean
  approvedAt?: string
}

export interface AutopilotTopic {
  id: string
  title: string
  scheduledDate: string
  status: 'pending' | 'generated' | 'published'
  keywords: string[]
}

// ═══ Token System ═══

export const BLOG_TOKEN_LIMITS: Record<string, number> = {
  baslangic: 2,
  buyume: 10,          // 5 manual + 5 autopilot
  pro: 30,             // 20 manual + 10 autopilot
  enterprise: -1,      // unlimited
}

export interface BlogTokenUsage {
  siteId: string
  month: string
  used: number
  limit: number
  autopilotUsed: number
}

// ═══ SEO Helpers ═══

/**
 * Generate URL-safe slug from Turkish text.
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i')
    .replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80)
}

/**
 * Estimate read time (200 words/minute average Turkish).
 */
export function estimateReadTime(content: string): number {
  const words = content.split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

/**
 * Basic SEO score based on content checks.
 */
export function calculateSEOScore(post: {
  title: string; metaDescription: string; content: string; keywords: string[]
}): number {
  let score = 0
  // Title 50-60 chars
  if (post.title.length >= 40 && post.title.length <= 65) score += 15
  else if (post.title.length > 0) score += 8
  // Meta 150-160 chars
  if (post.metaDescription.length >= 140 && post.metaDescription.length <= 165) score += 15
  else if (post.metaDescription.length > 0) score += 8
  // Content length 1200+ words
  const words = post.content.split(/\s+/).length
  if (words >= 1200) score += 20
  else if (words >= 800) score += 12
  else if (words >= 400) score += 6
  // Keywords present
  if (post.keywords.length >= 3) score += 10
  // Keyword in title
  if (post.keywords.some(k => post.title.toLowerCase().includes(k.toLowerCase()))) score += 15
  // Headings present
  if (/^##\s/m.test(post.content)) score += 10
  // Internal links
  if (/\[LINK:/.test(post.content)) score += 5
  // Images
  if (/\[IMAGE:/.test(post.content) || /!\[/.test(post.content)) score += 10
  return Math.min(100, score)
}
