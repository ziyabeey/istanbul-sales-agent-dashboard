/**
 * sektorKatalogu.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * 34 sektörlük Master Prompt v2 profil kataloğu.
 * Her profil: renk paleti, font çifti, tema modu, modül listesi ve özel içerik notu içerir.
 * siteUreticisi.ts tarafından dinamik tema enjeksiyonu için kullanılır.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface SektorRenkleri {
  bg: string        // --clr-bg / --renk-arkaplan
  surface: string   // --clr-surface / --renk-kart
  primary: string   // --clr-primary / --renk-vurgu
  primaryHover: string // --clr-primary-h / --renk-hover
  text: string      // --clr-text / --renk-metin
  muted: string     // --clr-muted / --renk-alt
  accent: string    // ikincil vurgu
  gradient: string  // arka plan gradient
}

export interface SektorProfili {
  id: string                  // A01, B07, C03 vb.
  slug: string                // URL-safe slug
  kategori: 'yerel' | 'profesyonel' | 'saglik'
  sektorAdi: string
  isletmeAdi: string          // Demo işletme adı
  slogan: string
  renkler: SektorRenkleri
  fontBaslik: string
  fontBody: string
  temaModu: 'light' | 'dark' | 'mixed'
  moduller: string[]
  ozelIcerik: string          // Gemini'ye gönderilecek sektör-özel not
  sektorEn: string            // Unsplash query
  iskeletTipi: string         // Hangi mevcut template iskeletini kullanmalı
}

// ═══════════════════════════════════════════════════════════════════════════
// KATEGORİ A: YEREL ESNAF (14 sektör)
// ═══════════════════════════════════════════════════════════════════════════

const A01: SektorProfili = {
  id: 'A01', slug: 'restoran', kategori: 'yerel',
  sektorAdi: 'Restoran / Türk Mutfağı',
  isletmeAdi: 'Ocakbaşı Sofrası',
  slogan: 'Büyükannenin Tarifi, Şefin Elinden',
  renkler: {
    bg: '#1e0f05', surface: '#2a1a0e', primary: '#c2440e', primaryHover: '#a83a0c',
    text: '#f5ede0', muted: '#b8a594', accent: '#e8a030',
    gradient: 'linear-gradient(135deg,#1e0f05 0%,#2a1a0e 60%,#3a2410 100%)'
  },
  fontBaslik: 'Cormorant Garamond', fontBody: 'Source Sans 3', temaModu: 'dark',
  moduller: ['hero','hakkimizda','menu','galeri','yorumlar','iletisim','footer'],
  ozelIcerik: 'Menüde: başlangıçlar / ana yemekler / içecekler / tatlılar kategorileri. Fiyat aralığı ₺180–₺480',
  sektorEn: 'turkish+restaurant+food',
  iskeletTipi: 'sektor-restoran-standart'
}

const A02: SektorProfili = {
  id: 'A02', slug: 'kafe', kategori: 'yerel',
  sektorAdi: 'Kafe / Özel Kahve',
  isletmeAdi: 'Filtre & Köpük',
  slogan: 'Her Yudumda Bir Hikaye',
  renkler: {
    bg: '#faf4ed', surface: '#fff8f0', primary: '#d4956a', primaryHover: '#b87d55',
    text: '#2c1a0e', muted: '#7a6555', accent: '#8b6f47',
    gradient: 'linear-gradient(135deg,#faf4ed 0%,#f5ebe0 100%)'
  },
  fontBaslik: 'Playfair Display', fontBody: 'Nunito', temaModu: 'light',
  moduller: ['hero','hizmetler','galeri','yorumlar','iletisim','footer'],
  ozelIcerik: 'Özel brew yöntemleri: V60 / Chemex / Cold Brew. Çalışma saatleri 07:00–23:00',
  sektorEn: 'coffee+cafe+interior',
  iskeletTipi: 'sektor-restoran-standart'
}

const A03: SektorProfili = {
  id: 'A03', slug: 'firin', kategori: 'yerel',
  sektorAdi: 'Fırın / Pastane',
  isletmeAdi: 'Un & Sıcaklık Pastanesi',
  slogan: 'Sabahın İlk Işığında Pişer',
  renkler: {
    bg: '#fffdf7', surface: '#faf5e8', primary: '#e8a030', primaryHover: '#cc8a20',
    text: '#3b2507', muted: '#8a7050', accent: '#c07941',
    gradient: 'linear-gradient(135deg,#fffdf7 0%,#faf5e8 100%)'
  },
  fontBaslik: 'Abril Fatface', fontBody: 'Lato', temaModu: 'light',
  moduller: ['hero','hizmetler','galeri','yorumlar','iletisim','footer'],
  ozelIcerik: 'Ürünler: ekmekler / börekler / pastalar / özel sipariş pasta. Günlük taze üretim vurgusu',
  sektorEn: 'bakery+pastry+bread',
  iskeletTipi: 'sektor-restoran-standart'
}

const A04: SektorProfili = {
  id: 'A04', slug: 'berber', kategori: 'yerel',
  sektorAdi: 'Berber / Erkek Grooming',
  isletmeAdi: 'Tıraş Atölyesi',
  slogan: 'Klasik Tıraş, Modern Adam',
  renkler: {
    bg: '#0d0d0d', surface: '#1a1a1a', primary: '#b8960c', primaryHover: '#9a7e0a',
    text: '#f2f2f2', muted: '#888888', accent: '#d4af37',
    gradient: 'linear-gradient(135deg,#0d0d0d 0%,#1a1a1a 60%,#222 100%)'
  },
  fontBaslik: 'Bebas Neue', fontBody: 'IBM Plex Sans', temaModu: 'dark',
  moduller: ['hero','hizmetler','fiyatlandirma','galeri','yorumlar','iletisim','footer'],
  ozelIcerik: 'Hizmetler: klasik tıraş / saç kesimi / cilt bakımı / sakal şekillendirme. Online randevu CTA',
  sektorEn: 'barbershop+haircut+grooming',
  iskeletTipi: 'sektor-spor-premium'
}

const A05: SektorProfili = {
  id: 'A05', slug: 'kadin-kuaforu', kategori: 'yerel',
  sektorAdi: 'Kadın Kuaförü & Güzellik',
  isletmeAdi: 'Papatya Güzellik Salonu',
  slogan: 'Güzelliğin En Doğal Hali',
  renkler: {
    bg: '#fdf8f9', surface: '#fff0f3', primary: '#e8a0b4', primaryHover: '#d08a9e',
    text: '#2d1527', muted: '#8a6070', accent: '#c9a0a0',
    gradient: 'linear-gradient(135deg,#fdf8f9 0%,#fff0f3 100%)'
  },
  fontBaslik: 'Cormorant', fontBody: 'DM Sans', temaModu: 'light',
  moduller: ['hero','hizmetler','fiyatlandirma','galeri','yorumlar','iletisim','footer'],
  ozelIcerik: 'Hizmetler: saç / manikür-pedikür / kaş-kirpik / cilt bakımı. Randevu sistemi vurgusu',
  sektorEn: 'beauty+salon+hair',
  iskeletTipi: 'sektor-guzellik-buyume'
}

const A06: SektorProfili = {
  id: 'A06', slug: 'cicekci', kategori: 'yerel',
  sektorAdi: 'Çiçekçi & Floral Atölye',
  isletmeAdi: 'Tomurcuk Floral',
  slogan: 'Her Duygu Bir Çiçek Kadar Güzel',
  renkler: {
    bg: '#f9f5f0', surface: '#faf7f2', primary: '#e8c5a0', primaryHover: '#d0ad88',
    text: '#1a2e1c', muted: '#6a7a5c', accent: '#8b6f47',
    gradient: 'linear-gradient(135deg,#f9f5f0 0%,#f0ebe0 100%)'
  },
  fontBaslik: 'Gilda Display', fontBody: 'Jost', temaModu: 'light',
  moduller: ['hero','hizmetler','galeri','yorumlar','iletisim','footer'],
  ozelIcerik: 'Ürünler: günlük buketler / özel tasarım / düğün & organizasyon / abonelik. Hızlı teslimat vurgusu',
  sektorEn: 'flower+shop+floral',
  iskeletTipi: 'sektor-guzellik-buyume'
}

const A07: SektorProfili = {
  id: 'A07', slug: 'kasap', kategori: 'yerel',
  sektorAdi: 'Kasap & Şarküteri',
  isletmeAdi: 'Öz Anadolu Kasabı',
  slogan: 'Kökten Gelen Lezzet, Güvenilir Et',
  renkler: {
    bg: '#fafaf8', surface: '#f5f0ea', primary: '#c53030', primaryHover: '#a82828',
    text: '#1c0a08', muted: '#7a5a50', accent: '#8b4040',
    gradient: 'linear-gradient(135deg,#fafaf8 0%,#f5f0ea 100%)'
  },
  fontBaslik: 'Syne', fontBody: 'Mulish', temaModu: 'light',
  moduller: ['hero','hakkimizda','hizmetler','yorumlar','iletisim','footer'],
  ozelIcerik: 'Ürünler: dana / kuzu / tavuk / sucuk-pastırma. Günlük taze vurgusu, online sipariş CTA',
  sektorEn: 'butcher+meat+market',
  iskeletTipi: 'sektor-restoran-standart'
}

const A08: SektorProfili = {
  id: 'A08', slug: 'kuru-temizleme', kategori: 'yerel',
  sektorAdi: 'Kuru Temizleme & Çamaşırhane',
  isletmeAdi: 'Tertemiz Laundry',
  slogan: 'Kıyafetlerin En İyi Hali',
  renkler: {
    bg: '#f0f8ff', surface: '#e8f4fc', primary: '#4fc3f7', primaryHover: '#3aa8db',
    text: '#0a2a4a', muted: '#5a7a9a', accent: '#0288d1',
    gradient: 'linear-gradient(135deg,#f0f8ff 0%,#e8f4fc 100%)'
  },
  fontBaslik: 'Outfit', fontBody: 'Open Sans', temaModu: 'light',
  moduller: ['hero','hizmetler','fiyatlandirma','yorumlar','iletisim','footer'],
  ozelIcerik: 'Hizmetler: standart yıkama / kuru temizleme / ütüleme / express. Kapıdan teslimat vurgusu',
  sektorEn: 'laundry+cleaning+clothes',
  iskeletTipi: 'sektor-hizmet-temel'
}

const A09: SektorProfili = {
  id: 'A09', slug: 'oto-servis', kategori: 'yerel',
  sektorAdi: 'Oto Servis & Kaporta-Boya',
  isletmeAdi: 'Şahin Oto Merkezi',
  slogan: 'Aracın Güvencesi, Yolun Ustası',
  renkler: {
    bg: '#0d0d0d', surface: '#1a1a1a', primary: '#e63946', primaryHover: '#cc2f3c',
    text: '#f5f5f5', muted: '#999999', accent: '#ff6b6b',
    gradient: 'linear-gradient(135deg,#0d0d0d 0%,#1a1a1a 60%,#222 100%)'
  },
  fontBaslik: 'Barlow Condensed', fontBody: 'Barlow', temaModu: 'dark',
  moduller: ['hero','hizmetler','fiyatlandirma','galeri','yorumlar','iletisim','footer'],
  ozelIcerik: 'Hizmetler: motor bakım / kaporta / elektrik / lastik. Yıllık servis anlaşması vurgusu',
  sektorEn: 'auto+repair+mechanic+garage',
  iskeletTipi: 'sektor-hizmet-temel'
}

const A10: SektorProfili = {
  id: 'A10', slug: 'elektrikci', kategori: 'yerel',
  sektorAdi: 'Elektrik & Tesisat Hizmetleri',
  isletmeAdi: 'Voltaj Teknik',
  slogan: '7/24 Arızaya Hazır',
  renkler: {
    bg: '#1a1a2e', surface: '#222240', primary: '#f5a623', primaryHover: '#d99020',
    text: '#f4f4f4', muted: '#9090aa', accent: '#ffd700',
    gradient: 'linear-gradient(135deg,#1a1a2e 0%,#222240 60%,#16213e 100%)'
  },
  fontBaslik: 'Rajdhani', fontBody: 'Roboto', temaModu: 'dark',
  moduller: ['hero','hizmetler','hakkimizda','yorumlar','iletisim','footer'],
  ozelIcerik: 'Hizmetler: elektrik tesisatı / aydınlatma / tesisat / doğalgaz. Acil servis hattı vurgusu',
  sektorEn: 'electrician+plumbing+repair',
  iskeletTipi: 'sektor-hizmet-temel'
}

const A11: SektorProfili = {
  id: 'A11', slug: 'mobilya', kategori: 'yerel',
  sektorAdi: 'Mobilya & İç Dekorasyon',
  isletmeAdi: 'Form & Doku Mobilya',
  slogan: 'Yaşayan Mekânlar, Anlatılan Hikayeler',
  renkler: {
    bg: '#f7f3ee', surface: '#efe9e0', primary: '#8b6f47', primaryHover: '#74593a',
    text: '#2a1f14', muted: '#7a6a55', accent: '#c07941',
    gradient: 'linear-gradient(135deg,#f7f3ee 0%,#efe9e0 100%)'
  },
  fontBaslik: 'Fraunces', fontBody: 'DM Sans', temaModu: 'light',
  moduller: ['hero','hizmetler','galeri','hakkimizda','yorumlar','iletisim','footer'],
  ozelIcerik: 'Kategoriler: oturma odası / yatak odası / ofis / özel imalat. Ücretsiz keşif CTA',
  sektorEn: 'furniture+interior+design+home',
  iskeletTipi: 'sektor-vitrin-buyume'
}

const A12: SektorProfili = {
  id: 'A12', slug: 'terzi', kategori: 'yerel',
  sektorAdi: 'Terzi & Nakış Atölyesi',
  isletmeAdi: 'İnce İş Atölyesi',
  slogan: 'Her Dikişte Özen, Her Üründe Kalite',
  renkler: {
    bg: '#f8f5f0', surface: '#f0ebe2', primary: '#c9a84c', primaryHover: '#b0923f',
    text: '#1e1b2e', muted: '#6a6575', accent: '#8b7355',
    gradient: 'linear-gradient(135deg,#f8f5f0 0%,#f0ebe2 100%)'
  },
  fontBaslik: 'Libre Baskerville', fontBody: 'Merriweather Sans', temaModu: 'light',
  moduller: ['hero','hizmetler','galeri','yorumlar','iletisim','footer'],
  ozelIcerik: 'Hizmetler: kıyafet tamir / özel dikim / nakış / gelinlik uyarlaması. El işçiliği vurgusu',
  sektorEn: 'tailor+sewing+fashion+atelier',
  iskeletTipi: 'sektor-vitrin-buyume'
}

const A13: SektorProfili = {
  id: 'A13', slug: 'kirtasiye', kategori: 'yerel',
  sektorAdi: 'Kırtasiye & Baskı Merkezi',
  isletmeAdi: 'Nokta Baskı & Kırtasiye',
  slogan: 'Fikirleriniz Kâğıda Dökülür',
  renkler: {
    bg: '#eae2b7', surface: '#f5eed5', primary: '#fcbf49', primaryHover: '#e0a830',
    text: '#003049', muted: '#4a6070', accent: '#f77f00',
    gradient: 'linear-gradient(135deg,#eae2b7 0%,#f5eed5 100%)'
  },
  fontBaslik: 'Space Mono', fontBody: 'Source Sans 3', temaModu: 'light',
  moduller: ['hero','hizmetler','fiyatlandirma','yorumlar','iletisim','footer'],
  ozelIcerik: 'Hizmetler: dijital baskı / ciltleme / kartvizit / tabela. Kurumsal baskı paketi CTA',
  sektorEn: 'print+stationery+office',
  iskeletTipi: 'sektor-hizmet-temel'
}

const A14: SektorProfili = {
  id: 'A14', slug: 'eczane', kategori: 'yerel',
  sektorAdi: 'Eczane',
  isletmeAdi: 'Sağlık Köşesi Eczanesi',
  slogan: 'Sağlığınız Bizim Önceliğimiz',
  renkler: {
    bg: '#f1fffe', surface: '#e0f7f5', primary: '#80cbc4', primaryHover: '#60b0a8',
    text: '#004d40', muted: '#4a7a70', accent: '#26a69a',
    gradient: 'linear-gradient(135deg,#f1fffe 0%,#e0f7f5 100%)'
  },
  fontBaslik: 'Nunito', fontBody: 'Nunito Sans', temaModu: 'light',
  moduller: ['hero','hizmetler','hakkimizda','yorumlar','iletisim','footer'],
  ozelIcerik: 'Hizmetler: reçeteli ilaç / takviye / kozmetik / ölçüm hizmetleri. Nöbetçi eczane bilgisi',
  sektorEn: 'pharmacy+medicine+health',
  iskeletTipi: 'sektor-saglik-premium'
}

// ═══════════════════════════════════════════════════════════════════════════
// KATEGORİ B: PROFESYONEL HİZMETLER (11 sektör)
// ═══════════════════════════════════════════════════════════════════════════

const B01: SektorProfili = {
  id: 'B01', slug: 'avukat', kategori: 'profesyonel',
  sektorAdi: 'Avukatlık & Hukuk Bürosu',
  isletmeAdi: 'Karaağaç Hukuk Bürosu',
  slogan: 'Haklarınız, Güçlü Ellerde',
  renkler: {
    bg: '#f5f4f0', surface: '#eceae4', primary: '#c9a84c', primaryHover: '#b0923f',
    text: '#1c2b3a', muted: '#5a6a7a', accent: '#8b7355',
    gradient: 'linear-gradient(135deg,#f5f4f0 0%,#eceae4 100%)'
  },
  fontBaslik: 'Libre Baskerville', fontBody: 'Lato', temaModu: 'light',
  moduller: ['hero','hizmetler','ekip','hakkimizda','yorumlar','iletisim','footer'],
  ozelIcerik: 'Uzmanlıklar: ceza / aile / ticaret / iş hukuku. Ücretsiz ilk danışmanlık CTA',
  sektorEn: 'law+office+legal+justice',
  iskeletTipi: 'sektor-kurumsal-buyume'
}

const B02: SektorProfili = {
  id: 'B02', slug: 'muhasebe', kategori: 'profesyonel',
  sektorAdi: 'Muhasebe & Mali Müşavirlik',
  isletmeAdi: 'Güven Mali Müşavirlik',
  slogan: 'Rakamların Arkasında Güvenilir Bir El',
  renkler: {
    bg: '#f0f4f8', surface: '#e4eaf0', primary: '#2d8653', primaryHover: '#247044',
    text: '#0f2044', muted: '#5a6a80', accent: '#4caf50',
    gradient: 'linear-gradient(135deg,#f0f4f8 0%,#e4eaf0 100%)'
  },
  fontBaslik: 'Montserrat', fontBody: 'Inter', temaModu: 'light',
  moduller: ['hero','hizmetler','fiyatlandirma','ekip','yorumlar','iletisim','footer'],
  ozelIcerik: 'Hizmetler: vergi beyannamesi / bordro / şirket kuruluşu / denetim. KOBİ odaklı vurgu',
  sektorEn: 'accounting+finance+business',
  iskeletTipi: 'sektor-kurumsal-buyume'
}

const B03: SektorProfili = {
  id: 'B03', slug: 'mimarlik', kategori: 'profesyonel',
  sektorAdi: 'Mimarlık & İç Mimarlık',
  isletmeAdi: 'Küp Mimarlık Atölyesi',
  slogan: 'Boşluğu Anlama, Mekânı Dönüştürme',
  renkler: {
    bg: '#f5f0eb', surface: '#ebe4da', primary: '#c07941', primaryHover: '#a56535',
    text: '#1a1a1a', muted: '#6a6a6a', accent: '#8b6f47',
    gradient: 'linear-gradient(135deg,#f5f0eb 0%,#ebe4da 100%)'
  },
  fontBaslik: 'Syne', fontBody: 'Epilogue', temaModu: 'light',
  moduller: ['hero','hizmetler','galeri','ekip','hakkimizda','yorumlar','iletisim','footer'],
  ozelIcerik: 'Hizmetler: konut / ticari / peyzaj / tadilat danışmanlığı. Portfolio galeri ağırlıklı',
  sektorEn: 'architecture+interior+design+modern',
  iskeletTipi: 'sektor-insaat-premium'
}

const B04: SektorProfili = {
  id: 'B04', slug: 'muhendislik', kategori: 'profesyonel',
  sektorAdi: 'Mühendislik & Teknik Danışmanlık',
  isletmeAdi: 'Tekno Çözüm Mühendislik',
  slogan: 'Kompleks Sorunlar, Akıllı Çözümler',
  renkler: {
    bg: '#0b1929', surface: '#132840', primary: '#00bcd4', primaryHover: '#00a0b8',
    text: '#e8f4f8', muted: '#8aa8c0', accent: '#26c6da',
    gradient: 'linear-gradient(135deg,#0b1929 0%,#132840 60%,#0a2a4a 100%)'
  },
  fontBaslik: 'Exo 2', fontBody: 'IBM Plex Sans', temaModu: 'dark',
  moduller: ['hero','hizmetler','hakkimizda','ekip','yorumlar','iletisim','footer'],
  ozelIcerik: 'Hizmetler: proje yönetimi / yapı denetimi / enerji verimliliği / CAD çizim',
  sektorEn: 'engineering+technology+industrial',
  iskeletTipi: 'sektor-insaat-premium'
}

const B05: SektorProfili = {
  id: 'B05', slug: 'sigorta', kategori: 'profesyonel',
  sektorAdi: 'Sigorta Acentesi',
  isletmeAdi: 'Kalkan Sigorta',
  slogan: 'Her Riske Karşı Güvende Olun',
  renkler: {
    bg: '#f8f9fa', surface: '#eef1f5', primary: '#e87722', primaryHover: '#cc661c',
    text: '#1a3a5c', muted: '#5a7a9a', accent: '#ff9800',
    gradient: 'linear-gradient(135deg,#f8f9fa 0%,#eef1f5 100%)'
  },
  fontBaslik: 'Raleway', fontBody: 'Open Sans', temaModu: 'light',
  moduller: ['hero','hizmetler','fiyatlandirma','sss','yorumlar','iletisim','footer'],
  ozelIcerik: 'Ürünler: kasko / sağlık / konut / işyeri / hayat sigortası. Teklif al CTA',
  sektorEn: 'insurance+protection+business',
  iskeletTipi: 'sektor-kurumsal-buyume'
}

const B06: SektorProfili = {
  id: 'B06', slug: 'emlak', kategori: 'profesyonel',
  sektorAdi: 'Emlak & Gayrimenkul',
  isletmeAdi: 'Köşe Taşı Emlak',
  slogan: 'Doğru Adres, Doğru Zaman',
  renkler: {
    bg: '#f9f7f2', surface: '#f0ebe2', primary: '#d4af37', primaryHover: '#b8962e',
    text: '#1b2838', muted: '#5a6a7a', accent: '#8b7355',
    gradient: 'linear-gradient(135deg,#f9f7f2 0%,#f0ebe2 100%)'
  },
  fontBaslik: 'Playfair Display', fontBody: 'Mulish', temaModu: 'light',
  moduller: ['hero','hizmetler','galeri','ekip','yorumlar','iletisim','footer'],
  ozelIcerik: 'Kategoriler: satılık / kiralık / ticari / proje. Ücretsiz değerleme CTA',
  sektorEn: 'real+estate+property+luxury+home',
  iskeletTipi: 'sektor-kurumsal-buyume'
}

const B07: SektorProfili = {
  id: 'B07', slug: 'dijital-ajans', kategori: 'profesyonel',
  sektorAdi: 'Dijital Ajans & Reklam',
  isletmeAdi: 'Pulse Digital Ajans',
  slogan: 'Markanı Büyüt, Rakiplerine Bak',
  renkler: {
    bg: '#0a0a0f', surface: '#151520', primary: '#7c3aed', primaryHover: '#6a2ecc',
    text: '#f0e6ff', muted: '#8a80aa', accent: '#a78bfa',
    gradient: 'linear-gradient(135deg,#0a0a0f 0%,#151520 60%,#1a1030 100%)'
  },
  fontBaslik: 'Cabinet Grotesk', fontBody: 'Satoshi', temaModu: 'dark',
  moduller: ['hero','hizmetler','fiyatlandirma','galeri','ekip','yorumlar','iletisim','footer'],
  ozelIcerik: 'Hizmetler: SEO / Meta Ads / içerik / web tasarım / sosyal medya yönetimi',
  sektorEn: 'digital+agency+marketing+creative',
  iskeletTipi: 'sektor-ajans-premium'
}

const B08: SektorProfili = {
  id: 'B08', slug: 'dershane', kategori: 'profesyonel',
  sektorAdi: 'Özel Kurs & Dershane',
  isletmeAdi: 'Zirve Eğitim Merkezi',
  slogan: 'Başarı Bir Adım Ötede',
  renkler: {
    bg: '#f0f4ff', surface: '#e4eaf8', primary: '#f5a623', primaryHover: '#d99020',
    text: '#1a2744', muted: '#5a6a8a', accent: '#ff9800',
    gradient: 'linear-gradient(135deg,#f0f4ff 0%,#e4eaf8 100%)'
  },
  fontBaslik: 'Nunito', fontBody: 'Nunito Sans', temaModu: 'light',
  moduller: ['hero','hizmetler','fiyatlandirma','ekip','yorumlar','sss','iletisim','footer'],
  ozelIcerik: 'Kurslar: YKS / KPSS / İngilizce / matematik. Deneme sınavı ve ücretsiz ders CTA',
  sektorEn: 'education+classroom+learning+school',
  iskeletTipi: 'sektor-egitim-standart'
}

const B09: SektorProfili = {
  id: 'B09', slug: 'tercume', kategori: 'profesyonel',
  sektorAdi: 'Tercüme & Dil Okulu',
  isletmeAdi: 'Lingua Çeviri & Dil Akademisi',
  slogan: 'Diller Arasında Köprü Kuruyoruz',
  renkler: {
    bg: '#ecf0f1', surface: '#dfe6e9', primary: '#e74c3c', primaryHover: '#cc3c30',
    text: '#2c3e50', muted: '#6a7a8a', accent: '#c0392b',
    gradient: 'linear-gradient(135deg,#ecf0f1 0%,#dfe6e9 100%)'
  },
  fontBaslik: 'Josefin Sans', fontBody: 'Karla', temaModu: 'light',
  moduller: ['hero','hizmetler','fiyatlandirma','ekip','yorumlar','iletisim','footer'],
  ozelIcerik: 'Hizmetler: noter onaylı çeviri / simultane / dil kursları / IELTS hazırlık',
  sektorEn: 'language+translation+education',
  iskeletTipi: 'sektor-egitim-standart'
}

const B10: SektorProfili = {
  id: 'B10', slug: 'fotograf', kategori: 'profesyonel',
  sektorAdi: 'Fotoğraf & Video Prodüksiyon',
  isletmeAdi: 'Kare Prodüksiyon',
  slogan: 'Her Anı Sanat Eserine Dönüştürün',
  renkler: {
    bg: '#111111', surface: '#1a1a1a', primary: '#ff6b35', primaryHover: '#e05a2c',
    text: '#f0f0f0', muted: '#888888', accent: '#ff9f1c',
    gradient: 'linear-gradient(135deg,#111111 0%,#1a1a1a 60%,#222 100%)'
  },
  fontBaslik: 'Oswald', fontBody: 'Source Sans 3', temaModu: 'dark',
  moduller: ['hero','galeri','hizmetler','fiyatlandirma','yorumlar','iletisim','footer'],
  ozelIcerik: 'Hizmetler: düğün fotoğrafı / kurumsal video / ürün çekimi / sosyal medya içeriği',
  sektorEn: 'photography+studio+video+production',
  iskeletTipi: 'sektor-spor-premium'
}

const B11: SektorProfili = {
  id: 'B11', slug: 'yazilim', kategori: 'profesyonel',
  sektorAdi: 'Yazılım & IT Şirketi',
  isletmeAdi: 'Nexus Yazılım',
  slogan: 'Kodu Değil, Çözümü Teslim Ederiz',
  renkler: {
    bg: '#030712', surface: '#0f1729', primary: '#10b981', primaryHover: '#0d9a6a',
    text: '#f0fdf4', muted: '#6ee7b7', accent: '#34d399',
    gradient: 'linear-gradient(135deg,#030712 0%,#0f1729 60%,#111827 100%)'
  },
  fontBaslik: 'Space Grotesk', fontBody: 'Inter', temaModu: 'dark',
  moduller: ['hero','hizmetler','fiyatlandirma','ekip','hakkimizda','yorumlar','iletisim','footer'],
  ozelIcerik: 'Hizmetler: web / mobil app / API geliştirme / DevOps / AI entegrasyonu',
  sektorEn: 'software+technology+coding',
  iskeletTipi: 'sektor-ajans-premium'
}

// ═══════════════════════════════════════════════════════════════════════════
// KATEGORİ C: SAĞLIK & GÜZELLİK (9 sektör)
// ═══════════════════════════════════════════════════════════════════════════

const C01: SektorProfili = {
  id: 'C01', slug: 'dis-klinigi', kategori: 'saglik',
  sektorAdi: 'Diş Kliniği',
  isletmeAdi: 'Beyaz Gülüş Diş Polikliniği',
  slogan: 'Sağlıklı Dişler, Özgür Gülüşler',
  renkler: {
    bg: '#f0fbf9', surface: '#e0f5f0', primary: '#00c9a7', primaryHover: '#00aa8e',
    text: '#0d4f7c', muted: '#4a8090', accent: '#26a69a',
    gradient: 'linear-gradient(135deg,#f0fbf9 0%,#e0f5f0 100%)'
  },
  fontBaslik: 'Poppins', fontBody: 'Poppins', temaModu: 'light',
  moduller: ['hero','hizmetler','ekip','galeri','sss','yorumlar','iletisim','footer'],
  ozelIcerik: 'Hizmetler: implant / ortodonti / beyazlatma / kanal tedavisi. Online randevu sistemi',
  sektorEn: 'dentist+dental+clinic+teeth',
  iskeletTipi: 'sektor-saglik-premium'
}

const C02: SektorProfili = {
  id: 'C02', slug: 'ozel-klinik', kategori: 'saglik',
  sektorAdi: 'Özel Klinik / Sağlık Merkezi',
  isletmeAdi: 'Anadolu Sağlık Kliniği',
  slogan: 'Sağlığınız Profesyonel Ellerde',
  renkler: {
    bg: '#f4fbfc', surface: '#e4f2f5', primary: '#4db8d4', primaryHover: '#3aa0bb',
    text: '#1a3a4a', muted: '#5a8090', accent: '#0097a7',
    gradient: 'linear-gradient(135deg,#f4fbfc 0%,#e4f2f5 100%)'
  },
  fontBaslik: 'Outfit', fontBody: 'Outfit', temaModu: 'light',
  moduller: ['hero','hizmetler','ekip','galeri','yorumlar','sss','iletisim','footer'],
  ozelIcerik: 'Birimler: dahiliye / kardiyoloji / ortopedi / check-up. Sigorta kabulü vurgusu',
  sektorEn: 'clinic+medical+doctor+health',
  iskeletTipi: 'sektor-saglik-premium'
}

const C03: SektorProfili = {
  id: 'C03', slug: 'fizyoterapi', kategori: 'saglik',
  sektorAdi: 'Fizyoterapi & Rehabilitasyon',
  isletmeAdi: 'Hareket Fizyoterapi Merkezi',
  slogan: 'Ağrıdan Harekete, Hareketten Özgürlüğe',
  renkler: {
    bg: '#f0faf4', surface: '#e0f0e8', primary: '#52b788', primaryHover: '#429e74',
    text: '#1b4332', muted: '#4a7a5a', accent: '#81c784',
    gradient: 'linear-gradient(135deg,#f0faf4 0%,#e0f0e8 100%)'
  },
  fontBaslik: 'Nunito', fontBody: 'Nunito Sans', temaModu: 'light',
  moduller: ['hero','hizmetler','ekip','hakkimizda','yorumlar','iletisim','footer'],
  ozelIcerik: 'Hizmetler: manuel terapi / sporcu rehabilitasyonu / skolyoz / nörolojik fizyo',
  sektorEn: 'physiotherapy+rehabilitation+health+exercise',
  iskeletTipi: 'sektor-saglik-premium'
}

const C04: SektorProfili = {
  id: 'C04', slug: 'diyetisyen', kategori: 'saglik',
  sektorAdi: 'Beslenme & Diyetisyen',
  isletmeAdi: 'Denge Beslenme Danışmanlığı',
  slogan: 'Sağlıklı Vücut, Dengeli Yaşam',
  renkler: {
    bg: '#f6fbf0', surface: '#ecf5e2', primary: '#a8d672', primaryHover: '#90be5e',
    text: '#2d4a22', muted: '#5a7a48', accent: '#8bc34a',
    gradient: 'linear-gradient(135deg,#f6fbf0 0%,#ecf5e2 100%)'
  },
  fontBaslik: 'Quicksand', fontBody: 'Quicksand', temaModu: 'light',
  moduller: ['hero','hizmetler','fiyatlandirma','ekip','yorumlar','sss','iletisim','footer'],
  ozelIcerik: 'Programlar: kilo yönetimi / sporcu beslenmesi / çocuk beslenmesi / online danışmanlık',
  sektorEn: 'nutrition+diet+healthy+food',
  iskeletTipi: 'sektor-saglik-premium'
}

const C05: SektorProfili = {
  id: 'C05', slug: 'spor-salonu', kategori: 'saglik',
  sektorAdi: 'Spor Salonu & Fitness',
  isletmeAdi: 'Iron Force Gym',
  slogan: 'Limitlerini Zorla, Kendinle Kazan',
  renkler: {
    bg: '#0a0a0a', surface: '#1a1a1a', primary: '#ff3c00', primaryHover: '#e03500',
    text: '#f5f5f5', muted: '#999999', accent: '#ff6b35',
    gradient: 'linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 60%,#222 100%)'
  },
  fontBaslik: 'Anton', fontBody: 'Barlow', temaModu: 'dark',
  moduller: ['hero','hizmetler','fiyatlandirma','galeri','ekip','yorumlar','iletisim','footer'],
  ozelIcerik: 'Programlar: kişisel antrenman / grup dersleri / beslenme danışmanlığı. Üyelik paketleri',
  sektorEn: 'gym+fitness+workout+training',
  iskeletTipi: 'sektor-spor-premium'
}

const C06: SektorProfili = {
  id: 'C06', slug: 'yoga', kategori: 'saglik',
  sektorAdi: 'Yoga & Pilates Stüdyo',
  isletmeAdi: 'Nefes Yoga Stüdyo',
  slogan: 'Bedenini Dinle, Zihnini Özgür Bırak',
  renkler: {
    bg: '#e7f6f2', surface: '#d5ece5', primary: '#a5c9ca', primaryHover: '#8ab5b6',
    text: '#2c3639', muted: '#5a7070', accent: '#81b1b2',
    gradient: 'linear-gradient(135deg,#e7f6f2 0%,#d5ece5 100%)'
  },
  fontBaslik: 'Cormorant Garamond', fontBody: 'Jost', temaModu: 'light',
  moduller: ['hero','hizmetler','fiyatlandirma','galeri','ekip','yorumlar','iletisim','footer'],
  ozelIcerik: 'Dersler: hatha / vinyasa / yin yoga / reformer pilates / meditasyon',
  sektorEn: 'yoga+pilates+meditation+wellness',
  iskeletTipi: 'sektor-guzellik-buyume'
}

const C07: SektorProfili = {
  id: 'C07', slug: 'estetik-klinik', kategori: 'saglik',
  sektorAdi: 'Estetik & Güzellik Kliniği',
  isletmeAdi: 'Aura Estetik Kliniği',
  slogan: 'Doğal Güzelliğini Keşfet',
  renkler: {
    bg: '#fdf6f6', surface: '#f8ecec', primary: '#c9a0a0', primaryHover: '#b08888',
    text: '#1a0f12', muted: '#7a5a60', accent: '#d4b0b0',
    gradient: 'linear-gradient(135deg,#fdf6f6 0%,#f8ecec 100%)'
  },
  fontBaslik: 'Gilda Display', fontBody: 'Raleway', temaModu: 'light',
  moduller: ['hero','hizmetler','galeri','ekip','sss','yorumlar','iletisim','footer'],
  ozelIcerik: 'Hizmetler: botoks / dolgu / lazer epilasyon / PRP / mezoterapi. Konsültasyon CTA',
  sektorEn: 'beauty+clinic+aesthetic+skin',
  iskeletTipi: 'sektor-guzellik-buyume'
}

const C08: SektorProfili = {
  id: 'C08', slug: 'psikolog', kategori: 'saglik',
  sektorAdi: 'Psikoloji & Danışmanlık',
  isletmeAdi: 'Güvenli Alan Psikoloji',
  slogan: 'Dinlenecek Biri Var, Yardım Alınabilir',
  renkler: {
    bg: '#f5f7fb', surface: '#eaeff5', primary: '#9bb5d6', primaryHover: '#829cc0',
    text: '#2e3250', muted: '#6a7090', accent: '#7a9cc0',
    gradient: 'linear-gradient(135deg,#f5f7fb 0%,#eaeff5 100%)'
  },
  fontBaslik: 'Literata', fontBody: 'Source Serif 4', temaModu: 'light',
  moduller: ['hero','hizmetler','ekip','sss','hakkimizda','yorumlar','iletisim','footer'],
  ozelIcerik: 'Hizmetler: bireysel terapi / çift terapisi / online seans / anksiyete-depresyon. Güvenli dil kullan',
  sektorEn: 'psychology+therapy+mental+health+calm',
  iskeletTipi: 'sektor-saglik-premium'
}

const C09: SektorProfili = {
  id: 'C09', slug: 'veteriner', kategori: 'saglik',
  sektorAdi: 'Veteriner Kliniği',
  isletmeAdi: 'Patici Veteriner Kliniği',
  slogan: 'Dostlarınıza En İyi Bakım',
  renkler: {
    bg: '#fff8f2', surface: '#fef0e4', primary: '#f4a261', primaryHover: '#d98a4e',
    text: '#1b3a4b', muted: '#5a7a8a', accent: '#e76f51',
    gradient: 'linear-gradient(135deg,#fff8f2 0%,#fef0e4 100%)'
  },
  fontBaslik: 'Nunito', fontBody: 'Nunito Sans', temaModu: 'light',
  moduller: ['hero','hizmetler','ekip','galeri','sss','yorumlar','iletisim','footer'],
  ozelIcerik: 'Hizmetler: aşı / ameliyat / diş bakımı / otelcilik. Acil hat vurgusu, ücretsiz ilk muayene',
  sektorEn: 'veterinary+pet+animal+clinic',
  iskeletTipi: 'sektor-saglik-premium'
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORT & LOOKUP
// ═══════════════════════════════════════════════════════════════════════════

export const SEKTOR_KATALOGU: SektorProfili[] = [
  // Kategori A: Yerel Esnaf
  A01, A02, A03, A04, A05, A06, A07, A08, A09, A10, A11, A12, A13, A14,
  // Kategori B: Profesyonel Hizmetler
  B01, B02, B03, B04, B05, B06, B07, B08, B09, B10, B11,
  // Kategori C: Sağlık & Güzellik
  C01, C02, C03, C04, C05, C06, C07, C08, C09,
]

/** Slug eşleştirme haritası (hızlı lookup) */
const SLUG_MAP = new Map<string, SektorProfili>()
const KEYWORD_MAP: { keywords: string[]; profil: SektorProfili }[] = []

