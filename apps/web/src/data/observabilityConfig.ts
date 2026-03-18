/**
 * kepenk.ai — Monitoring & Observability Konfigürasyonu
 * ═════════════════════════════════════════════════════
 * SLI/SLO/SLA, alert kataloğu, metrik tanımları, runbook, incident workflow.
 */

// ══════════════════════════════════════════
// 1. OBSERVABILITY STACK
// ══════════════════════════════════════════

export const OBSERVABILITY_STACK = {
  metrikler: { altyapi: 'Google Cloud Monitoring', uygulama: 'OpenTelemetry → Cloud Monitoring', isMetrikleri: 'BigQuery → Grafana', rum: 'web-vitals → Cloud Logging → BigQuery' },
  loglar: { toplama: 'Google Cloud Logging', yapilandirma: 'JSON (pino)', uzunVadeli: 'Cloud Logging → BigQuery sink' },
  izler: { sdk: 'OpenTelemetry Node.js', backend: 'Google Cloud Trace', propagation: 'W3C Trace Context', sampling: '%100 hata / %10 normal' },
  gorsellestime: { birincil: 'Grafana Cloud', ikincil: 'Google Cloud Monitoring Console' },
  alerting: { birincil: 'Google Cloud Monitoring Alerting Policies', eskalasyon: 'PagerDuty' },
  bildirimKanallari: {
    p1: 'PagerDuty → Telefon + SMS + WhatsApp',
    p2: 'PagerDuty → WhatsApp + Slack',
    p3: 'Slack #alerts kanalı',
    p4: 'Slack #metrics + haftalık email digest',
  },
} as const

// ══════════════════════════════════════════
// 2. LABEL STANDARDI
// ══════════════════════════════════════════

export const LABEL_STANDARDI = {
  zorunlu: ['service', 'environment'] as const,
  opsiyonel: ['esnaf_id', 'sektor', 'tier', 'ai_model', 'whatsapp_template'] as const,
  servisler: ['dashboard', 'api', 'whatsapp-worker', 'ai-proxy', 'site-renderer'] as const,
  ortamlar: ['dev', 'staging', 'prod'] as const,
} as const

// ══════════════════════════════════════════
// 3. SLI / SLO / SLA
// ══════════════════════════════════════════

export interface SLITanimi {
  id: string; tanim: string; formul: string; kapsam: string
}

export const SLI_TANIMLARI: SLITanimi[] = [
  { id: 'kullanilabilirlik', tanim: 'Başarılı HTTP yanıtlarının toplam isteklere oranı', formul: '(toplam - 5xx) / toplam × 100', kapsam: 'Tüm Cloud Run servisleri' },
  { id: 'gecikme', tanim: 'İsteklerin P95 eşiğinin altında yanıtlanma oranı', formul: '(P95_altinda) / toplam × 100', kapsam: 'API, Dashboard, WhatsApp, AI Proxy' },
  { id: 'dogruluk', tanim: 'Doğru sonuç döndüren isteklerin oranı', formul: 'basarili_istek / toplam × 100', kapsam: 'Ödeme, WhatsApp, AI, Site Build' },
  { id: 'tazelik', tanim: 'Verinin ne kadar güncel olduğu', formul: 'islem_suresi <= esik ? uyumlu : uyumsuz', kapsam: 'Site yayınlama, analitik, WhatsApp' },
]

export interface SLOHedefi {
  servis: string; metrik: string; hedef: string; pencere: string; hataBudcesi: string
}

export const SLO_HEDEFLERI: SLOHedefi[] = [
  { servis: 'API Backend', metrik: 'Kullanılabilirlik', hedef: '%99.9', pencere: '28 gün rolling', hataBudcesi: '40 dakika/ay' },
  { servis: 'API Backend', metrik: 'Gecikme P95', hedef: '<1s (%99)', pencere: '28 gün', hataBudcesi: '—' },
  { servis: 'Esnaf Siteleri', metrik: 'Kullanılabilirlik', hedef: '%99.95', pencere: '28 gün', hataBudcesi: '21 dakika/ay' },
  { servis: 'Esnaf Siteleri', metrik: 'LCP P75', hedef: '<2.5s', pencere: '28 gün', hataBudcesi: '—' },
  { servis: 'WhatsApp', metrik: 'Webhook Kullanılabilirlik', hedef: '%99.9', pencere: '28 gün', hataBudcesi: '40 dakika/ay' },
  { servis: 'WhatsApp', metrik: 'Mesaj Teslimat', hedef: '%98', pencere: '7 gün', hataBudcesi: '—' },
  { servis: 'AI Servisi', metrik: 'Kullanılabilirlik', hedef: '%99.5', pencere: '28 gün', hataBudcesi: '3.6 saat/ay' },
  { servis: 'AI Servisi', metrik: 'Haiku P95', hedef: '<3s', pencere: '28 gün', hataBudcesi: '—' },
  { servis: 'AI Servisi', metrik: 'Sonnet P95', hedef: '<10s', pencere: '28 gün', hataBudcesi: '—' },
  { servis: 'Ödeme', metrik: 'Başarı Oranı', hedef: '%99.5', pencere: '7 gün', hataBudcesi: '—' },
]

