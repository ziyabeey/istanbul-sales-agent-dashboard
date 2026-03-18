/**
 * @kepenk/templates — Sector-Specific Section Content Interfaces
 *
 * ~55 sector-specific sections organized by cluster.
 * Cross-sector reuse: many sections are used across multiple sectors.
 *
 * CLUSTER A: Randevu + Portfolyo (Berber, Güzellik, Fotoğrafçı, Düğün)
 * CLUSTER B: Restoran + Yemek (Restoran, Kafe, Fırın, Fast Food, Bar, Catering, Kasap)
 * CLUSTER C: Sağlık (Doktor, Dişçi, Eczane, Veteriner)
 * CLUSTER D: Hizmet + Teknik (Oto Tamir, Elektrikçi, Tesisatçı, Klima, Telefon, Çilingir)
 * CLUSTER E: Hukuk + Finans (Avukat, Muhasebeci, Sigorta)
 * CLUSTER F: Eğitim + Spor (Spor, Yoga, Özel Ders, Dil, Sürücü, Müzik, Halı Saha, Yüzme)
 * CLUSTER G: Emlak
 * CLUSTER H: Kuyumcu
 * CLUSTER I: Kurumsal (Tüm sektörlerin Enterprise planları)
 */

// ═══════════════════════════════════════════════════
// CLUSTER A: RANDEVU + PORTFOLYO
// ═══════════════════════════════════════════════════

/** A1: Öncesi / Sonrası — Berber, Güzellik, Dişçi, Terzi, Oto, Klima */
export interface BeforeAfterContent {
  badge?: string
  title: string
  subtitle?: string
  items: {
    id: string
    before: string
    after: string
    caption?: string
    category?: string
  }[]
}

/** A2: Randevu Alma — Berber, Güzellik, Doktor, Dişçi, Psikolog, Veteriner */
export interface BookingContent {
  badge?: string
  title: string
  subtitle?: string
  mode: 'calendar' | 'cta_only' | 'external_link'
  calendar?: {
    availableServices: string[]
    availableStaff?: string[]
    minAdvance: number
    maxAdvance: number
    slotDuration: number
    workingHours: Record<string, { open: string; close: string } | null>
  }
  cta?: {
    text: string
    phone?: string
    whatsapp?: string
    externalUrl?: string
  }
  note?: string
}

/** A3: Portfolyo Masonry — Fotoğrafçı, Mimar, Düğün, Güzellik(Atölye) */
export interface PortfolioGridContent {
  badge?: string
  title: string
  subtitle?: string
  projects: {
    id: string
    title: string
    category: string
    coverImage: string
    images?: string[]
    description?: string
    date?: string
    client?: string
  }[]
  categories?: string[]
  layout: 'masonry' | 'grid' | 'horizontal'
}

/** A4: Proje Hikayesi — Fotoğrafçı, Mimar, Düğün */
export interface ProjectStoryContent {
  badge?: string
  title: string
  stories: {
    id: string
    title: string
    client?: string
    date?: string
    location?: string
    description: string
    images: string[]
    tags?: string[]
    stats?: { label: string; value: string }[]
  }[]
}

/** A5: Çekim/Proje Talebi Formu — Fotoğrafçı, Mimar, Düğün */
export interface BookingInquiryContent {
  title: string
  subtitle?: string
  fields: {
    id: string
    type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'date' | 'budget'
    label: string
    placeholder?: string
    required: boolean
    options?: string[]
  }[]
  submitText: string
  consentText: string
  successMessage: string
}

/** A6: Video Showreel — Fotoğrafçı, Düğün, Berber(Pro), Restoran(Pro) */
export interface VideoShowreelContent {
  backgroundVideo?: { url: string; poster: string }
  featuredVideo?: {
    url: string
    thumbnailUrl: string
    duration?: string
    title?: string
  }
  title?: string
  subtitle?: string
  cta?: { text: string; href: string }
}

/** A7a: Ödüller & Basın — Fotoğrafçı, Berber(Pro), Restoran(Pro) */
export interface AwardsPressContent {
  title: string
  items: {
    type: 'award' | 'press' | 'feature'
    title: string
    source?: string
    logo?: string
    year?: string
    link?: string
  }[]
}

