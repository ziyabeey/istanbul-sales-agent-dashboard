import { describe, it, expect, beforeEach, vi } from 'vitest';

if (typeof globalThis.localStorage === 'undefined') {
    const store: Record<string, string> = {};
    (globalThis as any).localStorage = {
        getItem: (key: string) => store[key] ?? null,
        setItem: (key: string, val: string) => { store[key] = val; },
        removeItem: (key: string) => { delete store[key]; },
        clear: () => { Object.keys(store).forEach(k => delete store[k]); },
        get length() { return Object.keys(store).length; },
        key: (i: number) => Object.keys(store)[i] ?? null,
    };
}

import { rewardEngine, REWARD_VALUES } from '../rewardEngine';
import { qTable } from '../qTable';
import { Lead } from '../../types';

function lead(overrides: Partial<Lead> = {}): Lead {
    return {
        id: 'lead-1',
        firma_adi: 'Test Firma',
        ilce: 'Esenyurt',
        sektor: 'Restoran',
        lead_durumu: 'aktif',
        lead_skoru: 5,
        email: 'test@firma.com',
        telefon: '',
        olusturma_tarihi: new Date().toISOString(),
        eksik_alanlar: [],
        notlar: '',
        ...overrides
    };
}

describe('RewardEngine', () => {
    beforeEach(() => {
        localStorage.clear();
        qTable.reset();
        rewardEngine.reset();
        vi.spyOn(console, 'log').mockImplementation(() => {});
    });

    describe('recordReward', () => {
        it('updates Q-table with correct state key and reward', () => {
            const l = lead({ sektor: 'Restoran', personaAnalysis: { type: 'Sosyal', traits: [], communicationStyle: '', reasoning: '' } });
            rewardEngine.recordReward('status_olumlu', l, 'tmpl-intro');
            const stateKey = qTable.makeStateKey('Restoran', 'Sosyal');
            expect(qTable.getQValue(stateKey, 'tmpl-intro')).toBe(REWARD_VALUES.status_olumlu);
        });
        it('uses lead.lastUsedTemplateId when templateId not passed', () => {
            const l = lead({ sektor: 'Restoran', lastUsedTemplateId: 'tmpl-used' });
            rewardEngine.recordReward('status_olumsuz', l);
            const stateKey = qTable.makeStateKey('Restoran', 'Bilinmiyor');
            expect(qTable.getQValue(stateKey, 'tmpl-used')).toBe(REWARD_VALUES.status_olumsuz);
        });
    });

    describe('selectBestTemplate', () => {
        it('returns templates sorted by UCB score', () => {
            const l = lead({ sektor: 'Restoran', personaAnalysis: { type: 'Sosyal', traits: [], communicationStyle: '', reasoning: '' } });
            const results = rewardEngine.selectBestTemplate(l, ['t1', 't2', 't3']);
            expect(results.length).toBe(3);
            expect(results.map(r => r.templateId)).toContain('t1');
            expect(results.map(r => r.templateId)).toContain('t2');
            expect(results.map(r => r.templateId)).toContain('t3');
        });
        it('prefers template with higher Q after learning', () => {
            const l = lead({ sektor: 'R', personaAnalysis: { type: 'P', traits: [], communicationStyle: '', reasoning: '' } });
            rewardEngine.recordReward('status_olumlu', { ...l, lastUsedTemplateId: 'best' }, 'best');
            rewardEngine.recordReward('status_olumsuz', { ...l, lastUsedTemplateId: 'worst' }, 'worst');
            const results = rewardEngine.selectBestTemplate(l, ['best', 'worst']);
            expect(results[0].templateId).toBe('best');
            expect(results[0].qValue).toBeGreaterThan(results[1].qValue);
        });
    });

    describe('sweepTimeoutPenalties', () => {
        const DAY = 24 * 60 * 60 * 1000;

        it('returns 0 when no leads need penalty', () => {
            const leads = [
                lead({ lead_durumu: 'aktif', son_kontakt_tarihi: undefined }),
                lead({ lead_durumu: 'olumlu', son_kontakt_tarihi: new Date(Date.now() - 2 * DAY).toISOString() }),
            ];
            expect(rewardEngine.sweepTimeoutPenalties(leads)).toBe(0);
        });

        it('applies 7d penalty for takipte lead with contact 7+ days ago', () => {
            const sevenDaysAgo = new Date(Date.now() - 8 * DAY).toISOString();
            const leads = [
                lead({
                    lead_durumu: 'takipte',
                    son_kontakt_tarihi: sevenDaysAgo,
                    lastUsedTemplateId: 'tmpl-1',
                }),
            ];
            const count = rewardEngine.sweepTimeoutPenalties(leads);
            expect(count).toBe(1);
            const stateKey = qTable.makeStateKey('Restoran', 'Bilinmiyor');
            expect(qTable.getQValue(stateKey, 'tmpl-1')).toBeLessThan(0);
        });

        it('applies 14d penalty for takipte lead with contact 14+ days ago', () => {
            const fifteenDaysAgo = new Date(Date.now() - 15 * DAY).toISOString();
            const leads = [
                lead({
                    lead_durumu: 'takipte',
                    son_kontakt_tarihi: fifteenDaysAgo,
                    lastUsedTemplateId: 'tmpl-14',
                }),
            ];
            const count = rewardEngine.sweepTimeoutPenalties(leads);
            expect(count).toBe(1);
            const stateKey = qTable.makeStateKey('Restoran', 'Bilinmiyor');
            expect(qTable.getQValue(stateKey, 'tmpl-14')).toBe(REWARD_VALUES.no_response_14d);
        });

        it('skips leads without lastUsedTemplateId', () => {
            const sevenDaysAgo = new Date(Date.now() - 8 * DAY).toISOString();
            const leads = [
                lead({
                    lead_durumu: 'takipte',
                    son_kontakt_tarihi: sevenDaysAgo,
                    lastUsedTemplateId: undefined,
                }),
            ];
            expect(rewardEngine.sweepTimeoutPenalties(leads)).toBe(0);
        });

        it('applies penalty at most once per lead (7d/14d each once)', () => {
            const eightDaysAgo = new Date(Date.now() - 8 * DAY).toISOString();
            const l = lead({
                id: 'once-only',
                lead_durumu: 'takipte',
                son_kontakt_tarihi: eightDaysAgo,
                lastUsedTemplateId: 'tmpl-7d',
            });
            const leads = [l];
            const first = rewardEngine.sweepTimeoutPenalties(leads);
            expect(first).toBe(1);
            const second = rewardEngine.sweepTimeoutPenalties(leads);
            expect(second).toBe(0);
        });
    });
});
