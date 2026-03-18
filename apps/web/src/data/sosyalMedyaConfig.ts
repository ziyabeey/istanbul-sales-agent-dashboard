/**
 * kepenk.ai — Sosyal Medya & İçerik Üretimi Konfigürasyonu
 * ══════════════════════════════════════════════════════════
 * AI içerik, takvim, Instagram/Facebook/GBP, planlama, analitik.
 */

// ══════════════════════════════════════════
// 1. STACK & PLAN
// ══════════════════════════════════════════

export const SOSYAL_STACK = {
  instagram: 'Instagram Graph API (Meta Business SDK)',
  facebook: 'Facebook Pages API (Meta Business SDK)',
  tiktok: 'TikTok for Business API (gelecek faz)',
  googleBusiness: 'Google Business Profile API',
  aiMetin: 'Claude Sonnet (social_creator agent)',
  planlama: 'Firestore scheduled_posts + Cloud Scheduler',
  analitik: 'BigQuery (sosyal medya metrikleri)',
} as const

export const PLAN_KISITLAMA = {
  baslangic: 'Sosyal medya YOK',
  buyume: 'Google Business Profile gönderi (temel)',
  profesyonel: 'Instagram + Facebook + GBP + AI içerik + takvim',
  kurumsal: 'Tümü + TikTok + gelişmiş analitik',
} as const

export const TURKIYE_CONTEXT = {
  enPopuler: 'Instagram (%90+ esnaf kullanıyor)',
  ikincil: 'Facebook (sayfa var ama genelde aktif değil)',
  yukselen: 'TikTok (genç esnaflar — berber/kafe)',
  zorunlu: 'Google Business Profile (yerel SEO kritik)',
  sorun: 'Esnafların %80\'i düzensiz paylaşıyor. İçerik üretmek zaman alıyor. kepenk.ai: AI ile 30 saniyede profesyonel post.',
} as const

// ══════════════════════════════════════════
// 2. AI İÇERİK ÜRETME
// ══════════════════════════════════════════

export const AI_ICERIK = {
  akis: ['Esnaf → Sosyal Medya → Yeni Post', 'İçerik tipi seç (ürün/kampanya/günlük/bilgi/motivasyon)', 'AI metin + görsel önerisi (<10sn)', 'Esnaf düzenler veya direkt onaylar', 'Platform seç (IG/FB/GBP/hepsi)', 'Hemen paylaş veya zamanlı'],
  agent: 'social_creator (Prompt #27)',
  model: 'Claude Sonnet',
  kurallar: ['Sektöre uygun ton (berber: samimi-maskülen, kafe: trendy, doktor: güvenilir)', 'Instagram max 2200 karakter, ilk 2 satır dikkat çekici', 'Emoji 3-5 per post', 'CTA ekle (randevu al, sipariş ver, bizi ziyaret edin)', 'Hashtag ayrı bölümde (metin içinde DEĞİL)', 'Türkçe — teknik terim yok'],
} as const

export interface IcerikTipi { tip: string; sablon: string; ornekSektor: string; ornek: string }

export const ICERIK_TIPLERI: IcerikTipi[] = [
  { tip: 'urun_tanitim', sablon: 'Ürün/hizmet fotoğrafı + fayda odaklı açıklama + fiyat + CTA', ornekSektor: 'berber', ornek: '✂️ Yaz geldi, saçlar da taze olsun!\n\nErkek saç kesimi + sakal düzeltme sadece ₺200 🔥\n\n📅 Randevu için DM veya WhatsApp\n📍 Kadıköy, Moda Caddesi\n\n#kadıköyberber #erkeksaçkesimi' },
  { tip: 'kampanya', sablon: 'Dikkat çekici başlık + kampanya detayı + süre + CTA', ornekSektor: 'restoran', ornek: '🍕 BU HAFTA SONU: 2 al 1 öde!\n\nAilece gelin, lezzetin tadını çıkarın.\nCuma-Pazar arası geçerli.\n\n📞 Rezervasyon: 0212 XXX\n📍 Beşiktaş\n\n#beşiktaşrestoran #2al1öde' },
  { tip: 'gunluk', sablon: 'İşletme günlüğü — samimi, arka plan, çalışma ortamı', ornekSektor: 'kafe', ornek: '☕ Günaydın! Bugün de güzel bir kahveyle başlayalım.\n\nTaze kurabiyeler fırından yeni çıktı 🍪\nSizi bekliyoruz!\n\n📍 Nişantaşı\n#nişantaşıkafe #günaydın' },
  { tip: 'bilgilendirme', sablon: 'Sektör bilgisi + ipucu + uzmanlık gösterisi', ornekSektor: 'doktor', ornek: '🦷 Bilir misiniz?\n\nDüzenli diş kontrolü, büyük sorunların önüne geçer!\n6 ayda bir kontrol önerilir.\n\n📅 Randevu: 0216 XXX\n#dişsağlığı #istanbul' },
  { tip: 'motivasyon', sablon: 'Motivasyonel alıntı + marka değerleri', ornekSektor: 'spor', ornek: '💪 "Bugün başla, yarın kendine teşekkür edeceksin."\n\nYeni yıl, yeni hedefler!\nÜcretsiz deneme dersi hazır.\n\n📍 Ataşehir\n#fitness #motivasyon' },
]

