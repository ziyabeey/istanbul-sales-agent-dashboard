
import { GoogleGenAI, Modality } from "@google/genai";
import { Lead, DashboardStats } from '../types';
import { storage } from './storage';
import { gamificationService } from './gamificationService';
import { decodeAudioData, playAudioBuffer, base64ToArrayBuffer } from '../utils/audioUtils';
import { fixUtf8Mojibake } from '../utils/agentUtils';

const getApiKey = () => process.env.API_KEY || localStorage.getItem('apiKey') || '';

export const aiService = {
    generateEmail: async (lead: Lead, templateId: string): Promise<{ subject: string, body: string }> => {
        try {
            const ai = new GoogleGenAI({ apiKey: getApiKey() });
            const templates = storage.getTemplates();
            const template = templates.find(t => t.id === templateId) || templates[0];
            const userProfile = storage.getUserProfile();

            const senderBlock = userProfile.personaDescription?.trim()
                ? `Gönderen kimliği (aynen buna göre yaz, bu kimlikle imzala): ${userProfile.personaDescription.trim()}`
                : `Ad Soyad: ${userProfile.fullName || 'Satış Temsilcisi'}\n            Rol: ${userProfile.role || 'Satış Danışmanı'}\n            Şirket: ${userProfile.companyName || 'Ajans'}\n            İletişim Tonu: ${userProfile.tone || 'Profesyonel ve Güven Verici'}`;

            const styleHints = [
                'Açılışı kısa ve net tut (en fazla 2 cümle). Doğrudan değer önerisine geç.',
                'İlk cümleyi bir soru ile başlat; merak uyandır.',
                'Sektörle ilgili kısa bir veri veya istatistik ile dikkat çek.',
                'Somut bir örnek veya mini hikaye ile giriş yap.',
                'Firmanın ihtiyacına özel bir gözlemle başla (web/sosyal medya vb.).',
            ];
            const styleHint = styleHints[Math.floor(Math.random() * styleHints.length)];

            const productBlock = `SATILAN ÜRÜN (değişmez): Profesyonel web sitesi tasarımı — kurumsal site, e-ticaret, landing sayfası. KOBİ'lere yönelik paketler. Tüm maillerde bu ürünü "web sitenizi birlikte tasarlayalım" / "profesyonel web sitesi" çerçevesinde sun.`;
            const ctaBlock = userProfile.calendarUrl
                ? `CTA (ZORUNLU): E-postanın sonuna "15 dakikalık ücretsiz görüşme" deyip randevu linkini ekle: ${userProfile.calendarUrl} — "Müsaitliğinize göre buradan bir zaman seçebilirsiniz."`
                : `CTA (ZORUNLU): E-postada tek bir net çağrı olmalı: "Kısa bir görüşme için beni arayın" veya "İsterseniz size uygun bir saatte dönüş yapayım."`;

            const prompt = `
            SİSTEM: B2B Satış Temsilcisi Asistanı — WEB SİTESİ SATIŞI.
            
            ${productBlock}
            
            GÖREV: Aşağıdaki şablonu ve lead bilgisini kullanarak kişiselleştirilmiş, BENZERSİZ ve İKNA EDİCİ bir soğuk satış e-postası yaz.
            
            GÖNDEREN (PERSONA) — Önce bunu oku, iletiyi bu kimliğe göre yaz:
            ${senderBlock}
            
            LEAD (ALICI):
            Firma: ${lead.firma_adi}
            Sektör: ${lead.sektor}
            İlçe: ${lead.ilce}
            Web: ${lead.websitesi_var_mi}
            Notlar: ${lead.notlar || ''}
            ${lead.personaAnalysis ? `Lead Kişiliği (DISC): ${lead.personaAnalysis.type}. İletişim stili: ${lead.personaAnalysis.communicationStyle}.` : ''}
            
            TARZ (bu sefer mutlaka uygula — her mail farklı olsun): ${styleHint}
            
            ARAŞTIRMA & STRATEJİ ADIMI (Önce bunu yap, sonra e-postayı yaz):
            1. Lead'in sektörünü ve (varsa) web durumunu düşün.
            2. Onlara özel, spesifik bir "kanca" (hook) cümlesi bul. (Örn: "Modoko'daki mağazanızın trafiğini..." veya "Sektörünüzde X yapan firmalar...")
            3. Şablonu ezbere kullanma; bu hook cümlesiyle birleştir.
            ${ctaBlock}
            
            ŞABLON (Referans):
            Konu: ${template?.subject || 'İşbirliği Fırsatı'}
            Gövde: ${template?.body || 'Merhaba, hizmetlerimizle ilgilenir misiniz?'}

            KONU SATIRI KURALI: Konu satırı kısa ve net olsun; "web sitesi", "ücretsiz görüşme", "15 dk görüşme" veya firma/sektöre özel bir değer vaadi içersin. Spam veya reklam gibi görünmesin; merak uyandırsın.

            KURALLAR:
            1. "GÖNDEREN (PERSONA)" özelliklerini (Rol, Ton) yansıt. ${userProfile.role === 'Creative Director' ? 'Yaratıcı, vizyoner ve estetik bir dil kullan.' : ''}
            2. Şablondaki {{firma_adi}}, {{sektor}} yer tutucularını doldur.
            3. E-posta gövdesine mutlaka yukarıdaki "ARAŞTIRMA" adımından bulduğun benzersiz kancayı ekle.
            4. Yukarıdaki TARZ talimatını uygula; her mail farklı açılış/yapıda olsun.
            5. Asla [Firma Adı] gibi parantezli yer tutucu bırakma.
            6. E-postanın sonuna ASLA imza, ad soyad veya "Saygılarımla" gibi kapanış ekleme. Sistem bunu otomatik ekliyor.
            7. JSON döndür: {"subject": "...", "body": "..."}
            `;

            const result = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: prompt,
                config: { responseMimeType: 'application/json' }
            });
            const rawText = result.text || '{"subject": "Hata", "body": "E-posta üretilemedi."}';
            const normalized = fixUtf8Mojibake(rawText);
            const parsed = JSON.parse(normalized);
            return {
                subject: fixUtf8Mojibake(String(parsed.subject ?? 'Hata').trim()),
                body: fixUtf8Mojibake(String(parsed.body ?? '').trim())
            };
        } catch (e) {
            console.error("AI Gen Error", e);
            return { subject: "Hata", body: "Servis şu an kullanılamıyor." };
        }
    },

    /** Research lead and generate a unique proposal email (no template; persona + bespoke offer). */
    generateProposal: async (lead: Lead): Promise<{ subject: string, body: string }> => {
        try {
            const ai = new GoogleGenAI({ apiKey: getApiKey() });
            const userProfile = storage.getUserProfile();
            const senderBlock = userProfile.personaDescription?.trim()
                ? `Gönderen kimliği: ${userProfile.personaDescription.trim()}`
                : `${userProfile.fullName || 'Satış Temsilcisi'}, ${userProfile.role || ''}, ${userProfile.companyName || ''}. Ton: ${userProfile.tone || 'Profesyonel'}.`;

            const productBlock = `SATILAN ÜRÜN: Profesyonel web sitesi tasarımı (kurumsal / e-ticaret / landing). KOBİ'lere yönelik paketler.`;
            const ctaRule = userProfile.calendarUrl
                ? `TEKLİFTE MUTLAKA TEK BİR NET CTA OLMALI: "15 dakikalık ücretsiz görüşme" + randevu linki: ${userProfile.calendarUrl}`
                : `TEKLİFTE MUTLAKA TEK BİR NET CTA OLMALI: "Size uygun bir saatte arayayım" veya "Kısa görüşme için beni arayın" gibi net bir sonraki adım.`;
            const teklifFiyatPaket = (typeof localStorage !== 'undefined' ? localStorage.getItem('agent_teklif_fiyat_paket') : null)?.trim() || '';
            const priceHint = teklifFiyatPaket
                ? `FİYAT/PAKET BİLGİSİ (teklifte kullan): ${teklifFiyatPaket}. Bu bilgiyi doğal bir şekilde teklif gövdesine dahil et.`
                : `İsteğe bağlı: "X TL'den başlayan paketler" veya "Bütçenize uygun paketler" gibi bir fiyat ipucu eklenebilir.`;

            const prompt = `
SİSTEM: B2B Satış Temsilcisi — WEB SİTESİ TEKLİFİ.

${productBlock}

Görev: Karşı tarafı araştırıp ona özel BİR TEKLİF e-postası yaz.

GÖNDEREN (PERSONA):
${senderBlock}

LEAD (ALICI) — Bunu araştır, ona göre teklif yaz:
- Firma: ${lead.firma_adi}
- Sektör: ${lead.sektor}
- İlçe: ${lead.ilce}
- Notlar: ${lead.notlar || ''}
- Web / iletişim: ${lead.websitesi_var_mi || '-'}
${lead.personaAnalysis ? `- Lead kişiliği: ${lead.personaAnalysis.type}. İletişim stili: ${lead.personaAnalysis.communicationStyle}.` : ''}
${lead.websitesi_var_mi === 'Hayır' ? '\nÖNEMLİ: Bu lead\'in web sitesi yok. Teklifte kurumsal site / ilk web sitesi fırsatını ve KOBİ\'lere uygun paketleri net vurgula.' : ''}

ADIMLAR:
1. Lead'in sektörünü, firma profilini ve notları düşün.
2. Onlara özel bir değer önerisi ve teklif özeti oluştur (genel şablon kullanma; bu firmaya özel somut fayda yaz).
3. Konu satırı: Firma adı veya sektör + "web sitesi teklifi" / "görüşme daveti" / "15 dk ücretsiz görüşme" gibi net bir ifade; kısa ve profesyonel.
4. Gövdeyi bu araştırmaya göre üret. E-postanın sonuna imza ekleme; sistem ekliyor.
5. ${ctaRule}
6. ${priceHint}

Çıktı: Sadece JSON. {"subject": "...", "body": "..."}
`;

            const result = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: prompt,
                config: { responseMimeType: 'application/json' }
            });
            const text = (result as { text?: string }).text || '{}';
            const normalized = fixUtf8Mojibake(text);
            const parsed = JSON.parse(normalized || '{}');
            return {
                subject: fixUtf8Mojibake(String(parsed.subject || `Teklif: ${lead.firma_adi}`).trim()),
                body: fixUtf8Mojibake(String(parsed.body || 'Detaylı teklifimiz ektedir.').trim())
            };
        } catch (e) {
            console.error("AI Proposal Error", e);
            return { subject: `Teklif: ${lead.firma_adi}`, body: "Servis şu an kullanılamıyor. Teklif içeriği sonra iletilecektir." };
        }
    },

    /** Gelen e-posta metni varsa ona göre yanıt taslağı; yoksa kısa genel taslak. */
    generateReplyDraft: async (lead: Lead, lastEmailSnippet?: string): Promise<{ subject: string; body: string }> => {
        if (!lastEmailSnippet?.trim()) {
            return {
                subject: `Re: ${lead.firma_adi} Dijital Çözümler`,
                body: 'Merhaba, detayları konuşmak isteriz.'
            };
        }
        try {
            const ai = new GoogleGenAI({ apiKey: getApiKey() });
            const userProfile = storage.getUserProfile();
            const senderBlock = userProfile.personaDescription?.trim()
                ? `Gönderen: ${userProfile.personaDescription.trim()}`
                : `${userProfile.fullName || 'Satış Temsilcisi'}, ${userProfile.role || ''}. Ton: ${userProfile.tone || 'Profesyonel'}.`;

            const productCta = `SATILAN ÜRÜN: Profesyonel web sitesi tasarımı (KOBİ). Yanıtta tek bir net CTA olmalı: randevu veya "Sizi arayalım".`;
            const ctaRule = userProfile.calendarUrl
                ? `Yanıt gövdesinde mutlaka randevu linkini ekle: ${userProfile.calendarUrl} — "Müsaitliğinize göre buradan 15 dk görüşme seçebilirsiniz."`
                : `Yanıtta mutlaka tek net çağrı: "Size uygun bir saatte arayayım" veya "Kısa görüşme için beni arayın."`;

            const prompt = `
SİSTEM: B2B Satış Temsilcisi — WEB SİTESİ SATIŞI. Görev: Müşteriden gelen e-postaya kısa, profesyonel ve konuya özel bir YANIT taslağı yaz.

${productCta}
${ctaRule}

GÖNDEREN (PERSONA):
${senderBlock}

LEAD: ${lead.firma_adi} (${lead.sektor}). ${lead.personaAnalysis ? `İletişim stili: ${lead.personaAnalysis.communicationStyle}.` : ''}

MÜŞTERİDEN GELEN SON MESAJ (özet/parça):
${lastEmailSnippet.trim().slice(0, 1500)}

KURALLAR:
1. Bu mesaja doğrudan cevap niteliğinde yaz (soru varsa cevapla, talebi kısaca karşıla).
2. Kısa ve net olsun; yukarıdaki CTA'yı mutlaka ekle; imza ekleme.
3. Sadece JSON döndür: {"subject": "Re: ...", "body": "..."}
`;

            const result = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: prompt,
                config: { responseMimeType: 'application/json' }
            });
            const text = (result as { text?: string }).text || '{}';
            const normalized = fixUtf8Mojibake(text);
            const parsed = JSON.parse(normalized || '{}');
            return {
                subject: fixUtf8Mojibake(String(parsed.subject || `Re: ${lead.firma_adi}`).trim()),
                body: fixUtf8Mojibake(String(parsed.body || 'Merhaba, detayları konuşmak isteriz.').trim())
            };
        } catch (e) {
            console.error("AI ReplyDraft Error", e);
            return {
                subject: `Re: ${lead.firma_adi}`,
                body: 'Merhaba, detayları konuşmak isteriz.'
            };
        }
    },

    generateBriefing: async (stats: DashboardStats) => {
        const ai = new GoogleGenAI({ apiKey: getApiKey() });
        const scriptPrompt = `Generate a short motivational briefing text in Turkish based on these stats: ${JSON.stringify(stats)}.`;

        const scriptResponse = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: scriptPrompt,
        });
        const scriptText = scriptResponse.text || "Günaydın!";

        const ttsResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-preview-tts',
            contents: [{ parts: [{ text: scriptText }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } }
            }
        });

        const base64Audio = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
            const audioBuffer = await decodeAudioData(base64ToArrayBuffer(base64Audio), 24000);
            await playAudioBuffer(audioBuffer);
            return scriptText;
        }
        throw new Error("Audio generation failed");
    },

    evaluateTrainingSession: async (transcript: string, scenario: string) => {
        const ai = new GoogleGenAI({ apiKey: getApiKey() });
        const prompt = `Evaluate this sales call transcript based on scenario "${scenario}". Output JSON with score (0-100), feedback, and tips. Transcript: ${transcript}`;
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: { responseMimeType: 'application/json' }
        });
        const data = JSON.parse(response.text || '{}');
        if (data.score && data.score >= 70) gamificationService.recordAction('deal_won');
        return data;
    }
};
