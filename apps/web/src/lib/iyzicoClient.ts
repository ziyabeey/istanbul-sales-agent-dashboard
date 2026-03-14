/**
 * iyzicoClient.ts — İyzico Checkout Form API Client
 * 
 * Akış:
 * 1. initialize → Token + Checkout Form HTML döner (3D Secure dahil)
 * 2. Müşteri kart bilgilerini İyzico'nun formuna girer (PCI scope dışı)
 * 3. callback → Token ile sonucu doğrula
 * 4. Başarılıysa sipariş oluştur
 * 
 * Güvenlik:
 * - Kart bilgisi asla sunucuya gelmez
 * - HMAC-SHA256 imza doğrulama
 * - Tüm fiyatlar string formatında (İyzico gereksinimi)
 */

import crypto from 'crypto'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'

const API_KEY = process.env.IYZICO_API_KEY || ''
const SECRET_KEY = process.env.IYZICO_SECRET_KEY || ''
const BASE_URL = process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com'

// ─── Yardımcılar ───────────────────────────────────────────────────────

function generateAuthorizationHeader(uri: string, body: string): string {
  const randomStr = Math.random().toString(36).substring(2, 10) +
                    Date.now().toString(36)
  const hashStr = API_KEY + randomStr + SECRET_KEY + body
  const hash = crypto.createHash('sha1').update(hashStr).digest('base64')
  const authorizationParams = `apiKey:${API_KEY}&randomHeaderValue:${randomStr}&signature:${hash}`
  return `IYZWS ${Buffer.from(authorizationParams).toString('base64')}`
}

async function iyzicoRequest(path: string, body: any): Promise<any> {
  const bodyStr = JSON.stringify(body)
  const authorization = generateAuthorizationHeader(path, bodyStr)

  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authorization,
      'x-iyzi-rnd': crypto.randomBytes(8).toString('hex'),
    },
    body: bodyStr,
  })

  const result = await response.json()
  return result
}

function kurusToIyzico(kurus: number): string {
  return (kurus / 100).toFixed(2)
}

// ─── Taksit Sorgulama ──────────────────────────────────────────────────

export interface TaksitSecenegi {
  taksitSayisi: number
  toplamTutar: string
  aylikTutar: string
  oranFarki: string
}

export interface TaksitSonuc {
  kartTipi: string
  kartIliskisi: string
  kartAdi: string
  taksitler: TaksitSecenegi[]
}

export async function taksitSorgula(binNo: string, fiyatKurus: number): Promise<TaksitSonuc | null> {
  const body = {
    locale: 'tr',
    conversationId: crypto.randomUUID(),
    binNumber: binNo.substring(0, 6),
    price: kurusToIyzico(fiyatKurus),
  }

  const result = await iyzicoRequest('/payment/iyzipos/installment', body)

  if (result.status !== 'success' || !result.installmentDetails?.length) {
    return null
  }

  const detail = result.installmentDetails[0]
  return {
    kartTipi: detail.cardType || '',
    kartIliskisi: detail.cardAssociation || '',
    kartAdi: detail.cardFamilyName || '',
    taksitler: (detail.installmentPrices || []).map((ip: any) => ({
      taksitSayisi: ip.installmentNumber,
      toplamTutar: ip.totalPrice,
      aylikTutar: (parseFloat(ip.totalPrice) / ip.installmentNumber).toFixed(2),
      oranFarki: ip.installmentPrice === ip.totalPrice ? '0' : 
        ((parseFloat(ip.totalPrice) - parseFloat(ip.installmentPrice)) / parseFloat(ip.installmentPrice) * 100).toFixed(1),
    })),
  }
}

// ─── Checkout Form Initialize ──────────────────────────────────────────

export interface CheckoutBaslatParams {
  shopId: string
  siparisId: string
  sepetItems: {
    id: string
    ad: string
    kategori: string
    tip: 'PHYSICAL' | 'VIRTUAL'
    fiyatKurus: number
  }[]
  musteriInfo: {
    id: string
    ad: string
    soyad: string
    email: string
    telefon: string
    tcKimlik?: string
    ip: string
  }
  teslimatAdresi: {
    adSoyad: string
    sehir: string
    ulke: string
    adres: string
    postaKodu?: string
  }
  faturaAdresi?: {
    adSoyad: string
    sehir: string
    ulke: string
    adres: string
    postaKodu?: string
  }
  toplamFiyatKurus: number
  kargoUcretiKurus: number
  taksitSecenekleri?: number[]
}

