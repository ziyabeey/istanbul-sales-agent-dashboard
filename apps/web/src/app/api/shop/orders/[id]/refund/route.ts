import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { apiGuard } from '@/lib/apiGuard'
import { iadeYap } from '@/lib/iyzicoClient'
import { siparisDurumGuncelle, tekSiparisGetir } from '@/lib/magazaDB'

// POST — Sipariş iadesi
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await apiGuard(request, { requireAdminToken: true })
  if (!guard.ok) return guard.response

  if (!adminDb) {
    return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
  }

  try {
    const { id: siparisId } = await params
    const body = await request.json()
    const { shopId, iadeTutarKurus, neden } = body

    if (!shopId || !iadeTutarKurus) {
      return NextResponse.json({ error: 'shopId ve iadeTutarKurus zorunlu' }, { status: 400 })
    }

    // Siparişi kontrol et
    const siparis = await tekSiparisGetir(shopId, siparisId)
    if (!siparis) {
      return NextResponse.json({ error: 'Sipariş bulunamadı' }, { status: 404 })
    }

    if (!siparis.odemeId) {
      return NextResponse.json({ error: 'Bu sipariş için ödeme kaydı bulunamadı' }, { status: 400 })
    }

    // IP adresini al
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || '127.0.0.1'

    // İyzico iade çağrısı
    const sonuc = await iadeYap(siparis.odemeId, iadeTutarKurus, ip)

    if (sonuc.basarili) {
      // Tam iade mi kısmi iade mi?
      const tamIade = iadeTutarKurus >= siparis.genelToplam
      
      await siparisDurumGuncelle(shopId, siparisId, tamIade ? 'iade' : siparis.durum, {
        iadeId: sonuc.iadeId,
        iadeTutar: iadeTutarKurus,
        iadeNeden: neden || '',
        iadeTarihi: new Date().toISOString(),
      })

      return NextResponse.json({
        ok: true,
        iadeId: sonuc.iadeId,
        iadeTutar: iadeTutarKurus,
        tamIade,
      })
    }

    return NextResponse.json(
      { error: sonuc.hataMesaji || 'İade başarısız' },
      { status: 502 }
    )
  } catch (error: any) {
    // console.error('[İADE HATA]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
