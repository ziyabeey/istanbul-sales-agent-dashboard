import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(req: Request) {
    try {
        const { businessName, sector } = await req.json();

        // Check if API key exists. If not, use mock response.
        if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'dummy_key') {
            // Wait 2 seconds to simulate network request
            await new Promise((resolve) => setTimeout(resolve, 2000));
            
            return NextResponse.json({
                success: true,
                result: `🌟 [MOCK] Kepenk AI Pazarlama Taslağı\n\nDeğerli müşterilerimiz,\n\n${businessName || 'İşletmemiz'} olarak sizlere en iyi hizmeti sunmaktan gurur duyuyoruz. ${sector || 'Sektörümüz'} alanında yeni kampanyalarımızı keşfetmek için web sitemizi ziyaret edin!\n\n#kampanya #kepenkai #satış`,
                isMock: true
            });
        }

        const anthropic = new Anthropic({
            apiKey: process.env.ANTHROPIC_API_KEY,
        });

        const prompt = `
            Sen Kepenk AI'nin Pazarlama Uzmanı "Pazarlama Temsilcisi" agent'ısın.
            Müşterinin İşletme Adı: ${businessName || 'Yerel İşletme'}
            Sektörü: ${sector || 'Bilinmiyor'}
            
            Görevin: İşletme için kısa, çarpıcı ve sosyal medyada veya e-postada paylaşılabilecek, emojilerle desteklenmiş bir tanıtım metni (kampanya duyurusu) oluşturmak.
            Lütfen yanıtını doğrudan metin olarak dön. Maksimum 3 paragraf olsun.
        `;

        const response = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 500,
            temperature: 0.7,
            system: "Sen uzman bir dijital pazarlama asistanısın.",
            messages: [
                { role: 'user', content: prompt }
            ]
        });

        const contentBlock = response.content.find(block => block.type === 'text');
        
        return NextResponse.json({
            success: true,
            result: contentBlock?.type === 'text' ? contentBlock.text : 'Sonuç üretilemedi.',
            isMock: false
        });

    } catch (error: any) {
        console.error('[Marketing Agent API Error]', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
