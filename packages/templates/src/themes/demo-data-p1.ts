/**
 * @kepenk/templates — Full Demo Data: P1 Sectors (12 sectors)
 * File 7/8 — Kafe, Fırın, Eczane, Veteriner, Fotoğrafçı, Düğün, Elektrikçi, Tesisatçı, Muhasebeci, Emlakçı, Özel Ders, Kuyumcu
 */
import type { FullDemoData } from './demo-data-common'
import { WH_STANDART_DUKKAN, WH_RESTORAN, WH_SAGLIK, WH_OFIS, WH_724, DEFAULT_REVIEWS } from './demo-data-common'

export const DEMO_KAFE: FullDemoData = {
  name: 'Fincan Kahve', ownerName: 'Zeynep Kara', slogan: 'Bir fincan mutluluk',
  phone: '0533 222 33 44', phoneClean: '905332223344',
  address: 'Akarsu Sokak No:12, Cihangir, İstanbul', district: 'Beyoğlu', city: 'İstanbul',
  coordinates: { lat: 41.0336, lng: 28.9840 }, rating: 4.8, reviewCount: 234,
  workingHours: WH_RESTORAN,
  socialMedia: { instagram: '@fincankahve' },
  menu: [
    { id: 'c1', name: 'Espresso Bazlı', items: [{ id: 'm1', name: 'Espresso', price: '₺60' }, { id: 'm2', name: 'Cortado', price: '₺80' }, { id: 'm3', name: 'Flat White', price: '₺90' }, { id: 'm4', name: 'Latte', price: '₺85' }] },
    { id: 'c2', name: 'Demleme', items: [{ id: 'm5', name: 'V60', price: '₺100' }, { id: 'm6', name: 'Cold Brew', price: '₺85' }, { id: 'm7', name: 'Türk Kahvesi', price: '₺50' }] },
    { id: 'c3', name: 'Yiyecekler', items: [{ id: 'm8', name: 'Cheesecake', price: '₺120' }, { id: 'm9', name: 'Brownie', price: '₺90' }, { id: 'm10', name: 'Cookie', price: '₺50' }] },
  ],
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_FIRIN: FullDemoData = {
  name: 'Maya Ekmek Fırını', ownerName: 'Hasan Usta', slogan: 'Her sabah taze, her gün lezzetli',
  phone: '0212 333 44 55', phoneClean: '902123334455',
  address: 'Ortabayır Mah. No:15, Beşiktaş, İstanbul', district: 'Beşiktaş', city: 'İstanbul',
  coordinates: { lat: 41.0480, lng: 29.0050 }, rating: 4.7, reviewCount: 312,
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '06:00', close: '21:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '06:00', close: '21:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '06:00', close: '21:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '06:00', close: '21:00' },
    { day: 'friday', dayTr: 'Cuma', open: '06:00', close: '21:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '06:00', close: '21:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '07:00', close: '20:00' },
  ],
  menu: [
    { id: 'c1', name: 'Unlu Mamüller', items: [{ id: 'm1', name: 'Simit', price: '₺10' }, { id: 'm2', name: 'Poğaça', price: '₺15' }, { id: 'm3', name: 'Açma', price: '₺12' }, { id: 'm4', name: 'Çörek', price: '₺20' }] },
    { id: 'c2', name: 'Ekmekler', items: [{ id: 'm5', name: 'Ekmek', price: '₺15' }, { id: 'm6', name: 'Pide', price: '₺25' }, { id: 'm7', name: 'Tam Buğday', price: '₺20' }] },
  ],
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_ECZANE: FullDemoData = {
  name: 'Sağlık Eczanesi', ownerName: 'Ecz. Fatma Aydın', slogan: 'Sağlığınız için buradayız',
  phone: '0216 444 55 66', phoneClean: '902164445566',
  address: 'Altunizade Mah. No:30, Üsküdar, İstanbul', district: 'Üsküdar', city: 'İstanbul',
  coordinates: { lat: 41.0233, lng: 29.0393 }, rating: 4.8, reviewCount: 89,
  workingHours: WH_SAGLIK,
  services: [
    { id: 's1', name: 'Reçeteli İlaç', icon: 'pill' },
    { id: 's2', name: 'Dermokozmetik', icon: 'sparkles' },
    { id: 's3', name: 'Bitkisel Ürünler', icon: 'leaf' },
    { id: 's4', name: 'Medikal Ürünler', icon: 'stethoscope' },
    { id: 's5', name: 'Anne-Bebek', icon: 'baby' },
    { id: 's6', name: 'Vitamin & Takviye', icon: 'zap' },
  ],
  sectorSpecific: { isOnDuty: false, nearestOnDuty: 'Hayat Eczanesi — 0216 333 22 11' },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_VETERINER: FullDemoData = {
  name: 'Pati Veteriner', ownerName: 'Vet. Dr. Aylin Kaya', slogan: 'Dostlarınız güvende',
  phone: '0532 666 77 88', phoneClean: '905326667788',
  address: 'Moda Cad. No:45, Kadıköy, İstanbul', district: 'Kadıköy', city: 'İstanbul',
  coordinates: { lat: 40.9850, lng: 29.0280 }, rating: 4.9, reviewCount: 178,
  workingHours: WH_SAGLIK,
  services: [
    { id: 's1', name: 'Aşılama', price: '₺300-500', icon: 'syringe' },
    { id: 's2', name: 'Kısırlaştırma', price: '₺2.000-4.000', icon: 'scissors' },
    { id: 's3', name: 'Check-Up', price: '₺500', icon: 'clipboard-check' },
    { id: 's4', name: 'Diş Temizliği', price: '₺800', icon: 'sparkles' },
    { id: 's5', name: 'Tırnak Kesimi', price: '₺100', icon: 'scissors' },
    { id: 's6', name: 'Mikroçip', price: '₺300', icon: 'cpu' },
  ],
  team: [{ id: 't1', name: 'Vet. Dr. Aylin Kaya', role: 'Veteriner Hekim', experience: '10 yıl' }],
  sectorSpecific: { emergencyPhone: '0532 666 77 99', petTypes: ['Kedi', 'Köpek', 'Kuş', 'Kemirgen'] },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_FOTOGRAFCI: FullDemoData = {
  name: 'Kare Fotoğraf', ownerName: 'Serkan Aydın', slogan: 'Anlarınızı ölümsüzleştiriyoruz',
  phone: '0535 111 22 33', phoneClean: '905351112233',
  address: 'Bahariye Cad. No:30, Kadıköy, İstanbul', district: 'Kadıköy', city: 'İstanbul',
  coordinates: { lat: 40.9899, lng: 29.0263 }, rating: 4.9, reviewCount: 156,
  workingHours: WH_OFIS,
  services: [
    { id: 's1', name: 'Portre Çekim', price: '₺2.000', icon: 'user', duration: '2 saat' },
    { id: 's2', name: 'Düğün Fotoğrafı', price: '₺15.000-40.000', icon: 'heart' },
    { id: 's3', name: 'Ürün Çekimi', price: '₺3.000', icon: 'camera' },
    { id: 's4', name: 'Mimari Fotoğraf', price: '₺5.000', icon: 'building' },
  ],
  team: [{ id: 't1', name: 'Serkan Aydın', role: 'Fotoğraf Sanatçısı', experience: '15 yıl' }],
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_DUGUN: FullDemoData = {
  name: 'Nikâh Organizasyon', ownerName: 'Gülşen Aktaş', slogan: 'Hayalinizdeki düğün burada',
  phone: '0532 999 88 77', phoneClean: '905329998877',
  address: 'Bağdat Cad. No:180, Kadıköy, İstanbul', district: 'Kadıköy', city: 'İstanbul',
  coordinates: { lat: 40.9720, lng: 29.0560 }, rating: 4.8, reviewCount: 123,
  workingHours: WH_OFIS,
  services: [
    { id: 's1', name: 'Gümüş Paket', price: '₺50.000', icon: 'star', description: 'Mekan + dekorasyon + DJ' },
    { id: 's2', name: 'Altın Paket', price: '₺100.000', icon: 'crown', description: 'Gümüş + fotoğraf + kamera', popular: true },
    { id: 's3', name: 'Elmas Paket', price: '₺200.000', icon: 'diamond', description: 'Altın + canlı müzik + after party' },
  ],
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_ELEKTRIKCI: FullDemoData = {
  name: 'Akım Elektrik', ownerName: 'Murat Demir', slogan: 'Güvenilir elektrik çözümleri',
  phone: '0532 123 45 67', phoneClean: '905321234567',
  address: 'Bahariye Cad. No:55, Kadıköy, İstanbul', district: 'Kadıköy', city: 'İstanbul',
  coordinates: { lat: 40.9899, lng: 29.0263 }, rating: 4.7, reviewCount: 98,
  workingHours: WH_724,
  services: [
    { id: 's1', name: 'Sigorta Pano', price: '₺500-1.500', icon: 'zap' },
    { id: 's2', name: 'Kablo Döşeme', price: '₺100/m', icon: 'cable' },
    { id: 's3', name: 'Priz/Anahtar', price: '₺150', icon: 'plug' },
    { id: 's4', name: 'Aydınlatma', price: '₺200-800', icon: 'lightbulb' },
    { id: 's5', name: 'Sayaç', price: '₺300-600', icon: 'gauge' },
  ],
  sectorSpecific: { emergency: true, certifications: ['Ustalık Belgesi', 'İSG Sertifikası'], warranty: '1 yıl garanti' },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_TESISATCI: FullDemoData = {
  name: 'Damla Tesisat', ownerName: 'Ali Kara', slogan: 'Su sorununuza hızlı çözüm',
  phone: '0532 234 56 78', phoneClean: '905322345678',
  address: 'Caferağa Mah. No:40, Kadıköy, İstanbul', district: 'Kadıköy', city: 'İstanbul',
  coordinates: { lat: 40.9862, lng: 29.0293 }, rating: 4.6, reviewCount: 87,
  workingHours: WH_724,
  services: [
    { id: 's1', name: 'Su Tesisatı', price: '₺300-800', icon: 'droplets' },
    { id: 's2', name: 'Pis Su', price: '₺400-1.200', icon: 'waves' },
    { id: 's3', name: 'Kombi Bakım', price: '₺400', icon: 'flame' },
    { id: 's4', name: 'Tıkanıklık Açma', price: '₺200-500', icon: 'wrench' },
    { id: 's5', name: 'Kaçak Tespiti', price: '₺500', icon: 'search' },
  ],
  sectorSpecific: { emergency: true, warranty: '1 yıl garanti' },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_MUHASEBECI: FullDemoData = {
  name: 'SMMM Ayşe Tekin', ownerName: 'SMMM Ayşe Tekin', slogan: 'Mali işleriniz emin ellerde',
  phone: '0532 345 67 89', phoneClean: '905323456789',
  address: 'Bağdat Cad. No:250, Kadıköy, İstanbul', district: 'Kadıköy', city: 'İstanbul',
  coordinates: { lat: 40.9660, lng: 29.0640 }, rating: 4.8, reviewCount: 56,
  workingHours: WH_OFIS,
  services: [
    { id: 's1', name: 'Defter Tutma', price: '₺1.500/ay', icon: 'book-open' },
    { id: 's2', name: 'Beyanname', price: '₺500/adet', icon: 'file-text' },
    { id: 's3', name: 'SGK İşlemleri', price: '₺800/ay', icon: 'shield' },
    { id: 's4', name: 'Şirket Kuruluş', price: '₺3.000', icon: 'building' },
  ],
  sectorSpecific: { taxCalendar: true, sectors: ['Perakende', 'Hizmet', 'Üretim', 'İnşaat', 'Teknoloji'] },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_EMLAKCI: FullDemoData = {
  name: 'Anahtar Emlak', ownerName: 'Hasan Taş', slogan: 'Hayalinizdeki eve kavuşun',
  phone: '0532 456 78 90', phoneClean: '905324567890',
  address: 'Bağdat Cad. No:220, Kadıköy, İstanbul', district: 'Kadıköy', city: 'İstanbul',
  coordinates: { lat: 40.9680, lng: 29.0600 }, rating: 4.6, reviewCount: 78,
  workingHours: WH_OFIS,
  services: [
    { id: 's1', name: 'Satılık Konut', icon: 'home' },
    { id: 's2', name: 'Kiralık Konut', icon: 'key' },
    { id: 's3', name: 'Satılık İşyeri', icon: 'building' },
    { id: 's4', name: 'Ücretsiz Ekspertiz', icon: 'clipboard-check', description: 'Gayrimenkulünüzün değerini öğrenin' },
  ],
  sectorSpecific: { activeListings: 127, annualSales: 45, freeValuation: true },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_OZELDERS: FullDemoData = {
  name: 'Kalem Özel Ders', ownerName: 'Öğr. Zeynep Ak', slogan: 'Her öğrenci başarabilir',
  phone: '0532 567 89 01', phoneClean: '905325678901',
  address: 'Bahariye Cad. No:70, Kadıköy, İstanbul', district: 'Kadıköy', city: 'İstanbul',
  coordinates: { lat: 40.9899, lng: 29.0263 }, rating: 4.9, reviewCount: 67,
  workingHours: WH_OFIS,
  services: [
    { id: 's1', name: '4 Ders Paketi', price: '₺2.000', icon: 'book-open' },
    { id: 's2', name: '8 Ders Paketi', price: '₺3.500', icon: 'book-open', popular: true },
    { id: 's3', name: '16 Ders Paketi', price: '₺6.000', icon: 'star' },
  ],
  sectorSpecific: { subjects: ['Matematik', 'Fizik', 'Kimya', 'Türkçe', 'İngilizce'], levels: ['İlkokul', 'Ortaokul', 'Lise', 'Üniversite Hazırlık'] },
  reviews: DEFAULT_REVIEWS,
}

export const DEMO_KUYUMCU: FullDemoData = {
  name: 'Halka Kuyumculuk', ownerName: 'Mustafa Altın', slogan: 'Güvenilir altın adresi',
  phone: '0532 678 90 12', phoneClean: '905326789012',
  address: 'Kapalıçarşı No:42, Fatih, İstanbul', district: 'Fatih', city: 'İstanbul',
  coordinates: { lat: 41.0107, lng: 28.9681 }, rating: 4.8, reviewCount: 234,
  workingHours: WH_STANDART_DUKKAN,
  menu: [
    { id: 'c1', name: 'Pırlanta', items: [{ id: 'm1', name: 'Pırlanta Tektaş', price: '₺45.000' }, { id: 'm2', name: 'Pırlanta Küpe', price: '₺25.000' }] },
    { id: 'c2', name: 'Altın', items: [{ id: 'm3', name: '22 Ayar Bilezik', price: '₺18.000/adet' }, { id: 'm4', name: 'Altın Kolye', price: '₺8.000' }] },
    { id: 'c3', name: 'Gümüş', items: [{ id: 'm5', name: 'Gümüş Yüzük', price: '₺500' }, { id: 'm6', name: 'Gümüş Kolye', price: '₺800' }] },
  ],
  sectorSpecific: { goldPriceTicker: true, buyback: true, certificates: ['TSE', 'İAR'] },
  reviews: DEFAULT_REVIEWS,
}

/** P1 full demo data by sector key */
export const DEMO_P1 = {
  kafe: DEMO_KAFE, firin: DEMO_FIRIN, eczane: DEMO_ECZANE, veteriner: DEMO_VETERINER,
  fotografci: DEMO_FOTOGRAFCI, dugun: DEMO_DUGUN, elektrikci: DEMO_ELEKTRIKCI,
  tesisatci: DEMO_TESISATCI, muhasebeci: DEMO_MUHASEBECI, emlakci: DEMO_EMLAKCI,
  ozelders: DEMO_OZELDERS, kuyumcu: DEMO_KUYUMCU,
} as const
