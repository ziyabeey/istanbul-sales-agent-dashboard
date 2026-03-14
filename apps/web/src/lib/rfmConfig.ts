export type RFMSegment =
  | 'champions'
  | 'loyal_customers'
  | 'potential_loyalists'
  | 'new_customers'
  | 'promising'
  | 'need_attention'
  | 'about_to_sleep'
  | 'at_risk'
  | 'cant_lose'
  | 'hibernating'
  | 'lost'

export const SEGMENT_DETAY: Record<RFMSegment, { label: string; renk: string; aciklama: string; ikon: string }> = {
  champions:           { label: 'Şampiyonlar', renk: '#22c55e', aciklama: 'En sık ve en çok harcayan müşteriler', ikon: '🏆' },
  loyal_customers:     { label: 'Sadık Müşteriler', renk: '#3b82f6', aciklama: 'Düzenli alışveriş yapan müşteriler', ikon: '💎' },
  potential_loyalists: { label: 'Potansiyel Sadık', renk: '#06b6d4', aciklama: 'Yeni ama yüksek potansiyelli müşteriler', ikon: '🌟' },
  new_customers:       { label: 'Yeni Müşteriler', renk: '#8b5cf6', aciklama: 'İlk kez alışveriş yapmış müşteriler', ikon: '🆕' },
  promising:           { label: 'Umut Veren', renk: '#a855f7', aciklama: 'Son zamanlarda aktif, düşük harcama', ikon: '📈' },
  need_attention:      { label: 'İlgi Gerekiyor', renk: '#f59e0b', aciklama: 'Eskiden aktif, şimdi azalan müşteriler', ikon: '⚠️' },
  about_to_sleep:      { label: 'Uyumak Üzere', renk: '#f97316', aciklama: 'Uzun süredir alışveriş yapmamış', ikon: '😴' },
  at_risk:             { label: 'Risk Altında', renk: '#ef4444', aciklama: 'Kaybetme riski yüksek değerli müşteriler', ikon: '🚨' },
  cant_lose:           { label: 'Kaybetmemeliyiz', renk: '#dc2626', aciklama: 'Yüksek değerli ama uzaklaşan müşteriler', ikon: '💔' },
  hibernating:         { label: 'Hareketsiz', renk: '#6b7280', aciklama: 'Çok uzun süredir pasif müşteriler', ikon: '❄️' },
  lost:                { label: 'Kayıp', renk: '#374151', aciklama: 'Geri dönme olasılığı düşük', ikon: '👻' },
}
