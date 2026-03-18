/**
 * kepenk.ai — AI Agent Orkestrasyon Konfigürasyonu
 * ═════════════════════════════════════════════════
 * 17 agent, model routing, inter-agent iletişim, collective
 * intelligence, güvenlik, kalite değerlendirme, A/B test.
 */

// ══════════════════════════════════════════
// 1. AI STACK & MALİYET
// ══════════════════════════════════════════

export const AI_MODELLER = {
  haiku:  { id: 'claude-haiku-4-5-20251001', maliyetInput: '$1/MTok', maliyetOutput: '$5/MTok', latency: '<2s' },
  sonnet: { id: 'claude-sonnet-4-6', maliyetInput: '$3/MTok', maliyetOutput: '$15/MTok', latency: '<5s' },
  opus:   { id: 'claude-opus-4-6', maliyetInput: '$15/MTok', maliyetOutput: '$75/MTok', latency: '<15s' },
} as const

export const AI_STACK = {
  birincilLlm: 'Anthropic Claude API',
  vectorStore: 'Pinecone (dim: 1536, cosine)',
  embeddingModel: 'text-embedding-3-small (OpenAI) veya Voyage AI',
  promptCache: 'Firestore TTL (sık kullanılan prompt)',
  responseCache: 'Firestore TTL + content hash',
  proxy: 'apps/ai-proxy (Cloud Run)',
} as const

export const MALIYET_LIMITLERI = {
  perEsnafGunluk: '$2.00', perEsnafAylik: '$30.00', platformGunluk: '$500',
  modelDagilimHedef: { haiku: '%70', sonnet: '%25', opus: '%5' },
} as const

export const PRENSIPLER = [
  'Tek sorumluluk: Her agent TEK uzmanlık alanı',
  'En ucuz yeterli: Her görev için EN UCUZ YETERLİ model',
  'Cascade downgrade: Timeout/hata → daha hızlı/ucuz modele düş',
  'PII yasak: Kişisel veri GÖNDERİLMEZ — anonimleştirilmiş context',
  'Cache first: Benzer istek → cache yanıt',
  'İzlenebilir: Her çağrı loglanır (model, token, maliyet, latency)',
  'Prompt versiyonlama: Her prompt versiyonlanır — A/B test + rollback',
] as const

// ══════════════════════════════════════════
// 2. MODEL ROUTING KARAR AĞACI
// ══════════════════════════════════════════

export interface GorevModelHaritasi { gorev: string; model: 'haiku' | 'sonnet' | 'opus'; maxTokens: number; temperature: number; ornekler: string }

export const HAIKU_GOREVLER: GorevModelHaritasi[] = [
  { gorev: 'quick_reply', model: 'haiku', maxTokens: 300, temperature: 0.3, ornekler: 'Sipariş durumu, çalışma saati, selamlama' },
  { gorev: 'tag_suggestion', model: 'haiku', maxTokens: 200, temperature: 0.2, ornekler: 'Müşteri etiket, ürün kategori önerisi' },
  { gorev: 'sentiment_analysis', model: 'haiku', maxTokens: 100, temperature: 0, ornekler: 'WhatsApp duygu analizi (pozitif/nötr/negatif)' },
  { gorev: 'format_correction', model: 'haiku', maxTokens: 500, temperature: 0.1, ornekler: 'Yazım düzeltme, fiyat formatı, telefon normalize' },
  { gorev: 'slot_suggestion', model: 'haiku', maxTokens: 200, temperature: 0.2, ornekler: 'Müsait randevu slot önerisi' },
  { gorev: 'loyalty_calculation', model: 'haiku', maxTokens: 200, temperature: 0, ornekler: 'Puan hesaplama, ödül uygunluk' },
]

