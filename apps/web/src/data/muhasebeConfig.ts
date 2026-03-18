/**
 * kepenk.ai — Muhasebe & ERP Entegrasyon Konfigürasyonu
 * ══════════════════════════════════════════════════════
 * Nilvera e-Fatura/e-Arşiv, Paraşüt V4, Logo Tiger/Go,
 * muhasebeci kanal, otomatik fatura, KDV, vergi takvimi.
 */

// ══════════════════════════════════════════
// 1. YASAL ÇERÇEVE & KDV
// ══════════════════════════════════════════

export const YASAL_CERCEVE = {
  efatura: { yasa: '213 VUK + 509/535 Sıra Nolu Tebliğ', zorunluluk2025: 'Brüt satış 3M TL üzeri veya e-ticaret yapan TÜM mükellefler', format: 'UBL-TR 1.2', profiller: ['TEMELFATURA', 'TICARIFATURA', 'YOLCUBERABERFATURA', 'IHRACAT'] },
  earsiv: { zorunluluk: 'e-Fatura mükellefi olmayan alıcılara ve perakende satışlarda', ozellik: 'Alıcı VKN/TCKN opsiyonel, 7 gün GİB raporlama' },
  eirsaliye: { zorunluluk: 'Brüt satış 10M TL üzeri', amac: 'Mal sevkiyat takibi' },
  esmm: { zorunluluk: 'Serbest meslek erbabı (doktor, avukat, mimar)', amac: 'Elektronik serbest meslek makbuzu' },
  eadisyon: { zorunluluk: 'Yeme-içme işletmeleri (2026 genişleme)', amac: 'Restoran/kafe adisyon fişi' },
} as const

export const KDV_ORANLARI = { genel: 20, indirimli1: 10, indirimli2: 1 } as const
export const KDV_ACIKLAMA = { 20: 'Genel oran', 10: 'Temel gıda, sağlık', 1: 'Tarım, gazete, kitap' } as const

export const FARKLILASTIRMA = 'kepenk.ai e-fatura/e-arşiv kesiminde %0 KOMİSYON alır. Rakipler ek entegratör ücreti veya komisyon. Paraşüt tek başına ₺940+KDV/ay. Esnaf için yıllık ₺10.000+ tasarruf.' as const

// ══════════════════════════════════════════
// 2. NİLVERA E-FATURA ENTEGRASYONU
// ══════════════════════════════════════════

export const NILVERA_CONFIG = {
  api: { tip: 'REST (OAS 3.x)', canliUrl: 'https://api.nilvera.com', testUrl: 'https://apitest.nilvera.com', auth: 'OAuth 2.0 — Reference Token (JWT DEĞİL)', header: 'Authorization: Bearer {API_ANAHTARI}', format: 'JSON', dokumantasyon: 'https://developer.nilvera.com' },
  desteklenenBelgeler: ['e-Fatura (TEMEL/TİCARİ)', 'e-Arşiv Fatura', 'e-İrsaliye', 'e-SMM', 'e-Müstahsil Makbuzu', 'e-Adisyon (Restaurant OS)'],
  faturaAkisi: {
    satisFaturasi: ['Alıcı VKN/TCKN → GİB mükellef sorgusu', 'e-Fatura mükellefi → e-Fatura API', 'Değilse → e-Arşiv API', 'Nilvera → GİB iletim + durum takibi', 'PDF arşivleme (Cloud Storage)', 'Müşteriye WhatsApp/email fatura link'],
    perakendeSatis: 'e-Arşiv (TCKN: 11111111111 genel alıcı veya gerçek TCKN)',
    restoranAdisyon: 'e-Arşiv veya e-Adisyon (mevzuata göre)',
    sure: '<60 saniye (sipariş tamamlandıktan)',
  },
  durumlar: { QUEUED: 'Kuyruğa alındı', SENT: 'GİB\'e gönderildi', ACCEPTED: 'Kabul edildi ✅', REJECTED: 'Reddedildi ❌', CANCELLED: 'İptal edildi' },
  redNedenleri: ['VKN hatalı', 'Fatura numarası çakışması', 'Zorunlu alan eksik'],
} as const

