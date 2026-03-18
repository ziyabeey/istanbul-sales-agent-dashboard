import { LEGACY_SABLONLAR as SABLONLAR } from '../data/sablonlar'
import { sektorProfiliBul } from '../data/sektorKatalogu'

/** 
 * Pakete ve Sectore göre doğru template'i seç 
 * Sektör gruplarına özel templateler eklendi (Faz 1 & 2).
 */
export function sablonSec(paket: string, sektorId: string = ''): string {
    const p = paket?.toUpperCase()

    // Önce sektör kataloğundan profil ara
    const profil = sektorProfiliBul(sektorId)
    if (profil) {
        // Profil bulundu — iskelet tipine göre template seç
        const iskeletSablon = SABLONLAR.find(s => s.id === profil.iskeletTipi)
        if (iskeletSablon) {
            console.log(`[SABLON SEÇ] Profil ${profil.id} → iskelet: ${profil.iskeletTipi}`)
            return iskeletSablon.htmlKodu
        }
    }

    
    // Sektör Grupları Eşleştirmesi (Faz 1)
    const isSoft = ['kuafor', 'guzelliksicak', 'diyetisyen', 'psikolog', 'yoga', 'pilates'].includes(sektorId)
    const isHard = ['insaat', 'mimarlik', 'mantolama', 'cati', 'camkapi', 'asansor', 'tente'].includes(sektorId)
    const isFood = ['ascilik', 'organizasyon', 'pasta', 'catering'].includes(sektorId)
    const isFast = ['oto', 'elektrik', 'tesisat', 'cilingir', 'kombi', 'temizlik', 'nakliye', 'kurye'].includes(sektorId)
    
    // Sektör Grupları Eşleştirmesi (Faz 2)
    const isCorporate = ['bilisim', 'avukat', 'mali', 'danismanlik', 'sigorta', 'emlak', 'guvenlik'].includes(sektorId)
    const isEducation = ['egitim', 'kurs', 'tercuman', 'kres', 'surucu'].includes(sektorId)
    const isSports = ['spor', 'fotograf', 'etkinlik', 'dovme', 'oyun', 'muzik'].includes(sektorId)
    const isRetail = ['giyim', 'taki', 'hediyelik', 'toptan', 'cicekci', 'kozmetik', 'optik'].includes(sektorId)

    // Sektör Grupları Eşleştirmesi (Faz 3 — Yeni Demolar)
    const isHealth = ['saglik', 'klinik', 'doktor', 'eczane', 'diyetisyen', 'psikolog', 'veteriner', 'fizik-tedavi'].includes(sektorId)
    const isEcommerce = ['eticaret', 'online-satis', 'pazaryeri'].includes(sektorId)
    const isAutomotive = ['oto-galeri', 'rent-a-car', 'oto-yikama', 'oto-lastik', 'oto-kaporta'].includes(sektorId)
    const isAgency = ['ajans', 'reklam', 'yazilim', 'medya', 'produksiyon', 'tasarim'].includes(sektorId)

    // 1. Önce pakete göre yetiyorsa Sektörel Şablonu vermeye çalış

    // Faz 3 Eşleştirmeleri (Yeni Demolar)
    if ((p === 'PREMIUM' || p === 'PREMIUMPLUS') && isHealth) {
        return SABLONLAR.find(s => s.id === 'sektor-saglik-premium')?.htmlKodu || SABLONLAR[0].htmlKodu
    }
    if ((p === 'PREMIUM' || p === 'PREMIUMPLUS') && isAgency) {
        return SABLONLAR.find(s => s.id === 'sektor-ajans-premium')?.htmlKodu || SABLONLAR[0].htmlKodu
    }
    if ((p === 'PREMIUM' || p === 'PREMIUMPLUS' || p === 'BUYUME') && isAutomotive) {
        return SABLONLAR.find(s => s.id === 'sektor-otomotiv-buyume')?.htmlKodu || SABLONLAR[0].htmlKodu
    }
    if ((p === 'PREMIUM' || p === 'PREMIUMPLUS' || p === 'BUYUME' || p === 'STANDART') && isEcommerce) {
        return SABLONLAR.find(s => s.id === 'sektor-eticaret-standart')?.htmlKodu || SABLONLAR[0].htmlKodu
    }
    
    // Faz 2 Eşleştirmeleri
    if ((p === 'PREMIUM' || p === 'PREMIUMPLUS') && isSports) {
        return SABLONLAR.find(s => s.id === 'sektor-spor-premium')?.htmlKodu || SABLONLAR[0].htmlKodu
    }
    if ((p === 'PREMIUM' || p === 'PREMIUMPLUS' || p === 'BUYUME') && isCorporate) {
        return SABLONLAR.find(s => s.id === 'sektor-kurumsal-buyume')?.htmlKodu || SABLONLAR[0].htmlKodu
    }
    if ((p === 'PREMIUM' || p === 'PREMIUMPLUS' || p === 'BUYUME') && isRetail) {
        return SABLONLAR.find(s => s.id === 'sektor-vitrin-buyume')?.htmlKodu || SABLONLAR[0].htmlKodu
    }
    if ((p === 'PREMIUM' || p === 'PREMIUMPLUS' || p === 'BUYUME' || p === 'STANDART') && isEducation) {
        return SABLONLAR.find(s => s.id === 'sektor-egitim-standart')?.htmlKodu || SABLONLAR[0].htmlKodu
    }

    // Faz 1 Eşleştirmeleri
    if ((p === 'PREMIUM' || p === 'PREMIUMPLUS') && isHard) {
        return SABLONLAR.find(s => s.id === 'sektor-insaat-premium')?.htmlKodu || SABLONLAR[0].htmlKodu
    }
    if ((p === 'PREMIUM' || p === 'PREMIUMPLUS' || p === 'BUYUME') && isSoft) {
        return SABLONLAR.find(s => s.id === 'sektor-guzellik-buyume')?.htmlKodu || SABLONLAR[0].htmlKodu
    }
    if ((p === 'PREMIUM' || p === 'PREMIUMPLUS' || p === 'BUYUME' || p === 'STANDART') && isFood) {
        return SABLONLAR.find(s => s.id === 'sektor-restoran-standart')?.htmlKodu || SABLONLAR[0].htmlKodu
    }
    if (isFast) {
        // Hızlı hizmetler için Temel paket bile yeterli (hepsi görebilir)
        return SABLONLAR.find(s => s.id === 'sektor-hizmet-temel')?.htmlKodu || SABLONLAR[0].htmlKodu
    }

    // 2. Sektör eşleşmediyse veya paketi yetmediyse Jenerik Şablonlara Fallback
    if (p === 'PREMIUM' || p === 'PREMIUMPLUS') {
        return SABLONLAR.find(s => s.id === 'sablon-premium')?.htmlKodu || SABLONLAR[0].htmlKodu
    }
    if (p === 'BUYUME') {
        return SABLONLAR.find(s => s.id === 'sablon-buyume')?.htmlKodu || SABLONLAR[0].htmlKodu
    }
    if (p === 'STANDART') {
        return SABLONLAR.find(s => s.id === 'sablon-standart')?.htmlKodu || SABLONLAR[0].htmlKodu
    }
    
    // Varsayılan TEMEL (Jenerik)
    return SABLONLAR.find(s => s.id === 'sablon-temel')?.htmlKodu || SABLONLAR[0].htmlKodu
}

/** Modül ID'sini template slot adına çevir ({{MODUL_xxx}}) */
export function modulSlotAdi(modulId: string): string {
    return `{{MODUL_${modulId.toUpperCase().replace(/-/g, '_')}}}`
}

/**
 * Template içindeki tüm {{PLACEHOLDER}}'ları doldur.
 * Kullanılmayan {{MODUL_xxx}} slot'larını boş string ile temizle.
 */
export function finalizeTemplate(
    sablon: string,
    degerler: Record<string, string>
): string {
    let html = sablon

    // Önce verilen değerleri doldur
    for (const [key, val] of Object.entries(degerler)) {
        html = html.replaceAll(`{{${key}}}`, val)
    }

    // Kalan doldurulmamış MODUL slot'larını temizle
    html = html.replace(/\{\{MODUL_[A-Z0-9_]+\}\}/g, '')

    // Diğer kalan placeholder'ları temizle
    html = html.replace(/\{\{[A-Z0-9_]+\}\}/g, '')

    return html
}
