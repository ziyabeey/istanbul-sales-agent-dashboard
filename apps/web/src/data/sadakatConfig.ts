/**
 * kepenk.ai — Sadakat & Gamification Konfigürasyonu
 * ═══════════════════════════════════════════════════
 * Puan, damga kartı, VIP tier, ödül, referral, QR,
 * WhatsApp bildirim, sektör şablon, gamification, analitik.
 */

// ══════════════════════════════════════════
// 1. STACK & PLAN KISITLAMA
// ══════════════════════════════════════════

export const SADAKAT_STACK = {
  veri: 'Firestore — loyalty/{programId}, accounts/{contactId}',
  bildirim: 'WhatsApp (birincil) + Push (ikincil) + SMS (fallback)',
  qr: 'Mağazada QR taratma ile puan kazanma',
  analitik: 'BigQuery (sadakat metrikleri)',
  ai: 'Claude Haiku (puan/ödül hesaplama, öneri)',
} as const

export const PLAN_KISITLAMA = {
  baslangic: 'Sadakat programı YOK',
  buyume: '1 program, temel puan + damga kartı',
  profesyonel: 'Sınırsız program, VIP tier, gelişmiş ödüller',
  kurumsal: 'Tümü + API erişimi + özel entegrasyon',
} as const

export const KULTUR_BAGLAMM = {
  mevcutDurum: ['Kağıt damga kartı (berber: 10 kesim → 1 ücretsiz)', 'Sözlü indirim ("düzenli müşterisin, %10 yapayım")', 'WhatsApp grubu (VIP müşterilere özel kampanya)', 'Sorunlar: takip yok, unutuluyor, ölçülemiyor'],
  kepenkFarki: ['Kağıt damga → dijital damga kartı (telefonda)', 'Sözlü indirim → otomatik puan + indirim kuponu', 'WhatsApp grubu → segmentli VIP kampanya', 'Esnaf "yeni şey öğrenme" hissi yaşamaz — bildiği şeyin dijitali'],
} as const

// ══════════════════════════════════════════
// 2. VERİ MODELİ
// ══════════════════════════════════════════

export const PROGRAM_TIPLERI = ['points', 'stamps', 'hybrid'] as const
export const PROGRAM_DURUMLARI = ['active', 'paused', 'archived'] as const

export const KAZANIM_KURAL_TIPLERI = ['spend', 'visit', 'booking', 'referral', 'review', 'birthday', 'custom'] as const

export const ODUL_TIPLERI = ['discount_percent', 'discount_fixed', 'free_product', 'free_service', 'priority_booking', 'custom'] as const

export const VIP_TIER_SEMA = {
  varsayilanTierler: [
    { id: 'bronze', isim: 'Bronz', level: 1, badge: '🥉', renk: '#CD7F32', puanCarpan: 1.0 },
    { id: 'silver', isim: 'Gümüş', level: 2, badge: '🥈', renk: '#C0C0C0', puanCarpan: 1.5 },
    { id: 'gold', isim: 'Altın', level: 3, badge: '🥇', renk: '#FFD700', puanCarpan: 2.0 },
    { id: 'platinum', isim: 'Platin', level: 4, badge: '💎', renk: '#E5E4E2', puanCarpan: 2.5 },
  ],
  yukselmeMetrikleri: ['lifetime_points', 'total_spend', 'total_visits', 'months_active'],
  tierAvantajlari: ['Puan çarpanı', 'Özel ödüller', 'Öncelikli randevu', 'Doğum günü bonus', 'Ücretsiz kargo', 'Erken erişim', 'Özel avantaj'],
  dusmeKorumasi: { gracePeriodDays: 90, downgradeNotify: true },
} as const

export const FIRESTORE_KOLEKSIYONLAR = {
  program: 'loyalty/{programId}',
  accounts: 'loyalty/{programId}/accounts/{contactId}',
  transactions: 'loyalty/{programId}/accounts/{contactId}/transactions',
  alanlar: {
    program: ['id', 'esnafId', 'name', 'type', 'status', 'earningRules[]', 'rewards[]', 'tiers[]', 'stampCard{}', 'settings{}'],
    account: ['contactId', 'currentPoints', 'lifetimePoints', 'redeemedPoints', 'expiredPoints', 'currentStamps', 'completedCards', 'tierId', 'tierProgress{}', 'referralCode', 'referralCount'],
    transaction: ['type (earn|redeem|expire|adjust|referral_earn)', 'points', 'balance', 'orderId?', 'bookingId?', 'rewardId?', 'description'],
  },
} as const

