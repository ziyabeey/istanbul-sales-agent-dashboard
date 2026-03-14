/**
 * magazaDB.ts — E-Ticaret Firestore CRUD Katmanı
 * 
 * Koleksiyon yapısı:
 *   esnaflar/{shopId}/urunler/{urunId}
 *   esnaflar/{shopId}/kategoriler/{katId}
 *   esnaflar/{shopId}/siparisler/{sipId}
 */

import { adminDb, Timestamp, FieldValue } from '@/lib/firebaseAdmin'
import type {
  Urun, UrunForm, UrunFiltre, UrunDurum,
  Kategori, KategoriForm,
  Siparis, SiparisForm, SiparisDurum, SiparisFiltre, SiparisItem
} from '@/types/eticaret'

// ─── Helpers ───────────────────────────────────────────────────────────

function slugOlustur(metin: string): string {
  return metin
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function siparisNoUret(): string {
  const tarih = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const rastgele = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `SIP-${tarih}-${rastgele}`
}

function koleksiyon(shopId: string, alt: string) {
  return adminDb.collection('esnaflar').doc(shopId).collection(alt)
}

// ─── Ürün CRUD ─────────────────────────────────────────────────────────

export async function urunOlustur(shopId: string, data: Partial<UrunForm>): Promise<string> {
  const slug = data.slug || slugOlustur(data.ad || 'urun')
  
  const urun = {
    shopId,
    ad: data.ad || '',
    slug,
    aciklama: data.aciklama || '',
    kisaAciklama: data.kisaAciklama || '',
    sku: data.sku || '',
    barkod: data.barkod || '',
    durum: data.durum || 'taslak' as UrunDurum,
    tip: data.tip || 'basit',
    fiyat: data.fiyat || 0,
    karsilastirmaFiyat: data.karsilastirmaFiyat || null,
    maliyetFiyat: data.maliyetFiyat || null,
    kdvOrani: data.kdvOrani ?? 18,
    kdvDahil: data.kdvDahil ?? true,
    stok: {
      takipli: data.stok?.takipli ?? true,
      miktar: data.stok?.miktar ?? 0,
      kritikEsik: data.stok?.kritikEsik ?? 5,
      onSiparisIzinli: data.stok?.onSiparisIzinli ?? false,
    },
    kargo: {
      agirlik: data.kargo?.agirlik ?? 0,
      boyutlar: data.kargo?.boyutlar || null,
      ucretsizKargo: data.kargo?.ucretsizKargo ?? false,
      kargoSinifi: data.kargo?.kargoSinifi || null,
    },
    gorseller: data.gorseller || [],
    kategoriler: data.kategoriler || [],
    etiketler: data.etiketler || [],
    seo: {
      baslik: data.seo?.baslik || data.ad || '',
      aciklama: data.seo?.aciklama || data.kisaAciklama || '',
      anahtarKelimeler: data.seo?.anahtarKelimeler || [],
    },
    ozellikler: data.ozellikler || [],
    varyantlar: data.varyantlar || [],
    marka: data.marka || '',
    olusturma: Timestamp.now(),
    guncelleme: Timestamp.now(),
  }

  const ref = await koleksiyon(shopId, 'urunler').add(urun)
  return ref.id
}

export async function urunGuncelle(
  shopId: string,
  urunId: string,
  data: Partial<UrunForm>
): Promise<void> {
  const updateData: any = { ...data, guncelleme: Timestamp.now() }
  
  // Slug otomatik güncelle
  if (data.ad && !data.slug) {
    updateData.slug = slugOlustur(data.ad)
  }

  await koleksiyon(shopId, 'urunler').doc(urunId).update(updateData)
}

export async function urunSil(shopId: string, urunId: string): Promise<void> {
  // Soft delete
  await koleksiyon(shopId, 'urunler').doc(urunId).update({
    durum: 'arsivlendi',
    guncelleme: Timestamp.now(),
  })
}

export async function tekUrunGetir(
  shopId: string,
  urunIdOrSlug: string
): Promise<Urun | null> {
  // Önce ID ile dene
  const byId = await koleksiyon(shopId, 'urunler').doc(urunIdOrSlug).get()
  if (byId.exists) {
    return { id: byId.id, ...byId.data() } as Urun
  }

  // Slug ile dene
  const bySlug = await koleksiyon(shopId, 'urunler')
    .where('slug', '==', urunIdOrSlug)
    .where('durum', '==', 'aktif')
    .limit(1)
    .get()

  if (!bySlug.empty) {
    const doc = bySlug.docs[0]
    return { id: doc.id, ...doc.data() } as Urun
  }

  return null
}

export async function urunleriGetir(
  shopId: string,
  filtre: UrunFiltre = {}
): Promise<{ urunler: Urun[]; toplam: number }> {
  let query: any = koleksiyon(shopId, 'urunler')

  // Durum filtresi (varsayılan: aktif)
  const durum = filtre.durum || 'aktif'
  query = query.where('durum', '==', durum)

  // Kategori filtresi
  if (filtre.kategori) {
    query = query.where('kategoriler', 'array-contains', filtre.kategori)
  }

  // Sıralama
  switch (filtre.siralama) {
    case 'fiyat_artan':
      query = query.orderBy('fiyat', 'asc')
      break
    case 'fiyat_azalan':
      query = query.orderBy('fiyat', 'desc')
      break
    case 'yeni':
      query = query.orderBy('olusturma', 'desc')
      break
    default:
      query = query.orderBy('olusturma', 'desc')
  }

  // Sayfalama
  const sayfaBoyut = filtre.sayfaBoyut || 20
  const sayfa = filtre.sayfa || 1
  const offset = (sayfa - 1) * sayfaBoyut

  // Toplam sayıyı al (basit counting — büyük veri setlerinde optimize edilmeli)
  const countSnap = await koleksiyon(shopId, 'urunler')
    .where('durum', '==', durum)
    .count()
    .get()
  const toplam = countSnap.data().count

  // Veriyi al
  const snap = await query.limit(sayfaBoyut).offset(offset).get()
  const urunler = snap.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data(),
  })) as Urun[]

  // Fiyat filtresi (client-side — Firestore range + inequality limiti nedeniyle)
  const filtrelenmis = urunler.filter(u => {
    if (filtre.fiyatMin && u.fiyat < filtre.fiyatMin) return false
    if (filtre.fiyatMax && u.fiyat > filtre.fiyatMax) return false
    if (filtre.arama) {
      const ara = filtre.arama.toLowerCase()
      return u.ad.toLowerCase().includes(ara) || u.aciklama?.toLowerCase().includes(ara)
    }
    return true
  })

  return { urunler: filtrelenmis, toplam }
}