export const SLA_TAAHHUTLERI = {
  genelUptime: '%99.9 aylık',
  kesintKredisi: [
    { esik: 99.9, kredi: '%10 aylık ücret' },
    { esik: 99.0, kredi: '%25 aylık ücret' },
    { esik: 95.0, kredi: '%50 aylık ücret' },
  ],
  haricTutulanlar: ['Planlı bakım', 'Force majeure', '3rd party (iyzico/Twilio)'],
  kurumsalUptime: '%99.95',
  kurumsalDestek: { p1: '15 dakika', p2: '1 saat', p3: '4 saat' },
} as const

export const HATA_BUDCESI_POLITIKASI = {
  normal: { kalanMin: 50, aksiyon: 'Normal geliştirme hızı' },
  dikkatli: { kalanMin: 25, kalanMax: 50, aksiyon: 'Yeni özellik freeze — güvenilirlik öncelikli' },
  kritik: { kalanMin: 0, kalanMax: 25, aksiyon: 'Tüm deploy durdur — sadece bug fix + güvenilirlik' },
  tukendi: { aksiyon: 'Postmortem zorunlu + aksiyon planı tamamlanmadan deploy yok' },
} as const

// ══════════════════════════════════════════
// 4. ALERT KATALOĞU
// ══════════════════════════════════════════

export type AlertOncelik = 'p1' | 'p2' | 'p3' | 'p4'

export interface AlertTanimi {
  id: string; isim: string; oncelik: AlertOncelik; kosul: string
  olasıNeden: string[]; runbook: string; mudahaleSuresi: string
}

