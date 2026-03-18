/**
 * @kepenk/templates — Full Demo Data: P3 Sectors (10 sectors)
 * File 7/8 — Optik, Pet Shop, Çiçekçi, Terzi, Halı Saha, Yüzme, Catering, Kasap, Çilingir, Müzik
 */
import type { FullDemoData } from './demo-data-common'
import { WH_STANDART_DUKKAN, WH_RESTORAN, WH_724, WH_SPOR, WH_OFIS, DEFAULT_REVIEWS } from './demo-data-common'

export const DEMO_OPTIK: FullDemoData = {
  name: 'Görüş Optik', ownerName: 'Opt. Ali Korkmaz', slogan: 'Netliğinize odaklanıyoruz',
  phone: '0532 789 01 23', phoneClean: '905327890123',
  address: 'Bağdat Cad. No:260, Kadıköy, İstanbul', district: 'Kadıköy', city: 'İstanbul',
  coordinates: { lat: 40.9660, lng: 29.0640 }, rating: 4.7, reviewCount: 123,
  workingHours: WH_STANDART_DUKKAN,
  services: [
    { id: 's1', name: 'Göz Muayenesi', price: 'Ücretsiz', icon: 'eye' },
    { id: 's2', name: 'Numaralı Gözlük', icon: 'glasses' },
    { id: 's3', name: 'Kontakt Lens', icon: 'circle' },
    { id: 's4', name: 'Güneş Gözlüğü', icon: 'sun' },
  ],
  sectorSpecific: { brands: ['Ray-Ban', 'Gucci', 'Tom Ford', 'Oakley'], insurances: ['SGK', 'Özel Sigorta'] },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_PETSHOP: FullDemoData = {
  name: 'Pati Pet Shop', ownerName: 'Zeynep Hayvan', slogan: 'Dostlarınız için her şey',
  phone: '0533 890 12 34', phoneClean: '905338901234',
  address: 'Bahariye Cad. No:75, Kadıköy, İstanbul', district: 'Kadıköy', city: 'İstanbul',
  coordinates: { lat: 40.9899, lng: 29.0263 }, rating: 4.6, reviewCount: 178,
  workingHours: WH_STANDART_DUKKAN,
  services: [
    { id: 's1', name: 'Mama', icon: 'utensils' }, { id: 's2', name: 'Aksesuar', icon: 'tag' },
    { id: 's3', name: 'Oyuncak', icon: 'star' }, { id: 's4', name: 'Bakım Ürünleri', icon: 'sparkles' },
  ],
  sectorSpecific: { petTypes: ['🐕 Köpek', '🐈 Kedi', '🐦 Kuş', '🐠 Balık'] },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_CICEKCI: FullDemoData = {
  name: 'Tomurcuk Çiçekçilik', ownerName: 'Gül Demir', slogan: 'Taze çiçek, mutlu anlar',
  phone: '0532 901 23 45', phoneClean: '905329012345',
  address: 'Bağdat Cad. No:230, Kadıköy, İstanbul', district: 'Kadıköy', city: 'İstanbul',
  coordinates: { lat: 40.9690, lng: 29.0610 }, rating: 4.8, reviewCount: 234,
  workingHours: WH_STANDART_DUKKAN,
  services: [
    { id: 's1', name: 'Buket', icon: 'flower' }, { id: 's2', name: 'Aranjman', icon: 'gift' },
    { id: 's3', name: 'Çelenk', icon: 'circle' }, { id: 's4', name: 'Teraryum', icon: 'box' },
  ],
  sectorSpecific: { sameDayDelivery: true, deliveryCutoff: '14:00' },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_TERZI: FullDemoData = {
  name: 'İğne Terzi', ownerName: 'Hatice Usta', slogan: 'Terzilik bir sanattır',
  phone: '0532 012 34 56', phoneClean: '905320123456',
  address: 'Bahariye Cad. No:95, Kadıköy, İstanbul', district: 'Kadıköy', city: 'İstanbul',
  coordinates: { lat: 40.9899, lng: 29.0263 }, rating: 4.7, reviewCount: 89,
  workingHours: WH_STANDART_DUKKAN,
  services: [
    { id: 's1', name: 'Pantolon Kısaltma', price: '₺100', icon: 'scissors' },
    { id: 's2', name: 'Elbise Daraltma', price: '₺200', icon: 'scissors' },
    { id: 's3', name: 'Fermuvar Değişimi', price: '₺80', icon: 'arrow-up-down' },
    { id: 's4', name: 'Astar Yenileme', price: '₺150', icon: 'layers' },
    { id: 's5', name: 'Özel Dikim', price: '₺500+', icon: 'ruler' },
  ],
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_HALISAHA: FullDemoData = {
  name: 'Gol Halı Saha', ownerName: 'Murat Yıldız', slogan: 'Maç var!',
  phone: '0533 123 45 67', phoneClean: '905331234567',
  address: 'Fenerbahçe Mah. No:10, Kadıköy, İstanbul', district: 'Kadıköy', city: 'İstanbul',
  coordinates: { lat: 40.9780, lng: 29.0400 }, rating: 4.5, reviewCount: 267,
  workingHours: WH_SPOR,
  services: [
    { id: 's1', name: 'Hafta İçi Gündüz', price: '₺400/saat', icon: 'sun' },
    { id: 's2', name: 'Hafta İçi Akşam', price: '₺600/saat', icon: 'moon' },
    { id: 's3', name: 'Hafta Sonu', price: '₺700/saat', icon: 'calendar' },
  ],
  sectorSpecific: { fieldCount: 2, fieldType: 'Çim halı saha', floodlight: true },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_YUZME: FullDemoData = {
  name: 'Dalga Yüzme Havuzu', ownerName: 'Can Arslan', slogan: 'Yüzmenin keyfi',
  phone: '0532 234 56 78', phoneClean: '905322345678',
  address: 'Fenerbahçe Mah. No:20, Kadıköy, İstanbul', district: 'Kadıköy', city: 'İstanbul',
  coordinates: { lat: 40.9780, lng: 29.0400 }, rating: 4.7, reviewCount: 156,
  workingHours: WH_SPOR,
  services: [
    { id: 's1', name: 'Yüzme Kursu', price: '₺2.000/ay', icon: 'activity' },
    { id: 's2', name: 'Serbest Yüzme', price: '₺150/giriş', icon: 'waves' },
    { id: 's3', name: 'Aqua Fitness', price: '₺200/ders', icon: 'zap' },
    { id: 's4', name: 'Bebek Yüzme', price: '₺300/ders', icon: 'baby' },
  ],
  sectorSpecific: { poolSize: '25m olimpik', waterTemp: '28°C', sauna: true },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_CATERING: FullDemoData = {
  name: 'Sofra Catering', ownerName: 'Fatma Şef', slogan: 'Sofranıza lezzet getiriyoruz',
  phone: '0532 345 67 89', phoneClean: '905323456789',
  address: 'Bağdat Cad. No:290, Kadıköy, İstanbul', district: 'Kadıköy', city: 'İstanbul',
  coordinates: { lat: 40.9640, lng: 29.0660 }, rating: 4.8, reviewCount: 98,
  workingHours: WH_OFIS,
  services: [
    { id: 's1', name: 'Düğün Catering', price: '₺150/kişi', icon: 'heart' },
    { id: 's2', name: 'Kurumsal Catering', price: '₺120/kişi', icon: 'building' },
    { id: 's3', name: 'Ev Partisi', price: '₺100/kişi', icon: 'home' },
  ],
  sectorSpecific: { minOrder: 50, maxCapacity: 2000 },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_KASAP: FullDemoData = {
  name: 'Bıçak Kasap', ownerName: 'İbrahim Usta', slogan: 'Taze kesim, kaliteli et',
  phone: '0532 456 78 90', phoneClean: '905324567890',
  address: 'Bahariye Cad. No:85, Kadıköy, İstanbul', district: 'Kadıköy', city: 'İstanbul',
  coordinates: { lat: 40.9899, lng: 29.0263 }, rating: 4.7, reviewCount: 312,
  workingHours: WH_STANDART_DUKKAN,
  menu: [
    { id: 'c1', name: 'Dana', items: [{ id: 'm1', name: 'Dana Kıyma', price: '₺350/kg' }, { id: 'm2', name: 'Dana Kuşbaşı', price: '₺380/kg' }, { id: 'm3', name: 'Dana Bonfile', price: '₺500/kg' }] },
    { id: 'c2', name: 'Kuzu', items: [{ id: 'm4', name: 'Kuzu Pirzola', price: '₺480/kg' }, { id: 'm5', name: 'Kuzu But', price: '₺400/kg' }] },
    { id: 'c3', name: 'Tavuk', items: [{ id: 'm6', name: 'Tavuk Göğüs', price: '₺180/kg' }, { id: 'm7', name: 'Tavuk Bütün', price: '₺150/kg' }] },
  ],
  sectorSpecific: { halal: true, vetChecked: true, delivery: true },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_CILINGIR: FullDemoData = {
  name: 'Kilit Çilingir', ownerName: 'Ahmet Anahtar', slogan: '15 dakikada kapınızda',
  phone: '0532 567 89 01', phoneClean: '905325678901',
  address: 'Kadıköy Merkez, İstanbul', district: 'Kadıköy', city: 'İstanbul',
  coordinates: { lat: 40.9899, lng: 29.0263 }, rating: 4.6, reviewCount: 456,
  workingHours: WH_724,
  services: [
    { id: 's1', name: 'Kapı Açma', price: '₺300-500', icon: 'key', duration: '15 dk' },
    { id: 's2', name: 'Kilit Değişimi', price: '₺400-800', icon: 'lock' },
    { id: 's3', name: 'Oto Anahtar', price: '₺500-2.000', icon: 'car' },
    { id: 's4', name: 'Çelik Kasa', price: '₺500-1.500', icon: 'shield' },
  ],
  sectorSpecific: { emergency: true, responseTime: '15 dakika', coverage: 'İstanbul Anadolu Yakası' },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_MUZIK: FullDemoData = {
  name: 'Nota Müzik Kursu', ownerName: 'Öğr. Cem Müzisyen', slogan: 'Müziğe ilk adım',
  phone: '0533 678 90 12', phoneClean: '905336789012',
  address: 'Bahariye Cad. No:60, Kadıköy, İstanbul', district: 'Kadıköy', city: 'İstanbul',
  coordinates: { lat: 40.9899, lng: 29.0263 }, rating: 4.8, reviewCount: 89,
  workingHours: WH_OFIS,
  services: [
    { id: 's1', name: '4 Ders Paketi', price: '₺2.400', icon: 'music' },
    { id: 's2', name: '8 Ders Paketi', price: '₺4.000', icon: 'music', popular: true },
    { id: 's3', name: '12 Ders Paketi', price: '₺5.400', icon: 'star' },
  ],
  sectorSpecific: { instruments: ['🎸 Gitar', '🎹 Piyano', '🥁 Bateri', '🎤 Vokal', '🎻 Keman', '🎷 Saksafon'], freeTrial: true },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_P3 = {
  optik: DEMO_OPTIK, petshop: DEMO_PETSHOP, cicekci: DEMO_CICEKCI,
  terzi: DEMO_TERZI, halisaha: DEMO_HALISAHA, yuzme: DEMO_YUZME,
  catering: DEMO_CATERING, kasap: DEMO_KASAP, cilingir: DEMO_CILINGIR, muzik: DEMO_MUZIK,
} as const
