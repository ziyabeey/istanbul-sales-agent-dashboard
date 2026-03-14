/**
 * googleMerchant.ts — Google Merchant Center & Google Ads Entegrasyonu
 * 
 * Kapsamlar:
 * 1. Google Shopping XML Feed (Merchant Center)
 * 2. Content API — Realtime ürün sync
 * 3. Enhanced Conversions — Server-side dönüşüm verisi
 * 4. Kampanya tipleri: Shopping, Performance Max, Dynamic Remarketing
 */

import crypto from 'crypto'
import type { Urun } from '@/types/eticaret'

// ─── Google Shopping XML Feed ──────────────────────────────────────────

export function googleShoppingFeedXML(
  urunler: Urun[],
  magazaUrl: string,
  magazaAd: string
): string {
  const items = urunler
    .filter(u => u.durum === 'aktif' && u.gorseller.length > 0)
    .map(u => {
      const fiyat = (u.fiyat / 100).toFixed(2)
      const karsFiyat = u.karsilastirmaFiyat ? (u.karsilastirmaFiyat / 100).toFixed(2) : null
      const stokDurum = u.stok.miktar > 0 ? 'in_stock' : 'out_of_stock'
      const agirlik = u.kargo?.agirlik ? `${(u.kargo.agirlik / 1000).toFixed(2)} kg` : ''

      return `
    <item>
      <g:id>${u.id}</g:id>
      <title><![CDATA[${u.ad}]]></title>
      <description><![CDATA[${u.kisaAciklama || u.aciklama || u.ad}]]></description>
      <link>${magazaUrl}/urun/${u.slug}</link>
      <g:image_link>${u.gorseller[0]}</g:image_link>
      ${u.gorseller.slice(1, 10).map(g => `<g:additional_image_link>${g}</g:additional_image_link>`).join('\n      ')}
      <g:availability>${stokDurum}</g:availability>
      <g:price>${karsFiyat || fiyat} TRY</g:price>
      ${karsFiyat ? `<g:sale_price>${fiyat} TRY</g:sale_price>` : ''}
      <g:brand><![CDATA[${u.marka || magazaAd}]]></g:brand>
      <g:condition>new</g:condition>
      ${u.gtin ? `<g:gtin>${u.gtin}</g:gtin>` : ''}
      ${u.sku ? `<g:mpn>${u.sku}</g:mpn>` : ''}
      ${!u.gtin && !u.sku ? '<g:identifier_exists>false</g:identifier_exists>' : ''}
      ${u.googleUrunKategori ? `<g:google_product_category>${u.googleUrunKategori}</g:google_product_category>` : ''}
      ${u.kategoriler.length ? `<g:product_type><![CDATA[${u.kategoriler.join(' > ')}]]></g:product_type>` : ''}
      ${agirlik ? `<g:shipping_weight>${agirlik}</g:shipping_weight>` : ''}
      <g:tax>
        <g:country>TR</g:country>
        <g:rate>${u.kdvOrani}</g:rate>
        <g:tax_ship>yes</g:tax_ship>
      </g:tax>
    </item>`
    }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${magazaAd} — Google Shopping Feed</title>
    <link>${magazaUrl}</link>
    <description>${magazaAd} ürün listesi</description>
${items}
  </channel>
</rss>`
}

// ─── Enhanced Conversions (Server-Side) ────────────────────────────────

export interface GadsConversionEvent {
  conversionAction: string
  conversionDateTime: string
  conversionValue: number
  currencyCode: string
  orderId: string
  userIdentifiers: {
    hashedEmail?: string
    hashedPhoneNumber?: string
    addressInfo?: {
      hashedFirstName?: string
      hashedLastName?: string
      city?: string
      countryCode: string
    }
  }[]
}

function sha256(val: string): string {
  return crypto.createHash('sha256').update(val.toLowerCase().trim()).digest('hex')
}

export function enhancedConversionOlustur(params: {
  conversionAction: string
  toplamTRY: number
  siparisId: string
  musteriEmail?: string
  musteriTelefon?: string
  musteriAd?: string
  musteriSoyad?: string
  sehir?: string
}): GadsConversionEvent {
  const identifiers: GadsConversionEvent['userIdentifiers'][0] = {}

  if (params.musteriEmail) identifiers.hashedEmail = sha256(params.musteriEmail)
  if (params.musteriTelefon) identifiers.hashedPhoneNumber = sha256(params.musteriTelefon.replace(/\D/g, ''))
  if (params.musteriAd || params.sehir) {
    identifiers.addressInfo = {
      countryCode: 'TR',
      ...(params.musteriAd && { hashedFirstName: sha256(params.musteriAd) }),
      ...(params.musteriSoyad && { hashedLastName: sha256(params.musteriSoyad) }),
      ...(params.sehir && { city: params.sehir }),
    }
  }

  return {
    conversionAction: params.conversionAction,
    conversionDateTime: new Date().toISOString().replace('T', ' ').replace('Z', '+03:00'),
    conversionValue: params.toplamTRY,
    currencyCode: 'TRY',
    orderId: params.siparisId,
    userIdentifiers: [identifiers],
  }
}

// ─── Kampanya Şablonları ───────────────────────────────────────────────

export interface GoogleKampanyaSablon {
  id: string
  ad: string
  aciklama: string
  tip: 'shopping' | 'pmax' | 'remarketing' | 'search'
  ayarlar: Record<string, any>
  butce: { gunlukMin: number; onerilen: number }
}

export const GOOGLE_KAMPANYA_SABLONLARI: GoogleKampanyaSablon[] = [
  {
    id: 'shopping-standart',
    ad: 'Standart Shopping Kampanyası',
    aciklama: 'Google Alışveriş sonuçlarında ürün görselleriyle görünün',
    tip: 'shopping',
    ayarlar: { merchantCenter: true, bidStrategy: 'maximizeClicks', targetRoas: null },
    butce: { gunlukMin: 5000, onerilen: 20000 },
  },
  {
    id: 'pmax-satis',
    ad: 'Performance Max — Satış Odaklı',
    aciklama: 'Tüm Google kanallarında (Search, Display, YouTube, GMail, Maps) otomatik optimizasyon',
    tip: 'pmax',
    ayarlar: { goals: ['PURCHASE'], assetGroups: true, targetRoas: 400 },
    butce: { gunlukMin: 10000, onerilen: 50000 },
  },
  {
    id: 'remarketing-dinamik',
    ad: 'Dinamik Remarketing',
    aciklama: 'Sitenizi ziyaret eden kullanıcılara kişiselleştirilmiş ürün reklamları',
    tip: 'remarketing',
    ayarlar: { feedBased: true, audienceDays: 30, excludePurchasers: true },
    butce: { gunlukMin: 5000, onerilen: 15000 },
  },
  {
    id: 'search-marka',
    ad: 'Marka Koruma Arama Kampanyası',
    aciklama: 'Marka adınız aratıldığında en üstte çıkın',
    tip: 'search',
    ayarlar: { keywords: ['marka'], matchType: 'PHRASE', negativeKeywords: ['ücretsiz', 'indir'] },
    butce: { gunlukMin: 3000, onerilen: 10000 },
  },
]

// ─── Schema.org JSON-LD (SEO) ──────────────────────────────────────────

export function urunSchemaJsonLD(urun: Urun, magazaUrl: string, magazaAd: string): string {
  const fiyat = (urun.fiyat / 100).toFixed(2)

  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: urun.ad,
    description: urun.kisaAciklama || urun.aciklama,
    image: urun.gorseller,
    sku: urun.sku || urun.id,
    brand: { '@type': 'Brand', name: urun.marka || magazaAd },
    ...(urun.gtin && { gtin13: urun.gtin }),
    offers: {
      '@type': 'Offer',
      url: `${magazaUrl}/urun/${urun.slug}`,
      priceCurrency: 'TRY',
      price: fiyat,
      availability: urun.stok.miktar > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: magazaAd },
      ...(urun.karsilastirmaFiyat && {
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: fiyat,
          priceCurrency: 'TRY',
          referenceQuantity: { '@type': 'QuantitativeValue', value: 1 },
        },
      }),
    },
  }

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
}
