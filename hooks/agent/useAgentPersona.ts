import { Lead } from '../../types';
import { api } from '../../services/api';
import { isProspectLead } from '../../utils/agentUtils';

interface UseAgentPersonaProps {
    checkAndIncrementCost: () => boolean;
    setAgentStatus: (status: string) => void;
    addThought: (type: any, message: string, metadata?: any) => void;
    isCircuitOpen: (category: 'gmail' | 'ai') => boolean;
    recordCircuitFailure: (category: 'gmail' | 'ai') => void;
}

/**
 * Performs persona enrichment for one lead per call: assigns DISC persona via AI
 * so that RL (sektor:persona) and persona-based email/tone work correctly.
 */
export function useAgentPersona({ checkAndIncrementCost, setAgentStatus, addThought, isCircuitOpen, recordCircuitFailure }: UseAgentPersonaProps) {
    const performPersonaEnrichment = async (leads: Lead[]): Promise<boolean> => {
        if (isCircuitOpen('ai')) return false;
        const withoutPersona = leads.filter(l =>
            isProspectLead(l) &&
            (!l.personaAnalysis || l.personaAnalysis.type === 'Bilinmiyor') // Hiç analiz yok veya Bilinmiyor → yeniden analiz
        );
        if (withoutPersona.length === 0) return false;
        if (!checkAndIncrementCost()) return false;

        const lead = withoutPersona[0];
        setAgentStatus(`Persona analizi: ${lead.firma_adi}`);
        addThought('action', `${lead.firma_adi} için kişilik analizi yapılıyor.`);

        try {
            const persona = await api.strategy.analyzePersona(lead);
            await api.leads.update({
                ...lead,
                personaAnalysis: persona
            });
            addThought('success', `${lead.firma_adi} → ${persona.type}: ${persona.communicationStyle?.slice(0, 40) || ''}`);
            return true;
        } catch (e: any) {
            console.error('Persona enrichment error', e);
            recordCircuitFailure('ai');
            addThought('error', `Persona analizi hatası (${lead.firma_adi}): ${e.message || 'Bilinmiyor'}.`);
            return false;
        }
    };

    return { performPersonaEnrichment };
}
