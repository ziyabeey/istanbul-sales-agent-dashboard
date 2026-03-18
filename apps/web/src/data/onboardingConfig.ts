/**
 * kepenk.ai — Onboarding & Müşteri Başarı Konfigürasyonu
 * ═══════════════════════════════════════════════════════
 * Sektör-bazlı onboarding akışları, checklist, gamification,
 * WhatsApp drip kampanyaları, health score boyutları, dunning.
 */

// ══════════════════════════════════════════
// 1. ONBOARDING SABİTLERİ
// ══════════════════════════════════════════

export const ONBOARDING_SABITLERI = {
  maxKayitAlani: 3,           // Her ek alan %7 conversion kaybı
  maxChecklistItems: 5,       // Zeigarnik etkisi — 5'ten fazla tamamlanmaz
  maxOnboardingSorusu: 5,     // 5+ soru → completion %10-15 düşüş
  ilkMaddeOnTamamlanmis: true, // Endowed progress: "zaten başladınız"
  sessizSaatBaslangic: 22,   // 22:00 sonrası mesaj gönderme
  sessizSaatBitis: 8,        // 08:00'a kadar
  maxYanitsizMesaj: 4,       // 4 yanıtsız mesajdan sonra DUR
  aktivasyonMetrigi: 'ilk_odeme_alma' as const,

  hedefler: {
    ttvSiteYayinda: '<10 dakika',
    ttvIlkOdeme: '<14 gün',
    aktivasyonOrani: { lansman: 0.15, ay6: 0.20, ay12: 0.25 },
    checklistTamamlama: { lansman: 0.30, ay6: 0.40, ay12: 0.50 },
    gun7Retention: 0.50,
  },
} as const

// ══════════════════════════════════════════
// 2. KAYIT AKIŞI
// ══════════════════════════════════════════

export interface IsletmeTipiSecenegi {
  id: string
  ikon: string
  label: string
  sektorKodu: string
}

export const ISLETME_TIPLERI: IsletmeTipiSecenegi[] = [
  { id: 'berber', ikon: '✂️', label: 'Berber / Kuaför', sektorKodu: 'berber' },
  { id: 'restoran', ikon: '🍽️', label: 'Restoran / Kafe', sektorKodu: 'restoran' },
  { id: 'doktor', ikon: '🏥', label: 'Doktor / Klinik', sektorKodu: 'doktor' },
  { id: 'tamir', ikon: '🔧', label: 'Tamir / Servis', sektorKodu: 'oto_tamir' },
  { id: 'fotografci', ikon: '📸', label: 'Fotoğrafçı', sektorKodu: 'fotografci' },
  { id: 'spor', ikon: '🏋️', label: 'Spor Salonu', sektorKodu: 'spor_salonu' },
  { id: 'eczane', ikon: '💊', label: 'Eczane', sektorKodu: 'eczane' },
  { id: 'egitim', ikon: '📚', label: 'Özel Ders', sektorKodu: 'ozel_ders' },
  { id: 'market', ikon: '🛒', label: 'Market / Bakkal', sektorKodu: 'market' },
  { id: 'diger', ikon: '📦', label: 'Diğer', sektorKodu: 'genel' },
]

// ══════════════════════════════════════════
// 3. SEKTÖR-BAZLI ONBOARDING SORULARI
// ══════════════════════════════════════════

export interface OnboardingSorusu {
  id: string
  mesaj: string
  beklenenTip: 'serbest_metin' | 'fiyat' | 'saat' | 'adres' | 'foto'
  aiIslemi: string
}