// Mapping: sektör adı keyword'leri → profil
const KEYWORD_DEFS: [SektorProfili, string[]][] = [
  [A01, ['restoran', 'lokanta', 'kebap', 'ocakbasi', 'ev-yemekleri']],
  [A02, ['kafe', 'kahve', 'cafe', 'kahvehane']],
  [A03, ['firin', 'pastane', 'borek', 'pasta', 'ekmek']],
  [A04, ['berber', 'erkek-kuafor', 'barbershop', 'tiras']],
  [A05, ['kuafor', 'guzellik', 'bayan-kuafor', 'sac-bakimi']],
  [A06, ['cicekci', 'floral', 'cicek']],
  [A07, ['kasap', 'sarküteri', 'et']],
  [A08, ['kuru-temizleme', 'camasirhane', 'laundry', 'yikama']],
  [A09, ['oto-servis', 'oto', 'kaporta', 'oto-boya', 'mekanik']],
  [A10, ['elektrikci', 'elektrik', 'tesisat', 'tesisatci', 'dogalgaz']],
  [A11, ['mobilya', 'dekorasyon', 'ic-dekorasyon', 'mobilyaci']],
  [A12, ['terzi', 'nakis', 'dikis', 'tamir']],
  [A13, ['kirtasiye', 'baski', 'matbaa', 'fotokopi']],
  [A14, ['eczane', 'pharmacy']],
  [B01, ['avukat', 'hukuk', 'hukuk-burosu', 'avukatlik']],
  [B02, ['muhasebe', 'mali-musavir', 'muhasebeci', 'mali']],
  [B03, ['mimarlik', 'ic-mimarlik', 'mimar', 'ic-mimar']],
  [B04, ['muhendislik', 'muhendis', 'teknik', 'danismanlik']],
  [B05, ['sigorta', 'sigorta-acente', 'kasko', 'saglik-sigortasi']],
  [B06, ['emlak', 'gayrimenkul', 'emlakci', 'konut']],
  [B07, ['ajans', 'dijital-ajans', 'reklam', 'dijital', 'sosyal-medya']],
  [B08, ['dershane', 'kurs', 'egitim', 'ozel-ders']],
  [B09, ['tercume', 'dil-okulu', 'ceviri', 'dil']],
  [B10, ['fotograf', 'video', 'produksiyon', 'kameraman']],
  [B11, ['yazilim', 'it', 'bilisim', 'software', 'web-gelistirme']],
  [C01, ['dis', 'dis-klinigi', 'dishekimi', 'ortodonti']],
  [C02, ['klinik', 'saglik', 'doktor', 'saglik-merkezi', 'poliklinik']],
  [C03, ['fizyoterapi', 'fizik-tedavi', 'rehabilitasyon']],
  [C04, ['diyetisyen', 'beslenme', 'diyet']],
  [C05, ['spor', 'gym', 'fitness', 'spor-salonu']],
  [C06, ['yoga', 'pilates', 'meditasyon']],
  [C07, ['estetik', 'estetik-klinik', 'guzellik-klinigi', 'botoks']],
  [C08, ['psikolog', 'psikoloji', 'terapi', 'psikoterapi']],
  [C09, ['veteriner', 'hayvan', 'pet', 'veteriner-klinik']],
]

