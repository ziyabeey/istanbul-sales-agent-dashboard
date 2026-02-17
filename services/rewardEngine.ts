/**
 * Reward Engine — Central Reinforcement Learning Signal Processor
 * 
 * Processes reward/penalty events and updates the Q-Table.
 * All learning signals flow through this module.
 */

import { qTable } from './qTable';
import { Lead } from '../types';

// Reward values for different events
export const REWARD_VALUES = {
    email_replied: 0.6,   // Lead replied to our email
    status_olumlu: 1.0,   // Lead became positive
    status_teklif: 0.8,   // Proposal sent (strong signal)
    status_takipte: 0.3,   // Lead moved to follow-up (weak positive)
    status_olumsuz: -0.3,   // Lead rejected
    no_response_7d: -0.1,   // No response after 7 days
    no_response_14d: -0.2,   // No response after 14 days
    no_response_21d: -0.15,  // 21 days silence -> cold pool
    re_engagement_sent: 0.2, // Re-engagement mail sent (cold pool)
    bounce: -0.5,   // Email bounced
    manual_approve: 0.4,   // User manually approved & sent a draft
} as const;

export type RewardEvent = keyof typeof REWARD_VALUES;

export interface RewardRecord {
    timestamp: number;
    event: RewardEvent;
    leadId: string;
    firmName: string;
    sector: string;
    persona: string;
    templateId: string;
    reward: number;
    stateKey: string;
}

const REWARD_LOG_KEY = 'sales_agent_reward_log';
const MAX_LOG_ENTRIES = 500;

class RewardEngine {
    /**
     * Record a reward event and update the Q-Table.
     */
    public recordReward(
        event: RewardEvent,
        lead: Lead,
        templateId?: string,
        customReward?: number
    ): void {
        let reward = customReward ?? REWARD_VALUES[event];
        if (lead.websitesi_var_mi === 'Hayır' && reward > 0) {
            reward = Math.min(1, reward * 1.1);
        }
        const sector = lead.sektor || 'Diğer';
        const persona = lead.personaAnalysis?.type || 'Bilinmiyor';
        const tplId = templateId || lead.lastUsedTemplateId || 'unknown';
        const stateKey = qTable.makeStateKey(sector, persona);

        // Update Q-Table
        qTable.update(stateKey, tplId, reward, event);

        // Log the reward event
        const record: RewardRecord = {
            timestamp: Date.now(),
            event,
            leadId: lead.id,
            firmName: lead.firma_adi,
            sector,
            persona,
            templateId: tplId,
            reward,
            stateKey
        };

        this.appendLog(record);

        console.log(
            `[RL] Reward: ${event} → ${reward > 0 ? '+' : ''}${reward.toFixed(2)} | ` +
            `State: ${stateKey} | Action: ${tplId.slice(0, 8)}... | ` +
            `New Q: ${qTable.getQValue(stateKey, tplId).toFixed(3)}`
        );
    }

    /**
     * Select the best template for a given lead using UCB1.
     * Returns templates sorted by UCB score (best first).
     */
    public selectBestTemplate(
        lead: Lead,
        templateIds: string[],
        explorationFactor?: number
    ): Array<{
        templateId: string;
        qValue: number;
        ucbScore: number;
        visits: number;
        isExploration: boolean;
    }> {
        const sector = lead.sektor || 'Diğer';
        const persona = lead.personaAnalysis?.type || 'Bilinmiyor';
        const stateKey = qTable.makeStateKey(sector, persona);

        const results = qTable.selectAction(stateKey, templateIds, explorationFactor);
        return results.map(r => ({
            templateId: r.action,
            qValue: r.qValue,
            ucbScore: r.ucbScore,
            visits: r.visits,
            isExploration: r.isExploration
        }));
    }

    /**
     * Scan leads for timeout penalties (no response after N days).
     * Called periodically by the agent loop.
     */
    public sweepTimeoutPenalties(leads: Lead[]): number {
        let penaltyCount = 0;
        const now = Date.now();
        const DAY = 24 * 60 * 60 * 1000;

        for (const lead of leads) {
            if (!lead.son_kontakt_tarihi || !lead.lastUsedTemplateId) continue;
            if (lead.lead_durumu !== 'takipte') continue;

            const contactDate = new Date(lead.son_kontakt_tarihi).getTime();
            const daysSinceContact = (now - contactDate) / DAY;

            // Lead başına 7d/14d cezası en fazla bir kez (tekrar ceza Q değerini aşırı düşürür)
            const recentLog = this.getLog(500);
            const alreadyPenalized7 = recentLog.some(r => r.leadId === lead.id && r.event === 'no_response_7d');
            const alreadyPenalized14 = recentLog.some(r => r.leadId === lead.id && r.event === 'no_response_14d');
            if (alreadyPenalized14) continue;
            if (daysSinceContact >= 14) {
                this.recordReward('no_response_14d', lead);
                penaltyCount++;
            } else if (daysSinceContact >= 7 && !alreadyPenalized7) {
                this.recordReward('no_response_7d', lead);
                penaltyCount++;
            }
        }
        return penaltyCount;
    }

