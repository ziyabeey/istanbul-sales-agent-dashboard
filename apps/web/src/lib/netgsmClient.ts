/**
 * netgsmClient.ts — NetGSM SMS Entegrasyonu + IYS Uyumluluk
 */

import { adminDb, Timestamp } from '@/lib/firebaseAdmin'

// ─── Interface ─────────────────────────────────────────────────────────

export interface SMSParams {
  to: string; message: string; header?: string; iysFilter?: boolean
}

export interface SMSResult {
  success: boolean; messageId?: string; errorCode?: string; errorMessage?: string
}

export interface SMSProvider {
  send(params: SMSParams): Promise<SMSResult>
  getBalance(): Promise<number>
}

// ─── NetGSM Implementation ────────────────────────────────────────────

const NETGSM_BASE = 'https://api.netgsm.com.tr'

export class NetGSMProvider implements SMSProvider {
  private usercode: string
  private password: string
  private defaultHeader: string

  constructor(usercode?: string, password?: string, header?: string) {
    this.usercode = usercode || process.env.NETGSM_USERCODE || ''
    this.password = password || process.env.NETGSM_PASSWORD || ''
    this.defaultHeader = header || process.env.NETGSM_HEADER || 'KEPENK'
  }

  async send(params: SMSParams): Promise<SMSResult> {
    try {
      const url = new URL(`${NETGSM_BASE}/sms/send/get`)
      url.searchParams.set('usercode', this.usercode)
      url.searchParams.set('password', this.password)
      url.searchParams.set('gsmno', params.to.replace(/\D/g, ''))
      url.searchParams.set('message', params.message)
      url.searchParams.set('msgheader', (params.header || this.defaultHeader).slice(0, 11))
      if (params.iysFilter) url.searchParams.set('filter', '1')

      const response = await fetch(url.toString())
      const text = await response.text()
      const code = text.trim().split(' ')[0]

      if (code === '00' || code === '01' || code === '02') {
        return { success: true, messageId: text.trim().split(' ')[1] || code }
      }

      const hatalar: Record<string, string> = {
        '20': 'Türkçe karakter sorunu', '30': 'Geçersiz kullanıcı/şifre',
        '40': 'Sender ID tanımsız', '50': 'IYS hata', '51': 'IYS izni yok',
      }
      return { success: false, errorCode: code, errorMessage: hatalar[code] || `Hata: ${code}` }
    } catch (err: any) {
      return { success: false, errorCode: 'NETWORK', errorMessage: err.message }
    }
  }

  async getBalance(): Promise<number> {
    try {
      const url = `${NETGSM_BASE}/balance/list/get?usercode=${this.usercode}&password=${this.password}&stip=2`
      const res = await fetch(url)
      return parseInt(await res.text()) || 0
    } catch { return 0 }
  }
}

// ─── SMS Şablonları ────────────────────────────────────────────────────

export type SMSTetikleyici =
  | 'ORDER_CONFIRMED' | 'ORDER_SHIPPED' | 'ORDER_DELIVERED'
  | 'ORDER_CANCELLED' | 'REFUND_PROCESSED'
  | 'ABANDONED_CART_1H' | 'ABANDONED_CART_24H'
  | 'BACK_IN_STOCK' | 'PRICE_DROP' | 'BIRTHDAY_COUPON' | 'WIN_BACK'
  | 'LOW_STOCK_ALERT'

export interface SMSSablon {
  id: SMSTetikleyici; ad: string; kategori: 'siparis' | 'pazarlama' | 'bildirim'
  iysGerekli: boolean; varsayilanMetin: string; degiskenler: string[]
}

