import crypto from 'crypto'

const IYZICO_API_KEY = process.env.IYZICO_API_KEY!
const IYZICO_SECRET_KEY = process.env.IYZICO_SECRET_KEY!
const IYZICO_BASE_URL = process.env.IYZICO_BASE_URL! // https://sandbox-api.iyzipay.com veya live

export async function iyzicoLinkOlustur(params: {
    esnafId: string
    musteriAdi: string
    telefon: string
    hizmet: string
    tutar: number
}): Promise<string> {

    // İyzico Link API (Payment Product) MOCK IMPLEMENTATION
    // Normalde POST /v2/iyziup/form/initialize çağrısı veya /v2/payment/pay-with-link

    const token = crypto.randomBytes(16).toString('hex')
    const odemeLinki = `https://pay.kepenk.ai/link/${token}`

    // Ödeme isteğini Firestore'a kaydet (Webhook ile eşleştirmek için)
    const { adminDb, Timestamp } = await import('./firebaseAdmin')

    await adminDb.collection('odemeLinkleri').doc(token).set({
        esnafId: params.esnafId,
        musteriAdi: params.musteriAdi,
        telefon: params.telefon,
        hizmet: params.hizmet,
        tutar: params.tutar,
        durum: 'bekliyor',
        olusturma: Timestamp.now()
    })

    return odemeLinki
}
