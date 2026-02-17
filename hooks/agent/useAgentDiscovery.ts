
import { useRef } from 'react';
import { Lead } from '../../types';
import { api } from '../../services/api';
import { AgentConfig, SessionStats } from '../../types';
import {
    isProspectLead,
    parseGeminiJson,
    extractGeminiText
} from '../../utils/agentUtils';
import { GoogleGenAI } from "@google/genai";
import { AGENT_ERROR_CODES, DISCOVERY_MAX_ACTIONABLE_LEADS, DISCOVERY_MAX_TOTAL_ACTIVE, MIN_ENRICHMENT_SCORE, WEB_DESIGN_SECTORS } from '../../constants';
import { checkLeadWebsiteByEmail, verificationService } from '../../services/verificationService';
import { isPlaceholderFirmaAdi } from '../../utils/discoveryQuality';

interface UseAgentDiscoveryProps {
    configRef: React.MutableRefObject<AgentConfig>;
    checkAndIncrementCost: () => boolean;
    setAgentStatus: (status: string) => void;
    addThought: (type: any, message: string, metadata?: any) => void;
    addNotification: (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error') => void;
    setSessionStats: React.Dispatch<React.SetStateAction<SessionStats>>;
    isCircuitOpen: (category: 'gmail' | 'ai') => boolean;
    recordCircuitFailure: (category: 'gmail' | 'ai') => void;
}

const PRIORITY_DISTRICTS = ['Bahçeşehir', 'Esenyurt', 'Beylikdüzü'];
const AGENT_MODEL = 'gemini-3-flash-preview';

/** Tek bir aday için e-posta arar; bulunursa e-posta döner, yoksa null. Lead kaydedilmeden önce kullanılır. */
async function findEmailForCandidate(
    partial: { firma_adi: string; ilce: string; sektor: string },
    ai: InstanceType<typeof GoogleGenAI>,
    addThought: (type: any, message: string) => void
): Promise<string | null> {
    const prompt = `
      SİSTEM ROLÜ: B2B veri zenginleştirme uzmanı.
      HEDEF: ${partial.firma_adi} (${partial.ilce}, ${partial.sektor})
      GÖREV: Web'de kurumsal email adresi bul.
      ⚠️ Asla tahmin yürütme (info@... uydurma). Sadece kaynakta gördüğün mailleri getir. Bulamazsan email boş döndür.
      JSON: { "email": "...", "confidence": "high/medium/low", "source": "..." }
    `;
    try {
        const result = await ai.models.generateContent({
            model: AGENT_MODEL,
            contents: prompt,
            config: { tools: [{ googleSearch: {} }], responseMimeType: 'application/json' }
        });
        const data = parseGeminiJson(extractGeminiText(result) || '{}');
        const email = data.email && data.email.includes('@') && !data.email.includes('null') && !data.email.includes('example.com') ? String(data.email).trim() : null;
        if (email) addThought('success', `${partial.firma_adi} için e-posta bulundu: ${email}`);
        return email;
    } catch {
        return null;
    }
}

export const useAgentDiscovery = ({ configRef, checkAndIncrementCost, setAgentStatus, addThought, addNotification, setSessionStats, isCircuitOpen, recordCircuitFailure }: UseAgentDiscoveryProps) => {
    const enrichmentRetryRef = useRef<Record<string, { attempts: number; nextRetryAt: number }>>({});
    const discoveryRotationRef = useRef({ districtIndex: 0, sectorIndex: 0 });

    const getAiClient = () => {
        const key = localStorage.getItem('geminiApiKey') || localStorage.getItem('apiKey') || '';
        if (!key) throw new Error("API Key eksik");
        return new GoogleGenAI({ apiKey: key });
    };

    const performAutoEnrichment = async (leads: Lead[]): Promise<boolean> => {
        if (isCircuitOpen('ai')) return false;
        const { targetDistrict, targetSector, minEnrichmentScore } = configRef.current;
        const minScore = minEnrichmentScore ?? MIN_ENRICHMENT_SCORE;
        const now = Date.now();

        const candidates = leads.filter(l =>
            isProspectLead(l) &&
            (!l.email) &&
            l.lead_skoru >= minScore &&
            (targetDistrict === 'Tümü' || l.ilce === targetDistrict) &&
            (targetSector === 'Tümü' || l.sektor === targetSector)
        );

        const readyCandidates = candidates.filter((lead) => {
            const retryState = enrichmentRetryRef.current[lead.id];
            return !retryState || retryState.nextRetryAt <= now;
        });

        const target = readyCandidates[0];
        if (!target) return false;

        if (!checkAndIncrementCost()) return false;

        setAgentStatus(`${target.firma_adi} verileri zenginleştiriliyor...`);
        addThought('action', `${target.firma_adi} için iletişim bilgisi (Email) aranıyor.`);

        try {
            const ai = getAiClient();
            const prompt = `
              SİSTEM ROLÜ: B2B veri zenginleştirme uzmanı.
              HEDEF: ${target.firma_adi} (${target.ilce}, ${target.sektor})
              GÖREV: Web'de kurumsal email adresi bul.
              
              ⚠️ KRİTİK:
              - Asla tahmin yürütme (örn: info@... gibi uydurma).
              - Sadece %100 emin olduğun, kaynakta geçen mailleri getir.
              - Bulamazsan boş döndür.
              
              JSON: { "email": "...", "confidence": "high/medium/low", "source": "..." }
            `;

            const result = await ai.models.generateContent({
                model: AGENT_MODEL,
                contents: prompt,
                config: {
                    tools: [{ googleSearch: {} }],
                    responseMimeType: 'application/json'
                }
            });

            const data = parseGeminiJson(extractGeminiText(result) || '{}');

            if (data.email && data.email.includes('@') && !data.email.includes('null') && !data.email.includes('example.com')) {
                const verifyStatus = verificationService.verifyEmail(data.email);
                if (verifyStatus === 'invalid') {
                    addThought('warning', `${target.firma_adi}: bulunan e-posta doğrulamadan geçemedi (format/typo/disposable).`);
                    const attempts = (enrichmentRetryRef.current[target.id]?.attempts || 0) + 1;
                    if (attempts >= 3) {
                        await api.leads.update({
                            ...target,
                            lead_durumu: 'gecersiz',
                            notlar: (target.notlar || '') + '\n[AI]: 3 denemede geçerli email bulunamadı. İletişim: sadece telefon (e-posta yok).'
                        });
                        delete enrichmentRetryRef.current[target.id];
                    } else {
                        enrichmentRetryRef.current[target.id] = { attempts, nextRetryAt: Date.now() + 5 * 60 * 1000 };
                    }
                    return true;
                }
                const quickCheck = api.gmail.quickValidateEmail(data.email);
                if (!quickCheck.valid) {
                    addThought('warning', `${target.firma_adi}: e-posta format/domain geçersiz (${quickCheck.reason}).`);
                    return true;
                }
                let websitesi_var_mi: 'Evet' | 'Hayır' = target.websitesi_var_mi || 'Hayır';
                try {
                    const webCheck = await checkLeadWebsiteByEmail(data.email);
                    if (webCheck !== 'unknown') websitesi_var_mi = webCheck;
                } catch (_) { /* ignore */ }
                let notlar = target.notlar ? `${target.notlar}\n[AI]: Email bulundu (${data.source})` : `[AI]: Email bulundu (${data.source})`;
                if (websitesi_var_mi === 'Evet' && data.email?.includes('@')) {
                    try {
                        const domain = data.email.split('@')[1];
                        const siteAge = await verificationService.checkSiteAge(domain);
                        if (siteAge === 'old') notlar += '\n[Site yaşı: eski]';
                        else if (siteAge === 'ok') notlar += '\n[Site: güncel]';
                        const mobile = await verificationService.checkMobileFriendly(domain);
                        if (mobile === 'ok') notlar += ' [Mobil: uyumlu]';
                        else if (mobile === 'poor') notlar += ' [Mobil: zayıf]';
                    } catch (_) { /* ignore */ }
                }
                const updatedLead = {
                    ...target,
                    email: data.email,
                    websitesi_var_mi,
                    eksik_alanlar: target.eksik_alanlar.filter(f => f !== 'email'),
                    lead_skoru: (target.lead_skoru + 2) + (websitesi_var_mi === 'Hayır' ? 1 : 0),
                    notlar
                };
                await api.leads.update(updatedLead);
                delete enrichmentRetryRef.current[target.id];
                setSessionStats((s) => ({ ...s, enriched: s.enriched + 1 }));
                addThought('success', `${target.firma_adi} email bulundu: ${data.email}`);
                return true;
            } else {
                const prevState = enrichmentRetryRef.current[target.id];
                const attempts = (prevState?.attempts || 0) + 1;

                if (attempts >= 3) {
                    const updatedLead: Lead = {
                        ...target,
                        lead_durumu: 'gecersiz',
                        notlar: target.notlar ? `${target.notlar}\n[AI]: 3 denemede email bulunamadı. İletişim: sadece telefon (e-posta yok).` : `[AI]: 3 denemede email bulunamadı. İletişim: sadece telefon (e-posta yok).`
                    };
                    await api.leads.update(updatedLead);
                    delete enrichmentRetryRef.current[target.id];
                    addThought('warning', `${target.firma_adi} pasife alındı (Email bulunamadı).`);
                    return true;
                }

                const cooldownMs = Math.min(60 * 60 * 1000, Math.pow(2, attempts) * 5 * 60 * 1000);
                enrichmentRetryRef.current[target.id] = { attempts, nextRetryAt: Date.now() + cooldownMs };
                addThought('decision', `${target.firma_adi} için email bulunamadı. (${attempts}/3).`);
                return true;
            }
        } catch (e: any) {
            console.error("Enrichment error", e);
            recordCircuitFailure('ai');
            const msg = (e?.message || '').toString();
            if (msg.includes('429') || msg.includes('quota') || msg.includes('rate')) {
                addNotification('API Limiti', 'Zenginleştirme şu an kullanılamıyor (limit). Bir süre sonra tekrar denenecek.', 'warning');
            } else {
                addNotification('Geçici Hata', 'Zenginleştirme geçici olarak kullanılamıyor. Bir süre sonra tekrar denenecek.', 'info');
            }
            const attempts = (enrichmentRetryRef.current[target.id]?.attempts || 0) + 1;
            const cooldownMs = Math.min(60 * 60 * 1000, attempts * 5 * 60 * 1000);
            enrichmentRetryRef.current[target.id] = { attempts, nextRetryAt: Date.now() + cooldownMs };
            addThought('error', `Zenginleştirme hatası (${target.firma_adi}): ${e.message || 'Bilinmiyor'}. ${Math.round(cooldownMs / 60000)}dk sonra tekrar.`);
        }
        return false;
    };

    const performSmartDiscovery = async (leads: Lead[]): Promise<boolean> => {
        if (isCircuitOpen('ai')) return false;
        const { discoveryMaxActionableLeads, discoveryMaxTotalActive } = configRef.current;
        const maxActionable = discoveryMaxActionableLeads ?? DISCOVERY_MAX_ACTIONABLE_LEADS;
        const maxTotal = discoveryMaxTotalActive ?? DISCOVERY_MAX_TOTAL_ACTIVE;
        const actionableLeads = leads.filter(l => isProspectLead(l) && l.email && !l.son_kontakt_tarihi).length;
        const totalActive = leads.filter(isProspectLead).length;

        if (actionableLeads >= maxActionable) return false;
        if (totalActive > maxTotal) return false;

        if (!checkAndIncrementCost()) return false;

        const { targetDistrict, targetSector } = configRef.current;

        let district = targetDistrict;
        if (targetDistrict === 'Tümü') {
            district = PRIORITY_DISTRICTS[discoveryRotationRef.current.districtIndex];
            discoveryRotationRef.current.districtIndex = (discoveryRotationRef.current.districtIndex + 1) % PRIORITY_DISTRICTS.length;
        }

        const sector = targetSector === 'Tümü'
            ? (() => {
                const idx = discoveryRotationRef.current.sectorIndex;
                discoveryRotationRef.current.sectorIndex = (idx + 1) % WEB_DESIGN_SECTORS.length;
                return WEB_DESIGN_SECTORS[idx];
            })()
            : targetSector;

        setAgentStatus('Pipeline besleniyor: Web sitesi ihtiyacı olan KOBİ aranıyor...');
        addThought('action', `${district} bölgesinde ${sector} için nitelikli lead aranıyor (web sitesi ihtiyacı öncelikli).`);

        try {
            const discoveredLeads = await api.leads.discover(sector, district);

            if (discoveredLeads.length === 0) {
                addThought('decision', 'Arama yapıldı ancak uygun lead bulunamadı.');
                return false;
            }

            const existingNameSet = new Set(leads.map(l => l.firma_adi.toLowerCase().trim()));
            const existingDomains = new Set(
                leads.filter(l => l.email?.includes('@')).map(l => l.email!.split('@')[1].toLowerCase())
            );
            const normalizePhone = (p: string) => (p || '').replace(/\D/g, '').slice(-10);
            const existingPhones = new Set(leads.filter(l => l.telefon).map(l => normalizePhone(l.telefon!)));
            const sorted = [...discoveredLeads].sort((a, b) => (b.lead_skoru ?? 0) - (a.lead_skoru ?? 0));
            let addedCount = 0;
            const ai = getAiClient();

            for (const newLead of sorted) {
                if (existingNameSet.has(newLead.firma_adi.toLowerCase().trim())) continue;
                if (newLead.telefon && existingPhones.has(normalizePhone(newLead.telefon))) continue;
                if (isPlaceholderFirmaAdi(newLead.firma_adi)) {
                    addThought('decision', `${newLead.firma_adi}: placeholder/jenerik isim, lead atlandı.`);
                    continue;
                }
                if (newLead.email && existingDomains.has(newLead.email.split('@')[1].toLowerCase())) continue;

                // E-posta zorunlu: yoksa bul, geçersizse kaydetme
                let email: string | null = (newLead.email && newLead.email.includes('@')) ? newLead.email.trim() : null;
                if (!email) {
                    email = await findEmailForCandidate(
                        { firma_adi: newLead.firma_adi, ilce: newLead.ilce || '', sektor: newLead.sektor || '' },
                        ai,
                        addThought
                    );
                    if (!email) {
                        addThought('decision', `${newLead.firma_adi}: e-posta bulunamadı, lead kaydı atlandı.`);
                        continue;
                    }
                }
                if (verificationService.verifyEmail(email) === 'invalid') {
                    addThought('decision', `${newLead.firma_adi}: e-posta geçersiz, lead kaydı atlandı.`);
                    continue;
                }
                const quickCheck = api.gmail.quickValidateEmail(email);
                if (!quickCheck.valid) {
                    addThought('decision', `${newLead.firma_adi}: e-posta formatı uygun değil (${quickCheck.reason || 'bilinmiyor'}), atlandı.`);
                    continue;
                }

                const finalLead = { ...newLead, email };
                await api.leads.create(finalLead);
                await api.dashboard.logAction('Otonom Lead Keşfi', `${newLead.firma_adi} eklendi`, 'success');
                existingNameSet.add(newLead.firma_adi.toLowerCase().trim());
                existingDomains.add(email.split('@')[1].toLowerCase());
                if (newLead.telefon) existingPhones.add(normalizePhone(newLead.telefon));
                addedCount += 1;
            }

            if (addedCount > 0) {
                setSessionStats((s) => ({ ...s, discovered: s.discovered + addedCount }));
                addThought('success', `Pipeline güncellendi: ${addedCount} yeni lead eklendi.`);
                addNotification('Yeni Lead Keşfedildi', `${addedCount} yeni işletme radara girdi ve pipeline'a eklendi.`, 'success');
                return true;
            }

            addThought('decision', 'Bulunan leadler zaten sistemde mevcut.');
            return false;
        } catch (e: any) {
            console.error('Discovery error', e);
            recordCircuitFailure('ai');
            const msg = (e?.message || '').toString();
            if (msg.includes('429') || msg.includes('quota') || msg.includes('rate')) {
                addNotification('API Limiti', 'Keşif şu an kullanılamıyor (limit). Bir süre sonra tekrar denenecek.', 'warning');
            } else {
                addNotification('Geçici Hata', 'Keşif geçici olarak kullanılamıyor. Bir süre sonra tekrar denenecek.', 'info');
            }
            const code = msg.includes('429') ? AGENT_ERROR_CODES.AI_RATE_LIMIT : AGENT_ERROR_CODES.AI_GENERATE;
            addThought('error', `[${code}] Keşif hatası: ${e.message || e}`);
            return false;
        }
    };

    return { performAutoEnrichment, performSmartDiscovery };
};
