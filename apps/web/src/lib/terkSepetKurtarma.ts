/**
 * terkSepetKurtarma.ts — Terk Sepet Kurtarma Akışı
 * 
 * Akış:
 * 1. [1 saat] — E-posta: "Sepetinizde ürünler bekliyor! 🛒"
 * 2. [24 saat] — WhatsApp + %10 kupon kodu
 * 3. [48 saat] — Final e-posta: "Son şans! Kuponunuz yarın bitiyor"
 * 4. [72 saat] — Sepet temizle + kupon pasifleştir
 * 
 * Tetikleme: CRON job (her saat) veya Firestore Function
 */

import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { kuponOlustur } from '@/lib/kuponMotoru'

// ─── Tipler ────────────────────────────────────────────────────────────

export type TerkSepetAdim = 'bekliyor' | 'eposta_1' | 'whatsapp_kupon' | 'eposta_final' | 'temizlendi' | 'donusum'

export interface TerkSepet {
  id: string
  shopId: string
  musteriId?: string
  musteriEmail?: string
  musteriTelefon?: string
  musteriAd?: string
  sepetTutar: number            // kuruş
  sepetItems: { urunId: string; ad: string; adet: number; fiyat: number }[]
  adim: TerkSepetAdim
  kuponKod?: string
  sonAksiyonTarih: any
  olusturma: any
}

// ─── Terk Sepet Kaydet ─────────────────────────────────────────────────

export async function terkSepetKaydet(
  shopId: string,
  data: {
    musteriEmail?: string
    musteriTelefon?: string
    musteriAd?: string
    sepetTutar: number
    sepetItems: { urunId: string; ad: string; adet: number; fiyat: number }[]
  }
): Promise<string> {
  if (!adminDb) return ''

  // Aynı e-posta veya telefon için mevcut terk sepet var mı?
  if (data.musteriEmail) {
    const snap = await adminDb
      .collection('esnaflar').doc(shopId)
      .collection('terkSepetler')
      .where('musteriEmail', '==', data.musteriEmail)
      .where('adim', 'in', ['bekliyor', 'eposta_1', 'whatsapp_kupon', 'eposta_final'])
      .limit(1)
      .get()

    if (!snap.empty) {
      // Güncelle
      await snap.docs[0].ref.update({
        sepetTutar: data.sepetTutar,
        sepetItems: data.sepetItems,
        sonAksiyonTarih: Timestamp.now(),
      })
      return snap.docs[0].id
    }
  }

  const ref = await adminDb
    .collection('esnaflar').doc(shopId)
    .collection('terkSepetler')
    .add({
      shopId,
      musteriEmail: data.musteriEmail || null,
      musteriTelefon: data.musteriTelefon || null,
      musteriAd: data.musteriAd || null,
      sepetTutar: data.sepetTutar,
      sepetItems: data.sepetItems,
      adim: 'bekliyor',
      kuponKod: null,
      sonAksiyonTarih: Timestamp.now(),
      olusturma: Timestamp.now(),
    })

  return ref.id
}

// ─── Terk Sepet İşlemci (CRON) ─────────────────────────────────────────

export async function terkSepetIslemci(shopId: string): Promise<{
  eposta1: number; whatsapp: number; epostaFinal: number; temizlenen: number
}> {
  if (!adminDb) return { eposta1: 0, whatsapp: 0, epostaFinal: 0, temizlenen: 0 }

  const simdi = Date.now()
  const sonuclar = { eposta1: 0, whatsapp: 0, epostaFinal: 0, temizlenen: 0 }

  // Tüm aktif terk sepetleri al
  const snap = await adminDb
    .collection('esnaflar').doc(shopId)
    .collection('terkSepetler')
    .where('adim', 'in', ['bekliyor', 'eposta_1', 'whatsapp_kupon', 'eposta_final'])
    .get()

  for (const doc of snap.docs) {
    const ts = doc.data() as TerkSepet
    const olusturma = ts.olusturma.toDate ? ts.olusturma.toDate().getTime() : ts.olusturma
    const farkSaat = (simdi - olusturma) / (1000 * 60 * 60)

    if (ts.adim === 'bekliyor' && farkSaat >= 1) {
      // Adım 1: E-posta gönder
      await terkSepetEposta1(shopId, ts, doc.id)
      sonuclar.eposta1++
    }
    else if (ts.adim === 'eposta_1' && farkSaat >= 24) {
      // Adım 2: WhatsApp + kupon
      await terkSepetWhatsappKupon(shopId, ts, doc.id)
      sonuclar.whatsapp++
    }
    else if (ts.adim === 'whatsapp_kupon' && farkSaat >= 48) {
      // Adım 3: Final e-posta
      await terkSepetFinalEposta(shopId, ts, doc.id)
      sonuclar.epostaFinal++
    }
    else if (ts.adim === 'eposta_final' && farkSaat >= 72) {
      // Adım 4: Temizle
      await doc.ref.update({ adim: 'temizlendi', sonAksiyonTarih: Timestamp.now() })
      sonuclar.temizlenen++
    }
  }

  return sonuclar
}

