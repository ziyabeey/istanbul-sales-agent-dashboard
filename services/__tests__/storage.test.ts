import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../rewardEngine', () => ({ rewardEngine: { recordReward: vi.fn() } }));

import { storage } from '../storage';
import { Lead } from '../../types';

const LEADS_KEY = 'sales_agent_leads';

function lead(overrides: Partial<Lead> = {}): Lead {
    return {
        id: '1',
        firma_adi: 'Test',
        ilce: 'Esenyurt',
        sektor: 'Restoran',
        lead_durumu: 'aktif',
        lead_skoru: 5,
        email: 'a@b.com',
        telefon: '',
        olusturma_tarihi: new Date().toISOString(),
        eksik_alanlar: [],
        notlar: '',
        ...overrides,
    };
}

describe('storage.updateLeads', () => {
    beforeEach(() => {
        localStorage.setItem(LEADS_KEY, JSON.stringify([
            lead({ id: '1', firma_adi: 'Firma A' }),
            lead({ id: '2', firma_adi: 'Firma B' }),
        ]));
    });

    it('merges multiple updates in one write', () => {
        const updated1 = lead({ id: '1', firma_adi: 'Firma A Güncel', strategyPhase: 'outreach' });
        const updated2 = lead({ id: '2', lead_durumu: 'beklemede' });
        storage.updateLeads([updated1, updated2]);

        const after = storage.getLeads();
        expect(after).toHaveLength(2);
        expect(after.find(l => l.id === '1')?.firma_adi).toBe('Firma A Güncel');
        expect(after.find(l => l.id === '1')?.strategyPhase).toBe('outreach');
        expect(after.find(l => l.id === '2')?.lead_durumu).toBe('beklemede');
    });

    it('does nothing when given empty array', () => {
        const before = storage.getLeads();
        storage.updateLeads([]);
        const after = storage.getLeads();
        expect(after).toEqual(before);
    });
});