/** A7b: Düğün Paketleri — Düğün, Catering */
export interface WeddingPackagesContent {
  title: string
  packages: {
    name: string
    price: string
    features: string[]
    popular?: boolean
    cta: { text: string; href: string }
  }[]
}

/** A7c: Planlama Süreci Timeline — Düğün */
export interface PlanningTimelineContent {
  title: string
  steps: {
    month: string
    tasks: string[]
    icon?: string
  }[]
}

/** A7d: İş Ortağı Ağı — Düğün */
export interface VendorPartnersContent {
  title: string
  vendors: {
    name: string
    category: string
    logo?: string
    link?: string
  }[]
}

/** A7e: Mekan Rehberi — Düğün */
export interface VenueDirectoryContent {
  title: string
  venues: {
    name: string
    location: string
    capacity: string
    image?: string
    priceRange?: string
    link?: string
  }[]
}

// ═══════════════════════════════════════════════════
// CLUSTER B: RESTORAN + YEMEK
// ═══════════════════════════════════════════════════

/** B1: Menü Gösterimi — Restoran, Kafe, Fırın, Fast Food, Bar, Kasap */
export interface MenuDisplayContent {
  badge?: string
  title: string
  subtitle?: string
  categories: {
    id: string
    name: string
    description?: string
    items: {
      id: string
      name: string
      description?: string
      price: string
      image?: string
      tags?: string[]
      dietary?: string[]
      soldOut?: boolean
    }[]
  }[]
  note?: string
}

/** B2: Günün Özel/Taze Ürünü — Fırın, Restoran, Kafe, Kasap */
export interface DailySpecialContent {
  title: string
  icon?: string
  items: {
    name: string
    description?: string
    price?: string
    image?: string
    availableUntil?: string
  }[]
  note?: string
  lastUpdated?: string
}

/** B3a: Masa Rezervasyonu — Restoran, Bar */
export interface ReservationContent {
  title: string
  subtitle?: string
  fields: {
    date: boolean
    time: boolean
    guestCount: boolean
    name: boolean
    phone: boolean
    note?: boolean
  }
  timeSlots?: string[]
  maxGuests?: number
  submitText: string
  consentText: string
}

/** B3b: Teslimat Bölgesi — Fast Food, Fırın, Kasap, Restoran */
export interface DeliveryZoneContent {
  title: string
  subtitle?: string
  zones: {
    name: string
    deliveryTime?: string
    minOrder?: string
    deliveryFee?: string
  }[]
  mapCenter?: { lat: number; lng: number }
  radius?: number
  orderCta?: { text: string; href: string }
}

// ═══════════════════════════════════════════════════
// CLUSTER C: SAĞLIK
// ═══════════════════════════════════════════════════

/** C1: Doktor/Hekim Profili — Doktor, Dişçi, Psikolog */
export interface DoctorProfileContent {
  badge?: string
  title: string
  doctors: {
    id: string
    title: string
    name: string
    specialty: string
    photo: string
    bio: string
    education: { degree: string; school: string; year: string }[]
    experience: string
    languages?: string[]
    memberships?: string[]
    publications?: number
  }[]
}

/** C2: Anlaşmalı Sigorta Logoları — Doktor, Dişçi, Eczane, Optik */
export interface InsuranceLogosContent {
  title: string
  subtitle?: string
  logos: {
    name: string
    imageUrl: string
    isHighlighted?: boolean
  }[]
  sgkNote?: string
}

/** C3a: Gülüş Galerisi — Dişçi */
export interface SmileGalleryContent {
  title: string
  subtitle?: string
  items: {
    before: string
    after: string
    treatment: string
    duration?: string
  }[]
}

/** C3b: Dişçi Korku Azaltıcı — Dişçi */
export interface FearReducerContent {
  title: string
  subtitle: string
  points: {
    icon: string
    title: string
    description: string
  }[]
  cta?: { text: string; href: string }
}

/** C3c: Tedavi Fiyat Hesaplama — Dişçi */
export interface PriceCalculatorContent {
  title: string
  treatments: {
    name: string
    pricePerUnit: number
    unit: string
    maxUnits: number
  }[]
  note?: string
}

/** C3d: Klinik Teknolojileri — Dişçi, Doktor, Güzellik */
export interface TechnologyShowcaseContent {
  title: string
  subtitle?: string
  technologies: {
    name: string
    description: string
    image: string
    brand?: string
  }[]
}

