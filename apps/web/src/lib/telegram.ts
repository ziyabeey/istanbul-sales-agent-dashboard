export async function telegramGonder(mesaj: string): Promise<void> {
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!token || !chatId) {
        // Geliştirme ortamında konsola yaz
        console.log('[TELEGRAM]', mesaj.replace(/<[^>]+>/g, ''))
        return
    }

    try {
        const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: mesaj,
                parse_mode: 'HTML',
            }),
            signal: AbortSignal.timeout(10_000),
        })

        if (!res.ok) {
            const err = await res.text()
            console.error('[TELEGRAM HATA]', res.status, err)
        }
    } catch (e: any) {
        console.error('[TELEGRAM BAĞLANTI HATASI]', e.message)
    }
}
