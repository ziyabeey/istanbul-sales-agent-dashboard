/**
 * kepenk.ai — Stratejik Sabitler (AI Agent Context)
 * ═══════════════════════════════════════════════════
 * AI agent'ların (WhatsApp rep, site builder, iş zekası)
 * müşteri etkileşimlerinde kullandığı stratejik context.
 */

import { KONUMLANDIRMA, SEKTOR_ONCELIKLENDIRME } from '@/data/pazarVerileri'

// ══════════════════════════════════════════
// AI AGENT SYSTEM PROMPT FRAGMENTS
// ══════════════════════════════════════════

/**
 * WhatsApp AI müşteri temsilcisinin rakip sorusu geldiğinde kullanacağı cevap şablonları.
 * Prompt injection'a karşı korumalı — doğrudan kullanıcıya gösterilmez.
 */
export const RAKIP_CEVAP_SABLONLARI: Record<string, string> = {
  ikas: `kepenk.ai, ikas'tan farklı olarak sadece online mağaza değil, işletmenizin tamamını yönetir. Web sitesi, randevu, POS, CRM, WhatsApp AI — hepsi tek abonelik. ikas'ta ayrı ayrı alamayacağınız tüm araçları kepenk.ai tek platformda sunar.`,

  adisyo: `kepenk.ai'nin restoran modülü, Adisyo'nun sunduğu POS ve adisyon özelliklerinin yanında web sitesi, online sipariş, QR menü, WhatsApp AI müşteri yönetimi, sadakat programı ve pazarlama araçlarını da sunar. Restoran yönetimi + dijital varlık = tek platform.`,

  wix: `kepenk.ai, Wix'ten farklı olarak tamamen Türkçe çalışır. iyzico/PayTR ile taksitli ödeme, Yurtiçi/Aras kargo, e-Fatura, ve WhatsApp AI müşteri temsilcisi sunar. Wix bunların hiçbirini yerli olarak sunmaz.`,

  shopify: `Shopify ayda en az ₺1,500 tutar ve Türkiye'de ödeme, kargo, fatura entegrasyonu yetersizdir. kepenk.ai ₺999'dan başlar, tüm Türk altyapısıyla entegredir ve WhatsApp üzerinden yönetilir.`,

  genel: `kepenk.ai, Türkiye'nin esnafları için tasarlanmış tek hepsi-bir-arada platformdur. Web sitesi, e-ticaret, randevu, POS, CRM ve pazarlama — tek abonelik, tek uygulama, tamamen Türkçe. Rakiplerde bunların hepsini ayrı ayrı alırsınız.`,
}

/**
 * AI site builder'ın sektöre göre vurgulaması gereken özellikler.
 */
export const SEKTOR_VURGULARI: Record<string, string[]> = {
  berber: ['Online randevu sistemi', 'WhatsApp randevu hatırlatma', 'Sadakat kartı (10 tıraş = 1 bedava)', 'Google Reviews otomasyonu'],
  kuafor: ['Online randevu + hizmet kataloğu', 'Çalışan takvimi', 'WhatsApp kampanya', 'Müşteri tercihleri CRM'],
  restoran: ['QR dijital menü', 'Online sipariş', 'Mutfak ekranı (KDS)', 'Stok/reçete maliyet takibi', 'Masa yönetimi'],
  kafe: ['QR menü + online sipariş', 'Sadakat programı (stamp kart)', 'Instagram entegrasyonu', 'Mevsimsel menü önerileri'],
  doktor: ['Hasta randevu sistemi', 'SMS/WhatsApp hatırlatma', 'Hasta bilgi formu', 'Randevu takvimleri'],
  dis_hekimi: ['Online randevu', 'Tedavi fotoğrafları galerisi', 'Hasta takip', 'WhatsApp bildirim'],
  oto_tamir: ['Servis randevusu', 'İş takip sistemi', 'WhatsApp ile durum bildirimi', 'Fiyat teklifi oluşturma'],
  spor_salonu: ['Üyelik yönetimi', 'Ders/PT randevusu', 'QR giriş', 'Ödeme takibi'],
  fotografci: ['Portfolyo galerisi', 'Çekim randevusu', 'Paket fiyatlandırma', 'Online albüm paylaşımı'],
  eczane: ['Ürün kataloğu', 'İlaç hazırlık bildirimi', 'WhatsApp sipariş', 'Sağlık blog'],
}

/**
 * Mevsimsel kampanya AI önerileri için sektör-spesifik takvim.
 */