/** C4a: Aşı Takvimi — Veteriner, Çocuk Doktoru */
export interface VaccinationCalendarContent {
  title: string
  species?: string
  vaccines: {
    name: string
    age: string
    dose: string
    note?: string
  }[]
  cta?: { text: string; href: string }
}

/** C4b: Nöbetçi Eczane — Eczane */
export interface DutyPharmacyContent {
  title: string
  isDuty: boolean
  dutyInfo?: { date: string; note: string }
  regularNote?: string
  emergencyPhone?: string
}

/** C4c: Hayvan Türü Seçici — Veteriner */
export interface PetSpeciesContent {
  title: string
  species: {
    emoji: string
    name: string
    services: string[]
    link?: string
  }[]
}

/** C4d: Sağlık İpucu Bandı — Eczane, Doktor */
export interface HealthTipContent {
  title: string
  tip: string
  icon?: string
  season?: string
  link?: string
}

// ═══════════════════════════════════════════════════
// CLUSTER D: HİZMET + TEKNİK
// ═══════════════════════════════════════════════════

/** D2a: Araç/Cihaz Marka Logoları — Oto Tamir, Klima */
export interface VehicleBrandsContent {
  title: string
  logos: { name: string; imageUrl: string }[]
}

/** D2b: Garanti Bilgisi Bandı — Oto, Elektrikçi, Tesisatçı, Klima, Telefon */
export interface WarrantyBadgeContent {
  badges: {
    icon: string
    title: string
    description?: string
  }[]
}

/** D2c: Hizmet Bölgesi — Elektrikçi, Tesisatçı, Klima, Çilingir */
export interface ServiceAreaContent {
  title: string
  districts: string[]
  mapCenter?: { lat: number; lng: number }
  note?: string
}

/** D2d: İş Öncesi/Sonrası Galeri — Oto, Elektrikçi, Tesisatçı, Klima */
export interface WorkBeforeAfterContent {
  title: string
  items: {
    before: string
    after: string
    description: string
    date?: string
  }[]
}

/** D3a: Cihaz Bazlı Fiyat Tablosu — Telefon Tamiri */
export interface DeviceRepairPricingContent {
  title: string
  subtitle?: string
  devices: {
    brand: string
    models: {
      name: string
      repairs: {
        type: string
        price: string
        duration: string
        warranty?: string
      }[]
    }[]
  }[]
}

/** D3b: Belge/Sertifika — Elektrikçi, Tesisatçı, Klima, Oto, Avukat, Muhasebeci */
export interface CertificationsContent {
  title: string
  certs: {
    name: string
    issuer: string
    year?: string
    image?: string
    icon?: string
  }[]
}

/** D3c: Proje Türü Seçici — Elektrikçi, Tesisatçı, Mimar */
export interface ProjectTypeSelectorContent {
  title: string
  types: {
    emoji: string
    name: string
    description: string
    link: string
  }[]
}

/** D3d: Mevsimsel Hizmet Bandı — Klima, Oto, Fırın, Kasap */
export interface SeasonalServiceContent {
  title: string
  description: string
  icon?: string
  validUntil?: string
  cta?: { text: string; href: string }
  season: 'spring' | 'summer' | 'fall' | 'winter'
}

// ═══════════════════════════════════════════════════
// CLUSTER E: HUKUK + FİNANS
// ═══════════════════════════════════════════════════

/** E1a: Hukuk Çalışma Alanları — Avukat */
export interface PracticeAreasContent {
  title: string
  areas: {
    icon: string
    name: string
    description: string
    link?: string
  }[]
}

/** E1b: Dava Sonuçları — Avukat */
export interface CaseResultsContent {
  title: string
  cases: {
    type: string
    result: string
    description: string
    year?: string
  }[]
  disclaimer: string
}

/** E1c: Gizlilik Güvencesi — Avukat, Psikolog, Muhasebeci */
export interface ConfidentialityContent {
  icon: string
  title: string
  description: string
  legalRef?: string
}

/** E1d: Hizmet Verilen Sektörler — Muhasebeci, Sigorta */
export interface ClientIndustriesContent {
  title: string
  industries: {
    icon: string
    name: string
    description?: string
  }[]
}

