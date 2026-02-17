
import { useRef } from 'react';
import { Lead, LeadStatus } from '../../types';
import { api } from '../../services/api';
import { storage } from '../../services/storage';
import { rewardEngine } from '../../services/rewardEngine';
import {
    isProspectLead,
    isSystemMailbox,
    getErrorMessage,
    isFollowupDue,
    isBounceOrDaemonSnippet,
    isNonActionableInbound
} from '../../utils/agentUtils';
import { verificationService } from '../../services/verificationService';
import type { AgentConfig, SessionStats } from '../../types';

interface UseAgentOutreachProps {
    checkAndIncrementCost: () => boolean;
    setAgentStatus: (status: string) => void;
    addThought: (type: any, message: string, metadata?: any) => void;
    addNotification: (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error') => void;
    setSessionStats: React.Dispatch<React.SetStateAction<SessionStats>>;
    sessionStatsRef: React.MutableRefObject<SessionStats>;
    configRef: React.MutableRefObject<AgentConfig>;
    isCircuitOpen: (category: 'gmail' | 'ai') => boolean;
    recordCircuitFailure: (category: 'gmail' | 'ai') => void;
}

const todayStr = () => new Date().toISOString().slice(0, 10);

export const useAgentOutreach = ({ checkAndIncrementCost, setAgentStatus, addThought, addNotification, setSessionStats, sessionStatsRef, configRef, isCircuitOpen, recordCircuitFailure }: UseAgentOutreachProps) => {
    const outreachRetryRef = useRef<Record<string, { attempts: number, nextRetryAt: number }>>({});
    const outreachFailStreakRef = useRef(0);
    const outreachPausedUntilRef = useRef(0);

    const canSendWithinDailyCap = (): boolean => {
        const today = todayStr();
        const s = sessionStatsRef.current;
        const sent = s.dailyResetDate === today ? (s.dailySentToday ?? 0) : 0;
        const cap = Math.min(200, Math.max(10, configRef.current.dailyEmailCap ?? 50));
        return sent < cap;
    };

    const incrementDailySent = () => {
        const today = todayStr();
        setSessionStats((s) => ({
            ...s,
            dailyResetDate: today,
            dailySentToday: (s.dailyResetDate === today ? (s.dailySentToday ?? 0) : 0) + 1
        }));
    };

    const performOutreach = async (leads: Lead[]): Promise<boolean> => {
        if (isCircuitOpen('gmail')) return false;
        const now = Date.now();
        if (outreachPausedUntilRef.current > now) return false;

        if (!window.gapi?.client?.gmail) {
            if (outreachFailStreakRef.current === 0) {
                addThought('warning', 'Gmail API bağlantısı bulunamadı. Outreach atlanıyor.');
            }
            outreachFailStreakRef.current += 1;
            if (outreachFailStreakRef.current >= 3) {
                outreachPausedUntilRef.current = Date.now() + 2 * 60 * 1000;
                addThought('error', 'Gmail bağlantısı 3 kez başarısız. Outreach 2 dakika duraklatıldı.');
                outreachFailStreakRef.current = 0;
            }
            return false;
        }

        const pendingQueue = leads
            .filter(l => isProspectLead(l) && l.email && !l.son_kontakt_tarihi && !isSystemMailbox(l.email) && !(l.notlar || '').includes('[BOUNCE]'))
            .filter((lead) => {
                const retryState = outreachRetryRef.current[lead.id];
                return !retryState || retryState.nextRetryAt <= now;
            });

        if (pendingQueue.length === 0) return false;

        // Pre-validate emails: quickValidate + verificationService (typo, disposable, format)
        const validQueue: Lead[] = [];
        for (const lead of pendingQueue) {
            const check = api.gmail.quickValidateEmail(lead.email);
            if (!check.valid) {
                await api.leads.update({
                    ...lead,
                    lead_durumu: 'gecersiz',
                    notlar: (lead.notlar || '') + `\n[Sistem]: Email ön-doğrulama başarısız (${check.reason}).`
                });
                addThought('warning', `${lead.firma_adi}: email geçersiz (${check.reason}). Outreach atlandı.`);
                continue;
            }
            const verifyStatus = verificationService.verifyEmail(lead.email);
            if (verifyStatus === 'invalid') {
                await api.leads.update({
                    ...lead,
                    lead_durumu: 'gecersiz',
                    notlar: (lead.notlar || '') + `\n[Sistem]: E-posta doğrulama (typo/disposable/format).`
                });
                addThought('warning', `${lead.firma_adi}: email doğrulama geçersiz. Outreach atlandı.`);
                continue;
            }
            validQueue.push(lead);
        }
        if (validQueue.length === 0) return false;

        const outreachScore = (l: Lead) => (l.lead_skoru ?? 0) + (l.websitesi_var_mi === 'Hayır' ? 2 : 0);
        const lead = validQueue.sort((a, b) => outreachScore(b) - outreachScore(a))[0];

        if (!canSendWithinDailyCap()) {
            const waiting = validQueue.length;
            addThought('warning', `Günlük mail limiti doldu. Yarın devam edecek; ${waiting} lead bekliyor.`);
            addNotification('Limit Doldu', `Günlük mail kotası doldu. ${waiting} lead yarın işlenecek.`, 'info');
            return false;
        }

        // DNS validation before generating email (avoid wasting AI on bad addresses)
        try {
            await api.gmail.validateBeforeSend(lead.email);
        } catch (dnsError: any) {
            const msg = getErrorMessage(dnsError);
            await api.leads.update({
                ...lead,
                lead_durumu: 'gecersiz',
                notlar: (lead.notlar || '') + `\n[Sistem]: E-posta DNS/domain doğrulama başarısız (${msg}).`
            });
            addThought('warning', `${lead.firma_adi}: domain geçersiz (${msg}). Mail gönderilmedi.`);
            return false;
        }

        // --- OUTREACH STRATEGY (2-Step Flow) ---
        const templates = storage.getTemplates();
        let templateId: string;
        let flowStep: 'intro' | 'proposal' = 'intro';
        let newStatus: LeadStatus = 'takipte';

        if (lead.lead_durumu === 'takipte' || lead.son_kontakt_tarihi) {
            const lastContact = new Date(lead.son_kontakt_tarihi || 0).getTime();
            if (Date.now() - lastContact < 2 * 24 * 60 * 60 * 1000) {
                return false;
            }
            flowStep = 'proposal';
            newStatus = 'teklif_gonderildi';
            const proposalTemplates = templates.filter(t => (t.type === 'followup1' || t.type === 'followup2') && t.isActive);
            const proposalIds = proposalTemplates.length > 0 ? proposalTemplates.map(t => t.id) : ['proposal_v1'];
            const proposalResults = rewardEngine.selectBestTemplate(lead, proposalIds);
            templateId = proposalResults.length > 0 ? proposalResults[0].templateId : 'proposal_v1';
        } else {
            const introTemplates = templates.filter(t => t.type === 'intro' && t.isActive);
            const introIds = introTemplates.length > 0 ? introTemplates.map(t => t.id) : ['cold_email_v1'];
            const introResults = rewardEngine.selectBestTemplate(lead, introIds);
            templateId = introResults.length > 0 ? introResults[0].templateId : 'cold_email_v1';
        }

        // Generate Content: proposal = research + bespoke offer; intro = template-based email
        let emailContent = { subject: '', body: '' };
        try {
            if (flowStep === 'proposal') {
                emailContent = await api.ai.generateProposal(lead);
            } else {
                emailContent = await api.ai.generateEmail(lead, templateId);
            }
        } catch (e) {
            emailContent = flowStep === 'proposal'
                ? { subject: `Teklif: ${lead.firma_adi}`, body: 'Detaylı teklifimiz kısa süre içinde iletilecektir.' }
                : { subject: 'Merhaba', body: 'İletişime geçmek istiyoruz.' };
        }

        if (!checkAndIncrementCost()) return false;

        let attachments = undefined;
        if (flowStep === 'proposal') {
            addThought('analysis', `${lead.firma_adi} için teklif PDF'i hazırlanıyor...`);
        }

        setAgentStatus(`Outreach (${flowStep}): ${lead.firma_adi}`);
        addThought('action', `${lead.firma_adi} için ${flowStep} maili gönderiliyor.`);

        try {
            const response = await api.gmail.send(lead.email, emailContent.subject, emailContent.body, attachments);

            if ((response as any)?._status === 'mock') {
                addThought('warning', `[SİMÜLASYON] Gmail bağlı değil — ${lead.firma_adi} için mail gerçekte GÖNDERİLMEDİ.`);
                addNotification('Mail Gönderilmedi', 'Gmail bağlı değil. Ayarlar > Genel & API bölümünden Google hesabınızı bağlayın; mailler ancak o zaman gider.', 'error');
                return false;
            }

            await api.templates.recordUsage(templateId, lead.sektor);
            await api.leads.logInteraction(lead.id, 'email', `Otomatik outreach (${flowStep}): ${emailContent.subject}`);

            await api.leads.update({
                ...lead,
                lead_durumu: newStatus,
                son_kontakt_tarihi: new Date().toISOString(),
                lastUsedTemplateId: templateId,
                notlar: (lead.notlar || '') + `\n[System]: ${flowStep === 'intro' ? 'Tanışma' : 'Teklif'} gönderildi.`
            });
            delete outreachRetryRef.current[lead.id];
            await api.dashboard.logAction('Otomatik Outreach', `${lead.firma_adi} için ${flowStep} mail gönderildi.`, 'success');
            outreachFailStreakRef.current = 0;

            incrementDailySent();
            setSessionStats((s) => ({ ...s, emailed: s.emailed + 1 }));
            addThought('success', `${lead.firma_adi} için ${flowStep} maili gönderildi.`);
            addNotification('Outreach Başarılı', `${lead.firma_adi} işletmesine ${flowStep === 'intro' ? 'tanışma' : 'teklif'} maili iletildi.`, 'success');
            return true;
        } catch (e: any) {
            console.error('Outreach error', e);
            recordCircuitFailure('gmail');
            const errorMessage = getErrorMessage(e);
            const isPermanentRecipientError = errorMessage.startsWith('ALICI_');

            if (isPermanentRecipientError) {
                await api.leads.update({
                    ...lead,
                    lead_durumu: 'gecersiz',
                    notlar: (lead.notlar || '') + `\n[Sistem]: Outreach başarısız (${errorMessage}).`
                });
                delete outreachRetryRef.current[lead.id];
                addThought('warning', `${lead.firma_adi} için geçersiz alıcı tespit edildi, lead arşivlendi.`);
                return true;
            }

            const currentState = outreachRetryRef.current[lead.id] || { attempts: 0, nextRetryAt: 0 };
            const attempts = currentState.attempts + 1;
            const retryDelayMs = Math.min(15 * 60 * 1000, 30 * 1000 * Math.pow(2, attempts - 1));

            outreachRetryRef.current[lead.id] = { attempts, nextRetryAt: Date.now() + retryDelayMs };
            outreachFailStreakRef.current += 1;

            if (outreachFailStreakRef.current >= 3) {
                outreachPausedUntilRef.current = Date.now() + 2 * 60 * 1000;
                addThought('error', `Outreach çok kez başarısız. 2 dakika duraklatıldı.`);
                outreachFailStreakRef.current = 0;
                return true;
            }

            addThought('error', `${lead.firma_adi} outreach başarısız (Deneme ${attempts}). ${Math.round(retryDelayMs / 1000)}s sonra tekrar.`);
            return false;
        }
    };

    /** Soğuk havuzdaki lead'lere tek seferlik yeniden temas (re-engagement) maili; recordReward('re_engagement_sent'). */
    const performColdPoolReEngagement = async (leads: Lead[]): Promise<boolean> => {
        if (isCircuitOpen('gmail')) return false;
        const reEngageCandidates = leads.filter(l =>
            l.strategyPhase === 'cold_pool' && l.email && !isSystemMailbox(l.email) &&
            !(l.notlar || '').includes('[BOUNCE]') && !(l.notlar || '').includes('[RE_ENGAGEMENT_SENT]')
        );
        if (reEngageCandidates.length === 0) return false;
        if (!canSendWithinDailyCap()) return false;

        const score = (l: Lead) => (l.lead_skoru ?? 0) + (l.websitesi_var_mi === 'Hayır' ? 2 : 0);
        const lead = reEngageCandidates.sort((a, b) => score(b) - score(a))[0];

        const check = api.gmail.quickValidateEmail(lead.email);
        if (!check.valid) return false;
        if (verificationService.verifyEmail(lead.email) === 'invalid') return false;
        try {
            await api.gmail.validateBeforeSend(lead.email);
        } catch {
            return false;
        }

        if (!checkAndIncrementCost()) return false;

        const templates = storage.getTemplates();
        const introTemplates = templates.filter(t => t.type === 'intro' && t.isActive);
        const introIds = introTemplates.length > 0 ? introTemplates.map(t => t.id) : ['cold_email_v1'];
        const selected = rewardEngine.selectBestTemplate(lead, introIds);
        const templateId = selected.length > 0 ? selected[0].templateId : 'cold_email_v1';

        setAgentStatus(`Yeniden temas: ${lead.firma_adi}`);
        addThought('action', `Soğuk havuz: ${lead.firma_adi} için yeniden temas maili gönderiliyor.`);

        let emailContent = { subject: '', body: '' };
        try {
            emailContent = await api.ai.generateEmail(lead, templateId);
        } catch (e) {
            emailContent = { subject: `Yeniden görüşme — ${lead.firma_adi}`, body: 'Web sitesi teklifimizi tekrar değerlendirmenizi rica ederiz.' };
        }

        try {
            const response = await api.gmail.send(lead.email, emailContent.subject, emailContent.body);
            if ((response as any)?._status === 'mock') {
                addThought('warning', `[SİMÜLASYON] Gmail bağlı değil — ${lead.firma_adi} yeniden temas maili GÖNDERİLMEDİ.`);
                return false;
            }
            const now = new Date().toISOString();
            await api.templates.recordUsage(templateId, lead.sektor);
            await api.leads.logInteraction(lead.id, 'email', `Re-engagement: ${emailContent.subject}`);
            await api.leads.update({
                ...lead,
                lead_durumu: 'takipte',
                son_kontakt_tarihi: now,
                lastUsedTemplateId: templateId,
                strategyPhase: 'outreach',
                notlar: (lead.notlar || '') + `\n[RE_ENGAGEMENT_SENT]: ${now.slice(0, 10)} — Soğuk havuz yeniden temas.`
            });
            try { rewardEngine.recordReward('re_engagement_sent', lead); } catch (_) { /* ignore */ }
            incrementDailySent();
            setSessionStats((s) => ({ ...s, emailed: s.emailed + 1 }));
            addThought('success', `Soğuk havuz: ${lead.firma_adi} için yeniden temas maili gönderildi.`);
            addNotification('Yeniden Temas', `${lead.firma_adi} soğuk havuz yeniden temas maili iletildi.`, 'success');
            return true;
        } catch (e: any) {
            console.error('Re-engagement send error', e);
            recordCircuitFailure('gmail');
            addThought('error', `Yeniden temas gönderilemedi (${lead.firma_adi}): ${getErrorMessage(e)}.`);
            return false;
        }
    };

    const performInboxReplySync = async (leads: Lead[]): Promise<boolean> => {
        if (isCircuitOpen('gmail')) return false;
        try {
            const result = await api.gmail.syncReplies(leads);
            if (result.bouncedCount > 0) {
                setSessionStats((s) => ({ ...s, bounced: s.bounced + result.bouncedCount }));
            }
            if (result.synced > 0) {
                setAgentStatus(`Inbox güncellendi: ${result.synced} yeni yanıt`);
                addThought('info', `Gelen kutusundan ${result.synced} yeni yanıt eşleştirildi.`);
                return true;
            }
        } catch (e) {
            console.error('Inbox sync error', e);
            recordCircuitFailure('gmail');
        }
        return false;
    };

    const performAutoReplyDrafting = async (leads: Lead[], draftOnly: boolean = false): Promise<boolean> => {
        if (isCircuitOpen('ai')) return false;
        const getLastInboxSnippet = (l: Lead) => {
            const lastLine = (l.notlar || '').split('\n').filter(x => x.includes('[Inbox]:')).pop();
            return lastLine?.replace(/^\[Inbox\]:\s*/, '').trim() ?? '';
        };
        const targets = leads.filter(l => {
            if ((l.lead_durumu !== 'takipte' && l.lead_durumu !== 'teklif_gonderildi') || l.draftResponse || !isFollowupDue(l)) return false;
            if (isSystemMailbox(l.email) || (l.notlar || '').includes('[BOUNCE]') || !l.email?.includes('@')) return false;
            const snippet = getLastInboxSnippet(l);
            if (snippet && (isBounceOrDaemonSnippet(snippet) || isNonActionableInbound(snippet))) return false;
            return true;
        });

        if (targets.length === 0) return false;
        const lead = targets[0];

        if (!draftOnly && !canSendWithinDailyCap()) {
            addThought('warning', 'Günlük mail limiti doldu. Takip yanıtı atlandı.');
            return false;
        }

        if (!checkAndIncrementCost()) return false;

        setAgentStatus(`Yanıt Taslağı: ${lead.firma_adi}`);

        try {
            const lastEmailSnippet = getLastInboxSnippet(lead);
            if (lastEmailSnippet && (isBounceOrDaemonSnippet(lastEmailSnippet) || isNonActionableInbound(lastEmailSnippet))) {
                await api.leads.update({
                    ...lead,
                    lead_durumu: 'gecersiz',
                    notlar: (lead.notlar || '') + `\n[BOUNCE]: Son gelen mesaj daemon/teslim hatası; lead arşivlendi.`
                });
                addThought('warning', `${lead.firma_adi}: Daemon/bounce mesajı tespit edildi, lead arşivlendi.`);
                return false;
            }
            const draft = lastEmailSnippet
                ? await api.ai.generateReplyDraft(lead, lastEmailSnippet)
                : await (async () => {
                    const result = await api.strategy.predictNextMove(lead);
                    const possibleQuestions = Array.isArray(result?.possibleQuestions) ? result.possibleQuestions : [];
                    const tone = result?.recommendedTone || 'neutral';
                    let body = possibleQuestions[0]?.responses?.[tone] ?? possibleQuestions[0]?.responses?.neutral ?? 'Merhaba, detayları konuşmak isteriz.';
                    const profile = storage.getUserProfile();
                    const ctaLine = profile?.calendarUrl
                        ? `\n\nMüsaitliğinize göre 15 dk ücretsiz görüşme için: ${profile.calendarUrl}`
                        : '\n\nSize uygun bir saatte dönüş yapayım; kısa bir görüşme için beni arayabilirsiniz.';
                    if (!body.includes(profile?.calendarUrl || 'aray') && !body.includes('randevu')) body += ctaLine;
                    return { subject: `Re: ${lead.firma_adi} Dijital Çözümler`, body };
                })();
            const draftSubject = draft.subject;
            const draftContent = draft.body;

            const updatedLead: Lead = {
                ...lead,
                draftResponse: {
                    subject: draftSubject,
                    body: draftContent,
                    intent: 'auto_draft',
                    created_at: new Date().toISOString()
                },
                lead_durumu: 'onay_bekliyor'
            };

            if (!draftOnly && lead.email) {
                await api.gmail.send(lead.email, draftSubject, draftContent);
                incrementDailySent();
                await api.leads.logInteraction(lead.id, 'email', `Otomatik takip yanıtı: ${draftSubject}`);
                await api.leads.update({
                    ...lead,
                    lead_durumu: 'takipte',
                    son_kontakt_tarihi: new Date().toISOString().slice(0, 10),
                    draftResponse: undefined
                });
                addThought('success', `Otomatik yanıt gönderildi: ${lead.firma_adi}`);
                return true;
            }

            await api.leads.update(updatedLead);
            setSessionStats((s) => ({ ...s, drafted: s.drafted + 1 }));
            addThought('info', `${lead.firma_adi} için yanıt taslağı hazırlandı.`);
            addNotification('Taslak Hazırlandı', `${lead.firma_adi} firmasından gelen yanıt için taslak oluşturuldu. Onay bekliyor.`, 'info');
            return true;
        } catch (e) {
            console.error(e);
            recordCircuitFailure('ai');
            return false;
        }
    };

    return {
        performOutreach,
        performColdPoolReEngagement,
        performInboxReplySync,
        performAutoReplyDrafting
    };
};