// ─── Kategori CRUD ─────────────────────────────────────────────────────

export async function kategoriOlustur(shopId: string, data: Partial<KategoriForm>): Promise<string> {
  const kategori = {
    shopId,
    ad: data.ad || '',
    slug: data.slug || slugOlustur(data.ad || 'kategori'),
    aciklama: data.aciklama || '',
    ikon: data.ikon || '📦',
    gorsel: data.gorsel || null,
    sira: data.sira ?? 0,
    aktif: data.aktif ?? true,
    ustKategoriId: data.ustKategoriId || null,
    olusturma: Timestamp.now(),
  }

  const ref = await koleksiyon(shopId, 'kategoriler').add(kategori)
  return ref.id
}

export async function kategorileriGetir(shopId: string): Promise<Kategori[]> {
  const snap = await koleksiyon(shopId, 'kategoriler')
    .where('aktif', '==', true)
    .orderBy('sira', 'asc')
    .get()

  return snap.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data(),
  })) as Kategori[]
}

export async function kategoriGuncelle(
  shopId: string,
  katId: string,
  data: Partial<KategoriForm>
): Promise<void> {
  await koleksiyon(shopId, 'kategoriler').doc(katId).update(data)
}

export async function kategoriSil(shopId: string, katId: string): Promise<void> {
  await koleksiyon(shopId, 'kategoriler').doc(katId).update({ aktif: false })
}

// ─── Sipariş ───────────────────────────────────────────────────────────