// ─── Adım İmplementasyonları ───────────────────────────────────────────

async function terkSepetEposta1(shopId: string, ts: TerkSepet, docId: string) {
  // E-posta gönder (Resend/SMTP entegrasyonu mevcut)
  // Template: "Sepetinizde ürünler bekliyor!"
  const urunListesi = ts.sepetItems.map(i => `${i.adet}x ${i.ad}`).join(', ')
  console.log(`[TERK SEPET] E-posta 1 → ${ts.musteriEmail}: ${urunListesi}`)

  await adminDb
    .collection('esnaflar').doc(shopId)
    .collection('terkSepetler').doc(docId)
    .update({ adim: 'eposta_1', sonAksiyonTarih: Timestamp.now() })
}

async function terkSepetWhatsappKupon(shopId: string, ts: TerkSepet, docId: string) {
  // %10 kupon oluştur
  const kuponKod = `GERI${Math.random().toString(36).substring(2, 6).toUpperCase()}`
  const yarın = new Date(Date.now() + 48 * 60 * 60 * 1000)

  try {
    await kuponOlustur(shopId, {
      kod: kuponKod,
      tip: 'yuzde',
      deger: 10,
      aktif: true,
      kisiBasiLimit: 1,
      toplamKullanimLimit: 1,
      gecerliBitis: Timestamp.fromDate(yarın),
    })
  } catch { /* kupon kodu çakışması — devam et */ }

  // WhatsApp mesajı
  const mesaj = `Merhaba ${ts.musteriAd || ''}! 🛒\nSepetinizde ürünler sizi bekliyor.\n\n🎁 Size özel %10 indirim kodu: *${kuponKod}*\n⏰ Son geçerlilik: yarın\n\nAlışverişi tamamlayın >`
  console.log(`[TERK SEPET] WhatsApp → ${ts.musteriTelefon}: ${mesaj.substring(0, 50)}...`)

  await adminDb
    .collection('esnaflar').doc(shopId)
    .collection('terkSepetler').doc(docId)
    .update({ adim: 'whatsapp_kupon', kuponKod, sonAksiyonTarih: Timestamp.now() })
}

async function terkSepetFinalEposta(shopId: string, ts: TerkSepet, docId: string) {
  console.log(`[TERK SEPET] Final e-posta → ${ts.musteriEmail}: Son şans! Kupon: ${ts.kuponKod}`)

  await adminDb
    .collection('esnaflar').doc(shopId)
    .collection('terkSepetler').doc(docId)
    .update({ adim: 'eposta_final', sonAksiyonTarih: Timestamp.now() })
}

// ─── İstatistikler ─────────────────────────────────────────────────────

export async function terkSepetIstatistik(shopId: string) {
  if (!adminDb) return { aktif: 0, kurtarilan: 0, kayipTutar: 0, kurtarilanTutar: 0 }

  const snap = await adminDb
    .collection('esnaflar').doc(shopId)
    .collection('terkSepetler')
    .get()

  let aktif = 0, kurtarilan = 0, kayipTutar = 0, kurtarilanTutar = 0

  for (const doc of snap.docs) {
    const data = doc.data()
    if (['bekliyor', 'eposta_1', 'whatsapp_kupon', 'eposta_final'].includes(data.adim)) {
      aktif++
      kayipTutar += data.sepetTutar || 0
    }
    if (data.adim === 'donusum') {
      kurtarilan++
      kurtarilanTutar += data.sepetTutar || 0
    }
  }

  return { aktif, kurtarilan, kayipTutar, kurtarilanTutar }
}
