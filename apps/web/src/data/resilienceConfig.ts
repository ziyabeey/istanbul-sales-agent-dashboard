/**
 * kepenk.ai — Hata Yönetimi & Resilience Konfigürasyonu
 * ═══════════════════════════════════════════════════════
 * Error taxonomy, circuit breaker, retry, fallback chain, graceful degradation,
 * idempotency, chaos engineering, client-side error UI patterns.
 */

// ══════════════════════════════════════════
// 1. TEMEL PRENSİPLER
// ══════════════════════════════════════════

export const RESILIENCE_PRENSIPLERI = [
  { id: 'fail_fast', baslik: 'Hızlı Başarısız Ol', aciklama: 'Hatalı girdi/state erken tespit, hemen reddet. Zod ile validate et.' },
  { id: 'fail_gracefully', baslik: 'Zarif Başarısız Ol', aciklama: '3rd party çöktüğünde platform ÇÖKMEZ — kısmi hizmet verir.' },
  { id: 'fail_visibly', baslik: 'Görünür Başarısız Ol', aciklama: 'Her hata loglanır, izlenir, metriklerde görünür. Sessiz hata YASAK.' },
  { id: 'fail_safely', baslik: 'Güvenli Başarısız Ol', aciklama: 'Hata durumunda veri kaybı yaşanmaz. Idempotent retry ile kurtarma.' },
  { id: 'fail_cheaply', baslik: 'Ucuz Başarısız Ol', aciklama: 'AI timeout → ucuz modele düş veya cache\'den yanıt ver.' },
] as const

export const RESILIENCE_STACK = {
  validation: 'Zod', errorClass: 'AppError extends Error', retry: 'p-retry (exponential backoff)',
  circuitBreaker: 'opossum', queue: 'Cloud Tasks (async retry, dead letter)',
  rateLimiter: 'Cloudflare Rate Limiting + in-app token bucket', errorTracking: 'Cloud Error Reporting + Cloud Logging',
} as const

// ══════════════════════════════════════════
// 2. HATA SINIFLANDIRMASI (ERROR TAXONOMY)
// ══════════════════════════════════════════

export type ErrorCategory = 'VALIDATION' | 'AUTH' | 'NOT_FOUND' | 'CONFLICT' | 'RATE_LIMIT' | 'FORBIDDEN' | 'INTERNAL' | 'PROVIDER' | 'TIMEOUT' | 'OVERLOAD' | 'DATA_INTEGRITY'

export type AlertSeviyesi = 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL'

export interface HataKodu {
  kod: string; modul: string; kategori: ErrorCategory; http: number
  retry: boolean; retryAfterMs?: number; maxRetry?: number
  userMsg: string | null; severity: AlertSeviyesi
  fallback?: string; alert?: string
}