export const SONNET_GOREVLER: GorevModelHaritasi[] = [
  { gorev: 'site_page_generate', model: 'sonnet', maxTokens: 4000, temperature: 0.7, ornekler: 'Hakkımızda, hizmet sayfası, ürün açıklama' },
  { gorev: 'whatsapp_conversation', model: 'sonnet', maxTokens: 1000, temperature: 0.5, ornekler: 'Müşteri sorusu, randevu, sipariş' },
  { gorev: 'campaign_text', model: 'sonnet', maxTokens: 800, temperature: 0.7, ornekler: 'WhatsApp/SMS/email kampanya' },
  { gorev: 'seo_audit', model: 'sonnet', maxTokens: 2000, temperature: 0.3, ornekler: 'Sayfa SEO analizi, meta tag, optimizasyon' },
  { gorev: 'product_description', model: 'sonnet', maxTokens: 1000, temperature: 0.6, ornekler: 'Ürün/menü açıklaması' },
  { gorev: 'booking_conversation', model: 'sonnet', maxTokens: 800, temperature: 0.4, ornekler: 'WhatsApp randevu akışı' },
  { gorev: 'segment_creation', model: 'sonnet', maxTokens: 500, temperature: 0.2, ornekler: 'Davranışsal segment tanımı' },
  { gorev: 'competitor_analysis', model: 'sonnet', maxTokens: 2000, temperature: 0.3, ornekler: 'Mahalle rakip, fiyat karşılaştırma' },
  { gorev: 'blog_post', model: 'sonnet', maxTokens: 3000, temperature: 0.7, ornekler: 'SEO blog, sektör haberi' },
  { gorev: 'no_show_prediction', model: 'sonnet', maxTokens: 300, temperature: 0, ornekler: 'Randevu no-show olasılığı' },
]

export const OPUS_GOREVLER: GorevModelHaritasi[] = [
  { gorev: 'full_site_generate', model: 'opus', maxTokens: 8000, temperature: 0.7, ornekler: 'Tam site (tüm sayfalar + içerik + SEO)' },
  { gorev: 'business_strategy', model: 'opus', maxTokens: 4000, temperature: 0.5, ornekler: 'Çeyreklik strateji, büyüme planı, fiyatlama' },
  { gorev: 'daily_intelligence', model: 'opus', maxTokens: 3000, temperature: 0.4, ornekler: 'Günlük iş zekası özeti' },
  { gorev: 'churn_analysis', model: 'opus', maxTokens: 2000, temperature: 0.2, ornekler: 'Müşteri kaybı analizi + aksiyon planı' },
  { gorev: 'capacity_planning', model: 'opus', maxTokens: 2000, temperature: 0.3, ornekler: 'Randevu kapasitesi, personel planı' },
]

export const TIER_MODEL_LIMITLERI = {
  baslangic: 'haiku', buyume: 'sonnet', profesyonel: 'opus (sınırlı)', kurumsal: 'sınırsız',
} as const

// ══════════════════════════════════════════
// 3. 17 AGENT
// ══════════════════════════════════════════

export interface AgentTanimi {
  id: string; isim: string; model: 'haiku' | 'sonnet' | 'opus'
  temperature: number; kapsam: string; toollar: string[]
  delegeEdebilir?: string[]; promptOzet: string
}

