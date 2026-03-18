/**
 * @kepenk/templates — Full Demo Data: P0 Sectors (8 sectors)
 * File 7/8 — Berber, Restoran, Doktor, Güzellik, Avukat, Dişçi, Oto, Spor
 */
import type { FullDemoData } from './demo-data-common'
import { WH_STANDART_DUKKAN, WH_RESTORAN, WH_SAGLIK, WH_SPOR, WH_OFIS, DEFAULT_REVIEWS } from './demo-data-common'

export const DEMO_BERBER: FullDemoData = {
  name: 'Kadir Usta Kuaför', ownerName: 'Kadir Aydın', slogan: 'Sade ve temiz, her zaman güvenilir',
  phone: '0532 418 67 90', phoneClean: '905324186790', email: 'info@kadirustakuafor.com',
  address: 'Caferağa Mah. Moda Cad. No:48/A, Kadıköy, İstanbul', district: 'Kadıköy', city: 'İstanbul',
  coordinates: { lat: 40.9862, lng: 29.0293 }, rating: 4.7, reviewCount: 89, experience: '12 yıl',
  workingHours: WH_STANDART_DUKKAN,
  socialMedia: { instagram: '@kadirustakuafor' },
  services: [
    { id: 's1', name: 'Saç Kesimi', price: '₺200', duration: '30 dk', icon: 'scissors', description: 'Yüz şeklinize uygun profesyonel kesim' },
    { id: 's2', name: 'Sakal Tıraşı', price: '₺100', duration: '20 dk', icon: 'pen-tool', description: 'Ustura ile geleneksel tıraş' },
    { id: 's3', name: 'Saç + Sakal', price: '₺250', duration: '45 dk', icon: 'star', popular: true },
    { id: 's4', name: 'Çocuk Kesimi', price: '₺120', duration: '20 dk', icon: 'baby' },
    { id: 's5', name: 'Saç Yıkama + Şekil', price: '₺80', duration: '15 dk', icon: 'droplets' },
    { id: 's6', name: 'Cilt Bakımı', price: '₺300', duration: '40 dk', icon: 'sparkles' },
  ],
  team: [
    { id: 't1', name: 'Kadir Aydın', role: 'Baş Kuaför', experience: '12 yıl' },
    { id: 't2', name: 'Emre Koç', role: 'Kuaför', experience: '6 yıl' },
  ],
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_RESTORAN: FullDemoData = {
  name: 'Anadolu Sofrası', ownerName: 'Fatma Demir', slogan: 'Ev yapımı lezzetler, taze malzemeler',
  phone: '0212 567 89 01', phoneClean: '902125678901',
  address: 'Akarsu Cad. No:22, Beşiktaş, İstanbul', district: 'Beşiktaş', city: 'İstanbul',
  coordinates: { lat: 41.0428, lng: 29.0070 }, rating: 4.6, reviewCount: 156,
  workingHours: WH_RESTORAN,
  socialMedia: { instagram: '@anadolusofrasi' },
  menu: [
    { id: 'c1', name: 'Çorbalar', items: [{ id: 'm1', name: 'Mercimek Çorbası', price: '₺80' }, { id: 'm2', name: 'Ezogelin', price: '₺80' }, { id: 'm3', name: 'İşkembe', price: '₺120' }] },
    { id: 'c2', name: 'Ana Yemekler', items: [{ id: 'm4', name: 'Adana Kebap', price: '₺280', tags: ['🌶️ Acılı', '⭐ Popüler'] }, { id: 'm5', name: 'İskender', price: '₺320' }, { id: 'm6', name: 'Tavuk Şiş', price: '₺220' }, { id: 'm7', name: 'Kuzu Tandır', price: '₺350' }] },
    { id: 'c3', name: 'Salatalar', items: [{ id: 'm8', name: 'Çoban Salata', price: '₺60' }, { id: 'm9', name: 'Mevsim Salata', price: '₺70' }] },
    { id: 'c4', name: 'Tatlılar', items: [{ id: 'm10', name: 'Künefe', price: '₺120' }, { id: 'm11', name: 'Sütlaç', price: '₺80' }] },
    { id: 'c5', name: 'İçecekler', items: [{ id: 'm12', name: 'Ayran', price: '₺30' }, { id: 'm13', name: 'Çay', price: '₺20' }, { id: 'm14', name: 'Türk Kahvesi', price: '₺50' }] },
  ],
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_DOKTOR: FullDemoData = {
  name: 'Dr. Elif Aksoy Dahiliye Kliniği', ownerName: 'Uzm. Dr. Elif Aksoy', slogan: 'Sağlığınız, önceliğimiz',
  phone: '0216 345 67 89', phoneClean: '902163456789',
  address: 'Altunizade Mah. Bağlarbaşı Cad. No:56/3, Üsküdar, İstanbul', district: 'Üsküdar', city: 'İstanbul',
  coordinates: { lat: 41.0233, lng: 29.0393 }, rating: 4.9, reviewCount: 234,
  workingHours: WH_SAGLIK,
  services: [
    { id: 's1', name: 'Dahiliye Muayenesi', price: '₺800', icon: 'stethoscope' },
    { id: 's2', name: 'Check-Up', price: '₺2.500', icon: 'clipboard-check' },
    { id: 's3', name: 'Kan Tahlili', price: '₺500', icon: 'droplets' },
    { id: 's4', name: 'EKG', price: '₺300', icon: 'heart-pulse' },
    { id: 's5', name: 'Tansiyon Takibi', price: '₺200', icon: 'activity' },
  ],
  team: [{ id: 't1', name: 'Uzm. Dr. Elif Aksoy', role: 'Dahiliye Uzmanı', experience: '12 yıl', education: 'İ.Ü. Cerrahpaşa Tıp Fakültesi, 2012' }],
  sectorSpecific: { insurances: ['SGK', 'Axa', 'Allianz', 'Anadolu Sigorta', 'Mapfre'], seoSchema: 'MedicalBusiness' },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_GUZELLIK: FullDemoData = {
  name: 'Doğal Güzellik Stüdyo', ownerName: 'Ayşe Korkmaz', slogan: 'Doğal güzelliğinizi keşfedin',
  phone: '0532 876 54 32', phoneClean: '905328765432',
  address: 'İncirli Cad. No:89, Bakırköy, İstanbul', district: 'Bakırköy', city: 'İstanbul',
  coordinates: { lat: 40.9783, lng: 28.8715 }, rating: 4.8, reviewCount: 178,
  workingHours: WH_STANDART_DUKKAN,
  socialMedia: { instagram: '@dogalguzellik' },
  services: [
    { id: 's1', name: 'Cilt Bakımı', price: '₺500', duration: '60 dk', icon: 'sparkles' },
    { id: 's2', name: 'Makyaj', price: '₺400', duration: '45 dk', icon: 'palette' },
    { id: 's3', name: 'Kaş Tasarımı', price: '₺200', duration: '30 dk', icon: 'eye' },
    { id: 's4', name: 'Kalıcı Oje', price: '₺350', duration: '45 dk', icon: 'paintbrush' },
    { id: 's5', name: 'Bölgesel İncelme', price: '₺800', duration: '60 dk', icon: 'zap' },
    { id: 's6', name: 'Lazer Epilasyon', price: '₺1.500', duration: '30 dk', icon: 'zap', priceNote: 'seans başı' },
  ],
  team: [
    { id: 't1', name: 'Ayşe Korkmaz', role: 'Güzellik Uzmanı', experience: '10 yıl' },
    { id: 't2', name: 'Selin Demir', role: 'Cilt Bakım Uzmanı', experience: '5 yıl' },
  ],
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_AVUKAT: FullDemoData = {
  name: 'Av. Burak Yıldırım', ownerName: 'Av. Burak Yıldırım', slogan: 'Hakkınızı savunuyoruz',
  phone: '0212 234 56 78', phoneClean: '902122345678',
  address: 'Halaskargazi Cad. No:156/8, Şişli, İstanbul', district: 'Şişli', city: 'İstanbul',
  coordinates: { lat: 41.0555, lng: 28.9880 }, rating: 4.8, reviewCount: 67,
  workingHours: WH_OFIS,
  services: [
    { id: 's1', name: 'Ceza Hukuku', icon: 'scale', description: 'Ağır ceza, savcılık soruşturmaları, tutukluluk itirazları' },
    { id: 's2', name: 'Aile Hukuku', icon: 'users', description: 'Boşanma, velayet, nafaka, mal paylaşımı' },
    { id: 's3', name: 'İş Hukuku', icon: 'briefcase', description: 'İşe iade, kıdem tazminatı, işçi hakları' },
    { id: 's4', name: 'Gayrimenkul', icon: 'building', description: 'Tapu işlemleri, kira uyuşmazlıkları' },
    { id: 's5', name: 'Ticaret Hukuku', icon: 'landmark', description: 'Şirket kuruluş, birleşme, iflas' },
  ],
  team: [{ id: 't1', name: 'Av. Burak Yıldırım', role: 'Kurucu Avukat', experience: '15 yıl' }],
  sectorSpecific: { barNumber: 'İstanbul Barosu — Sicil No: 54321', practiceAreas: ['Ceza', 'Aile', 'İş', 'Gayrimenkul', 'Ticaret'] },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_DISCI: FullDemoData = {
  name: 'Dr. Deniz Gülüş Kliniği', ownerName: 'Dt. Deniz Gülüş', slogan: 'Gülüşünüzü tasarlıyoruz',
  phone: '0216 456 78 90', phoneClean: '902164567890',
  address: 'Bağdat Cad. No:234/5, Kadıköy, İstanbul', district: 'Kadıköy', city: 'İstanbul',
  coordinates: { lat: 40.9660, lng: 29.0640 }, rating: 4.9, reviewCount: 312,
  workingHours: WH_SAGLIK,
  services: [
    { id: 's1', name: 'Diş Dolgusu', price: '₺800', icon: 'circle-dot' },
    { id: 's2', name: 'Kanal Tedavisi', price: '₺2.500', icon: 'syringe' },
    { id: 's3', name: 'Zirkonyum Kaplama', price: '₺5.000', icon: 'crown', priceNote: 'diş başı' },
    { id: 's4', name: 'İmplant', price: '₺15.000', icon: 'pin', priceNote: 'diş başı' },
    { id: 's5', name: 'Diş Beyazlatma', price: '₺3.000', icon: 'sparkles' },
    { id: 's6', name: 'Ortodonti', price: '₺25.000', icon: 'align-horizontal-justify-center', priceNote: 'başlayan' },
  ],
  team: [
    { id: 't1', name: 'Dt. Deniz Gülüş', role: 'Diş Hekimi', experience: '14 yıl' },
    { id: 't2', name: 'Dt. Aylin Bay', role: 'Ortodontist', experience: '8 yıl' },
  ],
  sectorSpecific: { insurances: ['SGK', 'Axa', 'Allianz'], seoSchema: 'Dentist' },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_OTO: FullDemoData = {
  name: 'Usta Oto Servis', ownerName: 'Mehmet Usta', slogan: 'Aracınız güvenilir ellerde',
  phone: '0532 555 12 34', phoneClean: '905325551234',
  address: 'Cevizli Mah. D-100 Yan Yol No:45, Maltepe, İstanbul', district: 'Maltepe', city: 'İstanbul',
  coordinates: { lat: 40.9380, lng: 29.1290 }, rating: 4.6, reviewCount: 145,
  workingHours: WH_STANDART_DUKKAN,
  socialMedia: { instagram: '@ustaotoservis' },
  services: [
    { id: 's1', name: 'Motor Bakım', price: '₺1.500-3.000', icon: 'settings' },
    { id: 's2', name: 'Yağ Değişimi', price: '₺500-800', duration: '30 dk', icon: 'droplets' },
    { id: 's3', name: 'Fren Bakımı', price: '₺800-1.500', icon: 'shield' },
    { id: 's4', name: 'Lastik', price: '₺200/adet', icon: 'circle' },
    { id: 's5', name: 'Akü', price: '₺1.000-2.500', icon: 'battery' },
    { id: 's6', name: 'Klima Dolum', price: '₺800', icon: 'wind' },
  ],
  team: [
    { id: 't1', name: 'Mehmet Usta', role: 'Baş Mekanik', experience: '20 yıl' },
    { id: 't2', name: 'Hasan Çelik', role: 'Motor Uzmanı', experience: '10 yıl' },
  ],
  sectorSpecific: { brands: ['Toyota', 'Honda', 'Volkswagen', 'Ford', 'Renault', 'Hyundai'] },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_SPOR: FullDemoData = {
  name: 'Form Fitness', ownerName: 'Deniz Yılmaz', slogan: 'Formunun zirvesine çık',
  phone: '0535 444 56 78', phoneClean: '905354445678',
  address: 'Bahariye Cad. No:60, Kadıköy, İstanbul', district: 'Kadıköy', city: 'İstanbul',
  coordinates: { lat: 40.9899, lng: 29.0263 }, rating: 4.7, reviewCount: 210,
  workingHours: WH_SPOR,
  socialMedia: { instagram: '@formfitness' },
  services: [
    { id: 's1', name: 'Aylık Üyelik', price: '₺1.200', icon: 'calendar' },
    { id: 's2', name: '3 Aylık Üyelik', price: '₺3.000', icon: 'calendar', popular: true },
    { id: 's3', name: 'Yıllık Üyelik', price: '₺9.600', icon: 'star' },
    { id: 's4', name: 'Kişisel Antrenör', price: '₺500/seans', icon: 'user' },
  ],
  team: [
    { id: 't1', name: 'Deniz Yılmaz', role: 'PT & Kurucu', experience: '12 yıl' },
    { id: 't2', name: 'Cem Kaya', role: 'Fitness Eğitmeni', experience: '7 yıl' },
  ],
  sectorSpecific: { classes: ['Yoga', 'HIIT', 'Pilates', 'Boks', 'Kuvvet', 'Spinning'] },
  reviews: DEFAULT_REVIEWS,
}

/** P0 full demo data by sector key */
export const DEMO_P0 = {
  berber: DEMO_BERBER, restoran: DEMO_RESTORAN, doktor: DEMO_DOKTOR,
  guzellik: DEMO_GUZELLIK, avukat: DEMO_AVUKAT, disci: DEMO_DISCI,
  oto: DEMO_OTO, spor: DEMO_SPOR,
} as const
