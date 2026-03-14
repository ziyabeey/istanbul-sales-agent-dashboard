import { NextResponse, NextRequest } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'

export async function GET(request: NextRequest) {
    try {
        const esnafId = request.nextUrl.searchParams.get('esnafId')
        if (!esnafId) return new NextResponse('Unauthorized', { status: 401 })

        // Son 30 günün AI Aksiyonlarını (agent_logs) çekiyoruz
        const otuzGunOnce = new Date()
        otuzGunOnce.setDate(otuzGunOnce.getDate() - 30)

        const logsRef = await adminDb.collection('agent_logs')
            .where('esnafId', '==', esnafId)
            .get()

        // Gün bazlı gruplama için Map: "2024-03-01": { surgeCiro: 0, tahsilatCiro: 0 }
        const gunlukData = new Map<string, { gun: string, surgeFiyatFarki: number, tahsilEdilen: number, toplamEkstra: number }>()

        // Map'i son 30 gün için boş 0'larla doldur (Grafik kırılmasın)
        for (let i = 29; i >= 0; i--) {
            const d = new Date()
            d.setDate(d.getDate() - i)
            const gunStr = d.toISOString().split('T')[0] // "YYYY-MM-DD"
            gunlukData.set(gunStr, { gun: gunStr, surgeFiyatFarki: 0, tahsilEdilen: 0, toplamEkstra: 0 })
        }

        let toplamAiCirosu = 0

        logsRef.docs.forEach((doc: any) => {
            const data = doc.data()
            if (!data.zaman || !data.zaman.toDate) return

            const tarih = data.zaman.toDate()
            const gunStr = tarih.toISOString().split('T')[0]
            if (!gunlukData.has(gunStr)) return

            const mevcutGun = gunlukData.get(gunStr)!

            // 1. Dinamik Fiyatlandırma (Surge) Ekstra Geliri
            if (data.ajan === 'fiyatlandirma_motoru' && data.tip === 'fiyat_guncellendi') {
                const eskiFiyat = data.input?.orijinalListeFiyati || 0
                const yeniFiyat = data.output?.yeniFiyat || 0
                const fark = yeniFiyat - eskiFiyat
                if (fark > 0) { // Yalnızca zam yapıp (surge) fazladan koparılan paralar hesaplanır
                    mevcutGun.surgeFiyatFarki += fark
                    mevcutGun.toplamEkstra += fark
                    toplamAiCirosu += fark
                }
            }

            // 2. Otonom Tahsilat Moturu Kurtarılan Gelir
            if (data.ajan === 'tahsilat_motoru' && data.tip === 'kurtari_bildirimi') {
                const odenenTutar = data.output?.kalanTutar || 0 // Kurtarılan meblağ (mock)
                // Veya 'tahsil_edildi' simülasyonu (loglarda var sayıyoruz)
                const tahsilatTutari = data.output?.tahsilatMiktari || 0
                if (tahsilatTutari > 0) {
                    mevcutGun.tahsilEdilen += tahsilatTutari
                    mevcutGun.toplamEkstra += tahsilatTutari
                    toplamAiCirosu += tahsilatTutari
                }
            }
        })

        // Recharts dizisi bekler
        const resultArray = Array.from(gunlukData.values())

        return NextResponse.json({
            zamanSerisi: resultArray,
            aylikToplamEkstraCiro: toplamAiCirosu,
        })
    } catch (e: any) {
        console.error('[AI ROI Çekerken Hata]', e)
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