export const SEKTOR_ONBOARDING_SORULARI: Record<string, OnboardingSorusu[]> = {
  berber: [
    { id: 'hizmetler', mesaj: 'Hangi hizmetleri sunuyorsunuz? (Saç kesimi, sakal, cilt bakımı...)', beklenenTip: 'serbest_metin', aiIslemi: 'Hizmet listesi oluştur + varsayılan fiyatlar ata' },
    { id: 'fiyatlar', mesaj: 'Fiyatlarınız yaklaşık ne kadar?\nMesela saç kesimi kaç TL?', beklenenTip: 'fiyat', aiIslemi: 'Hizmet-fiyat eşleştirmesi' },
    { id: 'calisma', mesaj: 'Çalışma günleriniz ve saatleriniz nedir?', beklenenTip: 'saat', aiIslemi: 'Randevu takvimi konfigürasyonu' },
    { id: 'adres', mesaj: 'Dükkanınızın adresi nedir? (Google Maps linki de olur)', beklenenTip: 'adres', aiIslemi: 'LocalBusiness schema + harita entegrasyonu' },
    { id: 'foto', mesaj: 'Son soru! Dükkanınızın bir fotoğrafını çekip gönderir misiniz? 📸\n(Yoksa sonra da ekleyebilirsiniz)', beklenenTip: 'foto', aiIslemi: 'AI fotoğraf iyileştirme → hero image' },
  ],
  restoran: [
    { id: 'tur', mesaj: 'Restoranınızın türü nedir? (Kebapçı, pizza, ev yemekleri, kafe...)', beklenenTip: 'serbest_metin', aiIslemi: 'Sektör alt-kategorisi belirleme' },
    { id: 'menu', mesaj: 'Menünüzde en popüler 5-10 yemek nedir? Fiyatlarıyla birlikte yazabilirsiniz.', beklenenTip: 'fiyat', aiIslemi: 'Menü oluşturma + fiyatlandırma' },
    { id: 'paket', mesaj: 'Paket servis yapıyor musunuz? Yemeksepeti/Getir\'de var mısınız?', beklenenTip: 'serbest_metin', aiIslemi: 'Delivery entegrasyon ayarları' },
    { id: 'calisma', mesaj: 'Çalışma saatleriniz ve adresiniz?', beklenenTip: 'adres', aiIslemi: 'İşletme bilgileri + takvim' },
    { id: 'foto', mesaj: 'Restoranınızın veya yemeklerinizin fotoğrafını gönderir misiniz? 📸', beklenenTip: 'foto', aiIslemi: 'AI fotoğraf iyileştirme + galeri' },
  ],
  doktor: [
    { id: 'uzmanlik', mesaj: 'Uzmanlık alanınız nedir? (Aile hekimi, diş hekimi, göz, cilt...)', beklenenTip: 'serbest_metin', aiIslemi: 'Uzmanlık + hizmet listesi' },
    { id: 'ucret', mesaj: 'Muayene ücretiniz ne kadar? SGK anlaşmanız var mı?', beklenenTip: 'fiyat', aiIslemi: 'Fiyat + SGK bilgisi' },
    { id: 'randevu', mesaj: 'Hangi günler ve saatlerde randevu veriyorsunuz?', beklenenTip: 'saat', aiIslemi: 'Randevu takvimi' },
    { id: 'adres', mesaj: 'Kliniğinizin adresi?', beklenenTip: 'adres', aiIslemi: 'Konum + lokasyon bilgisi' },
    { id: 'foto', mesaj: 'Kliniğinizin bir fotoğrafı var mı? 📸', beklenenTip: 'foto', aiIslemi: 'Hero image' },
  ],
  genel: [
    { id: 'hizmetler', mesaj: 'İşletmenizde hangi ürün veya hizmetleri sunuyorsunuz?', beklenenTip: 'serbest_metin', aiIslemi: 'Ürün/hizmet listesi' },
    { id: 'fiyatlar', mesaj: 'Fiyatlarınız hakkında kısa bilgi verir misiniz?', beklenenTip: 'fiyat', aiIslemi: 'Fiyatlandırma' },
    { id: 'calisma', mesaj: 'Çalışma günleriniz ve saatleriniz?', beklenenTip: 'saat', aiIslemi: 'Takvim' },
    { id: 'adres', mesaj: 'İşletmenizin adresi?', beklenenTip: 'adres', aiIslemi: 'Lokasyon' },
    { id: 'foto', mesaj: 'İşletmenizin fotoğrafını gönderir misiniz? 📸', beklenenTip: 'foto', aiIslemi: 'Hero image' },
  ],
}

