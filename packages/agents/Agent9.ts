import Anthropic from '@anthropic-ai/sdk';

export class Agent9_SectionEditor {
    private anthropic: Anthropic;
    
    constructor() {
        this.anthropic = new Anthropic({
            apiKey: process.env.ANTHROPIC_API_KEY || 'dummy_key',
        });
    }

    async editSection(sectionType: string, currentContent: any, prompt: string): Promise<any> {
        // Mock mode if no API key
        if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'dummy_key') {
            console.log('[Agent9] API key missing, returning mock edit for: ' + sectionType);
            return {
                ...currentContent,
                title: `✨ (AI Edit) ${currentContent.title || 'Yeni Başlık'}`,
                description: `✨ (AI Edit) Esnafın isteği doğrultusunda ${prompt} baz alınarak yeniden yazıldı.`,
            };
        }

        const systemPrompt = `
            Sen kepenk.ai'nin "Ajan 9: Bölümsel İçerik Editörü"sün.
            Görevin, esnafın web sitesindeki belirli bir bölümü (section) onun verdiği "prompt" (istek) doğrultusunda yeniden yazmak.
            
            Bölüm Tipi: ${sectionType}
            Mevcut İçerik Verisi: ${JSON.stringify(currentContent)}
            
            Esnafın İsteği: "${prompt}"

            KURALLAR:
            1. Yanıtın SADECE geçerli bir JSON objesi olmalıdır. Kesinlikle markdown kodu (\`\`\`json) veya ekstra açıklama yazma.
            2. Mevcut içeriğin JSON şemasını (key'leri) KESİNLİKLE BOZMA. Sadece değerleri (value'ları) esnafın isteğine göre güncelle.
            3. Esnaf "başlığı büyüt", "daha resmi yap", "şu hizmeti ekle" gibi direktifler verebilir, tüm bunlara JSON veri seviyesinde cevap ver.
        `;

        try {
            const response = await this.anthropic.messages.create({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 1500,
                temperature: 0.7,
                system: "You are a JSON-only editor API.",
                messages: [
                    { role: 'user', content: systemPrompt }
                ]
            });

            const contentBlock = response.content.find(block => block.type === 'text');
            if (!contentBlock || contentBlock.type !== 'text') {
                 throw new Error("Beklenmeyen format");
            }
            
            const rawJson = contentBlock.text.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(rawJson);

        } catch (error) {
            console.error('[Agent9] Düzenleme başarısız:', error);
            throw error;
        }
    }
}

export const agent9 = new Agent9_SectionEditor();
