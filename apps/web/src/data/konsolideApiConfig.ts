/**
 * kepenk.ai — Konsolide API & Veri Modeli Konfigürasyonu
 * ═══════════════════════════════════════════════════════
 * Firestore koleksiyon haritası, REST endpoint kataloğu,
 * entity ilişkileri, index stratejisi — MASTER İNDEKS.
 */

// ══════════════════════════════════════════
// 1. VERİ MİMARİSİ SABİTLERİ
// ══════════════════════════════════════════

export const VERI_KATMANLARI = {
  birincilDb: 'Firestore (Native mode) — operasyonel veri',
  analitikDw: 'BigQuery — raporlama, uzun vadeli analitik',
  blob: 'Cloud Storage (GCS) — medya, fatura PDF, site JSON',
  cache: 'Firestore TTL dokümanları + Cloudflare KV (edge)',
  vector: 'Pinecone — AI collective intelligence, semantic search',
  search: 'Firestore composite indexes (temel) + Typesense (gelecek)',
} as const

export const FIRESTORE_KURALLARI = {
  dokumanBoyutLimiti: '1 MB (hard limit)',
  koleksiyonIsimlendirme: 'camelCase',
  dokumanId: 'Auto-generated veya anlamlı ID (slug, order number)',
  tenantIzolasyon: 'Her doküman esnafId alanı → security rules zorunlu',
  revision: 'Her update\'te revision++ (yazma çakışması önleme)',
  softDelete: 'deletedAt timestamp (gerçek silme → KVKK hariç)',
  timestamp: 'FieldValue.serverTimestamp()',
} as const

export const API_KURALLARI = {
  baseUrl: 'https://api.kepenk.ai/v1',
  auth: 'Bearer token (Firebase Auth ID token)',
  format: 'JSON',
  sayfalama: 'Cursor-based (Firestore startAfter)',
  hataFormati: 'ErrorResponse (Prompt #19)',
  versiyonlama: '/v1/ prefix — breaking change → /v2/',
} as const

// ══════════════════════════════════════════
// 2. FİRESTORE KOLEKSİYON HARİTASI
// ══════════════════════════════════════════

export interface KoleksiyonRef {
  koleksiyon: string; aciklama: string; altKoleksiyonlar?: string[]; prompt?: string
}