// ══════════════════════════════════════════
// 3. SEKTÖR ŞABLONLARI
// ══════════════════════════════════════════

export interface SektorSablon {
  sektor: string; programAdi: string; tip: string
  kazanim: string; oduller: { kosul: string; odul: string }[]
  ekKurallar?: string[]; vipTiers?: { tier: string; esik: string; avantaj: string }[]
}

export const SEKTOR_SABLONLARI: SektorSablon[] = [
  {
    sektor: 'berber', programAdi: 'Sadakat Kartım', tip: 'stamps',
    kazanim: 'Her saç kesiminde 1 damga (10 damga → ödül)',
    oduller: [{ kosul: '10 damga', odul: '11. Saç Kesimi Ücretsiz' }],
    ekKurallar: ['Sakal tıraşı = 0.5 damga', 'Cilt bakımı = 2 damga'],
    vipTiers: [
      { tier: 'Bronz', esik: '0 ziyaret', avantaj: 'Temel damga kartı' },
      { tier: 'Gümüş', esik: '20 ziyaret', avantaj: '1.5x damga + doğum günü ücretsiz kesim' },
      { tier: 'Altın', esik: '50 ziyaret', avantaj: '2x damga + öncelikli randevu + aylık 1 ücretsiz bakım' },
    ],
  },
  {
    sektor: 'restoran', programAdi: 'Lezzet Puanları', tip: 'points',
    kazanim: 'Her ₺10 harcama = 1 puan',
    oduller: [{ kosul: '50 puan', odul: 'Ücretsiz tatlı' }, { kosul: '100 puan', odul: '₺50 indirim' }, { kosul: '200 puan', odul: '2 kişilik menü hediye' }],
    ekKurallar: ['Doğum günü: 2x puan', 'Hafta içi 14-17: 1.5x puan'],
  },
  {
    sektor: 'kafe', programAdi: 'Kahve Kartı', tip: 'stamps',
    kazanim: 'Her kahve alışverişinde 1 damga (8 damga → ödül)',
    oduller: [{ kosul: '8 damga', odul: '9. Kahve Bizden' }],
    ekKurallar: ['Pasta/sandviç eklerse ekstra 1 damga'],
  },
  {
    sektor: 'doktor', programAdi: 'Sağlık Puanları', tip: 'points',
    kazanim: 'Her muayenede 10 puan',
    oduller: [{ kosul: '50 puan', odul: 'Ücretsiz kontrol muayenesi' }, { kosul: '100 puan', odul: '%20 indirim (estetik)' }],
    ekKurallar: ['Dikkat: "indirimle tedavi" algısı olmamalı'],
  },
  {
    sektor: 'spor_salonu', programAdi: 'Fitness Puanları', tip: 'hybrid',
    kazanim: 'Her ₺100 üyelik = 10 puan + Her 10 giriş = 1 damga',
    oduller: [{ kosul: '50 puan', odul: '1 ücretsiz PT seansı' }, { kosul: '5 damga', odul: 'Protein shake hediye' }],
  },
  {
    sektor: 'genel', programAdi: 'Sadakat Programı', tip: 'points',
    kazanim: 'Her ₺10 = 1 puan',
    oduller: [{ kosul: '50 puan', odul: '%10 indirim' }, { kosul: '100 puan', odul: '%20 indirim' }, { kosul: '200 puan', odul: 'Ücretsiz ürün/hizmet' }],
  },
]

// ══════════════════════════════════════════
// 4. KAZANIM & KULLANIM AKIŞLARI
// ══════════════════════════════════════════

