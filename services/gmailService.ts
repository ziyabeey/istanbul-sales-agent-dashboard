import { fixUtf8Mojibake, normalizeTurkishText } from '../utils/agentUtils';

/** Gmail'den gelen Subject header: RFC 2047 decode + mojibake düzeltmesi. */
function decodeAndFixSubject(raw: string): string {
    if (!raw || typeof raw !== 'string') return raw || '(Konu Yok)';
    let s = raw.trim();
    // RFC 2047: =?charset?B?base64?= veya =?charset?Q?encoded?=
    const rfc2047 = /=\?([^?]+)\?(B|Q)\?([^?]*)\?=/gi;
    const parts: string[] = [];
    let lastIndex = 0;
    let m: RegExpExecArray | null;
    rfc2047.lastIndex = 0;
    while ((m = rfc2047.exec(s)) !== null) {
        parts.push(s.slice(lastIndex, m.index));
        const charset = (m[1] || '').toLowerCase();
        const enc = (m[2] || '').toUpperCase();
        const payload = m[3] || '';
        try {
            if (enc === 'B') {
                const binary = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
                const bytes = new Uint8Array([...binary].map(c => c.charCodeAt(0)));
                parts.push(new TextDecoder(charset === 'utf-8' ? 'utf-8' : 'iso-8859-1').decode(bytes));
            } else {
                const bytes: number[] = [];
                for (let i = 0; i < payload.length; i++) {
                    if (payload[i] === '_') bytes.push(0x20);
                    else if (payload[i] === '=' && payload[i + 1] && payload[i + 2]) {
                        bytes.push(parseInt(payload.slice(i + 1, i + 3), 16));
                        i += 2;
                    } else bytes.push(payload.charCodeAt(i) & 0xff);
                }
                parts.push(new TextDecoder(charset === 'utf-8' ? 'utf-8' : 'iso-8859-1').decode(new Uint8Array(bytes)));
            }
        } catch {
            parts.push(m[0]);
        }
        lastIndex = rfc2047.lastIndex;
    }
    parts.push(s.slice(lastIndex));
    s = parts.join('');
    return normalizeTurkishText(s);
}