export interface CheckoutSonuc {
  status: string
  token: string
  checkoutFormContent: string
  paymentPageUrl: string
}

export async function checkoutBaslat(params: CheckoutBaslatParams): Promise<CheckoutSonuc> {
  const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/checkout/callback`
  
  const toplamOdeme = params.toplamFiyatKurus + params.kargoUcretiKurus
  
  const faturaAdresi = params.faturaAdresi || params.teslimatAdresi

  const body: any = {
    locale: 'tr',
    conversationId: params.siparisId,
    price: kurusToIyzico(params.toplamFiyatKurus),
    paidPrice: kurusToIyzico(toplamOdeme),
    currency: 'TRY',
    basketId: `${params.shopId}_${params.siparisId}`,
    paymentGroup: 'PRODUCT',
    callbackUrl,
    enabledInstallments: params.taksitSecenekleri || [1, 2, 3, 6],
    buyer: {
      id: params.musteriInfo.id,
      name: params.musteriInfo.ad,
      surname: params.musteriInfo.soyad,
      gsmNumber: params.musteriInfo.telefon.startsWith('+') 
        ? params.musteriInfo.telefon 
        : `+90${params.musteriInfo.telefon}`,
      email: params.musteriInfo.email,
      identityNumber: params.musteriInfo.tcKimlik || '11111111111',
      registrationAddress: params.teslimatAdresi.adres,
      city: params.teslimatAdresi.sehir,
      country: params.teslimatAdresi.ulke || 'Turkey',
      zipCode: params.teslimatAdresi.postaKodu || '34000',
      ip: params.musteriInfo.ip,
    },
    shippingAddress: {
      contactName: params.teslimatAdresi.adSoyad,
      city: params.teslimatAdresi.sehir,
      country: params.teslimatAdresi.ulke || 'Turkey',
      address: params.teslimatAdresi.adres,
      zipCode: params.teslimatAdresi.postaKodu || '34000',
    },
    billingAddress: {
      contactName: faturaAdresi.adSoyad,
      city: faturaAdresi.sehir,
      country: faturaAdresi.ulke || 'Turkey',
      address: faturaAdresi.adres,
      zipCode: faturaAdresi.postaKodu || '34000',
    },
    basketItems: params.sepetItems.map(item => ({
      id: item.id,
      name: item.ad,
      category1: item.kategori,
      itemType: item.tip,
      price: kurusToIyzico(item.fiyatKurus),
    })),
  }

  // Kargo ücreti varsa sepete ekle
  if (params.kargoUcretiKurus > 0) {
    body.basketItems.push({
      id: 'KARGO',
      name: 'Kargo Ücreti',
      category1: 'Kargo',
      itemType: 'PHYSICAL',
      price: kurusToIyzico(params.kargoUcretiKurus),
    })
  }

  const result = await iyzicoRequest('/payment/iyzipos/checkoutform/initialize/auth/ecom', body)

  // Ödeme kaydını Firestore'a yaz (callback'te eşleştirmek için)
  if (adminDb && result.token) {
    await adminDb.collection('odemeler').doc(result.token).set({
      shopId: params.shopId,
      siparisId: params.siparisId,
      toplamKurus: toplamOdeme,
      durum: 'bekliyor',
      olusturma: Timestamp.now(),
    })
  }

  return {
    status: result.status || 'failure',
    token: result.token || '',
    checkoutFormContent: result.checkoutFormContent || '',
    paymentPageUrl: result.paymentPageUrl || '',
  }
}

// ─── Checkout Form Retrieve (Callback Doğrulama) ───────────────────────

export interface OdemeDogrulamaSonuc {
  basarili: boolean
  paymentId: string
  siparisId: string
  shopId: string
  toplamOdenen: number   // kuruş
  taksitSayisi: number
  kartTipi: string
  kartSonDort: string
  hataMesaji?: string
  hataKodu?: string
}

export async function odemeDogrula(token: string): Promise<OdemeDogrulamaSonuc> {
  const result = await iyzicoRequest('/payment/iyzipos/checkoutform/auth/ecom/detail', {
    locale: 'tr',
    conversationId: token,
    token,
  })

  // Firestore'dan ödeme kaydını al
  let shopId = ''
  let siparisId = ''
  if (adminDb) {
    const odemeDoc = await adminDb.collection('odemeler').doc(token).get()
    if (odemeDoc.exists) {
      const data = odemeDoc.data()
      shopId = data?.shopId || ''
      siparisId = data?.siparisId || ''
    }
  }

  if (result.status === 'success' && result.paymentStatus === 'SUCCESS') {
    if (adminDb) {
      await adminDb.collection('odemeler').doc(token).update({
        durum: 'basarili',
        paymentId: result.paymentId,
        taksitSayisi: result.installment || 1,
        guncelleme: Timestamp.now(),
      })
    }

    return {
      basarili: true,
      paymentId: result.paymentId || '',
      siparisId,
      shopId,
      toplamOdenen: Math.round(parseFloat(result.paidPrice || '0') * 100),
      taksitSayisi: result.installment || 1,
      kartTipi: result.cardType || '',
      kartSonDort: result.lastFourDigits || '',
    }
  }

  const hataMesaji = IYZICO_HATA_KODLARI[result.errorCode] || result.errorMessage || 'Ödeme işlemi başarısız oldu'

  if (adminDb) {
    await adminDb.collection('odemeler').doc(token).update({
      durum: 'basarisiz',
      hataKodu: result.errorCode,
      hataMesaji,
      guncelleme: Timestamp.now(),
    })
  }

  return {
    basarili: false,
    paymentId: '',
    siparisId,
    shopId,
    toplamOdenen: 0,
    taksitSayisi: 0,
    kartTipi: '',
    kartSonDort: '',
    hataMesaji,
    hataKodu: result.errorCode,
  }
}

// ─── İade ──────────────────────────────────────────────────────────────

export interface IadeSonuc {
  basarili: boolean
  iadeId: string
  iadeTutar: number
  hataMesaji?: string
}

export async function iadeYap(
  paymentTransactionId: string,
  iadeTutarKurus: number,
  ip: string
): Promise<IadeSonuc> {
  const result = await iyzicoRequest('/payment/refund', {
    locale: 'tr',
    conversationId: crypto.randomUUID(),
    paymentTransactionId,
    price: kurusToIyzico(iadeTutarKurus),
    currency: 'TRY',
    ip,
  })

  if (result.status === 'success') {
    return {
      basarili: true,
      iadeId: result.paymentId || '',
      iadeTutar: iadeTutarKurus,
    }
  }

  return {
    basarili: false,
    iadeId: '',
    iadeTutar: 0,
    hataMesaji: result.errorMessage || 'İade işlemi başarısız',
  }
}

// ─── İyzico Hata Kodları → Türkçe Mapping ──────────────────────────────

const IYZICO_HATA_KODLARI: Record<string, string> = {
  '10051': 'Kartınızda yeterli limit bulunmamaktadır.',
  '10005': 'İşlem onaylanmadı. Lütfen tekrar deneyin.',
  '10012': 'Geçersiz işlem. Lütfen bankanızla iletişime geçin.',
  '10034': 'Dolandırıcılık şüphesi. Lütfen bankanızla iletişime geçin.',
  '10041': 'Kartınız kayıp/çalıntı olarak bildirilmiş.',
  '10043': 'Kartınız kayıp/çalıntı olarak bildirilmiş.',
  '10054': 'Kartınızın son kullanma tarihi geçmiş.',
  '10057': 'Kart sahibi bu işleme izin vermemektedir.',
  '10058': 'İşlem terminale uygun değil.',
  '10084': 'CVC2 bilgisi hatalı.',
  '10093': 'Kartınız e-ticaret işlemlerine kapalıdır.',
  '10201': 'Kart ile işlem yapılamayacak. 3D Secure gerekli.',
  '10204': 'Ödeme işlemi sırasında genel bir hata oluştu.',
  '10206': 'CVC uzunluğu geçersiz.',
  '10207': 'Banka onay vermedi. Bankanızla iletişime geçin.',
  '10208': 'Kart numarası geçersiz.',
  '10209': 'Kart numarası geçersiz.',
  '10210': 'Kart bulunamadı.',
  '10211': 'Kart limiti yetersiz.',
  '10212': 'Kart bilgileri hatalı.',
  '10215': '3D Secure doğrulaması başarısız oldu.',
  '10226': 'Taksit sayısı geçersiz. Bankanızla iletişime geçin.',
}
