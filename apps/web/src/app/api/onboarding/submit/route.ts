import { NextResponse } from 'next/server';
import { agent7 } from '@kepenk/agents';
import { adminDb } from '@kepenk/db/firebaseAdmin'; // Assuming this exists or will exist soon

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { sektor, answers } = body;

        if (!sektor || !answers) {
            return NextResponse.json({ error: 'Gerekli veriler eksik' }, { status: 400 });
        }

        // 1. Ajan 7'yi çağır: Kısıtlı veriden muazzam JSON site içeriği üret
        // console.log(`[OnboardingAPI] Sektör: ${sektor} için Ajan 7 tetikleniyor...`);
        const generatedContent = await agent7.generateSiteContent(sektor, answers);
        // console.log('[OnboardingAPI] Ajan 7 içerik üretimini tamamladı.');

        // 2. İleride (veya simüle edilmiş) Firestore kaydı
        // const businessRef = adminDb.collection('businesses').doc();
        // await businessRef.set({
        //     sektor,
        //     rawAnswers: answers,
        //     generatedContent,
        //     createdAt: new Date(),
        //     status: 'pending_site_generation'
        // });

        // Şimdilik sadece başarılı yanıt (JSON logda görülebilir)
        return NextResponse.json({ 
            success: true, 
            message: 'Ajan 7 içeriği başarıyla üretti',
            previewContent: generatedContent
        });

    } catch (error) {
        // console.error('[OnboardingAPI] Beklenmeyen hata:', error);
        return NextResponse.json({ error: 'İç sunucu hatası.' }, { status: 500 });
    }
}