function escapeHtml(s: string): string {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

/** Konu satırı için UTF-8 byte bazlı base64 (Türkçe karakter garantisi). */
function subjectToBase64Utf8(s: string): string {
    const bytes = new TextEncoder().encode(s);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
}

/** MIME header parametreleri (filename, name) için RFC 2047: non-ASCII ise =?utf-8?B?base64?= */
function rfc2047Encode(value: string): string {
    if (!value) return value;
    const isAscii = /^[\x00-\x7F]*$/.test(value);
    if (isAscii) return value;
    return `=?utf-8?B?${subjectToBase64Utf8(value)}?=`;
}


/** RFC 2045: base64 body lines should be wrapped at 76 chars. */
function wrapBase64Lines(input: string, lineLength: number = 76): string {
    if (!input) return '';
    const chunks: string[] = [];
    for (let i = 0; i < input.length; i += lineLength) {
        chunks.push(input.slice(i, i + lineLength));
    }
    return chunks.join('\r\n');
}

export class GmailService {
    private static readonly EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    private static readonly KNOWN_INVALID_DOMAINS = new Set(['example.com', 'email.com', 'test.com', 'localhost', 'localdomain']);
    private static readonly BLOCKED_LOCAL_PARTS = new Set([
        'mailer-daemon',
        'google-daemon',
        'daemon',
        'postmaster',
        'no-reply',
        'noreply',
        'bounce',
        'do-not-reply',
        'donotreply',
        'auto-reply',
        'autoreply'
    ]);
    private static readonly BOUNCE_SUBJECT_PATTERNS = [
        /delivery status notification/i,
        /delivery failure/i,
        /mail delivery failed/i,
        /undeliverable/i,
        /returned mail/i,
        /failure notice/i,
        /rejected/i,
        /bounce/i,
        /iletilemedi/i,
        /teslim edilemedi/i,
        /adres bulunamadı/i,
        /posta teslimi/i
    ];

    private static readonly DISPOSABLE_DOMAINS = new Set([
        'tempmail.com', '10minutemail.com', 'guerrillamail.com', 'mailinator.com',
        'yopmail.com', 'throwawaymail.com', 'temp-mail.org', 'fake-email.com'
    ]);

    private getLocalPart(email: string): string {
        const normalized = (email || '').trim().toLowerCase();
        const atIndex = normalized.lastIndexOf('@');
        if (atIndex <= 0) return '';
        return normalized.slice(0, atIndex).trim();
    }

    public isBlockedMailbox(email: string): boolean {
        const localPart = this.getLocalPart(email);
        const domain = this.extractDomain(email);

        if (!localPart) return false;
        if (domain && GmailService.DISPOSABLE_DOMAINS.has(domain)) return true;

        if (GmailService.BLOCKED_LOCAL_PARTS.has(localPart)) return true;
        return [...GmailService.BLOCKED_LOCAL_PARTS].some(blocked => localPart.includes(blocked));
    }

    public isBounceLikeSubject(subject: string): boolean {
        const normalized = (subject || '').trim();
        return GmailService.BOUNCE_SUBJECT_PATTERNS.some(pattern => pattern.test(normalized));
    }

    /** Fast synchronous email validation (format + domain, no DNS). */
    public quickValidateEmail(email: string): { valid: boolean; reason?: string } {
        const normalized = (email || '').trim().toLowerCase();
        if (!normalized) return { valid: false, reason: 'Boş email' };
        if (!GmailService.EMAIL_REGEX.test(normalized)) return { valid: false, reason: 'Geçersiz format' };

        const domain = this.extractDomain(normalized);
        if (domain && GmailService.DISPOSABLE_DOMAINS.has(domain)) return { valid: false, reason: 'Geçici/Çöp E-posta' };

        if (this.isBlockedMailbox(normalized)) return { valid: false, reason: 'Sistem/Bloklu Adres' };

        if (!domain || !this.hasValidDomainFormat(domain)) return { valid: false, reason: `Geçersiz domain: ${domain}` };
        return { valid: true };
    }

    private extractDomain(email: string): string | null {
        const normalized = (email || '').trim().toLowerCase();
        const atIndex = normalized.lastIndexOf('@');
        if (atIndex === -1 || atIndex === normalized.length - 1) return null;
        return normalized.slice(atIndex + 1).trim() || null;
    }

    private hasValidDomainFormat(domain: string): boolean {
        if (!domain || domain.includes(' ') || !domain.includes('.')) return false;
        if (GmailService.KNOWN_INVALID_DOMAINS.has(domain)) return false;
        return /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(domain);
    }

    private async fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);
        try {
            return await fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } });
        } finally {
            clearTimeout(timer);
        }
    }

    /** Public DNS/format validation before send. Call before generating email to avoid wasting AI on invalid addresses. */
    public async validateRecipientEmail(recipientEmail: string): Promise<void> {
        return this.validateRecipientBeforeSend(recipientEmail);
    }

    private async validateRecipientBeforeSend(recipientEmail: string): Promise<void> {
        const normalizedEmail = (recipientEmail || '').trim().toLowerCase();

        // 1. Basic Format & Blocklist Check
        const quickCheck = this.quickValidateEmail(normalizedEmail);
        if (!quickCheck.valid) {
            throw new Error(`ALICI_GECERSIZ:${quickCheck.reason}`);
        }

        const domain = this.extractDomain(normalizedEmail);
        if (!domain) throw new Error('ALICI_DOMAIN_YOK');

        // 2. DNS Validation (Strict Mode)
        // Previous behavior was fail-open (warn only). New behavior is fail-closed for explicit errors.
        try {
            const dnsUrl = `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=MX`;
            const res = await this.fetchWithTimeout(dnsUrl, 5000); // Increased timeout slightly

            if (!res.ok) {
                // Network error to Google DNS - we might choose to be fail-open here if critical, 
                // but for safety let's block to avoid spamming if we aren't sure.
                if (res.status === 400) throw new Error(`ALICI_DNS_BAD_REQUEST`);
                // For other network errors, maybe we can be lenient or strict. User wanted strict.
                console.warn(`[EMAIL VALIDATION] DNS check network error for ${domain}.`);
            } else {
                const data = await res.json();

                // Status 3 = NXDOMAIN (Domain does not exist) -> DEFINITE BLOCK
                if (data?.Status === 3) {
                    throw new Error(`ALICI_DOMAIN_DNS_BULUNAMADI:${domain}`);
                }

                // If it exists but has no MX or A records?
                const hasAnswers = data?.Answer && Array.isArray(data.Answer) && data.Answer.length > 0;
                if (!hasAnswers) {
                    // Check A record fallback if MX missing? 
                    // Usually mail servers need MX. Let's strict check MX first.
                    // If no MX, technically standard says try A, but for B2B sales, no MX usually means no mail.
                    // Let's check A record as backup just to be safe compliant.
                    const aRes = await this.fetchWithTimeout(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=A`, 4000);
                    const aData = await aRes.json();
                    if (aData?.Status === 3 || (!aData?.Answer)) {
                        throw new Error(`ALICI_DOMAIN_MAIL_SUNUCUSU_YOK:${domain}`);
                    }
                }
            }
        } catch (error) {
            if (error instanceof Error && error.message.startsWith('ALICI_')) {
                throw error;
            }
            // If strictly network error/timeout and we want to be safe:
            console.error(`[EMAIL VALIDATION] DNS Check failed exceptionally: ${error}`);
            // Decide: Throw or Log? User complained about sending to bad emails. 
            // Let's throw to be safe.
            throw new Error(`ALICI_DOMAIN_DOGRULAMA_HATASI:DNS_ERISIM_SORUNU`);
        }
    }

    /**
     * Constructs a MIME message with optional attachments.
     */
    private createMimeMessage(to: string, subject: string, body: string, attachments?: { filename: string, content: string, mimeType: string }[]): string {
        const boundary = "foo_bar_baz";
        const nl = "\r\n";

        // Konu: çok geçişli mojibake (çift/katlı bozulmayı düzelt), sonra NFC ve base64
        const cleanSubject = normalizeTurkishText((subject || '').trim());
        const encodedSubject = `=?utf-8?B?${subjectToBase64Utf8(cleanSubject)}?=`;
        const cleanBody = normalizeTurkishText(body || '');

        let msg = "";

        // Headers
        msg += `To: ${to}${nl}`;
        msg += `Subject: ${encodedSubject}${nl}`;
        msg += `MIME-Version: 1.0${nl}`;
        msg += `Content-Type: multipart/mixed; boundary="${boundary}"${nl}${nl}`;

        // İmza: ayırıcı çizgi ayrı satırda (profil fotoğrafıyla çakışmasın)
        let signatureHtml = '';
        try {
            const raw = localStorage.getItem('sales_agent_profile');
            const profile = raw ? JSON.parse(raw) : {};
            if (profile.fullName) {
                const safeFullName = normalizeTurkishText(String(profile.fullName || ''));
                const safeRole = normalizeTurkishText(String(profile.role || ''));
                const safeCompany = normalizeTurkishText(String(profile.companyName || ''));
                const safeWebsite = String(profile.website || '');
                const contentCell = `
                            <div style="font-weight:700; font-size:18px; color:#1e293b;">${escapeHtml(safeFullName)}</div>
                            ${safeRole || safeCompany ? `<div style="color:#64748b; font-size:14px; margin-top:4px;">${escapeHtml([safeRole, safeCompany].filter(Boolean).join(' | '))}</div>` : ''}
                            <div style="margin-top:8px; font-size:14px; color:#64748b;">
                                ${profile.phone ? `<span>${escapeHtml(profile.phone)}</span>` : ''}
                                ${profile.phone && safeWebsite ? ' · ' : ''}
                                ${safeWebsite ? `<a href="${escapeHtml(safeWebsite)}" style="color:#4f46e5; text-decoration:none;">${escapeHtml(safeWebsite)}</a>` : ''}
                            </div>
                        `;
                signatureHtml = `
                <table cellpadding="0" cellspacing="0" style="border-collapse:collapse; margin-top:40px;">
                    <tr>
                        <td colspan="2" style="height:0; padding:0; margin:0; border:0; border-top:2px solid #e2e8f0; font-size:0; line-height:0;">&nbsp;</td>
                    </tr>
                    <tr>
                        ${profile.logo ? `<td style="padding-top:20px; padding-right:18px; vertical-align:top; border:0;"><img src="${profile.logo}" width="64" height="64" style="border-radius:50%; object-fit:cover; display:block;" alt="" /></td><td style="padding-top:20px; vertical-align:top; border:0;">${contentCell}</td>` : `<td colspan="2" style="padding-top:20px; vertical-align:top; border:0;">${contentCell}</td>`}
                    </tr>
                </table>
                `;
            }
        } catch (e) {
            /* ignore */
        }

        // İçerik: bold (**metin**), başlık (kısa satırlar), linkler (randevu/meet tek buton değil, normal link)
        const safe = (t: string) => escapeHtml(t).replace(/\n/g, '<br/>');
        const bold = (t: string) => t.replace(/\*\*([^*]+)\*\*/g, '<strong style="font-weight:700;">$1</strong>');
        const linkify = (t: string) => t.replace(
            /(https?:\/\/[^\s<]+)/g,
            (url) => {
                const u = url.replace(/[.,;:!?)]+$/, '');
                const label = u.replace(/^https?:\/\//, '').slice(0, 50) + (u.length > 50 ? '…' : '');
                return `<a href="${escapeHtml(u)}" style="color:#4f46e5; text-decoration:none; font-weight:500;">${escapeHtml(label)}</a>`;
            }
        );
        const paras = cleanBody
            .replace(/\n\n+/g, '\n\n')
            .split(/\n\n/)
            .map(p => p.trim())
            .filter(Boolean);
        const toBlock = (p: string, index: number) => {
            const safeP = safe(p);
            const withBold = bold(safeP);
            const withLinks = linkify(withBold);
            const isShort = p.length < 60 && !p.includes('\n');
            if (isShort && index === 0) return `<p style="margin:0 0 12px 0; font-size:17px; font-weight:700; color:#1e293b;">${withLinks}</p>`;
            if (isShort && index > 0) return `<p style="margin:0 0 16px 0; font-size:15px; font-weight:600; color:#334155;">${withLinks}</p>`;
            return `<p style="margin:0 0 16px 0; font-size:15px; line-height:1.65; color:#334155;">${withLinks}</p>`;
        };
        const bodyStyled = paras.length
            ? paras.map(toBlock).join('')
            : `<p style="margin:0; font-size:15px; line-height:1.65; color:#334155;">${linkify(bold(safe(cleanBody)))}</p>`;

        const htmlBody = `
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f1f5f9; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
            <tr><td style="padding:24px 16px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.08);">
                    <tr><td style="height:4px; background:linear-gradient(90deg,#4f46e5,#6366f1);"></td></tr>
                    <tr><td style="padding:32px 40px;">
                        ${bodyStyled}
                        ${signatureHtml}
                    </td></tr>
                </table>
            </td></tr>
        </table>
        `;

        // HTML part: base64-encode body so non-ASCII (e.g. Turkish) is preserved (RFC: 7bit allows only 0-127)
        const htmlBytes = new TextEncoder().encode(htmlBody);
        let htmlBinary = '';
        for (let i = 0; i < htmlBytes.length; i++) htmlBinary += String.fromCharCode(htmlBytes[i]);
        const htmlBase64 = wrapBase64Lines(btoa(htmlBinary));

        msg += `--${boundary}${nl}`;
        msg += `Content-Type: text/html; charset=utf-8${nl}`;
        msg += `Content-Transfer-Encoding: base64${nl}${nl}`;
        msg += `${htmlBase64}${nl}${nl}`;

        // Attachments
        if (attachments && attachments.length > 0) {
            for (const att of attachments) {
                const encodedFilename = rfc2047Encode(att.filename);
                msg += `--${boundary}${nl}`;
                msg += `Content-Type: ${att.mimeType}; name="${encodedFilename}"${nl}`;
                msg += `Content-Description: ${encodedFilename}${nl}`;
                msg += `Content-Disposition: attachment; filename="${encodedFilename}"; size=${att.content.length}${nl}`;
                msg += `Content-Transfer-Encoding: base64${nl}${nl}`;
                msg += `${wrapBase64Lines(att.content)}${nl}${nl}`;
            }
        }

        msg += `--${boundary}--`;

        // UTF-8 byte dizisi (TextEncoder) ile base64url; tutarlı Türkçe encoding
        const utf8Bytes = new TextEncoder().encode(msg);
        const CHUNK = 8192;
        let binary = '';
        for (let i = 0; i < utf8Bytes.length; i += CHUNK) {
            const slice = utf8Bytes.subarray(i, i + CHUNK);
            for (let j = 0; j < slice.length; j++) binary += String.fromCharCode(slice[j]);
        }
        return btoa(binary)
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    public async sendEmail(to: string, subject: string, body: string, attachments?: { filename: string, content: string, mimeType: string }[]): Promise<any> {
        if (!window.gapi?.client?.gmail) {
            throw new Error('Gmail API hazır değil. Lütfen Ayarlar > Google entegrasyonunda tekrar oturum açın.');
        }

        await this.validateRecipientBeforeSend(to);

        const raw = this.createMimeMessage(to, subject, body, attachments);

        try {
            const response = await window.gapi.client.gmail.users.messages.send({
                'userId': 'me',
                'resource': {
                    'raw': raw
                }
            });
            return response.result;
        } catch (error) {
            console.error("Gmail Send Error:", error);
            throw error;
        }
    }

    private parseFromHeader(fromHeader: string): { fromEmail: string; fromName: string } {
        const raw = (fromHeader || '').trim();
        const angleMatch = raw.match(/^(.*)<([^>]+)>$/);

        if (angleMatch) {
            const fromName = angleMatch[1].replace(/(^"|"$)/g, '').trim();
            const fromEmail = (angleMatch[2] || '').trim().toLowerCase();
            return { fromEmail, fromName: fromName || fromEmail };
        }

        const emailOnly = raw.toLowerCase();
        return { fromEmail: emailOnly, fromName: emailOnly };
    }

    public async listUnreadInbox(limit: number = 10): Promise<Array<{ id: string; threadId?: string; fromEmail: string; fromName: string; subject: string; snippet: string; date: string }>> {
        if (!window.gapi?.client?.gmail) return [];

        try {
            const listRes = await window.gapi.client.gmail.users.messages.list({
                userId: 'me',
                maxResults: limit,
                q: 'in:inbox is:unread -from:me -from:mailer-daemon@googlemail.com -from:google-daemon -from:noreply -from:no-reply newer_than:14d'
            });

            const messages = listRes.result?.messages || [];
            if (!Array.isArray(messages) || messages.length === 0) return [];

            const detailed = await Promise.all(messages.map(async (msg: any) => {
                const detail = await window.gapi.client.gmail.users.messages.get({
                    userId: 'me',
                    id: msg.id,
                    format: 'metadata',
                    metadataHeaders: ['From', 'Subject', 'Date']
                });

                const headers = detail.result?.payload?.headers || [];
                const fromHeader = headers.find((h: any) => h.name === 'From')?.value || '';
                const rawSubject = headers.find((h: any) => h.name === 'Subject')?.value || '(Konu Yok)';
                const subject = decodeAndFixSubject(rawSubject);
                const date = headers.find((h: any) => h.name === 'Date')?.value || new Date().toISOString();
                const parsedFrom = this.parseFromHeader(fromHeader);

                return {
                    id: detail.result?.id || msg.id,
                    threadId: detail.result?.threadId,
                    fromEmail: parsedFrom.fromEmail,
                    fromName: parsedFrom.fromName,
                    subject,
                    snippet: detail.result?.snippet || '',
                    date
                };
            }));

            return detailed.filter(d => {
                if (!d.fromEmail || !d.fromEmail.includes('@')) return false;
                if (this.isBlockedMailbox(d.fromEmail)) return false;
                if (this.isBounceLikeSubject(d.subject)) return false;
                return true;
            });
        } catch (error) {
            console.error('Gmail unread inbox fetch failed', error);
            return [];
        }
    }

    public async markAsRead(messageId: string): Promise<void> {
        if (!window.gapi?.client?.gmail || !messageId) return;
        try {
            await window.gapi.client.gmail.users.messages.modify({
                userId: 'me',
                id: messageId,
                resource: {
                    removeLabelIds: ['UNREAD']
                }
            });
        } catch (error) {
            console.error('Gmail mark as read failed', error);
        }
    }

    /** List inbox messages (read + unread). */
    public async listInboxMessages(limit: number = 20): Promise<Array<{ id: string; threadId?: string; fromEmail: string; fromName: string; subject: string; snippet: string; date: string; isUnread: boolean }>> {
        if (!window.gapi?.client?.gmail) return [];
        try {
            const listRes = await window.gapi.client.gmail.users.messages.list({
                userId: 'me',
                maxResults: limit,
                q: 'in:inbox -from:mailer-daemon@googlemail.com -from:google-daemon -from:noreply newer_than:30d'
            });
            const messages = listRes.result?.messages || [];
            if (!Array.isArray(messages) || messages.length === 0) return [];

            const detailed = await Promise.all(messages.map(async (msg: any) => {
                const detail = await window.gapi.client.gmail.users.messages.get({
                    userId: 'me', id: msg.id, format: 'metadata',
                    metadataHeaders: ['From', 'Subject', 'Date']
                });
                const headers = detail.result?.payload?.headers || [];
                const fromHeader = headers.find((h: any) => h.name === 'From')?.value || '';
                const rawSubject = headers.find((h: any) => h.name === 'Subject')?.value || '(Konu Yok)';
                const subject = decodeAndFixSubject(rawSubject);
                const date = headers.find((h: any) => h.name === 'Date')?.value || new Date().toISOString();
                const parsedFrom = this.parseFromHeader(fromHeader);
                const labelIds: string[] = detail.result?.labelIds || [];

                return {
                    id: detail.result?.id || msg.id,
                    threadId: detail.result?.threadId,
                    fromEmail: parsedFrom.fromEmail,
                    fromName: parsedFrom.fromName,
                    subject, snippet: detail.result?.snippet || '', date,
                    isUnread: labelIds.includes('UNREAD')
                };
            }));
            return detailed.filter(d => d.fromEmail && d.fromEmail.includes('@') && !this.isBlockedMailbox(d.fromEmail));
        } catch (error) {
            console.error('Gmail inbox fetch failed', error);
            return [];
        }
    }

    /** List sent messages. */
    public async listSentMessages(limit: number = 20): Promise<Array<{ id: string; toEmail: string; subject: string; snippet: string; date: string }>> {
        if (!window.gapi?.client?.gmail) return [];
        try {
            const listRes = await window.gapi.client.gmail.users.messages.list({
                userId: 'me', maxResults: limit, labelIds: ['SENT'],
                q: 'newer_than:30d'
            });
            const messages = listRes.result?.messages || [];
            if (!Array.isArray(messages) || messages.length === 0) return [];

            const detailed = await Promise.all(messages.map(async (msg: any) => {
                const detail = await window.gapi.client.gmail.users.messages.get({
                    userId: 'me', id: msg.id, format: 'metadata',
                    metadataHeaders: ['To', 'Subject', 'Date']
                });
                const headers = detail.result?.payload?.headers || [];
                const toHeader = headers.find((h: any) => h.name === 'To')?.value || '';
                const rawSubject = headers.find((h: any) => h.name === 'Subject')?.value || '(Konu Yok)';
                const subject = decodeAndFixSubject(rawSubject);
                const date = headers.find((h: any) => h.name === 'Date')?.value || new Date().toISOString();

                return {
                    id: detail.result?.id || msg.id,
                    toEmail: toHeader,
                    subject, snippet: detail.result?.snippet || '', date
                };
            }));
            return detailed;
        } catch (error) {
            console.error('Gmail sent fetch failed', error);
            return [];
        }
    }
}

export const gmailService = new GmailService();
