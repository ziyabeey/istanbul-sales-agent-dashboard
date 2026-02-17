import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createCircuitBreaker } from './circuitBreaker';

describe('createCircuitBreaker', () => {
    let now: number;
    const nowFn = () => now;

    beforeEach(() => {
        now = 1000;
        vi.useFakeTimers();
    });
    afterEach(() => {
        vi.useRealTimers();
    });

    it('isOpen returns false before any record', () => {
        const cb = createCircuitBreaker(5 * 60 * 1000, nowFn);
        expect(cb.isOpen('gmail')).toBe(false);
        expect(cb.isOpen('ai')).toBe(false);
    });

    it('isOpen returns true immediately after record', () => {
        const cb = createCircuitBreaker(5 * 60 * 1000, nowFn);
        cb.record('gmail');
        expect(cb.isOpen('gmail')).toBe(true);
        expect(cb.isOpen('ai')).toBe(false);
    });

    it('isOpen returns false after openMs has passed', () => {
        const cb = createCircuitBreaker(5000, nowFn);
        cb.record('gmail');
        expect(cb.isOpen('gmail')).toBe(true);
        now = 1000 + 5000;
        expect(cb.isOpen('gmail')).toBe(false);
    });

    it('categories are independent', () => {
        const cb = createCircuitBreaker(5000, nowFn);
        cb.record('gmail');
        expect(cb.isOpen('gmail')).toBe(true);
        expect(cb.isOpen('ai')).toBe(false);
        cb.record('ai');
        expect(cb.isOpen('ai')).toBe(true);
        now = 1000 + 1000;
        expect(cb.isOpen('gmail')).toBe(true);
        expect(cb.isOpen('ai')).toBe(true);
        now = 1000 + 6000;
        expect(cb.isOpen('gmail')).toBe(false);
        expect(cb.isOpen('ai')).toBe(false);
    });
});
