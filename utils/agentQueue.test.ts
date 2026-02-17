import { describe, it, expect } from 'vitest';
import { computeAgentQueue, MIN_ENRICHMENT_SCORE_DEFAULT } from './agentQueue';
import { Lead } from '../types';

function lead(overrides: Partial<Lead> = {}): Lead {
    return {
        id: '1',
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

describe('computeAgentQueue', () => {
    it('returns only inbox_sync when no leads and outreach allowed', () => {
        const queue = computeAgentQueue([], 'balanced', MIN_ENRICHMENT_SCORE_DEFAULT);
        expect(queue.length).toBe(1);
        expect(queue[0].type).toBe('inbox_sync');
    });

    it('includes sanitize item when prospect leads have invalid or missing email', () => {
        const leads = [
            lead({ id: '1', lead_durumu: 'aktif', email: '' }),
            lead({ id: '2', lead_durumu: 'aktif', email: 'x' }),
        ];
        const queue = computeAgentQueue(leads, 'balanced');
        const sanitize = queue.find(q => q.type === 'sanitize');
        expect(sanitize).toBeDefined();
        expect(sanitize!.count).toBe(2);
    });

    it('includes sanitize when notes contain [BOUNCE]', () => {
        const leads = [lead({ notlar: '[BOUNCE]' })];
        const queue = computeAgentQueue(leads, 'balanced');
        expect(queue.some(q => q.type === 'sanitize')).toBe(true);
    });

    it('includes enrich item for prospect leads without email and score >= minEnrichmentScore', () => {
        const leads = [
            lead({ lead_durumu: 'aktif', lead_skoru: 4, email: '' }),
        ];
        const queue = computeAgentQueue(leads, 'balanced');
        const enrich = queue.find(q => q.type === 'enrich');
        expect(enrich).toBeDefined();
        expect(enrich!.count).toBe(1);
        expect(enrich!.label).toContain('email aranacak');
    });

    it('excludes enrich when prospect has email (even if low score)', () => {
        const leads = [lead({ lead_skoru: 2, email: 'a@b.com' })];
        const queue = computeAgentQueue(leads, 'balanced');
        const enrich = queue.find(q => q.type === 'enrich');
        expect(enrich).toBeUndefined();
    });

    it('excludes enrich when prospect has no email but score below minEnrichmentScore', () => {
        const leads = [lead({ lead_skoru: 1, email: '' })];
        const queue = computeAgentQueue(leads, 'balanced', 3);
        const enrich = queue.find(q => q.type === 'enrich');
        expect(enrich).toBeUndefined();
    });

    it('excludes enrich when focusMode is outreach_only', () => {
        const leads = [lead({ lead_skoru: 2, email: 'a@b.com' })];
        const queue = computeAgentQueue(leads, 'outreach_only');
        expect(queue.some(q => q.type === 'enrich')).toBe(false);
    });

    it('includes outreach item for prospect with email and no contact when outreach allowed', () => {
        const leads = [lead({ email: 'out@b.com', son_kontakt_tarihi: undefined })];
        const queue = computeAgentQueue(leads, 'balanced');
        const outreach = queue.find(q => q.type === 'outreach');
        expect(outreach).toBeDefined();
        expect(outreach!.count).toBe(1);
    });

    it('excludes outreach when focusMode is discovery_only', () => {
        const leads = [lead({ email: 'out@b.com' })];
        const queue = computeAgentQueue(leads, 'discovery_only');
        expect(queue.some(q => q.type === 'outreach')).toBe(false);
    });

    it('includes re_engagement item for cold_pool leads without RE_ENGAGEMENT_SENT when outreach allowed', () => {
        const leads = [
            lead({ id: '1', strategyPhase: 'cold_pool', email: 'cold@b.com', notlar: '' }),
        ];
        const queue = computeAgentQueue(leads, 'balanced');
        const reEng = queue.find(q => q.type === 're_engagement');
        expect(reEng).toBeDefined();
        expect(reEng!.count).toBe(1);
        expect(reEng!.label).toContain('soğuk havuz');
    });

    it('excludes re_engagement when cold_pool lead already has RE_ENGAGEMENT_SENT in notlar', () => {
        const leads = [
            lead({ strategyPhase: 'cold_pool', email: 'cold@b.com', notlar: '[RE_ENGAGEMENT_SENT]: 2025-02-17' }),
        ];
        const queue = computeAgentQueue(leads, 'balanced');
        expect(queue.some(q => q.type === 're_engagement')).toBe(false);
    });

    it('includes draft item for takipte/teklif_gonderildi without draftResponse', () => {
        const leads = [
            lead({ lead_durumu: 'takipte', draftResponse: undefined, email: 'd@b.com' }),
        ];
        const queue = computeAgentQueue(leads, 'balanced');
        const draft = queue.find(q => q.type === 'draft');
        expect(draft).toBeDefined();
        expect(draft!.count).toBe(1);
    });

    it('includes inbox_sync when outreach allowed', () => {
        const queue = computeAgentQueue([lead()], 'balanced');
        expect(queue.some(q => q.type === 'inbox_sync')).toBe(true);
    });

    it('excludes inbox_sync when discovery_only', () => {
        const queue = computeAgentQueue([lead()], 'discovery_only');
        expect(queue.some(q => q.type === 'inbox_sync')).toBe(false);
    });

    it('sorts queue by priority', () => {
        const leads = [
            lead({ lead_durumu: 'aktif', email: '' }),
            lead({ lead_skoru: 2, email: 'e@b.com' }),
            lead({ email: 'o@b.com' }),
            lead({ lead_durumu: 'takipte', email: 'd@b.com' }),
        ];
        const queue = computeAgentQueue(leads, 'balanced');
        for (let i = 1; i < queue.length; i++) {
            expect(queue[i].priority).toBeGreaterThanOrEqual(queue[i - 1].priority);
        }
    });

    it('handles messy/old data: mixed states, bounce, no email, duplicates', () => {
        const messyLeads: Lead[] = [
            lead({ id: 'a', lead_durumu: 'aktif', email: '', firma_adi: 'A', notlar: '' }),
            lead({ id: 'b', lead_durumu: 'aktif', email: 'x', firma_adi: 'B', notlar: '' }),
            lead({ id: 'c', lead_durumu: 'aktif', notlar: '[BOUNCE]: teslim edilemedi', email: 'c@x.com', firma_adi: 'C' }),
            lead({ id: 'd', lead_durumu: 'beklemede', email: 'dup@x.com', firma_adi: 'D' }),
            lead({ id: 'e', lead_durumu: 'aktif', email: 'dup@x.com', firma_adi: 'E' }),
            lead({ id: 'f', lead_durumu: 'aktif', lead_skoru: 4, email: '', firma_adi: 'F' }),
            lead({ id: 'g', lead_durumu: 'gecersiz', email: 'old@x.com', firma_adi: 'G' }),
            lead({ id: 'h', lead_durumu: 'aktif', email: 'good@x.com', son_kontakt_tarihi: undefined, firma_adi: 'H' }),
        ];
        const queue = computeAgentQueue(messyLeads, 'balanced', 3);
        const sanitize = queue.find(q => q.type === 'sanitize');
        expect(sanitize).toBeDefined();
        expect(sanitize!.count).toBeGreaterThanOrEqual(3);
        const enrich = queue.find(q => q.type === 'enrich');
        expect(enrich).toBeDefined();
        expect(enrich!.count).toBeGreaterThanOrEqual(1);
        const outreach = queue.find(q => q.type === 'outreach');
        expect(outreach).toBeDefined();
        expect(outreach!.count).toBeGreaterThanOrEqual(1);
        expect(queue.every((q, i) => i === 0 || q.priority >= queue[i - 1].priority)).toBe(true);
    });
});
