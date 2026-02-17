import { describe, it, expect } from 'vitest';

/**
 * Agent Context — isSystemMailbox ve isFollowupDue Testleri
 * 
 * AgentContext'ten bağımsız olarak test edilebilmeleri için
 * fonksiyonları burada yeniden tanımlıyoruz (pure functions).
 */

// --- isSystemMailbox (AgentContext.tsx'deki ile aynı mantık) ---
const isSystemMailbox = (email?: string): boolean => {
    const normalized = (email || '').trim().toLowerCase();
    if (!normalized) return false;
    return ['mailer-daemon', 'google-daemon', 'daemon', 'postmaster', 'noreply', 'no-reply', 'do-not-reply', 'donotreply', 'auto-reply', 'autoreply', 'bounce'].some(token => normalized.includes(token));
};

// --- isFollowupDue (AgentContext.tsx'deki ile aynı mantık) ---
const isFollowupDue = (sonKontaktTarihi?: string): boolean => {
    if (!sonKontaktTarihi) return true;
    const lastContact = new Date(sonKontaktTarihi);
    if (Number.isNaN(lastContact.getTime())) return true;
    const now = new Date();
    const diffMs = now.getTime() - lastContact.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return diffDays >= 1;
};

describe('isSystemMailbox (Agent Filter)', () => {

    // --- Engellemesi Gereken Adresler ---
    describe('should block system/daemon addresses', () => {
        const systemEmails = [
            'mailer-daemon@googlemail.com',
            'MAILER-DAEMON@googlemail.com',
            'google-daemon@google.com',
            'daemon@localhost',
            'postmaster@gmail.com',
            'noreply@company.com',
            'no-reply@company.com',
            'do-not-reply@service.com',
            'donotreply@service.com',
            'auto-reply@server.com',
            'autoreply@server.com',
            'bounce@mail.server.com',
            'bounce-handler@relay.google.com',
        ];

        it.each(systemEmails)('blocks: %s', (email) => {
            expect(isSystemMailbox(email)).toBe(true);
        });
    });

    // --- Geçirmesi Gereken Adresler ---
    describe('should allow legitimate business addresses', () => {
        const legitimateEmails = [
            'info@firmaabc.com',
            'contact@restaurant.com.tr',
            'ahmet@gmail.com',
            'satis@company.com',
            'hello@startup.io',
            'mehmet.yilmaz@domain.com',
            'admin@website.com',
        ];

        it.each(legitimateEmails)('allows: %s', (email) => {
            expect(isSystemMailbox(email)).toBe(false);
        });
    });

    // --- Kenar Durumlar ---
    describe('edge cases', () => {
        it('returns false for undefined', () => {
            expect(isSystemMailbox(undefined)).toBe(false);
        });

        it('returns false for empty string', () => {
            expect(isSystemMailbox('')).toBe(false);
        });

        it('returns false for whitespace', () => {
            expect(isSystemMailbox('   ')).toBe(false);
        });

        it('is case-insensitive', () => {
            expect(isSystemMailbox('GOOGLE-DAEMON@GOOGLE.COM')).toBe(true);
            expect(isSystemMailbox('Mailer-Daemon@Googlemail.com')).toBe(true);
        });
    });
});

describe('isFollowupDue (Agent Filter)', () => {

    it('returns true when no date is provided', () => {
        expect(isFollowupDue(undefined)).toBe(true);
    });

    it('returns true when date is empty string', () => {
        expect(isFollowupDue('')).toBe(true);
    });

    it('returns true when date is invalid', () => {
        expect(isFollowupDue('not-a-date')).toBe(true);
    });

    it('returns true when last contact was more than 1 day ago', () => {
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
        expect(isFollowupDue(twoDaysAgo.toISOString().slice(0, 10))).toBe(true);
    });

    it('returns false when last contact was today', () => {
        const today = new Date().toISOString().slice(0, 10);
        expect(isFollowupDue(today)).toBe(false);
    });

    it('returns true when last contact was exactly 1 day ago', () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        expect(isFollowupDue(yesterday.toISOString().slice(0, 10))).toBe(true);
    });
});
