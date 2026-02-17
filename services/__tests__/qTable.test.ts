import { describe, it, expect, beforeEach } from 'vitest';

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

import { QTable } from '../qTable';

describe('QTable', () => {
    let qTable: QTable;

    beforeEach(() => {
        localStorage.clear();
        qTable = new QTable();
    });

    describe('makeStateKey', () => {
        it('formats sector and persona', () => {
            expect(qTable.makeStateKey('Restoran', 'Sosyal')).toBe('Restoran:Sosyal');
        });
        it('defaults persona to Bilinmiyor', () => {
            expect(qTable.makeStateKey('Restoran')).toBe('Restoran:Bilinmiyor');
        });
        it('uses Diğer for empty sector', () => {
            expect(qTable.makeStateKey('', 'X')).toBe('Diğer:X');
        });
    });

    describe('update and getQValue', () => {
        it('stores first reward as Q value', () => {
            qTable.update('Restoran:Sosyal', 'tmpl-1', 0.5, 'status_takipte');
            expect(qTable.getQValue('Restoran:Sosyal', 'tmpl-1')).toBe(0.5);
        });
        it('updates Q with EMA on subsequent rewards', () => {
            qTable.update('S:P', 'a', 0.4, 'e1');
            qTable.update('S:P', 'a', 0.8, 'e2');
            const q = qTable.getQValue('S:P', 'a');
            expect(q).toBeGreaterThan(0.4);
            expect(q).toBeLessThanOrEqual(1);
        });
        it('clamps Q to [-1, 1]', () => {
            qTable.update('S:P', 'a', -2, 'e1');
            expect(qTable.getQValue('S:P', 'a')).toBe(-1);
        });
        it('returns 0 for unknown state-action', () => {
            expect(qTable.getQValue('Unknown:Sector', 'tmpl-x')).toBe(0);
        });
    });

    describe('selectAction (UCB1)', () => {
        it('returns all actions with untried actions having infinite UCB', () => {
            const results = qTable.selectAction('S:P', ['t1', 't2']);
            expect(results).toHaveLength(2);
            expect(results.every(r => r.ucbScore === Infinity || r.visits === 0)).toBe(true);
        });
        it('prefers higher Q when both actions have been tried', () => {
            qTable.update('S:P', 't1', 0.9, 'e1');
            qTable.update('S:P', 't1', 0.9, 'e2');
            qTable.update('S:P', 't2', 0.2, 'e3');
            const results = qTable.selectAction('S:P', ['t1', 't2']);
            expect(results[0].action).toBe('t1');
            expect(results[0].qValue).toBeGreaterThan(results[1].qValue);
        });
        it('sorts by ucbScore descending', () => {
            qTable.update('S:P', 't1', 0.5, 'e1');
            const results = qTable.selectAction('S:P', ['t1', 't2', 't3']);
            for (let i = 1; i < results.length; i++) {
                const a = results[i - 1].ucbScore;
                const b = results[i].ucbScore;
                expect(a >= b || (a === Infinity && b === Infinity)).toBe(true);
            }
        });
    });

    describe('reset', () => {
        it('clears data and meta', () => {
            qTable.update('S:P', 'a', 0.5, 'e1');
            qTable.reset();
            expect(qTable.getQValue('S:P', 'a')).toBe(0);
            expect(qTable.getMeta().totalActions).toBe(0);
        });
    });
});