export const HATA_KATALOGU: HataKodu[] = [
  // ═══ ÖDEME ═══
  { kod: 'PAYMENT_VALIDATION_FAILED', modul: 'odeme', kategori: 'VALIDATION', http: 400, retry: false, userMsg: 'Ödeme bilgilerini kontrol edin. Kart numarası veya son kullanma tarihi hatalı olabilir.', severity: 'WARNING' },
  { kod: 'PAYMENT_INSUFFICIENT_FUNDS', modul: 'odeme', kategori: 'VALIDATION', http: 402, retry: false, userMsg: 'Kartınızda yeterli bakiye bulunmuyor. Lütfen başka bir kart deneyin.', severity: 'INFO' },
  { kod: 'PAYMENT_PROVIDER_TIMEOUT', modul: 'odeme', kategori: 'TIMEOUT', http: 504, retry: true, retryAfterMs: 5000, userMsg: 'Ödeme işlemi şu anda tamamlanamıyor. Lütfen birkaç dakika sonra tekrar deneyin.', severity: 'ERROR', fallback: 'PAYTR_FALLBACK' },
  { kod: 'PAYMENT_PROVIDER_DOWN', modul: 'odeme', kategori: 'PROVIDER', http: 503, retry: true, retryAfterMs: 30000, userMsg: 'Ödeme sistemi geçici olarak kullanılamıyor. En kısa sürede düzelecektir.', severity: 'CRITICAL', fallback: 'PAYTR_FALLBACK', alert: 'P1' },
  { kod: 'PAYMENT_3DS_FAILED', modul: 'odeme', kategori: 'VALIDATION', http: 400, retry: false, userMsg: '3D Secure doğrulama başarısız oldu. Lütfen tekrar deneyin veya bankanızla iletişime geçin.', severity: 'WARNING' },
  { kod: 'PAYMENT_INSTALLMENT_UNAVAILABLE', modul: 'odeme', kategori: 'VALIDATION', http: 422, retry: false, userMsg: 'Bu kart için taksit seçeneği bulunmuyor. Tek çekim veya başka kart deneyebilirsiniz.', severity: 'INFO' },
  { kod: 'PAYMENT_IDEMPOTENCY_CONFLICT', modul: 'odeme', kategori: 'CONFLICT', http: 409, retry: false, userMsg: 'Bu ödeme zaten işleniyor. Lütfen bekleyin.', severity: 'WARNING' },
  // ═══ AI ═══
  { kod: 'AI_RATE_LIMIT', modul: 'ai', kategori: 'RATE_LIMIT', http: 429, retry: true, retryAfterMs: 60000, userMsg: 'AI asistanımız şu anda yoğun. Birkaç dakika içinde tekrar deneyin.', severity: 'WARNING', fallback: 'AI_MODEL_DOWNGRADE' },
  { kod: 'AI_TIMEOUT', modul: 'ai', kategori: 'TIMEOUT', http: 504, retry: true, retryAfterMs: 5000, maxRetry: 2, userMsg: 'AI yanıtı biraz uzun sürdü. Tekrar deniyoruz...', severity: 'WARNING', fallback: 'AI_MODEL_DOWNGRADE' },
  { kod: 'AI_OVERLOADED', modul: 'ai', kategori: 'OVERLOAD', http: 529, retry: true, retryAfterMs: 30000, userMsg: 'AI servisimiz şu anda çok yoğun. Lütfen birkaç dakika sonra tekrar deneyin.', severity: 'ERROR', fallback: 'AI_CACHE_OR_TEMPLATE' },
  { kod: 'AI_CONTENT_BLOCKED', modul: 'ai', kategori: 'VALIDATION', http: 422, retry: false, userMsg: 'İçerik güvenlik kontrolünden geçemedi. Lütfen farklı bir içerik deneyin.', severity: 'INFO' },
  { kod: 'AI_BUDGET_EXCEEDED', modul: 'ai', kategori: 'RATE_LIMIT', http: 429, retry: false, retryAfterMs: 86400000, userMsg: 'Günlük AI kullanım limitinize ulaştınız. Yarın tekrar kullanabilirsiniz.', severity: 'WARNING' },
  // ═══ WHATSAPP ═══
  { kod: 'WA_DELIVERY_FAILED', modul: 'whatsapp', kategori: 'PROVIDER', http: 502, retry: true, retryAfterMs: 10000, maxRetry: 3, userMsg: null, severity: 'WARNING', fallback: 'SMS_FALLBACK' },
  { kod: 'WA_TEMPLATE_REJECTED', modul: 'whatsapp', kategori: 'VALIDATION', http: 422, retry: false, userMsg: null, severity: 'ERROR', alert: 'P3' },
  { kod: 'WA_RATE_LIMIT', modul: 'whatsapp', kategori: 'RATE_LIMIT', http: 429, retry: true, retryAfterMs: 60000, userMsg: null, severity: 'WARNING', fallback: 'WA_QUEUE_DELAYED' },
  { kod: 'WA_NUMBER_INVALID', modul: 'whatsapp', kategori: 'VALIDATION', http: 400, retry: false, userMsg: 'Müşterinin WhatsApp numarası geçersiz.', severity: 'INFO' },
  // ═══ VERİTABANI ═══
  { kod: 'DB_CONNECTION_FAILED', modul: 'database', kategori: 'PROVIDER', http: 503, retry: true, retryAfterMs: 1000, maxRetry: 5, userMsg: 'Bağlantı hatası oluştu. Tekrar deneniyor...', severity: 'CRITICAL', alert: 'P1' },
  { kod: 'DB_WRITE_CONFLICT', modul: 'database', kategori: 'CONFLICT', http: 409, retry: true, retryAfterMs: 500, maxRetry: 3, userMsg: 'Bilgiler güncellenirken bir çakışma oldu. Sayfayı yenileyin.', severity: 'WARNING' },
  { kod: 'DB_QUOTA_EXCEEDED', modul: 'database', kategori: 'OVERLOAD', http: 429, retry: true, retryAfterMs: 5000, userMsg: 'Sistem yoğunluğu nedeniyle işleminiz beklemeye alındı.', severity: 'ERROR', alert: 'P2' },
  { kod: 'DB_NOT_FOUND', modul: 'database', kategori: 'NOT_FOUND', http: 404, retry: false, userMsg: 'Aradığınız kayıt bulunamadı.', severity: 'INFO' },
  // ═══ RANDEVU ═══
  { kod: 'BOOKING_SLOT_CONFLICT', modul: 'booking', kategori: 'CONFLICT', http: 409, retry: false, userMsg: 'Bu saat artık dolu. Lütfen başka bir saat seçin.', severity: 'INFO' },
  { kod: 'BOOKING_PAST_DATE', modul: 'booking', kategori: 'VALIDATION', http: 400, retry: false, userMsg: 'Geçmiş bir tarihe randevu alınamaz.', severity: 'INFO' },
  { kod: 'BOOKING_PROVIDER_UNAVAILABLE', modul: 'booking', kategori: 'VALIDATION', http: 422, retry: false, userMsg: 'Seçtiğiniz hizmet sağlayıcı bu tarihte çalışmıyor.', severity: 'INFO' },
  // ═══ KARGO ═══
  { kod: 'CARGO_API_TIMEOUT', modul: 'shipping', kategori: 'TIMEOUT', http: 504, retry: true, retryAfterMs: 5000, userMsg: 'Kargo firmasından yanıt alınamadı. Tekrar deneyin.', severity: 'WARNING', fallback: 'NEXT_CARGO_PROVIDER' },
  { kod: 'CARGO_TRACKING_UNAVAILABLE', modul: 'shipping', kategori: 'PROVIDER', http: 503, retry: true, userMsg: 'Kargo takip bilgisi şu anda güncellenemiyor.', severity: 'INFO' },
  // ═══ SİSTEM ═══
  { kod: 'TENANT_ISOLATION_BREACH', modul: 'system', kategori: 'FORBIDDEN', http: 403, retry: false, userMsg: 'Bu işlem için yetkiniz yok.', severity: 'CRITICAL', alert: 'P1' },
  { kod: 'RATE_LIMIT_EXCEEDED', modul: 'system', kategori: 'RATE_LIMIT', http: 429, retry: true, userMsg: 'Çok fazla istek gönderildi. Lütfen biraz bekleyin.', severity: 'WARNING' },
  { kod: 'MAINTENANCE_MODE', modul: 'system', kategori: 'OVERLOAD', http: 503, retry: true, retryAfterMs: 300000, userMsg: 'Sistem bakımda. Kısa süre sonra geri döneceğiz.', severity: 'INFO' },
]