export const HASHTAG_STRATEJISI = {
  katmanlar: [
    { katman: 'Konum', sayi: '3-5', ornekler: '#kadıköy #istanbul #moda' },
    { katman: 'Sektör', sayi: '3-5', ornekler: '#berber #saçkesimi #erkekbakım' },
    { katman: 'Trend/Genel', sayi: '2-3', ornekler: '#keşfet #trending' },
  ],
  toplamOptimum: '10-15 hashtag',
  yasak: 'Rakip marka isimleri KULLANILMAZ',
  model: 'Claude Haiku',
} as const

export const GORSEL_FORMATLARI = [
  { platform: 'Instagram Post', boyut: '1080×1080 (kare) veya 1080×1350 (portre)' },
  { platform: 'Instagram Story', boyut: '1080×1920' },
  { platform: 'Facebook Post', boyut: '1200×630' },
  { platform: 'GBP Post', boyut: '1200×900' },
] as const

// ══════════════════════════════════════════
// 3. İÇERİK TAKVİMİ
// ══════════════════════════════════════════

export const DINI_GUNLER = [
  { gun: 'Ramazan Başlangıcı', icerik: 'İftar menüsü, Ramazan kampanyası', sektorler: ['restoran', 'kafe', 'market'] },
  { gun: 'Kadir Gecesi', icerik: 'Mübarek gece tebriği', sektorler: ['hepsi'] },
  { gun: 'Ramazan Bayramı', icerik: 'Bayram tebriği + kampanya', sektorler: ['hepsi'] },
  { gun: 'Kurban Bayramı', icerik: 'Bayram tebriği + kampanya', sektorler: ['hepsi', 'kasap (öncesi sipariş)'] },
]

export const ULUSAL_GUNLER = [
  { tarih: '1 Ocak', gun: 'Yeni Yıl', icerik: 'Kutlama + yılbaşı kampanyası' },
  { tarih: '14 Şubat', gun: 'Sevgililer Günü', icerik: 'Kampanya (kafe, restoran, çiçekçi)' },
  { tarih: '8 Mart', gun: 'Kadınlar Günü', icerik: 'Kutlama + kadınlara özel' },
  { tarih: '23 Nisan', gun: 'Ulusal Egemenlik ve Çocuk Bayramı', icerik: 'Kutlama' },
  { tarih: '1 Mayıs', gun: 'İşçi Bayramı', icerik: 'Kapalı olabilir — hatırlatma' },
  { tarih: '19 Mayıs', gun: 'Gençlik ve Spor Bayramı', icerik: 'Kutlama' },
  { tarih: 'Mayıs 2. Pazar', gun: 'Anneler Günü', icerik: 'Kampanya + hediye' },
  { tarih: 'Haziran 3. Pazar', gun: 'Babalar Günü', icerik: 'Kampanya + hediye' },
  { tarih: '15 Temmuz', gun: 'Demokrasi ve Milli Birlik Günü', icerik: 'Anma' },
  { tarih: '30 Ağustos', gun: 'Zafer Bayramı', icerik: 'Kutlama' },
  { tarih: '29 Ekim', gun: 'Cumhuriyet Bayramı', icerik: 'Kutlama' },
]

export const MEVSIMSEL = [
  { mevsim: 'İlkbahar', icerik: 'Yenilenme, bahar kampanyası, açılış' },
  { mevsim: 'Yaz', icerik: 'Tatil, serinleme, yaz menüsü' },
  { mevsim: 'Sonbahar', icerik: 'Okul açılışı, güz kampanyası' },
  { mevsim: 'Kış', icerik: 'Kış menüsü, sıcak içecekler, yılsonu' },
]

export const SEKTOR_TAKVIM = [
  { sektor: 'berber', ipucu: 'Bayram öncesi yoğunluk — erken randevu çağrısı' },
  { sektor: 'restoran', ipucu: 'İftar menüsü, Valentine\'s menü, yılbaşı menü' },
  { sektor: 'doktor', ipucu: 'Grip sezonu, alerji sezonu, check-up hatırlatma' },
  { sektor: 'spor', ipucu: 'Ocak yeni yıl kararı, Haziran yaz vücudu' },
]

export const ZAMANLAMA = {
  enIyiSaatler: { instagram: '12:00-14:00 ve 19:00-21:00', facebook: '13:00-16:00', gbp: '10:00-12:00' },
  aiOptimizasyon: 'Takipçi etkileşim verisinden özel saat önerisi (Profesyonel+)',
  oneriSikligi: 'Haftada 3-5 post önerisi (esnaf onaylar)',
} as const

// ══════════════════════════════════════════
// 4. PLATFORM ENTEGRASYONLARI
// ══════════════════════════════════════════

