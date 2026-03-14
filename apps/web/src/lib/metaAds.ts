/**
 * metaAds.ts — Meta (Facebook/Instagram) Reklam Entegrasyonu
 * 
 * Kapsamlar:
 * 1. Meta Pixel — Client-side olay takibi (PageView, ViewContent, AddToCart, Purchase)
 * 2. Conversions API (CAPI) — Server-side olay gönderimi (iOS14+ zorunlu)
 * 3. Catalog API — Ürün kataloğu senkronizasyonu
 * 4. Kampanya Şablonları — Retargeting, Lookalike, DPA
 */

import crypto from 'crypto'
import type { Urun } from '@/types/eticaret'

// ─── Meta Pixel Script Üreteci ─────────────────────────────────────────

export function metaPixelScript(pixelId: string): string {
  return `
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixelId}');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1"/></noscript>
<!-- End Meta Pixel Code -->`.trim()
}

export function metaPixelEvent(eventName: string, params?: Record<string, any>): string {
  const paramsStr = params ? `, ${JSON.stringify(params)}` : ''
  return `fbq('track', '${eventName}'${paramsStr});`
}

// ─── Conversions API (Server-Side) ─────────────────────────────────────

const META_GRAPH_URL = 'https://graph.facebook.com/v18.0'

export interface CAPIEvent {
  event_name: 'ViewContent' | 'AddToCart' | 'InitiateCheckout' | 'Purchase' | 'Search' | 'Lead'
  event_time: number
  event_source_url: string
  action_source: 'website'
  user_data: {
    em?: string[]        // SHA256 hashed email
    ph?: string[]        // SHA256 hashed phone
    fn?: string[]        // SHA256 hashed first name
    ln?: string[]        // SHA256 hashed last name
    ct?: string[]        // SHA256 hashed city
    client_ip_address?: string
    client_user_agent?: string
    fbc?: string         // _fbc cookie
    fbp?: string         // _fbp cookie
  }
  custom_data?: {
    currency?: string
    value?: number
    content_ids?: string[]
    content_type?: string
    content_name?: string
    contents?: { id: string; quantity: number; item_price: number }[]
    num_items?: number
    order_id?: string
  }
}

function sha256Hash(value: string): string {
  return crypto.createHash('sha256').update(value.toLowerCase().trim()).digest('hex')
}

export function hashUserData(data: {
  email?: string; telefon?: string; ad?: string; soyad?: string; sehir?: string
}): CAPIEvent['user_data'] {
  const result: CAPIEvent['user_data'] = {}
  if (data.email) result.em = [sha256Hash(data.email)]
  if (data.telefon) result.ph = [sha256Hash(data.telefon.replace(/\D/g, ''))]
  if (data.ad) result.fn = [sha256Hash(data.ad)]
  if (data.soyad) result.ln = [sha256Hash(data.soyad)]
  if (data.sehir) result.ct = [sha256Hash(data.sehir)]
  return result
}

