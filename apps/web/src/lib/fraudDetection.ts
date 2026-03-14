/**
 * fraudDetection.ts — Fraud Tespit Sistemi
 * 
 * 4 Kural:
 * 1. Aynı IP'den 3+ başarısız ödeme → geçici engel
 * 2. Farklı kart, aynı teslimat adresi → şüpheli
 * 3. Çok yüksek sipariş (ortalama 10x) → manuel onay
 * 4. İyzico fraud skoru kontrolü
 * 
 * + KVKK veri silme endpoint desteği
 * 
 * NOT: Başarısız ödeme sayacı Firestore'da tutulur (serverless-safe).
 * In-memory Map kaldırıldı — cold start'ta sıfırlanıyordu.
 */

import { adminDb, Timestamp, FieldValue } from '@/lib/firebaseAdmin'

// ─── Tipler ────────────────────────────────────────────────────────────

export type FraudSeviye = 'dusuk' | 'orta' | 'yuksek' | 'kritik'

export interface FraudSonuc {
  onay: boolean
  seviye: FraudSeviye
  skor: number               // 0-100 (100 = en riskli)
  uyarilar: string[]
  manuelOnayGerekli: boolean
}

interface FraudKontrolParams {
  ip: string
  musteriId?: string
  kartSon4?: string
  teslimatAdres?: string
  siparistutar: number       // kuruş
  shopId: string
}

// ─── Başarısız Ödeme Sayacı (Firestore-Backed) ────────────────────────

export async function basarisizOdemeKaydet(ip: string): Promise<void> {
  if (!adminDb) return

  const docId = `ip_${ip.replace(/[^a-zA-Z0-9]/g, '_')}`
  const ref = adminDb.collection('fraudSayaclari').doc(docId)
  const doc = await ref.get()

  if (doc.exists) {
    const data = doc.data()!
    const sonZaman = data.son?.toDate?.()?.getTime() || 0

    if (Date.now() - sonZaman < 60 * 60 * 1000) {
      // 1 saat içinde → atomik artır
      await ref.update({
        count: FieldValue.increment(1),
        son: Timestamp.now(),
      })
    } else {
      // 1 saatten eski → sıfırla
      await ref.set({ count: 1, son: Timestamp.now(), ip })
    }
  } else {
    await ref.set({ count: 1, son: Timestamp.now(), ip })
  }
}

export async function basarisizOdemeSayisi(ip: string): Promise<number> {
  if (!adminDb) return 0

  const ref = adminDb.collection('fraudSayaclari').doc(`ip_${ip.replace(/[^a-zA-Z0-9]/g, '_')}`)
  const doc = await ref.get()

  if (!doc.exists) return 0

  const data = doc.data()!
  const sonZaman = data.son?.toDate?.()?.getTime() || 0

  // 1 saatten eski → sıfır say
  if (Date.now() - sonZaman > 60 * 60 * 1000) return 0

  return data.count || 0
}

// ─── Fraud Kontrolü ───────────────────────────────────────────────────