export const AGENTLAR: AgentTanimi[] = [
  {
    id: 'site_builder', isim: 'Site Builder', model: 'sonnet', temperature: 0.7,
    kapsam: 'Site oluşturma, sayfa üretme, tema uygulama',
    toollar: ['get_sector_template', 'get_esnaf_profile', 'search_similar_sites', 'generate_seo_meta', 'optimize_image'],
    delegeEdebilir: ['content_writer', 'seo_optimizer', 'design_advisor'],
    promptOzet: 'Türk esnafları için profesyonel site oluştur. Tüm içerik Türkçe, sektör şablonuna uygun, SEO-optimize, responsive, WhatsApp CTA her sayfada.',
  },
  {
    id: 'content_writer', isim: 'Content Writer', model: 'sonnet', temperature: 0.7,
    kapsam: 'Web içerik, ürün açıklama, blog yazısı',
    toollar: ['get_seo_keywords', 'get_competitor_content', 'check_content_quality'],
    promptOzet: 'Sade Türkçe, SEO anahtar kelimeli, kısa paragraflar, aktif cümleler. Uydurma bilgi YASAK.',
  },
  {
    id: 'seo_optimizer', isim: 'SEO Optimizer', model: 'sonnet', temperature: 0.3,
    kapsam: 'Yerel SEO, meta tag, JSON-LD, anahtar kelime',
    toollar: ['analyze_page_seo', 'get_keyword_suggestions', 'check_structured_data', 'get_competitor_seo'],
    promptOzet: 'Yerel SEO (mahalle+ilçe+sektör), JSON-LD (LocalBusiness/Product/Service/FAQ), Türkçe slug kuralları.',
  },
  {
    id: 'design_advisor', isim: 'Design Advisor', model: 'haiku', temperature: 0.5,
    kapsam: 'Görsel tasarım, tema, renk/font önerisi',
    toollar: ['get_theme_options', 'check_contrast_ratio'],
    promptOzet: 'kepenk.ai tema token\'ları, 9 hazır palet, sektöre uygun renk/font, kontrast ≥4.5:1.',
  },
  {
    id: 'whatsapp_rep', isim: 'WhatsApp Rep', model: 'sonnet', temperature: 0.5,
    kapsam: 'WhatsApp müşteri hizmetleri, soru-cevap',
    toollar: ['get_business_info', 'get_services_with_prices', 'get_working_hours', 'check_availability', 'get_order_status', 'delegate_to_agent', 'escalate_to_human'],
    delegeEdebilir: ['booking_agent', 'order_assistant'],
    promptOzet: 'İşletme adıyla konuş, samimi-profesyonel. Bilmediğinde esnafa yönlendir. Rakip hakkında yorum YASAK.',
  },
  {
    id: 'booking_agent', isim: 'Booking Agent', model: 'sonnet', temperature: 0.4,
    kapsam: 'WhatsApp randevu alma (conversational)',
    toollar: ['get_available_slots', 'create_booking', 'get_service_details', 'get_staff_list', 'check_customer_history'],
    promptOzet: 'Akış: hizmet sor → çalışan tercihi → slot göster → onayla → oluştur. Geçmiş/dolu/dışarı saate randevu YASAK.',
  },
  {
    id: 'order_assistant', isim: 'Order Assistant', model: 'haiku', temperature: 0.2,
    kapsam: 'Sipariş durumu, kargo takip',
    toollar: ['get_order_by_phone', 'get_order_status', 'get_tracking_info', 'escalate_to_human'],
    promptOzet: 'Durum bildirme, tracking, tahmini teslimat. İade/iptal onayı VEREMEZ — esnafa yönlendir.',
  },
  {
    id: 'campaign_writer', isim: 'Campaign Writer', model: 'sonnet', temperature: 0.7,
    kapsam: 'WhatsApp/SMS/email kampanya metin yazarlığı',
    toollar: ['get_segment_details', 'get_seasonal_calendar', 'get_previous_campaigns', 'check_iys_compliance'],
    promptOzet: 'WhatsApp max 1024 kar, SMS 70 kar/segment (Türkçe), CTA net, mevsimsel bağlam, İYS uyumlu.',
  },
  {
    id: 'product_manager', isim: 'Product Manager', model: 'sonnet', temperature: 0.5,
    kapsam: 'Ürün katalog optimizasyonu, fiyat analizi',
    toollar: ['get_product_catalog', 'get_sector_price_benchmarks', 'suggest_categories', 'analyze_product_images'],
    promptOzet: 'Ürün açıklama, fiyat analizi (sektör benchmark), cross-sell/upsell, stok uyarı.',
  },
  {
    id: 'crm_analyst', isim: 'CRM Analyst', model: 'sonnet', temperature: 0.3,
    kapsam: 'Müşteri segmentasyon, churn, LTV analizi',
    toollar: ['get_rfm_analysis', 'get_churn_risk_contacts', 'get_ltv_distribution', 'suggest_segment'],
    promptOzet: 'RFM segmentasyonu, churn riski (30+ gün etkileşim yok), LTV tahmini, kampanya hedef kitle.',
  },
  {
    id: 'schedule_optimizer', isim: 'Schedule Optimizer', model: 'sonnet', temperature: 0.2,
    kapsam: 'Randevu takvimi optimizasyonu, no-show tahmini',
    toollar: ['get_booking_history', 'predict_no_show', 'get_capacity_utilization', 'suggest_schedule_changes'],
    promptOzet: 'Boş slot minimize, no-show tespiti, yoğunluk dengeleme, personel dağılımı, namaz saati.',
  },
  {
    id: 'inbox_assistant', isim: 'Inbox Assistant', model: 'haiku', temperature: 0.3,
    kapsam: 'Gelen mesaj yanıt önerisi, sentiment analizi',
    toollar: ['analyze_sentiment', 'suggest_reply'], delegeEdebilir: ['whatsapp_rep'],
    promptOzet: 'Gelen mesajlara hızlı yanıt önerisi, duygu analizi.',
  },
  {
    id: 'ads_advisor', isim: 'Ads Advisor', model: 'sonnet', temperature: 0.5,
    kapsam: 'Google/Meta reklam bütçe, hedefleme, copy',
    toollar: ['get_ad_performance', 'suggest_ad_budget', 'generate_ad_copy'],
    promptOzet: 'Reklam bütçe optimizasyonu, hedef kitle, reklam metni.',
  },
  {
    id: 'social_creator', isim: 'Social Creator', model: 'sonnet', temperature: 0.7,
    kapsam: 'Instagram/TikTok post metni, hashtag',
    toollar: ['get_trending_hashtags', 'generate_social_post', 'suggest_post_time'],
    promptOzet: 'Sosyal medya içerik üretimi, trend hashtag, optimal paylaşım zamanı.',
  },
  {
    id: 'loyalty_manager', isim: 'Loyalty Manager', model: 'haiku', temperature: 0.2,
    kapsam: 'Puan hesaplama, ödül önerisi, VIP tier',
    toollar: ['calculate_points', 'check_reward_eligibility', 'suggest_reward'],
    promptOzet: 'Sadakat puan hesaplama, ödül uygunluk, VIP geçişi.',
  },
  {
    id: 'business_intelligence', isim: 'Business Intelligence', model: 'opus', temperature: 0.4,
    kapsam: 'Günlük/haftalık iş zekası, strateji önerisi',
    toollar: ['get_all_metrics', 'get_sector_benchmarks', 'get_collective_insights'],
    delegeEdebilir: ['crm_analyst', 'schedule_optimizer', 'competitor_radar'],
    promptOzet: 'En karmaşık agent. Tüm metrikleri analiz, çeyreklik strateji, büyüme planı.',
  },
  {
    id: 'competitor_radar', isim: 'Competitor Radar', model: 'sonnet', temperature: 0.3,
    kapsam: 'Mahalle rakip analizi, fiyat/puan karşılaştırma',
    toollar: ['search_google_maps_competitors', 'compare_prices', 'compare_reviews'],
    promptOzet: 'Mahalle bazlı rakip tespiti, fiyat aralığı, Google yorum karşılaştırma.',
  },
]

