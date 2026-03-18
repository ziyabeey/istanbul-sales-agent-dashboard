import { NextResponse } from 'next/server'
import { geminiCalistir } from '@/lib/geminiClient'

/**
 * POST /api/site/ai-icerik-uret
 *
 * Şablon editöründe kullanıcının girdiği temel bilgilerle
 * (işletme adı, sektör, ilçe, şehir) site içeriklerini AI ile
 * otomatik oluşturur. Auth gerektirmez — freemium akış için.
 */
export async function POST(req: Request) {
    try {
        const { isletmeAdi, sektor, ilce, sehir, telefon } = await req.json()

        if (!isletmeAdi) {
            return NextResponse.json({ error: 'isletmeAdi zorunlu' }, { status: 400 })
        }

        const sektorBilgi = sektor || 'genel hizmet'
        const konum = [ilce, sehir].filter(Boolean).join(', ') || 'İstanbul'

        const sistem = `Sen Türkiye'deki küçük işletmeler için profesyonel web sitesi içerik yazarısın.
Verilen işletme bilgilerine göre web sitesi için zengin, özgün ve ikna edici Türkçe içerikler üretiyorsun.
Cevabını SADECE JSON formatında ver: { heroBaslik, heroSlogan, ctaBirincil, ctaIkincil, hizmetlerHtml, nedenBizHtml, yorumlarHtml, seoBaslik, seoAciklama, hikaye }
- heroBaslik: Güçlü, kısa (maks 8 kelime) ana başlık
- heroSlogan: Alt başlık slogan (1 cümle)
- ctaBirincil: Ana CTA buton metni (2-3 kelime)
- ctaIkincil: İkincil CTA buton metni (2-3 kelime)
- hizmetlerHtml: 3-4 hizmet kartı HTML'i. Her kart: <div class="hizmet-kart"><div class="hizmet-ikon">EMOJI</div><h3>BAŞLIK</h3><p>AÇIKLAMA</p></div> formatında
- nedenBizHtml: 3-4 özellik/avantaj kartı HTML'i. Her kart: <div class="avantaj-kart"><div class="avantaj-ikon">EMOJI</div><h3>BAŞLIK</h3><p>AÇIKLAMA</p></div> formatında
- yorumlarHtml: 3 müşteri yorumu HTML'i. Her yorum: <div class="yorum-kart"><p class="yorum-metin">"YORUM METNİ"</p><div class="yorum-yazar">İSİM</div><div class="yorum-puan">★★★★★</div></div> formatında
- seoBaslik: SEO başlığı (60 karakter)
- seoAciklama: Meta description (155 karakter)
- hikaye: Hakkımızda bölümü için 2-3 cümle
JSON dışında hiçbir şey yazma, yorum yazma, markdown formatı kullanma.`

        const prompt = `İşletme: ${isletmeAdi}
Sektör: ${sektorBilgi}
Konum: ${konum}
${telefon ? `Telefon: ${telefon}` : ''}

Bu işletme için web sitesi içeriklerini üret.`

        const sonuc = await geminiCalistir(
            'gemini-3-flash-preview',
            sistem,
            prompt,
            { thinkingLevel: 'low', maxOutputTokens: 2048 }
        )

        // JSON parse
        const temiz = sonuc
            .replace(/^```json\s*/i, '')
            .replace(/```\s*$/, '')
            .trim()

        const json = JSON.parse(temiz)

        return NextResponse.json({ ok: true, icerik: json })
    } catch (e: any) {
        // console.error('[AI İÇERİK ÜRET HATA]', e)
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
