/**
 * Q-Table — Reinforcement Learning State-Action Value Store
 * 
 * State = "sektor:persona" (e.g. "Restoran:Sosyal")
 * Action = templateId
 * 
 * Uses:
 * - Exponential Moving Average (EMA) for time-decayed Q-values
 * - UCB1 (Upper Confidence Bound) for exploration/exploitation balance
 * - localStorage persistence
 */

const QTABLE_KEY = 'sales_agent_qtable';
const QTABLE_META_KEY = 'sales_agent_qtable_meta';

export interface QEntry {
    q: number;           // Average reward (EMA-decayed)
    n: number;           // Number of times this action was taken
    totalReward: number; // Sum of all rewards (for debugging)
    lastUpdate: number;  // Timestamp of last update
    lastReward: number;  // Most recent reward value
}

export interface QTableMeta {
    totalActions: number;    // Global N for UCB1
    createdAt: number;
    lastLearnEvent: number;
    rewardHistory: Array<{
        timestamp: number;
        stateKey: string;
        action: string;
        reward: number;
        event: string;
    }>;
}

// State-Action table: { "Restoran:Sosyal": { "tmpl-1": QEntry, "tmpl-2": QEntry } }
type QTableData = Record<string, Record<string, QEntry>>;

// EMA smoothing factor — higher = more weight on recent rewards
const ALPHA = 0.3;

// UCB1 exploration constant — higher = more exploration
const UCB_C = 1.4;

// Maximum reward history entries to keep
const MAX_HISTORY = 200;

export class QTable {
    private data: QTableData;
    private meta: QTableMeta;

    constructor() {
        this.data = this.loadData();
        this.meta = this.loadMeta();
    }

    // --- Persistence ---

    private loadData(): QTableData {
        try {
            const raw = localStorage.getItem(QTABLE_KEY);
            return raw ? JSON.parse(raw) : {};
        } catch {
            return {};
        }
    }

    private loadMeta(): QTableMeta {
        try {
            const raw = localStorage.getItem(QTABLE_META_KEY);
            return raw ? JSON.parse(raw) : this.defaultMeta();
        } catch {
            return this.defaultMeta();
        }
    }

    private defaultMeta(): QTableMeta {
        return {
            totalActions: 0,
            createdAt: Date.now(),
            lastLearnEvent: 0,
            rewardHistory: []
        };
    }

    private save(): void {
        try {
            localStorage.setItem(QTABLE_KEY, JSON.stringify(this.data));
            localStorage.setItem(QTABLE_META_KEY, JSON.stringify(this.meta));
        } catch (e) {
            console.error('[QTable] Save failed', e);
        }
    }

    // --- State Key ---

    public makeStateKey(sector: string, persona: string = 'Bilinmiyor'): string {
        return `${(sector || 'Diğer').trim()}:${(persona || 'Bilinmiyor').trim()}`;
    }

    // --- Core Learning ---

    /**
     * Update Q-value for a state-action pair using EMA.
     * Q_new = α * reward + (1 - α) * Q_old
     */
    public update(stateKey: string, action: string, reward: number, eventType: string): void {
        if (!this.data[stateKey]) {
            this.data[stateKey] = {};
        }

        const entry = this.data[stateKey][action] || { q: 0, n: 0, totalReward: 0, lastUpdate: 0, lastReward: 0 };

        // EMA update
        const oldQ = entry.q;
        const newQ = entry.n === 0 ? reward : (ALPHA * reward + (1 - ALPHA) * oldQ);

        this.data[stateKey][action] = {
            q: Math.max(-1, Math.min(1, newQ)),  // Clamp to [-1, 1]
            n: entry.n + 1,
            totalReward: entry.totalReward + reward,
            lastUpdate: Date.now(),
            lastReward: reward
        };

        this.meta.totalActions += 1;
        this.meta.lastLearnEvent = Date.now();

        // Record history
        this.meta.rewardHistory.push({
            timestamp: Date.now(),
            stateKey,
            action,
            reward,
            event: eventType
        });

        // Trim history
        if (this.meta.rewardHistory.length > MAX_HISTORY) {
            this.meta.rewardHistory = this.meta.rewardHistory.slice(-MAX_HISTORY);
        }

        this.save();
    }

    // --- Query ---

    public getQValue(stateKey: string, action: string): number {
        return this.data[stateKey]?.[action]?.q ?? 0;
    }

    public getEntry(stateKey: string, action: string): QEntry | null {
        return this.data[stateKey]?.[action] ?? null;
    }

    public getStateActions(stateKey: string): Record<string, QEntry> {
        return this.data[stateKey] || {};
    }

    // --- UCB1 Selection ---