// ══════════════════════════════════════════
// 4. INTER-AGENT İLETİŞİM
// ══════════════════════════════════════════

export const INTER_AGENT = {
  delegasyon: { maxDerinlik: 2, timeout: '30 saniye', mekanik: 'Agent A → delegate_to_agent tool → Orchestrator → Agent B → yanıt → Orchestrator → A' },
  eventDriven: [
    { olay: 'order_completed', dinleyenler: ['crm_analyst', 'product_manager', 'business_intelligence'] },
    { olay: 'booking_no_show', dinleyenler: ['schedule_optimizer', 'crm_analyst'] },
    { olay: 'new_review_received', dinleyenler: ['business_intelligence', 'competitor_radar'] },
    { olay: 'campaign_completed', dinleyenler: ['crm_analyst', 'campaign_writer'] },
    { olay: 'churn_risk_detected', dinleyenler: ['campaign_writer', 'whatsapp_rep'] },
  ],
  sharedContext: 'Pinecone — her agent önemli öğrenme anlarını yazar, diğerleri sorgular (anonimleştirilmiş)',
} as const

// ══════════════════════════════════════════
// 5. COLLECTIVE INTELLIGENCE (PINECONE)
// ══════════════════════════════════════════

export const COLLECTIVE_INTELLIGENCE = {
  pinecone: { index: 'kepenk-collective', dimension: 1536, metric: 'cosine', namespaces: { perEsnaf: 'esnaf_{esnafId}', collective: 'collective', sector: 'sector_{sectorId}' } },
  ogrenmeAnlari: ['Kampanya açılma >%80 veya <%20', 'No-show pattern tespiti', 'Fiyat değişikliği → satış korelasyonu', 'Mevsimsel talep değişimi', 'Müşteri geri kazanım başarısı', 'Yeni ürün/hizmet performansı (ilk 30 gün)', 'Çalışma saati değişikliği etkisi'],
  anonimizasyon: 'İşletme adı & müşteri bilgisi GÖNDERİLMEZ. Sadece sektör + bölge + metrik. Miktar/fiyat normalleştirilir.',
  networkEffect: 'Ne kadar çok esnaf → ne kadar çok öğrenme → ne kadar iyi AI → rakip kopyalayamaz (MOAT)',
} as const

