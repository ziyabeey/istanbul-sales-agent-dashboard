/**
 * kepenk.ai — Fiyatlandırma & Büyüme Stratejisi Konfigürasyonu
 * ═══════════════════════════════════════════════════════════════
 * 3+1 tier mimarisi, Restaurant OS add-on, trial stratejisi,
 * birim ekonomi, sektör-bazlı ROI, itiraz karşılama.
 */

// ══════════════════════════════════════════
// 1. FİYATLANDIRMA SABİTLERİ
// ══════════════════════════════════════════

export const FIYATLANDIRMA_SABITLERI = {
  paraBirimi: 'TRY',
  kdvDahil: true,
  taksitSecenekleri: [3, 6, 9, 12],
  yillikIndirimOrani: 2 / 12, // 2 ay ücretsiz = %16.7
  optimalTierSayisi: 3, // +1 enterprise
  goldilocksHedefTier: 'buyume',
  goldilocksHedefOran: 0.55,
  trialSuresi: 14,   // gün
  trialModel: 'reverse_trial' as const, // 14 gün Büyüme, sonra Başlangıç'a downgrade
  krediKartiKayitta: false, // Türk esnaf kart vermekten çekinir
  fiyatGuncellemeAyi: 1,   // Ocak
  maxFiyatArtisi: 0.80,    // TÜİK TÜFE'nin %80'i
} as const

// ══════════════════════════════════════════
// 2. ANA PLATFORM TİER'LARI
// ══════════════════════════════════════════

export interface PlanOzellikleri {
  siteVeEditor: string[]
  eticaret: string[]
  whatsappAi: string[]
  randevu: string[]
  crm: string[]
  analitik: string[]
  diger: string[]
}

export interface PlanTier {
  id: string
  isim: string
  ingilizce: string
  fiyatAylik: number
  fiyatYillikAylik: number
  fiyatYillikToplam: number
  hedefSegment: string
  hedefOran: number
  renkKodu: string
  badge?: string
  maxKullanici: number | null // null = sınırsız
  maxUrun: number | null
  maxSayfa: number | null
  depolamaGB: number | null
  ozellikler: PlanOzellikleri
  dahilDegil: string[]
  ctaMetin: string
}

