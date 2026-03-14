/**
 * efatura.ts — E-Fatura / E-Arşiv Entegrasyon Katmanı
 * 
 * Desteklenen entegrasyonlar:
 * - GİB (Gelir İdaresi Başkanlığı) — E-Fatura
 * - Logo / Paraşüt / Foriba — E-Arşiv 
 * 
 * Bu dosya şimdilik stub'dır — gerçek GİB entegrasyonu için
 * entegratör API bilgileri gereklidir.
 */

import { adminDb, Timestamp } from '@/lib/firebaseAdmin'

// ─── Tipler ────────────────────────────────────────────────────────────

export type FaturaTip = 'satis' | 'iade' | 'irsaliye'
export type FaturaDurum = 'taslak' | 'onay_bekliyor' | 'onaylandi' | 'gonderildi' | 'iptal'

export interface EFatura {
  id: string
  shopId: string
  siparisId: string
  faturaTip: FaturaTip
  durum: FaturaDurum
  faturaNo?: string                 // GİB fatura numarası
  seri: string                      // ABC
  siraNo: number
  tarih: any
  // Alıcı
  aliciAd: string
  aliciVKN?: string                 // Vergi Kimlik No
  aliciTCKN?: string                // TC Kimlik No
  aliciAdres: string
  aliciVergiDaire?: string
  // Kalemler
  kalemler: FaturaKalem[]
  // Toplamlar
  araToplam: number                 // kuruş
  kdvToplam: number                 // kuruş
  indirimToplam: number             // kuruş
  genelToplam: number               // kuruş
  // Meta
  olusturma: any
  gibUUID?: string                  // GİB Evrensel Tekil No
  gibGonderimTarih?: any
}

export interface FaturaKalem {
  urunAd: string
  miktar: number
  birimFiyat: number                // kuruş (KDV hariç)
  kdvOrani: number                  // 1, 8, 18, 20
  kdvTutar: number                  // kuruş
  toplamTutar: number               // kuruş (KDV dahil)
  indirimTutar?: number
}

// ─── Fatura Oluştur ────────────────────────────────────────────────────

export async function efaturaOlustur(
  shopId: string,
  siparisId: string,
  params: {
    faturaTip: FaturaTip
    aliciAd: string
    aliciVKN?: string
    aliciTCKN?: string
    aliciAdres: string
    aliciVergiDaire?: string
    kalemler: FaturaKalem[]
  }
): Promise<{ basarili: boolean; faturaId?: string; faturaNo?: string; hataMesaji?: string }> {
  if (!adminDb) {
    return { basarili: false, hataMesaji: 'Veritabanı bağlantısı yok' }
  }

  try {
    // Sıra numarası al
    const sayacRef = adminDb.collection('esnaflar').doc(shopId).collection('ayarlar').doc('faturaSayac')
    let siraNo = 1

    await adminDb.runTransaction(async (tx: any) => {
      const snap = await tx.get(sayacRef)
      if (snap.exists) {
        siraNo = (snap.data()?.sonSira || 0) + 1
        tx.update(sayacRef, { sonSira: siraNo })
      } else {
        tx.set(sayacRef, { sonSira: 1, seri: 'KEP' })
      }
    })

    const faturaNo = `KEP2026${String(siraNo).padStart(6, '0')}`

    // Toplamlar hesapla
    const araToplam = params.kalemler.reduce((t, k) => t + k.birimFiyat * k.miktar, 0)
    const kdvToplam = params.kalemler.reduce((t, k) => t + k.kdvTutar, 0)
    const indirimToplam = params.kalemler.reduce((t, k) => t + (k.indirimTutar || 0), 0)
    const genelToplam = araToplam + kdvToplam - indirimToplam

    const fatura: Omit<EFatura, 'id'> = {
      shopId,
      siparisId,
      faturaTip: params.faturaTip,
      durum: 'taslak',
      faturaNo,
      seri: 'KEP',
      siraNo,
      tarih: Timestamp.now(),
      aliciAd: params.aliciAd,
      aliciVKN: params.aliciVKN,
      aliciTCKN: params.aliciTCKN,
      aliciAdres: params.aliciAdres,
      aliciVergiDaire: params.aliciVergiDaire,
      kalemler: params.kalemler,
      araToplam,
      kdvToplam,
      indirimToplam,
      genelToplam,
      olusturma: Timestamp.now(),
    }

    const ref = await adminDb
      .collection('esnaflar').doc(shopId)
      .collection('faturalar')
      .add(fatura)

    return { basarili: true, faturaId: ref.id, faturaNo }
  } catch (err: any) {
    return { basarili: false, hataMesaji: err.message }
  }
}