export const MEVSIMSEL_KAMPANYA_ONERILERI: Record<string, { event: string; kampanyaFikri: string }[]> = {
  berber: [
    { event: 'Ramazan Bayramı', kampanyaFikri: 'Bayram tıraşı kampanyası — %20 indirim veya bedava sakal bakımı' },
    { event: 'Okul Açılışı', kampanyaFikri: 'Öğrenci tıraşı kampanyası — ₺100\'den başlayan fiyatlar' },
    { event: 'Yılbaşı', kampanyaFikri: 'Yeni yıl bakım paketi — tıraş + sakal + cilt bakımı set fiyat' },
  ],
  restoran: [
    { event: 'Sevgililer Günü', kampanyaFikri: 'Çift menüsü — mum ışığında akşam yemeği set fiyat' },
    { event: 'Ramazan', kampanyaFikri: 'İftar menüsü — aile boyu özel fiyat + su/tatlı dahil' },
    { event: 'Anneler Günü', kampanyaFikri: 'Anne ile brunch — annelere özel hediye + çocuk menüsü bedava' },
  ],
  kuafor: [
    { event: 'Sevgililer Günü', kampanyaFikri: 'Sevgiliye güzellik hediye kartı — ₺500 karta ₺600 değer' },
    { event: 'Düğün Sezonu', kampanyaFikri: 'Gelin paketi erken rezervasyon — %15 indirim' },
    { event: 'Yılbaşı', kampanyaFikri: 'Yeni yıl saç rengi kampanyası — ombre/balayaj özel fiyat' },
  ],
}

/**
 * AI iş danışmanı için sektör benchmark verileri.
 * Cross-esnaf anonim veriden türetilecek — başlangıç için endüstri ortalamaları.
 */
export const SEKTOR_BENCHMARKLARI: Record<string, { metrik: string; ortalama: string; iyi: string; harika: string }[]> = {
  berber: [
    { metrik: 'Günlük müşteri sayısı', ortalama: '8-12', iyi: '15-20', harika: '20+' },
    { metrik: 'Ortalama harcama', ortalama: '₺80-120', iyi: '₺150-200', harika: '₺250+' },
    { metrik: 'Randevu doluluk oranı', ortalama: '%50', iyi: '%70', harika: '%85+' },
    { metrik: 'WhatsApp yanıt süresi', ortalama: '2 saat', iyi: '30 dk', harika: '<5 dk (AI)' },
  ],
  restoran: [
    { metrik: 'Masa devir hızı (öğle)', ortalama: '1.5x', iyi: '2.5x', harika: '3.5x' },
    { metrik: 'Ortalama adisyon', ortalama: '₺150-250', iyi: '₺300-500', harika: '₺500+' },
    { metrik: 'Food cost oranı', ortalama: '%35', iyi: '%30', harika: '%25' },
    { metrik: 'Online sipariş oranı', ortalama: '%10', iyi: '%25', harika: '%40+' },
  ],
}

// ══════════════════════════════════════════
// HELPER: AI Prompt Fragment Builder
// ══════════════════════════════════════════

/**
 * AI agent'a verilecek stratejik context'i oluşturur.
 * @param sektor - Esnafın sektörü
 * @param rakipSorgusu - Müşterinin sorduğu rakip (varsa)
 */
export function getStrategicContext(sektor?: string, rakipSorgusu?: string): string {
  const parts: string[] = []

  parts.push(`## kepenk.ai Konumlandırma\n${KONUMLANDIRMA.positioningStatement}`)

  if (sektor && SEKTOR_VURGULARI[sektor]) {
    parts.push(`\n## ${sektor} Sektörü İçin Öne Çıkan Özellikler\n${SEKTOR_VURGULARI[sektor].map(f => `- ${f}`).join('\n')}`)
  }

  if (rakipSorgusu) {
    const key = rakipSorgusu.toLowerCase().replace(/\s/g, '')
    const cevap = RAKIP_CEVAP_SABLONLARI[key] || RAKIP_CEVAP_SABLONLARI.genel
    parts.push(`\n## Rakip Karşılaştırma\n${cevap}`)
  }

  if (sektor) {
    const faz = SEKTOR_ONCELIKLENDIRME.faz1.sektorler.some(s => s.toLowerCase().includes(sektor))
      ? SEKTOR_ONCELIKLENDIRME.faz1
      : SEKTOR_ONCELIKLENDIRME.faz2.sektorler.some(s => s.toLowerCase().includes(sektor))
        ? SEKTOR_ONCELIKLENDIRME.faz2
        : SEKTOR_ONCELIKLENDIRME.faz3
    parts.push(`\n## Sektör Önceliği: ${faz.donem}`)
  }

  return parts.join('\n')
}
