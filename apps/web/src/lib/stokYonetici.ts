/**
 * stokYonetici.ts — Gelişmiş Stok Yönetim Motoru
 * 
 * Özellikler:
 * - Düşük stok alarmları (Telegram/WhatsApp bildirim)
 * - Stok rezervasyon/serbest bırakma
 * - Toplu stok güncelleme (CSV import)
 * - Stok hareketi loglama
 */

import { adminDb, Timestamp, FieldValue } from '@/lib/firebaseAdmin'

// ─── Tipler ────────────────────────────────────────────────────────────

export type StokHareketTip = 'giris' | 'cikis' | 'rezervasyon' | 'iptal' | 'duzeltme' | 'iade'

export interface StokHareket {
  id?: string
  shopId: string
  urunId: string
  varyantId?: string
  tip: StokHareketTip
  miktar: number              // pozitif = artış, negatif = azalış
  oncekiStok: number
  yeniStok: number
  aciklama: string
  referansId?: string         // siparisId, importId vb.
  tarih: any
}

export interface StokAlarm {
  urunId: string
  urunAd: string
  mevcutStok: number
  kritikEsik: number
  gorsel?: string
}

// ─── Stok Sorgu ────────────────────────────────────────────────────────

export async function dusukStokUrunleri(shopId: string): Promise<StokAlarm[]> {
  if (!adminDb) return []

  const snap = await adminDb
    .collection('esnaflar').doc(shopId)
    .collection('urunler')
    .where('durum', '==', 'aktif')
    .where('stok.takipli', '==', true)
    .get()

  const alarmlar: StokAlarm[] = []

  for (const doc of snap.docs) {
    const data = doc.data()
    if (data.stok.miktar <= data.stok.kritikEsik) {
      alarmlar.push({
        urunId: doc.id,
        urunAd: data.ad,
        mevcutStok: data.stok.miktar,
        kritikEsik: data.stok.kritikEsik,
        gorsel: data.gorseller?.[0],
      })
    }
    // Varyant stok kontrolü
    if (data.varyantlar?.length) {
      for (const v of data.varyantlar) {
        if (v.stokMiktar <= (data.stok.kritikEsik || 5)) {
          alarmlar.push({
            urunId: doc.id,
            urunAd: `${data.ad} — ${v.ad}`,
            mevcutStok: v.stokMiktar,
            kritikEsik: data.stok.kritikEsik || 5,
            gorsel: v.gorsel || data.gorseller?.[0],
          })
        }
      }
    }
  }

  return alarmlar
}

// ─── Stok Hareket Kayıt ───────────────────────────────────────────────

export async function stokHareketKaydet(
  hareket: Omit<StokHareket, 'id' | 'tarih'>
): Promise<string> {
  if (!adminDb) return ''

  const ref = await adminDb
    .collection('esnaflar').doc(hareket.shopId)
    .collection('stokHareketleri')
    .add({
      ...hareket,
      tarih: Timestamp.now(),
    })

  return ref.id
}

// ─── Stok Güncelle (Hareket Kayıtlı) ─────────────────────────────────

export async function stokGuncelle(
  shopId: string,
  urunId: string,
  tip: StokHareketTip,
  miktar: number,
  aciklama: string,
  referansId?: string,
  varyantId?: string
): Promise<{ basarili: boolean; yeniStok: number; hataMesaji?: string }> {
  if (!adminDb) {
    return { basarili: false, yeniStok: 0, hataMesaji: 'Veritabanı bağlantısı yok' }
  }

  const urunRef = adminDb
    .collection('esnaflar').doc(shopId)
    .collection('urunler').doc(urunId)

  return adminDb.runTransaction(async (tx: any) => {
    const snap = await tx.get(urunRef)
    if (!snap.exists) {
      throw new Error('Ürün bulunamadı')
    }

    const data = snap.data()
    let oncekiStok: number
    let yeniStok: number

    if (varyantId) {
      // Varyant stok güncelleme
      const varyant = data.varyantlar?.find((v: any) => v.id === varyantId)
      if (!varyant) throw new Error('Varyant bulunamadı')
      
      oncekiStok = varyant.stokMiktar
      yeniStok = Math.max(0, oncekiStok + miktar)

      const yeniVaryantlar = data.varyantlar.map((v: any) =>
        v.id === varyantId ? { ...v, stokMiktar: yeniStok } : v
      )
      tx.update(urunRef, { varyantlar: yeniVaryantlar, guncelleme: Timestamp.now() })
    } else {
      // Ana ürün stok güncelleme
      oncekiStok = data.stok?.miktar || 0
      yeniStok = Math.max(0, oncekiStok + miktar)
      tx.update(urunRef, { 'stok.miktar': yeniStok, guncelleme: Timestamp.now() })
    }

    return { basarili: true, yeniStok, oncekiStok }
  }).then(async (sonuc: any) => {
    // Hareket kaydı (transaction dışı — idempotent)
    await stokHareketKaydet({
      shopId,
      urunId,
      varyantId,
      tip,
      miktar,
      oncekiStok: sonuc.oncekiStok,
      yeniStok: sonuc.yeniStok,
      aciklama,
      referansId,
    })
    return { basarili: true, yeniStok: sonuc.yeniStok }
  }).catch((err: Error) => {
    return { basarili: false, yeniStok: 0, hataMesaji: err.message }
  })
}

// ─── Toplu Stok Güncelleme ────────────────────────────────────────────

export interface TopluStokSatir {
  sku: string
  miktar: number
}

export async function topluStokGuncelle(
  shopId: string,
  satirlar: TopluStokSatir[]
): Promise<{ basarili: number; basarisiz: number; hatalar: string[] }> {
  let basarili = 0
  let basarisiz = 0
  const hatalar: string[] = []

  for (const satir of satirlar) {
    try {
      // SKU ile ürün bul
      const snap = await adminDb
        .collection('esnaflar').doc(shopId)
        .collection('urunler')
        .where('sku', '==', satir.sku)
        .limit(1)
        .get()

      if (snap.empty) {
        basarisiz++
        hatalar.push(`SKU bulunamadı: ${satir.sku}`)
        continue
      }

      const urunId = snap.docs[0].id
      const mevcutStok = snap.docs[0].data().stok?.miktar || 0
      const fark = satir.miktar - mevcutStok

      const sonuc = await stokGuncelle(
        shopId, urunId, 'duzeltme', fark,
        `Toplu stok güncelleme: ${mevcutStok} → ${satir.miktar}`
      )

      if (sonuc.basarili) {
        basarili++
      } else {
        basarisiz++
        hatalar.push(`${satir.sku}: ${sonuc.hataMesaji}`)
      }
    } catch (err: any) {
      basarisiz++
      hatalar.push(`${satir.sku}: ${err.message}`)
    }
  }

  return { basarili, basarisiz, hatalar }
}

// ─── İade Stok İade ───────────────────────────────────────────────────

export async function iadeStokGeriYukle(
  shopId: string,
  siparisId: string,
  items: { urunId: string; varyantId?: string; adet: number }[]
): Promise<void> {
  for (const item of items) {
    await stokGuncelle(
      shopId, item.urunId, 'iade', item.adet,
      `Sipariş iadesi: ${siparisId}`,
      siparisId,
      item.varyantId
    )
  }
}