export const ALERT_KATALOGU: AlertTanimi[] = [
  // P1 — KRİTİK (5 dk)
  { id: 'p1_api_down', isim: 'API Tamamen Erişilemez', oncelik: 'p1', kosul: 'request_count = 0, 5dk', olasıNeden: ['Cloud Run çökmüş', 'DNS sorunu', 'GCP bölgesel kesinti'], runbook: 'runbook/api-down.md', mudahaleSuresi: '5 dakika' },
  { id: 'p1_hata_kritik', isim: '5xx Hata Oranı Kritik', oncelik: 'p1', kosul: '5xx_rate > %10, 5dk', olasıNeden: ['Kırık deploy', 'Firestore bağlantı', 'Bellek yetersiz'], runbook: 'runbook/high-error-rate.md', mudahaleSuresi: '5 dakika' },
  { id: 'p1_odeme', isim: 'Ödeme Sistemi Çökmüş', oncelik: 'p1', kosul: 'payment_success < %80, 10dk', olasıNeden: ['iyzico down', 'Ödeme servis bug', 'SSL sorunu'], runbook: 'runbook/payment-down.md', mudahaleSuresi: '5 dakika' },
  { id: 'p1_firestore', isim: 'Firestore Erişilemez', oncelik: 'p1', kosul: 'read_latency P95 > 10s, 3dk', olasıNeden: ['GCP kesintisi', 'Connection pool', 'Hotspot'], runbook: 'runbook/firestore-down.md', mudahaleSuresi: '5 dakika' },
  { id: 'p1_ssl', isim: 'SSL Sertifika Süre Dolumu', oncelik: 'p1', kosul: 'Sertifika < 3 gün', olasıNeden: ['Otomatik yenileme başarısız'], runbook: 'runbook/ssl-renewal.md', mudahaleSuresi: '5 dakika' },
  { id: 'p1_slo_tukendi', isim: 'SLO Hata Bütçesi Tükendi', oncelik: 'p1', kosul: '28 gün hata bütçesi = 0', olasıNeden: ['Tekrarlayan kesintiler'], runbook: 'runbook/slo-budget.md', mudahaleSuresi: '5 dakika' },
  // P2 — YÜKSEK (30 dk)
  { id: 'p2_gecikme', isim: 'API Gecikme Yüksek', oncelik: 'p2', kosul: 'P95 > 3s, 10dk', olasıNeden: ['Yavaş Firestore', 'AI timeout', 'N+1 sorgu'], runbook: 'runbook/high-latency.md', mudahaleSuresi: '30 dakika' },
  { id: 'p2_whatsapp', isim: 'WhatsApp Teslimat Düşük', oncelik: 'p2', kosul: 'delivery < %95, 30dk', olasıNeden: ['Twilio sorunu', 'Template rejected', 'Rate limit'], runbook: 'runbook/whatsapp-delivery.md', mudahaleSuresi: '30 dakika' },
  { id: 'p2_ai_yavas', isim: 'AI Servisi Yavaş', oncelik: 'p2', kosul: 'ai_proxy P95 > 30s, 5dk', olasıNeden: ['Claude yoğunluğu', 'Opus fazla', 'Rate limit'], runbook: 'runbook/ai-slow.md', mudahaleSuresi: '30 dakika' },
  { id: 'p2_scale_limit', isim: 'Cloud Run Limit Yakın', oncelik: 'p2', kosul: 'instances > max × %80', olasıNeden: ['Trafik spike', 'DDoS'], runbook: 'runbook/scale-limit.md', mudahaleSuresi: '30 dakika' },
  { id: 'p2_ai_maliyet', isim: 'AI Maliyet Bütçe Aşımı', oncelik: 'p2', kosul: 'daily_cost > $400', olasıNeden: ['Opus fazla', 'Routing arızası', 'Spam'], runbook: 'runbook/ai-cost.md', mudahaleSuresi: '30 dakika' },
  { id: 'p2_slo_dusuk', isim: 'SLO Bütçesi Düşük', oncelik: 'p2', kosul: 'hata bütçesi < %25', olasıNeden: ['Kademeli bozulma'], runbook: 'runbook/slo-budget.md', mudahaleSuresi: '30 dakika' },
  // P3 — ORTA (4 saat)
  { id: 'p3_cold_start', isim: 'Cold Start Yüksek', oncelik: 'p3', kosul: 'cold_start > %20, 1 saat', olasıNeden: ['min-instances düşük'], runbook: 'runbook/cold-start.md', mudahaleSuresi: '4 saat' },
  { id: 'p3_site_build', isim: 'Site Build Başarısızlığı', oncelik: 'p3', kosul: 'failure_rate > %5, 1 saat', olasıNeden: ['Şablon hatası', 'Bellek'], runbook: 'runbook/site-build.md', mudahaleSuresi: '4 saat' },
  { id: 'p3_secret', isim: 'Secret Rotasyon Yaklaşıyor', oncelik: 'p3', kosul: 'Son rotasyon > 75 gün', olasıNeden: ['Rutin bakım'], runbook: 'runbook/secret-rotation.md', mudahaleSuresi: '4 saat' },
  { id: 'p3_rum', isim: 'Esnaf Siteleri Yavaşladı', oncelik: 'p3', kosul: 'LCP P75 > 4s, 1 saat', olasıNeden: ['CDN sorunu', 'Büyük resim'], runbook: 'runbook/rum-perf.md', mudahaleSuresi: '4 saat' },
  // P4 — BİLGİLENDİRME
  { id: 'p4_maliyet', isim: 'Aylık Maliyet Uyarı', oncelik: 'p4', kosul: 'GCP harcama > %80 bütçe', olasıNeden: ['Doğal büyüme', 'Optimizasyon gerekli'], runbook: '', mudahaleSuresi: 'haftalık review' },
  { id: 'p4_churn', isim: 'Churn Trendi Yükseliyor', oncelik: 'p4', kosul: '3 hafta ardışık artış', olasıNeden: ['Ürün sorunu', 'Rakip', 'Fiyat'], runbook: '', mudahaleSuresi: 'haftalık review' },
  { id: 'p4_nps', isim: 'NPS Düşüş Trendi', oncelik: 'p4', kosul: 'Aylık NPS > 5 puan düşüş', olasıNeden: ['Kalite sorunu', 'Destek eksikliği'], runbook: '', mudahaleSuresi: 'haftalık review' },
]

