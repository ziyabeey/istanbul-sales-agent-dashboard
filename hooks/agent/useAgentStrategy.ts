import { Lead, LeadPhase } from '../../types';
import { api } from '../../services/api';
import { rewardEngine } from '../../services/rewardEngine';

const STRATEGY_MAX_UPDATES_PER_LOOP = 50;

interface UseAgentStrategyProps {
    setAgentStatus: (status: string) => void;
}

export const useAgentStrategy = ({ setAgentStatus }: UseAgentStrategyProps) => {

    const performStrategyManagement = async (leads: Lead[]): Promise<boolean> => {
        const updates: Lead[] = [];
        const now = Date.now();
        const ONE_DAY = 24 * 60 * 60 * 1000;

        for (const lead of leads) {
            if (updates.length >= STRATEGY_MAX_UPDATES_PER_LOOP) break;
            let newPhase: LeadPhase | undefined = undefined;
            const currentPhase = lead.strategyPhase || 'research';
            const lastContact = lead.son_kontakt_tarihi ? new Date(lead.son_kontakt_tarihi).getTime() : 0;
            const daysSinceContact = lastContact ? (now - lastContact) / ONE_DAY : 0;

            if (currentPhase === 'research') {
                if (lead.lead_skoru >= 3 && lead.email && !lead.son_kontakt_tarihi) newPhase = 'outreach';
            } else if (currentPhase === 'outreach') {
                if (lead.lead_durumu === 'takipte' || lead.lead_durumu === 'teklif_gonderildi') newPhase = 'followup';
            } else if (currentPhase === 'followup') {
                if (lead.lead_durumu === 'olumlu' || lead.lead_durumu === 'onay_bekliyor') {
                    newPhase = 'negotiation';
                } else if (daysSinceContact > 21 && lead.lead_durumu !== 'olumsuz' && lead.lead_durumu !== 'gecersiz') {
                    newPhase = 'cold_pool';
                    updates.push({
                        ...lead,
                        lead_durumu: 'beklemede',
                        strategyPhase: 'cold_pool',
                        notlar: (lead.notlar || '') + '\n[Strateji]: 21 gün sessizlik -> Soğuk havuz.'
                    });
                    continue;
                }
            }

            if (lead.lead_durumu === 'olumsuz' || lead.lead_durumu === 'gecersiz') newPhase = 'lost';
            if (lead.lead_durumu === 'olumlu' && currentPhase !== 'negotiation' && currentPhase !== 'won') newPhase = 'won';

            if (newPhase && newPhase !== currentPhase) {
                updates.push({ ...lead, strategyPhase: newPhase });
            }
        }

        if (updates.length > 0) {
            for (const u of updates) {
                if (u.strategyPhase === 'cold_pool' && u.lastUsedTemplateId) {
                    try { rewardEngine.recordReward('no_response_21d', u); } catch (_) { /* ignore */ }
                }
            }
            await api.leads.updateMany(updates);
            setAgentStatus(`Strateji: ${updates.length} lead aşama güncelledi.`);
            return true;
        }
        return false;
    };

    return { performStrategyManagement };
};
