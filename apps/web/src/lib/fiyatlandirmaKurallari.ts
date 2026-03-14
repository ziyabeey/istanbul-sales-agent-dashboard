/**
 * fiyatlandirmaKurallari.ts — Akıllı Fiyatlandırma Motoru
 * 
 * WooCommerce: manuel kurallar
 * Shopify: temel indirimler
 * Antigravity: dinamik fiyatlandırma kuralları motoru
 * 
 * Kural Tipleri:
 * 1. volume_discount — 3 al 2 öde
 * 2. time_based — Pazartesi sabahı %10 indirim
 * 3. bundle — A + B birlikte al → indirim
 * 4. customer_segment — Sadık müşterilere özel
 * 5. flash_sale — Anlık flaş indirim (stok limitli)
 */

import { adminDb, Timestamp } from '@/lib/firebaseAdmin'

// ─── Tipler ────────────────────────────────────────────────────────────

export type KuralTip = 'volume_discount' | 'time_based' | 'bundle' | 'customer_segment' | 'flash_sale'
export type IndirimTip = 'percent' | 'fixed'

export interface FiyatKurali {
  id: string
  shopId: string
  ad: string
  tip: KuralTip
  aktif: boolean
  oncelik: number             // düşük = önce uygulanır
  kosul: FiyatKosul
  aksiyon: FiyatAksiyon
  baslangic?: any
  bitis?: any
  olusturma: any
}

export interface FiyatKosul {
  // volume_discount
  minQty?: number
  // time_based
  dayOfWeek?: number[]        // 0=Pazar, 1=Pazartesi...
  hourRange?: [number, number]
  // bundle
  products?: string[]         // ürün ID'leri
  // customer_segment
  customerSegment?: string    // 'champions' | 'loyal' vb.
  // flash_sale
  stockLimit?: number
  startTime?: string
  endTime?: string
}

export interface FiyatAksiyon {
  discountType: IndirimTip
  value: number               // percent: yüzde, fixed: kuruş
}

// ─── Sepet için Toplu Uygulama ────────────────────────────────────────

export interface SepetUrun {
  urunId: string
  ad: string
  fiyat: number               // kuruş
  miktar: number
  kategori?: string
}

export interface FiyatSonuc {
  sepetToplam: number         // kuruş (indirim öncesi)
  indirimToplam: number       // kuruş
  finalToplam: number         // kuruş
  uygulananKurallar: { kuralAd: string; indirimTutar: number }[]
}

// ─── Kural Değerlendirici ─────────────────────────────────────────────

export function kuraliDegerlendir(
  kural: FiyatKurali,
  sepet: SepetUrun[],
  musteriSegment?: string
): { uygulanabilir: boolean; indirimTutar: number } {
  const simdi = new Date()

  // Aktiflik kontrolü
  if (!kural.aktif) return { uygulanabilir: false, indirimTutar: 0 }

  // Tarih kontrolü
  if (kural.baslangic) {
    const bas = kural.baslangic.toDate ? kural.baslangic.toDate() : new Date(kural.baslangic)
    if (simdi < bas) return { uygulanabilir: false, indirimTutar: 0 }
  }
  if (kural.bitis) {
    const bit = kural.bitis.toDate ? kural.bitis.toDate() : new Date(kural.bitis)
    if (simdi > bit) return { uygulanabilir: false, indirimTutar: 0 }
  }

  const sepetToplam = sepet.reduce((t, u) => t + u.fiyat * u.miktar, 0)
  let indirimTutar = 0

  switch (kural.tip) {
    case 'volume_discount': {
      // Ör: minQty=3 → toplam miktar ≥ 3 ise indirim
      const toplamMiktar = sepet.reduce((t, u) => t + u.miktar, 0)
      if (kural.kosul.minQty && toplamMiktar >= kural.kosul.minQty) {
        indirimTutar = hesaplaIndirim(sepetToplam, kural.aksiyon)
      }
      break
    }
    case 'time_based': {
      // Gün ve saat kontrolü
      const gun = simdi.getDay()
      const saat = simdi.getHours()
      const gunUygun = !kural.kosul.dayOfWeek || kural.kosul.dayOfWeek.includes(gun)
      const saatUygun = !kural.kosul.hourRange || (saat >= kural.kosul.hourRange[0] && saat < kural.kosul.hourRange[1])
      if (gunUygun && saatUygun) {
        indirimTutar = hesaplaIndirim(sepetToplam, kural.aksiyon)
      }
      break
    }
    case 'bundle': {
      // Tüm bundle ürünleri sepette mi?
      if (kural.kosul.products) {
        const sepetUrunIds = new Set(sepet.map(u => u.urunId))
        const hepsiVar = kural.kosul.products.every(id => sepetUrunIds.has(id))
        if (hepsiVar) {
          const bundleToplam = sepet
            .filter(u => kural.kosul.products!.includes(u.urunId))
            .reduce((t, u) => t + u.fiyat * u.miktar, 0)
          indirimTutar = hesaplaIndirim(bundleToplam, kural.aksiyon)
        }
      }
      break
    }
    case 'customer_segment': {
      // Müşteri segment kontrolü
      if (musteriSegment && kural.kosul.customerSegment === musteriSegment) {
        indirimTutar = hesaplaIndirim(sepetToplam, kural.aksiyon)
      }
      break
    }
    case 'flash_sale': {
      // Zaman ve stok kontrolü
      const start = kural.kosul.startTime ? new Date(kural.kosul.startTime) : null
      const end = kural.kosul.endTime ? new Date(kural.kosul.endTime) : null
      const zamanUygun = (!start || simdi >= start) && (!end || simdi <= end)
      if (zamanUygun) {
        indirimTutar = hesaplaIndirim(sepetToplam, kural.aksiyon)
      }
      break
    }
  }

  return { uygulanabilir: indirimTutar > 0, indirimTutar }
}

