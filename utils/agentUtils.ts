
import { Lead } from '../types';

export const isProspectLead = (lead: Lead): boolean => {
    return lead.lead_durumu === 'aktif' || lead.lead_durumu === 'beklemede';
};

export const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) return error.message;
    if (typeof error === 'string') return error;
    return 'Bilinmeyen hata';
};

/** Kalıcı hata: yeniden denemek anlamsız (auth, config). Geçici değil = kalıcı. */
export const isPermanentAgentError = (error: unknown): boolean => {
    const msg = getErrorMessage(error).toLowerCase();
    const code = (error as { code?: string })?.code ?? '';
    if (['UNAUTHENTICATED', 'PERMISSION_DENIED', '401', '403'].some(c => msg.includes(c) || code.includes(c))) return true;
    if (msg.includes('api key') || msg.includes('apikey') || msg.includes('yetki') || msg.includes('authorization') || msg.includes('unauthorized') || msg.includes('forbidden')) return true;
    if (msg.includes('geçersiz') && (msg.includes('token') || msg.includes('key') || msg.includes('kimlik'))) return true;
    return false;
};

export const isSystemMailbox = (email?: string): boolean => {
    const normalized = (email || '').trim().toLowerCase();
    if (!normalized) return false;
    return ['mailer-daemon', 'google-daemon', 'daemon', 'postmaster', 'noreply', 'no-reply', 'do-not-reply', 'donotreply', 'auto-reply', 'autoreply', 'bounce'].some(token => normalized.includes(token));
};

/** [Inbox] snippet daemon/bounce/teslim edilemedi içeriyorsa taslak oluşturma. */
export const isBounceOrDaemonSnippet = (snippet: string): boolean => {
    if (!snippet?.trim()) return false;
    const normalized = snippet.trim().replace(/İ/g, 'i').toLowerCase();
    const patterns = [
        /delivery status|delivery failure|mail delivery failed|undeliverable|returned mail|failure notice|rejected|bounce/i,
        /teslim edilemedi|iletilemedi|gönderilemedi|adres bulunamadı|posta teslimi|bulunamadı/i,
        /mailer-daemon|google-daemon|postmaster|daemon@|no such user|invalid recipient|user unknown|mailbox not found/i,
        /delivery notification|non-delivery|ndr|dmarc|spf|delivery has failed/i,
    ];
    return patterns.some(p => p.test(normalized));
};

/**
 * Gelen mailin içeriği yanıt taslağı için uygun değilse true: bounce/daemon, genel merkeze yönlendirme,
 * hastane/bölüm otomatik yanıtı, out of office, "bu birim size yardımcı olamaz" vb.
 * Bu tür maillere otomatik taslak oluşturulmaz; lead onay_bekliyor yapılmaz.
 */
export const isNonActionableInbound = (snippet: string): boolean => {
    if (!snippet?.trim()) return false;
    if (isBounceOrDaemonSnippet(snippet)) return true;
    const normalized = snippet.trim().replace(/İ/g, 'i').toLowerCase();
    const nonActionablePatterns = [
        /genel merkez|genel merkeze|merkeze yazmanız|merkeze iletin|headquarters|head office/i,
        /hastane bölümüne|bu bölüme ulaştınız|bu birime ulaştınız|bu departmana/i,
        /size yardımcı olamaz|yardımcı olamayız|yetkili değiliz|yetkili değilim|ilgili birime|ilgili birimi/i,
        /yönlendirmeniz gerekmektedir|yönlendirin|forward to|please contact|ilgili kişiye/i,
        /out of office|ofis dışında|tatildeyim|izinliyim|ben yokum|geri dönüş|dönüşte/i,
        /otomatik yanıt|automatic reply|auto-reply|away from|mail gönderemiyorum/i,
        /mail delivery failed|daemon|adres bulunamadı|teslim edilemedi|undeliverable/i,
    ];
    return nonActionablePatterns.some(p => p.test(normalized));
};

export const isFollowupDue = (lead: Lead): boolean => {
    if (!lead.son_kontakt_tarihi) return true;
    const lastContact = new Date(lead.son_kontakt_tarihi);
    if (Number.isNaN(lastContact.getTime())) return true;
    const now = new Date();
    const diffMs = now.getTime() - lastContact.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return diffDays >= 1;
};

export const extractGeminiText = (response: any): string => {
    return response.text || '';
};

