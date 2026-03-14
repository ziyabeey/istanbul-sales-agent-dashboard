import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { odemeDogrula } from '@/lib/iyzicoClient'
import { siparisDurumGuncelle } from '@/lib/magazaDB'

// POST — İyzico 3D Secure callback (İyzico bu endpoint'e POST yapar)
export async function POST(request: Request) {
  if (!adminDb) {
    return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
  }

  try {
    // İyzico form-encoded body gönderir
    const formData = await request.formData()
    let token = formData.get('token') as string | null

    if (!token) {
      // Fallback: JSON body
      try {
        const body = await request.json() as Record<string, unknown>
        token = typeof body.token === 'string' ? body.token : null
      } catch {
        // JSON parse de başarısız
      }

      if (!token) {
        return redirectToResult('hata', 'Token bulunamadı')
      }
    }

    // İyzico'dan ödeme sonucunu doğrula
    const sonuc = await odemeDogrula(token)

    if (sonuc.basarili) {
      // Sipariş durumunu güncelle
      if (sonuc.shopId && sonuc.siparisId) {
        await siparisDurumGuncelle(sonuc.shopId, sonuc.siparisId, 'odeme_onaylandi', {
          odemeId: sonuc.paymentId,
          odemeTipi: 'iyzico',
        })
      }

      // Başarı sayfasına yönlendir
      return redirectToResult('basarili', undefined, sonuc.siparisId, sonuc.shopId)
    }

    // Başarısız — hata sayfasına yönlendir
    return redirectToResult('hata', sonuc.hataMesaji || 'Ödeme başarısız oldu')
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
    console.error('[CHECKOUT CALLBACK HATA]', message)
    return redirectToResult('hata', 'Beklenmeyen bir hata oluştu')
  }
}

function redirectToResult(
  durum: 'basarili' | 'hata',
  hataMesaji?: string,
  siparisId?: string,
  shopId?: string
): NextResponse {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const params = new URLSearchParams()
  params.set('durum', durum)
  if (hataMesaji) params.set('mesaj', hataMesaji)
  if (siparisId) params.set('siparis', siparisId)
  if (shopId) params.set('shop', shopId)

  return NextResponse.redirect(`${baseUrl}/odeme/sonuc?${params.toString()}`)
}