// ══════════════════════════════════════════
// 3. CIRCUIT BREAKER KONFİGÜRASYONU
// ══════════════════════════════════════════

export interface CircuitBreakerConfig {
  servis: string; timeout: number; errorThreshold: number
  resetTimeout: number; volumeThreshold: number; fallback: string
}

export const CIRCUIT_BREAKER_KONFIG: CircuitBreakerConfig[] = [
  { servis: 'iyzico', timeout: 10000, errorThreshold: 30, resetTimeout: 30000, volumeThreshold: 10, fallback: 'paytr_fallback' },
  { servis: 'paytr', timeout: 10000, errorThreshold: 30, resetTimeout: 30000, volumeThreshold: 10, fallback: 'manual_payment_fallback' },
  { servis: 'claude_api', timeout: 60000, errorThreshold: 40, resetTimeout: 60000, volumeThreshold: 20, fallback: 'ai_degradation_chain' },
  { servis: 'twilio_whatsapp', timeout: 15000, errorThreshold: 20, resetTimeout: 30000, volumeThreshold: 15, fallback: 'sms_fallback_chain' },
  { servis: 'yurtici_kargo', timeout: 15000, errorThreshold: 40, resetTimeout: 60000, volumeThreshold: 5, fallback: 'aras_kargo_fallback' },
  { servis: 'aras_kargo', timeout: 15000, errorThreshold: 40, resetTimeout: 60000, volumeThreshold: 5, fallback: 'ptt_kargo_fallback' },
]