export const PLAN_TIERLARI: PlanTier[] = [
  {
    id: 'baslangic', isim: 'Başlangıç', ingilizce: 'Starter',
    fiyatAylik: 499, fiyatYillikAylik: 415, fiyatYillikToplam: 4990,
    hedefSegment: 'Solo esnaf, mikro işletme (1-2 kişi)', hedefOran: 0.27,
    renkKodu: '#D4C5A9', maxKullanici: 1, maxUrun: 10, maxSayfa: 5, depolamaGB: 1,
    ozellikler: {
      siteVeEditor: ['AI ile site oluşturma (sektör şablonları)', 'Özel alan adı bağlama', 'SSL sertifikası', 'Temel SEO (otomatik meta tags)', '5 sayfa limiti', '1 GB depolama'],
      eticaret: ['10 ürün/hizmet listeleme', 'Online ödeme kabul (iyzico)', 'Temel sipariş yönetimi'],
      whatsappAi: [],
      randevu: [],
      crm: [],
      analitik: [],
      diger: ['WhatsApp iletişim butonu', 'İletişim formu', 'Google Maps entegrasyonu', 'WhatsApp destek (iş saatleri)'],
    },
    dahilDegil: ['WhatsApp AI müşteri temsilcisi', 'Randevu/booking sistemi', 'CRM & müşteri yönetimi', 'Pazarlama kampanyaları', 'Sadakat programı', 'POS', 'E-fatura', 'Çoklu kullanıcı', 'Gelişmiş analitik', 'Restaurant OS'],
    ctaMetin: 'Ücretsiz Dene',
  },
  {
    id: 'buyume', isim: 'Büyüme', ingilizce: 'Growth',
    fiyatAylik: 1299, fiyatYillikAylik: 1082, fiyatYillikToplam: 12990,
    hedefSegment: 'Büyüyen işletmeler, 2-5 çalışan', hedefOran: 0.55,
    renkKodu: '#C75B39', badge: '⭐ EN POPÜLER',
    maxKullanici: 3, maxUrun: null, maxSayfa: null, depolamaGB: 10,
    ozellikler: {
      siteVeEditor: ['Sınırsız sayfa', '10 GB depolama', 'Blog modülü', 'Gelişmiş SEO (JSON-LD, sitemap, IndexNow)'],
      eticaret: ['Sınırsız ürün/hizmet', 'Taksitli ödeme (3-6-9-12 ay)', 'Kargo entegrasyonu (Yurtiçi, Aras, PTT)', 'Marketplace entegrasyonu (Trendyol, N11)', 'Kupon & indirim sistemi'],
      whatsappAi: ['WhatsApp AI müşteri temsilcisi', 'Otomatik mesaj yanıtlama', 'WhatsApp sipariş/randevu', 'Toplu WhatsApp kampanya (500 mesaj/ay)'],
      randevu: ['Online randevu sistemi', 'Otomatik hatırlatma (WhatsApp + SMS)', 'Google Calendar senkronizasyonu'],
      crm: ['Müşteri kartları & geçmişi', 'Segment oluşturma (temel)', 'Otomatik etiketleme'],
      analitik: ['Haftalık/aylık raporlar', 'Gelir & müşteri dashboardu', 'AI iş önerileri (temel)'],
      diger: ['3 kullanıcı', 'E-fatura / e-Arşiv entegrasyonu', 'Mobil POS (QR + link ödeme)', 'Öncelikli destek'],
    },
    dahilDegil: ['Sınırsız WhatsApp kampanya', 'Google/Meta Ads entegrasyonu', 'A/B test', 'Sadakat programı', 'Pipeline yönetimi', 'API erişimi'],
    ctaMetin: 'Hemen Başla ⭐',
  },
  {
    id: 'profesyonel', isim: 'Profesyonel', ingilizce: 'Pro',
    fiyatAylik: 2499, fiyatYillikAylik: 2082, fiyatYillikToplam: 24990,
    hedefSegment: 'Gelişmiş işletmeler, 5-15 çalışan', hedefOran: 0.15,
    renkKodu: '#7C3AED', maxKullanici: 10, maxUrun: null, maxSayfa: null, depolamaGB: 50,
    ozellikler: {
      siteVeEditor: ['Büyüme planındaki her şey'],
      eticaret: ['Büyüme planındaki her şey'],
      whatsappAi: ['Sınırsız WhatsApp kampanya mesajı', 'WhatsApp chatbot akışları (özelleştirilebilir)', 'Tam conversational commerce'],
      randevu: ['Büyüme planındaki her şey'],
      crm: ['Gelişmiş segmentasyon (davranışsal)', 'Otomatik trigger kampanyaları', 'Pipeline & fırsat yönetimi', 'LTV hesaplama'],
      analitik: ['Gelişmiş analitik (365 gün)', 'Dijital sağlık skoru', 'Collective intelligence benchmark', 'Rakip radar'],
      diger: ['10 kullanıcı', '50 GB depolama', 'Sadakat programı (puan + stamp + VIP)', 'Google/Meta Ads entegrasyonu', 'A/B test motoru', 'SMS kampanya', 'API erişimi (temel)', 'Dedicated destek temsilcisi'],
    },
    dahilDegil: ['Sınırsız kullanıcı', 'Çoklu lokasyon', 'White-label', 'SLA garantisi'],
    ctaMetin: 'Hemen Başla',
  },
  {
    id: 'kurumsal', isim: 'Kurumsal', ingilizce: 'Enterprise',
    fiyatAylik: 4499, fiyatYillikAylik: 3749, fiyatYillikToplam: 44990,
    hedefSegment: 'Zincirler, çoklu lokasyon, 15+ çalışan', hedefOran: 0.03,
    renkKodu: '#1E293B', maxKullanici: null, maxUrun: null, maxSayfa: null, depolamaGB: null,
    ozellikler: {
      siteVeEditor: ['Profesyonel planındaki her şey'],
      eticaret: ['Profesyonel planındaki her şey'],
      whatsappAi: ['Profesyonel planındaki her şey'],
      randevu: ['Profesyonel planındaki her şey'],
      crm: ['Profesyonel planındaki her şey'],
      analitik: ['Özel raporlama'],
      diger: ['Sınırsız kullanıcı', 'Çoklu lokasyon yönetimi', 'Özel API entegrasyonları', 'White-label seçeneği', 'SLA garantisi (%99.9 uptime)', 'Özel eğitim & onboarding', 'Dedicated account manager', 'Sınırsız depolama'],
    },
    dahilDegil: [],
    ctaMetin: 'Satış Ekibiyle Konuşun',
  },
]