export async function capiGonder(
  pixelId: string,
  accessToken: string,
  events: CAPIEvent[]
): Promise<{ basarili: boolean; eventsSent: number; hataMesaji?: string }> {
  try {
    const response = await fetch(`${META_GRAPH_URL}/${pixelId}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: events,
        access_token: accessToken,
      }),
    })

    const result = await response.json()

    if (result.events_received) {
      return { basarili: true, eventsSent: result.events_received }
    }

    return { basarili: false, eventsSent: 0, hataMesaji: result.error?.message || 'CAPI hatası' }
  } catch (err: any) {
    return { basarili: false, eventsSent: 0, hataMesaji: err.message }
  }
}

// ─── Server Purchase Event (Sipariş sonrası) ──────────────────────────

export async function purchaseEventGonder(
  pixelId: string,
  accessToken: string,
  siparis: {
    siparisId: string
    toplamTRY: number
    items: { id: string; adet: number; fiyatTRY: number }[]
    musteriEmail?: string
    musteriTelefon?: string
    musteriAd?: string
    ip?: string
    userAgent?: string
    sourceUrl?: string
  }
): Promise<boolean> {
  const event: CAPIEvent = {
    event_name: 'Purchase',
    event_time: Math.floor(Date.now() / 1000),
    event_source_url: siparis.sourceUrl || '',
    action_source: 'website',
    user_data: {
      ...hashUserData({
        email: siparis.musteriEmail,
        telefon: siparis.musteriTelefon,
        ad: siparis.musteriAd,
      }),
      client_ip_address: siparis.ip,
      client_user_agent: siparis.userAgent,
    },
    custom_data: {
      currency: 'TRY',
      value: siparis.toplamTRY,
      content_type: 'product',
      content_ids: siparis.items.map(i => i.id),
      contents: siparis.items.map(i => ({
        id: i.id,
        quantity: i.adet,
        item_price: i.fiyatTRY,
      })),
      num_items: siparis.items.reduce((t, i) => t + i.adet, 0),
      order_id: siparis.siparisId,
    },
  }

  const sonuc = await capiGonder(pixelId, accessToken, [event])
  return sonuc.basarili
}

// ─── Meta Katalog XML Feed Üreteci ─────────────────────────────────────

export function metaKatalogXML(
  urunler: Urun[],
  magazaUrl: string,
  magazaAd: string
): string {
  const items = urunler
    .filter(u => u.durum === 'aktif' && u.gorseller.length > 0)
    .map(u => {
      const fiyat = (u.fiyat / 100).toFixed(2)
      const karsFiyat = u.karsilastirmaFiyat ? (u.karsilastirmaFiyat / 100).toFixed(2) : null
      return `
    <item>
      <g:id>${u.id}</g:id>
      <g:title><![CDATA[${u.ad}]]></g:title>
      <g:description><![CDATA[${u.kisaAciklama || u.aciklama || u.ad}]]></g:description>
      <g:link>${magazaUrl}/urun/${u.slug}</g:link>
      <g:image_link>${u.gorseller[0]}</g:image_link>
      ${u.gorseller.slice(1, 10).map(g => `<g:additional_image_link>${g}</g:additional_image_link>`).join('\n      ')}
      <g:availability>${u.stok.miktar > 0 ? 'in stock' : 'out of stock'}</g:availability>
      <g:price>${fiyat} TRY</g:price>
      ${karsFiyat ? `<g:sale_price>${fiyat} TRY</g:sale_price>` : ''}
      <g:brand><![CDATA[${u.marka || magazaAd}]]></g:brand>
      <g:condition>new</g:condition>
      ${u.gtin ? `<g:gtin>${u.gtin}</g:gtin>` : '<g:identifier_exists>no</g:identifier_exists>'}
      ${u.googleUrunKategori ? `<g:google_product_category>${u.googleUrunKategori}</g:google_product_category>` : ''}
      ${u.kategoriler.length ? `<g:product_type><![CDATA[${u.kategoriler.join(' > ')}]]></g:product_type>` : ''}
    </item>`
    }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${magazaAd} — Ürün Kataloğu</title>
    <link>${magazaUrl}</link>
    <description>${magazaAd} ürün kataloğu</description>
${items}
  </channel>
</rss>`
}

// ─── Kampanya Şablonları ───────────────────────────────────────────────

export interface KampanyaSablon {
  id: string
  ad: string
  aciklama: string
  tip: 'retargeting' | 'prospecting' | 'dpa' | 'lookalike'
  hedefleme: Record<string, any>
  butce: { gunlukMin: number; onerilen: number }
}

export const META_KAMPANYA_SABLONLARI: KampanyaSablon[] = [
  {
    id: 'terk-sepet',
    ad: 'Terk Sepet Retargeting',
    aciklama: 'Son 7 günde sepete ekleyip satın almayan kullanıcıları hedefler',
    tip: 'retargeting',
    hedefleme: { event: 'AddToCart', excludeEvent: 'Purchase', days: 7 },
    butce: { gunlukMin: 5000, onerilen: 15000 }, // kuruş
  },
  {
    id: 'urun-goruntuleme',
    ad: 'Ürün Görüntüleme Retargeting',
    aciklama: 'Son 14 günde ürün görüntüleyen ama satın almayan kullanıcılar',
    tip: 'retargeting',
    hedefleme: { event: 'ViewContent', excludeEvent: 'Purchase', days: 14 },
    butce: { gunlukMin: 5000, onerilen: 10000 },
  },
  {
    id: 'dpa-genisletme',
    ad: 'Dynamic Product Ads (DPA)',
    aciklama: 'Otomatik ürün görselli dinamik reklamlar',
    tip: 'dpa',
    hedefleme: { catalogSales: true, broadAudience: true },
    butce: { gunlukMin: 10000, onerilen: 30000 },
  },
  {
    id: 'lookalike-musteriler',
    ad: 'Lookalike — Benzer Müşteriler',
    aciklama: 'Mevcut müşterilerinize benzeyen yeni kitleleri hedefler',
    tip: 'lookalike',
    hedefleme: { source: 'purchaseCustomers', percent: 2 },
    butce: { gunlukMin: 15000, onerilen: 50000 },
  },
]