// ══════════════════════════════════════════
// 4. RETRY STRATEJİLERİ
// ══════════════════════════════════════════

export interface RetryProfil {
  servis: string; maxRetries: number; baseDelayMs: number; maxDelayMs: number
  retryOn: (number | string)[]; retryEtme: (number | string)[]
  ozellik?: string
}

export const RETRY_PROFILLERI: RetryProfil[] = [
  { servis: 'iyzico', maxRetries: 2, baseDelayMs: 2000, maxDelayMs: 10000, retryOn: [429, 500, 502, 503, 504, 'ETIMEDOUT', 'ECONNRESET'], retryEtme: [400, 401, 403, 422], ozellik: 'idempotency (purchaseFlowId)' },
  { servis: 'claude_ai', maxRetries: 3, baseDelayMs: 1000, maxDelayMs: 30000, retryOn: [429, 500, 529, 'overloaded', 'ETIMEDOUT'], retryEtme: [400, 401], ozellik: 'model_downgrade on timeout' },
  { servis: 'twilio_whatsapp', maxRetries: 3, baseDelayMs: 2000, maxDelayMs: 15000, retryOn: [429, 500, 502, 503], retryEtme: [400, 404, 21610], ozellik: 'SMS fallback after exhaust' },
  { servis: 'firestore', maxRetries: 5, baseDelayMs: 500, maxDelayMs: 16000, retryOn: ['UNAVAILABLE', 'DEADLINE_EXCEEDED', 'ABORTED'], retryEtme: ['NOT_FOUND', 'ALREADY_EXISTS', 'PERMISSION_DENIED'] },
  { servis: 'kargo_api', maxRetries: 2, baseDelayMs: 3000, maxDelayMs: 15000, retryOn: [500, 502, 503, 504, 'ETIMEDOUT'], retryEtme: [400, 401, 422] },
]

// ══════════════════════════════════════════
// 5. FALLBACK ZİNCİRLERİ
// ══════════════════════════════════════════

export interface FallbackSeviye {
  seviye: number; servis: string; timeout: string; aciklama: string; userMsg?: string
}

export interface FallbackZinciri { id: string; isim: string; seviyeler: FallbackSeviye[] }