export const SMS_SABLONLARI: SMSSablon[] = [
  { id: 'ORDER_CONFIRMED', ad: 'Sipariş Onayı', kategori: 'siparis', iysGerekli: false,
    varsayilanMetin: 'Merhaba {{ad}}, {{magaza_adi}} siparişiniz alındı! 🎉\nSipariş No: #{{siparis_no}}\nTutar: {{tutar}} ₺',
    degiskenler: ['ad', 'magaza_adi', 'siparis_no', 'tutar'] },
  { id: 'ORDER_SHIPPED', ad: 'Kargoya Verildi', kategori: 'siparis', iysGerekli: false,
    varsayilanMetin: '{{ad}}, siparişiniz kargoya verildi!\nKargo: {{kargo_firmasi}}\nTakip No: {{takip_no}}',
    degiskenler: ['ad', 'kargo_firmasi', 'takip_no'] },
  { id: 'ORDER_DELIVERED', ad: 'Teslim Edildi', kategori: 'siparis', iysGerekli: false,
    varsayilanMetin: '{{ad}}, siparişiniz teslim edildi! Memnun kaldıysanız yorum bırakın 👉 {{yorum_linki}}',
    degiskenler: ['ad', 'yorum_linki', 'magaza_adi'] },
  { id: 'ORDER_CANCELLED', ad: 'Sipariş İptali', kategori: 'siparis', iysGerekli: false,
    varsayilanMetin: '{{ad}}, #{{siparis_no}} nolu siparişiniz iptal edildi.\nİade süreci: 3-5 iş günü',
    degiskenler: ['ad', 'siparis_no'] },
  { id: 'REFUND_PROCESSED', ad: 'İade İşlendi', kategori: 'siparis', iysGerekli: false,
    varsayilanMetin: '{{ad}}, {{tutar}} ₺ iadeniz işleme alındı. 3-5 iş günü içinde hesabınıza yansır.',
    degiskenler: ['ad', 'tutar'] },
  { id: 'ABANDONED_CART_1H', ad: 'Terk Sepet (1 saat)', kategori: 'pazarlama', iysGerekli: true,
    varsayilanMetin: '{{ad}}, sepetinizde ürünler bekliyor!\n{{urun_adi}} stokta azalıyor.\nHemen tamamla: {{link}}',
    degiskenler: ['ad', 'urun_adi', 'link'] },
  { id: 'ABANDONED_CART_24H', ad: 'Terk Sepet (24 saat)', kategori: 'pazarlama', iysGerekli: true,
    varsayilanMetin: 'Son şans! 🔥 {{urun_adi}} için %{{indirim}} indirim:\nKod: {{kupon_kodu}}\n{{link}}',
    degiskenler: ['urun_adi', 'indirim', 'kupon_kodu', 'link'] },
  { id: 'BACK_IN_STOCK', ad: 'Stoka Geri Dönüş', kategori: 'pazarlama', iysGerekli: true,
    varsayilanMetin: '{{ad}}, beklediğiniz ürün geldi! {{urun_adi}} stoka girdi.\n{{link}}',
    degiskenler: ['ad', 'urun_adi', 'link'] },
  { id: 'PRICE_DROP', ad: 'Fiyat Düşüşü', kategori: 'pazarlama', iysGerekli: true,
    varsayilanMetin: '{{ad}}, {{urun_adi}} fiyatı düştü! {{eski_fiyat}}₺ → {{yeni_fiyat}}₺\n{{link}}',
    degiskenler: ['ad', 'urun_adi', 'eski_fiyat', 'yeni_fiyat', 'link'] },
  { id: 'BIRTHDAY_COUPON', ad: 'Doğum Günü', kategori: 'pazarlama', iysGerekli: true,
    varsayilanMetin: 'İyi ki doğdunuz {{ad}}! 🎂 Size özel %{{indirim}} indirim: {{kupon_kodu}}',
    degiskenler: ['ad', 'indirim', 'kupon_kodu'] },
  { id: 'WIN_BACK', ad: 'Geri Kazan', kategori: 'pazarlama', iysGerekli: true,
    varsayilanMetin: 'Sizi özledik {{ad}}! Dönüş hediyeniz: HOSGELDIN → %15 indirim\n{{link}}',
    degiskenler: ['ad', 'link'] },
  { id: 'LOW_STOCK_ALERT', ad: 'Düşük Stok', kategori: 'bildirim', iysGerekli: false,
    varsayilanMetin: '⚠️ {{magaza_adi}}: {{urun_adi}} stoku kritik! (Kalan: {{stok_miktar}})',
    degiskenler: ['magaza_adi', 'urun_adi', 'stok_miktar'] },
]

