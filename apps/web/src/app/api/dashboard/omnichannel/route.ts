import { NextResponse, NextRequest } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'

export async function GET(request: NextRequest) {
    try {
        const esnafId = request.nextUrl.searchParams.get('esnafId')
        if (!esnafId) return new NextResponse('Unauthorized', { status: 401 })

        const otuzGunOnce = new Date()
        otuzGunOnce.setDate(otuzGunOnce.getDate() - 30)

        // Sadece müşteri iletişim mesajlarını çek (WhatsApp ve Instagram_DM)
        const logsRef = await adminDb.collection('agent_logs')
            .where('esnafId', '==', esnafId)
            .get()

        let whatsappSayisi = 0
        let instagramSayisi = 0
        let webFormSayisi = 0

        logsRef.docs.forEach((doc: any) => {
            const d = doc.data()
            if (!d.zaman || !d.zaman.toDate) return
            if (d.zaman.toDate() < otuzGunOnce) return

            if (d.kanal === 'whatsapp') whatsappSayisi++
            else if (d.kanal === 'instagram' || d.kanal === 'instagram_dm') instagramSayisi++
            else if (d.kanal === 'internal' && d.tip === 'form_dolduruldu') webFormSayisi++
            // Diğer kanalları atla (örn internal cron logları)
        })

        // Pie Chart'ın anlayacağı { name, value, kisaltma, fill } yapısı
        const chartData = [
            { name: 'WhatsApp', value: whatsappSayisi, fill: '#22c55e' }, // Yeşil
            { name: 'Instagram DM', value: instagramSayisi, fill: '#e11d48' }, // Pembe/Kırmızı
            { name: 'Web Randevu Formu', value: webFormSayisi, fill: '#3b82f6' } // Mavi
        ]

        return NextResponse.json(chartData)

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