export const META_ENTEGRASYON = {
  api: 'Instagram Graph API + Facebook Pages API',
  auth: 'Facebook Login (OAuth 2.0) → Instagram Business bağlama',
  onKosul: ['Instagram Business veya Creator hesap', 'Facebook Sayfası ile bağlantılı', 'Meta Developer uygulaması onaylı'],
  instagram: { desteklenen: ['Fotoğraf + carousel post', 'İnsights (takipçi, etkileşim, erişim)', 'Yorum okuma'], gelecek: ['Story (API kısıtlı)', 'Reels'] },
  facebook: { desteklenen: ['Fotoğraf + metin post', 'Insights (beğeni, erişim, etkileşim)'] },
  zamanliPaylasim: ['Esnaf post + tarih/saat seçer', 'Firestore scheduled_posts kaydedilir', 'Cloud Scheduler → Cloud Function tetikler', 'Meta API\'ye post gönderir', 'Başarılı → WhatsApp "Postunuz yayınlandı ✅"', 'Başarısız → 2 retry → esnafa bildir'],
} as const

export const GBP_ENTEGRASYON = {
  api: 'Google Business Profile API',
  auth: 'Google OAuth 2.0',
  gonderiTipleri: ['STANDARD — Genel güncelleme', 'OFFER — Kampanya/indirim (tarih aralıklı)', 'EVENT — Etkinlik duyurusu'],
  icerik: 'Metin max 1500 karakter + 1 görsel + CTA butonu',
  ctaButonlar: ['Randevu Al', 'Sipariş Ver', 'Daha Fazla Bilgi', 'Ara'],
  bilgiGuncelleme: ['Çalışma saatleri (tatil/bayram)', 'Özel gün saatleri', 'İşletme açıklaması', 'Fotoğraf'],
  yorumYonetimi: ['Dashboard\'da yeni yorumlar', 'AI yanıt önerisi', 'Tek tıkla yanıtla'],
  seoEtkisi: 'Haftalık 1-2 GBP gönderi → Google Maps sıralamasında yükselme. kepenk.ai otomatikleştirir.',
} as const

// ══════════════════════════════════════════
// 5. PERFORMANS TAKİBİ
// ══════════════════════════════════════════

export const PERFORMANS_METRIKLERI = {
  instagram: ['Takipçi sayısı (trend)', 'Post etkileşim oranı (like+yorum/takipçi)', 'Erişim (reach)', 'Profil ziyareti', 'Web sitesi tıklaması'],
  facebook: ['Sayfa beğeni (trend)', 'Post erişim', 'Etkileşim'],
  gbp: ['Görünürlük (arama + harita)', 'Tıklama (site, tel, yol tarifi)', 'Yorum sayısı + ortalama puan'],
} as const

export const DASHBOARD_PANELLER = [
  'Platform bazlı takipçi/beğeni trendi (30 gün)',
  'En çok etkileşim alan 5 post',
  'Haftalık paylaşım sayısı',
  'AI içerik vs manuel içerik performans karşılaştırma',
]

export const AI_ONERILERI = [
  '📊 Yemek fotoğrafları %40 daha çok etkileşim alıyor — daha sık paylaşın',
  '📊 Öğle saati paylaşımları akşamdan %25 daha iyi performans',
  '📊 Hashtag\'li postlar %60 daha fazla erişim',
]

// ══════════════════════════════════════════
// 6. API ENDPOINT'LERİ
// ══════════════════════════════════════════

export const SOSYAL_ENDPOINTLERI = [
  { yontem: 'GET', yol: '/v1/social/connections', aciklama: 'Bağlı sosyal medya hesapları' },
  { yontem: 'POST', yol: '/v1/social/connect/instagram', aciklama: 'Instagram bağla (OAuth)' },
  { yontem: 'POST', yol: '/v1/social/connect/facebook', aciklama: 'Facebook sayfası bağla' },
  { yontem: 'POST', yol: '/v1/social/connect/gbp', aciklama: 'Google Business bağla' },
  { yontem: 'POST', yol: '/v1/social/posts', aciklama: 'Post oluştur (zamanlı/hemen)' },
  { yontem: 'GET', yol: '/v1/social/posts', aciklama: 'Post listesi' },
  { yontem: 'PUT', yol: '/v1/social/posts/:id', aciklama: 'Post düzenle (zamanlanmış)' },
  { yontem: 'DELETE', yol: '/v1/social/posts/:id', aciklama: 'Post sil/iptal' },
  { yontem: 'POST', yol: '/v1/social/posts/:id/publish', aciklama: 'Hemen yayınla' },
  { yontem: 'GET', yol: '/v1/social/analytics', aciklama: 'Sosyal medya analitiği' },
  { yontem: 'GET', yol: '/v1/social/calendar', aciklama: 'İçerik takvimi + AI önerileri' },
  { yontem: 'POST', yol: '/v1/social/ai/generate', aciklama: 'AI post içeriği üret' },
  { yontem: 'GET', yol: '/v1/social/gbp/reviews', aciklama: 'GBP yorumları' },
  { yontem: 'POST', yol: '/v1/social/gbp/reviews/:id/reply', aciklama: 'GBP yoruma yanıt' },
]