export const FALLBACK_ZINCIRLERI: FallbackZinciri[] = [
  {
    id: 'odeme', isim: 'Ödeme Fallback', seviyeler: [
      { seviye: 1, servis: 'iyzico API', timeout: '10s', aciklama: 'Birincil ödeme sağlayıcı' },
      { seviye: 2, servis: 'PayTR API', timeout: '10s', aciklama: 'iyzico circuit OPEN → sessiz geçiş (UI aynı kalır)' },
      { seviye: 3, servis: 'Manuel ödeme', timeout: '—', aciklama: 'Havale/EFT bilgisi göster — son çare', userMsg: 'Ödeme sistemi geçici olarak kullanılamıyor. Havale ile ödeyebilirsiniz.' },
    ],
  },
  {
    id: 'ai', isim: 'AI Fallback', seviyeler: [
      { seviye: 1, servis: 'Claude Opus', timeout: '60s', aciklama: 'Karmaşık görevler (site üretimi, strateji)' },
      { seviye: 2, servis: 'Claude Sonnet', timeout: '30s', aciklama: '%85 kalite korunur — maliyet 5x düşer' },
      { seviye: 3, servis: 'Claude Haiku', timeout: '10s', aciklama: 'Basit metin üretir — maliyet 12x düşer' },
      { seviye: 4, servis: 'Pinecone cache', timeout: 'anında', aciklama: 'Vector search → önceki başarılı yanıt' },
      { seviye: 5, servis: 'Statik şablon', timeout: 'anında', aciklama: 'Sektör şablonu — AI\'sız bile değer verir', userMsg: 'AI şu anda kullanılamıyor. Hazır şablon sunduk — düzenleyebilirsiniz.' },
    ],
  },
  {
    id: 'whatsapp', isim: 'WhatsApp → SMS Fallback', seviyeler: [
      { seviye: 1, servis: 'Twilio WhatsApp', timeout: '15s', aciklama: 'Birincil kanal (3 retry)' },
      { seviye: 2, servis: 'NetGSM SMS', timeout: '10s', aciklama: 'WhatsApp circuit OPEN → SMS (₺0.20/mesaj)' },
      { seviye: 3, servis: 'FCM Push', timeout: '5s', aciklama: 'PWA yüklü kullanıcılara push' },
      { seviye: 4, servis: 'Resend Email', timeout: '10s', aciklama: 'Email adresi kayıtlıysa' },
      { seviye: 5, servis: 'Cloud Tasks DLQ', timeout: '—', aciklama: 'Kuyruğa al, 1 saat sonra tekrar dene (max 24h)' },
    ],
  },
  {
    id: 'kargo', isim: 'Kargo API Fallback', seviyeler: [
      { seviye: 1, servis: 'Tercih edilen kargo', timeout: '15s', aciklama: 'Esnafın seçtiği (Yurtiçi/Aras/PTT)' },
      { seviye: 2, servis: 'Alternatif kargo', timeout: '15s', aciklama: 'Sıradaki en uygun kargo' },
      { seviye: 3, servis: 'Manuel bildirim', timeout: '—', aciklama: 'Kargo bilgisi WhatsApp\'tan iletilecek', userMsg: 'Kargo sistemi geçici kullanılamıyor. Bilgi WhatsApp\'tan gelecek.' },
    ],
  },
]

// ══════════════════════════════════════════
// 6. GRACEFUL DEGRADATION MATRİSİ
// ══════════════════════════════════════════

export interface DegradasyonSenaryosu {
  id: string; servis: string; etkilenen: string[]; etkilenmeyen: string[]
  kullaniciDeneyimi: string; seviye: string
}

export const DEGRADATION_MATRISI: DegradasyonSenaryosu[] = [
  { id: 'claude_down', servis: 'Claude API', etkilenen: ['AI site üretimi', 'AI öneriler', 'AI chat'], etkilenmeyen: ['POS', 'randevu', 'CRM', 'e-ticaret', 'WhatsApp (bot hariç)'], kullaniciDeneyimi: 'AI butonları gri + tooltip, sektör şablonları sunulur, WhatsApp bot hazır yanıtlara düşer', seviye: 'P2' },
  { id: 'iyzico_down', servis: 'iyzico', etkilenen: ['Online ödeme', 'taksit'], etkilenmeyen: ['Site', 'randevu', 'CRM', 'WhatsApp', 'POS (QR hariç)'], kullaniciDeneyimi: 'PayTR\'ye sessiz geçiş, PayTR da down → havale/EFT bilgisi', seviye: 'P1' },
  { id: 'twilio_down', servis: 'Twilio', etkilenen: ['WhatsApp mesajları', 'SMS'], etkilenmeyen: ['Site', 'e-ticaret', 'ödeme', 'POS', 'CRM'], kullaniciDeneyimi: 'Mesajlar kuyruğa alınır, SMS fallback, dashboard uyarı banner', seviye: 'P2' },
  { id: 'firestore_degraded', servis: 'Firestore', etkilenen: ['TÜM yazma', 'çoğu okuma'], etkilenmeyen: ['Esnaf siteleri (statik CDN)'], kullaniciDeneyimi: 'Dashboard bakım sayfası, esnaf siteleri ÇALIŞIR, ödeme DURUR', seviye: 'P1' },
  { id: 'cloudflare_down', servis: 'Cloudflare', etkilenen: ['Esnaf siteleri (CDN)'], etkilenmeyen: ['Dashboard', 'API', 'ödeme', 'WhatsApp'], kullaniciDeneyimi: 'DNS failover → Cloud CDN backup (çok nadir — CF %99.99 SLA)', seviye: 'P1' },
]

