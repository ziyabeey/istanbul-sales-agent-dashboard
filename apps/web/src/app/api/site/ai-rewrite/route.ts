import { NextResponse } from 'next/server'
import { geminiCalistir } from '@/lib/geminiClient'

export async function POST(req: Request) {
    try {
        const { metin, stil } = await req.json()
        if (!metin || !stil) {
            return NextResponse.json({ error: 'metin ve stil gerekli' }, { status: 400 })
        }

        const stilTanimari: Record<string, string> = {
            ikna_edici: 'Metni çok daha ikna edici, satış odaklı ve CTA güçlü yap. Müşteriyi harekete geçirecek güçlü kelimeler kullan.',
            kurumsal: 'Metni daha kurumsal, profesyonel ve güven veren bir tonda yeniden yaz. Resmi ama sıcak bir dil kullan.',
            kisa: 'Metni çok daha kısa ve öz yap. Gereksiz kelimeleri at, mesajı 1-2 cümleye sığdır.',
            samimi: 'Metni daha samimi, sıcak ve doğal bir tonda yeniden yaz. "Biz" dili kullan.',
            esprili: 'Metni hafif esprili ama güvenilir bir tonda yeniden yaz. Müşteriyi gülümsetecek ama profesyonelliği bozmayacak.',
        }

        const talimat = stilTanimari[stil] || stilTanimari['ikna_edici']

        const sistem = `Sen bir web sitesi metin yazarısın. Türkçe metinleri belirli bir stilde yeniden yazıyorsun.
SADECE yeni metni döndür. Başka hiçbir açıklama yazma.
Orijinal metnin uzunluğuna yakın kal (±%30).`

        const prompt = `Aşağıdaki metni yeniden yaz:

"${metin}"

${talimat}

SADECE yeni metni yaz, başka bir şey yazma.`

        const yeniMetin = await geminiCalistir(
            'gemini-3-flash-preview',
            sistem,
            prompt,
            { thinkingLevel: 'low', maxOutputTokens: 512 }
        )

        // Tırnakları temizle
        const temiz = yeniMetin.replace(/^["'""]|["'""]$/g, '').trim()

        return NextResponse.json({ ok: true, yeniMetin: temiz })
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