// ══════════════════════════════════════════
// 3. RESTAURANT OS ADD-ON TIER'LARI
// ══════════════════════════════════════════

export interface RestaurantOSTier {
  id: string
  isim: string
  fiyat: number // aylık, ana plana ek
  hedef: string
  badge?: string
  dahil: string[]
  dahilDegil: string[]
}

export const RESTAURANT_OS_TIERLARI: RestaurantOSTier[] = [
  {
    id: 'restoran_temel', isim: 'Restoran Temel', fiyat: 599,
    hedef: 'Küçük kafe, tek şubeli lokanta',
    dahil: ['Dijital menü yönetimi', 'QR kod menü görüntüleme', 'Temel sipariş yönetimi (garson paneli)', 'Masa planı (20 masaya kadar)', 'Günlük gelir raporu', 'Adisyon yazdırma (termal yazıcı)'],
    dahilDegil: ['KDS (mutfak ekranı)', 'QR self-order', 'Paket servis entegrasyonu', 'Stok/reçete yönetimi', 'Gelişmiş restoran analitiği'],
  },
  {
    id: 'restoran_pro', isim: 'Restoran Pro', fiyat: 1299,
    hedef: 'Orta ölçekli restoran, birden fazla garson',
    badge: '⭐ Restoranlar İçin En Popüler',
    dahil: ['Restoran Temel\'deki her şey', 'KDS — Mutfak Ekranı (kanban, timer)', 'Sipariş durumu takibi', 'QR ile müşteri self-order', 'Alerjen filtreleme', 'Çoklu dil menü (İngilizce, Arapça)', 'Yemeksepeti entegrasyonu', 'Getir entegrasyonu', 'Trendyol Yemek entegrasyonu', 'Kendi online sipariş sayfası', 'Temel stok takibi', 'Düşük stok uyarısı', 'Yemek bazlı satış analizi', 'Saat bazlı yoğunluk raporu'],
    dahilDegil: ['Reçete yönetimi & food cost', 'Otomatik stok düşümü', 'Masa birleştirme/ayırma', 'Split ödeme', 'Çoklu lokasyon'],
  },
  {
    id: 'restoran_isletme', isim: 'Restoran İşletme', fiyat: 2499,
    hedef: 'Büyük restoran, zincir, çoklu mutfak istasyonu',
    dahil: ['Restoran Pro\'daki her şey', 'Reçete yönetimi & food cost hesaplama', 'Otomatik stok düşümü (reçete bazlı)', 'Masa birleştirme/ayırma', 'Split ödeme (kişi/kalem bazlı)', 'Bahşiş yönetimi', 'Çoklu lokasyon yönetimi', 'Tedarikçi sipariş yönetimi', 'Kurye takibi', 'API erişimi', 'Dedicated restoran destek'],
    dahilDegil: [],
  },
]

