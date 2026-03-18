// ═══════════════════════════════════════════════════
// Destek Merkezi — Makale Veri Yapısı
// Her makale = ayrı bir Google indexleme fırsatı
// ═══════════════════════════════════════════════════

export type DestekKategori =
  | 'baslangic'
  | 'editor'
  | 'moduller'
  | 'paketler'
  | 'sektorler'
  | 'whatsapp'
  | 'google'
  | 'odeme'
  | 'seo'
  | 'sorun-giderme'
  | 'talep'

export interface DestekAdim {
  baslik: string
  aciklama: string
}

export interface DestekSSS {
  soru: string
  cevap: string
}

export interface DestekMakale {
  slug: string
  kategori: DestekKategori
  baslik: string
  ozet: string
  icerik: string
  adimlar?: DestekAdim[]
  sss?: DestekSSS[]
  seoAnahtarlar: string[]
  ilgiliMakaleler: string[]
  minPaket?: string
  guncellemeTarihi: string
}

// ── Kategori Meta Bilgileri ──

export interface KategoriMeta {
  id: DestekKategori
  baslik: string
  aciklama: string
  ikon: string
  renk: string
}

export const DESTEK_KATEGORILERI: KategoriMeta[] = [
  { id: 'baslangic', baslik: 'Başlangıç Rehberi', aciklama: 'İlk adımlar ve kurulum', ikon: 'rocket', renk: 'bg-emerald-100 text-emerald-700' },
  { id: 'editor', baslik: 'Editör Kullanımı', aciklama: 'Web sitenizi düzenleme rehberi', ikon: 'pencil', renk: 'bg-blue-100 text-blue-700' },
  { id: 'moduller', baslik: 'Modül Rehberleri', aciklama: 'Her modülün detaylı kullanım kılavuzu', ikon: 'grid', renk: 'bg-violet-100 text-violet-700' },
  { id: 'paketler', baslik: 'Paket Karşılaştırma', aciklama: 'Hangi paket size uygun?', ikon: 'package', renk: 'bg-amber-100 text-amber-700' },
  { id: 'sektorler', baslik: 'Sektör Rehberleri', aciklama: 'Sektörünüze özel kullanım kılavuzu', ikon: 'store', renk: 'bg-pink-100 text-pink-700' },
  { id: 'whatsapp', baslik: 'WhatsApp AI Asistan', aciklama: 'WhatsApp botu kurulum ve ayarları', ikon: 'message', renk: 'bg-green-100 text-green-700' },
  { id: 'google', baslik: 'Google Yorumlar', aciklama: 'Google yorum yönetimi ve otomatik yanıtlar', ikon: 'star', renk: 'bg-yellow-100 text-yellow-700' },
  { id: 'odeme', baslik: 'Ödeme & Fatura', aciklama: 'Ödeme yöntemleri ve fatura işlemleri', ikon: 'credit', renk: 'bg-rose-100 text-rose-700' },
  { id: 'seo', baslik: 'SEO Rehberi', aciklama: 'Arama motorlarında üst sıralara çıkın', ikon: 'trending', renk: 'bg-indigo-100 text-indigo-700' },
  { id: 'sorun-giderme', baslik: 'Sorun Giderme', aciklama: 'Bilinen sorunlara hızlı çözümler', ikon: 'wrench', renk: 'bg-orange-100 text-orange-700' },
  { id: 'talep', baslik: 'Destek Talebi', aciklama: 'Destek talebi oluşturun ve takip edin', ikon: 'ticket', renk: 'bg-teal-100 text-teal-700' },
]

// ── Sidebar Navigasyon Yapısı ──

export interface SidebarLink {
  baslik: string
  href: string
}

export interface SidebarGrup {
  kategori: DestekKategori
  baslik: string
  ikon: string
  linkler: SidebarLink[]
}

