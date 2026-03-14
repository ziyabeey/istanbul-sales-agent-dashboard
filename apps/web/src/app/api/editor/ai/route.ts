import { NextResponse } from 'next/server';
import { agent9 } from '@kepenk/agents';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { sectionType, currentContent, prompt } = body;

        if (!sectionType || !currentContent || !prompt) {
            return NextResponse.json({ error: 'Gerekli veriler eksik' }, { status: 400 });
        }

        console.log(`[AI Editor API] Bölüm: ${sectionType} için Ajan 9 tetikleniyor... İstek: "${prompt}"`);
        
        // Ajan 9'u çağır
        const newContent = await agent9.editSection(sectionType, currentContent, prompt);
        
        console.log('[AI Editor API] Ajan 9 başarıyla JSON döndürdü.');

        return NextResponse.json({ 
            success: true, 
            newContent
        });

    } catch (error: any) {
        console.error('[AI Editor API] Hata:', error);
        return NextResponse.json({ error: error.message || 'İç sunucu hatası.' }, { status: 500 });
    }
}
