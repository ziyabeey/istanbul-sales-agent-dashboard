/**
 * Client-safe slug utility — firebase-admin bağımlılığı yok.
 * OnboardingWizard ve diğer client bileşenler bu dosyayı kullanmalı.
 */
export function isletmeAdiToSlug(isletmeAdi: string): string {
    return isletmeAdi
        .toLowerCase()
        .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
        .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 30)
}
