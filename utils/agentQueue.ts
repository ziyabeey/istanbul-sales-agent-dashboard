/**
 * Pure agent queue computation for testing and use in AgentContext.
 */

import { Lead } from '../types';
import { AgentQueueItem } from '../types';
import { isProspectLead, isSystemMailbox } from './agentUtils';

export const MIN_ENRICHMENT_SCORE_DEFAULT = 3;

export function computeAgentQueue(
    leads: Lead[],
    focusMode: 'balanced' | 'discovery_only' | 'outreach_only',
    minEnrichmentScore: number = MIN_ENRICHMENT_SCORE_DEFAULT
): AgentQueueItem[] {
    const allowDiscovery = focusMode !== 'outreach_only';
    const allowOutreach = focusMode !== 'discovery_only';

    const queue: AgentQueueItem[] = [];

    const dirtyCount = leads.filter(l =>
        (isProspectLead(l) && (!l.email || !l.email.includes('@'))) ||
        (l.notlar || '').includes('[BOUNCE]')
    ).length;
    if (dirtyCount > 0) queue.push({ type: 'sanitize', label: `${dirtyCount} lead temizlenecek`, count: dirtyCount, priority: 1 });

    // Email aranacak: e-postası yok, skoru yeterli (performAutoEnrichment ile uyumlu)
    const enrichCount = leads.filter(l =>
        isProspectLead(l) && !l.email && l.lead_skoru >= minEnrichmentScore
    ).length;
    if (enrichCount > 0 && allowDiscovery) queue.push({ type: 'enrich', label: `${enrichCount} lead için email aranacak`, count: enrichCount, priority: 2 });

    const outreachCount = leads.filter(l =>
        isProspectLead(l) && l.email && !l.son_kontakt_tarihi &&
        !isSystemMailbox(l.email) && !(l.notlar || '').includes('[BOUNCE]')
    ).length;
    if (outreachCount > 0 && allowOutreach) queue.push({ type: 'outreach', label: `${outreachCount} lead'e outreach`, count: outreachCount, priority: 4 });

    const reEngagementCount = leads.filter(l =>
        l.strategyPhase === 'cold_pool' && l.email && !isSystemMailbox(l.email) &&
        !(l.notlar || '').includes('[BOUNCE]') && !(l.notlar || '').includes('[RE_ENGAGEMENT_SENT]')
    ).length;
    if (reEngagementCount > 0 && allowOutreach) queue.push({ type: 're_engagement', label: `${reEngagementCount} soğuk havuz yeniden temas`, count: reEngagementCount, priority: 5 });

    const draftCount = leads.filter(l => (l.lead_durumu === 'takipte' || l.lead_durumu === 'teklif_gonderildi') && !l.draftResponse && l.email).length;
    if (draftCount > 0 && allowOutreach) queue.push({ type: 'draft', label: `${draftCount} takip yanıtı hazırlanacak`, count: draftCount, priority: 3 });

    if (allowOutreach) queue.push({ type: 'inbox_sync', label: 'Gelen kutusu kontrol', count: 1, priority: 3 });

    queue.sort((a, b) => a.priority - b.priority);
    return queue;
}