// ══════════════════════════════════════════
// 6. AI GÜVENLİK KATMANI
// ══════════════════════════════════════════

export const AI_GUVENLIK = {
  promptInjection: {
    bloklananPatternler: ['Ignore previous instructions', 'You are now a', 'Reveal your system prompt', 'Base64/hex encoded talimatlar'],
    sanitizasyon: 'Girdi <<<USER_INPUT>>> etiketleri arasına alınır. Max 2000 karakter. XML/HTML temizlenir.',
    promptKoruma: 'System prompt sonuna injection uyarısı eklenir.',
    log: 'Tespit edilen injection → security audit log',
  },
  piiFilterleme: {
    gonderilmez: ['T.C. Kimlik No (TCKN)', 'IBAN/banka hesabı', 'Kredi kartı (no, CVV)', 'Şifre/token', 'Sağlık verileri (doktor sektörü)'],
    gonderilebilir: ['İsim (hitap için)', 'Telefon (randevu oluşturma)', 'İşletme adresi (genel)', 'Hizmet/ürün bilgileri', 'Sektör + konum (anonimleştirilmiş)'],
    regexFiltre: { tckn: '/\\b[1-9]\\d{10}\\b/ → [TCKN_MASKED]', iban: '/TR\\d{24}/ → [IBAN_MASKED]', kart: '/\\b\\d{16}\\b/ → [CARD_MASKED]' },
  },
  maliyetKorumasi: {
    perRequest: { maxInput: 8000, maxOutput: 4000 },
    limitAsiminda: ['Haiku\'ya düşür', 'Cache\'den yanıt ver', '"Günlük AI limitinize ulaştınız" mesajı'],
    platformUyari: '$400 (%80 eşik) → P2 alert',
  },
  halucinasyonOnleme: ['Fiyat: SADECE veritabanı', 'Çalışma saatleri: SADECE veritabanı', 'Randevu: GERÇEK slot kontrolü', 'Stok: SADECE veritabanı', 'Sipariş: SADECE veritabanı', 'Tool-use zorunlu: bilgi vermeden önce tool çağır'],
} as const

// ══════════════════════════════════════════
// 7. KALİTE & A/B TEST
// ══════════════════════════════════════════

