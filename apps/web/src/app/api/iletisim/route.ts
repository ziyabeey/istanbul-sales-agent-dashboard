import { NextRequest, NextResponse } from 'next/server'
import { telegramGonder } from '@/lib/telegram'

export async function POST(req: NextRequest) {
  try {
    const { adSoyad, isletme, email, mesaj } = await req.json()

    if (!adSoyad || !email || !mesaj) {
      return NextResponse.json({ error: 'Zorunlu alanlar eksik' }, { status: 400 })
    }

    const bildirim = [
      '<b>YENI ILETISIM FORMU</b>',
      '',
      `<b>Ad Soyad:</b> ${adSoyad}`,
      `<b>Isletme:</b> ${isletme || '—'}`,
      `<b>E-posta:</b> ${email}`,
      `<b>Mesaj:</b>\n${mesaj}`,
      '',
      `⏰ ${new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })}`,
    ].join('\n')

    await telegramGonder(bildirim)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Sunucu hatasi' }, { status: 500 })
  }
}
