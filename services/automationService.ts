import { api } from './api';
import { Lead, EmailTemplate } from '../types';
import { aiService } from './aiService';
import { storage } from './storage';

export const automationService = {
    /**
     * Identifies leads that need a follow-up.
     * Criteria:
     * - Status is 'takipte' (In Follow-up)
     * - Last email was sent > 3 days ago
     * - Follow-up count < 3 (Max 3 follow-ups)
     */
    getLeadsNeedingFollowUp: async (leads: Lead[]): Promise<Lead[]> => {
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

        return leads.filter(lead => {
            if (lead.lead_durumu !== 'takipte') return false;

            // If never emailed, maybe it needs a first email? 
            // For now, only follow-up if lastEmailDate exists.
            if (!lead.lastEmailDate) return false;

            // SKIP INVALID EMAILS
            if (lead.emailStatus === 'invalid') return false;

            const lastEmail = new Date(lead.lastEmailDate);
            const followUpCount = lead.followUpCount || 0;

            return lastEmail < threeDaysAgo && followUpCount < 3;
        });
    },

    /**
     * Executes follow-up for a single lead.
     * Generates a draft email using AI and updates the lead.
     */
    processFollowUp: async (lead: Lead) => {
        try {
            // Determine template
            const count = lead.followUpCount || 0;
            let templateType = 'followup1';
            if (count === 1) templateType = 'followup2';
            if (count >= 2) templateType = 'breakup';

            const templates = storage.getTemplates();
            const template = templates.find(t => t.type === templateType) || templates[0];

            // JIT Analysis & Generation
            const generated = await aiService.generateEmail(lead, template.id);

            // SEND IMMEDIATELY (User Request)
            // Note: In a real JIT flow, we might want a small "typing" delay simulation if visible, 
            // but for backend logic we just send.
            await api.gmail.send(lead.email, generated.subject, generated.body);

            // Update Lead
            const updatedLead: Lead = {
                ...lead,
                followUpCount: count + 1,
                lastEmailDate: new Date().toISOString(),
                lead_durumu: 'takipte', // Stay in follow-up until response
                // Log the interaction
            };

            // Log interaction
            await api.leads.logInteraction(lead.id, 'email', `Oto-Takip: ${template.name}`, {
                sentiment: 'neutral',
                intent: 'info_request',
                suggested_reply: '',
                suggested_status: 'takipte'
            });

            await api.leads.update(updatedLead);
            await api.dashboard.logAction('Oto-Pilot Mesajı', `${lead.firma_adi} firmasına takip maili gönderildi.`, 'success');

            return { success: true, lead: updatedLead };

        } catch (error) {
            console.error(`Follow-up failed for ${lead.firma_adi}`, error);
            await api.dashboard.logAction('Hata', `${lead.firma_adi} için mail gönderilemedi.`, 'error');
            return { success: false, error };
        }
    }
};
