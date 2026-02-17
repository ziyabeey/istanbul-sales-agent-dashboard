
import { leadsService } from './leadsService';
import { aiService } from './aiService';
import { dashboardService } from './dashboardService';
import { marketingService } from './marketingService';
import { crmService } from './crmService';
import { reportsService } from './reportsService';
import { systemService } from './systemService';
import { strategyService } from './strategyService';
import { emailService } from './emailService';
import { whatsappService } from './whatsappService';

// Aggregator API
export const api = {
    leads: leadsService,
    interactions: {
        getRecent: async (limit: number = 10) => {
            // Re-implementing getRecent here by delegating to storage/sheets via dashboardService or direct access?
            // dashboardService.getLogs() returns ActionLogs, not Interactions.
            // Let's use leadsService to expose interactions if possible, or keep it simple.
            // For now, I'll direct to a helper in leadsService if I add one, or use the old logic here?
            // "Old logic" requires importing sheetsService/storage.
            // To be clean, I should add getRecentInteractions to leadsService or similar.
            // I'll add it to leadsService in a future step if needed. 
            // For now, I'll leave a placeholder or duplicate the logic to avoid breaking change immediately.
            // BUT I want to avoid imports.
            // I'll skip it for now and assume the UI updates to use a new method?
            // No, UI uses api.interactions.getRecent().
            // I MUST provide it.
            // I'll add it to dashboardService? No, it's interaction data.
            // I'll add it to leadsService as 'getRecentInteractions'.
            return await leadsService.getRecentInteractions(limit);
        }
    },
    gmail: emailService,
    whatsapp: {
        sendReport: whatsappService.sendDailyReport
    },
    ai: aiService,
    dashboard: dashboardService,
    tasks: crmService.tasks,
    templates: crmService.templates,
    reports: reportsService,
    briefing: {
        generateAndPlay: aiService.generateBriefing
    },
    training: {
        evaluateSession: aiService.evaluateTrainingSession
    },
    strategy: strategyService,
    competitors: {
        analyze: marketingService.analyzeCompetitors
    },
    visuals: marketingService,
    social: marketingService,
    calendar: crmService.calendar,
    system: systemService,
    setup: systemService // Mapping setup to systemService
};