export const KOLEKSIYON_HARITASI: KoleksiyonRef[] = [
  // ── CORE ──
  { koleksiyon: 'esnaflar/{esnafId}', aciklama: 'Esnaf hesapları & profilleri', altKoleksiyonlar: ['settings/', 'integrations/'] },
  { koleksiyon: 'sites/{siteId}', aciklama: 'Site manifesto & yapılandırma', altKoleksiyonlar: ['pages/'], prompt: 'Prompt #1' },
  { koleksiyon: 'products/{productId}', aciklama: 'Ürünler & hizmetler', altKoleksiyonlar: ['variants/'], prompt: 'Prompt #3' },
  { koleksiyon: 'categories/', aciklama: 'Ürün/hizmet kategorileri' },
  { koleksiyon: 'orders/{orderId}', aciklama: 'Siparişler', altKoleksiyonlar: ['timeline/'], prompt: 'Prompt #3' },
  { koleksiyon: 'carts/', aciklama: 'Aktif sepetler' },
  { koleksiyon: 'contacts/{contactId}', aciklama: 'Müşteri/kişi kayıtları (CRM)', altKoleksiyonlar: ['activities/'], prompt: 'Prompt #4' },
  { koleksiyon: 'bookings/', aciklama: 'Randevular', prompt: 'Prompt #7' },
  { koleksiyon: 'services/', aciklama: 'Randevu hizmetleri' },
  { koleksiyon: 'schedules/', aciklama: 'Çalışma programları' },
  { koleksiyon: 'staff/', aciklama: 'Çalışanlar' },
  // ── CRM & PAZARLAMA ──
  { koleksiyon: 'campaigns/{campaignId}', aciklama: 'Pazarlama kampanyaları', altKoleksiyonlar: ['recipients/'], prompt: 'Prompt #4' },
  { koleksiyon: 'automations/', aciklama: 'CRM otomasyonları' },
  { koleksiyon: 'segments/', aciklama: 'Müşteri segmentleri' },
  { koleksiyon: 'labels/', aciklama: 'Etiket tanımları' },
  { koleksiyon: 'loyalty/{programId}', aciklama: 'Sadakat programları', altKoleksiyonlar: ['accounts/'] },
  // ── FİNANS ──
  { koleksiyon: 'invoices/', aciklama: 'Faturalar (e-Fatura/e-Arşiv)', prompt: 'Prompt #25' },
  { koleksiyon: 'payments/', aciklama: 'Ödeme kayıtları' },
  // ── İLETİŞİM ──
  { koleksiyon: 'conversations/{convId}', aciklama: 'WhatsApp/SMS/email konuşmaları', altKoleksiyonlar: ['messages/'] },
  { koleksiyon: 'notifications/', aciklama: 'Bildirimler (push, in-app)' },
  // ── ANALİTİK ──
  { koleksiyon: 'analytics_events/', aciklama: 'Event buffer (→BigQuery)' },
  // ── GÖÇ ──
  { koleksiyon: 'migrations/', aciklama: 'Veri göçü kayıtları', prompt: 'Prompt #23' },
  // ── DENETİM ──
  { koleksiyon: 'audit_logs/', aciklama: 'Güvenlik denetim kayıtları' },
  // ── RESTAURANT OS ──
  { koleksiyon: 'menuItems/', aciklama: 'Restoran menü öğeleri', prompt: 'Prompt #11' },
  { koleksiyon: 'recipes/', aciklama: 'Reçeteler' },
  { koleksiyon: 'tables/', aciklama: 'Masa planı' },
  { koleksiyon: 'floorPlans/', aciklama: 'Kat planları' },
  { koleksiyon: 'checks/{checkId}', aciklama: 'Adisyonlar', altKoleksiyonlar: ['items/'] },
  { koleksiyon: 'kitchenOrders/', aciklama: 'Mutfak siparişleri (KDS)' },
  // ── MARKETPLACE ──
  { koleksiyon: 'marketplaceListings/', aciklama: 'Trendyol/HB/n11 listeleme', prompt: 'Prompt #24' },
  { koleksiyon: 'marketplaceOrders/', aciklama: 'Marketplace siparişleri' },
  // ── SİSTEM ──
  { koleksiyon: 'system_counters/', aciklama: 'Distributed counter (fatura/sipariş no)' },
  { koleksiyon: 'feature_flags/', aciklama: 'Feature flag konfigürasyonları' },
  { koleksiyon: 'sector_templates/', aciklama: 'Sektör şablonları' },
  { koleksiyon: 'collective_intelligence/', aciklama: 'AI öğrenme metadatası (Pinecone ref)' },
]

// ══════════════════════════════════════════
// 3. ENTITY İLİŞKİ HARİTASI
// ══════════════════════════════════════════

export interface EntityIliski { kaynak: string; hedef: string; tip: '1:1' | '1:N' | 'N:M'; aciklama: string }

export const ENTITY_ILISKILERI: EntityIliski[] = [
  { kaynak: 'Esnaf', hedef: 'Product', tip: '1:N', aciklama: 'Esnaf birden fazla ürün/hizmet' },
  { kaynak: 'Product', hedef: 'Variant', tip: '1:N', aciklama: 'Ürün birden fazla varyant' },
  { kaynak: 'Esnaf', hedef: 'Contact', tip: '1:N', aciklama: 'Esnafın müşterileri' },
  { kaynak: 'Contact', hedef: 'Order', tip: '1:N', aciklama: 'Müşteri birden fazla sipariş' },
  { kaynak: 'Order', hedef: 'Product', tip: 'N:M', aciklama: 'Sipariş kalemlerinde (lineItems)' },
  { kaynak: 'Order', hedef: 'Payment', tip: '1:1', aciklama: 'Sipariş bir ödeme' },
  { kaynak: 'Order', hedef: 'Invoice', tip: '1:1', aciklama: 'Sipariş bir fatura' },
  { kaynak: 'Contact', hedef: 'Booking', tip: '1:N', aciklama: 'Müşteri birden fazla randevu' },
  { kaynak: 'Booking', hedef: 'Service', tip: 'N:M', aciklama: 'Randevu hizmetlere bağlı' },
  { kaynak: 'Service', hedef: 'Staff', tip: 'N:M', aciklama: 'Hizmet birden fazla çalışana atanabilir' },
  { kaynak: 'Esnaf', hedef: 'Site', tip: '1:1', aciklama: 'Esnaf bir site' },
  { kaynak: 'Site', hedef: 'Page', tip: '1:N', aciklama: 'Site birden fazla sayfa' },
  { kaynak: 'MenuItem', hedef: 'Check', tip: 'N:M', aciklama: 'Menü→adisyon kalemleri' },
  { kaynak: 'Check', hedef: 'Table', tip: '1:1', aciklama: 'Adisyon bir masa' },
]