// ══════════════════════════════════════════
// 4. ONBOARDING CHECKLIST
// ══════════════════════════════════════════

export type ChecklistDurum = 'tamamlandi' | 'aktif' | 'beklemede'

export interface ChecklistMaddesi {
  id: string
  label: string
  ikon: string
  tetikleyiciEvent: string
  kritik: boolean // Aktivasyon için zorunlu mu?
  varsayilanDurum: ChecklistDurum
}

export const ONBOARDING_CHECKLIST: ChecklistMaddesi[] = [
  { id: 'hesap_olusturma', label: 'Hesap oluşturuldu', ikon: '✅', tetikleyiciEvent: 'signup_complete', kritik: false, varsayilanDurum: 'tamamlandi' },
  { id: 'isletme_bilgileri', label: 'İşletme bilgileri eklendi', ikon: '📝', tetikleyiciEvent: 'business_profile_complete', kritik: false, varsayilanDurum: 'aktif' },
  { id: 'ilk_urun_hizmet', label: 'İlk ürün/hizmet eklendi', ikon: '🏷️', tetikleyiciEvent: 'first_product_added', kritik: false, varsayilanDurum: 'beklemede' },
  { id: 'odeme_baglanti', label: 'Ödeme yöntemi bağlandı', ikon: '💳', tetikleyiciEvent: 'payment_method_connected', kritik: true, varsayilanDurum: 'beklemede' },
  { id: 'site_yayinla', label: 'Siteyi yayınla ve paylaş', ikon: '🚀', tetikleyiciEvent: 'site_published', kritik: false, varsayilanDurum: 'beklemede' },
]

// Progress bar config
export const PROGRESS_BAR = {
  format: 'İşletmeniz %{yuzde} hazır!',
  baslangicYuzde: 20, // 1/5 = hesap
  renkGecisi: [
    { yuzde: 0, renk: '#EF4444' },   // Kırmızı
    { yuzde: 40, renk: '#F59E0B' },  // Turuncu
    { yuzde: 80, renk: '#10B981' },  // Yeşil
    { yuzde: 100, renk: '#F59E0B' }, // Altın
  ],
  tamamlamaKutlamasi: true, // Konfeti animasyonu
} as const

// ══════════════════════════════════════════
// 5. WHATSAPP DRIP KAMPANYA MESAJLARI
// ══════════════════════════════════════════

export type MesajTipi = 'utility' | 'marketing'
export type DripTetikleyici = 'signup_complete' | 'site_generated' | 'day_1' | 'day_3_inactive' | 'day_5_feature' | 'day_7_report' | 'day_10_social_proof' | 'day_14_trial' | 'day_21_winback' | 'day_30_final'

export interface DripMesaji {
  id: DripTetikleyici
  gun: number
  tip: MesajTipi
  kosul?: string
  mesajSablonu: string
  butonlar?: string[]
}

