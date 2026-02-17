
import { Lead, Task, ActionLog, Interaction, DashboardStats, UsageStats, EmailTemplate, TemplateStats, UserProfile, CalendarEvent, RegionStat, LeadStatus } from '../types';
import { MOCK_LEADS, MOCK_TASKS, MOCK_LOGS, MOCK_INTERACTIONS, MOCK_TEMPLATES } from './mockService';

const KEYS = {
    LEADS: 'sales_agent_leads',
    TASKS: 'sales_agent_tasks',
    LOGS: 'sales_agent_logs',
    INTERACTIONS: 'sales_agent_interactions',
    USAGE: 'sales_agent_usage',
    TEMPLATES: 'sales_agent_templates',
    PROFILE: 'sales_agent_profile',
    EVENTS: 'sales_agent_events',
    SYNCED_INBOX_IDS: 'sales_agent_synced_inbox_message_ids'
};

const SYNCED_INBOX_IDS_MAX = 1000;

// Pricing Constants (USD)
// Gemini 1.5 Flash Approx Blended Cost per Action (Input + Output + Search overhead)
// ~ $0.002 per complex action
const COST_PER_REQUEST = 0.002;

export const storage = {
    init: () => {
        if (!localStorage.getItem(KEYS.PROFILE)) {
            localStorage.setItem(KEYS.PROFILE, JSON.stringify({ isSetupComplete: false }));
        }
    },

    loadMocks: () => {
        localStorage.setItem(KEYS.LEADS, JSON.stringify(MOCK_LEADS));
        localStorage.setItem(KEYS.TASKS, JSON.stringify(MOCK_TASKS));
        localStorage.setItem(KEYS.LOGS, JSON.stringify(MOCK_LOGS));
        localStorage.setItem(KEYS.INTERACTIONS, JSON.stringify(MOCK_INTERACTIONS));

        const templatesWithStats = MOCK_TEMPLATES.map(t => ({
            ...t,
            useCount: 0,
            successCount: 0,
            sectorStats: {}
        }));
        localStorage.setItem(KEYS.TEMPLATES, JSON.stringify(templatesWithStats));
    },

    clearAllData: () => {
        localStorage.removeItem(KEYS.LEADS);
        localStorage.removeItem(KEYS.TASKS);
        localStorage.removeItem(KEYS.LOGS);
        localStorage.removeItem(KEYS.INTERACTIONS);
        localStorage.removeItem(KEYS.TEMPLATES);
        localStorage.removeItem(KEYS.EVENTS);
    },

    /**
     * Geçmiş verileri temizler; sadece Ayarlar ve Persona verisi kalır.
     * Silinen: lead, görev, log, etkileşim, şablon, takvim, kullanım, otopilot oturum, ödül logu, q-table, gamification, öğrenme.
     * Korunan: profil (persona), API anahtarları, Firebase config, otopilot tercihleri (limit, mod vb.).
     */
    clearHistoryKeepSettingsAndPersona: (): void => {
        const profileRaw = localStorage.getItem(KEYS.PROFILE);
        const settingsKeys = ['geminiApiKey', 'googleApiKey', 'apiKey', 'clientId', 'sheetId', 'waToken', 'waPhoneId', 'adminPhone', 'firebaseConfig', 'agent_daily_email_cap', 'agent_ignore_budget', 'agent_speed_profile', 'agent_auto_send_followup'];
        const saved: Record<string, string | null> = {};
        settingsKeys.forEach(k => { saved[k] = localStorage.getItem(k); });

        const toRemove = [
            KEYS.LEADS, KEYS.TASKS, KEYS.LOGS, KEYS.INTERACTIONS, KEYS.TEMPLATES, KEYS.EVENTS, KEYS.USAGE, KEYS.SYNCED_INBOX_IDS,
            'agent_session_stats', 'sales_agent_reward_log', 'sales_agent_qtable', 'sales_agent_qtable_meta',
            'sales_agent_gamification', 'sales_agent_weights', 'sales_agent_insights'
        ];
        toRemove.forEach(k => localStorage.removeItem(k));

        if (profileRaw) localStorage.setItem(KEYS.PROFILE, profileRaw);
        settingsKeys.forEach(k => { if (saved[k] != null) localStorage.setItem(k, saved[k]!); });
    },

    // LEADS
    getLeads: (): Lead[] => {
        const data = localStorage.getItem(KEYS.LEADS);
        return data ? JSON.parse(data) : [];
    },

    saveLead: (lead: Lead) => {
        const leads = storage.getLeads();
        const newLeads = [lead, ...leads];
        localStorage.setItem(KEYS.LEADS, JSON.stringify(newLeads));
    },

    updateLead: (updatedLead: Lead) => {
        const leads = storage.getLeads();

        // Check for "Learning Event": If status changes to 'olumlu' or 'teklif_gonderildi'
        const oldLead = leads.find(l => l.id === updatedLead.id);
        if (oldLead && updatedLead.lastUsedTemplateId &&
            oldLead.lead_durumu !== updatedLead.lead_durumu) {

            // Legacy template success tracking
            if (updatedLead.lead_durumu === 'olumlu' || updatedLead.lead_durumu === 'teklif_gonderildi') {
                storage.recordTemplateSuccess(updatedLead.lastUsedTemplateId, updatedLead.sektor);
            }

            // RL Reward Signals
            try {
                const { rewardEngine } = require('./rewardEngine');
                if (updatedLead.lead_durumu === 'olumlu') {
                    rewardEngine.recordReward('status_olumlu', updatedLead);
                } else if (updatedLead.lead_durumu === 'teklif_gonderildi') {
                    rewardEngine.recordReward('status_teklif', updatedLead);
                } else if (updatedLead.lead_durumu === 'olumsuz') {
                    rewardEngine.recordReward('status_olumsuz', updatedLead);
                } else if (updatedLead.lead_durumu === 'takipte' && oldLead.lead_durumu === 'aktif') {
                    rewardEngine.recordReward('status_takipte', updatedLead);
                }
            } catch (e) {
                // Silently skip if rewardEngine not available
            }
        }

        const newLeads = leads.map(l => l.id === updatedLead.id ? updatedLead : l);
        localStorage.setItem(KEYS.LEADS, JSON.stringify(newLeads));
    },

    updateLeads: (updatedLeads: Lead[]) => {
        if (updatedLeads.length === 0) return;
        const leads = storage.getLeads();
        const newLeads = leads.map(l => {
            const u = updatedLeads.find(up => up.id === l.id);
            return u ?? l;
        });
        updatedLeads.forEach(updatedLead => {
            const oldLead = leads.find(l => l.id === updatedLead.id);
            if (oldLead && updatedLead.lastUsedTemplateId && oldLead.lead_durumu !== updatedLead.lead_durumu) {
                if (updatedLead.lead_durumu === 'olumlu' || updatedLead.lead_durumu === 'teklif_gonderildi') {
                    storage.recordTemplateSuccess(updatedLead.lastUsedTemplateId, updatedLead.sektor);
                }
                try {
                    const { rewardEngine } = require('./rewardEngine');
                    if (updatedLead.lead_durumu === 'olumlu') rewardEngine.recordReward('status_olumlu', updatedLead);
                    else if (updatedLead.lead_durumu === 'teklif_gonderildi') rewardEngine.recordReward('status_teklif', updatedLead);
                    else if (updatedLead.lead_durumu === 'olumsuz') rewardEngine.recordReward('status_olumsuz', updatedLead);
                    else if (updatedLead.lead_durumu === 'takipte' && oldLead.lead_durumu === 'aktif') rewardEngine.recordReward('status_takipte', updatedLead);
                } catch (_) {}
            }
        });
        localStorage.setItem(KEYS.LEADS, JSON.stringify(newLeads));
    },

    deleteLead: (id: string) => {
        const leads = storage.getLeads();
        const newLeads = leads.filter(l => l.id !== id);
        localStorage.setItem(KEYS.LEADS, JSON.stringify(newLeads));
    },

    cleanupInvalidLeads: () => {
        const leads = storage.getLeads();
        const validLeads = leads.filter(l => l.id && l.firma_adi); // Basic validation

        // Normalize statuses
        const validStatuses: LeadStatus[] = ['aktif', 'takipte', 'teklif_gonderildi', 'onay_bekliyor', 'olumlu', 'olumsuz', 'beklemede'];
        const normalizedLeads = validLeads.map(l => {
            if (!validStatuses.includes(l.lead_durumu)) {
                return { ...l, lead_durumu: 'aktif' as LeadStatus };
            }
            return l;
        });

        if (leads.length !== validLeads.length || JSON.stringify(leads) !== JSON.stringify(normalizedLeads)) {
            const count = leads.length - validLeads.length;
            const fixedCount = normalizedLeads.length;
            console.log(`Cleaned up ${count} invalid leads. Normalized statuses for ${fixedCount} leads.`);
            localStorage.setItem(KEYS.LEADS, JSON.stringify(normalizedLeads));
        }
        return leads.length - validLeads.length;
    },

    // TASKS
    getTasks: (): Task[] => {
        const data = localStorage.getItem(KEYS.TASKS);
        return data ? JSON.parse(data) : [];
    },

    saveTask: (task: Task) => {
        const tasks = storage.getTasks();
        const newTasks = [task, ...tasks];
        localStorage.setItem(KEYS.TASKS, JSON.stringify(newTasks));
    },

    updateTask: (updatedTask: Task) => {
        const tasks = storage.getTasks();
        const newTasks = tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
        localStorage.setItem(KEYS.TASKS, JSON.stringify(newTasks));
    },

    // LOGS
    getLogs: (): ActionLog[] => {
        const data = localStorage.getItem(KEYS.LOGS);
        return data ? JSON.parse(data) : [];
    },

    addLog: (log: ActionLog) => {
        const logs = storage.getLogs();
        const newLogs = [log, ...logs].slice(0, 50);
        localStorage.setItem(KEYS.LOGS, JSON.stringify(newLogs));
    },

    // INTERACTIONS
    getInteractions: (): Interaction[] => {
        const data = localStorage.getItem(KEYS.INTERACTIONS);
        return data ? JSON.parse(data) : [];
    },

    addInteraction: (interaction: Interaction) => {
        const interactions = storage.getInteractions();
        const newInteractions = [interaction, ...interactions];
        localStorage.setItem(KEYS.INTERACTIONS, JSON.stringify(newInteractions));
    },

    /** Son senkron edilen Gmail inbox mesaj ID'leri (çift işlemeyi önlemek için). */
    getSyncedInboxMessageIds: (): string[] => {
        const data = localStorage.getItem(KEYS.SYNCED_INBOX_IDS);
        return data ? JSON.parse(data) : [];
    },

    addSyncedInboxMessageIds: (ids: string[]) => {
        if (ids.length === 0) return;
        const current = storage.getSyncedInboxMessageIds();
        const set = new Set([...ids, ...current]);
        const list = Array.from(set);
        if (list.length > SYNCED_INBOX_IDS_MAX) {
            list.splice(SYNCED_INBOX_IDS_MAX);
        }
        localStorage.setItem(KEYS.SYNCED_INBOX_IDS, JSON.stringify(list));
    },

    // TEMPLATES
    getTemplates: (): EmailTemplate[] => {
        const data = localStorage.getItem(KEYS.TEMPLATES);
        return data ? JSON.parse(data) : [];
    },

    saveTemplate: (template: EmailTemplate) => {
        const templates = storage.getTemplates();
        let newTemplates = templates;
        if (template.isActive) {
            newTemplates = templates.map(t => t.type === template.type ? { ...t, isActive: false } : t);
        }
        const tplWithStats: EmailTemplate = {
            ...template,
            useCount: 0,
            successCount: 0,
            sectorStats: {}
        };
        newTemplates.push(tplWithStats);
        localStorage.setItem(KEYS.TEMPLATES, JSON.stringify(newTemplates));
    },

    updateTemplate: (template: EmailTemplate) => {
        const templates = storage.getTemplates();
        let newTemplates = templates;
        if (template.isActive) {
            newTemplates = templates.map(t => (t.type === template.type && t.id !== template.id) ? { ...t, isActive: false } : t);
        }
        newTemplates = newTemplates.map(t => t.id === template.id ? template : t);
        localStorage.setItem(KEYS.TEMPLATES, JSON.stringify(newTemplates));
    },

    deleteTemplate: (id: string) => {
        const templates = storage.getTemplates();
        const newTemplates = templates.filter(t => t.id !== id);
        localStorage.setItem(KEYS.TEMPLATES, JSON.stringify(newTemplates));
    },

    incrementTemplateUsage: (id: string, sector: string = 'Diğer') => {
        const templates = storage.getTemplates();
        const newTemplates = templates.map(t => {
            if (t.id === id) {
                const currentSectorStats = t.sectorStats || {};
                const secStat = currentSectorStats[sector] || { useCount: 0, successCount: 0 };

                return {
                    ...t,
                    useCount: (t.useCount || 0) + 1,
                    sectorStats: {
                        ...currentSectorStats,
                        [sector]: { ...secStat, useCount: secStat.useCount + 1 }
                    }
                };
            }
            return t;
        });
        localStorage.setItem(KEYS.TEMPLATES, JSON.stringify(newTemplates));
    },

    recordTemplateSuccess: (id: string, sector: string = 'Diğer') => {
        const templates = storage.getTemplates();
        const newTemplates = templates.map(t => {
            if (t.id === id) {
                const currentSectorStats = t.sectorStats || {};
                const secStat = currentSectorStats[sector] || { useCount: 0, successCount: 0 };

                return {
                    ...t,
                    successCount: (t.successCount || 0) + 1,
                    sectorStats: {
                        ...currentSectorStats,
                        [sector]: { ...secStat, successCount: secStat.successCount + 1 }
                    }
                };
            }
            return t;
        });
        localStorage.setItem(KEYS.TEMPLATES, JSON.stringify(newTemplates));
    },

    // PROFILE
    getUserProfile: (): UserProfile => {
        const data = localStorage.getItem(KEYS.PROFILE);
        if (data) {
            const profile = JSON.parse(data);
            if (typeof profile.isSetupComplete === 'undefined') profile.isSetupComplete = false;
            return profile;
        }
        return {
            fullName: '',
            companyName: '',
            role: '',
            website: '',
            phone: '',
            email: '',
            tone: 'Profesyonel',
            isSetupComplete: false
        };
    },

    saveUserProfile: (profile: UserProfile) => {
        localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
    },

    // EVENTS
    getCalendarEvents: (): CalendarEvent[] => {
        const data = localStorage.getItem(KEYS.EVENTS);
        return data ? JSON.parse(data) : [];
    },

    saveCalendarEvent: (event: CalendarEvent) => {
        const events = storage.getCalendarEvents();
        const newEvents = [...events, event];
        localStorage.setItem(KEYS.EVENTS, JSON.stringify(newEvents));
    },

    // STATS (geçersiz/temizlenen lead'ler sayıya dahil edilmez)
    calculateStats: (): DashboardStats => {
        const allLeads = storage.getLeads();
        const leads = allLeads.filter(l => l.lead_durumu !== 'gecersiz');
        const usage = storage.getUsage();

        const totalLeads = leads.length;
        const contacted = leads.filter(l => ['takipte', 'teklif_gonderildi', 'olumlu', 'olumsuz'].includes(l.lead_durumu)).length;
        const responses = leads.filter(l => ['olumlu', 'olumsuz', 'teklif_gonderildi'].includes(l.lead_durumu)).length;
        const hotLeads = leads.filter(l => l.lead_skoru >= 4 && l.lead_durumu !== 'olumlu').length;
        const scanned = Math.floor(totalLeads * 1.5) + 20;

        const districtMap: Record<string, { total: number, converted: number }> = {};
        leads.forEach(l => {
            const dist = l.ilce || 'Diğer';
            if (!districtMap[dist]) districtMap[dist] = { total: 0, converted: 0 };

            districtMap[dist].total++;
            if (['teklif_gonderildi', 'olumlu'].includes(l.lead_durumu)) {
                districtMap[dist].converted++;
            }
        });

        const districtBreakdown: RegionStat[] = Object.keys(districtMap).map(key => ({
            name: key,
            totalLeads: districtMap[key].total,
            converted: districtMap[key].converted,
            conversionRate: districtMap[key].total > 0 ? (districtMap[key].converted / districtMap[key].total) * 100 : 0
        })).sort((a, b) => b.totalLeads - a.totalLeads);

        return {
            taranan_firma: scanned,
            lead_sayisi: totalLeads,
            mail_gonderildi: contacted,
            geri_donus: responses,
            sicak_leadler: hotLeads,
            hedef_orani: Math.min(100, Math.round((totalLeads / 100) * 100)),
            toplam_maliyet: usage.estimatedCost,
            districtBreakdown: districtBreakdown
        };
    },

    // USAGE
    getUsage: (): UsageStats => {
        const today = new Date().toISOString().slice(0, 10);
        const data = localStorage.getItem(KEYS.USAGE);

        if (data) {
            const parsed = JSON.parse(data);
            if (parsed.date === today) return parsed;
        }

        // Default daily limit is now $1.00 USD (Approx 500 actions with Flash)
        const defaults = { date: today, aiCalls: 0, searchCalls: 0, dailyLimit: 1.0, estimatedCost: 0 };
        localStorage.setItem(KEYS.USAGE, JSON.stringify(defaults));
        return defaults;
    },

    incrementUsage: (type: 'ai' | 'search') => {
        const stats = storage.getUsage();
        if (type === 'ai') {
            stats.aiCalls++;
            stats.estimatedCost += COST_PER_REQUEST;
        }
        if (type === 'search') stats.searchCalls++;
        localStorage.setItem(KEYS.USAGE, JSON.stringify(stats));
        return stats;
    },

    updateLimit: (newLimit: number) => {
        const stats = storage.getUsage();
        stats.dailyLimit = newLimit;
        localStorage.setItem(KEYS.USAGE, JSON.stringify(stats));
    },

    /** Otopilot oturum önbelleğini temizler (agent_session_stats). */
    clearAgentSessionCache: () => {
        try {
            localStorage.removeItem('agent_session_stats');
        } catch (_) {}
    }
};

storage.init();
