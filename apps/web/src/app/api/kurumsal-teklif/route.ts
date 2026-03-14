import { NextRequest, NextResponse } from 'next/server'
import { telegramGonder } from '@/lib/telegram'

export async function POST(req: NextRequest) {
    try {
        const { sirket, sektor, subeSayisi, telefon, mesaj } = await req.json()

        if (!sirket || !telefon) {
            return NextResponse.json({ error: 'Zorunlu alanlar eksik' }, { status: 400 })
        }

        const bildirim = [
            `🏢 <b>YENİ KURUMSAL TEKLIF TALEBİ</b>`,
            ``,
            `🏷️ <b>Şirket:</b> ${sirket}`,
            `🏭 <b>Sektör:</b> ${sektor || '—'}`,
            `🏪 <b>Şube Sayısı:</b> ${subeSayisi || '—'}`,
            `📞 <b>Telefon:</b> ${telefon}`,
            mesaj ? `💬 <b>Mesaj:</b>\n${mesaj}` : '',
            ``,
            `⏰ ${new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })}`,
        ].filter(Boolean).join('\n')

        await telegramGonder(bildirim)

        return NextResponse.json({ ok: true })
    } catch {
        return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
    }
}
