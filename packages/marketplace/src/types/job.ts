/**
 * @kepenk/marketplace — Job Types + Category Tree
 *
 * Armut-style two-sided marketplace: customer creates job → providers bid → escrow → completion.
 */

export type JobStatus = 'open' | 'in_progress' | 'completed' | 'cancelled' | 'disputed'
export type JobUrgency = 'flexible' | 'this_week' | 'urgent'
export type ComplexityLevel = 'easy' | 'medium' | 'hard'

export interface Job {
  id: string
  customerId: string

  categoryPath: string[]       // ['tadilat', 'boya', 'ic_cephe']
  categoryId: string           // 'ic_cephe_boya'

  title: string
  description: string
  questions: Record<string, string>
  photos: string[]

  location: JobLocation

  budget: { min: number; max: number }
  urgency: JobUrgency
  preferredDate?: string

  status: JobStatus
  maxBids: number              // 5
  bidCount: number
  selectedBidId?: string

  aiAnalysis?: AIJobAnalysis

  createdAt: string
  updatedAt: string
}

export interface JobLocation {
  lat: number
  lng: number
  geohash: string
  address: string
  city: string
  district: string
}

export interface AIJobAnalysis {
  estimatedPriceRange: { min: number; max: number }
  suggestedMaterials: { name: string; reason: string; estimatedCost: number }[]
  safetyTips: string[]
  estimatedDuration: string
  complexityLevel: ComplexityLevel
  consumerAdvice: string[]
  analyzedAt: string
}

// ═══ Category Tree ═══

export interface CategoryNode {
  name: string
  icon?: string
  children?: Record<string, CategoryNode | string>
}

export const JOB_CATEGORIES: Record<string, CategoryNode> = {
  tadilat: {
    name: 'Tadilat', icon: '🔨',
    children: {
      boya: { name: 'Boya Badana', children: { ic_cephe: 'İç Cephe', dis_cephe: 'Dış Cephe' } },
      alci: { name: 'Alçı & Sıva' },
      seramik: { name: 'Seramik & Fayans' },
      parke: { name: 'Parke & Laminat' },
      duvar: { name: 'Duvar Örme/Yıkma' },
    },
  },
  elektrik: {
    name: 'Elektrik', icon: '⚡',
    children: { tesisat: 'Elektrik Tesisatı', priz: 'Priz & Anahtar', aydinlatma: 'Aydınlatma', sigorta: 'Sigorta & Pano' },
  },
  tesisat: {
    name: 'Tesisat', icon: '🔧',
    children: { su: 'Su Tesisatı', tikaniklik: 'Tıkanıklık Açma', kombi: 'Kombi Bakım/Tamir', klima: 'Klima Montaj/Bakım', dogalgaz: 'Doğalgaz Tesisatı' },
  },
  temizlik: {
    name: 'Temizlik', icon: '🧹',
    children: { ev: 'Ev Temizliği', ofis: 'Ofis Temizliği', insaat_sonrasi: 'İnşaat Sonrası', koltuk: 'Koltuk Yıkama', hali: 'Halı Yıkama' },
  },
  nakliyat: {
    name: 'Nakliyat', icon: '🚚',
    children: { evden_eve: 'Evden Eve Nakliyat', esya: 'Eşya Taşıma', depolama: 'Depolama' },
  },
  bahce: {
    name: 'Bahçe & Dış Mekan', icon: '🌿',
    children: { peyzaj: 'Peyzaj', havuz: 'Havuz Bakım', cit: 'Çit & Pergola' },
  },
}

export const URGENCY_LABELS: Record<JobUrgency, { label: string; color: string; icon: string }> = {
  flexible:  { label: 'Esnek',     color: '#22C55E', icon: '🟢' },
  this_week: { label: 'Bu Hafta',  color: '#F59E0B', icon: '🟡' },
  urgent:    { label: 'Acil',      color: '#EF4444', icon: '🔴' },
}

export const JOB_STATUS_LABELS: Record<JobStatus, { label: string; color: string }> = {
  open:        { label: 'Açık',         color: '#3B82F6' },
  in_progress: { label: 'Devam Ediyor', color: '#F59E0B' },
  completed:   { label: 'Tamamlandı',   color: '#22C55E' },
  cancelled:   { label: 'İptal',        color: '#6B7280' },
  disputed:    { label: 'İhtilaflı',    color: '#EF4444' },
}
