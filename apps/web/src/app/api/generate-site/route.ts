import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { businessType, name, description, services, location, audience, differentiator, goals, tones } = body;

        // Check if API key exists. If not, use mock response.
        if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'dummy_key') {
            // Wait 3 seconds to simulate complex AI generation network request
            await new Promise((resolve) => setTimeout(resolve, 3000));
            
            return NextResponse.json({
                success: true,
                result: {
                    businessInfo: {
                        name: name || 'Yeni İşletme',
                        description: description || 'Premium hizmet anlayışımızla sektörde fark yaratıyoruz.',
                        address: location || 'İstanbul, Türkiye',
                        phone: '+90 555 000 0000',
                        email: 'iletisim@firma.com',
                        services: [
                            { name: 'Profesyonel Çözümler' },
                            { name: 'Kişiselleştirilmiş Yaklaşım' },
                            { name: '7/24 Destek' }
                        ]
                    },
                    content: {
                        hero: {
                            badge: 'PREMIUM',
                            title: name || 'Geleceği İnşa Ediyoruz',
                            description: 'Sektörün dinamiklerini yeniden tanımlayan yenilikçi yaklaşımımızla tanışın.'
                        },
                        about: {
                            title: 'Sıradanlığı Reddedin',
                            description: differentiator || 'Standartların ötesine geçerek tamamen size özel çözümler üretiyoruz.'
                        },
                        services: {
                            title: 'Uzmanlık Alanlarımız'
                        }
                    }
                },
                isMock: true
            });
        }

        const anthropic = new Anthropic({
            apiKey: process.env.ANTHROPIC_API_KEY,
        });

        const systemPrompt = `
            Sen Kepenk AI'nin Master Site Kurucu (Agent 7) yapay zekasısın. 
            Müşteri senden Awwwards seviyesinde, premium bir web sitesi altyapısı için metinler oluşturmanı istiyor.
            Kullanıcının form verilerini incele ve SADECE GEÇERLİ BİR JSON nesnesi dön. Markdown kullanma.
            
            Format şöyle olmalı:
            {
              "businessInfo": {
                "name": "Kısa şirket adı",
                "description": "Şirket hakkında kurumsal 1-2 cümle",
                "address": "Tam adres",
                "phone": "Telefon numarası",
                "email": "E-posta adresi",
                "services": [ { "name": "Hizmet 1" }, { "name": "Hizmet 2" }, { "name": "Hizmet 3" } ]
              },
              "content": {
                "hero": {
                  "badge": "Tek kelimelik vurgu (örn: VİZYON)",
                  "title": "Çok çarpıcı ve lüks bir ana başlık (max 5 kelime)",
                  "description": "Etkileyici alt başlık açıklaması"
                },
                "about": {
                  "title": "Hakkımızda bölümü için etkileyici başlık",
                  "description": "Neden biz? Farkımız ne? (Differentiator kullan)"
                },
                "services": {
                  "title": "Hizmetler için havalı bir başlık (örn: UZMANLIK ALANLARIMIZ)"
                }
              }
            }
        `;

        const userPrompt = `
            İşletme Türü: ${businessType}
            İşletme Adı: ${name}
            Açıklama: ${description}
            Seçilen Temel Hizmet Kategorileri: ${services.join(', ')}
            Lokasyon: ${location}
            Hedef Kitle: ${audience}
            Fark Yaratan Özellik (Differentiator): ${differentiator}
            Hedefler: ${goals}
            İstenen Üslup (Tones): ${tones.join(', ')}
            
            Lütfen sadece JSON dön.
        `;

        const response = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1500,
            temperature: 0.7,
            system: systemPrompt,
            messages: [
                { role: 'user', content: userPrompt }
            ]
        });

        const contentBlock = response.content.find(block => block.type === 'text');
        
        let parsedResult;
        try {
            const rawJson = contentBlock?.type === 'text' ? contentBlock.text.replace(/```json/g, '').replace(/```/g, '').trim() : '{}';
            parsedResult = JSON.parse(rawJson);
        } catch (e) {
            console.error('JSON parse error from Claude', e);
            throw new Error('AI geçerli bir format döndüremedi.');
        }

        return NextResponse.json({
            success: true,
            result: parsedResult,
            isMock: false
        });

    } catch (error: any) {
        console.error('[Generate Site API Error]', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