export const KAZANIM_AKISLARI = [
  { kanal: 'Online Satış', tetikleyici: 'order.COMPLETED + payment.PAID', adimlar: ['Tutardan puan hesapla (earningRule.spend)', 'VIP tier çarpanı uygula', 'Özel gün çarpanı uygula', 'Günlük limit kontrol', 'currentPoints += hesaplanan', 'Transaction oluştur (earn)', 'WhatsApp: "🎉 {{puan}} puan kazandınız!"'] },
  { kanal: 'POS Satış', tetikleyici: 'POS ödeme tamamlandı', adimlar: ['Müşteri telefon/QR ile eşleştir', 'Aynı hesaplama mantığı', 'QR taratma alternatifi (telefon bilmiyorsa)'] },
  { kanal: 'Randevu', tetikleyici: 'booking.COMPLETED', adimlar: ['earningRule.booking.pointsPerBooking uygula'] },
  { kanal: 'Damga', tetikleyici: 'Ödeme tamamlandı', adimlar: ['currentStamps += stampPerVisit', 'stamps ≥ required ise: ödül kuponu oluştur + WhatsApp + reset + completedCards++'] },
  { kanal: 'QR Kod', tetikleyici: 'Müşteri QR tarattı', adimlar: ['Esnaf QR gösterir (dashboard)', 'Müşteri tarar → web sayfası açılır', '"X puan kazandınız! 🎉"', 'QR her 5dk yenilenir (tekrar önleme)'] },
  { kanal: 'Referral', tetikleyici: 'Yeni müşteri ilk satın alma', adimlar: ['Referrer: referralBonus.referrer puan', 'Referee: referralBonus.referee puan (hoşgeldin)', 'Her ikisine WhatsApp bildirimi'] },
]

export const KULLANIM_AKISLARI = [
  { kanal: 'Online Checkout', adimlar: ['"Puanlarınızı Kullanın" alanı', 'Uygun ödüller gösterilir', 'Seçim → indirim uygulanır', 'Tamamlanınca puan düşülür', 'İptal → puanlar İADE'] },
  { kanal: 'POS', adimlar: ['Müşteri tanımlanır (telefon/QR)', '"{{puan}} puanı var" gösterilir', 'Esnaf ödül uygular → puan düşer'] },
  { kanal: 'WhatsApp', adimlar: ['Müşteri "puanlarımı kullanmak istiyorum" der', 'AI bot uygun ödülleri listeler', 'Seçim yapılır → tek kullanımlık kupon oluşturulur'] },
]

// ══════════════════════════════════════════
// 5. WHATSAPP BİLDİRİMLERİ
// ══════════════════════════════════════════

export const WHATSAPP_BILDIRIMLERI = [
  { olay: 'puan_kazanim', tetikleyici: 'Puan kazanıldığında', sablon: '⭐ {{puan}} puan kazandınız!\nToplam: {{toplam_puan}}\n🎯 {{kalan}} puan daha → {{odul_adi}} hediye!' },
  { olay: 'damga_kazanim', tetikleyici: 'Damga eklendiğinde', sablon: '✅ 1 damga eklendi!\n{{mevcut}}/{{hedef}} damga\n{{gorsel_ilerleme}}\n{{kalan}} damga daha → {{odul}} 🎁', gorselOrnek: '✅✅✅✅✅✅⬜⬜⬜⬜ (6/10)' },
  { olay: 'kart_tamamlandi', tetikleyici: 'Damga kartı dolduğunda', sablon: '🎉 TEBRİKLER!\nKartınız doldu! {{odul}} hediyeniz hazır!\n[🎁 Ödülümü Kullan]' },
  { olay: 'tier_yukselme', tetikleyici: 'VIP tier yükseldiğinde', sablon: '🏆 Tebrikler! {{yeni_tier}} üyesi oldunuz!\n{{avantajlar}}\n[⭐ Avantajlarımı Gör]' },
  { olay: 'dogum_gunu', tetikleyici: 'Doğum gününde (10:00)', sablon: '🎂 Doğum gününüz kutlu olsun {{isim}}!\n{{bonus_puan}} bonus puan hediye ettik! 🎉' },
  { olay: 'puan_suresi_uyari', tetikleyici: 'Süre dolmadan 7 gün önce', sablon: '⏰ {{puan}} puanınızın süresi {{tarih}} doluyor!\n[🎁 Ödülleri Gör]' },
]

// ══════════════════════════════════════════
// 6. GAMİFİCATION
// ══════════════════════════════════════════