function hesaplaIndirim(tutar: number, aksiyon: FiyatAksiyon): number {
  if (aksiyon.discountType === 'percent') {
    return Math.round(tutar * aksiyon.value / 100)
  }
  return Math.min(aksiyon.value, tutar) // fixed tutar, sepetten fazla olamaz
}

// ─── Sepete Kuralları Uygula ──────────────────────────────────────────

export async function sepeteFiyatKurallariniUygula(
  shopId: string,
  sepet: SepetUrun[],
  musteriSegment?: string
): Promise<FiyatSonuc> {
  const sepetToplam = sepet.reduce((t, u) => t + u.fiyat * u.miktar, 0)
  const sonuc: FiyatSonuc = {
    sepetToplam,
    indirimToplam: 0,
    finalToplam: sepetToplam,
    uygulananKurallar: [],
  }

  if (!adminDb) return sonuc

  // Aktif kuralları önceliğe göre çek
  const snap = await adminDb
    .collection('esnaflar').doc(shopId)
    .collection('fiyatKurallari')
    .where('aktif', '==', true)
    .orderBy('oncelik', 'asc')
    .get()

  for (const doc of snap.docs) {
    const kural = { id: doc.id, ...doc.data() } as FiyatKurali
    const { uygulanabilir, indirimTutar } = kuraliDegerlendir(kural, sepet, musteriSegment)

    if (uygulanabilir && indirimTutar > 0) {
      sonuc.indirimToplam += indirimTutar
      sonuc.uygulananKurallar.push({ kuralAd: kural.ad, indirimTutar })
    }
  }

  // Final toplam negatif olamaz
  sonuc.finalToplam = Math.max(0, sepetToplam - sonuc.indirimToplam)
  return sonuc
}

// ─── Fiyat Kuralı CRUD ────────────────────────────────────────────────

export async function fiyatKuraliOlustur(shopId: string, kural: Omit<FiyatKurali, 'id' | 'shopId' | 'olusturma'>): Promise<string> {
  if (!adminDb) return ''
  const ref = await adminDb.collection('esnaflar').doc(shopId)
    .collection('fiyatKurallari')
    .add({ ...kural, shopId, olusturma: Timestamp.now() })
  return ref.id
}

export async function fiyatKurallariniGetir(shopId: string): Promise<FiyatKurali[]> {
  if (!adminDb) return []
  const snap = await adminDb.collection('esnaflar').doc(shopId)
    .collection('fiyatKurallari').orderBy('oncelik', 'asc').get()
  return snap.docs.map((d: any) => ({ id: d.id, ...d.data() } as FiyatKurali))
}

// ─── Flaş Satış ───────────────────────────────────────────────────────

export interface FlasSatis {
  id: string
  kuralId: string
  ad: string
  baslangic: string           // ISO date
  bitis: string               // ISO date
  stokLimit: number
  satilanAdet: number
  aktif: boolean
}

export async function flasSatisOlustur(
  shopId: string,
  params: { ad: string; urunIdler: string[]; indirimYuzde: number; stokLimit: number; sureSaat: number }
): Promise<string> {
  if (!adminDb) return ''

  const baslangic = new Date()
  const bitis = new Date(baslangic.getTime() + params.sureSaat * 60 * 60 * 1000)

  const kuralId = await fiyatKuraliOlustur(shopId, {
    ad: `⚡ ${params.ad}`,
    tip: 'flash_sale',
    aktif: true,
    oncelik: 0, // en yüksek öncelik
    kosul: {
      products: params.urunIdler,
      stockLimit: params.stokLimit,
      startTime: baslangic.toISOString(),
      endTime: bitis.toISOString(),
    },
    aksiyon: { discountType: 'percent', value: params.indirimYuzde },
    baslangic: Timestamp.fromDate(baslangic),
    bitis: Timestamp.fromDate(bitis),
  })

  return kuralId
}
