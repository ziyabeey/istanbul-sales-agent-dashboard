import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { apiGuard } from '@/lib/apiGuard'
import { gonderiOlusturVeKaydet } from '@/lib/kargoAdapter'
import { siparisDurumGuncelle, tekSiparisGetir } from '@/lib/magazaDB'

// POST — Siparişi kargoya ver
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
    const { shopId, firmaId } = body

    if (!shopId || !firmaId) {
      return NextResponse.json({ error: 'shopId ve firmaId zorunlu' }, { status: 400 })
    }

    // Siparişi kontrol et
    const siparis = await tekSiparisGetir(shopId, siparisId)
    if (!siparis) {
      return NextResponse.json({ error: 'Sipariş bulunamadı' }, { status: 404 })
    }

    if (siparis.durum !== 'odeme_onaylandi' && siparis.durum !== 'hazirlaniyor') {
      return NextResponse.json({ error: 'Sipariş kargoya verilemez durumda' }, { status: 400 })
    }

    // Mağaza bilgilerini al
    const shopDoc = await adminDb.collection('esnaflar').doc(shopId).get()
    const shopData = shopDoc.data() || {}

    // Kargo gönderisi oluştur
    const sonuc = await gonderiOlusturVeKaydet(firmaId, {
      siparisId,
      shopId,
      aliciAd: siparis.teslimatAdresi.adSoyad,
      aliciTelefon: siparis.musteriTelefon,
      aliciAdres: siparis.teslimatAdresi.adres,
      aliciIlce: siparis.teslimatAdresi.ilce,
      aliciSehir: siparis.teslimatAdresi.sehir,
      aliciPK: siparis.teslimatAdresi.postaKodu || '34000',
      gondericiAd: shopData.ad || '',
      gondericiTelefon: shopData.telefon || '',
      gondericiAdres: shopData.adres || '',
      gondericiSehir: shopData.sehir || '',
      agirlik: 500, // Default — gerçek uygulamada ürünlerden hesaplanır
      aciklama: `Sipariş #${siparis.siparisNo}`,
    })

    if (!sonuc.basarili) {
      return NextResponse.json({ error: sonuc.hataMesaji || 'Kargo oluşturulamadı' }, { status: 502 })
    }

    // Sipariş durumunu güncelle
    await siparisDurumGuncelle(shopId, siparisId, 'kargoda', {
      kargoNo: sonuc.takipNo,
      kargoFirma: firmaId,
    })

    return NextResponse.json({
      ok: true,
      takipNo: sonuc.takipNo,
      etiketUrl: sonuc.etiketUrl,
      tahminiTeslim: sonuc.tahminiTeslim,
    })
  } catch (error: any) {
    // console.error('[KARGO HATA]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
