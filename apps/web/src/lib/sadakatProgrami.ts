/**
 * sadakatProgrami.ts — Müşteri Sadakat Programı
 * 
 * Shopify/WooCommerce'da ek plugin ($20/ay+). Antigravity'de native.
 * 
 * Puan Sistemi: Her 1₺ = X puan (mağaza sahibi belirler)
 * 4 Seviye: Bronze → Silver → Gold → Platinum
 * Bonus Puanlar: yorum / paylaşım / doğum günü
 */

import { adminDb, Timestamp } from '@/lib/firebaseAdmin'

// ─── Tipler ────────────────────────────────────────────────────────────

export type SadakatSeviye = 'bronze' | 'silver' | 'gold' | 'platinum'

export interface SadakatProfil {
  musteriId: string
  puan: number
  seviye: SadakatSeviye
  toplamHarcama: number       // kuruş
  puanGecmisi: PuanIslem[]
  seviyeYukselmeTarih?: any
}

export interface PuanIslem {
  tip: 'kazanma' | 'harcama' | 'bonus'
  tutar: number
  aciklama: string
  tarih: any
}

export const SEVIYE_ESIKLERI: Record<SadakatSeviye, { minHarcama: number; indirimOrani: number; ucretsizKargoEsik: number; label: string; renk: string; ikon: string }> = {
  bronze:   { minHarcama: 0,        indirimOrani: 0,  ucretsizKargoEsik: 30000, label: 'Bronze', renk: '#cd7f32', ikon: '🥉' },
  silver:   { minHarcama: 100000,   indirimOrani: 5,  ucretsizKargoEsik: 20000, label: 'Silver', renk: '#c0c0c0', ikon: '🥈' },
  gold:     { minHarcama: 500000,   indirimOrani: 10, ucretsizKargoEsik: 10000, label: 'Gold', renk: '#ffd700', ikon: '🥇' },
  platinum: { minHarcama: 1500000,  indirimOrani: 15, ucretsizKargoEsik: 0,     label: 'Platinum', renk: '#e5e4e2', ikon: '💎' },
}

// ─── Seviye Hesapla ───────────────────────────────────────────────────

export function seviyeHesapla(toplamHarcama: number): SadakatSeviye {
  if (toplamHarcama >= SEVIYE_ESIKLERI.platinum.minHarcama) return 'platinum'
  if (toplamHarcama >= SEVIYE_ESIKLERI.gold.minHarcama) return 'gold'
  if (toplamHarcama >= SEVIYE_ESIKLERI.silver.minHarcama) return 'silver'
  return 'bronze'
}

// ─── Puan İşlemleri ───────────────────────────────────────────────────

export async function puanKazan(
  shopId: string, musteriId: string, harcamaTutar: number, puanOrani: number = 1
): Promise<{ kazanilanPuan: number; yeniToplam: number; yeniSeviye: SadakatSeviye }> {
  if (!adminDb) return { kazanilanPuan: 0, yeniToplam: 0, yeniSeviye: 'bronze' }

  const kazanilanPuan = Math.floor(harcamaTutar / 100 * puanOrani) // 100 kuruş = 1₺ = puanOrani puan
  const ref = adminDb.collection('esnaflar').doc(shopId).collection('sadakat').doc(musteriId)

  let yeniToplam = 0
  let yeniSeviye: SadakatSeviye = 'bronze'

  await adminDb.runTransaction(async (tx: any) => {
    const snap = await tx.get(ref)
    const mevcut = snap.exists ? snap.data() : { puan: 0, toplamHarcama: 0 }

    yeniToplam = (mevcut.puan || 0) + kazanilanPuan
    const yeniHarcama = (mevcut.toplamHarcama || 0) + harcamaTutar
    yeniSeviye = seviyeHesapla(yeniHarcama)

    tx.set(ref, {
      musteriId, puan: yeniToplam, seviye: yeniSeviye,
      toplamHarcama: yeniHarcama,
      guncelleme: Timestamp.now(),
    }, { merge: true })
  })

  // Puan logu
  await ref.collection('puanGecmisi').add({
    tip: 'kazanma', tutar: kazanilanPuan,
    aciklama: `${(harcamaTutar / 100).toFixed(2)}₺ harcama → ${kazanilanPuan} puan`,
    tarih: Timestamp.now(),
  })

  return { kazanilanPuan, yeniToplam, yeniSeviye }
}

export async function puanHarca(
  shopId: string, musteriId: string, harcananPuan: number
): Promise<{ basarili: boolean; kalanPuan: number; indirimKurus: number }> {
  if (!adminDb) return { basarili: false, kalanPuan: 0, indirimKurus: 0 }

  const ref = adminDb.collection('esnaflar').doc(shopId).collection('sadakat').doc(musteriId)
  let kalanPuan = 0
  const indirimKurus = harcananPuan * 10 // 1 puan = 10 kuruş = 0.10₺

  await adminDb.runTransaction(async (tx: any) => {
    const snap = await tx.get(ref)
    if (!snap.exists) throw new Error('Profil yok')

    const mevcut = snap.data()
    if ((mevcut.puan || 0) < harcananPuan) throw new Error('Yetersiz puan')

    kalanPuan = mevcut.puan - harcananPuan
    tx.update(ref, { puan: kalanPuan, guncelleme: Timestamp.now() })
  })

  await ref.collection('puanGecmisi').add({
    tip: 'harcama', tutar: -harcananPuan,
    aciklama: `${harcananPuan} puan kullanıldı → ${(indirimKurus / 100).toFixed(2)}₺ indirim`,
    tarih: Timestamp.now(),
  })

  return { basarili: true, kalanPuan, indirimKurus }
}

export async function bonusPuanVer(
  shopId: string, musteriId: string, puan: number, sebep: string
): Promise<void> {
  if (!adminDb) return
  const ref = adminDb.collection('esnaflar').doc(shopId).collection('sadakat').doc(musteriId)

  await adminDb.runTransaction(async (tx: any) => {
    const snap = await tx.get(ref)
    const mevcut = snap.exists ? snap.data() : { puan: 0, toplamHarcama: 0 }
    tx.set(ref, { musteriId, puan: (mevcut.puan || 0) + puan, guncelleme: Timestamp.now() }, { merge: true })
  })

  await ref.collection('puanGecmisi').add({
    tip: 'bonus', tutar: puan, aciklama: sebep, tarih: Timestamp.now(),
  })
}

// ─── Profil Getir ─────────────────────────────────────────────────────

export async function sadakatProfilGetir(shopId: string, musteriId: string): Promise<SadakatProfil | null> {
  if (!adminDb) return null
  const snap = await adminDb.collection('esnaflar').doc(shopId).collection('sadakat').doc(musteriId).get()
  if (!snap.exists) return null
  return { musteriId, ...snap.data() } as SadakatProfil
}