// ─── Template Render ───────────────────────────────────────────────────

export function smsRender(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => String(vars[key] ?? `{{${key}}}`))
}

// ─── IYS ───────────────────────────────────────────────────────────────

export async function iysSmsOnayla(shopId: string, telefon: string, onay: boolean): Promise<void> {
  if (!adminDb) return
  await adminDb.collection('esnaflar').doc(shopId)
    .collection('iysOnaylari').doc(telefon.replace(/\D/g, ''))
    .set({ telefon, sms: onay, consentDate: Timestamp.now(), source: 'web', lastUpdated: Timestamp.now() }, { merge: true })
}

export async function iysSmsKontrol(shopId: string, telefon: string): Promise<boolean> {
  if (!adminDb) return false
  const doc = await adminDb.collection('esnaflar').doc(shopId)
    .collection('iysOnaylari').doc(telefon.replace(/\D/g, '')).get()
  return doc.exists ? (doc.data()?.sms === true) : false
}

// ─── SMS Gönderim + Loglama ────────────────────────────────────────────

let _netgsmInstance: NetGSMProvider | null = null
function getNetGSM(): NetGSMProvider {
  if (!_netgsmInstance) _netgsmInstance = new NetGSMProvider()
  return _netgsmInstance
}

export async function smsGonderVeLogla(
  shopId: string, telefon: string, tetikleyici: SMSTetikleyici,
  degiskenler: Record<string, string | number>, ozelMetin?: string
): Promise<SMSResult> {
  const sablon = SMS_SABLONLARI.find(s => s.id === tetikleyici)
  if (!sablon) return { success: false, errorMessage: `Şablon bulunamadı: ${tetikleyici}` }

  if (sablon.iysGerekli) {
    const izin = await iysSmsKontrol(shopId, telefon)
    if (!izin) return { success: false, errorCode: 'IYS_REJECTED', errorMessage: 'IYS izni yok' }
  }

  const mesaj = ozelMetin || smsRender(sablon.varsayilanMetin, degiskenler)
  const sonuc = await getNetGSM().send({ to: telefon, message: mesaj, iysFilter: sablon.iysGerekli })

  if (adminDb) {
    await adminDb.collection('esnaflar').doc(shopId).collection('smsLoglari')
      .add({ telefon, tetikleyici, mesaj: mesaj.slice(0, 160), basarili: sonuc.success,
        messageId: sonuc.messageId || null, hata: sonuc.errorMessage || null, tarih: Timestamp.now() })
  }

  return sonuc
}

// ─── İstatistikler ─────────────────────────────────────────────────────

export async function smsIstatistik(shopId: string) {
  if (!adminDb) return { toplam: 0, basarili: 0, basarisiz: 0 }
  const snap = await adminDb.collection('esnaflar').doc(shopId)
    .collection('smsLoglari').orderBy('tarih', 'desc').limit(1000).get()
  let basarili = 0, basarisiz = 0
  snap.docs.forEach((d: any) => { if (d.data().basarili) basarili++; else basarisiz++ })
  return { toplam: snap.size, basarili, basarisiz }
}

// ─── Backward Compatibility ────────────────────────────────────────────
// Eski route'lar bu isimleri kullanıyor

export async function otpGonderNetgsm(telefon: string, kod: string): Promise<SMSResult> {
  return getNetGSM().send({ to: telefon, message: `Giriş kodunuz: ${kod}` })
}

export async function smsSend(telefon: string, mesaj: string): Promise<SMSResult> {
  return getNetGSM().send({ to: telefon, message: mesaj })
}

