
import { Lead } from '../types';
import { isBounceOrDaemonSnippet, isNonActionableInbound } from '../utils/agentUtils';
import { gmailService } from './gmailService';
import { sheetsService } from './googleSheetsService';
import { gamificationService } from './gamificationService';
import { leadsService } from './leadsService';
import { strategyService } from './strategyService';
import { storage } from './storage';

const useGmail = () => {
    return sheetsService.isAuthenticated && !!window.gapi?.client?.gmail;
};

export const emailService = {
    /** True if Gmail API is available; when false, send() returns mock and no real email is sent. */
    isConnected: (): boolean => useGmail(),

    /** Validates recipient (format + DNS) before send. Use in outreach to avoid generating email for invalid addresses. */
    validateBeforeSend: async (email: string): Promise<void> => {
        if (useGmail()) {
            await gmailService.validateRecipientEmail(email);
        }
    },

    send: async (to: string, subject: string, body: string, attachments?: any[]) => {
        gamificationService.recordAction('email_sent');

        if (useGmail()) {
            return await gmailService.sendEmail(to, subject, body, attachments);
        }
        // Simulate email sending delay
        await new Promise(resolve => setTimeout(resolve, 800));
        console.log("Local Simulation: Email Sent:", { to, subject });
        return { id: 'local-mock-id', _status: 'mock' };
    },

    syncReplies: async (leads: Lead[]): Promise<{ synced: number; matchedLeadIds: string[]; bouncedCount: number }> => {
        if (!useGmail()) {
            return { synced: 0, matchedLeadIds: [], bouncedCount: 0 };
        }

        // Helper: detect if message content is a bounce/delivery failure
        const isBounceContent = (snippet: string, subject: string): boolean => {
            const text = `${subject} ${snippet}`;
            const bounceRegexes = [
                /delivery status notification/i,
                /delivery failure/i,
                /mail delivery failed/i,
                /undeliverable/i,
                /returned mail/i,
                /failure notice/i,
                /rejected/i,
                /bounce/i,
                /not delivered/i,
                /could not be delivered/i,
                /teslim edilemedi/i,
                /iletilemedi/i,
                /gönderilemedi/i,
                /adres bulunamadı/i,
                /address not found/i,
                /user unknown/i,
                /mailbox not found/i,
                /recipient rejected/i,
                /no such user/i,
                /invalid recipient/i,
                /message not delivered/i,
                /ileti teslim edilemedi/i
            ];
            return bounceRegexes.some(r => r.test(text));
        };

        // Helper: extract the failed recipient email from bounce message
        const extractBouncedRecipient = (snippet: string, subject: string): string | null => {
            const fullText = `${subject} ${snippet}`;

            // 1. Try to find any lead email that exists in our database within the bounce text
            // This is more reliable than generic regex because we know exactly who we are looking for
            const mentionedLead = leads.find(l => l.email && fullText.includes(l.email));
            if (mentionedLead && mentionedLead.email) return mentionedLead.email.toLowerCase();

            // 2. Fallback to generic regex
            const emailMatch = fullText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
            return emailMatch ? emailMatch[0].toLowerCase() : null;
        };

        type InboxMsg = { id: string; fromEmail: string; fromName: string; subject: string; snippet: string; date: string; isUnread: boolean };
        const toSyncedIds: string[] = [];

        try {
            const syncedSet = new Set(storage.getSyncedInboxMessageIds());
            const [unreadList, inboxList] = await Promise.all([
                gmailService.listUnreadInbox(20),
                gmailService.listInboxMessages(40)
            ]);
            const byId = new Map<string, InboxMsg>();
            unreadList.forEach((m: { id: string; fromEmail: string; fromName: string; subject: string; snippet: string; date: string }) => {
                byId.set(m.id, { ...m, isUnread: true });
            });
            inboxList.forEach((m: InboxMsg) => {
                if (!byId.has(m.id)) byId.set(m.id, m);
            });
            const candidates = Array.from(byId.values()).filter(m => !syncedSet.has(m.id));

            let syncedCount = 0;
            let bouncedCount = 0;
            const matchedLeadIds: string[] = [];

            for (const msg of candidates) {
                const isFromDaemon = gmailService.isBlockedMailbox(msg.fromEmail);
                const isBounceSubject = gmailService.isBounceLikeSubject(msg.subject);
                const isBounceMsg = isBounceContent(msg.snippet || '', msg.subject);

                // --- BOUNCE HANDLING ---
                if (isFromDaemon || isBounceSubject || (isFromDaemon === false && isBounceMsg)) {
                    if (msg.isUnread) await gmailService.markAsRead(msg.id);
                    toSyncedIds.push(msg.id);
                    const bouncedEmail = extractBouncedRecipient(msg.snippet || '', msg.subject);
                    if (bouncedEmail) {
                        const bouncedLead = leads.find(l =>
                            l.email && l.email.toLowerCase() === bouncedEmail &&
                            l.lead_durumu !== 'gecersiz'
                        );
                        if (bouncedLead) {
                            await leadsService.update({
                                ...bouncedLead,
                                lead_durumu: 'gecersiz',
                                notlar: (bouncedLead.notlar || '') + `\n[BOUNCE]: Mail teslim edilemedi (${msg.subject}). Lead otomatik arşivlendi.`
                            });
                            bouncedCount++;
                            console.log(`[SyncReplies] Bounce detected for ${bouncedEmail}, lead archived.`);
                        }
                    }
                    continue;
                }

                const lead = leads.find(l => l.email && l.email.toLowerCase() === msg.fromEmail.toLowerCase());
                if (!lead) continue;

                if (lead.lead_durumu === 'gecersiz' || (lead.notlar || '').includes('[BOUNCE]')) {
                    if (msg.isUnread) await gmailService.markAsRead(msg.id);
                    toSyncedIds.push(msg.id);
                    continue;
                }

                const snippet = msg.snippet || '';
                if (isBounceOrDaemonSnippet(snippet) || isBounceContent(snippet, msg.subject)) {
                    await leadsService.update({
                        ...lead,
                        lead_durumu: 'gecersiz',
                        notlar: (lead.notlar || '') + `\n[BOUNCE]: Karşı sunucu bounce verdi (${msg.subject}). Lead arşivlendi.`
                    });
                    bouncedCount++;
                    if (msg.isUnread) await gmailService.markAsRead(msg.id);
                    toSyncedIds.push(msg.id);
                    continue;
                }
                if (isNonActionableInbound(snippet)) {
                    await leadsService.update({
                        ...lead,
                        notlar: (lead.notlar || '') + `\n[Inbox]: ${msg.snippet}\n[Inbox-NonActionable]: Genel merkez/otomatik yanıt vb. — taslak oluşturulmadı.`
                    });
                    if (msg.isUnread) await gmailService.markAsRead(msg.id);
                    toSyncedIds.push(msg.id);
                    continue;
                }

                await leadsService.logInteraction(lead.id, 'email', `[Gelen Yanıt] ${msg.subject}`, {
                    sentiment: 'neutral',
                    intent: 'other',
                    suggested_reply: '',
                    suggested_status: 'onay_bekliyor'
                });
                const updatedNotlar = (lead.notlar || '') + `\n[Inbox]: ${msg.snippet}`;
                await leadsService.update({
                    ...lead,
                    lead_durumu: 'onay_bekliyor',
                    notlar: updatedNotlar
                });
                strategyService.analyzePersonaFromReply(snippet, lead).then((persona) => {
                    if (persona && persona.type !== 'Bilinmiyor') {
                        leadsService.update({
                            ...lead,
                            lead_durumu: 'onay_bekliyor',
                            notlar: updatedNotlar,
                            personaAnalysis: persona
                        }).catch((e) => console.warn('Persona update from reply failed', e));
                    }
                });
                if (msg.isUnread) await gmailService.markAsRead(msg.id);
                toSyncedIds.push(msg.id);
                syncedCount++;
                matchedLeadIds.push(lead.id);
            }

            if (toSyncedIds.length > 0) storage.addSyncedInboxMessageIds(toSyncedIds);
            return { synced: syncedCount, matchedLeadIds, bouncedCount };
        } catch (e) {
            console.error("Sync replies error", e);
            return { synced: 0, matchedLeadIds: [], bouncedCount: 0 };
        }
    },

    quickValidateEmail: (email: string): { valid: boolean; reason?: string } => {
        return gmailService.quickValidateEmail(email);
    },

    listInbox: async (limit = 20) => {
        if (!window.gapi?.client?.gmail) return [];
        return gmailService.listInboxMessages(limit);
    },

    listSent: async (limit = 20) => {
        if (!window.gapi?.client?.gmail) return [];
        return gmailService.listSentMessages(limit);
    }
};
