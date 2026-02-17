import { describe, it, expect } from 'vitest';
import { computeSlotsUsed } from './agentLoopSlots';

describe('computeSlotsUsed', () => {
    it('returns 0 when no step runs', () => {
        expect(computeSlotsUsed({}, 2)).toBe(0);
    });

    it('one light step uses 1 slot', () => {
        expect(computeSlotsUsed({ enrich: true }, 2)).toBe(1);
    });

    it('two light steps use 2 slots (max 2)', () => {
        expect(computeSlotsUsed({ enrich: true, persona: true }, 2)).toBe(2);
    });

    it('one heavy step uses 2 slots', () => {
        expect(computeSlotsUsed({ discovery: true }, 2)).toBe(2);
    });

    it('one heavy step fills maxSlots=2 so no further steps count', () => {
        expect(computeSlotsUsed({ discovery: true, draft: true }, 2)).toBe(2);
    });

    it('respects maxSlots=3', () => {
        expect(computeSlotsUsed({ enrich: true, persona: true, discovery: true }, 3)).toBe(3);
    });

    it('respects maxSlots=1', () => {
        expect(computeSlotsUsed({ enrich: true, persona: true }, 1)).toBe(1);
    });
});