export const RESTAURANT_OS_CONFIG = {
  onKosul: 'buyume', // Minimum Büyüme planı gerekli
  onlineKomisyon: { min: 0.015, max: 0.025 }, // %1.5-2.5 platform kanalından
  denemeSuresi: 7, // gün
} as const

// ══════════════════════════════════════════
// 4. REVERSE TRIAL KONFİGÜRASYONU
// ══════════════════════════════════════════

export const TRIAL_CONFIG = {
  model: 'reverse_trial' as const,
  sure: 14, // gün
  baslangicPlan: 'buyume', // 14 gün full Büyüme
  sonrasiPlan: 'baslangic', // Downgrade
  krediKartiGerekli: false,
  nudgelar: [
    { gun: 7, mesaj: 'Denemenizin yarısı kaldı — planınızı seçin' },
    { gun: 12, mesaj: 'Son 2 gün! Seçmezseniz Başlangıç planına geçersiniz' },
    { gun: 14, mesaj: 'Deneme süreniz doldu. Premium özelliklere devam etmek için planınızı seçin.' },
  ],
  downgradeGosterim: {
    kilitliOzellikGorunu: true,
    kilidIkonu: '🔒',
    upgradeMesaji: 'Bu özellik Büyüme planında — ₺1,299/ay\'dan başlayan',
  },
} as const

// ══════════════════════════════════════════
// 5. SEKTÖR-BAZLI ROI HESAPLAYICI
// ══════════════════════════════════════════

export interface SektorROI {
  sektor: string
  aciNoktasi: string
  degerOnerisi: string
  roiHesabi: { kayipGelir: number; kepenKMaliyet: number; roiKatsayi: number; aciklama: string }
  referansCumlesi: string
}

export const SEKTOR_ROI: SektorROI[] = [
  {
    sektor: 'berber',
    aciNoktasi: 'Kağıt defter, telefonda randevu karışıklığı, boş slot\'lar',
    degerOnerisi: 'Online randevu ile kuyruk bitsin, boş saatler dolsun',
    roiHesabi: { kayipGelir: 9000, kepenKMaliyet: 1299, roiKatsayi: 6.9, aciklama: 'Günde 2 boş slot × ₺150 saç kesimi = ₺300/gün → ₺9,000/ay kayıp' },
    referansCumlesi: '{{sehir}}\'de {{sayi}} berber zaten kepenk.ai kullanıyor.',
  },
  {
    sektor: 'restoran',
    aciNoktasi: 'Kağıt adisyon hataları, paket servis karmaşıklığı, düşük müşteri geri dönüşü',
    degerOnerisi: 'Dijital menü + QR sipariş + WhatsApp kampanya = %30 daha fazla müşteri',
    roiHesabi: { kayipGelir: 5000, kepenKMaliyet: 2598, roiKatsayi: 1.9, aciklama: 'Ayda 50 müşteri WhatsApp ile geri gelir × ₺100 ort. = ₺5,000' },
    referansCumlesi: '{{sehir}}\'de {{sayi}} restoran kepenk.ai Restaurant OS kullanıyor.',
  },
  {
    sektor: 'doktor',
    aciNoktasi: 'Telefon kaçırma, randevu iptalleri, hasta takip eksikliği',
    degerOnerisi: 'Online randevu + otomatik hatırlatma = %50 daha az iptal',
    roiHesabi: { kayipGelir: 10000, kepenKMaliyet: 1299, roiKatsayi: 3.8, aciklama: 'Haftada 5 iptal × ₺500 muayene = ₺10,000/ay kayıp → hatırlatma ile ₺5,000 kurtarma' },
    referansCumlesi: '{{sehir}}\'de {{sayi}} doktor kepenk.ai ile hasta yönetiyor.',
  },
]

// ══════════════════════════════════════════
// 6. İTİRAZ KARŞILAMA
// ══════════════════════════════════════════

