/**
 * @kepenk/templates — Full Demo Data: P2 Sectors (10 sectors)
 * File 7/8 — Psikolog, Fast Food, Bar, Telefon, Klima, Mimarlık, Sigorta, Sürücü, Dil, Yoga
 */
import type { FullDemoData } from './demo-data-common'
import { WH_SAGLIK, WH_RESTORAN, WH_BAR, WH_724, WH_OFIS, WH_STANDART_DUKKAN, WH_SPOR, DEFAULT_REVIEWS } from './demo-data-common'

export const DEMO_PSIKOLOG: FullDemoData = {
  name: 'Psikolog Elif Nur', ownerName: 'Psk. Elif Nur Şahin', slogan: 'Kendinizi dinlemeye başlayın',
  phone: '0533 789 01 23', phoneClean: '905337890123',
  address: 'Akarsu Sokak No:8, Cihangir, İstanbul', district: 'Beyoğlu', city: 'İstanbul',
  coordinates: { lat: 41.0336, lng: 28.9840 }, rating: 4.9, reviewCount: 67,
  workingHours: WH_SAGLIK,
  services: [
    { id: 's1', name: 'Bireysel Terapi', price: '₺1.200/seans', icon: 'user', duration: '50 dk' },
    { id: 's2', name: 'Çift Terapisi', price: '₺1.500/seans', icon: 'users', duration: '60 dk' },
    { id: 's3', name: 'Aile Terapisi', price: '₺1.500/seans', icon: 'home', duration: '60 dk' },
    { id: 's4', name: 'EMDR', price: '₺1.200/seans', icon: 'eye', duration: '50 dk' },
    { id: 's5', name: 'Çocuk Terapisi', price: '₺1.000/seans', icon: 'baby', duration: '40 dk' },
  ],
  sectorSpecific: { crisisLine: '182 — İntihar Önleme Hattı', approaches: ['KDT', 'EMDR', 'Şema Terapi'] },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_FASTFOOD: FullDemoData = {
  name: 'Lokma Dürüm', ownerName: 'Hasan Usta', slogan: 'Dürümün ustası',
  phone: '0532 890 12 34', phoneClean: '905328901234',
  address: 'Bahariye Cad. No:45, Kadıköy, İstanbul', district: 'Kadıköy', city: 'İstanbul',
  coordinates: { lat: 40.9899, lng: 29.0263 }, rating: 4.5, reviewCount: 456,
  workingHours: WH_RESTORAN,
  menu: [
    { id: 'c1', name: 'Dürümler', items: [{ id: 'm1', name: 'Adana Dürüm', price: '₺120', tags: ['⭐ Popüler'] }, { id: 'm2', name: 'Tavuk Dürüm', price: '₺100' }, { id: 'm3', name: 'Karışık Dürüm', price: '₺140' }] },
    { id: 'c2', name: 'Pideler', items: [{ id: 'm4', name: 'Lahmacun', price: '₺60' }, { id: 'm5', name: 'Fıstıklı Kebap', price: '₺180' }] },
    { id: 'c3', name: 'İçecekler', items: [{ id: 'm6', name: 'Ayran', price: '₺20' }, { id: 'm7', name: 'Şalgam', price: '₺25' }] },
  ],
  sectorSpecific: { delivery: true, deliveryTime: '30 dk', whatsappOrder: true },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_BAR: FullDemoData = {
  name: 'Kadeh Meyhane', ownerName: 'Cem Arslan', slogan: 'Mezenin en iyisi',
  phone: '0212 901 23 45', phoneClean: '902129012345',
  address: 'Nevizade Sokak No:5, Beyoğlu, İstanbul', district: 'Beyoğlu', city: 'İstanbul',
  coordinates: { lat: 41.0335, lng: 28.9770 }, rating: 4.6, reviewCount: 312,
  workingHours: WH_BAR,
  menu: [
    { id: 'c1', name: 'İçkiler', items: [{ id: 'm1', name: 'Rakı (70cl)', price: '₺600' }, { id: 'm2', name: 'Efes', price: '₺80' }, { id: 'm3', name: 'Şarap (kadeh)', price: '₺120' }, { id: 'm4', name: 'Kokteyl', price: '₺180' }] },
    { id: 'c2', name: 'Mezeler', items: [{ id: 'm5', name: 'Meze Tabağı', price: '₺250' }, { id: 'm6', name: 'Acılı Ezme', price: '₺80' }, { id: 'm7', name: 'Humus', price: '₺90' }] },
    { id: 'c3', name: 'Ana Yemek', items: [{ id: 'm8', name: 'Balık', price: '₺350-500' }, { id: 'm9', name: 'Karides Güveç', price: '₺280' }] },
  ],
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_TELEFON: FullDemoData = {
  name: 'Ekran Doktoru', ownerName: 'Serkan Çelik', slogan: 'Ekranınız 15 dakikada yeni',
  phone: '0532 012 34 56', phoneClean: '905320123456',
  address: 'Bahariye Cad. No:80, Kadıköy, İstanbul', district: 'Kadıköy', city: 'İstanbul',
  coordinates: { lat: 40.9899, lng: 29.0263 }, rating: 4.7, reviewCount: 289,
  workingHours: WH_STANDART_DUKKAN,
  services: [
    { id: 's1', name: 'iPhone 15 Ekran', price: '₺4.500', icon: 'smartphone', duration: '15 dk' },
    { id: 's2', name: 'Samsung S24 Ekran', price: '₺3.500', icon: 'smartphone', duration: '20 dk' },
    { id: 's3', name: 'iPad Ekran', price: '₺5.000', icon: 'tablet', duration: '30 dk' },
    { id: 's4', name: 'Batarya Değişimi', price: '₺800-1.500', icon: 'battery', duration: '15 dk' },
    { id: 's5', name: 'Şarj Soketi', price: '₺500-800', icon: 'plug', duration: '30 dk' },
  ],
  sectorSpecific: { warranty: '6 ay garanti', originalParts: true },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_KLIMA: FullDemoData = {
  name: 'Serinlik Klima', ownerName: 'Ahmet Koç', slogan: 'Serinliğin adresi',
  phone: '0532 123 45 67', phoneClean: '905321234567',
  address: 'Bağdat Cad. No:300, Kadıköy, İstanbul', district: 'Kadıköy', city: 'İstanbul',
  coordinates: { lat: 40.9600, lng: 29.0700 }, rating: 4.6, reviewCount: 145,
  workingHours: WH_724,
  services: [
    { id: 's1', name: 'Klima Montaj', price: '₺1.500-3.000', icon: 'wrench' },
    { id: 's2', name: 'Klima Bakım', price: '₺350', icon: 'settings' },
    { id: 's3', name: 'Gaz Dolum', price: '₺500', icon: 'wind' },
    { id: 's4', name: 'Kombi Bakım', price: '₺400', icon: 'flame' },
  ],
  sectorSpecific: { brands: ['Daikin', 'Mitsubishi', 'Samsung', 'Bosch', 'Vaillant'], seasonalPromo: 'Yaz Kampanyası — Klima bakım ₺350' },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_MIMARLIK: FullDemoData = {
  name: 'Çizgi Mimarlık', ownerName: 'Mimar Deniz Koç', slogan: 'Her çizgi bir vizyon',
  phone: '0533 234 56 78', phoneClean: '905332345678',
  address: 'Moda Cad. No:35, Kadıköy, İstanbul', district: 'Kadıköy', city: 'İstanbul',
  coordinates: { lat: 40.9850, lng: 29.0280 }, rating: 4.9, reviewCount: 34,
  workingHours: WH_OFIS,
  team: [{ id: 't1', name: 'Mimar Deniz Koç', role: 'Kurucu Mimar', experience: '12 yıl' }],
  sectorSpecific: { projectCount: 45, awards: 3 },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_SIGORTA: FullDemoData = {
  name: 'Kalkan Sigorta', ownerName: 'Sigorta Exp. Hakan Demir', slogan: 'Geleceğiniz güvende',
  phone: '0532 345 67 89', phoneClean: '905323456789',
  address: 'Bağdat Cad. No:240, Kadıköy, İstanbul', district: 'Kadıköy', city: 'İstanbul',
  coordinates: { lat: 40.9680, lng: 29.0600 }, rating: 4.7, reviewCount: 89,
  workingHours: WH_OFIS,
  services: [
    { id: 's1', name: 'Kasko', icon: 'car' }, { id: 's2', name: 'Trafik', icon: 'shield' },
    { id: 's3', name: 'Sağlık', icon: 'heart' }, { id: 's4', name: 'Konut', icon: 'home' },
    { id: 's5', name: 'İşyeri', icon: 'building' }, { id: 's6', name: 'Hayat', icon: 'user' },
    { id: 's7', name: 'DASK', icon: 'shield' },
  ],
  sectorSpecific: { freeQuote: true, partners: ['Axa', 'Allianz', 'Mapfre', 'Anadolu Sigorta'] },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_SURUCU: FullDemoData = {
  name: 'Direksiyon Sürücü Kursu', ownerName: 'Mustafa Şahin', slogan: 'İlk seferde ehliyet',
  phone: '0532 456 78 90', phoneClean: '905324567890',
  address: 'Bağdat Cad. No:200, Kadıköy, İstanbul', district: 'Kadıköy', city: 'İstanbul',
  coordinates: { lat: 40.9720, lng: 29.0560 }, rating: 4.7, reviewCount: 234,
  workingHours: WH_OFIS,
  services: [
    { id: 's1', name: 'B Sınıfı Ehliyet', price: '₺8.000', icon: 'car', popular: true },
    { id: 's2', name: 'A Sınıfı (Motor)', price: '₺5.000', icon: 'bike' },
    { id: 's3', name: 'C Sınıfı (Ağır)', price: '₺12.000', icon: 'truck' },
  ],
  sectorSpecific: { successRate: '%92', fleetSize: 8 },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_DIL: FullDemoData = {
  name: 'Alfabe Dil Okulu', ownerName: 'Dr. Ayşe İnce', slogan: 'İlk harften akıcılığa',
  phone: '0533 567 89 01', phoneClean: '905335678901',
  address: 'Bahariye Cad. No:65, Kadıköy, İstanbul', district: 'Kadıköy', city: 'İstanbul',
  coordinates: { lat: 40.9899, lng: 29.0263 }, rating: 4.8, reviewCount: 156,
  workingHours: WH_OFIS,
  services: [
    { id: 's1', name: 'Aylık Kurs', price: '₺2.500/ay', icon: 'book-open' },
    { id: 's2', name: 'Yoğun Kurs', price: '₺4.000/ay', icon: 'zap', popular: true },
    { id: 's3', name: 'Özel Ders', price: '₺500/saat', icon: 'user' },
  ],
  sectorSpecific: { languages: ['İngilizce', 'Almanca', 'Fransızca', 'İspanyolca', 'İtalyanca'], levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'], freeTest: true },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_YOGA: FullDemoData = {
  name: 'Nefes Yoga Stüdyo', ownerName: 'Elif Zen', slogan: 'Nefes al, bırak',
  phone: '0532 678 90 12', phoneClean: '905326789012',
  address: 'Akarsu Sokak No:12, Cihangir, İstanbul', district: 'Beyoğlu', city: 'İstanbul',
  coordinates: { lat: 41.0336, lng: 28.9840 }, rating: 4.9, reviewCount: 98,
  workingHours: WH_SPOR,
  services: [
    { id: 's1', name: 'Tekli Ders', price: '₺250', icon: 'user' },
    { id: 's2', name: 'Aylık Üyelik', price: '₺1.800', icon: 'calendar', popular: true },
    { id: 's3', name: '3 Aylık Üyelik', price: '₺4.500', icon: 'star' },
  ],
  sectorSpecific: { classes: ['Vinyasa', 'Yin', 'Hatha', 'Pilates Mat', 'Reformer', 'Meditasyon'] },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_P2 = {
  psikolog: DEMO_PSIKOLOG, fastfood: DEMO_FASTFOOD, bar: DEMO_BAR,
  telefon: DEMO_TELEFON, klima: DEMO_KLIMA, mimarlik: DEMO_MIMARLIK,
  sigorta: DEMO_SIGORTA, surucu: DEMO_SURUCU, dil: DEMO_DIL, yoga: DEMO_YOGA,
} as const