export const DRIP_KAMPANYASI: DripMesaji[] = [
  {
    id: 'signup_complete', gun: 0, tip: 'utility',
    mesajSablonu: `🎉 Hoş geldin {{isletme_adi}}!\n\nBen kepenk.ai AI asistanınım. İşletmenizi birkaç dakikada online'a taşıyacağım.\n\nHemen başlayalım mı?`,
    butonlar: ['✅ Hemen Başla', '⏰ Sonra Hatırlat'],
  },
  {
    id: 'site_generated', gun: 0, tip: 'utility',
    mesajSablonu: `✅ İşletmeniz hazır!\n\n🌐 Siteniz: {{site_url}}\n\nŞimdi en önemli adım: Bu linki WhatsApp durumunuza ekleyin ve müşterilerinize gönderin! 📲`,
    butonlar: ['📤 WhatsApp\'ta Paylaş', '👀 Sitemi Gör', '✏️ Düzenle'],
  },
  {
    id: 'day_1', gun: 1, tip: 'utility',
    kosul: 'payment_method_not_connected',
    mesajSablonu: `Günaydın {{isim}}! ☀️\n\nİşletmenize dün {{ziyaretci}} kişi baktı.\n\nÖdeme almaya başlamak için banka hesabınızı bağlayın — sadece 2 dakika:`,
    butonlar: ['💳 Ödeme Ayarla', '📊 Ziyaretçileri Gör'],
  },
  {
    id: 'day_3_inactive', gun: 3, tip: 'utility',
    kosul: 'no_login_3_days',
    mesajSablonu: `{{isim}}, işletmeniz sizi bekliyor! 🏪\n\nBu hafta sitenize {{ziyaretci}} kişi baktı ama henüz ödeme almaya hazır değilsiniz.\n\n60 saniyelik video ile anlatayım:`,
    butonlar: ['▶️ Videoyu İzle', '🆘 Yardım İstiyorum', '✅ Kendim Hallederim'],
  },
  {
    id: 'day_5_feature', gun: 5, tip: 'utility',
    kosul: 'unused_core_feature',
    mesajSablonu: `💡 Biliyor muydunuz?\n\n{{ozellik_tanitim}}\n\n{{sehir}}'deki {{sektor}}ler ortalama haftada {{ort_metrik}} kazanıyor.`,
    butonlar: ['📅 Özelliği Aç'],
  },
  {
    id: 'day_7_report', gun: 7, tip: 'utility',
    mesajSablonu: `📊 Haftalık İşletme Raporu\n━━━━━━━━━━━━━━━━\n🌐 Site ziyareti: {{ziyaret}}\n📱 WhatsApp tıklama: {{wa_click}}\n📞 Arama: {{arama}}\n💰 Gelir: ₺{{gelir}}\n👥 Yeni müşteri: {{yeni_musteri}}\n━━━━━━━━━━━━━━━━\n\n🤖 AI Öneriniz:\n"{{ai_oneri}}"`,
    butonlar: ['📈 Detaylı Rapor'],
  },
  {
    id: 'day_10_social_proof', gun: 10, tip: 'marketing',
    kosul: 'not_activated',
    mesajSablonu: `{{isim}}, bu hafta {{sehir}}'de {{sayi}} işletme kepenk.ai ile ilk ödemesini aldı! 💰\n\nSizin dükkanınız da hazır — sadece ödeme ayarını tamamlayın:`,
    butonlar: ['💳 2 Dakikada Tamamla'],
  },
  {
    id: 'day_14_trial', gun: 14, tip: 'marketing',
    kosul: 'trial_ending_7_days',
    mesajSablonu: `{{isim}}, deneme sürenizin son haftası!\n\nŞu ana kadar:\n✅ {{ozellik_sayisi}} özellik kullandınız\n👥 {{musteri_sayisi}} müşteri etkileşimi\n💰 ₺{{gelir}} gelir ürettiniz\n\nDevam etmek için planınızı seçin:`,
    butonlar: ['📋 Planları Gör', '🤔 Yardım İstiyorum'],
  },
  {
    id: 'day_21_winback', gun: 21, tip: 'marketing',
    kosul: 'inactive_14_plus_days',
    mesajSablonu: `{{isim}}, sizi özledik 💙\n\nİşletmenizin sayfası hala aktif ve son 2 haftada {{ziyaretci}} kişi baktı.\n\nSize özel: Bu hafta geri dönün, ilk ay %30 indirimli başlayın.`,
    butonlar: ['🔓 İndirimi Kullan', '🗑️ Hesabımı Sil'],
  },
  {
    id: 'day_30_final', gun: 30, tip: 'marketing',
    kosul: 'inactive_30_days',
    mesajSablonu: `{{isim}}, son bir şey:\n\nİşletme profiliniz ve {{urun_sayisi}} ürününüz hala sistemde kayıtlı.\n\nİstediğiniz zaman geri dönebilirsiniz — her şey olduğu gibi bekliyor.\n\nİyi günler dileriz 🙏`,
  },
]

