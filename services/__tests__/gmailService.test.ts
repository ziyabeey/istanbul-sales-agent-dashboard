import { describe, it, expect, beforeAll } from 'vitest';

// Mock localStorage for Node.js test environment (needed by storage.ts import)
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

import { GmailService } from '../gmailService';

/**
 * GmailService — Email Filtreleme Testleri
 * 
 * Bu testler, daemon/bounce/sistem maillerinin doğru şekilde
 * filtrelendiğini ve geçerli maillerin engellenmediğini doğrular.
 */

describe('GmailService', () => {
    const service = new GmailService();

    // ============================================================
    // isBlockedMailbox — Engelli Posta Kutusu Tespiti
    // ============================================================
    describe('isBlockedMailbox', () => {

        // --- Engellemesi Gereken Adresler ---
        const blockedAddresses = [
            'mailer-daemon@googlemail.com',
            'MAILER-DAEMON@googlemail.com',
            'google-daemon@google.com',
            'google-daemon@somehost.net',
            'daemon@server.local',
            'postmaster@gmail.com',
            'no-reply@company.com',
            'noreply@company.com',
            'do-not-reply@example.org',
            'donotreply@example.org',
            'bounce@server.com',
            'auto-reply@company.com',
            'autoreply@company.com',
            'bounce-handler@mail.server.com',
            'system-mailer-daemon@relay.google.com',
        ];

        it.each(blockedAddresses)(
            'should BLOCK system email: %s',
            (email) => {
                expect(service.isBlockedMailbox(email)).toBe(true);
            }
        );

        // --- Engellememesi Gereken Adresler ---
        const allowedAddresses = [
            'info@firmaabc.com',
            'contact@restaurant.com.tr',
            'ahmet@gmail.com',
            'satis@company.com',
            'support@website.com',
            'hello@startup.io',
            'mehmet.yilmaz@domain.com',
        ];

        it.each(allowedAddresses)(
            'should ALLOW legitimate email: %s',
            (email) => {
                expect(service.isBlockedMailbox(email)).toBe(false);
            }
        );

        // --- Kenar Durumlar ---
        it('should handle empty string', () => {
            expect(service.isBlockedMailbox('')).toBe(false);
        });

        it('should handle whitespace-only string', () => {
            expect(service.isBlockedMailbox('   ')).toBe(false);
        });

        it('should be case-insensitive', () => {
            expect(service.isBlockedMailbox('MAILER-DAEMON@GOOGLEMAIL.COM')).toBe(true);
            expect(service.isBlockedMailbox('Google-Daemon@Google.Com')).toBe(true);
            expect(service.isBlockedMailbox('NoReply@Company.COM')).toBe(true);
        });

        it('should handle email with extra whitespace', () => {
            expect(service.isBlockedMailbox('  mailer-daemon@googlemail.com  ')).toBe(true);
        });
    });

    // ============================================================
    // isBounceLikeSubject — Bounce/Delivery Failure Konu Tespiti
    // ============================================================
    describe('isBounceLikeSubject', () => {

        const bounceSubjects = [
            'Delivery Status Notification (Failure)',
            'Delivery failure',
            'Mail Delivery Failed: Returning Message to Sender',
            'Undeliverable: Your message could not be delivered',
            'Returned mail: see transcript for details',
            'Failure Notice',
            'Message rejected by server',
            'Bounce notification',
        ];

        it.each(bounceSubjects)(
            'should detect bounce subject: "%s"',
            (subject) => {
                expect(service.isBounceLikeSubject(subject)).toBe(true);
            }
        );

        const normalSubjects = [
            'Re: Teklif hakkında',
            'Merhaba, web sitesi konuşalım',
            'İstanbul ofis toplantısı',
            'Fiyat teklifi alabilir miyim?',
            'Teşekkürler',
            '',
        ];

        it.each(normalSubjects)(
            'should NOT flag normal subject: "%s"',
            (subject) => {
                expect(service.isBounceLikeSubject(subject)).toBe(false);
            }
        );
    });
});