// ══════════════════════════════════════════
// 4. CORE ENTITY TIPLER (Özet)
// ══════════════════════════════════════════

export const ENTITY_SEMALARI = {
  esnaf: { koleksiyon: 'esnaflar/{esnafId}', kritikAlanlar: ['businessName', 'ownerName', 'sectorId', 'phone', 'vkn/tckn', 'subscription.tier/status', 'siteId', 'domain', 'healthScore'], sectorTipleri: ['berber', 'kuafor', 'restoran', 'kafe', 'doktor', 'dis_hekimi', 'veteriner', 'tamirci', 'ogretmen', 'fotograf', 'spor_salonu', 'eczane', 'market', 'diger'] },
  product: { koleksiyon: 'products/{productId}', kritikAlanlar: ['name', 'productType (physical/digital/service)', 'priceRange', 'currency: TRY', 'taxConfig (1/10/20)', 'media[]', 'variants[]', 'categoryIds', 'status', 'inventorySummary'], tipler: ['physical', 'digital', 'service'] },
  order: { koleksiyon: 'orders/{orderId}', kritikAlanlar: ['orderNumber (KPN-2026-XXXXXX)', 'customerId', 'lineItems[]', 'totals (subtotal/tax/shipping/discount/grand)', 'paymentStatus/Method', 'shippingMethod', 'invoiceId', 'status', 'channel'], durumlar: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'completed', 'cancelled', 'returned'], kanallar: ['web', 'whatsapp', 'pos', 'marketplace_trendyol', 'marketplace_hb', 'marketplace_n11', 'phone'] },
  contact: { koleksiyon: 'contacts/{contactId}', kritikAlanlar: ['identityTier (visitor/contact/customer)', 'info (name/birthdate/gender)', 'channels (emails/phones/whatsapp/addresses)', 'labelIds', 'aiMeta (behavioral/churnRisk/LTV)', 'consent (KVKK/İYS)', 'metrics (orders/spent/bookings)'] },
  booking: { koleksiyon: 'bookings/{bookingId}', kritikAlanlar: ['serviceId', 'staffId', 'contactId', 'startTime/endTime', 'status', 'paymentStatus', 'channel', 'reminders'], durumlar: ['pending', 'confirmed', 'arrived', 'in_progress', 'completed', 'cancelled', 'no_show'] },
  invoice: { koleksiyon: 'invoices/{invoiceId}', kritikAlanlar: ['invoiceNumber', 'uuid (GİB)', 'documentType (efatura/earsiv/eirsaliye/esmm/eadisyon)', 'invoiceProfile', 'invoiceType (SATIS/IADE)', 'supplier/customer', 'lineItems', 'totals', 'status', 'provider (nilvera/elogo)'] },
  site: { koleksiyon: 'sites/{siteId}', kritikAlanlar: ['manifestId', 'version/publishedVersion', 'pages[]', 'siteConfig (domain/customDomain/locale/sector/brandColors/fonts/contact)', 'seo', 'navigation', 'themeId'] },
  menuItem: { koleksiyon: 'menuItems/{id}', kritikAlanlar: ['title', 'categoryId', 'price (kuruş)', 'taxRate', 'allergens', 'modifiers', 'portions', 'recipeId'] },
  check: { koleksiyon: 'checks/{checkId}', kritikAlanlar: ['checkNumber', 'tableId', 'staffId', 'items[]', 'totals', 'status', 'paymentMethod', 'guestCount', 'channel (dine_in/takeaway/delivery/qr_order)'] },
  table: { koleksiyon: 'tables/{tableId}', kritikAlanlar: ['number', 'capacity', 'position', 'shape', 'status (available/occupied/reserved/cleaning)', 'currentCheckId'] },
} as const

// ══════════════════════════════════════════
// 5. REST API ENDPOINT KATALOĞU
// ══════════════════════════════════════════

export interface EndpointGrup { modul: string; endpointler: { yontem: string; yol: string; aciklama: string }[]; prompt?: string }