    /**
     * Select best action using UCB1.
     * score(a) = Q(a) + c * sqrt(ln(N) / n(a))
     * 
     * Returns sorted actions with their UCB scores.
     */
    public selectAction(stateKey: string, availableActions: string[], explorationFactor: number = UCB_C): Array<{
        action: string;
        qValue: number;
        ucbScore: number;
        visits: number;
        isExploration: boolean;
    }> {
        const N = Math.max(1, this.meta.totalActions);
        const stateData = this.data[stateKey] || {};

        const scored = availableActions.map(action => {
            const entry = stateData[action];

            if (!entry || entry.n === 0) {
                // Never tried: give maximum exploration bonus
                return {
                    action,
                    qValue: 0,
                    ucbScore: Infinity,
                    visits: 0,
                    isExploration: true
                };
            }

            const explorationBonus = explorationFactor * Math.sqrt(Math.log(N) / entry.n);
            const ucbScore = entry.q + explorationBonus;

            return {
                action,
                qValue: entry.q,
                ucbScore,
                visits: entry.n,
                isExploration: explorationBonus > entry.q // Exploration dominates
            };
        });

        // Sort by UCB score (descending), Infinity first
        return scored.sort((a, b) => {
            if (a.ucbScore === Infinity && b.ucbScore === Infinity) return 0;
            if (a.ucbScore === Infinity) return -1;
            if (b.ucbScore === Infinity) return 1;
            return b.ucbScore - a.ucbScore;
        });
    }

    // --- Analytics ---

    public getMeta(): QTableMeta {
        return { ...this.meta };
    }

    public getRecentHistory(limit: number = 20): QTableMeta['rewardHistory'] {
        return this.meta.rewardHistory.slice(-limit);
    }

    /** Get top performing state-action pairs */
    public getTopPerformers(limit: number = 10): Array<{
        stateKey: string;
        action: string;
        qValue: number;
        visits: number;
    }> {
        const all: Array<{ stateKey: string; action: string; qValue: number; visits: number }> = [];

        for (const [stateKey, actions] of Object.entries(this.data)) {
            for (const [action, entry] of Object.entries(actions)) {
                if (entry.n >= 2) { // At least 2 samples
                    all.push({ stateKey, action, qValue: entry.q, visits: entry.n });
                }
            }
        }

        return all.sort((a, b) => b.qValue - a.qValue).slice(0, limit);
    }

    /** Get worst performing state-action pairs */
    public getWorstPerformers(limit: number = 10): Array<{
        stateKey: string;
        action: string;
        qValue: number;
        visits: number;
    }> {
        const all: Array<{ stateKey: string; action: string; qValue: number; visits: number }> = [];

        for (const [stateKey, actions] of Object.entries(this.data)) {
            for (const [action, entry] of Object.entries(actions)) {
                if (entry.n >= 2) {
                    all.push({ stateKey, action, qValue: entry.q, visits: entry.n });
                }
            }
        }

        return all.sort((a, b) => a.qValue - b.qValue).slice(0, limit);
    }

    /** Sector-level aggregated stats */
    public getSectorStats(): Record<string, { avgQ: number; totalVisits: number; actionCount: number }> {
        const sectorMap: Record<string, { sumQ: number; count: number; totalVisits: number }> = {};

        for (const [stateKey, actions] of Object.entries(this.data)) {
            const sector = stateKey.split(':')[0];
            if (!sectorMap[sector]) sectorMap[sector] = { sumQ: 0, count: 0, totalVisits: 0 };

            for (const entry of Object.values(actions)) {
                sectorMap[sector].sumQ += entry.q;
                sectorMap[sector].count += 1;
                sectorMap[sector].totalVisits += entry.n;
            }
        }

        const result: Record<string, { avgQ: number; totalVisits: number; actionCount: number }> = {};
        for (const [sector, data] of Object.entries(sectorMap)) {
            result[sector] = {
                avgQ: data.count > 0 ? data.sumQ / data.count : 0,
                totalVisits: data.totalVisits,
                actionCount: data.count
            };
        }
        return result;
    }

    /** Exploration vs exploitation ratio from recent history */
    public getExplorationRatio(lastN: number = 50): { explore: number; exploit: number; ratio: number } {
        const recent = this.meta.rewardHistory.slice(-lastN);
        if (recent.length === 0) return { explore: 0, exploit: 0, ratio: 0 };

        let exploreCount = 0;
        for (const entry of recent) {
            const stateData = this.data[entry.stateKey]?.[entry.action];
            if (!stateData || stateData.n <= 2) exploreCount++;
        }

        return {
            explore: exploreCount,
            exploit: recent.length - exploreCount,
            ratio: exploreCount / recent.length
        };
    }

    /** Reset all data */
    public reset(): void {
        this.data = {};
        this.meta = this.defaultMeta();
        this.save();
    }

    /** Get the full table for debugging */
    public getFullTable(): QTableData {
        return { ...this.data };
    }
}

export const qTable = new QTable();
