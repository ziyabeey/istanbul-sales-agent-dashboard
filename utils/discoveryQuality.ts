/**
 * Ortak lead keşif kalite kuralları.
 * Otonom discover() ve LeadDiscoveryModal filtrelerinde kullanılır.
 */

/** Örnek/sahte veya jenerik email pattern'leri. */
const FAKE_EMAIL_PATTERNS = [
    'null',
    'undefined',
    'example.com',
    'ornek',
    'test@',
    'firma.com',
    'sample',
    'mail.com',
    'domain.com',
    'email.com',
    'placeholder',
];

/** Sadece jenerik local part + jenerik domain (info@firma.com benzeri). */
const GENERIC_DOMAIN_ONLY = /^[a-z0-9._+-]+@(firma|company|business|test|example|sample|demo|placeholder)\.(com|net|org|tr)$/i;

/**
 * Email'in muhtemelen sahte/örnek olduğunu döndürür.
 * discover() ve modal filtrelerinde kullan.
 */
export function isLikelyFakeEmail(email: string | undefined | null): boolean {
    if (!email || typeof email !== 'string') return true;
    const e = email.trim().toLowerCase();
    if (!e.includes('@')) return true;
    const lower = e.toLowerCase();
    if (FAKE_EMAIL_PATTERNS.some((p) => lower.includes(p))) return true;
    if (GENERIC_DOMAIN_ONLY.test(e)) return true;
    return false;
}

/**
 * Türkiye telefon formatı: rakamlar dışı temizlenir, baştaki 0 veya +90 çıkarılır, 10 hane olmalı; tamamı 0 olmamalı.
 */
export function isValidTurkishPhone(phone: string | undefined | null): boolean {
    if (!phone || typeof phone !== 'string') return false;
    const digits = phone.replace(/\D/g, '');
    let ten = digits.slice(-10);
    if (digits.length > 10) {
        const withoutCountry = digits.replace(/^90/, '').replace(/^0/, '');
        ten = withoutCountry.slice(-10);
    }
    if (ten.length !== 10) return false;
    if (/^0+$/.test(ten)) return false;
    return true;
}

/**
 * Lead'in kaynak URL'si (Google Maps veya kaynak_url) dolu mu?
 */
export function hasRequiredSource(lead: { google_maps_url?: string; kaynak_url?: string }): boolean {
    const maps = (lead.google_maps_url || '').trim();
    const kaynak = (lead.kaynak_url || '').trim();
    if (!maps && !kaynak) return false;
    const mapsOk =
        maps.includes('maps.google') || maps.includes('goo.gl/maps') || maps.includes('google.com/maps') || maps.includes('g.page');
    const kaynakOk = kaynak.startsWith('http://') || kaynak.startsWith('https://');
    return mapsOk || kaynakOk;
}

/**
 * Firma adı placeholder veya çok kısa mı? (uydurma isimleri elemek için)
 */
const PLACEHOLDER_NAMES = new Set([
    'firma',
    'işletme',
    'şube',
    'şirket',
    'company',
    'business',
    'test',
    'örnek',
    'demo',
]);

export function isPlaceholderFirmaAdi(firmaAdi: string | undefined | null): boolean {
    if (!firmaAdi || typeof firmaAdi !== 'string') return true;
    const trimmed = firmaAdi.trim();
    if (trimmed.length < 3) return true;
    const single = trimmed.toLowerCase().replace(/\s+/g, ' ');
    if (PLACEHOLDER_NAMES.has(single)) return true;
    return false;
}
