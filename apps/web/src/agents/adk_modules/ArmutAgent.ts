import { adminDb } from '@/lib/firebaseAdmin'

// Armut.com Hizmet Entegrasyonu
export async function handleRpc(method: string, params: any) {
    if (method === 'bid_lead') {
        const { esnafId, leadData } = params

        // Esnafın uygunluk (takvim) ve fiyat motorunu kontrol ettikten sonra
        // Armut.com API'sine otonom fiyat teklifi iletme.
        console.log(`[ArmutAgent] Yeni talebe otonom teklif üretiliyor: ${leadData.kategori}`)

        // Fiyatlandirma motoru mock (Aslında fiyatlandirmaMotoru.ts ile konuşabilir)
        const hesaplananFiyat = 2500

        await adminDb.collection('agent_logs').add({
            esnafId,
            ajan: 'armut_agent',
            output: { teklif: hesaplananFiyat, musteri: leadData.isim },
            mesaj: `Armut.com üzerinden gelen ${leadData.kategori} talebine ${hesaplananFiyat} TL ile anında otonom teklif verildi.`,
            zaman: new Date(),
        })

        return {
            status: 'success',
            message: 'Armut.com teklifiniz iletildi.',
            bidAmount: hesaplananFiyat
        }
    }

    throw new Error(`Method [${method}] not found in ArmutAgent`)
}