// ══════════════════════════════════════════
// 5. CUSTOM METRİK TANIMLARI
// ══════════════════════════════════════════

export interface MetrikTanimi { isim: string; tip: 'counter' | 'gauge' | 'histogram'; etiketler: string[]; kategori: string }

export const CUSTOM_METRIKLER: MetrikTanimi[] = [
  // Auth
  { isim: 'kepenk.auth.login_count', tip: 'counter', etiketler: ['method', 'success', 'tier'], kategori: 'auth' },
  { isim: 'kepenk.auth.otp_send_count', tip: 'counter', etiketler: ['channel', 'success'], kategori: 'auth' },
  // Editor
  { isim: 'kepenk.editor.publish_count', tip: 'counter', etiketler: ['sektor', 'success'], kategori: 'editor' },
  { isim: 'kepenk.editor.publish_duration_seconds', tip: 'histogram', etiketler: ['sektor'], kategori: 'editor' },
  { isim: 'kepenk.editor.ai_generate_count', tip: 'counter', etiketler: ['sektor', 'model'], kategori: 'editor' },
  // E-Ticaret
  { isim: 'kepenk.ecom.order_count', tip: 'counter', etiketler: ['sektor', 'payment_method', 'success'], kategori: 'eticaret' },
  { isim: 'kepenk.ecom.order_amount_try', tip: 'histogram', etiketler: ['sektor'], kategori: 'eticaret' },
  { isim: 'kepenk.ecom.payment_failure_count', tip: 'counter', etiketler: ['reason', 'provider'], kategori: 'eticaret' },
  // WhatsApp
  { isim: 'kepenk.wa.message_sent_count', tip: 'counter', etiketler: ['template_type', 'category'], kategori: 'whatsapp' },
  { isim: 'kepenk.wa.message_delivered_count', tip: 'counter', etiketler: [], kategori: 'whatsapp' },
  { isim: 'kepenk.wa.delivery_latency_seconds', tip: 'histogram', etiketler: [], kategori: 'whatsapp' },
  { isim: 'kepenk.wa.ai_response_count', tip: 'counter', etiketler: ['intent', 'model', 'success'], kategori: 'whatsapp' },
  { isim: 'kepenk.wa.ai_response_latency_seconds', tip: 'histogram', etiketler: ['model'], kategori: 'whatsapp' },
  // AI/LLM
  { isim: 'kepenk.ai.request_count', tip: 'counter', etiketler: ['model', 'task_type', 'success'], kategori: 'ai' },
  { isim: 'kepenk.ai.request_latency_seconds', tip: 'histogram', etiketler: ['model', 'task_type'], kategori: 'ai' },
  { isim: 'kepenk.ai.input_tokens_total', tip: 'counter', etiketler: ['model', 'task_type'], kategori: 'ai' },
  { isim: 'kepenk.ai.output_tokens_total', tip: 'counter', etiketler: ['model', 'task_type'], kategori: 'ai' },
  { isim: 'kepenk.ai.cost_usd', tip: 'counter', etiketler: ['model', 'task_type'], kategori: 'ai' },
  { isim: 'kepenk.ai.cache_hit_count', tip: 'counter', etiketler: [], kategori: 'ai' },
  { isim: 'kepenk.ai.prompt_injection_blocked', tip: 'counter', etiketler: [], kategori: 'ai' },
  // Randevu
  { isim: 'kepenk.booking.appointment_count', tip: 'counter', etiketler: ['sektor', 'channel', 'status'], kategori: 'randevu' },
  { isim: 'kepenk.booking.no_show_count', tip: 'counter', etiketler: ['sektor'], kategori: 'randevu' },
]

// ══════════════════════════════════════════
// 6. RUM CORE WEB VITALS
// ══════════════════════════════════════════

export const RUM_HEDEFLERI = {
  lcp: { iyi: 2500, iyilestirme: 4000, birim: 'ms', hedefP75: 2500 },
  inp: { iyi: 200, iyilestirme: 500, birim: 'ms', hedefP75: 200 },
  cls: { iyi: 0.1, iyilestirme: 0.25, birim: 'score', hedefP75: 0.1 },
  ttfb: { hedefP75: 800, birim: 'ms' },
  fcp: { hedefP75: 1800, birim: 'ms' },
} as const

// ══════════════════════════════════════════
// 7. INCIDENT WORKFLOW
// ══════════════════════════════════════════