export const ITIRAZ_KARSILAMA: Record<string, { itiraz: string; yanit: string }> = {
  pahali: {
    itiraz: 'Çok pahalı',
    yanit: 'Ayrı ayrı alsanız:\nWeb sitesi: ₺500/ay\nRandevu sistemi: ₺600/ay\nPOS: ₺500/ay\nWhatsApp botu: ₺800/ay\nCRM: ₺500/ay\nTOPLAM: ₺2,900/ay\n\nkepenk.ai Büyüme: ₺1,299/ay — %55 tasarruf.\nÜstelik KOSGEB desteğiyle maliyetin büyük kısmı karşılanabilir.',
  },
  ihtiyac_yok: {
    itiraz: 'İhtiyacım yok',
    yanit: 'Müşterilerinizin %70\'i sizi Google\'da arıyor.\nWeb siteniz yoksa, rakibinize gidiyorlar.\n14 gün ücretsiz deneyin — beğenmezseniz bırakın.',
  },
  teknoloji: {
    itiraz: 'Teknoloji bilmem',
    yanit: 'WhatsApp kullanabiliyor musunuz? Tamam, yeterli.\nAI size 5 soru soruyor, 10 dakikada her şey hazır.\nBerber Mehmet de öyle dedi — şimdi haftada 20 online randevu alıyor.',
  },
  instagram: {
    itiraz: 'Zaten Instagram var',
    yanit: 'Instagram harika — ama müşteriniz randevu almak istediğinde ne yapıyor?\nDM\'den yazıp cevap bekliyor. kepenk.ai ile 7/24 otomatik randevu alır.\nInstagram profilinize kepenk.ai linkinizi koyun — ikisi birlikte çalışsın.',
  },
  sonra: {
    itiraz: 'Sonra düşünürüm',
    yanit: 'Tabii, acele yok. Size WhatsApp\'tan bilgi göndereyim — hazır olduğunuzda tek tıkla başlarsınız.',
  },
}

// ══════════════════════════════════════════
// 7. BİRİM EKONOMİ
// ══════════════════════════════════════════

export const BIRIM_EKONOMI = {
  arpu: { lansman: 800, ay6: 1000, ay12: 1200, ay24: 1800 },
  cac: { dijital: { min: 500, max: 800 }, sahaSatis: { min: 1000, max: 2000 }, ortaklik: { min: 200, max: 500 }, referral: { min: 300, max: 600 }, blended: 1000 },
  ltv: { lansman: 20000, ay12: 39600, ay24: 59400 },
  ltvCac: { lansman: 16.7, ay12: 39.6 },
  cacPayback: { ay: 1.5 },
  brutKarMarji: { hedef: 0.80 },
  cogs: { aiApi: { min: 50, max: 150 }, whatsappApi: { min: 20, max: 50 }, hosting: { min: 10, max: 30 }, destek: { min: 20, max: 40 }, odemeAltyapisi: { min: 10, max: 20 } },
} as const

// ══════════════════════════════════════════
// 8. GELİR PROJEKSİYONU
// ══════════════════════════════════════════

export const GELIR_PROJEKSIYONU = [
  { faz: 1, donem: 'Ay 0-6', aktifEsnaf: 5000, arpu: 800, mrr: 4_000_000, arrRunRate: 48_000_000 },
  { faz: 2, donem: 'Ay 6-12', aktifEsnaf: 25000, arpu: 1200, mrr: 30_000_000, arrRunRate: 360_000_000 },
  { faz: 3, donem: 'Ay 12-24', aktifEsnaf: 100000, arpu: 1800, mrr: 180_000_000, arr: 2_160_000_000 },
] as const

// ══════════════════════════════════════════
// 9. YILLIK SÖZLEŞME STRATEJİSİ
// ══════════════════════════════════════════

export const YILLIK_SOZLESME_STRATEJISI = {
  avantaj: '2 ay ücretsiz',
  hedefOran: { lansman: 0.15, ay6: 0.30, ay12: 0.40 },
  ornekTasarruf: PLAN_TIERLARI.filter(p => p.id !== 'kurumsal').map(p => ({
    plan: p.isim, aylik: p.fiyatAylik, yillikToplam: p.fiyatYillikToplam,
    tasarruf: p.fiyatAylik * 12 - p.fiyatYillikToplam,
  })),
} as const