/** UTF-8 mojibake düzeltir: API yanıtı yanlış kodlamayla (Latin-1/Windows-1252) okunmuşsa Türkçe karakterler "iÃ§in", "Ã¼", "Ã„ÂŸ", "Ã„Â±" gibi bozulur. */
export function fixUtf8Mojibake(str: string): string {
    if (!str || typeof str !== 'string') return str;

    // Windows-1252 specific byte mapping for characters that don't map 1:1 to Unicode codepoints
    // These are the "undefined" bytes in ISO-8859-1 that have values in Windows-1252
    const cp1252: { [key: number]: number } = {
        0x80: 0x20AC, 0x82: 0x201A, 0x83: 0x0192, 0x84: 0x201E, 0x85: 0x2026, 0x86: 0x2020, 0x87: 0x2021,
        0x88: 0x02C6, 0x89: 0x2030, 0x8A: 0x0160, 0x8B: 0x2039, 0x8C: 0x0152, 0x8E: 0x017D, 0x91: 0x2018,
        0x92: 0x2019, 0x93: 0x201C, 0x94: 0x201D, 0x95: 0x2022, 0x96: 0x2013, 0x97: 0x2014, 0x98: 0x02DC,
        0x99: 0x2122, 0x9A: 0x0161, 0x9B: 0x203A, 0x9C: 0x0153, 0x9E: 0x017E, 0x9F: 0x0178
    };

    const mojibakePattern = /Ã§|Ã¼|Ã¶|ÄŸ|Ä±|ÃƒÂ|Â§|Ã„ÂŸ|Ã„Â±|ÃƒÂ§|ÃƒÂ¼|ÃƒÂ¶|Ã…ÂŸ|Ã„Â°|Ã¢Â€Â™|deÃ„ÂŸil|bÃƒÂ¼yÃƒÂ¼me|iÃƒÂ§in|iÃ§|Ã„Â|ÃƒÂ|Ã…Â|Ã¢Â€/;

    // Fast-path: Direct replacement for known double-mojibake sequences (Turkish)
    // "BeylikdÃƒÂ¼zÃƒÂ¼" -> "Beylikdüzü"
    const knownCorruptions: { [key: string]: string } = {
        'ÃƒÂ§': 'ç', 'ÃƒÂ¼': 'ü', 'ÃƒÂ¶': 'ö', 'Ã„ÂŸ': 'ğ', 'Ã„Â±': 'ı', 'Ã…ÂŸ': 'ş', 'Ã„Â°': 'İ',
        'ÃÂ§': 'ç', 'ÃÂ¼': 'ü', 'ÃÂ¶': 'ö', 'ÃÂŸ': 'ğ', 'ÃÂ±': 'ı',
        'Ã§': 'ç', 'Ã¼': 'ü', 'Ã¶': 'ö', 'ÄŸ': 'ğ', 'Ä±': 'ı', 'ÅŸ': 'ş', 'Ä°': 'İ' // Single mojibake
    };

    let out = str;

    // Try to fix specific double-corrupted sequences first
    Object.keys(knownCorruptions).forEach(key => {
        if (out.includes(key)) {
            out = out.split(key).join(knownCorruptions[key]);
        }
    });
    for (let i = 0; i < 5; i++) {
        if (!mojibakePattern.test(out)) break;
        try {
            // Attempt to reverse the "UTF-8 interpreted as Windows-1252/ISO-8859-1" corruption
            const bytes = new Uint8Array(out.length);
            let isValid = true;

            for (let j = 0; j < out.length; j++) {
                const code = out.charCodeAt(j);
                // If the char code is > 255, it can't be a result of single-byte encoding misinterpretation
                // EXCEPT if it was one of the Windows-1252 specific characters (like €) that got mapped to Unicode
                // We need to reverse map it back to the byte
                if (code > 255) {
                    // Reverse lookup for Windows-1252
                    const byte = Object.keys(cp1252).find(k => cp1252[Number(k)] === code);
                    if (byte) {
                        bytes[j] = Number(byte);
                    } else {
                        // If we encounter a high unicode character that ISN'T in CP1252, 
                        // then maybe this string isn't simple mojibake, or it's mixed.
                        // For safety, let's treat it as valid 1:1 if we can't map it, 
                        // but strictly speaking, real mojibake shouldn't have arbitrary wide chars.
                        // Let's abort this layer of decoding to avoid destroying valid data.
                        isValid = false;
                        break;
                    }
                } else {
                    bytes[j] = code;
                }
            }

            if (!isValid) break;

            const decoded = new TextDecoder('utf-8').decode(bytes);

            // If decoding didn't change anything (unlikely if we are here) or made it worse (heuristics?), stop.
            // Simple heuristic: if we resolved the common mojibake patterns, we are good.
            if (decoded === out) break;
            out = decoded;

            // apply direct replacements again because mixed strings can include
            // both single and double mojibake in the same subject/body.
            Object.keys(knownCorruptions).forEach(key => {
                if (out.includes(key)) {
                    out = out.split(key).join(knownCorruptions[key]);
                }
            });
        } catch {
            break;
        }
    }
    return out;
}


/**
 * Repeatedly applies mojibake fixing with NFC normalization.
 * Use this for user-visible Turkish text that may arrive double/triple corrupted.
 */
export function normalizeTurkishText(input: string, maxPasses: number = 5): string {
    if (!input || typeof input !== 'string') return input;
    let out = input;
    for (let i = 0; i < maxPasses; i++) {
        const next = fixUtf8Mojibake(out).normalize('NFC');
        if (next === out) break;
        out = next;
    }
    return out;
}

export const parseGeminiJson = (text: string) => {
    try {
        const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
        // Safe parsing for empty response
        if (!clean) return {};
        return JSON.parse(clean);
    } catch (e) {
        console.error("JSON Parse Error", e);
        return {};
    }
};
