/**
 * aiUrunAsistani.ts — AI Ürün Asistanı (kepenk.ai zekasıyla)
 * 
 * Shopify/WooCommerce'da YOK. Antigravity'de native.
 * 
 * Özellikler:
 * - Ürün açıklaması üretici (SEO + dönüşüm odaklı, A/B test)
 * - Fiyat optimizasyon asistanı
 * - SEO meta üretici (başlık + description + etiketler)
 */

// ─── Tipler ────────────────────────────────────────────────────────────

export type Ton = 'formal' | 'casual' | 'luxury' | 'technical'

export interface UrunAciklamaIstek {
  productName: string
  category: string
  features: string[]
  tone: Ton
  targetAudience?: string
  seoKeywords?: string[]
}

export interface UrunAciklamaSonuc {
  aciklama: string
  kisaAciklama: string
  metaTitle: string
  metaDescription: string
  altText: string
  alternatifAciklama: string  // A/B test versiyon B
  etiketler: string[]
}

export interface FiyatOneriIstek {
  productName: string
  costPrice: number           // kuruş — maliyet
  category: string
  competitorPrices?: number[] // kuruş
  currentConversionRate?: number
}

export interface FiyatOneriSonuc {
  oneriFiyat: number          // kuruş
  minFiyat: number
  maxFiyat: number
  marjOrani: number           // yüzde
  aciklama: string
  rekabetAnalizi: string
}

// ─── AI Ürün Açıklaması Üretici ───────────────────────────────────────

const TON_REHBER: Record<Ton, string> = {
  formal: 'Profesyonel, güven verici, teknik detaylı',
  casual: 'Samimi, sıcak, konuşma dili, emoji kullanımı',
  luxury: 'Lüks, sofistike, premium hissi veren, zarif',
  technical: 'Teknik spesifikasyonlar ön planda, karşılaştırmalı',
}

export async function urunAciklamasiUret(istek: UrunAciklamaIstek): Promise<UrunAciklamaSonuc> {
  const { productName, category, features, tone, targetAudience, seoKeywords } = istek

  // Gerçek projede Claude API ile çağrılacak
  // Şimdilik algoritmik üretim
  const ozelliklerStr = features.join(', ')
  const tonRehber = TON_REHBER[tone]
  const hedefKitle = targetAudience || 'genel tüketici'
  const anahtar = seoKeywords?.join(', ') || category

  const aciklama = tone === 'luxury'
    ? `${productName} — üstün kalite ve zarafetin buluştuğu özel koleksiyon. ${ozelliklerStr} özelliklerini bir araya getiren benzersiz bir ürün. ${hedefKitle} için tasarlandı. Ayrıcalıklı bir deneyim sizi bekliyor.`
    : tone === 'casual'
    ? `Hey! ${productName} tam sana göre! 🎉 ${ozelliklerStr} — hepsi bir arada. ${category} kategorisinin en sevileni. Hemen sepete ekle, pişman olmazsın! 🛒`
    : tone === 'technical'
    ? `${productName} Teknik Özellikleri: ${ozelliklerStr}. ${category} segmentinde üstün performans sunan bu ürün, ${hedefKitle} ihtiyaçlarını karşılamak üzere tasarlanmıştır. Detaylı spesifikasyonlar için ürün sayfasını inceleyiniz.`
    : `${productName}, ${category} kategorisinde öne çıkan bir üründür. ${ozelliklerStr} özelliklerine sahip bu ürün, ${hedefKitle} için ideal bir seçimdir. Kaliteli malzeme ve özenli üretim ile uzun ömürlü kullanım sunar.`

  const kisaAciklama = `${productName} — ${features.slice(0, 3).join(', ')}. ${category} kategorisinin en iyisi.`

  const metaTitle = `${productName} | ${features[0] || ''} | ${category} - kepenk.ai`.slice(0, 60)
  const metaDescription = `${productName}: ${ozelliklerStr}. ${category} kategorisinde en iyi fiyat ve hızlı kargo. Hemen inceleyin!`.slice(0, 160)
  const altText = `${productName} - ${category} ürünü`

  const alternatifAciklama = tone === 'casual'
    ? `${productName} — ${category} dünyasının yıldızı! ${features.slice(0, 2).join(' ve ')} ile fark yaratın. Hızlı kargo + kolay iade.`
    : `Yeni ${productName}! ${ozelliklerStr} avantajlarıyla ${hedefKitle} için geliştirildi. Sınırlı stok.`

  const etiketler = [
    category.toLowerCase(),
    ...features.map(f => f.toLowerCase().replace(/\s+/g, '-')),
    ...(seoKeywords || []).map(k => k.toLowerCase()),
    productName.split(' ')[0].toLowerCase(),
  ].slice(0, 10)

  return { aciklama, kisaAciklama, metaTitle, metaDescription, altText, alternatifAciklama, etiketler }
}