// ─── Fatura Listesi ────────────────────────────────────────────────────

export async function faturalariGetir(shopId: string, limit = 50): Promise<EFatura[]> {
  if (!adminDb) return []

  const snap = await adminDb
    .collection('esnaflar').doc(shopId)
    .collection('faturalar')
    .orderBy('olusturma', 'desc')
    .limit(limit)
    .get()

  return snap.docs.map((d: any) => ({ id: d.id, ...d.data() } as EFatura))
}

// ─── GİB Gönderim (Paraşüt Entegrasyonu) ──────────────────────────────

export async function gibGonder(shopId: string, faturaId: string): Promise<{
  basarili: boolean; gibUUID?: string; hataMesaji?: string
}> {
  if (!adminDb) return { basarili: false, hataMesaji: 'DB yok' }

  // Fatura verisini al
  const faturaDoc = await adminDb
    .collection('esnaflar').doc(shopId)
    .collection('faturalar').doc(faturaId)
    .get()

  if (!faturaDoc.exists) return { basarili: false, hataMesaji: 'Fatura bulunamadı' }

  const fatura = faturaDoc.data() as EFatura

  // ── Paraşüt API Entegrasyonu (env var varsa gerçek, yoksa mock) ──
  const parasutClientId = process.env.PARASUT_CLIENT_ID
  const parasutSecret = process.env.PARASUT_CLIENT_SECRET
  const parasutCompanyId = process.env.PARASUT_COMPANY_ID

  if (parasutClientId && parasutSecret && parasutCompanyId) {
    try {
      // 1. Paraşüt OAuth2 token al
      const tokenRes = await fetch('https://api.parasut.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grant_type: 'client_credentials',
          client_id: parasutClientId,
          client_secret: parasutSecret,
        }),
      })
      const { access_token } = await tokenRes.json()

      // 2. E-Arşiv fatura oluştur
      const arsivRes = await fetch(
        `https://api.parasut.com/v4/${parasutCompanyId}/e_archives`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/vnd.api+json',
            'Authorization': `Bearer ${access_token}`,
          },
          body: JSON.stringify({
            data: {
              type: 'e_archives',
              relationships: {
                sales_invoice: {
                  data: { id: faturaId, type: 'sales_invoices' },
                },
              },
            },
          }),
        }
      )

      if (!arsivRes.ok) {
        const err = await arsivRes.text()
        return { basarili: false, hataMesaji: `Paraşüt API hatası: ${err}` }
      }

      const arsivData = await arsivRes.json()
      const gibUUID = arsivData.data?.id || `PARASUT-${Date.now()}`

      await adminDb
        .collection('esnaflar').doc(shopId)
        .collection('faturalar').doc(faturaId)
        .update({
          durum: 'gonderildi',
          gibUUID,
          gibGonderimTarih: Timestamp.now(),
          entegrator: 'parasut',
        })

      return { basarili: true, gibUUID }
    } catch (err: any) {
      return { basarili: false, hataMesaji: `Paraşüt hatası: ${err.message}` }
    }
  }

  // ── Mock mod (geliştirme ortamı — Paraşüt env yok) ──
  const uuid = `GIB-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`

  await adminDb
    .collection('esnaflar').doc(shopId)
    .collection('faturalar').doc(faturaId)
    .update({
      durum: 'gonderildi',
      gibUUID: uuid,
      gibGonderimTarih: Timestamp.now(),
      entegrator: 'mock',
    })

  return { basarili: true, gibUUID: uuid }
}

// ─── KDV Hesaplama Yardımcı ───────────────────────────────────────────

export function kdvHesapla(
  birimFiyatKurus: number,
  miktar: number,
  kdvOrani: number
): FaturaKalem & { urunAd: string } {
  const araToplam = birimFiyatKurus * miktar
  const kdvTutar = Math.round(araToplam * kdvOrani / 100)
  return {
    urunAd: '',
    miktar,
    birimFiyat: birimFiyatKurus,
    kdvOrani,
    kdvTutar,
    toplamTutar: araToplam + kdvTutar,
  }
}
