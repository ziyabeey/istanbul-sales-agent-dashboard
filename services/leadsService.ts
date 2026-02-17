
import { Lead, InteractionType, Interaction, InteractionAnalysis } from '../types';
import { sheetsService } from './googleSheetsService';
import { storage } from './storage';
import { gamificationService } from './gamificationService';
import { rewardEngine } from './rewardEngine';
import { GoogleGenAI } from "@google/genai";
import { fixUtf8Mojibake } from '../utils/agentUtils';
import { isLikelyFakeEmail, isValidTurkishPhone, hasRequiredSource } from '../utils/discoveryQuality';

const getApiKey = () => process.env.API_KEY || localStorage.getItem('apiKey') || '';

const useSheets = () => {
    return sheetsService.isAuthenticated && localStorage.getItem('sheetId');
};

export const leadsService = {
    getAll: async (): Promise<Lead[]> => {
        if (useSheets()) {
            return await sheetsService.getLeads();
        }
        return storage.getLeads();
    },

    create: async (lead: Lead): Promise<Lead> => {
        gamificationService.recordAction('lead_add');
        if (useSheets()) {
            await sheetsService.addLead(lead);
            return lead;
        }
        storage.saveLead(lead);
        return lead;
    },

    updateMany: async (updatedLeads: Lead[]): Promise<void> => {
        if (updatedLeads.length === 0) return;
        if (useSheets()) {
            for (const lead of updatedLeads) await leadsService.update(lead);
        } else {
            storage.updateLeads(updatedLeads);
        }
    },

    update: async (lead: Lead): Promise<void> => {
        if (lead.lead_durumu === 'olumlu') {
            gamificationService.recordAction('deal_won');
        }
        if (useSheets()) {
            const currentLeads = await sheetsService.getLeads();
            const oldLead = currentLeads.find(l => l.id === lead.id);
            await sheetsService.updateLead(lead);
            // RL ödülü + legacy template success: Sheets modunda da durum değişiminde tetikle
            if (oldLead && lead.lastUsedTemplateId && oldLead.lead_durumu !== lead.lead_durumu) {
                if (lead.lead_durumu === 'olumlu' || lead.lead_durumu === 'teklif_gonderildi') {
                    storage.recordTemplateSuccess(lead.lastUsedTemplateId, lead.sektor);
                }
                try {
                    if (lead.lead_durumu === 'olumlu') rewardEngine.recordReward('status_olumlu', lead);
                    else if (lead.lead_durumu === 'teklif_gonderildi') rewardEngine.recordReward('status_teklif', lead);
                    else if (lead.lead_durumu === 'olumsuz') rewardEngine.recordReward('status_olumsuz', lead);
                    else if (lead.lead_durumu === 'takipte' && oldLead.lead_durumu === 'aktif') rewardEngine.recordReward('status_takipte', lead);
                } catch (_) { /* rewardEngine not available */ }
            }
        } else {
            storage.updateLead(lead);
        }
    },

    delete: async (id: string): Promise<void> => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const gamificationService = (window as any).gamificationService || { recordAction: () => { } };
        gamificationService.recordAction('lead_delete'); // Optional: tracking
        if (useSheets()) {
            // await sheetsService.deleteLead(id); // Not implemented in sheetsService yet? assuming stub
            console.log('Delete not fully implemented for Sheets yet');
        } else {
            storage.deleteLead(id);
        }
    },

    cleanupInvalidLeads: async (): Promise<number> => {
        if (useSheets()) {
            return 0; // consistent return type
        }
        return storage.cleanupInvalidLeads();
    },

    /** Tüm "onay bekliyor" taslaklarını iptal eder; lead'leri takipte'ye alır, draftResponse silinir. */
    clearPendingDrafts: async (): Promise<number> => {
        const leads = await leadsService.getAll();
        const pending = leads.filter(l => l.lead_durumu === 'onay_bekliyor');
        if (pending.length === 0) return 0;
        for (const lead of pending) {
            await leadsService.update({
                ...lead,
                lead_durumu: 'takipte',
                draftResponse: undefined
            });
        }
        return pending.length;
    },

    logInteraction: async (leadId: string, type: InteractionType, summary?: string, analysis?: InteractionAnalysis): Promise<void> => {
        if (type === 'email') gamificationService.recordAction('email_sent');
        if (type === 'phone') gamificationService.recordAction('call_made');

        const interaction: Interaction = {
            id: Math.random().toString(36).substr(2, 9),
            leadId,
            type,
            direction: 'outbound',
            date: new Date().toISOString().slice(0, 10),
            time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
            summary: summary || 'Otomatik Etkileşim',
            status: analysis ? 'read' : 'sent',
            analysis
        };

        if (analysis) {
            interaction.direction = 'inbound';
        }

        if (useSheets()) {
            await sheetsService.addInteraction(interaction);
        } else {
            storage.addInteraction(interaction);
        }
    },

    getRecentInteractions: async (limit: number = 20): Promise<Interaction[]> => {
        const all = useSheets() ? await sheetsService.getInteractions() : storage.getInteractions();
        return all.sort((a, b) => new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime()).slice(0, limit);
    },

    discover: async (sector: string, district: string): Promise<Lead[]> => {
        try {
            const ai = new GoogleGenAI({ apiKey: getApiKey() });
            const prompt = `
          GÖREV: Web sitesi tasarımı satışı için KALİTELİ lead bul. Hedef: İstanbul ${district} bölgesinde "${sector}" sektöründe küçük/orta işletme (KOBİ).

          KAYNAK ZORUNLULUĞU: Her lead'i sadece gerçekten arama sonucunda gördüğün bir sayfaya (Google Maps, rehber, resmi site) dayanarak ekle. google_maps_url veya kaynak_url alanını mutlaka doldur; bu alanı dolduramadığın lead'i listeye hiç ekleme.
          ASLA TAHMİN ETME: Sadece arama sonucunda gördüğün gerçek veriyi yaz; görmediğin alanı boş bırak. Firma adı, adres, telefon, email'i kaynakta görmediysan uydurma; o lead'i atla. Google Search ile gerçek ve güncel verileri çek.

          ÖNCELİK: Web sitesi olmayan veya sitesi eski/güncellenmeye ihtiyacı olan işletmeler. İletişim bilgisi net olanlar (telefon veya email). Aynı işletmeyi farklı isimle tekrar döndürme; mümkünse resmi/bilinen firma adını kullan.
          web_sitesi_durumu: "Var" (güncel profesyonel site), "Yok" (site yok) veya "Eski" (site var ama eski/amatör). Öncelik: Yok > Eski > Var. Email yoksa boş bırak; telefon mutlaka doldurulabildiğince doldur (10 haneli Türkiye numarası).

          JSON ÇIKTI FORMATI:
          {
            "leads": [
              {
                "firma_adi": "...",
                "adres": "...",
                "telefon": "...",
                "email": "(varsa gerçek kurumsal email, yoksa boş)",
                "web_sitesi_durumu": "Var/Yok/Eski",
                "ilce": "${district}",
                "sektor": "${sector}",
                "google_maps_url": "https://maps.google.com/... veya boş",
                "kaynak_url": "https://... (rehber veya resmi site, google_maps yoksa bu zorunlu)"
              }
            ]
          }
        `;

            const result = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: prompt,
                config: {
                    tools: [{ googleSearch: {} }],
                    responseMimeType: 'application/json'
                }
            });

            const text = fixUtf8Mojibake(result.text || '{}');
            const parsed = JSON.parse(text);
            const rawLeads = parsed.leads || [];

            const mapped = rawLeads
                .filter((l: any) => {
                    if (!l.firma_adi || (l.firma_adi || '').trim().length < 3) return false;
                    if (!(l.telefon || l.email)) return false;
                    if (l.email && isLikelyFakeEmail(l.email)) return false;
                    if (l.telefon && !isValidTurkishPhone(l.telefon)) return false;
                    if (!hasRequiredSource({ google_maps_url: l.google_maps_url, kaynak_url: l.kaynak_url })) return false;
                    return true;
                })
                .map((l: any) => ({
                    id: Math.random().toString(36).substr(2, 9),
                    firma_adi: fixUtf8Mojibake(String(l.firma_adi || '').trim()),
                    sektor: l.sektor || sector,
                    ilce: l.ilce || district,
                    adres: l.adres,
                    telefon: (l.telefon || '').trim(),
                    email: (l.email || '').trim(),
                    kaynak: 'AI Asistan',
                    websitesi_var_mi: l.web_sitesi_durumu === 'Var' ? 'Evet' : 'Hayır',
                    lead_durumu: 'aktif',
                    lead_skoru: (l.email ? 2 : 1) + (l.web_sitesi_durumu === 'Yok' || l.web_sitesi_durumu === 'Eski' ? 1 : 0),
                    eksik_alanlar: l.email ? [] : ['email'],
                    notlar: 'Otonom keşif ile eklendi.',
                    google_maps_url: (l.google_maps_url || '').trim() || undefined,
                    kaynak_url: (l.kaynak_url || '').trim() || undefined
                })) as Lead[];
            return mapped;

        } catch (e) {
            console.error("Discovery API error", e);
            return [];
        }
    }
};