// ══════════════════════════════════════════
// 7. İDEMPOTENT İŞLEM GARANTİSİ
// ══════════════════════════════════════════

export const IDEMPOTENCY_CONFIG = {
  odeme: { mekanik: 'purchaseFlowId (UUID v4)', dedup: 'Firestore payments/{purchaseFlowId}', aciklama: 'Çift ödeme önleme — aynı ID ile tekrar istek = eski yanıt döner' },
  siparis: { mekanik: 'orderRequestId (client UUID)', dedup: 'orders koleksiyonu index', aciklama: 'Aynı siparişin tekrar oluşmasını önler' },
  randevu: { mekanik: 'bookingRequestId + slot fingerprint', dedup: 'Firestore transaction', aciklama: 'Aynı slot\'a 2 randevu = transaction ABORT' },
  sitePublish: { mekanik: 'Content-hash tabanlı', dedup: 'CDN\'de hash eşleşme = skip', aciklama: 'Değişiklik yoksa yeniden yayınlamaz' },
} as const

// ══════════════════════════════════════════
// 8. ASENKRON KUYRUKLAR & DEAD LETTER
// ══════════════════════════════════════════

export interface KuyrukConfig {
  isim: string; amac: string; maxRetry: number; minBackoff: string; maxBackoff: string; deadLetter: string | null
}

export const KUYRUK_KONFIG: KuyrukConfig[] = [
  { isim: 'whatsapp_messages', amac: 'WhatsApp mesaj gönderimi', maxRetry: 5, minBackoff: '10s', maxBackoff: '300s', deadLetter: 'whatsapp-dead-letter' },
  { isim: 'payment_webhooks', amac: 'iyzico/PayTR webhook işleme', maxRetry: 10, minBackoff: '5s', maxBackoff: '600s', deadLetter: 'payment-dead-letter' },
  { isim: 'email_sending', amac: 'E-posta gönderimi', maxRetry: 3, minBackoff: '30s', maxBackoff: '300s', deadLetter: 'email-dead-letter' },
  { isim: 'site_build', amac: 'Esnaf sitesi HTML üretimi', maxRetry: 3, minBackoff: '10s', maxBackoff: '120s', deadLetter: 'build-dead-letter' },
  { isim: 'analytics_events', amac: 'BigQuery\'ye event yazma', maxRetry: 5, minBackoff: '30s', maxBackoff: '300s', deadLetter: null },
]

// ══════════════════════════════════════════
// 9. KAOS MÜHENDİSLİĞİ
// ══════════════════════════════════════════

export interface KaosTest { id: string; ortam: 'staging' | 'prod'; siklık: string; mekanik: string; dogrulama: string[] }