export const SIDEBAR_NAVIGASYON: SidebarGrup[] = [
  {
    kategori: 'baslangic',
    baslik: 'Başlangıç',
    ikon: 'rocket',
    linkler: [
      { baslik: 'İlk Kurulum', href: '/destek/baslangic/ilk-kurulum' },
      { baslik: 'Paket Seçimi', href: '/destek/baslangic/paket-secimi' },
      { baslik: 'İşletme Bilgileri', href: '/destek/baslangic/isletme-bilgileri' },
      { baslik: 'WhatsApp Bağlantısı', href: '/destek/baslangic/whatsapp-baglantisi' },
    ],
  },
  {
    kategori: 'editor',
    baslik: 'Editör',
    ikon: 'pencil',
    linkler: [
      { baslik: 'Kullanım Kılavuzu', href: '/destek/editor/kullanim-kilavuzu' },
      { baslik: 'Blok Ekleme & Silme', href: '/destek/editor/blok-ekleme-silme' },
      { baslik: 'Tema ve Renkler', href: '/destek/editor/tema-ve-renkler' },
      { baslik: 'Görsel Yükleme', href: '/destek/editor/gorsel-yukleme' },
      { baslik: 'SEO Ayarları', href: '/destek/editor/seo-ayarlari' },
      { baslik: 'Domain Bağlama', href: '/destek/editor/domain-baglama' },
      { baslik: 'Yayınlama', href: '/destek/editor/yayinlama' },
    ],
  },
  {
    kategori: 'moduller',
    baslik: 'Modüller',
    ikon: 'grid',
    linkler: [
      { baslik: 'Tüm Modüller', href: '/destek/moduller' },
    ],
  },
  {
    kategori: 'paketler',
    baslik: 'Paketler',
    ikon: 'package',
    linkler: [
      { baslik: 'Paket Karşılaştırma', href: '/destek/paketler' },
    ],
  },
  {
    kategori: 'sektorler',
    baslik: 'Sektörler',
    ikon: 'store',
    linkler: [
      { baslik: 'Sektör Rehberleri', href: '/destek/sektorler' },
    ],
  },
  {
    kategori: 'whatsapp',
    baslik: 'WhatsApp',
    ikon: 'message',
    linkler: [
      { baslik: 'Kurulum', href: '/destek/whatsapp/kurulum' },
      { baslik: 'Otomatik Yanıtlar', href: '/destek/whatsapp/otomatik-yanitlar' },
      { baslik: 'Sık Sorulan Sorular', href: '/destek/whatsapp/sss' },
    ],
  },
  {
    kategori: 'google',
    baslik: 'Google Yorumlar',
    ikon: 'star',
    linkler: [
      { baslik: 'Kurulum', href: '/destek/google-yorumlar/kurulum' },
      { baslik: 'Otomatik Yanıtlar', href: '/destek/google-yorumlar/otomatik-yanitlar' },
    ],
  },
  {
    kategori: 'odeme',
    baslik: 'Ödeme & Fatura',
    ikon: 'credit',
    linkler: [
      { baslik: 'Ödeme Yöntemleri', href: '/destek/odeme-fatura/odeme-yontemleri' },
      { baslik: 'Fatura İndirme', href: '/destek/odeme-fatura/fatura-indirme' },
      { baslik: 'Paket Değiştirme', href: '/destek/odeme-fatura/paket-degistirme' },
    ],
  },
  {
    kategori: 'seo',
    baslik: 'SEO Rehberi',
    ikon: 'trending',
    linkler: [
      { baslik: 'Temel SEO', href: '/destek/seo-rehberi/temel-seo' },
      { baslik: 'Google My Business', href: '/destek/seo-rehberi/google-my-business' },
    ],
  },
  {
    kategori: 'sorun-giderme',
    baslik: 'Sorun Giderme',
    ikon: 'wrench',
    linkler: [
      { baslik: 'Tüm Sorunlar', href: '/destek/sorun-giderme' },
      { baslik: 'Ödeme Sorunları', href: '/destek/sorun-giderme/odeme-sorunlari' },
      { baslik: 'Giriş Sorunları', href: '/destek/sorun-giderme/giris-sorunlari' },
      { baslik: 'Site Sorunları', href: '/destek/sorun-giderme/site-sorunlari' },
      { baslik: 'WhatsApp Sorunları', href: '/destek/sorun-giderme/whatsapp-sorunlari' },
      { baslik: 'Domain Sorunları', href: '/destek/sorun-giderme/domain-sorunlari' },
      { baslik: 'Editör Sorunları', href: '/destek/sorun-giderme/editor-sorunlari' },
    ],
  },
  {
    kategori: 'talep',
    baslik: 'Destek Talebi',
    ikon: 'ticket',
    linkler: [
      { baslik: 'Talep Oluştur', href: '/destek/talep' },
      { baslik: 'Talep Takip', href: '/destek/talep/takip' },
    ],
  },
]