// ══════════════════════════════════════════
// 6. HEALTH SCORE MODELİ
// ══════════════════════════════════════════

export interface HealthScoreBoyut {
  id: string
  ad: string
  agirlik: number // %
  metrikler: { ad: string; hedef: string; puan0: string; puan50: string; puan100: string }[]
}

export const HEALTH_SCORE_BOYUTLARI: HealthScoreBoyut[] = [
  {
    id: 'urun_kullanimi', ad: 'Ürün Kullanımı', agirlik: 50,
    metrikler: [
      { ad: 'Haftalık login', hedef: '3+/hafta', puan0: '0', puan50: '1-2', puan100: '3+' },
      { ad: 'Oturum süresi', hedef: '15-45dk', puan0: '<2dk', puan50: '2-15dk', puan100: '15+' },
      { ad: 'Aktif özellik sayısı', hedef: '3+ modül', puan0: '0-1', puan50: '2', puan100: '3+' },
      { ad: 'Son login', hedef: '<3 gün', puan0: '>14gün', puan50: '7-14gün', puan100: '<7gün' },
    ],
  },
  {
    id: 'ozellik_benimseme', ad: 'Özellik Benimseme', agirlik: 20,
    metrikler: [
      { ad: 'Temel özellik kullanımı', hedef: 'POS + Randevu + CRM', puan0: '0', puan50: '1', puan100: '2+' },
      { ad: 'Gelişmiş özellik', hedef: 'Kampanya/AI/Sadakat', puan0: '0', puan50: 'denedi', puan100: 'aktif kullanıyor' },
    ],
  },
  {
    id: 'destek_etkilesimi', ad: 'Destek Etkileşimi', agirlik: 15,
    metrikler: [
      { ad: 'Destek talebi trendi', hedef: 'azalan', puan0: 'artan', puan50: 'sabit', puan100: 'azalan' },
      { ad: 'WhatsApp yanıt oranı', hedef: '>%60', puan0: '<%20', puan50: '%20-60', puan100: '>%60' },
    ],
  },
  {
    id: 'nps_sentiment', ad: 'NPS & Memnuniyet', agirlik: 10,
    metrikler: [
      { ad: 'NPS skoru', hedef: '>40', puan0: '<0', puan50: '0-40', puan100: '>40' },
    ],
  },
  {
    id: 'odeme_sagligi', ad: 'Ödeme Sağlığı', agirlik: 5,
    metrikler: [
      { ad: 'Ödeme başarı oranı', hedef: '>%95', puan0: '<%80', puan50: '%80-95', puan100: '>%95' },
    ],
  },
]

export const HEALTH_SCORE_KATEGORILERI = {
  yesil: { min: 70, max: 100, anlam: 'Sağlıklı — büyüme fırsatı ara', renk: '#10B981' },
  sari: { min: 40, max: 69, anlam: 'Risk altında — proaktif müdahale', renk: '#F59E0B' },
  kirmizi: { min: 0, max: 39, anlam: 'Kritik — 48 saat insan müdahalesi', renk: '#EF4444' },
} as const

// ══════════════════════════════════════════
// 7. DUNNING KONFİGÜRASYONU
// ══════════════════════════════════════════

export interface DunningAdim {
  gun: number
  aksiyon: string
  otomatikRetry: boolean
  whatsappMesaj?: string
  butonlar?: string[]
}