    /**
     * Get templates that need evolution (Q < threshold, N >= minSamples).
     */
    public getTemplatesNeedingEvolution(threshold: number = 0.2, minSamples: number = 5): Array<{
        stateKey: string;
        templateId: string;
        qValue: number;
        visits: number;
    }> {
        const worst = qTable.getWorstPerformers(20);
        return worst.filter(w => w.qValue < threshold && w.visits >= minSamples).map(w => ({
            stateKey: w.stateKey,
            templateId: w.action,
            qValue: w.qValue,
            visits: w.visits
        }));
    }

    // --- Reward Log ---

    private appendLog(record: RewardRecord): void {
        try {
            const log = this.getLog();
            log.push(record);
            // Trim
            const trimmed = log.length > MAX_LOG_ENTRIES ? log.slice(-MAX_LOG_ENTRIES) : log;
            localStorage.setItem(REWARD_LOG_KEY, JSON.stringify(trimmed));
        } catch (e) {
            console.error('[RewardEngine] Log save failed', e);
        }
    }

    public getLog(limit?: number): RewardRecord[] {
        try {
            const raw = localStorage.getItem(REWARD_LOG_KEY);
            const log: RewardRecord[] = raw ? JSON.parse(raw) : [];
            return limit ? log.slice(-limit) : log;
        } catch {
            return [];
        }
    }

    /**
     * Get aggregated reward stats for the last N days.
     */
    public getRewardTrend(days: number = 7): Array<{
        date: string;
        totalReward: number;
        count: number;
        avgReward: number;
        positiveCount: number;
        negativeCount: number;
    }> {
        const log = this.getLog();
        const now = Date.now();
        const dayMs = 24 * 60 * 60 * 1000;
        const result: Record<string, { sum: number; count: number; pos: number; neg: number }> = {};

        for (let i = 0; i < days; i++) {
            const d = new Date(now - i * dayMs).toISOString().slice(0, 10);
            result[d] = { sum: 0, count: 0, pos: 0, neg: 0 };
        }

        for (const entry of log) {
            const d = new Date(entry.timestamp).toISOString().slice(0, 10);
            if (result[d]) {
                result[d].sum += entry.reward;
                result[d].count += 1;
                if (entry.reward > 0) result[d].pos += 1;
                else result[d].neg += 1;
            }
        }

        return Object.entries(result)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([date, data]) => ({
                date,
                totalReward: Math.round(data.sum * 100) / 100,
                count: data.count,
                avgReward: data.count > 0 ? Math.round((data.sum / data.count) * 100) / 100 : 0,
                positiveCount: data.pos,
                negativeCount: data.neg
            }));
    }

    /**
     * Natural language summary of recent learning events.
     */
    public getLearningInsightsSummary(): string[] {
        const insights: string[] = [];
        const log = this.getLog(50);
        const sectorStats = qTable.getSectorStats();
        const explorationRatio = qTable.getExplorationRatio();
        const topPerformers = qTable.getTopPerformers(3);
        const worstPerformers = qTable.getWorstPerformers(3);

        // Total events
        const meta = qTable.getMeta();
        insights.push(`Toplam ${meta.totalActions} öğrenme olayı işlendi.`);

        // Best sector
        const sortedSectors = Object.entries(sectorStats).sort(([, a], [, b]) => b.avgQ - a.avgQ);
        if (sortedSectors.length > 0) {
            const [bestSector, bestData] = sortedSectors[0];
            insights.push(`En başarılı sektör: ${bestSector} (ortalama Q: ${bestData.avgQ.toFixed(2)}, ${bestData.totalVisits} deneme)`);
        }

        // Top performer
        if (topPerformers.length > 0) {
            const top = topPerformers[0];
            insights.push(`En iyi performans: ${top.stateKey} → şablon ${top.action.slice(0, 8)}... (Q: ${top.qValue.toFixed(2)}, ${top.visits}x kullanım)`);
        }

        // Worst performer
        if (worstPerformers.length > 0 && worstPerformers[0].qValue < 0) {
            const worst = worstPerformers[0];
            insights.push(`⚠️ Düşük performans: ${worst.stateKey} → şablon ${worst.action.slice(0, 8)}... (Q: ${worst.qValue.toFixed(2)}). Evrimleşme önerilir.`);
        }

        // Exploration ratio
        insights.push(`Explore/Exploit oranı: %${Math.round(explorationRatio.ratio * 100)} exploration (son 50 işlem)`);

        // Recent positive rewards
        const recentPositive = log.filter(r => r.reward > 0).slice(-3);
        if (recentPositive.length > 0) {
            const names = recentPositive.map(r => r.firmName).join(', ');
            insights.push(`Son olumlu sinyaller: ${names}`);
        }

        return insights;
    }

    /** Reset all learning data */
    public reset(): void {
        qTable.reset();
        try {
            localStorage.removeItem(REWARD_LOG_KEY);
        } catch { }
    }
}

export const rewardEngine = new RewardEngine();