export async function siparisOlustur(
  shopId: string,
  data: SiparisForm
): Promise<string> {
  // Transaction: stok düş + sipariş oluştur
  return adminDb.runTransaction(async (tx: any) => {
    // 1. Stok kontrolü ve düşürme
    for (const item of data.items) {
      const urunRef = koleksiyon(shopId, 'urunler').doc(item.urunId)
      const urunSnap = await tx.get(urunRef)

      if (!urunSnap.exists) {
        throw new Error(`Ürün bulunamadı: ${item.urunId}`)
      }

      const urunData = urunSnap.data()

      // Stok takipli ise kontrol et
      if (urunData.stok?.takipli) {
        if (item.varyantId) {
          // Varyant stok kontrolü
          const varyant = urunData.varyantlar?.find((v: any) => v.id === item.varyantId)
          if (!varyant) throw new Error(`Varyant bulunamadı: ${item.varyantId}`)
          if (varyant.stokMiktar < item.adet) {
            throw new Error(`Yetersiz stok: ${item.ad} (${varyant.ad})`)
          }
          // Varyant stok düş
          const yeniVaryantlar = urunData.varyantlar.map((v: any) =>
            v.id === item.varyantId
              ? { ...v, stokMiktar: v.stokMiktar - item.adet }
              : v
          )
          tx.update(urunRef, { varyantlar: yeniVaryantlar, guncelleme: Timestamp.now() })
        } else {
          // Ana ürün stok kontrolü
          if (urunData.stok.miktar < item.adet && !urunData.stok.onSiparisIzinli) {
            throw new Error(`Yetersiz stok: ${item.ad}`)
          }
          tx.update(urunRef, {
            'stok.miktar': FieldValue.increment(-item.adet),
            guncelleme: Timestamp.now(),
          })
        }
      }
    }

    // 2. Sipariş oluştur
    const siparisRef = koleksiyon(shopId, 'siparisler').doc()
    const siparis = {
      shopId,
      siparisNo: siparisNoUret(),
      musteriAdi: data.musteriAdi,
      musteriEmail: data.musteriEmail || null,
      musteriTelefon: data.musteriTelefon,
      items: data.items,
      araToplam: data.araToplam,
      kdvToplam: data.kdvToplam,
      kargoUcreti: data.kargoUcreti,
      indirimTutar: data.indirimTutar || 0,
      genelToplam: data.genelToplam,
      durum: 'beklemede' as SiparisDurum,
      teslimatAdresi: data.teslimatAdresi,
      faturaAdresi: data.faturaAdresi || data.teslimatAdresi,
      odemeTipi: data.odemeTipi || 'whatsapp',
      odemeId: null,
      kargoNo: null,
      kargoFirma: null,
      notlar: data.notlar || '',
      kuponKodu: data.kuponKodu || null,
      olusturma: Timestamp.now(),
      guncelleme: Timestamp.now(),
    }

    tx.set(siparisRef, siparis)
    return siparisRef.id
  })
}

export async function siparisleriGetir(
  shopId: string,
  filtre: SiparisFiltre = {}
): Promise<{ siparisler: Siparis[]; toplam: number }> {
  let query: any = koleksiyon(shopId, 'siparisler')
    .orderBy('olusturma', 'desc')

  if (filtre.durum) {
    query = query.where('durum', '==', filtre.durum)
  }

  const sayfaBoyut = filtre.sayfaBoyut || 20
  const sayfa = filtre.sayfa || 1
  const offset = (sayfa - 1) * sayfaBoyut

  const countSnap = await koleksiyon(shopId, 'siparisler').count().get()
  const toplam = countSnap.data().count

  const snap = await query.limit(sayfaBoyut).offset(offset).get()
  const siparisler = snap.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data(),
  })) as Siparis[]

  return { siparisler, toplam }
}

export async function siparisDurumGuncelle(
  shopId: string,
  siparisId: string,
  yeniDurum: SiparisDurum,
  ekData?: Record<string, any>
): Promise<void> {
  await koleksiyon(shopId, 'siparisler').doc(siparisId).update({
    durum: yeniDurum,
    ...ekData,
    guncelleme: Timestamp.now(),
  })
}

export async function tekSiparisGetir(
  shopId: string,
  siparisId: string
): Promise<Siparis | null> {
  const doc = await koleksiyon(shopId, 'siparisler').doc(siparisId).get()
  if (!doc.exists) return null
  return { id: doc.id, ...doc.data() } as Siparis
}

// ─── Storefront (Public) ───────────────────────────────────────────────

/**
 * Mağaza slug'ından shopId bul
 * (esnaf subdomain alanını slug olarak kullanıyoruz)
 */
export async function shopIdBul(shopSlug: string): Promise<string | null> {
  // Önce subdomainUrl ile dene
  let snap = await adminDb.collection('esnaflar')
    .where('subdomainUrl', '==', shopSlug)
    .limit(1)
    .get()

  if (!snap.empty) return snap.docs[0].id

  // Slug ile dene (ad bazlı)
  snap = await adminDb.collection('esnaflar')
    .where('magazaSlug', '==', shopSlug)
    .limit(1)
    .get()

  if (!snap.empty) return snap.docs[0].id

  // Doğrudan ID olabilir
  const doc = await adminDb.collection('esnaflar').doc(shopSlug).get()
  if (doc.exists) return doc.id

  return null
}

/**
 * Public storefront verisi — auth gereksiz
 */
export async function storefrontVeri(shopId: string) {
  const [urunlerSonuc, kategoriler, shopDoc] = await Promise.all([
    urunleriGetir(shopId, { durum: 'aktif', sayfaBoyut: 100 }),
    kategorileriGetir(shopId),
    adminDb.collection('esnaflar').doc(shopId).get(),
  ])

  const shopData = shopDoc.data()

  return {
    magaza: {
      id: shopId,
      ad: shopData?.ad || shopData?.isletmeAdiTam || '',
      sektor: shopData?.sektor || '',
      logo: shopData?.logo || null,
      banner: shopData?.banner || null,
      telefon: shopData?.telefon || '',
      adres: `${shopData?.ilce || ''}, ${shopData?.sehir || ''}`,
    },
    urunler: urunlerSonuc.urunler,
    kategoriler,
  }
}