export const DUNNING_AKISI: DunningAdim[] = [
  { gun: 0, aksiyon: 'İlk retry — 4 saat sonra (sessiz)', otomatikRetry: true },
  { gun: 1, aksiyon: 'İkinci retry — farklı saatte (sessiz)', otomatikRetry: true },
  {
    gun: 3, aksiyon: 'Üçüncü retry + kullanıcı bildirimi', otomatikRetry: true,
    whatsappMesaj: `⚠️ Ödeme bilginizde bir sorun var.\n\n{{plan_adi}} aboneliğiniz için ödeme alınamadı. Hizmetiniz devam ediyor.\n\nLütfen ödeme yönteminizi kontrol edin:`,
    butonlar: ['💳 Ödemeyi Güncelle', '🔄 Tekrar Dene'],
  },
  {
    gun: 7, aksiyon: 'Kişisel bildirim — team member adıyla', otomatikRetry: false,
    whatsappMesaj: `{{isim}} merhaba, {{team_member}} ben.\n\nÖdeme bilginizde bir sorun fark ettim. İsterseniz farklı kart veya banka havalesi ile devam edebilirsiniz.\n\nSize nasıl yardımcı olabilirim?`,
    butonlar: ['💳 Kart Değiştir', '🏦 Havale ile Öde', '📞 Beni Arayın'],
  },
  {
    gun: 14, aksiyon: 'Son uyarı — duraklatma bildirimi', otomatikRetry: false,
    whatsappMesaj: `⚠️ Önemli: {{isletme_adi}} aboneliğiniz 7 gün sonra DURAKLATILACAK.\n\nDuraklatma durumunda:\n❌ Siteniz çevrimdışı olur\n❌ Online ödeme alınamaz\n❌ WhatsApp AI durur\n✅ Verileriniz korunur (60 gün)`,
    butonlar: ['💳 Şimdi Öde', '📞 Destek'],
  },
  {
    gun: 21, aksiyon: 'Abonelik DURAKLAT (iptal değil)', otomatikRetry: false,
    whatsappMesaj: `{{isim}}, aboneliğiniz duraklatıldı.\n\n✅ Verileriniz 60 gün boyunca korunuyor.\n✅ İstediğiniz zaman geri dönebilirsiniz.`,
    butonlar: ['🔓 Hesabı Aktive Et'],
  },
]

// ══════════════════════════════════════════
// 8. İPTAL SEBEPLERİ & MÜDAHALELERİ
// ══════════════════════════════════════════

export interface IptalMudahale {
  sebepId: string
  sebepLabel: string
  teklif: string
  mesaj: string
}

export const IPTAL_MUDAHALELERI: IptalMudahale[] = [
  { sebepId: 'pahali', sebepLabel: 'Çok pahalı', teklif: 'Plan downgrade + 3 ay %30 indirim', mesaj: 'Sizi kaybetmek istemeyiz. Daha uygun planımız var:' },
  { sebepId: 'kullanmiyorum', sebepLabel: 'Kullanmıyorum / İhtiyacım yok', teklif: 'Kişisel onboarding seansı (15 dk WhatsApp görüntülü)', mesaj: 'Belki henüz tam potansiyeli keşfetmediniz. Size özel 15 dakika ayıralım:' },
  { sebepId: 'karmasik', sebepLabel: 'Çok karmaşık', teklif: 'Sadeleştirilmiş mod + 1-1 WhatsApp rehberliği', mesaj: 'Çok haklısınız. Basitleştirilmiş modumuz var:' },
  { sebepId: 'baska_cozum', sebepLabel: 'Başka bir çözüme geçiyorum', teklif: 'Rakip karşılaştırma + eksik özellik feedback', mesaj: 'Hangi çözüme geçiyorsunuz? Belki ihtiyacınızı karşılayabiliriz:' },
  { sebepId: 'isletme_kapaniyor', sebepLabel: 'İşletmemi kapatıyorum', teklif: 'Hesap dondurma (6 ay ücretsiz)', mesaj: 'Umarız her şey yoluna girer. Hesabınızı 6 ay donduralım:' },
  { sebepId: 'diger', sebepLabel: 'Diğer', teklif: 'Kişisel görüşme + feedback toplama', mesaj: 'İyileşmemiz için geri bildiriminiz çok değerli:' },
]

// ══════════════════════════════════════════
// 9. WIN-BACK KAMPANYASI
// ══════════════════════════════════════════