export const API_ENDPOINT_KATALOGU: EndpointGrup[] = [
  { modul: 'Auth', endpointler: [
    { yontem: 'POST', yol: '/v1/auth/otp/send', aciklama: 'OTP gönder (WhatsApp/SMS)' },
    { yontem: 'POST', yol: '/v1/auth/otp/verify', aciklama: 'OTP doğrula → token al' },
    { yontem: 'POST', yol: '/v1/auth/refresh', aciklama: 'Token yenile' },
    { yontem: 'POST', yol: '/v1/auth/logout', aciklama: 'Oturum sonlandır' },
    { yontem: 'GET', yol: '/v1/auth/me', aciklama: 'Mevcut kullanıcı' },
  ]},
  { modul: 'Esnaf', endpointler: [
    { yontem: 'GET', yol: '/v1/esnaf/profile', aciklama: 'Profil getir' },
    { yontem: 'PUT', yol: '/v1/esnaf/profile', aciklama: 'Profil güncelle' },
    { yontem: 'PUT', yol: '/v1/esnaf/working-hours', aciklama: 'Çalışma saatleri' },
    { yontem: 'GET', yol: '/v1/esnaf/subscription', aciklama: 'Abonelik durumu' },
    { yontem: 'POST', yol: '/v1/esnaf/subscription/upgrade', aciklama: 'Plan yükselt' },
    { yontem: 'GET', yol: '/v1/esnaf/dashboard', aciklama: 'Dashboard özet' },
    { yontem: 'GET', yol: '/v1/esnaf/health-score', aciklama: 'Sağlık skoru' },
  ]},
  { modul: 'Products', prompt: 'Prompt #3', endpointler: [
    { yontem: 'GET', yol: '/v1/products', aciklama: 'Ürün listesi' },
    { yontem: 'POST', yol: '/v1/products', aciklama: 'Ürün oluştur' },
    { yontem: 'GET', yol: '/v1/products/:id', aciklama: 'Ürün detay' },
    { yontem: 'PUT', yol: '/v1/products/:id', aciklama: 'Ürün güncelle' },
    { yontem: 'DELETE', yol: '/v1/products/:id', aciklama: 'Ürün sil' },
    { yontem: 'POST', yol: '/v1/products/:id/variants', aciklama: 'Varyant ekle' },
    { yontem: 'PUT', yol: '/v1/products/:id/variants/:vid', aciklama: 'Varyant güncelle' },
    { yontem: 'POST', yol: '/v1/products/:id/media', aciklama: 'Görsel yükle' },
    { yontem: 'PUT', yol: '/v1/products/bulk/stock', aciklama: 'Toplu stok' },
    { yontem: 'PUT', yol: '/v1/products/bulk/price', aciklama: 'Toplu fiyat' },
  ]},
  { modul: 'Categories', endpointler: [
    { yontem: 'GET', yol: '/v1/categories', aciklama: 'Kategori ağacı' },
    { yontem: 'POST', yol: '/v1/categories', aciklama: 'Kategori oluştur' },
    { yontem: 'PUT', yol: '/v1/categories/:id', aciklama: 'Kategori güncelle' },
    { yontem: 'DELETE', yol: '/v1/categories/:id', aciklama: 'Kategori sil' },
  ]},
  { modul: 'Orders', prompt: 'Prompt #3', endpointler: [
    { yontem: 'GET', yol: '/v1/orders', aciklama: 'Sipariş listesi' },
    { yontem: 'GET', yol: '/v1/orders/:id', aciklama: 'Sipariş detay' },
    { yontem: 'PUT', yol: '/v1/orders/:id/status', aciklama: 'Durum güncelle' },
    { yontem: 'POST', yol: '/v1/orders/:id/ship', aciklama: 'Kargoya ver' },
    { yontem: 'POST', yol: '/v1/orders/:id/cancel', aciklama: 'İptal' },
    { yontem: 'POST', yol: '/v1/orders/:id/refund', aciklama: 'İade' },
    { yontem: 'POST', yol: '/v1/orders/:id/note', aciklama: 'Not ekle' },
    { yontem: 'GET', yol: '/v1/orders/stats', aciklama: 'İstatistikler' },
  ]},
  { modul: 'Cart & Checkout', endpointler: [
    { yontem: 'POST', yol: '/v1/cart', aciklama: 'Sepet oluştur' },
    { yontem: 'GET', yol: '/v1/cart/:id', aciklama: 'Sepet getir' },
    { yontem: 'POST', yol: '/v1/cart/:id/items', aciklama: 'Ürün ekle' },
    { yontem: 'PUT', yol: '/v1/cart/:id/items/:iid', aciklama: 'Kalem güncelle' },
    { yontem: 'DELETE', yol: '/v1/cart/:id/items/:iid', aciklama: 'Kaldır' },
    { yontem: 'POST', yol: '/v1/cart/:id/coupon', aciklama: 'Kupon uygula' },
    { yontem: 'POST', yol: '/v1/cart/:id/checkout', aciklama: 'Ödemeye geç' },
  ]},
  { modul: 'Payments', endpointler: [
    { yontem: 'POST', yol: '/v1/payments/initiate', aciklama: 'Ödeme başlat' },
    { yontem: 'POST', yol: '/v1/payments/callback', aciklama: 'Callback (webhook)' },
    { yontem: 'GET', yol: '/v1/payments/:id', aciklama: 'Ödeme detay' },
    { yontem: 'POST', yol: '/v1/payments/:id/refund', aciklama: 'İade ödeme' },
    { yontem: 'GET', yol: '/v1/payments/installments', aciklama: 'Taksit (BIN bazlı)' },
  ]},
  { modul: 'Contacts (CRM)', prompt: 'Prompt #4', endpointler: [
    { yontem: 'GET', yol: '/v1/contacts', aciklama: 'Müşteri listesi' },
    { yontem: 'POST', yol: '/v1/contacts', aciklama: 'Müşteri oluştur' },
    { yontem: 'GET', yol: '/v1/contacts/:id', aciklama: 'Müşteri detay' },
    { yontem: 'PUT', yol: '/v1/contacts/:id', aciklama: 'Müşteri güncelle' },
    { yontem: 'DELETE', yol: '/v1/contacts/:id', aciklama: 'Müşteri sil' },
    { yontem: 'GET', yol: '/v1/contacts/:id/activities', aciklama: 'Etkileşim geçmişi' },
    { yontem: 'POST', yol: '/v1/contacts/:id/labels', aciklama: 'Etiket ekle' },
    { yontem: 'POST', yol: '/v1/contacts/import', aciklama: 'Toplu import (CSV)' },
    { yontem: 'GET', yol: '/v1/contacts/export', aciklama: 'Toplu export' },
  ]},
  { modul: 'Segments & Campaigns', prompt: 'Prompt #4', endpointler: [
    { yontem: 'GET', yol: '/v1/segments', aciklama: 'Segment listesi' },
    { yontem: 'POST', yol: '/v1/segments', aciklama: 'Segment oluştur' },
    { yontem: 'GET', yol: '/v1/segments/:id/count', aciklama: 'Müşteri sayısı' },
    { yontem: 'GET', yol: '/v1/segments/:id/contacts', aciklama: 'Segment müşterileri' },
    { yontem: 'GET', yol: '/v1/campaigns', aciklama: 'Kampanya listesi' },
    { yontem: 'POST', yol: '/v1/campaigns', aciklama: 'Kampanya oluştur' },
    { yontem: 'POST', yol: '/v1/campaigns/:id/send', aciklama: 'Kampanya gönder' },
    { yontem: 'GET', yol: '/v1/campaigns/:id/stats', aciklama: 'Kampanya istatistik' },
  ]},
  { modul: 'Bookings', prompt: 'Prompt #7', endpointler: [
    { yontem: 'GET', yol: '/v1/bookings', aciklama: 'Randevu listesi' },
    { yontem: 'POST', yol: '/v1/bookings', aciklama: 'Randevu oluştur' },
    { yontem: 'GET', yol: '/v1/bookings/:id', aciklama: 'Randevu detay' },
    { yontem: 'PUT', yol: '/v1/bookings/:id', aciklama: 'Randevu güncelle' },
    { yontem: 'POST', yol: '/v1/bookings/:id/cancel', aciklama: 'İptal' },
    { yontem: 'POST', yol: '/v1/bookings/:id/confirm', aciklama: 'Onayla' },
    { yontem: 'POST', yol: '/v1/bookings/:id/no-show', aciklama: 'Gelmedi' },
    { yontem: 'GET', yol: '/v1/bookings/availability', aciklama: 'Müsait slot' },
  ]},
  { modul: 'Services & Staff', endpointler: [
    { yontem: 'GET', yol: '/v1/services', aciklama: 'Hizmet listesi' },
    { yontem: 'POST', yol: '/v1/services', aciklama: 'Hizmet oluştur' },
    { yontem: 'PUT', yol: '/v1/services/:id', aciklama: 'Hizmet güncelle' },
    { yontem: 'DELETE', yol: '/v1/services/:id', aciklama: 'Hizmet sil' },
    { yontem: 'GET', yol: '/v1/staff', aciklama: 'Çalışan listesi' },
    { yontem: 'POST', yol: '/v1/staff', aciklama: 'Çalışan ekle' },
    { yontem: 'PUT', yol: '/v1/staff/:id', aciklama: 'Çalışan güncelle' },
    { yontem: 'GET', yol: '/v1/staff/:id/schedule', aciklama: 'Program getir' },
    { yontem: 'PUT', yol: '/v1/staff/:id/schedule', aciklama: 'Program güncelle' },
  ]},
  { modul: 'Invoices', prompt: 'Prompt #25', endpointler: [
    { yontem: 'GET', yol: '/v1/invoices', aciklama: 'Fatura listesi' },
    { yontem: 'POST', yol: '/v1/invoices', aciklama: 'Fatura oluştur (manuel)' },
    { yontem: 'GET', yol: '/v1/invoices/:id', aciklama: 'Fatura detay' },
    { yontem: 'GET', yol: '/v1/invoices/:id/pdf', aciklama: 'PDF indir' },
    { yontem: 'POST', yol: '/v1/invoices/:id/send', aciklama: 'Fatura gönder' },
    { yontem: 'POST', yol: '/v1/invoices/:id/cancel', aciklama: 'Fatura iptal' },
  ]},
  { modul: 'Site Editor', prompt: 'Prompt #1', endpointler: [
    { yontem: 'GET', yol: '/v1/site', aciklama: 'Manifest getir' },
    { yontem: 'PUT', yol: '/v1/site', aciklama: 'Config güncelle' },
    { yontem: 'GET', yol: '/v1/site/pages', aciklama: 'Sayfa listesi' },
    { yontem: 'POST', yol: '/v1/site/pages', aciklama: 'Sayfa oluştur' },
    { yontem: 'GET', yol: '/v1/site/pages/:id', aciklama: 'Sayfa JSON' },
    { yontem: 'PUT', yol: '/v1/site/pages/:id', aciklama: 'Sayfa güncelle' },
    { yontem: 'DELETE', yol: '/v1/site/pages/:id', aciklama: 'Sayfa sil' },
    { yontem: 'POST', yol: '/v1/site/publish', aciklama: 'Yayınla' },
    { yontem: 'POST', yol: '/v1/site/unpublish', aciklama: 'Yayından kaldır' },
    { yontem: 'GET', yol: '/v1/site/themes', aciklama: 'Tema listesi' },
    { yontem: 'PUT', yol: '/v1/site/theme', aciklama: 'Tema değiştir' },
  ]},
  { modul: 'Media', endpointler: [
    { yontem: 'POST', yol: '/v1/media/upload', aciklama: 'Dosya yükle' },
    { yontem: 'GET', yol: '/v1/media', aciklama: 'Medya listesi' },
    { yontem: 'DELETE', yol: '/v1/media/:id', aciklama: 'Medya sil' },
    { yontem: 'POST', yol: '/v1/media/:id/optimize', aciklama: 'AI optimizasyon' },
  ]},
  { modul: 'Restaurant OS', prompt: 'Prompt #11', endpointler: [
    { yontem: 'GET', yol: '/v1/restaurant/menu', aciklama: 'Menü getir' },
    { yontem: 'POST', yol: '/v1/restaurant/menu/items', aciklama: 'Menü öğesi ekle' },
    { yontem: 'PUT', yol: '/v1/restaurant/menu/items/:id', aciklama: 'Menü güncelle' },
    { yontem: 'GET', yol: '/v1/restaurant/tables', aciklama: 'Masa planı' },
    { yontem: 'PUT', yol: '/v1/restaurant/tables/:id/status', aciklama: 'Masa durumu' },
    { yontem: 'POST', yol: '/v1/restaurant/checks', aciklama: 'Adisyon aç' },
    { yontem: 'POST', yol: '/v1/restaurant/checks/:id/items', aciklama: 'Kalem ekle' },
    { yontem: 'POST', yol: '/v1/restaurant/checks/:id/close', aciklama: 'Adisyon kapat' },
    { yontem: 'GET', yol: '/v1/restaurant/kitchen/orders', aciklama: 'Mutfak (KDS)' },
    { yontem: 'PUT', yol: '/v1/restaurant/kitchen/orders/:id/bump', aciklama: 'Tamamla' },
  ]},
  { modul: 'Marketplace', prompt: 'Prompt #24', endpointler: [
    { yontem: 'GET', yol: '/v1/marketplace/connections', aciklama: 'Bağlı marketplace' },
    { yontem: 'POST', yol: '/v1/marketplace/connect', aciklama: 'Bağla (API key)' },
    { yontem: 'POST', yol: '/v1/marketplace/sync/products', aciklama: 'Ürün senkronize' },
    { yontem: 'GET', yol: '/v1/marketplace/orders', aciklama: 'MP siparişleri' },
    { yontem: 'PUT', yol: '/v1/marketplace/orders/:id/status', aciklama: 'Durum güncelle' },
  ]},
  { modul: 'Conversations', endpointler: [
    { yontem: 'GET', yol: '/v1/conversations', aciklama: 'Konuşma listesi' },
    { yontem: 'GET', yol: '/v1/conversations/:id', aciklama: 'Konuşma + mesajlar' },
    { yontem: 'POST', yol: '/v1/conversations/:id/messages', aciklama: 'Mesaj gönder' },
  ]},
  { modul: 'AI', endpointler: [
    { yontem: 'POST', yol: '/v1/ai/generate/site', aciklama: 'AI site üret' },
    { yontem: 'POST', yol: '/v1/ai/generate/content', aciklama: 'AI içerik/SEO' },
    { yontem: 'POST', yol: '/v1/ai/generate/image', aciklama: 'AI görsel' },
    { yontem: 'POST', yol: '/v1/ai/suggest', aciklama: 'AI öneri' },
    { yontem: 'POST', yol: '/v1/ai/chat', aciklama: 'AI asistan' },
  ]},
  { modul: 'Analytics', endpointler: [
    { yontem: 'GET', yol: '/v1/analytics/overview', aciklama: 'Genel özet' },
    { yontem: 'GET', yol: '/v1/analytics/revenue', aciklama: 'Gelir raporu' },
    { yontem: 'GET', yol: '/v1/analytics/customers', aciklama: 'Müşteri analitik' },
    { yontem: 'GET', yol: '/v1/analytics/products', aciklama: 'Ürün performans' },
    { yontem: 'GET', yol: '/v1/analytics/bookings', aciklama: 'Randevu analitik' },
    { yontem: 'GET', yol: '/v1/analytics/campaigns', aciklama: 'Kampanya performans' },
  ]},
  { modul: 'Webhooks', endpointler: [
    { yontem: 'GET', yol: '/v1/webhooks', aciklama: 'Webhook listesi' },
    { yontem: 'POST', yol: '/v1/webhooks', aciklama: 'Webhook kaydet' },
    { yontem: 'DELETE', yol: '/v1/webhooks/:id', aciklama: 'Webhook sil' },
  ]},
  { modul: 'Import / Migration', prompt: 'Prompt #23', endpointler: [
    { yontem: 'POST', yol: '/v1/import/csv', aciklama: 'CSV import' },
    { yontem: 'POST', yol: '/v1/import/platform', aciklama: 'Platform göçü' },
    { yontem: 'POST', yol: '/v1/import/crawl', aciklama: 'Web crawl' },
    { yontem: 'GET', yol: '/v1/import/:id/status', aciklama: 'Import durumu' },
    { yontem: 'POST', yol: '/v1/import/:id/rollback', aciklama: 'Geri al' },
  ]},
  { modul: 'Settings', endpointler: [
    { yontem: 'GET', yol: '/v1/settings', aciklama: 'Tüm ayarlar' },
    { yontem: 'PUT', yol: '/v1/settings/payment', aciklama: 'Ödeme ayarları' },
    { yontem: 'PUT', yol: '/v1/settings/shipping', aciklama: 'Kargo' },
    { yontem: 'PUT', yol: '/v1/settings/notifications', aciklama: 'Bildirimler' },
    { yontem: 'PUT', yol: '/v1/settings/integrations', aciklama: 'Entegrasyonlar' },
    { yontem: 'GET', yol: '/v1/settings/api-keys', aciklama: 'API anahtarları' },
    { yontem: 'POST', yol: '/v1/settings/api-keys', aciklama: 'API key oluştur' },
  ]},
  { modul: 'Public (Esnaf Sitesi)', endpointler: [
    { yontem: 'GET', yol: '/v1/public/:slug/site', aciklama: 'Site verisi (SSG)' },
    { yontem: 'GET', yol: '/v1/public/:slug/products', aciklama: 'Ürün kataloğu' },
    { yontem: 'GET', yol: '/v1/public/:slug/menu', aciklama: 'Restoran menü' },
    { yontem: 'GET', yol: '/v1/public/:slug/availability', aciklama: 'Müsaitlik' },
    { yontem: 'POST', yol: '/v1/public/:slug/booking', aciklama: 'Randevu al' },
    { yontem: 'POST', yol: '/v1/public/:slug/cart', aciklama: 'Sepet oluştur' },
    { yontem: 'POST', yol: '/v1/public/:slug/contact', aciklama: 'İletişim formu' },
  ]},
]