export const GAMIFICATION = {
  ilerleme: {
    damgaKarti: { gorunum: 'Yatay kart — doldurulmuş/boş grid', animasyon: 'Bounce + sparkle' },
    puanBar: { gorunum: 'Sonraki ödüle ilerleme çubuğu', renk: 'Tier rengine göre gradient' },
    tierBadge: { gorunum: 'Profilde VIP tier badge', ornekler: ['🥉 Bronz', '🥈 Gümüş', '🥇 Altın', '💎 Platin'] },
  },
  basarimlar: [
    { isim: 'İlk Alışveriş', kosul: 'İlk sipariş', odul: '10 bonus puan', ikon: '🛍️' },
    { isim: 'Sadık Müşteri', kosul: '10 ziyaret', odul: '50 bonus puan', ikon: '⭐' },
    { isim: 'Referans Şampiyonu', kosul: '5 arkadaş davet', odul: '100 bonus puan', ikon: '🏆' },
    { isim: 'Doğum Günü', kosul: 'Doğum gününde alışveriş', odul: '2x puan', ikon: '🎂' },
    { isim: 'Erken Kuş', kosul: 'Sabah 09-11 randevu', odul: '5 bonus puan', ikon: '🐦' },
  ],
  liderlik: { ne: 'Ayın en sadık 10 müşterisi', gorunum: 'Sadece esnaf dashboard — müşteriye gösterilmez' },
  mevsimsel: [
    { etkinlik: 'Ramazan', bonus: 'İftar saatleri 2x puan' },
    { etkinlik: 'Bayram', bonus: 'Özel bayram ödülü' },
    { etkinlik: 'Yılbaşı', bonus: 'Aralık boyunca 1.5x puan' },
    { etkinlik: 'Sevgililer Günü', bonus: 'Çift gelenlere bonus' },
    { etkinlik: 'Özel Gün', bonus: 'Esnaf tanımlar (açılış yıldönümü vb.)' },
  ],
} as const

// ══════════════════════════════════════════
// 7. DASHBOARD ANALİTİK
// ══════════════════════════════════════════

export const DASHBOARD_ANALITIK = {
  ozetKartlari: ['Aktif sadakat üye sayısı', 'Bu ay kazanılan puan toplamı', 'Bu ay kullanılan ödül sayısı', 'Ortalama müşteri puanı', 'Referral ile gelen yeni müşteri'],
  grafikler: ['Puan kazanım trendi (aylık)', 'Ödül kullanım oranı', 'Tier dağılımı (pie chart)', 'Sadakat ROI (ödül maliyeti vs tekrar gelir)'],
  listeler: ['En çok puanlı 10 müşteri', 'Ödül kullanmamış müşteriler', 'Puan süresi dolmak üzere', 'Bu ay tier yükselen müşteriler'],
  aiOnerileri: { model: 'Claude Haiku', ornekler: ['💡 47 müşterinin puanı ödül eşiğine yakın — hatırlatma gönderin', '💡 Çarşamba puan kazanımı düşük — 2x puan etkinliği başlatın', '💡 Referral bu ay 12 yeni müşteri getirdi — bonusu artırın'] },
} as const

// ══════════════════════════════════════════
// 8. API ENDPOINT'LERİ
// ══════════════════════════════════════════

export const SADAKAT_ENDPOINTLERI = [
  { yontem: 'GET', yol: '/v1/loyalty/program', aciklama: 'Aktif sadakat programı' },
  { yontem: 'PUT', yol: '/v1/loyalty/program', aciklama: 'Program ayarları güncelle' },
  { yontem: 'GET', yol: '/v1/loyalty/accounts', aciklama: 'Üye listesi (puan/tier ile)' },
  { yontem: 'GET', yol: '/v1/loyalty/accounts/:id', aciklama: 'Müşteri sadakat detayı' },
  { yontem: 'POST', yol: '/v1/loyalty/earn', aciklama: 'Manuel puan ekle' },
  { yontem: 'POST', yol: '/v1/loyalty/redeem', aciklama: 'Ödül kullan' },
  { yontem: 'POST', yol: '/v1/loyalty/adjust', aciklama: 'Puan düzeltme (+/-)' },
  { yontem: 'GET', yol: '/v1/loyalty/rewards', aciklama: 'Ödül kataloğu' },
  { yontem: 'POST', yol: '/v1/loyalty/rewards', aciklama: 'Ödül ekle' },
  { yontem: 'PUT', yol: '/v1/loyalty/rewards/:id', aciklama: 'Ödül güncelle' },
  { yontem: 'GET', yol: '/v1/loyalty/analytics', aciklama: 'Sadakat analitiği' },
  { yontem: 'POST', yol: '/v1/loyalty/qr/generate', aciklama: 'Puan QR kodu üret' },
  { yontem: 'POST', yol: '/v1/loyalty/qr/scan', aciklama: 'QR taratma ile puan' },
  { yontem: 'GET', yol: '/v1/public/:slug/loyalty', aciklama: 'Müşteri puan/tier bilgisi' },
  { yontem: 'GET', yol: '/v1/public/:slug/loyalty/rewards', aciklama: 'Kullanılabilir ödüller' },
  { yontem: 'POST', yol: '/v1/public/:slug/loyalty/redeem', aciklama: 'Müşteri ödül kullan' },
]
