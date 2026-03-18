import { NextResponse } from 'next/server'
import { nakitAkisiKontrolMekanizmasi } from '@/lib/finansAjani'
import { veresiyeTahsilatMotoru } from '@/utils/tahsilatMotoru'

// Her sabah çalışacak Merkezi CFO Cron Tetikleyicisi
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const guvenlikAnahtari = searchParams.get('secret')

        // Cron yetkilendirmesi (Güvenlik)
        if (guvenlikAnahtari !== process.env.CRON_SECRET) {
            return new NextResponse('Yetkisiz Erişim (Invalid Secret)', { status: 401 })
        }

        // console.log('[CRON OTONOM İŞLETME] CFO Süreçleri Başlatılıyor...')

        // 1. Veresiye Tahsilatları Taraması (Vadesi geçenleri bul, WA uyarısı at)
        // console.log(' - Veresiye Tahsilat Algoritması tetiklendi.')
        await veresiyeTahsilatMotoru()

        // 2. Nakit Akış Kontrolü (Giderleri karşılamayan esnafa Flaş Kampanya teklifi at)
        // console.log(' - Nakit Akışı ve Deficit Kontrolü tetiklendi.')
        await nakitAkisiKontrolMekanizmasi()

        // (Stok düşümleri doğrudan randevu tamamlanma hook'larında tetikleneceği için 
        //  veya webhooks'tan dinleneceği için cron'a koymaya gerek yok)

        // console.log('[CRON OTONOM İŞLETME] Başarıyla tamamlandı.')
        return NextResponse.json({
            status: 'ok',
            mesaj: 'CFO Ajanı Başarıyla finansal ve tahsilat kontrollerini gerçekleştirdi.',
            zaman: new Date().toISOString()
        })

    } catch (error: any) {
        // console.error('[CRON OTONOM İŞLETME HATA]', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
