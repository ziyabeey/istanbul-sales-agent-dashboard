/**
 * rfmSegmentasyon.ts — RFM Müşteri Segmentasyonu
 * 
 * RFM = Recency × Frequency × Monetary
 * 
 * Segmentler:
 * - Champions (5,5,5) — En iyi müşteriler
 * - Loyal Customers (4-5,4-5,4-5) — Sadık müşteriler
 * - Potential Loyalists (3-4,1-3,1-3) — Potansiyel sadık
 * - New Customers (5,1,1) — Yeni gelmiş
 * - At Risk (2-3,2-5,2-5) — Risk altında
 * - Lost (1,1-2,1-2) — Kaybedilmiş
 */

import { adminDb } from '@/lib/firebaseAdmin'
import { RFMSegment, SEGMENT_DETAY } from './rfmConfig'

export interface MusteriRFM {
  musteriId: string
  musteriAd: string
  email?: string
  telefon?: string
  recency: number              // gün (son alışverişten bugüne)
  frequency: number            // toplam sipariş sayısı
  monetary: number             // toplam harcama (kuruş)
  rScore: number               // 1-5
  fScore: number               // 1-5
  mScore: number               // 1-5
  segment: RFMSegment
  sonSiparisTarih?: string
}

export interface RFMOzet {
  toplamMusteri: number
  segmentDagilimi: Record<RFMSegment, number>
  segmentDetay: Record<RFMSegment, { label: string; renk: string; aciklama: string }>
}

// ─── RFM Hesaplama ─────────────────────────────────────────────────────

function segmentBelirle(r: number, f: number, m: number): RFMSegment {
  const rfm = `${r}${f}${m}`

  // Champions: R=5, F=4-5, M=4-5
  if (r >= 4 && f >= 4 && m >= 4) return 'champions'
  // Loyal: R=3-5, F=3-5, M=3-5
  if (r >= 3 && f >= 3 && m >= 3) return 'loyal_customers'
  // Can't Lose: R=1-2, F=4-5, M=4-5
  if (r <= 2 && f >= 4 && m >= 4) return 'cant_lose'
  // At Risk: R=1-2, F=3-4, M=3-4
  if (r <= 2 && f >= 3 && m >= 3) return 'at_risk'
  // New Customers: R=5, F=1, M=1-2
  if (r >= 5 && f <= 1) return 'new_customers'
  // Potential Loyalists: R=4-5, F=1-3, M=1-3
  if (r >= 4 && f <= 3 && m <= 3) return 'potential_loyalists'
  // Promising: R=3-4, F=1, M=1
  if (r >= 3 && f <= 1) return 'promising'
  // Need Attention: R=3, F=2-3, M=2-3
  if (r === 3 && f >= 2) return 'need_attention'
  // About to Sleep: R=2-3, F=1-2, M=1-2
  if (r >= 2 && r <= 3 && f <= 2 && m <= 2) return 'about_to_sleep'
  // Hibernating: R=1-2, F=1-2, M=1-2
  if (r <= 2 && f <= 2 && m <= 2) return 'hibernating'

  return 'lost'
}

function scoreHesapla(deger: number, quintiles: number[]): number {
  if (deger <= quintiles[0]) return 1
  if (deger <= quintiles[1]) return 2
  if (deger <= quintiles[2]) return 3
  if (deger <= quintiles[3]) return 4
  return 5
}

// ─── Ana İşlev: RFM Analizi ───────────────────────────────────────────

export async function rfmAnaliziYap(shopId: string): Promise<{
  musteriler: MusteriRFM[]
  ozet: RFMOzet
}> {
  if (!adminDb) {
    return { musteriler: [], ozet: { toplamMusteri: 0, segmentDagilimi: {} as any, segmentDetay: {} as any } }
  }

  // Tüm siparişleri çek
  const sipSnap = await adminDb
    .collection('esnaflar').doc(shopId)
    .collection('siparisler')
    .where('durum', 'in', ['odeme_onaylandi', 'hazirlaniyor', 'kargoda', 'teslim_edildi'])
    .get()

  // Müşteri bazlı agregasyon
  const musteriMap = new Map<string, { ad: string; email?: string; telefon?: string; siparisler: { tarih: number; tutar: number }[] }>()

  for (const doc of sipSnap.docs) {
    const data = doc.data()
    const key = data.musteriTelefon || data.musteriEmail || data.musteriAdi
    if (!key) continue

    const mevcut = musteriMap.get(key) || {
      ad: data.musteriAdi || '',
      email: data.musteriEmail,
      telefon: data.musteriTelefon,
      siparisler: [] as { tarih: number; tutar: number }[],
    }

    const tarih = data.olusturma?.toDate ? data.olusturma.toDate().getTime() : Date.now()
    mevcut.siparisler.push({ tarih, tutar: data.genelToplam || 0 })
    musteriMap.set(key, mevcut)
  }

  if (musteriMap.size === 0) {
    return { musteriler: [], ozet: { toplamMusteri: 0, segmentDagilimi: {} as any, segmentDetay: {} as any } }
  }

  // R, F, M değerlerini hesapla
  const simdi = Date.now()
  const rfmVeriler = Array.from(musteriMap.entries()).map(([id, m]) => {
    const sonSiparis = Math.max(...m.siparisler.map(s => s.tarih))
    const recency = Math.floor((simdi - sonSiparis) / (1000 * 60 * 60 * 24)) // gün
    const frequency = m.siparisler.length
    const monetary = m.siparisler.reduce((t, s) => t + s.tutar, 0)
    return { musteriId: id, ...m, recency, frequency, monetary, sonSiparis }
  })

  // Quintile hesapla
  const recencies = rfmVeriler.map(r => r.recency).sort((a, b) => a - b)
  const frequencies = rfmVeriler.map(r => r.frequency).sort((a, b) => a - b)
  const monetaries = rfmVeriler.map(r => r.monetary).sort((a, b) => a - b)

  const quintile = (arr: number[]): number[] => {
    const n = arr.length
    return [
      arr[Math.floor(n * 0.2)] || 0,
      arr[Math.floor(n * 0.4)] || 0,
      arr[Math.floor(n * 0.6)] || 0,
      arr[Math.floor(n * 0.8)] || 0,
    ]
  }

  const rQ = quintile(recencies)
  const fQ = quintile(frequencies)
  const mQ = quintile(monetaries)

  // Score + segment ata
  const musteriler: MusteriRFM[] = rfmVeriler.map(r => {
    // Recency ters skor (az gün = yüksek skor)
    const rScore = 6 - scoreHesapla(r.recency, rQ) // İnvert
    const fScore = scoreHesapla(r.frequency, fQ)
    const mScore = scoreHesapla(r.monetary, mQ)
    const segment = segmentBelirle(rScore, fScore, mScore)

    return {
      musteriId: r.musteriId,
      musteriAd: r.ad,
      email: r.email,
      telefon: r.telefon,
      recency: r.recency,
      frequency: r.frequency,
      monetary: r.monetary,
      rScore,
      fScore,
      mScore,
      segment,
      sonSiparisTarih: new Date(r.sonSiparis).toISOString(),
    }
  })

  // Segment dağılımı
  const segmentDagilimi: Record<string, number> = {}
  for (const m of musteriler) {
    segmentDagilimi[m.segment] = (segmentDagilimi[m.segment] || 0) + 1
  }

  return {
    musteriler,
    ozet: {
      toplamMusteri: musteriler.length,
      segmentDagilimi: segmentDagilimi as any,
      segmentDetay: SEGMENT_DETAY as any,
    },
  }
}