export const FATURA_PAYLOAD_HARITALAMA = {
  invoiceProfile: 'TEMELFATURA | TICARIFATURA',
  invoiceType: 'SATIS | IADE',
  issueDate: 'order.completedAt (ISO 8601)',
  currencyCode: 'TRY',
  satici: { taxNumber: 'esnaf.vkn', name: 'esnaf.businessName', taxOffice: 'esnaf.taxOffice', address: 'esnaf.address' },
  alici: { taxNumber: 'customer.vkn || 11111111111 (perakende)', name: 'customer.name || MUHTELIF MÜŞTERILER' },
  kalemler: { name: 'orderItem.productName', quantity: 'orderItem.quantity', unitCode: 'C62 (adet) | KGM (kg) | LTR (lt)', unitPrice: 'KDV hariç birim fiyat', taxPercent: '20 | 10 | 1', taxAmount: 'hesaplanan KDV', lineAmount: 'kalem toplamı (KDV hariç)' },
  toplamlar: { taxExclusive: 'KDV hariç toplam', taxTotal: 'toplam KDV', payable: 'genel toplam (KDV dahil)' },
} as const

export const SERI_NUMARA = {
  format: '{SERI}{YIL}{SIRA_NO}', ornek: 'KPN2026000001',
  seriAtama: { varsayilan: 'KPN', esnafOzel: 'Maks 3 harf özel seri' },
  siraNo: { tip: 'Monoton artan (gap-free)', depolama: 'Firestore distributed counter', kilit: 'Firestore transaction (çift numara önleme)', yillikSifirlama: 'Her 1 Ocak 000001\'den başlar' },
  faturaTipleri: { satis: 'KPN', iade: 'KPI', earsiv: 'KPA', eirsaliye: 'KPR' },
} as const

// ══════════════════════════════════════════
// 3. PARAŞÜT ÖN MUHASEBE
// ══════════════════════════════════════════

export const PARASUT_CONFIG = {
  api: { versiyon: 'V4', tip: 'REST / JSON:API', baseUrl: 'https://api.parasut.com/v4/{company_id}', auth: 'OAuth 2.0 (Client Credentials + Resource Owner)', tokenEndpoint: 'https://api.parasut.com/oauth/token', tokenSuresi: '7200 sn (2 saat)', refreshToken: true, rateLimit: '60 istek/dk', dokumantasyon: 'https://apidocs.parasut.com' },
  islemler: [
    { islem: 'Cari Hesap', endpoint: '/contacts', crud: ['CREATE', 'READ', 'UPDATE', 'DELETE'], senk: 'Çift yönlü (kepenk.ai ↔ Paraşüt)' },
    { islem: 'Satış Faturası', endpoint: '/sales_invoices', crud: ['CREATE', 'READ'], tetikleyici: 'Sipariş tamamlandı → otomatik', senk: 'kepenk.ai → Paraşüt' },
    { islem: 'Tahsilat', endpoint: '/transactions', crud: ['CREATE', 'READ'], tetikleyici: 'Ödeme alındı → otomatik', senk: 'kepenk.ai → Paraşüt' },
    { islem: 'Ürün/Stok', endpoint: '/products', crud: ['CREATE', 'READ', 'UPDATE'], senk: 'kepenk.ai → Paraşüt (tek yönlü)' },
    { islem: 'Gider', endpoint: '/purchase_bills', crud: ['CREATE', 'READ'], senk: 'Paraşüt → kepenk.ai (çek + göster)' },
  ],
  esnafAkisi: ['Ayarlar → Muhasebe → Paraşüt bağla', 'OAuth 2.0 yetkilendirme', 'Token alındı → bağlantı ✅', 'Otomatik: sipariş→fatura, ödeme→tahsilat, müşteri→cari, ürün→stok kartı'],
  esnafGorunumu: 'Esnaf muhasebe bilgisi GİRMEZ. Sipariş tamamlanınca fatura otomatik kesilir. Muhasebeci Paraşüt\'ten çeker.',
} as const

// ══════════════════════════════════════════
// 4. LOGO ERP
// ══════════════════════════════════════════