export const KAOS_TESTLERI: KaosTest[] = [
  { id: 'claude_kesinti', ortam: 'staging', siklık: 'Aylık', mekanik: 'Claude API → /dev/null (env var)', dogrulama: ['AI butonları devre dışı mı?', 'Şablonlar sunuluyor mu?', 'Dashboard çökmeden çalışıyor mu?', 'Alert tetiklendi mi?'] },
  { id: 'iyzico_timeout', ortam: 'staging', siklık: 'Aylık', mekanik: 'iyzico proxy\'ye 30s gecikme', dogrulama: ['Circuit breaker açılıyor mu?', 'PayTR fallback aktif mi?', 'Anlamlı hata mesajı var mı?', 'Mevcut siparişler etkilenmiyor mu?'] },
  { id: 'twilio_rate_limit', ortam: 'staging', siklık: 'Aylık', mekanik: 'WhatsApp API → 429 simüle', dogrulama: ['SMS fallback çalışıyor mu?', 'Mesajlar kuyruğa alınıyor mu?', 'Kuyruk sonra gönderiliyor mu?'] },
  { id: 'firestore_gecikme', ortam: 'staging', siklık: 'Aylık', mekanik: 'Firestore proxy\'ye 5s gecikme', dogrulama: ['API timeout çalışıyor mu?', 'Retry aktif mi?', 'Esnaf siteleri etkilenmiyor mu?'] },
  { id: 'yuksek_trafik', ortam: 'staging', siklık: 'Aylık', mekanik: 'k6 ile 10x trafik simülasyonu', dogrulama: ['Auto-scale çalışıyor mu?', 'Rate limiter devrede mi?', 'SLO içinde mi?'] },
  { id: 'canary_rollback', ortam: 'prod', siklık: 'Çeyreklik', mekanik: 'Kasıtlı hatalı canary deploy', dogrulama: ['Rollback <2dk tamamlandı mı?'] },
  { id: 'instance_kill', ortam: 'prod', siklık: 'Çeyreklik', mekanik: 'Cloud Run instance terminate', dogrulama: ['Yeni instance <10s kalktı mı?', 'Kullanıcı etkilenmedi mi?'] },
]

// ══════════════════════════════════════════
// 10. HTTP STATUS HARİTALAMA & RETRY KURALLAR
// ══════════════════════════════════════════

export const HTTP_STATUS_HARITASI: Record<number, string> = {
  400: 'Geçersiz istek (validation, format hatası)',
  401: 'Kimlik doğrulama başarısız (token yok/expired)',
  403: 'Yetkisiz erişim (tenant isolation, rol yetersiz)',
  404: 'Kaynak bulunamadı',
  409: 'Çakışma (duplicate, concurrent edit)',
  422: 'İşlenemez varlık (business logic reddi)',
  429: 'Rate limit aşıldı',
  500: 'İç sunucu hatası (beklenmeyen)',
  502: 'Geçersiz ağ geçidi (3rd party hata)',
  503: 'Servis kullanılamıyor (bakım, aşırı yük)',
  504: 'Ağ geçidi zaman aşımı (3rd party timeout)',
}

export const RETRY_KARARI = {
  '4xx': 'Genellikle retry YAPMA (client hatası)',
  '4xx_istisna': '429 (rate limit) → retry AFTER delay',
  '5xx': 'Genellikle retry YAP (geçici sunucu hatası)',
  '5xx_istisna': '500 + deterministik hata → retry YAPMA',
  'network': 'ETIMEDOUT, ECONNRESET, ECONNREFUSED → retry YAP',
} as const

export const KULLANICI_MESAJ_PRENSIPLERI = [
  'Teknik terim KULLANMA (HTTP, timeout, 500 → anlamsız)',
  'Somut aksiyon öner ("tekrar deneyin", "başka kart deneyin")',
  'Suçlama yapma ("bilgileri kontrol edelim" NOT "yanlış yaptınız")',
  'Kısa tut (maks 2 cümle)',
  'İletişim kanalı sun (WhatsApp destek linki)',
] as const

// ══════════════════════════════════════════
// 11. VERİ TUTARLILIĞI KONTROL
// ══════════════════════════════════════════

export const TUTARLILIK_KONTROLLERI = {
  siklık: 'Her 6 saatte bir (Cloud Scheduler)',
  kontroller: [
    'Ödeme alınmış ama sipariş oluşmamış kayıtlar',
    'Randevu var ama ödeme statüsü belirsiz',
    'Stok negatife düşmüş ürünler',
    'Yayınlanmış site ama CDN\'de dosya eksik',
  ],
  kurtarma: {
    firestorePITR: '7 gün pencere (GCP managed)',
    gunlukBackup: '30 gün (GCS export)',
    bigqueryArchive: '365 gün (partial recovery)',
  },
} as const