// ─── Fiyat Optimizasyon Asistanı ──────────────────────────────────────

export function fiyatOnerisiHesapla(istek: FiyatOneriIstek): FiyatOneriSonuc {
  const { costPrice, competitorPrices, currentConversionRate } = istek

  // Maliyet bazlı fiyatlandırma
  const minMarj = 1.3  // %30 minimum marj
  const idealMarj = 1.6 // %60 ideal marj
  const maxMarj = 2.5   // %150 max marj

  let oneriFiyat: number
  let rekabetAnalizi: string

  if (competitorPrices && competitorPrices.length > 0) {
    // Rakip fiyat varsa — rekabetçi strateji
    const ortRakip = competitorPrices.reduce((a, b) => a + b, 0) / competitorPrices.length
    const minRakip = Math.min(...competitorPrices)
    const maxRakip = Math.max(...competitorPrices)

    // Rakip ortalamasının %5 altı (agresif) ile %10 üstü (premium) arası
    const rekabetciFiyat = Math.round(ortRakip * 0.95)
    const premiumFiyat = Math.round(ortRakip * 1.1)

    // Marj kontrolü
    oneriFiyat = Math.max(Math.round(costPrice * minMarj), rekabetciFiyat)

    rekabetAnalizi = `Rakip aralığı: ${(minRakip / 100).toFixed(2)}₺ - ${(maxRakip / 100).toFixed(2)}₺ (ort: ${(ortRakip / 100).toFixed(2)}₺). Önerilen fiyat rakip ortalamasının ${oneriFiyat < ortRakip ? 'altında' : 'üstünde'}.`
  } else {
    // Rakip yok → maliyet + marj
    oneriFiyat = Math.round(costPrice * idealMarj)
    rekabetAnalizi = 'Rakip verisi yok, maliyet bazlı fiyatlandırma uygulandı.'
  }

  // Dönüşüm oranına göre ayarlama
  if (currentConversionRate !== undefined) {
    if (currentConversionRate < 1) {
      oneriFiyat = Math.round(oneriFiyat * 0.92) // Düşük dönüşüm → fiyat düşür
      rekabetAnalizi += ' Dönüşüm oranı düşük, fiyat %8 aşağı çekildi.'
    } else if (currentConversionRate > 5) {
      oneriFiyat = Math.round(oneriFiyat * 1.08) // Yüksek dönüşüm → fiyat artır
      rekabetAnalizi += ' Dönüşüm oranı yüksek, fiyat %8 yukarı çekildi.'
    }
  }

  const marjOrani = Math.round(((oneriFiyat - costPrice) / costPrice) * 100)

  return {
    oneriFiyat,
    minFiyat: Math.round(costPrice * minMarj),
    maxFiyat: Math.round(costPrice * maxMarj),
    marjOrani,
    aciklama: `Maliyet: ${(costPrice / 100).toFixed(2)}₺ → Önerilen: ${(oneriFiyat / 100).toFixed(2)}₺ (marj: %${marjOrani})`,
    rekabetAnalizi,
  }
}

// ─── SEO İçerik Üretici ───────────────────────────────────────────────

export function seoIcerikUret(params: {
  productName: string; category: string; features: string[]
}): {
  baslik: string; metaDescription: string; slug: string; etiketler: string[]
} {
  const { productName, category, features } = params

  const baslik = `${productName} - ${features[0] || category} | Hızlı Kargo`.slice(0, 70)
  const metaDescription = `${productName}: ${features.join(', ')}. ${category} kategorisinde en iyi fiyat garantisi. Aynı gün kargo, kolay iade.`.slice(0, 160)

  const slug = productName.toLowerCase()
    .replace(/[ğ]/g, 'g').replace(/[ü]/g, 'u').replace(/[ş]/g, 's')
    .replace(/[ı]/g, 'i').replace(/[ö]/g, 'o').replace(/[ç]/g, 'c')
    .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-')

  const etiketler = [
    category, ...features,
    `${productName} fiyat`, `${productName} satın al`,
    `${category} online`, 'hızlı kargo', 'güvenli ödeme',
  ].map(t => t.toLowerCase()).slice(0, 15)

  return { baslik, metaDescription, slug, etiketler }
}