/** E1e: Vergi Takvimi — Muhasebeci */
export interface TaxCalendarContent {
  title: string
  subtitle?: string
  deadlines: {
    name: string
    date: string
    daysLeft: number
    urgency: 'normal' | 'soon' | 'urgent'
  }[]
}

/** E1f: Sigorta Türleri — Sigorta */
export interface InsuranceTypesContent {
  title: string
  types: {
    icon: string
    name: string
    description: string
    link?: string
  }[]
}

/** E1g: Ücretsiz Teklif Formu — Sigorta, Muhasebeci, Düğün, Catering */
export interface FreeQuoteContent {
  title: string
  subtitle?: string
  fields: {
    id: string
    type: 'text' | 'email' | 'phone' | 'select' | 'textarea'
    label: string
    placeholder?: string
    required: boolean
    options?: string[]
  }[]
  submitText: string
  consentText: string
}

// ═══════════════════════════════════════════════════
// CLUSTER F: EĞİTİM + SPOR
// ═══════════════════════════════════════════════════

/** F1: Ders/Saha Programı — Spor, Yoga, Yüzme, Dil, Özel Ders, Müzik, Halı Saha */
export interface ClassScheduleContent {
  title: string
  subtitle?: string
  schedule: {
    day: string
    slots: {
      time: string
      name: string
      instructor?: string
      level?: string
      capacity?: string
      color?: string
      available?: boolean
    }[]
  }[]
  note?: string
}

/** F2a: Üyelik Fiyatları — Spor, Yoga, Yüzme, Halı Saha, Dil, Özel Ders, Sürücü */
export interface MembershipPricingContent {
  title: string
  packages: {
    name: string
    price: string
    period: string
    features: string[]
    popular?: boolean
    cta: { text: string; href: string }
  }[]
  note?: string
}

/** F2b: Dönüşüm Hikayeleri — Spor */
export interface TransformationContent {
  title: string
  stories: {
    name: string
    before: string
    after: string
    duration: string
    result: string
    quote?: string
    program?: string
  }[]
}

/** F2c: Eğitmen Profilleri — Spor, Yoga, Yüzme, Müzik */
export interface TrainerProfileContent {
  title: string
  trainers: {
    name: string
    role: string
    photo: string
    certifications: string[]
    specialties: string[]
    experience: string
    social?: { instagram?: string }
  }[]
}

/** F2d: Günün Antrenmanı — Spor (CrossFit) */
export interface WorkoutOfDayContent {
  title: string
  date: string
  workout: {
    name: string
    description: string
    exercises: { name: string; reps: string }[]
    difficulty: 'beginner' | 'intermediate' | 'advanced'
  }
  note?: string
}

/** F3a: Konu/Ders Grid — Özel Ders, Dil Kursu, Müzik Kursu */
export interface SubjectGridContent {
  title: string
  subjects: {
    emoji: string
    name: string
    description?: string
    levels?: string[]
    link?: string
  }[]
}

/** F3b: Başarı Hikayeleri — Özel Ders, Sürücü, Dil, Müzik */
export interface SuccessStoriesContent {
  title: string
  stories: {
    name: string
    photo?: string
    before: string
    after: string
    duration: string
    quote?: string
    exam?: string
  }[]
}

/** F3c: Ücretsiz Deneme CTA — Spor, Yoga, Özel Ders, Dil, Müzik */
export interface FreeTrialContent {
  title: string
  subtitle: string
  cta: { text: string; href: string }
  features?: string[]
  image?: string
}

/** F3d: Online/Yüz Yüze Seçim — Özel Ders, Dil, Müzik */
export interface OnlineOfflineToggleContent {
  title: string
  online: { icon: string; title: string; features: string[] }
  offline: { icon: string; title: string; features: string[] }
}

/** F3e: Seviye Yolu (CEFR vb.) — Dil Kursu */
export interface LevelPathContent {
  title: string
  levels: {
    code: string
    name: string
    description: string
    duration: string
    isActive?: boolean
  }[]
}

// ═══════════════════════════════════════════════════
// CLUSTER G: EMLAK
// ═══════════════════════════════════════════════════