// ══════════════════════════════════════════
// 6. COMPOSITE INDEX STRATEJİSİ
// ══════════════════════════════════════════

export const COMPOSITE_INDEXES = {
  products: [
    { fields: 'esnafId ASC, status ASC, createdAt DESC', kullanim: 'Aktif ürünler' },
    { fields: 'esnafId ASC, categoryIds ARRAY, status ASC', kullanim: 'Kategori filtresi' },
  ],
  orders: [
    { fields: 'esnafId ASC, status ASC, createdAt DESC', kullanim: 'Durum bazlı siparişler' },
    { fields: 'esnafId ASC, customerId ASC, createdAt DESC', kullanim: 'Müşteri siparişleri' },
    { fields: 'esnafId ASC, channel ASC, createdAt DESC', kullanim: 'Kanal bazlı' },
  ],
  contacts: [
    { fields: 'esnafId ASC, identityTier ASC, updatedAt DESC', kullanim: 'Tier filtreli liste' },
    { fields: 'esnafId ASC, labelIds ARRAY', kullanim: 'Etiket filtresi' },
  ],
  bookings: [
    { fields: 'esnafId ASC, startTime ASC, status ASC', kullanim: 'Tarih bazlı' },
    { fields: 'esnafId ASC, staffId ASC, startTime ASC', kullanim: 'Çalışan programı' },
    { fields: 'esnafId ASC, contactId ASC, startTime DESC', kullanim: 'Müşteri randevuları' },
  ],
  invoices: [
    { fields: 'esnafId ASC, status ASC, issueDate DESC', kullanim: 'Fatura listesi' },
  ],
  checks: [
    { fields: 'esnafId ASC, status ASC, openedAt DESC', kullanim: 'Açık adisyonlar' },
    { fields: 'esnafId ASC, tableId ASC, status ASC', kullanim: 'Masa adisyonları' },
  ],
} as const