export const LOGO_CONFIG = {
  tigerGo: {
    tip: 'Logo REST Service (Logo Objects CRUD)', auth: 'Bearer Token (user+pass+firmaNo → token)', format: 'JSON', dokumantasyon: 'https://docs.logo.com.tr',
    desteklenenUrunler: ['Tiger3 Enterprise', 'Tiger3 Plus', 'Go3 Plus', 'Go3'],
    tokenSuresi: '119 sn (2 dk — çok kısa, her istek kontrol)',
    islemler: [
      { islem: 'Cari Hesap', endpoint: '/api/v1/arps' },
      { islem: 'Satış Faturası', endpoint: '/api/v1/salesInvoices' },
      { islem: 'Stok Kartı', endpoint: '/api/v1/items' },
      { islem: 'Sipariş Fişi', endpoint: '/api/v1/orders' },
    ],
  },
  isbasi: { tip: 'REST', baseUrl: 'https://api.isbasi.com', auth: 'OAuth 2.0', hedef: 'Mikro esnaf (Tiger\'dan basit)', oncelik: 'FAZ 2' },
  digerErp: [
    { isim: 'Netsis', tip: 'SOAP/REST hybrid', hedef: 'Orta-büyük işletme', oncelik: 'FAZ 3' },
    { isim: 'Mikro', tip: 'REST API', hedef: 'KOBİ', oncelik: 'FAZ 3' },
    { isim: 'DİA', tip: 'REST API', hedef: 'KOBİ', oncelik: 'FAZ 3' },
  ],
  fazStratejisi: { faz1: 'Nilvera + Paraşüt (%80 kapsam)', faz2: 'Logo İşbaşı + Tiger/Go (+%15)', faz3: 'Netsis + Mikro + DİA (+%5 — talep bazlı)' },
} as const

// ══════════════════════════════════════════
// 5. MUHASEBECİ KANAL
// ══════════════════════════════════════════

export const MUHASEBECI_KANALI = {
  degerOnerisi: {
    muhasebeci: ['Mükelleflerin kepenk.ai verisini tek tıkla çek', 'Fatura+cari+tahsilat otomatik muhasebe programına akar', 'Mükellef başına ₺100/ay referral ödülü (süresiz)', 'Müşavir paneli — tüm mükellefler tek ekranda'],
    esnaf: ['Muhasebecine belge göndermene gerek yok', 'Her şey otomatik — muhasebecin istediğinde çeker'],
  },
  musavirPaneli: { erisim: 'musavir.kepenk.ai (ayrı giriş)', ozellikler: ['Tüm mükellef listesi', 'Mükellef bazlı fatura/cari/tahsilat', 'Toplu CSV/Excel indirme', 'Paraşüt/Logo otomatik aktarım', 'Eksik fatura uyarısı'], yetki: 'Esnaf KVKK rızası ile yetkilendirir' },
  veriFormatlari: ['Paraşüt API (otomatik)', 'Logo REST (otomatik)', 'Standart muhasebe Excel', 'GİB UBL-TR XML export'],
  referralProgram: { odul: '₺100/ay aktif mükellef başına (süresiz)', tetikleyici: 'Referral link → esnaf ilk ödeme → aktif', hedef12Ay: '500 aktif muhasebeci partner' },
} as const

// ══════════════════════════════════════════
// 6. OTOMATİK FATURA SENARYOLARI
// ══════════════════════════════════════════

export const FATURA_SENARYOLARI = [
  { id: 'online_siparis', baslik: 'Online Sipariş (E-Ticaret)', tetikleyici: 'order.COMPLETED + payment.PAID', belge: 'e-Fatura veya e-Arşiv (GİB sorgusu)', sure: '<60 sn', retry: '3 retry (5dk, 15dk, 1saat) → manuel kuyruk' },
  { id: 'pos_satis', baslik: 'POS Satış (Dükkan İçi)', tetikleyici: 'pos.payment.completed', belge: 'e-Arşiv (perakende)', sure: 'Anında', ek: 'Termal fiş basımı' },
  { id: 'randevu_odeme', baslik: 'Randevu Ödeme', tetikleyici: 'booking.payment.completed', belge: 'e-Arşiv', ek: 'Hizmet tarihi + randevu detayı fatura notuna' },
  { id: 'restoran_adisyon', baslik: 'Restoran Adisyon', tetikleyici: 'check.closed + payment.completed', belge: 'e-Arşiv / e-Adisyon', ek: 'Bahşiş dahil değil, split ödeme ayrı fatura' },
  { id: 'iade', baslik: 'İade Faturası', tetikleyici: 'return.approved + refund.processed', belge: 'İade Faturası (IADE)', ek: 'Orijinal fatura referansı zorunlu, kısmi iade destekli' },
] as const

