import type { TicketCategory, TicketPriority } from '@kepenk/support'

export interface TalepKategoriMeta {
  id: TicketCategory
  etiket: string
  aciklama: string
  ikon: string  // DestekIkon key name
}

export const TALEP_KATEGORILERI: TalepKategoriMeta[] = [
  { id: 'billing', etiket: 'Ödeme & Fatura', aciklama: 'Ödeme sorunları, fatura talepleri, paket değişikliği', ikon: 'credit' },
  { id: 'technical', etiket: 'Teknik Sorun', aciklama: 'Site yüklenmesi, editör hataları, domain sorunları', ikon: 'wrench' },
  { id: 'bug', etiket: 'Hata Bildirimi', aciklama: 'Beklenmedik davranışlar ve hatalar', ikon: 'alert' },
  { id: 'feature_request', etiket: 'Özellik Talebi', aciklama: 'Yeni özellik önerileri ve geliştirme istekleri', ikon: 'lightbulb' },
  { id: 'account', etiket: 'Hesap İşlemleri', aciklama: 'Giriş sorunları, hesap ayarları, bilgi güncelleme', ikon: 'key' },
  { id: 'other', etiket: 'Diğer', aciklama: 'Diğer konular ve genel sorular', ikon: 'help' },
]

// Keywords that auto-escalate ticket priority
export const ONCELIK_ANAHTAR_KELIMELER: Record<string, TicketPriority> = {
  // P1 — Kritik
  'ödeme başarılı site yok': 'P1',
  'param gitti': 'P1',
  'hesabım silindi': 'P1',
  'veri kaybı': 'P1',
  // P2 — Yüksek
  'ödeme başarısız': 'P2',
  'giriş yapamıyorum': 'P2',
  'site açılmıyor': 'P2',
  'whatsapp çalışmıyor': 'P2',
  'üretim devam ediyor': 'P2',
  'otp gelmiyor': 'P2',
  // P3 — Orta (default)
}

export function oncelikBelirle(konu: string, aciklama: string): TicketPriority {
  const metin = `${konu} ${aciklama}`.toLowerCase()
  for (const [anahtar, oncelik] of Object.entries(ONCELIK_ANAHTAR_KELIMELER)) {
    if (metin.includes(anahtar)) return oncelik
  }
  return 'P3'
}

export const DURUM_ETIKETLERI: Record<string, { etiket: string; renk: string }> = {
  open: { etiket: 'Açık', renk: 'bg-green-100 text-green-700' },
  assigned: { etiket: 'Atandı', renk: 'bg-violet-100 text-violet-700' },
  in_progress: { etiket: 'İşleniyor', renk: 'bg-blue-100 text-blue-700' },
  waiting_customer: { etiket: 'Yanıt Bekleniyor', renk: 'bg-amber-100 text-amber-700' },
  resolved: { etiket: 'Çözüldü', renk: 'bg-emerald-100 text-emerald-700' },
  closed: { etiket: 'Kapatıldı', renk: 'bg-gray-100 text-gray-600' },
}

export const ONCELIK_ETIKETLERI: Record<TicketPriority, { etiket: string; renk: string }> = {
  P1: { etiket: 'Kritik', renk: 'bg-red-100 text-red-700' },
  P2: { etiket: 'Yüksek', renk: 'bg-orange-100 text-orange-700' },
  P3: { etiket: 'Orta', renk: 'bg-blue-100 text-blue-700' },
  P4: { etiket: 'Düşük', renk: 'bg-gray-100 text-gray-600' },
}
