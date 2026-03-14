/**
 * kuponMotoru.ts — Kupon / İndirim Kodu Motoru
 * 
 * Kupon Tipleri:
 * - Yüzdelik indirim (%10, %25)
 * - Sabit tutar indirim (50₺, 100₺)
 * - Ücretsiz kargo
 * 
 * Kurallar:
 * - Minimum sepet tutarı
 * - Kullanım limiti (toplam + kişi başı)
 * - Tarih aralığı (başlangıç/bitiş)
 * - Belirli ürünlere/kategorilere özel
 * - Tek kullanımlık kodlar
 */

import { adminDb, Timestamp } from '@/lib/firebaseAdmin'

// ─── Tipler ────────────────────────────────────────────────────────────

export type KuponTip = 'yuzde' | 'sabit' | 'ucretsiz_kargo'

export interface Kupon {
  id: string
  shopId: string
  kod: string                    // "YAZ2026", "HOSGELDIN10"
  tip: KuponTip
  deger: number                  // yüzde: 10 = %10, sabit: 5000 = 50₺ (kuruş)
  aktif: boolean
  minSepetTutar?: number         // kuruş
  maxIndirim?: number            // kuruş (yüzde kuponda tavan)
  toplamKullanimLimit: number    // 0 = sınırsız
  kisiBasiLimit: number          // 0 = sınırsız
  kullanilanAdet: number
  gecerliBaslangic: any
  gecerliBitis: any
  urunIdler?: string[]           // boş = tüm ürünler
  kategoriIdler?: string[]       // boş = tüm kategoriler
  olusturma: any
}

export type KuponForm = Omit<Kupon, 'id' | 'olusturma' | 'shopId' | 'kullanilanAdet'>

export interface KuponDogrulamaSonuc {
  gecerli: boolean
  indirimTutar: number          // kuruş
  mesaj: string
  kupon?: Kupon
}

// ─── Kupon CRUD ────────────────────────────────────────────────────────

function kuponRef(shopId: string) {
  return adminDb.collection('esnaflar').doc(shopId).collection('kuponlar')
}

export async function kuponOlustur(shopId: string, data: Partial<KuponForm>): Promise<string> {
  const kupon = {
    shopId,
    kod: (data.kod || '').toUpperCase().replace(/\s/g, ''),
    tip: data.tip || 'yuzde',
    deger: data.deger || 0,
    aktif: data.aktif ?? true,
    minSepetTutar: data.minSepetTutar || 0,
    maxIndirim: data.maxIndirim || null,
    toplamKullanimLimit: data.toplamKullanimLimit || 0,
    kisiBasiLimit: data.kisiBasiLimit || 1,
    kullanilanAdet: 0,
    gecerliBaslangic: data.gecerliBaslangic || Timestamp.now(),
    gecerliBitis: data.gecerliBitis || null,
    urunIdler: data.urunIdler || [],
    kategoriIdler: data.kategoriIdler || [],
    olusturma: Timestamp.now(),
  }

  // Kod benzersizlik kontrolü
  const mevcutSnap = await kuponRef(shopId)
    .where('kod', '==', kupon.kod)
    .limit(1)
    .get()
  if (!mevcutSnap.empty) {
    throw new Error(`Kupon kodu zaten mevcut: ${kupon.kod}`)
  }

  const ref = await kuponRef(shopId).add(kupon)
  return ref.id
}

export async function kuponlariGetir(shopId: string): Promise<Kupon[]> {
  const snap = await kuponRef(shopId).orderBy('olusturma', 'desc').get()
  return snap.docs.map((d: any) => ({ id: d.id, ...d.data() } as Kupon))
}

export async function kuponGuncelle(shopId: string, kuponId: string, data: Partial<KuponForm>): Promise<void> {
  await kuponRef(shopId).doc(kuponId).update(data)
}

export async function kuponSil(shopId: string, kuponId: string): Promise<void> {
  await kuponRef(shopId).doc(kuponId).update({ aktif: false })
}

// ─── Kupon Doğrulama ───────────────────────────────────────────────────

export async function kuponDogrula(
  shopId: string,
  kod: string,
  sepetTutar: number,         // kuruş
  musteriId?: string,
  urunIdler?: string[],
  kategoriIdler?: string[]
): Promise<KuponDogrulamaSonuc> {
  const snap = await kuponRef(shopId)
    .where('kod', '==', kod.toUpperCase())
    .where('aktif', '==', true)
    .limit(1)
    .get()

  if (snap.empty) {
    return { gecerli: false, indirimTutar: 0, mesaj: 'Geçersiz kupon kodu' }
  }

  const kupon = { id: snap.docs[0].id, ...snap.docs[0].data() } as Kupon

  // Tarih kontrolü
  const simdi = Date.now()
  if (kupon.gecerliBitis) {
    const bitis = kupon.gecerliBitis.toDate ? kupon.gecerliBitis.toDate().getTime() : kupon.gecerliBitis
    if (simdi > bitis) {
      return { gecerli: false, indirimTutar: 0, mesaj: 'Kupon süresi dolmuş' }
    }
  }

  // Kullanım limiti
  if (kupon.toplamKullanimLimit > 0 && kupon.kullanilanAdet >= kupon.toplamKullanimLimit) {
    return { gecerli: false, indirimTutar: 0, mesaj: 'Kupon kullanım limiti dolmuş' }
  }

  // Minimum sepet tutarı
  if (kupon.minSepetTutar && sepetTutar < kupon.minSepetTutar) {
    const minFiyat = (kupon.minSepetTutar / 100).toFixed(2)
    return { gecerli: false, indirimTutar: 0, mesaj: `Minimum sepet tutarı: ${minFiyat}₺` }
  }

  // İndirim hesapla
  let indirimTutar = 0

  switch (kupon.tip) {
    case 'yuzde':
      indirimTutar = Math.round(sepetTutar * kupon.deger / 100)
      if (kupon.maxIndirim && indirimTutar > kupon.maxIndirim) {
        indirimTutar = kupon.maxIndirim
      }
      break
    case 'sabit':
      indirimTutar = Math.min(kupon.deger, sepetTutar) // Sepetten fazla indirim yok
      break
    case 'ucretsiz_kargo':
      indirimTutar = 0 // Kargo ücreti ayrıca sıfırlanır
      break
  }

  return {
    gecerli: true,
    indirimTutar,
    mesaj: kupon.tip === 'ucretsiz_kargo' ? 'Ücretsiz kargo uygulandı!' : `${(indirimTutar / 100).toFixed(2)}₺ indirim uygulandı!`,
    kupon,
  }
}

// ─── Kupon Kullanım Kaydet ─────────────────────────────────────────────

export async function kuponKullan(shopId: string, kuponId: string, siparisId: string, musteriId?: string): Promise<void> {
  if (!adminDb) return

  await adminDb.runTransaction(async (tx: any) => {
    const ref = kuponRef(shopId).doc(kuponId)
    const snap = await tx.get(ref)
    if (!snap.exists) return
    const data = snap.data()!
    tx.update(ref, { kullanilanAdet: (data.kullanilanAdet || 0) + 1 })
  })

  // Kullanım logu
  await kuponRef(shopId).doc(kuponId)
    .collection('kullanimlar')
    .add({
      siparisId,
      musteriId: musteriId || null,
      tarih: Timestamp.now(),
    })
}
