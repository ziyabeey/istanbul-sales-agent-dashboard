/** E-posta domain'inden web sitesi var mı kontrolü (HEAD isteği). CORS nedeniyle birçok sitede 'unknown' döner. */
export async function checkWebsiteExists(domain: string): Promise<boolean | 'unknown'> {
    if (!domain || domain.length < 4) return 'unknown';
    const clean = domain.replace(/^https?:\/\//, '').split('/')[0].toLowerCase();
    const urls = [`https://${clean}`, `https://www.${clean}`];
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    try {
        for (const url of urls) {
            try {
                const res = await fetch(url, { method: 'HEAD', signal: controller.signal, mode: 'cors' });
                clearTimeout(timeout);
                if (res.ok) return true;
                if (res.status >= 400 && res.status < 500) return false;
            } catch {
                continue;
            }
        }
    } catch {
        // CORS, network, timeout
    }
    clearTimeout(timeout);
    return 'unknown';
}

/** Lead'in e-posta domain'ine göre web sitesi var mı kontrol eder; sonucu lead.websitesi_var_mi ile uyumlu döndürür. */
export async function checkLeadWebsiteByEmail(email: string | undefined): Promise<'Evet' | 'Hayır' | 'unknown'> {
    if (!email || !email.includes('@')) return 'unknown';
    const domain = email.split('@')[1];
    if (!domain) return 'unknown';
    const result = await checkWebsiteExists(domain);
    if (result === true) return 'Evet';
    if (result === false) return 'Hayır';
    return 'unknown';
}

const SITE_AGE_MONTHS_OLD = 24;

/**
 * E-posta domain'ine ait sitenin Last-Modified (veya Date) header'ına göre eski olup olmadığını kontrol eder.
 * CORS/timeout nedeniyle çoğu sitede 'unknown' döner.
 */
export async function checkSiteAge(domain: string | undefined): Promise<'ok' | 'old' | 'unknown'> {
    if (!domain || domain.length < 4) return 'unknown';
    const clean = domain.replace(/^https?:\/\//, '').split('/')[0].toLowerCase();
    const urls = [`https://${clean}`, `https://www.${clean}`];
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
        for (const url of urls) {
            try {
                const res = await fetch(url, { method: 'GET', signal: controller.signal, mode: 'cors' });
                clearTimeout(timeout);
                const lastMod = res.headers.get('last-modified') || res.headers.get('date');
                if (!lastMod) return 'unknown';
                const date = new Date(lastMod);
                if (isNaN(date.getTime())) return 'unknown';
                const now = new Date();
                const monthsDiff = (now.getTime() - date.getTime()) / (30 * 24 * 60 * 60 * 1000);
                return monthsDiff >= SITE_AGE_MONTHS_OLD ? 'old' : 'ok';
            } catch {
                continue;
            }
        }
    } catch {
        // CORS, network, timeout
    }
    clearTimeout(timeout);
    return 'unknown';
}

const MOBILE_USER_AGENT = 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36';

/**
 * İsteğe bağlı mobil uyum kontrolü: site mobil User-Agent ile isteğe cevap veriyor mu (200).
 * CORS nedeniyle birçok sitede 'unknown' döner.
 */
export async function checkMobileFriendly(domain: string | undefined): Promise<'ok' | 'poor' | 'unknown'> {
    if (!domain || domain.length < 4) return 'unknown';
    const clean = domain.replace(/^https?:\/\//, '').split('/')[0].toLowerCase();
    const url = `https://${clean}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
        const res = await fetch(url, {
            method: 'GET',
            signal: controller.signal,
            mode: 'cors',
            headers: { 'User-Agent': MOBILE_USER_AGENT }
        });
        clearTimeout(timeout);
        if (res.ok) return 'ok';
        if (res.status >= 400 && res.status < 500) return 'poor';
        return 'unknown';
    } catch {
        clearTimeout(timeout);
        return 'unknown';
    }
}

export const verificationService = {
    checkWebsiteExists,
    checkLeadWebsiteByEmail,
    checkSiteAge,
    checkMobileFriendly,

    /**
     * Verifies an email address.
     * Returns the status ('valid', 'invalid', 'uncertain').
     */
    verifyEmail: (email: string | undefined): 'valid' | 'invalid' | 'uncertain' => {
        if (!email) return 'invalid';

        // 1. Basic Syntax Check (Regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return 'invalid';

        // 2. Common Typo Check
        const typos = ['gmil.com', 'homail.com', 'yaho.com', 'outlook.co', 'gmai.com'];
        const domain = email.split('@')[1];
        if (typos.includes(domain)) return 'invalid';

        // 3. Disposable Domain Check (Simplified list)
        const disposableDomains = ['tempmail.com', 'throwawaymail.com', '10minutemail.com'];
        if (disposableDomains.includes(domain)) return 'invalid';

        // 4. Role-based emails (often valid but low quality for sales) - marked as uncertain?
        // For now, let's consider them valid syntactically but maybe 'uncertain' for direct outreach? 
        // Let's stick to valid for now unless it's strictly technical.

        // 5. Domain Extension Check
        const validExtensions = ['.com', '.net', '.org', '.edu', '.gov', '.io', '.co', '.tr'];
        const hasValidExt = validExtensions.some(ext => domain.endsWith(ext));
        if (!hasValidExt) return 'uncertain'; // Could be a custom internal domain

        return 'valid';
    }
};
