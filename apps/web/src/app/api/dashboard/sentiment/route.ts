import { NextResponse, NextRequest } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'

export async function GET(request: NextRequest) {
    try {
        const esnafId = request.nextUrl.searchParams.get('esnafId')
        if (!esnafId) return new NextResponse('Unauthorized', { status: 401 })

        // Sadece Google'dan gelen yorum loglarını veya yorum koleksiyonunu çekeceğiz.
        // Daha önceden Phase 35'te kurduğumuz 'sentiment_guardian_google' ajan logları 
        // VEYA Yorum arşivi (biz agent_logs kullanalım) üzerinden gidelim.
        const otuzGunOnce = new Date()
        otuzGunOnce.setDate(otuzGunOnce.getDate() - 30)

        // Dummy/Mock data if we rely solely on active fetch (for now, we'll mimic the trend visually to demonstrate the dashboard)
        // Gerçekte: adminDb.collection('yorumlar')... alınır.

        // Kepenk.ai'den önceki ortalama
        let eskiPuan = 3.6
        // Kepenk.ai'den sonraki anlık ortalama
        let yeniPuan = 4.7

        // 30 günlük trendi simüle et (gerçekte bu, her gün alınan kümülatif yorum ortalamasıdır)
        const trendGrafik = []
        for (let i = 30; i >= 0; i--) {
            const d = new Date()
            d.setDate(d.getDate() - i)
            const gunStr = d.toISOString().split('T')[0]

            // Logaritmik büyümeye benzeyen yapay bir simülasyon (Geçmişe doğru daha kötü, bugüne doğru 4.7'ye yakınsıyor)
            const skor = eskiPuan + ((yeniPuan - eskiPuan) * (30 - i) / 30)

            trendGrafik.push({
                gun: gunStr, // "2024-03-XX"
                skor: parseFloat(skor.toFixed(1))
            })
        }

        return NextResponse.json({
            trend: trendGrafik,
            eskiOrtalama: eskiPuan,
            guncelOrtalama: yeniPuan,
            yorumSayisi: 124, // Mock
            kurtarilanKrizSayisi: 12 // Mock. Gerçekte agent_logs 'tip' == 'google_yorum_yanitlandi'
        })

    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
