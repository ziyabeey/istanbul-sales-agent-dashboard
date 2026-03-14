/**
 * dijitalUrun.ts — Dijital Ürün & Abonelik & Randevu
 * 
 * Shopify/WooCommerce'ın zayıf olduğu alan.
 * 
 * - Dijital: PDF, video, lisans → signed download URL (24h)
 * - Abonelik: haftalık/aylık/yıllık tekrarlayan
 * - Randevu: hizmet bazlı takvim (berber, klinik vb.)
 */

import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import crypto from 'crypto'

// ─── Dijital Ürün ─────────────────────────────────────────────────────

export type DijitalDosyaTip = 'pdf' | 'video' | 'audio' | 'zip' | 'lisans' | 'diger'

export interface DijitalUrun {
  urunId: string
  dosyaUrl: string           // Firebase Storage URL
  dosyaTip: DijitalDosyaTip
  dosyaBoyut: number         // byte
  indirmeLimiti: number      // 0 = sınırsız
  gecerlilikSaat: number     // download link süresi (default 24)
}

export interface IndirmeLink {
  url: string
  token: string
  olusturma: number
  bitisSuresi: number        // timestamp
  kullanilanAdet: number
  maxKullanim: number
}

export function indirmeLinkiOlustur(
  dosyaUrl: string,
  gecerlilikSaat: number = 24,
  maxKullanim: number = 5
): IndirmeLink {
  const token = crypto.randomBytes(32).toString('hex')
  const simdi = Date.now()

  return {
    url: `${dosyaUrl}?token=${token}`,
    token,
    olusturma: simdi,
    bitisSuresi: simdi + gecerlilikSaat * 60 * 60 * 1000,
    kullanilanAdet: 0,
    maxKullanim,
  }
}

export async function dijitalUrunTeslimEt(
  shopId: string, siparisId: string, urunId: string, dosyaUrl: string
): Promise<IndirmeLink> {
  const link = indirmeLinkiOlustur(dosyaUrl)

  if (adminDb) {
    await adminDb.collection('esnaflar').doc(shopId)
      .collection('dijitalTeslimler')
      .add({
        siparisId, urunId, ...link,
        tarih: Timestamp.now(),
      })
  }

  return link
}

// ─── Abonelik Sistemi ─────────────────────────────────────────────────

export type AbonelikPeriyot = 'haftalik' | 'aylik' | 'yillik'
export type AbonelikDurum = 'aktif' | 'duraklatildi' | 'iptal' | 'suresi_doldu'

export interface Abonelik {
  id: string
  shopId: string
  musteriId: string
  urunId: string
  periyot: AbonelikPeriyot
  fiyat: number              // kuruş
  durum: AbonelikDurum
  sonOdeme: any
  sonrakiOdeme: any
  baslamaTarih: any
  bitisTarih?: any
}

const PERIYOT_GUN: Record<AbonelikPeriyot, number> = {
  haftalik: 7, aylik: 30, yillik: 365,
}

export async function abonelikOlustur(
  shopId: string, musteriId: string, urunId: string,
  periyot: AbonelikPeriyot, fiyat: number
): Promise<string> {
  if (!adminDb) return ''

  const simdi = new Date()
  const sonrakiOdeme = new Date(simdi.getTime() + PERIYOT_GUN[periyot] * 24 * 60 * 60 * 1000)

  const ref = await adminDb.collection('esnaflar').doc(shopId)
    .collection('abonelikler')
    .add({
      shopId, musteriId, urunId, periyot, fiyat,
      durum: 'aktif',
      sonOdeme: Timestamp.now(),
      sonrakiOdeme: Timestamp.fromDate(sonrakiOdeme),
      baslamaTarih: Timestamp.now(),
    })

  return ref.id
}

export async function abonelikDuraklat(shopId: string, abonelikId: string): Promise<void> {
  if (!adminDb) return
  await adminDb.collection('esnaflar').doc(shopId)
    .collection('abonelikler').doc(abonelikId)
    .update({ durum: 'duraklatildi' })
}

export async function abonelikIptal(shopId: string, abonelikId: string): Promise<void> {
  if (!adminDb) return
  await adminDb.collection('esnaflar').doc(shopId)
    .collection('abonelikler').doc(abonelikId)
    .update({ durum: 'iptal', bitisTarih: Timestamp.now() })
}

// ─── Randevu Sistemi ──────────────────────────────────────────────────

export type RandevuDurum = 'bekliyor' | 'onaylandi' | 'tamamlandi' | 'iptal'

export interface Randevu {
  id: string
  shopId: string
  musteriId: string
  hizmetId: string
  hizmetAd: string
  tarih: string              // ISO date
  saat: string               // "14:30"
  sure: number               // dakika
  durum: RandevuDurum
  notlar?: string
}

export async function randevuOlustur(
  shopId: string, params: Omit<Randevu, 'id' | 'shopId' | 'durum'>
): Promise<string> {
  if (!adminDb) return ''

  const ref = await adminDb.collection('esnaflar').doc(shopId)
    .collection('randevular')
    .add({ ...params, shopId, durum: 'bekliyor', olusturma: Timestamp.now() })

  return ref.id
}
