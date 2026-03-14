import Anthropic from '@anthropic-ai/sdk';
import { SECTORS } from '../config/sectors';

export interface OnboardingAnswers {
    businessName?: string;
    slogan?: string;
    phone?: string;
    address?: string;
    workDays?: string[];
    openTime?: string;
    closeTime?: string;
    logoUrl?: string;
    photos?: string[];
    sectorAnswers?: Record<string, any>;
    services?: { name: string; price: string }[];
}

export interface SiteContent {
    hero: {
        headline: string;
        subheadline: string;
        ctaText: string;
    };
    about: {
        title: string;
        description: string;
    };
    services: {
        id: string;
        title: string;
        description: string;
        price?: string;
        iconEmoji: string;
    }[];
    testimonials: {
        author: string;
        comment: string;
        rating: number;
    }[];
    contactParams: {
        whatsappMessageTemplate: string;
    };
    seo: {
        metaTitle: string;
        metaDescription: string;
        keywords: string[];
    };
}

export class Agent7_ContentGenerator {
    private anthropic: Anthropic;
    
    constructor() {
        if (!process.env.ANTHROPIC_API_KEY) {
            console.warn('[Agent7] ANTHROPIC_API_KEY bulunamadı, mocking mode.');
        }
        this.anthropic = new Anthropic({
            apiKey: process.env.ANTHROPIC_API_KEY || 'dummy_key',
        });
    }

    private buildPrompt(sektorId: string, answers: OnboardingAnswers): string {
        const sector = SECTORS[sektorId];
        
        return `
            Sen kepenk.ai'nin "Ajan 7: İçerik Üretim Motoru"sun. Değerli bir Anadolu esnafı platformumuza az önce kayıt oldu.
            Görevin, esnafın formda verdiği kısıtlı bilgilere dayanarak ona BÜYÜLEYİCİ, SATIŞA DÖNÜK ve SEO UYUMLU bir modern web sitesi içeriği yazmak.

            Müşteri Bilgileri:
            - İşletme Adı: ${answers.businessName || 'Belirtilmedi'}
            - Sektör: ${sector?.label || sektorId}
            - İl/İlçe/Adres: ${answers.address || 'Belirtilmedi'}
            - Sağladığı Ek Bilgiler (Slogan vb.): ${answers.slogan || 'Yok'}
            - Sektörel Detaylar: ${JSON.stringify(answers.sectorAnswers || {})}

            Kurallar:
            1. Yanıtın SADECE geçerli bir JSON objesi olmalıdır. Kesinlikle markdown kodu (\`\`\`json) veya ekstra açıklama yazma.
            2. "hero.headline" çok vurucu ve kısa olmalı. 
            3. "services" dizisine, işletmenin verdiği bilgilere dayanarak 3 ile 6 arası mantıklı hizmet uydur VEYA formdan verildiyse onları kullan. Her hizmete sektöre uygun bir emoji seç ("iconEmoji").
            4. "testimonials" dizisine, bu esnafı öven, inandırıcı ve Türkçe diline tam hakim 3 adet sahte (mock) müşteri yorumu ekle. Yorumlar samimi ve "Anadolu insanı" ağzına uygun ama profesyonel olsun.
            5. "seo" kısmındaki "metaDescription" Google'da çıkacak özet yazıdır, 150 karakteri geçmesin.
            6. Çıktı formatı tam olarak aşağıdaki TypeScript arabirimi (interface) ile eşleşmeli:
            {
                hero: { headline: string, subheadline: string, ctaText: string },
                about: { title: string, description: string },
                services: [{ id: string, title: string, description: string, price: string (opsiyonel), iconEmoji: string }],
                testimonials: [{ author: string, comment: string, rating: number }],
                contactParams: { whatsappMessageTemplate: string },
                seo: { metaTitle: string, metaDescription: string, keywords: string[] }
            }
        `;
    }

    async generateSiteContent(sektorId: string, answers: OnboardingAnswers): Promise<SiteContent> {
        // Dummy Return if no API key is set for local dev to not break the flow.
        if (process.env.ANTHROPIC_API_KEY === 'dummy_key' || !process.env.ANTHROPIC_API_KEY) {
            console.log('[Agent7] API Anahtarı eksik, sahte (mock) içerik dönülüyor...');
            return this.getMockContent(sektorId, answers.businessName || 'Esnaf');
        }

        const prompt = this.buildPrompt(sektorId, answers);

        try {
            const response = await this.anthropic.messages.create({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 3000,
                temperature: 0.7,
                system: "You are a senior copywriter and web designer producing JSON data.",
                messages: [
                    { role: 'user', content: prompt }
                ]
            });

            // Extract the text content from the Anthropic response
            const contentBlock = response.content.find(block => block.type === 'text');
            if (!contentBlock || contentBlock.type !== 'text') {
                 throw new Error("Beklenmeyen yanıt formatı");
            }
            const rawJson = contentBlock.text;
            
            return JSON.parse(rawJson.replace(/```json/g, '').replace(/```/g, '').trim()) as SiteContent;

        } catch (error) {
            console.error('[Agent7] İçerik üretimi başarısız oldu:', error);
            // Fallback
            return this.getMockContent(sektorId, answers.businessName || 'Esnaf');
        }
    }

    private getMockContent(sektor: string, name: string): SiteContent {
        return {
            hero: {
                headline: `${name} | Profesyonel Hizmetin Adresi`,
                subheadline: `Sektördeki tecrübemiz ve güler yüzlü ekibimizle her zaman yanınızdayız. Şimdi online randevu alın!`,
                ctaText: 'Hemen İletişime Geç',
            },
            about: {
                title: 'Hakkımızda',
                description: 'Yılların verdiği tecrübeyle müşteri memnuniyetini en ön planda tutarak kaliteli hizmet sunmaya devam ediyoruz.',
            },
            services: [
                { id: 's1', title: 'Temel Hizmet 1', description: 'Ekonomik ve hızlı çözüm.', price: '₺100', iconEmoji: '⭐' },
                { id: 's2', title: 'Premium Hizmet 2', description: 'Detaylı ve özenli hizmet.', price: '₺250', iconEmoji: '💎' },
                { id: 's3', title: 'Ekstra Hizmet', description: 'İhtiyaca özel VIP yaklaşım.', price: 'İletişime geçin', iconEmoji: '🚀' },
            ],
            testimonials: [
                { author: 'Ahmet Y.', comment: 'İşlerini gerçekten çok iyi yapıyorlar. Gönül rahatlığıyla tavsiye ederim.', rating: 5 },
                { author: 'Ayşe K.', comment: 'Çok hızlı geri dönüş aldım, çalışanlar çok ilgiliydi.', rating: 5 },
            ],
            contactParams: {
                whatsappMessageTemplate: 'Merhaba, web sitenizden ulaşıyorum. Hizmetleriniz hakkında bilgi almak istiyorum.'
            },
            seo: {
                metaTitle: `${name} | Resmi Web Sitesi`,
                metaDescription: `${name} olarak profesyonel kadromuzla yanınızdayız. Hizmetlerimizi incelemek için sitemizi ziyaret edin.`,
                keywords: [sektor, name, 'hizmet', 'kalite']
            }
        };
    }
}

export const agent7 = new Agent7_ContentGenerator();