// ══════════════════════════════════════════
// 7. MUTABAKAT & VERGİ TAKVİMİ
// ══════════════════════════════════════════

export const MUTABAKAT = {
  gunlukKapanma: { zaman: '23:59', kontroller: ['Fatura sayısı = sipariş sayısı', 'Fatura toplamı = ödeme toplamı', 'GİB\'e iletilmeyen fatura?', 'Başarısız gönderim?'], uyumsuzluk: 'P3 alert + WhatsApp bildirim' },
  aylikRapor: { icerik: ['Toplam fatura sayısı/tutarı', 'e-Fatura/e-Arşiv dağılımı', 'KDV toplamı', 'Tahsilat durumu', 'En çok fatura kesilen müşteriler'], kanal: 'WhatsApp özet + Dashboard detay' },
} as const

export const VERGI_TAKVIMI = [
  { gun: 'Her ayın 24\'ü', hatirlatma: 'KDV beyannamesi son gün' },
  { gun: 'Her ayın 26\'sı', hatirlatma: 'Muhtasar beyanname son gün' },
  { gun: 'Çeyreklik', hatirlatma: 'Geçici vergi beyanname' },
] as const

// ══════════════════════════════════════════
// 8. CONNECTOR MİMARİSİ
// ══════════════════════════════════════════

export const CONNECTOR_MIMARI = {
  servis: 'Cloud Run — kepenk-ai-accounting-connector',
  adapterler: ['NilveraAdapter', 'ParasutAdapter', 'LogoTigerAdapter', 'LogoIsbasiAdapter'],
  gelecek: ['NetsisAdapter', 'MikroAdapter', 'DiaAdapter'],
  interfaceMetodlari: ['createContact', 'updateContact', 'createSalesInvoice', 'createReturnInvoice', 'getInvoiceStatus', 'createPayment', 'syncProduct', 'sendEInvoice', 'sendEArchive', 'checkEInvoiceStatus'],
  hataYonetimi: {
    nilveraDown: 'eLogo API\'ye fallback → 5dk retry',
    parasutDown: 'Kuyrukta beklet → gelince toplu gönder',
    logoDown: 'On-premise ağ sorunu → retry + bildirim',
  },
} as const

// ══════════════════════════════════════════
// 9. GÜVENLİK & KVKK
// ══════════════════════════════════════════

export const MUHASEBE_GUVENLIK = {
  credentialYonetimi: { depolama: 'Google Cloud Secret Manager', perEsnaf: 'Her esnaf token\'ı ayrı secret', rotasyon: 'OAuth refresh otomatik', iptal: 'Entegrasyon kaldırılınca → revoke + sil' },
  veriGuvenligi: { faturaPdf: 'Cloud Storage (esnaf bazlı izole)', transit: 'TLS 1.3', atRest: 'AES-256' },
  kvkk: { muhasebeci: 'Esnaf açık rızası ile (KVKK m.5/1)', veriMin: 'Sadece gerekli alanlar', silme: 'Hesap silme → tüm token revoke', arsiv: 'e-Fatura 10 yıl saklama (VUK m.253)' },
} as const

// ══════════════════════════════════════════
// 10. HEDEF METRİKLER
// ══════════════════════════════════════════

export const MUHASEBE_METRIKLERI = {
  entegrasyonKapsam: [
    { metrik: 'Nilvera e-fatura', hedef: '%100 (tüm planlarda dahili)' },
    { metrik: 'Paraşüt bağlanma', hedef: '>%30 (Büyüme+ plan)' },
    { metrik: 'Logo bağlanma', hedef: '>%5 (Profesyonel+ plan)' },
  ],
  operasyonel: [
    { metrik: 'Fatura başarı oranı', hedef: '>%99' },
    { metrik: 'Fatura gecikme (sipariş→fatura)', hedef: '<60 saniye' },
    { metrik: 'GİB red oranı', hedef: '<%1' },
    { metrik: 'Günlük mutabakat uyum', hedef: '>%99,5' },
  ],
  memnuniyet: [
    { metrik: 'Muhasebeci NPS', hedef: '>50' },
    { metrik: 'Esnaf fatura şikayeti', hedef: '<%2 (destek talepleri)' },
  ],
}
