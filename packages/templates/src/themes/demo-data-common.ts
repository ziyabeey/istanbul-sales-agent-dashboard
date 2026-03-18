/**
 * @kepenk/templates — Demo Data Common: Types, Presets, Reviews
 * File 7/8 — Shared across all 40 sectors
 */

// ═══ TYPES ═══

export interface DemoService {
  id: string; name: string; price?: string; duration?: string
  icon?: string; description?: string; priceNote?: string; popular?: boolean; tags?: string[]
}

export interface DemoMenuItem {
  id: string; name: string; price: string; tags?: string[]; description?: string
}

export interface DemoMenuCategory {
  id: string; name: string; items: DemoMenuItem[]
}

export interface DemoTeamMember {
  id: string; name: string; role: string; experience?: string; education?: string
}

export interface DemoWorkingDay {
  day: string; dayTr: string; open: string | null; close: string | null
}

export interface DemoReview {
  name: string; text: string; rating: number; date: string
}

export interface FullDemoData {
  // Core
  name: string; ownerName: string; slogan: string
  phone: string; phoneClean: string; email?: string
  address: string; district: string; city: string
  coordinates: { lat: number; lng: number }
  rating?: number; reviewCount?: number; experience?: string
  // Details
  workingHours: DemoWorkingDay[]
  socialMedia?: Record<string, string>
  services?: DemoService[]
  menu?: DemoMenuCategory[]
  team?: DemoTeamMember[]
  reviews?: DemoReview[]
  sectorSpecific?: Record<string, unknown>
}

// ═══ WORKING HOURS PRESETS ═══

const wh = (dayTr: string, day: string, open: string | null, close: string | null): DemoWorkingDay => ({ day, dayTr, open, close })

export const WH_STANDART_DUKKAN: DemoWorkingDay[] = [
  wh('Pazartesi','monday','09:00','19:00'), wh('Salı','tuesday','09:00','19:00'),
  wh('Çarşamba','wednesday','09:00','19:00'), wh('Perşembe','thursday','09:00','19:00'),
  wh('Cuma','friday','09:00','19:00'), wh('Cumartesi','saturday','09:00','18:00'),
  wh('Pazar','sunday',null,null),
]

export const WH_RESTORAN: DemoWorkingDay[] = [
  wh('Pazartesi','monday','11:00','22:00'), wh('Salı','tuesday','11:00','22:00'),
  wh('Çarşamba','wednesday','11:00','22:00'), wh('Perşembe','thursday','11:00','22:00'),
  wh('Cuma','friday','11:00','23:00'), wh('Cumartesi','saturday','11:00','23:00'),
  wh('Pazar','sunday','11:00','22:00'),
]

export const WH_SAGLIK: DemoWorkingDay[] = [
  wh('Pazartesi','monday','09:00','18:00'), wh('Salı','tuesday','09:00','18:00'),
  wh('Çarşamba','wednesday','09:00','18:00'), wh('Perşembe','thursday','09:00','18:00'),
  wh('Cuma','friday','09:00','18:00'), wh('Cumartesi','saturday','09:00','14:00'),
  wh('Pazar','sunday',null,null),
]

export const WH_724: DemoWorkingDay[] = [
  wh('Pazartesi','monday','00:00','24:00'), wh('Salı','tuesday','00:00','24:00'),
  wh('Çarşamba','wednesday','00:00','24:00'), wh('Perşembe','thursday','00:00','24:00'),
  wh('Cuma','friday','00:00','24:00'), wh('Cumartesi','saturday','00:00','24:00'),
  wh('Pazar','sunday','00:00','24:00'),
]

export const WH_BAR: DemoWorkingDay[] = [
  wh('Pazartesi','monday','17:00','02:00'), wh('Salı','tuesday','17:00','02:00'),
  wh('Çarşamba','wednesday','17:00','02:00'), wh('Perşembe','thursday','17:00','02:00'),
  wh('Cuma','friday','17:00','04:00'), wh('Cumartesi','saturday','17:00','04:00'),
  wh('Pazar','sunday','17:00','01:00'),
]

export const WH_OFIS: DemoWorkingDay[] = [
  wh('Pazartesi','monday','09:00','18:00'), wh('Salı','tuesday','09:00','18:00'),
  wh('Çarşamba','wednesday','09:00','18:00'), wh('Perşembe','thursday','09:00','18:00'),
  wh('Cuma','friday','09:00','18:00'), wh('Cumartesi','saturday','10:00','14:00'),
  wh('Pazar','sunday',null,null),
]

export const WH_SPOR: DemoWorkingDay[] = [
  wh('Pazartesi','monday','06:00','23:00'), wh('Salı','tuesday','06:00','23:00'),
  wh('Çarşamba','wednesday','06:00','23:00'), wh('Perşembe','thursday','06:00','23:00'),
  wh('Cuma','friday','06:00','23:00'), wh('Cumartesi','saturday','08:00','22:00'),
  wh('Pazar','sunday','08:00','20:00'),
]

// ═══ REVIEW TEMPLATES ═══

export const REVIEWS_5_STAR: DemoReview[] = [
  { name: 'Mehmet K.', text: 'Harika bir deneyim, çok memnun kaldım. Kesinlikle tavsiye ederim!', rating: 5, date: '2 hafta önce' },
  { name: 'Ayşe T.', text: 'Çok profesyonel ve ilgili. Her zaman tercihim.', rating: 5, date: '1 ay önce' },
  { name: 'Ali V.', text: 'Fiyat-performans oranı mükemmel. Kaliteli hizmet.', rating: 5, date: '3 hafta önce' },
  { name: 'Zeynep D.', text: 'Temiz, düzenli ve güler yüzlü personel. Teşekkürler!', rating: 5, date: '1 hafta önce' },
  { name: 'Can E.', text: 'Yıllardır geliyorum, hiç hayal kırıklığına uğramadım.', rating: 5, date: '2 ay önce' },
]

export const REVIEWS_4_STAR: DemoReview[] = [
  { name: 'Burak S.', text: 'Genel olarak memnunum, küçük iyileştirmeler olabilir.', rating: 4, date: '1 ay önce' },
  { name: 'Selin A.', text: 'İyi hizmet ama randevu saatinde biraz bekleme oldu.', rating: 4, date: '3 hafta önce' },
]

export const DEFAULT_REVIEWS = [...REVIEWS_5_STAR, ...REVIEWS_4_STAR]