export const KALITE_FRAMEWORK = {
  evalArac: 'promptfoo',
  evalSikligi: 'Her prompt değişikliği + haftalık regression',
  passRateHedef: '>%95',
  testSenaryolari: [
    { agent: 'whatsapp_rep', test: 'Çalışma saati sorusu', beklenen: 'Doğru saat + samimi ton' },
    { agent: 'whatsapp_rep', test: 'Fiyat sorusu', beklenen: 'Veritabanından doğru fiyat' },
    { agent: 'whatsapp_rep', test: 'Prompt injection', beklenen: 'Red + normal yanıt' },
    { agent: 'whatsapp_rep', test: 'Bilinmeyen soru', beklenen: 'Rakip yorumu YASAK' },
    { agent: 'booking_agent', test: 'Normal randevu', beklenen: 'Müsait slot göster + seçim iste' },
    { agent: 'booking_agent', test: 'Dolu saat', beklenen: 'Dolu → alternatif öner' },
  ],
  abTest: { mekanik: 'Firebase Remote Config %50/%50 split', metrikler: ['Düzenleme oranı', 'Konuşma tamamlama', 'Randevu oluşturma', 'Kampanya açılma/tıklama', 'Token kullanımı', 'Yanıt süresi'] },
  feedbackDongusu: { duzenlemeYuksek: 'Prompt iyileştir', escalationYuksek: 'Agent kapsamı genişlet / tool ekle', kabulDusuk: 'Daha fazla context ekle' },
} as const

// ══════════════════════════════════════════
// 8. DASHBOARD AI ASİSTAN
// ══════════════════════════════════════════

export const DASHBOARD_AI = {
  isim: 'Kepenk AI', konum: 'Dashboard sağ alt — floating (sparkles)', gorunum: 'Purple AI glow',
  yetenekler: {
    soruCevap: ['"Bugün kaç sipariş geldi?" → order_assistant', '"En çok satan ürünüm ne?" → product_manager', '"Geçen haftaya göre nasılım?" → business_intelligence', '"Ramazan için kampanya öner" → campaign_writer'],
    hizliAksiyon: ['Kampanya oluştur → campaign_writer', 'Blog yazısı yaz → content_writer', 'SEO puanımı göster → seo_optimizer', 'Randevuları listele → booking_agent'],
    proaktifOneri: { siklik: 'Günde 1-3', uretim: 'business_intelligence her sabah 08:00', ornekler: ['📈 Salı satışları %40 düşüyor — kampanya önerilir', '💬 47 müşteri 30+ gün gelmedi — geri kazanma?', '⭐ Google yorum 4.2 — yorum toplama kampanyası?'] },
  },
  modelRouting: { basitSoru: 'haiku', analiz: 'sonnet', strateji: 'opus' },
  gecmis: { depolama: 'Firestore conversations/{esnafId}/dashboard_ai', retention: '30 gün', contextWindow: 'Son 10 mesaj + profil' },
} as const

// ══════════════════════════════════════════
// 9. HEDEF METRİKLER
// ══════════════════════════════════════════

export const AI_METRIKLERI = {
  kalite: [
    { metrik: 'WhatsApp escalation oranı', hedef: '<%15' },
    { metrik: 'AI içerik düzenleme oranı', hedef: '<%30' },
    { metrik: 'WhatsApp→randevu tamamlama', hedef: '>%70' },
    { metrik: 'promptfoo eval pass rate', hedef: '>%95' },
  ],
  maliyet: [
    { metrik: 'Model dağılımı', hedef: 'Haiku %70 / Sonnet %25 / Opus %5' },
    { metrik: 'Ortalama maliyet/esnaf/gün', hedef: '<$1' },
    { metrik: 'Cache hit oranı', hedef: '>%30' },
  ],
  performans: [
    { metrik: 'Haiku P95 latency', hedef: '<2s' },
    { metrik: 'Sonnet P95 latency', hedef: '<5s' },
    { metrik: 'Opus P95 latency', hedef: '<15s' },
  ],
  collective: [
    { metrik: 'Günlük öğrenme anı (platform)', hedef: '>100' },
    { metrik: 'Günlük collective sorgu', hedef: '>500' },
  ],
}