// ── Popüler / Öne Çıkan Makaleler ──

export const POPULER_MAKALELER: string[] = [
  '/destek/editor/kullanim-kilavuzu',
  '/destek/baslangic/ilk-kurulum',
  '/destek/whatsapp/kurulum',
  '/destek/baslangic/paket-secimi',
  '/destek/google-yorumlar/kurulum',
  '/destek/seo-rehberi/temel-seo',
]

// ── Arama için tüm sayfalar dizini ──

export interface AranabilirSayfa {
  baslik: string
  ozet: string
  href: string
  kategori: DestekKategori
  anahtarlar: string[]
}

export const TUM_DESTEK_SAYFALARI: AranabilirSayfa[] = [
  // Başlangıç
  { baslik: 'İlk Kurulum Adımları', ozet: 'KPNK hesabınızı oluşturun ve ilk web sitenizi 5 dakikada kurun.', href: '/destek/baslangic/ilk-kurulum', kategori: 'baslangic', anahtarlar: ['kurulum', 'kayıt', 'hesap', 'başlangıç', 'ilk adım'] },
  { baslik: 'Hangi Paket Bana Uygun?', ozet: 'İşletme büyüklüğüne göre doğru paketi seçmenize yardımcı oluyoruz.', href: '/destek/baslangic/paket-secimi', kategori: 'baslangic', anahtarlar: ['paket', 'fiyat', 'seçim', 'karşılaştırma', 'plan'] },
  { baslik: 'İşletme Bilgilerini Girme', ozet: 'İşletme adı, adres, telefon ve çalışma saatlerini nasıl girersiniz?', href: '/destek/baslangic/isletme-bilgileri', kategori: 'baslangic', anahtarlar: ['bilgi', 'adres', 'telefon', 'saat', 'işletme'] },
  { baslik: 'WhatsApp Bağlantısı', ozet: 'WhatsApp Business numaranızı KPNK ile bağlayın.', href: '/destek/baslangic/whatsapp-baglantisi', kategori: 'baslangic', anahtarlar: ['whatsapp', 'bağlantı', 'numara', 'business'] },

  // Editör
  { baslik: 'Editör Nasıl Kullanılır?', ozet: 'Sürükle-bırak editör ile web sitenizi kolayca düzenleyin.', href: '/destek/editor/kullanim-kilavuzu', kategori: 'editor', anahtarlar: ['editör', 'düzenleme', 'sürükle', 'bırak', 'kullanım'] },
  { baslik: 'Blok Ekleme ve Silme', ozet: 'Sitenize yeni bloklar ekleyin veya mevcut blokları kaldırın.', href: '/destek/editor/blok-ekleme-silme', kategori: 'editor', anahtarlar: ['blok', 'ekleme', 'silme', 'bölüm', 'section'] },
  { baslik: 'Tema ve Renk Değiştirme', ozet: 'Sitenizin renk paletini ve temasını özelleştirin.', href: '/destek/editor/tema-ve-renkler', kategori: 'editor', anahtarlar: ['tema', 'renk', 'palet', 'özelleştirme', 'tasarım'] },
  { baslik: 'Görsel Yükleme ve Düzenleme', ozet: 'Fotoğraf yükleyin, boyutlandırın ve optimize edin.', href: '/destek/editor/gorsel-yukleme', kategori: 'editor', anahtarlar: ['görsel', 'fotoğraf', 'resim', 'yükleme', 'upload'] },
  { baslik: 'SEO Başlık ve Açıklama', ozet: 'Sitenizin Google arama sonuçlarında nasıl görüneceğini ayarlayın.', href: '/destek/editor/seo-ayarlari', kategori: 'editor', anahtarlar: ['seo', 'başlık', 'açıklama', 'meta', 'google'] },
  { baslik: 'Özel Domain Bağlama', ozet: 'Kendi alan adınızı (domain) KPNK sitenize bağlayın.', href: '/destek/editor/domain-baglama', kategori: 'editor', anahtarlar: ['domain', 'alan adı', 'bağlama', 'dns', 'custom'] },
  { baslik: 'Siteyi Yayınlama', ozet: 'Sitenizi tek tıkla yayına alın ve güncellemeleri anında uygulayın.', href: '/destek/editor/yayinlama', kategori: 'editor', anahtarlar: ['yayınlama', 'publish', 'canlı', 'güncelleme'] },

  // WhatsApp
  { baslik: 'WhatsApp AI Kurulumu', ozet: 'WhatsApp Business hesabınızı AI asistanla 10 dakikada aktifleştirin.', href: '/destek/whatsapp/kurulum', kategori: 'whatsapp', anahtarlar: ['whatsapp', 'kurulum', 'ai', 'bot', 'asistan'] },
  { baslik: 'Otomatik Yanıt Ayarları', ozet: 'AI asistanın müşteri mesajlarına nasıl yanıt vereceğini ayarlayın.', href: '/destek/whatsapp/otomatik-yanitlar', kategori: 'whatsapp', anahtarlar: ['otomatik', 'yanıt', 'mesaj', 'ayar', 'şablon'] },
  { baslik: 'WhatsApp SSS', ozet: 'WhatsApp AI asistan hakkında en çok sorulan sorular ve cevapları.', href: '/destek/whatsapp/sss', kategori: 'whatsapp', anahtarlar: ['sss', 'soru', 'cevap', 'whatsapp', 'faq'] },

  // Google Yorumlar
  { baslik: 'Google Yorum Kurulumu', ozet: 'Google My Business hesabınızı bağlayın ve yorumları yönetin.', href: '/destek/google-yorumlar/kurulum', kategori: 'google', anahtarlar: ['google', 'yorum', 'gmb', 'kurulum', 'business'] },
  { baslik: 'Otomatik Yorum Yanıtlama', ozet: 'AI ile Google yorumlarına profesyonel ve hızlı yanıtlar verin.', href: '/destek/google-yorumlar/otomatik-yanitlar', kategori: 'google', anahtarlar: ['yorum', 'yanıt', 'otomatik', 'ai', 'google'] },

  // Ödeme & Fatura
  { baslik: 'Ödeme Yöntemleri', ozet: 'Kredi kartı, banka havalesi ve diğer ödeme seçenekleri hakkında bilgi.', href: '/destek/odeme-fatura/odeme-yontemleri', kategori: 'odeme', anahtarlar: ['ödeme', 'kredi kartı', 'havale', 'iyzico'] },
  { baslik: 'Fatura İndirme', ozet: 'Geçmiş faturalarınızı görüntüleyin ve PDF olarak indirin.', href: '/destek/odeme-fatura/fatura-indirme', kategori: 'odeme', anahtarlar: ['fatura', 'indirme', 'pdf', 'makbuz'] },
  { baslik: 'Paket Yükseltme/Düşürme', ozet: 'Mevcut paketinizi değiştirmek için adım adım rehber.', href: '/destek/odeme-fatura/paket-degistirme', kategori: 'odeme', anahtarlar: ['paket', 'yükseltme', 'düşürme', 'değiştirme', 'upgrade'] },

  // SEO Rehberi
  { baslik: 'Temel SEO Bilgileri', ozet: 'Küçük işletmeler için arama motoru optimizasyonu temelleri.', href: '/destek/seo-rehberi/temel-seo', kategori: 'seo', anahtarlar: ['seo', 'arama', 'google', 'optimizasyon', 'temel'] },
  { baslik: 'Google My Business Optimizasyonu', ozet: 'GMB profilinizi optimize ederek yerel aramalarda üst sıralara çıkın.', href: '/destek/seo-rehberi/google-my-business', kategori: 'seo', anahtarlar: ['gmb', 'google', 'business', 'yerel', 'harita'] },

  // Sorun Giderme
  { baslik: 'Sorun Giderme Merkezi', ozet: 'Bilinen sorunlara hızlı çözümler ve adım adım rehberler.', href: '/destek/sorun-giderme', kategori: 'sorun-giderme', anahtarlar: ['sorun', 'giderme', 'hata', 'çözüm', 'problem'] },
  { baslik: 'Ödeme Sorunları', ozet: 'Ödeme başarısızlıkları, kart reddi ve fatura sorunları için çözümler.', href: '/destek/sorun-giderme/odeme-sorunlari', kategori: 'sorun-giderme', anahtarlar: ['ödeme', 'başarısız', 'kart', 'fatura', '3d secure'] },
  { baslik: 'Giriş Sorunları', ozet: 'OTP kodu, hesap erişimi ve giriş problemleri için çözümler.', href: '/destek/sorun-giderme/giris-sorunlari', kategori: 'sorun-giderme', anahtarlar: ['giriş', 'otp', 'kod', 'sms', 'hesap'] },
  { baslik: 'Site Sorunları', ozet: 'Site yüklenmesi, yayınlama ve önbellek sorunları için çözümler.', href: '/destek/sorun-giderme/site-sorunlari', kategori: 'sorun-giderme', anahtarlar: ['site', 'yüklenmiyor', '404', 'yayınlama', 'cache'] },
  { baslik: 'WhatsApp Sorunları', ozet: 'AI asistan, mesaj ve kredi sorunları için çözümler.', href: '/destek/sorun-giderme/whatsapp-sorunlari', kategori: 'sorun-giderme', anahtarlar: ['whatsapp', 'ai', 'bot', 'mesaj', 'kredi'] },
  { baslik: 'Domain Sorunları', ozet: 'DNS, SSL ve domain bağlama sorunları için çözümler.', href: '/destek/sorun-giderme/domain-sorunlari', kategori: 'sorun-giderme', anahtarlar: ['domain', 'dns', 'ssl', 'sertifika'] },
  { baslik: 'Editör Sorunları', ozet: 'Kaydetme, blok yükleme ve görsel sorunları için çözümler.', href: '/destek/sorun-giderme/editor-sorunlari', kategori: 'sorun-giderme', anahtarlar: ['editör', 'kaydetme', 'blok', 'görsel'] },

  // Destek Talebi
  { baslik: 'Destek Talebi Oluştur', ozet: 'Sorununuzu bize bildirin, en kısa sürede dönüş yapalım.', href: '/destek/talep', kategori: 'talep', anahtarlar: ['talep', 'destek', 'iletişim', 'yardım', 'ticket'] },
  { baslik: 'Talep Takip', ozet: 'Mevcut destek talebinizin durumunu takip edin.', href: '/destek/talep/takip', kategori: 'talep', anahtarlar: ['takip', 'durum', 'referans', 'talep'] },
]

// Yardımcı: slug'dan makale bul
export function destekSayfasiBul(href: string): AranabilirSayfa | undefined {
  return TUM_DESTEK_SAYFALARI.find(s => s.href === href)
}

// Yardımcı: kategoriye göre filtrele
export function kategoriyeGoreFiltrele(kategori: DestekKategori): AranabilirSayfa[] {
  return TUM_DESTEK_SAYFALARI.filter(s => s.kategori === kategori)
}