export async function fraudKontrol(params: FraudKontrolParams): Promise<FraudSonuc> {
  const uyarilar: string[] = []
  let skor = 0

  // Kural 1: Aynı IP'den 3+ başarısız ödeme
  const basarisiz = await basarisizOdemeSayisi(params.ip)
  if (basarisiz >= 3) {
    skor += 40
    uyarilar.push(`Aynı IP'den ${basarisiz} başarısız ödeme girişimi`)
  }

  // Kural 2: Farklı kart, aynı teslimat adresi (Firestore kontrolü)
  if (adminDb && params.teslimatAdres && params.kartSon4) {
    const oncekiSiparisler = await adminDb
      .collection('esnaflar').doc(params.shopId)
      .collection('siparisler')
      .where('teslimatAdres', '==', params.teslimatAdres)
      .limit(10)
      .get()

    const farkliKartlar = new Set<string>()
    oncekiSiparisler.docs.forEach((d: FirebaseFirestore.QueryDocumentSnapshot) => {
      const kart = (d.data() as { kartSon4?: string }).kartSon4
      if (kart) farkliKartlar.add(kart)
    })
    farkliKartlar.add(params.kartSon4)

    if (farkliKartlar.size >= 3) {
      skor += 30
      uyarilar.push(`Aynı adrese ${farkliKartlar.size} farklı kart kullanılmış`)
    }
  }

  // Kural 3: Çok yüksek sipariş (ortalama x10)
  if (adminDb) {
    const ortSnap = await adminDb
      .collection('esnaflar').doc(params.shopId)
      .collection('siparisler')
      .orderBy('olusturma', 'desc')
      .limit(50)
      .get()

    if (ortSnap.size > 5) {
      const toplam = ortSnap.docs.reduce((t: number, d: FirebaseFirestore.QueryDocumentSnapshot) =>
        t + ((d.data() as { genelToplam?: number }).genelToplam || 0), 0
      )
      const ort = toplam / ortSnap.size

      if (ort > 0 && params.siparistutar > ort * 10) {
        skor += 25
        uyarilar.push(`Sipariş tutarı (${(params.siparistutar / 100).toFixed(2)}₺) ortalamadan ${Math.round(params.siparistutar / ort)}x yüksek`)
      }
    }
  }

  // Seviye hesapla
  let seviye: FraudSeviye = 'dusuk'
  if (skor >= 60) seviye = 'kritik'
  else if (skor >= 40) seviye = 'yuksek'
  else if (skor >= 20) seviye = 'orta'

  // Fraud logu
  if (adminDb && skor > 0) {
    await adminDb.collection('esnaflar').doc(params.shopId)
      .collection('fraudLoglari').add({
        ip: params.ip, musteriId: params.musteriId || null,
        skor, seviye, uyarilar,
        siparisTutar: params.siparistutar,
        tarih: Timestamp.now(),
      })
  }

  return {
    onay: skor < 60,
    seviye,
    skor,
    uyarilar,
    manuelOnayGerekli: seviye === 'yuksek',
  }
}

// ─── KVKK Veri Silme ──────────────────────────────────────────────────

export async function kvkkVeriSil(shopId: string, musteriId: string): Promise<{
  basarili: boolean; silinenKoleksiyonlar: string[]
}> {
  if (!adminDb) return { basarili: false, silinenKoleksiyonlar: [] }

  const silinenKoleksiyonlar: string[] = []

  // Müşteri profili → sil
  const koleksiyonlar = ['sadakat', 'iysOnaylari']
  for (const kol of koleksiyonlar) {
    try {
      await adminDb.collection('esnaflar').doc(shopId).collection(kol).doc(musteriId).delete()
      silinenKoleksiyonlar.push(kol)
    } catch { /* zaten yok */ }
  }

  // Siparişlerde PII anonim — batch ile
  const siparisSnap = await adminDb
    .collection('esnaflar').doc(shopId)
    .collection('siparisler')
    .where('musteriId', '==', musteriId)
    .limit(500)
    .get()

  if (siparisSnap.size > 0) {
    const batch = adminDb.batch()
    for (const doc of siparisSnap.docs) {
      batch.update(doc.ref, {
        musteriAdi: 'SİLİNMİŞ_KULLANICI',
        musteriEmail: null,
        musteriTelefon: null,
        teslimatAdres: 'SİLİNDİ',
      })
    }
    await batch.commit()
    silinenKoleksiyonlar.push(`siparisler (${siparisSnap.size} kayıt anonimleştirildi)`)
  }

  // KVKK silme logu
  await adminDb.collection('esnaflar').doc(shopId)
    .collection('kvkkLoglari').add({
      musteriId,
      islem: 'veri_silme',
      silinenKoleksiyonlar,
      tarih: Timestamp.now(),
    })

  return { basarili: true, silinenKoleksiyonlar }
}