// Initialize maps
for (const profil of SEKTOR_KATALOGU) {
  SLUG_MAP.set(profil.slug, profil)
  SLUG_MAP.set(profil.id.toLowerCase(), profil)
}
for (const [profil, keywords] of KEYWORD_DEFS) {
  KEYWORD_MAP.push({ keywords, profil })
  for (const kw of keywords) {
    SLUG_MAP.set(kw, profil)
  }
}

/**
 * Sektör ID'si, slug'ı veya adı ile profil bul.
 * Bulunamazsa null döner.
 */
export function sektorProfiliBul(sektorIdOrSlug: string): SektorProfili | null {
  if (!sektorIdOrSlug) return null
  const normalized = sektorIdOrSlug.toLowerCase().trim()
    .replace(/\s+/g, '-')
    .replace(/[ğ]/g, 'g').replace(/[ü]/g, 'u').replace(/[ş]/g, 's')
    .replace(/[ı]/g, 'i').replace(/[ö]/g, 'o').replace(/[ç]/g, 'c')

  // Doğrudan slug/id eşleşmesi
  const direct = SLUG_MAP.get(normalized)
  if (direct) return direct

  // Fuzzy keyword eşleşmesi
  for (const { keywords, profil } of KEYWORD_MAP) {
    if (keywords.some(kw => normalized.includes(kw) || kw.includes(normalized))) {
      return profil
    }
  }

  return null
}

/**
 * Sektör profilinin CSS değişken haritasını döndür (siteUreticisi enjeksiyonu için)
 */
export function profilCssDegerleri(profil: SektorProfili): Record<string, string> {
  return {
    CSS_ARKAPLAN: profil.renkler.bg,
    CSS_KART: profil.renkler.surface,
    CSS_VURGU: profil.renkler.primary,
    CSS_HOVER: profil.renkler.primaryHover,
    CSS_METIN: profil.renkler.text,
    CSS_ALT: profil.renkler.muted,
    CSS_GRADIENT: profil.renkler.gradient,
    FONT_BASLIK: profil.fontBaslik,
    FONT_METIN: profil.fontBody,
  }
}
