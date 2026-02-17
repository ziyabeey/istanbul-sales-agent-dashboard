
import { GoogleGenAI } from '@google/genai';
import { Lead, MarketStrategyResult, PersonaAnalysis, PersonaType, StrategyResult, LeadScoreDetails } from '../types';

const getApiKey = () => process.env.API_KEY || localStorage.getItem('geminiApiKey') || localStorage.getItem('apiKey') || '';

const PERSONA_TYPES: PersonaType[] = ['Dominant', 'Analitik', 'Sosyal', 'Guven_Odakli', 'Bilinmiyor'];

export const strategyService = {
    analyzeMarket: async (sector: string, district: string): Promise<MarketStrategyResult> => {
        // Mock implementation for now, replacing previous inline mock
        return {
            marketAnalysis: { sectorDigitalMaturity: 6, regionEconomicActivity: 8, seasonalFactor: 'High', overallOpportunity: 'Yüksek' },
            idealLeadProfile: { companyAge: '2-5 Yıl', employeeCount: '10-50', estimatedRevenue: '5M+', digitalMaturity: 4, hasWebsite: false, reasoning: 'Growth potential' },
            strategyPriority: [{ name: 'SEO Odaklı', priority: 1, score: 90, reasoning: 'High search volume', searchTerms: ['web tasarım'] }],
            regionRotation: [],
            actionPlan: { nextCycle: 'Next Week', expectedLeadQuality: 'High', estimatedConversion: '5%' }
        };
    },

    analyzePersona: async (lead: Lead): Promise<PersonaAnalysis> => {
        const key = getApiKey();
        if (!key) {
            return { type: 'Bilinmiyor', traits: [], communicationStyle: 'Net ve kibar ol.', reasoning: 'API key yok' };
        }
        try {
            const ai = new GoogleGenAI({ apiKey: key });
            const prompt = `
SİSTEM: B2B satış için DISC tabanlı kişilik analizi.
GÖREV: Aşağıdaki lead bilgisine göre karar verici kişinin iletişim tarzını tahmin et.

LEAD:
- Firma: ${lead.firma_adi}
- Sektör: ${lead.sektor}
- İlçe: ${lead.ilce}
- Notlar: ${(lead.notlar || '').slice(0, 500)}

DISC tipleri (tam olarak birini seç):
- Dominant: Hızlı karar, sonuç odaklı, kısa ve net iletişim.
- Analitik: Veri odaklı, detay ister, mantıklı ve ölçülebilir argümanlar.
- Sosyal: İlişki odaklı, samimi ve enerjik, hikaye ve örnekler.
- Guven_Odakli: Güven ve tutarlılık ister, acele ettirmez, referans ve kanıt.

JSON döndür (sadece bu alanlar, Türkçe):
{
  "type": "Dominant" | "Analitik" | "Sosyal" | "Guven_Odakli" | "Bilinmiyor",
  "traits": ["en fazla 3 kısa özellik"],
  "communicationStyle": "Bu lead ile nasıl yazılmalı, tek cümle (örn: Kısa, net ve sonuç odaklı yaz.)",
  "reasoning": "Kısa gerekçe"
}
`;
            const result = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: prompt,
                config: { responseMimeType: 'application/json' }
            });
            const text = (result as any).text || '';
            const parsed = JSON.parse(text || '{}');
            const type = PERSONA_TYPES.includes(parsed.type) ? parsed.type : 'Bilinmiyor';
            return {
                type,
                traits: Array.isArray(parsed.traits) ? parsed.traits.slice(0, 3) : [],
                communicationStyle: typeof parsed.communicationStyle === 'string' ? parsed.communicationStyle : 'Net ve kibar ol.',
                reasoning: typeof parsed.reasoning === 'string' ? parsed.reasoning : ''
            };
        } catch (e) {
            console.error('analyzePersona error', e);
            return { type: 'Bilinmiyor', traits: [], communicationStyle: 'Net ve kibar ol.', reasoning: 'Analiz hatası' };
        }
    },

    /**
     * Gelen e-posta yanıtının tonuna göre persona tahmini (DISC). Lead yanıt verdiğinde iletişim tarzını güncellemek için kullanılır.
     * Hata veya Bilinmiyor dönerse null; aksi halde PersonaAnalysis.
     */
    analyzePersonaFromReply: async (replySnippet: string, lead: Lead): Promise<PersonaAnalysis | null> => {
        const key = getApiKey();
        if (!key || !replySnippet?.trim()) return null;
        try {
            const ai = new GoogleGenAI({ apiKey: key });
            const prompt = `
SİSTEM: B2B satış — müşterinin yazdığı e-posta yanıtının tonuna göre DISC tipi tahmin et.
GÖREV: Sadece bu yanıt metnine bakarak iletişim tarzını (DISC) belirle.

MÜŞTERİ YANITI (kısa):
${replySnippet.slice(0, 600)}

DISC tipleri (tam olarak birini seç):
- Dominant: Kısa, net, sonuç odaklı, acele.
- Analitik: Detay, veri, soru, mantık.
- Sosyal: Samimi, enerjik, hikaye, ilişki.
- Guven_Odakli: Güven, referans, acele yok, tutarlılık.
- Bilinmiyor: Ton belirsiz veya çok kısa.

JSON döndür (sadece bu alanlar, Türkçe):
{ "type": "Dominant" | "Analitik" | "Sosyal" | "Guven_Odakli" | "Bilinmiyor", "traits": ["en fazla 2 özellik"], "communicationStyle": "Bu lead ile nasıl yazılmalı, tek cümle", "reasoning": "Kısa gerekçe" }
`;
            const result = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: prompt,
                config: { responseMimeType: 'application/json' }
            });
            const text = (result as any).text || '';
            const parsed = JSON.parse(text || '{}');
            const type = PERSONA_TYPES.includes(parsed.type) ? parsed.type : 'Bilinmiyor';
            if (type === 'Bilinmiyor') return null;
            return {
                type,
                traits: Array.isArray(parsed.traits) ? parsed.traits.slice(0, 2) : [],
                communicationStyle: typeof parsed.communicationStyle === 'string' ? parsed.communicationStyle : 'Net ve kibar ol.',
                reasoning: typeof parsed.reasoning === 'string' ? parsed.reasoning : 'Gelen yanıt tonu'
            };
        } catch (e) {
            console.error('analyzePersonaFromReply error', e);
            return null;
        }
    },

    predictNextMove: async (lead: Lead): Promise<StrategyResult> => {
        const persona = lead.personaAnalysis?.type || 'Bilinmiyor';
        const recommendedTone = persona === 'Dominant' ? 'aggressive' as const
            : persona === 'Analitik' ? 'consultative' as const
            : persona === 'Guven_Odakli' ? 'consultative' as const
            : 'neutral' as const;

        const defaultQuestion = {
            question: "Fiyat nedir?",
            category: 'pricing' as const,
            responses: {
                aggressive: "Pahalı değil, değerli.",
                neutral: "Bütçenize göre planlarız.",
                consultative: "Yatırım getirisi odaklı bakalım."
            }
        };
        const personaResponses: Record<string, Partial<typeof defaultQuestion.responses>> = {
            Dominant: { aggressive: "Net fiyat: paketlere göre. Hızlı karar için özet sunarız.", neutral: "Bütçenize uygun seçenekler var.", consultative: "ROI odaklı öneri hazırlayalım." },
            Analitik: { aggressive: "Verilerle desteklenmiş fiyatlandırma.", neutral: "Detaylı teklif ve karşılaştırma sunabiliriz.", consultative: "Maliyet-fayda analizi ile ilerleyelim." },
            Sosyal: { aggressive: "Yatırım değerini birlikte konuşalım.", neutral: "Sizin için en uygun paketi birlikte seçelim.", consultative: "Örneklerle anlatayım, sonra karar verirsiniz." },
            Guven_Odakli: { aggressive: "Referanslarımız ve garantilerimiz mevcut.", neutral: "Adım adım, şeffaf fiyatlandırma.", consultative: "Önce ihtiyacınızı dinleyelim, zorlama yok." }
        };
        const responses = { ...defaultQuestion.responses, ...(personaResponses[persona] || {}) };

        return {
            possibleQuestions: [
                { ...defaultQuestion, responses }
            ],
            recommendedTone,
            reasoning: persona !== 'Bilinmiyor' ? `${persona} persona’ya göre ${recommendedTone} ton önerildi.` : 'Standard approach'
        };
    },

    calculateLeadScore: async (lead: Lead): Promise<LeadScoreDetails> => {
        return {
            categoryScores: { website: 5, seo: 3, socialMedia: 4, onlineSystem: 2, contentQuality: 3, competitorGap: 4, sectorUrgency: 5 },
            bonusFactors: {}, totalScore: 50, finalLeadScore: 3, digitalWeaknesses: ['SEO Zayıf'], opportunityAreas: ['Sosyal Medya'], estimatedConversionProbability: 'Orta', reasoning: 'Basic score', lastCalculated: new Date().toISOString()
        };
    }
};
