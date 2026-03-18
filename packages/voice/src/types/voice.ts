/**
 * @kepenk/voice — Voice Command Types
 *
 * Pipeline: Mic → Deepgram STT (Türkçe) → Claude Haiku intent → Action → TTS response
 * Cost: ~$0.005/command (STT $0.003 + Claude Haiku $0.002)
 */

export type VoiceIntent =
  | 'GET_REVENUE'
  | 'GET_ORDER_COUNT'
  | 'GET_ORDER_STATUS'
  | 'CREATE_INVOICE'
  | 'CREATE_BOOKING'
  | 'CHECK_STOCK'
  | 'GET_APPOINTMENTS'
  | 'UNKNOWN'

export interface VoiceCommand {
  id: string
  userId: string
  audioUrl?: string
  transcript: string            // Deepgram output
  intent: VoiceIntent
  entities: Record<string, string>
  confidence: number            // 0-1
  responseText: string          // Claude response
  actionTaken?: string
  latencyMs: number
  createdAt: string
}

export interface IntentParseResult {
  intent: VoiceIntent
  entities: Record<string, string>
  confidence: number
}

export const INTENT_LABELS: Record<VoiceIntent, { label: string; icon: string; example: string }> = {
  GET_REVENUE:       { label: 'Ciro Sorgula',       icon: '💰', example: 'Bugünkü ciroyu söyle' },
  GET_ORDER_COUNT:   { label: 'Sipariş Sayısı',     icon: '📦', example: 'Bu hafta kaç sipariş geldi' },
  GET_ORDER_STATUS:  { label: 'Sipariş Durumu',     icon: '🔍', example: "Ahmet Bey'in siparişi ne durumda" },
  CREATE_INVOICE:    { label: 'Fatura Oluştur',     icon: '🧾', example: 'Son siparişi faturala' },
  CREATE_BOOKING:    { label: 'Randevu Al',          icon: '📅', example: "Yarın saat 3'e randevu al" },
  CHECK_STOCK:       { label: 'Stok Kontrol',       icon: '📊', example: 'Stokta kaç adet X var' },
  GET_APPOINTMENTS:  { label: 'Randevular',          icon: '🗓️', example: 'Bugünkü randevuları göster' },
  UNKNOWN:           { label: 'Bilinmiyor',          icon: '❓', example: '...' },
}

// Deepgram config
export const DEEPGRAM_CONFIG = {
  model: 'nova-3',
  language: 'tr',
  smartFormat: true,
  punctuate: true,
  costPerMinute: 0.0043,       // USD
} as const

// Sector-specific keyterms for Deepgram prompting
export const SECTOR_KEYTERMS: Record<string, string[]> = {
  berber:   ['fön', 'kesim', 'sakal', 'boya', 'keratin', 'röfle', 'ombre'],
  restoran: ['adisyon', 'garson', 'masa', 'sipariş', 'paket', 'kuver', 'menü'],
  doktor:   ['muayene', 'reçete', 'randevu', 'tahlil', 'röntgen', 'ilaç'],
  eczane:   ['ilaç', 'reçete', 'stok', 'muadil', 'SGK', 'fiyat'],
}