/** G1a: İlan Arama Hero — Emlakçı */
export interface PropertySearchContent {
  title: string
  subtitle?: string
  filters: {
    type: { label: string; options: string[] }
    propertyType: { label: string; options: string[] }
    district: { label: string; options: string[] }
    priceRange: { label: string; min: number; max: number }
    rooms: { label: string; options: string[] }
  }
  searchButtonText: string
}

/** G1b: İlan Listesi Grid — Emlakçı */
export interface PropertyListingContent {
  title: string
  properties: {
    id: string
    title: string
    type: 'sale' | 'rent'
    price: string
    image: string
    rooms: string
    area: string
    district: string
    features?: string[]
    isNew?: boolean
    link?: string
  }[]
  viewAllText?: string
  viewAllHref?: string
}

/** G1c: Satılan Portföy — Emlakçı */
export interface SoldShowcaseContent {
  title: string
  subtitle?: string
  properties: {
    title: string
    image: string
    soldPrice?: string
    soldDate: string
    district: string
  }[]
}

/** G1d: Ücretsiz Değerleme CTA — Emlakçı */
export interface FreeValuationContent {
  title: string
  subtitle: string
  cta: { text: string; href: string }
  features?: string[]
  image?: string
}

// ═══════════════════════════════════════════════════
// CLUSTER H: KUYUMCU
// ═══════════════════════════════════════════════════

/** H1a: Canlı Altın Fiyat Bandı — Kuyumcu */
export interface GoldPriceTickerContent {
  title?: string
  prices: {
    type: string
    buy: string
    sell: string
    change: string
    changePercent: string
    direction: 'up' | 'down' | 'stable'
  }[]
  lastUpdated: string
  source?: string
}

/** H1b: Mücevherat Vitrini — Kuyumcu */
export interface JewelryGridContent {
  title: string
  categories?: string[]
  products: {
    id: string
    name: string
    category: string
    image: string
    karat?: string
    weight?: string
    stone?: string
    price?: string
    isNew?: boolean
  }[]
}

/** H1c: Eski Altın Alım — Kuyumcu */
export interface GoldBuybackContent {
  title: string
  subtitle: string
  features: string[]
  cta: { text: string; href: string }
}

/** H1d: Özel Tasarım — Kuyumcu */
export interface CustomDesignContent {
  title: string
  subtitle: string
  process: { step: number; title: string; description: string }[]
  cta: { text: string; href: string }
  image?: string
}

// ═══════════════════════════════════════════════════
// CLUSTER I: KURUMSAL (Enterprise)
// ═══════════════════════════════════════════════════

/** I1a: Çoklu Şube Haritası — TÜM SEKTÖRLER (enterprise) */
export interface MultiLocationContent {
  title: string
  locations: {
    name: string
    address: string
    phone: string
    coordinates: { lat: number; lng: number }
    workingHours?: string
    image?: string
    isMainBranch?: boolean
  }[]
}

/** I1b: Kariyer / İş İlanları — TÜM SEKTÖRLER (enterprise) */
export interface CareerListingsContent {
  title: string
  subtitle?: string
  positions: {
    title: string
    location: string
    type: string
    description: string
    requirements: string[]
    link?: string
  }[]
  noPositionsText?: string
}

/** I1c: Franchise/Bayilik — TÜM SEKTÖRLER (enterprise) */
export interface FranchiseSectionContent {
  title: string
  subtitle: string
  benefits: string[]
  stats?: { value: string; label: string }[]
  cta: { text: string; href: string }
  image?: string
}

/** I1d: Kurumsal Üyelik/Anlaşma — TÜM SEKTÖRLER (enterprise) */
export interface CorporateMembershipContent {
  title: string
  subtitle: string
  benefits: string[]
  cta: { text: string; href: string }
  partnerLogos?: { name: string; imageUrl: string }[]
}

/** I1e: Sadakat Programı — TÜM SEKTÖRLER (enterprise) */
export interface LoyaltyProgramContent {
  title: string
  description: string
  tiers?: {
    name: string
    requirement: string
    benefits: string[]
  }[]
  cta: { text: string; href: string }
}

/** I1f: Hızlı Erişim Kartları — TÜM SEKTÖRLER (enterprise) */
export interface QuickAccessCardsContent {
  cards: {
    icon: string
    emoji?: string
    title: string
    description?: string
    href: string
    color?: string
  }[]
}