export const INCIDENT_WORKFLOW = {
  asamalar: ['tespit', 'onceliklendirme', 'mudahale', 'cozum', 'iletisim', 'postmortem'] as const,
  hedefMTTR: { p1: '< 1 saat', p2: '< 4 saat', p3: '< 24 saat' },
  postmortemZorunlu: ['p1', 'p2'] as const,
  postmortemSuresi: '48 saat içinde',
  postmortemFormat: ['Özet', 'Zaman çizelgesi', 'Kök neden (5 Neden)', 'Etki analizi', 'Aksiyon maddeleri', 'Öğrenilen dersler'],
  nobetciRotasyon: 'Haftalık (Pazartesi 10:00)',
  eskalasyon: [
    { seviye: 1, hedef: 'Birincil nöbetçi', sure: '5 dakika' },
    { seviye: 2, hedef: 'İkincil nöbetçi', sure: '15 dakika' },
    { seviye: 3, hedef: 'CTO', sure: '30 dakika' },
  ],
} as const

// ══════════════════════════════════════════
// 8. HEDEF METRİKLER
// ══════════════════════════════════════════

export const HEDEF_METRIKLER_MONITORING = {
  platform: { apiAvailability: '%99.9', apiP95: '<1s', siteAvailability: '%99.95', siteLCP: '<2.5s', waDelivery: '>%97', paymentSuccess: '>%99' },
  ai: { availability: '%99.5', haikuP95: '<3s', sonnetP95: '<10s', routingHaikuOran: '>%65', cacheHitRate: '>%30', dailyCost: '<$500' },
  operasyonel: { mttrP1: '<1 saat', mttrP2: '<4 saat', deploySuresi: '<15 dakika', deployBasari: '>%95', coldStart: '<%10', alertFalsePositive: '<%15' },
} as const

// ══════════════════════════════════════════
// 9. LOG STANDARDI
// ══════════════════════════════════════════

export const LOG_STANDARDI = {
  format: 'JSON',
  library: 'pino',
  zorunluAlanlar: ['timestamp', 'severity', 'service', 'trace_id', 'span_id', 'message'],
  seviyeRehberi: {
    DEBUG: 'Geliştirici detayı — SADECE dev/staging',
    INFO: 'Normal iş olayları',
    WARNING: 'Beklenen ama dikkat gerektiren durumlar',
    ERROR: 'İstek başarısız — kullanıcı etkilendi',
    CRITICAL: 'Sistem seviyesi hata — servis degrade/down',
  },
  piiLoglanmaz: ['Müşteri adı/soyadı', 'Telefon numarası', 'E-posta', 'TC Kimlik', 'IBAN', 'Kredi kartı', 'WhatsApp mesaj içeriği', 'Sağlık verileri', 'Adres detayı'],
  retention: { cloudLogging: '30 gün', bigqueryAnalytics: '365 gün', bigqueryAudit: '5 yıl (KVKK)', cloudTrace: '30 gün' },
} as const

// ══════════════════════════════════════════
// 10. GRAFANA DASHBOARD ORGANİZASYONU
// ══════════════════════════════════════════

export const GRAFANA_KLASORLER = [
  { id: '1', isim: 'Yönetici', dashboardlar: ['KPI Overview (C-Level)', 'Gelir & Büyüme'] },
  { id: '2', isim: 'Platform Operasyon', dashboardlar: ['Servis Sağlığı', 'Veritabanı', 'CDN & Edge'] },
  { id: '3', isim: 'Modül Bazlı', dashboardlar: ['E-Ticaret & Ödemeler', 'WhatsApp & Mesajlaşma', 'AI/LLM', 'Randevu', 'Restaurant OS', 'CRM'] },
  { id: '4', isim: 'Kullanıcı Deneyimi', dashboardlar: ['Dashboard Performansı', 'Esnaf Siteleri RUM', 'Onboarding Funnel'] },
  { id: '5', isim: 'Maliyet & FinOps', dashboardlar: ['GCP Maliyet Analizi', 'AI Maliyet Detayı', 'Esnaf Başına COGS'] },
  { id: '6', isim: 'Güvenlik', dashboardlar: ['Güvenlik Olayları', 'Audit Log', 'KVKK Uyumluluk'] },
  { id: '7', isim: 'SLO', dashboardlar: ['SLO Durumu', 'Hata Bütçesi Takibi'] },
] as const