export const WIN_BACK_KAMPANYASI = [
  { gun: 30, mesaj: `{{isim}} merhaba! 👋\n\nSizden sonra kepenk.ai'ye şu özellikler eklendi:\n✅ {{yeni_ozellik_1}}\n✅ {{yeni_ozellik_2}}\n\nMerak ederseniz, ücretsiz deneyebilirsiniz.`, buton: '🔓 Ücretsiz Dene' },
  { gun: 60, mesaj: `{{isim}}, {{sektor}} sektöründe bu ay kepenk.ai kullanıcıları ortalama ₺{{ort_gelir}} online gelir elde etti.\n\nGeri dönmek isterseniz: İlk ay bizden hediye.`, buton: '🎁 Ücretsiz Başla' },
  { gun: 90, mesaj: `Son hatırlatma: {{isletme_adi}} verileri 30 gün sonra silinecek.\n\nGeri dönmek isterseniz tüm verileriniz sizi bekliyor.`, buton: '🔓 Geri Dön' },
] as const

// ══════════════════════════════════════════
// 10. NPS KONFİGÜRASYONU
// ══════════════════════════════════════════

export const NPS_CONFIG = {
  kanal: 'whatsapp' as const,
  siklık: 90, // gün
  mesajSablonu: `{{isim}}, tek bir soru:\n\nkepenk.ai'yi bir arkadaşınıza önerir misiniz?\n\n0️⃣ 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 🔟\n\n(0 = kesinlikle hayır, 10 = kesinlikle evet)`,
  takipSorulari: {
    promoter: 'Çok teşekkürler! 🙏 Neyi en çok seviyorsunuz?',
    passive: 'Teşekkürler! 10 yapabilmemiz için ne eksik?',
    detractor: 'Üzgünüm. Neyi daha iyi yapabiliriz? Dinliyorum.',
  },
  aksiyonlar: {
    promoter: ['Referral programına davet', 'Google yorum öner', 'Beta erken erişim'],
    passive: ['Eksik özellik feedback → ürün ekibi', 'Kişisel takip (7 gün)'],
    detractor: ['48 saat içinde kişisel WhatsApp arama', 'Sorun çözümü + takip NPS (30 gün)', 'Plan indirimi/özel destek'],
  },
  hedefler: { lansman: 30, ay6: 40, ay12: 50 },
} as const

// ══════════════════════════════════════════
// 11. AKTİVASYON MİLESTONE'LARI
// ══════════════════════════════════════════

export const AKTIVASYON_MILESTONES = [
  { id: 'profil_yayinda', label: 'İşletme profili canlı', hedefOran: 0.70, tetikleyici: 'site_published', gun: '0-1' },
  { id: 'odeme_baglanti', label: 'Ödeme yöntemi bağlandı', hedefOran: 0.50, tetikleyici: 'payment_method_connected', gun: '1-3' },
  { id: 'ilk_musteri', label: 'İlk müşteri etkileşimi', hedefOran: 0.40, tetikleyici: 'first_customer_interaction', gun: '3-7' },
  { id: 'ilk_odeme', label: 'İlk ödeme alındı', hedefOran: 0.15, tetikleyici: 'first_payment_received', gun: '7-30' },
] as const

// ══════════════════════════════════════════
// 12. YILLIK SÖZLEŞME STRATEJİSİ
// ══════════════════════════════════════════

export const YILLIK_SOZLESME = {
  tetikleyiciler: [
    { gun: 30, mesaj: 'İlk ay tamamlandı → Yıllığa geçin, 2 ay ücretsiz' },
    { gun: 60, mesaj: 'İkinci ödeme başarılı → hatırlatma' },
    { gun: 90, mesaj: 'Üçüncü ay → son yıllık teklif (sınırlı süre)' },
  ],
  ornekler: [
    { plan: 'Başlangıç', aylik: 399, yillik: 3990, tasarruf: 798 },
    { plan: 'Büyüme', aylik: 1299, yillik: 12990, tasarruf: 2598 },
    { plan: 'Profesyonel', aylik: 2999, yillik: 29990, tasarruf: 5998 },
  ],
  hedefOran: { lansman: 0.15, ay6: 0.30, ay12: 0.40 },
} as const
