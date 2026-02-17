import { describe, it, expect } from 'vitest';
import { getErrorMessage, isPermanentAgentError, isSystemMailbox, isBounceOrDaemonSnippet, isNonActionableInbound, fixUtf8Mojibake } from './agentUtils';

describe('getErrorMessage', () => {
    it('returns message from Error', () => {
        expect(getErrorMessage(new Error('API key eksik'))).toBe('API key eksik');
    });
    it('returns string when given string', () => {
        expect(getErrorMessage('Network error')).toBe('Network error');
    });
    it('returns fallback for unknown', () => {
        expect(getErrorMessage(42)).toBe('Bilinmeyen hata');
    });
});

describe('isPermanentAgentError', () => {
    it('returns true for 401 in message', () => {
        expect(isPermanentAgentError(new Error('401 Unauthorized'))).toBe(true);
    });
    it('returns true for 403 in message', () => {
        expect(isPermanentAgentError(new Error('403 Forbidden'))).toBe(true);
    });
    it('returns true for API key message', () => {
        expect(isPermanentAgentError(new Error('API key eksik'))).toBe(true);
        expect(isPermanentAgentError(new Error('Invalid apikey'))).toBe(true);
    });
    it('returns true for yetki/authorization/unauthorized', () => {
        expect(isPermanentAgentError(new Error('Yetki yok'))).toBe(true);
        expect(isPermanentAgentError(new Error('Authorization failed'))).toBe(true);
        expect(isPermanentAgentError(new Error('Unauthorized'))).toBe(true);
    });
    it('returns true for geçersiz token/key/kimlik', () => {
        expect(isPermanentAgentError(new Error('Geçersiz token'))).toBe(true);
        expect(isPermanentAgentError(new Error('Geçersiz key'))).toBe(true);
    });
    it('returns false for transient errors', () => {
        expect(isPermanentAgentError(new Error('Network timeout'))).toBe(false);
        expect(isPermanentAgentError(new Error('429 Too Many Requests'))).toBe(false);
        expect(isPermanentAgentError(new Error('ECONNRESET'))).toBe(false);
    });
});

describe('isSystemMailbox', () => {
    it('returns true for noreply and similar', () => {
        expect(isSystemMailbox('noreply@example.com')).toBe(true);
        expect(isSystemMailbox('no-reply@test.com')).toBe(true);
        expect(isSystemMailbox('mailer-daemon@google.com')).toBe(true);
        expect(isSystemMailbox('bounce@server.com')).toBe(true);
    });
    it('returns false for normal email', () => {
        expect(isSystemMailbox('ahmet@firma.com')).toBe(false);
        expect(isSystemMailbox('')).toBe(false);
    });
});

describe('isBounceOrDaemonSnippet', () => {
    it('returns true for delivery failure / adres bulunamadı', () => {
        expect(isBounceOrDaemonSnippet('Delivery has failed. Adres bulunamadı.')).toBe(true);
        expect(isBounceOrDaemonSnippet('Mail delivery failed: user unknown')).toBe(true);
        expect(isBounceOrDaemonSnippet('Teslim edilemedi')).toBe(true);
        expect(isBounceOrDaemonSnippet('İletilemedi')).toBe(true);
    });
    it('returns true for daemon / postmaster', () => {
        expect(isBounceOrDaemonSnippet('mailer-daemon@google.com sent you a message')).toBe(true);
        expect(isBounceOrDaemonSnippet('Postmaster: delivery notification')).toBe(true);
    });
    it('returns false for normal reply content', () => {
        expect(isBounceOrDaemonSnippet('Merhaba, teklifinizi inceledik.')).toBe(false);
        expect(isBounceOrDaemonSnippet('Fiyat bilgisi alabilir miyiz?')).toBe(false);
    });
    it('returns false for empty or whitespace', () => {
        expect(isBounceOrDaemonSnippet('')).toBe(false);
        expect(isBounceOrDaemonSnippet('   ')).toBe(false);
    });
});

describe('isNonActionableInbound', () => {
    it('returns true for bounce/daemon (delegates to isBounceOrDaemonSnippet)', () => {
        expect(isNonActionableInbound('Adres bulunamadı. Mail delivery failed.')).toBe(true);
        expect(isNonActionableInbound('Teslim edilemedi')).toBe(true);
    });
    it('returns true for genel merkez / wrong contact', () => {
        expect(isNonActionableInbound('Hastane bölümüne ulaştınız. Genel merkeze yazmanız gerekmektedir.')).toBe(true);
        expect(isNonActionableInbound('Bu birim size yardımcı olamaz. İlgili birime yönlendirin.')).toBe(true);
        expect(isNonActionableInbound('Genel merkeze iletişime geçiniz.')).toBe(true);
    });
    it('returns true for out of office / otomatik yanıt', () => {
        expect(isNonActionableInbound('Out of office. Geri dönüşte yanıtlayacağım.')).toBe(true);
        expect(isNonActionableInbound('Otomatik yanıt: Tatildeyim.')).toBe(true);
    });
    it('returns false for normal reply', () => {
        expect(isNonActionableInbound('Merhaba, teklifinizi inceledik. Görüşme talep ediyoruz.')).toBe(false);
        expect(isNonActionableInbound('Fiyat bilgisi alabilir miyiz?')).toBe(false);
    });
});

describe('fixUtf8Mojibake', () => {
    it('returns input when no mojibake pattern', () => {
        expect(fixUtf8Mojibake('Esenyurt Restoran için dijital vitrin')).toBe('Esenyurt Restoran için dijital vitrin');
        expect(fixUtf8Mojibake('')).toBe('');
    });
    it('fixes double-decoded Turkish (iÃ§in -> için)', () => {
        const broken = 'Esenyurt Restoran iÃ§in dijital bir vitrin deÃ„ÂŸil, bir bÃƒÂ¼yÃƒÂ¼me sistemi';
        const fixed = fixUtf8Mojibake(broken);
        expect(fixed).toContain('için');
        expect(fixed).not.toContain('iÃ§');
    });
    it('returns input when decode throws', () => {
        const invalid = '\u00C3\u0087\u00C2\u00A7'; // might decode to something invalid
        expect(fixUtf8Mojibake(invalid)).toBeDefined();
    });
});