// ══════════════════════════════════════════
// 10. EXPANSION REVENUE TETİKLEYİCİLER
// ══════════════════════════════════════════

export interface UpgradeTetikleyici {
  fromTier: string
  toTier: string
  kosul: string
  mesaj: string
}

export const UPGRADE_TETIKLEYICILERI: UpgradeTetikleyici[] = [
  { fromTier: 'baslangic', toTier: 'buyume', kosul: '10 ürün limitine ulaşıldı', mesaj: 'Ürünleriniz sığmıyor! Büyüme planında sınırsız ürün.' },
  { fromTier: 'baslangic', toTier: 'buyume', kosul: '5 sayfa limitine ulaşıldı', mesaj: 'Siteniz büyüyor! Büyüme planında sınırsız sayfa + blog.' },
  { fromTier: 'baslangic', toTier: 'buyume', kosul: 'İlk WhatsApp müşteri sorusu geldi', mesaj: 'Müşteriniz WhatsApp\'tan yazdı — AI ile otomatik yanıt verin!' },
  { fromTier: 'buyume', toTier: 'profesyonel', kosul: 'Aylık gelir ₺5,000+ oldu', mesaj: 'Gelir artıyor! Pro\'da Google/Instagram reklam yönetimi var.' },
  { fromTier: 'buyume', toTier: 'profesyonel', kosul: '3+ çalışan eklendi', mesaj: 'Ekip büyüyor! Pro\'da 10 kullanıcı + personel yönetimi.' },
  { fromTier: 'buyume', toTier: 'profesyonel', kosul: 'WhatsApp kampanya limiti %80 doldu', mesaj: 'Kampanyalarınız çalışıyor! Pro\'da sınırsız mesaj.' },
  { fromTier: 'buyume', toTier: 'profesyonel', kosul: '100+ aylık randevu/sipariş', mesaj: 'İşletmeniz patlıyor! Pro\'da gelişmiş analitik + AI öneriler.' },
]

// ══════════════════════════════════════════
// 11. REFERRAL PROGRAMI
// ══════════════════════════════════════════

export const REFERRAL_CONFIG = {
  referrerOdul: '1 ay ücretsiz (mevcut planında)',
  refereeOdul: 'İlk ay %50 indirim',
  tetikleyici: 'Referee ilk ödemeyi yaptığında',
  maxAylikOdul: 3,
  linkFormat: 'kepenk.ai/ref/{{esnaf_slug}}',
  paylaSimSablonu: 'Ben {{isletme_adi}} olarak kepenk.ai kullanıyorum — web sitesi, WhatsApp AI, randevu, POS hepsi bir arada.\n\nSiz de deneyin, ilk ay yarı fiyatına:\n{{referral_link}}',
  hedefOran: 0.15, // Paid müşterilerin %15'i 1+ referral
} as const

// ══════════════════════════════════════════
// 12. FİYAT SAYFASI UX
// ══════════════════════════════════════════

export const FIYAT_SAYFASI_UX = {
  varsayilanGorunum: 'yillik' as const,
  mobilSira: ['buyume', 'profesyonel', 'baslangic', 'kurumsal'], // Büyüme ilk
  desktopSira: ['kurumsal', 'profesyonel', 'buyume', 'baslangic'], // Anchor sol
  vurguluTier: 'buyume',
  vurguScale: 1.05,
  karsilastirmaMaxSatir: 15,
  guvenSinyalleri: [
    '14 gün ücretsiz deneme (kredi kartı gerekmez)',
    'İstediğiniz zaman iptal edin',
    'Tüm fiyatlar KDV dahildir',
    '6-12 ay taksit imkanı',
    'KOSGEB dijital dönüşüm desteği ile kullanılabilir',
  ],
} as const