// ══════════════════════════════════════════
// 7. WEBHOOK OLAYLARI
// ══════════════════════════════════════════

export const WEBHOOK_OLAYLARI = [
  'order.created', 'order.paid', 'order.shipped', 'order.completed', 'order.cancelled',
  'booking.created', 'booking.confirmed', 'booking.cancelled', 'booking.completed',
  'contact.created', 'contact.updated',
  'invoice.sent', 'invoice.accepted', 'invoice.rejected',
  'product.created', 'product.updated', 'product.deleted',
] as const

// ══════════════════════════════════════════
// 8. PAYLAŞILAN TİPLER (Özet)
// ══════════════════════════════════════════

export const PAYLASILAN_TIPLER = [
  { tip: 'WorkingHours', alanlar: 'day (0-6), isOpen, slots[{start, end}]' },
  { tip: 'Address', alanlar: 'street, district, city, postalCode, country: TR' },
  { tip: 'MediaRef', alanlar: 'url, alt, width, height, format, blurhash' },
  { tip: 'ContactEmail', alanlar: 'email, tag (primary/work/other)' },
  { tip: 'ContactPhone', alanlar: 'phone (+90 5XX), tag' },
  { tip: 'OrderLineItem', alanlar: 'productId, variantId, name, quantity, unitPrice, taxRate, discount, total' },
  { tip: 'InvoiceLineItem', alanlar: 'name, quantity, unitCode (C62/KGM/LTR), unitPrice (KDV hariç), tax%, taxAmount, lineAmount' },
  { tip: 'PaginatedResponse<T>', alanlar: 'data[], pagination{total, page, pageSize, hasMore, cursor}' },
  { tip: 'ApiResponse<T>', alanlar: 'success: true, data: T' },
] as const
