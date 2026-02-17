
import { useRef } from 'react';
import { Lead, LeadStatus } from '../../types';
import { api } from '../../services/api';
import { isProspectLead } from '../../utils/agentUtils';

interface UseAgentMaintenanceProps {
    setAgentStatus: (status: string) => void;
    addThought: (type: any, message: string, metadata?: any) => void;
    setSessionStats: React.Dispatch<React.SetStateAction<any>>;
}

const SANITIZATION_CACHE_MAX = 300;

export const useAgentMaintenance = ({ setAgentStatus, addThought, setSessionStats }: UseAgentMaintenanceProps) => {
    const sanitizationCacheRef = useRef<Set<string>>(new Set());

    const performLeadSanitization = async (leads: Lead[]): Promise<boolean> => {
        if (sanitizationCacheRef.current.size > SANITIZATION_CACHE_MAX) {
            sanitizationCacheRef.current.clear();
            addThought('info', 'Temizlik önbelleği sıfırlandı (yeniden değerlendirme).');
        }
        const dirtyLeads = leads.filter(l => {
            if (sanitizationCacheRef.current.has(l.id)) return false;

            if (l.lead_durumu === 'gecersiz') return false;

            const hasEmail = !!l.email;
            const isInvalidEmail = hasEmail && (!l.email.includes('@') || l.email.length < 5 || l.email.includes('null') || l.email.includes('undefined') || l.email === 'info@firma.com');

            // Email-siz prospekt leadler (phone varsa beklemede, yoksa gecersiz)
            const isEmailless = !hasEmail && isProspectLead(l);

            // Bogus firma adı
            const isBogusFirma = !l.firma_adi || l.firma_adi.trim().length < 2;

            // Bounce flagged ama hala aktif
            const isBounced = (l.notlar || '').includes('[BOUNCE]');

            return (isProspectLead(l) && isInvalidEmail) || isEmailless || isBogusFirma || isBounced;
        }).slice(0, 5); // Process up to 5 at a time

        // Duplicate email detection
        const emailCounts: Record<string, Lead[]> = {};
        leads.forEach(l => {
            if (l.email && l.email.includes('@') && l.lead_durumu !== 'gecersiz') {
                const key = l.email.toLowerCase();
                if (!emailCounts[key]) emailCounts[key] = [];
                emailCounts[key].push(l);
            }
        });
        const duplicates = Object.entries(emailCounts)
            .filter(([, group]) => group.length > 1)
            .flatMap(([, group]) => {
                const sorted = [...group].sort((a, b) => {
                    const aDate = a.son_kontakt_tarihi || a.olusturma_tarihi || '';
                    const bDate = b.son_kontakt_tarihi || b.olusturma_tarihi || '';
                    return bDate.localeCompare(aDate);
                });
                return sorted.slice(1);
            })
            .filter(l => !sanitizationCacheRef.current.has(l.id))
            .slice(0, 3);

        const allDirty = [...dirtyLeads, ...duplicates];
        if (allDirty.length === 0) return false;
        if (duplicates.length > 0) {
            addThought('info', `Çift e-posta tespit edildi; ${duplicates.length} tekrar arşivlendi.`);
        }

        let cleanedCount = 0;
        for (const dirtyLead of allDirty) {
            let targetStatus: string = 'gecersiz';
            let reason = 'Geçersiz iletişim bilgisi';

            if (!dirtyLead.email && dirtyLead.telefon) {
                targetStatus = 'beklemede';
                reason = 'Email yok, sadece telefon mevcut';
            } else if (duplicates.includes(dirtyLead)) {
                reason = `Tekrarlanan email (${dirtyLead.email})`;
            } else if ((dirtyLead.notlar || '').includes('[BOUNCE]')) {
                reason = 'Email bounce algılandı';
            }

            const updatedLead: Lead = {
                ...dirtyLead,
                lead_durumu: targetStatus as LeadStatus,
                notlar: (dirtyLead.notlar || '') + `\n[Sistem]: ${reason} (Oto-Temizlik).`
            };
            await api.leads.update(updatedLead);
            sanitizationCacheRef.current.add(dirtyLead.id);
            cleanedCount++;
        }

        setSessionStats((s: any) => ({ ...s, sanitized: s.sanitized + cleanedCount }));
        setAgentStatus(`Veri Temizliği: ${cleanedCount} lead işlendi.`);
        addThought('decision', `Temizlik: ${cleanedCount} lead düzenlendi.`);
        return true;
    };

    return { performLeadSanitization };
};
